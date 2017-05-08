function recover(argument) {
var data=JSON.parse(localStorage._GE);
function _getDepenList(data){

  var getDependence=function(gameObject,reult){

      var names=Object.keys(gameObject.compmentMap||{});

      for (var i = names.length - 1; i >= 0; i--) {
         reult[names[i]]=names[i];
      }

      var children=Object.values(gameObject.children||{});
      for (var i = children.length - 1; i >= 0; i--) {
         getDependence(children[i],reult);
      }
  };
    var res={};
    getDependence(data,res);
    return Object.values(res);
};
function _buildCompment(obj,compMap){
    var compNames=Object.keys(compMap);
    for (var i =0;i<compNames.length&&compNames[i]; i++) {
        var newComp=new window[compNames[i]]();
      
        var compAttrs=Object.keys(compMap[compNames[i]]);
      for (var j =compAttrs.length - 1; j >= 0; j--) {
        var setMethodName="set"+compAttrs[j][0].toUpperCase()+compAttrs[j].substr(1);
      //console.log(setMethodName+": "+newComp[setMethodName]);
      if ("function"==(typeof newComp[setMethodName])) {
         newComp[setMethodName](compMap[compNames[i]][compAttrs[j]]);
       }else{
         throw setMethodName +" is not  a function in "+compNames[i]+" compment ";
       }
       //还原场景时所作的所有操作日志
       // console.log(compNames[i]+"."+setMethodName+
       //  "(  "+Util.stringify( compMap[compNames[i]][compAttrs[j]])+"  )"
       //  );
      }
        obj.addCompment(newComp);
    }
};
function _buildGmaeObject(data){
   var obj=window.Stage=new GameObject();
   obj.name=data.name;
   obj.id=data.id;
   _buildCompment(obj,data.compmentMap);
   var children=Object.keys(data.children||{});
   for (var i =0,L= children.length; i <L&&L>0; i++) {
    obj.setChild(_buildGmaeObject(data.children[children[i]]));
   }
   return obj;
};
GE.start(_getDepenList(data),function(){
     _buildGmaeObject(data);
});

};
window.onload=function(){
  recover();
};