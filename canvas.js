import { getClosestMultiplier } from './utils.js'

export class Canvas {

    constructor(canvas, ctx, width, height, boxSize) {
        this.canvas = canvas
        this.ctx = ctx;

        this.CANVAS_WIDTH = width ?? 800;
        this.CANVAS_HEIGHT = height ?? 600;
        this.BOX_SIZE = boxSize ?? 20;

        this.objects = {}
        this.grid2d = Array.from({ length: this.CANVAS_WIDTH / 20 }, e => Array(this.CANVAS_HEIGHT / 20).fill(0));
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

    addEl = (x, y) => {
        if (`${x}-${y}` in this.objects) return;
    }

    drawBoxWithPos = (x, y) => {
        if (`${x}-${y}` in this.objects) return;
        this.ctx.beginPath();
        this.ctx.fillStyle = 'Green';
        this.ctx.fillRect(x * 20, y * 20, 20, 20)
        this.ctx.stroke();
    }

    drawObject = (object) => {
        this.ctx.beginPath();
        this.ctx.fillStyle = object.color;
        this.ctx.fillRect(object.getPos().x * 20, object.getPos().y * 20, 20, 20)
        this.ctx.stroke();
    }

    getPositionByMouse = (evt) => {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
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
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    }

    cleanDrawing = () => {
        this.grid2d = Array.from({ length: this.CANVAS_WIDTH / 20 }, e => Array(this.CANVAS_HEIGHT / 20).fill(0));
    }

    draw = () => {
        // Draw map
        for (let x = 0; x < this.grid2d.length; x++) {
            for (let y = 0; y < this.grid2d[0].length; y++) {
                if (this.grid2d[x][y] === 'x') this.drawBoxWithPos(x, y)
            }
        }

        // Draw playes
        Object.keys(this.objects).forEach((key) => {
            this.drawObject(this.objects[key]);
        })

        this.drawGrid();

    }
}
