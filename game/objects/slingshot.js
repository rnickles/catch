import { GameObject } from "./gameObject.js";

export class Slingshot extends GameObject {
    #engine;
    #anchor;
    #hasConnection;
    #gameState;
    #elastic;
    constructor(x, y, engine, gameState) {
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
        this.#gameState = gameState;
        this.#engine = engine;
        this.#anchor = {x: x, y: y };
        this.#hasConnection = false;
        this.#elastic = null;
    }

    get elastic() {
        return this.#elastic;
    }
    set elastic(bod) {
        this.#elastic = bod;
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
            this.#elastic = elastic;
            this.#hasConnection = true;
            this.#gameState.activeSlingshots.push(this);
        }
    }
}