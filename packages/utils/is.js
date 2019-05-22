/* eslint-disable no-self-compare */
export function isDeepEqual(a, b) {
  if (a === b) {
    return true
  }

  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime()
  }

  if (a !== a && b !== b) {
    return true
  }

  if (a !== Object(a) || b !== Object(b)) {
    return false
  }

  const props = Object.keys(a)

  if (props.length !== Object.keys(b).length) {
    return false
  }

  return props.every(prop => isDeepEqual(a[prop], b[prop]))
}

export function isStringContain(s, v) {
  let innerS = String(s)
  let innerV = v.replace(/\s+/g, '').split('')
  let sum = 0

  innerV.forEach(x => {
    if (innerS.includes(x)) {
      innerS = innerS.replace(x, '')
      sum++
    }
  })
  return sum >= innerV.length
}

export function isObject(v) {
  return Object(v) === v
}

export function isDate(v) {
  return Object.prototype.toString.call(v) === '[object Date]'
}

export function isRegexp(v) {
  return Object.prototype.toString.call(v) === '[object RegExp]'
}

export function isNumber(v) {
  return typeof v === 'number' && isFinite(v)
}

export function isString(v) {
  return typeof v === 'string'
}
