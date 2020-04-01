---
layout: docs
title: "Awesome"
subtitle: "\"技术体系探索总结（不断收集整理中...）\""
date: 2019-01-25
author: Ariescat
header-img: "img/post-bg-debug.png"
catalog: true

---

# 《技术总结》

### Java [➮详细](Java)

​	点上面链接 ↑ 进独立章节

### 常见框架

- 基础框架

  - Log

    - 区分commons-logging，slf4j，log4j，logback
      1. 了解jcl-over-slf4j，jul-to-slf4j这些jar的作用
      2. 了解log4j和log4j2的区别，**lmax disruptor**应用场景
    - **Flume** 日志采集系统，一般用于日志聚合

  - Apache commons

    - IO
      - FileAlterationMonitor和FileAlterationObserver（梦爷曾发现这里每隔10秒会涨10M内存，待研究）

  - [Google Guava](https://ifeve.com/google-guava/)

    集合 [collections] 、缓存 [caching] 、原生类型支持 [primitives support] 、**并发库** [concurrency libraries] 、通用注解 [common annotations] 、字符串处理 [string processing] 、I/O 等等

    这里有一个`BloomFilter`布隆过滤器的实现

  - 缓存

    - Guava的缓存

      Guava Cache说简单点就是一个支持**LRU**的ConcurrentHashMap

    - **Caffeine** 来自未来的缓存

      Caffeine是基于JAVA 1.8 Version的高性能缓存库。Caffeine提供的内存缓存使用参考Google guava的API。Caffeine是基于Google Guava Cache设计经验上改进的成果。

  - 集合框架

    - **Koloboke** 

      可以[**避免开销很大的装箱/拆箱操作，节省了原始类型装箱消耗的内存**](https://blog.csdn.net/qinyongye/article/details/81282961)。

    - Eclipse Collections

  - 时间

    - **joda** 对时间的操作
    - Quartz 定时任务

  - ASM

    spring-core自带有asm，org.ow2.asm也是一个轻量级的jar

  - [Java代码生成利器之rapid-generate应用](http://blog.csdn.net/likeaboy_fire/article/details/44024987)

- Spring

  > 最好能抽空看看源码，最起码bean的生命周期，如何解决循环依赖，父子容器，还有boot的启动流程，事务实现原理，动态代理原理等，你知道越多越好。

  - [Spring源码浅析](https://blog.csdn.net/linuu/column/info/lovespring)

  - Spring AOP

    - AOP原理，ProxyFactory

    - AOP中Pointcut，Advice 和 Advisor 三个概念 还有Advised

      > Advised->在Spring中创建了AOP代理之后，就能够使用org.springframework.aop.framework.Advised接口对它们进行管理。 任何AOP代理都能够被转型为这个接口，不论它实现了哪些其它接口
      >
      > Advisor->类似使用Aspect的@Aspect注解的类
      >
      > Advice->@Before、@After、@AfterReturning、@AfterThrowing、@Around
      >
      > Pointcut->@Pointcut

  - [Spring Cache 介绍](https://www.cnblogs.com/rollenholt/p/4202631.html)

  - [Spring Webflux](https://www.jianshu.com/p/c029de45d23b) （reactive web框架，与前端Flux架构名字相同）

    命令式编程 VS **响应式编程**

  - Spring Data

    - [Spring Data JPA 简单查询--接口方法 - 如莲家园 - 博客园](https://www.cnblogs.com/rulian/p/6557471.html)

  - 框架整合

    - [企业大型互联网分布式架构{Java分布式架构 dubbo+springmvc+mybatis+ehcach+redis }-IT未来-ITPUB博客](http://m.blog.itpub.net/31452580/viewspace-2148363/)
    - [手把手教你从最基本的Java工程搭建SpringMVC+SpringDataJPA+Hibernate(含源码下载) - anxpp的博客 - CSDN博客](http://blog.csdn.net/anxpp/article/details/51415366)

  - SpringBoot

  - SpringCloud

- [Netty](https://www.jianshu.com/p/1a6d1a25e6cc)

  - Netty的线程模型

    通过Reactor模型基于**多路复用器**接收并处理用户请求，内部实现了两个线程池，boss线程池和work线程池，其中boss线程池的线程负责处理请求的accept事件，当接收到accept事件的请求时，把对应的socket封装到一个NioSocketChannel中，并交给work线程池，其中work线程池负责请求的read和write事件

  - NioEventLoop设计原理

  - 定时任务与时间轮算法

    - [HashedWheelTimer](http://novoland.github.io/%E5%B9%B6%E5%8F%91/2014/07/26/%E5%AE%9A%E6%97%B6%E5%99%A8%EF%BC%88Timer%EF%BC%89%E7%9A%84%E5%AE%9E%E7%8E%B0.html)

      > hashWheel定时器和Quartz的区别：  
      > 1）Quartz将定时任务分为任务和触发器，而hashWheel只有任务的概念
      >
      > 2）Quartz通过一个TreeSet对所有的触发器进行管理，而hashWheel通过一个hash轮来对所有的任务进行管理
      >
      > 3）Quartz能够非常方便的删除定时任务，而netty的hashWheel暂时没有删除任务的接口（除非自己实现一个hashWheel定时器）
      >
      > 4）Quartz有一个专门的调度线程对任务进行管理，任务执行有另外专门的线程池，而hashWheel用一个线程实现对任务的管理和任务的执行。
      >
      > 5）Quartz能够通过序列化，将定时任务保存在数据库，而hashWheel不能
      >
      > 总的来说，Quartz的功能相对强大，而hashWheel相对要轻量级一点。

  - 附：

    个人认为netty对用户来说是异步，但是实际底层IO是IO多路复用模型，本质上还是一种同步非阻塞（是的，个人认为IO多路复用模型还是**同步**非阻塞，并且[**真正的IO操作**都将**阻塞**应用线程](https://weread.qq.com/web/reader/1e732510718f63a11e7dee2k98f3284021498f137082c2e)），他只是多了一个Selector（需要底层操作系统支持），如此一个线程就可以控制大量的通信（相比传统IO，不管他是不是非阻塞）。

    另看 [IO#IO概念](#io)，这里也收录了一些理解

- web

  - JAX-RS（ Java API for RESTful Web Services ）

    `Eureka`的`ApplicationResource`有用到

- 性能

  - Disruptor
    - [锁的缺点 - Disruptor 入门](http://wiki.jikexueyuan.com/project/disruptor-getting-started/lock-weak.html)

- 中间件

  - ActiveMQ 
  - Akka
    - **Actor模型**
    - [akka设计模式系列-基础模式](https://yq.aliyun.com/articles/616951?spm=a2c4e.11153940.blogcont616952.14.28751adcybgYqt)

- 搜索引擎

  - Elasticsearch
    - [Elasticsearch基础教程 - CSDN博客](http://blog.csdn.net/cnweike/article/details/33736429)
    - [玩转单元测试之DBUnit - WadeXu - 博客园](https://www.cnblogs.com/wade-xu/p/4547381.html)
    - [基于注解的配置 - Spring-Data-Elasticsearch](https://es.yemengying.com/5/5.1/5.1.2.html)

- RxJava [➮详细](/2019/01/29/事件驱动编程RxJava/):  

  " a library for composing asynchronous and event-based programs using observable sequences for the Java VM "  （一个在 Java VM 上使用可观测的序列来组成异步的、基于事件的程序的库）

### 编程思想

- Reative编程（响应式编程）

  Reactive响应式(反应式)编程 是一种新的编程风格，其特点是异步或并发、事件驱动、推送PUSH机制以及观察者模式的衍生。

  JVM应用：RxJava、Akka、Actors模型、Vert.x、Webflux

- 领域驱动设计

  - [领域驱动设计在互联网业务开发中的实践](https://tech.meituan.com/2017/12/22/ddd-in-practice.html)
  - [美团DDD实践 示例项目](https://github.com/1987539447/draw-lottery)

- 动态语言与动态类型语言

  动态语言：(Dynamic programming Language -动态语言或动态编程语言)，动态语言是指程序在运行时可以改变其结构，新的函数可以被引进，已有的函数可以被删除等在结构上的变化。

  动态类型语言：动态类型语言是指在运行期间才去做数据类型检查的语言，说的是数据类型，动态语言说的是运行是改变结构，说的是代码结构。

### 分布式技术

- IO操作

  - [IO复用,AIO,BIO,NIO,同步，异步，阻塞和非阻塞 区别](https://www.cnblogs.com/aspirant/p/6877350.html)

- RPC

  RPC涉及：通讯，序列化，超时，重发（重复），消息顺序，负载 等等。（个人理解）

  - 协议：thrift 等等
  - JavaRMI
    - [深究Java中的RMI底层原理](https://blog.csdn.net/sinat_34596644/article/details/52599688)
  - HSF
    阿里巴巴集团内部使用的分布式服务框架 High Speed Framework

- Zookeeper

  - [Zookeeper的功能以及工作原理](https://www.cnblogs.com/felixzh/p/5869212.html)
  - [Leader选举-选举过程介绍比较清晰](https://blog.csdn.net/gaoshan12345678910/article/details/67638657)
  - [ZAB协议理解](https://blog.csdn.net/junchenbb0430/article/details/77583955)

- 分布式事务

  - [分布式事务与一致性算法Paxos & raft & zab](https://blog.csdn.net/followmyinclinations/article/details/52870418)
  - atomikos:[4.0 atomikos JTA/XA全局事务](http://www.tianshouzhi.com/api/tutorials/distributed_transaction/386)
  - xaresource
  - [分布式事务](https://javatar.iteye.com/blog/981787)
  - [分布式事务系列（2.1）分布式事务的概念](https://yq.aliyun.com/articles/39047)

### 高可用技术

- 服务器端如何处理超大量合法请求？

  服务器架构层面，做负载均衡，将请求分发给其它服务器处理。

  软件服务架构层面，做请求队列，将1w个请求放入队列，业务处理完的请求再返回。

  代码层面，优化业务处理，把单机请求做到支持1w并发。

- 反向代理为何叫反向代理？[原文](https://www.zhihu.com/question/24723688/answer/128105528)

### 前沿技术

- docker
- ServiceMesh(服务网格)
- 中台服务
- 分布式、大数据、人工智能、区块链

### 游戏技术

- **AI**（状态机 行为树）
- 游戏框架
  - skynet
  - Pinus

### 工具

- 构建工具
  - Maven
  - Gradle
    - [十分钟理解Gradle - Bonker - 博客园](https://www.cnblogs.com/Bonker/p/5619458.html)
    - 慕课实战：Gradle3.0自动化项目构建技术精讲+实战
- 版本管理工具
  - Git
- Jenkins
- Docker
- 正则表达式

### 脚本语言

- [Groovy](脚本语言#Groovy)
  - [30分钟groovy快速入门并掌握](https://www.cnblogs.com/amosli/p/3970810.html)
  - [Groovy 语言快速入门](https://www.jianshu.com/p/e8dec95c4326)
  - Groovy 与 **Java**
    - [实战 Groovy，在 Java 应用程序中加一些 Groovy 进来](https://www.ibm.com/developerworks/cn/java/j-pg05245/)
    - [利用SPRING管理热加载的GROOVY对象](https://palexu.github.io/posts/spring-dynamic-load-groovy-bean?hmsr=toutiao.io&utm_medium=toutiao.io&utm_source=toutiao.io)
    - [spring + groovy 很强大](https://blog.csdn.net/qq362228416/article/details/8811136)
    - [Spring动态部署Bean/Controller/Groovy Controller](https://jinnianshilongnian.iteye.com/blog/1999284)
  - Groovy as DSL 与 **Gradle**
    - [Gradle：新一代自动化构建工具](http://hao.jobbole.com/gradle/)
    - [Groovy DSL 百度搜索](https://www.baidu.com/s?ie=utf8&oe=utf8&wd=Groovy DSL&tn=98010089_dg&ch=4)
    - [gradle dsl](https://www.baidu.com/s?ie=utf8&oe=utf8&wd=gradle dsl&tn=98010089_dg&ch=5)

### 数据结构

- 链表，栈，队列

- 数组，矩阵

- 图

- 堆：一个可以被看做一棵树的数组

- 二叉树

  - **遍历**

    递归遍历，**非递归遍历**

  - 完全二叉树

  - 满二叉树 

  - 平衡二叉树

    - AVL树
    - 红黑树
      - [查找（一）史上最简单清晰的红黑树讲解 - CSDN博客](http://blog.csdn.net/yang_yulei/article/details/26066409)
      - [查找（二）简单清晰的B树、Trie树详解 - CSDN博客](http://blog.csdn.net/yang_yulei/article/details/26104921)
    - Treap
    - BST

  - B树、B-树、B+树、B*树 区别？

    1. B-tree树即B树，是一种多路搜索树
    2. B树的两个明显特点
       * 树内的每个节点都存储数据
       * 叶子节点之间无指针相邻
    3. B+树的两个明显特点
       - 数据只出现在叶子节点
       - 所有叶子节点增加了一个链指针
    4. B*树是B+树的变体，在B+树的非根和非叶子结点再增加指向兄弟的指针
    5. B+树相比B树的优势
       1. 单一节点存储更多的元素，使得查询的IO次数更少；
       2. 所有查询都要查找到叶子节点，查询性能稳定；
       3. 所有叶子节点形成有序链表，便于范围查询。
    6. 要了解一下他们的查找，插入，删除

- 跳跃表

- 布隆过滤器，位图，hyperloglog

- 倒排索引

### 算法

- 常见算法

  - 排序

    - 八大排序算法比较：

    ![常见算法·图1](imgs/sort1.png)

    - 希尔排序

      时间复杂度？

    - 堆排序

      如何建堆 和调整堆？

    - 快排

      快排最好最坏的情况？优化方案？

    - 归并排序

    - 其他

      1. Java中`Colletions.sort`和`Arrays.sort`分别用了什么排序算法呢

      2. [算法与数据结构](https://www.cnblogs.com/deng-tao/category/951445.html)

         这里给出了双路快排，三路快排，自底向上的归并排序算法等解析

         附：关于他双路快排的实现：

         ```c++
         while ((i < right) && (arr[i] < v)) i++;    // 使用索引i从左往右遍历直到 arr[i] < v
         while ((j > left + 1) && (arr[j] > v)) j--; // 使用索引j从右往左遍历直到 arr[j] > v
         ```

         个人认为还可以优化，把相等的情况考虑进去，如下：

         ```c++
         while ((i < right) && (arr[i] <= v)) i++;    // 使用索引i从左往右遍历直到 arr[i] < v
         while ((j > left + 1) && (arr[j] >= v)) j--; // 使用索引j从右往左遍历直到 arr[j] > v
         ```

  - 查找算法

    二分查找，索引，倒排索引

  - KPM 算法

    - [阮一峰 字符串匹配的KMP算法](http://www.ruanyifeng.com/blog/2013/05/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm.html)

      ​	补充：这篇博客的数组并不是next数组，而是"部分匹配值"数组，就是"前缀"和"后缀"的最长的共有元素的长度

    - [CSDN KMP算法—终于全部弄懂了](https://blog.csdn.net/dark_cy/article/details/88698736)

      ​	该博客分析了`k = next[k]`的问题

    - [kpm算法 - u012361418的博客 - CSDN博客](http://blog.csdn.net/u012361418/article/details/46125439)

    - [KMP算法及优化 - 疯狂的爱因斯坦 - SegmentFault](https://segmentfault.com/a/1190000007066358#articleHeader4)

      ​	该博客讲解了KPM的优化问题

  - 树

    - 最小生成树算法：Kruskal算法，Prim算法

  - 最短路径算法

- 五大常用算法：贪婪算法，动态规划算法，分治算法，回溯算法以及分支限界算法

  - [常见动态规划问题总结](https://blog.csdn.net/mc695192383/article/details/70146579)

    [最长公共子序列与最长公共子串(DP)](https://blog.csdn.net/u012102306/article/details/53184446)

    1. **最长递增子序列**

       **解法1：最长公共子序列法**

       **解法2：动态规划法（时间复杂度O(N^2))**

       ​	dp[i]表示以标识为i的元素为递增序列结尾元素的最长递增子序列的长度

       **解法3：O(NlgN）算法**

       ​	b[i]只是存储的对应长度为i的LIS的最小末尾

    2. **最长公共子序列**

       用dp[i][j]来表示A串中的前i个字符与B串中的前j个字符的最长公共子序列长度

    3. **最长公共子串**

       这个问题与上面的问题类似，区别点在于这里是子串，是连续的，令dp[i][j]表示A串中的以第i - 1个字符与B串中的以第j - 1个字符结尾的最长公共子串的长度

    4. **最小编辑代价问题**

       首先令dp[i][j]表示将A串中的前i个字符转换成B串中的前j个字符所需要的代价

  - [分治法的经典问题——大整数相乘](https://www.cnblogs.com/little-kwy/archive/2017/09/30/7613642.html)

- 启发式算法

  - 遗传算法（GA）

- 算法思想

  - 双指针，贪心，动态规划
  - 递推
    - [算法洗脑系列（8篇）——第一篇 递推思想 - 一线码农 - 博客园](http://www.cnblogs.com/huangxincheng/archive/2011/12/29/2305525.html)

- 练习平台

  - [剑指Offer](https://github.com/CyC2018/CS-Notes/blob/master/notes/%E5%89%91%E6%8C%87%20Offer%20%E9%A2%98%E8%A7%A3%20-%20%E7%9B%AE%E5%BD%95.md)
  - [LeetCode](https://github.com/CyC2018/CS-Notes/blob/master/notes/Leetcode%20%E9%A2%98%E8%A7%A3%20-%20%E7%9B%AE%E5%BD%95.md)
  - [牛客笔试面试题库](https://www.nowcoder.com/contestRoom?from=cyc_github)

### 字符编解码

- 字符集

  1. ASCII

  2. Unicode

     目前Unicode字符分为17组编排，0x0000至0x10FFFF,每组称为平面（Plane）,每个面拥有65536个码位，共1114112个。

- 字符编码

  UTF-32、UTF-16和 UTF-8 是 Unicode 标准的编码字符集的字符编码方案

  - 附：

    1. Java的`char`内部编码为`UTF-16`，而与`Charset.defaultCharset()`无关。

       看 [Unicode 编码理解](https://blog.csdn.net/wdeng2011/article/details/80155795) 可知`UTF-16`编码完全可以满足Unicode 的17组编排（平面），因为有平面0的0xD800-0xDFFF代理区。

       [关于java中char占几个字节，汉字占几个字节](https://www.cnblogs.com/nevermorewang/p/7808092.html)，这里指出Java中的`char`是占用两个字节，只不过有些字符需要两个char来表示，同时这篇博客也给了一个官方Oracle链接里面明确的说明了*值在16位范围之外且在0x10000到0x10FFFF范围内的字符称为补充字符，并定义为**一对char值***。

       测试代码：

       ```java
       public static void main(String[] args) {
       
           char[] c = new char[]{'一'};
           System.err.println(Integer.toHexString(c[0]));
           String s = new String(c);
           // String#length事实上调用了char[].length
           System.err.println(s + " " + s.length());
       
           String str = "一";
           System.err.println(str + " " + str.length());
       
           // Unicode编码 汉字扩展B '𠀀' 字
           c = new char[]{'\uD840', '\uDC00'};
           s = new String(c);
           System.err.println(s + " " + s.length());
       
           str = "\uD840\uDC00";
           System.err.println(str + " " + str.length());
       
           // 输出：由输出可见这个字用了两个char来存
           // 一 1
           // 一 1
           // 𠀀 2
           // 𠀀 2
       }
       ```

    2. [UniCode编码表](https://www.cnblogs.com/csguo/p/7401874.html)

    3. [汉字unicode编码范围](https://blog.csdn.net/gywtzh0889/article/details/71083459/)

  - 参考博客：

    1. 吴秦（Tyler）[字符集和字符编码（Charset & Encoding）](https://www.cnblogs.com/skynet/archive/2011/05/03/2035105.html)

    2. 廖雪峰 [字符串和编码](https://www.liaoxuefeng.com/wiki/1016959663602400/1017075323632896)

       该文有简单有效的解释了：

       在计算机内存中，统一使用Unicode编码，当需要保存到硬盘或者需要传输的时候，就转换为UTF-8编码。
       用记事本编辑的时候，从文件读取的UTF-8字符被转换为Unicode字符到内存里，编辑完成后，保存的时候再把Unicode转换为UTF-8保存到文件：

       ![字符编码·图1](imgs/Unicode1.png)

       浏览网页的时候，服务器会把动态生成的Unicode内容转换为UTF-8再传输到浏览器：

       ![字符编码·图2](imgs/Unicode2.png)

       所以你看到很多网页的源码上会有类似`<meta charset="UTF-8" />`的信息，表示该网页正是用的UTF-8编码。

- Base64编码：

  Base64编码本质上是一种将二进制数据转成文本数据的方案。对于非二进制数据，是先将其转换成二进制形式，然后每连续6比特（2的6次方=64）计算其十进制值，根据该值在上面的索引表中找到对应的字符，最终得到一个文本字符串。

- 常见问题处理之Emoji

  所谓Emoji就是一种在Unicode位于\u1F601–\u1F64F区段的字符。这个显然超过了目前常用的UTF-8字符集的编码范围\u0000–\uFFFF。Emoji表情随着IOS的普及和微信的支持越来越常见。

  ![字符编码·图3](https://img-blog.csdnimg.cn/20181119221259676.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3podXNvbmd6aXll,size_16,color_FFFFFF,t_70)

  那么Emoji字符表情会对我们平时的开发运维带来什么影响呢？最常见的问题就在于将他存入MySQL数据库的时候。一般来说MySQL数据库的默认字符集都会配置成UTF-8，mysql支持的 utf8 编码最大字符长度为 **3 字节**，而utf8mb4在5.5以后才被支持，也很少会有DBA主动将系统默认字符集改成utf8mb4。那么问题就来了，当我们把一个需要4字节UTF-8编码才能表示的字符存入数据库的时候就会报错：ERROR 1366: Incorrect string value: '\xF0\x9D\x8C\x86' for column 。 如果认真阅读了上面的解释，那么这个报错也就不难看懂了。我们试图将一串Bytes插入到一列中，而这串Bytes的第一个字节是\xF0意味着这是一个四字节的UTF-8编码。但是当MySQL表和列字符集配置为UTF-8的时候是无法存储这样的字符的，所以报了错。

  那么遇到这种情况我们如何解决呢？有两种方式：升级MySQL到5.6或更高版本，并且将表字符集切换至utf8mb4。第二种方法就是在把内容存入到数据库之前做一次过滤，将Emoji字符替换成一段特殊的文字编码，然后再存入数据库中。之后从数据库获取或者前端展示时再将这段特殊文字编码转换成Emoji显示。第二种方法我们假设用-*-1F601-*-来替代4字节的Emoji，那么具体实现python代码可以参见[Stackoverflow上的回答](http://stackoverflow.com/questions/3220031/how-to-filter-or-replace-unicode-characters-that-would-take-more-than-3-bytes)

- 补码

  补码(为什么按位取反再加一)：告诉你一个其实很简单的问题 [原文](https://blog.csdn.net/wenxinwukui234/article/details/42119265)

### 网络

- [OSI七层模型与TCP/IP四层（参考）模型](https://www.jianshu.com/p/c793a279f698)

- 协议

  - 底层网络协议

    ​	ARP，ICMP（网际控制信息协议），路由选择，DHCP，NAT

  - TCP/IP

    - [TCP的三次握手与四次挥手（详解+动图）](https://blog.csdn.net/qzcsu/article/details/72861891)

    - 拥塞算法：**慢开始 、 拥塞避免 、快重传 和 快恢复**

      两者的区别：**流量控制**是为了预防拥塞。如：在马路上行车，交警跟红绿灯是流量控制，当发生拥塞时，如何进行疏散，是拥塞控制。流量控制指点对点通信量的控制。而**拥塞控制**是全局性的，涉及到所有的主机和降低网络性能的因素。

    - TCP和UDP的区别

      TCP/IP协议是一个**协议簇**。里面包括很多协议的。UDP只是其中的一个。之所以命名为TCP/IP协议，因为TCP,IP协议是两个很重要的协议，就用他两命名了。[原文](https://www.cnblogs.com/bizhu/archive/2012/05/12/2497493.html)

  - http/https

    - [彻底掌握网络通信](https://blog.csdn.net/yi_master/article/details/82863949) (httpclien，asynchttpclient，HttpURLConnection，OkHttp3)
    - 一次经典的错误：https://github.com/Ariescat/lqz-test/blob/master/base-test/src/main/http/http.log

  - websocket

- 非对称加密

  在非对称加密中使用的主要算法有：RSA、Elgamal、ESA、背包算法、Rabin、D-H、ECC（椭圆曲线加密算法）等。

  - https

    https客户端无法判断自己收到的服务器的公钥是否是正确的，是否在服务器发送给客户端的过程中被第三方篡改了，所以还需要证明公开密钥正确性的数字证书。

  - ssh

- 网络攻击

  - DDoS攻击

- ping 的实现：

  1. 首先查本地arp cache信息，看是否有对方的mac地址和IP地址映射条目记录
  2. 如果没有，则发起一个arp请求广播包，等待对方告知具体的mac地址
  3. 收到arp响应包之后，获得某个IP对应的具体mac地址，有了物理地址之后才可以开始通信了,同时对ip-mac地址做一个本地cache
  4. 发出icmp echo request包，收到icmp echo reply包

### IO

- IO概念

  - [网络IO中的同步、异步、阻塞和非阻塞](https://ariescat.github.io/2019/02/14/%E7%BD%91%E7%BB%9CIO%E4%B8%AD%E7%9A%84%E5%90%8C%E6%AD%A5-%E5%BC%82%E6%AD%A5-%E9%98%BB%E5%A1%9E%E5%92%8C%E9%9D%9E%E9%98%BB%E5%A1%9E/)

  - [迄今为止把同步/异步/阻塞/非阻塞/BIO/NIO/AIO讲的最清楚的好文章](https://juejin.im/post/5cff70c0f265da1ba56b14fd)

  - 《Netty Zookeeper Redis 高并发实战》[2.2节](https://weread.qq.com/web/reader/1e732510718f63a11e7dee2k6f4322302126f4922f45dec)

  - > **同步、异步：**  
    >
    > - 概念：消息的通知机制
    > - 解释：涉及到IO通知机制；所谓同步，就是发起调用后，被调用者处理消息，必须等处理完才直接返回结果，**没处理完之前是不返回的，调用者主动等待结果**；所谓异步，就是发起调用后，被调用者直接返回，但是并没有返回结果，等处理完消息后，通过状态、通知或者回调函数来通知调用者，调用者被动接收结果。
    >
    > **阻塞、非阻塞：**
    >
    > - 概念：**程序等待调用结果时的状态**
    > - 解释：涉及到CPU线程调度；所谓阻塞，就是调用结果返回之前，该执行线程会被挂起，不释放CPU执行权，线程不能做其它事情，只能等待，只有等到调用结果返回了，才能接着往下执行；所谓非阻塞，就是在没有获取调用结果时，不是一直等待，线程可以往下执行，如果是同步的，通过轮询的方式检查有没有调用结果返回，如果是异步的，会通知回调。

  - **Reactor模式**

- **零拷贝**

  [Java中的零拷贝](https://www.jianshu.com/p/2fd2f03b4cc3)，这篇文章耐心看完，他讲的是真透彻，他从概念上区分了广义和狭义零拷贝，讲解了系统底层层面上的，JDK NIO层面上的，Kafka、Netty层面上的。

  - Linux支持的(常见)零拷贝

    mmap内存映射，sendfile（linux 2.1支持），Sendfile With DMA Scatter/Gather Copy（可以看作是sendfile的增强版，批量sendfile），splice（linux 2.6.17 支持）。

    Linux零拷贝机制对比：无论是传统IO方式，还是引入零拷贝之后，2次DMA copy 是都少不了的。因为两次DMA都是依赖硬件完成的。

  - Java NIO引入了用于通道的缓冲区的ByteBuffer。 ByteBuffer有三个主要的实现：

    HeapByteBuffer，DirectByteBuffer，MappedByteBuffer

  - Netty中的零拷贝

    Netty中的Zero-copy与上面我们所提到到OS层面上的Zero-copy不太一样, Netty的Zero-copy完全是在用户态(Java层面)的，它的Zero-copy的更多的是偏向于优化数据操作这样的概念。

    - Netty提供了CompositeByteBuf类，它可以将多个ByteBuf合并为一个逻辑上的ByteBuf，避免了各个ByteBuf之间的拷贝。
    - 通过wrap操作，我们可以将byte[]数组、ByteBuf、 ByteBuffer 等包装成一个 Netty ByteBuf对象，进而避免了拷贝操作。
    - ByteBuf支持slice 操作，因此可以将ByteBuf分解为多个共享同一个存储区域的ByteBuf，避免了内存的拷贝。
    - 通过FileRegion包装的FileChannel.tranferTo实现文件传输，可以直接将文件缓冲区的数据发送到目标Channel，避免了传统通过循环write方式导致的内存拷贝问题。

    **前三个都是 广义零拷贝，都是减少不必要数据copy；偏向于应用层数据优化的操作。**

### MySQL/Redis

- MySQL

  - SQL

    - select

      > select: 即最常用的查询，是不加任何锁的
      >
      > select ... lock in share mode: 会加共享锁(Shared Locks)
      >
      > select ... for update: 会加排它锁

    - 联接子句 union，join

  - 数据类型

    - MySQL中的int(M)，int(M)里的M表示最大显示宽度，当加上zerofill才会表现出效果来。
    - unsigned

  - **事务**

    - 事务特性，ACID的含义

      1. 原子性

         a. 事务是一个原子操作单元

         b. 要么都做，要么都不做，没有第三种情况

         c. 原子性仅能够保证单个事务的一致性!

      2. 一致性

         a. 事务操作前和操作后都必须满足业务规则约束

         b. 比如资源数量一致：A向B转账，转账前和转账后AB两个账户的总金额必须是一致的

         c. **一致性是最基本的属性**，其它的三个属性都为了保证一致性而存在的。为了保证**并发情况下**的一致性，引入了**隔离性**，即保证每一个事务能够看到的数据总是一致的，就好象其它并发事务并不存在一样。

      3. 隔离性

         a. 多个并发事务同时对数据进行读写的能力

         b. 隔离性可以防止事务并发执行时由于交叉执行导致数据不一致的问题

      4. 持久性

         a. 对数据的修改是永久的

         b. 即使出现系统故障也不会丢失

    - 并发问题：

      1. 脏读

         一个事务正在对一条记录做修改，在这个事务提交之前，别的事务读取到了这个事务修改之后的数据，也就是说，一个事务读取到了其他事务还没有提交的数据，就叫做脏读。

      2. 不可重复读

         一个事务读某条数据读两遍，读到的是不一样的数据，也就是说，一个事务在进行中读取到了其他事务对旧数据的修改结果，（比如说 我开一个事务 修改某条数据 先查后改 执行修改动作的时候发现这条数据已经被别的事务删掉了）

      3. 幻读

         一个事务中，读取到了其他事务新增的数据，仿佛出现了幻象。（幻读与不可重复读类似，不可重复读是读到了其他事务update/delete的结果，幻读是读到了其他事务insert的结果）

      隔离级别：

      1. 读未提交（read-uncommitted）

         在一个事务中，可以读取到其他事务未提交的数据变化，这种读取其他会话还没提交的事务，叫做脏读现象，在生产环境中切勿使用。

      2. 读已提交（read-committed）

         Sql Server,Oracle默认

         在一个事务中，可以读取到其他事务已经提交的数据变化，这种读取也就叫做不可重复读，因为两次同样的查询可能会得到不一样的结果。

      3. 可重复读（repetable-read）

         MySQL默认

         在一个事务中，直到事务结束前，都可以反复读取到事务刚开始时看到的数据，并一直不会发生变化，避免了脏读、不可重复读现象，但是在SQL标准中它还是无法解决幻读问题。

      4. 可串行化（serializable）

         这是最高的隔离级别，它强制事务串行执行，避免了前面说的幻读现象，简单来说，它会在读取的每一行数据上都加锁，所以可能会导致大量的超时和锁争用问题。

      几个概念：

      1. 锁：Shared Locks(共享锁/S锁)、Exclusive Locks(排它锁/X锁)、Record Locks(行锁)、Gap Locks(间隙锁)、Next-Key Locks(间隙锁)

         > Record Locks是加在索引行(对！是索引行！不是数据行！)，Gap Locks和Next-Key Locks都属于索引锁

      2. 快照读（普通读）：snapshot read，通过MVCC机制读取历史数据的方式

         > select * from table ....

      3. 当前读：current read ，读取数据库最新版本数据的方式 

         > insert、update、delete、select for update、select lock in share mode

      **隔离性**底层实现原理：

      - MVCC(多版本并发控制)和锁

      - 读已提交和可重复读区别主要在于**MVCC版本的生成时机**

        RC是是**每次**`select`时，RR是**第一次**`select`时生成版本

      - 可串行化级别下，会自动将所有普通`select`转化为`select ... lock in share mode`执行，即针对同一数据的所有读写都变成互斥的了，可靠性大大提高，并发性大大降低。

      注意：

      1. 间隙锁锁住的是索引的间隙，可以理解为范围，如（2，5]，(5，7]

      2. 我们通过`update`、`delete`等语句加上的锁都是行级别的锁。只有`LOCK TABLE … READ`和`LOCK TABLE … WRITE`才能申请表级别的锁。

      3. RR级别下隐藏着一个操作，就是在事务A提交前，事务B已经进行过一次查询，否则，事务B会读取最新的数据。[原文](https://blog.csdn.net/thekenofdis/article/details/80736401)

      4. 为什么很多文章都产生误传，说是可重复读可以解决幻读问题！原因出自官网的一句话(地址是:`https://dev.mysql.com/doc/refman/5.7/en/innodb-locking.html#innodb-record-locks`)，原文内容如下

         > By default, InnoDB operates in REPEATABLE READ transaction isolation level. In this case, InnoDB uses next-key locks for searches and index scans, which prevents phantom rows (see Section 14.7.4, “Phantom Rows”).

         按照原本这句话的意思，应该是

         **InnoDB默认用了REPEATABLE READ。在这种情况下，使用next-key locks解决幻读问题！**

         结果估计，某个国内翻译人员翻着翻着变成了

         **InnoDB默认用了REPEATABLE READ。在这种情况下，可以解决幻读问题！**

         然后大家继续你抄我，我抄你，结果你懂的！

         显然，漏了"使用了next-key locks！"这个条件后，意思完全改变，我们在该隔离级别下执行语句

         ```sql
         select *  from tx_tb where pId >= 1;
         ```

         是快照读，是不加任何锁的，根本不能解决幻读问题，除非你用

         ```sql
         select *  from tx_tb where pId >= 1 lock in share mode;
         ```

         这样，你就用上了next-key locks，解决了幻读问题！

      5. 其实幻读很多时候是我们完全可以接受的

      总结：

      | 隔离级别 | 读数据一致性                           | 脏读 | 不可重复读 | 幻读   |
      | -------- | -------------------------------------- | ---- | ---------- | ------ |
      | 读未提交 | 最低级别，只保证不读取物理上损坏的数据 | 有   | 有         | 有     |
      | 读已提交 | 语句级                                 | 无   | 有         | 有     |
      | 可重复读 | 事务级                                 | 无   | 无         | 可能有 |
      | 可串行化 | 最高级别，事务级                       | 无   | 无         | 无     |

      参考链接：

      1. [深入理解mysql的事务隔离级别和底层实现原理](https://blog.csdn.net/suifeng629/article/details/99412343)

      2. [Mysql中select的正确姿势](https://www.cnblogs.com/rjzheng/p/9902911.html)，[新说Mysql事务隔离级别](https://www.cnblogs.com/rjzheng/p/9955395.html)，他的“[数据库系列](https://www.cnblogs.com/rjzheng/category/1281020.html)”都挺不错的

    - 事务传播（其实这个是`Spring`的概念，Spring它对JDBC的隔离级别作出了补充和扩展，其提供了7种事务传播行为）

      1. **PROPAGATION_REQUIRED：默认事务类型，如果没有，就新建一个事务；如果有，就加入当前事务。适合绝大多数情况。**
      2. PROPAGATION_REQUIRES_NEW：如果没有，就新建一个事务；如果有，就将当前事务挂起。
      3. PROPAGATION_NESTED：如果没有，就新建一个事务；如果有，就在当前事务中嵌套其他事务。
      4. PROPAGATION_SUPPORTS：如果没有，就以非事务方式执行；如果有，就使用当前事务。
      5. PROPAGATION_NOT_SUPPORTED：如果没有，就以非事务方式执行；如果有，就将当前事务挂起。即无论如何不支持事务。
      6. PROPAGATION_NEVER：如果没有，就以非事务方式执行；如果有，就抛出异常。
      7. PROPAGATION_MANDATORY：如果没有，就抛出异常；如果有，就使用当前事务。

  - MySQL中的锁（表锁、行锁，共享锁，排它锁，间隙锁）

  - 存储引擎

    - InnoDB

- 索引

  - 聚簇索引和非聚簇索引

  - 索引结构 B+树？

  - 联合索引的最左前缀匹配原则

    > mysql会一直向右匹配直到遇到范围查询(>、<、between、like)就停止匹配，比如a = 1 and b = 2 and c > 3 and d = 4 如果建立(a,b,c,d)顺序的索引，d是用不到索引的，如果建立(a,b,d,c)的索引则都可以用到，a,b,d的顺序可以任意调整。

  - MYSQL如何挑选索引

- 日志

  - [MySQL的日志系统](https://www.cnblogs.com/ivy-zheng/p/11094528.html)

  - redo/undo log，binlog

  - 慢日志

    可以设置一个时间，那么所有执行时间超过这个时间的SQL都会被记录下来。这样就可以通过慢日志快速的找到网站中SQL的瓶颈来进行优化。

  - MySQL的 **Crash Safe**

    - [Crash Safe和Binlog的关系](https://blog.csdn.net/shaochenshuo/article/details/73239949)

- 备份与恢复

  - 冷备份，热备份
    - cp，mysqldump，lvm2快照，xtrabackup
  - [mysql误删数据快速恢复](https://www.cnblogs.com/-mrl/p/9959365.html)

- 高级

  - explain

    explain显示了mysql如何使用索引来处理select语句以及连接表。可以帮助选择更好的索引和写出更优化的查询语句。

- 分布式

  - **主从**复制，分库分表

- 编码

  - utf8_general_ci、utf8_unicode_ci和utf8_bin的区别
  - [彻底解决mysql中文乱码 - CSDN博客](https://blog.csdn.net/u012410733/article/details/61619656)

- NoSQL

  - Redis

    Redis是一种基于键值对(Key-Value)的NoSQL数据库，Redis的Value可以由String，hash，list，set，zset，**Bitmaps**，**HyperLogLog**等多种数据结构和算法组成。Redis还提供了键过期，发布订阅，事务，Lua脚本，哨兵，Cluster等功能。

    - 源码

      - [带有详细注释的 Redis 3.0 代码](https://github.com/huangz1990/redis-3.0-annotated)

    - [《吊打面试官》系列-缓存雪崩、击穿、穿透](https://blog.csdn.net/qq_35190492/article/details/102889333)

      防止缓存穿透：增加校验，缓存，**布隆过滤器（Bloom Filter）**，hyperloglog

    - 书籍

      - 《redis设计与实现(第二版)》

  - Memcache

    - Redis之与Memcached的比较

  - MongoDB

    1. [为什么Mongodb索引用B树，而Mysql用B+树?](https://www.cnblogs.com/rjzheng/p/12316685.html)
  
  - Elasticsearch

### C/C++

> 在学习skynet源码的时候，需要看C和lua，因此这里记一下C相关的用法

- [动态申请二维数组](https://blog.csdn.net/qq_41822235/article/details/81142107)

  - 利用一个**二级指针**来实现

    ```c
    //5行2列的数组
    int **p = (int **)malloc(sizeof(int *) * 5);
    for (int i = 0; i < 5; ++i) {
        p[i] = (int *)malloc(sizeof(int) * 2);
    }
    //输出数组每个元素地址
    printf("%p\n", &p[i][j]);
    ```

  - 利用**数组指针**来实现

    ```c
    //申请一个5行2列的整型数组
    int(*p)[2] = (int(*)[2])malloc(sizeof(int) * 5 * 2);
    //输出数组每个元素地址
    printf("%p\n", &p[i][j]);
    ```

  - 利用**一维数组**来模拟二维数组

    ```c
    int *p = (int *)malloc(sizeof(int) * 5 * 2);
    //输出数组每个元素地址
    printf("%p\n", &p[i*2+j]);
    ```

    > `malloc`返回的其实是`void *`，所以其需要强转，`void *`的用处还有`memcpy`，`memset`等

- 内存对齐 是什么？

### 操作系统

- 进程管理
  - [进程和线程](https://blog.csdn.net/weixin_43517199/article/details/89508381)
- 死锁
- 内存管理
- 设备管理
- Linux
  - [CentOS7简单使用](Linux#CentOS7)
  - 进程间通信：[管道](https://www.cnblogs.com/zengyiwen/p/5755170.html)
- Windows
  - hiberfil.sys和pagefile.sys占用系统空间，其分别是休眠空间和虚拟内存。
- 其他
  - 虚拟内存和swap分区

### 前端

- HTML/CSS/JS
- ECMAScript
- Bootstrap 教程 - 菜鸟教程
- [Vue](https://cn.vuejs.org/)
  - 双向数据绑定与单向数据绑定
  - [Vuex](https://vuex.vuejs.org/zh/)，[Weex](http://weex.apache.org/cn/)
- React
  - [React 入门实例教程](http://www.ruanyifeng.com/blog/2015/03/react.html)
- Flux 架构
  - [Flux 架构入门教程](http://www.ruanyifeng.com/blog/2016/01/flux.html)
- 状态管理
  - [聊一聊主流前端框架的状态管理](https://www.cnblogs.com/axel10/archive/2018/03/15/8571757.html)
  - [前端状态管理请三思](https://juejin.im/post/59fd94475188254115703461)
- 其他
  - [给2019前端的5个建议](https://juejin.im/post/5c617c576fb9a049e93d33a4)
  - [浏览器原理系列10篇正式完结](https://juejin.im/post/5c6d3e026fb9a04a0d576f98)

### Github干货

- [521xueweihan / HelloGitHub](https://github.com/521xueweihan/HelloGitHub)  分享 GitHub 上有趣、入门级的开源项目 

- awesome

  - [hadyang / interview](https://github.com/hadyang/interview)

    Java 笔试、面试 知识整理

  - [Snailclimb / JavaGuide](https://github.com/Snailclimb/JavaGuide)

    【Java学习+面试指南】 一份涵盖大部分Java程序员所需要掌握的核心知识。 

  - [jobbole / awesome-java-cn](https://github.com/jobbole/awesome-java-cn)

    Java资源大全中文版，包括开发库、开发工具、网站、博客、微信、微博等，由伯乐在线持续更新。

    同时他还有 [jobbole / awesome-python-cn](https://github.com/jobbole/awesome-python-cn)，[jobbole / awesome-cpp-cn](https://github.com/jobbole/awesome-cpp-cn)

  - [AobingJava / JavaFamily](https://github.com/AobingJava/JavaFamily)

    【互联网一线大厂面试+学习指南】进阶知识完全扫盲：涵盖高并发、分布式、高可用、微服务等领域知识，作者风格幽默，看起来津津有味，把学习当做一种乐趣，何乐而不为，后端同学必看 

    附其CSDN博客（《吊打面试官》系列）：[https://me.csdn.net/qq_35190492](https://me.csdn.net/qq_35190492)

  - [xingshaocheng / architect-awesome](https://github.com/xingshaocheng/architect-awesome)  

    后端架构师技术图谱

  - [crossoverJie / JCSprout](https://github.com/crossoverJie/JCSprout) 

    Java Core Sprout : basic, concurrent, algorithm 

  - [javagrowing / JGrowing](https://github.com/javagrowing/JGrowing)

    Java成长路线，但学到不仅仅是Java。 

- Java高并发

  - [seckill](https://github.com/liyifeng1994/seckill)

- Android

  - [henrymorgen / android-advanced-decode](https://github.com/henrymorgen/android-advanced-decode)  《Android进阶解密》源码 

- 游戏相关

  - [hstcscolor / awesome-gameserver-cn](https://github.com/hstcscolor/awesome-gameserver-cn)  中文游戏服务器资源大全 

  - ARPG

    - 永恒之塔开源服务器架构 [https://github.com/Aion-server/Aion-unique](https://github.com/Aion-server/Aion-unique)

    - 天堂2 l2jserver2 

      [https://github.com/oonym/l2InterludeServer](https://github.com/oonym/l2InterludeServer)

      [https://github.com/Rogiel/l2jserver2](https://github.com/Rogiel/l2jserver2)

    - 魔兽世界server TrinityCore [https://github.com/TrinityCore/TrinityCore](https://github.com/TrinityCore/TrinityCore)

  - tinyHeart [https://github.com/luckykun/tinyHeart](https://github.com/luckykun/tinyHeart)

- 常见框架源码

  - tomcat
  - dubbo
  - spring
  - zookeeper

- 源码解读

  - [huangz1990 / redis-3.0-annotated](https://github.com/huangz1990/redis-3.0-annotated)  带有详细注释的 Redis 3.0 代码 

### 知识体系

- [Github优秀java项目集合（中文版） - 涉及java所有的知识体系](https://blog.csdn.net/aa1215018028/article/details/80951389)
- [伯乐在线](http://hao.jobbole.com/)
- [《成神之路系列文章》](http://www.hollischuang.com/archives/1001)
- [超强总结！Github上那些Java面试、学习相关仓库](https://mp.weixin.qq.com/s?__biz=Mzg3MjA4MTExMw==&mid=2247486161&idx=1&sn=b7bd2bffc50f5f64368d6e40c973619a&chksm=cef5f967f9827071badcdcf1ae8c162ad2176e44978ce3d8d138a94ae843e9232c1fb6d4ec36&scene=21#wechat_redirect)

### 面经汇总

- Java面经汇总
  - ImportNew
    1. [Java线程面试题 Top 50 - ImportNew](http://www.importnew.com/12773.html)
  - 掘金
    1. [Java面试通关要点汇总集 - 掘金](https://juejin.im/post/5a94a8ca6fb9a0635c049e67?utm_source=gold_browser_extension#heading-1)
    2. [Java面试通关要点汇总集(基础篇之基本功，非原作者) - 掘金](https://juejin.im/post/5a9690fc5188257a865da3ee?utm_source=gold_browser_extension)
    3. [JavaEE面试题收集 - 掘金](https://juejin.im/post/58a6ad5461ff4b78fca442eb)
    4. [一个两年Java的面试总结 - 掘金](https://juejin.im/post/5a9f5ce86fb9a028de443ed9?utm_source=gold_browser_extension)
  - 2020年收录：
    - [强烈推荐！15 个 Github 顶级 Java 教程类开源项目推荐！](https://blog.csdn.net/qq_34337272/article/details/104423823)
    - [Java基础知识面试题（2020最新版）](https://blog.csdn.net/ThinkWon/article/details/104390612)
    - [【阿里P6面经】二本，curd两年，疯狂复习，拿下阿里offer](https://blog.csdn.net/qq_35190492/article/details/105186878)
- 大厂面经
  - [面试心得与总结—BAT、网易、蘑菇街 - ImportNew](http://www.importnew.com/22637.html)
- 经历分享
  - [2017年秋季校招面经 - CSDN博客](http://blog.csdn.net/huachao1001/article/details/52247268)
  - [我的求职经历——遍览国内一流IT企业(转） - lonelycatcher - 博客园](http://www.cnblogs.com/lonelycatcher/archive/2012/03/10/2388889.html)

### 博客

- 职场
  - [如何入职心仪的游戏公司？ 游戏策划从入门到入行](https://www.gameres.com/840718.html)
- 年度报告
  - [阿里研究院：2016年校园快递行业发展报告](http://www.199it.com/archives/530127.html)
  - [SegmentFault 年度内容盘点 - 2016](https://summary.segmentfault.com/2016/#/)
- 其他
  - [究竟怎样写代码才算是好代码 - CSDN博客](http://blog.csdn.net/u013970991/article/details/52609083)
  - [成为Java顶尖程序员 ，看这11本书就够了 - CSDN博客](https://blog.csdn.net/u012410733/article/details/51869105)

### 学习网站

- [慕课网手记](http://www.imooc.com/article)
- unity3d
  - 愤怒的小鸟 [https://www.bilibili.com/video/av35565116/](https://www.bilibili.com/video/av35565116/)

### 其他

- 软件集
  - everything
  - wox（window快速搜索文件启动程序软件）
  - 系统镜像
    - [https://msdn.itellyou.cn/](https://msdn.itellyou.cn/)
  - HTTP接口测试工具
    - Postman
  - PanDownload
- Android [➮详细](Android)
- Linux常用服务搭建
  - [Shadowsocks](Linux#Shadowsocks)
  - [Nginx](Linux#Nginx)
  - [Ngrok](Linux#Ngrok)

### 游戏相关

- [游戏学院 - 腾讯大学](https://daxue.qq.com/game)
- 安全
  - [游戏安全实验室](https://gslab.qq.com/portal.php?mod=view&aid=94)
- [GameRes游资网-游戏开发者门户](https://www.gameres.com/)

### 相关书籍

- Java
  - 《Java并发编程》《Effective Java》
- Spring
  - 《Spring 源码深度解析 第二版》《Spring实战》
  - 《Spring Boot编程思想（核心篇）》![书籍·图1](https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3621582485,3050859261&fm=58&bpow=800&bpoh=940)《Spring Boot实战》
  - 《Spring 微服务实战》
- Netty、Tomcat
- MySQL 《高性能MySQL》