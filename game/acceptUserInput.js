import { Platform } from './objects/platform.js';

export function acceptUserInput(engine, renderer, gameState) {
    let startX, startY, endX, endY;
    let isDragging = false;
    let didRelease = false;
    let activeSlingshot = null;
    let maxSpeed = 5; // Maximum speed of the ball
    let initialPosition = null;

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
    function onActiveSlingshot(mousePosition) {
        // Define a small region around the mouse
        let box_side_length = 25;
        let region = {
            min: { x: mousePosition.x - box_side_length, y: mousePosition.y - box_side_length },
            max: { x: mousePosition.x + box_side_length, y: mousePosition.y + box_side_length }
        };
        // Query for bodies in the region
        let bodies = Matter.Query.region(Matter.Composite.allBodies(engine.world), region);
        // Check if the mouse is on any active slingshot
        for (const slingshot of gameState.activeSlingshots) {
            if (bodies.indexOf(slingshot.elastic.bodyB) != -1) {
                return slingshot;
            }
        }
        return false;
    } 
    // Event listeners for mouse events
    Matter.Events.on(mouseConstraint, 'mousedown', function(event) {
        const mousePosition = event.mouse.position;
        startX = mousePosition.x;
        startY = mousePosition.y;
        
        // Check if an active slingshot is in the list of bodies under the mouse
        activeSlingshot = onActiveSlingshot(mousePosition);
        if (activeSlingshot) {
            isDragging = true;
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
