var page = require('webpage').create(),
    system=require('system'),
    t,
    kw;
    t=Date.now();
kw=system.args[1];
page.open('https://www.baidu.com/s?wd='+kw,function(status){
    var result={};
    if(status=="success"){
        result.code="1";
        var datalist=[];
        //获取有效结果的长度
        wrapl=page.evaluate(function() {
                var wrapper=document.getElementsByClassName("result");
                return wrapper.length;
            });
        //循环取得结果中的数据
        for(var i=0;i<wrapl;i++){
            var data={};
            data.title = page.evaluate(function(s) {
                var wrapper=document.getElementsByClassName("result")[s];
                return wrapper.getElementsByTagName("a")[0].innerText;
            }, i);
            data.info = page.evaluate(function(s) {
                var wrapper=document.getElementsByClassName("result")[s];
                return wrapper.getElementsByClassName("c-abstract")[0].innerText;
            }, i);
            data.link = page.evaluate(function(s) {
                var wrapper=document.getElementsByClassName("result")[s];
                var linke=wrapper.getElementsByClassName("c-showurl")[0];
                if(linke==undefined) return "";
                return linke.innerText;
            }, i);
            data.pic = page.evaluate(function(s) {
                var wrapper=document.getElementsByClassName("result")[s];
                var imag=wrapper.getElementsByClassName("c-img")[0];
                if(imag==undefined) return "";
                return wrapper.getElementsByClassName("c-img")[0].getAttribute("src");
            }, i);
            //将数据封装成json格式push进数组
            datalist.push(data);
        }
        //若数组不为空则取得时间等信息
        if(datalist.length!=0){
            result.msg="抓取成功";
            result.word=kw;
            result.time=Date.now()-t;
            result.datalist=datalist;
        }
        //将json对象解析为字符串并输出
        console.log(JSON.stringify(result));
    }
    phantom.exit();
})
//method: phantomjs /your/script/path/nuomi_primary_4.js kw