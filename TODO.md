
* ~~Search 后点击链接，没把 Search页面隐藏~~

* ~~sw.js 的 caches 感觉没必要了，去掉？~~

* ~~/archives/?tag=Json 页面如果带有?tag=*参数时，点击页面超链接跳转，不能再后退返回~~

  修改了jquery.pjax.js的源码，500行重新调用了一次pjax来刷新内容，但是这样刷新后，就没了以往的历史记录了（不能再后退前进），不过暂时只有archives页面有这个bug，还能接受吧