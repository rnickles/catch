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