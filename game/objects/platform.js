// General platform class; can be at any angle
// specify the endpoints
export class Platform {
    constructor(x1, y1, x2, y2, engine, color=null) {
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
    }
}

export class GoodPlatform extends Platform {
    constructor(x1, y1, x2, y2, engine) {
        super(x1, y1, x2, y2, engine, 'green');
    }
}

// Strictly flat platforms; technically not needed cause can make horizontal platforms with Platform,
// but the syntax is easier:
// easier to specify a single point 
// no need for atan or sqrt or caluculating midpoints
export class HorizontalPlatform {
    #bod
    constructor(x, y, width, height, engine) {
        // matter stuff
        // create a matter body
        let bod = Matter.Bodies.rectangle(x, y, width, height, { 
            isStatic: true,
            render: {
                fillStyle: 'blue'
            } 
        });
        // add it to the physics world
        Matter.Composite.add(engine.world, bod);
        this.#bod = bod;
    }
    get bod() {
        return this.#bod;
    }
}

export class Goal extends HorizontalPlatform {
    #detectors
    #game_state
    constructor(x, y, engine, game_state) {
        super(x, y, 100, 10, engine);
        this.#detectors = [];
        this.#game_state = game_state;
    }
    update() {
        for (let detector of this.#detectors) {
            if (Matter.Detector.collisions(detector).length !== 0) {
                this.#game_state.level_complete = true;
                this.bod.render.fillStyle = 'white';
            }
        }
    }
    addDetector(gObject) {
        this.#detectors.push(Matter.Detector.create({bodies: [this.bod, gObject.bod]}));
    } 
}