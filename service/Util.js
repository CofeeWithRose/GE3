var Util=function(){

    function _isMobile(){
      return document.ontouchend !== undefined

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