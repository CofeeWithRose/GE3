var Screen=function(){
  var isFull=0;
  var _position={x:0,y:0};
  var canvas=document.getElementById("canvas");
  canvas.width=canvas.clientWidth;
  canvas.height=canvas.clientHeight;
  var context=canvas.getContext("2d");
  var fps=document.getElementById("FPS");
  var _draw=function(obj,x,y,w,h){
    context.drawImage(obj,x-_position.x,y-_position.y,w,h);
  };
  var _launchFullscreen=function launchFullscreen(element) {// 判断各种浏览器，找到正确的方法设置全屏
    if (isFull) {
      return;
    }
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if(element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if(element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
    setTimeout(function() { canvas.width=canvas.clientWidth;
    canvas.height=canvas.clientHeight;}, 1000);
   
    isFull=1;
  };
  var _showFps=function(){

   if (Time.frameCount%100==1) {
    fps.innerHTML=Util.parseInt(10/Time.delTime);
  }    
};
var _clear=function(){
 context.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);

};
var _outTest=function(obj){

  if (obj instanceof GameObject&&obj.getCompment("Render")) {
    var size=obj.getCompment("Render").size;
    var oPos=obj.getCompment("Transform").position;
    var L=_position.x;
    var R=_position.x+canvas.width;
    var T=_position.y;
    var B=_position.y+canvas.height;
    if (oPos.x+size.w<L||oPos.x>R) {
      return false;
    }else if (oPos.y+size.h<T||oPos.y>B) {
      return false;
    }else{
      return true;
    }

  }else{
    return false;
  }
};
return{
  height:canvas.height,
  width:canvas.width,
  position:_position,
  draw:_draw,
  clear:_clear,
  showFps:_showFps,
  outTest:_outTest,
  launchFullscreen:_launchFullscreen
}
};