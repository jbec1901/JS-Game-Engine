const Game = require('./../logic/game');
const Vector = require('./../physics/vector');

const UserInput = require('./../IO/userInput');

let Clickable = Game.newGroup({
  name: 'clickable',
  constructor: function(){
    //We need a hit box to test for clicks
    if(this.collider === undefined){
      throw new Error('Clickables need a collider');
    }
    //We need a position to move the box to so just use 0,0 as default
    if(this.position === undefined){
      this.position = new Vector();
    }
  }
})

//Helper fucntion to make code nicer
function testClick(object){
  return object.collider.apply(object.position).testPoint(UserInput.Mouse);
}

//Run all button downs
UserInput.Controler.rawDown('MouseL', () => {
  Game.mapGroup('clickable', (object) => {
    if(testClick(object)){
      if(object.leftDown !== undefined){
        object.leftDown();
      }
    }
  })
});
UserInput.Controler.rawDown('MouseM', () => {
  Game.mapGroup('clickable', (object) => {
    if(testClick(object)){
      if(object.middleDown !== undefined){
        object.middleDown();
      }
    }
  })
});
UserInput.Controler.rawDown('MouseR', () => {
  Game.mapGroup('clickable', (object) => {
    if(testClick(object)){
      if(object.rightDown !== undefined){
        object.rightDown();
      }
    }
  })
});

//Run all button ups
UserInput.Controler.rawUp('MouseL', () => {
  Game.mapGroup('clickable', (object) => {
    if(testClick(object)){
      if(object.leftUp !== undefined){
        object.leftUp();
      }
    }
  })
});
UserInput.Controler.rawUp('MouseM', () => {
  Game.mapGroup('clickable', (object) => {
    if(testClick(object)){
      if(object.middleUp !== undefined){
        object.middleUp();
      }
    }
  })
});
UserInput.Controler.rawUp('MouseR', () => {
  Game.mapGroup('clickable', (object) => {
    if(testClick(object)){
      if(object.rightUp !== undefined){
        object.rightUp();
      }
    }
  })
});

module.exports = Clickable;
