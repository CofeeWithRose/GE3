var ResourceFactory=function(){
    var source={};
    var _getResource=function(type,src){

        if (source[type]&&source[type][src]) {
          return source[type][src];
        }else {
          if (!source[type]) {
             source[type]={};
          }
          var temp=new window[type]();
          temp.src=src;
          source[type][src]=temp;
         // console.log("load resource");
          return temp;
        }
    }
    return{
      getResource:_getResource
    }
};