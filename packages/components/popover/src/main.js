import { on, off } from '../../../utils/dom' 
export default {
  name: 'swPopover',
  data () {
    return {
      popoverStyle: {},
      arrowStyle: {},
      show: false,
      referenceElm: {}
    }
  },
  model: {
    prop: 'value',
    event: 'update'
  },
  props: {
    value: {
      type: Boolean
    },
    title: {
      type: String,
      default: '标题'
    },
    content: {
      type: String,
      default: '内容内容内容内容内容'
    },
    placement: {
      type: String
    },
    trigger: {
      type: String,
      default: 'click',
      validator: value => ['click', 'focus', 'hover', 'manual'].indexOf(value) > -1
    }
  },
  computed: {
    showValue: {
      get: function () {
        return this.value
      },
      set: function () {
      }
    },
    showStyle() {
      if (this.trigger !== 'manual') {
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
      } else {
        if (this.showValue) {
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
    }
  },
  methods: {
    getStyle(popoverElm, referenceElm) {
      switch (this.placement) {
        case 'top-start':
          this.popoverStyle = {
            top: '-' + (popoverElm.offsetHeight + 10) + 'px'
          }
          this.arrowStyle = {
            left: (referenceElm.offsetWidth / 2 - 5) + 'px'
          }
          break;
        case 'top':
          this.popoverStyle = {
            top: '-' + (popoverElm.offsetHeight + 10) + 'px',
            left: (referenceElm.offsetWidth - popoverElm.offsetWidth) / 2 + 'px'
          }
          this.arrowStyle = {
            left: (popoverElm.offsetWidth / 2 - 5) + 'px'
          }
          break
        case 'bottom-start': 
          this.popoverStyle = {
            top: (referenceElm.offsetHeight + 10) + 'px'
          }
          this.arrowStyle = {
            left: (referenceElm.offsetWidth / 2 - 5) + 'px'
          }
          break 
        case 'bottom':
          this.popoverStyle = {
            top: (referenceElm.offsetHeight + 10) + 'px',
            left: (referenceElm.offsetWidth - popoverElm.offsetWidth) / 2 + 'px'
          }
          this.arrowStyle = {
            left: (popoverElm.offsetWidth / 2 - 5) + 'px'
          }
          break
        case 'right-start':
          this.popoverStyle = {
            left: (referenceElm.offsetWidth + 10) + 'px',
          }
          this.arrowStyle = {
            top: (referenceElm.offsetHeight / 2 - 5) + 'px'
          }
          break  
        case 'right':
          this.popoverStyle = {
            left: (referenceElm.offsetWidth + 10) + 'px',
            top: (referenceElm.offsetHeight - popoverElm.offsetHeight) / 2 + 'px'
          }
          this.arrowStyle = {
            top: (popoverElm.offsetHeight / 2 - 5) + 'px'
          } 
          break 
        case 'left-start':
          this.popoverStyle = {
            right: (referenceElm.offsetWidth + 10) + 'px',
          }
          this.arrowStyle = {
            top: (referenceElm.offsetHeight / 2 - 5) + 'px'
          }
          break
        case 'left':
          this.popoverStyle = {
            right: (referenceElm.offsetWidth + 10) + 'px',
            top: (referenceElm.offsetHeight - popoverElm.offsetHeight) / 2 + 'px'
          }
          this.arrowStyle = {
            top: (popoverElm.offsetHeight / 2 - 5) + 'px'
          } 
          break        
        default:
          break;
      }
    },
    handleClick() {
      this.show = !this.show
    },
    handleMouseEnter() {
      this.show = true
    },
    handleMouseLeave() {
      this.show = false
    },
    doShow() {
      this.show = true
    },
    doClose() {
      this.show = false
    },
    handleManual() {
      this.showValue = !this.showValue
      this.$emit("update", this.showValue);
    }
  },
  mounted () {
    let popoverElm = this.$refs.popover
    let referenceElm = this.referenceElm = this.$scopedSlots.reference()[0].elm
    this.getStyle(popoverElm, referenceElm)
    if(this.trigger === 'manual'){
      on(referenceElm, 'click', this.handleManual);
    }
    if (this.trigger === 'click') {
      on(referenceElm, 'click', this.handleClick);
    }
    if(this.trigger === 'hover'){
      on(referenceElm, 'mouseenter', this.handleMouseEnter)
      on(referenceElm, 'mouseleave', this.handleMouseLeave);
    }
    if(this.trigger === 'focus'){
      if (referenceElm.querySelector('input, textarea')) {
        on(referenceElm, 'focusin', this.doShow);
        on(referenceElm, 'focusout', this.doClose);
      } else {
        on(referenceElm, 'mousedown', this.doShow);
        on(referenceElm, 'mouseup', this.doClose);
      }
    }
  },
  destroyed () {
    const reference = this.referenceElm;
    off(reference, 'click', this.handleClick);
    off(reference, 'mouseup', this.doClose);
    off(reference, 'mousedown', this.doShow);
    off(reference, 'focusin', this.doShow);
    off(reference, 'focusout', this.doClose);
    off(reference, 'mousedown', this.doShow);
    off(reference, 'mouseup', this.doClose);
    off(reference, 'mouseleave', this.handleMouseLeave);
    off(reference, 'mouseenter', this.handleMouseEnter);
    off(document, 'click', this.handleManual);
  },
  render(h) {
    return h('div',{
      class: 'sw-popover-contain',
    }, [ h('div', 
            {
              staticClass: 'sw-popover',
              class: 'sw-popover-show',
              ref: 'popover',
              style: Object.assign(this.popoverStyle, this.showStyle)
        }, [ this.title  
              ? h('div', {
                class: 'sw-popover-title'
              }, this.title)
              : '', 
             this.$scopedSlots.default === void 0
             ? h('div', {
                class: 'sw-popover-content'
             }, this.content || '' )
              : this.$scopedSlots.default(),
             h('div',{
                staticClass: 'sw-popover-arrow',
                class: {
                'sw-popover-arrow-top': this.placement.indexOf('top') >= 0 ? true : false,
                'sw-popover-arrow-bottom': this.placement.indexOf('bottom') >= 0 ? true : false,
                'sw-popover-arrow-right': this.placement.indexOf('right') >= 0 ? true : false,
                'sw-popover-arrow-left': this.placement.indexOf('left') >= 0 ? true : false,
                },
                style: this.arrowStyle
             })
            ]), 
        this.$scopedSlots.reference === void 0 
        ? h()
        : this.$scopedSlots.reference()
      ]) 
  }
}