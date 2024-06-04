import { GameObject } from "./gameObject.js";

const DOT_SIZE = 30;

export class Ball extends GameObject {
    
    constructor(x, y, engine) {
        super();
        // matter stuff
        // create a matter body
        let bod = Matter.Bodies.circle(x, y, DOT_SIZE * 0.5, {
            friction: 0.00001,
            restitution: 0.5,
            density: 0.1,
            render: {
                fillStyle: 'silver'
            }
        });
        // add it to the physics world
        Matter.Composite.add(engine.world, bod);
        this.bod = bod;
    }
}