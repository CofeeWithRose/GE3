GE.import(["HitBorder","Render","Animation","Bullet"]);
function Fire() {
	this.name="Fire";
	var trans;
	var num=0;
	var size;
	var nextShootFrame=0;
	var lastShootFrame=0;
	this.isHiter;
    this.degree=0;
    this.rate=1;
	this.start=function(){
       trans=this.transform;
       var border=trans.getCompment("HitBorder");
       size=trans.getCompment("Render").size;
	};
	this.update=function(){
		
		
		if (nextShootFrame==Time.frameCount) {
			createBullet.call(this,this.degree);
			nextShootFrame=Time.frameCount+21-this.rate;
			lastShootFrame=Time.frameCount;
		}

	};
	this.lateUpdate=function(){
		nextShootFrame=0;
	};
	this.setDegree=function(val){
		this.degree=val;
	};
	this.setIsHiter=function(val){
		this.isHiter=val;
	};
	this.setRate=function(val){
		if (val<0||val>20) {
			throw "rate must range 1 and 20 cant be "+val+"!"; 
		}
		this.rate=val;
	}

	this.fire=function(){

		if (Time.frameCount>lastShootFrame+(21-this.rate)) {
			nextShootFrame=Time.frameCount;
		}	
	}

	var createBullet=function(degree){
		num++;
		var b=new GameObject();
		b.name="bullet_"+trans.gameObject.name+num;
		var render=b.addCompment(new Render());
		render.setSize(10,10);
		var anim=b.addCompment(new Animation());
		anim.setAnimation("fly",1,"image/bullet");
		anim.setAnimation("destroy",1,"image/bullet");
		var border=b.addCompment(new HitBorder());
		border.setBorder(2,2,6,6);
		//border.isShow=true;
		border.isHiter=this.isHiter;

		var bullet=b.addCompment(new Bullet());
		bullet.degree=degree;
		//console.log({x:trans.position+size.w/2,y:trans.position.y+size.h/2});
		bullet.setInitPosition({x:trans.position.x+size.w/2,y:trans.position.y+size.h/2});
		Stage.setChild(b);

	}
}