import { Goal, GoodPlatform, BouncyPlatform } from "./objects/platform.js"

export function initLevel1(engine, gameState) {
    new Goal(200, 800, engine, gameState);
    new BouncyPlatform(89, 630, 350, 630, engine, gameState);
    gameState.dropCoords = [450, 50];
}

export function initLevel2(engine, gameState) {
    new Goal(800, 800, engine, gameState);
    gameState.dropCoords = [450, 50];
}

export function initLevel3(engine, gameState) {
    new Goal(200, 800, engine, gameState);
    gameState.dropCoords = [450, 50];
    new GoodPlatform(89, 630, 350, 630, engine);
}

export function initLevel4(engine, gameState) {
    new Goal(800, 800, engine, gameState);
    gameState.dropCoords = [450, 50];
    new GoodPlatform(650, 229, 668, 833, engine);

}

export function initLevel5(engine, gameState) {
    let goal = new Goal(200, 800, engine, gameState);
    gameState.dropCoords = [450, 50];
    new GoodPlatform(83, 730, 431, 783, engine);
    new GoodPlatform(331, 732, 321, 849, engine)
}

// Return a list of level intialializers; 1st item is null since there is no level 0
// They all accept the same exact argumets: engine and gameState.
export function getLevelInitializers() {
    return [null, initLevel1, initLevel2, initLevel3, initLevel4, initLevel5];
}