class Mouse {
  constructor(){
    this.x = 0;
    this.y = 0;

    this.onMove = [];

  	window.addEventListener("mousemove", (e) => {
  		this.x = e.x;
  		this.y = e.y;
  	});
  }

  move(func){
    window.addEventListener("mousemove", (e) => {
  		func();
  	});
  }

  scroll(func){
    window.addEventListener("mousewheel", (e) => {
  		func();
  	}, {passive: true});
  }
}

class Controler {
  constructor(){
    this.bindings = [];

    this.downEvents = {};
    this.upEvents = {};

    this.downCount = {};

    window.addEventListener('mousedown', (e) => {
      switch (e.button) {
        case 0:
          this.buttonDown(this.bindings['MouseL']);
          break;
        case 1:
          this.buttonDown(this.bindings['MouseM']);
          break;
        case 2:
          this.buttonDown(this.bindings['MouseR']);
          break;
      }
    });
    window.addEventListener("keydown", (e) => {
      this.buttonDown(this.bindings[e.code]);
    });

    window.addEventListener('mouseup', (e) => {
      switch (e.button) {
        case 0:
          this.buttonUp(this.bindings['MouseL']);
          break;
        case 1:
          this.buttonUp(this.bindings['MouseM']);
          break;
        case 2:
          this.buttonUp(this.bindings['MouseR']);
          break;
      }
    });
    window.addEventListener("keyup", (e) => {
      this.buttonUp(this.bindings[e.code]);
    });
  }

  buttonDown(button){
    this.downCount[button]++;
    if(!button || !this.downEvents[button]){
      return;
    }
    if(this.downCount[button] === 1){
      this.downEvents[button].map((func) => {
        func();
      });
    }
  }
  buttonUp(button){
    this.downCount[button]--;
    if(!button || !this.upEvents[button]){
      return;
    }
    if(this.downCount[button] === 0){
      this.upEvents[button].map((func) => {
        func();
      });
    }
  }

  addBinding(code, button){
    this.bindings[code] = button;
  }
  removeBinding(code){
    delete this.bindings[code];
  }

  down(button, func){
    if(!this.downEvents[button]){
      this.downEvents[button] = [];
    }
    if(this.downCount[button] === undefined){
      this.downCount[button] = 0;
    }
    this.downEvents[button].push(func);
    return this;
  }
  up(button, func){
    if(!this.upEvents[button]){
      this.upEvents[button] = [];
    }
    if(this.downCount[button] === undefined){
      this.downCount[button] = 0;
    }
    this.upEvents[button].push(func);
    return this;
  }

  //TODO: add event removers
  removeDown(){}
  removeUp(){}

  //TODO: button combo trigger
  //TODO: Multi button tirgger
}

exports.Controler = new Controler();
exports.Mouse = new Mouse();
