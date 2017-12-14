(function (w) {
    var _dx, _dy, _scale, _rescale;
    let canvas, context;
    //初始化参数.
    /**
     * 
     * @param renderOrg 
     * {
     *   dx:Number 原始点的X偏移量.
     *   dy:Number 原始点的y偏移量.
     *   scale:Number 原始点坐标缩放量.
     *   canvas:canvas 被绘制的画布.
     *   width:Number 画布的宽度.
     *   height:Number 画布的高度.
     * 
     * } 
     */
    var init = function (renderOrg) {
        _dx = renderOrg.dx;
        _dy = renderOrg.dy;
        _scale = renderOrg.scale;
        _rescale = 1 / _scale;
        canvas = renderOrg.canvas;
        canvas.width = renderOrg.width;
        canvas.height = renderOrg.height;
        context = canvas.getContext('2d');
    };
    function getDist(p1, p2) {
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        return Math.sqrt(dx * dx + dy * dy);
    };

    //刷新.
    var clear = function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
    };
    //绘点.
    function marPoint(node, R, color) {
        context.beginPath();
        var n = fixPosition(node);
        context.arc(n.x, n.y, R, 0, 2 * Math.PI, true);
        context.fillStyle = color || "gray";
        context.fill();
        if (!isNaN(node.id)) {
            context.fillStyle = "blue";
            context.font = "20px Georgia";
            context.fillText(node.id, n.x - 20, n.y - 20);
        }
        // context.stroke();
        context.closePath();
    };
    //将原始坐标转为cnavas上的坐标.
    function fixPosition(node) {
        return { x: _dx + node.x * _scale, y: _dy + _scale * node.y };
    };
    //将canvas坐标转为原始的坐标.
    function reFixPosition(node) {
        return { x: (node.x - _dx) * _rescale, y: (node.y - _dy) * _rescale };
    }
    let rotatePoint = (centerP, p, thita) => {
        let dist = getDist(centerP, p);
        let thita0 = Math.atan2(p.y - centerP.y, p.x - centerP.x);
        thita += thita0 - Math.PI * 0.5;
        return { x: centerP.x + Math.cos(thita) * dist, y: centerP.y + Math.sin(thita) * dist };
    };
    /**
     * 
     * @param {x:Number,y:Number} bottomMiddlePoint 
     * @param {Math.PI=180} thita 
     */
    var drawTrangle = (bottomMiddlePoint, thita, color) => {
        let h = 12;
        let w = 3;
        let p0 = fixPosition(bottomMiddlePoint);
        let p1 = { x: p0.x, y: p0.y + h };
        let p2 = { x: p0.x + w, y: p0.y };
        let p3 = { x: p0.x - w, y: p0.y };
        p1 = rotatePoint(p0, p1, thita);
        p2 = rotatePoint(p0, p2, thita);
        p3 = rotatePoint(p0, p3, thita);
        // console.log("p1: "+parseInt(p1.x)+","+parseInt(p1.y));
        // console.log("p2: "+parseInt(p2.x)+","+parseInt(p2.y));
        // console.log("p3: "+parseInt(p3.x)+","+parseInt(p3.y));
        context.beginPath();
        context.fillStyle = color || "black";
        // context.lineWidth = width || 1;

        context.moveTo(p1.x, p1.y);
        context.lineTo(p2.x, p2.y);
        context.lineTo(p3.x, p3.y);
        // context.moveTo(75,50);
        // context.lineTo(100,75);
        // context.lineTo(100,25);
        context.fill();
        context.closePath();
    };

    //连线.
    function linePoint(nodeA, nodeB, linecloor, width) {
        context.beginPath();
        context.strokeStyle = linecloor || "black";
        context.lineWidth = width || 1;
        var a = fixPosition(nodeA);
        var b = fixPosition(nodeB);
        context.moveTo(a.x, a.y);
        context.lineTo(b.x, b.y);
        context.stroke();
        context.closePath();
    };


    //连有向线段.
    function lineDirect(nodeA, nodeB, linecloor, width) {
        linePoint(nodeA, nodeB, linecloor, width);
        var v = { x: nodeB.x - nodeA.x, y: nodeB.y - nodeA.y };
        var vl = Math.sqrt(v.y * v.y + v.x * v.x);
        var st = { x: nodeA.x + v.x * 0.5, y: nodeA.y + v.y * 0.5 };
        // marPoint(st, 3, linecloor);
        // marPoint({ x: st.x + 0.05 / vl * v.x, y: st.y + 0.05 / vl * v.y }, 2, linecloor);
        drawTrangle(st, Math.atan2(v.y, v.x), linecloor);
    };

    var drawRectBorder = (startPoint, endPoint, color, width) => {
        context.beginPath();
        context.strokeStyle = linecloor || "black";
        context.lineWidth = width || 1;
        var a = fixPosition(startPoint);
        var b = fixPosition(endPoint);

        context.stroke();
        context.closePath();
    };
    var UI = {
        context, context,
        init: init,
        getDist: getDist,
        clear: clear,
        marPoint: marPoint,
        srcToCanvasPoint: fixPosition,
        canvasToSrcPoint: reFixPosition,
        lineDirect: lineDirect

    }
    if (w.UI) {
        w._UI = UI;
    } else {
        w.UI = UI;
    }
})(window);