var inputs = document.querySelectorAll("input");
var stInput = inputs[0];
var endInput = inputs[1];
var lastSt;
var lastEnd;

var canvas = document.getElementById("canvas");
canvas.width = 600;
canvas.height = 600;
var context = canvas.getContext("2d");
//是否勾选连接线段状态.
var isLineState = false;

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
    for (var j = i + 1; j < list.length - 1; j++) {
        //双向互通
        map.add(new PD.Segment(list[i], list[j]));
        map.add(new PD.Segment(list[j], list[i]));
    }
}
map.add(new PD.Segment(list[5], list[7]));
map.add(new PD.Segment(list[7], list[1]));
map.add(new PD.Segment(list[6], list[7]));



//绘图.
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
function fixPosition(node) {
    return { x: 150 + node.x * 100, y: 100 + 100 * node.y };
};
function reFixPosition(node) {
    return { x: (-150 + node.x) * 0.01, y: (-100 + node.y) * 0.01 };
}

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

    var v = { x: nodeB.x - nodeA.x, y: nodeB.y - nodeA.y };
    var vl = Math.sqrt(v.y * v.y + v.x * v.x);
    var st = { x: nodeA.x + v.x * 0.5, y: nodeA.y + v.y * 0.5 };
    marPoint(st, 3);
    marPoint({ x: st.x + 0.05 / vl * v.x, y: st.y + 0.05 / vl * v.y }, 1);
};

function drawCanvas() {
    var st = stInput.value || lastSt;
    var end = endInput.value || lastEnd;
    context.clearRect(0, 0, 600, 600);
    //使用PD获取路径最短.
    var nodes = PD.findPath(list[st], list[end], map);
    //绘制地图所有相连线段.
    for (var key in map.segmentMap) {
        var s = map.segmentMap[key];
        linePoint(s.nodeA, s.nodeB, 'gray');
    }
    // 绘制节点（灰色）.
    for (var i = 0; i < list.length; i++) {
        marPoint(list[i], 10);
    }
    //绘制最短路径（红色）.
    for (var i = 0; i < nodes.length - 1; i++) {
        linePoint(nodes[i], nodes[i + 1], "red", 2);
    }
    //记录上次输入的点.
    lastSt = st;
    lastEnd = end;
};
drawCanvas();

function getDist(p1, p2) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    return Math.sqrt(dx * dx + dy * dy);
};
var mousePoint = { x: 0, y: 0 };
var selectedPoint;
//初始化拖拽.
function startDrag(e) {

    mousePoint.x = e.offsetX;
    mousePoint.y = e.offsetY;
    mousePoint = reFixPosition(mousePoint);

    for (let index = 0; index < list.length; index++) {
        const p = list[index];
        // console.log(getDist(p, mousePoint));
        if (getDist(p, mousePoint) < 0.1) {
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
        mousePoint = reFixPosition(mousePoint);
        selectedPoint.x = mousePoint.x;
        selectedPoint.y = mousePoint.y;
        drawCanvas();
        // console.log(mousePoint);
    }
};

function addPoint(){
    var p = new PD.Vectort2(1,1, true);
    list.push(p);
    marPoint(p, 10);
}