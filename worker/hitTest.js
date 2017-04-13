onmessage=function hitTest(e) {

	var result={};
	var hitResList=[];
	var borderResList=[];

	var hiters=e.data.hiter;
	var borders=e.data.boder;
	for (var i = hiters.length - 1; i >= 0; i--) {
		var hit=hiters[i];
		for (var i = borders.length - 1; i >= 0; i--) {
			var border=borders[i];

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
				hit.borderId=border.border.id;
				border.hitId=hit.id;
                hitResList.push(hit);
                borderResList.push(border);
			}
		}
	}

    result.hit=hitResList;
    result.border=borderResList;

	postMessage(result);
}