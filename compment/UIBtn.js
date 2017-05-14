function UIBtn() {
	this.name="UIBtn";

	this.key="k";

	var trans;
  	var L;
  	var R;
  	var T;
  	var B;
  	var anim;

	this.start=function(){
		trans=this.transform;
		var position=trans.getCompment("UImove").position;
		var size=trans.getCompment("Render").size;
		anim=trans.getCompment("Animation");
		L=position.x;
		R=position.x+size.w;
		T=position.y;
		B=position.y+size.h;
	}
	this.earlyUpdate=function(){

		for (var i = Input.touches.length - 1; i >= 0; i--) {	
			var t=Input.touches[i];
			//Stage.get("----"+t.clientX+","+L);
			if (t.clientX>L&&t.clientX<R&&t.clientY>T&&t.clientY<B) {

				if (!Input[this.key]) {
					//console.log("down 1")
					Input.down[this.key]=true;
				}
				Input[this.key]=true;
				break;
			}
			Input[this.key]=false;

		}

		if (!Input.touches.length) {
			Input[this.key]=false;
		}

		if (Input[this.key]) {
			console.log("down");
			anim.play("down");
		}else{

			anim.play("up");
		}
	};

	this.setKey=function(val){
		this.key=val;
	}
}