const MyConfig = {
    L2Dwidget: {
        model: {
            // 小帅哥： https://unpkg.com/live2d-widget-model-chitose@1.0.5/assets/chitose.model.json
            // 萌娘：https://unpkg.com/live2d-widget-model-shizuku@1.0.5/assets/shizuku.model.json
            // 小可爱（女）：https://unpkg.com/live2d-widget-model-koharu@1.0.5/assets/koharu.model.json
            // 小可爱（男）：https://unpkg.com/live2d-widget-model-haruto@1.0.5/assets/haruto.model.json
            // 初音：https://unpkg.com/live2d-widget-model-miku@1.0.5/assets/miku.model.json
            // 上边的不同链接显示的是不同的小人
            jsonPath: "https://unpkg.com/live2d-widget-model-koharu@1.0.5/assets/koharu.model.json"
        }
    },
    APlayer: {
        audioSrc: [{
            name: '紅蓮華',
            artist: 'LiSA',
            url: 'https://sharefs.yun.kugou.com/202101231555/34300f393c76bde20efc778e1ccf93e5/G158/M01/0F/00/fpQEAF0Z-pmAbnCuADpEqn7HLyg788.mp3',
            cover: 'http://imge.kugou.com/stdmusic/150/20200319/20200319161427235185.jpg',
        }, {
            name: '光るなら',
            artist: 'Goose house',
            url: 'http://m10.music.126.net/20210123161203/1eb574eea5112d901f2956e0d0aa9a21/ymusic/9e0a/6075/ec14/a0338148b6233f2b8a48286db4125b50.mp3',
            cover: 'http://p1.music.126.net/HD3_u-G87OLIgXjGlHE9gA==/2537672839932536.jpg?param=300x300',
        }]
    },
    Valine: {
        emojiCDN: '//i0.hdslb.com/bfs/emote/',
        // emoji form https://github.com/lrhtony/BiliEmoji
        emojiMaps: {
            "2021": "14d8996128d46dabd3a2ed6c172c8af918d7a5d2.png",
            "微笑": "685612eadc33f6bc233776c6241813385844f182.png",
            "OK": "4683fd9ffc925fa6423110979d7dcac5eda297f4.png",
            "星星眼": "63c9d1a31c0da745b61cdb35e0ecb28635675db2.png",
            "doge": "bba7c12aa51fed0199c241465560dfc2714c593e.png",
            "妙啊": "b4cb77159d58614a9b787b91b1cd22a81f383535.png",
            "吃瓜": "4191ce3c44c2b3df8fd97c33f85d3ab15f4f3c84.png",
            "辣眼睛": "35d62c496d1e4ea9e091243fa812866f5fecc101.png",
            "滑稽": "d15121545a99ac46774f1f4465b895fe2d1411c3.png",
            "笑哭": "c3043ba94babf824dea03ce500d0e73763bf4f40.png",
            "呲牙": "b5a5898491944a4268360f2e7a84623149672eb6.png",
            "打call": "431432c43da3ee5aab5b0e4f8931953e649e9975.png",
            "歪嘴": "4384050fbab0586259acdd170b510fe262f08a17.png",
            "嫌弃": "de4c0783aaa60ec03de0a2b90858927bfad7154b.png",
            "喜欢": "8a10a4d73a89f665feff3d46ca56e83dc68f9eb8.png",
            "哦呼": "362bded07ea5434886271d23fa25f5d85d8af06c.png",
            "酸了": "92b1c8cbceea3ae0e8e32253ea414783e8ba7806.png",
            "大哭": "2caafee2e5db4db72104650d87810cc2c123fc86.png",
            "害羞": "9d2ec4e1fbd6cb1b4d12d2bbbdd124ccb83ddfda.png",
            "疑惑": "b7840db4b1f9f4726b7cb23c0972720c1698d661.png",
            "调皮": "8290b7308325e3179d2154327c85640af1528617.png",
            "喜极而泣": "485a7e0c01c2d70707daae53bee4a9e2e31ef1ed.png",
            "奸笑": "bb84906573472f0a84cebad1e9000eb6164a6f5a.png",
            "笑": "81edf17314cea3b48674312b4364df44d5c01f17.png",
            "偷笑": "6c49d226e76c42cd8002abc47b3112bc5a92f66a.png",
            "惊讶": "f8e9a59cad52ae1a19622805696a35f0a0d853f3.png",
            "捂脸": "6921bb43f0c634870b92f4a8ad41dada94a5296d.png",
            "阴险": "ba8d5f8e7d136d59aab52c40fd3b8a43419eb03c.png",
            "囧": "12e41d357a9807cc80ef1e1ed258127fcc791424.png",
            "呆": "33ad6000d9f9f168a0976bc60937786f239e5d8c.png",
            "抠鼻": "cb89184c97e3f6d50acfd7961c313ce50360d70f.png",
            "大笑": "ca94ad1c7e6dac895eb5b33b7836b634c614d1c0.png",
            "惊喜": "0afecaf3a3499479af946f29749e1a6c285b6f65.png",
            "无语": "44667b7d9349957e903b1b62cb91fb9b13720f04.png",
            "鼓掌": "895d1fc616b4b6c830cf96012880818c0e1de00d.png",
            "点赞": "1a67265993913f4c35d15a6028a30724e83e7d35.png",
            "尴尬": "cb321684ed5ce6eacdc2699092ab8fe7679e4fda.png",
            "灵魂出窍": "43d3db7d97343c01b47e22cfabeca84b4251f35a.png",
            "委屈": "d2f26cbdd6c96960320af03f5514c5b524990840.png",
            "傲娇": "010540d0f61220a0db4922e4a679a1d8eca94f4e.png",
            "疼": "905fd9a99ec316e353b9bd4ecd49a5f0a301eabf.png",
            "吓": "9c10c5ebc7bef27ec641b8a1877674e0c65fea5d.png",
            "生病": "0f25ce04ae1d7baf98650986454c634f6612cb76.png",
            "吐": "06946bfe71ac48a6078a0b662181bb5cad09decc.png",
            "捂眼": "c5c6d6982e1e53e478daae554b239f2b227b172b.png",
            "嘘声": "e64af664d20716e090f10411496998095f62f844.png",
            "思考": "cfa9b7e89e4bfe04bbcd34ccb1b0df37f4fa905c.png",
            "再见": "fc510306bae26c9aec7e287cdf201ded27b065b9.png",
            "翻白眼": "eba54707c7168925b18f6f8b1f48d532fe08c2b1.png",
            "哈欠": "888d877729cbec444ddbd1cf4c9af155a7a06086.png",
            "奋斗": "bb2060c15dba7d3fd731c35079d1617f1afe3376.png",
            "墨镜": "3a03aebfc06339d86a68c2d893303b46f4b85771.png",
            "难过": "a651db36701610aa70a781fa98c07c9789b11543.png",
            "撇嘴": "531863568e5668c5ac181d395508a0eeb1f0cda4.png",
            "抓狂": "4c87afff88c22439c45b79e9d2035d21d5622eba.png",
            "生气": "3195714219c4b582a4fb02033dd1519913d0246d.png",
            "口罩": "3ad2f66b151496d2a5fb0a8ea75f32265d778dd3.png",
            "鸡腿": "c7860392815d345fa69c4f00ef18d67dccfbd574.png",
            "月饼": "89b19c5730e08d6f12fadf6996de5bc2e52f81fe.png",
            "雪花": "a41813c4edf8782047e172c884ebd4507ce5e449.png",
            "视频卫星": "dce6fc7d6dfeafff01241924db60f8251cca5307.png",
            "干杯": "8da12d5f55a2c7e9778dcc05b40571979fe208e6.png",
            "爱心": "ed04066ea7124106d17ffcaf75600700e5442f5c.png",
            "锦鲤": "643d6c19c8164ffd89e3e9cdf093cf5d773d979c.png",
            "胜利": "b49fa9f4b1e7c3477918153b82c60b114d87347c.png",
            "加油": "c7aaeacb21e107292d3bb053e5abde4a4459ed30.png",
            "抱拳": "89516218158dbea18ab78e8873060bf95d33bbbe.png",
            "响指": "1b5c53cf14336903e1d2ae3527ca380a1256a077.png",
            "保佑": "fafe8d3de0dc139ebe995491d2dac458a865fb30.png",
            "支持": "3c210366a5585706c09d4c686a9d942b39feeb50.png",
            "拥抱": "41780a4254750cdaaccb20735730a36044e98ef3.png",
            "跪了": "f2b3aee7e521de7799d4e3aa379b01be032698ac.png",
            "怪我咯": "07cc6077f7f7d75b8d2c722dd9d9828a9fb9e46d.png",
            "黑洞": "e90ec4c799010f25391179118ccd9f66b3b279ba.png",
            "老鼠": "8e6fb491eb1bb0d5862e7ec8ccf9a3da12b6c155.png",
            "福到了": "5de5373d354c373cf1617b6b836f3a8d53c5a655.png",
            "W-哈哈": "83d527303c8f62f494e6971c48836487e7d87b1b.png",
            "凛冬-生气": "d90bd2fbc13a3cb8d313f6d675f20caf109f60a7.png",
            "霜叶-疑问": "ada3aea8594e724511c1daad15fb3b23900d8e24.png",
            "煌-震撼": "7bb39ac289bc97fe52af047020a9bf324ecdebe1.png",
            "哭泣": "a61abafb8c39defc323b045f30072198007b1c89.png",
            "哈哈": "e6449b0bae13b8c97cc65976ff8cdc2c16be0015.png",
            "狗子": "6a997106af5bf490f22c80a7acf3be813ee755fc.png",
            "羞羞": "f4f9171e4d8c3f30827a8b96ea1ce1beb825ad50.png",
            "亲亲": "2f72bae7b834d499f259c833f7011d5ed8748fd1.png",
            "耍帅": "d7a38b08d1f1cc35b19c35041f29ffcc48808e87.png",
            "气愤": "069b029d17a086ab475fd331697a649e234850bb.png",
            "高兴": "416570a8aca7be12fb2c36e4b846906653f6d294.png",
            "2020": "dc709fac0d361370bcf0d36d32adb97df7c95824.png",
            "doge-圣诞": "1afb5eb96846e0876071eeecb47be95dbf55f08d.png",
            "妙啊-圣诞": "1cdb10e4b6c6743a1ec96f1579e3ef3045a8f225.png",
            "呲牙-圣诞": "ae4395c1e29e9a2db0c9ccc4c0db05c414816e68.png",
            "OK-圣诞": "75d1c99cce001d6d103a8fd406616be9f51621ab.png",
            "星星眼-圣诞": "195641c30c55f34f9cd82c5e5c32d66a425c7723.png",
            "吃瓜-圣诞": "aa6a3022e47b441c7f84d02cacc063a728a561e0.png",
            "滑稽-圣诞": "5874276ea716d0e9797f827dcfca4332acf8f0de.png",
            "辣眼睛-圣诞": "8080adfe5acdfd0b6b09bd91db24ea7334ac7b44.png",
            "打call-圣诞": "2b04dd2d0e55d978ee485e1f7f3c5e355493ab78.png",
            "捂脸-圣诞": "9af59557383770c398daac81583e6c4d27d83da7.png",
            "十周年": "1eacd3f7816e70aff9c1b1a2e9605240466f599b.png",
            "加油武汉": "eb966aaa5b690d3f9308a9f936f5b5a72a7f956b.png",
            "粽子": "177999fb7d70d891fbf63b161f26b272e08dc1de.png",
            "画风突变": "ba4de7a3f97644038b15195bdc9f82a8fd118e77.png",
            "福": "802429a301ac5b35a0480d9526a070ce67cd8097.png",
            "tv-白眼-动态": "48f75163437445665a9be80bb316e4cb252c5415.gif",
            "tv-doge-动态": "302d6c88c63ed162c81a49cafe7ed2709e6fb955.gif",
            "tv-坏笑-动态": "5d2572efd09aab5dde9e2a198bb3f9ac1e2a982e.gif",
            "tv-难过-动态": "9c6b41008a67755410f712334c64313df5f91b3f.gif",
            "tv-生气-动态": "1902a5a2df5b5c931d88c12f0feb264b1e109d0d.gif",
            "tv-委屈-动态": "af5a5853edb43a8178a8cb5df707fa5e88143699.gif",
            "tv-斜眼笑-动态": "c66568b471192ca1f62f6ed4384dc1b283ab7508.gif",
            "tv-呆-动态": "d3fa91e4db9215eb1e20ab9da44f1214aa4bda7b.gif",
            "tv-发怒-动态": "3959eb81b952e4fa8d269d98f9e3639172d84073.gif",
            "tv-惊吓-动态": "13549060757fcd92b11d0657d9b3b6038f97abb6.gif",
            "tv-呕吐-动态": "db58e9442aae26694af18cc1683607cca3a16763.gif",
            "tv-思考-动态": "b63f9146bfd985af014f8d6d4bdb498805be48f9.gif",
            "tv-微笑-动态": "b98656855d782f61cb8edc7f7fca6563ecafff7e.gif",
            "tv-疑问-动态": "fce1b1a0f3b0e39a2dc16a18508dba7b91e929f4.gif",
            "tv-大哭-动态": "cba61f05f3039b02a7ffc0dfcd9d7995df9fdd74.gif",
            "tv-鼓掌-动态": "be106e6b265883a9f28fbe10f7b765701e2618d4.gif",
            "tv-抠鼻-动态": "696d9f93e722144dc2a78aeffc569418fdf3d565.gif",
            "tv-亲亲-动态": "3534ea44ab74bd20352b88c245a06c4b4c46d271.gif",
            "tv-调皮-动态": "fcd967395fd14e4dd5829fa7e8a967ce23205e52.gif",
            "tv-笑哭-动态": "1c2fd1e8c9dde12812f86e5d4cbddd8993d98082.gif",
            "tv-晕-动态": "030040ec5c9ddc9e3d067658c4139e7314ab42f8.gif",
            "tv-点赞-动态": "30ecff401245fb56bcc1cf588d1809ac1ab1607c.gif",
            "tv-害羞-动态": "411a3e459e8580f5bfd9f639a408247c4b509935.gif",
            "tv-睡着-动态": "3c8b5e293261287a6203597e29b3de07df4d18c6.gif",
            "tv-色-动态": "a0c6d99ab0ab63b8648f5283ff72cec04b604828.gif",
            "tv-吐血-动态": "e17e4539e169d14a3389ff147afea760cebe5de5.gif",
            "tv-无奈-动态": "eb4cb5f07cfd177c7e6a7914316717e56d9cc1d0.gif",
            "tv-再见-动态": "344f61609ecce2008520dc8a977b6169215748a9.gif",
            "tv-流汗-动态": "390bccec65eaff536bd5bb2a0c5b8b0bdea47334.gif",
            "tv-偷笑-动态": "7f11e6f7f63e79112b833bd41fa13a83d7cd8474.gif",
            "tv-抓狂-动态": "a476b93ecd8e94ac3257323fd822f91cef212de2.gif",
            "tv-黑人问号-动态": "b609adf664be33224a9923262031165ae3e34cd2.gif",
            "tv-困-动态": "91c2bf34ecf842d7016c01d841db3d4074bd281f.gif",
            "tv-打脸-动态": "b0fad4856e59c1240e448437da3287bb5ce547e5.gif",
            "tv-闭嘴-动态": "a3fc5388b09e945be3f18fe23bfed5874a0285b7.gif",
            "tv-鄙视-动态": "293b5d459e6264ecf314d20937a936fa672ccd1e.gif",
            "tv-腼腆-动态": "30984e8264324f901d19bea85dada7103b695534.gif",
            "tv-馋-动态": "2525c5703c594e5f0752f68db8948773caebde47.gif",
            "tv-可爱-动态": "f92d20f76258bc5f33fc9d7c5e2a1d41fef19a7c.gif",
            "tv-发财-动态": "76131e52c9b033681b4c896c6024d29ef7ec7ec2.gif",
            "tv-生病-动态": "beb94829fe04f1a41bd6ca611e1f6ca9ca169afa.gif",
            "tv-流鼻血-动态": "8ef473f74a849420da712487b2f56ecca1f695f5.gif",
            "tv-尴尬-动态": "e0b84ef5ee3e5b8978e584c7c5a6550c51d15f84.gif",
            "tv-大佬-动态": "14ca0c05382b8741940942b2430b7a8d55c02f7e.gif",
            "琉绮Ruki-？？？": "043a092820fe53ce92e817c4479450abb9f6e46a.png",
            "琉绮Ruki-不是吧": "634b2d58c727ec910ab44eb249270190788ab1b0.png",
            "琉绮Ruki-吃瓜": "fcde21ba88f51c9120866629207fdac31f0d2e86.png",
            "琉绮Ruki-刺激": "645bfc31dbf49d527d9e04a5349763cb7385aa07.png",
            "琉绮Ruki-害羞": "69f57aa355a4b891739a723f4d147bcbbcd052bd.png",
            "琉绮Ruki-惊呆惹": "a45a61a41842e4b88187ed1274b8279e529d4124.png",
            "琉绮Ruki-哭哭": "51f3a7ab019e00a400f43e24b8b17544f9a7984c.png",
            "琉绮Ruki-气鼓鼓": "be46e705785b9fbbdceea26acbe3270eb48d0fbf.png",
            "琉绮Ruki-身体被掏空": "6d13a5f3f5e8a8c3be967ab5451aab93b62cb26a.png",
            "琉绮Ruki-思考中": "59741ff96e5fb3638d563513c22cf109414e9a1a.png",
            "琉绮Ruki-哇哦": "89f3ba397480e6a346283eae2ca3005aaaf423a8.png",
        }
    }
}