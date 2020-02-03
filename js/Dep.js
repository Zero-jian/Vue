let Watcher = null;
let id = 0;

class Dep {
    constructor() {
        this.subs = [];
        this.id = id++;
    }

    addSub(sub) {
        this.subs.push(sub);
    }

    notify() {
        this.subs.forEach(i => i.update());
    }
}