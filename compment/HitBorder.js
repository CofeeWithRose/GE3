/**
*
**/
function HitBorder() {
	this.name="HitBorder";
	var _pro=this;
	var trans;
	var render;
	this.layer=-1;
    this.borderList=[];
    
    this.isHiter=false;

	this.start=function(){
       trans=_pro.transform;
       render=trans.getCompment("Render");
       if (_pro.borderList.length==0&&render) {
       	   _pro.addRectBorder(0,0,render.size.w,render.size.h);
       }
       HitManager.registBorder(_pro.borderList,trans,_pro.isHiter);

	};
	this.addRectBorder=function(x,y,w,h){
       _pro.borderList.push({x:x,y:y,w:w,h:h});
       HitManager.registBorder(_pro.borderList,trans,_pro.isHiter);
	};
	this.addRoundBorder=function(x,y,r){
        _pro.borderList.push({x:x,y:y,r:r});
        HitManager.registBorder(_pro.borderList,trans,_pro.isHiter);
	};


	this.setBorderList=function(list){
        _pro.borderList=list;
	};
	this.setIsHiter=function(bool){
		_pro.isHiter=bool;
	};
	this.setLayer=function(layer){
        _pro.layer=layer;
	};
}