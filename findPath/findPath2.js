/**
 * 基于Dijkstra算法的递归寻路方案.
 * 
 * 功能简述：
 *     
 *     使用两两相连的点表示互通区域，例：正方形区域，顶角为A、B、C、D四个点，使用6个线段A-B,A-C,A-D,B-C,B-D,C-D，表示一张地图.
 *     
 *     给出任一点X与指定点假设B，若点X在ABCD构成的地图中，则可找出最近点X-A,A-B.若点X不在正方形区域，则抛出“is not in area”异常.
 *     
 *     
 */


var globleID = 0;
/**
* 二维空间坐标。
* @param  x  x 轴坐标
* @param  y  y 轴坐标 
*/
var Vectort2 = function Vectort2(x, y) {
    this.x = x;
    this.y = y;
    this.id = globleID++;
};


/**
 * 三角形,因使用 y=kx+b 表示各边直线.暂时只支持二位空间点.
 * @param  pointA 点A
 * @param  pointB 点B
 * @param  pointC 点C
 */
var Trangle = function Trangle(pointA, pointB, pointC) {
    this.pointA = pointA;
    this.pointB = pointB;
    this.pointC = pointC;
    this.kca = (pointA.y - pointC.y) / (pointA.x - pointC.x);
    this.kcb = (pointB.y - pointC.y) / (pointB.x - pointC.x);
    this.kab = (pointB.y - pointA.y) / (pointB.x - pointA.x);
    this.bca = pointC.y - this.kca * pointC.x;
    this.bcb = pointC.y - this.kcb * pointC.y;
    this.bab = pointA.y - this.kab * pointA.y;
};
/**
 * 判断二维点是否在三角形内，只支持二维空间点.
 * @param  point  任一点.
 */
Trangle.prototype.isPointIn = function isPointIn(point) {
    var xArray = [this.pointA.x, this.pointB.x, this.pointC.x];
    xArray = xArray.sort();
    if (point.x < xArray[0] || point.x > xArray[2]) {
        return false;
    }

    if (point.equalse(this.pointA) || point.equalse(this.pointB) || point.equalse(this.pointC)) {
        return true;
    }
    var yValues = [];
    yValues.push(this.kab * point.x + this.bab);

    yValues.push(this.kcb * point.x + this.bcb);
    yValues.push(this.kca * point.x + this.bca);

    var times = 0;
    for (var i = yValues.length - 1; i >= 0; i--) {
        if (yValues[i] < point.y) {
            times++;
        }
    }

    return times % 2 == 1;
};



/**
 * a=>b单向线段.由两个点组成，描述了地图中所有点的联通情况.
 * @param  nodeA a点
 * @param  nodeB b点
 * @param  dist  a点与b点距离
 * @param  isDynamic 是否为动态的点
 */
var Segment = function Segment(nodeA, nodeB, isDynamic, dist) {
    this.isDynamic = isDynamic;
    if (nodeB instanceof Vectort2 && nodeA instanceof Vectort2) {
        // this.nodeAName = nodeA.getName();
        // this.nodeBName = nodeB.getName();
        this.nodeA = nodeA;
        this.nodeB = nodeB;
        var dx = nodeA.x - nodeB.x;
        var dy = nodeA.y - nodeB.y;
        this.dist = Math.pow(dx * dx + dy * dy, 1 / 2);
    } else if (nodeA instanceof Vectort3 && nodeB instanceof Vectort3) {
        // this.nodeAName = nodeA.getName();
        // this.nodeBName = nodeB.getName();
        this.nodeA = nodeA;
        this.nodeB = nodeB;
        var dx = nodeB.x - nodeA.x;
        var dy = nodeB.y - nodeA.y;
        var dz = nodeB.z - nodeB.z;
        this.dist = Math.pow(dx * dx + dy * dy + dz * dz, 1 / 3);
    } else {
        this.nodeAName = nodeA;
        this.nodeBName = nodeB;
        this.dist = dist;
        this.isDynamic = false;
    }
};
/**
 * 获取两点之间的距离.暂时只支持2D.
 */
Segment.prototype.getDist = function () {
    if (!this.isDynamic) {
        this.getDist = function () {
            return this.dist;
        }
        return this.dist;
    } else {
        this.getDist = function () {
            return Math.pow(dx * dx + dy * dy, 1 / 2);
        }
        return Math.pow(dx * dx + dy * dy, 1 / 2);
    }
}



/**
 * 地图.
 */
var MapData = function (obj) {

    this.SPLIT_SYMBOL = "|";
    this.MAX = Infinity;
    this.nodeToRelatedMap = {};
    this.segmentMap = {};

}
MapData.prototype.getNodes = function (node) {
    return this.nodeToRelatedMap[node];
}
MapData.prototype.getDist = function (nodeA, nodeB) {
    var segment = this.segmentMap[nodeA.id + this.SPLIT_SYMBOL + nodeB.id];
    if (segment) {
        return segment.getDist();
    } else {
        return this.MAX;
    }
}
/**
 * 
 * @param  segment  添加线段到地图.
 */
MapData.prototype.add = function (segment) {
    var list = this.nodeToRelatedMap[segment.nodeA];
    if (list) {
        list.push(segment.nodeB);
    } else {
        list = [segment.nodeB];
        this.nodeToRelatedMap[segment.nodeA] = list;
    }
    this.segmentMap[segment.nodeA.id + this.SPLIT_SYMBOL + segment.nodeB.id] = segment;
    this.segmentMap[segment.nodeB.id + this.SPLIT_SYMBOL + segment.nodeA.id] = segment;
}




/**
 * 点与点构成的路径树.
 * @param  node 当前点.
 * @param  rootTree 起始点.
 */
var NodeTree = function (node, rootTree) {
    //当前点.
    this.node = node;
    //地图.
    this.mapData = rootTree.mapData;
    //根节点.
    this.rootTree = rootTree;

    //当前点距根节点的距离.
    this.toRootNodeDist = 0;
    //父节点.
    this.parentTree;
    //子节点.
    this.childrenTree = [];
}
NodeTree.prototype.appendTree = function () {

    var nodeList = this.mapData.getNodes(this.node);
    for (var i = nodeList.length - 1; i >= 0; i--) {
        var nextTree = new NodeTree(nodeList[i], this.rootTree);
        if (this._addTree(nextTree)) {
            nextTree.appendTree();
        }
    }
};
/**
 * 添加节点，若树中已存在更短的节点，不再添加，返回false.
 * @param  nextTree 
 */
NodeTree.prototype._addTree = function (nextTree) {

    if (!nextTree.node) {
        throw "Error";
    }
    var lastDist = this.rootTree.getDistToPoint(nextTree.node);
    var curDist = this.toRootNodeDist + this.mapData.getDist(this.node, nextTree.node);

    if (isNaN(lastDist) || lastDist > curDist) {

        nextTree.toRootNodeDist = curDist;
        nextTree.parentTree = this;
        this.childrenTree.push(nextTree);

        this.rootTree.addTree(nextTree);
        return true;
    }
}

var RootNodeTree = function (node, mapData) {

    this.mapData = mapData;
    NodeTree.apply(this, [node, this]);
    this.nodeDistMap = {};
    this.endTrees = [];
    this.endNodes = [];
}
RootNodeTree.prototype = NodeTree.prototype;

//通过node获取到根节点的距离.
RootNodeTree.prototype.getDistToPoint = function (node) {
    return this.nodeDistMap[node.id];
}
//通过node获取到根节点的距离.
RootNodeTree.prototype._setDistToPoint = function (nodeTree) {
    this.nodeDistMap[nodeTree.node.id] = nodeTree.toRootNodeDist;
}
//处理末端Tree.
RootNodeTree.prototype._addEndNode = function (nodeTree) {

    var ind = this.endNodes.indexOf(nodeTree.node);
    if (-1 === ind) {
        this.endNodes.push(nodeTree.node);
        this.endTrees.push(nodeTree);
    } else {
        this.endTrees[ind] = nodeTree;
    }
}
//通过node获取到根节点的距离.
RootNodeTree.prototype.addTree = function (nodeTree) {
    this._setDistToPoint(nodeTree);
    this._addEndNode(nodeTree);
}
//通过node获取到根节点的距离.
RootNodeTree.prototype._getMinTree = function () {
    if (this.endTrees.length === 0) {
        throw "no path found.";
    }
    var result = this.endTrees[0];
    for (var i = this.endTrees.length - 1; i >= 0; i--) {
        var now = this.endTrees[i]
        if (now.toRootNodeDist < result.toRootNodeDist) {
            result = now;
        }
    }
    return result;
}
RootNodeTree.prototype._loadParent = function (nodeTree, array) {
    if (nodeTree) {
        array.unshift(nodeTree.node);
        this._loadParent(nodeTree.parentTree, array);
    }
}
RootNodeTree.prototype.getMinPathNodes = function () {
    var result = [];
    this._loadParent(this._getMinTree(), result);
    return result;
}



//点与点。
/**
 * 1.找与点相通的点,累加与根目录的距离.
 * 2.判断点是否到过且最短.
 * 3.找下一个点.
 */

var map = new MapData();

var pointA = new Vectort2(1, 0);
var pointB = new Vectort2(2, 0);
var pointC = new Vectort2(1, 2);
var pointD = new Vectort2(2, 2);
var pointE = new Vectort2(0, 2);
var pointF = new Vectort2(0, 3);
var pointG = new Vectort2(3, 3);
var pointH = new Vectort2(3, 2);
var list = [pointA, pointB, pointC, pointD, pointE, pointF, pointG, pointH];
for (var i = 0; i < list.length - 1; i++) {
    for (var j = i + 1; j < list.length; j++) {
        map.add(new Segment(list[i], list[j]));
        map.add(new Segment(list[j], list[i]));
    }
}



var root = new RootNodeTree(pointA, map);
root.appendTree();
var nodes = root.getMinPathNodes();
console.log(root);