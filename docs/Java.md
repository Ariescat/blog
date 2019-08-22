---
layout: docs
title: Java
date: 2019-02-01
header-img: "img/post-bg-rwd.jpg"
catalog: true
---

### 思想是灵魂,实现是形式



### 基础

* 语法糖
  
  * [Java中的10颗语法糖](https://www.cnblogs.com/duanxz/p/3916028.html)
  
* string
	
	* [Java中的String有没有长度限制？](https://www.hollischuang.com/archives/3916)
	* StringJoiner（Java 8中提供的可变字符串类）
	
* 集合
	* 集合框架**Koloboke**
		
		> Koloboke的目标是替换标准的Java集合和流的API，提供更高效的实现。
		
	* **跳表** [ConcurrentSkipListMap](https://blog.csdn.net/sunxianghuang/article/details/52221913)
	
	* **红黑树** TreeMap、TreeSet
	
	* HashMap
		
		* [详细梳理JAVA7和JAVA8 HashMap的hash实现](https://blog.csdn.net/u013453787/article/details/84702992)
		
		> 最近它有两个主要的更新——一个在Java 7u40版本中对于空map的共享的底层存储，以及在Java 8中将底层hash bucket链接成为**哈希树**（改进更差情况下的性能）。
		
	* jdk1.7中的线程安全问题 **(resize死循环)**
	
	* DelayQueue
	
	  ScheduledThreadPoolExecutor其任务队列默认是DelayedWorkQueue的变种
	
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

	* Path/Files
	
	  * [IO操作你还在用File吗，该拥抱Path和Files了](https://www.sohu.com/a/132459571_654433)
	
	* **Reactor模式**
	
	* IO操作
	
		* [网络IO中的同步、异步、阻塞和非阻塞](https://drugbean.club/2019/02/14/%E7%BD%91%E7%BB%9CIO%E4%B8%AD%E7%9A%84%E5%90%8C%E6%AD%A5-%E5%BC%82%E6%AD%A5-%E9%98%BB%E5%A1%9E%E5%92%8C%E9%9D%9E%E9%98%BB%E5%A1%9E/)
		* [迄今为止把同步/异步/阻塞/非阻塞/BIO/NIO/AIO讲的最清楚的好文章](https://juejin.im/post/5cff70c0f265da1ba56b14fd)
		> **同步、异步：**  
		 >
		 > * 概念：消息的通知机制
		 > * 解释：涉及到IO通知机制；所谓同步，就是发起调用后，被调用者处理消息，必须等处理完才直接返回结果，**没处理完之前是不返回的，调用者主动等待结果**；所谓异步，就是发起调用后，被调用者直接返回，但是并没有返回结果，等处理完消息后，通过状态、通知或者回调函数来通知调用者，调用者被动接收结果。
		 > 
		>  **阻塞、非阻塞：**
		 > * 概念：**程序等待调用结果时的状态**
		 > * 解释：涉及到CPU线程调度；所谓阻塞，就是调用结果返回之前，该执行线程会被挂起，不释放CPU执行权，线程不能做其它事情，只能等待，只有等到调用结果返回了，才能接着往下执行；所谓非阻塞，就是在没有获取调用结果时，不是一直等待，线程可以往下执行，如果是同步的，通过轮询的方式检查有没有调用结果返回，如果是异步的，会通知回调。
		
	* 为什么要用 `close()` 关掉流？
	
	  有些资源 `GC` 回收不掉？

### 设计模式

- [设计模式 - 菜鸟教程](http://www.runoob.com/design-pattern/design-pattern-tutorial.html)

### 并发

* 线程状态
	* [Java线程的6种状态及切换(透彻讲解)](https://blog.csdn.net/pange1991/article/details/53860651)
	* [Java中一个线程只有六个状态。至于阻塞、可运行、挂起状态都是人们为了便于理解，自己加上去的](https://www.cnblogs.com/GooPolaris/p/8079490.html)
	
* synchronized

* monitor对象

* volatile 

  [既生synchronized，何生volatile？！](https://www.hollischuang.com/archives/3928)

  [彻底搞懂synchronized(从偏向锁到重量级锁)](https://blog.csdn.net/qq_38462278/article/details/81976428)

* [线程池](http://novoland.github.io/%E5%B9%B6%E5%8F%91/2014/07/26/Executor%20%E4%B9%8B%20%E7%BA%BF%E7%A8%8B%E6%B1%A0%E5%8F%8A%E5%AE%9A%E6%97%B6%E5%99%A8.html)  
	
	* 拒绝服务的方式
	* ScheduledThreadPoolExecutor
	  * [ScheduledThreadPoolExecutor原理](https://blog.csdn.net/luanmousheng/article/details/77816412)

	《阿里巴巴Java开发手册》中强制线程池不允许使用 Executors 去创建，而是通过 ThreadPoolExecutor 的方式，这样的处理方式让写的同学更加明确线程池的运行规则，规避资源耗尽的风险
	
	Executors 返回线程池对象的弊端如下：
	> FixedThreadPool 和 SingleThreadExecutor ： 允许请求的队列长度为 Integer.MAX_VALUE ，可能堆积大量的请求，从而导致OOM。  
	> CachedThreadPool 和 ScheduledThreadPool ： 允许创建的线程数量为 Integer.MAX_VALUE ，可能会创建大量线程，从而导致OOM。
	
* Atomic
	* **AQS**（[AbstractQueuedSynchronizer](https://blog.51cto.com/14220760/2390586?source=dra)）
    
	  > * AQS框架借助于两个类：
	  >
	  > 1. Unsafe（提供CAS操作）
	  > 2. [LockSupport](https://www.jianshu.com/p/e3afe8ab8364)（提供park/unpark操作）
	  >
	  > * 与Object类的wait/notify机制相比，park/unpark有两个优点：
	  >
      > 1. 以thread为操作对象更符合阻塞线程的直观定义
	  > 2. 操作更精准，可以准确地唤醒某一个线程（notify随机唤醒一个线程，notifyAll唤醒所有等待的线程），增加了灵活性。
	  
	  * CountDownLatch、CyclicBarrier和Semaphore
	  * AbstractFuture (一旦调用get就会阻塞)
	
* 并发容器
	* CopyOnWriteArrayList、ConcurrentLinkedQueue ...
	
	* ConcurrentHashMap (JDK8)、ConcurrentHashMapV8 (netty提供)
	
		* computeIfAbsent
	
	* SkipList（跳表）
	
	* ConcurrentSkipListMap（使用跳表实现Map）  
		
		> 和使用哈希算法实现Map的另外一个不同之处是：哈希并不会保存元素的顺序，而跳表内所有的元素都是排序的。因此在对跳表进行遍历时，你会得到一个有序的结果。所以，如果你的应用需要有序性，那么跳表就是你不二的选择。
	
* **ForkJoin**

* [Java并发问题--乐观锁与悲观锁以及乐观锁的一种实现方式-CAS](http://www.cnblogs.com/qjjazry/p/6581568.html)

* WeakReference 和 ReferenceQueue

* JDK Unsafe类
  * objectFieldOffset
  * compareAndSwap...
  
* **Future**

  在并发编程中，我们经常用到非阻塞的模型，在之前的多线程的三种实现中，不管是继承thread类还是实现runnable接口，都无法保证获取到之前的执行结果。通过实现Callback接口，并用Future可以来接收多线程的执行结果。

  Future表示一个可能还没有完成的异步任务的结果，针对这个结果可以添加Callback以便在任务执行成功或失败后作出相应的操作。

  * Guava——AbstractFuture

### QA

* 计算机内存模型 与 Java内存模型

* GC

  * static 会被GC回收吗？static的在内存中的存放位置？
  * 永久代不够会触发Full GC吗

* 锁

  * synchronized或其他锁的产生的阻塞，其和wait的区别？

  * 当一个线程的时间片耗尽之后，其synchronized的代码会发生原子性问题吗？

    线程1在执行`monitorenter`指令的时候，会对Monitor进行加锁，加锁后其他线程无法获得锁，除非线程1主动解锁。即使在执行过程中，由于某种原因，比如CPU时间片用完，线程1放弃了CPU，但是，他并没有进行解锁。而由于`synchronized`的锁是可重入的，下一个时间片还是只能被他自己获取到，还是会继续执行代码。直到所有代码执行完。这就保证了原子性。

  * JDK1.6后对锁进行的优化，轻量级锁，偏向锁，锁消除，适应性自旋锁，锁粗化 (自旋锁在1.4就有，只不过默认的是关闭的，jdk1.6是默认开启的)

* [国内Java面试总是问StringBuffer，StringBuilder区别是啥？档次为什么这么低？](https://www.hollischuang.com/archives/3912)

### 其他

* Reactor模式
	* [Reactor模式详解](https://www.cnblogs.com/winner-0715/p/8733787.html)
	* [高性能IO之Reactor模式](https://www.cnblogs.com/doit8791/p/7461479.html)
	
* Actor模型
	* [Java并发的四种风味](http://www.importnew.com/14506.html) 
	* Akka
	
* 协程

  > 协程，英文Coroutines，是一种比线程更加轻量级的存在。正如一个进程可以拥有多个线程一样，一个线程也可以拥有多个协程。最重要的是，**协程不是被操作系统内核所管理，而完全是由程序所控制**（也就是在用户态执行）。
  >
  > Java语言并没有对协程的原生支持，但是某些开源框架模拟出了协程的功能，有兴趣的小伙伴可以看一看Kilim框架的源码

* JMX

* jsvc

  > 在linux上以服务的方式启动java程序，需要提前安装jsvc。linux是利用daemon(jsvc)构建java守护进程。

### Java 8

- parallelStream

- 元空间（Metaspace）

- Supplier接口和Consumer接口 （JDK8以下可用guava替代）

  梦爷的FileLoader优化用到了Supplier

### Java 9

* Reactive Streams
* Flow API

### JVM

* ClassLoader
	* [ClassLoader那事儿](https://www.cnblogs.com/nedhome/p/9053132.html)
* 热更
	* [CSDN·自定义classloader实现JAVA热替换](https://blog.csdn.net/puhaiyang/article/details/78165465)
	* [动态加载class文件](https://zheng12tian.iteye.com/blog/1495037)
  * [游戏服务器之Java热更新](https://www.cnblogs.com/wgslucky/p/9127681.html)
* 局部变量表中的Slot
* [Monitor对象](https://blog.csdn.net/super_x_man/article/details/81741073)
* 内存模型
	* [《深入理解 Java 内存模型》读书笔记 - 掘金](https://juejin.im/post/5a98c6a16fb9a028cd448965?utm_source=gold_browser_extension)
	* [全面理解Java内存模型(JMM)及volatile关键字 - CSDN博客](http://blog.csdn.net/javazejian/article/details/72772461)
* HotSpot虚拟机
  * 解释执行
    * 逐条将字节码翻译成机器码并执行
  * 即时编译（Just-in-time ，JIT）
    * 将一个方法中包含的所有字节码编译成机器码后再执行。

### 性能调优

* jps、jmap、jstack、jstat

  jstat -gcutil

* VisualVM
	
	* [使用 VisualVM 进行性能分析及调优](https://www.ibm.com/developerworks/cn/java/j-lo-visualvm/)
* [Arthas使用指南](https://segmentfault.com/a/1190000014618329?utm_source=tag-newest)  
	Arthas 是基于 Greys 进行二次开发的全新在线诊断工具


### 图形
* [Polygon](https://segmentfault.com/a/1190000007736473)，区域超区校验


### 常遇的报错与坑
* [ConcurrentModificationException](https://www.2cto.com/kf/201403/286536.html)
* [疫苗：JAVA HASHMAP的死循环](https://coolshell.cn/articles/9606.html)