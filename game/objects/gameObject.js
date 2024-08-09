export const CATEGORY_MOUSE = 0x0001; // Binary: 0001
export const CATEGORY_DEFAULT = 0x0002; // Binary: 0010
export const ALL_MASK = 0xFFFF;

export class GameObject {
    #bod
    constructor() {
        return
    }
    get bod() {
        return this.#bod;
    }
    set bod(bod) {
        this.#bod = bod;
        // add a back reference from body to the game object
        bod.gameObject = this;
    }
    collisionStart(bodyThatCollided) {
        return;
    }
    collisionEnd(bodyThatCollided) {
        return;
    }
    update() {
        return;
    }
}