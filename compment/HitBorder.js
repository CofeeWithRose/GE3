/**
*
**/
function HitBorder() {
	this.name="HitBorder";
	var _pro=this;
	var trans;
	var render;
	this.layer=-1;
    this.border={};
    
    this.isHiter=false;

	this.start=function(){

       trans=_pro.transform;
       render=trans.getCompment("Render");

       if (!_pro.border.position) {
	   		_pro.border.position={x:0,y:0};
   		}
   		if (!_pro.border.size) {
   			_pro.border.size=render.size;
   		}
   		_pro.border.transPosition=trans.position;
   		_pro.border.id=trans.gameObject.id;
   		
        HitManager.registBorder(_pro.border,_pro.isHiter);

	};

	this.setBorder=function(x,y,w,h){
       if (x instanceof Object) {
       	  _pro.border=x;
       }else{
       	 _pro.border.position={x:x,y:y};
	     _pro.border.size={w:w,h:h};
       }
	};
	this.setIsHiter=function(bool){
		_pro.isHiter=bool;
	};
	this.setLayer=function(layer){
        _pro.layer=layer;
	};
}