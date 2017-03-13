var canvas = document.getElementById('canvas');
canvas.width = canvas.scrollWidth;
canvas.height = canvas.scrollHeight;
var ctx = canvas.getContext('2d');


function Rectangle(x,y,h,w,c,i,piece) {
  var t = this;
  (function() {
    t.x=x; t.y=y; t.h=h; t.w=w; t.color=c; t.id=i; t.piece=new Circle(t.w/2,t.h/2,t.w/2.5,'red');
  })();

  this.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x,this.y,this.h,this.w);
  }
}

function Circle(x,y,radius,color) {
  var _this = this;

(function() {
    _this.x = x || null;
    _this.y = y || null;
    _this.radius = radius || null;
    _this.color = color || null;
})();

  this.draw = function(ctx) {
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
    ctx.fillStyle = this.color;
    //ctx.lineTo(this.x,this.y);    //This is in case you are drawing a fractional circle
    ctx.fill();
    console.log('Circle drawn.');
  }
}

var boxH = canvas.height/8;
var boxW = canvas.width/8;
var incr = 0;
var x = 0;
var y = 0;
var fill = false;

function shapeFactory() {
  var colo = '';
  if(fill) { colo = 'tan'; } else { colo = 'transparent'; }
  var box = new Rectangle(x,y,boxW,boxH,colo,incr);
  incr++; x+=boxW; fill=!fill;
  box.draw(ctx);
  box.piece.draw(ctx);
}

function drawLine() {
  for(i=0;i<8;i++) shapeFactory();
}

function drawGrid() {
  for(j=0;j<8;j++) {
    drawLine();
    x=0; y+=boxH; fill=!fill;
  }
}
drawGrid();
