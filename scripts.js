var canvas = document.getElementById('board');
canvas.width = canvas.scrollWidth;
canvas.height = canvas.scrollHeight;
var ctx = canvas.getContext('2d');
var image = new Image();
image.src = './ground.png';


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
    console.log(_this.space);
  }
  this.move = function(arg) {
    if(arg.idy<0 || arg.idx<0 || arg.idy>7 || arg.idx>7) return;
    _this.space.draw(ctx);
    _this.space = arg;
    _this.x = arg.x+arg.w/2; _this.y = arg.y+arg.h/2;
    this.draw(ctx);
    console.log('BUTTON CLICKED');
    console.log(_this.space.idy+" "+this.space.idx);
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
  this.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x,this.y,this.h,this.w);
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
        if(fill) { color = 'tan'; } else { color = 'transparent'; }
        grid[i][j] = new Space(x,y,boxW,boxH,color,i,j);
        incr++; x+=boxW; fill=!fill;
      }
      x=0; y+=boxH; fill=!fill;
    }
  }
  this.grid = grid;

  var currentSpaceX; var currentSpaceY;
  this.drawPieces = function() {
    for(i=0;i<12;i++) {
      pieces[i] = new Piece(grid[currentSpaceX][currentSpaceY],'red');
      currentSpaceX++; currentSpaceY++;
    }
  }
}

var board = new Board();
board.drawGrid();
//console.log(board);

var randPiece = new Piece(board.grid[7][0],'red');
//console.log(randPiece);
randPiece.draw(ctx);

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
  var g = canvas.addEventListener("click",getPosition,false);
  var ey=0; var ex=0;
  var activeSpace = board.grid[ey][ex];

  function getPosition(event) {

    if(event.x!=undefined && event.y!=undefined) {
      var ey = event.y; var ex = event.x;
    } else {
      ey = event.clientY+document.body.scrollTop+document.documentElement.scrollTop;
      ex = event.clientX+document.body.scrollLeft+document.documentElement.scrollLeft;
    }
    ey -= canvas.offsetTop; ex -= canvas.offsetLeft;
    ey = Math.floor(ey/(canvas.height/8)); ex = Math.floor(ex/(canvas.height/8));
    console.log("ey: "+ey+" "+"ex: "+ex);
    console.log(activeSpace);
    //return {"ex":ex,"ey":ey};
  }
//}



var corner = board.grid[0][0].h*2;
console.log(activeSpace);





// function mousedOver() {
//   console.log("You have just listened to an event.");
// }
console.log(Math.floor(450/(canvas.height/8)));
