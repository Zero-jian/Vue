class Complie {
    constructor(el, vue) {
        this.vue = vue;
        this.el = document.querySelector(el);
        if(this.el) {
            let fragment = this.node2Fragment(this.el);
            this.complie(fragment);
            this.el.appendChild(fragment);
        }
    }

    node2Fragment(el) {
        let fragment = document.createDocumentFragment();
        let child;
        while(child = el.firstChild) {
            fragment.appendChild(child);
        }
        return fragment;
    }

    complie(node) {
        node = node.firstChild;
        let reg = /\{\{(.*)\}\}/;
        let text = node.textContent;
        if(reg.test(text)) {
            let key = RegExp.$1;
            node.textContent = this.vue[key];
            new Watch(this.vue, key, text => {
                node.textContent = text;
            })
        }
    }
}