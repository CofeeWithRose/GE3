var inputs = document.querySelectorAll("input");
var stInput = inputs[0];
var endInput = inputs[1];
var st = 0;
var end = 7;
var lastSt;
var lastEnd;
//编辑状态.
const EDITE_STATE={
    move:'move',
    Select:'select',
    remove: 'remove',
    concat: 'concat',
    cut:'cut'
}
//编辑状态.
var editeState = EDITE_STATE.move;


//初始化绘图参数.
UI.init({
    dx:220,
    dy:150,
    scale:100,
    canvas: document.querySelector("#canvas"),
    width:1000,
    height:800
});
//构造地图.A-H点，两两相连，默认为静态点.
var map = new PD.MapData();
var pointA = new PD.Vectort2(0.38, -0.62, true);
var pointB = new PD.Vectort2(2.66, -0.49, true);
var pointC = new PD.Vectort2(4.09, 1.09, true);
var pointD = new PD.Vectort2(3.93, 3.12, true);
var pointE = new PD.Vectort2(3.58, 4.61, true);
var pointF = new PD.Vectort2(0.88, 4.75, true);
var pointG = new PD.Vectort2(-0.96, 3.32, true);
var pointH = new PD.Vectort2(-0.92, 0.13, true);
var list = [pointA, pointB, pointC, pointD, pointE, pointF, pointG, pointH];
for (var i = 0; i < list.length - 1; i++) {
    for (var j = i + 1; j < list.length; j++) {
        //双向互通
        map.add(new PD.Segment(list[i], list[j]));
        map.add(new PD.Segment(list[j], list[i]));
    }
}
map.remove(new PD.Segment(list[0], list[7]));

function drawCanvas() {
   
    //准备重绘.
    UI.clear();
     //绘制地图所有相连线段.
     for (var key in map.segmentMap) {
        var s = map.segmentMap[key];
        UI.lineDirect(s.nodeA, s.nodeB, 'gray');
    }
    // 绘制节点（灰色）.
    for (var i = 0; i < list.length; i++) {
        UI.marPoint(list[i], 10);
    }
    //获取、绘制最短路径（红色）.
    var nodes = PD.findPath(list[st], list[end], map);
    for (var i = 0; i < nodes.length - 1; i++) {
        UI.lineDirect(nodes[i], nodes[i + 1], "red", 2);
    }
};
drawCanvas();


function changeNode(){
    st = stInput.value || lastSt;
    end = endInput.value || lastEnd;
    drawCanvas();
    //记录上次输入的点.
    lastSt = st;
    lastEnd = end;
};

var mousePoint = { x: 0, y: 0 };
var selectedPoint;

//初始化拖拽.
function startDrag(e) {

    mousePoint.x = e.offsetX;
    mousePoint.y = e.offsetY;
    mousePoint = UI.canvasToSrcPoint(mousePoint);

    for (let index = 0; index < list.length; index++) {
        const p = list[index];
        // console.log(UI.getDist(p, mousePoint));
        if (UI.getDist(p, mousePoint) < 0.1) {
            selectedPoint = p;
            // console.log(index + " clicked ...");
            return;
        }
    }
};
//结束拖拽.
function endDrag() {
    if (selectedPoint) {
        selectedPoint = undefined;
        drawCanvas();
    }
};
//拖拽节点.
function drag(e) {

    if (selectedPoint) {

        mousePoint.x = e.offsetX;
        mousePoint.y = e.offsetY;
        mousePoint = UI.canvasToSrcPoint(mousePoint);
        selectedPoint.x = mousePoint.x;
        selectedPoint.y = mousePoint.y;
        drawCanvas();
        // console.log(mousePoint);
    }
};

function addPoint(){
    var p = new PD.Vectort2(1,1, true);
    list.push(p);
    UI.marPoint(p, 10);
}