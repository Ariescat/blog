---
layout:     post
title:      WebSocket、Socket、TCP、HTTP区别
date:       2019-03-07
author:     Ariescat
header-img: img/pixabay/dockland-4431309_1280.jpg
catalog: true
tags:
    - IO
---

### 1. 概述
WebSocket 是为了满足基于 Web 的日益增长的实时通信需求而产生的。在传统的 Web 中，要实现实时通信，通用的方式是采用 HTTP 协议不断发送请求。但这种方式即浪费带宽（HTTP HEAD 是比较大的），又消耗服务器 CPU 占用（没有信息也要接受请求）。（下图来自 [WebSocket.org](http://www.websocket.org/quantum.html)）

![](http://blog.zengrong.net/uploads/2014/12/latency-comparison.gif)

而是用 WebSocket 技术，则会大幅降低上面提到的消耗：（下图来自 [websocket.org](http://www.websocket.org/quantum.html)）

![](http://blog.zengrong.net/uploads/2014/12/poll-ws-compare.gif)

关于更详细的描述，尹立的这篇文章讲得非常好：[WebSocket（2）–为什么引入WebSocket协议](http://blog.csdn.net/yl02520/article/details/7298309)。

那么，WebSocket 到底与 HTTP 协议到底是一个什么样的关系呢？它和 Socket 又有什么联系？这就要讲到 OSI 模型和 TCP/IP 协议族。

### 2. OSI 模型与 TCP/IP
以下是 维基百科 中关于OSI 模型的说明：

> 开放式系统互联通信参考模型（英语：Open System Interconnection Reference Model，ISO/IEC 7498-1），简称为OSI模型（OSI model），一种概念模型，由国际标准化组织（ISO）提出，一个试图使各种计算机在世界范围内互连为网络的标准框架。

而 TCP/IP 协议可以看做是对 OSI 模型的一种简化（以下内容来自 维基百科）：

> 它将软件通信过程抽象化为四个抽象层，采取协议堆叠的方式，分别实作出不同通信协议。协议套组下的各种协议，依其功能不同，被分别归属到这四个阶层之中7，常被视为是简化的七层OSI模型。

这里有一张图详细介绍了 TCP/IP 协议族中的各个协议在 OSI模型 中的分布，一图胜千言（下图来自 科来）：

![](http://blog.zengrong.net/uploads/2014/12/TCP-IP.gif)

 
在这里，我们只需要知道，HTTP、WebSocket 等协议都是处于 OSI 模型的最高层： 应用层 。而 IP 协议工作在网络层（第3层），TCP 协议工作在传输层（第4层）。

至于 OSI 模型的各个层次都有什么系统和它们对应，这里有篇很好的文章可以满足大家的求知欲：[OSI七层模型详解](http://blog.csdn.net/yaopeng_2005/article/details/7064869)。

### 3. WebSocket、HTTP 与 TCP
从上面的图中可以看出，HTTP、WebSocket 等应用层协议，都是基于 TCP 协议来传输数据的。我们可以把这些高级协议理解成对 TCP 的封装。

既然大家都使用 TCP 协议，那么大家的连接和断开，都要遵循 TCP 协议中的三次握手和四次握手 ，只是在连接之后发送的内容不同，或者是断开的时间不同。

对于 WebSocket 来说，它必须依赖 HTTP 协议进行一次握手 ，握手成功后，数据就直接从 TCP 通道传输，与 HTTP 无关了。

### 4. Socket 与 WebScoket
Socket 其实并不是一个协议。它工作在 OSI 模型会话层（第5层），是为了方便大家直接使用更底层协议（一般是 TCP 或 UDP ）而存在的一个抽象层。

最早的一套 Socket API 是 Berkeley sockets ，采用 C 语言实现。它是 Socket 的事实标准，POSIX sockets 是基于它构建的，多种编程语言都遵循这套 API，在 JAVA、Python 中都能看到这套 API 的影子。

下面摘录一段更容易理解的文字（来自 http和socket之长连接和短连接区别）：

> Socket是应用层与TCP/IP协议族通信的中间软件抽象层，它是一组接口。在设计模式中，Socket其实就是一个门面模式，它把复杂的TCP/IP协议族隐藏在Socket接口后面，对用户来说，一组简单的接口就是全部，让Socket去组织数据，以符合指定的协议。

![](http://blog.zengrong.net/uploads/2014/12/socket.gif)

![](http://blog.zengrong.net/uploads/2014/12/socket-traffic.gif)

> 主机 A 的应用程序要能和主机 B 的应用程序通信，必须通过 Socket 建立连接，而建立 Socket 连接必须需要底层 TCP/IP 协议来建立 TCP 连接。建立 TCP 连接需要底层 IP 协议来寻址网络中的主机。我们知道网络层使用的 IP 协议可以帮助我们根据 IP 地址来找到目标主机，但是一台主机上可能运行着多个应用程序，如何才能与指定的应用程序通信就要通过 TCP 或 UPD 的地址也就是端口号来指定。这样就可以通过一个 Socket 实例唯一代表一个主机上的一个应用程序的通信链路了。

而 WebSocket 则不同，它是一个完整的 应用层协议，包含一套标准的 API 。

所以，从使用上来说，WebSocket 更易用，而 Socket 更灵活。

### 5. HTML5 与 WebSocket
WebSocket API 是 HTML5 标准的一部分， 但这并不代表 WebSocket 一定要用在 HTML 中，或者只能在基于浏览器的应用程序中使用。

实际上，许多语言、框架和服务器都提供了 WebSocket 支持，例如：

- 基于 C 的 libwebsocket.org
- 基于 Node.js 的 Socket.io
- 基于 Python 的 ws4py
- 基于 C++ 的 WebSocket++
- Apache 对 WebSocket 的支持： Apache Module mod_proxy_wstunnel
- Nginx 对 WebSockets 的支持： NGINX as a WebSockets Proxy 、 NGINX Announces Support for WebSocket Protocol 、WebSocket proxying
- lighttpd 对 WebSocket 的支持：mod_websocket

附在线测试地址：websocketclient