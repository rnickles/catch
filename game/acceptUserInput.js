import { Platform } from './objects/platform.js';

export function acceptUserInput(engine, renderer, gameState) {
    let startX, startY, endX, endY;
    let isDragging = false;
    let didRelease = false;
    let activeSlingshot = null;
    let maxSpeed = 5; // Maximum speed of the ball
    let initialPosition = null; // Initial position of the ball

    // Create mouse and mouse constraint
    const mouse = Matter.Mouse.create(renderer.canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });

    Matter.Composite.add(engine.world, mouseConstraint);

    // Function to create a new platform
    function createPlatform(x1, y1, x2, y2) {
        new Platform(x1, y1, x2, y2, engine);
    }

    // Event listeners for mouse events
    Matter.Events.on(mouseConstraint, 'mousedown', function(event) {
        const mousePosition = event.mouse.position;
        startX = mousePosition.x;
        startY = mousePosition.y;
        // Define a small region around the mouse
        let region = {
            min: { x: mousePosition.x - 1, y: mousePosition.y - 1 },
            max: { x: mousePosition.x + 1, y: mousePosition.y + 1 }
        };

        // Query for bodies in the region
        let bodies = Matter.Query.region(Matter.Composite.allBodies(engine.world), region);
        // Check if an active slingshot is in the list of bodies under the mouse
        if ( gameState.activeSlingshots.length > 0  && bodies.indexOf(gameState.activeSlingshots[0].elastic.bodyB) !== -1) {
            isDragging = true;
            activeSlingshot = gameState.activeSlingshots[0];
            initialPosition = activeSlingshot.elastic.bodyB.position;
        }
    });

    Matter.Events.on(mouseConstraint, 'mouseup', function(event) {
        const mousePosition = event.mouse.position;
        endX = mousePosition.x;
        endY = mousePosition.y;
        if (isDragging) {
            isDragging = false;
            didRelease = true;
        }
        else {
            createPlatform(startX, startY, endX, endY);
        }
    });

    // Event listener to release the ball
    Matter.Events.on(engine, 'afterUpdate', function() {
        if (didRelease) {
            let ball = activeSlingshot.elastic.bodyB;
            // Limit maximum speed of current ball.
            if (Matter.Body.getSpeed(ball) > maxSpeed) {
                Matter.Body.setSpeed(ball, maxSpeed);
            }
            // Remove slingshot from the list of active slingshots
            let index = gameState.activeSlingshots.indexOf(activeSlingshot);
            if (index > -1) {
                gameState.activeSlingshots.splice(index, 1);
            }
            activeSlingshot.release();
            activeSlingshot = null;
            didRelease = false;
            initialPosition = null;
        }
    });

    // Adjust the canvas size when the window is resized
    window.addEventListener('resize', function() {
        renderer.canvas.width = window.innerWidth;
        renderer.canvas.height = window.innerHeight;
    });

    // Make sure the mouse is in sync with the rendering
    renderer.mouse = mouse;
}
