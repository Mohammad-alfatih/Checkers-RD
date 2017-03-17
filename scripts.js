var canvas = document.getElementById('board');
canvas.width = canvas.scrollWidth;
canvas.height = canvas.scrollHeight;
var ctx = canvas.getContext('2d');
var image = new Image();
image.src = './ground.png';
//var pieces = JSON.parse(readJSON('./piecesredo'));

function Piece(space,color) {
  var _this = this;

  (function() {
      _this.space = space; _this.x = space.x+space.w/2; _this.y = space.y+space.h/2; _this.radius = space.w/2.5; _this.color = color;
  })();
  this.draw = function(ctx) {
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  this.freeMove = function(event) {
    _this.space.draw(ctx);
    _this.x = event.x; _this.y = event.y;
    this.draw(ctx);
  }
  this.move = function(arg) {
    if(arg.idy<0 || arg.idx<0 || arg.idy>7 || arg.idx>7) return;
    _this.space.draw(ctx);
    _this.space = arg;
    _this.x = arg.x+arg.w/2; _this.y = arg.y+arg.h/2;
    this.draw(ctx);
  }
  this.moveNE = function() {
    this.move(board.grid[this.space.idy-1][this.space.idx+1]);
  }
  this.moveNW = function() {
    this.move(board.grid[this.space.idy-1][this.space.idx-1]);
  }
  this.moveSE = function() {
    this.move(board.grid[this.space.idy+1][this.space.idx+1]);
  }
  this.moveSW = function() {
    this.move(board.grid[this.space.idy+1][this.space.idx-1]);
  }
  this.draw(ctx);
}

function Space(x,y,w,h,c,idy,idx) {
  var t = this;
  (function() {
    t.x=x; t.y=y; t.w=w; t.h=h; t.color=c; t.idy=idy; t.idx=idx;
  })();
  //this.piece = new Piece(t.x+t.w/2,t.y+t.h/2,this.w/2.5,'red');
  this.cyclePieces = function() {
    for(i=0;i<board.pieces.length;i++) {
      if(board.pieces[i].space.idx == this.idx && board.pieces[i].space.idy == this.idy) board.pieces[i].draw(ctx);
      // {
      //   return board.pieces[i];
      // } else { return null; }
    }
  }
  this.hasPiece = function() {
    for(i=0;i<board.pieces.length;i++) {
      if(board.pieces[i].space.idx == this.idx && board.pieces[i].space.idy == this.idy) return i;
    } return undefined;
  }
  this.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x,this.y,this.h,this.w);
  }
  this.reDraw = function() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x,this.y,this.h,this.w);
    this.cyclePieces();
    // console.log(rePiece);
    // if(rePiece!=null) rePiece.draw(ctx);
  }
  this.highlight = function(ctx) {
    ctx.fillStyle = 'rgba(220,200,60,.5)';
    ctx.fillRect(this.x,this.y,this.h,this.w);
    this.cyclePieces();
  }
  this.draw(ctx);
}

function Board() {
  var grid = new Array(8);
  var pieces = new Array(12);

  this.drawGrid = function() {
    var boxH = canvas.height/8;
    var boxW = canvas.width/8;
    var incr = 0;
    var x = 0;
    var y = 0;
    var fill = false;

    for(i=0;i<8;i++) {
      grid[i]= new Array(8);
      for(j=0;j<8;j++) {
        var color;
        if(fill) { color = '#b59565'; } else { color = '#ffefdf'; }
        grid[i][j] = new Space(x,y,boxW,boxH,color,i,j);
        incr++; x+=boxW; fill=!fill;
      }
      x=0; y+=boxH; fill=!fill;
    }
  }
  this.grid = grid;

  this.drawPieces = function() {
    var pieceCounter=0;
    var offset = true;
    for(k=0;k<3;k++) {
      if(offset) { l = 1; } else { l = 0; }
      for(l;l<8;l+=2) {
        pieces[pieceCounter] = new Piece(grid[k][l],'red');
        pieceCounter++;
      }
      offset=!offset;
    }
  }
  this.pieces = pieces;
}


var board = new Board();
board.drawGrid();
board.drawPieces();
console.log(board.pieces);
//console.log(board);

var btnNE = document.getElementById('NE');
var btnNW = document.getElementById('NW');
var btnSE = document.getElementById('SE');
var btnSW = document.getElementById('SW');

btnNE.onclick = function() { randPiece.moveNE(); }
btnNW.onclick = function() { randPiece.moveNW(); }
btnSE.onclick = function() { randPiece.moveSE(); }
btnSW.onclick = function() { randPiece.moveSW(); }
//ctx.drawImage(image,100,100,100,100);
//console.log(image);

function readJSON(file){
    var request = new XMLHttpRequest();
    request.open('GET', file, false);
    request.send(null);
    if(request.status == 200){
        console.log(request.responseText);
        return request.responseText;
    }
}

//readJSON('./board.json');
//function getSpace() {
  canvas.addEventListener("click",getPosition,false);
  canvas.addEventListener("mousedown",movePiece,false);


  var activeSpace;
  var activePiece;
  //console.log(activeSpace);

function getPosition(event) {
  var ey; var ex;
  if(activeSpace!=undefined) activeSpace.reDraw();
  if(event.pageX!=undefined && event.pageY!=undefined) {
    var ey = event.pageY; var ex = event.pageX;
  } else {
    ey = event.clientY+document.body.scrollTop+document.documentElement.scrollTop;
    ex = event.clientX+document.body.scrollLeft+document.documentElement.scrollLeft;
  }
  ey -= canvas.offsetTop; ex -= canvas.offsetLeft;
  ey = Math.floor(ey/(canvas.height/8)); ex = Math.floor(ex/(canvas.height/8));
  activeSpace = board.grid[ey][ex];
  activePiece = board.pieces[activeSpace.hasPiece()];
  activeSpace.highlight(ctx);
}
//}
function movePiece(event) {
  if(activePiece!=undefined) {
    var my; var mx; var blockX; var blockY;
    if(event.pageX!=undefined && event.pageY!=undefined) {
      my = event.pageY; mx = event.pageX;
    } else {
      my = event.clientY+document.body.scrollTop+document.documentElement.scrollTop;
      mx = event.clientX+document.body.scrollLeft+document.documentElement.scrollLeft;
    }
    my -= canvas.offsetTop; mx -= canvas.offsetLeft;
    blockY = Math.floor(my/(canvas.width/8)); blockX = Math.floor(mx/(canvas.height/8));
    console.log(activeSpace);
    //activeSpace = board.grid[blockY][blockX];
    console.log(activeSpace);
    //activePiece.space.reDraw();
    //activeSpace = board.grid[blockY][blockX];
    activePiece.move(board.grid[blockY][blockX]);
    activeSpace.reDraw();
  }




  // //canvas.addEventListener("mousemove",dragPiece,false);
  // //canvas.addEventListener("mouseup",dropPiece,false);
  // // function dragPiece(e) {
  // //   console.log("Mouse moved");
  // // }
  // // function dropPiece(d) {
  // //   console.log("Dropped");
  // // }
  // console.log("Y: "+blockY+" "+"X: "+blockX);
}


//var corner = board.grid[0][0].h*2;





// function mousedOver() {
//   console.log("You have just listened to an event.");
// }

// window.addEventListener('load', resize, false);
// window.addEventListener('resize',resize,false);
//
// function resize() {
//
//   var canvas = document.getElementById('checkerBoard');
//
// 	var width = window.innerWidth;
// 	var ratio = canvas.width/canvas.height;
// 	var height = width * ratio;
//
// 	canvas.style.width = width+'px';
// 	canvas.style.height = height+'px';
// }
