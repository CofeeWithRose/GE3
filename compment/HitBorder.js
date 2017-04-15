GE.import(["Render"]);

function HitBorder() {
	this.name="HitBorder";
	
	var trans;
	var render;
	this.layer=-1;
  this.border={};
  this.isShow=false;
  this.isHiter=false;

  this.awake=function(){

    trans=this.transform;
    render=trans.getCompment("Render");

    if (!this.border.position) {
       this.border.position={x:0,y:0};
    }
    if (!this.border.size) {

      if(render){

        this.border.size=render.size;
      }else{
        this.border.size={x:0,y:0};
      }

    }

    this.border.transPosition=trans.position;
    this.border.id=trans.gameObject.id;

    HitManager.registBorder(this.border,this.isHiter);


    if (this.isShow) {
       var render=trans.gameObject.getCompment("Render")||trans.gameObject.addCompment(new Render());
       render.setImage({src:"image/border/border.png"});
       render.setSize(this.border.size); 
      // console.log("border : "+trans.gameObject.name);
    }

};

	this.setBorder=function(x,y,w,h){
     if (x instanceof Object) {
     	  this.border=x;
     }else{
     	  this.border.position={x:x,y:y};
        this.border.size={w:w,h:h};
     }
	};
	this.setIsHiter=function(bool){
		this.isHiter=bool;
	};
	this.setLayer=function(layer){
      this.layer=layer;
	};
}