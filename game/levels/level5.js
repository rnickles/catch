import { Goal, Platform } from "../objects/platform.js"

export function init_level5(engine, game_state) {
    let goal = new Goal(200, 800, engine, game_state);
    game_state.drop_coords = [450, 50];
    game_state.goal = goal;
    new Platform(83, 730, 431, 783, engine);
    new Platform(331, 732, 321, 849, engine)
}