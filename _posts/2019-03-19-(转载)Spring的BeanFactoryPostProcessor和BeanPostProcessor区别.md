---
layout:     post
title:      (转载)Spring的BeanFactoryPostProcessor和BeanPostProcessor区别
subtitle:   "\"别傻傻分不清啦\""
date:       2019-03-19
author:     Ariescat
header-img: img/bg4.jpg
header-mask: 0.1
catalog: true
tags:
    - Spring
---



转载自：[Spring的BeanFactoryPostProcessor和BeanPostProcessor区别](https://blog.csdn.net/zhanyu1/article/details/83114684)



BeanFactoryPostProcessor：BeanFactory后置处理器，是对BeanDefinition对象进行修改。（BeanDefinition：存储bean标签的信息，用来生成bean实例）  
BeanPostProcessor：Bean后置处理器，是对生成的Bean对象进行修改。

### 一、BeanFactoryPostProcessor
该接口源码如下：
```java
public interface BeanFactoryPostProcessor {

	//可以通过beanFactory获取bean定义信息
	void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory) throws BeansException;

}
```
BeanFactoryPostProcessor接口是针对bean容器的，它的实现类**可以在当前BeanFactory初始化（spring容器加载bean定义文件）后，bean实例化之前修改bean的定义属性**，达到影响之后实例化bean的效果。
也就是说，Spring允许BeanFactoryPostProcessor在容器实例化任何其它bean之前读取配置元数据，并可以根据需要进行修改，例如可以把bean的scope从singleton改为prototype，也可以把property的值给修改掉。可以同时配置多个BeanFactoryPostProcessor，并通过设置’order’属性来控制各个BeanFactoryPostProcessor的执行次序。
spring中内置了一些BeanFactoryPostProcessor接口实现类，如下所示：
![](/img/post/BeanFactoryPostProcessor.png)

### 二、BeanPostProcessor
该方法的源码如下：
```java
public interface BeanPostProcessor {

     //bean初始化之前调用
	@Nullable
	default Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
		return bean;
	}
    //bean初始化之后调用
	@Nullable
	default Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
		return bean;
	}
}
```
BeanPostProcessor能在spring容器**实例化bean之后，在执行bean的初始化方法前后**，添加一些自己的处理逻辑。初始化方法包括以下两种：

1、实现InitializingBean接口的bean，对应方法为afterPropertiesSet  
2、xml定义中，通过init-method设置的方法

BeanPostProcessor是BeanFactoryPostProcessor**之后**执行的。
spring中内置了一些BeanPostProcessor接口实现类，如下所示：
![](/img/post/BeanPostProcessor.png)

如果自定义了多个的BeanPostProcessor的实现类，通过实现Ordered接口，设置order属性，可以按照顺序执行实现类的方法。

### 三、例子
1、bean的定义
```java
public class CustomBean implements InitializingBean {
    private String desc;
    private String remark;

    public CustomBean() {
        System.out.println("第二步：执行CustomBean类的无参构造函数");
    }
    public String getDesc() {
        return desc;
    }
    public void setDesc(String desc) {
        System.out.println("第三步：调用setDesc方法");
        this.desc = desc;
    }
    public String getRemark() {
        return remark;
    }
    public void setRemark(String remark) {
        System.out.println("第四步：调用setRemark方法");
        this.remark = remark;
    }
    public void afterPropertiesSet() throws Exception {
        System.out.println("第六步：调用afterPropertiesSet方法");
        this.desc = "在初始化方法中修改之后的描述信息";
    }
    public void initMethod() {
        System.out.println("第七步：调用initMethod方法");
    }
    public String toString() {
        StringBuilder builder = new StringBuilder();
        builder.append("[描述：").append(desc);
        builder.append("， 备注：").append(remark).append("]");
        return builder.toString();
    }
}
```
2、定义BeanFactoryPostProcessor
```java
public class MyBeanFactoryPostProcessor implements BeanFactoryPostProcessor {

    public void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory) throws BeansException {
        System.out.println("第一步：调用MyBeanFactoryPostProcessor的postProcessBeanFactory");
        BeanDefinition bd = beanFactory.getBeanDefinition("customBean");
        MutablePropertyValues pv =  bd.getPropertyValues();
        if (pv.contains("remark")) {
            pv.addPropertyValue("remark", "在BeanFactoryPostProcessor中修改之后的备忘信息");
        }
    }

}
```
3、定义BeanPostProcessor
```java
public class MyBeanPostProcessor implements BeanPostProcessor {

    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
        System.out.println("第五步：BeanPostProcessor，对象" + beanName + "调用初始化方法之前的数据： " + bean.toString());
        return bean;
    }

    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
        System.out.println("第八步：BeanPostProcessor，对象" + beanName + "调用初始化方法之后的数据：" + bean.toString());
        return bean;
    }
}
```
4、定义测试类
```java
public class PostProcessorTest {
        public static void main(String[] args) {
            ApplicationContext context = new ClassPathXmlApplicationContext("spring/postprocessor.xml");
            CustomBean bean = (CustomBean) context.getBean("customBean");
            System.out.println("################ 实例化、初始化bean完成");
            System.out.println("****************下面输出结果");
            System.out.println("描述：" + bean.getDesc());
            System.out.println("备注：" + bean.getRemark());

        }
}
```
运行结果如下：
```java
第一步：调用MyBeanFactoryPostProcessor的postProcessBeanFactory
第二步：执行CustomBean类的无参构造函数
第三步：调用setDesc方法
第四步：调用setRemark方法
第五步：BeanPostProcessor，对象customBean调用初始化方法之前的数据： [描述：原始的描述信息， 备注：在BeanFactoryPostProcessor中修改之后的备忘信息]
第六步：调用afterPropertiesSet方法
第七步：调用initMethod方法
第八步：BeanPostProcessor，对象customBean调用初始化方法之后的数据：[描述：在初始化方法中修改之后的描述信息， 备注：在BeanFactoryPostProcessor中修改之后的备忘信息]
################ 实例化、初始化bean完成
****************下面输出结果
描述：在初始化方法中修改之后的描述信息
备注：在BeanFactoryPostProcessor中修改之后的备忘信息

*************************************************************************
分析以上结果：在bean实例化之前，首先执行BeanFactoryPostProcessor实现类的方法，然后通过调用bean的无参构造函数实例化bean，并调用set方法注入属性值。bean实例化后，执行初始化操作，调用两个初始化方法（两个初始化方法的顺序：先执行afterPropertiesSet，再执行init-method）前后，执行了BeanPostProcessor实现类的两个方法。
```