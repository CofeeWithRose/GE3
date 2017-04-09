(function function_name(argument) {
var data=JSON.parse(localStorage._GE);
function _getDepenList(data){

  var getDependence=function(gameObject,reult){
    if(!reult){
          reult={};
    }
    var names=Object.keys(gameObject.compmentMap||{});
    for (var i = names.length - 1; i >= 0; i--) {
      reult[names[i]]=names[i];
    }
        var children=Object.values(gameObject.children||{});
    for (var i = children.length - 1; i >= 0; i--) {
      getDependence(children[i],reult);
    }
    }
  var res={};
    getDependence(data,res);

    return Object.values(res);
};
function _buildCompment(obj,compMap){
    var compNames=Object.keys(compMap);
    for (var i = compNames.length - 1; i >= 0; i--) {
        var newComp=new window[compNames[i]];
        var compAttrs=Object.keys(compMap[compNames[i]]);

      for (var j =compAttrs.length - 1; j >= 0; j--) {
        var setMethodName="set"+compAttrs[j][0].toUpperCase()+compAttrs[j].substr(1);
       // console.log(setMethodName+": "+newComp[setMethodName]);
        newComp[setMethodName](compMap[compNames[i]][compAttrs[j]]);
/*       console.log(setMethodName+": ");
         console.log(compMap[compNames[i]][compAttrs[j]]);*/
      }
      obj.addCompment(newComp);
    }
};
function _buildGmaeObject(data){
   var obj=new GameObject();
   obj.name=data.name;
   _buildCompment(obj,data.compmentMap);
   var children=Object.keys(data.children||{});
   for (var i = children.length - 1; i >= 0; i--) {
    obj.setChild(_buildGmaeObject(data.children[children[i]]));
   }
   return obj;
};
GE.start(_getDepenList(data),function(){
     GE.instantGameObject(_buildGmaeObject(data));
});

})();