function Stage() {
	this.name="Stage";
	var trans;
	this.start=function(){
       trans=this.transform;
	};
	this.update=function(){
		if (Input.getKeyUp("m")) {
			localStorage._GE = Util.stringify(trans.gameObject);
			//document.write(localStorage._GE);
			alert("save successfuly!");
		}
		if (Input.r||Input.R) {
			location.reload();
		}
	}
}