GE.import(["StageComp"]);
function Stage(){
	var stage=new GameObject();
	stage.name="Stage";
	stage.addCompment(new StageComp());
	return stage;
};