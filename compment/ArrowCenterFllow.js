function ArrowCenterFllow() {
	this.name="ArrowCenterFllow";
	
	this.center={x:0,y:0};
	this.R=1;
	this.up="w";
	this.down="s";
	this.left="a";
	this.right="d";


	var trans;
	var position;
	var identifier;
	var isFollow=false;
	var realCenter={};
	var size;
	var realR;
	this.start=function(){
       trans=this.transform;
       position=trans.getCompment("UImove").position={x:this.center.x,y:this.center.y};
       size=trans.getCompment("Render").size;
       	realCenter.x=this.center.x+size.w/2;
		realCenter.y=this.center.y+size.h/2;
		realR=Util.parseInt(this.R/5);
	};
	this.update=function(){
		if (isFollow) {
			for (var i = Input.touches.length - 1; i >= 0; i--) {

				if(Input.touches[i].identifier==identifier){
					
					position.x=Input.touches[i].clientX-size.w/2;
					position.y=Input.touches[i].clientY-size.h/2;

					var dx=Input.touches[i].clientX-realCenter.x;
					var dy=Input.touches[i].clientY-realCenter.y;
					var dist=Math.sqrt(dx*dx+dy*dy);
					if(dist>realR){
						position.x=this.center.x+dx*realR/dist;
						position.y=this.center.y+dy*realR/dist;
					}

					if(dx>30&&dy>30){
						Input[this.right]=true;
						Input[this.left]=false;

						Input[this.up]=false;
						Input[this.down]=true;
					}else if(dx>30&&dy<-30){
						Input[this.right]=true;
						Input[this.left]=false;

						Input[this.up]=true;
						Input[this.down]=false;
					}else if(dx<-30&&dy>30){
						Input[this.left]=true;
						Input[this.right]=false;

						Input[this.up]=false;
						Input[this.down]=true;
					}else if(dx<-30&&dy<-30){
						Input[this.left]=true;
						Input[this.right]=false;

						Input[this.up]=true;
						Input[this.down]=false;

					}else if(dx>30){
						Input[this.right]=true;
						Input[this.left]=false;
						Input[this.up]=false;
						Input[this.down]=false;
					}else if(dx<-30){
						Input[this.left]=true;
						Input[this.right]=false;
						Input[this.up]=false;
						Input[this.down]=false;
					}else if(dy>30){
						Input[this.up]=false;
						Input[this.down]=true;
						Input[this.left]=false;
						Input[this.right]=false;
					}else if(dy<-30){
						Input[this.up]=true;
						Input[this.down]=false;
						Input[this.left]=false;
						Input[this.right]=false;
					}

					break;
				}
			}
		}

		if(!identifier){
			for (var i = Input.touches.length - 1; i >= 0; i--) {

				var drtx=Input.touches[i].clientX-realCenter.x;
				var drty=Input.touches[i].clientY-realCenter.y;
				if(drtx*drtx+drty*drty<=this.R*this.R){
					identifier=Input.touches[i].identifier;
					isFollow=true;
					break;
				}
			}
		};
		if(Input.leavedTouchs.length){
			//console.log(Input.leavedTouchs);
			for (var i = Input.leavedTouchs.length - 1; i >= 0; i--) {
				
				var t=Input.leavedTouchs[i];

				if(t.identifier==identifier){
					isFollow=false;
					identifier=false;
					position.x=this.center.x;
					position.y=this.center.y;
					Input[this.up]=false;
					Input[this.down]=false;
					Input[this.right]=false;
					Input[this.left]=false;
					break;
				}
			}
		}
	};

	this.setCenter=function(x,y){
		if(x instanceof Object){
			this.center=x;
		}else{
			this.center.x=x;
			this.center.y=y;
		}
	};
	this.setR=function(val){
		this.R=val;
	}
};
