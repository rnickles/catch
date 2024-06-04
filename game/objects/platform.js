import { GameObject } from "./gameObject.js";

// General platform class; can be at any angle
// specify the endpoints
export class Platform extends GameObject {
    constructor(x1, y1, x2, y2, engine, color='grey') {
        super();
        // Calculate length and angle of the platform
        const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        const angle = Math.atan2(y2 - y1, x2 - x1);

        // Calculate the midpoint of the line
        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2;

        // Create the platform body
        const platform = Matter.Bodies.rectangle(midX, midY, length, 10, {
            angle: angle,
            isStatic: true,
            render: {
                fillStyle: color
            }
        });

        // Add the platform to the world
        Matter.Composite.add(engine.world, platform);
        this.bod = platform;
    }
}

export class GoodPlatform extends Platform {
    constructor(x1, y1, x2, y2, engine) {
        super(x1, y1, x2, y2, engine, 'green');
    }
}

export class Goal extends Platform {
    #gameState
    constructor(x, y, engine, gameState) {
        super(x-100, y, x+100, y, engine, 'blue');
        this.#gameState = gameState;
    }
    collisionStart(bodyThatCollided) {
        // the only way this can be called is if a ball collides with it
        this.#gameState.levelComplete = true;
        this.bod.render.fillStyle = 'white';
    }
}

export class BouncyPlatform extends Platform {
    constructor(x1, y1, x2, y2, engine, gameState) {
        super(x1, y1, x2, y2, engine, 'purple');
    }
    collisionEnd(bodyThatCollided) {
        let velocity = bodyThatCollided.velocity;
        let factor = 5;
        Matter.Body.setVelocity(bodyThatCollided, {
            x: velocity.x * factor,
            y: velocity.y * factor
        });
    }
}

export class MovingPlatform extends Platform {
    constructor(x1, y1, x2, y2, engine, gameState) {
        super(x1, y1, x2, y2, engine);
        this.moveRight = true;
    }
    update() {
        let platformSpeed = 20;
        if (this.moveRight) {
            Matter.Body.setPosition(this.bod, {
                x: this.bod.position.x + platformSpeed,
                y: this.bod.position.y 
            });
        
            // Reverse direction when the platform reaches the right edge
            if (this.bod.position.x + (this.bod.bounds.max.x - this.bod.bounds.min.x) / 2 >= window.innerWidth) {
                this.moveRight = false;
            }
        } else {
            Matter.Body.setPosition(this.bod, {
                x: this.bod.position.x - platformSpeed,
                y: this.bod.position.y 
            });

            // Reverse direction when the platform reaches the left edge
            if (this.bod.position.x - (this.bod.bounds.max.x - this.bod.bounds.min.x) / 2 <= 0) {
                this.moveRight = true;
            }
        }
    }
}