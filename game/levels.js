import { Goal, GoodPlatform, BouncyPlatform, MovingPlatform, BadPlatform } from "./objects/platform.js"
import { Slingshot } from "./objects/slingshot.js";

export function initLevel1(engine, gameState) {
    new Goal(200, 600, engine, gameState);
    gameState.dropCoords = [450, 50];
    // let mp = new MovingPlatform(400,400,450,400, engine);
    // gameState.gameObjectsToUpdate.push(mp);

    new Slingshot(400, 400, engine, gameState);
    new Slingshot(700, 400, engine, gameState);

}

export function initLevel2(engine, gameState) {
    new Goal(800, 600, engine, gameState);
    gameState.dropCoords = [450, 50];
}

export function initLevel3(engine, gameState) {
    new Goal(200, 600, engine, gameState);
    gameState.dropCoords = [450, 50];
    new BadPlatform(89, 430, 350, 430, engine);
}

export function initLevel4(engine, gameState) {
    new Goal(800, 600, engine, gameState);
    gameState.dropCoords = [450, 50];
    new GoodPlatform(650, 229, 668, 833, engine);

}

export function initLevel5(engine, gameState) {
    new Goal(250, 600, engine, gameState);
    gameState.dropCoords = [450, 50];
    new GoodPlatform(150, 500, 400, 500, engine);
    new GoodPlatform(400, 500, 400, 649, engine)
}

export function initLevel6(engine, gameState) {
    new Goal(800, 600, engine, gameState);
    gameState.dropCoords = [250, 500]; 
    new BouncyPlatform(300, 600, 500, 600, engine);
}

// Return a list of level intialializers; 1st item is null since there is no level 0
// They all accept the same exact argumets: engine and gameState.
export function getLevelInitializers() {
    return [null, initLevel1, initLevel2, initLevel3, initLevel4, initLevel5, initLevel6];
}