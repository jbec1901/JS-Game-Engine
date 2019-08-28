const Game = new (require('./logic/game'))(30, 60);
const SpriteSheet = require('./IO/spriteSheet');
const Vector = require('./physics/vector');
const Entity = require('./physics/entity');
const AABB = require('./physics/collision/AABB');

let bb = new AABB(new Vector(10, 10));

// Game.renderer.newStaticLayer(function(){
//   this.ctx.fillStyle = 'red';
//   this.ctx.fillRect(20, 20, 100, 100);
// });
Game.renderer.newLayer(function(){
  bb.apply(new Vector(50, 50)).draw(this.ctx, '#ff0f0f');
});
// Game.renderer.newLayer(function(){
//   this.ctx.fillStyle = 'green';
//   this.ctx.fillRect(10, 10, 100, 100);
// });
// Game.start();

// 	now = performance.now();
// 	setTimeout(tick,0);
//
// 	window.requestAnimationFrame(draw);
// }
//
// function tick(){
// 	var deltaTime = performance.now() - now;
// 	now += deltaTime;
//
// 	console.log(deltaTime);
//
// 	setTimeout(tick,0);
// }
//
// function draw(){
// 	ctx.clearRect(0, 0, canvas.width, canvas.height);
//
// 	window.requestAnimationFrame(draw);
// }
//
// window.onload = setup();
