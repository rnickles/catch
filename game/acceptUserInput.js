import { Platform } from './objects/platform.js'

export function acceptUserInput(engine, game_state) {
    // accept user input
    let startX, startY, endX, endY;

    function getCoordinates(event) {
        if (event.touches) {
            return {
                x: event.touches[0].clientX,
                y: event.touches[0].clientY
            };
        } else {
            return {
                x: event.clientX,
                y: event.clientY
            };
        }
    }
    function pythagorasDistance(x1, y1, x2, y2) {
        let a = x2 - x1;
        let b = y2 - y1;
        return Math.sqrt(a*a + b*b);
    }

    document.addEventListener('mousedown', function(event) {
        const coords = getCoordinates(event);
        startX = coords.x;
        startY = coords.y;
    });

    document.addEventListener('mouseup', function(event) {
        const coords = getCoordinates(event);
        endX = coords.x;
        endY = coords.y;
        console.log(`${startX}, ${startY}, ${endX}, ${endY}`);
        game_state.total_platform_used += pythagorasDistance(startX, startY, endX, endY);
        // document.getElementById('total_platform_used').innerText = 'Total Platform Used: ' + game_state.total_platform_used.toFixed(0);
        new Platform(startX, startY, endX, endY, engine);
    });

    document.addEventListener('touchstart', function(event) {
        const coords = getCoordinates(event);
        startX = coords.x;
        startY = coords.y;
    });

    document.addEventListener('touchend', function(event) {
        const coords = getCoordinates(event.changedTouches[0]);
        endX = coords.x;
        endY = coords.y;
        game_state.total_platform_used += pythagorasDistance(startX, startY, endX, endY);
        // document.getElementById('total_platform_used').innerText = 'Total Platform Used: ' + game_state.total_platform_used.toFixed(0);
        new Platform(startX, startY, endX, endY, engine);
    });
}