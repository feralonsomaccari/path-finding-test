export class DirectionInput {
    constructor() {
        this.initialKey = false;
        this.heldDirections = '';
        this.map = {
            ArrowUp: "up",
            KeyW: "up",
            ArrowDown: "down",
            KeyS: "down",
            ArrowLeft: "left",
            KeyA: "left",
            ArrowRight: "right",
            KeyD: "right",
        };
    }

    get direction() {
        return this.heldDirections;
    }

    init() {
        document.addEventListener("keydown", (e) => {
            const dir = this.map[e.code];
            if (dir) {
                this.heldDirections = dir;
            }
        });
    }
}
