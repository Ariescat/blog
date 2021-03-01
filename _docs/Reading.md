---
layout: post
title: "Reading"
subtitle: "\"读书笔记（不断收集整理中...）\""
date: 2021-01-15
date-type: "continue"
author: Ariescat
header-img: "img/cover/166758.jpg"
catalog: true
---



#  Effective Java

### 第四章 类和接口

##### 第17条：使可变性最小化

- 不可变对象本质上是线程安全的，它们不要求同步。
- BigInteger和BitSet
- BigInteger和BigDecimal：BigInteger实现了任意精度的整数运算，BigDecimal实现了任意精度的浮点数运算。

##### 第18条：复合优先于继承

- 只有当两者之间确实存在“ is-a ”关系的时候，类B才应该扩展类A，否则B 应该包含 

  A的一个私有实例，并且暴露一个较小的、较简单的 API。

  JDK中如`Stack<E> extends Vector<E>`，`Properties extends Hashtable<Object,Object>`都违反该原则，采用复合更优。

# 设计模式之美

### 01 为什么要尽早地学习并掌握设计模式相关知识

我理解的设计模式主要功能是：解耦和扩展

### 02 从哪些维度评判代码质量的好坏？如何具备写出高质量代码的能力？

思从深而行从简，真正的高手能云淡风轻地用最简单的方法解决最复杂的问题。这也是一个编程老手跟编程新手的本质区别之一。

### 03 面向对象、设计原则、设计模式、编程规范、重构，这五者有何关系？

贫血模型和充血模型