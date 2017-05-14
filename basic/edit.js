var $=function(){
	
	$$recover();
	var _util=Util;
	var _stageData=JSON.parse(localStorage.getItem("_GE"));

	var _stageHistory=[stageData];

	var copy=function(){
		
	}

	return {

	}
};


var layoutUI=function(){

	var _vBarList=document.getElementsByClassName("v-bar");
	var _hBarList=document.getElementsByClassName("h-bar");
	var _onMoveHBar=function(e){
		var minDrt=_curElem.elem.parentElement.clientWidth*0.05;
		var _lastWNum=parseInt(_curLastElem.className.match(/w-\d+/)[0].split("-")[1]);
		var _nextWNum=parseInt(_curNextElem.className.match(/w-\d+/)[0].split("-")[1]);
		var _drt=e.x-_curElem.elem.offsetLeft;
		var _last;
		var _next;
		if (_drt>=minDrt/2) {
			_last=((_lastWNum+5)>0? (_lastWNum+5):0);
			_next=((_nextWNum-5)>0? (_nextWNum-5):0);
			if ((_last+_next)<=_curElem.maxSum) {
				_changeClassW(_curLastElem,"w-"+_last);
				_changeClassW(_curNextElem,"w-"+_next);
			}
		}else if(_drt<=-minDrt/2){
			_last=((_lastWNum-5)>0? (_lastWNum-5):0);
			_next=((_nextWNum+5)>0? (_nextWNum+5):0);
			if ((_last+_next)<=_curElem.maxSum){
				_changeClassW(_curLastElem,"w-"+_last);
				_changeClassW(_curNextElem,"w-"+_next);
			}
		}
	};
	var _onMoveVBar=function(e){
		
		var minDrt=_curElem.elem.parentElement.clientHeight*0.05;
		var _lastWNum=parseInt(_curLastElem.className.match(/h-\d+/)[0].split("-")[1]);
		var _nextWNum=parseInt(_curNextElem.className.match(/h-\d+/)[0].split("-")[1]);
		var _drt=e.y-_curElem.elem.offsetTop;
		var _last;
		var _next;

		if (_drt>=minDrt/2) {
			_last=((_lastWNum+5)>5? (_lastWNum+5):5);
			_next=((_nextWNum-5)>5? (_nextWNum-5):5);
			if ((_last+_next)<=_curElem.maxSum) {
				_changeClassH(_curLastElem,"h-"+_last);
				_changeClassH(_curNextElem,"h-"+_next);
			}
		}else if(_drt<=-minDrt/2){
			_last=((_lastWNum-5)>5? (_lastWNum-5):5);
			_next=((_nextWNum+5)>5? (_nextWNum+5):5);
			if ((_last+_next)<=_curElem.maxSum){
				_changeClassH(_curLastElem,"h-"+_last);
				_changeClassH(_curNextElem,"h-"+_next);
			}
		}
	};
	var _changeClassW=function(elem,newClass){
		elem.className=elem.className.replace(/w-\d+/,newClass);
	};
	var _changeClassH=function(elem,newClass){
		elem.className=elem.className.replace(/h-\d+/,newClass);
	};

	var _curElem;
	var _curLastElem;
	var _curNextElem;
	var _curMoveListener;
	for (var i = _hBarList.length - 1; i >= 0; i--) {
		_hBarList[i].addEventListener("mousedown",function(e){
			if (!_curElem) {
				var _elem=e.target;
				_curElem={type:"h",elem:_elem,maxSum:0};
				_curLastElem=_elem.previousElementSibling;
				_curNextElem=_elem.nextElementSibling;
				var _lastWNum=parseInt(_curLastElem.className.match(/w-\d+/)[0].split("-")[1]);
				var _nextWNum=parseInt(_curNextElem.className.match(/w-\d+/)[0].split("-")[1]);
				_curElem.maxSum=_lastWNum+_nextWNum;
				document.addEventListener("mousemove",_onMoveHBar);
				document.body.className=document.body.className+" mouse-h";
			}
		});
	};
	for (var i = _vBarList.length - 1; i >= 0; i--) {
		_vBarList[i].addEventListener("mousedown",function(e){
			if (!_curElem) {
				var _elem=e.target;
				_curElem={type:"v",elem:_elem,maxSum:0};
				_curLastElem=_elem.previousElementSibling;
				_curNextElem=_elem.nextElementSibling;
				var _lastWNum=parseInt(_curLastElem.className.match(/h-\d+/)[0].split("-")[1]);
				var _nextWNum=parseInt(_curNextElem.className.match(/h-\d+/)[0].split("-")[1]);
				_curElem.maxSum=_lastWNum+_nextWNum;
				document.addEventListener("mousemove",_onMoveVBar);
				document.body.className=document.body.className+" mouse-v";
			}
		});
	};
	document.addEventListener("mouseup",function(){

		document.removeEventListener("mousemove",_onMoveVBar);
		document.removeEventListener("mousemove",_onMoveHBar);
		document.body.className=document.body.className.replace(" mouse-h","");
		document.body.className=document.body.className.replace(" mouse-v","");
		_curElem=null;
		_curLastElem=null;
		_curNextElem=null;

	});
	var _moveVBar=function(){

	};
	var _moveHBar=function(){

	};
};
window.onload=function (argument) {
	// body...
	layoutUI();
}