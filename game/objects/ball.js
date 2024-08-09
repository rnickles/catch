import { GameObject, CATEGORY_MOUSE, CATEGORY_DEFAULT } from "./gameObject.js";

const DOT_SIZE = 50;

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
            },
            collisionFilter: {
                category: CATEGORY_DEFAULT,
                mask: ~CATEGORY_MOUSE // It should not collide with the mouse by default
            }
        });
        // add it to the physics world
        Matter.Composite.add(engine.world, bod);
        this.bod = bod;
    }
}