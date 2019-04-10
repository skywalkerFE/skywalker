// <template>
//   <div>
//     <button @click="handleBtn">click</button>
//     <transition name='sw-notification-fade'>
//       <div v-if="show" class="sw-notification">
//         <h2 class="title">
//           提示1111
//         </h2>
//         <div class="content">
//           这是一条消息
//         </div>
//         <div class="close" @click="handleBtn">
//           <i class="material-icons">close</i>
//         </div>
//       </div>
//     </transition>
//   </div>
// </template>
import Vnode, { isVNode } from '../../../utils/vdom'
export default {
  name: 'swNotification',
  data () {
    return {
      show: false,
      verticalOffset: 0,
      onClose: null,
      position: 'top-right',
      title: '',
      content: '',
      slot: null,
      background: '#fff',
      closeColor: '#909399'
    }
  },
  methods: {
    handleBtn() {
      this.show = false
      if (typeof this.onClose === 'function') {
        this.onClose();
      }
    }
  },
  computed: {
    verticalProperty() {
      return /^top-/.test(this.position) ? 'top' : 'bottom';
    },

    positionStyle() {
      return {
        [this.verticalProperty]: `${ this.verticalOffset }px`,
      };
    },
    getVnode() {
      if (isVNode(this.slot)) {
        return this.slot
      }
      console.error('Please check your Vnode writing')
      return null
    }
  },
  render(h) {
   return h('transition',{
      attrs: {
        name: 'sw-notification-fade'
      }
    }, [this.show ? h('div', {
            class: 'sw-notification',
            style: Object.assign(this.positionStyle, { background: this.background })
          }, [
            this.getVnode ? '' : h('h2', {
              class: 'title'
            }, this.title),
            this.getVnode ? this.getVnode : h('div', {
              class: 'content'
            },this.content),
            h('div', {
              class: 'close',
              style: { color: this.closeColor },
            }, [h('div', {
                  class: 'material-icons',
                  on: {
                    click: ()=>{
                      this.handleBtn()
                    }
                  }
                }, 'close')])
          ])
    
        : void 0] )
  }
}

