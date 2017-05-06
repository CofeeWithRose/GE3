GE.import(["Render","HitManagerService"]);

function HitBorder() {
	this.name="HitBorder";
	
	var trans;
	var render;
  var rTrans;

	this.layer=-1;
  this.border={};
  this.isShow=false;
  this.isHiter=false;


  this.start=function(){

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

      var  rObj=new GameObject();
       rObj.name="border_"+trans.gameObject.name;
       rTrans=rObj.getCompment('Transform');
      var rRender=rObj.addCompment(new Render());
       rRender.setImage({src:"image/border/border.png"});
       rRender.setSize(this.border.size); 
   //   console.log(rTrans.gameObject);
    }
     //console.log("border : "+this.isHiter);

  };

  this.update=function update(){

    if (this.isShow) {
         rTrans.position.x=this.border.position.x+trans.position.x;
         rTrans.position.y=this.border.position.y+trans.position.y;
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
  this.setIsShow=function(bool){
     isShow=bool;
  };
}