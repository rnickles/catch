import { Platform } from './objects/platform.js';

export function acceptUserInput(engine, renderer, game_state) {
    let startX, startY, endX, endY;

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
        const distance = pythagorasDistance(x1, y1, x2, y2);
        game_state.total_platform_used += distance;
        console.log(`${x1}, ${y1}, ${x2}, ${y2}`);
        // document.getElementById('total_platform_used').innerText = 'Total Platform Used: ' + game_state.total_platform_used.toFixed(0);
    }

    // Calculate distance using the Pythagorean theorem
    function pythagorasDistance(x1, y1, x2, y2) {
        const a = x2 - x1;
        const b = y2 - y1;
        return Math.sqrt(a * a + b * b);
    }

    // Event listeners for mouse events
    Matter.Events.on(mouseConstraint, 'mousedown', function(event) {
        const mousePosition = event.mouse.position;
        startX = mousePosition.x;
        startY = mousePosition.y;
    });

    Matter.Events.on(mouseConstraint, 'mouseup', function(event) {
        const mousePosition = event.mouse.position;
        endX = mousePosition.x;
        endY = mousePosition.y;
        createPlatform(startX, startY, endX, endY);
    });

    // Adjust the canvas size when the window is resized
    window.addEventListener('resize', function() {
        engine.render.canvas.width = window.innerWidth;
        engine.render.canvas.height = window.innerHeight;
    });

    // Make sure the mouse is in sync with the rendering
    renderer.mouse = mouse;
}
