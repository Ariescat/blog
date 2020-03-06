---
layout: docs
title: Java
date: 2019-02-01
header-img: "img/post-bg-rwd.jpg"
catalog: true
---

> **思想是灵魂,实现是形式**

### String

- [Java中的String有没有长度限制？](https://www.hollischuang.com/archives/3916)
  - 数组呢？
- StringJoiner（Java 8中提供的可变字符串类）

### 集合

- HashMap

  - [详细梳理JAVA7和JAVA8 HashMap的hash实现](https://blog.csdn.net/u013453787/article/details/84702992)

  > 最近它有两个主要的更新——一个在Java 7u40版本中对于空map的共享的底层存储，以及在Java 8中将底层hash bucket链接成为**哈希树**（改进更差情况下的性能）。

  - jdk1.7中的线程安全问题 **(resize死循环)**

  - jdk8中是如何解决jdk7中的HashMap死循环的

- jdk8 ConcurrentHashMap 

  - 死循环：

     [ConcurrentHashMap BUG 死锁](https://blog.csdn.net/zhanglong_4444/article/details/93638844)

  - 死锁（该问题由fly提出并收录）：

    ```java
    ConcurrentHashMap<Integer, Integer> map = new ConcurrentHashMap<>();
    map.put(1, 1);
    map.put(2, 2);
    Thread t1 = new Thread(() -> {
        LockSupport.parkNanos(TimeUnit.SECONDS.toNanos(2));
        map.computeIfAbsent(4, key -> {
            map.clear();
            System.out.println("4");
            return key;
        });
    });
    Thread t2 = new Thread(() -> {
        LockSupport.parkNanos(TimeUnit.SECONDS.toNanos(2));
        map.computeIfAbsent(3, key -> {
            map.clear();
            System.out.println("3");
            return key;
        });
    });
    t1.start();
    t2.start();
    t1.join();
    t2.join();
    System.out.println("finish");
    ```

    ConcurrentHashMap 1194行会死锁

    ![deadlock](imgs/1579494015304.png)
  
- **红黑树** TreeMap、TreeSet

- 其他

  - WeakHashMap

  - **跳表** [ConcurrentSkipListMap](https://blog.csdn.net/sunxianghuang/article/details/52221913)

  - DelayQueue

    ScheduledThreadPoolExecutor其任务队列默认是DelayedWorkQueue的变种

- 第三方原始类型集合库**Koloboke**，避免大量的装箱拆箱，同类型的还有HPPC，Eclipse Collections等

  > Koloboke的目标是替换标准的Java集合和流的API，提供更高效的实现。

### 代理

按照代理的创建时期，代理类可以分为两种。 

> 静态代理：由程序员创建或特定工具自动生成源代码，再对其编译。在程序运行前，代理类的.class文件就已经存在了。
> 动态代理：在程序运行时，运用反射机制动态创建而成。

Cglib动态代理 

> JDK的动态代理机制只能代理实现了接口的类，而不能实现接口的类就不能实现JDK的动态代理，cglib是针对类来实现代理的，他的原理是对指定的目标类生成一个子类，并覆盖其中方法实现增强，但因为采用的是继承，所以不能对final修饰的类进行代理。

[Cglib 与 JDK动态代理](https://my.oschina.net/xiaolyuh/blog/3108376)

### IO

- IO流

  - [管道流(Piped Stream)](https://www.cnblogs.com/skywang12345/p/io_04.html)
  - RandomAccessFile, java.io包中是一个特殊的类, 既可以读文件，也可以写文件。

- Path/Files

  - [IO操作你还在用File吗，该拥抱Path和Files了](https://www.sohu.com/a/132459571_654433)

- IO概念

  - [网络IO中的同步、异步、阻塞和非阻塞](https://drugbean.club/2019/02/14/%E7%BD%91%E7%BB%9CIO%E4%B8%AD%E7%9A%84%E5%90%8C%E6%AD%A5-%E5%BC%82%E6%AD%A5-%E9%98%BB%E5%A1%9E%E5%92%8C%E9%9D%9E%E9%98%BB%E5%A1%9E/)
  - [迄今为止把同步/异步/阻塞/非阻塞/BIO/NIO/AIO讲的最清楚的好文章](https://juejin.im/post/5cff70c0f265da1ba56b14fd)

  > **同步、异步：**  
  >
  > - 概念：消息的通知机制
  > - 解释：涉及到IO通知机制；所谓同步，就是发起调用后，被调用者处理消息，必须等处理完才直接返回结果，**没处理完之前是不返回的，调用者主动等待结果**；所谓异步，就是发起调用后，被调用者直接返回，但是并没有返回结果，等处理完消息后，通过状态、通知或者回调函数来通知调用者，调用者被动接收结果。
  >
  > **阻塞、非阻塞：**
  >
  > - 概念：**程序等待调用结果时的状态**
  > - 解释：涉及到CPU线程调度；所谓阻塞，就是调用结果返回之前，该执行线程会被挂起，不释放CPU执行权，线程不能做其它事情，只能等待，只有等到调用结果返回了，才能接着往下执行；所谓非阻塞，就是在没有获取调用结果时，不是一直等待，线程可以往下执行，如果是同步的，通过轮询的方式检查有没有调用结果返回，如果是异步的，会通知回调。

- JDK NIO

  - Selector,Buffer
  
- **Reactor模式**

- 为什么要用 `close()` 关掉流？

  有些资源 `GC` 回收不掉？

### **线程**&并发

- 线程

  - 线程状态
    - 其实可以直接查看源码`{@see java.lang.Thread.State}`，里面的注释内容讲解得很清楚了
    - [Java线程的6种状态及切换(透彻讲解)](https://blog.csdn.net/pange1991/article/details/53860651)
    - [Java中一个线程只有六个状态。至于阻塞、可运行、挂起状态都是人们为了便于理解，自己加上去的](https://www.cnblogs.com/GooPolaris/p/8079490.html)
  - 线程中断
    - ？何时抛出 `{@see java.lang.InterruptedException}`

- [线程池](http://novoland.github.io/%E5%B9%B6%E5%8F%91/2014/07/26/Executor%20%E4%B9%8B%20%E7%BA%BF%E7%A8%8B%E6%B1%A0%E5%8F%8A%E5%AE%9A%E6%97%B6%E5%99%A8.html)  

  - **三种队列**

    > ？`SynchronousQueue`误区：很多人把其认为其没有容量，不存储元素，这是错的。

  - 拒绝服务的方式

  - ThreadPoolExecutor和ScheduledThreadPoolExecutor原理

    - [ScheduledThreadPoolExecutor原理](https://blog.csdn.net/luanmousheng/article/details/77816412)

  《阿里巴巴Java开发手册》中强制线程池不允许使用 Executors 去创建，而是通过 ThreadPoolExecutor 的方式，这样的处理方式让写的同学更加明确线程池的运行规则，规避资源耗尽的风险

  Executors 返回线程池对象的弊端如下：

  > FixedThreadPool 和 SingleThreadExecutor ： 允许请求的队列长度为 Integer.MAX_VALUE ，可能堆积大量的请求，从而导致OOM。  
  > CachedThreadPool 和 ScheduledThreadPool ： 允许创建的线程数量为 Integer.MAX_VALUE ，可能会创建大量线程，从而导致OOM。

  - 线程池运行状态**【这里有空要详细看看】**

    ![](https://img-blog.csdnimg.cn/20191216171812869.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzIwNzA1Ng==,size_16,color_FFFFFF,t_70)

  - `shutdown()`, `shutdownNow()`和`awaitTermination()`

- 锁

  - synchronized
- monitor对象
  - [彻底搞懂synchronized(从偏向锁到重量级锁)](https://blog.csdn.net/qq_38462278/article/details/81976428)

- volatile 

  [既生synchronized，何生volatile？！](https://www.hollischuang.com/archives/3928)

- 乐观锁

  - Atomic

    - **LongAdder** 与 **Striped64**

      > LongAdder 区别于 AtomicLong ，在高并发中有更好的性能体现

  - **AQS**（AbstractQueuedSynchronizer）

    - https://blog.51cto.com/14220760/2390586?source=dra
    - https://www.jianshu.com/p/da9d051dcc3d

    > - AQS框架借助于两个类：
    >
    > 1. Unsafe（提供CAS操作）
    > 2. [LockSupport](https://www.jianshu.com/p/e3afe8ab8364)（提供park/unpark操作）
    >
    > - 与Object类的wait/notify机制相比，park/unpark有两个优点：
    >
    > 1. 以thread为操作对象更符合阻塞线程的直观定义
    > 2. 操作更精准，可以准确地唤醒某一个线程（notify随机唤醒一个线程，notifyAll唤醒所有等待的线程），增加了灵活性。

    - CountDownLatch、CyclicBarrier和Semaphore
    - AbstractFuture (一旦调用get就会阻塞)

  - [Java并发问题--乐观锁与悲观锁以及乐观锁的一种实现方式-CAS](http://www.cnblogs.com/qjjazry/p/6581568.html)

- ThreadLocal

  ThreadLocal有一个**value内存泄露**的隐患

- 并发容器

  - CopyOnWriteArrayList、ConcurrentLinkedQueue ...

  - ConcurrentHashMap (JDK8)、ConcurrentHashMapV8 (netty提供)

    > java8中的ConcurrentHashMap实现已经抛弃了java7中分段锁的设计，而采用更为轻量级的CAS来协调并发，效率更佳。

    - computeIfAbsent

  - SkipList（跳表）

  - ConcurrentSkipListMap（使用跳表实现Map）  

    > 和使用哈希算法实现Map的另外一个不同之处是：哈希并不会保存元素的顺序，而跳表内所有的元素都是排序的。因此在对跳表进行遍历时，你会得到一个有序的结果。所以，如果你的应用需要有序性，那么跳表就是你不二的选择。

- WeakReference 和 **ReferenceQueue**

  这里重点看ReferenceQueue，引用相关请看下面的**对象引用**小节

- JDK Unsafe类（上面AQS提到，单独提出来）

  - objectFieldOffset
  - compareAndSwap...

- **ForkJoin**

- **Future**

  在并发编程中，我们经常用到非阻塞的模型，在之前的多线程的三种实现中，不管是继承thread类还是实现runnable接口，都无法保证获取到之前的执行结果。通过实现Callback接口，并用Future可以来接收多线程的执行结果。

  Future表示一个可能还没有完成的异步任务的结果，针对这个结果可以添加Callback以便在任务执行成功或失败后作出相应的操作。

  - Guava——AbstractFuture

### Java Util

- BitSet

  JDK中的BitSet集合对是**布隆过滤器**中经常使用的数据结构**Bitmap**的相对简单的实现。BitSet采用了**Bitmap的算法思想**。

### Swing/Awt

- EventQueue 与 AWTEvent

  > from https://github.com/jzyong/game-server.git 
  >
  > game-tool/src/main/java/com/jzy/game/tool/db/DBTool.java
  >
  > `java.awt.EventQueue.invokeLater`

  `EventQueue`里有一条`dispatchThread`线程，在`postEventPrivate`里检测为null则进行初始化，然后一直调用`pumpEvents`取出优先级最高的`AWTEvent`进行分发：

  `eq.dispatchEvent(event);`

  如`java.awt.Component#dispatchEventImpl`里会触发各种监听

- [Polygon](https://segmentfault.com/a/1190000007736473)，区域超区校验

### 反射

- Class

  - Class的 getSuperclass与getGenericSuperclass

- Class.forName和ClassLoader的区别

  都可用来对类进行加载。

  不同：

  1）class.forName()除了将类的.class文件加载到jvm中之外，还会对类进行解释，执行类中的static块，还会执行给静态变量赋值的静态方法

  2）classLoader只干一件事情，就是将.class文件加载到jvm中，不会执行static中的内容,只有在newInstance才会去执行static块。

- **Method**.invoke()的实现原理

- 使用Class.getResource和ClassLoader.getResource方法获取文件路径

### 创建和销毁对象

- 单例 与 序列化

  一般来说，一个类实现了 Serializable接口，我们就可以把它往内存地写再从内存里读出而"组装"成一个跟原来一模一样的对象。不过当序列化遇到单例时，这里边就有了个问题：从内存读出而组装的对象破坏了单例的规则。单例是要求一个JVM中只有一个类对象的，而现在通过反序列化，一个新的对象克隆了出来。

  解决方案：加上readResolve()方法

  ```java
  private Object readResolve() throws ObjectStreamException {
         // instead of the object we're on,
         // return the class variable INSTANCE
        return INSTANCE;
  }
  ```

### 对象引用

- [WeakReference](https://www.jianshu.com/p/964fbc30151a)

  看ThreadLocal源码的时候，其中嵌套类ThreadLocalMap中的Entry继承了WeakReference，为了能搞清楚ThreadLocal，只能先了解下了WeakReference：

  > WeakReference如字面意思，弱引用， 当**一个对象**仅仅被 WeakReference（弱引用）指向, 而没有任何其他strong reference（强引用）指向的时候, 如果这时GC运行, 那么**这个对象**就会被回收，不论当前的内存空间是否足够，这个对象都会被回收。
  >
  > 注意：回收的是WeakReference引用的对象！若存在ReferenceQueue队列，WeakReference本身会入队，但此时get()==null

  - [WeakHashMap](https://blog.csdn.net/u012420654/article/details/51793909)

  - SoftReference 若清楚了上面的原理，[SoftReference](https://www.jianshu.com/p/8c634f10ed1a)只是**生命周期**变成**内存将要被耗尽的时候**。

    > - from [关于SoftReference被回收的时机](https://blog.csdn.net/S7188290/article/details/86436479)
    >
    > 下面，我们来总结一下:
    > 1.当发生GC时，虚拟机可能会回收SoftReference对象所指向的软引用，是否被回收取决于该软引用是否是新创建或近期使用过。
    > 2.在虚拟机抛出OutOfMemoryError之前，所有软引用对象都会被回收。
    > 3.只要一个软引用对象由一个强引用指向，那么即使是OutOfMemoryError时，也不会被回收。
    >
    > - from [JVM - 优化案例（SoftRefLRUPolicyMSPerMB）](https://blog.csdn.net/qiang_zi_/article/details/100700784)
    >
    > 那么SoftReference对象到底在GC的时候要不要回收是通过什么公式来判断的呢？
    >
    > 是如下的一个公式：
    >
    > clock - timestamp <= freespace * SoftRefLRUPolicyMSPerMB
    >
    > 这个公式的意思就是说，“clock - timestamp”代表了一个软引用对象他有多久没被访问过了，freespace代表JVM中的空闲内存空间，SoftRefLRUPolicyMSPerMB代表每一MB空闲内存空间可以允许SoftReference对象存活多久。

  - guava cache：

    ```java
    CacheBuilder.newBuilder().softValues().build()
    ```

    当然 softValues()可以替换成weakKeys() / weakValues() ...

    实现原理可具体看 com.google.common.cache.LocalCache.Strength

  - LRU缓存实现(Java)

### JVM

> JVM很难，网上错误的观点很多

- ClassLoader
  - [ClassLoader那事儿](https://www.cnblogs.com/nedhome/p/9053132.html)
- 局部变量表中的Slot
- [Monitor对象](https://blog.csdn.net/super_x_man/article/details/81741073)
- 内存模型
  - [《深入理解 Java 内存模型》读书笔记 - 掘金](https://juejin.im/post/5a98c6a16fb9a028cd448965?utm_source=gold_browser_extension)
  - [全面理解Java内存模型(JMM)及volatile关键字 - CSDN博客](http://blog.csdn.net/javazejian/article/details/72772461)
- HotSpot虚拟机
  - 解释执行
    - 逐条将字节码翻译成机器码并执行
  - 即时编译（Just-in-time ，JIT）
    - 将一个方法中包含的所有字节码编译成机器码后再执行。
- 逃逸分析
  - [JVM优化之逃逸分析与分配消除](https://my.oschina.net/u/4215320/blog/3108015)
  - [面试问我 Java 逃逸分析，瞬间被秒杀了。。](https://my.oschina.net/javaroad/blog/3062052)

### GC性能优化，日志解读

- 可能导致FullGC的原因有以下几种。

  > 1. 老年代空间不足。
  > 2. 永生代或者元数据空间不足。
  > 3. 程序执行了System.gc() //建议jvm执行fullgc，并不一定会执行。
  > 4. CMS GC时出现promotion failed和concurrent mode failure
  > 5. YoungGC时晋升老年代的内存平均值大于老年代剩余空间（执行minor gc的时候进行的一系列检查）
  > 6. 有连续的大对象需要分配
  > 7. 执行了jmap -histo:live pid命令 //这个会立即触发fullgc

- [GC 算法(实现篇) - GC参考手册](https://blog.csdn.net/renfufei/article/details/54885190)

- [CMS垃圾回收器详解](https://blog.csdn.net/zqz_zqz/article/details/70568819)

  - CMS之promotion failed & concurrent mode failure

    > 疑问?
    >
    > 然后CMS的并发周期就会被一次Full GC代替，退回到Serial Old收集器进行回收，这是一次长Stop The World

    [关于CMS垃圾回收失败是不是进行FULL GC问题的记录](https://www.jianshu.com/p/843782af87b1)

- [GC性能优化](https://blog.csdn.net/renfufei/column/info/14851)

- CMS收集器和G1收集器 他们的优缺点对比

- Full GC日志解读

### 性能调优工具

- jps、jmap、jstack、jstat

  jstat -gcutil

- VisualVM

  - [使用 VisualVM 进行性能分析及调优](https://www.ibm.com/developerworks/cn/java/j-lo-visualvm/)

- [Arthas使用指南](https://segmentfault.com/a/1190000014618329?utm_source=tag-newest)  
  Arthas 是基于 Greys 进行二次开发的全新在线诊断工具

### QA（疑问?）

- 计算机内存模型 与 Java内存模型

- GC

  - static 会被GC回收吗？static的在内存中的存放位置？
  - 永久代不够会触发Full GC吗

- 锁

  - synchronized或其他锁的产生的阻塞，其和wait的区别？

  - 当一个线程的时间片耗尽之后，其synchronized的代码会发生原子性问题吗？

    线程1在执行`monitorenter`指令的时候，会对Monitor进行加锁，加锁后其他线程无法获得锁，除非线程1主动解锁。即使在执行过程中，由于某种原因，比如CPU时间片用完，线程1放弃了CPU，但是，他并没有进行解锁。而由于`synchronized`的锁是可重入的，下一个时间片还是只能被他自己获取到，还是会继续执行代码。直到所有代码执行完。这就保证了原子性。

  - JDK1.6后对锁进行的优化，轻量级锁，偏向锁，锁消除，适应性自旋锁，锁粗化 (自旋锁在1.4就有，只不过默认的是关闭的，jdk1.6是默认开启的)

- [国内Java面试总是问StringBuffer，StringBuilder区别是啥？档次为什么这么低？](https://www.hollischuang.com/archives/3912)

- 反射缺点？

  1.由于是本地方法调用，让JVM无法优化(还有JIT？)

  2.反射方法调用还有验证过程和参数问题，参数需要装箱拆箱、需要组装成Object[]形式、异常的包装等等问题



### ---------分割符---------



### 新特性

* Java 7

  * [JDK7动态方法调用](https://blog.csdn.net/xtayfjpk/article/details/42043977)

    * java.lang.invoke包

      主要包含了`CallSite、MethodHandle、MethodType`等类

      > 反射获取的信息比MethodHandle要多。
      > 反射是模拟java代码层面的调用，MethodHandle是模拟字节码层面的调用。

      > `MethodHandle`和反射相比好处是：
      >
      > * 调用 invoke() 已经被JVM优化，类似直接调用一样。
      > * 性能好得多，类似标准的方法调用。
      > * 当我们创建MethodHandle 对象时，实现方法检测，而不是调用invoke() 时。

    * 新增了invokedynamic指令

- Java 8

  - parallelStream

  - 元空间（Metaspace）

  - Supplier接口和Consumer接口 （JDK8以下可用guava替代）

    梦爷的FileLoader优化用到了Supplier

  * **Lambda的实现原理**

  * **::（双冒号）的实现原理**

    ```java
    List<String> al = Arrays.asList("a", "b", "c", "d");
    al.forEach(AcceptMethod::printValur);
    
    //下面的方法和上面等价的
    Consumer<String> methodParam = AcceptMethod::printValur; //方法参数
    al.forEach(x -> methodParam.accept(x));//方法执行accept
    ```

- Java 9

  - Reactive Streams
  - Flow API

### 字节码

- Class类的文件结构

  方法表，属性表...

### 热更新

* 自定义类加载器
  * [探秘 Java 热部署](https://www.jianshu.com/p/731bc8293365)
  * [CSDN·自定义classloader实现JAVA热替换](https://blog.csdn.net/puhaiyang/article/details/78165465)

- java.lang.instrument

  类重新定义，这是Instrumentation提供的基础功能之一，这个类很早就出了，redefineClasses这个方法可以更新方法级别的代码，但是不会触发一个类的初始化方法。

  - [游戏服务器之Java热更新](https://www.cnblogs.com/wgslucky/p/9127681.html)
  - [动态加载class文件](https://zheng12tian.iteye.com/blog/1495037)
  - [JVM源码分析之javaagent原理完全解读](https://www.imooc.com/article/42736)
  - [探秘 Java 热部署二（Java agent premain）](https://www.jianshu.com/p/0bbd79661080)
  - [探秘 Java 热部署三（Java agent agentmain）](https://www.jianshu.com/p/6096bfe19e41)

- 第三方工具

  - [**Arthas**的使用](https://www.cnblogs.com/orange911/p/10583245.html)
  - [Github · **HotswapAgent**](https://github.com/HotswapProjects/HotswapAgent)

- 脚本语言

  - groovy
  
    使用groovy类加载器重载java代码 重载的java文件可以直接使用源文件，无需编译为class

### 其他

- Reactor模式

  - [Reactor模式详解](https://www.cnblogs.com/winner-0715/p/8733787.html)
  - [高性能IO之Reactor模式](https://www.cnblogs.com/doit8791/p/7461479.html)

- Actor模型

  - [Java并发的四种风味](http://www.importnew.com/14506.html) 
  - Akka

- 协程

  > 协程，英文Coroutines，是一种比线程更加轻量级的存在。正如一个进程可以拥有多个线程一样，一个线程也可以拥有多个协程。最重要的是，**协程不是被操作系统内核所管理，而完全是由程序所控制**（也就是在用户态执行）。
  >
  > Java语言并没有对协程的原生支持，但是某些开源框架模拟出了协程的功能，有兴趣的小伙伴可以看一看Kilim框架的源码

- JMX

- jsvc

  > 在linux上以服务的方式启动java程序，需要提前安装jsvc。linux是利用daemon(jsvc)构建java守护进程。



### ---------分割符---------



### 语法糖

- [Java中的10颗语法糖](https://www.cnblogs.com/duanxz/p/3916028.html)

### 设计模式

- [设计模式 - 菜鸟教程](http://www.runoob.com/design-pattern/design-pattern-tutorial.html)
- 门面模式

### 代码格式

- [Java 函数优雅之道](https://blog.csdn.net/yunqiinsight/article/details/99826098)

### 常遇的报错与坑

- [ConcurrentModificationException](https://www.2cto.com/kf/201403/286536.html)
- [疫苗：JAVA HASHMAP的死循环](https://coolshell.cn/articles/9606.html)

