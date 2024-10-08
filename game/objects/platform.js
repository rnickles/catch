import { GameObject, CATEGORY_DEFAULT, ALL_MASK, relativeX, relativeY } from "./gameObject.js";
 
// General platform class; can be at any angle
// specify the endpoints
export class Platform extends GameObject {
    constructor(x1, y1, x2, y2, engine, color='grey', isSensor=false) {
        super();
        x1 = relativeX(x1);
        y1 = relativeY(y1);
        x2 = relativeX(x2);
        y2 = relativeY(y2);
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
            isSensor: isSensor,
            render: {
                fillStyle: color
            },
            collisionFilter: {
                category: CATEGORY_DEFAULT,
                mask: ALL_MASK
            },
            restitution: 1,
            friction: 0
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
        super(x-20, y, x+20, y, engine, 'blue');
        this.#gameState = gameState;
    }
    collisionStart(bodyThatCollided) {
        // the only way this can be called is if a ball collides with it
        this.#gameState.levelComplete = true;
        this.bod.render.fillStyle = 'white';
    }
}

export class BadPlatform extends Platform {
    #engine
    constructor(x1, y1, x2, y2, engine) {
        super(x1, y1, x2, y2, engine, 'red');
        this.#engine = engine;
    }
    collisionStart(bodyThatCollided) {
        Matter.Composite.remove(this.#engine.world, bodyThatCollided);
    }
}

export class BouncyPlatform extends Platform {
    constructor(x1, y1, x2, y2, engine) {
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
    constructor(x1, y1, x2, y2, engine, xspeed, yspeed) {
        super(x1, y1, x2, y2, engine, 'orange');
        this.xspeed = xspeed;
        this.yspeed = yspeed;
    }
    update() {
        Matter.Body.setPosition(this.bod, {
            x: this.bod.position.x + this.xspeed,
            y: this.bod.position.y + this.yspeed
        });
        if (this.bod.position.x + (this.bod.bounds.max.x - this.bod.bounds.min.x) / 2 >= window.innerWidth) {
            this.xspeed *= -1
        }
        if (this.bod.position.x - (this.bod.bounds.max.x - this.bod.bounds.min.x) / 2 <= 0) {
            this.xspeed *= -1
        }
        if (this.bod.position.y + (this.bod.bounds.max.y - this.bod.bounds.min.y) / 2 >= window.innerHeight) {
            this.yspeed *= -1
        }
        if (this.bod.position.y - (this.bod.bounds.max.y - this.bod.bounds.min.y) / 2 <= 0) {
            this.yspeed *= -1
        }
    }
}