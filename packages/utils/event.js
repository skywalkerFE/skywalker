export function position(e) {
  if (e.touches && e.touches[0]) {
    e = e.touches[0]
  } else if (e.changedTouches && e.changedTouches[0]) {
    e = e.changedTouches[0]
  }

  return {
    top: e.clientY,
    left: e.clientX
  }
}

export function getEventPath(e) {
  if (e.path) {
    return e.path
  }
  if (e.composedPath) {
    return e.composedPath()
  }

  const path = []
  let el = e.target

  while (el) {
    path.push(el)

    if (el.tagName === 'HTML') {
      path.push(document)
      path.push(window)
      return path
    }

    el = el.parentElement
  }
}

export function stop(e) {
  e.stopPropagation()
}

export function prevent(e) {
  e.preventDefault()
}

export function stopAndPrevent(e) {
  e.preventDefault()
  e.stopPropagation()
}

export default {
  position,
  getEventPath,
  stop,
  prevent,
  stopAndPrevent
}