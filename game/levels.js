import { Goal, GoodPlatform, BouncyPlatform, MovingPlatform, BadPlatform } from "./objects/platform.js"
import { Slingshot } from "./objects/slingshot.js";

function updatePosition(element, x, y) {
    let top = y;
    let left = x;
    element.style.top = top + 'px';
    element.style.left = left + 'px';
    element.style.transform = 'translateX(-50%)';
}
let description1 = document.getElementById("description1");
let description2 = document.getElementById("description2");
export function initLevel1(engine, gameState) {
    new Goal(200, 600, engine, gameState);
    gameState.dropCoords = [450, 50];
    
    description1.innerText = `Draw platforms to get 
                                a ball to the goal!`;
    updatePosition(description1, 200, 100);
    description2.innerText = `Goal`;
    updatePosition(description2, 200, 600);
}

export function initLevel2(engine, gameState) {
    new Goal(800, 600, engine, gameState);
    new GoodPlatform(400, 500, 500, 400, engine );
    gameState.dropCoords = [450, 50];
    description1.innerText = `Balls can safely roll
                                on green platforms`;
    updatePosition(description1, 200, 100);
    description2.innerText = ``;
    updatePosition(description2, 800, 200);
}

export function initLevel3(engine, gameState) {
    new Goal(200, 600, engine, gameState);
    gameState.dropCoords = [450, 50];
    new BadPlatform(350, 300, 550, 300, engine);
    description1.innerText = `Red platforms 
                                destroy balls`;
    updatePosition(description1, 250, 100);
}

export function initLevel4(engine, gameState) {
    new Goal(800, 200, engine, gameState);
    gameState.dropCoords = [150, 300]; 
    new BouncyPlatform(300, 600, 500, 600, engine);
    description1.innerText = `Purple platforms 
                                are extra bouncy`;
    updatePosition(description1, 250, 100);
}

export function initLevel5(engine, gameState) {
    new Goal(800, 200, engine, gameState);
    gameState.dropCoords = [150, 300]; 
    new Slingshot(500, 400, engine, gameState);
    description1.innerText = `You can launch a ball 
                                from a slingshot`;
    updatePosition(description1, 250, 100);
    description2.innerText = `Slingshot`;
    updatePosition(description2, 500, 400);
}

export function initLevel6(engine, gameState) {
    description1.innerText = ``;
    description2.innerText = ``;
    new Goal(250, 600, engine, gameState);
    gameState.dropCoords = [450, 50];
    new GoodPlatform(150, 500, 400, 500, engine);
    new GoodPlatform(400, 500, 400, 649, engine)
}

export function initLevel7(engine, gameState) {
    new Goal(800, 600, engine, gameState);
    gameState.dropCoords = [450, 50];
    new GoodPlatform(650, 229, 668, 833, engine);
}

// Return a list of level intialializers; 1st item is null since there is no level 0
// They all accept the same exact argumets: engine and gameState.
export function getLevelInitializers() {
    return [null, initLevel1, initLevel2, initLevel3, initLevel4, initLevel5, initLevel6, initLevel7];
}