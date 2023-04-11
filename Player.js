import { GameObject } from './GameObject.js'

export class Player extends GameObject {
    constructor(x, y, color) {
        super();
        this.x = x ?? 0;
        this.y = y ?? 0
        this.color = color ?? 'blue'
        this.type = "Player"

    }

    update(state) {
        if (state.arrow) {
            this.move(state.arrow)
        }
    }

    move = (direction) => {
        switch (direction) {
            case "up":
                if (this.y > 0) return this.y -= 1
                break;
            case "right":
                if (this.x < (800 - 20) / 20) return this.x += 1
                break;
            case "down":
                if (this.y < (600 - 20) / 20) return this.y += 1
                break;
            case "left":
                if (this.x > 0) return this.x -= 1
                break;
        }
    }
}