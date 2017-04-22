var Util=function(){

   var browser={
      versions:function(){
      var u = navigator.userAgent, app = navigator.appVersion;
           return {//移动终端浏览器版本信息
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/)||!!u.match(/AppleWebKit/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
              };
            }(),
            language:(navigator.browserLanguage || navigator.language).toLowerCase()
    };
    function _isMobile(){
      var v=browser.versions;
        return v.android||v.iPad||v.iPhone||v.ios;
    };
    function _guid() {
      var re='xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
      });
      return re;
    };
    function _stringify(obj){
       var record=[];

       function replacer(key,value){
          if(value instanceof Image){
              value={src:value.src};
          }else if(!value._){
             value._=1;
             record.push(value);
          }else{
            return undefined;
          }
           return value;
        };

        var str=JSON.stringify(obj,replacer).replace(/"_":1/g,"").replace(/,}/g,"}");
         
        for (var i = record.length - 1; i >= 0; i--) {
           delete record[i]._;
        };
        return str;
    };
    function _parseInt(number) {
        return number*1 | 0 || 0;
    }
    return {
      stringify:_stringify,
      guid:_guid,
      parseInt:_parseInt,
      isMobile:_isMobile
    }
};