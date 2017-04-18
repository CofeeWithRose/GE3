GE.import(["HitBorder"]);

function GravityMotion() {

	this.name="GravityMotion";

	this.v={x:0,y:0};
	this.a={x:0,y:0};

	this.isOnGround=false;
	var lastHite;

	var grondHiter;
	var size;

	this.start=function start(){

		trans=this.transform;
		grondHiter=new GameObject();
		grondHiter.name="gravityMotion-"+trans.gameObject.name;
		size=trans.getCompment("Render").size;
		var border=grondHiter.addCompment(new HitBorder());
		border.isHiter=true;
		//border.isShow=true;
		border.setBorder(27,size.h-1,16,1);
		var hTrans=grondHiter.getCompment("Transform");
		hTrans.position=trans.position;
        hTrans.onHit=hiterOnHit.bind(this);
        hTrans.onLeave=hiterOnLeave.bind(this);
	};
	this.update=function update(){
		if (!this.isOnGround) {
			this.a.y=0.5;
			if (this.v.y>=10) {
				this.v.y=10;
			}
		}
	    this.v.x+=this.a.x;
	    this.v.y+=this.a.y;
        trans.position.y+=this.v.y;
        trans.position.x+=this.v.x;
	};

	var hiterOnHit=function onHit(other){

		if (/ground-/.test(other.obj.name)) {
			lastHite=other.id;
			this.a.y=0;
			this.v.y=0;
			trans.rotation=0;
			trans.position.y=other.y-size.h+1;
			this.isOnGround=true;
        
    	}
	};

	var hiterOnLeave=function onLeave(other){

		if(lastHite==other.id){
			this.isOnGround=false;
			//console.log("leave...");
		}

	};

	this.setV=function(val){
        this.v=val;
	};
	this.setA=function(val){
		this.a=val;
	}
}