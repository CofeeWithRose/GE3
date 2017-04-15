function PlayerController(argument) {
	this.name="PlayerController";
	this.v={x:2,y:2};
	
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

				trans.position.x-=this.v.x;
				trans.scale.x=1;
				anima.play("run");
			}else if(Input.d||Input.D){

				trans.position.x+=this.v.x;
				trans.scale.x=-1;
				anima.play("run");
			}else if(Input.w||Input.W){

	            anima.play("up90");
			}else if (Input.s||Input.S) {

				anima.play("down");
			}else{
				anima.play("stand");
			}

		}else {
      	  trans.position.y+=this.v.y;
	    }

		isOnGround=false;
	};
	this.setV=function(val){
        this.v=val;
	};
	this.onHit=function onHit(other){
         trans.position.y=other.y-size.h+1;
         isOnGround=true;
	};
}