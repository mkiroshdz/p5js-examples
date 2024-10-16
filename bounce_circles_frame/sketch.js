const CANVAS_SIZE = { x: 300, y: 300 };

class Plane {
  constructor() {
    this._list = [];
  }

  add(item) {
    this._list.push(item);
  }
  
  render(loopCount) {
    this._list.forEach(i => i.render(loopCount));
  }
}

class Item {
  constructor(z) {
    const x =  20 + Math.floor(Math.random() * CANVAS_SIZE.x/4);
    const y = 20 + Math.floor(Math.random() * CANVAS_SIZE.y/4);
    this._position = {x, y};
    this._size = Math.floor(Math.random() * CANVAS_SIZE.x/25);
    this._movement = {
      throttle: 1 + Math.floor(Math.random() * 4),
      x: Math.floor(Math.random() * 100),
      y: Math.floor(Math.random() * 100)
    }
  }
  
  move() {
    const { _size, _position: { x, y }, _movement: { x: mx, y: my } } = this;
    
    const sy = my < 0 ? _size/2*-1 : _size/2;
    const upperBounce = y + sy <= 0;
    const lowerBounce = y + sy + _size >= CANVAS_SIZE.y;
    if(upperBounce || lowerBounce) {
      this._movement.y = -1 * my;
    } else {
      const sx = mx < 0 ? _size/2*-1 : _size/2;
      const leftBounce = x + sx <= 0;
      const rightBounce = x + sx + _size >= CANVAS_SIZE.x;
      if(leftBounce || rightBounce) this._movement.x = -1 * mx;
    }
    
    const dy = Math.abs(y/x);
    
    this._position.y += (this._movement.y < 0 ? dy * -1 : dy);
    this._position.x += (this._movement.x < 0 ? -1 : 1);
  }
  
  render(loopCount) {
    if(loopCount % this._movement.throttle == 0) {
      this.move();
    }
    circle(this._position.x, this._position.y, this._size);
  }
}

APP_COLORS = [
    [249, 183, 169 ],
    [113, 167, 211],
    [218, 155, 238]
]

class App {
  constructor() {
    this._loopCount = 0;
    this._planes = []; 
    for(let i = 0; i < 3; i++) {
      const plane = new Plane();
      for(let j = 0; j < 3; j++) {
        const item = new Item();
        plane.add(item);
      }
      this._planes.push(plane);
    }     
  }
  
  render() {
    this._loopCount++;
    this._planes.forEach((p, i) => {
      fill(color(APP_COLORS[i]));
      p.render(this._loopCount);
    });
  }
}

const app = new App();

function setup() {
  createCanvas(CANVAS_SIZE.x, CANVAS_SIZE.y);
}

function draw() {
  background(220);
  app.render();
}