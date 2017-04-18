function InputComp() {
	this.name="InputComp";
	var center=Screen.width/2;
	var identifier;
	var startX=0;
	var startY=0;


	this.start=function(){

		if (Util.isMobile()) {
			addMobileEvent();

		}else{
			addPCEvent();
		};
	};

	this.lateUpdate=function(){

      var d=Object.keys(Input.down);
      var u=Object.keys(Input.up);
      for (var i = d.length - 1; i >= 0; i--) {
        Input.down[d[i]]=false;
      }
      for (var i = u.length - 1; i >= 0; i--) {
        Input.up[u[i]]=false;
      }

    };

    var addPCEvent=function(){
      window.addEventListener("keydown",function(e){

        if (!Input[e.key]) {
          Input.down[e.key]=true;
        };
        Input[e.key]=true;
      });
      window.addEventListener("keyup",function(e){
        Input[e.key]=false;
        Input.up[e.key]=true;
      });
    };

    var addMobileEvent=function(){
    	document.body.addEventListener('touchmove', function(event) {
    		event.preventDefault();
    		for (var i = event.touches.length - 1; i >= 0; i--) {

    			if (event.touches[i].clientX<=center&&identifier===event.touches[i].identifier) {

    				var dtY=event.touches[i].clientY-startY;
    				var dtX=event.touches[i].clientX-startX;
    				var isY=Math.abs(dtY)>50; 
    				if (isY) {
    					if (dtY>20){
    						Input.w=false;
    						Input.s=true;
    					}else if (dtY<-20){
    						Input.w=true;
    						Input.s=false;
    					}
    				}else{

    					if (dtX<-10) {
    						Input.a=true;
    						Input.d=false;
    					}else if (dtX>10){
    						Input.d=true;
    						Input.a=false;

    					}

    				}
    			}
    		}


    	}, false); 

    	document.body.addEventListener('touchstart', function(event) {
    		event.preventDefault();

    		Input.j=true;

    		for (var i = event.touches.length - 1; i >= 0; i--) {

    			if (event.touches[i].clientX>center) {
    				Input.down.k=true;
    				Input.k=true;
    			}else{
    				identifier=event.touches[i].identifier;
    				startY=event.touches[i].clientY;
    				startX=event.touches[i].clientX;
    			}
    		}
    	}, false); 

    	document.body.addEventListener('touchend', function(event) {
    		event.preventDefault();

    		for (var i = event.changedTouches.length - 1; i >= 0; i--) {

    			if (identifier===event.changedTouches[i].identifier) {
    				Input.a=false;
    				Input.d=false;
    			}

    			Input.k=false;
    			Input.s=false;
    			Input.w=false;
    			Input.up.j=true;
    		}

    	}, false); 
    };
};
