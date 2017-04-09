function PlayerController(argument) {
	this.name="PlayerController";
	this.v={x:2,y:2};
	var _pro=this;
	var anima;
	var trans;
	this.start=function(){
		trans=_pro.transform;
		anima=trans.getCompment("Animation");
	};
	this.update=function(){
		if (Input.getKeyUp("m")&&trans.gameObject.name==="player2") {
			localStorage._GE = Util.stringify(trans.gameObject);
			/*document.write(localStorage._GE);*/
			alert("save successfuly!");
		}
		
		if (Input.a) {
			trans.position.x-=_pro.v.x;
			trans.scale.x=1;
			anima.play("run");
		}else if(Input.d){
			trans.position.x+=_pro.v.x;
			trans.scale.x=-1;
			anima.play("run");
		}else{
			anima.play("stand");
		}
	};
	this.setV=function(val){
        _pro.v=val;
	}
}