---
layout: docs
title: "ReadingNote"
subtitle: "\"读书笔记（不断收集整理中...）\""
date: 2021-01-15
author: Ariescat
header-img: "img/bg7.jpg"
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

