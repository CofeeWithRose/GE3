function Render() {
	this.name="Render";
	var PI=Math.PI;
	var _pro=this;
	var trans;
	var canvas=document.createElement("canvas");
    var context=canvas.getContext("2d");
    var point={x:0,y:0};

    var rotation;
    var scale={x:0,y:0};
    var imageChanged=true;

    this.image;
    this.size={w:100,h:100};
    this.awake=function(){
    	 trans=_pro.transform;
    }
	this.start=function(){
      
       canvas.width=_pro.size.w;
       canvas.height=_pro.size.h;
       point.x=_pro.size.w/2;
       point.y=_pro.size.h/2;
	};
	this.update=function(){
		if(_pro.image){
			if (imageChanged||
				scale.x!=trans.scale.x||
				scale.y!=trans.scale.y||
				trans.rotation!=rotation) 
				{ //if the info changed redraw the image
				context.clearRect(0,0,_pro.size.w,_pro.size.h);
				context.save();
				context.translate(point.x,point.y);
				context.rotate(trans.rotation*PI/180);
	            context.scale(trans.scale.x,trans.scale.y);
				context.drawImage(_pro.image,-point.x,-point.y,_pro.size.w,_pro.size.h);
				context.restore();
				rotation=trans.rotation;
				scale.x=trans.scale.x;
				scale.y=trans.scale.y;
				imageChanged=false;
		   }
		 Screen.draw(canvas,trans.position.x,trans.position.y,_pro.size.w,_pro.size.h);
		}
	};
	this.setImage=function(img){

	    if (_pro.image&&img.src!=_pro.image.src) {
            imageChanged=true;
		}
		if (img instanceof Image) {
			_pro.image=img;
		}else if (img&&img.src) {
           _pro.image=ResourceFactory.getResource("Image",img.src);
		}
	};
	this.setSize=function(w,h){
		if (w instanceof Object) {
			_pro.size=w;
		}else{
			_pro.size.w=w;
	        _pro.size.h=h;
	        point.x=_pro.size.w/2;
	        point.y=_pro.size.h/2;
		}
     
	};
}