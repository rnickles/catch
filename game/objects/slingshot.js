import { GameObject } from "./gameObject.js";

export class Slingshot extends GameObject {
    constructor(x, y, engine) {
        super();
        // Matter stuff
        let bod = Matter.Bodies.circle(x, y, 50, {
            isStatic: true,
            isSensor:true,
            render: {
                fillStyle: 'rgba(0, 0, 255, 0.5)' // Blue color with 50% transparency
            }
        });
        Matter.Composite.add(engine.world, bod);
        this.bod = bod;
    }
}