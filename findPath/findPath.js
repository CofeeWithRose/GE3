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


/**
 * 二维空间坐标。
 * @param  x  x 轴坐标
 * @param  y  y 轴坐标 
 */
var Vectort2 = function Vectort2(x, y) {
	this.x = x;
	this.y = y;
};

Vectort2.prototype.getName = function () {
	return "x" + this.x + "y" + this.y;
};
Vectort2.prototype.toString = Vectort2.prototype.getName;

Vectort2.prototype.equalse = function (other) {
	return other && other.x === this.x && other.y === this.y;
};

// //因为Trangle的算法问题，暂时只支持二维空间的点.
// /**
//  * 三维空间坐标.
//  * @param { x轴坐标} x 
//  * @param { y轴坐标} y 
//  * @param { z轴坐标} z 
//  */
// var Vectort3 = function Vectort3(x, y, z) {
// 	this.x = x;
// 	this.y = y;
// 	this.z = z;
// };
// Vectort3.prototype.getName = function () {
// 	return "x" + this.x + "y" + this.y + "z" + this.z;
// };

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
 * @param { 任一点 } point 
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
 * 线段.由两个点组成，描述了地图中所有点的联通情况.
 * @param  nodeA a点
 * @param  nodeB b点
 * @param  dist  a点与b点距离
 * @param  isOneway bool值，是否为单向连线，默认为双向互通.
 */
var Segment = function Segment(nodeA, nodeB, dist, isOneway) {

	if (nodeB instanceof Vectort2 && nodeA instanceof Vectort2) {
		this.nodeAName = nodeA.getName();
		this.nodeBName = nodeB.getName();
		this.pointA = nodeA;
		this.pointB = nodeB;
		var dx = nodeA.x - nodeB.x;
		var dy = nodeA.y - nodeB.y;
		this.dist = Math.pow(dx * dx + dy * dy, 1 / 2);
	} else if (nodeA instanceof Vectort3 && nodeB instanceof Vectort3) {
		this.nodeAName = nodeA.getName();
		this.nodeBName = nodeB.getName();
		this.pointA = nodeA;
		this.pointB = nodeB;
		var dx = nodeB.x - nodeA.x;
		var dy = nodeB.y - nodeA.y;
		var dz = nodeB.z - nodeB.z;
		this.dist = Math.pow(dx * dx + dy * dy + dz * dz, 1 / 3);
	} else {
		this.nodeAName = nodeA;
		this.nodeBName = nodeB;
		this.dist = dist;
	}
	this.isOneway = isOneway;
};
/**
 * 由某一点到达各个点的所有路径构造的树.
 * @param  nodeName 当前点的名称.
 * @param mapData 路径所在的地图.
 * @param rootNode 起始点
 */
var SegmentTree = function SegmentTree(node, mapData) {

	//当前点.
	this.node = node;
	//与当前点相连的点.
	this.children = [];
	this.parent;
	//与起始点相连的点.
	this.toRootDist = 0;
	//与各个点连接的最短距离.
	this.minDistMap = {};
	this.minDistMap[nodeName] = 0;
	//MapData.
	this.mapData = mapData;
};
SegmentTree.prototype.add = function (segmentTree) {
	segmentTree.parent = this;
	segmentTree.minDistMap = this.minDistMap;
	segmentTree.toRootDist = this.toRootDist + this.mapData.get(this.nodeName, segmentTree.nodeName).dist;
	var minDist = this.minDistMap[segmentTree.nodeName];
	if ("number" === (typeof minDist) && minDist <= segmentTree.toRootDist) {

		return false;
	} else {
		this.children.push(segmentTree);
		this.minDistMap[segmentTree.nodeName] = segmentTree.toRootDist;
		return true;
	}
};
SegmentTree.prototype._getName = function (name, tree) {
	name = tree.nodeName + "|" + name;
	if (tree.parent) {
		return this._getName(name, tree.parent);
	} else {
		return name;
	}
};
SegmentTree.prototype.getName = function () {
	var name = "";
	name = this._getName(name, this);
	return name;
};
SegmentTree.prototype._getPath = function getPath(tree, segmentArray, map) {
	if (tree.parent) {
		segmentArray.unshift(map.get(tree.nodeName, tree.parent.nodeName));
		this._getPath(tree.parent, segmentArray, map);
	}

};
SegmentTree.prototype.getPathPointList = function () {
	var array = [];
	this._getPath(this, array, this.mapData);
	var pointArray = [];
	array.forEach(segment => {
	});
	console.log(this.nodeName);
	return array;
};

/**
 * 地图信息.
 * 点构成的数组，数组中的点将两两相连，构成地图路径.
 * @param obj 
 * 1：obj为由点构成的数组，则会将所有点两两相连，构成地图. 
 * 2: obj为MapData，则copy一份作为副本.
 * 3: obj为undefined，则创建一个空地图.
 */
var MapData = function MapData(obj) {

	//地图中的所有线段.
	this.segmets = [];
	//线段的索引，如单向线段A-B,key为A|B，若为双向（默认），则添加两个索引A|B,B|A.
	this.segmetsMap = {};
	//地图区域点的名字.
	this.nodeNameList = [];
	//地图区域的三角形.
	this.trangleList = [];
	//索引的分隔符.
	this.SPLIT_SYMBOL = "|";

	if (obj instanceof Array) {
		for (var i = obj.length - 1; i >= 1; i--) {

			for (var j = i - 1; j >= 0; j--) {
				this.add(new Segment(obj[i], obj[j], 1 + Number.parseInt(10 * Math.random())));
			}
		}
	};
	if (obj instanceof MapData) {
		//Copy of MapData.
		for (var i = obj.segmets.length - 1; i >= 0; i--) {
			this.segmets.push(obj.segmets[i]);
		}
		for (var k in obj.segmetsMap) {
			this.segmetsMap[k] = obj.segmetsMap[k];
		}
		for (var i = obj.nodeNameList.length - 1; i >= 0; i--) {
			this.nodeNameList.push(obj.nodeNameList[i]);
		}
		for (var i = obj.trangleList.length - 1; i >= 0; i--) {
			this.trangleList.push(obj.trangleList[i]);
		}
	}
};
/**
 * 添加新加入的线段与地图新构成的三角形.
 * @param  segmet 添加入mapData的线段.
 */
MapData.prototype._processTrangle = function (segmet) {
	if (segmet.pointA && segmet.pointB) {

		this._addTrangle(segmet);

		if (this.nodeNameList.indexOf(segmet.pointA) == -1) {
			this.nodeNameList.push(segmet.pointA);
		}
		if (this.nodeNameList.indexOf(segmet.pointB) == -1) {
			this.nodeNameList.push(segmet.pointB);
		}
	}

};
MapData.prototype._addTrangle = function (segmet) {
	for (var i = this.nodeNameList.length - 1; i >= 0; i--) {
		var nodeName = this.nodeNameList[i].getName();
		var keyA = nodeName + this.SPLIT_SYMBOL + segmet.nodeAName;
		var keyB = nodeName + this.SPLIT_SYMBOL + segmet.nodeBName;
		if (this.segmetsMap[keyB] && this.segmetsMap[keyA]) {

			var trangle = new Trangle(segmet.pointA, segmet.pointB, this.nodeNameList[i]);
			this.trangleList.push(trangle);
		}
	}
};
/**
 * 在原有的map基础上，添加新的点，将新的点与周围的点连接，构建出新的地图.
 * @param {新的点A} pointA 
 * @param {新的点B} pointB 
 */
MapData.prototype._getTemExtMap = function (pointA, pointB) {
	var map = new MapData(this);
	var isAIn = 0;
	var isBIn = 0;
	for (var i = map.trangleList.length - 1; i >= 0; i--) {
		var trangle = map.trangleList[i];
		if (trangle.isPointIn(pointA)) {
			map.add(new Segment(pointA, trangle.pointA));
			map.add(new Segment(pointA, trangle.pointB));
			map.add(new Segment(pointA, trangle.pointC));
			isAIn++;
		}
	};
	for (var i = map.trangleList.length - 1; i >= 0; i--) {
		var trangle = map.trangleList[i];
		if (trangle.isPointIn(pointB)) {

			map.add(new Segment(pointB, trangle.pointA));
			map.add(new Segment(pointB, trangle.pointB));
			map.add(new Segment(pointB, trangle.pointC));
			isBIn++;
		}
	};
	if (!isAIn) {
		throw pointA + " is not in area Error .";
	}
	if (!isBIn) {
		throw pointB + " is not in area Error .";
	}
	return map;
};
MapData.prototype.anyPointMinPath = function (pointA, pointB) {

	return this._getTemExtMap(pointA, pointB).findMinPath(pointA, pointB);
};
MapData.prototype.anPointAllPath = function (pointA, pointB) {
	return this._getTemExtMap(pointA, pointB).findAllPath(pointA, pointB);
};
MapData.prototype.add = function (segmet) {
	if (segmet instanceof Segment) {
		if (this.get(segmet.nodeAName, segmet.nodeBName)) {
			return;
		}
		this._processTrangle(segmet);
		this.segmets.push(segmet);
		//添加A|B的索引.
		var k = segmet.nodeAName + this.SPLIT_SYMBOL + segmet.nodeBName;
		this.segmetsMap[k] = segmet;
		if (!segmet.isOneway) {

			//不是单向连接.添加B|A的索引.
			k = segmet.nodeBName + this.SPLIT_SYMBOL + segmet.nodeAName;
			this.segmetsMap[k] = segmet;
		}
	} else {
		throw "Type Error Exception .";
	}
};
MapData.prototype.get = function (nodeA, nodeB) {
	if ("object" === (typeof nodeA) &&
		"object" === (typeof nodeB)) {
		nodeA = nodeA.getName();
		nodeB = nodeB.getName();
	};
	return this.segmetsMap[nodeA + this.SPLIT_SYMBOL + nodeB];
};
MapData.prototype._getRelatedTrees = function (parentTree) {
	var relatedTreeList = [];
	for (var i = this.segmets.length - 1; i >= 0; i--) {
		var segmet = this.segmets[i];
		if (segmet.nodeAName === parentTree.nodeName) {
			relatedTreeList.push(new SegmentTree(segmet.nodeBName, this));
		} else if (segmet.nodeBName === parentTree.nodeName) {
			relatedTreeList.push(new SegmentTree(segmet.nodeAName, this));
		}
	}
	return relatedTreeList;
};
MapData.prototype._appendTree = function (parentTree, endTrees, nodeB) {
	if ("object" === nodeB) {
		nodeB = nodeB.getName();
	}
	if (nodeB === parentTree.nodeName) {
		return;
	}
	var relaTrees = this._getRelatedTrees(parentTree);
	for (var i = relaTrees.length - 1; i >= 0; i--) {
		var curTree = relaTrees[i];
		if (parentTree.add(curTree, this)) {

			var ind = endTrees.indexOf(parentTree);
			if (-1 != ind) {
				endTrees.slice(ind, -1);
			};
			endTrees.push(curTree);
			this._appendTree(curTree, endTrees, nodeB);
		}
	}
};
MapData.prototype.findAllPath = function (nodeA, nodeB) {
	console.log("MapData.prototype.findAllPath start.");
	if ("object" === (typeof nodeA) &&
		"object" === (typeof nodeB)) {
		nodeA = nodeA.getName();
		nodeB = nodeB.getName();
	};
	var rootTree = new SegmentTree(nodeA, this);
	var endTrees = [];
	this._appendTree(rootTree, endTrees, nodeB);
	console.log("MapData.prototype.findAllPath end.")
	return endTrees;

};
MapData.prototype.findMinPath = function (nodeA, nodeB) {
	console.log("MapData.prototype.findMinPath start.");
	if ("object" === (typeof nodeA) &&
		"object" === (typeof nodeB)) {
		nodeA = nodeA.getName();
		nodeB = nodeB.getName();
	};

	var trees = this.findAllPath(nodeA, nodeB);
	var minPath;
	for (var i = trees.length - 1; i >= 0; i--) {
		var tree = trees[i];
		//consoleconsole.log(tree.getName() + "   dist : " + tree.toRootDist);
		if (tree.nodeName === nodeB && (!minPath || tree.toRootDist < minPath.toRootDist)) {

			minPath = tree;
		}
	};
	if (minPath) {
		return minPath;
	} else {
		throw "no path find .";
	}
};
MapData.prototype.findPathArray = function (nodeA, nodeB) {
	return this.findMinPath(nodeA, nodeB).getPath(this);
};

/////////////////////
//["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
var map = new MapData();

var pointA = new Vectort2(1, 0);
var pointB = new Vectort2(2, 0);
var pointC = new Vectort2(1, 2);
var pointD = new Vectort2(2, 2);
var pointE = new Vectort2(0, 2);
var pointF = new Vectort2(0, 3);
var pointG = new Vectort2(3, 3);
var pointH = new Vectort2(3, 2);

map.add(new Segment(pointA, pointB));
map.add(new Segment(pointA, pointC));
map.add(new Segment(pointA, pointD));

map.add(new Segment(pointC, pointB));
map.add(new Segment(pointD, pointB));
map.add(new Segment(pointA, pointB));

map.add(new Segment(pointC, pointD));
map.add(new Segment(pointC, pointE));
map.add(new Segment(pointC, pointF));
map.add(new Segment(pointC, pointG));

map.add(new Segment(pointD, pointF));
map.add(new Segment(pointG, pointD));
map.add(new Segment(pointD, pointH));

map.add(new Segment(pointE, pointF));
map.add(new Segment(pointE, pointG));

map.add(new Segment(pointF, pointG));

map.add(new Segment(pointH, pointG));


// for (var i = 100; i >= 0; i--) {
// 	console.time("asdad");
// var tree=map.findMinPath(pointA,pointE);
// console.timeEnd("asdad");
// }
console.time("asdad");
var tree = map.anyPointMinPath(new Vectort2(1, 0.1), pointG);
console.log(tree.getPathPointList());
console.timeEnd("asdad");