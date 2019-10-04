const Game = require('./logic/game');
const Entity = require('./physics/entity');
const AABB = require('./physics/collision/AABB');
const Vector = require('./physics/vector');
const SpriteSheet = require('./IO/spriteSheet');
const UserInput = require('./IO/userInput');

class Player {
  constructor(high, low){

    this.heightError = 5;

    this.high = high;
    this.low = low;

    this.radius = low;
    this.targetHeight = false;

    this.speed = 0;
    this.rotation = 0;

    this.collider = new AABB(new Vector(16));
    this.spriteSheet = new SpriteSheet('./../res/green.png', 16, 16);

    Entity.call(this);
  }

  tick(delta){
    if(this.radius >= this.high){
      this.radius = this.high;
    }
    else if(this.radius <= this.low){
      this.radius = this.low;
    }

    if(this.targetHeight && this.radius <= this.high - this.heightError){
      this.radius += delta * 2;
    }
    else if(!this.targetHeight && this.radius >= this.low + this.heightError){
      this.radius += -delta * 2;
    }

    this.rotation += (this.speed / (this.radius * 2 * Math.PI) * delta);

    this.position = new Vector(Math.sin(this.rotation) * this.radius + 680, Math.cos(this.rotation) * this.radius + this.high + 50);
  }

  collisionStart(){
    this.exist = false;
  }
}
let player = new Player(280, 100);

UserInput.Controler.addBinding('KeyW', 'switch');
UserInput.Controler.addBinding('KeyS', 'switch');
UserInput.Controler.down('switch', () => {
  player.targetHeight = !player.targetHeight;
});
UserInput.Controler.addBinding('KeyA', 'left');
UserInput.Controler.down('left', () => {
  player.speed = -5;
});
UserInput.Controler.up('left', () => {
  player.speed = 0;
});

UserInput.Controler.addBinding('KeyD', 'right');
UserInput.Controler.down('right', () => {
  player.speed = 5;
});
UserInput.Controler.up('right', () => {
  player.speed = 0;
});

Game.start({
  loop: () => { },
  tps: 0,
  fps: 0,
  aps: 3,
});
