const Vector = require('./physics/vector');
const SpriteSheet = require('./IO/spriteSheet');
const Entity = require('./physics/entity').Entity;
const Game = require('./physics/entity').Game;
const AABB = require('./physics/collision/AABB');
const UserInput = require('./IO/userInput');

//Default Renderer
Game.renderer.newLayer(function(){
  this.clear();
  Game.mapEntitys((entity) => {
    entity.draw(this.ctx);
  });
});

Game.start();

let player = new Entity({
  spriteSheet: new SpriteSheet('./../res/red.png', 16, 16),
  bounds: new AABB(new Vector(16)),
  tick: function(delta){
    this.location.join(this.velocity.multiply(new Vector(delta / 5)));
  },
  triggers: {
    collision: () => {
      console.log('hit');
    },
  },
  vars:{
    velocity: new Vector()
  }
}).createInstence(new Vector(0,200));

let other = new Entity({
  spriteSheet: new SpriteSheet('./../res/green.png', 16, 16),
  bounds: new AABB(new Vector(16)),
});
for(let i = 1; i < 11; i++){
  other.createInstence(new Vector(i * 80, 200));
}

UserInput.Controler.addBinding('KeyW', 'up');
UserInput.Controler.down('up', () => {
  player.velocity = new Vector(player.velocity.x, -1);
});
UserInput.Controler.up('up', () => {
  player.velocity = new Vector(player.velocity.x, 0);
});

UserInput.Controler.addBinding('KeyA', 'left');
UserInput.Controler.down('left', () => {
  player.velocity = new Vector(-1, player.velocity.y);
});
UserInput.Controler.up('left', () => {
  player.velocity = new Vector(0, player.velocity.y);
});

UserInput.Controler.addBinding('KeyS', 'down');
UserInput.Controler.down('down', () => {
  player.velocity = new Vector(player.velocity.x, 1);
});
UserInput.Controler.up('down', () => {
  player.velocity = new Vector(player.velocity.x, 0);
});

UserInput.Controler.addBinding('KeyD', 'right');
UserInput.Controler.down('right', () => {
  player.velocity = new Vector(1, player.velocity.y);
});
UserInput.Controler.up('right', () => {
  player.velocity = new Vector(0, player.velocity.y);
});
