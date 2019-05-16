import { css } from '../../../utils/dom.js'
import { position } from '../../../utils/event.js'

function showRipple(evt, el, ctx, forceCenter) {
  if (ctx.modifiers.stop === true) {
    evt.stopPropagation()
  }

  let { center, color } = ctx.modifiers

  center = center === true || forceCenter === true

  const node = document.createElement('span')
  const innerNode = document.createElement('span')
  const pos = position(evt)
  const { left, top, width, height } = el.getBoundingClientRect()
  const diameter = Math.sqrt(width * width + height * height)
  const radius = diameter / 2
  const centerX = `${(width - diameter) / 2}px`
  const x = center ? centerX : `${pos.left - left - radius}px`
  const centerY = `${(height - diameter) / 2}px`
  const y = center ? centerY : `${pos.top - top - radius}px`
  let timer = setTimeout(() => {
    innerNode.classList.add('sw-ripple__inner--enter')
    innerNode.style.transform = `translate3d(${centerX}, ${centerY}, 0) scale3d(1, 1, 1)`
    innerNode.style.opacity = 0.2

    timer = setTimeout(() => {
      innerNode.classList.remove('sw-ripple__inner--enter')
      innerNode.classList.add('sw-ripple__inner--leave')
      innerNode.style.opacity = 0

      timer = setTimeout(() => {
        node && node.remove()
        ctx.abort = void 0
      }, 275)
    }, 250)
  }, 50)

  innerNode.className = 'sw-ripple__inner'
  css(innerNode, {
    height: `${diameter}px`,
    width: `${diameter}px`,
    transform: `translate3d(${x}, ${y}, 0) scale3d(0.2, 0.2, 1)`,
    opacity: 0
  })
  if (color) { css(node, { color: color }) }
  node.className = `sw-ripple`
  node.appendChild(innerNode)
  el.appendChild(node)

  ctx.abort = () => {
    node && node.remove()
    clearTimeout(timer)
  }
}

function updateCtx(ctx, { value, modifiers, arg }) {
  ctx.disabled = value && value.disabled || false

  if (!ctx.disabled) {
    ctx.modifiers = Object(value) === value
      ? {
        stop: value.stop === true || modifiers.stop === true,
        center: value.center === true || modifiers.center === true,
        color: value.color || arg
      }
      : {
        stop: modifiers.stop,
        center: modifiers.center,
        color: arg
      }
  }
}

export default {
  name: 'ripple',
  inserted(el, binding) {
    const ctx = {
      modifiers: {},
      click(evt) {
        if (!ctx.disabled) {
          showRipple(evt, el, ctx)
        }
      },
      keyup(evt) {
        if (!ctx.disabled && evt.keyCode === 13) {
          showRipple(evt, el, ctx, true)
        }
      }
    }

    updateCtx(ctx, binding)
    if (el.rippleCtx) {
      el.rippleCtxOld = el.rippleCtx
    }
    el.rippleCtx = ctx
    el.addEventListener('click', ctx.click, false)
    el.addEventListener('keyup', ctx.keyup, false)
  },
  update(el, binding) {
    el.rippleCtx !== void 0 && updateCtx(el.rippleCtx, binding)
  },
  unbind(el) {
    const ctx = el.rippleCtxOld || el.rippleCtx

    if (ctx !== void 0) {
      ctx.abort !== void 0 && ctx.abort()
      el.removeEventListener('click', ctx.click, false)
      el.removeEventListener('keyup', ctx.keyup, false)
      delete el[el.rippleCtxOld ? 'rippleCtxOld' : 'rippleCtx']
    }
  }
}