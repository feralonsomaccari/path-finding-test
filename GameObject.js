export class GameObject {
    constructor(x, y, color) {
        this.x = x ?? 0;
        this.y = y ?? 0
        this.color = this.color ?? 'red';
        this.type = 'Object'
    }

    getPos = () => {
        return {
            x: this.x,
            y: this.y
        }
    }
}