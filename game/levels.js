import { Goal, GoodPlatform, BouncyPlatform, MovingPlatform, BadPlatform } from "./objects/platform.js"
import { Slingshot } from "./objects/slingshot.js";
import { relativeX, relativeY } from "./objects/gameObject.js";

function updateHTMLElementPosition(element, x, y) {
    let top = relativeY(y);
    let left = relativeX(x);
    element.style.top = top + 'px';
    element.style.left = left + 'px';
    element.style.transform = 'translateX(-50%)';
}
let description1 = document.getElementById("description1");
let description2 = document.getElementById("description2");
// TUTORIAL BEGIN
function initLevel1(engine, gameState) {
    new Goal(200, 600, engine, gameState);
    gameState.dropCoords = [450, 50];

    description1.innerText = `Draw platforms to get 
                                a ball to the goal!`;
    updateHTMLElementPosition(description1, 200, 100);
    description2.innerText = `Goal`;
    updateHTMLElementPosition(description2, 200, 600);
}
function initLevel2(engine, gameState) {
    new Goal(800, 600, engine, gameState);
    new GoodPlatform(400, 500, 500, 400, engine);
    gameState.dropCoords = [450, 50];
    description1.innerText = `Balls can safely roll
                                on green platforms`;
    updateHTMLElementPosition(description1, 200, 100);
    description2.innerText = ``;
    updateHTMLElementPosition(description2, 800, 200);
}
function initLevel3(engine, gameState) {
    new Goal(200, 600, engine, gameState);
    gameState.dropCoords = [450, 50];
    new BadPlatform(350, 300, 550, 300, engine);
    description1.innerText = `Red platforms 
                                destroy balls`;
    updateHTMLElementPosition(description1, 250, 100);
}
function initLevel4(engine, gameState) {
    new Goal(800, 200, engine, gameState);
    gameState.dropCoords = [150, 300];
    new BouncyPlatform(300, 600, 500, 600, engine);
    description1.innerText = `Purple platforms 
                                are extra bouncy`;
    updateHTMLElementPosition(description1, 250, 100);
}
function initLevel5(engine, gameState) {
    new Goal(800, 200, engine, gameState);
    gameState.dropCoords = [150, 300];
    new Slingshot(500, 400, engine, gameState);
    description1.innerText = `You can launch a ball 
                                from a slingshot`;
    updateHTMLElementPosition(description1, 250, 100);
    description2.innerText = `Slingshot`;
    updateHTMLElementPosition(description2, 500, 400);
}
// TUTORIAL END
// LEVELS BEGIN
function initLevel6(engine, gameState) {
    description1.innerText = ``;
    description2.innerText = ``;
    new Goal(350, 550, engine, gameState);
    gameState.dropCoords = [500, 50];
    new GoodPlatform(200, 500, 450, 500, engine);
    new GoodPlatform(450, 500, 450, 649, engine)
}
function initLevel7(engine, gameState) {
    new Goal(700, 600, engine, gameState);
    gameState.dropCoords = [450, 50];
    new GoodPlatform(550, 200, 550, 700, engine);
}
function initLevel8(engine, gameState) {
    gameState.dropCoords = [100, 400];
    new BadPlatform(400, 300, 400, 800, engine);
    new Slingshot(300, 500, engine, gameState);
    new Goal(800, 400, engine, gameState);
}
function initLevel9(engine, gameState) {
    gameState.dropCoords = [800, 400];
    let mp = new MovingPlatform(500, 300, 600, 300, engine);
    gameState.gameObjectsToUpdate.push(mp);
    new Slingshot(700, 450, engine, gameState);
    new Slingshot(500, 250, engine, gameState);
    new Goal(200, 400, engine, gameState);
}
function initLevel10(engine, gameState) {
    new Goal(700, 300, engine, gameState);
    gameState.dropCoords = [100, 100];
    new BadPlatform(500, 0, 500, 400, engine);
    new BadPlatform(500, 400, 800, 400, engine);
}

// Return a list of level intialializers; 1st item is null since there is no level 0
// They all accept the same exact argumets: engine and gameState.
export function getLevelInitializers() {
    return [
        null, 
        initLevel1, 
        initLevel2, 
        initLevel3, 
        initLevel4, 
        initLevel5, 
        initLevel6, 
        initLevel7, 
        initLevel8,
        initLevel9,
        initLevel10
    ];
}