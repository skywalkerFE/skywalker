import swButton from '../../button'
export default {
  name: 'swModal',
  components: {
    swButton
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '基本用法title'
    },
    width: {
      type: String,
      default: '40%'
    }
  },
  computed: {
    style() {
      if (this.show) {
        return {
          zIndex: 999,
          opacity: 1
        }
      } else {
        return {
          zIndex: -10,
          opacity: 0
        }
      }
    }
  },
  methods: {
    handleCancel() {
      this.$emit('cancel')
    },
    handleConfirm() {
      this.$emit('confirm')
    },
  },
  render(h) {
    return h('div',{
      staticClass: 'sw-modal-mask',
      style: this.style,
      on: {
        click: this.handleCancel
      } 
    }, [ h('div', { 
              staticClass: 'sw-modal',
              class: {
                showModal: this.show,
                hideModal: !this.show
              },
              style: {
                width: this.width
              },
              on: {
                click: event => {
                  event.stopPropagation()
                }
              }
            },
              [ this.$scopedSlots.header === void 0 
                ? h('div', 
                      {
                        class: 'sw-modal-title'
                      }, [ h('span',
                              {
                                class: 'sw-modal-title-text'
                              },
                              this.title
                            ),
                           h('span',
                              {
                                class: 'sw-modal-close-icon',
                                on: {
                                  click: ()=>{
                                    event.stopPropagation()
                                    this.handleCancel()
                                  }
                                }     
                              }, [
                                h('i',
                                  {
                                    class: 'material-icons',
                                  }, 
                                  'close') 
                                  ] 
                            )
                          ]
                    )
                : this.$scopedSlots.header(),
                this.$scopedSlots.content(),
                this.$scopedSlots.footer === void 0 
                ? h('div', 
                    {
                        class: 'sw-modal-footer'
                    }, 
                    [
                      h('sw-button',{
                        class: 'btn left-btn',
                        on: {
                          click: ()=>{
                            event.stopPropagation()
                            this.handleCancel()
                          }
                        }
                      }, '取消'),
                      h('sw-button',{
                        class: 'btn right-btn',
                        on: {
                          click: ()=>{
                            event.stopPropagation()
                            this.handleConfirm()
                          }
                        }
                      }, '确定')
                    ])
                : this.$scopedSlots.footer
              ]              
          )
        ]
    )
  }
}