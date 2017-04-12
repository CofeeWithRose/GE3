function Rigidbody() {
	this.name="Rigidbody";
	var _pro=this;
	var trans;
	this.start=function(){
       trans=_pro.transform;
	};
	this.update=function(){
		if (Input.getKeyUp("m")&&trans.gameObject.name==="stage") {
			localStorage._GE = Util.stringify(trans.gameObject);
			document.write(localStorage._GE);
			alert("save successfuly!");
		}
	}
}