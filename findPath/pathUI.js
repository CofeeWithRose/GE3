//初始化绘图参数.
UI.init({
    dx: 220,
    dy: 100,
    scale: 90,
    canvas: document.querySelector("#canvas"),
    width: 800,
    height: window.innerHeight - 100
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

    //获取、绘制最短路径（红色）.
    var nodes = PD.findPath(list[OP.st], list[OP.end], map);
    for (var i = 0; i < nodes.length - 1; i++) {
        UI.lineDirect(nodes[i], nodes[i + 1], "red", 2);
    }
    // 绘制节点（灰色）.
    for (var i = 0; i < list.length; i++) {
        UI.marPoint(list[i], 10);
    }
};
OP.init({
    nodeList: list,
    rePaint: drawCanvas,
    render: UI
});
drawCanvas();




