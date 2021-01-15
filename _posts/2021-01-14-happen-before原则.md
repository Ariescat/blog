---
layout:     post
title:      happen-before原则
subtitle:   "\"你们真的了解过happen-before原则吗?\""
date:       2021-01-14
author:     Ariescat
header-img: img/pixabay/castelmezzano-1979546_1280.jpg
catalog:    true
keyword:    Java,volatile,happen-before
tags:
    - Java
---





假设有这样一个场景：

某个游戏服里需要通过一个`String`类型的账号，构建一个`Player`数据类，但由于`Player`的构建比较复杂，耗时较长，所有通常需要缓存起来，其代码如下：

```Java
public class PlayerCache {
    private final static Map<String, Player> playerCache = new HashMap<>();

    private PlayerCache() {
        throw new RuntimeException("the PlayerHelper cannot be instantiated!");
    }

    public static Player getPlayer(String account) {
        Player player = playerCache.get(account); //1
        if (player == null) {
            synchronized (playerCache) {
                player = playerCache.get(account);
                if (player == null) {
                    player = Player.valueOf();
                    playerCache.put(account, player); //2
                }
            }
        }
        return player;
    }

    static class Player {
        public static Player valueOf() {
            // 假设这里是个复杂对象，方法耗时较长
            return new Player();
        }
    }
}
```

以上用了单例设计模式中很常见的**“double check lock”**模式。首先在不加锁的情况下判断`playerCache`中是否已有查询的key值，如果存在那么直接返回其对应的value值；如果不存在：加锁，判空，构建数据。

该代码在高并发的条件下，对于不加锁的命中缓存情况效果是很可观的。但是了解过Java内存模型的朋友应该能发现这有个线程安全问题：线程B，在执行`//1`处的`map.get(key)`方法时，不一定能获取线程A在`//2` 处放到map中的value值，这是**可见性问题**。而如果线程B不能在 //1处拿到值，则需要加锁，判空...

`volatile`关键字的设计就是为了满足操作可见性的。可受此启发设计如下：

```java
public class PlayerCache {
    private final static Map<String, Player> playerCache = new HashMap<>();
    private static volatile long num = 0;

    private PlayerCache() {
        throw new RuntimeException("the PlayerHelper cannot be instantiated!");
    }

    public static Player getPlayer(String account) {
        Player player;
        if (num > 0) { //1
            player = playerCache.get(account); //2
            if (player == null) {
                synchronized (playerCache) {
                    player = playerCache.get(account);
                    if (player == null) {
                        player = Player.valueOf();
                        playerCache.put(account, player); //3
                        num++;
                    }
                }
            }
        } else {
            synchronized (playerCache) {
                player = playerCache.get(account);
                if (player == null) {
                    player = Player.valueOf();
                    playerCache.put(account, player);
                    num++;
                }
            }
        }
        return player;
    }

    static class Player {
        public static Player valueOf() {
            // 假设这里是个复杂对象，方法耗时较长
            return new Player();
        }
    }
}
```

这段代码中，`num`变量被定义为一个volatile的变量，`//1`处的读volatile变量就是为了触发了**“volatile的happen-before原则”**和**“happen-before的传递性原则”**。所以可以保证线程B在`//2`处**一定可以拿到**线程A放到map中的value值。

下面把教科书上的内容贴一下，结合上面的代码来看一下吧：

### happens before

（先行发生原则）

概念：如果存在hb(a,b)，那么**操作a及a之前在内存上面所做的操作**（如赋值操作等）都对操作b可见，即操作a影响了操作b  
Ps：hb(a,b) presents “a happens before b”  
Ps：先行发生是一个逻辑上的概念，并非真实的执行的先后顺序

1）程序次序规则（Program Order Rule） `在一个线程内`，按照程序代码顺序，书写在前面的操作Happens-Before书写在后面的操作

线程中上一个动作及之前的所有写操作在该线程执行下一个动作时对该线程可见**（也就是说，同一个线程中前面的所有写操作对后面的操作可见）**，在同一个线程内，即使发生了指令重排序，书写在前面的代码也是先行发生于书写在后面的代码的。

2）线程锁定规则（Monitor Lock Rule） An unlock on a monitor happens-before every subsequent lock on that monitor.

如果线程1解锁了monitor a，接着线程2锁定了a，那么，线程1解锁a及其之前的（写）操作都对线程2可见（线程1和线程2可以是同一个线程）。

3）volatile变量规则（volatile Variable Rule） A write to a volatile field happens-before every subsequent read of that volatile.

如果线程1写入了volatile变量v（这里和后续的“变量”都指的是对象的字段、类字段和数组元素），接着线程2读取了v，那么，线程1写入v及之前的写操作都对线程2可见（线程1和线程2可以是同一个线程）。

4）线程启动规则（Thread Start Rule） Thread对象的`start()`方法Happens-Before此线程的每一个动作。

5）线程终止规则（Thread Termination Rule） 线程中的所有操作都Happens-Before对此线程的终止检测，我们可以通过 Thread.join() 方法结束、Thread.isAlive() 的返回值等手段检测到线程已经终止运行。

6）线程中断规则（Thread Interruption Rule） 对线程`interrupt()`方法的调用Happens-Before被中断线程的代码检测到中断事件的发生，可以通过`Thread.interrupted`方法检测到是否有中断发生。

7）对象终结规则（Finalizer Rule） 一个对象的初始化完成（构造函数执行结束）Happens-Before它的finalize()方法的开始。

8）传递性（Transitivity） 偏序关系的传递性：如果已知hb(a,b)和hb(b,c)，那么我们可以推导出hb(a,c)，即操作a Happens-Before 操作c。



参考：

1. [深入理解happen-before原则 · Get The Real Thing (luyu05.github.io)](https://luyu05.github.io/2018/07/06/DCL/)

2. [先行发生原则 · 程序员的自我修养 (someoneiscoding.com)](https://someoneiscoding.com/2019/03/13/Java_happens_before/)

3. [简析guava cache线程安全设计哲学 - 简书 (jianshu.com)](https://www.jianshu.com/p/699869cb5421)