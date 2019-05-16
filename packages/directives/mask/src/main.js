const showMask = ctx => {
  if (!ctx.disabled && !ctx.stay) {
    ctx.node.classList.remove('invisible')
  }
}
const hideMask = ctx => {
  if (!ctx.disabled && !ctx.stay) {
    ctx.node.classList.add('invisible')
  }
}
const disableMask = ctx => {
  if (ctx.disabled && !ctx.stay) {
    ctx.node.classList.add('invisible')
  }
}
const stayMask = ctx => {
  if (ctx.stay) {
    ctx.node.classList.remove('invisible')
  }
}
const colorMask = ctx => {
  ctx.node.style.color = ctx.color
}
const getDisabled = value => value !== void 0 && (value.disabled === true || false)
const getStay = value => value !== void 0 && (value.stay === true || false)
const getColor = value => value !== void 0 && value.color || void 0
const initMask = (el, binding) => {
  const node = document.createElement('div')
  const ctx = {
    node: node,
    disabled: getDisabled(binding.value),
    stay: getStay(binding.value),
    color: getColor(binding.value),
    showMask: () => {
      showMask(ctx)
    },
    hideMask: () => {
      hideMask(ctx)
    }
  }

  ctx.node.classList.add('sw-mask')
  disableMask(ctx)
  stayMask(ctx)
  colorMask(ctx)
  hideMask(ctx)
  el.maskCtx = ctx
}

export default {
  name: 'mask',
  bind(el, binding) {
    initMask(el, binding)
    el.appendChild(el.maskCtx.node)
    el.addEventListener('mouseover', el.maskCtx.showMask, false)
    el.addEventListener('mouseout', el.maskCtx.hideMask, false)
  },
  update(el, binding) {
    el.maskCtx.disabled = getDisabled(binding.value)
    if (getDisabled(binding.oldValue) !== el.maskCtx.disabled) {
      disableMask(el.maskCtx)
    }

    el.maskCtx.stay = getStay(binding.value)
    if (getStay(binding.oldValue) !== el.maskCtx.stay) {
      stayMask(el.maskCtx)
    }

    el.maskCtx.color = getColor(binding.value)
    if (getColor(binding.oldValue) !== el.maskCtx.color) {
      colorMask(el.maskCtx)
    }
  },
  unbind(el) {
    if (el.maskCtx) {
      el.maskCtx.node.remove()
      el.removeEventListener('mouseover', el.maskCtx.showMask, false)
      el.removeEventListener('mouseout', el.maskCtx.hideMask, false)
      delete el.maskCtx
    }
  }
}