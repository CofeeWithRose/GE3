var HitManager=function HitManager(){
   var woeker=new Worker("worker/hitTest.js");

   var borderMap={};
   var hiterMap={};

   var onHitTaskMap={};
   var onLeaveTaskMap={};

   var borderList=[];
   var hiterList=[];


    woeker.onmessage=function onHitPPross(e){

      var resu=e.data.hit;
        var resuLeave=e.data.leave;

        for (var i = resu.length - 1; i >= 0; i--) {
         onHit(resu[i].hiter,resu[i].border,onHitTaskMap);
       }

       for (var i = resuLeave.length - 1; i >= 0; i--) {
         onHit(resuLeave[i].hiter,resuLeave[i].border,onLeaveTaskMap);
       }  
 
    };

   var _registBorder=function _registBorder(border,isHiter){

        if (isHiter) {
          hiterList.push(border);
          hiterMap[border.id]=border;
        }else{
           borderList.push(border);
           borderMap[border.id]=border;
        }
        var gameObject=GE.findGameObjectById(border.id);
        var compmentMap=gameObject.compmentMap;
        var compNames=Object.keys(compmentMap);

        var onHitTaskList=[];
        var onLeaveTaskList=[];
        for (var i = compNames.length - 1; i >= 0; i--) {
             var hitFn=compmentMap[compNames[i]][isHiter? "onHit":"onHitted"];
             var leaveFn=compmentMap[compNames[i]].onLeave;
           if(hitFn){

              onHitTaskList.push(hitFn.bind(compmentMap[compNames[i]]));
           }

           if (leaveFn) {
              onLeaveTaskList.push(leaveFn.bind(compmentMap[compNames[i]]));
           }
        }

        onHitTaskMap[gameObject.id]=onHitTaskList;
        onLeaveTaskMap[gameObject.id]=onLeaveTaskList;
   };

   var _cancellBorder=function _cancellBordrt(id){

      if (borderMap[id]) {
        borderList.splice(borderList.indexOf(borderMap[id]),1);
        delete  onHitTaskMap[id];
        delete borderMap[id];
      }
      if (hiterMap[id]) {
        hiterList.splice(hiterList.indexOf(hiterMap[id]),1);
        delete  onHitTaskMap[id];
        delete hiterMap[id];
      }
       delete onLeaveTaskMap[id];
        
   };

   var _update=function hitUpdate(){
    //console.log("send req..");
      var req={};
      req.border=borderList;
      req.hiter=hiterList;
      woeker.postMessage(req);

   };

   //after hited ,hiterBoder add attribuilt named position which record the position of the object hitting.
   //at same time ,border also add attribuilt named position which record the position that objet hited it.
   var onHit=function(hiterBorder,border,map){
      hiterBorder.obj=GE.findGameObjectById(hiterBorder.id);
      border.obj=GE.findGameObjectById(border.id);
      hiterBorder.self=border;
      border.self=hiterBorder;
      var resultHitFns=map[hiterBorder.id];
      var resultHitedFns=map[border.id];
      for (var i = resultHitFns.length - 1; i >= 0; i--) {
        resultHitFns[i](border);
      }
      for (var i = resultHitedFns.length - 1; i >= 0; i--) {
        resultHitedFns[i](hiterBorder);
      }
   };

  return{
    registBorder:_registBorder,
    cancellBorder:_cancellBorder,
    update:_update
  }

};