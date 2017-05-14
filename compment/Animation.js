GE.import(["ResourceFactoryService"]);
function Animation(){
	this.name="Animation";
	var render;
	var trans;
	var imgNum=0;
	var count=0;
	var anim;
	var animName;
	this.imageMap={};
	this.speed=1;
	this.start=function(){
      trans=this.transform;
      render=trans.getCompment("Render");
	};
	this.update=function(){

		if (anim&&anim.length>0) {
			if (Time.frameCount%this.speed==0) {
			   count++;
		    }
	     	render.setImage(anim[count%imgNum]);
		}
		
	};
	this.setAnimation=function(name,num,path){
	    var list=[];
        for (var i = num ; i >0; i--) {
           list.push(ResourceFactory.getResource("Image",path+"/"+name+i+".png"));
        }
        this.imageMap[name]=list;
	};
	this.play=function(name){
		if (animName!==name) {
			animName=name;
	       anim=this.imageMap[name];
	       imgNum=anim.length;
        }
	};

	this.setSpeed=function(v){
		this.speed=v;
	};

	this.setImageMap=function(map){
		var names=Object.keys(map);
        for (var i = names.length - 1; i >= 0; i--) {
        	var imgList=map[names[i]];
        	this.imageMap[names[i]]=[];
        	for (var j = imgList.length - 1; j >= 0; j--) {
        		if(imgList[j]){
	        		this.imageMap[names[i]].push(ResourceFactory.getResource("Image",imgList[j].src));
        		}
        	
        	}
        }
        names=null;
        imgList=null;
	};

};