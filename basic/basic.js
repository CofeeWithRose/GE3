function GameObject() {
	this.id=Util.guid();
	this.children={};
	this.parent;
	this.name;
	this.compmentMap={};
	this.compmentMap.Transform=new Transform();
  this.compmentMap.Transform.gameObject=this;
  this.compmentMap.Transform.compmentMap=this.compmentMap;
};
GameObject.prototype.equals = function(first_argument) {
	return this.id===this.id;
};
GameObject.prototype.getChildByIndex=function (ind) {
	return this.children[Object.keys(this.children)[ind]];
};
GameObject.prototype.getChildById=function(id){
	return children[name];
};
GameObject.prototype.addCompment = function(compment) {

	if (!(compment instanceof Compment)) {
    throw compment +" is not a compment";
  }
  if(compment.name==="Transform"){
    var keys=Object.keys(compment);
    for (var i = keys.length - 1; i >= 0; i--) {
      this.compmentMap.Transform[keys[i]]=compment[keys[i]];
    }
  }else{
    this.compmentMap[compment.name]=compment;
    compment.transform=this.compmentMap.Transform;
  }
  var gameObject=this;
  requestAnimationFrame(function(){
    GE.addTask(gameObject,compment);
  });

  return compment;
};
GameObject.prototype.removeCompment = function(name) {

  if (!this.compmentMap[name]) {
    return;
  }
  if(name==="Transform"){
    throw "Transform cont be reoved";
  }else{
    delete this.compmentMap[name];
  }
  var gameObject=this;
  requestAnimationFrame(function(){
    GE.removeCompment(gameObject,name);
  });
};

GameObject.prototype.getCompment=function(name){
  return this.compmentMap[name];
};

GameObject.prototype.setParent=function(parentObj){

	if (!(parentObj instanceof GameObject)) {
		throw parentObj +" is not a GameObject";
	}
	if (this.name) {
   parentObj.children[this.id]=this;
   this.parent=parentObj;
 }
};
GameObject.prototype.removeParent=function(){
  if (this.parent) {
    delete this.parent.children[this.id];
    this.parent=undefined;
  }
};
GameObject.prototype.setChild=function(obj){
  if (!(obj instanceof GameObject)) {
    throw obj +" is not a GameObject";
  }
  if (obj.id) {
   this.children[obj.id]=obj;
   obj.parent=this;
 }
};
GameObject.prototype.removeChild=function(obj){
  if (this.children[obj.id]) {
    delete this.children[obj.id];
    obj.parent=undefined;
  }
};
GameObject.prototype.destroySelf = function() {
  GE.destroyGameObject(this);
};
GameObject.prototype.findGameObjectById=function(id){
  return GE.findGameObjectById(id);
}


function Compment(){

};
Compment.prototype.awake = function() {
 // console.log("awake........");
};
Compment.prototype.start = function() {
  //console.log("start.......");
};
Compment.prototype.setName=function (name) {
  this.name=name;
};

function Transform(){
  /*  console.log("trans id : "+this.id);*/
  this.compmentMap;
  this.name="Transform";
  this.position={x:0,y:0};
  this.rotation=0;
  this.scale={x:1,y:1};
  var _pro=this;
  this.setPosition=function(val){
    _pro.position=val;
  };
  this.setRotation=function(val){
    _pro.rotation=val;
  };
  this.setScale=function(val){
   _pro.scale=val;
 };
}
Transform.prototype=Compment.prototype;
Transform.prototype.getCompment=function(name){
  return this.compmentMap[name];
};

var GE=function () 
{

 var _impMap={Transform:"Transform"};
 var _completeNum=1;

 var _gameObjMap={};

 var _awakeTask=[];
 var _startTask=[];

 var _earlyUpdateTask=[];
 var _earlyUpdateTaskMap={};

 var _updateTask=[];
 var _updateTaskMap={};

 var _lateUpdateTask=[];
 var _lateUpdateTaskMap={};

 var _onDestoryTask=[];
 var _onDestoryTaskMap={};

 var _serviceList=[];

 var _isPlay=true;

 var stop=function stop(argument) {
  _isPlay=false;
};
var continueGame=function continueGame(argument) {
  _isPlay=true;
  _prosessGame();

};
var refresh=function refresh(){
 // console.log("fresh");
 _impMap={Transform:"Transform"};
 _completeNum=1;

 _gameObjMap={};

 _awakeTask=[];
 _startTask=[];

 _earlyUpdateTask=[];
 _earlyUpdateTaskMap={};

 _updateTask=[];
 _updateTaskMap={};

 _lateUpdateTask=[];
 _lateUpdateTaskMap={};

 _onDestoryTask=[];
 _onDestoryTaskMap={};

 _serviceList=[];

 _isPlay=true;
};

var importJS=function (nameList) {
 for (var i = nameList.length - 1; i >= 0; i--) {
  var filename=nameList[i];
  if (/Service$/.test(filename)) {
   _serviceList.push(filename.substring(0,filename.length-7));
 }
 if (!(_impMap[filename]||(window[filename] instanceof Compment))) {
   _impMap[filename]=filename;
   _loadScript(filename);
 }
}
};
var _loadScript=function(filename){
  var path;
  var _type;
  if (/Service$/.test(filename)) {
    filename=filename.substring(0,filename.length-7);
    path="service/"+filename+".js"
    _type="Service";
  }else{
    path="compment/"+filename+".js";
    _type="";
  }
  var script=document.createElement("script");
  script.type="text/javascript";
  script.src=path;
  document.body.appendChild(script);
  script.onload=function(){
    _completeNum++;
    var Fn=window[filename];
    if ((typeof Fn)=="function") {
      window[filename].prototype=Compment.prototype;
            //console.log(filename+" add compment prototype");
          }else{
            throw "Faile to import 【"+filename+_type+ "】 ,it  is not a function";
          }
        }
      };

      var _startService=function(){
        var temp={};

        for (var i = _serviceList.length - 1; i >= 0; i--) {

          if(!temp[_serviceList[i]]){

           if("function"!=(typeof window[_serviceList[i]])){
            throw "Fail to instant service 【"+_serviceList[i]+"】, it is not a function ";
          }

          window[_serviceList[i]]=window[_serviceList[i]]();
          temp[_serviceList[i]]=1;
        }
      }
      temp=undefined;
      _serviceList=undefined;
    };

    var _listen=function (completeTask) {
     if (Object.keys(_impMap).length===_completeNum) {

      _startService();
      completeTask();

      _prosessGame();
    }else{
      setTimeout(function() {_listen(completeTask)}, 100);
    }
  };

  var startGame=function(namelist,completeTask){
    importJS(namelist);
    _listen(completeTask);
  };
  var _prosessGame=function(){
   HitManager.update();
   _doTask(_awakeTask);
   _doTask(_startTask);
   _startTask=[];
   _awakeTask=[];
   Screen.clear();
   _doTask(_earlyUpdateTask);
   _doTask(_updateTask);
   Time.update();
   Screen.showFps();
   _doTask(_lateUpdateTask);
   if (_isPlay) {
     requestAnimationFrame(_prosessGame);
   }
        //setTimeout(_prosessGame, 40);
        
      };

      var _doTask=function(taskList){
        for (var i =0;i<taskList.length; i++) {
        	taskList[i]();
        }
      };

      var findGameObjectById=function(id){
        return _gameObjMap[id];
      };
      var _addOneTask=function(obj,compment,taskMap,taskList,type){
        if (!taskMap[obj.id]) {
          taskMap[obj.id]={};
        }
        var task=compment[type]&&compment[type].bind(compment);
        if (task) {
          taskMap[obj.id][compment.name]=task;
          taskList.push(task);
        }
      };
      var addTask=function(obj,compment){

        if (!_gameObjMap[obj.id]) {
          _checkName(obj);
          _gameObjMap[obj.id]=obj;
        }
        _addOneTask(obj,compment,_earlyUpdateTaskMap,_earlyUpdateTask,"earlyUpdate");
        _addOneTask(obj,compment,_updateTaskMap,_updateTask,"update");
        _addOneTask(obj,compment,_lateUpdateTaskMap,_lateUpdateTask,"lateUpdate");
        _addOneTask(obj,compment,_onDestoryTaskMap,_onDestoryTask,"onDestory");
        _awakeTask.push(compment["awake"].bind(compment));
        _startTask.push(compment["start"].bind(compment));
        //console.log(compment["update"]);
      };
      var _destoryOneTask=function(obj,taskMap,taskList,compName){
        var task=taskMap[obj.id][compName];
        var index=taskList.indexOf(task);
        if (index!==-1) {
         taskList.splice(index,1);
       }
     };
     var removeCompment=function(obj,compName){
       _destoryOneTask(obj,_updateTaskMap,_updateTask,compName);
       _destoryOneTask(obj,_lateUpdateTaskMap,_lateUpdateTask,compName);
       _destoryOneTask(obj,_earlyUpdateTaskMap,_earlyUpdateTask,compName);
       _onDestoryTaskMap[obj.id]&&_onDestoryTaskMap[obj.id][compName]&&_onDestoryTaskMap[obj.id][compName]();
       _destoryOneTask(obj,_onDestoryTaskMap,_onDestoryTask,compName);
     };
     var destroyGameObject=function(obj){

      if (_gameObjMap[obj.id]) {
       delete _gameObjMap[obj.id];
       var compNames=Object.keys(_updateTaskMap[obj.id]);
       for (var i = compNames.length - 1; i >= 0; i--) {
        removeCompment(obj,compNames[i]);
       }
       delete _lateUpdateTaskMap[obj.id];
       delete _updateTaskMap[obj.id];
       delete _earlyUpdateTaskMap[obj.id];
       delete _onDestoryTaskMap[obj.id];
       if (obj.parent) {
        obj.removeParent();
      }
      var childrenKeys=Object.keys(obj.children);
      if (childrenKeys) {
        for (var i = childrenKeys.length - 1; i >= 0; i--) {
         destroyGameObject(obj.children[childrenKeys[i]]);
       }
     }

   }
 };

 var _checkName=function(obj){

   var name=obj.name;
   if (!name) {
    throw  obj+" does not have a name";
  }
  if (_gameObjMap[name]) {
    var num=name.match(/\([\d]{1,1000}\)/g);

    if (num) {
      num=num[num.length-1];
      name-=num;
      num=1+Util.parseInt(num.match(/[\d]{1,1000}/)[0],10);
    }else{
      num=1;
    }
    name+="("+num+")";
    obj.name=name;
  }
};
return {
	addTask:addTask,//obj,compment
  findGameObjectById:findGameObjectById,
  destroyGameObject:destroyGameObject,
  removeCompment:removeCompment,
  import:importJS,
  start:startGame,
  stop:stop,
  continue:continueGame,
  refresh:refresh
};
};
GE=GE();