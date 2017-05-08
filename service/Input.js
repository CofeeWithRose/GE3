GE.import(["InputComp","UtilService"]);
function Input(){

  var fn=new GameObject();
  fn.name="Input";
  fn.addCompment(new InputComp());

  fn.up={};

  fn.down={};

  fn.getKeyDown=function(key){
    return Input.down[key];
  };

  fn.getKeyUp=function(key){
   return Input.up[key];
  };
 return fn;

}