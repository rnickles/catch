import { Goal } from "../objects/platform.js"

export function init_level1(engine, game_state) {
    let goal = new Goal(200, 800, engine, game_state);
    game_state.drop_coords = [450, 50];
    game_state.goal = goal;
}