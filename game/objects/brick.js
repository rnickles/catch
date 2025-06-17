import { GameObject, CATEGORY_DEFAULT, ALL_MASK, relativeX, relativeY } from "./gameObject.js";

export class Brick extends GameObject {
    constructor(x, y, engine) {
        super();
        const SIZE = 25;
        const brick = Matter.Bodies.rectangle(x, y, SIZE, SIZE, {
            render: {
                fillStyle: 'darkorange'
            },
            collisionFilter: {
                category: CATEGORY_DEFAULT,
                mask: ALL_MASK
            },
            restitution: 1,
            friction: 0.3,
            density: 1.0,
            // isStatic: true
        });
        Matter.Composite.add(engine.world, brick);
        // Matter.Events.on(engine, 'beforeUpdate', function() {
        //     let gravity = engine.world.gravity;
        //     Matter.Body.applyForce(brick, brick.position, {
        //         x: -gravity.x * gravity.scale * brick.mass,
        //         y: -gravity.y * gravity.scale * brick.mass
        //     });
        // });
        this.bod = brick;
        return brick;
    }
}