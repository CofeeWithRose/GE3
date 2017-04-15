function Render() {
	this.name="Render";
	var PI=Math.PI;
	
	var trans;
	var canvas=document.createElement("canvas");
    var context=canvas.getContext("2d");
    var point={x:0,y:0};

    var rotation;
    var scale={x:0,y:0};
    var imageChanged=true;

    this.image;
    this.size={w:100,h:100};

	this.start=function(){
       trans=this.transform;
       canvas.width=this.size.w;
       canvas.height=this.size.h;
       point.x=this.size.w/2;
       point.y=this.size.h/2;
       //console.log(trans.gameObject.name);
	};
	this.update=function(){
		if(this.image){
			if ((imageChanged||
				scale.x!=trans.scale.x||
				scale.y!=trans.scale.y||
				trans.rotation!=rotation)&&this.image.width)
				{ //if the info changed redraw the image
				context.clearRect(0,0,this.size.w,this.size.h);
				context.save();
				context.translate(point.x,point.y);
				context.rotate(trans.rotation*PI/180);
	            context.scale(trans.scale.x,trans.scale.y);
				context.drawImage(this.image,-point.x,-point.y,this.size.w,this.size.h);
				context.restore();
				rotation=trans.rotation;
				scale.x=trans.scale.x;
				scale.y=trans.scale.y;
				//imageChanged=false;
		   }
		 Screen.draw(canvas,trans.position.x,trans.position.y,this.size.w,this.size.h);
		}
	};
	this.setImage=function(img){

	    if (this.image&&img.src!=this.image.src) {
            imageChanged=true;
		}
		if (img instanceof Image) {
			this.image=img;
		}else if (img&&img.src) {
           this.image=ResourceFactory.getResource("Image",img.src);
		}
	};
	this.setSize=function(w,h){
		if (w instanceof Object) {
			this.size=w;
		}else{
			this.size.w=w;
	        this.size.h=h;
	        point.x=this.size.w/2;
	        point.y=this.size.h/2;
		}
     
	};
}