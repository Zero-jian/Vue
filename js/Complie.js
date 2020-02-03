class Complie {
    constructor(el, vue) {
        this.vue = vue;
        //获取节点
        this.el = document.querySelector(el);
        if(this.el) {
            //创建虚拟节点
            let fragment = this.node2Fragment(this.el);
            //把节点进行循环，初始化节点属性
            this.complie(fragment);
            this.el.appendChild(fragment);
        }
    }

    node2Fragment(el) {
        //创建虚拟节点
        let fragment = document.createDocumentFragment();
        let child;
        //循环把所有节点都添加到虚拟节点上
        while(child = el.firstChild) {
            fragment.appendChild(child);
        }
        return fragment;
    }

    complie(el) {
        let child = el.childNodes;
        let exp = /\{\{(.*)\}\}/;
        child.forEach(node => {
            //遍历所有虚拟节点里面的所有节点
            //获取nodeType 1为html节点 3为文本节点
            let type = node.nodeType;
            //获取文本的内容
            let content = node.textContent;
            if(type == 1) {
                //html节点
                this.complieElement(node);
            } else if(type == 3 && exp.test(content)) {
                //文本节点
                //exp.test(content)正则匹配{{title}}里面的title属性
                this.complieText(node, RegExp.$1);
            }
        })
    }

    complieText(node, matchName) {
        //node为匹配到的文本节点 
        //matchName为匹配到的title属性
        //对文本节点进行节点操作
        node.textContent = this.vue[matchName];
        //对DOM节点进行监听
        new Watch(this.vue, matchName, text => {
            node.textContent = text;
        })
    }

    complieElement(node) {
        //对html节点进行初始化
        //首先获取节点里面的全部attribute属性
        let attr = node.attributes;
        //attr是对象，不能使用forEach遍历，但拥有length属性，所以需要转换一下
        //[].slice === Array.slice
        [].slice.call(attr).forEach(key => {
            let name = key.name;
            //筛选出'v-'开头的属性
            if(name.indexOf('v-') === 0) {
                //获取v-model里面绑定的值
                let exp = key.value;
                //获取Vue实例上的值
                let value = this.vue[exp];
                //初始化输入框的值
                node.value = value;
                //添加绑定事件
                node.addEventListener('input', e => {
                    let newVal = e.target.value;
                    if(newVal === value) return;
                    //修改属性的值
                    this.vue[exp] = newVal;
                })
                //清除v-model属性
                node.removeAttribute(name);
            }
        })
    }
}