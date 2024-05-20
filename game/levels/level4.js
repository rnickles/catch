import { Goal, Platform } from "../objects/platform.js"

export function init_level4(engine, game_state) {
    let goal = new Goal(800, 800, engine, game_state);
    game_state.drop_coords = [450, 50];
    game_state.goal = goal;
    new Platform(650, 229, 668, 833, engine);

}