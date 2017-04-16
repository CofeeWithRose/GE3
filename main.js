(function(){
    GE.start(["Render","Animation","PlayerController","HitBorder","Stage","BorderFactory"],function(){

    var stage=new GameObject();
    stage.name="Stage";
    stage.addCompment(new Stage());

     var map=new GameObject();
     map.name="map";
     var r=map.addCompment(new Render());
     r.setImage({src:"image/map/map1.png"});
     r.setSize(3328,224);
     var mapTrans=map.getCompment('Transform').position={x:0,y:Screen.height-300};
     stage.setChild(map);


     
    /* var mapB2=new GameObject();
     mapB2.name="ground2";
     var border=mapB2.addCompment(new HitBorder());
     border.isShow=true;
     border.setBorder(0,0,160,5);
     stage.setChild(mapB2);
     var trans=mapB2.getCompment('Transform').position={x:865,y:mapTrans.y+105};

     var mapB3=new GameObject();
     mapB3.name="ground3";
     var border=mapB3.addCompment(new HitBorder());
     border.isShow=true;
     border.setBorder(0,0,250,5);
     stage.setChild(mapB3);
     var trans=mapB3.getCompment('Transform').position={x:1156,y:mapTrans.y+105};*/

     var bordeList=[];
     bordeList.push({x0:32,y0:110,x1:738,y1:118});
     bordeList.push({x0:866,y0:110,x1:1026,y1:118});
     bordeList.push({x0:1154,y0:110,x1:1410,y1:118});
     bordeList.push({x0:1348,y0:80,x1:1858,y1:85});
     bordeList.push({x0:1827,y0:110,x1:2050,y1:118});
     bordeList.push({x0:2018,y0:80,x1:2178,y1:90});
     bordeList.push({x0:2146,y0:145,x1:2240,y1:142});
     bordeList.push({x0:2211,y0:110,x1:2273,y1:118});
     bordeList.push({x0:2305,y0:145,x1:2368,y1:142});
     bordeList.push({x0:2337,y0:175,x1:2432,y1:176});
     bordeList.push({x0:2433,y0:110,x1:2496,y1:118});
     bordeList.push({x0:2466,y0:80,x1:2528,y1:85});
     bordeList.push({x0:2561,y0:110,x1:2625,y1:118});
     bordeList.push({x0:2594,y0:145,x1:2751,y1:150});
     bordeList.push({x0:2690,y0:208,x1:2782,y1:150});
     bordeList.push({x0:2817,y0:175,x1:2880,y1:176});
     bordeList.push({x0:2914,y0:145,x1:2976,y1:150});
     bordeList.push({x0:2977,y0:110,x1:3134,y1:115});
     bordeList.push({x0:3135,y0:145,x1:3166,y1:143});
     bordeList.push({x0:3168,y0:175,x1:3199,y1:176});
     bordeList.push({x0:2977,y0:210,x1:3248,y1:215});
     bordeList.push({x0:3248,y0:180,x1:3326,y1:233,type:"end"});

     bordeList.push({x0:160,y0:145,x1:254,y1:142});
     bordeList.push({x0:257,y0:170,x1:288,y1:175});

     BorderFactory(bordeList,mapTrans.y,false,stage);


   
/*   var player=new GameObject();
   player.name="player";
   var r=player.addCompment(new Render());
   r.setSize({w:50,h:50});
   var anima1=player.addCompment(new Animation());
    anima1.setAnimation("run",4,"image/player1");
    anima1.setAnimation("stand",1,"image/player1");
    anima1.setSpeed(6);
  //player.addCompment(new PlayerController());
    anima1.play("stand");
    player.addCompment(new Stage());
     
    player.getCompment("Transform").position={x:400,y:100};
    player.addCompment(new HitBorder());
    stage.setChild(player);
  var x=0;
  var y=10;*/


     


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
    r.setSize({w:70,h:70});

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

     border.isShow=false;
      border.setBorder(20,r.size.h-5,20,5);

      player2.getCompment("Transform").position={x:100,y:100};

     stage.setChild(player2);

});
})();



