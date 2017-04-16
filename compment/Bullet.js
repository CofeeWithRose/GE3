function Bullet() {
	this.name="Bullet";
	var trans;
	var anim;
    var v={x:this.V,y:0};
    var count=0;
    var isHit;

    this.V=5;
    this.degree=0;
    this.initPosition={x:0,y:0};

	this.start=function(){

		trans=this.transform;
		
		anim=trans.getCompment("Animation");
		var d=this.degree*Math.PI/180;
        v.x=Util.parseInt(Math.cos(d)*this.V);
        v.y=Util.parseInt(Math.sin(d)*this.V);
        trans.position.x=this.initPosition.x+v.x;
        trans.position.y=this.initPosition.y+v.y;

        //console.log(trans);
	};
	this.update=function(){
		
		anim.play("fly");
        trans.position.x+=v.x;
        trans.position.y+=v.y;

        if (isHit) {
        	destroy();
        }

        if (!Screen.judgeInScreen(trans.gameObject)) {
        	isHit=true;
        }
	};

	this.setV=function(val){
		this.V=val;
	};
	this.setDegree=function(val){
		this.degree=val;
	};
	this.setInitPosition=function(pos){
		this.initPosition.x=pos.x;
		this.initPosition.y=pos.y;
	}

	this.onHit=function(other){
       
    /*   var otherObj=GE.findGameObjectById(other.id);
      
       if (/ground/.test(otherObj.name)) {
       		isHit=true;
       }*/

	};
	var destroy=function(){
		v.x=0;
		v.y=0;
		anim.play("destroy");
		if (Time.frameCount%4==0) {
			count++;

		}
		if (count>=2) {
			trans.gameObject.destroySelf();
		}
	};


}