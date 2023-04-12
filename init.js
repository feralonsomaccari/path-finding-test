import { Canvas } from './src/Canvas.js'
import { Player } from './src/Player.js'
import { GameObject } from './src/GameObject.js'
import { DirectionInput } from './src/DirectionInput.js'

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

let lastFrameTimeMs = 0 // The last time the loop was run
let maxFPS = 40; // The maximum FPS we want to allow

function startGameLoop(mainCanvas) {
    const step = (timestamp) => {
        if (timestamp < lastFrameTimeMs + (1000 / maxFPS)) {
            requestAnimationFrame(step);
            return;
        }
        lastFrameTimeMs = timestamp;
        calculateFps();
        mainCanvas.clear();
        mainCanvas.draw();

        requestAnimationFrame(step)
    }
    step();
}

function init() {
    const directionInput = new DirectionInput();
    directionInput.init();
    const mainCanvas = new Canvas(canvas, ctx, directionInput);
    const player = new Player(10,10)
    const objects = [new GameObject(20, 7), new GameObject(25, 25), new GameObject(20, 12, 0), new GameObject(20, 1, 0)]
    mainCanvas.addObjects(player, ...objects)


    window.addEventListener('mouseup', function () {
        mainCanvas.removeListener('mousemove', mainCanvas.mouseMoveListener, true);
    });

    startGameLoop(mainCanvas);
}

init();
