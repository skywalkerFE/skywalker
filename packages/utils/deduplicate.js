import { isDeepEqual } from './is'

export function deduplicate(arr) {
  let innerArr = Array.isArray(arr) ? arr : [arr]
  let res = innerArr.reduce((accumulator, currentValue) => {
    let duplicated = false

    accumulator.forEach(x => {
      if (isDeepEqual(x, currentValue)) {
        duplicated = true
      }
    })
    if (!duplicated) { accumulator.push(currentValue) }
    return accumulator
  }, [])

  return res
}