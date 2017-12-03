var canvas = document.getElementbyId('BackgroundCanvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');
var numberOfTabs = 4;


var mouseMove = {
  x: undefined,
  y:undefined
}

var mouseClicked = {
  x: undefined,
  y: undefined,
  tabClickedLast: undefined
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

var tabArray = [];


function animate(){
 c.clearRect(0,0,canvas.width,canvas.height);

for(var i = 0; i< tabArray.length; i++)
  {
      tabArray[i].update();
  }
  mouseClicked.x = undefined;
  mouseClicked.y = undefined;
  requestAnimationFrame(animate);
}

function tab(color, linkNumber, link){

this.width = 50;
this.height = canvas.height / numberOfTabs;
this.x = 0;
this.y = this.height*linkNumber;
this.color = color;
this.link = link;

  this.draw = function(){
    c.fillRect(this.x,this.y,this.width,this.height);
    c.fillStyle = this.color;
  }

  this.update = function(){

    if(mouseClicked.tabClickedLast == this)
    {
      if(this.width < 100)
      {
        this.width++;
      }
    }
    else {
      if (this.x + (this.width) > mouseClicked.x && this.x < mouseClicked.x && this.y + this.height > mouseClicked.y && this.y < mouseClicked.y)
      {
        mouseClicked.tabClickedLast = this;
      }

      if (this.x + (this.width) > mouseMove.x && this.x < mouseMove.x && this.y + this.height > mouseMove.y && this.y < mouseMove.y)
      {
        if(this.width < 75)
        {
          this.width++;
        }
      }
      else if (this.width> 50)
      {
        this.width--;
      }
    }

    this.draw();
  }
}

var color ='rgba(' + 41 + ',' + 128 + ',' + 185 + ',' + 1 + ')';
tabArray.push(new tab(color,0));

color ='rgba(' + 46 + ',' + 204 + ',' + 113 + ',' + 1 + ')';
tabArray.push(new tab(color, 1));

color ='rgba(' + 230 + ',' + 126 + ',' + 34 + ',' + 1 + ')';
tabArray.push(new tab(color, 2));

color ='rgba(' + 243 + ',' + 156 + ',' + 18 + ',' + 1 + ')';
tabArray.push(new tab(color, 3));

animate();
