const Vector = require('./../physics/vector');
const AABB = require('./../physics/collision/AABB');

const Entity = require('./../physics/entity');

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

UserInput.Controler.addBinding('KeyW', 'up');
UserInput.Controler.down('up', () => {
  player.velocity.y = -1;
});
UserInput.Controler.up('up', () => {
  if(player.velocity.y < 0){
    player.velocity.y = 0;
  }
});
UserInput.Controler.addBinding('KeyS', 'down');
UserInput.Controler.down('down', () => {
  player.velocity.y = 1;
});
UserInput.Controler.up('down', () => {
  if(player.velocity.y > 0){
    player.velocity.y = 0;
  }
});

UserInput.Controler.addBinding('KeyA', 'left');
UserInput.Controler.down('left', () => {
  player.velocity.x = -1;
});
UserInput.Controler.up('left', () => {
  if(player.velocity.x < 0){
    player.velocity.x = 0;
  }
});
UserInput.Controler.addBinding('KeyD', 'right');
UserInput.Controler.down('right', () => {
  player.velocity.x = 1;
});
UserInput.Controler.up('right', () => {
  if(player.velocity.x > 0){
    player.velocity.x = 0;
  }
});

module.exports = player;
