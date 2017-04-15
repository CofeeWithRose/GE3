(function(){
    GE.start(["Render","Animation","PlayerController","HitBorder","Rigidbody"],function(){

    var stage=new GameObject();
    stage.name="stage";
    stage.addCompment(new Rigidbody());

     var map=new GameObject();
     map.name="map";
     var r=map.addCompment(new Render());
     r.setImage({src:"image/map/map1.png"});
     r.setSize(3328,224);
     var mapTrans=map.getCompment('Transform').position={x:0,y:Screen.height-300};
     stage.setChild(map);

     var mapB1=new GameObject();
     mapB1.name="ground1";
     var border=mapB1.addCompment(new HitBorder());
     border.isShow=false;
     border.setBorder(0,0,700,5);
     stage.setChild(mapB1);
     var trans=mapB1.getCompment('Transform').position={x:35,y:mapTrans.y+110};

     var mapB2=new GameObject();
     mapB2.name="ground2";
     var border=mapB2.addCompment(new HitBorder());
     border.isShow=true;
     border.setBorder(0,0,160,5);
     stage.setChild(mapB2);
     var trans=mapB2.getCompment('Transform').position={x:865,y:mapTrans.y+110};


   
   var player=new GameObject();
   player.name="player";
   var r=player.addCompment(new Render());
   r.setSize({w:50,h:50});
   var anima1=player.addCompment(new Animation());
    anima1.setAnimation("run",4,"image/player1");
    anima1.setAnimation("stand",1,"image/player1");
    anima1.setSpeed(6);
  //player.addCompment(new PlayerController());
   anima1.play("stand");
   player.addCompment(new Rigidbody());
    player.getCompment("Transform").position={x:400,y:100};
    player.addCompment(new HitBorder());
  var x=0;
  var y=10;


     


   //localStorage._GE = Util.stringify(player2);
   //document.write(Util.stringify(player2));
  // GE.instantGameObject(player);
  // for (var i = 200; i >= 0; i--) {

  //   if (x>25*50) {y+=50;x=0};
  //   var player2=new GameObject();
  //   player2.name="player2";
  //   var r=player2.addCompment(new Render());
  //   r.setSize({w:50,h:50});
  //   var anima2=player2.addCompment(new Animation());
  //   anima2.setAnimation("run",7,"image/player2");
  //   anima2.setAnimation("stand",1,"image");
  //   anima2.setSpeed(5);
  //   player2.addCompment(new PlayerController());
  //   player2.getCompment("Transform").position.x=x;
  //   player2.getCompment("Transform").position.y=y;
  //   player2.addCompment(new HitBorder());
  //   stage.setChild(player2);
  //    x+=45;
  // }

    var player2=new GameObject();
    player2.name="player2";
    var r=player2.addCompment(new Render());
    r.setSize({w:50,h:50});
    var anima2=player2.addCompment(new Animation());
    anima2.setAnimation("run",7,"image/player2");
    anima2.setAnimation("stand",1,"image/player2");
    anima2.setAnimation("up45",1,"image/player2");
    anima2.setAnimation("up90",1,"image/player2");
    anima2.setAnimation("jump",1,"image/player2");
    anima2.setAnimation("down",1,"image/player2");
    anima2.setSpeed(5);
    player2.addCompment(new PlayerController());
    var border=player2.addCompment(new HitBorder());
     border.isHiter=true;
     stage.setChild(player2);
     stage.setChild(player);
});
})();



