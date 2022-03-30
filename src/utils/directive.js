export default {
  install(Vue) {
    Vue.directive('fofo', {
      inserted(el) {
        if (el.nodeName === 'INPUT' || el.nodeName === 'TEXTAREA') {
          // 如果直接是input标签/textarea标签
          el.focus()
        } else {
          // 指令在van-search组件身上, 获取的是组件根标签div, 而input在标签内
          const inp = el.querySelector('input')
          const textArea = el.querySelector('textarea')
          // 如果找到了
          if (inp) inp.focus()
          if (textArea) textArea.focus()
        }
      }
    })
  }
}
