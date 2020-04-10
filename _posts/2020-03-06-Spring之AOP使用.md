---
layout:     post
title:      Spring之AOP使用
date:       2020-03-06
author:     Ariescat
header-img: img/post-bg-universe.jpg
tags:
    - Java
    - Spring
    - AOP
---



### 在AOP中有几个概念

* 方面（Aspect）

  一个关注点的模块化，这个关注点实现可能另外横切多个对象。事务管理是J2EE应用中一个很好的横切关注点例子。方面用Spring的Advisor或拦截器实现。

* 连接点（Joinpoint）

  程序执行过程中明确的点，如方法的调用或特定的异常被抛出。

* 通知（Advice）

  在特定的连接点，AOP框架执行的动作。各种类型的通知包括“around”、“before”和“throws”通知。

* 切入点（Pointcut）

  指定一个通知将被引发的一系列连接点的集合。AOP框架必须允许开发者指定切入点，例如，使用正则表达式。  

* 织入（Weaving）

  将各方面与目标对象链接起来以创建建议对象的过程

  

以下相关代码请挪步：[study-metis/spring.aop](https://github.com/Ariescat/study-metis/tree/master/spring/src/main/java/com/metis/spring/aop)。这里给出来4种实现方式：代码构造，spring xml配置（aspect和advisor两种），以及注解的实现。

至于他们的底层都是怎么实现的另开章节分享，这里只展示使用。（其实基本离不开那两种代理方式）



### 配置方式使用

在开发过程中，不少有Spring Aop的使用，在面向切面编程时，我们会使用`<aop:aspect>`；在进行事务管理时，我们会使用`<aop:advisor>`。那么，对于`<aop:aspect>`与`<aop:advisor>`的区别，具体是怎样的呢？



至于两者的区别，网上有很多资料，但是似乎都不能说清楚。 

首先，我们需要明确两者的概念。

- `<aop:aspect>`：定义切面（切面包括通知和切点）
- `<aop:advisor>`：定义通知器（通知器跟切面一样，也包括通知和切点）



**实现方式不同**

`<aop:aspect>`定义切面时，只需要定义一般的bean就行，而定义`<aop:advisor>`中引用的通知时，通知必须实现Advice接口。



**搭配不同**

advisor只持有一个Pointcut和一个advice，而aspect可以多个pointcut和多个advice



**结论：使用场景不同**

1. `<aop:advisor>`**大多用于事务管理**。如：

   ```xml
   <tx:advice id="txAdvice" transaction-manager="transactionManager">
       <tx:attributes>
           <!-- 会重复读，不会脏读事务 -->
           <tx:method name="save*" propagation="REQUIRED"/>
           <tx:method name="insert*" propagation="REQUIRED"/>
           <tx:method name="update*" propagation="REQUIRED"/>
           <tx:method name="delete*" propagation="REQUIRED"/>
           <tx:method name="get*" read-only="true"/>
           <tx:method name="*" propagation="REQUIRED"/>
       </tx:attributes>
   </tx:advice>
   
   <aop:config>
       <aop:pointcut id="pointcut" expression="execution(* spring.aop.advisor.*.*(..))"/>
       <aop:advisor advice-ref="txAdvice" pointcut-ref="pointcut"/>
   </aop:config>
   ```

2. `<aop:aspect>`**大多用于日志，缓存**

其实，不管是`<aop:advisor>`还是`<aop:aspect>`最终的实现逻辑是一样的。

可以看出，`<aop:advisor>`和`<aop:aspect>`其实都是将通知和切面进行了封装，原理基本上是一样的，只是使用的方式不同而已。



### 注解方式使用

```java
@Aspect
public class SleepHelperAnno {

    @Pointcut("execution(* *.sleep(..))")
    private void pointcut() {
    }

    @Before("pointcut()")
    public void beforeSleep() {
        System.out.println("睡觉前要脱衣服！");
    }

    @After("pointcut()")
    public void afterSleep() {
        System.out.println("起床后要穿衣服！");
    }

    @AfterThrowing(pointcut = "pointcut()", throwing = "e")
    public void doThrowing(Exception e) {
        System.out.println("Exception" + e.getMessage());
    }
}
```



参考：

[aop:aspect与aop:advisor的区别 / https://blog.csdn.net/corbin_zhang/article/details/80577105](https://blog.csdn.net/corbin_zhang/article/details/80577105)