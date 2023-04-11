import { Canvas } from './canvas.js'

const canvas = document.querySelector("#canvas")
const ctx = canvas.getContext("2d");
const fpsElement = document.querySelector('#fps');

const times = [];
let fps;
const calculateFps = () => {
    const now = performance.now();
    while (times.length > 0 && times[0] <= now - 1000) {
        times.shift();
    }
    times.push(now);
    fps = times.length;
    fpsElement.innerHTML = "fps: " + fps
}

function startGameLoop(mainCanvas) {
    const step = () => {
        calculateFps();
        mainCanvas.clear();
        mainCanvas.draw();

        requestAnimationFrame(step)
    }
    step();
}

function init() {

    let called = false;
    const mainCanvas = new Canvas(canvas, ctx);
    const objects = [new Object(10, 10, 0), new Object(25, 25, 0)]
    mainCanvas.addObjects(...objects)

    startGameLoop(mainCanvas);

}

init();
