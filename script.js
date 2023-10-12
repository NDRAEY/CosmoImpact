let frames = 30;

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
size = [1280, 800]

const spaceship = new Image();
spaceship.src = "./img/spaceship.png"


spaceshipWidth = 150;
spaceshipX = size[0]/2-spaceshipWidth/2;
spaceshipY = size[1]-spaceshipWidth-50;
spaceshipSpeed = 2;


var sprite = new Image();
sprite.src = './img/boom.png'

////////////////////////////////////////////


spaceship.onload = function () {
  ctx.drawImage(spaceship, spaceshipX, spaceshipY, spaceshipWidth,spaceshipWidth)
}


////////////////////////////////////////////


pressedButtons = {
  "a": false, "d": false
}


////////////////////////////////////////////

const bacground_canvas = new Image();
bacground_canvas.src = "./img/bg_canvas.png"


function background() {
  //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    ctx.drawImage(bacground_canvas,0 , 0, 1280, 800);
}
 

////////////////////////////////////////////

  window.addEventListener('DOMContentLoaded', function () {
    canvas.width = size[0];
    canvas.height = size[1];
    setInterval(draw,10)


    function draw(){
    background();
    game()
    }
    

  }, false);

////////////////////////////////////////////

  function game() {
    spaceship.onload(0, 0);

      window.onkeydown = function(event)
      {
      if (String(event.key) == "a") {
        pressedButtons["a"] = true;
      }
      if (String(event.key) == "d") {
        pressedButtons["d"] = true;
      }
    }
    window.onkeyup = function(e) {
      if (String(e.key) == "a") {
        pressedButtons["a"] = false;
      }
      if (String(e.key) == "d") {
        pressedButtons["d"] = false;
      }
    }

    if (pressedButtons["a"]) spaceshipX -= spaceshipSpeed;
    if (pressedButtons["d"]) spaceshipX += spaceshipSpeed;
  }

  ////////////////////////////////////////////


sprite.onload = function(){
  tick();
  requestAnimationFrame(tick);
};

var x = 0, tick_count = 0;

function tick(){
  if (tick_count > 10){
    draw_boom();
    tick_count = 1;
  }

  tick_count = 0;
  requestAnimationFrame(tick);
}

function draw_boom(){

  //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
  ctx.clearRect(0,0, canvas.width, canvas.height)
  x = (x === 512 ? 0 : x + 50);
  ctx.drawImage(sprite_boom, 1000, 1000);
}



////////////////////Sprite///////////////////////////////////////////////////////


class Sprite {
    constructor(options) {
        this.ctx = options.ctx;

        this.image = options.image;

        this.frameIndex = 0;
        this.tickCount = 0;
        this.ticksPerFrame = options.ticksPerFrame || 0;
        this.numberOfFrames = options.numberOfFrames || 1;

        this.width = options.width;
        this.height = options.height;

        this.start();
    }

    update() {
        this.tickCount++;

        if (this.tickCount > this.ticksPerFrame) {
            this.tickCount = 0;
            if (this.frameIndex < this.numberOfFrames - 1) {
                this.frameIndex++;
            } else {
                this.frameIndex = 0;
            }
        }
    }

    render() {
        this.ctx.drawImage(
            this.image,
            this.frameIndex * this.width / this.numberOfFrames,
            0,
            this.width / this.numberOfFrames,
            this.height,
            0,
            0,
            this.width / this.numberOfFrames,
            this.height
        )
    }

    start() {
        let loop = () => {
            this.update();
            this.render();

            window.requestAnimationFrame(loop);
        }

        window.requestAnimationFrame(loop);
    }
}


////////////////////////////////////////////




let shipImg = new Image();
shipImg.src = './img/sprites.png';
let ship = new Sprite({
  ctx: canvas.getContext('2d'),
  image: shipImg,
  width: 200,
  height: 80,
  x: 100,
  y: 100,
  numberOfFrames: 4,
  ticksPerFrame: 8,
})