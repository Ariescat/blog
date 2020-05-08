---
layout:     post
title:      Spring之properties解析
subtitle:   "\"来瞅瞅Spring怎么解析properties的吧\""
date:       2020-05-07
author:     Ariescat
header-img: img/header7.jpg
tags:
    - Java
    - Spring
    - SpringBoot
---



### Spring Properties使用的几种方式

1. 在Java中使用这个 **@Value("${ }")注解** 读取

2. 在配置文件中使用 **${ }** 读取

### 解析器注册

1. `context:property-placeholder`标签

   ```xml
   <context:property-placeholder location="classpath:*.properties"/>
   ```

   源码解析：

   ```java
   public class ContextNamespaceHandler extends NamespaceHandlerSupport {
   	@Override
   	public void init() {
   		registerBeanDefinitionParser("property-placeholder", new PropertyPlaceholderBeanDefinitionParser());
   		...省略代码
   	}
   }
   ```

   这个`Parser`实质上注册了一个org.springframework.context.support.PropertySourcesPlaceholderConfigurer（实现了`BeanFactoryPostProcessor`的处理器）。

   ```java
   // PropertySourcesPlaceholderConfigurer.java
   	@Override
   	public void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory) throws BeansException {
   		if (this.propertySources == null) {
   			this.propertySources = new MutablePropertySources();
   			if (this.environment != null) {
   				this.propertySources.addLast(
   					// 注意看这里this.environment里包含了propertySources
   					// spring boot的配置都在这里
   					new PropertySource<Environment>(ENVIRONMENT_PROPERTIES_PROPERTY_SOURCE_NAME, this.environment) {
   						@Override
   						@Nullable
   						public String getProperty(String key) {
   							// this.source就是this.environment
   							return this.source.getProperty(key);
   						}
   					}
   				);
   			}
   			try {
   				// 这一步的mergeProperties()也很重要
   				// xml里的location配置会在这里获取
   				PropertySource<?> localPropertySource =
   						new PropertiesPropertySource(LOCAL_PROPERTIES_PROPERTY_SOURCE_NAME, mergeProperties());
   				if (this.localOverride) {
   					this.propertySources.addFirst(localPropertySource);
   				}
   				else {
   					this.propertySources.addLast(localPropertySource);
   				}
   			}
   			catch (IOException ex) {
   				throw new BeanInitializationException("Could not load properties", ex);
   			}
   		}
   
   		processProperties(beanFactory, new PropertySourcesPropertyResolver(this.propertySources));
   		this.appliedPropertySources = this.propertySources;
   	}
   ```
   
2. PropertyPlaceholderConfigurer类

   ```xml
   <bean class="org.springframework.beans.factory.config.PropertyPlaceholderConfigurer">
       <property name="locations">
           <list>
               <value>classpath:resource1.properties</value>
               <value>classpath:config/resource2.properties</value>
               <value>classpath*:resource3.properties</value>
           </list>
       </property>
   </bean>
   ```

   原理和 **@1** 差不多

3. SpringBoot自动装配

   `@EnableAutoConfiguration`自动装配中spring.factories文件里包含`PropertyPlaceholderAutoConfiguration`类，

   ```java
   @Bean
   @ConditionalOnMissingBean(search = SearchStrategy.CURRENT)
   public static PropertySourcesPlaceholderConfigurer propertySourcesPlaceholderConfigurer() {
   	return new PropertySourcesPlaceholderConfigurer();
   }
   ```

   把`PropertySourcesPlaceholderConfigurer`这个实现了`BeanFactoryPostProcessor`的处理器注册进去。

   这个类就是 **@1** 里面的类

4. `@PropertySource`

   上面`@EnableAutoConfiguration`的自动装配只是加载了默认的 ./ (config/) application.properties（.yml，.xml）配置文件，可见@PropertySource灵活一点

   ```java
   @PropertySource(value={"classpath:mail.properties"})
   public class ReadProperties {
   　　@Value(value="${mail.username}")
    　 private String USER_NAME;
   }
   ```
   区别`@ImportResource`，这个是可以引入带有`<bean>`标签的`xml`文件的（也就是普通的spring配置文件），曾经一度把这个和`properties`配置搞混。

   源码解析：

   `org.springframework.context.annotation.ConfigurationClassParser#doProcessConfigurationClass`

5. spring boot特有的`@ConfigurationProperties`

   源码解析：

   `ConfigurationPropertiesBindingPostProcessor#postProcessBeforeInitialization`

   这里面有空再研究吧，看着有点头大

### @Value 源码解析

`org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor#postProcessProperties`

此处是Spring统一处理注入依赖的地方，接下来会调用到`org.springframework.beans.factory.support.DefaultListableBeanFactory#doResolveDependency`：

```java
    // 这里的AutowireCandidateResolver是QualifierAnnotationAutowireCandidateResolver，
    // 其实就是获取@Value上的注解值
    Object value = getAutowireCandidateResolver().getSuggestedValue(descriptor);
    if (value != null) {
        if (value instanceof String) {
            String strVal = resolveEmbeddedValue((String) value);
            BeanDefinition bd = (beanName != null && containsBean(beanName) ?
                    getMergedBeanDefinition(beanName) : null);
            value = evaluateBeanDefinitionString(strVal, bd);
        }
        TypeConverter converter = (typeConverter != null ? typeConverter : getTypeConverter());
        try {
            return converter.convertIfNecessary(value, type, descriptor.getTypeDescriptor());
        } catch (UnsupportedOperationException ex) {
            // A custom TypeConverter which does not support TypeDescriptor resolution...
            return (descriptor.getField() != null ?
                    converter.convertIfNecessary(value, type, descriptor.getField()) :
                    converter.convertIfNecessary(value, type, descriptor.getMethodParameter()));
        }
    }
```

QualifierAnnotationAutowireCandidateResolver就是我们要找的处理类，它负责处理@Qualifier和@Value两个注解的取值操作。取值结果一般为“${xxx}”，然后执行`resolveEmbeddedValue((String) value)`，走进：

```java
// PropertySourcesPlaceholderConfigurer.java
	protected void processProperties(ConfigurableListableBeanFactory beanFactoryToProcess,
			final ConfigurablePropertyResolver propertyResolver) throws BeansException {

		propertyResolver.setPlaceholderPrefix(this.placeholderPrefix);
		propertyResolver.setPlaceholderSuffix(this.placeholderSuffix);
		propertyResolver.setValueSeparator(this.valueSeparator);

		StringValueResolver valueResolver = strVal -> {
			// 走进这里！！propertyResolver就是上面postProcessBeanFactory()里面创建出来的
			// 通过这一步就可以获取到properties文件的值
			String resolved = (this.ignoreUnresolvablePlaceholders ?
					propertyResolver.resolvePlaceholders(strVal) :
					propertyResolver.resolveRequiredPlaceholders(strVal));
			if (this.trimValues) {
				resolved = resolved.trim();
			}
			return (resolved.equals(this.nullValue) ? null : resolved);
		};

		doProcessProperties(beanFactoryToProcess, valueResolver);
	}
```



参考：

1. [spring- properties 读取的五种方式](https://www.cnblogs.com/zxf330301/p/6184139.html)
2. [SpringBoot 中 @Value 源码解析](https://www.jianshu.com/p/933669270a9f)