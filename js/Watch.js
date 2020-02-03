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
        //逐级查找对象的值
        let obj = this.vue;
        let exp = this.exp.split('.');
        for(let i = 0, len = exp.length; i < len; i++) {
            if(!obj) return;
            obj = obj[exp[i]];
        }
        return obj;
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