---
layout:     post
title:      Pjax加持APlayer，音乐无间断
subtitle:   "\"一开始我真的只是单纯的想加个音乐播放器...\""
date:       2021-01-25
author:     Ariescat
header-img: img/cover/158773.png
header-mask: 0.35
catalog:    true
keyword:    aplayer, pjax, 音乐播放器
tags:
    - Blog
    - 生活
---


原文来自个人小站：[Pjax加持APlayer，音乐无间断](https://ariescat.top/2021/01/25/Pjax%E5%8A%A0%E6%8C%81APlayer-%E9%9F%B3%E4%B9%90%E6%97%A0%E9%97%B4%E6%96%AD/)，转载请备注



### 起因

下午在 [@樱花庄的白猫](https://2heng.xin/) 博客中看到左下角有个小小的音乐播放器，新奇的东西 F12 上，瞅一下名字：aplayer，啥？！谷哥度娘走起

首条记录上就出现了 APlayer 的官方网站，这么简单嘛？！只要有文档，一切都好说嘛。跟着导航找找找，是你了！吸附底边的播放样式：

![aplayer1](https://raw.ariescat.top/7501aeb2d8a4a1a91b6e.png/aplayer1.png)

*APlayer 可以通过吸底模式固定在页面底部*。  

### APlayer播放器

官方对它的介绍：

🍭 [Wow, such a beautiful HTML5 music player](https://aplayer.js.org/)

确实挺好看的，支持各种样式，本破小站只要有个简单的左下角 “吸底模式” 就好，代码引用也简单，保姆式文档上就贴了：

首先，div容器，样式和核心jio本（文档有给出 jsdelivr 的 CDN 链接）

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aplayer@1.10.0/dist/APlayer.min.css">  
<script src="https://cdn.jsdelivr.net/npm/aplayer@1.10.0/dist/APlayer.min.js"></script>  
<div id="aplayer"></div>
```

然后进行初始化

```javascript
const ap = new APlayer({
    container: document.getElementById('player'),
    fixed: true,
    audio: [{
        name: 'name',
        artist: 'artist',
        url: 'url.mp3',
        cover: 'cover.jpg',
    }]
});
```

好了，加上MP3的外链，愉快的听歌吧~~🎵🎶（别说你获取不到MP3外链，那就赶紧去拜托谷哥度娘吧）

![aplayer2](https://raw.ariescat.top/cf1bb121ff8bb4033fa1.png/aplayer2.png)

<br/>

<br/>

<br/>

<br/>

你以为文章就到此结束了吗？额...在下也希望是这样，码字可是很痛苦的

⬇️  
⬇️  
⬇️

<br/>

<br/>

### 神器 Pjax

Pjax 又是啥？别急，听在下说说新的麻烦：

沉浸中欢乐的歌声中，随便点了一个页内跳转，网页开始刷新，但是！但是！但是！音乐播放器也跟着刷新了，从头开始播放？！Excuse Me？这也太傻了吧...

转念细想，其实按上面的教程，是在每个 html 页面上都加上了 APlayer 的加载代码，页面刷新的时候，上个页面自然的就被替换成了新的页面，APlayer 就相当于重新加载了一次。所以，讲道理，这段代码应该只用加载一次，并且不能随着网页跳转而改变，就像被我埋没多年的 QQ 空间那样（每次翻看太多黑历史了，但音乐播放器是优秀的）。

网上有人说可以用框架做，就是一个框架中嵌入 APlayer，另一个用于页面跳转；也有人说用 Pjax，它可以做到无刷新 ajax 加载。考虑再三（也就几秒钟），肯定抛弃前者这种过时的方法，积极拥抱 [jQuery-Pjax](http://bsify.admui.com/jquery-pjax/) 。

> pjax = pushState + ajax 的缩写，它通过 ajax 和 pushState 技术提供了极速的（无刷新 ajax 加载）浏览体验，并且保持了真实的地址、网页标题，浏览器的后退（前进）按钮也可以正常使用。pjax 的工作原理是通过 ajax 从服务器端获取 HTML，在页面中用获取到的 HTML 替换指定容器元素中的内容。然后使用 pushState 技术更新浏览器地址栏中的当前地址。
>
> 以下两点原因决定了 pjax 会有更快的浏览体验：
>
> - 不存在页面资源（js/css）的重复加载和应用；
> - 如果服务器端配置了 pjax，它可以只渲染页面局部内容，从而避免服务器渲染完整布局的额外开销。

下面介绍下常用操作：

1. 引入 jQuery-Pjax 脚本

   ```html
   <script src="https://cdn.bootcss.com/jquery.pjax/2.0.1/jquery.pjax.min.js"></script>
   ```

2. 在 HTML 中准备替换的内容用 div 包裹起来，id自定义，类似如下

   ```html
   <body>
       ...
       <div id="pageContent">
           <!--include content.html-->
       </div>
       <div id="aplayerContent">
           <!--include aplayer.html-->
       </div>
       ...
   </body>
   ```

   `#pageContent` 里面是本破小站的主要容器，而 `#aplayerContent` 里面就是 Aplayer 的核心内容了

3. 接管网站所有 a 标签跳转，注意我们这里不需要后台的话，记得一定要添加 fragment 指定为 pjax 容器。

   ```js
   $(document).pjax('a[target!=_blank]', '#pageContent', {fragment: '#pageContent'});
   ```

通过这种方式可以让页面中所有的链接都实现了 Pjax 加载，并指定 `#pageContent` 作为容器元素。如此，页内不管怎么跳转都只是刷新了 `#pageContent` 容器，而不会影响到 Aplayer 的音乐播放啦。

好了，再次愉快的听歌和尽情的刷网页浏览吧~~~🎵🎶

<br/>

<br/>

<br/>

<br/>

然而......还没完

⬇️  
⬇️  
⬇️

<br/>

<br/>


### 深思

其实这种改变整个网站跳转模式的做法，站在程序的角度上，无疑是底层的大改，会触动很多东西，牵一发而动全身，是很抵触的。

但若非如此，Aplayer 的播放问题得不到解决，不管用哪种方式去实现，都动到了底层的逻辑。无耐，本着折腾的心一路走到黑吧。

### Valine路径问题

首先发现最大的问题：前几天刚接入的 `Valine` 用  `Pjax`  跳转后，评论得不到加载，甚至评论框都时好时坏😭😭。

经过几天的查阅各种官方文档和看他们底下的评论（Valine，jQuery， Pjax都快被在下翻烂了），各种冥想，总结，一个个方法尝试，总算是比较好的解决了。问题主要以下：

1. `Valine ` 的 `window.location.pathname` 必须显式的指定

   ```js
   let valine = new Valine({
   	el: '#vcomments',
   	appId: 'your appId',
   	appKey: 'your appKey',
   	path: window.location.pathname, // 这里!!!必要显式的指定为window.location.pathname
   });
   ```

   按官方文档的说法，path 的默认值就是 `window.location.pathname`，可以不指定，但若用 Pjax 跳转不指定就是不行，你说气不气。

2. 跳转页面的url问题（自己的原因）

   原本的代码：

   ```html
   <li>
   	<a href="/docs/Awesome">Awesome</a>
   </li>
   <li>
   	<a href="/docs/Reading">Reading</a>
   </li>
   ```

   若不用 Pjax 原本的浏览器刷新会在路径最后自动会补上一个 `"/"`，所以 Valine 按`window.location.pathname` 去加载评论时都会带上 `"/"` 作为 URL 的，而 Pjax 使用时虽然你的路径也能正确解析出 HTML 内容，但去做评论查找时，这 URL 就对不上了，就会得到空白的结果。

   修正：

   ```html
   <li>
   	<a href="/docs/Awesome/">Awesome</a>
   </li>
   <li>
   	<a href="/docs/Reading/">Reading</a>
   </li>
   ```

3. 对 1 的增强，有时候显式指定了 `path: window.location.pathname` 还是不行

   因此，对 Pjax 做了一个事件监听 `pjax:beforeReplace`（从服务器端加载的 HTML 内容完成之后，替换当前内容之前），在这个生命周期中，再次指定 path：

   ```javascript
   $(document).on('ready pjax:beforeReplace', function (event) {
   	valine.setPath(pathname);
   });
   ```

经过上面的几点修复，到现在为止，Valine 总算又可以正常的使用了，暂时没发现新的问题。

除 Valine 外，其他方面上的坑：

* 文章侧栏导航因 Pjax 的前进后退导致重复添加

  fix：每次预清理就好

* 404/offline 页面回退后，样式残留

  fix：监听 `pjax:clicked` 事件，然后做样式清除

暂时就没发现还有其他的大问题，有就来一个修一个吧😵😵

<br/>

### 最后总结

一开始 我真的只是 **单纯的** 想加个 音乐播放器 而已......

<br/>