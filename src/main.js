const Game = require('./logic/game');

const Vector = require('./physics/vector');
const AABB = require('./physics/collision/AABB');

const Entity = require('./physics/entity');
const Particle = require('./IO/particle');

const SpriteSheet = require('./IO/spriteSheet');

const UserInput = require('./IO/userInput');

let score = 0;

class EnemyParticle {
  constructor(position){
    this.position = position;
    this.velocity = new Vector(Math.random() * 5, Math.random() * 5);

    this.color = 'red';

    this.lifeSpan = 50;

    Particle.call(this);
  }
}

class Enemy {
  constructor(start, direction){

    this.position = start;
    this.velocity = direction

    this.spriteSheet = new SpriteSheet('./../res/red.png', 16, 16);
    this.collider = new AABB(new Vector(16));

    this.lifeSpan = 1500;

    this.trailBuffer = 0;

    Entity.call(this);
  }

  tick(delta){
    this.lifeSpan -= delta;
    if(this.lifeSpan < 0){
      this.exist = false;
    }
    else{
      this.trailBuffer += delta;
      while(this.trailBuffer > 10){
        this.trailBuffer -= 10;
        new EnemyParticle(this.position.clone());
      }
    }
  }

  collisionFilter(entity){
    return entity.constructor.name === "Bullet";
  }

  collisionStart(){
    score++;
    console.log(score);
    this.exist = false;
  }
}

class Player {
  constructor(high, low){
    this.heightError = 5;

    this.high = high;
    this.low = low;

    this.radius = low;
    this.targetHeight = false;

    this.speed = 0;
    this.rotation = 0;

    this.spriteSheet = new SpriteSheet('./../res/green.png', 16, 16);

    this.collider = new AABB(new Vector(16));

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

  collisionFilter(entity){
    return entity.constructor.name === "Enemy";
  }

  collisionStart(){
    this.exist = false;
  }
}

class BulletParticle {
  constructor(position){
    this.position = position;
    this.velocity = new Vector(Math.random(), Math.random());

    this.lifeSpan = 50;

    this.color = 'green';

    Particle.call(this);
  }
}

class Bullet {
    constructor(position, velocity){

      this.position = position;
      this.velocity = velocity;

      this.spriteSheet = new SpriteSheet('./../res/green.png', 4, 4);

      this.collider = new AABB(new Vector(4));

      this.lifeSpan = 1000;

      this.trailBuffer = 0;

      Entity.call(this);
    }

    tick(delta){
      this.lifeSpan -= delta;
      if(this.lifeSpan < 0){
        this.exist = false;
      }
      else{
        this.trailBuffer += delta;
        while(this.trailBuffer > 10){
          this.trailBuffer -= 10;
          new BulletParticle(this.position.clone());
        }
      }
    }

    collisionFilter(entity){
      return entity.constructor.name === "Enemy";
    }

    collisionEnd(){
      this.exist = false;
    }
}

let player = new Player(280, 100);

setInterval(() => {
  let rotation = Math.random() * Math.PI * 2;
  let radius = 500;
  let speed = -4;

  new Enemy(new Vector(Math.sin(rotation) * radius + 680, Math.cos(rotation) * radius + player.high + 50), new Vector(Math.sin(rotation) * speed, Math.cos(rotation) * speed));
}, 500);

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

UserInput.Controler.addBinding('Space', 'shoot');
UserInput.Controler.down('shoot', () => {
  if(player.exist){
    let speed = 5;
    let direction = new Vector(Math.sin(player.rotation), Math.cos(player.rotation));
    if(player.targetHeight){
      direction.scale(new Vector(-speed));
    }
    else{
      direction.scale(new Vector(speed));
    }

    new Bullet(player.position.clone(), direction);
  }
});

Game.start({
  loop: () => { },
  tps: 0,
  fps: 0,
  aps: 3,
});
