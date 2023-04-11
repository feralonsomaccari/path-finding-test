import { GameObject } from './GameObject.js'

export class Player extends GameObject {
    constructor(x, y, color) {
        super();
        this.x = x ?? 0;
        this.y = y ?? 0
        this.color = color ?? 'blue'

    }

    move = (direction) => {
        console.log(direction)
        switch (direction) {
            case "KeyW":
            case "ArrowUp":
                return this.y -= 1
            case "KeyD":
            case "ArrowRight":
                return this.x += 1
            case "KeyS":
            case "ArrowDown":
                return this.y += 1
            case "KeyA":
            case "ArrowLeft":
                return this.x -= 1
        }
    }
}