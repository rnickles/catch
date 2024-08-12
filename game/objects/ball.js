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
    collisionStart(bodyThatCollided) {
        if (bodyThatCollided.gameObject instanceof Ball) {
            return;
        } else {
            const ballCollisionSound = new Audio('ballCollisionSound.mp3');
            // Calculate the velocity magnitude (speed) of the ball
            const velocity = Math.sqrt(
                this.bod.velocity.x ** 2 +
                this.bod.velocity.y ** 2
            );

            // Scale the volume based on the velocity
            // Assume a maximum volume of 1, you can adjust the scaling factor as needed
            const maxSpeed = 20; // Adjust this based on the expected maximum speed
            const volume = Math.min(1, velocity / maxSpeed); // Ensure volume is between 0 and 1

            // Set the volume of the sound
            ballCollisionSound.volume = volume;
            // ballCollisionSound.play();
            ballCollisionSound.remove();
        }
    }
}