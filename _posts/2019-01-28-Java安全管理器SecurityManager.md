---
layout:     post
title:      Java安全管理器SecurityManager
subtitle:   "\"在运行阶段检查需要保护的资源的访问权限及其它规定的操作权限，保护系统免受恶意操作攻击\""
date:       2019-01-28
author:     Ariescat
header-img: img/post-bg-kuaidi.jpg
catalog: true
tags:
    - Java
---

## 前言
大家在阅读源码（特别是类库）的时候，是不是会发现这样的代码，然后在想这个是做什么的：
```java
SecurityManager security = System.getSecurityManager();
if (security != null) {
	security.checkRead(path);
}
```
## Java安全
总的来说，java安全应该包括两个方面的内容：一是Java平台（即是Java运行环境）的安全性；二是Java语言开发的应用程序的安全性。由于我们不是Java本身语言的制定开发者，所以第一个安全性不需要我们考虑。其中第二个安全性是我们重点考虑的问题，一般我们可以通过安全管理器机制来完善安全性，安全管理器是安全的实施者，可对此类进行扩展，它提供了加在应用程序上的安全措施，通过配置安全策略文件达到对网络、本地文件和程序其它部分的访问限制的效果。

## SecurityManager
```java
SecurityManager sm = System.getSecurityManager();
```
安全管理器是允许应用程序实施安全策略的类。 它允许应用程序在执行可能不安全或敏感的操作之前确定操作是什么以及是否在允许执行操作的安全上下文中尝试。 应用程序可以允许或禁止操作。 
`SecurityManager`类包含许多方法，名称以`check`开头。 在这些方法执行某些潜在的敏感操作之前，这些方法在Java库中被各种方法所调用。 调用这样的`check`方法通常如下所示：
```java
SecurityManager security = System.getSecurityManager();
if (security != null) {
	security.checkXXX(argument,  . . . );
}
```
### 启动
默认情况下，java程序启动时，并不会启动安全管理器，`System.getSecurityManager()`为`null`。启动的方法有隐式和显示两种，都比较简单，可自行搜索。

这里还可以指定自己的安全策略文件，默认的安全策略文件位于`%JAVA_HOME%/jre/lib/security/java.policy`，有兴趣可了解一下。

### 应用场景
当运行未知的Java程序的时候，该程序可能有恶意代码（删除系统文件、重启系统等），为了防止运行恶意代码对系统产生影响，需要对运行的代码的权限进行控制，这时候就要启用Java安全管理器。

## java中的权限类别
```java
java.security.AllPermission --所有权限的集合 
java.util.PropertyPermission --系统/环境属性权限 
java.lang.RuntimePermission --运行时权限 
java.net.SocketPermission --Socket权限 
java.io.FilePermission --文件权限,包括读写,删除,执行 
java.io.SerializablePermission --序列化权限 
java.lang.reflect.ReflectPermission --反射权限 
java.security.UnresolvedPermission --未解析的权限 
java.net.NetPermission --网络权限 
java.awt.AWTPermission --AWT权限 
java.sql.SQLPermission --数据库sql权限 
java.security.SecurityPermission --安全控制方面的权限 
java.util.logging.LoggingPermission --日志控制权限 
javax.net.ssl.SSLPermission --安全连接权限 
javax.security.auth.AuthPermission --认证权限 
javax.sound.sampled.AudioPermission --音频系统资源的访问权限 
```
## 后记
今天在看`File`的`listFiles()`方法的源码时发现有用到`SecurityManager`来`checkRead(path)`，出于好奇其作用，了解后总结此文。

- [Java安全管理器——SecurityManager](https://blog.csdn.net/hjh200507609/article/details/50330773)

—— Ariescat 记于 2019.01.28