GE.import(["StageComp"]);
function Stage(){
	var stage=new GameObject();
	stage.name="Stage";
	var _get=function(info){
		var iframe=document.createElement("iframe");
		iframe.src="info-="+info;
		iframe.onload=function(){
			iframe.remove();
		}
		document.body.appendChild(iframe);
	};
	stage.get=_get;
	stage.addCompment(new StageComp());
	return stage;
};