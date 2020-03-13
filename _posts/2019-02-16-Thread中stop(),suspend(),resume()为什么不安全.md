---
layout:     post
title:      Thread中stop(),suspend(),resume()为什么不安全
subtitle:   "\"都说这些api不安全，可知道为什么不安全吗\""
date:       2019-02-16
author:     Ariescat
header-img: img/header-coffee2.jpg
catalog: true
tags:
    - Java
---

### stop()
当调用`stop()`方法时会发生两件事：

1. **即刻停止**`run()`方法中剩余的全部工作，包括在catch或finally语句中，并抛出ThreadDeath异常(通常情况下此异常不需要显示的捕获)，因此可能会导致一些清理性的工作的得不到完成，如文件，数据库等的关闭。

2. **会立即释放该线程所持有的所有的锁**，导致数据得不到同步的处理，出现数据不一致的问题。

举个例子：
```java
public class Test {
    public static void main(String[] args) throws Exception {
        TestObject testObject = new TestObject();
        Thread t1 = new Thread(() -> {
            try {
                testObject.print("1", "2");
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
        t1.start();
        Thread.sleep(1000);
        t1.stop();
        System.out.println("first : " + testObject.getFirst() + " " + "second : " + testObject.getSecond());
    }
}

class TestObject {

    private String first = "ja";
    private String second = "va";

    public synchronized void print(String first, String second) throws Exception {
        this.first = first;
        Thread.sleep(10000);
        this.second = second;
    }

    public String getFirst() {
        return first;
    }

    public String getSecond() {
        return second;
    }
}
```
输出结果：
```java
first : 1 second : va
```

从上面的程序验证结果来看，`stop()`确实是不安全的。它的不安全主要是针对于第二点：释放该线程所持有的所有的锁。一般任何进行加锁的代码块，都是为了保护数据的一致性，如果在调用`thread.stop()`后导致了该线程所持有的所有锁的突然释放，那么被保护数据就有可能呈现不一致性，其他线程在使用这些被破坏的数据时，有可能导致一些很奇怪的应用程序错误。


### suspend()和resume()必须要成对出现，否则非常容易发生死锁。 
这两个操作就好比播放器的暂停和恢复。

不推荐使用`suspend()`去挂起线程的原因，是因为`suspend()`在导致**线程暂停的同时，并不会去释放任何锁资源**。其他线程都无法访问被它占用的锁。直到对应的线程执行`resume()`方法后，被挂起的线程**才能继续**，从而其它被阻塞在这个锁的线程才可以继续执行。

如果一个线程在resume目标线程之前尝试持有这个重要的系统资源锁再去resume目标线程，这两条线程就相互死锁了，也就冻结线程。

```java
public class Test {
    public static void main(String[] args) throws Exception {
        TestObject testObject = new TestObject();
        Thread t1 = new Thread(() -> testObject.print());
        t1.setName("A");
        t1.start();
        Thread.sleep(1000);

        Thread t2 = new Thread(() -> {
            System.out.println("B已启动,但进入不到print方法中");
            testObject.print();
        });
        t2.setName("B");
        t2.start();
    }
}

class TestObject {
    public synchronized void print() {
        if (Thread.currentThread().getName().equals("A")) {
            System.out.println("A 线程 独占该资源了");
            Thread.currentThread().suspend();
        }
    }
}
```

但是，如果`resume()`操作出现在`suspend()`之前执行，那么线程将一直处于挂起状态，同时一直占用锁，这就产生了死锁。此时，通过 jps 和 jstack 命令，来观察线程状态，对于被挂起的线程，它的线程状态居然还是Runnable。