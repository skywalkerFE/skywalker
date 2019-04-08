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

export default {
  name: 'swNotification',
  data () {
    return {
      show: false
    }
  },
  methods: {
    handleBtn() {
      this.show = !this.show
    }
  },
  render(h) {
   return h('transition',{
      attrs: {
        name: 'sw-notification-fade'
      }
    }, [this.show ? h('div', {
            class: 'sw-notification',
          }, [
            h('h2', {
              class: 'title'
            }, '提示'),
            h('div', {
              class: 'content'
            },'这是一段内容'),
            h('div', {
              class: 'close'
            }, [h('div', {
                  class: 'material-icons',
                  on: {
                    click: ()=>{
                      this.handleBtn()
                    }
                  }
                }, 'close')])
          ])
    
        : ''] )
  }
}

