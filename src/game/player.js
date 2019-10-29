const Vector = require('./../physics/vector');
const AABB = require('./../physics/collision/AABB');

const Entity = require('./../physics/entity');
const Clickable = require('./../logic/clickable');
const Renderable = require('./../IO/renderable');

const SpriteSheet = require('./../IO/spriteSheet')
const Sound = require('./../IO/sound');

const UserInput = require('./../IO/userInput');

bodyParts = {
  hair: new SpriteSheet('./../res/hair.png', 32, 32),
  face: new SpriteSheet('./../res/face.png', 16, 16),
  shirt: new SpriteSheet('./../res/shirt.png', 20, 10),
  pants: new SpriteSheet('./../res/pants.png', 15, 10),
}

partOffset = {
  hair: new Vector(0),
  face: new Vector(7, 14),
  shirt: new Vector(5, 27),
  pants: new Vector(7,37),
}

class Player {
  constructor(){
    this.body = {
      face: 0,
      hair: 0,
      shirt: 0,
      pants: 0,
    };

    this.direction = 0;

    this.position = new Vector(650, 300);

    this.frames = 4;
    this.collider = new AABB(new Vector(32, 98));

    Entity.call(this);
  }

  render(ctx){
    for(let part in this.body){
      bodyParts[part].draw(ctx, this.direction, this.body[part], this.position.add(partOffset[part]))
    }
  }
}

let player = new Player();
let spriteSheet = new SpriteSheet('./../res/arrow.png', 16, 16);
class Arrow {
  constructor(position, callback, direction){
    this.position = position;
    this.collider = new AABB(new Vector(16));

    this.leftDown = callback.bind(this);

    this.color = 0;

    this.direction = direction;

    Clickable.apply(this);
    Renderable.apply(this);
  }

  render(ctx){
    spriteSheet.draw(ctx, this.color, this.direction, this.position);
  }
}

let y = 250;
for(let part in bodyParts){
  new Arrow(new Vector(600, y), function(){
    player.body[part]--;
    if(player.body[part] < 0){
      player.body[part] = bodyParts[part].rows;
    }
    this.color = 1;
    setTimeout(() => {
      this.color = 0;
    }, 100)
  }, 0);
  new Arrow(new Vector(700, y), function(){
    player.body[part]++;
    if(player.body[part] >= bodyParts[part].rows){
      player.body[part] = 0;
    }
    this.color = 1;
    setTimeout(() => {
      this.color = 0;
    }, 100)
  }, 2);
  y += 32;
}

module.exports = player;
