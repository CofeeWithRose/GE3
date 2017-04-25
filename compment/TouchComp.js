GE.import(["UtilService","ArrowCenterFllow","UImove","Animation","UIBtn"]);

function TouchComp() {
	this.name="TouchComp";

	var trans;

	var a="j";
	var b="k";
	var c="u";
	var d="i";

	var e="e";
	var r="r";

	var arrow=new GameObject();
	arrow.name="arrow";

	var arrowCenterBtn=new GameObject();
	arrowCenterBtn.name="arrowCenterBtn";

	var btnA=new GameObject();
	btnA.name="btnA";

	var btnB=new GameObject();
	btnB.name="btnB";

	var btnC=new GameObject();
	btnC.name="btnC";

	var btnD=new GameObject();
	btnD.name="btnD";

	var btnE=new GameObject();
	btnE.name="btnE";

	var btnR=new GameObject();
	btnR.name="btnR";

	var arrowCenterPos={x:0,y:0};

	this.start=function(){

		trans=this.transform;
		//方向盘背景
		var arrowRen=arrow.addCompment(new Render());
		arrowRen.setImage({src:"image/Arrow/arrow.png"});
		var arrowD=Util.parseInt(Screen.height>Screen.width? Screen.width:Screen.height)/3;
		arrowRen.setSize(arrowD,arrowD);

		var arrMotion=arrow.addCompment(new UImove());
		arrMotion.setPosition(Util.parseInt(arrowD/4),Util.parseInt(Screen.height*2/3-arrowD/2));

		arrowCenterPos={x:Util.parseInt(arrMotion.position.x+arrowD/2),y:Screen.height};

		//方向盘按钮
		var centerBtnRend=arrowCenterBtn.addCompment(new Render());
		centerBtnRend.setImage({src:"image/Arrow/arrowCenter.png"})
		centerBtnRend.setSize(Util.parseInt(arrowD*8/10),Util.parseInt(arrowD*8/10));
		arrowCenterBtn.addCompment(new UImove());

		var fllow=arrowCenterBtn.addCompment(new ArrowCenterFllow());
		fllow.setCenter({
			x:Util.parseInt(arrMotion.position.x+(arrowRen.size.w-centerBtnRend.size.w)/2),
			y:Util.parseInt(arrMotion.position.y+(arrowRen.size.h-centerBtnRend.size.h)/2)
		});
		fllow.setR(arrowD/2);

		//BtnA
		var btnARen=btnA.addCompment(new Render());
		btnARen.setSize(70,70);
		var btnAnim=btnA.addCompment(new Animation());
		btnAnim.setAnimation("up",1,"image/button");
		btnAnim.setAnimation("down",1,"image/button");
		var btnAMot=btnA.addCompment(new UImove());
		btnAMot.setPosition(Screen.width-btnARen.size.w*2,Screen.height*2/3);
		var btnAUI=btnA.addCompment(new UIBtn());
		btnAUI.setKey("j");
		//BtnB
		var btnBRen=btnB.addCompment(new Render());
		btnBRen.setSize(70,70);
		var btnBnim=btnB.addCompment(new Animation());
		btnBnim.setAnimation("up",1,"image/button");
		btnBnim.setAnimation("down",1,"image/button");
		var btnBMot=btnB.addCompment(new UImove());
		btnBMot.setPosition(Screen.width-btnBRen.size.w,Screen.height*2/3);
		var btnBUI=btnB.addCompment(new UIBtn());
		btnBUI.setKey("k");

	};
};
