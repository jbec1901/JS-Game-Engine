const Game = require('./../logic/game');
const Vector = require('./../physics/vector');

function Renderable(){
  if(this.render === undefined){
    throw new Error('Renderables must have a render function');
  }

  if(this.exist === undefined){
    this.exist = true;
  }
  if(this.position === undefined){
    this.position = new Vector();
  }
  if(this.layer === undefined){
    this.layer = 'base';
  }
  Game.renderables.push(this);
};

module.exports = Renderable;
