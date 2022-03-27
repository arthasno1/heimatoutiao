export default {
  install(Vue) {
    Vue.directive('fofo', {
      inserted(el) {
        el = el.querySelector('input')
        el.focus()
      }
    })
  }
}
