---
layout: docs
title: "Awesome"
subtitle: "\"全栈之路 技术体系汇总（不断收集整理中...）\""
date: 2019-01-25
author: Ariescat
header-img: "img/post-bg-kuaidi.jpg"
catalog: true



---

<h1>《技术图谱》</h1>
### Github项目

- awesome
  - [architect-awesome](https://github.com/xingshaocheng/architect-awesome)
  - [JCSprout](https://github.com/crossoverJie/JCSprout)
  - [JavaGuide](https://github.com/Snailclimb/JavaGuide)
  - 《吊打面试官》系列
    - [https://github.com/AobingJava/JavaFamily](https://github.com/AobingJava/JavaFamily)
    - [https://me.csdn.net/qq_35190492](https://me.csdn.net/qq_35190492)
  
- 游戏开源项目
  
  - ARPG
    
    - 永恒之塔开源服务器架构 [https://github.com/Aion-server/Aion-unique](https://github.com/Aion-server/Aion-unique)
    
    - 天堂2 l2jserver2 
    
      [https://github.com/oonym/l2InterludeServer](https://github.com/oonym/l2InterludeServer)
    
      [https://github.com/Rogiel/l2jserver2](https://github.com/Rogiel/l2jserver2)
    
    - 魔兽世界server TrinityCore [https://github.com/TrinityCore/TrinityCore](https://github.com/TrinityCore/TrinityCore)
    
  - tinyHeart [https://github.com/luckykun/tinyHeart](https://github.com/luckykun/tinyHeart)
  
- Java高并发
  
  - [seckill](https://github.com/liyifeng1994/seckill)
  
- 其他源码

  - tomcat
  - dubbo
  - spring
  - zookeeper

### 知识体系

- [Github优秀java项目集合（中文版） - 涉及java所有的知识体系](https://blog.csdn.net/aa1215018028/article/details/80951389)
- [伯乐在线](http://hao.jobbole.com/)
- [《成神之路系列文章》](http://www.hollischuang.com/archives/1001)
- [超强总结！Github上那些Java面试、学习相关仓库](https://mp.weixin.qq.com/s?__biz=Mzg3MjA4MTExMw==&mid=2247486161&idx=1&sn=b7bd2bffc50f5f64368d6e40c973619a&chksm=cef5f967f9827071badcdcf1ae8c162ad2176e44978ce3d8d138a94ae843e9232c1fb6d4ec36&scene=21#wechat_redirect)

### 学习

- [慕课网手记](http://www.imooc.com/article)
- [Python教程 - 廖雪峰的官方网站](https://www.liaoxuefeng.com/wiki/0014316089557264a6b348958f449949df42a6d3a2e542c000)
- [PHP 教程 - 菜鸟教程](http://www.runoob.com/php/php-tutorial.html)
- unity3d
  - 愤怒的小鸟 [https://www.bilibili.com/video/av35565116/](https://www.bilibili.com/video/av35565116/)

### Java [➮详细](Java)

- 代理
  - JDK动态代理
  - Cgliib 
- Unsafe
- 语法糖
- 设计模式
  - koloboke
- 集合
- IO
  - IO流
  - 同步、异步、阻塞和非阻塞
  - Reactor模式
- 并发
  - synchronized
  - volatile
  - 线程池
  - Atomic
  - AQS
  - 并发容器
  - Monitor对象
  - ForkJoin
  - Actor模型
- Jvm
  - **内存模型**
  - ClassLoader
  - 热更
- Java8
  - parallelStream
- 常遇的报错与坑
  - ConcurrentModificationException

### 主流框架

- 常用框架

  - Log

    - [Java日志，需要知道的几件事(commons-logging,log4j,slf4j,logback) - CSDN博客](http://blog.csdn.net/kobejayandy/article/details/17335407)
    - **Flume**构建日志采集系统

  - [Java代码生成利器之rapid-generate应用](http://blog.csdn.net/likeaboy_fire/article/details/44024987)

  - ASM

    spring-core自带有asm，org.ow2.asm也是一个轻量级的jar

  - Apache commons

    - IO

      - FileAlterationObserver

        （梦爷曾发现这里每隔10秒会涨10M内存）

      - FileAlterationMonitor

  - [Google Guava](https://ifeve.com/google-guava/)

    集合 [collections] 、缓存 [caching] 、原生类型支持 [primitives support] 、**并发库** [concurrency libraries] 、通用注解 [common annotations] 、字符串处理 [string processing] 、I/O 等等

    > eg:
    >
    > ​	BloomFilter布隆过滤器

  - **Caffeine** 来自未来的缓存

    Caffeine是基于JAVA 1.8 Version的高性能缓存库。Caffeine提供的内存缓存使用参考Google guava的API。Caffeine是基于Google Guava Cache设计经验上改进的成果。

  - **Koloboke** 集合框架

    可以[**避免开销很大的装箱/拆箱操作，节省了原始类型装箱消耗的内存**](https://blog.csdn.net/qinyongye/article/details/81282961)。

  - **joda** 对时间的操作

  - Quartz

- Spring

  - [Spring源码浅析](https://blog.csdn.net/linuu/column/info/lovespring)

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

  - [Spring Webflux](https://www.jianshu.com/p/c029de45d23b) （与前端Flux架构名字相同）

  - Spring Data

    - [Spring Data JPA 简单查询--接口方法 - 如莲家园 - 博客园](https://www.cnblogs.com/rulian/p/6557471.html)

  - 框架整合

    - [企业大型互联网分布式架构{Java分布式架构 dubbo+springmvc+mybatis+ehcach+redis }-IT未来-ITPUB博客](http://m.blog.itpub.net/31452580/viewspace-2148363/)
    - [手把手教你从最基本的Java工程搭建SpringMVC+SpringDataJPA+Hibernate(含源码下载) - anxpp的博客 - CSDN博客](http://blog.csdn.net/anxpp/article/details/51415366)

  - Spring Boot

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
- 领域驱动设计
  - [领域驱动设计在互联网业务开发中的实践](https://tech.meituan.com/2017/12/22/ddd-in-practice.html)

  - [美团DDD实践 示例项目](https://github.com/1987539447/draw-lottery)

### 分布式技术

- IO操作
  - [IO复用,AIO,BIO,NIO,同步，异步，阻塞和非阻塞 区别](https://www.cnblogs.com/aspirant/p/6877350.html)
- RPC
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

### 其他技术

- **AI**
  - 状态机 行为树
- docker
- ServiceMesh(服务网格)
- 中台服务
- 分布式、大数据、人工智能、区块链

### 构建工具

- Gradle
  - [十分钟理解Gradle - Bonker - 博客园](https://www.cnblogs.com/Bonker/p/5619458.html)
  - [大家都是怎样处理Gradle中的这个文件下载慢的问题的？ - 知乎](https://www.zhihu.com/question/37810416)
- Maven
  - [如何将 Java 项目转换成 Maven 项目 - 船长&amp;CAP - 博客园](https://www.cnblogs.com/liuning8023/p/4726822.html)

* Jenkins

### 版本管理

- Git
  - [git 简明指南](http://www.runoob.com/manual/git-guide/)
  - [团队中的 Git 实践](https://blog.csdn.net/M2l0ZgSsVc7r69eFdTj/article/details/100773494)

### 脚本语言

- [Groovy](脚本语言#Groovy)
  - [30分钟groovy快速入门并掌握](https://www.cnblogs.com/amosli/p/3970810.html)
  - [Groovy 语言快速入门](https://www.jianshu.com/p/e8dec95c4326)
- Groovy与Java
  - [实战 Groovy，在 Java 应用程序中加一些 Groovy 进来](https://www.ibm.com/developerworks/cn/java/j-pg05245/)
  - [利用SPRING管理热加载的GROOVY对象](https://palexu.github.io/posts/spring-dynamic-load-groovy-bean?hmsr=toutiao.io&utm_medium=toutiao.io&utm_source=toutiao.io)
  - [spring + groovy 很强大](https://blog.csdn.net/qq362228416/article/details/8811136)
  - [Spring动态部署Bean/Controller/Groovy Controller](https://jinnianshilongnian.iteye.com/blog/1999284)
- Groovy与DSL
  - [Gradle：新一代自动化构建工具](http://hao.jobbole.com/gradle/)
  - [Groovy DSL 百度搜索](https://www.baidu.com/s?ie=utf8&oe=utf8&wd=Groovy DSL&tn=98010089_dg&ch=4)
  - [gradle dsl](https://www.baidu.com/s?ie=utf8&oe=utf8&wd=gradle dsl&tn=98010089_dg&ch=5)

### 数据结构

- 堆：一个可以被看做一棵树的数组
- 二叉树
  - **遍历**
  - 完全二叉树
  - 满二叉树 
  - 平衡二叉树
    - AVL树
    - 红黑树
      - [查找（一）史上最简单清晰的红黑树讲解 - CSDN博客](http://blog.csdn.net/yang_yulei/article/details/26066409)
      - [查找（二）简单清晰的B树、Trie树详解 - CSDN博客](http://blog.csdn.net/yang_yulei/article/details/26104921)
    - Treap
    - BST
- 跳表

### 算法

- 算法思想

  - [算法洗脑系列（8篇）——第一篇 递推思想 - 一线码农 - 博客园](http://www.cnblogs.com/huangxincheng/archive/2011/12/29/2305525.html)

- 常见算法

  - 排序

    希尔排序

    堆排序

  - KPM 算法

    - [kpm算法 - u012361418的博客 - CSDN博客](http://blog.csdn.net/u012361418/article/details/46125439)
    - [KMP算法及优化 - 疯狂的爱因斯坦 - SegmentFault](https://segmentfault.com/a/1190000007066358#articleHeader4)

- 五大常用算法：贪婪算法，动态规划算法，分治算法，回溯算法以及分支限界算法

- 启发式算法

  - 遗传算法（GA）

- 练习平台

  - [赛码网](http://www.acmcoder.com/index)
  - [IT题库_笔试练习_C++Java前端笔试面试题_牛客网](https://www.nowcoder.com/contestRoom)
  - [leetcode在线编程_牛客网](https://www.nowcoder.com/ta/leetcode)
  - [题库 - 力扣 (LeetCode)](https://leetcode-cn.com/problemset/all/)
  - [“蓝桥杯”练习系统](http://lx.lanqiao.cn/problemsets.page)
  - [杭电](http://acm.hdu.edu.cn/listproblem.php?vol=1)
  - [练习场 - ACM在线评测系统](http://acm.nyist.net/JudgeOnline/problemset.php)
  - [Welcome To PKU JudgeOnline](http://poj.org/)

### 字符编解码

- 字符编码

  UTF-32、UTF-16和 UTF-8 是 Unicode 标准的编码字符集的字符编码方案

- 字符集

  ASCII、Unicode

### 网络

- 协议
  - TCP/IP
    - [TCP的三次握手与四次挥手（详解+动图）](https://blog.csdn.net/qzcsu/article/details/72861891)
  - http
    - [彻底掌握网络通信](https://blog.csdn.net/yi_master/article/details/82863949) (httpclien，asynchttpclient，HttpURLConnection，OkHttp3)
    - 一次经典的错误：https://github.com/Ariescat/lqz-test/blob/master/base-test/src/main/http/http.log
- 零拷贝

### 数据库/Redis

- MySQL

  - [彻底解决mysql中文乱码 - CSDN博客](https://blog.csdn.net/u012410733/article/details/61619656)

  - 联接子句 union，join

  - **事物传播**

  - **隔离级别**

    - MySQL中的锁（表锁、行锁，共享锁，排它锁，间隙锁）

  - 索引

    - 联合索引的最左前缀匹配原则

      > mysql会一直向右匹配直到遇到范围查询(>、<、between、like)就停止匹配，比如a = 1 and b = 2 and c > 3 and d = 4 如果建立(a,b,c,d)顺序的索引，d是用不到索引的，如果建立(a,b,d,c)的索引则都可以用到，a,b,d的顺序可以任意调整。

    - MYSQL如何挑选索引

  - explain

    explain显示了mysql如何使用索引来处理select语句以及连接表。可以帮助选择更好的索引和写出更优化的查询语句。

  - redo/undo log，binlog

    - [MySQL的日志系统](https://www.cnblogs.com/ivy-zheng/p/11094528.html)

  - 备份与恢复

    - 冷备份，热备份
    - cp，mysqldump，lvm2快照，xtrabackup
    - [mysql误删数据快速恢复](https://www.cnblogs.com/-mrl/p/9959365.html)

  - MySQL的 **Crash Safe**

    - [Crash Safe和Binlog的关系](https://blog.csdn.net/shaochenshuo/article/details/73239949)

  - 慢日志

    可以设置一个时间，那么所有执行时间超过这个时间的SQL都会被记录下来。这样就可以通过慢日志快速的找到网站中SQL的瓶颈来进行优化。

  - 主从复制，分库分表

- NoSQL

  - Redis
    
    - 源码
      
      - [带有详细注释的 Redis 3.0 代码](https://github.com/huangz1990/redis-3.0-annotated)
      
    - [《吊打面试官》系列-缓存雪崩、击穿、穿透](https://blog.csdn.net/qq_35190492/article/details/102889333)
    
      防止缓存穿透：增加校验，缓存，**布隆过滤器（Bloom Filter）**
    
    - 书籍
    
      - 《redis设计与实现(第二版)》
    
  - Memcache
  
    - Redis之与Memcached的比较
  
  - MongoDB
  
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

### 操作系统 [➮详细](Linux)

- Linux
  - [CentOS7简单使用](Linux#CentOS7)
- Linux常用服务搭建
  - [Shadowsocks](Linux#Shadowsocks)
  - [Nginx](Linux#Nginx)
  - [Ngrok](Linux#Ngrok)
- Windows
  - hiberfil.sys和pagefile.sys占用系统空间，其分别是休眠空间和虚拟内存。
- 虚拟内存和swap分区

### Android [➮详细](Android)

### 前端

- HTML/CSS/JS
  - [HTML 教程](http://www.w3school.com.cn/html/index.asp)
  - [ECMAScript 6入门](http://es6.ruanyifeng.com/#docs/let)
  - [Bootstrap 教程 - 菜鸟教程](http://www.runoob.com/bootstrap/bootstrap-tutorial.html)
- 双向数据绑定与单向数据绑定
- [Vue](https://cn.vuejs.org/)
  - [Vuex](https://vuex.vuejs.org/zh/)
  - [Weex](http://weex.apache.org/cn/)
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

### 工具集

- everything
- wox（window快速搜索文件启动程序软件）
- 系统镜像
  - [https://msdn.itellyou.cn/](https://msdn.itellyou.cn/)
- HTTP接口测试工具
  - Postman
- PanDownload

### 职场

- [如何入职心仪的游戏公司？ 游戏策划从入门到入行](https://www.gameres.com/840718.html)

### 面经汇总

- Java面经汇总
  - [Java线程面试题 Top 50 - ImportNew](http://www.importnew.com/12773.html)
  - [Java面试通关要点汇总集 - 掘金](https://juejin.im/post/5a94a8ca6fb9a0635c049e67?utm_source=gold_browser_extension#heading-1)
  - [Java面试通关要点汇总集(基础篇之基本功，非原作者) - 掘金](https://juejin.im/post/5a9690fc5188257a865da3ee?utm_source=gold_browser_extension)
  - [JavaEE面试题收集 - 掘金](https://juejin.im/post/58a6ad5461ff4b78fca442eb)
  - [一个两年Java的面试总结 - 掘金](https://juejin.im/post/5a9f5ce86fb9a028de443ed9?utm_source=gold_browser_extension)
- Android面经汇总
  - [［干货］2017已来，最全面试总结——这些Android面试题你一定需要 - CSDN博客](https://blog.csdn.net/xhmj12/article/details/54730883)
- 大厂面经
  - [面试心得与总结—BAT、网易、蘑菇街 - ImportNew](http://www.importnew.com/22637.html)
- 经历分享
  - [2017年秋季校招面经 - CSDN博客](http://blog.csdn.net/huachao1001/article/details/52247268)
  - [我的求职经历——遍览国内一流IT企业(转） - lonelycatcher - 博客园](http://www.cnblogs.com/lonelycatcher/archive/2012/03/10/2388889.html)
- 其他推荐
  - [剑指 offer 题解](https://github.com/CyC2018/Interview-Notebook/blob/master/notes/%E5%89%91%E6%8C%87%20offer%20%E9%A2%98%E8%A7%A3.md)
  - [技术面试需要掌握的基础知识 - 后端 - 掘金](https://juejin.im/entry/5a98a78f518825558358a3d9?utm_source=gold_browser_extension)
  - [Leetcode 题解](https://github.com/CyC2018/Interview-Notebook/blob/master/notes/Leetcode%20%E9%A2%98%E8%A7%A3.md)
  - [微软经典面试100题系列（部分） - CSDN博客](http://blog.csdn.net/zhoudaxia/article/details/8884557)
  - [直通BAT面试算法精讲课_C++Java前端经典笔试面试题精讲_牛客网](https://www.nowcoder.com/courses/1)
  - [牛课堂系列算法讲座_牛客网](https://www.nowcoder.com/courses/6)
  - [牛课堂算法精讲直播讲座（2016）_牛客网](https://www.nowcoder.com/live/11)

### 博客

- 年度报告
  - [阿里研究院：2016年校园快递行业发展报告](http://www.199it.com/archives/530127.html)
  - [SegmentFault 年度内容盘点 - 2016](https://summary.segmentfault.com/2016/#/)
- 其他
  - [究竟怎样写代码才算是好代码 - CSDN博客](http://blog.csdn.net/u013970991/article/details/52609083)
  - [成为Java顶尖程序员 ，看这11本书就够了 - CSDN博客](https://blog.csdn.net/u012410733/article/details/51869105)

### 游戏相关

- 一些游戏框架
  - skynet
  - Pinus
- [游戏学院 - 腾讯大学](https://daxue.qq.com/game)
- 安全
  - [游戏安全实验室](https://gslab.qq.com/portal.php?mod=view&aid=94)
- [GameRes游资网-游戏开发者门户](https://www.gameres.com/)
- [TapTap - 发现好游戏](https://www.taptap.com/)

### 相关书籍

- Java
  - 《Java并发编程》《Effective Java》
- Spring
  - 《Spring 源码深度解析 第二版》《Spring实战》
  - 《Spring Boot编程思想（核心篇）》![](https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3621582485,3050859261&fm=58&bpow=800&bpoh=940)《Spring Boot实战》
  - 《Spring 微服务实战》
- Netty、Tomcat
- MySQL
  - 《高性能MySQL》