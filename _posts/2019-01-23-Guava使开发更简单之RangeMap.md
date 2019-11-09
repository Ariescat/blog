---
layout:     post
title:      Guava使开发更简单之RangeMap
subtitle:   "\"在范围内取值，RangeMap简直不要太方便~~\""
date:       2019-01-23
author:     Ariescat
header-img: img/post-bg-debug.png
catalog: true
tags:
    - Java
    - Guava
---

## 简介
RangeMap是一种集合类型(collection type),它将**不相交、且不为空**的Range(key)映射给一个值(Value)。RangeMap跟一般的Map一样,存储键值对,按照键来取值。不同于Map的是键的类型必须是Range,也既是一个区间。

和RangeSet一样,实现RangeMap也是一个接口,实现它的也只有两个类,分别为ImmutableRangeMap和**TreeRangeMap**。用的多的还是TreeRangeMap,下面主要以TreeRangeMap来说明RangeMap。TreeRangeMap是key有序的。具体区间排序规则就不再说了。

## 基础用法
#### 添加/删除
```java
RangeMap<Integer, Integer> rangeMap = TreeRangeMap.create();
rangeMap.put(Range.closed(1, 10), 1);
System.out.println(rangeMap);

rangeMap.put(Range.open(3, 6), 2);
System.out.println(rangeMap);

rangeMap.put(Range.openClosed(10, 20), 3);
System.out.println(rangeMap);

rangeMap.put(Range.closed(20, 20), 4);
rangeMap.remove(Range.closed(5, 11));
System.out.println(rangeMap);
```
#### 输出结果：
```java
[[1..10]=1]
[[1..3]=1, (3..6)=2, [6..10]=1]
[[1..3]=1, (3..6)=2, [6..10]=1, (10..20]=3]
[[1..3]=1, (3..5)=2, (11..20)=3, [20..20]=4]
```
#### note
1. 如果TreeRangeMap要插入的区间与TreeRangeMap已保存的区间发生重叠,那么TreeRangeMap会对之前的区间切割,保留当前插入区间的完整性。
2. 和RangeSet不一样,RangeMap不可以将相邻的区间合并,即使这个区间映射的值是一样的。
3. 其中TreeRangeMap是key有序的。


### 查询
```java
System.out.println(rangeMap.get(15));
System.out.println(rangeMap.get(6));
```
输出结果：
```java
3
null
```
### 遍历
```java
    Map<Range<Integer>, Integer> map = rangeMap.asMapOfRanges();
    Set<Map.Entry<Range<Integer>, Integer>> entrySet = map.entrySet();
    Set<Range<Integer>> keySet = map.keySet();
    Collection<Integer> values = map.values();
```
`asMapOfRanges()`方法得到RangeMap的Map<Range, V>视图,我们可以利用它来遍历RangeMap。


## 后记
以上是Guava之RangeMap学习小结的内容。

—— Ariescat 记于 2019.01.23