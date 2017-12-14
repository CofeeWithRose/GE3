(function (w) {

    var inputs = document.querySelectorAll("input");
    var stInput = inputs[0];
    var endInput = inputs[1];
    var st = 0;
    var end = 7;
    var lastSt;
    var lastEnd;
    //编辑状态.
    const EDITE_STATE = {
        movePoint: 'move-point',
        SelectPoint: 'select-point',
        removePoint: 'remove-point',
        concatPoint: 'concat-point',
        cutLine: 'cut-line'
    };
    //编辑状态.
    var editeState = EDITE_STATE.move;

    var mousePoint = { x: 0, y: 0 };
    var selectedPoint;
    var nodeList;
    var rePaint;
    var render;

    /**
     * 
     * @param operOrg
     * {
     *    nodeList:被绘制的点.
     *    rePaint: 绘制canvas的函数.
     * }  
     */
    function init(operOrg) {
        nodeList = operOrg.nodeList;
        rePaint = operOrg.rePaint;
        render = operOrg.render;
    };

    //初始化拖拽 Point.
    var startDragPoint = function (e) {

        mousePoint.x = e.offsetX;
        mousePoint.y = e.offsetY;
        mousePoint = render.canvasToSrcPoint(mousePoint);

        for (let index = 0; index < nodeList.length; index++) {
            const p = nodeList[index];
            // console.log(render.getDist(p, mousePoint));
            if (render.getDist(p, mousePoint) < 0.1) {
                selectedPoint = p;
                // console.log(index + " clicked ...");
                return;
            }
        }
    };
    //拖拽 Point.
    var dragPoint = (e) => {

        if (selectedPoint) {

            mousePoint.x = e.offsetX;
            mousePoint.y = e.offsetY;
            mousePoint = render.canvasToSrcPoint(mousePoint);
            selectedPoint.x = mousePoint.x;
            selectedPoint.y = mousePoint.y;
            rePaint();
            // console.log(mousePoint);
        }
    };
    //结束拖拽 Point.
    let endDragPoint = () => {
        if (selectedPoint) {
            selectedPoint = undefined;
            rePaint();
        }
    };
    let startSelect = () => {

    };
    let endSelect = () => {

    };
    let select = () => {

    }
    //添加节点.
    function addPoint() {
        var p = new PD.Vectort2(1, 1, true);
        nodeList.push(p);
        render.marPoint(p, 10);
    }

    //改变节点的起始输入.
    function changeNode() {
        st = stInput.value || lastSt;
        end = endInput.value || lastEnd;
        rePaint();
        //记录上次输入的点.
        lastSt = st;
        lastEnd = end;
    };
    //改变编辑状态.
    var changeState = (state) => {
        OP.endDrag();

        if (state === EDITE_STATE.movePoint) {
            OP.startDrag = startDragPoint;
            OP.drag = dragPoint;
            OP.endDrag = endDragPoint;
        } else if (state === EDITE_STATE.SelectPoint) {
            OP.startDrag = startSelect;
            OP.drag = select;
            OP.endDrag = endSelect;
        }
        console.log(state);
    };

    var OP = {
        init: init,
        changeState: changeState,
        st: st,
        end: end,
        startDrag: startDragPoint,
        endDrag: endDragPoint,
        drag: dragPoint
    }

    if (w.OP) {
        w._OP = OP;
    } else {
        w.OP = OP;
    }
})(window)