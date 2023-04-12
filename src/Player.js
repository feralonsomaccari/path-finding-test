import GameObject from './GameObject.js'

export default class Player extends GameObject {
    constructor(x, y, color) {
        super();
        this.x = x ?? 0;
        this.y = y ?? 0;
        this.color = color ?? 'blue';
        this.type = "Player";

    }

    update(state) {
        if (state.arrow) {
            this.move(state.arrow, state.map)
        }
    }

    isSpaceTaken(x, y, map) {
        if(map[x][y] === 'd') return true
        if(map[x][y] === 'object') return true
    }

    move = (direction, map) => {
        switch (direction) {
            case "up":
                if (this.y > 0 && !this.isSpaceTaken(this.x, this.y-1, map)) return this.y -= 1
                break;
            case "right":
                if (this.x < (800 - 20) / 20 && !this.isSpaceTaken(this.x+1, this.y, map)) return this.x += 1
                break;
            case "down":
                if (this.y < (600 - 20) / 20 && !this.isSpaceTaken(this.x, this.y + 1, map)) return this.y += 1
                break;
            case "left":
                if (this.x > 0 && !this.isSpaceTaken(this.x-1, this.y, map)) return this.x -= 1
                break;
        }
    }
}