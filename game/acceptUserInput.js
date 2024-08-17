import { Platform } from './objects/platform.js';
import { CATEGORY_MOUSE, ALL_MASK } from './objects/gameObject.js';

export function acceptUserInput(engine, render, gameState) {
    let startX, startY, endX, endY;
    let isDragging = false;
    let didRelease = false;
    let activeSlingshot = null;
    let maxSpeed = 5; // Maximum speed of the ball
    let initialPosition = null;

    // Get the magnifier canvas and its context
    const magnifierCanvas = document.getElementById('magnifierCanvas');
    const magnifierCtx = magnifierCanvas.getContext('2d');

    // Set the size and zoom level of the magnifier
    const magnifierSize = 200;
    const magnifierZoom = 1;
    magnifierCanvas.width = magnifierSize;
    magnifierCanvas.height = magnifierSize;
    let showMagnifier = false;
    let temporaryPlatform = null;

    // Create mouse and mouse constraint
    const mouse = Matter.Mouse.create(render.canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            },
            collisionFilter: {
                category: CATEGORY_MOUSE,
                mask: ALL_MASK
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
        temporaryPlatform = new Platform(startX, startY, startX, startY, engine, 'gray', true);
        
        // Check if an active slingshot is in the list of bodies under the mouse
        activeSlingshot = onActiveSlingshot(mousePosition);
        if (activeSlingshot) {
            isDragging = true;
            initialPosition = activeSlingshot.elastic.bodyB.position;
        }

        // Show the magnifier when drawing starts
        magnifierCanvas.style.display = 'block';
        showMagnifier = true;
        // Position the magnifier to the right and above the cursor
        const offsetX = 100; // Offset distance from the cursor
        const offsetY = -100;
        magnifierCanvas.style.left = (mousePosition.x + offsetX) + 'px';
        magnifierCanvas.style.top = (mousePosition.y + offsetY) + 'px';
        
        // Calculate the region of the main canvas to magnify
        const zoomedRegionX = mousePosition.x - (magnifierSize / 2 / magnifierZoom);
        const zoomedRegionY = mousePosition.y - (magnifierSize / 2 / magnifierZoom);
        
        // Draw the zoomed-in region on the magnifier canvas
        magnifierCtx.clearRect(0, 0, magnifierSize, magnifierSize);
        magnifierCtx.drawImage(render.canvas, zoomedRegionX, zoomedRegionY, 
            magnifierSize / magnifierZoom, magnifierSize / magnifierZoom, 
            0, 0, magnifierSize, magnifierSize);
    });

    Matter.Events.on(mouseConstraint, 'mousemove', function(event) {
        if (showMagnifier) {
            const mousePosition = event.mouse.position;
            endX = mousePosition.x;
            endY = mousePosition.y;
            Matter.Composite.remove(engine.world, temporaryPlatform.bod);
            temporaryPlatform = new Platform(startX, startY, endX, endY, engine, 'gray', true);
            // Position the magnifier to the right of the cursor
            const offsetX = 100; // Offset distance from the cursor
            const offsetY = -100;
            magnifierCanvas.style.left = (mousePosition.x + offsetX) + 'px';
            magnifierCanvas.style.top = (mousePosition.y + offsetY) + 'px';
            
            // Calculate the region of the main canvas to magnify
            const zoomedRegionX = mousePosition.x - (magnifierSize / 2 / magnifierZoom);
            const zoomedRegionY = mousePosition.y - (magnifierSize / 2 / magnifierZoom);
            
            // Draw the zoomed-in region on the magnifier canvas
            magnifierCtx.clearRect(0, 0, magnifierSize, magnifierSize);
            magnifierCtx.drawImage(render.canvas, zoomedRegionX, zoomedRegionY, 
                magnifierSize / magnifierZoom, magnifierSize / magnifierZoom, 
                0, 0, magnifierSize, magnifierSize);
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
            Matter.Composite.remove(engine.world, temporaryPlatform.bod);
            createPlatform(startX, startY, endX, endY);
        }
        // Hide the magnifier when drawing ends
        magnifierCanvas.style.display = 'none';
        showMagnifier = false;
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
        render.canvas.width = window.innerWidth;
        render.canvas.height = window.innerHeight;
    });

    // Make sure the mouse is in sync with the rendering
    render.mouse = mouse;
}
