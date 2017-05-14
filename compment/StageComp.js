function StageComp() {
	this.name="StageComp";
	var trans;
	this.start=function(){
       trans=this.transform;

	};
	this.update=function(){
		if (Input.getKeyUp("i")) {
			localStorage.setItem("GE",Util.stringify(trans.gameObject));
			//document.write(localStorage.GE);
			alert("save successfuly!");
		}
		if (Input.r||Input.R) {
			location.reload();
		}
		if (Input.e||Input.E) {
			if (/main/.test(location.href)) {
				location.href="recover.html";
			}else{
				location.href="main.html";
			}
		}
	}
};
