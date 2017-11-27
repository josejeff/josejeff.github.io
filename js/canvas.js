var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');


var maxWidth = 100;
var maxHeight = 100;

var loopcounter = Math.random() * 100;



//   Setting up a line
// c.beginPath();
// c.moveTo(x,y);
// c.lineTo(x,y);
// c.strokeStyle = ''
// c.stroke();

var mouseMove = {
  x: undefined,
  y:undefined
}

var mouseClicked = {
  x: undefined,
  y: undefined
}

window.addEventListener('mousemove',function(event) {
  mouseMove.x = event.x;
  mouseMove.y = event.y;
  // console.log(mouse);
})

window.addEventListener('click',function(event)
{
  mouseClicked.x = event.x;
  mouseClicked.y = event.y;
  console.log(mouseClicked);
})
// Arc/Circle
c.beginPath();
c.arc(300,300,30,0,Math.PI * 2, false);
c.strokeStyle = 'blue';
c.stroke();


function square(x, y, width, height, color, speedX, speedY){
this.x = x;
this.y = y;
this.width = width;
this.height = height;
this.color = color;
this.speedX = speedX;
this.speedY = speedY;


  this.draw = function(){
    c.fillRect(this.x,this.y,this.width,this.height);
    c.fillStyle = color;
  }

  this.update = function(){

    if(this.x + 300 > mouseMove.x && this.x - 300 < mouseMove.x && this.y + 300 > mouseMove.y && this.y - 300 < mouseMove.y)
    {
      var diffX = mouseMove.x - this.x;
      var diffY = mouseMove.y - this.y;

      this.x = mouseMove.x - diffX;
      this.y = mouseMove.y - diffY;
    }
    else {
      if (this.x + (this.width/2) > canvas.width || this.x- (this.width/2) < 0)
      {
        this.speedX = -this.speedX;
      }

      if (this.y + (this.height/2) > canvas.height || this.y- (this.height/2) < 0)
      {
        this.speedY = -this.speedY;
      }

      this.x+= this.speedX;
      this.y+= this.speedY;
    }

    this.draw();
  }
}


var squareArray = [];

for(var i = 0; i< loopcounter; i++)
{
//Setting fill color to a number without any decimal values
var r = (Math.random() * 255) | 0;
var g = (Math.random() * 255) | 0;
var b = (Math.random() * 255) | 0;
var a = 1;
var color ='rgba(' + r + ',' + g + ',' + b + ',' + a + ')';

  //Setting up a rectangle
  var x = (Math.random() * canvas.width) | 0;
  var y = (Math.random() * canvas.height) | 0;
  var width = (Math.random() * maxWidth) | 0;
  var height = (Math.random() * maxHeight) | 0;
  // console.log(r);
  // console.log(g);
  // console.log(b);
  // console.log(a);

  var speedX = ((Math.random() - 0.5) * 10) | 0;
  var speedY = ((Math.random() - 0.5) * 10) | 0;
squareArray.push(new square(x,y,width,height,color,speedX, speedY));
}


//console.log(squareArray);




function animate(){
 c.clearRect(0,0,canvas.width,canvas.height);

for(var i = 0; i< squareArray.length; i++)
  {
      squareArray[i].update();
  }



  requestAnimationFrame(animate);
}

animate();
