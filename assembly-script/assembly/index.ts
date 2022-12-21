let pendulum: Pendulum;
let angle:i32;


class Pendulum {
  nextPosition: f64;
  initialPosition: f64;
  amplitude: u32;

  constructor(initialPosition: f64, amplitude:u32) {
    this.initialPosition = initialPosition;
    this.amplitude = amplitude;
  }
}

export function init(startPositionX: f64, amplitude: u32, w: u32, h: u32): void {
  angle = 0;
  var needed = <i32>(((w * h * sizeof<i32>() + 0xffff)) & ~0xffff) >>> 16;
  var actual = memory.size();
  if (needed > actual) memory.grow(needed - actual);
  pendulum = new Pendulum(startPositionX, amplitude);
}

export function move():void {
  angle += 10;
  if (angle == 360 || angle > 360) {
    angle = 0;
  }
  pendulum.nextPosition  = pendulum.initialPosition + pendulum.amplitude * Math.sin((angle * Math.PI) / 180);
}

export function getNextPosition(): f64 {
  return pendulum.nextPosition;
}