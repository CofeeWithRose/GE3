(function (w) {
    var _dx,_dy,_scale,_rescale;
    var canvas,context;
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
        _rescale = 1/_scale;
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
    var clear = function(){
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
        marPoint(st, 3,linecloor);
        marPoint({ x: st.x + 0.05 / vl * v.x, y: st.y + 0.05 / vl * v.y },2,linecloor);
    };
    var UI = {
        init:init,
        getDist:getDist,
        clear:  clear,
        marPoint:marPoint,
        srcToCanvasPoint: fixPosition,
        canvasToSrcPoint: reFixPosition,
        lineDirect:lineDirect

    }
    if (w.UI) {
        w._UI = UI;
    } else {
        w.UI = UI;
    }
})(window);