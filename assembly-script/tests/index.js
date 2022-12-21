import assert from "assert";
import { init, getNextPosition, move } from "../build/debug.js";

const startPosition = 100;
const amplitude = 20;
const w = 400;
const h = 400;
init(startPosition, amplitude, w, h);
move();
assert.strictEqual(getNextPosition(), 103.4729635533386);
