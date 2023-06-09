export default class GameObject {
    constructor(x, y, color) {
        this.x = x ?? 0;
        this.y = y ?? 0
        this.color = this.color ?? 'red';
        this.type = 'object'
        this.value = 0
    }

    getPos = () => {
        return {
            x: this.x,
            y: this.y
        }
    }
}