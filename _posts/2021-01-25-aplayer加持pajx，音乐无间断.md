---
layout:     post
title:      aplayer加持pajx，音乐无间断
subtitle:   "\"一开始我真的只是单纯的想加个音乐播放器...\""
date:       2021-01-19
author:     Ariescat
header-img: img/pixabay/lmountains-1761292_1280.jpg
catalog:    true
keyword:    Valine
tags:
    - Blog
    - 生活
---



文章来自个人小站：转载请备注
原文来自个人小站 ( [Ariescat's Blog](http://ariescat.top) ) ：[aplayer加持pajx，音乐无间断](http://ariescat.top/2021/01/19/aplayer加持pajx，音乐无间断/)


### 起因

下午在 [@樱花庄的白猫](https://2heng.xin/) 博客中看到左下角有个小小的音乐播放器，新奇的东西F12上，瞅一下名字aplayer，啥？！谷哥度娘走起

首条记录上就出现了 APlayer 的官方网站，这么简单嘛？！只要有文档，一切都好说，跟着导航找找找，是你了，吸底的播放样式：*APlayer 可以通过吸底模式固定在页面底部*。

![](https://raw.ariescat.top/1c6370d8bc1f0ac60edb.png/aplayer1.png)

### aplayer

[官方](https://aplayer.js.org/) 对它的介绍：

🍭 Wow, such a beautiful HTML5 music player

确实挺好看的，支持各种样式，本破小站只要个左下角的“吸底模式就好”，代码引用也简单，保姆式文档上就贴了：

首先，div容器，样式和核心jio本（文档有给出jsdelivr的CDN链接）

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aplayer@1.10.0/dist/APlayer.min.css">
<script src="https://cdn.jsdelivr.net/npm/aplayer@1.10.0/dist/APlayer.min.js"></script><div id="aplayer"></div>
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

好了，加上MP3的外链，愉快的听歌吧~🎵🎶（别说你获取不到MP3外链，那就赶紧拜托谷哥度娘去吧）

![](https://raw.ariescat.top/f5ef5f049c15cf3c75b0.png/aplayer2.png)

你以为文章就到此结束了吗？额...在下也希望是这样，码字很痛苦的

⬇️⬇️⬇️

</br></br></br>

### pajx

pajx又是啥？别急，听在下说说新的麻烦：

在听着歌曲的时候，随便点一个页内跳转，网页刷新，但是！但是！但是音乐播放器也跟着刷新了，从头开始播放？！Excuse Me？这也太傻了吧

转念细想，其实按上面的教程，是在每个html页面上都加上了aplyer的加载代码，页面刷新的时候，上个页面自然的就被替换成了新的页面，aplayer就相当于重新加载了一次。所以，讲道理，这段代码应该只用加载一次，并且不能随着网页跳转而改变，就像被我埋没多年的QQ空间那样（每次翻看太多黑历史了，但音乐播放器是优秀的）。

网上有人说可以用框架做，就是一个框架中嵌入aplayer，另一个用于页面跳转；也有人说用pjax，它可以做到无刷新ajax加载。考虑再三（也就几秒钟），肯定抛弃前者这种过时的方法，积极拥抱 jquery-pjax 。

[jquery-pjax](http://bsify.admui.com/jquery-pjax/) ，是一个jQuery插件，它的主要技术其实是 `ajax` 和 `pushState` ，工作原理*是通过ajax从服务器端获取HTML，在页面中用获取到的HTML替换指定容器元素中的内容。然后使用pushState技术更新浏览器地址栏中的当前地址*。

下面直接贴上我的用法吧：

```html
<body>
    ...
    <div id="pageContent">
        {% include content.html %}
    </div>
    <div id="aplayerContent">
        {% include aplayer.html %}
    </div>
    ...
</body>
```

`#pageContent` 里面是我网站的主要容器，`#aplayerContent` 里就放 aplayer 的核心内容，接下来就是 `pjax` 的使用方法：

```javascript
$(document).pjax('a[target!=_blank]', '#pageContent', {fragment: '#pageContent'});
```

通过这种方式可以让页面中所有的链接都实现pjax加载，并指定 `#pageContent` 作为容器元素。如此，页内不管怎么跳转都只是刷新了 `#pageContent` 容器，不会影响到 aplayer 的音乐播放啦。

然而还没完......

⬇️⬇️⬇️

</br></br></br>

### pajx深思

其实这种改变整个网站跳转模式的做法，站在程序的角度上，无疑是底层的大改，会触动很多东西，牵一发而动全身，是很抵触的。

但若非如此，aplayer 的播放问题得不到解决，不管用哪种方式去实现，都动到了底层的逻辑。无耐，本着折腾的心一路走到黑吧。

### valine路径问题

首先发现最大的问题：前几天刚接入的`valine` 用 `pjax` 跳转后，评论得不到加载，甚至评论框都时好时坏😭😭。

经过几天的查阅各种官方文档和看他们底下的评论（Valine，jQuery， Pjax都快被在下翻烂了），各种冥想，总结，一个个方法尝试，总算是比较好的解决了。问题主要以下：

1. `valine` 的 `window.location.pathname` 必须显式的指定

   ```js
   let valine = new Valine({
   	el: '#vcomments',
   	appId: '{{site.valine.appId}}',
   	appKey: '{{site.valine.appKey}}',
   	path: window.location.pathname, // 这里！！必要显式的指定为window.location.pathname
   });
   ```

   按官方文档的说法，path的默认值就是 `window.location.pathname`，可以不指定，但若用pjax跳转不指定就是不行，你说气不气。

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

   若不用 pjax 原本的浏览器刷新会在路径最后自动会补上一个 `"/"`，所以 `valine`  按`window.location.pathname` 去加载评论时都会带上 `"/"`作为 `url` 的，而 `pajx` 使用时你的路径虽然也能正确解析出html内容，但去做评论查找时，这 `url` 就对不上了，就会得到空白的结果。

   修正：

   ```html
   <li>
   	<a href="/docs/Awesome/">Awesome</a>
   </li>
   <li>
   	<a href="/docs/Reading/">Reading</a>
   </li>
   ```

3. 对1的增强，有时候显式指定了 `path: window.location.pathname` 还是不行

   因此，对 pajx 做了一个事件监听。`pjax:beforeReplace`事件：从服务器端加载的HTML内容完成之后，替换当前内容之前。在这个生命周期中，再次指定path：

   ```javascript
   $(document).on('ready pjax:beforeReplace', function (event) {
   	valine.setPath(pathname);
   });
   ```

经过上面的几点修复，到现在为止，暂时没发现新的问题，valine总算又可以正常的使用了。

其他方面上的坑：

* 文章侧栏导航因pjax的前进后退导致重复添加

  fix：每次预清理就好

* 404/offline页面回退后，样式残留

  fix：监听`pjax:clicked`事件，作样式清除

其他的发现一个再修复一个吧😵😵

### 最后总结

一开始我真的只是单纯的想加个音乐播放器而已...