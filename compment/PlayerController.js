function PlayerController(argument) {
	this.name="PlayerController";
	this.v={x:0,y:0};
	this.a={x:0,y:0};
	this.V=3;

	var anima;
	var trans;
	var size;
	var isOnGround;
	var fire;

    var L=Screen.width/3;
    var R=Screen.width*2/3;

    var lastHite;

    var targetPosition=0;

	this.start=function(){
		trans=this.transform;
		//console.log("player : "+trans.gameObject.id);
		trans.scale.x=-1;
		anima=trans.getCompment("Animation");
        size=trans.getCompment("Render").size;
        fire=trans.getCompment("Fire");
        anima.play("stand");
	};
	this.update=function(){
		if ((Input.s||Input.S)&&(Input.k||Input.K)) {
              isOnGround=false;
              fire.setDegree(90);
		}else if (Input.a||Input.A) {
			this.v.x=-this.V;
			trans.scale.x=1;
			anima.play("run");
			fire.setDegree(180);
		}else if(Input.d||Input.D){
			this.v.x=this.V;
			trans.scale.x=-1;
			anima.play("run");
			fire.setDegree(0);
		}else if(Input.w||Input.W){
			this.v.x=0;
            anima.play("up90");
            fire.setDegree(-90);
		}else if (Input.s||Input.S) {
			this.v.x=0;
			anima.play("down");
			fire.setDegree(90);
		}else{
			this.v.x=0;
			anima.play("stand");
			fire.setDegree(trans.scale.x==-1? 0:180);
		}

		if (isOnGround) {
			if (Input.getKeyDown("k")||Input.getKeyDown("K")) {	
               this.v.y=-10;
			}
		}else {
			//fire.setDegree(0);
      	  this.a.y=0.5;
      	  jump.apply(this);
	    }
//console.log(isOnGround);
	    this.v.x+=this.a.x;
	    this.v.y+=this.a.y;
        trans.position.y+=this.v.y;
        trans.position.x+=this.v.x;

        moveScreen.call(this);
	};

	this.onHit=function onHit(other){
         //console.log("onHit .."+other.id);
		 lastHite=other.id;
		 this.a.y=0;
		 this.v.y=0;
		 trans.rotation=0;
         trans.position.y=other.y-size.h+1;
         isOnGround=true;
	};

	this.onLeave=function onLeave(other){
		if(lastHite==other.id){
			isOnGround=false;
		}

	};

	var jump=function rotate(){
        anima.play("jump");
        trans.rotation-=15*trans.scale.x;
        fire.setDegree(trans.rotation);
	};

	var moveScreen=function(){

        if ((trans.position.x<Screen.position.x+L)||(trans.position.x+size.w>Screen.position.x+R)) {
        	targetPosition=trans.position.x-Screen.width/2;
        }

        if (Screen.position.x<=0) {
        	Screen.position.x=0;
        }
        Screen.position.x+=Util.parseInt((targetPosition-Screen.position.x)/80);



	};

	this.setV=function(val){
        this.v=val;
	};
	this.setA=function(val){
		this.a=val;
	}
}