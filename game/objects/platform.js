// General platform class; can be at any angle
// specify the endpoints
export class Platform {
    #bod
    constructor(x1, y1, x2, y2, engine, color='grey') {
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
        this.#bod = platform;
    }
    get bod() {
        return this.#bod;
    }
}

export class GoodPlatform extends Platform {
    constructor(x1, y1, x2, y2, engine) {
        super(x1, y1, x2, y2, engine, 'green');
    }
}

class AwarePlatform extends Platform {
    #detectors
    #game_state
    constructor(x1, y1, x2, y2, engine, game_state, color=null) {
        super(x1, y1, x2, y2, engine, color);
        this.#detectors = [];
        this.#game_state = game_state;
    }
    get game_state() {
        return this.#game_state
    }
    set game_state(game_state) {
        this.#game_state = game_state;
    }
    update() {
        return;
    }
    collisionDetected() {
        for (let detector of this.#detectors) {
            if (Matter.Detector.collisions(detector).length !== 0) {
                return true;
            }
        }
        return false;
    }
    addDetector(gObject) {
        this.#detectors.push(Matter.Detector.create({bodies: [this.bod, gObject.bod]}));
    } 
}

export class Goal extends AwarePlatform {
    constructor(x, y, engine, game_state) {
        super(x-100, y, x+100, y, engine, game_state, 'blue');
    }

    update() {
        if (this.collisionDetected()) {
            this.game_state.level_complete = true;
            this.bod.render.fillStyle = 'white';
        }
    }
}