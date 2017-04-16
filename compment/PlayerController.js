function PlayerController(argument) {
	this.name="PlayerController";
	this.v={x:0,y:0};
	this.a={x:0,y:0};
	this.V=3;
	var anima;
	var trans;
	var size;
	var isOnGround;

    var L=Screen.width/4;
    var R=Screen.width*3/4;

    var lastHite;

    var targetPosition=0;

	this.start=function(){
		trans=this.transform;
		trans.scale.x=-1;
		anima=trans.getCompment("Animation");
        size=trans.getCompment("Render").size;
        anima.play("stand");
	};
	this.update=function(){
	
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

		if (isOnGround) {
			if (Input.k||Input.K) {
               this.v.y=-10;
			}
		}else {
      	  this.a.y=0.5;
      	  rotate.apply(this);
	    }
//console.log(isOnGround);
	    this.v.x+=this.a.x;
	    this.v.y+=this.a.y;
        trans.position.y+=this.v.y;
        trans.position.x+=this.v.x;

        moveScreen.call(this);
	};

	this.onHit=function onHit(other){
		//console.log("hit : "+other.id);
		 lastHite=other.id;
		 this.a.y=0;
		 this.v.y=0;
		 trans.rotation=0;
         trans.position.y=other.y-size.h+1;
         isOnGround=true;
	};

	this.onLeave=function onLeave(other){
		//console.log("leave : "+other.id);
		if(lastHite==other.id){
			isOnGround=false;
		}

	};

	var rotate=function rotate(){
        anima.play("jump");
        trans.rotation-=15*trans.scale.x;
	};

	var moveScreen=function(){

        if ((trans.position.x<Screen.position.x+L)||(trans.position.x+size.w>Screen.position.x+R)) {
        	targetPosition=trans.position.x-Screen.width/2;
        }

        if (Screen.position.x<=0) {
        	Screen.position.x=0;
        }
        Screen.position.x+=Util.parseInt((targetPosition-Screen.position.x)/50);



	};

	this.setV=function(val){
        this.v=val;
	};
	this.setA=function(val){
		this.a=val;
	}
}