GE.import(["UtilService","TouchComp"]);
function InputComp() {
	this.name="InputComp";
	var center;
	var identifier;
	var startX=0;
	var startY=0;

	this.start=function(){
        
        Input.touches=[];
        Input.leavedTouchs=[];
        center=Screen.width/2;
		if (Util.isMobile()) {
            addMobileEvent();
			addTouchInput();
		}
		addPCEvent();
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
        Input.leavedTouchs=[];
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

            Input.touches=event.touches;

        }, false); 

        document.body.addEventListener('touchstart', function(event) {
            event.preventDefault();
          
           Input.touches=event.touches;
            
        }, false); 

        document.body.addEventListener('touchend', function(event) {
            event.preventDefault();
            //Stage.get("touch length---"+ Input.touchs.length);
            Input.touches=event.touches;
            //Input.leavedTouchs= event.changedTouches;
            var keys=Object.keys(event.changedTouches);
            for (var i = keys.length - 1; i >= 0; i--) {
               Input.leavedTouchs.push(event.changedTouches[keys[i]]);
            }
            //console.log(Input.leavedTouchs);
  
        }, false); 
    };
    var addTouchInput=function(){
        var touchInput=new GameObject();
        touchInput.name="touchInput";
        touchInput.addCompment(new TouchComp());
    };

};
