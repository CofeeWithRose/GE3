/**
*
**/
function Collider() {
	this.name="Collider";
	var _pro=this;
	var trans;
	this.layer=-1;
    this.offset={x:0,y:0};
    this.rectList=[];
	this.start=function(){
       trans=_pro.transform;
	};
	this.setLayer=function(lay){
        _pro.layer=lay;
	};
	this.addRect=function(x,y,w,h){
       _pro.rectList.push({x:x,y:y,w:w,h:h});
	};
	this.setOffset=function(ofse){
         _pro.offset=ofse;
	};
	this.setRectList=function(list){
        _pro.rectList=list;
	}
}