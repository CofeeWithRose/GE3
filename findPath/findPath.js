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
var Vectort3 =function Vectort3(x,y,z) {
	Vectort2.apply(this,arguments);
	this.z=z;
};
Vectort3.prototype.getName = function() {
	return "x"+this.x+"y"+this.y+"z"+this.z;
};
var TrangleClass=function TrangleClass(pointA,pointB,pointC) {
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
var SegmentClass=function SegmentClass(nodeA,nodeB,dist) {

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
var SegmentTreeClass=function SegmentClass(nodeName) {
	this.nodeName=nodeName;
	this.children=[];
	this.parent;
	this.toRootDist=0;
	this.minDistMap={};
	this.minDistMap[nodeName]=0;
};
SegmentTreeClass.prototype.add = function(segmentTree,mapData) {
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
SegmentTreeClass.prototype._getName = function(name,tree) {
	name=tree.nodeName+"|"+name;
	if (tree.parent) {
		return this._getName(name,tree.parent);
	}else{
		return name;
	}
};
SegmentTreeClass.prototype.getName = function() {
	var name="";
	name=this._getName(name,this);
	return name;
};
SegmentTreeClass.prototype._getPath=function getPath(tree,segmentArray,map) {
	if (tree.parent) {
		segmentArray.push(map.get(tree.nodeName,tree.parent.nodeName));
		this._getPath(tree.parent,segmentArray,map);
	}
	
};
SegmentTreeClass.prototype.getPath = function(mapData) {
	var array=[];
	this._getPath(this,array,mapData);
	return array;
};
var MapDataClass=function MapDataClass(array) {
	this.segmets=[];
	this.segmetsMap={};
	this.nodeNameList=[];
	this.trangleList=[];
	this.SPLIT_SYMBOL="|";
	if (array instanceof Array) {
		for (var i = array.length - 1; i >= 1; i--) {
			
			for (var j = i- 1; j >= 0; j--) {
				this.add(new SegmentClass(array[i],array[j],1+Number.parseInt(10*Math.random())));
			}
		}
	};
	if (array instanceof MapDataClass) {
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
MapDataClass.prototype._processTrangle = function(segmet) {
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
MapDataClass.prototype._addTrangle = function(segmet) {
	for (var i = this.nodeNameList.length - 1; i >= 0; i--) {
		var nodeName=this.nodeNameList[i].getName();
		var keyA=nodeName+this.SPLIT_SYMBOL+segmet.nodeAName;
		var keyB = nodeName+this.SPLIT_SYMBOL+segmet.nodeBName;
		if (this.segmetsMap[keyB]&&this.segmetsMap[keyA]) {

			var trangle=new TrangleClass(segmet.pointA,segmet.pointB,this.nodeNameList[i]);
			this.trangleList.push(trangle);
		}
	}
};
TrangleClass.prototype.isPointIn=function isPointIn(point){
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
	if (point.equalse(this.pointA)||point.equalse(this.pointB)||point.equalse(this.pointC)) {
		times=1;
	}
	return times%2==1;
};
MapDataClass.prototype._getTemExtMap = function(pointA,pointB) {
	var map=new MapDataClass(this);
	var isAIn=0;
	var isBIn=0;
	console.log("map.trangleList.length : "+map.trangleList.length);
	for (var i = map.trangleList.length - 1; i >= 0; i--) {
		var trangle=map.trangleList[i];
		
		if (trangle.isPointIn(pointA)) {
			map.add(new SegmentClass(pointA,trangle.pointA));
			map.add(new SegmentClass(pointA,trangle.pointB));
			map.add(new SegmentClass(pointA,trangle.pointC));
			isAIn++;
		}
	};
	console.log("map.trangleList.length : "+map.trangleList.length);
	for (var i = map.trangleList.length - 1; i >= 0; i--) {

		if (trangle.isPointIn(pointB)) {
			map.add(new SegmentClass(pointB,trangle.pointA));
			map.add(new SegmentClass(pointB,trangle.pointB));
			map.add(new SegmentClass(pointB,trangle.pointC));
			isBIn++;
		}
	};
	console.log("map.trangleList.length : "+map.trangleList.length);
	if (!isAIn) {
		throw "pointA is not in area .";
	}
	if (!isBIn) {
		throw  "pointB is not in area .";
	}
	return map;
};
MapDataClass.prototype.anyPointMinPath = function(pointA,pointB) {

	return this._getTemExtMap(pointA,pointB).findMinPath(pointA,pointB);
};
MapDataClass.prototype.anPointAllPath = function(pointA,pointB) {
	return this._getTemExtMap(pointA,pointB).findAllPath(pointA,pointB);
};
MapDataClass.prototype.add = function(segmet) {
	if (segmet instanceof SegmentClass ) {
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
MapDataClass.prototype.get = function(nodeA,nodeB) {
	if ("object"===(typeof nodeA)&&
		"object"===(typeof nodeB)) {
		nodeA=nodeA.getName();
		nodeB=nodeB.getName();
	};
	return this.segmetsMap[nodeA+this.SPLIT_SYMBOL+nodeB];
};
MapDataClass.prototype._getRelatedTrees = function(parentTree) {
	var relatedTreeList = [];
	for (var i = this.segmets.length - 1; i >= 0; i--) {
		var segmet=this.segmets[i];
		if (segmet.nodeAName===parentTree.nodeName) {
			relatedTreeList.push(new SegmentTreeClass(segmet.nodeBName));
		}else if(segmet.nodeBName===parentTree.nodeName){
			relatedTreeList.push(new SegmentTreeClass(segmet.nodeAName));	
		}
	}
	return relatedTreeList;
};
MapDataClass.prototype._appendTree= function(parentTree,endTrees,nodeB) {
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
MapDataClass.prototype.findAllPath = function(nodeA,nodeB) {
	if ("object"===(typeof nodeA)&&
		"object"===(typeof nodeB)) {
		nodeA=nodeA.getName();
		nodeB=nodeB.getName();
	};
	var rootTree=new SegmentTreeClass(nodeA);
	var endTrees=[];
	this._appendTree(rootTree,endTrees,nodeB);
	return endTrees;

};
MapDataClass.prototype.findMinPath = function(nodeA,nodeB) {
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
MapDataClass.prototype.findPathArray = function(nodeA,nodeB) {
	return this.findMinPath(nodeA,nodeB).getPath(this);
};

/////////////////////
//["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
var map=new MapDataClass();

var pointA=new Vectort2(0,0);
var pointB=new Vectort2(0,1);
var pointC=new Vectort2(1,1);
var pointD=new Vectort2(1,0);
var pointE=new Vectort2(2,2);

map.add(new SegmentClass(pointA,pointB));
map.add(new SegmentClass(pointA,pointC));
map.add(new SegmentClass(pointA,pointD));

map.add(new SegmentClass(pointC,pointB));
map.add(new SegmentClass(pointD,pointB));

map.add(new SegmentClass(pointE,pointB));
map.add(new SegmentClass(pointE,pointC));
map.add(new SegmentClass(pointE,pointD));

map.add(new SegmentClass(pointE,pointA));
map.add(new SegmentClass(pointB,pointD));

// for (var i = 100; i >= 0; i--) {
// 	console.time("asdad");
// var tree=map.findMinPath(pointA,pointE);
// console.timeEnd("asdad");
// }
console.time("asdad");
var tree=map.anyPointMinPath(new Vectort2(0.5,0.5),new Vectort2(0.6,0.6));
console.log(tree.getName()+ "  minDist : "+tree.toRootDist);
console.timeEnd("asdad");