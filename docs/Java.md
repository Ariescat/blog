---
layout: docs
title: Java
date: 2019-02-01
header-img: "img/post-bg-rwd.jpg"
catalog: true
---

### 基础
* string
	* StringJoiner（Java 8中提供的可变字符串类）

* 集合
	* 集合框架**Koloboke**  
		> Koloboke的目标是替换标准的Java集合和流的API，提供更高效的实现。
	* **跳表** [ConcurrentSkipListMap](https://blog.csdn.net/sunxianghuang/article/details/52221913)
	* **红黑树** TreeMap、TreeSet
	* HashMap
		* [详细梳理JAVA7和JAVA8 HashMap的hash实现](https://blog.csdn.net/u013453787/article/details/84702992)
		* jdk1.7中的线程安全问题 **(resize死循环)**

* 代理  
	按照代理的创建时期，代理类可以分为两种。 
	> 静态代理：由程序员创建或特定工具自动生成源代码，再对其编译。在程序运行前，代理类的.class文件就已经存在了。  
	> 动态代理：在程序运行时，运用反射机制动态创建而成。  
	Cglib动态代理 
	> JDK的动态代理机制只能代理实现了接口的类，而不能实现接口的类就不能实现JDK的动态代理，cglib是针对类来实现代理的，他的原理是对指定的目标类生成一个子类，并覆盖其中方法实现增强，但因为采用的是继承，所以不能对final修饰的类进行代理。
	
	* [java动态代理（JDK和cglib）](http://www.cnblogs.com/jqyp/archive/2010/08/20/1805041.html)
	* [Cglib及其基本使用](https://www.cnblogs.com/xrq730/p/6661692.html)

* IO
	* IO流
		* [管道流(Piped Stream)](https://www.cnblogs.com/skywang12345/p/io_04.html)
		* RandomAccessFile, java.io包中是一个特殊的类, 既可以读文件，也可以写文件。

	* IO操作
		* [IO操作你还在用File吗，该拥抱Path和Files了](https://www.sohu.com/a/132459571_654433)

	* 同步、异步、阻塞和非阻塞
		> **同步、异步：**  
		> * 概念：消息的通知机制
		> * 解释：涉及到IO通知机制；所谓同步，就是发起调用后，被调用者处理消息，必须等处理完才直接返回结果，**没处理完之前是不返回的，调用者主动等待结果**；所谓异步，就是发起调用后，被调用者直接返回，但是并没有返回结果，等处理完消息后，通过状态、通知或者回调函数来通知调用者，调用者被动接收结果。
		
		> **阻塞、非阻塞：**  
		> * 概念：**程序等待调用结果时的状态**
		> * 解释：涉及到CPU线程调度；所谓阻塞，就是调用结果返回之前，该执行线程会被挂起，不释放CPU执行权，线程不能做其它事情，只能等待，只有等到调用结果返回了，才能接着往下执行；所谓非阻塞，就是在没有获取调用结果时，不是一直等待，线程可以往下执行，如果是同步的，通过轮询的方式检查有没有调用结果返回，如果是异步的，会通知回调。
		
		* [网络IO中的同步、异步、阻塞和非阻塞](https://drugbean.club/2019/02/14/%E7%BD%91%E7%BB%9CIO%E4%B8%AD%E7%9A%84%E5%90%8C%E6%AD%A5-%E5%BC%82%E6%AD%A5-%E9%98%BB%E5%A1%9E%E5%92%8C%E9%9D%9E%E9%98%BB%E5%A1%9E/)
		* [迄今为止把同步/异步/阻塞/非阻塞/BIO/NIO/AIO讲的最清楚的好文章](https://juejin.im/post/5cff70c0f265da1ba56b14fd)

* 并发
	* 线程状态
		* [Java线程的6种状态及切换(透彻讲解)](https://blog.csdn.net/pange1991/article/details/53860651)
		* [Java中一个线程只有六个状态。至于阻塞、可运行、挂起状态都是人们为了便于理解，自己加上去的](https://www.cnblogs.com/GooPolaris/p/8079490.html)
	* synchronized
	* volatile 
	* 线程池  
		* ScheduledThreadPoolExecutor
			* [ScheduledThreadPoolExecutor原理](https://blog.csdn.net/luanmousheng/article/details/77816412)
		
		《阿里巴巴Java开发手册》中强制线程池不允许使用 Executors 去创建，而是通过 ThreadPoolExecutor 的方式，这样的处理方式让写的同学更加明确线程池的运行规则，规避资源耗尽的风险

		Executors 返回线程池对象的弊端如下：
		> FixedThreadPool 和 SingleThreadExecutor ： 允许请求的队列长度为 Integer.MAX_VALUE,可能堆积大量的请求，从而导致OOM。  
		> CachedThreadPool 和 ScheduledThreadPool ： 允许创建的线程数量为 Integer.MAX_VALUE ，可能会创建大量线程，从而导致OOM。
	* Atomic
		* AQS
		* CountDownLatch、CyclicBarrier和Semaphore

	* 并发容器
		* ConcurrentHashMap、CopyOnWriteArrayList、ConcurrentLinkedQueue ...
		* SkipList（跳表）
		* ConcurrentSkipListMap（使用跳表实现Map）  
			> 和使用哈希算法实现Map的另外一个不同之处是：哈希并不会保存元素的顺序，而跳表内所有的元素都是排序的。因此在对跳表进行遍历时，你会得到一个有序的结果。所以，如果你的应用需要有序性，那么跳表就是你不二的选择。
	* [Java并发问题--乐观锁与悲观锁以及乐观锁的一种实现方式-CAS](http://www.cnblogs.com/qjjazry/p/6581568.html)


### 其他
* Reactor模式
	* [Reactor模式详解](https://www.cnblogs.com/winner-0715/p/8733787.html)
	* [高性能IO之Reactor模式](https://www.cnblogs.com/doit8791/p/7461479.html)

* ForkJoin
* Actor模型
	* [Java并发的四种风味](http://www.importnew.com/14506.html) 
	* Akka

### JMX

### JVM
* 热更
	* [动态加载class文件](https://zheng12tian.iteye.com/blog/1495037)
	* [游戏服务器之Java热更新](https://www.cnblogs.com/wgslucky/p/9127681.html)
* ClassLoader
	* [CSDN·自定义classloader实现JAVA热替换](https://blog.csdn.net/puhaiyang/article/details/78165465)
	* [百度·自定义classloader实现JAVA热替换](https://www.baidu.com/s?ie=utf8&oe=utf8&wd=自定义classloader实现JAVA热替换&tn=98010089_dg&ch=4)
* 局部变量表中的Slot
* [Monitor对象](https://blog.csdn.net/super_x_man/article/details/81741073)
* 内存模型
	* [《深入理解 Java 内存模型》读书笔记 - 掘金](https://juejin.im/post/5a98c6a16fb9a028cd448965?utm_source=gold_browser_extension)
	* [全面理解Java内存模型(JMM)及volatile关键字 - CSDN博客](http://blog.csdn.net/javazejian/article/details/72772461)


### Java8
* parallelStream
* 元空间（Metaspace）


### 性能调优
* VisualVM
	* [使用 VisualVM 进行性能分析及调优](https://www.ibm.com/developerworks/cn/java/j-lo-visualvm/)


### 引用
* WeakReference 和 ReferenceQueue


### JDK Unsafe类
* objectFieldOffset
* compareAndSwap...


### 语法糖
* [Java中的10颗语法糖](https://www.cnblogs.com/duanxz/p/3916028.html)


### 设计模式
* [设计模式 - 菜鸟教程](http://www.runoob.com/design-pattern/design-pattern-tutorial.html)


### 图形
* [Polygon](https://segmentfault.com/a/1190000007736473)，区域超区校验


### 常遇的报错与坑
* [ConcurrentModificationException](https://www.2cto.com/kf/201403/286536.html)
* [疫苗：JAVA HASHMAP的死循环](https://coolshell.cn/articles/9606.html)