import { findShortestPath } from '../algos/findShortestPath.js'
import { getClosestMultiplier } from '../utils/utils.js'

export default class Canvas {

    constructor(canvas, ctx, directionInput, width, height, boxSize) {
        this.canvas = canvas
        this.ctx = ctx;
        this.directionInput = directionInput

        this.CANVAS_WIDTH = width ?? 800;
        this.CANVAS_HEIGHT = height ?? 600;
        this.BOX_SIZE = boxSize ?? 20;

        this.objects = {}
        this.grid2d = Array.from({ length: this.CANVAS_WIDTH / 20 }, e => Array(this.CANVAS_HEIGHT / 20).fill(0));

        this.canvas.addEventListener('mousedown', this.mouseDownListener, true)
    }

    drawGrid = () => {
        for (let x = 0; x <= this.CANVAS_WIDTH; x += 20) {
            this.ctx.moveTo(x + 0.5, 0);
            this.ctx.lineTo(x + 0.5, 600);
        }
        for (let y = 0; y <= this.CANVAS_HEIGHT; y += 20) {
            this.ctx.moveTo(0, y + 0.5);
            this.ctx.lineTo(800, y + 0.5);
        }
        this.ctx.strokeStyle = "black";
        this.ctx.stroke();
    }

    addEl = (x, y, value) => {
        if (`${x}-${y}` in this.objects) return;
        this.grid2d[x][y] = value
    }

    drawBoxWithPos = (x, y, color) => {
        if (`${x}-${y}` in this.objects) return;
        this.ctx.beginPath();
        this.ctx.fillStyle = color ?? 'lightGray';
        this.ctx.fillRect(x * 20, y * 20, 20, 20)
        this.ctx.stroke();
    }

    drawLineWithPos = (x, y, color) => {
        if (`${x}-${y}` in this.objects) return;
        this.ctx.beginPath();
        this.ctx.fillStyle = color ?? 'green';
        this.ctx.fillRect((x * 20)+7.5, (y * 20)+10, 5, 5)
        this.ctx.stroke();
    }

    drawObject = (object) => {
        this.ctx.beginPath();
        this.ctx.fillStyle = object.color;
        this.ctx.fillRect(object.getPos().x * 20, object.getPos().y * 20, 20, 20)
        this.ctx.stroke();
        // this.grid2d[object.getPos().x][object.getPos().y] = object.type
        
    }

    getPositionByMouse = (evt) => {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    mouseDownListener = (evt) => {
        const mousePos = this.getPositionByMouse(evt);
        this.addEl(getClosestMultiplier(mousePos.x, this.BOX_SIZE) / 20, getClosestMultiplier(mousePos.y, this.BOX_SIZE) / 20, 'd')
        this.canvas.addEventListener('mousemove', this.mouseMoveListener, true);
    }

    mouseMoveListener = (evt) => {
        const mousePos = this.getPositionByMouse(evt);
        this.addEl(getClosestMultiplier(mousePos.x, this.BOX_SIZE) / 20, getClosestMultiplier(mousePos.y, this.BOX_SIZE) / 20, 'd')
    }

    removeListener = () => {
        this.canvas.removeEventListener('mousemove', this.mouseMoveListener, true);
    }

    addObjects = (...objects) => {
        objects.forEach((object) => [
            this.objects[`${object.getPos().x}-${object.getPos().y}`] = object
        ])
    }

    getPosInfo = (x, y) => {
        if (`${x}-${y}` in this.objects) return this.objects[`${x}-${y}`];
        return false;
    }

    get2dGrid = () => {
        return this.grid2d;
    }

    clear = () => {
        // this.grid2d = Array.from({ length: this.CANVAS_WIDTH / 20 }, e => Array(this.CANVAS_HEIGHT / 20).fill(0));
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    }

    cleanDrawing = () => {
        this.grid2d = Array.from({ length: this.CANVAS_WIDTH / 20 }, e => Array(this.CANVAS_HEIGHT / 20).fill(0));
    }

    draw = () => {
        // Draw map
        for (let x = 0; x < this.grid2d.length; x++) {
            for (let y = 0; y < this.grid2d[0].length; y++) {
                if (this.grid2d[x][y] === 'd') this.drawBoxWithPos(x, y)
            }
        }

        let player

        // Draw playes
        Object.keys(this.objects).forEach((key) => {
            const gameObject = this.objects[key]
            this.drawObject(gameObject);
            this.directionInput.direction;
            if (gameObject.type === "Player") {
                player = gameObject
                gameObject.update({
                    map: this.grid2d,
                    arrow: this.directionInput.direction,
                });
            }
        })

        //Draw paths
        const objects = Object.values(this.objects)
        objects.shift();
        objects.forEach((obj) => {
            findShortestPath(this, player, obj)
        })


        this.drawGrid();

    }
}
