GE.import(["InputService","ScreenService","TimeService"]);
function PlayerController() {
	this.name="PlayerController";
	this.v=3;
	var anima;
	var trans;
	var size;
	var fire;
	var screen=Screen;
    var L=screen.width/3;
    var R=screen.width*2/3;
    var lastHite;
    var targetPosition=0;
    var v;
    var motion;
	this.start=function(){
		trans=this.transform;
		trans.scale.x=-1;
		anima=trans.getCompment("Animation");
        size=trans.getCompment("Render").size;
        fire=trans.getCompment("Fire");
        fire.isHiter=true;
        motion=trans.getCompment("GravityMotion");
        v=motion.v;
        anima.play("stand");
	};
	this.update=function(){
		
		if ((Input.s||Input.S)&&(Input.k||Input.K)) {
			  motion.isOnGround=false;
              fire.setDegree(90);
		}else if (Input.a||Input.A) {
			v.x=-this.v;
			trans.scale.x=1;
			anima.play("run");
			fire.setDegree(180);
		}else if(Input.d||Input.D){
			v.x=this.v;
			trans.scale.x=-1;
			anima.play("run");
			fire.setDegree(0);
		}else if(Input.w||Input.W){
			v.x=0;
            anima.play("up90");
            fire.setDegree(-90);
		}else if (Input.s||Input.S) {
			v.x=0;
			anima.play("down");
			fire.setDegree(90);
		}else{
			v.x=0;
			anima.play("stand");
			fire.setDegree(trans.scale.x==-1? 0:180);
		}

		if (Input.j||Input.J) {
			fire.fire();
		}

		if ( motion.isOnGround) {
			if (Input.getKeyDown("k")||Input.getKeyDown("K")) {	
               v.y=-10;
			}
			fire.setRate(10);
		}else{
			fire.setRate(20);
			jump();
		}

		if (trans.position.y>screen.height+size.h) {
			trans.position.x=300;
			trans.position.y=0;
			motion.isOnGround=false;
			v.y=0;
		}

        moveScreen.call(this);
	};

	var jump=function rotate(){
        anima.play("jump");
        trans.rotation-=15*trans.scale.x*1;
        fire.setDegree(trans.rotation);

	};

	var moveScreen=function(){

        if ((trans.position.x<screen.position.x+L)||(trans.position.x+size.w>screen.position.x+R)) {
        	targetPosition=trans.position.x-screen.width/2;
        }

        if (screen.position.x<=0) {
        	screen.position.x=0;
        }
        var sV=Util.parseInt((targetPosition-screen.position.x)/50);
        screen.position.x+=sV;
	};

	this.setV=function(val){
		this.v=val;
	};


}