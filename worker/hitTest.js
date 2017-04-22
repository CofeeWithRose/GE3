var lastHitMap={};
onmessage=function hitTest(e) {

	var result={};
	result.hit=[];
	result.leave=[];
	var hiters=e.data.hiter;
	var borders=e.data.border;
	var s=e.data.screen;
	filterBorder(hiters,s);
	filterBorder(borders,s);

	for (var i = hiters.length - 1; i >= 0; i--) {
		var hit=hiters[i];

		for (var j = borders.length - 1; j >= 0; j--) {
			var border=borders[j];

            var hitParentId=hit.id+"-"+border.id;

			if (isAtouchB(hit,border)) {
                
				if (!lastHitMap[hitParentId]) {
					hit.hitId=border.id;
					border.hitId=hit.id;
                	var resuObj={hiter:hit,border:border};
               		result.hit.push(resuObj);
               		lastHitMap[hitParentId]=1;
				}

			}else if(lastHitMap[hitParentId]){

				hit.hitId=border.id;
				hit.hitId=border.id;
				border.hitId=hit.id;
            	var resuObj={hiter:hit,border:border};
            	result.leave.push(resuObj);
           		lastHitMap[hitParentId]=0;
               
			}
		}
	}

	postMessage(result);
}

var isAtouchB=function(A,B){

	if ((A.x<B.x+B.w&&A.x+A.w>B.x)&&(A.y+A.h>B.y&&A.y<B.y+B.h)) {
		return true;
	}else{
		return false;
	}
}

var filterBorder=function(list,s,x){
	var f=0;	
	for (var i = list.length - 1; i >= 0; i--) {
		f++;
		var border=list[i];
		border.x=border.position.x+border.transPosition.x;
		border.y=border.position.y+border.transPosition.y;
		border.w=border.size.w;
		border.h=border.size.h;
		if (!isAtouchB(s,border)) {
			list.splice(list.indexOf(border),1);
		}
	}
	
}