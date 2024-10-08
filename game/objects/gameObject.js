export const CATEGORY_MOUSE = 0x0001; // Binary: 0001
export const CATEGORY_DEFAULT = 0x0002; // Binary: 0010
export const ALL_MASK = 0xFFFF;

function relativeDimension(a , b) {
    return (a / b) * b;
}
export function relativeX(x) {
    return relativeDimension(x, window.innerWidth);
}
export function relativeY(y) {
    return relativeDimension(y, window.innerHeight);
}
 
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