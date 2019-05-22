export default (self, name, render, param) => render
  ? (self.$scopedSlots[name] !== void 0 && self.$scopedSlots[name](param) || void 0) || (self.$slots[name] !== void 0 && self.$slots[name].length > 0 && self.$slots[name] || void 0)
  : (self.$scopedSlots[name] !== void 0 || self.$slots[name] !== void 0 && self.$slots[name].length > 0 || false)