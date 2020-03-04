---
layout:     post
title:      Spring对Groovy支持的解析
subtitle:   "\"spring是怎么实现对Groovy的注入支持的？\""
date:       2020-03-04
author:     Ariescat
header-img: img/post-bg-2015.jpg
catalog: true
tags:
    - Spring
    - Groovy
---

> “🙉🙉🙉 ”

### spring对groovy支持的解析

- `GroovyFactory`

  注册`BeanDefinition`，注意看这里：

  ```java
  bd.setBeanClassName("org.springframework.scripting.groovy.GroovyScriptFactory");
  ```

  也就是最终产生能执行的class是在这个工厂里编译出来的

- `org.springframework.scripting.support.ScriptFactoryPostProcessor`，看`spring`对`groovy`的支持

  - 先执行`setBeanFactory`，这里有一行关键的代码：

    ```java
    // Required so that all BeanPostProcessors, Scopes, etc become available.
    this.scriptBeanFactory.copyConfigurationFrom(this.beanFactory);
    ```

    **附：**

    因为这里拷贝了`spring`默认的工厂，此后的`groovy`的构造是由`scriptBeanFactory`完成的，所以如果想对groovy的代码进行扩展，则必要要在`ScriptFactoryPostProcessor`执行之前做处理。

    - `RpcConsumerProcessor`

      如新增一个`RpcConsumerProcessor`对`groovy`类注解有`@RpcConsumer`的字段进行RPC代理注入，则必要提高`RpcConsumerProcessor`的优先级，可以考虑实现`PriorityOrdered`，不然的话`scriptBeanFactory` `copy`完了是拿不到`RpcConsumerProcessor`的，更别说执行了

      至于为什么会这样就要看Spring的源码了`AbstractApplicationContext#registerBeanPostProcessors`：

      ```java
      // First, register the BeanPostProcessors that implement PriorityOrdered.
      OrderComparator.sort(priorityOrderedPostProcessors);
      registerBeanPostProcessors(beanFactory, priorityOrderedPostProcessors); // 所以必须要在下面ScriptFactoryPostProcessor构造之前把自定义的Processors优先注册进去
      
      // Next, register the BeanPostProcessors that implement Ordered.
      List<BeanPostProcessor> orderedPostProcessors = new ArrayList<BeanPostProcessor>();
      for (String ppName : orderedPostProcessorNames) {
      	BeanPostProcessor pp = beanFactory.getBean(ppName, BeanPostProcessor.class); // 这里就会构造ScriptFactoryPostProcessor并调用setBeanFactory
      	orderedPostProcessors.add(pp);
      	if (pp instanceof MergedBeanDefinitionPostProcessor) {
      		internalPostProcessors.add(pp);
      	}
      }
      ```

    - `RpcProviderProcessor`

      这个`Processor`又为什么不需要`PriorityOrdered`更改优先级呢，因为他不需要获取**实例**来注入，只需要获取到`targetClass`就行了，而这个Spring的`AopUtils.getTargetClass(bean)`就可以完美的获取到代理的Class，从而获取到该Class的字段和方法。

      

    - 构造完groovy对象后，看spring的`doCreateBean`：

      ```java
      // Initialize the bean instance.
      Object exposedObject = bean;
      try {
      	populateBean(beanName, mbd, instanceWrapper);
      	if (exposedObject != null) {
      		exposedObject = initializeBean(beanName, exposedObject, mbd);
      	}
      }
      ```

      这里`initializeBean`就会触发各种`BeanPostProcessors`，完成上面自定义的`BeanPostProcessors`的调用：

      ```java
      applyBeanPostProcessorsBeforeInitialization(wrappedBean, beanName);
      applyBeanPostProcessorsAfterInitialization(wrappedBean, beanName);
      ```

    

- 再看`predictBeanType`和`postProcessBeforeInstantiation`

  这两个方法都是调用到`prepareScriptBeans`方法，看进去，调用了`createScriptedObjectBeanDefinition`：

  ```java
  GenericBeanDefinition objectBd = new GenericBeanDefinition(bd); // 传进父bd，也就是一开始我们GroovyFactory构建的bd
  objectBd.setFactoryBeanName(scriptFactoryBeanName);
  objectBd.setFactoryMethodName("getScriptedObject"); // 看到这里是不是就和GroovyScriptFactor对应上啦，之后spring就会走工厂方法把对象构造出来
  objectBd.getConstructorArgumentValues().clear();
  objectBd.getConstructorArgumentValues().addIndexedArgumentValue(0, scriptSource);
  objectBd.getConstructorArgumentValues().addIndexedArgumentValue(1, interfaces);
  ```

    `createScriptedObjectBeanDefinition`调用完后，会执行：

  ```java
  if (refreshCheckDelay >= 0) {
    	objectBd.setScope(BeanDefinition.SCOPE_PROTOTYPE); // 这一步很重要，此后的脚本热替换要用到
  }
  ```

    **附：**

    其实这里的`scriptFactory`和`scriptSource`没太看懂是干嘛的，以后研究下

  ```java
  ScriptFactory scriptFactory = this.scriptBeanFactory.getBean(scriptFactoryBeanName, ScriptFactory.class);
  ScriptSource scriptSource = getScriptSource(scriptFactoryBeanName, scriptFactory.getScriptSourceLocator());
  ```

    

- 执行到`postProcessBeforeInstantiation`，才真正调用`createRefreshableProxy`：

  ```java
  RefreshableScriptTargetSource ts = new RefreshableScriptTargetSource(this.scriptBeanFactory,
  		scriptedObjectBeanName, scriptFactory, scriptSource, isFactoryBean);
  ...
  return createRefreshableProxy(ts, interfaces, proxyTargetClass);
  
  ```
  看`createRefreshableProxy`这个方法内部，事实上是调用了`new JdkDynamicAopProxy(config)`创建了一个代理对象。此后调用接口的方法则会这样执行:
  
  ```java
  public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
      ...
      TargetSource targetSource = this.advised.targetSource; // 这里的targetSource就是RefreshableScriptTargetSource
      ...
      target = targetSource.getTarget(); // 看父类的getTarget
      ...
      // 接下来就是反射调用了
  }
  
  ```
  
  **附：**
  
  其实这里还有一个坑：`groovy`注册进`spring`，但没地方引用，启动的时候是不会进`postProcessBeforeInstantiation`这个方法的。虽然以后调用`getBean`会重新进来，但如果是想在启动的时候做一些工作，则要注意这一点。
  
  
  
- `getTarget`是怎么拿到实例化的`groovy`对象呢？看`GroovyScriptFactory`的源码`getScriptedObject`：

  ```java
  this.scriptClass = getGroovyClassLoader().parseClass(scriptSource.getScriptAsString(), scriptSource.suggestedClassName()); // 这里面把groovy编译为字节码，并装载进虚拟机
  
  GroovyObject goo = (GroovyObject) scriptClass.newInstance();
  ```
  
  再深层一点就不解读了，涉及到`groovy`的编译了，有兴趣可以去了解：

    1. `org.codehaus.groovy.runtime.callsite.CallSite`
    2. **invokedynamic指令**
  
  这里我也测试了一些基础的`java`与`groovy`的结合使用：

  ​	[test-metis](https://github.com/Ariescat/test-metis) -> `GroovyClassLoaderApp.java` 

- 脚本是如何刷新的？

  其实上面的流程已经出现了一个关键：`RefreshableScriptTargetSource`，在`getTarget`的时候会判断`refreshCheckDelayElapsed()`，若有修改并且符合了`refreshCheckDelay`时间，就会走`refresh()`重新`beanFactory.getBean(beanName)`，又因为这里的`BeanDefinition`的`SCOPE`为`PROTOTYPE`，所以最终再次走进`GroovyScriptFactory`>>`parseClass` >>`newInstance`



#### 最后总结spring的getBean()流程

`getBean(type)` > `doGetBean()` > 

```java
RootBeanDefinition mbd = getMergedLocalBeanDefinition(beanName); // 这里mbd的beanClassName为GroovyScriptFactory，并且默认为单例
```

`createBean()` > `doCreateBean()` > `initializeBean()` > `ScriptFactoryPostProcessor#postProcessBeforeInstantiation` 

至此完成`Spring`最外面的那层代理”壳“，这层“壳”有一个可刷新的`RefreshableScriptTargetSource`

继续 >

`AbstractRefreshableTargetSource#getTargetClass()` >

`beanFactory.getBean(beanName)`

此时`beanFactory`为`scriptBeanFactory`，`beanName`为`scriptedObject.XXX.java`，`bdm`的`Scope`为`PROTOTYPE` >

最终执行进`GroovyScriptFactory`的工厂方法`getScriptedObject()` > `parseClass()` > `newInstance`