function UImove(argument) {
	this.name="UImove";
	var trans;
	this.position={x:0,y:0};

	this.start=function(){
		trans=this.transform;
		move.call(this);
	};
	this.update=function(){
		move.call(this);
	};
	var move=function(){
		trans.position.x=Screen.position.x+this.position.x;
		trans.position.y=Screen.position.y+this.position.y;
	}
	this.setPosition=function(x,y){
		if (x instanceof Object) {
			this.position=x;
		}else{
			this.position.x=x;
			this.position.y=y;
		}
	};
}