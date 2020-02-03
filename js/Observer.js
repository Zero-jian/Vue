class Observer {
    constructor(data) {
        this.defineObserver(data);
    }

    defineObserver(data) {
        Object.keys(data).forEach(key => {
            let value = data[key];
            let dep = new Dep();
            Object.defineProperty(data, key, {
                get() {
                    if(Watcher) {
                        dep.addSub(Watcher);
                    }
                    return value;
                },

                set(newVal) {
                    if(newVal !== value) {
                        value = newVal;
                        dep.notify();
                    }
                }
            })
        })
    }
}