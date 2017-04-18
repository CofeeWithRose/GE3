var Screen=function(){
   var _position={x:0,y:0};
   var canvas=document.getElementById("canvas");
   canvas.width=canvas.clientWidth;
   canvas.height=canvas.clientHeight;
   var context=canvas.getContext("2d");
   var fps=document.getElementById("FPS");
   var _draw=function(obj,x,y,w,h){
      context.drawImage(obj,x-_position.x,y-_position.y,w,h);
   }
   var _showFps=function(){

     if (Time.frameCount%100==1) {
          fps.innerHTML=Util.parseInt(1000/Time.delTime);
      }    
   };
   var _clear=function(){
     context.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);
     
   };
   var _judgeInScreen=function judgeInScreen(obj){

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
    judgeInScreen:_judgeInScreen
   }
};