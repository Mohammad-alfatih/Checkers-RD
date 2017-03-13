var input = document.querySelector('input');
var btn = document.querySelector('button');
var out = document.querySelector('span');

btn.onclick = function() {
  var name = input.value;
  out.textContent = eval(name);
}

var shape = {
  x:10, y:10, h:10, w:10,

  write: function() { console.log("My x is " + this.x + ", and my y is " + this.y); },
  draw: function() { ctx.fillRect(this.x,this.y,this.h,this.w); }
};

shape.write();
shape.draw();
square = new Shape(20,20,20,20);
square.draw();

function drawGrid() {
  var boxH = canvas.height/8;
  var boxW = canvas.width/8;
  var incr = 0;
  var x = 0;
  var y = 0;
  var fill = false;

  for(j=0;j<8;j++) {
    drawLine();
    x=0; y+=boxH; fill=!fill;
  }

  function drawLine() {
    for(i=0;i<8;i++) shapeFactory();
  }

  function shapeFactory() {
    var colo = '';
    if(fill) { colo = 'tan'; } else { colo = 'transparent'; }
    var box = new Rectangle(x,y,boxW,boxH,colo,incr);
    incr++; x+=boxW; fill=!fill;
    box.draw(ctx);
    box.piece.draw(ctx);
  }
}

//ctx.beginPath();
//ctx.moveTo(x,y);    // This is a general method used for moving the drawing tip
//ctx.lineTo(x,y);    // This method makes a line in the direction the drawing tip moved... Helpful in drawing a fractional circle.
//ctx.strokeStyle = 'color';   //use ctx.fillStyle & ctx.fill in order to fill instead of stroke (would require another 'ctx.lineTo(x,y)')
//ctx.stroke();

if(grid[i][j].id>23 & grid[i][j].id<40 || grid[i][j].color!='tan') grid[i][j].piece=null;
if(grid[i][j].piece!=null) grid[i][j].piece.draw(ctx);
