class Watch {
    constructor(vue, exp, cb) {
        this.vue = vue;
        this.exp = exp;
        this.cb = cb;
        Watcher = this;
        this.value = this.get();
        Watcher = null;
    }

    get() {
        let value = this.vue[this.exp];
        return value;
    }

    update() {
        let newVal = this.get();
        let val = this.value;
        if(newVal !== val) {
            this.value = newVal;
            this.cb.call(this.vue, newVal);
        }
    }
}