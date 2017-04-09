(function(){
  GE.start(["Render","Animation","PlayerController","Collider","Rigidbody"],function(){

   var player=new GameObject();
   player.name="player";
   player.addCompment(new Render());
   var anima1=player.addCompment(new Animation());
    anima1.setAnimation("run",4,"image/player1");
    anima1.setAnimation("stand",1,"image/player1");
    anima1.setSpeed(5);
   player.addCompment(new PlayerController());
   player.addCompment(new Rigidbody());

  var player2=new GameObject();
   player2.name="player2";
   player2.addCompment(new Render());
   var anima2=player2.addCompment(new Animation());
    anima2.setAnimation("run",6,"image/player2");
    anima2.setAnimation("stand",1,"image/player2");
    anima2.setSpeed(5);
   player2.addCompment(new PlayerController());
   player2.getCompment("Transform").position={x:200,y:0};
   player2.setChild(player);
   //localStorage._GE = Util.stringify(player2);
   //document.write(Util.stringify(player2));
  // GE.instantGameObject(player);
   GE.instantGameObject(player2);
});
})();



