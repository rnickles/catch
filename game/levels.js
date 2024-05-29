import { Goal, GoodPlatform } from "./objects/platform.js"

export function init_level1(engine, game_state) {
    new Goal(200, 800, engine, game_state);
    game_state.drop_coords = [450, 50];
}

export function init_level2(engine, game_state) {
    new Goal(800, 800, engine, game_state);
    game_state.drop_coords = [450, 50];
}

export function init_level3(engine, game_state) {
    new Goal(200, 800, engine, game_state);
    game_state.drop_coords = [450, 50];
    new GoodPlatform(89, 630, 350, 630, engine);
}

export function init_level4(engine, game_state) {
    new Goal(800, 800, engine, game_state);
    game_state.drop_coords = [450, 50];
    new GoodPlatform(650, 229, 668, 833, engine);

}

export function init_level5(engine, game_state) {
    let goal = new Goal(200, 800, engine, game_state);
    game_state.drop_coords = [450, 50];
    new GoodPlatform(83, 730, 431, 783, engine);
    new GoodPlatform(331, 732, 321, 849, engine)
}

// Return a list of level intialializers; 1st item is null since there is no level 0
// They all accept the same exact argumets: engine and game_state.
export function getLevelInitializers() {
    return [null, init_level1, init_level2, init_level3, init_level4, init_level5];
}