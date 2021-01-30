---
layout:     post
title:      Java集合框架Koloboke
date:       2019-02-26
author:     Ariescat
header-img: img/cover/126212.png
tags:
    - Java
---

Koloboke的目标是**替换标准的Java集合和流的API**，提供更高效的实现。Koloboke目前的版本主要是替换`java.util.HashSet`和`java.util.HashMap`。

Koloboke提供了一套完整的集合原始类型的实现，可以**避免开销很大的装箱/拆箱操作，节省了原始类型装箱消耗的内存**。

在Koloboke中，HashSet和HashMap比其它专门的实现（比如GS collections、fastutil、HTTP & Trove）要更快，这是因为：

1）相比于其它库，Koloboke对每个entry使用了更少的内存  
2）Koloboke目标是把键和值存储在同一行高速缓存中  
3）所有的方法都经过了实现优化，而不是像AbstractSet类或AbstractMap类那样委托给框架类（Skeleton Class）

Koloboke的官网： [http://chronicle.software/products/koloboke-collections/](http://chronicle.software/products/koloboke-collections/)

Koloboke的特征：  
1）极好的兼容Java集合框架（JCF，Java Collections Framework）   
2）所有原始专门的集合类都继承了基本的接口（比如Collection、Set、Map）  
3）可用于替换标准的JCF  
4）Koloboke API for Java 6 and Java 7向前兼容Java 8的新方法   
5）快速失败的语义  
6）支持null键（可选的），就像java.util.HashMap中的Float.NaN和Double.NaN键的处理那样。

#### 什么时候使用Chronicle Map或Koloboke Map？

使用Chronicle Map的场景：  
1）存储的entry超过5亿条  
2）在进程之间分布Map  
3）使用堆外内存（Off-Heap Memory），因为键和值占用了太多的内存，JVM遭遇GC的痛苦

当不想在进程间共享数据，且存储的entry在5亿条以内，那么Koloboke是更理想的选择。

Koloboke目前的最新版本为0.6.8版。可以从Maven仓库使用它：
```xml
<dependency>
    <groupId>net.openhft</groupId>
    <artifactId>koloboke-api-jdk8</artifactId>
    <version>0.6.8</version>
</dependency>
<dependency>
    <groupId>net.openhft</groupId>
    <artifactId>koloboke-impl-jdk8</artifactId>
    <version>0.6.8</version>
</dependency>
```

Gradle依赖为
```groovy
dependencies {
    // `jdk8` instead of `jdk6-7` if you use Java 8
    compile 'net.openhft:koloboke-api-jdk6-7:0.6.8'
    runtime 'net.openhft:koloboke-impl-jdk6-7:0.6.8'
}
```