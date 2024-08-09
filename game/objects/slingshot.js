import { GameObject, CATEGORY_DEFAULT, CATEGORY_MOUSE, ALL_MASK } from "./gameObject.js";

export class Slingshot extends GameObject {
    #engine;
    #anchor;
    #hasConnection;
    #gameState;
    #elastic;
    #loadedBall;
    constructor(x, y, engine, gameState) {
        super();
        // Matter stuff
        let bod = Matter.Bodies.circle(x, y, 50, {
            isStatic: true,
            isSensor:true,
            render: {
                fillStyle: 'rgba(0, 0, 255, 0.5)' // Blue color with 50% transparency
            },
            collisionFilter: {
                category: CATEGORY_DEFAULT,
                mask: ALL_MASK
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
    
    release() {
        // Remove slingshot from the list of active slingshots
        let index = this.#gameState.activeSlingshots.indexOf(this);
        if (index > -1) {
            this.#gameState.activeSlingshots.splice(index, 1);
        }

        Matter.Composite.remove(this.#engine.world, this.#elastic);
        this.#hasConnection = false;
        // Reset the collision parameters to default state: don't interact w/ the mouse.
        Matter.Body.set(this.#loadedBall, "collisionFilter", {category: CATEGORY_DEFAULT, mask: ~CATEGORY_MOUSE});
    }

    collisionStart(bodyThatCollided) {
        if (!this.#hasConnection) {
            let elastic = Matter.Constraint.create({ 
                pointA: this.#anchor, 
                bodyB: bodyThatCollided, 
                length: 0.01,
                damping: 0.01,
                stiffness: 0.2
            });
            Matter.Composite.add(this.#engine.world, elastic);
            this.#elastic = elastic;
            this.#hasConnection = true;
            this.#gameState.activeSlingshots.push(this);
            this.#loadedBall = bodyThatCollided;
            // Change collision parameters of the ball on the fly since now we want the mouse to be able to grab the ball
            Matter.Body.set(this.#loadedBall, "collisionFilter", {category: CATEGORY_DEFAULT, mask: ALL_MASK});
        }
    }
}