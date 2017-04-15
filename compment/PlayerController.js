function PlayerController(argument) {
	this.name="PlayerController";
	this.v={x:0,y:0};
	this.a={x:0,y:0};
	this.V=3;
	var anima;
	var trans;
	var size;

	var isOnGround=false;
	this.start=function(){
		trans=this.transform;
		anima=trans.getCompment("Animation");
        size=trans.getCompment("Render").size;
        anima.play("stand");
	};
	this.update=function(){

	 	if (isOnGround) {
	 		
			if (Input.a||Input.A) {

				//trans.position.x-=this.v.x;
				this.v.x=-this.V;
				trans.scale.x=1;
				anima.play("run");
			}else if(Input.d||Input.D){

				//trans.position.x+=this.v.x;
				this.v.x=this.V;
				trans.scale.x=-1;
				anima.play("run");
			}else if(Input.w||Input.W){
				this.v.x=0;
	            anima.play("up90");
			}else if (Input.s||Input.S) {
				this.v.x=0;
				anima.play("down");
			}else{
				this.v.x=0;
				anima.play("stand");
			}

			if (Input.getKeyUp(" ")) {
               this.v.y=-10;
			}

		}else {
      	  this.a.y=0.5;
      	  rotate.apply(this);
	    }
	    this.v.x+=this.a.x;
	    this.v.y+=this.a.y;
        trans.position.y+=this.v.y;
        trans.position.x+=this.v.x;
	};

	this.setV=function(val){
        this.v=val;
	};

	this.onHit=function onHit(other){
		 this.a.y=0;
		 this.v.y=0;
		 trans.rotation=0;
         trans.position.y=other.y-size.h+1;
         isOnGround=true;
	};

	this.onLeave=function onLeave(other){
		isOnGround=false;
	}

	var rotate=function rotate(){
        anima.play("jump");
        trans.rotation-=15*trans.scale.x;
	};
}