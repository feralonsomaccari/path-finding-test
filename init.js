import { Canvas } from './Canvas.js'
import { Player } from './Player.js'
import { GameObject } from './GameObject.js'
import { DirectionInput } from './DirectionInput.js'

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
    const directionInput = new DirectionInput();
    directionInput.init();
    const mainCanvas = new Canvas(canvas, ctx, directionInput);
    const player = new Player(10,10)
    const objects = [new GameObject(20, 10), new GameObject(25, 25)]
    mainCanvas.addObjects(player, ...objects)

    startGameLoop(mainCanvas);



}

init();
