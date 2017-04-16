var lastHitMap={};
onmessage=function hitTest(e) {

	var result={};
	result.hit=[];
	result.leave=[];
	var hiters=e.data.hiter;
	var borders=e.data.border;
	for (var i = hiters.length - 1; i >= 0; i--) {
		var hit=hiters[i];
		hit.x=hit.position.x+hit.transPosition.x;
		hit.y=hit.position.y+hit.transPosition.y;
		hit.w=hit.size.w;
		hit.h=hit.size.h;
		for (var j = borders.length - 1; j >= 0; j--) {
			var border=borders[j];
			border.x=border.position.x+border.transPosition.x;
			border.y=border.position.y+border.transPosition.y;
			border.w=border.size.w;
			border.h=border.size.h;

			var hitL=hit.x;
			var hitR=hit.x+hit.w;
			var hitB=hit.y+hit.h;
			var hitT=hit.y;

			var borderL=border.x;
			var borderR=border.x+border.w;
			var borderB=border.y+border.h;
			var borderT=border.y;
              
            var conditX=hitL<borderR&&hitR>borderL;
            var conditY=hitB>borderT&&hitT<borderB;
            
            var hitParentId=hit.id+"-"+border.id;

			if (conditX&&conditY) {
                
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