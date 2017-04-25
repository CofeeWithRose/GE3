(function(){
    GE.start([
        "Render",
        "Animation",
        "PlayerController",
        "Fire",
        "GravityMotion",
        "BorderFactoryService",
        "StageService"
        ],function(){
     var map=new GameObject();
     map.name="map";
     var r=map.addCompment(new Render());
     r.setImage({src:"image/map/map1.png"});
     r.setSize(3328,224);
     var mapTrans=map.getCompment('Transform').position={x:0,y:(Screen.height-224)};
     Stage.setChild(map);

     var bordeList=[];
     bordeList.push({x0:32,y0:110,x1:738,y1:118});
     bordeList.push({x0:866,y0:110,x1:1026,y1:118});
     bordeList.push({x0:1154,y0:110,x1:1410,y1:118});
     bordeList.push({x0:1348,y0:80,x1:1858,y1:85});
     bordeList.push({x0:1827,y0:110,x1:2050,y1:118});
     bordeList.push({x0:2021,y0:80,x1:2178,y1:90});
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
     bordeList.push({x0:2980,y0:210,x1:3248,y1:215});
     bordeList.push({x0:3248,y0:180,x1:3326,y1:233,type:"end"});
     bordeList.push({x0:160,y0:145,x1:254,y1:142});
     bordeList.push({x0:259,y0:176,x1:288,y1:180});
     bordeList.push({x0:292,y0:210,x1:353,y1:215});
     bordeList.push({x0:355,y0:176,x1:384,y1:180});
     bordeList.push({x0:419,y0:145,x1:481,y1:150});
     bordeList.push({x0:580,y0:209,x1:642,y1:214});
     bordeList.push({x0:612,y0:160,x1:704,y1:164});
     bordeList.push({x0:1379,y0:210,x1:1475,y1:215});
     bordeList.push({x0:1476,y0:160,x1:1538,y1:164});
     bordeList.push({x0:1572,y0:145,x1:1793,y1:164});
     bordeList.push({x0:1702,y0:210,x1:1889,y1:164});
     bordeList.push({x0:1892,y0:175,x1:1954,y1:164});
     bordeList.push({x0:1989,y0:175,x1:2049,y1:181});
     bordeList.push({x0:2085,y0:160,x1:2114,y1:181});
     bordeList.push({x0:2145,y0:145,x1:2240,y1:150});
     bordeList.push({x0:2307,y0:210,x1:2335,y1:215});
     bordeList.push({x0:2466,y0:210,x1:2496,y1:215});
     bordeList.push({x0:2500,y0:160,x1:2529,y1:200});
     bordeList.push({x0:3012,y0:160,x1:3134,y1:200});
     BorderFactory(bordeList,mapTrans.y,0,map);


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
    player2.addCompment(new Fire());
    player2.addCompment(new GravityMotion());
    player2.getCompment("Transform").position={x:Screen.width/2,y:0};
    Stage.setChild(player2);

});
})();



