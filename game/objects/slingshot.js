import { GameObject } from "./gameObject.js";

export class Slingshot extends GameObject {
    #engine;
    #anchor;
    #hasConnection;
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
        this.#engine = engine;
        this.#anchor = {x: x, y: y };
        this.#hasConnection = false;
    }

    collisionStart(bodyThatCollided) {
        if (!this.#hasConnection) {
            let elastic = Matter.Constraint.create({ 
                pointA: this.#anchor, 
                bodyB: bodyThatCollided, 
                length: 0.01,
                damping: 0.01,
                stiffness: 0.05
            });
            Matter.Composite.add(this.#engine.world, elastic);
            this.#hasConnection = true;
        }
    }
}