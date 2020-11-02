---
layout: docs
title: Java
date: 2019-02-01
header-img: "img/post-bg-rwd.jpg"
catalog: true
typora-root-url: ..
---

> **思想是灵魂,实现是形式**

### String

- [Java中的String有没有长度限制？](https://www.hollischuang.com/archives/3916)

  - 数组呢？

- StringJoiner（Java 8中提供的可变字符串类）

- char

  JAVA的char内部编码为`UTF-16`，而与`Charset.defaultCharset()`无关

- String s = new String("a") 到底产生几个对象？

  对于通过new产生一个字符串（"a"）时，会先去常量池中查找是否已经有了”a”对象，如果没有则在常量池中创建一个此字符串对象，然后堆中再创建一个常量池中此"a"对象的拷贝对象。

  也就是说准确答案是产生了一个或两个对象，如果常量池中原来没有"a"，就是两个。反之就是一个。

  是的！如果面试官问到，回答一个或两个即可，但是…毕竟…毕竟

  毕竟我和在座的各位都是人才，Java知识底蕴不能如此短浅，这题还没谢幕我们还能对面试官多哔哔几句：字符串常量池在不同版本的jvm中可能位置不同，那么这又是一个老梗了。（在JDK6.0及之前版本，字符串常量池是放在Perm Gen区(也就是方法区)中；在JDK7.0版本，字符串常量池被移到了堆中了）

  扩展：

  1. intern方法 

     - [深入解析String#intern](https://tech.meituan.com/2014/03/06/in-depth-understanding-string-intern.html)

       关键点是 jdk7 中常量池不在 Perm 区域了，这块做了调整。常量池中不需要再存储一份对象了，可以直接存储堆中的引用 

  2. 此外，Java中的常量池有**字符串常量池**、**class常量池**和**运行时常量池**。[原文]( http://tangxman.github.io/2015/07/27/the-difference-of-java-string-pool/ )

  3. 常量池会被回收吗？

### 基本类型

* 强转

  `long`转`int`注意：最高位为1强转会为负数！

  如：正数2147483648（long类型）强转int会变成负数，`（int）0x80000000 => -2147483648(Integer.MIN_VALUE)`

* 无符号类型

  * java中无符号类型的解决方案
  * Java8包装类 新增 无符号运算方法
  * byte转换int时与0xff进行与运算的原因

### 枚举

* [枚举详解之EnumSet、EnumMap用法](https://www.cnblogs.com/treeshu/p/11013511.html)

  `RegularEnumSet`里面有这样一行代码：

  ```java
  elements = -1L >>> -universe.length;
  ```

  无符号右移一个**负数**！是一个**负移位量**！

  换个例子看一下：`-1 >>> -5` 其实等同 `-1 >>> 27`；`-1L >>> -5` 等同 `-1L >>> 59`

  如果移位量超过位数：`-1 >>> 32` 其实等同 `-1 >>> 0`；`-1 >>> 33` 等同 `-1 >>> 1`

### 位运算

* `^`“异或运算”的特殊作用：

  （1）使特定位翻转找一个数，对应X要翻转的各位，该数的对应位为1，其余位为零，此数与X对应位异或即可。

  例：X=10101110，使X低4位翻转，用X ^ 0000 1111 = 1010 0001即可得到。

  （2）与0相异或，保留原值 ，X ^ 0000 0000 = 1010 1110。

* `~`取反:

  注意最高位也会取反

### 集合

> Java集合比如说HashMap和ConcurrentHashMap我觉得，最好在平时能去耐心读一下源码，搜一搜相关的博客，最好能知道每个参数为什么设置成这么大？有什么好处？为什么？

- HashMap

  - [详细梳理JAVA7和JAVA8 HashMap的hash实现](https://blog.csdn.net/u013453787/article/details/84702992)

  > 最近它有两个主要的更新——一个在Java 7u40版本中对于空map的共享的底层存储，以及在Java 8中将底层hash bucket链接成为**哈希树**（改进更差情况下的性能）。

  - jdk1.7中的线程安全问题 **(resize死循环)**
  - jdk8中是如何解决jdk7中的HashMap死循环的
  - IdentityHashMap：和HashMap最大的不同，就是使用==而不是equals比较key

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

    ![deadlock](/docs/imgs/map1.png)

- **红黑树** TreeMap、TreeSet

- Queue 接口的几个方法

  add/offer, remove/poll, element/peek

- 其他

  - WeakHashMap

  - CopyOnWriteArrayList （附：Redis写快照的时候，用到了Linux底层的Copy-On-Write技术）

  - **跳表** [ConcurrentSkipListMap](https://blog.csdn.net/sunxianghuang/article/details/52221913)

  - DelayQueue

    ScheduledThreadPoolExecutor其任务队列默认是DelayedWorkQueue的变种

- 著名BUG

  - c.toArray might (incorrectly) not return Object[] (see 6260652) [原文](https://blog.csdn.net/qq_33589510/article/details/104767849)

    `java.util.ArrayList` 元素类型为`Object[] elementData`，`toArray()`方法实质返回`Object[]`

    `java.util.Arrays.ArrayList` 元素类型为`E[] a`，`toArray()`方法实质返回`E[]`

    因此，虽然`List`的`toArray`接口表面都返回Object[]，但他们的实质返回值还是有差的。所以我们不能将其他类型的对象，放进`java.util.Arrays.ArrayList#toArray()`返回的数组中。

    ```java
    List<String> list = Arrays.asList("abc");
    // class java.util.Arrays$ArrayList
    System.out.println(list.getClass());
    
    Object[] objArray = list.toArray();
    // class [Ljava.lang.String;
    System.out.println(objArray.getClass());
    
    // cause ArrayStoreException
    objArray[0] = new Object();
    ```

    

- 第三方原始类型集合库**Koloboke**，避免大量的装箱拆箱，同类型的还有HPPC，Eclipse Collections等

  > Koloboke的目标是替换标准的Java集合和流的API，提供更高效的实现。

### 代理

1. 按照代理的创建时期，代理类可以分为两种。 

   > 静态代理：由程序员创建或特定工具自动生成源代码，再对其编译。在程序运行前，代理类的.class文件就已经存在了。
   > 动态代理：在程序运行时，运用反射机制动态创建而成。

2. Cglib动态代理 

   > JDK的动态代理机制只能代理实现了接口的类，而不能实现接口的类就不能实现JDK的动态代理，cglib是针对类来实现代理的，他的原理是对指定的目标类生成一个子类，并覆盖其中方法实现增强，但因为采用的是继承，所以不能对final修饰的类进行代理。


3. 代码实现：[Cglib 与 JDK动态代理](https://my.oschina.net/xiaolyuh/blog/3108376)

4. 一些疑惑？

   - 为什么cglib为什么生成两个fastclass，`methodProxy.invokeSuper(“代理对象”, args)`和`methodProxy.invoke(“原对象”, args)`虽然底层分别调用两个不同的fastclass，但结果是一样的。

     ```java
     // 自定义Cglib代理拦截
     public class LQZMethodInterceptor implements MethodInterceptor {
     
         /**
          * @param o           cglib生成的代理对象
          * @param method      被代理对象方法
          * @param objects     方法入参
          * @param methodProxy 代理方法
          */
         public Object intercept(Object o, Method method, Object[] objects, MethodProxy methodProxy) throws Throwable {
             System.err.println("intercept");
             // invokeSuper，o为cglib生成的代理对象
             return methodProxy.invokeSuper(o, objects);
         }
     }
     ```

     ```java
     // org.springframework.aop.framework.CglibAopProxy.CglibMethodInvocation#invokeJoinpoint
     @Override
     protected Object invokeJoinpoint() throws Throwable {
     		if (this.protectedMethod) {
     			return super.invokeJoinpoint();
     		}
     		else {
     			// invoke，target为原对象
     			return this.methodProxy.invoke(this.target, this.arguments);
     		}
     }
     ```

     可扩展看看`Spring`的`JdkDynamicAopProxy`，其实本质上Spring对代理的处理都差不多

### IO

- IO流

  1. 对文件进行操作：FileInputStream（字节输入流），FileOutputStream（字节输出流），FileReader（字符输入流），FileWriter（字符输出流）

     2020年3月17日追加：

     1. `FileReader`，可以理解成他把`FileInputStream`和`Decoder`封装了起来，本质上还是用FileInputStream读了一层字节流byte[] (这里的read是一个`native`方法)，然后通过Decoder把他转成了char[]。
     2. `BufferedReader`，他默认开辟了一份`defaultCharBufferSize = 8192`长度的cb[]数组（缓冲区），读之前会把这个数组`fill()`满，之后都是操作这个数组，操作完了就再次更新数组，提高数据访问的效率。

     测试代码：`study-metis: com.ariescat.metis.base.io.iostream.Test`

  2. 对管道进行操作：PipedInputStream（字节输入流），PipedOutStream（字节输出流），PipedReader（字符输入流），PipedWriter（字符输出流）

     PipedInputStream的一个实例要和PipedOutputStream的一个实例共同使用，共同完成管道的读取写入操作，主要用于**线程操作**。**有空看看这里的实现 > **[简介,源码分析和示例](https://www.cnblogs.com/skywang12345/p/io_04.html)

     在一个线程里使用PipedInputStream和PipedOutputStream(会造成死锁？)

  3. 字节/字符数组：ByteArrayInputStream，ByteArrayOutputStream，CharArrayReader，CharArrayWriter

     在内存中开辟了一个字节或字符数组。

  4. Buffered缓冲流：BufferedInputStream，BufferedOutputStream，BufferedReader，BufferedWriter

     带缓冲区的处理流，缓冲区的作用的主要目的是：避免每次和硬盘打交道，提高数据访问的效率。

  5. 转化流：

     InputStreamReader：在读入数据的时候将字节转换成字符。

     OutputStreamWriter：在写出数据的时候将字符转换成字节。

  6. 数据流：DataInputStream，DataOutputStream

     因为平时若是我们输出一个8个字节的long类型或4个字节的float类型，那怎么办呢？可以一个字节一个字节输出，也可以把转换成字符串输出，但是这样转换费时间，若是直接输出该多好啊，因此这个数据流就解决了我们输出数据类型的困难。数据流可以直接输出float类型或long类型，提高了数据读写的效率。

  7. 打印流：printStream，printWriter

     一般是打印到控制台，可以进行控制打印的地方和格式，其中的  print方法不会抛出异常，可以通过checkError方法来查看异常。

  8. 对象流：ObjectInputStream，ObjectOutputStream

     把封装的对象直接输出，而不是一个个在转换成字符串再输出。

  9. `RandomAccessFile` 随机访问文件

     java.io包中是一个特殊的类, 既可以读文件，也可以写文件。

     **有空也要看看这里的实现**，log4j2的Appender里就有这个：`RandomAccessFileAppender`、`RollingRandomAccessFileAppender`

     RandomAccessFile的绝大多数功能，但不是全部，已经被JDK 1.4的nio的内存映射文件**(memory-mapped files)**给取代了，你该考虑一下是不是用"内存映射文件"来代替RandomAccessFile了。

  10. ZipInputStream、ZipOutputStream

      读取zip文档 getNextEntry、putNextEntry 得到或创建ZipEntry对象。

- Path/Files

  - [IO操作你还在用File吗，该拥抱Path和Files了](https://www.sohu.com/a/132459571_654433)

- JDK NIO

  - Channel，Buffer，Selector

- 为什么要用 `close()` 关掉流？

  有些资源 `GC` 回收不掉？

### 线程

> JUC包，毫无疑问的，得去学，哪怕平时编程根本不去用，但是得会，至少得知道有这个东西，至少得知道aba，cas，aqs，unsafe，volatile，sync，常见的各种lock，死锁，线程池参数和如何合理的去设置，必须明白自旋，阻塞，死锁和它如何去定位，oom如何定位问题，cpu过高如何定位等基本的操作。你可以没有生产调试经验，但不代表你可以不会top，jps，jstack，jmap这些可能会问的东西。

- 线程

  - 线程状态
    - 其实可以直接查看源码`java.lang.Thread.State`，里面的注释内容讲解得很清楚了
    - [Java线程的6种状态及切换(透彻讲解)](https://blog.csdn.net/pange1991/article/details/53860651)
    - [Java中一个线程只有六个状态。至于阻塞、可运行、挂起状态都是人们为了便于理解，自己加上去的](https://www.cnblogs.com/GooPolaris/p/8079490.html)
  - 线程中断
    - ？何时抛出 `{@see java.lang.InterruptedException}`

- [线程池](http://novoland.github.io/%E5%B9%B6%E5%8F%91/2014/07/26/Executor%20%E4%B9%8B%20%E7%BA%BF%E7%A8%8B%E6%B1%A0%E5%8F%8A%E5%AE%9A%E6%97%B6%E5%99%A8.html)  

  - 关于Executors 

    《阿里巴巴Java开发手册》中强制线程池不允许使用 Executors 去创建，而是通过 ThreadPoolExecutor 的方式，这样的处理方式让写的同学更加明确线程池的运行规则，规避资源耗尽的风险

    Executors 返回线程池对象的弊端如下：

    1. FixedThreadPool 和 SingleThreadExecutor ： 允许请求的队列长度为 Integer.MAX_VALUE ，可能堆积大量的请求，从而导致OOM。
    2. CachedThreadPool 和 ScheduledThreadPool ： 允许创建的线程数量为 Integer.MAX_VALUE ，可能会创建大量线程，从而导致OOM。

  - 三种队列

    | 队列                | 简单解释                                                     |
    | ------------------- | ------------------------------------------------------------ |
    | SynchrousQueue      | 不会保存提交任务，超出直接corePoolSize个任务，直接创建新的线程来执行任务，直到(corePoolSize＋新建线程) > maximumPoolSize。 |
    | LinkedBlockingQueue | 基于链表的先进先出，无界队列。超出直接corePoolSize个任务，则加入到该队列中，直到资源耗尽，**所以maximumPoolSize不起作用**。 |
    | ArrayBlockingQueue  | 基于数组的先进先出，创建时必须指定大小，超出直接corePoolSize个任务，则加入到该队列中，只能加该queue设置的大小，其余的任务则创建线程，直到(corePoolSize＋新建线程) > maximumPoolSize。 |

    上表收录自：[线程池的三种缓存队列](https://blog.csdn.net/nihaomabmt/article/details/81667481)

    解释看起来文邹邹的，要不直接上代码：

    ```java
    int c = ctl.get();
    if (workerCountOf(c) < corePoolSize) {
        if (addWorker(command, true))
            return;
        c = ctl.get();
    }
    if (isRunning(c) && workQueue.offer(command)) {
        int recheck = ctl.get();
        if (! isRunning(recheck) && remove(command))
            reject(command);
        else if (workerCountOf(recheck) == 0)
            addWorker(null, false);
    }
    else if (!addWorker(command, false))
      reject(command);
    ```

    注意几点

    1. ？`SynchronousQueue`误区：很多人把其认为其没有容量，不存储元素，这是错的。

       好好了解这个结构，并看看其核心算法`transfer`。后来实在看不懂...，先记住这句话吧：生产者线程对其的插入操作put必须等待消费者的移除操作take，反过来也一样。你不能调用peek()方法来看队列中是否有数据元素，因为数据元素只有当你试着取走的时候才可能存在，不取走而只想偷窥一下是不行的，当然遍历这个队列的操作也是不允许的。

       参考链接：

       1. https://www.jianshu.com/p/d5e2e3513ba3
       2. https://www.cnblogs.com/duanxz/p/3252267.html

  - 四种拒绝策略

    1. AbortPolicy // 默认，队列满了丢任务抛出异常
    2. DiscardPolicy // 队列满了丢任务不异常
    3. DiscardOldestPolicy // 将最早进入队列的任务删，之后再尝试加入队列
    4. CallerRunsPolicy // 如果添加到线程池失败，那么主线程会自己去执行该任务

- ThreadPoolExecutor和ScheduledThreadPoolExecutor原理

  - [ScheduledThreadPoolExecutor原理](https://blog.csdn.net/luanmousheng/article/details/77816412)

  - 线程池运行状态**【这里有空要详细看看】**

    ![thread-state](https://img-blog.csdnimg.cn/20191216171812869.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzIwNzA1Ng==,size_16,color_FFFFFF,t_70)

  - `shutdown()`, `shutdownNow()`和`awaitTermination()`

    注意，一旦线程池有任务开始跑，就算任务都跑完了，也会等待`keepAliveTime`时候后才会停止。一般测试小demo的时候发现程序一直得不到结束，原因基本是这个。

  ```java
    public static void main(String[] args) throws InterruptedException {
  	ExecutorService executor = Executors.newCachedThreadPool();
    	executor.execute(() -> System.err.println("executor"));
  	// TimeUnit.SECONDS.sleep(5L);
    	// executor.shutdown();
    	System.err.println("finish"); // 两个打印都输出后，程序还要等待 60s 才会结束！！
    }
  ```

    源码分析：

    `java.util.concurrent.ThreadPoolExecutor#runWorker`这里会一直调用`task = getTask()`，`getTask`里会调用`workQueue.poll(keepAliveTime, TimeUnit.NANOSECONDS)`，因此没任务后它也会阻塞`keepAliveTime`时间。

    分析一下`shutdown()`，它里面调用了`interruptIdleWorkers()`，它会打断上述的`wait keepAliveTime`的状态，抛出中断异常，而`getTask()`会捕获这个异常，从而**打破阻塞状态**。

### 线程安全问题

- 几个问题

  - Bounded-Buffer问题：

    生产者消费者问题（Producer-consumer problem），也称有限缓冲问题（Bounded-buffer problem），是一个多线程同步问题的经典案例。[原文](https://www.jianshu.com/p/696c24f3f7b8)

  - 并发中的伪共享问题（false sharing）：

    CPU缓存是以缓存行（cache line）为单位存储的。缓存行通常是 64 字节，并且它有效地引用主内存中的一块地址。并发的修改在一个缓存行中的多个独立变量，看起来是并发执行的，但实际在CPU处理的时候，是串行执行的，并发的性能大打折扣。

    Java中通过填充缓存行，sun.misc.Contended注解来解决伪共享问题。LMAX Disruptor `Sequence`采用了填充缓存行。

    并不是所有的场景都需要解决伪共享问题，因为CPU缓存是有限的，填充会牺牲掉一部分缓存。

- 锁

  - synchronized

    - monitor对象
    - [彻底搞懂synchronized(从偏向锁到重量级锁)](https://blog.csdn.net/qq_38462278/article/details/81976428)

  - volatile 

    > **Java内存模型**中：
    >
    > 1. `volatile`变量在写操作之后会插入一个store屏障，在读操作之前会插入一个load屏障。
    > 2. 一个类的`final`字段会在初始化后插入一个store屏障，来确保`final`字段在**构造函数初始化完成**并可被使用时可见。

    - 几个概念

      1. 可见性

      2. 重排序（编译器重排，处理器重排）

      3. Java内存模型定义了8种操作来完成主内存和工作内存的变量访问

         lock，unlock，read，load，use，assign，stroe，write

      4. MESI协议，这个当成扩展了解一下

      5. **内存屏障**是什么？如何工作的？如何实现？在哪个层面上实现？

         x86架构：

         **Store Barrier**，Store屏障，是x86的"sfence"指令，相当于StoreStore Barriers，强制所有在sfence指令之前的store指令，都在该sfence指令执行之前被执行，发送缓存失效信号，并把store buffer中的数据刷出到CPU的L1 Cache中；所有在sfence指令之后的store指令，都在该sfence指令执行之后被执行。即，禁止对sfence指令前后store指令的重排序跨越sfence指令，使**所有Store Barrier之前发生的内存更新都是可见的**。

         **Load Barrier**，Load屏障，是x86上的"ifence"指令，相当于LoadLoad Barriers，强制所有在lfence指令之后的load指令，都在该lfence指令执行之后被执行，并且一直等到load buffer被该CPU读完才能执行之后的load指令（发现缓存失效后发起的刷入）。即，禁止对lfence指令前后load指令的重排序跨越lfence指令，配合Store Barrier，使**所有Store Barrier之前发生的内存更新，对Load Barrier之后的load操作都是可见的**。

         **Full Barrier**，Full屏障，是x86上的”mfence“指令，相当于StoreLoad Barriers，强制所有在mfence指令之前的store/load指令，都在该mfence指令执行之前被执行；所有在mfence指令之后的store/load指令，都在该mfence指令执行之后被执行。即，禁止对mfence指令前后store/load指令的重排序跨越mfence指令，使**所有Full Barrier之前发生的操作，对所有Full Barrier之后的操作都是可见的。**

         参考：

         1. http://ifeve.com/memory-barriers-or-fences/
         2. https://www.jianshu.com/p/64240319ed60/ 该博客讲得不错，认真品味每一个字

    - 参考文章：

      1. [volatile关键字的作用、原理](https://monkeysayhi.github.io/2016/11/29/volatile关键字的作用、原理/)

         注意DCL（Double Check Lock，双重检查锁）和被部分初始化的对象

      2. [既生synchronized，何生volatile？！](https://www.hollischuang.com/archives/3928)

         非原子操作！！！

  - 乐观锁

    - Atomic

    - 了解一下**LongAdder** 与 **Striped64**

      LongAdder 区别于 AtomicLong ，在高并发中有更好的性能体现

  - 参考链接

    - [Java并发问题--乐观锁与悲观锁以及乐观锁的一种实现方式-CAS](http://www.cnblogs.com/qjjazry/p/6581568.html)

- **AQS**（AbstractQueuedSynchronizer）

  - AQS框架借助于两个类：
    1. Unsafe（提供CAS操作）
    2. [LockSupport](https://www.jianshu.com/p/e3afe8ab8364)（提供park/unpark操作）
  - 与Object类的wait/notify机制相比，park/unpark有两个优点：
    1. 以thread为操作对象更符合阻塞线程的直观定义
    2. 操作更精准，可以准确地唤醒某一个线程（notify随机唤醒一个线程，notifyAll唤醒所有等待的线程），增加了灵活性。
  - 应用：
    1. CountDownLatch、CyclicBarrier和Semaphore
    2. AbstractFuture (一旦调用get就会阻塞)
  - JDK Unsafe类（可以了解一下）
    - objectFieldOffset
    - compareAndSwap...
  - 参考链接
    - https://blog.51cto.com/14220760/2390586?source=dra
    - https://www.jianshu.com/p/da9d051dcc3d

- 并发容器

  - LinkedBlockingQueue，ConcurrentLinkedQueue等，要看看源码如何实现（offer，take方法）！

  - CopyOnWriteArrayList

  - ConcurrentHashMap (JDK8)，ConcurrentHashMapV8 (netty提供)

    > java8中的ConcurrentHashMap实现已经抛弃了java7中分段锁的设计，而采用更为轻量级的CAS来协调并发，效率更佳。

    - computeIfAbsent

  - SkipList（跳表）

  - ConcurrentSkipListMap（使用跳表实现Map）  

    > 和使用哈希算法实现Map的另外一个不同之处是：哈希并不会保存元素的顺序，而跳表内所有的元素都是排序的。因此在对跳表进行遍历时，你会得到一个有序的结果。所以，如果你的应用需要有序性，那么跳表就是你不二的选择。

- 其他

  1. ThreadLocal

     ThreadLocal有一个**value内存泄露**的隐患

  2. WeakReference 和 **ReferenceQueue**

     这里重点看ReferenceQueue，引用相关请看下面的**对象引用**小节

  3. Callable和**Future**（since1.5）

     在并发编程中，我们经常用到非阻塞的模型，在之前的多线程的三种实现中，不管是继承thread类还是实现runnable接口，都无法保证获取到之前的执行结果。通过实现Callback接口，并用Future可以来接收多线程的执行结果。

     Future表示一个可能还没有完成的异步任务的结果，针对这个结果可以添加Callback以便在任务执行成功或失败后作出相应的操作。

     - Guava——AbstractFuture

  4. **ForkJoin**

- 弄懂几个方法：

  ![thread](/docs/imgs/thread1.png)

  1. synchronized、LockSupport.park（如ReentrantLock）区别

  2. Thread.sleep、Object.wait、Condition.await区别，他们会释放锁吗？

     [面试 LockSupport.park()会释放锁资源吗？](http://www.imooc.com/article/294581)

- QA？

  1. 什么是上下文切换？
  2. 并发与并行的区别？

### Java Util包

- BitSet

  JDK中的BitSet集合对是**布隆过滤器**中经常使用的数据结构**Bitmap**的相对简单的实现。BitSet采用了**Bitmap的算法思想**。

- ServiceLoader

  Java中SPI全称为（Service Provider Interface，服务提供者接口）

  该类通过在资源目录META-INF/services中放置**提供者配置文件**来标识**服务提供者**。

  应用场景：

  1. JDBC驱动加载

     `java.sql.DriverManager#loadInitialDrivers`这里调用了`ServiceLoader.load(Driver.class);`

     因此只要pom引入了`mysql-connector-java`这个包，就会加载`jar`包下`META-INF/services/java.sql.Driver`文件中的`com.mysql.jdbc.Driver`类，而`com.mysql.jdbc.Driver`在静态代码块里往`DriverManager`注册了自己的驱动。所以以后就不用写下面的a段代码啦。

     ```java
     //a.导入驱动，加载具体的驱动类
     Class.forName("com.mysql.jdbc.Driver");
     //b.与数据库建立连接
     connection = DriverManager.getConnection(URL, USERNAME, PASSWORD);
     ```

  2. netty/Java的NIO采用SelectorProvider创建：`io.netty.channel.nio.NioEventLoop#provider`

     而`java.nio.channels.spi.SelectorProvider#provider`采用了SPI

  3. Dubbo的扩展点加载

     Dubbo的SPI扩展是自己实现的，在启动加载的时候会依次从以下目录中读取配置文件：

     META-INF/dubbo/internal/、META-INF/dubbo/、META-INF/services/

     ——《高可用可伸缩微服务架构：基于Dubbo、Spring Cloud和Service Mesh》3.2.3节 Dubbo Extension机制
  
- Observable

  操作Vector型变量obs的四个方法都加有同步关键字，Vector类型为线程安全的，而上述四个方法为什么还要加同步关键字呢？

### Java lang包

- Math

  1. log

     在java中求log2N，首先要弄明白一个初中学到的公式`log2N=logeN/loge2`，logeN代表以e为底的N的对数，loge2代表以e为底的2的对数

     在java.lang.math类中的log(double a)代表以e为底的a的对数，因此log2N在Java中的表示为`log((double)N)/log((double)2)`

  2. pow

### Javax

* Java 注解处理器 (Annotation Processor)

  javax.annotation.processing.AbstractProcessor 编译时执行

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

  - 判断当前类是什么类

    ```java
    boolean isLocalClass();		//判断是不是局部类，也就是方法里面的类 
    boolean isMemberClass();	//判断是不是成员内部类，也就是一个类里面定义的类
    boolean isAnonymousClass();	//判断当前类是不是匿名类，匿名类一般用于实例化接口
    boolean isAnnotation() ;	//判断当前Class对象是否是注释类型
    ```

  - 返回字符串(String)的方法

    ```java
    String getCanonicalName() 	//返回 Java Language Specification 中所定义的底层类的规范化名称。 
    String getName() 			//以 String 的形式返回此 Class 对象所表示的实体（类、接口、数组类、基本类型或 void）名称（全限定名：包名.类名）。
    String getSimpleName() 		//返回源代码中给出的底层类的简称。 
    String toString() 			//将对象转换为字符串。
    ```

    

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
  
- 原子变量

  - XXXAtomic 原子类

  - AtomicXXXFieldUpdater 原子更新器

    在Java5中，JDK就开始提供原子类了，当然也包括原子的更新器——即后缀为FieldUpdater的类

    已经有了原子类，为啥还额外提供一套原子更新器呢？ 

    > 简单的说有两个原因，以int变量为例，基于AtomicIntegerFieldUpdater实现的原子计数器，比单纯的直接用AtomicInteger包装int变量的花销要小，因为前者只需要一个全局的静态变量AtomicIntegerFieldUpdater即可包装volatile修饰的非静态共享变量，然后配合CAS就能实现原子更新，而这样做，使得后续同一个类的每个对象中只需要共享这个静态的原子更新器即可为对象计数器实现原子更新，而**原子类**是为同一个类的**每个对象**中都创建了一个**计数器** + **AtomicInteger对象**，这种开销显然就比较大了。

### 对象序列化

- Gson

  [关于Gson的几个坑](https://ariescat.github.io/2020/03/12/%E5%85%B3%E4%BA%8EGson%E7%9A%84%E5%87%A0%E4%B8%AA%E5%9D%91/)

### 对象拷贝

* [BeanUtils对象属性copy的性能对比以及源码分析](https://www.cnblogs.com/kancy/p/12089126.html)

  | 拷贝方式               | 对象数量: 1 | 对象数量: 1000 | 对象数量: 100000 | 对象数量: 1000000 |
  | :--------------------- | :---------- | :------------- | :--------------- | :---------------- |
  | `Hard Code`            | 0 ms        | 1 ms           | 18 ms            | 43 ms             |
  | `cglib.BeanCopier`     | 111 ms      | 117 ms         | 107 ms           | 110 ms            |
  | `spring.BeanUtils`     | 116 ms      | 137 ms         | 246 ms           | 895 ms            |
  | `apache.PropertyUtils` | 167 ms      | 212 ms         | 601 ms           | 7869 ms           |
  | `apache.BeanUtils`     | 167 ms      | 275 ms         | 1732 ms          | 12380 ms          |

### JVM

> JVM很难，网上错误的观点很多
>
> 垃圾回收算法，垃圾收集器，jvm内存模型，每个区域用途，各种oom的种类，jvm调优经验，没有你也要做过，自己去设置启动参数，知道常见参数的含义，类加载过程，双亲委派，什么时候young gc，full gc，各种情况进入老年代的方式，你知道的越多越好，因为吹起来就越自信，举个例子，逃逸分析是什么？markword里面有什么？

- 内存管理

  - 堆是线程共享的内存区域？

    不完全正确。因为HotSpot中，TLAB是堆内存的一部分，他在**读取上**确实是**线程共享**的，但是在**内存分配上**，是**线程独享**的。[链接](https://mp.weixin.qq.com/s/Jj5Z1DZKpAgrj9wpYUZ_JQ)

- 类加载

  - ClassLoader [ClassLoader那事儿](https://www.cnblogs.com/nedhome/p/9053132.html)

- 字节码执行

  - 局部变量表中的Slot

    > 为什么JVM局部变量表的一个slot至少要能容纳一个int类型的变量？
    >
    > 为什么Java虚拟机JVM要把byte和short的运算都转为int ？

- 内存模型，线程，线程安全

  - 内存模型
    - [《深入理解 Java 内存模型》读书笔记 - 掘金](https://juejin.im/post/5a98c6a16fb9a028cd448965?utm_source=gold_browser_extension)
    - [全面理解Java内存模型(JMM)及volatile关键字 - CSDN博客](http://blog.csdn.net/javazejian/article/details/72772461)
  - [Monitor对象](https://blog.csdn.net/super_x_man/article/details/81741073)
  - **happen-before**原则

- 编译与优化

  - HotSpot虚拟机 JIT
    - 解释执行
      - 逐条将字节码翻译成机器码并执行
    - 即时编译（Just-in-time ，JIT）
      - 将一个方法中包含的所有字节码编译成机器码后再执行。
  - 逃逸分析
    - [JVM优化之逃逸分析与分配消除](https://my.oschina.net/u/4215320/blog/3108015)
    - [面试问我 Java 逃逸分析，瞬间被秒杀了。。](https://my.oschina.net/javaroad/blog/3062052)

### GC性能优化，日志解读

- GC算法有哪些？[GC 算法(实现篇) - GC参考手册](https://blog.csdn.net/renfufei/article/details/54885190)

- 可能导致FullGC的原因有以下几种。

  > 1. 老年代空间不足。
  > 2. 永生代或者元数据空间不足。
  > 3. 程序执行了System.gc() //建议jvm执行fullgc，并不一定会执行。
  > 4. CMS GC时出现promotion failed和concurrent mode failure
  > 5. YoungGC时晋升老年代的内存平均值大于老年代剩余空间（执行minor gc的时候进行的一系列检查）
  > 6. 有连续的大对象需要分配
  > 7. 执行了jmap -histo:live pid命令 //这个会立即触发fullgc

  出现Full GC一般是不正常

- 垃圾回收器有哪些？

  - 他们什么阶段会**stop the world**？

    看《深入理解Java虚拟机》3.5节 经典垃圾收集器，这里每种收集器的执行图讲解了哪个阶段会STW

  - JVM默认启用的收集器是哪些？

    看《深入理解Java虚拟机》3.7.4节 垃圾收集器参数总结，这个讲解了client和server模式下的默认值，以及开启其他收集器的参数

  - [CMS垃圾回收器详解](https://blog.csdn.net/zqz_zqz/article/details/70568819)

    - CMS之promotion failed & concurrent mode failure

      > 疑问?
      >
      > 然后CMS的并发周期就会被一次Full GC代替，退回到Serial Old收集器进行回收，这是一次长Stop The World

      [关于CMS垃圾回收失败是不是进行FULL GC问题的记录](https://www.jianshu.com/p/843782af87b1)

  - CMS收集器和G1收集器 他们的优缺点对比

- GC日志

  - Full GC日志解读

- [GC性能优化](https://blog.csdn.net/renfufei/column/info/14851)

- 其他

  1. [假笨说-从一起GC血案谈到反射原理](https://mp.weixin.qq.com/s/5H6UHcP6kvR2X5hTj_SBjA)

     获取Method：

     - reflectionData，这个属性主要是SoftReference的
     - 我们每次通过调用`getDeclaredMethod`方法返回的Method对象其实都是一个**新的对象**，所以不宜多调哦，如果调用频繁最好缓存起来。不过这个新的方法对象都有个root属性指向`reflectionData`里缓存的某个方法，同时其`methodAccessor`也是用的缓存里的那个Method的`methodAccessor`。

     Method调用：

     - 其实`Method.invoke`方法就是调用`methodAccessor`的`invoke`方法

     MethodAccessor的实现：

     - 所有的方法反射都是先走`NativeMethodAccessorImpl`，默认调了**15**次之后，才生成一个`GeneratedMethodAccessorXXX`类

     - 而`GeneratedMethodAccessorXXX`的类加载器会`new` 一个`DelegatingClassLoader(var4)`，之所以搞一个新的类加载器，是为了性能考虑，在某些情况下可以卸载这些生成的类，因为**类的卸载是只有在类加载器可以被回收的情况下才会被回收的**

     并发导致垃圾类创建：

     - 假如有1000个线程都进入到创建`GeneratedMethodAccessorXXX`的逻辑里，那意味着多创建了999个无用的类，这些类会一直占着内存，**直到能回收Perm的GC发生才会回收**

     其他JVM相关文章:

     - 该文章最后有其他JVM相关文章，感觉是干货

  2. [反射代理类加载器的潜在内存使用问题](https://www.jianshu.com/p/20b7ab284c0a)

     大量的类加载器`sun/reflect/DelegatingClassLoader`，用来加载`sun/reflect/GeneratedMethodAccessor`类，可能导致潜在的占用大量本机内存空间问题，应用服务器进程占用的内存会显著增大。

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

- Java 7

  - [JDK7动态方法调用](https://blog.csdn.net/xtayfjpk/article/details/42043977)

    - java.lang.invoke包

      主要包含了`CallSite、MethodHandle、MethodType`等类

      > 反射获取的信息比MethodHandle要多。
      > 反射是模拟java代码层面的调用，MethodHandle是模拟字节码层面的调用。

      > `MethodHandle`和反射相比好处是：
      >
      > - 调用 invoke() 已经被JVM优化，类似直接调用一样。
      > - 性能好得多，类似标准的方法调用。
      > - 当我们创建MethodHandle 对象时，实现方法检测，而不是调用invoke() 时。

    - 新增了invokedynamic指令

- Java 8

  - 时间类：`Instant`和 LocalDate，LocalTime，`LocalDateTime`

    如果是JDK8的应用，可以使用Instant代替Date，LocalDateTime代替Calendar，DateTimeFormatter代替Simpledateformatter，官方给出的解释：*simple beautiful strong immutable thread-safe*。

    附：测试代码请看 `study-metis: com.ariescat.metis.base.time.Test`

  - stream

    - parallelStream

  - 函数式编程

    - Optional类

    - Supplier接口和Consumer接口 （JDK8以下可用guava替代）

      梦爷的FileLoader优化用到了Supplier

  - 语法糖

    - **Lambda**

      1. 实现原理

      2. 非捕获式(non-*capturing* lambda)和捕获式(*capturing* lambda)

      3. Java中的lambda每次执行都会创建一个新对象吗？

         测试代码：`study-metis: com.ariescat.metis.base.jdk8.lambda.LambdaTest2`，[参考链接](https://cloud.tencent.com/developer/article/1572212)

    - **::（双冒号）的实现原理**

      ```java
      List<String> al = Arrays.asList("a", "b", "c", "d");
      al.forEach(AcceptMethod::printValur);
      
      //下面的方法和上面等价的
      Consumer<String> methodParam = AcceptMethod::printValur; //方法参数
      al.forEach(x -> methodParam.accept(x));//方法执行accept
      
      ```

  - JVM

    - 元空间（Metaspace）

- Java 9

  - Reactive Streams
  - Flow API

- Java 11

  - 直接运行源代码

- QA？

  - [JDK 1.8 下的 java.lang.Class 对象和 static 成员变量在堆还是方法区？](https://blog.csdn.net/xu_jl1997/article/details/89433916)

### 字节码

- Class类的文件结构

  方法表，属性表...

### 热更新

- 自定义类加载器

  - [探秘 Java 热部署](https://www.jianshu.com/p/731bc8293365)
  - [CSDN·自定义classloader实现JAVA热替换](https://blog.csdn.net/puhaiyang/article/details/78165465)

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

* 图形界面 AWT和Swing

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