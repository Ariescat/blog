---
layout:     post
title:      List#subList和Spring#split的使用陷阱
subtitle:   "\"使用不当会引起内存泄漏！！\""
date:       2019-02-15
author:     Ariescat
header-img: img/pixabay/sunset-4499023_1280.jpg
header-mask: 0.4
catalog: true
tags:
    - Java
---

## 前言
如果Java应用程序出现了内存泄露，千万别着急着把应用杀掉，而是要保存现场。如果是互联网应用，可以把流量切到其他服务器。保存现场的目的就是为了把 **运行中JVM的heap** dump下来。

## 正文
裁剪`List`的时候这样子使用的话就会有一个引发内存泄漏的陷阱：
```java  
    myList = myList.subList(fromIndex, toIndex);
```
特别是在循环调用的时候。

来看看源码一探究竟：
```java
    public List<E> subList(int fromIndex, int toIndex) {
        subListRangeCheck(fromIndex, toIndex, size);
        return new SubList(this, 0, fromIndex, toIndex);
    }
```
  
```java
    SubList(AbstractList<E> parent,
            int offset, int fromIndex, int toIndex) {
        this.parent = parent;
        this.parentOffset = fromIndex;
        this.offset = offset + fromIndex;
        this.size = toIndex - fromIndex;
        this.modCount = ArrayList.this.modCount;
    }
```
在`new`出的`SubList`里保留着一份父引用。

同样，在`String`的`split`里，它最终会调用到`String#substring`
```java
    new String(value, beginIndex, subLen);
```
这里同样传了一份父引用`value`进去。

### 是否Bug
为了避免内存拷贝、加快速度，Sun JDK直接复用了原`String`对象的`char[]`，偏移量和长度来标识不同的字符串内容。也就是说，`subString`出来的`String`小对象 仍然会指向原`String`大对象的`char[]`，`split`也是同样的情况。

虽然，`subString`和`split`的实现造成了现在的问题，但是这能否算`String`类的bug呢？个人觉得不好说。因为这样的优化是比较合理 的，`subString`和`spit`的结果肯定是原字符串的连续子序列。只能说，`String`不仅仅是一个核心类，它对于JVM来说是与原始类型同等重要的 类型。

JDK实现对`String`做各种可能的优化都是可以理解的。但是优化带来了忧患，我们程序员足够了解他们，才能用好他们。

### 参考
[分析内存泄露的一般步骤](https://blog.csdn.net/ggy101600/article/details/53993487)