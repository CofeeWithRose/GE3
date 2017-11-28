/**
 * 二维坐标。
 * @param { x 轴坐标} x 
 * @param { y 轴坐标} y 
 */
var Vectort2=function Vectort2(x,y) {
	this.x=x;
	this.y=y;
};
Vectort2.prototype.getName = function() {
	return "x"+this.x+"y"+this.y;
};
Vectort2.prototype.equalse = function(other) {
	return other&&other.x===this.x&&other.y===this.y;
};


/**
 * 三维坐标.
 * @param {x轴坐标} x 
 * @param { y轴坐标} y 
 * @param { z轴坐标} z 
 */
var Vectort3 =function Vectort3(x,y,z) {
	this.x=x;
	this.y=y;
	this.z=z;
};
Vectort3.prototype.getName = function() {
	return "x"+this.x+"y"+this.y+"z"+this.z;
};

/**
 * 三角形.
 * @param {点A} pointA 
 * @param {点B} pointB 
 * @param {点C} pointC 
 */
var Trangle=function Trangle(pointA,pointB,pointC) {
	this.pointA=pointA;
	this.pointB=pointB;
	this.pointC=pointC;
	this.kca=(pointA.y-pointC.y)/(pointA.x-pointC.x);
	this.kcb=(pointB.y-pointC.y)/(pointB.x-pointC.x);
	this.kab=(pointB.y-pointA.y)/(pointB.x-pointA.x);
	this.bca=pointC.y - this.kca*pointC.x;
	this.bcb=pointC.y - this.kcb*pointC.y;
	this.bab=pointA.y - this.kab*pointA.y;
};


/**
 * 线段.
 * @param {a点} nodeA 
 * @param {b点} nodeB 
 * @param {a点与b点距离} dist 
 */
var Segment=function Segment(nodeA,nodeB,dist) {

	if (nodeB instanceof Vectort2&& nodeA instanceof Vectort2) {
		this.nodeAName=nodeA.getName();
		this.nodeBName=nodeB.getName();
		this.pointA=nodeA;
		this.pointB=nodeB;
		var dx=nodeA.x-nodeB.x;
		var dy=nodeA.y-nodeB.y;
		this.dist=Math.pow(dx*dx+dy*dy,1/2);		
	}else if (nodeA instanceof Vectort3 && nodeB instanceof Vectort3) {
		this.nodeAName=nodeA.getName();
		this.nodeBName=nodeB.getName();
		this.pointA=nodeA;
		this.pointB=nodeB;
		var dx=nodeB.x-nodeA.x;
		var dy=nodeB.y-nodeA.y;
		var dz=nodeB.z-nodeB.z;
		this.dist=Math.pow(dx*dx+dy*dy+dz*dz,1/3);
	}else{
		this.nodeAName=nodeA;
		this.nodeBName=nodeB;
		this.dist=dist;
	}
};
var SegmentTree=function SegmentTree(nodeName) {
	this.nodeName=nodeName;
	this.children=[];
	this.parent;
	this.toRootDist=0;
	this.minDistMap={};
	this.minDistMap[nodeName]=0;
};
SegmentTree.prototype.add = function(segmentTree,mapData) {
	segmentTree.parent=this;
	segmentTree.minDistMap=this.minDistMap;
	segmentTree.toRootDist=this.toRootDist+mapData.get(this.nodeName,segmentTree.nodeName).dist;
	var minDist=this.minDistMap[segmentTree.nodeName];
	if ("number"===(typeof minDist)&&minDist<=segmentTree.toRootDist) {

		return false;
	}else{
		this.children.push(segmentTree);
		this.minDistMap[segmentTree.nodeName]=segmentTree.toRootDist;
		return true;
	}
};
SegmentTree.prototype._getName = function(name,tree) {
	name=tree.nodeName+"|"+name;
	if (tree.parent) {
		return this._getName(name,tree.parent);
	}else{
		return name;
	}
};
SegmentTree.prototype.getName = function() {
	var name="";
	name=this._getName(name,this);
	return name;
};
SegmentTree.prototype._getPath=function getPath(tree,segmentArray,map) {
	if (tree.parent) {
		segmentArray.push(map.get(tree.nodeName,tree.parent.nodeName));
		this._getPath(tree.parent,segmentArray,map);
	}
	
};
SegmentTree.prototype.getPath = function(mapData) {
	var array=[];
	this._getPath(this,array,mapData);
	return array;
};

/**
 * 地图信息.
 * @param {option 点构成的数组，数组中的点将两两相连，构成地图路径.} array 
 */
var MapData=function MapData(array) {
	this.segmets=[];
	this.segmetsMap={};
	this.nodeNameList=[];
	this.trangleList=[];
	this.SPLIT_SYMBOL="|";
	if (array instanceof Array) {
		for (var i = array.length - 1; i >= 1; i--) {
			
			for (var j = i- 1; j >= 0; j--) {
				this.add(new Segment(array[i],array[j],1+Number.parseInt(10*Math.random())));
			}
		}
	};
	if (array instanceof MapData) {
		for (var i = array.segmets.length - 1; i >= 0; i--) {
		   this.segmets.push(array.segmets[i]);
		}
		for(var k in array.segmetsMap){
			this.segmetsMap[k]=array.segmetsMap[k];
		}
		for (var i = array.nodeNameList.length - 1; i >= 0; i--) {
		  this.nodeNameList.push(array.nodeNameList[i]);
		}
		for (var i = array.trangleList.length - 1; i >= 0; i--) {
		   this.trangleList.push(array.trangleList[i]);
		}
	}

};
MapData.prototype._processTrangle = function(segmet) {
	if (segmet.pointA&&segmet.pointB) {

		this._addTrangle(segmet);

		if (this.nodeNameList.indexOf(segmet.pointA)==-1) {
			this.nodeNameList.push(segmet.pointA);
		}
		if (this.nodeNameList.indexOf(segmet.pointB)==-1) {
			this.nodeNameList.push(segmet.pointB);
		}
	}

};
MapData.prototype._addTrangle = function(segmet) {
	for (var i = this.nodeNameList.length - 1; i >= 0; i--) {
		var nodeName=this.nodeNameList[i].getName();
		var keyA=nodeName+this.SPLIT_SYMBOL+segmet.nodeAName;
		var keyB = nodeName+this.SPLIT_SYMBOL+segmet.nodeBName;
		if (this.segmetsMap[keyB]&&this.segmetsMap[keyA]) {

			var trangle=new Trangle(segmet.pointA,segmet.pointB,this.nodeNameList[i]);
			this.trangleList.push(trangle);
		}
	}
};
Trangle.prototype.isPointIn=function isPointIn(point){
	var xArray=[this.pointA.x,this.pointB.x,this.pointC.x];
	xArray=xArray.sort();
	if (point.x<xArray[0]||point.x>xArray[2]) {
		return false;
	}

	if (point.equalse(this.pointA)||point.equalse(this.pointB)||point.equalse(this.pointC)) {
		return true;
	}
	var yValues=[];
	yValues.push(this.kab*point.x+this.bab);

	yValues.push(this.kcb*point.x+this.bcb);
	yValues.push(this.kca*point.x+this.bca);

	var times=0;
	for (var i = yValues.length - 1; i >= 0; i--) {
	  if (yValues[i]<point.y) {
	  	times++;
	  }	
	}
	
	return times%2==1;
};
MapData.prototype._getTemExtMap = function(pointA,pointB) {
	var map=new MapData(this);
	var isAIn=0;
	var isBIn=0;
	for (var i = map.trangleList.length - 1; i >= 0; i--) {
		var trangle=map.trangleList[i];
		if (trangle.isPointIn(pointA)) {
			map.add(new Segment(pointA,trangle.pointA));
			map.add(new Segment(pointA,trangle.pointB));
			map.add(new Segment(pointA,trangle.pointC));
			isAIn++;
		}
	};
	for (var i = map.trangleList.length - 1; i >= 0; i--) {
		var trangle=map.trangleList[i];
		if (trangle.isPointIn(pointB)) {

			map.add(new Segment(pointB,trangle.pointA));
			map.add(new Segment(pointB,trangle.pointB));
			map.add(new Segment(pointB,trangle.pointC));
			isBIn++;
		}
	};
	if (!isAIn) {
		throw "pointA is not in area .";
	}
	if (!isBIn) {
		throw  "pointB is not in area .";
	}
	return map;
};
MapData.prototype.anyPointMinPath = function(pointA,pointB) {

	return this._getTemExtMap(pointA,pointB).findMinPath(pointA,pointB);
};
MapData.prototype.anPointAllPath = function(pointA,pointB) {
	return this._getTemExtMap(pointA,pointB).findAllPath(pointA,pointB);
};
MapData.prototype.add = function(segmet) {
	if (segmet instanceof Segment ) {
		if (this.get(segmet.nodeAName,segmet.nodeBName)) {
			return;
		}
		this._processTrangle(segmet);
		this.segmets.push(segmet);
		var k=segmet.nodeAName+this.SPLIT_SYMBOL+segmet.nodeBName;
		this.segmetsMap[k]=segmet;
		 k=segmet.nodeBName+this.SPLIT_SYMBOL+segmet.nodeAName;
		 this.segmetsMap[k]=segmet;
	}else{
		throw "illegal type .";
	}
};
MapData.prototype.get = function(nodeA,nodeB) {
	if ("object"===(typeof nodeA)&&
		"object"===(typeof nodeB)) {
		nodeA=nodeA.getName();
		nodeB=nodeB.getName();
	};
	return this.segmetsMap[nodeA+this.SPLIT_SYMBOL+nodeB];
};
MapData.prototype._getRelatedTrees = function(parentTree) {
	var relatedTreeList = [];
	for (var i = this.segmets.length - 1; i >= 0; i--) {
		var segmet=this.segmets[i];
		if (segmet.nodeAName===parentTree.nodeName) {
			relatedTreeList.push(new SegmentTree(segmet.nodeBName));
		}else if(segmet.nodeBName===parentTree.nodeName){
			relatedTreeList.push(new SegmentTree(segmet.nodeAName));	
		}
	}
	return relatedTreeList;
};
MapData.prototype._appendTree= function(parentTree,endTrees,nodeB) {
	if ("object"===nodeB) {
		nodeB=nodeB.getName();
	}
	if (nodeB===parentTree.nodeName) {
		return;
	}
	var relaTrees=this._getRelatedTrees(parentTree);
	for (var i = relaTrees.length - 1; i >= 0; i--) {
		var curTree=relaTrees[i];
		if (parentTree.add(curTree,this)) {
			
			var ind=endTrees.indexOf(parentTree);
			if (-1!=ind) {
				endTrees.slice(ind,-1);
			};
			endTrees.push(curTree);
			this._appendTree(curTree,endTrees,nodeB);
		}
	}
};
MapData.prototype.findAllPath = function(nodeA,nodeB) {
	if ("object"===(typeof nodeA)&&
		"object"===(typeof nodeB)) {
		nodeA=nodeA.getName();
		nodeB=nodeB.getName();
	};
	var rootTree=new SegmentTree(nodeA);
	var endTrees=[];
	this._appendTree(rootTree,endTrees,nodeB);
	return endTrees;

};
MapData.prototype.findMinPath = function(nodeA,nodeB) {
	if ("object"===(typeof nodeA)&&
		"object"===(typeof nodeB)) {
		nodeA=nodeA.getName();
		nodeB=nodeB.getName();
	};

	var trees=this.findAllPath(nodeA,nodeB);
	var minPath;
	for (var i = trees.length - 1; i >= 0; i--) {
		var tree=trees[i];
		console.log(tree.getName()+"   dist : "+ tree.toRootDist);
		if (tree.nodeName===nodeB&&(!minPath||tree.toRootDist < minPath.toRootDist)) {
			
			minPath=tree;
		}
	};
	if (minPath) {
		return minPath;
	}else{
		 throw "no path find .";
	}
};
MapData.prototype.findPathArray = function(nodeA,nodeB) {
	return this.findMinPath(nodeA,nodeB).getPath(this);
};

/////////////////////
//["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
var map=new MapData();

var pointA=new Vectort2(1,0);
var pointB=new Vectort2(2,0);
var pointC=new Vectort2(1,2);
var pointD=new Vectort2(2,2);
var pointE=new Vectort2(0,2);
var pointF=new Vectort2(0,3);
var pointG=new Vectort2(3,3);
var pointH=new Vectort2(3,2);

map.add(new Segment(pointA,pointB));
map.add(new Segment(pointA,pointC));
map.add(new Segment(pointA,pointD));

map.add(new Segment(pointC,pointB));
map.add(new Segment(pointD,pointB));
map.add(new Segment(pointA,pointB));

map.add(new Segment(pointC,pointD));
map.add(new Segment(pointC,pointE));
map.add(new Segment(pointC,pointF));
map.add(new Segment(pointC,pointG));

map.add(new Segment(pointD,pointF));
map.add(new Segment(pointD,pointG));
map.add(new Segment(pointD,pointH));

map.add(new Segment(pointE,pointF));
map.add(new Segment(pointE,pointG));

map.add(new Segment(pointF,pointG));

map.add(new Segment(pointH,pointG));


// for (var i = 100; i >= 0; i--) {
// 	console.time("asdad");
// var tree=map.findMinPath(pointA,pointE);
// console.timeEnd("asdad");
// }
console.time("asdad");
var tree=map.anyPointMinPath(new Vectort2(1,0.1),pointG);
console.log(tree.getName()+ "  minDist : "+tree.toRootDist);
console.timeEnd("asdad");