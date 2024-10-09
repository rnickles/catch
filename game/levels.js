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
function setupLevel(gameState) {
    gameState.gameObjectsToUpdate = [];
}
let description1 = document.getElementById("description1");
let description2 = document.getElementById("description2");
// TUTORIAL BEGIN
function initLevel1(engine, gameState) {
    setupLevel(gameState);
    new Goal(200, 300, engine, gameState);
    gameState.dropCoords = [450, 600];

    description1.innerText = `Draw platforms to get 
                                a ball to the goal!`;
    updateHTMLElementPosition(description1, 200, 100);
    description2.innerText = `Goal`;
    updateHTMLElementPosition(description2, 200, 300);
    new GoodPlatform(400, 625, 500, 625, engine);
}
function initLevel2(engine, gameState) {
    setupLevel(gameState);
    new Goal(200, 600, engine, gameState);
    gameState.dropCoords = [450, 50];
    new BadPlatform(350, 300, 550, 300, engine);
    description1.innerText = `Red platforms 
                                destroy balls`;
    updateHTMLElementPosition(description1, 250, 100);
}
// TUTORIAL END
// LEVELS BEGIN
function initLevel3(engine, gameState) {
    setupLevel(gameState);
    description1.innerText = ``;
    description2.innerText = ``;
    new Goal(350, 550, engine, gameState);
    gameState.dropCoords = [600, 550];
    new BadPlatform(200, 500, 450, 500, engine);
    new BadPlatform(450, 500, 450, 649, engine)
}
function initLevel4(engine, gameState) {
    setupLevel(gameState);
    new Goal(700, 600, engine, gameState);
    gameState.dropCoords = [450, 50];
    new BadPlatform(550, 200, 550, 700, engine);
}
function initLevel5(engine, gameState) {
    setupLevel(gameState);
    gameState.dropCoords = [100, 400];
    new BadPlatform(400, 300, 400, 800, engine);
    // new Slingshot(300, 500, engine, gameState);
    new Goal(800, 400, engine, gameState);
}
function initLevel6(engine, gameState) {
    setupLevel(gameState);
    gameState.dropCoords = [800, 400];
    let mp = new MovingPlatform(500, 300, 600, 300, engine, 0, 10);
    gameState.gameObjectsToUpdate.push(mp);
    // new Slingshot(700, 450, engine, gameState);
    // new Slingshot(500, 250, engine, gameState);
    new Goal(200, 400, engine, gameState);
}
function initLevel7(engine, gameState) {
    setupLevel(gameState);
    new Goal(700, 300, engine, gameState);
    gameState.dropCoords = [100, 100];
    new BadPlatform(500, 0, 500, 400, engine);
    new BadPlatform(500, 400, 800, 400, engine);
}
function initLevel8(engine, gameState) {
    setupLevel(gameState);
    gameState.dropCoords = [100, 400];
    // new BouncyPlatform(200, 600, 300, 600, engine);
    new BadPlatform(600, 0, 600, 150, engine);
    new BadPlatform(600, 250, 600, 800, engine);
    new Goal(700, 500, engine, gameState);
}
function initLevel9(engine, gameState) {
    setupLevel(gameState);
    gameState.dropCoords = [200, 500];
    // new Slingshot(300, 550, engine, gameState);
    // new BouncyPlatform(500, 400, 500, 300, engine);
    new Goal(100, 100, engine, gameState);
}
function initLevel10(engine, gameState) {
    setupLevel(gameState);
    gameState.dropCoords = [200, 600];
    new Goal(700, 100, engine, gameState);
}
function initLevel11(engine, gameState) {
    setupLevel(gameState);
    gameState.dropCoords = [700, 100];
    // new BouncyPlatform(200, 600, 300, 700, engine);
    new Goal(500, 400, engine, gameState);
    new BadPlatform(400, 350, 600, 350, engine);
    new BadPlatform(400, 350, 400, 500, engine);
    new BadPlatform(600, 350, 600, 500, engine);
}
function initLevel12(engine, gameState) {
    setupLevel(gameState);
    gameState.dropCoords = [100, 100];
    new Goal(700, 700, engine, gameState);
    new BadPlatform(0, 200, 600, 200, engine);
    new BadPlatform(700, 200, 1000, 200, engine);
    new BadPlatform(0, 300, 300, 300, engine);
    new BadPlatform(400, 300, 1000, 300, engine);
    new BadPlatform(0, 400, 700, 400, engine);
    new BadPlatform(800, 400, 1000, 400, engine);
    new BadPlatform(0, 500, 200, 500, engine);
    new BadPlatform(300, 500, 1000, 500, engine);
    new BadPlatform(0, 600, 500, 600, engine);
    new BadPlatform(600, 600, 1000, 600, engine);
}
function initLevel13(engine, gameState) {
    setupLevel(gameState);
    gameState.dropCoords = [100, 100];
    new Goal(700, 700, engine, gameState);
    new BadPlatform(200, 0, 200, 200, engine);
    new BadPlatform(200, 300, 200, 1000, engine);
    new BadPlatform(300, 0, 300, 300, engine);
    new BadPlatform(300, 400, 300, 1000, engine);
    new BadPlatform(400, 0, 400, 400, engine);
    new BadPlatform(400, 500, 400, 1000, engine);
    new BadPlatform(500, 0, 500, 500, engine);
    new BadPlatform(500, 600, 500, 1000, engine);
}
function initLevel14(engine, gameState) {
    setupLevel(gameState);
    gameState.dropCoords = [700, 100];
    new Goal(100, 400, engine, gameState);
    new BadPlatform(500, 0, 500, 100, engine);
    new BadPlatform(500, 200, 500, 1000, engine);
    new BadPlatform(200, 0, 200, 200, engine);
    new BadPlatform(200, 300, 200, 1000, engine);
    new BadPlatform(300, 0, 300, 300, engine);
    new BadPlatform(300, 400, 300, 1000, engine);
    new BadPlatform(400, 0, 400, 400, engine);
    new BadPlatform(400, 600, 400, 1000, engine);
}
function initLevel15(engine, gameState) {
    setupLevel(gameState);
    gameState.dropCoords = [700, 100];
    new Goal(150, 100, engine, gameState);
    new BadPlatform(250, 0, 250, 400, engine);
    new BadPlatform(250, 400, 500, 400, engine);
    new BadPlatform(50, 0, 50, 400, engine);
}
function initLevel16(engine, gameState) {
    setupLevel(gameState);
    gameState.dropCoords = [400, 100];
    new Goal(400, 700, engine, gameState);
    // left side
    new BadPlatform(0, 200, 350, 200, engine);
    new BadPlatform(350, 200, 250, 300, engine);
    new BadPlatform(250, 300, 350, 400, engine);
    new BadPlatform(350, 400, 250, 500, engine);    
    // right side
    new BadPlatform(500, 200, 1000, 200, engine);
    new BadPlatform(500, 200, 400, 300, engine);
    new BadPlatform(400, 300, 500, 400, engine);
    new BadPlatform(500, 400, 400, 500, engine);
}
function initLevel17(engine, gameState) {
    setupLevel(gameState);
    gameState.dropCoords = [600, 100];
    new BadPlatform(150, 200, 800, 200, engine);
    new BadPlatform(150, 200, 150, 400, engine);
    new BadPlatform(150, 500, 150, 600, engine);
    new BadPlatform(150, 600, 800, 600 ,engine);
    new BadPlatform(800, 600, 800, 200, engine);

    new BadPlatform(250, 300, 450, 300, engine);
    new BadPlatform(550, 300, 700, 300, engine);
    new BadPlatform(250, 300, 250, 500, engine);
    new BadPlatform(250, 500, 700, 500, engine);
    new BadPlatform(700, 500, 700, 300, engine);

    new Goal(350, 450, engine);
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
        initLevel10,
        initLevel11,
        initLevel12,
        initLevel13,
        initLevel14,
        initLevel15,
        initLevel16,
        initLevel17
    ];
}