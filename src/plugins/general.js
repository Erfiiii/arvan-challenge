import Vue from "vue";

const General = {
  install(Vue) {
    Vue.directive('clickOutside', {
      bind:(el,binding)=> {
        const bubble = binding.modifiers.bubble;
        const handler = (e)=> {
          if(bubble || (!el.contains(e.target) && el !== el.target)) {
            binding.value(e)
          }
        }

        el.__sidebarClickOutsside__ = handler;

        document.addEventListener('click', handler)
      },
      unbind: (el)=> {
        document.removeEventListener('click', el.__sidebarClickOutsside__);
        el.__sidebarClickOutsside__ = null;
      }
    })

  // Global Filters
  Vue.filter('truncate', function(value, length) {
    const valLength = value.length
    if(length) {
      return value.substring(0,length ? length : 10) + (valLength > length ? '...' : '')
    }

    return value
  })
  }
}

export default General;