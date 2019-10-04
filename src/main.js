const Game = require('./logic/game');
const Entity = require('./physics/entity');
const AABB = require('./physics/collision/AABB');
const Vector = require('./physics/vector');
const SpriteSheet = require('./IO/spriteSheet');

class Box {
  constructor(pos, vel){
    this.position = pos;
    this.velocity = vel;

    this.collider = new AABB(new Vector(16));
    this.spriteSheet = new SpriteSheet('./../res/red.png', 16, 16);

    Entity.call(this);
  }

  collisionStart(){
    console.log('test');
  }
}

new Box(new Vector(), new Vector(1,0));
new Box(new Vector(100, 0), new Vector());

Game.start({
  loop: () => { },
  tps: 0,
  fps: 0,
  aps: 3,
});
