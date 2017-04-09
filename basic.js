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
GameObject.prototype.getChildByInd=function (ind) {
	return this.children[Object.keys(this.children)[ind]];
};
GameObject.prototype.getChildByName=function(name){
	return children[name];
};
GameObject.prototype.addCompment = function(compment) {

	if (!(compment instanceof Compment)) {
        throw compment +" is not a compment";
	}else if (!compment.name){
		throw compment +" the compment has no name ";
	}if(compment.name==="Transform"){
    var keys=Object.keys(compment);
    for (var i = keys.length - 1; i >= 0; i--) {
      this.compmentMap.Transform[keys[i]]=compment[keys[i]];
    }
  }else{
		this.compmentMap[compment.name]=compment;
		compment.transform=this.compmentMap.Transform;
  }
  return compment;
};
GameObject.prototype.getCompment=function(name){
  return this.compmentMap[name];
};
GameObject.prototype.setParent=function(parentObj){

	if (!(parentObj instanceof GameObject)) {
		throw parentObj +" is not a GameObject";
	}
	if (this.name) {
		 parentObj.children[this.name]=this;
	}
  
};
GameObject.prototype.setChild=function(obj){

  if (!(obj instanceof GameObject)) {
    throw obj +" is not a GameObject";
  }
  if (obj.name) {
     this.children[obj.name]=obj;
  }
  
};


function Compment(){

};
Compment.prototype.awake = function() {
 // console.log("awake........");
};
Compment.prototype.start = function() {
  //console.log("start.......");
};
Compment.prototype.update = function() {
  //console.log("update.....");
};
Compment.prototype.setName = function(val) {
  this.name=val;
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

var Util=function(){
    function _guid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
      });
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
    return {
      stringify:_stringify,
      guid:_guid
    }
};
Util=Util();

var Time={
    frameCount:0,
    startTime:0,
    delTime:0,
    lastTime:0,
    update:function(){
        var now=new Date().getTime();
         Time.frameCount++;
         Time.delTime=now-Time.lastTime;
         Time.lastTime=now;
   }
 
};
var Input=function(){
  var _getKeyDown=function(key){
     return Input.down.key;
  };
   var _getKeyUp=function(key){
     return Input.up[key];
  };
return{
  getKeyDown:_getKeyDown,
  getKeyUp:_getKeyUp
}
};
Input=Input();
Input.down={};
Input.up={};
Input.update=function(){
  var d=Object.keys(Input.down);
  var u=Object.keys(Input.up);
  for (var i = d.length - 1; i >= 0; i--) {
    Input.down[d[i]]=false;
  }
  for (var i = u.length - 1; i >= 0; i--) {
    Input.up[u[i]]=false;
  }
}
window.addEventListener("keydown",function(e){
  Input[e.key]=true;
  Input.down[e.key]=true;
});
window.addEventListener("keyup",function(e){
  Input[e.key]=false;
  Input.up[e.key]=true;
});

var Screen=function(){
   var _position={x:0,y:0};
   var canvas=document.getElementById("canvas");
   canvas.width=window.innerWidth;
   canvas.height=window.innerHeight;
   var context=canvas.getContext("2d");
   var fps=document.getElementById("FPS");
   var _draw=function(obj,x,y,w,h){
        context.drawImage(obj,x,y,w,h);
   }
   var _showFps=function(){
     if (Time.frameCount%100==0) {
          fps.innerHTML=Number.parseInt(1000/Time.delTime);
      }    
   };
   var _clear=function(){
     context.clearRect(0,0,innerWidth,innerHeight);
   }
   return{
   	position:_position,
   	draw:_draw,
    clear:_clear,
    showFps:_showFps
   }
};
Screen=Screen();

var GE=function () {

	var impMap={Transform:"Transform"};
    var completeNum=1;

    var gameObjMap={};

    var awakeTask=[];
    var startTask=[];
    var updateTask={};

    var _import=function (nameList) {
    	for (var i = nameList.length - 1; i >= 0; i--) {
    		var filename=nameList[i];
    		if (!(impMap[filename]||window[filename])) {
    			impMap[filename]=filename;
          loadScript(filename);
    		}
    	}
    	
    };
    var loadScript=function(filename){
        var script=document.createElement("script");
        script.type="text/javascript";
        script.src="compment/"+filename+".js";
        document.body.appendChild(script);
        script.onload=function(){
          completeNum++;
          var Fn=window[filename];
          if ((typeof Fn)=="function") {
            window[filename].prototype=Compment.prototype;
          }else{
            throw filename+ " is not a function";
          }
          
        }
    };

    var listen=function (completeTask) {
    	if (Object.keys(impMap).length===completeNum) {
    		Time.startTime=new Date().getTime();
    		completeTask();
    		prosessGame();
    	}else{
    		setTimeout(function() {listen(completeTask)}, 100);
    	}
    };
    
    var _startGame=function(namelist,completeTask){
          _import(namelist);
          listen(completeTask);
    };

    var prosessGame=function(){
         
         doOnceTask(awakeTask);
         doOnceTask(startTask);
         startTask=[];
         awakeTask=[];
         Time.update();
         Input.update();
         requestAnimationFrame(prosessGame);
         Screen.clear();
          Screen.showFps();
         doUpdate();
    };

    var doOnceTask=function(taskList){
        for (var i = taskList.length - 1; i >= 0; i--) {
        	taskList[i]();
        }
    };
    var doUpdate=function(){
    	var nowTask=Object.keys(updateTask);
        for (var i = nowTask.length - 1; i >= 0; i--) {
        	var task=updateTask[nowTask[i]];
        	for (var j = task.length - 1; j >= 0; j--) {
        		task[j]();
        	}
        }
    };
    

    var _insGamObj=function(obj){

          if (obj instanceof GameObject) {
          	checkName(obj);
          	if (!obj.parent) {
          		gameObjMap[obj.name]=obj;
          	}
          	combineList(awakeTask,getTaskList(obj,"awake"));
            combineList(startTask,getTaskList(obj,"start"));
            updateTask[obj.id]=getTaskList(obj,"update");

            var children=Object.keys(obj.children);
        	for (var i = children.length - 1; i >= 0; i--) {

        		_insGamObj(obj.children[children[i]]);
        	}
          }else{
	          throw obj +"is not a GameObject";
          }
       /*console.log("x: "+obj.getCompment("Transform").position.x);*/
    };
    var checkName=function(obj){
    	var name=obj.name;
    	if (!name) {
    		throw  obj+" does not have a name";
    	}
       if (gameObjMap[name]) {
       	  var num=name.match(/\([\d]{1,1000}\)/g);
       	 
       	  if (num) {
              num=num[num.length-1];
       	  	  name-=num;
              num=1+Number.parseInt(num.match(/[\d]{1,1000}/)[0],10);
       	  }else{
            num=1;
          }
              name+="("+num+")";
              obj.name=name;
       }
    };
    var getTaskList=function(obj,type){
        var compList=Object.keys(obj.compmentMap);
        var tasks=[];
        for (var i = compList.length - 1; i >= 0; i--) {
        	tasks.push(obj.compmentMap[compList[i]][type]);
        }
        return tasks;
    };
    var combineList=function(listA,listB){
        for (var i = listB.length - 1; i >= 0; i--) {
        	listA.push(listB[i]);
        }
    };

	return {
		import:_import,
		start:_startGame,
		instantGameObject:_insGamObj
	};
};
GE=GE();