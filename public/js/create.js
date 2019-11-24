// 全局创建组件实例函数
import Vue from 'vue'

export default function(Component, props){
    // 创建vue实例
    const instance = new Vue({
        render: h => { // vdom
            return h(Component, {props})
        }
    }).$mount();

    // 添加方法
    const comp = instance.$children[0];
    comp.append = function () {
        // 生成的dom追加至body中
        document.body.appendChild(instance.$el);
    }
    comp.remove = function () {
        document.body.removeChild(instance.$el)
        instance.$destroy();
    }
    comp.show = function () {
        instance.$el.style.display = 'block'
    }
    comp.hide = function () {
        instance.$el.style.display = 'none'
    }

    return comp;
}