onmessage=function hitTest(e) {

	var result=[];
	
	var hiters=e.data.hiter;
	var borders=e.data.boder;
	for (var i = hiters.length - 1; i >= 0; i--) {
		var hit=hiters[i];
		hit.x=hit.position.x+hit.transPosition.x;
		hit.y=hit.position.y+hit.transPosition.y;
		hit.w=hit.size.w;
		hit.h=hit.size.h;
		for (var i = borders.length - 1; i >= 0; i--) {
			var border=borders[i];
			border.x=border.position.x+border.transPosition.x;
			border.y=border.position.y+border.transPosition.y;
			border.w=border.size.w;
			border.h=border.size.h;

			var hiterL=hit.x;
			var hiterR=hit.x+hit.w;
			var hitB=hit.y+hit.h;
			var hitT=hit.y;

			var borderL=border.x;
			var borderR=border.x+border.w;
			var borderB=border.y+border.h;
			var borderT=border.y;
              
            var conditA=hitL<borderR&&hitR>borderL;
            var conditB=hitB<borderT&&hitT>borderB;

			if (conditB&&conditA) {
				hit.hitId=border.border.id;
				border.hitId=hit.id;

                var resuObj={hiter:hit,border:border};
                result.push(resuObj);
			}
		}
	}

	postMessage(result);
}