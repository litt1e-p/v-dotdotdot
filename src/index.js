import Dotdotdot from './lib/index.js'

Dotdotdot.install = function (Vue, defaultOpts) {
  Vue.directive('dotdotdot', {
    bind: function (el, binding, vnode) {
      if (el.dotdotdot) {
        el.dotdotdot.update(el, binding.value)
      } else {
        el.dotdotdot = new Dotdotdot(el, binding.value, defaultOpts)
      }
    },
    update (el, binding, vnode) {
      if (!el.dotdotdot) {
        return
      }
      el.dotdotdot.update(el, binding.value, vnode)
    },
    unbind (el) {
      el.dotdotdot.destroy()
    }
  })
}

export default Dotdotdot
export { Dotdotdot }
