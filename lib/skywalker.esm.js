import Vue from 'vue';

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

var Icon = {
  name: 'swIcon',
  props: {
    name: String,
    color: String,
    primary: Boolean,
    negative: Boolean,
    positive: Boolean,
    warning: Boolean,
    grey: Boolean,
    lightGrey: Boolean,
    size: String
  },
  computed: {
    classes: function classes() {
      var _ref;

      var cls;
      var icon = this.name;

      if (!icon) {
        return;
      } else {
        cls = 'material-icons';
      }

      return _ref = {}, _defineProperty(_ref, cls, true), _defineProperty(_ref, 'color-primary', this.primary), _defineProperty(_ref, 'color-negative', this.negative), _defineProperty(_ref, 'color-positive', this.positive), _defineProperty(_ref, 'color-warning', this.warning), _defineProperty(_ref, 'color-grey', this.grey), _defineProperty(_ref, 'color-light-grey', this.lightGrey), _ref;
    },
    content: function content() {
      return this.name || ' ';
    },
    style: function style() {
      return {
        fontSize: this.size || void 0,
        color: this.color || void 0
      };
    }
  },
  render: function render(h) {
    return h('i', {
      staticClass: 'sw-icon',
      class: this.classes,
      style: this.style,
      attrs: {
        'aria-hidden': true
      },
      on: this.$listeners
    }, [this.content]);
  }
};

var install = function install(Vue) {
  Vue.component(Icon.name, Icon);
};

Icon.install = install;

var Item = {
  name: 'swItem',
  props: {
    wrap: Boolean,
    hideBefore: Boolean,
    hideDefault: Boolean,
    hideAfter: Boolean,
    to: String | Object,
    center: Boolean,
    end: Boolean,
    disabled: Boolean,
    mask: Object | Boolean,
    ripple: Object | Boolean
  },
  data: function data() {
    return {};
  },
  render: function render(h) {
    return h("".concat(this.to !== void 0 ? 'router-link' : 'div'), {
      staticClass: 'sw-item flex items-center',
      class: {
        'no-wrap': !this.wrap,
        disable: this.disabled
      },
      on: this.disabled ? void 0 : _objectSpread({}, this.$listeners),
      props: {
        to: this.to
      },
      directives: (this.to !== void 0 || this.mask !== void 0 ? [{
        name: 'mask',
        value: {
          disabled: this.mask !== void 0 && this.mask.disabled || this.mask === void 0 && this.to !== void 0,
          color: this.mask !== void 0 && this.mask.color,
          stay: this.mask !== void 0 && this.mask.stay
        }
      }] : []).concat(this.ripple !== void 0 ? [{
        name: 'ripple',
        value: {
          disabled: this.ripple !== void 0 && this.ripple.disabled,
          color: this.ripple !== void 0 && this.ripple.color,
          center: this.ripple !== void 0 && this.ripple.center
        }
      }] : [])
    }, [h('div', {
      staticClass: 'sw-item__content flex items-center',
      class: {
        'no-wrap': !this.wrap
      }
    }, [this.$scopedSlots.before !== void 0 ? h('div', {
      staticClass: 'sw-item__before flex items-center',
      class: {
        hide: this.hideBefore,
        'flex-auto': this.hideDefault,
        'no-wrap': !this.wrap
      }
    }, [this.$scopedSlots.before()]) : void 0, this.$scopedSlots.default !== void 0 ? h('div', {
      staticClass: 'sw-item__inner flex items-center items-end',
      class: {
        hide: this.hideDefault,
        'no-wrap': !this.wrap,
        'justify-center': this.center,
        'justify-end': this.end
      }
    }, [this.$scopedSlots.default()]) : void 0, this.$scopedSlots.after !== void 0 ? h('div', {
      staticClass: 'sw-item__after flex items-center',
      class: {
        hide: this.hideAfter,
        'no-wrap': !this.wrap
      }
    }, [this.$scopedSlots.after()]) : void 0])]);
  }
};

var install$1 = function install(Vue) {
  Vue.component(Item.name, Item);
};

Item.install = install$1;

var ValidateMixin = {
  props: {
    errorMessage: String,
    rules: Array
  },
  data: function data() {
    return {
      isDirty: false,
      innerError: false,
      innerErrorMessage: void 0
    };
  },
  watch: {
    forceCheck: function forceCheck(v) {
      if (this.rules === void 0) {
        return;
      }

      this.isDirty = true;
      this.validate(v);
    },
    value: function value(v) {
      if (this.forceCheck !== void 0 || this.rules === void 0) {
        return;
      }

      this.isDirty = true;
      this.validate(v);
    }
  },
  computed: {
    validateValue: function validateValue() {
      return this.forceCheck === void 0 ? this.value : this.forceCheck;
    },
    hasError: function hasError() {
      return this.innerError === true;
    },
    computedErrorMessage: function computedErrorMessage() {
      return this.errorMessage !== void 0 ? this.errorMessage : this.innerErrorMessage;
    }
  },
  mounted: function mounted() {
    this.$on("blur", this.triggerValidation);
  },
  beforeDestroy: function beforeDestroy() {
    this.$off("blur", this.triggerValidation);
  },
  methods: {
    resetValidation: function resetValidation() {
      this.isDirty = false;
      this.innerError = false;
      this.innerErrorMessage = void 0;
    },
    validate: function validate() {
      var _this = this;

      var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.validateValue;

      if (!this.rules || this.rules.length === 0) {
        return;
      }

      var update = function update(err, msg) {
        if (_this.innerError !== err) {
          _this.innerError = err;
        }

        var m = msg || void 0;

        if (_this.innerErrorMessage !== m) {
          _this.innerErrorMessage = m;
        }

        return err;
      };

      return !this.rules.some(function (rule) {
        var res;

        if (typeof rule === 'function') {
          res = rule(val);
        } else {
          return false;
        }

        if (res === false || typeof res === 'string') {
          return update(true, res);
        } else {
          return update(false);
        }
      });
    },
    triggerValidation: function triggerValidation() {
      var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (force === true || this.isDirty === false) {
        this.isDirty = true;
        return this.validate(this.validateValue);
      }
    }
  }
};

var AdvancedBlurMixin = {
  props: {},
  data: function data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {
    advancedBlur: function advancedBlur(e) {
      var _this = this;

      if (this.disabled) {
        return;
      }

      var excluded = false;

      var getRefs = function getRefs(refNames) {
        var getDoms = function getDoms(els) {
          els = Array.isArray(els) ? els : [els];
          return els.reduce(function (accumulator, el) {
            accumulator.push(el && (el.$el || el));
            return accumulator;
          }, []);
        };

        return refNames.reduce(function (accumulator, ref) {
          return accumulator.concat(getDoms(_this.$refs[ref]));
        }, []);
      };

      if (this.excludedBlurRefs) {
        var refs = getRefs(this.excludedBlurRefs);
        refs.some(function (ref) {
          if (ref === void 0) {
            return false;
          }

          excluded = ref.contains(e.target) || false;
          return excluded;
        });
      }

      if (excluded) {
        this.focused = true;
        return;
      }

      var focusedBefore = this.focused;

      if (this.blurType === 'reverse' && focusedBefore) {
        this.focused = !focusedBefore;
      } else {
        var _refs = getRefs(this.blurRefs);

        _refs.some(function (ref) {
          if (ref === void 0) {
            return false;
          }

          _this.focused = ref.contains(e.target) || false;
          return _this.focused;
        });
      }

      if (!this.focused && focusedBefore) {
        this.$emit("blur", e);
      }
    }
  },
  mounted: function mounted() {
    if (this.blurRefs) {
      document.addEventListener('mouseup', this.advancedBlur, false);
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (this.blurRefs) {
      document.removeEventListener('mouseup', this.advancedBlur, false);
    }
  }
};

var Field = {
  name: 'swField',
  mixins: [ValidateMixin, AdvancedBlurMixin],
  // hasError,computedErrorMessage
  components: {
    Item: Item
  },
  props: {
    required: Boolean,
    underlined: Boolean,
    bordered: Boolean,
    filled: Boolean,
    disabled: Boolean,
    mini: Boolean,
    label: String,
    forceCheck: String | Object,
    spaceAround: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      focused: false
    };
  },
  computed: {
    blurRefs: function blurRefs() {
      return ['fieldContent'];
    }
  },
  watch: {
    focused: function focused() {
      if (this.focused && this.focus) {
        this.focus();
      }

      if (!this.focused && this.blur) {
        this.blur();
      }
    }
  },
  render: function render(h) {
    var _this = this;

    return h('div', {
      staticClass: 'sw-field flex no-wrap items-center',
      class: {
        disable: this.disabled,
        'space-around': this.spaceAround
      }
    }, [this.label !== void 0 ? h('div', {
      staticClass: 'sw-field__label flex no-wrap items-center'
    }, [h('div', {
      staticClass: 'sw-label flex no-wrap items-center',
      class: {
        required: this.required
      }
    }, this.label)]) : void 0, h('div', {
      ref: 'fieldContent',
      staticClass: 'sw-field__content flex no-wrap items-center sw-form',
      class: {
        underline: this.underlined,
        border: this.bordered,
        fill: this.filled,
        focus: !this.hasError && this.focused,
        error: this.hasError,
        'padding-min': !this.mini,
        'inner-pointer': this.innerPointer
      }
    }, [this.disabled ? h('div', {
      staticClass: 'sw-field__disabled'
    }) : void 0, h('sw-item', {
      staticClass: 'flex-auto',
      scopedSlots: {
        before: this.$scopedSlots.before !== void 0 ? function () {
          return [h('div', {
            staticClass: 'flex no-wrap items-center margin-min'
          }, [_this.$scopedSlots.before()])];
        } : void 0,
        default: this.$scopedSlots.default !== void 0 || this.getInner !== void 0 ? function () {
          return [_this.getInner !== void 0 ? _this.getInner(h) : void 0, _this.$scopedSlots.default !== void 0 && _this.getInner === void 0 ? _this.$scopedSlots.default() : void 0];
        } : void 0,
        after: this.$scopedSlots.after !== void 0 || this.getAfter !== void 0 ? function () {
          return [h('div', {
            staticClass: 'flex no-wrap items-center margin-min'
          }, [_this.getAfter !== void 0 ? _this.getAfter(h) : void 0, _this.$scopedSlots.after !== void 0 && _this.getAfter === void 0 ? _this.$scopedSlots.after() : void 0])];
        } : void 0
      }
    }), this.hasError ? h('div', {
      staticClass: 'sw-field__error flex no-wrap items-center'
    }, this.computedErrorMessage) : void 0])]);
  }
};

var install$2 = function install(Vue) {
  Vue.component(Field.name, Field);
};

Field.install = install$2;

var Input = {
  name: 'swInput',
  mixins: [Field],
  // focused,disabled
  props: {
    value: String,
    placeholder: String,
    autocomplete: Boolean
  },
  data: function data() {
    return {};
  },
  computed: {},
  methods: {
    focus: function focus() {
      this.$refs.input.focus();
    },
    blur: function blur() {
      this.$refs.input.blur();
    },
    getInner: function getInner(h) {
      var _this = this;

      return [h('input', {
        ref: 'input',
        staticClass: 'sw-input margin-min',
        attrs: {
          autocomplete: this.autocomplete ? 'on' : 'off'
        },
        domProps: {
          value: this.value,
          placeholder: this.placeholder || '',
          disabled: this.disabled
        },
        on: _objectSpread({}, this.$listeners, {
          input: function input(e) {
            _this.$emit('input', e.target.value);
          }
        })
      })];
    }
  }
};

var install$3 = function install(Vue) {
  Vue.component(Input.name, Input);
};

Input.install = install$3;

var ScrollArea = {
  name: 'swScrollArea',
  props: {
    x: Boolean,
    y: Boolean,
    width: String,
    height: String,
    stretch: Boolean
  },
  data: function data() {
    return {};
  },
  computed: {
    style: function style() {
      return {
        'overflow-x': this.x ? 'auto' : 'hidden',
        'overflow-y': this.y ? 'auto' : 'hidden',
        'max-width': this.width || '100%',
        width: this.width || '100%',
        'max-height': this.height || '100%',
        height: this.stretch && (this.height || '100%')
      };
    }
  },
  methods: {},
  render: function render(h) {
    return h('div', {
      staticClass: 'sw-scroll-area',
      style: this.style,
      on: this.$listeners
    }, this.$scopedSlots.default !== void 0 ? [this.$scopedSlots.default()] : void 0);
  }
};

var install$4 = function install(Vue) {
  Vue.component(ScrollArea.name, ScrollArea);
};

ScrollArea.install = install$4;

/* eslint-disable no-self-compare */
function isDeepEqual(a, b) {
  if (a === b) {
    return true;
  }

  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }

  if (a !== a && b !== b) {
    return true;
  }

  if (a !== Object(a) || b !== Object(b)) {
    return false;
  }

  var props = Object.keys(a);

  if (props.length !== Object.keys(b).length) {
    return false;
  }

  return props.every(function (prop) {
    return isDeepEqual(a[prop], b[prop]);
  });
}
function isStringContain(s, v) {
  var innerS = String(s);
  var innerV = v.replace(/\s+/g, '').split('');
  var sum = 0;
  innerV.forEach(function (x) {
    if (innerS.includes(x)) {
      innerS = innerS.replace(x, '');
      sum++;
    }
  });
  return sum >= innerV.length;
}
function isObject(v) {
  return Object(v) === v;
}

var Select = {
  name: 'swSelect',
  mixins: [Field],
  // focused,disabled
  components: {
    ScorllArea: ScrollArea
  },
  props: {
    multiple: Boolean,
    value: {
      required: true
    },
    options: Array,
    filter: Boolean,
    placeholder: String,
    optionsHeight: {
      type: String,
      default: '200px'
    },
    selectedStyle: String
  },
  data: function data() {
    return {
      blurType: 'reverse',
      filterValue: ''
    };
  },
  computed: {
    excludedBlurRefs: function excludedBlurRefs() {
      return this.filter ? ['input', 'selected', 'selectOptions'] : ['selected', 'selectOptions'];
    },
    innerValue: {
      get: function get() {
        return this.getExactValues(this.value);
      },
      set: function set(val) {
        this.$emit('input', val);
      }
    },
    innerOptions: function innerOptions() {
      var _this = this;

      return this.options.reduce(function (a, c) {
        if (isStringContain(_this.getName(c), _this.filterValue)) {
          a.push(c);
        }

        return a;
      }, []) || [];
    }
  },
  watch: {
    options: function options() {
      this.innerValue = this.getExactValues(this.value);
    }
  },
  methods: {
    focus: function focus() {
      var _this2 = this;

      this.$nextTick(function () {
        _this2.$refs.input.focus();
      });
    },
    blur: function blur() {
      this.$refs.input.blur();
    },
    clearFilter: function clearFilter() {
      this.filterValue = '';
    },
    triggerBlur: function triggerBlur(e) {
      this.focused = false;
      this.$emit("blur", e);
    },
    getInner: function getInner(h) {
      var _this3 = this;

      var getOptions = function getOptions(h) {
        if (_this3.innerOptions.length) {
          return _this3.innerOptions.map(function (option) {
            return h('sw-item', {
              class: {
                selected: _this3.checkSelected(option)
              },
              nativeOn: {
                click: function click(e) {
                  _this3.innerValue = _this3.formatValue(option);

                  _this3.clearFilter();

                  if (!_this3.multiple) {
                    _this3.triggerBlur(e);
                  } else {
                    _this3.focus();
                  }
                }
              },
              scopedSlots: {
                default: function _default() {
                  return [h('div', {
                    staticClass: 'sw-select__option'
                  }, String(_this3.getName(option)))];
                }
              }
            });
          });
        } else {
          return [h('sw-item', {
            scopedSlots: {
              default: function _default() {
                return [h('div', {
                  staticClass: 'sw-select__option no-options'
                }, 'no options')];
              }
            }
          })];
        }
      };

      var getSelected = function getSelected(h) {
        return _this3.getExactOptions(_this3.innerValue).map(function (x) {
          return h('sw-item', {
            staticClass: 'margin-min sw-form selected-option',
            class: _this3.selectedStyle === void 0 ? {
              underline: _this3.underlined,
              border: _this3.bordered,
              fill: _this3.filled
            } : _defineProperty({}, _this3.selectedStyle, true),
            ref: 'selected',
            refInFor: true,
            scopedSlots: {
              default: function _default() {
                return [h('div', {
                  style: {
                    padding: _this3.mini ? '3px 0 3px 9px' : '3px 9px',
                    'white-space': _this3.mini ? 'nowrap' : void 0
                  }
                }, String(_this3.getName(x)))];
              },
              after: !_this3.mini ? function () {
                return [h('sw-icon', {
                  class: {
                    'hover-color-primary': true,
                    'color-grey': true
                  },
                  style: {
                    'border-radius': '50%',
                    padding: '0 3px 0 0'
                  },
                  props: {
                    name: _this3.filled && _this3.selectedStyle === void 0 || _this3.selectedStyle === 'fill' ? 'cancel' : 'clear',
                    size: '14px'
                  },
                  nativeOn: {
                    click: function click() {
                      _this3.innerValue = _this3.formatValue(x, 'remove');
                    }
                  }
                })];
              } : void 0
            }
          });
        });
      };

      return [h('sw-item', {
        staticClass: 'flex-auto',
        props: {
          wrap: true,
          hideDefault: this.innerValue.length > 0 && (!this.focused || !this.filter)
        },
        scopedSlots: {
          before: this.innerValue.length > 0 ? function () {
            return getSelected(h);
          } : void 0,
          default: function _default() {
            return [h('input', {
              ref: 'input',
              staticClass: 'sw-input margin-min',
              style: {
                cursor: !_this3.filter ? 'pointer' : void 0
              },
              domProps: {
                value: _this3.filterValue,
                placeholder: _this3.placeholder || '',
                disabled: !_this3.filter
              },
              on: _objectSpread({}, _this3.$listeners, {
                input: function input(e) {
                  _this3.filterValue = e.target.value;
                }
              })
            })];
          }
        }
      }), this.focused ? h('div', {
        ref: 'selectOptions',
        staticClass: 'sw-select__options common-shadow',
        style: {
          'max-height': this.optionsHeight
        }
      }, [h('sw-scroll-area', {
        props: {
          y: true,
          height: this.optionsHeight
        },
        scopedSlots: {
          default: function _default() {
            return getOptions(h);
          }
        }
      })]) : void 0];
    },
    getAfter: function getAfter(h) {
      return [h('sw-icon', {
        props: {
          name: 'keyboard_arrow_down',
          size: '20px'
        },
        staticClass: 'color-grey hover-color-primary',
        style: {
          transform: this.focused ? 'rotate(180deg)' : void 0
        }
      })];
    },
    formatValue: function formatValue(option, ope) {
      var _this4 = this;

      var duplicated = false;
      var res = [];

      if (this.multiple) {
        this.innerValue.forEach(function (x) {
          if (isDeepEqual(x, _this4.getValue(option))) {
            duplicated = true;
          } else {
            res.push(x);
          }
        });
      } else if (ope === 'remove') {
        duplicated = true;
      }

      if (!duplicated) {
        res.push(this.getValue(option));
      }

      return res;
    },
    checkSelected: function checkSelected(option) {
      var _this5 = this;

      return this.innerValue.some(function (x) {
        return isDeepEqual(x, _this5.getValue(option));
      });
    },
    getExactValues: function getExactValues(value) {
      var _this6 = this;

      var v = Array.isArray(value) ? value : [value];
      return v.reduce(function (a, c) {
        if (_this6.options.some(function (x) {
          return isDeepEqual(_this6.getValue(x), c);
        })) {
          a.push(c);
        }

        return a;
      }, []);
    },
    getExactOptions: function getExactOptions(value) {
      var _this7 = this;

      return value.reduce(function (a, c) {
        _this7.options.forEach(function (x) {
          if (isDeepEqual(_this7.getValue(x), c)) {
            a.push(x);
          }
        });

        return a;
      }, []);
    },
    getValue: function getValue(option) {
      return isObject(option) && option.hasOwnProperty('value') ? option.value : option;
    },
    getName: function getName(option) {
      return isObject(option) && option.hasOwnProperty('name') ? option.name : option;
    }
  }
};

var install$5 = function install(Vue) {
  Vue.component(Select.name, Select);
};

Select.install = install$5;

var Button = {
  name: 'swButton',
  components: {
    Item: Item
  },
  props: {
    underlined: Boolean,
    bordered: Boolean,
    filled: Boolean,
    disabled: Boolean,
    color: String,
    primary: Boolean,
    negative: Boolean,
    positive: Boolean,
    warning: Boolean,
    round: Boolean,
    shadow: Boolean,
    mini: Boolean,
    to: String | Object,
    center: Boolean,
    end: Boolean
  },
  data: function data() {
    return {};
  },
  render: function render(h) {
    var _this = this;

    return h('button', {
      staticClass: 'sw-button flex no-wrap items-center',
      style: {
        color: !this.disabled && !this.filled && this.color || void 0,
        'background-color': !this.disabled && this.filled && this.color || void 0
      },
      class: {
        underline: this.underlined,
        border: this.bordered,
        fill: this.filled,
        primary: this.primary,
        negative: this.negative,
        positive: this.positive,
        warning: this.warning,
        grey: this.disabled,
        round: this.round && !this.underlined,
        'common-shadow': this.shadow && (this.bordered || this.filled)
      },
      on: this.disabled ? void 0 : _objectSpread({}, this.$listeners)
    }, [h('sw-item', {
      staticClass: 'flex-auto',
      class: {
        'round-slot': this.$scopedSlots.round,
        mini: this.mini
      },
      style: {
        cursor: 'pointer'
      },
      props: {
        to: this.to,
        center: this.center,
        end: this.end,
        disabled: this.disabled
      },
      on: this.disabled ? void 0 : _objectSpread({}, this.$listeners),
      scopedSlots: this.$scopedSlots.round !== void 0 ? {
        default: function _default() {
          return [h('div', {
            staticClass: 'flex no-wrap items-center margin-min sw-button__inner flex-auto'
          }, [_this.$scopedSlots.round()])];
        }
      } : {
        before: this.$scopedSlots.before !== void 0 ? function () {
          return [h('div', {
            staticClass: 'flex no-wrap items-center margin-min sw-button__before'
          }, [_this.$scopedSlots.before()])];
        } : void 0,
        default: this.$scopedSlots.default !== void 0 ? function () {
          return [h('div', {
            staticClass: 'flex no-wrap items-center margin-min sw-button__inner flex-auto'
          }, [_this.$scopedSlots.default()])];
        } : void 0,
        after: this.$scopedSlots.after !== void 0 ? function () {
          return [h('div', {
            staticClass: 'flex no-wrap items-center margin-min sw-button__after'
          }, [_this.$scopedSlots.after()])];
        } : void 0
      }
    })]);
  }
};

var install$6 = function install(Vue) {
  Vue.component(Button.name, Button);
};

Button.install = install$6;

var Modal$1 = {
  name: 'swModal',
  components: {
    swButton: Button
  },
  props: {
    show: {
      type: Boolean,
      default: false
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
    style: function style() {
      if (this.show) {
        return {
          zIndex: 999,
          opacity: 1
        };
      } else {
        return {
          zIndex: -10,
          opacity: 0
        };
      }
    }
  },
  methods: {
    handleCancel: function handleCancel() {
      this.$emit('cancel');
    },
    handleConfirm: function handleConfirm() {
      this.$emit('confirm');
    }
  },
  render: function render(h) {
    var _this = this;

    return h('div', {
      staticClass: 'sw-modal-mask',
      style: this.style,
      on: {
        click: this.handleCancel
      }
    }, [h('div', {
      staticClass: 'sw-modal',
      class: {
        showModal: this.show,
        hideModal: !this.show
      },
      style: {
        width: this.width
      },
      on: {
        click: function click(event) {
          event.stopPropagation();
        }
      }
    }, [this.$scopedSlots.header === void 0 ? h('div', {
      class: 'sw-modal-title'
    }, [h('span', {
      class: 'sw-modal-title-text'
    }, this.title), h('span', {
      class: 'sw-modal-close-icon',
      on: {
        click: function click() {
          event.stopPropagation();

          _this.handleCancel();
        }
      }
    }, [h('i', {
      class: 'material-icons'
    }, 'close')])]) : this.$scopedSlots.header(), this.$scopedSlots.content(), this.$scopedSlots.footer === void 0 ? h('div', {
      class: 'sw-modal-footer'
    }, [h('sw-button', {
      class: 'btn left-btn',
      on: {
        click: function click() {
          event.stopPropagation();

          _this.handleCancel();
        }
      }
    }, '取消'), h('sw-button', {
      class: 'btn right-btn',
      on: {
        click: function click() {
          event.stopPropagation();

          _this.handleConfirm();
        }
      }
    }, '确定')]) : this.$scopedSlots.footer])]);
  }
};

var install$7 = function install(Vue) {
  Vue.component(Modal$1.name, Modal$1);
};

Modal$1.install = install$7;

var isServer = Vue.prototype.$isServer;
function css(element, css) {
  var style = element.style;
  Object.keys(css).forEach(function (prop) {
    style[prop] = css[prop];
  });
}
var on = function () {
  if (!isServer && document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler);
      }
    };
  }
}();
var off = function () {
  if (!isServer && document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  } else {
    return function (element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler);
      }
    };
  }
}();

var Popover = {
  name: 'swPopover',
  data: function data() {
    return {
      popoverStyle: {},
      arrowStyle: {},
      show: false,
      referenceElm: {}
    };
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
      type: String
    },
    content: {
      type: String
    },
    placement: {
      type: String,
      default: 'top'
    },
    trigger: {
      type: String,
      default: 'click',
      validator: function validator(value) {
        return ['click', 'focus', 'hover', 'manual'].indexOf(value) > -1;
      }
    },
    width: {
      type: String
    }
  },
  computed: {
    showValue: {
      get: function get() {
        return this.value;
      },
      set: function set() {}
    },
    showStyle: function showStyle() {
      if (this.trigger !== 'manual') {
        if (this.show) {
          return {
            zIndex: 999,
            opacity: 1
          };
        } else {
          return {
            zIndex: -10,
            opacity: 0
          };
        }
      } else {
        if (this.showValue) {
          return {
            zIndex: 999,
            opacity: 1
          };
        } else {
          return {
            zIndex: -10,
            opacity: 0
          };
        }
      }
    }
  },
  methods: {
    getStyle: function getStyle(popoverElm, referenceElm) {
      switch (this.placement) {
        case 'top-start':
          this.popoverStyle = {
            top: '-' + (popoverElm.offsetHeight + 10) + 'px'
          };
          this.arrowStyle = {
            left: referenceElm.offsetWidth / 2 - 5 + 'px'
          };
          break;

        case 'top':
          this.popoverStyle = {
            top: '-' + (popoverElm.offsetHeight + 10) + 'px',
            left: (referenceElm.offsetWidth - popoverElm.offsetWidth) / 2 + 'px'
          };
          this.arrowStyle = {
            left: popoverElm.offsetWidth / 2 - 5 + 'px'
          };
          break;

        case 'bottom-start':
          this.popoverStyle = {
            top: referenceElm.offsetHeight + 10 + 'px'
          };
          this.arrowStyle = {
            left: referenceElm.offsetWidth / 2 - 5 + 'px'
          };
          break;

        case 'bottom':
          this.popoverStyle = {
            top: referenceElm.offsetHeight + 10 + 'px',
            left: (referenceElm.offsetWidth - popoverElm.offsetWidth) / 2 + 'px'
          };
          this.arrowStyle = {
            left: popoverElm.offsetWidth / 2 - 5 + 'px'
          };
          break;

        case 'right-start':
          this.popoverStyle = {
            left: referenceElm.offsetWidth + 10 + 'px'
          };
          this.arrowStyle = {
            top: referenceElm.offsetHeight / 2 - 5 + 'px'
          };
          break;

        case 'right':
          this.popoverStyle = {
            left: referenceElm.offsetWidth + 10 + 'px',
            top: (referenceElm.offsetHeight - popoverElm.offsetHeight) / 2 + 'px'
          };
          this.arrowStyle = {
            top: popoverElm.offsetHeight / 2 - 5 + 'px'
          };
          break;

        case 'left-start':
          this.popoverStyle = {
            right: referenceElm.offsetWidth + 10 + 'px'
          };
          this.arrowStyle = {
            top: referenceElm.offsetHeight / 2 - 5 + 'px'
          };
          break;

        case 'left':
          this.popoverStyle = {
            right: referenceElm.offsetWidth + 10 + 'px',
            top: (referenceElm.offsetHeight - popoverElm.offsetHeight) / 2 + 'px'
          };
          this.arrowStyle = {
            top: popoverElm.offsetHeight / 2 - 5 + 'px'
          };
          break;

        default:
          break;
      }
    },
    handleClick: function handleClick() {
      this.show = !this.show;
    },
    handleMouseEnter: function handleMouseEnter() {
      this.show = true;
    },
    handleMouseLeave: function handleMouseLeave() {
      this.show = false;
    },
    doShow: function doShow() {
      this.show = true;
    },
    doClose: function doClose() {
      this.show = false;
    },
    handleManual: function handleManual() {
      this.showValue = !this.showValue;
      this.$emit("update", this.showValue);
    }
  },
  mounted: function mounted() {
    var popoverElm = this.$refs.popover;
    var referenceElm = this.referenceElm = this.$scopedSlots.reference()[0].elm;
    this.getStyle(popoverElm, referenceElm);

    if (this.trigger === 'manual') {
      on(referenceElm, 'click', this.handleManual);
      return;
    }

    if (this.trigger === 'click') {
      on(referenceElm, 'click', this.handleClick);
      return;
    }

    if (this.trigger === 'hover') {
      on(referenceElm, 'mouseenter', this.handleMouseEnter);
      on(referenceElm, 'mouseleave', this.handleMouseLeave);
    }

    if (this.trigger === 'focus') {
      if (referenceElm.querySelector('input, textarea')) {
        on(referenceElm, 'focusin', this.doShow);
        on(referenceElm, 'focusout', this.doClose);
      } else {
        on(referenceElm, 'mousedown', this.doShow);
        on(referenceElm, 'mouseup', this.doClose);
      }
    }
  },
  destroyed: function destroyed() {
    var reference = this.referenceElm;
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
  render: function render(h) {
    return h('div', {
      class: 'sw-popover-contain'
    }, [h('div', {
      staticClass: 'sw-popover',
      class: 'sw-popover-show',
      ref: 'popover',
      style: Object.assign(Object.assign(this.popoverStyle, {
        width: this.width
      }), this.showStyle)
    }, [this.title ? h('div', {
      class: 'sw-popover-title'
    }, this.title) : '', this.$scopedSlots.default === void 0 ? h('div', {
      class: 'sw-popover-content'
    }, this.content || '') : this.$scopedSlots.default(), h('div', {
      staticClass: 'sw-popover-arrow',
      class: {
        'sw-popover-arrow-top': this.placement.indexOf('top') >= 0 ? true : false,
        'sw-popover-arrow-bottom': this.placement.indexOf('bottom') >= 0 ? true : false,
        'sw-popover-arrow-right': this.placement.indexOf('right') >= 0 ? true : false,
        'sw-popover-arrow-left': this.placement.indexOf('left') >= 0 ? true : false
      },
      style: this.arrowStyle
    })]), this.$scopedSlots.reference === void 0 ? h() : this.$scopedSlots.reference()]);
  }
};

var install$8 = function install(Vue) {
  Vue.component(Modal.name, Popover);
};

Popover.install = install$8;

var Checkbox = {
  name: 'swCheckbox',
  components: {
    Item: Item
  },
  props: {
    value: Boolean | Array,
    val: {
      required: false
    },
    label: String,
    disabled: Boolean,
    color: String,
    primary: Boolean,
    negative: Boolean,
    positive: Boolean,
    warning: Boolean,
    leftLabel: Boolean,
    colorLabel: Boolean,
    keepColor: Boolean
  },
  data: function data() {
    return {
      parent: void 0
    };
  },
  computed: {
    model: function model() {
      return this.parent === void 0 ? this.value : this.parent.value;
    },
    parentDisabled: function parentDisabled() {
      return this.parent && this.parent.disabled;
    },
    checked: {
      get: function get() {
        return this.booleanMode ? this.model : this.getChecked(this.val);
      },
      set: function set(val) {
        var self = this.parent === void 0 ? this : this.parent;
        self.$emit('input', this.formatValue(val));
      }
    },
    innerValue: function innerValue() {
      return Array.isArray(this.model) ? this.model : [this.model];
    },
    booleanMode: function booleanMode() {
      return this.val === void 0;
    }
  },
  watch: {},
  methods: {
    getChecked: function getChecked(val) {
      return this.innerValue.some(function (x) {
        return isDeepEqual(x, val);
      });
    },
    formatValue: function formatValue(checked) {
      var _this = this;

      if (this.booleanMode) {
        return checked;
      }

      var res = [];
      this.innerValue.forEach(function (x) {
        if (!isDeepEqual(x, _this.val)) {
          res.push(x);
        }
      });

      if (checked) {
        res.push(this.val);
      }

      return res;
    }
  },
  render: function render(h) {
    var _this2 = this;

    var checked = this.checked;
    var colorLabel = checked && this.colorLabel;
    var colorCheckbox = checked || this.keepColor;

    var getLabel = function getLabel() {
      return [h('div', {
        staticClass: 'sw-checkbox__text margin-min',
        class: {
          'color-primary': colorLabel ? _this2.primary : void 0,
          'color-negative': colorLabel ? _this2.negative : void 0,
          'color-positive': colorLabel ? _this2.positive : void 0,
          'color-warning': colorLabel ? _this2.warning : void 0
        },
        style: {
          color: colorLabel ? _this2.color : void 0
        }
      }, _this2.label)];
    };

    return h('sw-item', {
      staticClass: 'sw-checkbox',
      ref: 'checkbox',
      class: {
        disable: this.disabled || this.parentDisabled
      },
      nativeOn: this.disabled ? void 0 : {
        click: function click() {
          _this2.checked = !checked;
        }
      },
      scopedSlots: {
        before: this.label && this.leftLabel ? getLabel : void 0,
        default: function _default() {
          return [h('sw-icon', {
            staticClass: 'margin-min',
            style: {
              opacity: checked ? 1 : 0.6
            },
            props: {
              size: '20px',
              name: checked ? 'check_box' : 'check_box_outline_blank',
              color: colorCheckbox ? _this2.color : void 0,
              primary: colorCheckbox ? _this2.primary : void 0,
              negative: colorCheckbox ? _this2.negative : void 0,
              positive: colorCheckbox ? _this2.positive : void 0,
              warning: colorCheckbox ? _this2.warning : void 0
            }
          })];
        },
        after: this.label && !this.leftLabel ? getLabel : void 0
      }
    });
  }
};

var install$9 = function install(Vue) {
  Vue.component(Checkbox.name, Checkbox);
};

Checkbox.install = install$9;

var ShuttleMixin = {
  data: function data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {
    shuttle: function shuttle(_this) {
      var _this2 = this;

      var self = _this || this;
      self.$children.forEach(function (child) {
        if (child.$refs[_this2.shuttleRef] !== void 0) {
          child.parent = _this2;
        } else {
          _this2.shuttle(child);
        }
      });
    }
  },
  mounted: function mounted() {
    this.shuttle();
  }
};

var CheckboxGroup = {
  name: 'swCheckboxGroup',
  mixins: [Field, ShuttleMixin],
  // focused,disabled,shuttleRef
  props: {
    value: Boolean | Array
  },
  data: function data() {
    return {
      innerPointer: true,
      shuttleRef: 'checkbox'
    };
  },
  computed: {},
  watch: {},
  methods: {}
};

var install$a = function install(Vue) {
  Vue.component(CheckboxGroup.name, CheckboxGroup);
};

CheckboxGroup.install = install$a;

var Radio = {
  name: 'swRadio',
  components: {
    Item: Item
  },
  props: {
    value: {},
    val: {
      required: true
    },
    label: String,
    disabled: Boolean,
    color: String,
    primary: Boolean,
    negative: Boolean,
    positive: Boolean,
    warning: Boolean,
    leftLabel: Boolean,
    colorLabel: Boolean,
    keepColor: Boolean
  },
  data: function data() {
    return {
      parent: void 0
    };
  },
  computed: {
    model: function model() {
      return this.parent === void 0 ? this.value : this.parent.value;
    },
    parentDisabled: function parentDisabled() {
      return this.parent && this.parent.disabled;
    },
    checked: {
      get: function get() {
        return this.getChecked(this.val);
      },
      set: function set() {
        var self = this.parent === void 0 ? this : this.parent;
        self.$emit('input', this.val);
      }
    }
  },
  watch: {},
  methods: {
    getChecked: function getChecked(val) {
      return isDeepEqual(this.model, val);
    }
  },
  render: function render(h) {
    var _this = this;

    var checked = this.checked;
    var colorLabel = checked && this.colorLabel;
    var colorRadio = checked || this.keepColor;

    var getLabel = function getLabel() {
      return [h('div', {
        staticClass: 'sw-radio__text margin-min',
        class: {
          'color-primary': colorLabel ? _this.primary : void 0,
          'color-negative': colorLabel ? _this.negative : void 0,
          'color-positive': colorLabel ? _this.positive : void 0,
          'color-warning': colorLabel ? _this.warning : void 0
        },
        style: {
          color: colorLabel ? _this.color : void 0
        }
      }, _this.label)];
    };

    return h('sw-item', {
      staticClass: 'sw-radio',
      ref: 'radio',
      class: {
        disable: this.disabled || this.parentDisabled
      },
      nativeOn: this.disabled ? void 0 : {
        click: function click() {
          if (checked) {
            return;
          }

          _this.checked = true;
        }
      },
      scopedSlots: {
        before: this.label && this.leftLabel ? getLabel : void 0,
        default: function _default() {
          return [h('sw-icon', {
            staticClass: 'margin-min',
            style: {
              opacity: checked ? 1 : 0.6
            },
            props: {
              size: '20px',
              name: checked ? 'radio_button_checked' : 'radio_button_unchecked',
              color: colorRadio ? _this.color : void 0,
              primary: colorRadio ? _this.primary : void 0,
              negative: colorRadio ? _this.negative : void 0,
              positive: colorRadio ? _this.positive : void 0,
              warning: colorRadio ? _this.warning : void 0
            }
          })];
        },
        after: this.label && !this.leftLabel ? getLabel : void 0
      }
    });
  }
};

var install$b = function install(Vue) {
  Vue.component(Radio.name, Radio);
};

Radio.install = install$b;

var RadioGroup = {
  name: 'swRadioGroup',
  mixins: [Field, ShuttleMixin],
  // focused,disabled,shuttleRef
  props: {
    value: {
      required: true
    }
  },
  data: function data() {
    return {
      innerPointer: true,
      shuttleRef: 'radio'
    };
  },
  computed: {},
  watch: {},
  methods: {}
};

var install$c = function install(Vue) {
  Vue.component(RadioGroup.name, RadioGroup);
};

RadioGroup.install = install$c;

/**
 *
 *
 * @param {*} total  分页总数
 * @param {*} cur  当前页面  3
 * @param {*} around   1 2 3 4 5   around = 2
 * @returns
 */
var makeResult = function makeResult(total, cur, around) {
  var result = [];
  var baseCount = around * 2 + 1 + 2 + 2 + 2; //总共元素个数

  var surplus = baseCount - 4; //只出现一个省略号 剩余元素个数

  var startPosition = 1 + 2 + around,
      endPosition = total - 2 - around;

  if (total <= baseCount - 2) {
    //全部显示 不出现省略号
    result = Array.from({
      length: total
    }, function (v, i) {
      return i + 1;
    });
  } else {
    //需要出现省略号
    if (cur <= startPosition) {
      //1.只有后面出现省略号
      result = [].concat(_toConsumableArray(Array.from({
        length: surplus
      }, function (v, i) {
        return i + 1;
      })), ["···", total]);
    } else if (cur >= endPosition) {
      //2.只有前边出现省略号
      result = [1, '···'].concat(_toConsumableArray(Array.from({
        length: surplus
      }, function (v, i) {
        return total - surplus + i + 1;
      })));
    } else {
      //3.两边都有省略号
      result = [1, '···'].concat(_toConsumableArray(Array.from({
        length: around * 2 + 1
      }, function (v, i) {
        return cur - around + i;
      })), ['···', total]);
    }
  }

  return result;
};

//
var script = {
  name: 'swPagination',
  data: function data() {
    return {
      currentPageValue: this.currentPage,
      pageTotal: '',
      pageSizeValue: this.pageSize,
      inputValue: '1'
    };
  },
  props: {
    total: {
      type: Number
    },
    pageSize: {
      type: Number,
      default: 20
    },
    options: {
      type: Array,
      default: [20, 40, 60, 80]
    },
    currentPage: {
      type: Number
    },
    around: {
      type: Number
    },
    layout: {
      type: String
    }
  },
  watch: {
    currentPageValue: function currentPageValue() {
      this.$emit('current-change', this.currentPageValue);
    },
    pageSizeValue: function pageSizeValue() {
      this.$emit('size-change', this.pageSizeValue);
    }
  },
  computed: {
    selectOption: function selectOption() {
      var ary = [];
      this.options.map(function (i) {
        var item = {};
        item.name = "".concat(i, "\u6761/\u9875");
        item.value = i;
        ary.push(item);
      });
      return ary;
    },
    paginationList: function paginationList() {
      var pageTotal = this.pageTotal = this.total / this.pageSizeValue;

      if ("".concat(pageTotal).indexOf('.') > -1) {
        pageTotal = this.pageTotal = parseInt(pageTotal + 1);
      }

      if (this.currentPageValue > pageTotal) {
        this.currentPageValue = pageTotal;
      }

      var pageList = makeResult(pageTotal, this.currentPageValue, this.around);
      return pageList;
    }
  },
  components: {
    swSelect: Select,
    swInput: Input
  },
  methods: {
    handleEnterGoto: function handleEnterGoto() {
      var page = parseInt(this.inputValue);

      if (page < 1) {
        this.inputValue = '1';
      }

      if (page > this.pageTotal) {
        this.inputValue = "".concat(this.pageTotal);
      }

      this.currentPageValue = parseInt(this.inputValue);
      this.inputValue = "".concat(parseInt(this.inputValue));
    },
    handleClickPage: function handleClickPage(item, index) {
      if (item === '···') {
        if (index === 1) {
          this.currentPageValue = 3;
        } else {
          this.currentPageValue = this.pageTotal - 2;
        }
      } else {
        this.currentPageValue = item;
      }
    },
    handleClickArrow: function handleClickArrow(params) {
      if (params === 'left') {
        if (this.currentPageValue !== 1) {
          this.currentPageValue = this.currentPageValue - 1;
        } else {
          this.currentPageValue = 1;
        }
      } else {
        if (this.currentPageValue !== this.pageTotal) {
          this.currentPageValue = this.currentPageValue + 1;
        } else {
          this.currentPageValue = this.pageTotal;
        }
      }
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
  return function (id, style) {
    return addStyle(id, style);
  };
}
var HEAD = document.head || document.getElementsByTagName('head')[0];
var styles = {};

function addStyle(id, css) {
  var group = isOldIE ? css.media || 'default' : id;
  var style = styles[group] || (styles[group] = {
    ids: new Set(),
    styles: []
  });

  if (!style.ids.has(id)) {
    style.ids.add(id);
    var code = css.source;

    if (css.map) {
      // https://developer.chrome.com/devtools/docs/javascript-debugging
      // this makes source maps inside style tags work properly in Chrome
      code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

      code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
    }

    if (!style.element) {
      style.element = document.createElement('style');
      style.element.type = 'text/css';
      if (css.media) style.element.setAttribute('media', css.media);
      HEAD.appendChild(style.element);
    }

    if ('styleSheet' in style.element) {
      style.styles.push(code);
      style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
    } else {
      var index = style.ids.size - 1;
      var textNode = document.createTextNode(code);
      var nodes = style.element.childNodes;
      if (nodes[index]) style.element.removeChild(nodes[index]);
      if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
    }
  }
}

var browser = createInjector;

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "sw-pagination" }, [
    _vm.layout.indexOf("total") > -1
      ? _c("div", { staticClass: "sw-pagination-total" }, [
          _vm._v(" \n    " + _vm._s("共" + _vm.total + "条") + "\n  ")
        ])
      : _vm._e(),
    _vm._v(" "),
    _vm.layout.indexOf("select") > -1
      ? _c(
          "div",
          { staticClass: "sw-pagination-select" },
          [
            _c("sw-select", {
              attrs: {
                options: _vm.selectOption,
                selectedFilled: "",
                bordered: "",
                mini: "",
                selectedStyle: "none"
              },
              model: {
                value: _vm.pageSizeValue,
                callback: function($$v) {
                  _vm.pageSizeValue = $$v;
                },
                expression: "pageSizeValue"
              }
            })
          ],
          1
        )
      : _vm._e(),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "sw-pagination-page" },
      [
        _c(
          "span",
          {
            staticClass: "sw-pagination-page-item",
            on: {
              click: function($event) {
                return _vm.handleClickArrow("left")
              }
            }
          },
          [
            _c(
              "i",
              { staticClass: "material-icons sw-pagination-page-item-icon" },
              [_vm._v("keyboard_arrow_left")]
            )
          ]
        ),
        _vm._v(" "),
        _vm._l(_vm.paginationList, function(item, index) {
          return _c(
            "span",
            {
              class: [
                "sw-pagination-page-item",
                _vm.currentPageValue === item ? "active" : ""
              ],
              on: {
                click: function($event) {
                  return _vm.handleClickPage(item, index)
                }
              }
            },
            [
              item === "···"
                ? _c(
                    "i",
                    {
                      staticClass: "material-icons sw-pagination-page-item-icon"
                    },
                    [_vm._v("more_horiz")]
                  )
                : _c("span", [_vm._v("\n        " + _vm._s(item) + "\n      ")])
            ]
          )
        }),
        _vm._v(" "),
        _c(
          "span",
          {
            staticClass: "sw-pagination-page-item",
            on: {
              click: function($event) {
                return _vm.handleClickArrow("right")
              }
            }
          },
          [
            _c(
              "i",
              { staticClass: "material-icons sw-pagination-page-item-icon" },
              [_vm._v("keyboard_arrow_right")]
            )
          ]
        )
      ],
      2
    ),
    _vm._v(" "),
    _vm.layout.indexOf("goto") > -1
      ? _c("div", { staticClass: "sw-pagination-goto" }, [
          _c("span", [_vm._v("前往")]),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "sw-pagination-goto-input" },
            [
              _c("sw-input", {
                staticStyle: { width: "40px" },
                attrs: { bordered: "", mini: "" },
                nativeOn: {
                  keyup: function($event) {
                    if (
                      !$event.type.indexOf("key") &&
                      _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                    ) {
                      return null
                    }
                    return _vm.handleEnterGoto($event)
                  }
                },
                model: {
                  value: _vm.inputValue,
                  callback: function($$v) {
                    _vm.inputValue = $$v;
                  },
                  expression: "inputValue"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c("span", [_vm._v("页")])
        ])
      : _vm._e()
  ])
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-7ca3191a_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"main.vue"}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  

  
  var Pagination = normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    browser,
    undefined
  );

var install$d = function install(Vue) {
  Vue.component(Pagination.name, Pagination);
};

Pagination.install = install$d;

var SlideObserver = {
  data: function data() {
    return {
      observer: void 0,
      measuredWidth: void 0
    };
  },
  computed: {
    target: function target() {
      return this.horizontal ? 'width' : 'height';
    },
    measureTarget: function measureTarget() {
      return this.horizontal ? 'offsetWidth' : 'offsetHeight';
    },
    minSize: function minSize() {
      return this.min !== void 0 ? "".concat(this.min, "px") : 0;
    }
  },
  methods: {
    initStyle: function initStyle() {
      if (this.innerCollapsed) {
        this.$refs.slide.style[this.target] = this.minSize;
      }
    },
    setStyle: function setStyle(passive) {
      var _this = this;

      var slideTarget = this.$refs.slide;

      if (passive && !slideTarget.style[this.target]) {
        return;
      }

      slideTarget.style[this.target] = "".concat(this.$refs.observe[this.measureTarget], "px");

      if (this.innerCollapsed) {
        setTimeout(function () {
          slideTarget.style[_this.target] = _this.minSize;
        }, 0);
      }
    },
    clearUpperStyle: function clearUpperStyle(upper) {
      var upperSlideTarget = upper.$refs.slide;

      if (upperSlideTarget) {
        if (upperSlideTarget.style[this.target]) {
          upperSlideTarget.style[this.target] = null;
        }
      }

      if (upper.$parent && upper.$parent.$refs) {
        this.clearUpperStyle(upper.$parent);
      }
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    if (!this.$refs.slide || !this.$refs.observe) {
      return;
    }

    this.$watch('innerCollapsed', function () {
      _this2.clearUpperStyle(_this2.$parent);

      _this2.setStyle();
    });
    this.initStyle();
    this.observer = new MutationObserver(function () {
      _this2.setStyle(true);
    });
    this.observer.observe(this.$refs.observe, {
      childList: true,
      subtree: true,
      characterData: true
    });
  },
  beforeDestroy: function beforeDestroy() {
    this.observer && this.observer.disconnect();
  }
};

var Slide = {
  name: 'swSlide',
  mixins: [SlideObserver],
  props: {
    collapsed: Boolean,
    horizontal: Boolean,
    fit: Boolean,
    min: Number | String
  },
  data: function data() {
    return {
      innerCollapsed: true
    };
  },
  watch: {
    collapsed: {
      handler: function handler() {
        this.innerCollapsed = this.collapsed;
      },
      immediate: true
    }
  },
  render: function render(h) {
    return h('div', {
      ref: 'slide',
      staticClass: 'sw-slide__container'
    }, [h('div', {
      ref: 'observe',
      staticClass: "sw-slide__content",
      class: {
        'min-width': this.horizontal && !this.fit,
        'fit-width': this.horizontal && this.fit,
        'min-height': !this.horizontal && !this.fit,
        'fit-height': !this.horizontal && this.fit
      }
    }, [this.$scopedSlots.default()])]);
  }
};

var install$e = function install(Vue) {
  Vue.component(Slide.name, Slide);
};

Slide.install = install$e;

var BasicItem = {
  name: 'swBasicItem',
  components: {
    Slide: Slide
  },
  props: {
    content: String,
    subContent: String,
    icon: String,
    disabled: Boolean,
    color: String,
    primary: Boolean,
    negative: Boolean,
    positive: Boolean,
    warning: Boolean,
    collapsed: {
      type: Boolean,
      default: true
    },
    split: Boolean,
    mini: Boolean,
    to: String | Object,
    indentLevel: Number | String,
    center: Boolean,
    end: Boolean,
    min: Number | String,
    mask: Object | Boolean,
    ripple: Object | Boolean,
    sub: Array
  },
  data: function data() {
    return {
      innerCollapsed: true,
      mouseover: false
    };
  },
  watch: {
    collapsed: {
      handler: function handler() {
        this.innerCollapsed = this.collapsed;
      },
      immediate: true
    }
  },
  render: function render(h) {
    var _this = this;

    return h('div', {
      staticClass: 'sw-basic-item',
      class: {
        split: this.split && !this.innerCollapsed
      },
      on: this.disabled ? void 0 : _objectSpread({}, this.$listeners)
    }, [h('div', {
      staticClass: 'sw-basic-item__main',
      class: {
        'color-primary': !this.disabled && this.primary,
        'color-negative': !this.disabled && this.negative,
        'color-positive': !this.disabled && this.positive,
        'color-warning': !this.disabled && this.warning,
        disable: this.disabled
      },
      style: {
        color: !this.disabled && this.color
      }
    }, [h('sw-item', {
      staticClass: 'sw-basic-item__inner',
      props: {
        to: this.to,
        center: this.center,
        end: this.end,
        disabled: this.disabled,
        mask: this.mask,
        ripple: this.ripple
      },
      class: {
        expand: !this.innerCollapsed
      },
      style: {
        'padding-left': "".concat(this.indentLevel * 12, "px"),
        cursor: !this.disabled && (this.to !== void 0 || this.$scopedSlots.default || this.sub !== void 0) ? 'pointer' : void 0
      },
      on: this.disabled ? void 0 : _objectSpread({}, this.$listeners, {
        click: function click() {
          if (_this.$scopedSlots.default || _this.sub !== void 0) {
            _this.innerCollapsed = !_this.innerCollapsed;
          }
        },
        mouseover: function mouseover() {
          _this.mouseover = true;
        },
        mouseout: function mouseout() {
          _this.mouseover = false;
        }
      }),
      scopedSlots: {
        before: this.$scopedSlots.before !== void 0 ? this.$scopedSlots.before : this.icon !== void 0 ? function () {
          return [h('sw-icon', {
            staticClass: 'sw-basic-item__icon',
            props: {
              name: _this.icon
            }
          })];
        } : void 0,
        default: function _default() {
          return [h('div', {
            staticClass: 'sw-basic-item__content flex items-center',
            class: {
              'space-left': _this.$scopedSlots.before !== void 0 || _this.icon !== void 0,
              'space-right': (_this.$scopedSlots.after !== void 0 || _this.$scopedSlots.default !== void 0 || _this.sub !== void 0) && (_this.$scopedSlots.content !== void 0 || _this.content !== void 0 || _this.subContent !== void 0)
            },
            style: {
              'min-height': _this.mini ? '36px' : '48px'
            }
          }, _this.$scopedSlots.content !== void 0 ? [_this.$scopedSlots.content()] : [h('div', {
            staticClass: 'default-content'
          }, [_this.content !== void 0 ? h('div', {
            staticClass: 'sw-basic-item__label'
          }, _this.content) : void 0, _this.subContent !== void 0 ? h('div', {
            staticClass: 'sw-basic-item__sublabel'
          }, _this.subContent) : void 0])])];
        },
        after: this.$scopedSlots.default || this.sub !== void 0 ? function () {
          return [h('sw-icon', {
            staticClass: 'sw-basic-item__expansion color-grey',
            style: {
              transform: !_this.innerCollapsed ? 'rotate(180deg)' : void 0,
              color: _this.mouseover ? 'currentColor' : void 0
            },
            props: {
              name: 'keyboard_arrow_down'
            }
          })];
        } : this.$scopedSlots.after !== void 0 ? this.$scopedSlots.after : void 0
      }
    })]), this.$scopedSlots.default || this.sub !== void 0 ? h(Slide, {
      props: {
        collapsed: this.innerCollapsed,
        min: this.min
      },
      scopedSlots: {
        default: function _default() {
          var sub = _this.sub !== void 0 ? _this.sub.map(function (props) {
            var position = !!props.center || !!props.end || false;
            return h('sw-basic-item', {
              props: {
                content: props.content,
                subContent: props.subContent,
                icon: props.icon,
                disabled: props.disabled,
                collapsed: props.collapsed,
                to: props.to,
                sub: props.sub,
                color: props.color,
                primary: props.primary,
                negative: props.negative,
                positive: props.positive,
                warning: props.warning,
                center: position ? props.center : _this.center,
                end: position ? props.end : _this.end,
                split: props.split || _this.split,
                mini: props.mini || _this.mini,
                indentLevel: props.indentLevel || _this.indentLevel,
                min: props.min || _this.min,
                mask: props.mask || _this.mask,
                ripple: props.ripple || _this.ripple
              }
            });
          }) : [];
          sub.unshift(_this.$scopedSlots.default ? _this.$scopedSlots.default() : void 0);
          return sub;
        }
      }
    }) : void 0]);
  }
};

var install$f = function install(Vue) {
  Vue.component(BasicItem.name, BasicItem);
};

BasicItem.install = install$f;

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
function isVNode(node) {
  return node !== null && _typeof(node) === 'object' && hasOwn(node, 'componentOptions');
}

var Notification = {
  name: 'swNotification',
  data: function data() {
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
    };
  },
  methods: {
    handleBtn: function handleBtn() {
      this.show = false;

      if (typeof this.onClose === 'function') {
        this.onClose();
      }
    }
  },
  computed: {
    verticalProperty: function verticalProperty() {
      return /^top-/.test(this.position) ? 'top' : 'bottom';
    },
    positionStyle: function positionStyle() {
      return _defineProperty({}, this.verticalProperty, "".concat(this.verticalOffset, "px"));
    },
    getVnode: function getVnode() {
      if (isVNode(this.slot)) {
        return this.slot;
      }

      console.error('Please check your Vnode writing');
      return null;
    }
  },
  render: function render(h) {
    var _this = this;

    return h('transition', {
      attrs: {
        name: 'sw-notification-fade'
      }
    }, [this.show ? h('div', {
      class: 'sw-notification',
      style: Object.assign(this.positionStyle, {
        background: this.background
      })
    }, [this.getVnode ? '' : h('h2', {
      class: 'title'
    }, this.title), this.getVnode ? this.getVnode : h('div', {
      class: 'content'
    }, this.content), h('div', {
      class: 'close',
      style: {
        color: this.closeColor
      }
    }, [h('div', {
      class: 'material-icons',
      on: {
        click: function click() {
          _this.handleBtn();
        }
      }
    }, 'close')])]) : void 0]);
  }
};

var NotificationConstructor = Vue.extend(Notification);
var instance;
var instances = [];
var seed = 1;

var NotificationFun = function NotificationFun(options) {
  if (Vue.prototype.$isServer) return;
  options = options || {};
  var userOnClose = options.onClose;
  var id = 'notification_' + seed++;
  var position = options.position || 'top-right';

  options.onClose = function () {
    Notification.close(id, userOnClose);
  };

  instance = new NotificationConstructor({
    data: options
  });
  instance.id = id;
  instance.$mount();
  document.body.appendChild(instance.$el);
  instance.show = true;
  var verticalOffset = 0;
  instances.filter(function (item) {
    return item.position === position;
  }).forEach(function (element) {
    verticalOffset += element.$el.offsetHeight + 16;
  });
  verticalOffset += 16;
  instance.verticalOffset = verticalOffset;
  instances.push(instance);
  console.log();
  return instance;
};

Notification.close = function (id, userOnClose) {
  var index = -1;
  var len = instances.length;
  var instance = instances.filter(function (instance, i) {
    if (instance.id === id) {
      index = i;
      return true;
    }

    return false;
  })[0];
  if (!instance) return;

  if (typeof userOnClose === 'function') {
    userOnClose(instance);
  }

  instances.splice(index, 1);
  if (len <= 1) return;
  var position = instance.position;
  var removedHeight = instance.$el.offsetHeight;

  for (var i = index; i < len - 1; i++) {
    if (instances[i].position === position) {
      instances[i].$el.style[instance.verticalProperty] = parseInt(instances[i].$el.style[instance.verticalProperty], 10) - removedHeight - 16 + 'px';
    }
  }
};

var Layout = {
  name: 'swLayout',
  components: {
    Slide: Slide
  },
  props: {
    collapseTop: Boolean,
    collapseLeft: Boolean,
    collapseRight: Boolean,
    collapseBottom: Boolean,
    fitTop: Boolean,
    fitLeft: Boolean,
    fitRight: Boolean,
    fitBottom: Boolean,
    topMin: Number | String,
    leftMin: Number | String,
    rightMin: Number | String,
    bottomMin: Number | String
  },
  data: function data() {
    return {};
  },
  computed: {
    verticalStretch: function verticalStretch() {
      return this.$scopedSlots.top !== void 0 || this.$scopedSlots.bottom !== void 0;
    }
  },
  render: function render(h) {
    return h('div', {
      staticClass: 'sw-layout flex no-wrap',
      style: {
        'flex-direction': this.verticalStretch && 'column'
      }
    }, [this.$scopedSlots.top !== void 0 ? h(Slide, {
      props: {
        collapsed: this.collapseTop,
        fit: this.fitTop,
        min: this.topMin
      },
      staticClass: 'sw-layout__around',
      scopedSlots: {
        default: this.$scopedSlots.top
      }
    }) : void 0, !this.verticalStretch && this.$scopedSlots.left !== void 0 ? h(Slide, {
      props: {
        collapsed: this.collapseLeft,
        horizontal: true,
        fit: this.fitLeft,
        min: this.leftMin
      },
      staticClass: 'sw-layout__around',
      scopedSlots: {
        default: this.$scopedSlots.left
      }
    }) : void 0, h('div', {
      ref: 'layoutMain',
      staticClass: 'sw-layout__main'
    }, [[this.$scopedSlots.default !== void 0 ? this.$scopedSlots.default() : void 0]]), !this.verticalStretch && this.$scopedSlots.right !== void 0 ? h(Slide, {
      props: {
        collapsed: this.collapseRight,
        horizontal: true,
        fit: this.fitRight,
        min: this.rightMin
      },
      staticClass: 'sw-layout__around',
      scopedSlots: {
        default: this.$scopedSlots.right
      }
    }) : void 0, this.$scopedSlots.bottom !== void 0 ? h(Slide, {
      props: {
        collapsed: this.collapseBottom,
        fit: this.fitBottom,
        min: this.bottomMin
      },
      staticClass: 'sw-layout__around',
      scopedSlots: {
        default: this.$scopedSlots.bottom
      }
    }) : void 0]);
  }
};

var install$g = function install(Vue) {
  Vue.component(Layout.name, Layout);
};

Layout.install = install$g;

var _showMask = function showMask(ctx) {
  if (!ctx.disabled && !ctx.stay) {
    ctx.node.classList.remove('invisible');
  }
};

var _hideMask = function hideMask(ctx) {
  if (!ctx.disabled && !ctx.stay) {
    ctx.node.classList.add('invisible');
  }
};

var disableMask = function disableMask(ctx) {
  if (ctx.disabled && !ctx.stay) {
    ctx.node.classList.add('invisible');
  }
};

var stayMask = function stayMask(ctx) {
  if (ctx.stay) {
    ctx.node.classList.remove('invisible');
  } else {
    ctx.node.classList.add('invisible');
  }
};

var colorMask = function colorMask(ctx) {
  ctx.node.style.color = ctx.color;
};

var getDisabled = function getDisabled(value) {
  return value !== void 0 && (value.disabled === true || false);
};

var getStay = function getStay(value) {
  return value !== void 0 && (value.stay === true || false);
};

var getColor = function getColor(value) {
  return value !== void 0 && value.color || void 0;
};

var initMask = function initMask(el, binding) {
  var node = document.createElement('div');
  var ctx = {
    node: node,
    disabled: getDisabled(binding.value),
    stay: getStay(binding.value),
    color: getColor(binding.value),
    showMask: function showMask() {
      _showMask(ctx);
    },
    hideMask: function hideMask() {
      _hideMask(ctx);
    }
  };
  ctx.node.classList.add('sw-mask');
  disableMask(ctx);
  stayMask(ctx);
  colorMask(ctx);

  _hideMask(ctx);

  el.maskCtx = ctx;
};

var Mask = {
  name: 'mask',
  bind: function bind(el, binding) {
    initMask(el, binding);
    el.appendChild(el.maskCtx.node);
    el.addEventListener('mouseover', el.maskCtx.showMask, false);
    el.addEventListener('mouseout', el.maskCtx.hideMask, false);
  },
  update: function update(el, binding) {
    el.maskCtx.disabled = getDisabled(binding.value);

    if (getDisabled(binding.oldValue) !== el.maskCtx.disabled) {
      disableMask(el.maskCtx);
    }

    el.maskCtx.stay = getStay(binding.value);

    if (getStay(binding.oldValue) !== el.maskCtx.stay) {
      stayMask(el.maskCtx);
    }

    el.maskCtx.color = getColor(binding.value);

    if (getColor(binding.oldValue) !== el.maskCtx.color) {
      colorMask(el.maskCtx);
    }
  },
  unbind: function unbind(el) {
    if (el.maskCtx) {
      el.maskCtx.node.remove();
      el.removeEventListener('mouseover', el.maskCtx.showMask, false);
      el.removeEventListener('mouseout', el.maskCtx.hideMask, false);
      delete el.maskCtx;
    }
  }
};

var install$h = function install(Vue) {
  Vue.directive(Mask.name, Mask);
};

Mask.install = install$h;

function position(e) {
  if (e.touches && e.touches[0]) {
    e = e.touches[0];
  } else if (e.changedTouches && e.changedTouches[0]) {
    e = e.changedTouches[0];
  }

  return {
    top: e.clientY,
    left: e.clientX
  };
}

function showRipple(evt, el, ctx, forceCenter) {
  if (ctx.modifiers.stop === true) {
    evt.stopPropagation();
  }

  var _ctx$modifiers = ctx.modifiers,
      center = _ctx$modifiers.center,
      color = _ctx$modifiers.color;
  center = center === true || forceCenter === true;
  var node = document.createElement('span');
  var innerNode = document.createElement('span');
  var pos = position(evt);

  var _el$getBoundingClient = el.getBoundingClientRect(),
      left = _el$getBoundingClient.left,
      top = _el$getBoundingClient.top,
      width = _el$getBoundingClient.width,
      height = _el$getBoundingClient.height;

  var diameter = Math.sqrt(width * width + height * height);
  var radius = diameter / 2;
  var centerX = "".concat((width - diameter) / 2, "px");
  var x = center ? centerX : "".concat(pos.left - left - radius, "px");
  var centerY = "".concat((height - diameter) / 2, "px");
  var y = center ? centerY : "".concat(pos.top - top - radius, "px");
  var timer = setTimeout(function () {
    innerNode.classList.add('sw-ripple__inner--enter');
    innerNode.style.transform = "translate3d(".concat(centerX, ", ").concat(centerY, ", 0) scale3d(1, 1, 1)");
    innerNode.style.opacity = 0.2;
    timer = setTimeout(function () {
      innerNode.classList.remove('sw-ripple__inner--enter');
      innerNode.classList.add('sw-ripple__inner--leave');
      innerNode.style.opacity = 0;
      timer = setTimeout(function () {
        node && node.remove();
        ctx.abort = void 0;
      }, 275);
    }, 250);
  }, 50);
  innerNode.className = 'sw-ripple__inner';
  css(innerNode, {
    height: "".concat(diameter, "px"),
    width: "".concat(diameter, "px"),
    transform: "translate3d(".concat(x, ", ").concat(y, ", 0) scale3d(0.2, 0.2, 1)"),
    opacity: 0
  });

  if (color) {
    css(node, {
      color: color
    });
  }

  node.className = "sw-ripple";
  node.appendChild(innerNode);
  el.appendChild(node);

  ctx.abort = function () {
    node && node.remove();
    clearTimeout(timer);
  };
}

function updateCtx(ctx, _ref) {
  var value = _ref.value,
      modifiers = _ref.modifiers,
      arg = _ref.arg;
  ctx.disabled = value && value.disabled || false;

  if (!ctx.disabled) {
    ctx.modifiers = Object(value) === value ? {
      stop: value.stop === true || modifiers.stop === true,
      center: value.center === true || modifiers.center === true,
      color: value.color || arg
    } : {
      stop: modifiers.stop,
      center: modifiers.center,
      color: arg
    };
  }
}

var Ripple = {
  name: 'ripple',
  inserted: function inserted(el, binding) {
    var ctx = {
      modifiers: {},
      click: function click(evt) {
        if (!ctx.disabled) {
          showRipple(evt, el, ctx);
        }
      },
      keyup: function keyup(evt) {
        if (!ctx.disabled && evt.keyCode === 13) {
          showRipple(evt, el, ctx, true);
        }
      }
    };
    updateCtx(ctx, binding);

    if (el.rippleCtx) {
      el.rippleCtxOld = el.rippleCtx;
    }

    el.rippleCtx = ctx;
    el.addEventListener('click', ctx.click, false);
    el.addEventListener('keyup', ctx.keyup, false);
  },
  update: function update(el, binding) {
    el.rippleCtx !== void 0 && updateCtx(el.rippleCtx, binding);
  },
  unbind: function unbind(el) {
    var ctx = el.rippleCtxOld || el.rippleCtx;

    if (ctx !== void 0) {
      ctx.abort !== void 0 && ctx.abort();
      el.removeEventListener('click', ctx.click, false);
      el.removeEventListener('keyup', ctx.keyup, false);
      delete el[el.rippleCtxOld ? 'rippleCtxOld' : 'rippleCtx'];
    }
  }
};

var install$i = function install(Vue) {
  Vue.directive(Ripple.name, Ripple);
};

Ripple.install = install$i;

var components = [Icon, Item, Field, Input, Select, ScrollArea, Modal$1, Popover, Button, Pagination, Checkbox, CheckboxGroup, Radio, RadioGroup, BasicItem, Layout, Slide];
var directives = [Ripple, Mask];

var install$j = function install(Vue) {
  components.forEach(function (component) {
    Vue.component(component.name, component);
  });
  directives.forEach(function (directive) {
    Vue.directive(directive.name, directive);
  });
  Vue.prototype.$notify = NotificationFun;
};

if (typeof window !== 'undefined' && window.Vue) {
  install$j(window.Vue);
}

var index = {
  install: install$j,
  Icon: Icon,
  Item: Item,
  Field: Field,
  Input: Input,
  Select: Select,
  ScrollArea: ScrollArea,
  Popover: Popover,
  Modal: Modal$1,
  Button: Button,
  Pagination: Pagination,
  Checkbox: Checkbox,
  CheckboxGroup: CheckboxGroup,
  Radio: Radio,
  RadioGroup: RadioGroup,
  BasicItem: BasicItem,
  Notification: NotificationFun,
  Layout: Layout,
  Slide: Slide,
  Ripple: Ripple,
  Mask: Mask
};

export default index;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2t5d2Fsa2VyLmVzbS5qcyIsInNvdXJjZXMiOlsiLi4vcGFja2FnZXMvY29tcG9uZW50cy9pY29uL3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9pY29uL2luZGV4LmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9pdGVtL3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9pdGVtL2luZGV4LmpzIiwiLi4vcGFja2FnZXMvbWl4aW5zL3ZhbGlkYXRlLmpzIiwiLi4vcGFja2FnZXMvbWl4aW5zL2FkdmFuY2VkQmx1ci5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvZmllbGQvc3JjL21haW4uanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL2ZpZWxkL2luZGV4LmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9pbnB1dC9zcmMvbWFpbi5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvaW5wdXQvaW5kZXguanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3Njcm9sbEFyZWEvc3JjL21haW4uanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3Njcm9sbEFyZWEvaW5kZXguanMiLCIuLi9wYWNrYWdlcy91dGlscy9pcy5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvc2VsZWN0L3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9zZWxlY3QvaW5kZXguanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL2J1dHRvbi9zcmMvbWFpbi5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvYnV0dG9uL2luZGV4LmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9tb2RhbC9zcmMvbWFpbi5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvbW9kYWwvaW5kZXguanMiLCIuLi9wYWNrYWdlcy91dGlscy9kb20uanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3BvcG92ZXIvc3JjL21haW4uanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3BvcG92ZXIvaW5kZXguanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL2NoZWNrYm94L3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9jaGVja2JveC9pbmRleC5qcyIsIi4uL3BhY2thZ2VzL21peGlucy9zaHV0dGxlLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9jaGVja2JveEdyb3VwL3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9jaGVja2JveEdyb3VwL2luZGV4LmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9yYWRpby9zcmMvbWFpbi5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvcmFkaW8vaW5kZXguanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3JhZGlvR3JvdXAvc3JjL21haW4uanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3JhZGlvR3JvdXAvaW5kZXguanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3BhZ2luYXRpb24vc3JjL3BhZ2luYXRpb24uanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3BhZ2luYXRpb24vc3JjL21haW4udnVlIiwiLi4vbm9kZV9tb2R1bGVzL3Z1ZS1ydW50aW1lLWhlbHBlcnMvZGlzdC9ub3JtYWxpemUtY29tcG9uZW50LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Z1ZS1ydW50aW1lLWhlbHBlcnMvZGlzdC9pbmplY3Qtc3R5bGUvYnJvd3Nlci5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvcGFnaW5hdGlvbi9pbmRleC5qcyIsIi4uL3BhY2thZ2VzL21peGlucy9zbGlkZU9ic2VydmVyLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9zbGlkZS9zcmMvbWFpbi5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvc2xpZGUvaW5kZXguanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL2Jhc2ljSXRlbS9zcmMvbWFpbi5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvYmFzaWNJdGVtL2luZGV4LmpzIiwiLi4vcGFja2FnZXMvdXRpbHMvdmRvbS5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvbm90aWZpY2F0aW9uL3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9ub3RpZmljYXRpb24vc3JjL25vdGlmaWNhdGlvbi5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvbGF5b3V0L3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9sYXlvdXQvaW5kZXguanMiLCIuLi9wYWNrYWdlcy9kaXJlY3RpdmVzL21hc2svc3JjL21haW4uanMiLCIuLi9wYWNrYWdlcy9kaXJlY3RpdmVzL21hc2svaW5kZXguanMiLCIuLi9wYWNrYWdlcy91dGlscy9ldmVudC5qcyIsIi4uL3BhY2thZ2VzL2RpcmVjdGl2ZXMvcmlwcGxlL3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvZGlyZWN0aXZlcy9yaXBwbGUvaW5kZXguanMiLCIuLi9wYWNrYWdlcy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdzd0ljb24nLFxuICBwcm9wczoge1xuICAgIG5hbWU6IFN0cmluZyxcbiAgICBjb2xvcjogU3RyaW5nLFxuICAgIHByaW1hcnk6IEJvb2xlYW4sXG4gICAgbmVnYXRpdmU6IEJvb2xlYW4sXG4gICAgcG9zaXRpdmU6IEJvb2xlYW4sXG4gICAgd2FybmluZzogQm9vbGVhbixcbiAgICBncmV5OiBCb29sZWFuLFxuICAgIGxpZ2h0R3JleTogQm9vbGVhbixcbiAgICBzaXplOiBTdHJpbmdcbiAgfSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBjbGFzc2VzKCkge1xuICAgICAgbGV0IGNsc1xuICAgICAgY29uc3QgaWNvbiA9IHRoaXMubmFtZVxuICBcbiAgICAgIGlmICghaWNvbikge1xuICAgICAgICByZXR1cm5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNscyA9ICdtYXRlcmlhbC1pY29ucydcbiAgICAgIH1cbiAgICAgIHJldHVybiB7XG4gICAgICAgIFtjbHNdOiB0cnVlLFxuICAgICAgICAnY29sb3ItcHJpbWFyeSc6IHRoaXMucHJpbWFyeSxcbiAgICAgICAgJ2NvbG9yLW5lZ2F0aXZlJzogdGhpcy5uZWdhdGl2ZSxcbiAgICAgICAgJ2NvbG9yLXBvc2l0aXZlJzogdGhpcy5wb3NpdGl2ZSxcbiAgICAgICAgJ2NvbG9yLXdhcm5pbmcnOiB0aGlzLndhcm5pbmcsXG4gICAgICAgICdjb2xvci1ncmV5JzogdGhpcy5ncmV5LFxuICAgICAgICAnY29sb3ItbGlnaHQtZ3JleSc6IHRoaXMubGlnaHRHcmV5LFxuICAgICAgfVxuICAgIH0sXG4gICAgY29udGVudCgpIHtcbiAgICAgIHJldHVybiB0aGlzLm5hbWUgfHwgJyAnXG4gICAgfSxcbiAgICBzdHlsZSgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGZvbnRTaXplOiB0aGlzLnNpemUgfHwgdm9pZCAwLFxuICAgICAgICBjb2xvcjogdGhpcy5jb2xvciB8fCB2b2lkIDBcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIHJlbmRlcihoKSB7XG4gICAgcmV0dXJuIGgoJ2knLCB7XG4gICAgICBzdGF0aWNDbGFzczogJ3N3LWljb24nLFxuICAgICAgY2xhc3M6IHRoaXMuY2xhc3NlcyxcbiAgICAgIHN0eWxlOiB0aGlzLnN0eWxlLFxuICAgICAgYXR0cnM6IHsgJ2FyaWEtaGlkZGVuJzogdHJ1ZSB9LFxuICAgICAgb246IHRoaXMuJGxpc3RlbmVyc1xuICAgIH0sIFtcbiAgICAgIHRoaXMuY29udGVudFxuICAgIF0pXG4gIH1cbn1cbiAgIiwiaW1wb3J0IEljb24gZnJvbSAnLi9zcmMvbWFpbi5qcydcblxuY29uc3QgaW5zdGFsbCA9IGZ1bmN0aW9uIChWdWUpIHtcbiAgVnVlLmNvbXBvbmVudChJY29uLm5hbWUsIEljb24pXG59XG5cbkljb24uaW5zdGFsbCA9IGluc3RhbGxcblxuZXhwb3J0IGRlZmF1bHQgSWNvblxuIiwiZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnc3dJdGVtJyxcbiAgcHJvcHM6IHtcbiAgICB3cmFwOiBCb29sZWFuLFxuICAgIGhpZGVCZWZvcmU6IEJvb2xlYW4sXG4gICAgaGlkZURlZmF1bHQ6IEJvb2xlYW4sXG4gICAgaGlkZUFmdGVyOiBCb29sZWFuLFxuICAgIHRvOiBTdHJpbmcgfCBPYmplY3QsXG4gICAgY2VudGVyOiBCb29sZWFuLFxuICAgIGVuZDogQm9vbGVhbixcbiAgICBkaXNhYmxlZDogQm9vbGVhbixcbiAgICBtYXNrOiBPYmplY3QgfCBCb29sZWFuLFxuICAgIHJpcHBsZTogT2JqZWN0IHwgQm9vbGVhblxuICB9LFxuICBkYXRhOiAoKSA9PiAoe30pLFxuICByZW5kZXIoaCkge1xuICAgIHJldHVybiBoKGAke3RoaXMudG8gIT09IHZvaWQgMCA/ICdyb3V0ZXItbGluaycgOiAnZGl2J31gLCB7XG4gICAgICBzdGF0aWNDbGFzczogJ3N3LWl0ZW0gZmxleCBpdGVtcy1jZW50ZXInLFxuICAgICAgY2xhc3M6IHtcbiAgICAgICAgJ25vLXdyYXAnOiAhdGhpcy53cmFwLFxuICAgICAgICBkaXNhYmxlOiB0aGlzLmRpc2FibGVkXG4gICAgICB9LFxuICAgICAgb246IHRoaXMuZGlzYWJsZWQgPyB2b2lkIDAgOiB7XG4gICAgICAgIC4uLnRoaXMuJGxpc3RlbmVyc1xuICAgICAgfSxcbiAgICAgIHByb3BzOiB7XG4gICAgICAgIHRvOiB0aGlzLnRvXG4gICAgICB9LFxuICAgICAgZGlyZWN0aXZlczogKHRoaXMudG8gIT09IHZvaWQgMCB8fCB0aGlzLm1hc2sgIT09IHZvaWQgMCA/IFtcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdtYXNrJyxcbiAgICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMubWFzayAhPT0gdm9pZCAwICYmIHRoaXMubWFzay5kaXNhYmxlZCB8fCB0aGlzLm1hc2sgPT09IHZvaWQgMCAmJiB0aGlzLnRvICE9PSB2b2lkIDAsXG4gICAgICAgICAgICBjb2xvcjogdGhpcy5tYXNrICE9PSB2b2lkIDAgJiYgdGhpcy5tYXNrLmNvbG9yLFxuICAgICAgICAgICAgc3RheTogdGhpcy5tYXNrICE9PSB2b2lkIDAgJiYgdGhpcy5tYXNrLnN0YXlcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICBdIDogW10pLmNvbmNhdCh0aGlzLnJpcHBsZSAhPT0gdm9pZCAwID8gW1xuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ3JpcHBsZScsXG4gICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnJpcHBsZSAhPT0gdm9pZCAwICYmIHRoaXMucmlwcGxlLmRpc2FibGVkLFxuICAgICAgICAgICAgY29sb3I6IHRoaXMucmlwcGxlICE9PSB2b2lkIDAgJiYgdGhpcy5yaXBwbGUuY29sb3IsXG4gICAgICAgICAgICBjZW50ZXI6IHRoaXMucmlwcGxlICE9PSB2b2lkIDAgJiYgdGhpcy5yaXBwbGUuY2VudGVyXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBdIDogW10pXG4gICAgfSwgW1xuICAgICAgaCgnZGl2Jywge1xuICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWl0ZW1fX2NvbnRlbnQgZmxleCBpdGVtcy1jZW50ZXInLFxuICAgICAgICBjbGFzczoge1xuICAgICAgICAgICduby13cmFwJzogIXRoaXMud3JhcFxuICAgICAgICB9XG4gICAgICB9LCBbXG5cbiAgICAgICAgdGhpcy4kc2NvcGVkU2xvdHMuYmVmb3JlICE9PSB2b2lkIDAgPyBoKCdkaXYnLCB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1pdGVtX19iZWZvcmUgZmxleCBpdGVtcy1jZW50ZXInLFxuICAgICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgICBoaWRlOiB0aGlzLmhpZGVCZWZvcmUsXG4gICAgICAgICAgICAnZmxleC1hdXRvJzogdGhpcy5oaWRlRGVmYXVsdCxcbiAgICAgICAgICAgICduby13cmFwJzogIXRoaXMud3JhcFxuICAgICAgICAgIH1cbiAgICAgICAgfSwgW3RoaXMuJHNjb3BlZFNsb3RzLmJlZm9yZSgpXSkgOiB2b2lkIDAsXG4gIFxuICAgICAgICB0aGlzLiRzY29wZWRTbG90cy5kZWZhdWx0ICE9PSB2b2lkIDAgPyBoKCdkaXYnLCB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1pdGVtX19pbm5lciBmbGV4IGl0ZW1zLWNlbnRlciBpdGVtcy1lbmQnLFxuICAgICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgICBoaWRlOiB0aGlzLmhpZGVEZWZhdWx0LFxuICAgICAgICAgICAgJ25vLXdyYXAnOiAhdGhpcy53cmFwLFxuICAgICAgICAgICAgJ2p1c3RpZnktY2VudGVyJzogdGhpcy5jZW50ZXIsXG4gICAgICAgICAgICAnanVzdGlmeS1lbmQnOiB0aGlzLmVuZFxuXG4gICAgICAgICAgfVxuICAgICAgICB9LCBbdGhpcy4kc2NvcGVkU2xvdHMuZGVmYXVsdCgpXSkgOiB2b2lkIDAsXG4gIFxuICAgICAgICB0aGlzLiRzY29wZWRTbG90cy5hZnRlciAhPT0gdm9pZCAwID8gaCgnZGl2Jywge1xuICAgICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctaXRlbV9fYWZ0ZXIgZmxleCBpdGVtcy1jZW50ZXInLFxuICAgICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgICBoaWRlOiB0aGlzLmhpZGVBZnRlcixcbiAgICAgICAgICAgICduby13cmFwJzogIXRoaXMud3JhcFxuICAgICAgICAgIH1cbiAgICAgICAgfSwgW3RoaXMuJHNjb3BlZFNsb3RzLmFmdGVyKCldKSA6IHZvaWQgMFxuICAgICAgXSlcbiAgICBdKVxuICB9XG59XG4gICIsImltcG9ydCBJdGVtIGZyb20gJy4vc3JjL21haW4uanMnXG5cbmNvbnN0IGluc3RhbGwgPSBmdW5jdGlvbiAoVnVlKSB7XG4gIFZ1ZS5jb21wb25lbnQoSXRlbS5uYW1lLCBJdGVtKVxufVxuXG5JdGVtLmluc3RhbGwgPSBpbnN0YWxsXG5cbmV4cG9ydCBkZWZhdWx0IEl0ZW1cbiIsIlxuZXhwb3J0IGRlZmF1bHQge1xuICBwcm9wczoge1xuICAgIGVycm9yTWVzc2FnZTogU3RyaW5nLFxuICAgIHJ1bGVzOiBBcnJheVxuICB9LFxuXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlzRGlydHk6IGZhbHNlLFxuICAgICAgaW5uZXJFcnJvcjogZmFsc2UsXG4gICAgICBpbm5lckVycm9yTWVzc2FnZTogdm9pZCAwXG4gICAgfVxuICB9LFxuXG4gIHdhdGNoOiB7XG4gICAgZm9yY2VDaGVjayh2KSB7XG4gICAgICBpZiAodGhpcy5ydWxlcyA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgdGhpcy5pc0RpcnR5ID0gdHJ1ZVxuICAgICAgdGhpcy52YWxpZGF0ZSh2KVxuICAgIH0sXG4gICAgdmFsdWUodikge1xuICAgICAgaWYgKHRoaXMuZm9yY2VDaGVjayAhPT0gdm9pZCAwIHx8IHRoaXMucnVsZXMgPT09IHZvaWQgMCkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHRoaXMuaXNEaXJ0eSA9IHRydWVcbiAgICAgIHRoaXMudmFsaWRhdGUodilcbiAgICB9XG4gIH0sXG5cbiAgY29tcHV0ZWQ6IHtcbiAgICB2YWxpZGF0ZVZhbHVlKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZm9yY2VDaGVjayA9PT0gdm9pZCAwID8gdGhpcy52YWx1ZSA6IHRoaXMuZm9yY2VDaGVja1xuICAgIH0sXG4gICAgaGFzRXJyb3IoKSB7XG4gICAgICByZXR1cm4gdGhpcy5pbm5lckVycm9yID09PSB0cnVlXG4gICAgfSxcblxuICAgIGNvbXB1dGVkRXJyb3JNZXNzYWdlKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZXJyb3JNZXNzYWdlICE9PSB2b2lkIDBcbiAgICAgICAgPyB0aGlzLmVycm9yTWVzc2FnZVxuICAgICAgICA6IHRoaXMuaW5uZXJFcnJvck1lc3NhZ2VcbiAgICB9XG4gIH0sXG5cbiAgbW91bnRlZCgpIHtcbiAgICB0aGlzLiRvbihgYmx1cmAsIHRoaXMudHJpZ2dlclZhbGlkYXRpb24pXG4gIH0sXG5cbiAgYmVmb3JlRGVzdHJveSgpIHtcbiAgICB0aGlzLiRvZmYoYGJsdXJgLCB0aGlzLnRyaWdnZXJWYWxpZGF0aW9uKVxuICB9LFxuXG4gIG1ldGhvZHM6IHtcbiAgICByZXNldFZhbGlkYXRpb24oKSB7XG4gICAgICB0aGlzLmlzRGlydHkgPSBmYWxzZVxuICAgICAgdGhpcy5pbm5lckVycm9yID0gZmFsc2VcbiAgICAgIHRoaXMuaW5uZXJFcnJvck1lc3NhZ2UgPSB2b2lkIDBcbiAgICB9LFxuXG4gICAgdmFsaWRhdGUodmFsID0gdGhpcy52YWxpZGF0ZVZhbHVlKSB7XG4gICAgICBpZiAoIXRoaXMucnVsZXMgfHwgdGhpcy5ydWxlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHVwZGF0ZSA9IChlcnIsIG1zZykgPT4ge1xuICAgICAgICBpZiAodGhpcy5pbm5lckVycm9yICE9PSBlcnIpIHtcbiAgICAgICAgICB0aGlzLmlubmVyRXJyb3IgPSBlcnJcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG0gPSBtc2cgfHwgdm9pZCAwXG5cbiAgICAgICAgaWYgKHRoaXMuaW5uZXJFcnJvck1lc3NhZ2UgIT09IG0pIHtcbiAgICAgICAgICB0aGlzLmlubmVyRXJyb3JNZXNzYWdlID0gbVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlcnJcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICF0aGlzLnJ1bGVzLnNvbWUocnVsZSA9PiB7XG4gICAgICAgIGxldCByZXNcblxuICAgICAgICBpZiAodHlwZW9mIHJ1bGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICByZXMgPSBydWxlKHZhbClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVzID09PSBmYWxzZSB8fCB0eXBlb2YgcmVzID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIHJldHVybiB1cGRhdGUodHJ1ZSwgcmVzKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB1cGRhdGUoZmFsc2UpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcblxuICAgIHRyaWdnZXJWYWxpZGF0aW9uKGZvcmNlID0gdHJ1ZSkge1xuICAgICAgaWYgKGZvcmNlID09PSB0cnVlIHx8IHRoaXMuaXNEaXJ0eSA9PT0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5pc0RpcnR5ID0gdHJ1ZVxuICAgICAgICByZXR1cm4gdGhpcy52YWxpZGF0ZSh0aGlzLnZhbGlkYXRlVmFsdWUpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJcbmV4cG9ydCBkZWZhdWx0IHtcbiAgcHJvcHM6IHt9LFxuICBkYXRhOiAoKSA9PiAoe30pLFxuICB3YXRjaDoge30sXG4gIGNvbXB1dGVkOiB7fSxcbiAgbWV0aG9kczoge1xuICAgIGFkdmFuY2VkQmx1cihlKSB7XG4gICAgICBpZiAodGhpcy5kaXNhYmxlZCkgeyByZXR1cm4gfVxuICAgICAgbGV0IGV4Y2x1ZGVkID0gZmFsc2VcbiAgICAgIGxldCBnZXRSZWZzID0gcmVmTmFtZXMgPT4ge1xuICAgICAgICBsZXQgZ2V0RG9tcyA9IGVscyA9PiB7XG4gICAgICAgICAgZWxzID0gQXJyYXkuaXNBcnJheShlbHMpID8gZWxzIDogW2Vsc11cbiAgICAgICAgICByZXR1cm4gZWxzLnJlZHVjZSgoYWNjdW11bGF0b3IsIGVsKSA9PiB7XG4gICAgICAgICAgICBhY2N1bXVsYXRvci5wdXNoKGVsICYmIChlbC4kZWwgfHwgZWwpKVxuICAgICAgICAgICAgcmV0dXJuIGFjY3VtdWxhdG9yXG4gICAgICAgICAgfSwgW10pXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVmTmFtZXMucmVkdWNlKChhY2N1bXVsYXRvciwgcmVmKSA9PiBhY2N1bXVsYXRvci5jb25jYXQoZ2V0RG9tcyh0aGlzLiRyZWZzW3JlZl0pKSwgW10pXG4gICAgICB9XG4gICAgICBcbiAgICAgIGlmICh0aGlzLmV4Y2x1ZGVkQmx1clJlZnMpIHtcbiAgICAgICAgbGV0IHJlZnMgPSBnZXRSZWZzKHRoaXMuZXhjbHVkZWRCbHVyUmVmcylcblxuICAgICAgICByZWZzLnNvbWUocmVmID0+IHtcbiAgICAgICAgICBpZiAocmVmID09PSB2b2lkIDApIHsgcmV0dXJuIGZhbHNlIH1cbiAgICAgICAgICBleGNsdWRlZCA9IHJlZi5jb250YWlucyhlLnRhcmdldCkgfHwgZmFsc2VcbiAgICAgICAgICByZXR1cm4gZXhjbHVkZWRcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICAgIGlmIChleGNsdWRlZCkge1xuICAgICAgICB0aGlzLmZvY3VzZWQgPSB0cnVlXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgbGV0IGZvY3VzZWRCZWZvcmUgPSB0aGlzLmZvY3VzZWRcblxuICAgICAgaWYgKHRoaXMuYmx1clR5cGUgPT09ICdyZXZlcnNlJyAmJiBmb2N1c2VkQmVmb3JlKSB7XG4gICAgICAgIHRoaXMuZm9jdXNlZCA9ICFmb2N1c2VkQmVmb3JlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgcmVmcyA9IGdldFJlZnModGhpcy5ibHVyUmVmcylcblxuICAgICAgICByZWZzLnNvbWUocmVmID0+IHtcbiAgICAgICAgICBpZiAocmVmID09PSB2b2lkIDApIHsgcmV0dXJuIGZhbHNlIH1cbiAgICAgICAgICB0aGlzLmZvY3VzZWQgPSByZWYuY29udGFpbnMoZS50YXJnZXQpIHx8IGZhbHNlXG4gICAgICAgICAgcmV0dXJuIHRoaXMuZm9jdXNlZFxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLmZvY3VzZWQgJiYgZm9jdXNlZEJlZm9yZSkgeyB0aGlzLiRlbWl0KGBibHVyYCwgZSkgfVxuICAgIH1cbiAgfSxcbiAgbW91bnRlZCgpIHtcbiAgICBpZiAodGhpcy5ibHVyUmVmcykgeyBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5hZHZhbmNlZEJsdXIsIGZhbHNlKSB9XG4gIH0sXG4gIGJlZm9yZURlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuYmx1clJlZnMpIHsgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuYWR2YW5jZWRCbHVyLCBmYWxzZSkgfVxuICB9LFxufVxuICAiLCJpbXBvcnQgVmFsaWRhdGVNaXhpbiBmcm9tICcuLi8uLi8uLi9taXhpbnMvdmFsaWRhdGUnXG5pbXBvcnQgQWR2YW5jZWRCbHVyTWl4aW4gZnJvbSAnLi4vLi4vLi4vbWl4aW5zL2FkdmFuY2VkQmx1cidcbmltcG9ydCBJdGVtIGZyb20gJy4uLy4uL2l0ZW0nXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3N3RmllbGQnLFxuICBtaXhpbnM6IFtWYWxpZGF0ZU1peGluLCBBZHZhbmNlZEJsdXJNaXhpbl0sIC8vIGhhc0Vycm9yLGNvbXB1dGVkRXJyb3JNZXNzYWdlXG4gIGNvbXBvbmVudHM6IHsgSXRlbSB9LFxuICBwcm9wczoge1xuICAgIHJlcXVpcmVkOiBCb29sZWFuLFxuICAgIHVuZGVybGluZWQ6IEJvb2xlYW4sXG4gICAgYm9yZGVyZWQ6IEJvb2xlYW4sXG4gICAgZmlsbGVkOiBCb29sZWFuLFxuICAgIGRpc2FibGVkOiBCb29sZWFuLFxuICAgIG1pbmk6IEJvb2xlYW4sXG4gICAgbGFiZWw6IFN0cmluZyxcbiAgICBmb3JjZUNoZWNrOiBTdHJpbmcgfCBPYmplY3QsXG4gICAgc3BhY2VBcm91bmQ6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiB0cnVlXG4gICAgfVxuICB9LFxuICBkYXRhOiAoKSA9PiAoe1xuICAgIGZvY3VzZWQ6IGZhbHNlXG4gIH0pLFxuICBjb21wdXRlZDoge1xuICAgIGJsdXJSZWZzKCkge1xuICAgICAgcmV0dXJuIFsnZmllbGRDb250ZW50J11cbiAgICB9XG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgZm9jdXNlZCgpIHtcbiAgICAgIGlmICh0aGlzLmZvY3VzZWQgJiYgdGhpcy5mb2N1cykgeyB0aGlzLmZvY3VzKCkgfVxuICAgICAgaWYgKCF0aGlzLmZvY3VzZWQgJiYgdGhpcy5ibHVyKSB7IHRoaXMuYmx1cigpIH1cbiAgICB9XG4gIH0sXG4gIHJlbmRlcihoKSB7XG4gICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiAnc3ctZmllbGQgZmxleCBuby13cmFwIGl0ZW1zLWNlbnRlcicsXG4gICAgICBjbGFzczoge1xuICAgICAgICBkaXNhYmxlOiB0aGlzLmRpc2FibGVkLFxuICAgICAgICAnc3BhY2UtYXJvdW5kJzogdGhpcy5zcGFjZUFyb3VuZFxuICAgICAgfVxuICAgIH0sIFtcbiAgICAgIHRoaXMubGFiZWwgIT09IHZvaWQgMCA/IGgoJ2RpdicsIHtcbiAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1maWVsZF9fbGFiZWwgZmxleCBuby13cmFwIGl0ZW1zLWNlbnRlcidcbiAgICAgIH0sIFtoKCdkaXYnLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctbGFiZWwgZmxleCBuby13cmFwIGl0ZW1zLWNlbnRlcicsXG4gICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgcmVxdWlyZWQ6IHRoaXMucmVxdWlyZWRcbiAgICAgICAgfVxuICAgICAgfSwgdGhpcy5sYWJlbClcbiAgICAgIF0pIDogdm9pZCAwLFxuXG4gICAgICBoKCdkaXYnLCB7XG4gICAgICAgIHJlZjogJ2ZpZWxkQ29udGVudCcsXG4gICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctZmllbGRfX2NvbnRlbnQgZmxleCBuby13cmFwIGl0ZW1zLWNlbnRlciBzdy1mb3JtJyxcbiAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICB1bmRlcmxpbmU6IHRoaXMudW5kZXJsaW5lZCxcbiAgICAgICAgICBib3JkZXI6IHRoaXMuYm9yZGVyZWQsXG4gICAgICAgICAgZmlsbDogdGhpcy5maWxsZWQsXG4gICAgICAgICAgZm9jdXM6ICF0aGlzLmhhc0Vycm9yICYmIHRoaXMuZm9jdXNlZCxcbiAgICAgICAgICBlcnJvcjogdGhpcy5oYXNFcnJvcixcbiAgICAgICAgICAncGFkZGluZy1taW4nOiAhdGhpcy5taW5pLFxuICAgICAgICAgICdpbm5lci1wb2ludGVyJzogdGhpcy5pbm5lclBvaW50ZXJcbiAgICAgICAgfVxuICAgICAgfSwgW1xuICAgICAgICB0aGlzLmRpc2FibGVkID8gaCgnZGl2Jywge1xuICAgICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctZmllbGRfX2Rpc2FibGVkJ1xuICAgICAgICB9KSA6IHZvaWQgMCxcblxuICAgICAgICBoKCdzdy1pdGVtJywge1xuICAgICAgICAgIHN0YXRpY0NsYXNzOiAnZmxleC1hdXRvJyxcbiAgICAgICAgICBzY29wZWRTbG90czoge1xuICAgICAgICAgICAgYmVmb3JlOiB0aGlzLiRzY29wZWRTbG90cy5iZWZvcmUgIT09IHZvaWQgMFxuICAgICAgICAgICAgICA/ICgpID0+IFtoKCdkaXYnLCB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6ICdmbGV4IG5vLXdyYXAgaXRlbXMtY2VudGVyIG1hcmdpbi1taW4nXG4gICAgICAgICAgICAgIH0sIFt0aGlzLiRzY29wZWRTbG90cy5iZWZvcmUoKV0pXSA6IHZvaWQgMCxcblxuICAgICAgICAgICAgZGVmYXVsdDogdGhpcy4kc2NvcGVkU2xvdHMuZGVmYXVsdCAhPT0gdm9pZCAwIHx8IHRoaXMuZ2V0SW5uZXIgIT09IHZvaWQgMFxuICAgICAgICAgICAgICA/ICgpID0+IFt0aGlzLmdldElubmVyICE9PSB2b2lkIDAgPyB0aGlzLmdldElubmVyKGgpIDogdm9pZCAwLCB0aGlzLiRzY29wZWRTbG90cy5kZWZhdWx0ICE9PSB2b2lkIDAgJiYgdGhpcy5nZXRJbm5lciA9PT0gdm9pZCAwID8gdGhpcy4kc2NvcGVkU2xvdHMuZGVmYXVsdCgpIDogdm9pZCAwXSA6IHZvaWQgMCxcblxuICAgICAgICAgICAgYWZ0ZXI6IHRoaXMuJHNjb3BlZFNsb3RzLmFmdGVyICE9PSB2b2lkIDAgfHwgdGhpcy5nZXRBZnRlciAhPT0gdm9pZCAwXG4gICAgICAgICAgICAgID8gKCkgPT4gW2goJ2RpdicsIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogJ2ZsZXggbm8td3JhcCBpdGVtcy1jZW50ZXIgbWFyZ2luLW1pbidcbiAgICAgICAgICAgICAgfSwgW3RoaXMuZ2V0QWZ0ZXIgIT09IHZvaWQgMCA/IHRoaXMuZ2V0QWZ0ZXIoaCkgOiB2b2lkIDAsIHRoaXMuJHNjb3BlZFNsb3RzLmFmdGVyICE9PSB2b2lkIDAgJiYgdGhpcy5nZXRBZnRlciA9PT0gdm9pZCAwID8gdGhpcy4kc2NvcGVkU2xvdHMuYWZ0ZXIoKSA6IHZvaWQgMF0pXSA6IHZvaWQgMFxuICAgICAgICAgIH1cbiAgICAgICAgfSksXG5cbiAgICAgICAgdGhpcy5oYXNFcnJvciA/IGgoJ2RpdicsIHtcbiAgICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWZpZWxkX19lcnJvciBmbGV4IG5vLXdyYXAgaXRlbXMtY2VudGVyJ1xuICAgICAgICB9LCB0aGlzLmNvbXB1dGVkRXJyb3JNZXNzYWdlKSA6IHZvaWQgMFxuICAgICAgXSlcbiAgICBdKVxuICB9XG59XG4gICIsImltcG9ydCBGaWVsZCBmcm9tICcuL3NyYy9tYWluLmpzJ1xuXG5jb25zdCBpbnN0YWxsID0gZnVuY3Rpb24gKFZ1ZSkge1xuICBWdWUuY29tcG9uZW50KEZpZWxkLm5hbWUsIEZpZWxkKVxufVxuXG5GaWVsZC5pbnN0YWxsID0gaW5zdGFsbFxuXG5leHBvcnQgZGVmYXVsdCBGaWVsZFxuIiwiaW1wb3J0IEZpZWxkIGZyb20gJy4uLy4uL2ZpZWxkJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdzd0lucHV0JyxcbiAgbWl4aW5zOiBbRmllbGRdLCAvLyBmb2N1c2VkLGRpc2FibGVkXG4gIHByb3BzOiB7XG4gICAgdmFsdWU6IFN0cmluZyxcbiAgICBwbGFjZWhvbGRlcjogU3RyaW5nLFxuICAgIGF1dG9jb21wbGV0ZTogQm9vbGVhblxuICB9LFxuICBkYXRhOiAoKSA9PiAoe30pLFxuICBjb21wdXRlZDoge30sXG4gIG1ldGhvZHM6IHtcbiAgICBmb2N1cygpIHtcbiAgICAgIHRoaXMuJHJlZnMuaW5wdXQuZm9jdXMoKVxuICAgIH0sXG4gICAgYmx1cigpIHtcbiAgICAgIHRoaXMuJHJlZnMuaW5wdXQuYmx1cigpXG4gICAgfSxcbiAgICBnZXRJbm5lcihoKSB7XG4gICAgICByZXR1cm4gW2goJ2lucHV0Jywge1xuICAgICAgICByZWY6ICdpbnB1dCcsXG4gICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctaW5wdXQgbWFyZ2luLW1pbicsXG4gICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgYXV0b2NvbXBsZXRlOiB0aGlzLmF1dG9jb21wbGV0ZSA/ICdvbicgOiAnb2ZmJ1xuICAgICAgICB9LFxuICAgICAgICBkb21Qcm9wczoge1xuICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlLFxuICAgICAgICAgIHBsYWNlaG9sZGVyOiB0aGlzLnBsYWNlaG9sZGVyIHx8ICcnLFxuICAgICAgICAgIGRpc2FibGVkOiB0aGlzLmRpc2FibGVkXG4gICAgICAgIH0sXG4gICAgICAgIG9uOiB7XG4gICAgICAgICAgLi4udGhpcy4kbGlzdGVuZXJzLFxuICAgICAgICAgIGlucHV0OiBlID0+IHtcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2lucHV0JywgZS50YXJnZXQudmFsdWUpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KV1cbiAgICB9XG4gIH1cbn1cbiAgIiwiaW1wb3J0IElucHV0IGZyb20gJy4vc3JjL21haW4uanMnXG5cbmNvbnN0IGluc3RhbGwgPSBmdW5jdGlvbiAoVnVlKSB7XG4gIFZ1ZS5jb21wb25lbnQoSW5wdXQubmFtZSwgSW5wdXQpXG59XG5cbklucHV0Lmluc3RhbGwgPSBpbnN0YWxsXG5cbmV4cG9ydCBkZWZhdWx0IElucHV0XG4iLCJleHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdzd1Njcm9sbEFyZWEnLFxuICBwcm9wczoge1xuICAgIHg6IEJvb2xlYW4sXG4gICAgeTogQm9vbGVhbixcbiAgICB3aWR0aDogU3RyaW5nLFxuICAgIGhlaWdodDogU3RyaW5nLFxuICAgIHN0cmV0Y2g6IEJvb2xlYW5cbiAgfSxcbiAgZGF0YTogKCkgPT4gKHt9KSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBzdHlsZSgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgICdvdmVyZmxvdy14JzogdGhpcy54ID8gJ2F1dG8nIDogJ2hpZGRlbicsXG4gICAgICAgICdvdmVyZmxvdy15JzogdGhpcy55ID8gJ2F1dG8nIDogJ2hpZGRlbicsXG4gICAgICAgICdtYXgtd2lkdGgnOiB0aGlzLndpZHRoIHx8ICcxMDAlJyxcbiAgICAgICAgd2lkdGg6IHRoaXMud2lkdGggfHwgJzEwMCUnLFxuICAgICAgICAnbWF4LWhlaWdodCc6IHRoaXMuaGVpZ2h0IHx8ICcxMDAlJyxcbiAgICAgICAgaGVpZ2h0OiB0aGlzLnN0cmV0Y2ggJiYgKHRoaXMuaGVpZ2h0IHx8ICcxMDAlJylcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHt9LFxuICByZW5kZXIoaCkge1xuICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICBzdGF0aWNDbGFzczogJ3N3LXNjcm9sbC1hcmVhJyxcbiAgICAgIHN0eWxlOiB0aGlzLnN0eWxlLFxuICAgICAgb246IHRoaXMuJGxpc3RlbmVyc1xuICAgIH0sIHRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQgIT09IHZvaWQgMCA/IFt0aGlzLiRzY29wZWRTbG90cy5kZWZhdWx0KCldIDogdm9pZCAwKVxuICB9XG59XG4gICIsImltcG9ydCBTY3JvbGxBcmVhIGZyb20gJy4vc3JjL21haW4uanMnXG5cbmNvbnN0IGluc3RhbGwgPSBmdW5jdGlvbiAoVnVlKSB7XG4gIFZ1ZS5jb21wb25lbnQoU2Nyb2xsQXJlYS5uYW1lLCBTY3JvbGxBcmVhKVxufVxuXG5TY3JvbGxBcmVhLmluc3RhbGwgPSBpbnN0YWxsXG5cbmV4cG9ydCBkZWZhdWx0IFNjcm9sbEFyZWFcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXNlbGYtY29tcGFyZSAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRGVlcEVxdWFsKGEsIGIpIHtcbiAgaWYgKGEgPT09IGIpIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgaWYgKGEgaW5zdGFuY2VvZiBEYXRlICYmIGIgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgcmV0dXJuIGEuZ2V0VGltZSgpID09PSBiLmdldFRpbWUoKVxuICB9XG5cbiAgaWYgKGEgIT09IGEgJiYgYiAhPT0gYikge1xuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBpZiAoYSAhPT0gT2JqZWN0KGEpIHx8IGIgIT09IE9iamVjdChiKSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgY29uc3QgcHJvcHMgPSBPYmplY3Qua2V5cyhhKVxuXG4gIGlmIChwcm9wcy5sZW5ndGggIT09IE9iamVjdC5rZXlzKGIpLmxlbmd0aCkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgcmV0dXJuIHByb3BzLmV2ZXJ5KHByb3AgPT4gaXNEZWVwRXF1YWwoYVtwcm9wXSwgYltwcm9wXSkpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZ0NvbnRhaW4ocywgdikge1xuICBsZXQgaW5uZXJTID0gU3RyaW5nKHMpXG4gIGxldCBpbm5lclYgPSB2LnJlcGxhY2UoL1xccysvZywgJycpLnNwbGl0KCcnKVxuICBsZXQgc3VtID0gMFxuXG4gIGlubmVyVi5mb3JFYWNoKHggPT4ge1xuICAgIGlmIChpbm5lclMuaW5jbHVkZXMoeCkpIHtcbiAgICAgIGlubmVyUyA9IGlubmVyUy5yZXBsYWNlKHgsICcnKVxuICAgICAgc3VtKytcbiAgICB9XG4gIH0pXG4gIHJldHVybiBzdW0gPj0gaW5uZXJWLmxlbmd0aFxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNPYmplY3Qodikge1xuICByZXR1cm4gT2JqZWN0KHYpID09PSB2XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0RhdGUodikge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHYpID09PSAnW29iamVjdCBEYXRlXSdcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUmVnZXhwKHYpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2KSA9PT0gJ1tvYmplY3QgUmVnRXhwXSdcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtYmVyKHYpIHtcbiAgcmV0dXJuIHR5cGVvZiB2ID09PSAnbnVtYmVyJyAmJiBpc0Zpbml0ZSh2KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmcodikge1xuICByZXR1cm4gdHlwZW9mIHYgPT09ICdzdHJpbmcnXG59XG4iLCJpbXBvcnQgRmllbGQgZnJvbSAnLi4vLi4vZmllbGQnXG5pbXBvcnQgU2NvcmxsQXJlYSBmcm9tICcuLi8uLi9zY3JvbGxBcmVhJ1xuaW1wb3J0IHsgaXNEZWVwRXF1YWwsIGlzU3RyaW5nQ29udGFpbiwgaXNPYmplY3QgfSBmcm9tICcuLi8uLi8uLi91dGlscy9pcydcblxuLy8gaW1wb3J0IHsgZGVkdXBsaWNhdGUgfSBmcm9tICcuLi8uLi8uLi91dGlscy9kZWR1cGxpY2F0ZSdcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnc3dTZWxlY3QnLFxuICBtaXhpbnM6IFtGaWVsZF0sIC8vIGZvY3VzZWQsZGlzYWJsZWRcbiAgY29tcG9uZW50czoge1xuICAgIFNjb3JsbEFyZWFcbiAgfSxcbiAgcHJvcHM6IHtcbiAgICBtdWx0aXBsZTogQm9vbGVhbixcbiAgICB2YWx1ZToge1xuICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICB9LFxuICAgIG9wdGlvbnM6IEFycmF5LFxuICAgIGZpbHRlcjogQm9vbGVhbixcbiAgICBwbGFjZWhvbGRlcjogU3RyaW5nLFxuICAgIG9wdGlvbnNIZWlnaHQ6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICcyMDBweCdcbiAgICB9LFxuICAgIHNlbGVjdGVkU3R5bGU6IFN0cmluZ1xuICB9LFxuICBkYXRhOiAoKSA9PiAoe1xuICAgIGJsdXJUeXBlOiAncmV2ZXJzZScsXG4gICAgZmlsdGVyVmFsdWU6ICcnXG4gIH0pLFxuICBjb21wdXRlZDoge1xuICAgIGV4Y2x1ZGVkQmx1clJlZnMoKSB7XG4gICAgICByZXR1cm4gdGhpcy5maWx0ZXIgPyBbJ2lucHV0JywgJ3NlbGVjdGVkJywgJ3NlbGVjdE9wdGlvbnMnXSA6IFsnc2VsZWN0ZWQnLCAnc2VsZWN0T3B0aW9ucyddXG4gICAgfSxcbiAgICBpbm5lclZhbHVlOiB7XG4gICAgICBnZXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEV4YWN0VmFsdWVzKHRoaXMudmFsdWUpXG4gICAgICB9LFxuICAgICAgc2V0KHZhbCkge1xuICAgICAgICB0aGlzLiRlbWl0KFxuICAgICAgICAgICdpbnB1dCcsXG4gICAgICAgICAgdmFsXG4gICAgICAgIClcbiAgICAgIH1cbiAgICB9LFxuICAgIGlubmVyT3B0aW9ucygpIHtcbiAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMucmVkdWNlKChhLCBjKSA9PiB7XG4gICAgICAgIGlmIChpc1N0cmluZ0NvbnRhaW4odGhpcy5nZXROYW1lKGMpLCB0aGlzLmZpbHRlclZhbHVlKSkge1xuICAgICAgICAgIGEucHVzaChjKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhXG4gICAgICB9LCBbXSkgfHwgW11cbiAgICB9XG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgb3B0aW9ucygpIHtcbiAgICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHRoaXMuZ2V0RXhhY3RWYWx1ZXModGhpcy52YWx1ZSlcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBmb2N1cygpIHtcbiAgICAgIHRoaXMuJG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgdGhpcy4kcmVmcy5pbnB1dC5mb2N1cygpXG4gICAgICB9KVxuICAgIH0sXG4gICAgYmx1cigpIHtcbiAgICAgIHRoaXMuJHJlZnMuaW5wdXQuYmx1cigpXG4gICAgfSxcbiAgICBjbGVhckZpbHRlcigpIHtcbiAgICAgIHRoaXMuZmlsdGVyVmFsdWUgPSAnJ1xuICAgIH0sXG4gICAgdHJpZ2dlckJsdXIoZSkge1xuICAgICAgdGhpcy5mb2N1c2VkID0gZmFsc2VcbiAgICAgIHRoaXMuJGVtaXQoYGJsdXJgLCBlKVxuICAgIH0sXG4gICAgZ2V0SW5uZXIoaCkge1xuICAgICAgbGV0IGdldE9wdGlvbnMgPSBoID0+IHtcbiAgICAgICAgaWYgKHRoaXMuaW5uZXJPcHRpb25zLmxlbmd0aCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLmlubmVyT3B0aW9ucy5tYXAob3B0aW9uID0+IGgoJ3N3LWl0ZW0nLCB7XG4gICAgICAgICAgICBjbGFzczoge1xuICAgICAgICAgICAgICBzZWxlY3RlZDogdGhpcy5jaGVja1NlbGVjdGVkKG9wdGlvbilcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBuYXRpdmVPbjoge1xuICAgICAgICAgICAgICBjbGljazogZSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbm5lclZhbHVlID0gdGhpcy5mb3JtYXRWYWx1ZShvcHRpb24pXG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhckZpbHRlcigpXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXJCbHVyKGUpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuZm9jdXMoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNjb3BlZFNsb3RzOiB7XG4gICAgICAgICAgICAgIGRlZmF1bHQ6ICgpID0+IFtoKCdkaXYnLCB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1zZWxlY3RfX29wdGlvbidcbiAgICAgICAgICAgICAgfSwgU3RyaW5nKHRoaXMuZ2V0TmFtZShvcHRpb24pKSldXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIFtoKCdzdy1pdGVtJywge1xuICAgICAgICAgICAgc2NvcGVkU2xvdHM6IHtcbiAgICAgICAgICAgICAgZGVmYXVsdDogKCkgPT4gW2goJ2RpdicsIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogJ3N3LXNlbGVjdF9fb3B0aW9uIG5vLW9wdGlvbnMnXG4gICAgICAgICAgICAgIH0sICdubyBvcHRpb25zJyldXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSldXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGV0IGdldFNlbGVjdGVkID0gaCA9PiB0aGlzLmdldEV4YWN0T3B0aW9ucyh0aGlzLmlubmVyVmFsdWUpLm1hcCh4ID0+IGgoJ3N3LWl0ZW0nLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiAnbWFyZ2luLW1pbiBzdy1mb3JtIHNlbGVjdGVkLW9wdGlvbicsXG4gICAgICAgIGNsYXNzOiB0aGlzLnNlbGVjdGVkU3R5bGUgPT09IHZvaWQgMFxuICAgICAgICAgID8ge1xuICAgICAgICAgICAgdW5kZXJsaW5lOiB0aGlzLnVuZGVybGluZWQsXG4gICAgICAgICAgICBib3JkZXI6IHRoaXMuYm9yZGVyZWQsXG4gICAgICAgICAgICBmaWxsOiB0aGlzLmZpbGxlZFxuICAgICAgICAgIH0gOiB7XG4gICAgICAgICAgICBbdGhpcy5zZWxlY3RlZFN0eWxlXTogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgIHJlZjogJ3NlbGVjdGVkJyxcbiAgICAgICAgcmVmSW5Gb3I6IHRydWUsXG4gICAgICAgIHNjb3BlZFNsb3RzOiB7XG4gICAgICAgICAgZGVmYXVsdDogKCkgPT4gW2goJ2RpdicsIHtcbiAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgIHBhZGRpbmc6IHRoaXMubWluaSA/ICczcHggMCAzcHggOXB4JyA6ICczcHggOXB4JyxcbiAgICAgICAgICAgICAgJ3doaXRlLXNwYWNlJzogdGhpcy5taW5pID8gJ25vd3JhcCcgOiB2b2lkIDBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCBTdHJpbmcodGhpcy5nZXROYW1lKHgpKSldLFxuICAgICAgICAgIGFmdGVyOiAhdGhpcy5taW5pID8gKCkgPT4gW2goJ3N3LWljb24nLCB7XG4gICAgICAgICAgICBjbGFzczoge1xuICAgICAgICAgICAgICAnaG92ZXItY29sb3ItcHJpbWFyeSc6IHRydWUsXG4gICAgICAgICAgICAgICdjb2xvci1ncmV5JzogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICdib3JkZXItcmFkaXVzJzogJzUwJScsXG4gICAgICAgICAgICAgIHBhZGRpbmc6ICcwIDNweCAwIDAnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgICAgbmFtZTogdGhpcy5maWxsZWQgJiYgdGhpcy5zZWxlY3RlZFN0eWxlID09PSB2b2lkIDAgfHwgdGhpcy5zZWxlY3RlZFN0eWxlID09PSAnZmlsbCcgPyAnY2FuY2VsJyA6ICdjbGVhcicsXG4gICAgICAgICAgICAgIHNpemU6ICcxNHB4J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5hdGl2ZU9uOiB7XG4gICAgICAgICAgICAgIGNsaWNrOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbm5lclZhbHVlID0gdGhpcy5mb3JtYXRWYWx1ZSh4LCAncmVtb3ZlJylcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXSA6IHZvaWQgMFxuICAgICAgICB9XG4gICAgICB9KSlcblxuICAgICAgcmV0dXJuIFtoKCdzdy1pdGVtJywge1xuICAgICAgICBzdGF0aWNDbGFzczogJ2ZsZXgtYXV0bycsXG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgd3JhcDogdHJ1ZSxcbiAgICAgICAgICBoaWRlRGVmYXVsdDogdGhpcy5pbm5lclZhbHVlLmxlbmd0aCA+IDAgJiYgKCF0aGlzLmZvY3VzZWQgfHwgIXRoaXMuZmlsdGVyKVxuICAgICAgICB9LFxuICAgICAgICBzY29wZWRTbG90czoge1xuICAgICAgICAgIGJlZm9yZTogdGhpcy5pbm5lclZhbHVlLmxlbmd0aCA+IDAgPyAoKSA9PiBnZXRTZWxlY3RlZChoKSA6IHZvaWQgMCxcbiAgICAgICAgICBkZWZhdWx0OiAoKSA9PiBbaCgnaW5wdXQnLCB7XG4gICAgICAgICAgICByZWY6ICdpbnB1dCcsXG4gICAgICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWlucHV0IG1hcmdpbi1taW4nLFxuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgY3Vyc29yOiAhdGhpcy5maWx0ZXIgPyAncG9pbnRlcicgOiB2b2lkIDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkb21Qcm9wczoge1xuICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5maWx0ZXJWYWx1ZSxcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IHRoaXMucGxhY2Vob2xkZXIgfHwgJycsXG4gICAgICAgICAgICAgIGRpc2FibGVkOiAhdGhpcy5maWx0ZXJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAuLi50aGlzLiRsaXN0ZW5lcnMsXG4gICAgICAgICAgICAgIGlucHV0OiBlID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlclZhbHVlID0gZS50YXJnZXQudmFsdWVcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXVxuICAgICAgICB9XG4gICAgICB9KSwgdGhpcy5mb2N1c2VkID8gaCgnZGl2Jywge1xuICAgICAgICByZWY6ICdzZWxlY3RPcHRpb25zJyxcbiAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1zZWxlY3RfX29wdGlvbnMgY29tbW9uLXNoYWRvdycsXG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgJ21heC1oZWlnaHQnOiB0aGlzLm9wdGlvbnNIZWlnaHRcbiAgICAgICAgfVxuICAgICAgfSwgW2goJ3N3LXNjcm9sbC1hcmVhJywge1xuICAgICAgICBwcm9wczoge1xuICAgICAgICAgIHk6IHRydWUsXG4gICAgICAgICAgaGVpZ2h0OiB0aGlzLm9wdGlvbnNIZWlnaHRcbiAgICAgICAgfSxcbiAgICAgICAgc2NvcGVkU2xvdHM6IHtcbiAgICAgICAgICBkZWZhdWx0OiAoKSA9PiBnZXRPcHRpb25zKGgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICBdKSA6IHZvaWQgMF1cbiAgICB9LFxuICAgIGdldEFmdGVyKGgpIHtcbiAgICAgIHJldHVybiBbaCgnc3ctaWNvbicsIHtcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICBuYW1lOiAna2V5Ym9hcmRfYXJyb3dfZG93bicsXG4gICAgICAgICAgc2l6ZTogJzIwcHgnXG4gICAgICAgIH0sXG4gICAgICAgIHN0YXRpY0NsYXNzOiAnY29sb3ItZ3JleSBob3Zlci1jb2xvci1wcmltYXJ5JyxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHRoaXMuZm9jdXNlZCA/ICdyb3RhdGUoMTgwZGVnKScgOiB2b2lkIDBcbiAgICAgICAgfVxuICAgICAgfSldXG4gICAgfSxcbiAgICBmb3JtYXRWYWx1ZShvcHRpb24sIG9wZSkge1xuICAgICAgbGV0IGR1cGxpY2F0ZWQgPSBmYWxzZVxuICAgICAgbGV0IHJlcyA9IFtdXG5cbiAgICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgIHRoaXMuaW5uZXJWYWx1ZS5mb3JFYWNoKHggPT4ge1xuICAgICAgICAgIGlmIChpc0RlZXBFcXVhbCh4LCB0aGlzLmdldFZhbHVlKG9wdGlvbikpKSB7XG4gICAgICAgICAgICBkdXBsaWNhdGVkID0gdHJ1ZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXMucHVzaCh4KVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSBpZiAob3BlID09PSAncmVtb3ZlJykgeyBkdXBsaWNhdGVkID0gdHJ1ZSB9XG4gICAgICBpZiAoIWR1cGxpY2F0ZWQpIHtcbiAgICAgICAgcmVzLnB1c2godGhpcy5nZXRWYWx1ZShvcHRpb24pKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc1xuICAgIH0sXG4gICAgY2hlY2tTZWxlY3RlZChvcHRpb24pIHtcbiAgICAgIHJldHVybiB0aGlzLmlubmVyVmFsdWUuc29tZSh4ID0+IGlzRGVlcEVxdWFsKHgsIHRoaXMuZ2V0VmFsdWUob3B0aW9uKSkpXG4gICAgfSxcbiAgICBnZXRFeGFjdFZhbHVlcyh2YWx1ZSkge1xuICAgICAgbGV0IHYgPSBBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlIDogW3ZhbHVlXVxuXG4gICAgICByZXR1cm4gdi5yZWR1Y2UoKGEsIGMpID0+IHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5zb21lKHggPT4gaXNEZWVwRXF1YWwodGhpcy5nZXRWYWx1ZSh4KSwgYykpKSB7XG4gICAgICAgICAgYS5wdXNoKGMpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFcbiAgICAgIH0sIFtdKVxuICAgIH0sXG4gICAgZ2V0RXhhY3RPcHRpb25zKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdmFsdWUucmVkdWNlKChhLCBjKSA9PiB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5mb3JFYWNoKHggPT4ge1xuICAgICAgICAgIGlmIChpc0RlZXBFcXVhbCh0aGlzLmdldFZhbHVlKHgpLCBjKSkge1xuICAgICAgICAgICAgYS5wdXNoKHgpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gYVxuICAgICAgfSwgW10pXG4gICAgfSxcbiAgICBnZXRWYWx1ZShvcHRpb24pIHtcbiAgICAgIHJldHVybiBpc09iamVjdChvcHRpb24pICYmIG9wdGlvbi5oYXNPd25Qcm9wZXJ0eSgndmFsdWUnKVxuICAgICAgICA/IG9wdGlvbi52YWx1ZSA6IG9wdGlvblxuICAgIH0sXG4gICAgZ2V0TmFtZShvcHRpb24pIHtcbiAgICAgIHJldHVybiBpc09iamVjdChvcHRpb24pICYmIG9wdGlvbi5oYXNPd25Qcm9wZXJ0eSgnbmFtZScpXG4gICAgICAgID8gb3B0aW9uLm5hbWUgOiBvcHRpb25cbiAgICB9XG4gIH1cbn1cbiAgIiwiaW1wb3J0IFNlbGVjdCBmcm9tICcuL3NyYy9tYWluLmpzJ1xuXG5jb25zdCBpbnN0YWxsID0gZnVuY3Rpb24gKFZ1ZSkge1xuICBWdWUuY29tcG9uZW50KFNlbGVjdC5uYW1lLCBTZWxlY3QpXG59XG5cblNlbGVjdC5pbnN0YWxsID0gaW5zdGFsbFxuXG5leHBvcnQgZGVmYXVsdCBTZWxlY3RcbiIsImltcG9ydCBJdGVtIGZyb20gJy4uLy4uL2l0ZW0nXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3N3QnV0dG9uJyxcbiAgY29tcG9uZW50czogeyBJdGVtIH0sXG4gIHByb3BzOiB7XG4gICAgdW5kZXJsaW5lZDogQm9vbGVhbixcbiAgICBib3JkZXJlZDogQm9vbGVhbixcbiAgICBmaWxsZWQ6IEJvb2xlYW4sXG4gICAgZGlzYWJsZWQ6IEJvb2xlYW4sXG4gICAgY29sb3I6IFN0cmluZyxcbiAgICBwcmltYXJ5OiBCb29sZWFuLFxuICAgIG5lZ2F0aXZlOiBCb29sZWFuLFxuICAgIHBvc2l0aXZlOiBCb29sZWFuLFxuICAgIHdhcm5pbmc6IEJvb2xlYW4sXG4gICAgcm91bmQ6IEJvb2xlYW4sXG4gICAgc2hhZG93OiBCb29sZWFuLFxuICAgIG1pbmk6IEJvb2xlYW4sXG4gICAgdG86IFN0cmluZyB8IE9iamVjdCxcbiAgICBjZW50ZXI6IEJvb2xlYW4sXG4gICAgZW5kOiBCb29sZWFuXG4gIH0sXG4gIGRhdGE6ICgpID0+ICh7fSksXG4gIHJlbmRlcihoKSB7XG4gICAgcmV0dXJuIGgoJ2J1dHRvbicsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiAnc3ctYnV0dG9uIGZsZXggbm8td3JhcCBpdGVtcy1jZW50ZXInLFxuICAgICAgc3R5bGU6IHtcbiAgICAgICAgY29sb3I6ICF0aGlzLmRpc2FibGVkICYmICF0aGlzLmZpbGxlZCAmJiB0aGlzLmNvbG9yIHx8IHZvaWQgMCxcbiAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiAhdGhpcy5kaXNhYmxlZCAmJiB0aGlzLmZpbGxlZCAmJiB0aGlzLmNvbG9yIHx8IHZvaWQgMFxuICAgICAgfSxcbiAgICAgIGNsYXNzOiB7XG4gICAgICAgIHVuZGVybGluZTogdGhpcy51bmRlcmxpbmVkLFxuICAgICAgICBib3JkZXI6IHRoaXMuYm9yZGVyZWQsXG4gICAgICAgIGZpbGw6IHRoaXMuZmlsbGVkLFxuICAgICAgICBwcmltYXJ5OiB0aGlzLnByaW1hcnksXG4gICAgICAgIG5lZ2F0aXZlOiB0aGlzLm5lZ2F0aXZlLFxuICAgICAgICBwb3NpdGl2ZTogdGhpcy5wb3NpdGl2ZSxcbiAgICAgICAgd2FybmluZzogdGhpcy53YXJuaW5nLFxuICAgICAgICBncmV5OiB0aGlzLmRpc2FibGVkLFxuICAgICAgICByb3VuZDogdGhpcy5yb3VuZCAmJiAhdGhpcy51bmRlcmxpbmVkLFxuICAgICAgICAnY29tbW9uLXNoYWRvdyc6IHRoaXMuc2hhZG93ICYmICh0aGlzLmJvcmRlcmVkIHx8IHRoaXMuZmlsbGVkKVxuICAgICAgfSxcbiAgICAgIG9uOiB0aGlzLmRpc2FibGVkID8gdm9pZCAwIDoge1xuICAgICAgICAuLi50aGlzLiRsaXN0ZW5lcnNcbiAgICAgIH1cbiAgICB9LCBbXG4gICAgICBoKCdzdy1pdGVtJywge1xuICAgICAgICBzdGF0aWNDbGFzczogJ2ZsZXgtYXV0bycsXG4gICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgJ3JvdW5kLXNsb3QnOiB0aGlzLiRzY29wZWRTbG90cy5yb3VuZCxcbiAgICAgICAgICBtaW5pOiB0aGlzLm1pbmlcbiAgICAgICAgfSxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJ1xuICAgICAgICB9LFxuICAgICAgICBwcm9wczoge1xuICAgICAgICAgIHRvOiB0aGlzLnRvLFxuICAgICAgICAgIGNlbnRlcjogdGhpcy5jZW50ZXIsXG4gICAgICAgICAgZW5kOiB0aGlzLmVuZCxcbiAgICAgICAgICBkaXNhYmxlZDogdGhpcy5kaXNhYmxlZFxuICAgICAgICB9LFxuICAgICAgICBvbjogdGhpcy5kaXNhYmxlZCA/IHZvaWQgMCA6IHtcbiAgICAgICAgICAuLi50aGlzLiRsaXN0ZW5lcnNcbiAgICAgICAgfSxcbiAgICAgICAgc2NvcGVkU2xvdHM6IHRoaXMuJHNjb3BlZFNsb3RzLnJvdW5kICE9PSB2b2lkIDBcbiAgICAgICAgICA/IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6ICgpID0+IFtoKCdkaXYnLCB7XG4gICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiAnZmxleCBuby13cmFwIGl0ZW1zLWNlbnRlciBtYXJnaW4tbWluIHN3LWJ1dHRvbl9faW5uZXIgZmxleC1hdXRvJ1xuICAgICAgICAgICAgfSwgW3RoaXMuJHNjb3BlZFNsb3RzLnJvdW5kKCldKV1cbiAgICAgICAgICB9IDoge1xuICAgICAgICAgICAgYmVmb3JlOiB0aGlzLiRzY29wZWRTbG90cy5iZWZvcmUgIT09IHZvaWQgMFxuICAgICAgICAgICAgICA/ICgpID0+IFtoKCdkaXYnLCB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6ICdmbGV4IG5vLXdyYXAgaXRlbXMtY2VudGVyIG1hcmdpbi1taW4gc3ctYnV0dG9uX19iZWZvcmUnXG4gICAgICAgICAgICAgIH0sIFt0aGlzLiRzY29wZWRTbG90cy5iZWZvcmUoKV0pXSA6IHZvaWQgMCxcbiAgXG4gICAgICAgICAgICBkZWZhdWx0OiB0aGlzLiRzY29wZWRTbG90cy5kZWZhdWx0ICE9PSB2b2lkIDBcbiAgICAgICAgICAgICAgPyAoKSA9PiBbaCgnZGl2Jywge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiAnZmxleCBuby13cmFwIGl0ZW1zLWNlbnRlciBtYXJnaW4tbWluIHN3LWJ1dHRvbl9faW5uZXIgZmxleC1hdXRvJ1xuICAgICAgICAgICAgICB9LCBbdGhpcy4kc2NvcGVkU2xvdHMuZGVmYXVsdCgpXSldIDogdm9pZCAwLFxuICBcbiAgICAgICAgICAgIGFmdGVyOiB0aGlzLiRzY29wZWRTbG90cy5hZnRlciAhPT0gdm9pZCAwXG4gICAgICAgICAgICAgID8gKCkgPT4gW2goJ2RpdicsIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogJ2ZsZXggbm8td3JhcCBpdGVtcy1jZW50ZXIgbWFyZ2luLW1pbiBzdy1idXR0b25fX2FmdGVyJ1xuICAgICAgICAgICAgICB9LCBbdGhpcy4kc2NvcGVkU2xvdHMuYWZ0ZXIoKV0pXSA6IHZvaWQgMFxuICAgICAgICAgIH1cbiAgICAgIH0pXG4gICAgXSlcbiAgfVxufVxuICAiLCJpbXBvcnQgQnV0dG9uIGZyb20gJy4vc3JjL21haW4uanMnXG5cbmNvbnN0IGluc3RhbGwgPSBmdW5jdGlvbiAoVnVlKSB7XG4gIFZ1ZS5jb21wb25lbnQoQnV0dG9uLm5hbWUsIEJ1dHRvbilcbn1cblxuQnV0dG9uLmluc3RhbGwgPSBpbnN0YWxsXG5cbmV4cG9ydCBkZWZhdWx0IEJ1dHRvblxuIiwiaW1wb3J0IHN3QnV0dG9uIGZyb20gJy4uLy4uL2J1dHRvbidcbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3N3TW9kYWwnLFxuICBjb21wb25lbnRzOiB7XG4gICAgc3dCdXR0b25cbiAgfSxcbiAgcHJvcHM6IHtcbiAgICBzaG93OiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogZmFsc2UsXG4gICAgfSxcbiAgICB0aXRsZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ+WfuuacrOeUqOazlXRpdGxlJ1xuICAgIH0sXG4gICAgd2lkdGg6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICc0MCUnXG4gICAgfVxuICB9LFxuICBjb21wdXRlZDoge1xuICAgIHN0eWxlKCkge1xuICAgICAgaWYgKHRoaXMuc2hvdykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHpJbmRleDogOTk5LFxuICAgICAgICAgIG9wYWNpdHk6IDFcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB6SW5kZXg6IC0xMCxcbiAgICAgICAgICBvcGFjaXR5OiAwXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBoYW5kbGVDYW5jZWwoKSB7XG4gICAgICB0aGlzLiRlbWl0KCdjYW5jZWwnKVxuICAgIH0sXG4gICAgaGFuZGxlQ29uZmlybSgpIHtcbiAgICAgIHRoaXMuJGVtaXQoJ2NvbmZpcm0nKVxuICAgIH0sXG4gIH0sXG4gIHJlbmRlcihoKSB7XG4gICAgcmV0dXJuIGgoJ2Rpdicse1xuICAgICAgc3RhdGljQ2xhc3M6ICdzdy1tb2RhbC1tYXNrJyxcbiAgICAgIHN0eWxlOiB0aGlzLnN0eWxlLFxuICAgICAgb246IHtcbiAgICAgICAgY2xpY2s6IHRoaXMuaGFuZGxlQ2FuY2VsXG4gICAgICB9IFxuICAgIH0sIFsgaCgnZGl2JywgeyBcbiAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1tb2RhbCcsXG4gICAgICAgICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgICAgICAgc2hvd01vZGFsOiB0aGlzLnNob3csXG4gICAgICAgICAgICAgICAgaGlkZU1vZGFsOiAhdGhpcy5zaG93XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgd2lkdGg6IHRoaXMud2lkdGhcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICBjbGljazogZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFsgdGhpcy4kc2NvcGVkU2xvdHMuaGVhZGVyID09PSB2b2lkIDAgXG4gICAgICAgICAgICAgICAgPyBoKCdkaXYnLCBcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzczogJ3N3LW1vZGFsLXRpdGxlJ1xuICAgICAgICAgICAgICAgICAgICAgIH0sIFsgaCgnc3BhbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiAnc3ctbW9kYWwtdGl0bGUtdGV4dCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRpdGxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGgoJ3NwYW4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzczogJ3N3LW1vZGFsLWNsb3NlLWljb24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiAoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2FuY2VsKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoKCdpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzczogJ21hdGVyaWFsLWljb25zJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnY2xvc2UnKSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgOiB0aGlzLiRzY29wZWRTbG90cy5oZWFkZXIoKSxcbiAgICAgICAgICAgICAgICB0aGlzLiRzY29wZWRTbG90cy5jb250ZW50KCksXG4gICAgICAgICAgICAgICAgdGhpcy4kc2NvcGVkU2xvdHMuZm9vdGVyID09PSB2b2lkIDAgXG4gICAgICAgICAgICAgICAgPyBoKCdkaXYnLCBcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6ICdzdy1tb2RhbC1mb290ZXInXG4gICAgICAgICAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgaCgnc3ctYnV0dG9uJyx7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzczogJ2J0biBsZWZ0LWJ0bicsXG4gICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2FuY2VsKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH0sICflj5bmtognKSxcbiAgICAgICAgICAgICAgICAgICAgICBoKCdzdy1idXR0b24nLHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiAnYnRuIHJpZ2h0LWJ0bicsXG4gICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQ29uZmlybSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9LCAn56Gu5a6aJylcbiAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICA6IHRoaXMuJHNjb3BlZFNsb3RzLmZvb3RlclxuICAgICAgICAgICAgICBdICAgICAgICAgICAgICBcbiAgICAgICAgICApXG4gICAgICAgIF1cbiAgICApXG4gIH1cbn0iLCJpbXBvcnQgTW9kYWwgZnJvbSAnLi9zcmMvbWFpbi5qcydcblxuY29uc3QgaW5zdGFsbCA9IGZ1bmN0aW9uIChWdWUpIHtcbiAgVnVlLmNvbXBvbmVudChNb2RhbC5uYW1lLCBNb2RhbClcbn1cblxuTW9kYWwuaW5zdGFsbCA9IGluc3RhbGxcblxuZXhwb3J0IGRlZmF1bHQgTW9kYWxcbiIsImltcG9ydCBWdWUgZnJvbSAndnVlJ1xuXG5jb25zdCBpc1NlcnZlciA9IFZ1ZS5wcm90b3R5cGUuJGlzU2VydmVyO1xuXG5leHBvcnQgZnVuY3Rpb24gb2Zmc2V0KGVsKSB7XG4gIGlmIChlbCA9PT0gd2luZG93KSB7XG4gICAgcmV0dXJuIHsgdG9wOiAwLCBsZWZ0OiAwIH1cbiAgfVxuICBjb25zdCB7IHRvcCwgbGVmdCB9ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuICByZXR1cm4geyB0b3AsIGxlZnQgfVxufVxuICBcbmV4cG9ydCBmdW5jdGlvbiBzdHlsZShlbCwgcHJvcGVydHkpIHtcbiAgcmV0dXJuIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsKS5nZXRQcm9wZXJ0eVZhbHVlKHByb3BlcnR5KVxufVxuICBcbmV4cG9ydCBmdW5jdGlvbiBoZWlnaHQoZWwpIHtcbiAgcmV0dXJuIGVsID09PSB3aW5kb3dcbiAgICA/IHdpbmRvdy5pbm5lckhlaWdodFxuICAgIDogZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0XG59XG4gIFxuZXhwb3J0IGZ1bmN0aW9uIHdpZHRoKGVsKSB7XG4gIHJldHVybiBlbCA9PT0gd2luZG93XG4gICAgPyB3aW5kb3cuaW5uZXJXaWR0aFxuICAgIDogZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGhcbn1cbiAgXG5leHBvcnQgZnVuY3Rpb24gY3NzKGVsZW1lbnQsIGNzcykge1xuICBsZXQgc3R5bGUgPSBlbGVtZW50LnN0eWxlXG4gIFxuICBPYmplY3Qua2V5cyhjc3MpLmZvckVhY2gocHJvcCA9PiB7XG4gICAgc3R5bGVbcHJvcF0gPSBjc3NbcHJvcF1cbiAgfSlcbn1cbiAgXG5leHBvcnQgZnVuY3Rpb24gY3NzQmF0Y2goZWxlbWVudHMsIHN0eWxlKSB7XG4gIGVsZW1lbnRzLmZvckVhY2goZWwgPT4gY3NzKGVsLCBzdHlsZSkpXG59XG4gIFxuZXhwb3J0IGZ1bmN0aW9uIHJlYWR5KGZuKSB7XG4gIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm5cbiAgfVxuICBcbiAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgIT09ICdsb2FkaW5nJykge1xuICAgIHJldHVybiBmbigpXG4gIH1cbiAgXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmbiwgZmFsc2UpXG59XG5cbmV4cG9ydCBjb25zdCBvbiA9IChmdW5jdGlvbigpIHtcbiAgaWYgKCFpc1NlcnZlciAmJiBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGVsZW1lbnQsIGV2ZW50LCBoYW5kbGVyKSB7XG4gICAgICBpZiAoZWxlbWVudCAmJiBldmVudCAmJiBoYW5kbGVyKSB7XG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlciwgZmFsc2UpO1xuICAgICAgfVxuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGVsZW1lbnQsIGV2ZW50LCBoYW5kbGVyKSB7XG4gICAgICBpZiAoZWxlbWVudCAmJiBldmVudCAmJiBoYW5kbGVyKSB7XG4gICAgICAgIGVsZW1lbnQuYXR0YWNoRXZlbnQoJ29uJyArIGV2ZW50LCBoYW5kbGVyKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG59KSgpO1xuXG5leHBvcnQgY29uc3Qgb2ZmID0gKGZ1bmN0aW9uKCkge1xuICBpZiAoIWlzU2VydmVyICYmIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oZWxlbWVudCwgZXZlbnQsIGhhbmRsZXIpIHtcbiAgICAgIGlmIChlbGVtZW50ICYmIGV2ZW50KSB7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlciwgZmFsc2UpO1xuICAgICAgfVxuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGVsZW1lbnQsIGV2ZW50LCBoYW5kbGVyKSB7XG4gICAgICBpZiAoZWxlbWVudCAmJiBldmVudCkge1xuICAgICAgICBlbGVtZW50LmRldGFjaEV2ZW50KCdvbicgKyBldmVudCwgaGFuZGxlcik7XG4gICAgICB9XG4gICAgfTtcbiAgfVxufSkoKTsgIFxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG9mZnNldCxcbiAgc3R5bGUsXG4gIGhlaWdodCxcbiAgd2lkdGgsXG4gIGNzcyxcbiAgY3NzQmF0Y2gsXG4gIHJlYWR5LFxuICBvbixcbiAgb2ZmXG59IiwiaW1wb3J0IHsgb24sIG9mZiB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2RvbScgXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdzd1BvcG92ZXInLFxuICBkYXRhICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcG9wb3ZlclN0eWxlOiB7fSxcbiAgICAgIGFycm93U3R5bGU6IHt9LFxuICAgICAgc2hvdzogZmFsc2UsXG4gICAgICByZWZlcmVuY2VFbG06IHt9XG4gICAgfVxuICB9LFxuICBtb2RlbDoge1xuICAgIHByb3A6ICd2YWx1ZScsXG4gICAgZXZlbnQ6ICd1cGRhdGUnXG4gIH0sXG4gIHByb3BzOiB7XG4gICAgdmFsdWU6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW5cbiAgICB9LFxuICAgIHRpdGxlOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgfSxcbiAgICBjb250ZW50OiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgfSxcbiAgICBwbGFjZW1lbnQ6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICd0b3AnXG4gICAgfSxcbiAgICB0cmlnZ2VyOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnY2xpY2snLFxuICAgICAgdmFsaWRhdG9yOiB2YWx1ZSA9PiBbJ2NsaWNrJywgJ2ZvY3VzJywgJ2hvdmVyJywgJ21hbnVhbCddLmluZGV4T2YodmFsdWUpID4gLTFcbiAgICB9LFxuICAgIHdpZHRoOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgfVxuICB9LFxuICBjb21wdXRlZDoge1xuICAgIHNob3dWYWx1ZToge1xuICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlXG4gICAgICB9LFxuICAgICAgc2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICB9XG4gICAgfSxcbiAgICBzaG93U3R5bGUoKSB7XG4gICAgICBpZiAodGhpcy50cmlnZ2VyICE9PSAnbWFudWFsJykge1xuICAgICAgICBpZiAodGhpcy5zaG93KSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHpJbmRleDogOTk5LFxuICAgICAgICAgICAgb3BhY2l0eTogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgekluZGV4OiAtMTAsXG4gICAgICAgICAgICBvcGFjaXR5OiAwXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5zaG93VmFsdWUpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgekluZGV4OiA5OTksXG4gICAgICAgICAgICBvcGFjaXR5OiAxXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB6SW5kZXg6IC0xMCxcbiAgICAgICAgICAgIG9wYWNpdHk6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBnZXRTdHlsZShwb3BvdmVyRWxtLCByZWZlcmVuY2VFbG0pIHtcbiAgICAgIHN3aXRjaCAodGhpcy5wbGFjZW1lbnQpIHtcbiAgICAgICAgY2FzZSAndG9wLXN0YXJ0JzpcbiAgICAgICAgICB0aGlzLnBvcG92ZXJTdHlsZSA9IHtcbiAgICAgICAgICAgIHRvcDogJy0nICsgKHBvcG92ZXJFbG0ub2Zmc2V0SGVpZ2h0ICsgMTApICsgJ3B4J1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmFycm93U3R5bGUgPSB7XG4gICAgICAgICAgICBsZWZ0OiAocmVmZXJlbmNlRWxtLm9mZnNldFdpZHRoIC8gMiAtIDUpICsgJ3B4J1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAndG9wJzpcbiAgICAgICAgICB0aGlzLnBvcG92ZXJTdHlsZSA9IHtcbiAgICAgICAgICAgIHRvcDogJy0nICsgKHBvcG92ZXJFbG0ub2Zmc2V0SGVpZ2h0ICsgMTApICsgJ3B4JyxcbiAgICAgICAgICAgIGxlZnQ6IChyZWZlcmVuY2VFbG0ub2Zmc2V0V2lkdGggLSBwb3BvdmVyRWxtLm9mZnNldFdpZHRoKSAvIDIgKyAncHgnXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuYXJyb3dTdHlsZSA9IHtcbiAgICAgICAgICAgIGxlZnQ6IChwb3BvdmVyRWxtLm9mZnNldFdpZHRoIC8gMiAtIDUpICsgJ3B4J1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlICdib3R0b20tc3RhcnQnOiBcbiAgICAgICAgICB0aGlzLnBvcG92ZXJTdHlsZSA9IHtcbiAgICAgICAgICAgIHRvcDogKHJlZmVyZW5jZUVsbS5vZmZzZXRIZWlnaHQgKyAxMCkgKyAncHgnXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuYXJyb3dTdHlsZSA9IHtcbiAgICAgICAgICAgIGxlZnQ6IChyZWZlcmVuY2VFbG0ub2Zmc2V0V2lkdGggLyAyIC0gNSkgKyAncHgnXG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrIFxuICAgICAgICBjYXNlICdib3R0b20nOlxuICAgICAgICAgIHRoaXMucG9wb3ZlclN0eWxlID0ge1xuICAgICAgICAgICAgdG9wOiAocmVmZXJlbmNlRWxtLm9mZnNldEhlaWdodCArIDEwKSArICdweCcsXG4gICAgICAgICAgICBsZWZ0OiAocmVmZXJlbmNlRWxtLm9mZnNldFdpZHRoIC0gcG9wb3ZlckVsbS5vZmZzZXRXaWR0aCkgLyAyICsgJ3B4J1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmFycm93U3R5bGUgPSB7XG4gICAgICAgICAgICBsZWZ0OiAocG9wb3ZlckVsbS5vZmZzZXRXaWR0aCAvIDIgLSA1KSArICdweCdcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAncmlnaHQtc3RhcnQnOlxuICAgICAgICAgIHRoaXMucG9wb3ZlclN0eWxlID0ge1xuICAgICAgICAgICAgbGVmdDogKHJlZmVyZW5jZUVsbS5vZmZzZXRXaWR0aCArIDEwKSArICdweCcsXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuYXJyb3dTdHlsZSA9IHtcbiAgICAgICAgICAgIHRvcDogKHJlZmVyZW5jZUVsbS5vZmZzZXRIZWlnaHQgLyAyIC0gNSkgKyAncHgnXG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrICBcbiAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgIHRoaXMucG9wb3ZlclN0eWxlID0ge1xuICAgICAgICAgICAgbGVmdDogKHJlZmVyZW5jZUVsbS5vZmZzZXRXaWR0aCArIDEwKSArICdweCcsXG4gICAgICAgICAgICB0b3A6IChyZWZlcmVuY2VFbG0ub2Zmc2V0SGVpZ2h0IC0gcG9wb3ZlckVsbS5vZmZzZXRIZWlnaHQpIC8gMiArICdweCdcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5hcnJvd1N0eWxlID0ge1xuICAgICAgICAgICAgdG9wOiAocG9wb3ZlckVsbS5vZmZzZXRIZWlnaHQgLyAyIC0gNSkgKyAncHgnXG4gICAgICAgICAgfSBcbiAgICAgICAgICBicmVhayBcbiAgICAgICAgY2FzZSAnbGVmdC1zdGFydCc6XG4gICAgICAgICAgdGhpcy5wb3BvdmVyU3R5bGUgPSB7XG4gICAgICAgICAgICByaWdodDogKHJlZmVyZW5jZUVsbS5vZmZzZXRXaWR0aCArIDEwKSArICdweCcsXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuYXJyb3dTdHlsZSA9IHtcbiAgICAgICAgICAgIHRvcDogKHJlZmVyZW5jZUVsbS5vZmZzZXRIZWlnaHQgLyAyIC0gNSkgKyAncHgnXG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgIHRoaXMucG9wb3ZlclN0eWxlID0ge1xuICAgICAgICAgICAgcmlnaHQ6IChyZWZlcmVuY2VFbG0ub2Zmc2V0V2lkdGggKyAxMCkgKyAncHgnLFxuICAgICAgICAgICAgdG9wOiAocmVmZXJlbmNlRWxtLm9mZnNldEhlaWdodCAtIHBvcG92ZXJFbG0ub2Zmc2V0SGVpZ2h0KSAvIDIgKyAncHgnXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuYXJyb3dTdHlsZSA9IHtcbiAgICAgICAgICAgIHRvcDogKHBvcG92ZXJFbG0ub2Zmc2V0SGVpZ2h0IC8gMiAtIDUpICsgJ3B4J1xuICAgICAgICAgIH0gXG4gICAgICAgICAgYnJlYWsgICAgICAgIFxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0sXG4gICAgaGFuZGxlQ2xpY2soKSB7XG4gICAgICB0aGlzLnNob3cgPSAhdGhpcy5zaG93XG4gICAgfSxcbiAgICBoYW5kbGVNb3VzZUVudGVyKCkge1xuICAgICAgdGhpcy5zaG93ID0gdHJ1ZVxuICAgIH0sXG4gICAgaGFuZGxlTW91c2VMZWF2ZSgpIHtcbiAgICAgIHRoaXMuc2hvdyA9IGZhbHNlXG4gICAgfSxcbiAgICBkb1Nob3coKSB7XG4gICAgICB0aGlzLnNob3cgPSB0cnVlXG4gICAgfSxcbiAgICBkb0Nsb3NlKCkge1xuICAgICAgdGhpcy5zaG93ID0gZmFsc2VcbiAgICB9LFxuICAgIGhhbmRsZU1hbnVhbCgpIHtcbiAgICAgIHRoaXMuc2hvd1ZhbHVlID0gIXRoaXMuc2hvd1ZhbHVlXG4gICAgICB0aGlzLiRlbWl0KFwidXBkYXRlXCIsIHRoaXMuc2hvd1ZhbHVlKTtcbiAgICB9XG4gIH0sXG4gIG1vdW50ZWQgKCkge1xuICAgIGxldCBwb3BvdmVyRWxtID0gdGhpcy4kcmVmcy5wb3BvdmVyXG4gICAgbGV0IHJlZmVyZW5jZUVsbSA9IHRoaXMucmVmZXJlbmNlRWxtID0gdGhpcy4kc2NvcGVkU2xvdHMucmVmZXJlbmNlKClbMF0uZWxtXG4gICAgdGhpcy5nZXRTdHlsZShwb3BvdmVyRWxtLCByZWZlcmVuY2VFbG0pXG4gICAgaWYodGhpcy50cmlnZ2VyID09PSAnbWFudWFsJyl7XG4gICAgICBvbihyZWZlcmVuY2VFbG0sICdjbGljaycsIHRoaXMuaGFuZGxlTWFudWFsKTtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBpZiAodGhpcy50cmlnZ2VyID09PSAnY2xpY2snKSB7XG4gICAgICBvbihyZWZlcmVuY2VFbG0sICdjbGljaycsIHRoaXMuaGFuZGxlQ2xpY2spO1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGlmKHRoaXMudHJpZ2dlciA9PT0gJ2hvdmVyJyl7XG4gICAgICBvbihyZWZlcmVuY2VFbG0sICdtb3VzZWVudGVyJywgdGhpcy5oYW5kbGVNb3VzZUVudGVyKVxuICAgICAgb24ocmVmZXJlbmNlRWxtLCAnbW91c2VsZWF2ZScsIHRoaXMuaGFuZGxlTW91c2VMZWF2ZSk7XG4gICAgfVxuICAgIGlmKHRoaXMudHJpZ2dlciA9PT0gJ2ZvY3VzJyl7XG4gICAgICBpZiAocmVmZXJlbmNlRWxtLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0LCB0ZXh0YXJlYScpKSB7XG4gICAgICAgIG9uKHJlZmVyZW5jZUVsbSwgJ2ZvY3VzaW4nLCB0aGlzLmRvU2hvdyk7XG4gICAgICAgIG9uKHJlZmVyZW5jZUVsbSwgJ2ZvY3Vzb3V0JywgdGhpcy5kb0Nsb3NlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9uKHJlZmVyZW5jZUVsbSwgJ21vdXNlZG93bicsIHRoaXMuZG9TaG93KTtcbiAgICAgICAgb24ocmVmZXJlbmNlRWxtLCAnbW91c2V1cCcsIHRoaXMuZG9DbG9zZSk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBkZXN0cm95ZWQgKCkge1xuICAgIGNvbnN0IHJlZmVyZW5jZSA9IHRoaXMucmVmZXJlbmNlRWxtO1xuICAgIG9mZihyZWZlcmVuY2UsICdjbGljaycsIHRoaXMuaGFuZGxlQ2xpY2spO1xuICAgIG9mZihyZWZlcmVuY2UsICdtb3VzZXVwJywgdGhpcy5kb0Nsb3NlKTtcbiAgICBvZmYocmVmZXJlbmNlLCAnbW91c2Vkb3duJywgdGhpcy5kb1Nob3cpO1xuICAgIG9mZihyZWZlcmVuY2UsICdmb2N1c2luJywgdGhpcy5kb1Nob3cpO1xuICAgIG9mZihyZWZlcmVuY2UsICdmb2N1c291dCcsIHRoaXMuZG9DbG9zZSk7XG4gICAgb2ZmKHJlZmVyZW5jZSwgJ21vdXNlZG93bicsIHRoaXMuZG9TaG93KTtcbiAgICBvZmYocmVmZXJlbmNlLCAnbW91c2V1cCcsIHRoaXMuZG9DbG9zZSk7XG4gICAgb2ZmKHJlZmVyZW5jZSwgJ21vdXNlbGVhdmUnLCB0aGlzLmhhbmRsZU1vdXNlTGVhdmUpO1xuICAgIG9mZihyZWZlcmVuY2UsICdtb3VzZWVudGVyJywgdGhpcy5oYW5kbGVNb3VzZUVudGVyKTtcbiAgICBvZmYoZG9jdW1lbnQsICdjbGljaycsIHRoaXMuaGFuZGxlTWFudWFsKTtcbiAgfSxcbiAgcmVuZGVyKGgpIHtcbiAgICByZXR1cm4gaCgnZGl2Jyx7XG4gICAgICBjbGFzczogJ3N3LXBvcG92ZXItY29udGFpbicsXG4gICAgfSwgWyBoKCdkaXYnLCBcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1wb3BvdmVyJyxcbiAgICAgICAgICAgICAgY2xhc3M6ICdzdy1wb3BvdmVyLXNob3cnLFxuICAgICAgICAgICAgICByZWY6ICdwb3BvdmVyJyxcbiAgICAgICAgICAgICAgc3R5bGU6IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih0aGlzLnBvcG92ZXJTdHlsZSwge3dpZHRoOiB0aGlzLndpZHRoIH0pLCB0aGlzLnNob3dTdHlsZSlcbiAgICAgICAgfSwgWyB0aGlzLnRpdGxlICBcbiAgICAgICAgICAgICAgPyBoKCdkaXYnLCB7XG4gICAgICAgICAgICAgICAgY2xhc3M6ICdzdy1wb3BvdmVyLXRpdGxlJ1xuICAgICAgICAgICAgICB9LCB0aGlzLnRpdGxlKVxuICAgICAgICAgICAgICA6ICcnLCBcbiAgICAgICAgICAgICB0aGlzLiRzY29wZWRTbG90cy5kZWZhdWx0ID09PSB2b2lkIDBcbiAgICAgICAgICAgICA/IGgoJ2RpdicsIHtcbiAgICAgICAgICAgICAgICBjbGFzczogJ3N3LXBvcG92ZXItY29udGVudCdcbiAgICAgICAgICAgICB9LCB0aGlzLmNvbnRlbnQgfHwgJycgKVxuICAgICAgICAgICAgICA6IHRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQoKSxcbiAgICAgICAgICAgICBoKCdkaXYnLHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogJ3N3LXBvcG92ZXItYXJyb3cnLFxuICAgICAgICAgICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgICAgICAgJ3N3LXBvcG92ZXItYXJyb3ctdG9wJzogdGhpcy5wbGFjZW1lbnQuaW5kZXhPZigndG9wJykgPj0gMCA/IHRydWUgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAnc3ctcG9wb3Zlci1hcnJvdy1ib3R0b20nOiB0aGlzLnBsYWNlbWVudC5pbmRleE9mKCdib3R0b20nKSA+PSAwID8gdHJ1ZSA6IGZhbHNlLFxuICAgICAgICAgICAgICAgICdzdy1wb3BvdmVyLWFycm93LXJpZ2h0JzogdGhpcy5wbGFjZW1lbnQuaW5kZXhPZigncmlnaHQnKSA+PSAwID8gdHJ1ZSA6IGZhbHNlLFxuICAgICAgICAgICAgICAgICdzdy1wb3BvdmVyLWFycm93LWxlZnQnOiB0aGlzLnBsYWNlbWVudC5pbmRleE9mKCdsZWZ0JykgPj0gMCA/IHRydWUgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHN0eWxlOiB0aGlzLmFycm93U3R5bGVcbiAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSksIFxuICAgICAgICB0aGlzLiRzY29wZWRTbG90cy5yZWZlcmVuY2UgPT09IHZvaWQgMCBcbiAgICAgICAgPyBoKClcbiAgICAgICAgOiB0aGlzLiRzY29wZWRTbG90cy5yZWZlcmVuY2UoKVxuICAgICAgXSkgXG4gIH1cbn0iLCJpbXBvcnQgUG9wb3ZlciBmcm9tICcuL3NyYy9tYWluLmpzJ1xuXG5jb25zdCBpbnN0YWxsID0gZnVuY3Rpb24gKFZ1ZSkge1xuICBWdWUuY29tcG9uZW50KE1vZGFsLm5hbWUsIFBvcG92ZXIpXG59XG5cblBvcG92ZXIuaW5zdGFsbCA9IGluc3RhbGxcblxuZXhwb3J0IGRlZmF1bHQgUG9wb3ZlclxuIiwiaW1wb3J0IEl0ZW0gZnJvbSAnLi4vLi4vaXRlbSdcbmltcG9ydCB7IGlzRGVlcEVxdWFsIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvaXMnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3N3Q2hlY2tib3gnLFxuICBjb21wb25lbnRzOiB7IEl0ZW0gfSxcbiAgcHJvcHM6IHtcbiAgICB2YWx1ZTogQm9vbGVhbiB8IEFycmF5LFxuICAgIHZhbDoge1xuICAgICAgcmVxdWlyZWQ6IGZhbHNlXG4gICAgfSxcbiAgICBsYWJlbDogU3RyaW5nLFxuICAgIGRpc2FibGVkOiBCb29sZWFuLFxuICAgIGNvbG9yOiBTdHJpbmcsXG4gICAgcHJpbWFyeTogQm9vbGVhbixcbiAgICBuZWdhdGl2ZTogQm9vbGVhbixcbiAgICBwb3NpdGl2ZTogQm9vbGVhbixcbiAgICB3YXJuaW5nOiBCb29sZWFuLFxuICAgIGxlZnRMYWJlbDogQm9vbGVhbixcbiAgICBjb2xvckxhYmVsOiBCb29sZWFuLFxuICAgIGtlZXBDb2xvcjogQm9vbGVhblxuICB9LFxuICBkYXRhOiAoKSA9PiAoe1xuICAgIHBhcmVudDogdm9pZCAwXG4gIH0pLFxuICBjb21wdXRlZDoge1xuICAgIG1vZGVsKCkge1xuICAgICAgcmV0dXJuIHRoaXMucGFyZW50ID09PSB2b2lkIDAgPyB0aGlzLnZhbHVlIDogdGhpcy5wYXJlbnQudmFsdWVcbiAgICB9LFxuICAgIHBhcmVudERpc2FibGVkKCkge1xuICAgICAgcmV0dXJuIHRoaXMucGFyZW50ICYmIHRoaXMucGFyZW50LmRpc2FibGVkXG4gICAgfSxcbiAgICBjaGVja2VkOiB7XG4gICAgICBnZXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJvb2xlYW5Nb2RlID8gdGhpcy5tb2RlbCA6IHRoaXMuZ2V0Q2hlY2tlZCh0aGlzLnZhbClcbiAgICAgIH0sXG4gICAgICBzZXQodmFsKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcy5wYXJlbnQgPT09IHZvaWQgMCA/IHRoaXMgOiB0aGlzLnBhcmVudFxuXG4gICAgICAgIHNlbGYuJGVtaXQoXG4gICAgICAgICAgJ2lucHV0JyxcbiAgICAgICAgICB0aGlzLmZvcm1hdFZhbHVlKHZhbClcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH0sXG4gICAgaW5uZXJWYWx1ZSgpIHtcbiAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KHRoaXMubW9kZWwpID8gdGhpcy5tb2RlbCA6IFt0aGlzLm1vZGVsXVxuICAgIH0sXG4gICAgYm9vbGVhbk1vZGUoKSB7XG4gICAgICByZXR1cm4gdGhpcy52YWwgPT09IHZvaWQgMFxuICAgIH1cbiAgfSxcbiAgd2F0Y2g6IHt9LFxuICBtZXRob2RzOiB7XG4gICAgZ2V0Q2hlY2tlZCh2YWwpIHtcbiAgICAgIHJldHVybiB0aGlzLmlubmVyVmFsdWUuc29tZSh4ID0+IGlzRGVlcEVxdWFsKHgsIHZhbCkpXG4gICAgfSxcbiAgICBmb3JtYXRWYWx1ZShjaGVja2VkKSB7XG4gICAgICBpZiAodGhpcy5ib29sZWFuTW9kZSkgeyByZXR1cm4gY2hlY2tlZCB9XG4gICAgICBsZXQgcmVzID0gW11cblxuICAgICAgdGhpcy5pbm5lclZhbHVlLmZvckVhY2goeCA9PiB7XG4gICAgICAgIGlmICghaXNEZWVwRXF1YWwoeCwgdGhpcy52YWwpKSB7XG4gICAgICAgICAgcmVzLnB1c2goeClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIGlmIChjaGVja2VkKSB7IHJlcy5wdXNoKHRoaXMudmFsKSB9XG4gICAgICByZXR1cm4gcmVzXG4gICAgfSxcbiAgfSxcbiAgcmVuZGVyKGgpIHtcbiAgICBsZXQgY2hlY2tlZCA9IHRoaXMuY2hlY2tlZFxuICAgIGxldCBjb2xvckxhYmVsID0gY2hlY2tlZCAmJiB0aGlzLmNvbG9yTGFiZWxcbiAgICBsZXQgY29sb3JDaGVja2JveCA9IGNoZWNrZWQgfHwgdGhpcy5rZWVwQ29sb3JcbiAgICBsZXQgZ2V0TGFiZWwgPSAoKSA9PiBbaCgnZGl2Jywge1xuICAgICAgc3RhdGljQ2xhc3M6ICdzdy1jaGVja2JveF9fdGV4dCBtYXJnaW4tbWluJyxcbiAgICAgIGNsYXNzOiB7XG4gICAgICAgICdjb2xvci1wcmltYXJ5JzogY29sb3JMYWJlbCA/IHRoaXMucHJpbWFyeSA6IHZvaWQgMCxcbiAgICAgICAgJ2NvbG9yLW5lZ2F0aXZlJzogY29sb3JMYWJlbCA/IHRoaXMubmVnYXRpdmUgOiB2b2lkIDAsXG4gICAgICAgICdjb2xvci1wb3NpdGl2ZSc6IGNvbG9yTGFiZWwgPyB0aGlzLnBvc2l0aXZlIDogdm9pZCAwLFxuICAgICAgICAnY29sb3Itd2FybmluZyc6IGNvbG9yTGFiZWwgPyB0aGlzLndhcm5pbmcgOiB2b2lkIDBcbiAgICAgIH0sXG4gICAgICBzdHlsZToge1xuICAgICAgICBjb2xvcjogY29sb3JMYWJlbCA/IHRoaXMuY29sb3IgOiB2b2lkIDBcbiAgICAgIH1cbiAgICB9LCB0aGlzLmxhYmVsKV1cblxuICAgIHJldHVybiBoKCdzdy1pdGVtJywge1xuICAgICAgc3RhdGljQ2xhc3M6ICdzdy1jaGVja2JveCcsXG4gICAgICByZWY6ICdjaGVja2JveCcsXG4gICAgICBjbGFzczoge1xuICAgICAgICBkaXNhYmxlOiB0aGlzLmRpc2FibGVkIHx8IHRoaXMucGFyZW50RGlzYWJsZWRcbiAgICAgIH0sXG4gICAgICBuYXRpdmVPbjogdGhpcy5kaXNhYmxlZCA/IHZvaWQgMCA6IHtcbiAgICAgICAgY2xpY2s6ICgpID0+IHtcbiAgICAgICAgICB0aGlzLmNoZWNrZWQgPSAhY2hlY2tlZFxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgc2NvcGVkU2xvdHM6IHtcbiAgICAgICAgYmVmb3JlOiB0aGlzLmxhYmVsICYmIHRoaXMubGVmdExhYmVsID8gZ2V0TGFiZWwgOiB2b2lkIDAsXG4gICAgICAgIGRlZmF1bHQ6ICgpID0+IFtoKCdzdy1pY29uJywge1xuICAgICAgICAgIHN0YXRpY0NsYXNzOiAnbWFyZ2luLW1pbicsXG4gICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIG9wYWNpdHk6IGNoZWNrZWQgPyAxIDogMC42XG4gICAgICAgICAgfSxcbiAgICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgc2l6ZTogJzIwcHgnLFxuICAgICAgICAgICAgbmFtZTogY2hlY2tlZCA/ICdjaGVja19ib3gnIDogJ2NoZWNrX2JveF9vdXRsaW5lX2JsYW5rJyxcbiAgICAgICAgICAgIGNvbG9yOiBjb2xvckNoZWNrYm94ID8gdGhpcy5jb2xvciA6IHZvaWQgMCxcbiAgICAgICAgICAgIHByaW1hcnk6IGNvbG9yQ2hlY2tib3ggPyB0aGlzLnByaW1hcnkgOiB2b2lkIDAsXG4gICAgICAgICAgICBuZWdhdGl2ZTogY29sb3JDaGVja2JveCA/IHRoaXMubmVnYXRpdmUgOiB2b2lkIDAsXG4gICAgICAgICAgICBwb3NpdGl2ZTogY29sb3JDaGVja2JveCA/IHRoaXMucG9zaXRpdmUgOiB2b2lkIDAsXG4gICAgICAgICAgICB3YXJuaW5nOiBjb2xvckNoZWNrYm94ID8gdGhpcy53YXJuaW5nIDogdm9pZCAwXG4gICAgICAgICAgfVxuICAgICAgICB9KV0sXG4gICAgICAgIGFmdGVyOiB0aGlzLmxhYmVsICYmICF0aGlzLmxlZnRMYWJlbCA/IGdldExhYmVsIDogdm9pZCAwXG4gICAgICB9XG4gICAgfSlcbiAgfVxufSIsImltcG9ydCBDaGVja2JveCBmcm9tICcuL3NyYy9tYWluLmpzJ1xuXG5jb25zdCBpbnN0YWxsID0gZnVuY3Rpb24gKFZ1ZSkge1xuICBWdWUuY29tcG9uZW50KENoZWNrYm94Lm5hbWUsIENoZWNrYm94KVxufVxuXG5DaGVja2JveC5pbnN0YWxsID0gaW5zdGFsbFxuXG5leHBvcnQgZGVmYXVsdCBDaGVja2JveFxuIiwiXG5leHBvcnQgZGVmYXVsdCB7XG4gIGRhdGE6ICgpID0+ICh7fSksXG4gIHdhdGNoOiB7fSxcbiAgY29tcHV0ZWQ6IHt9LFxuICBtZXRob2RzOiB7XG4gICAgc2h1dHRsZShfdGhpcykge1xuICAgICAgbGV0IHNlbGYgPSBfdGhpcyB8fCB0aGlzXG5cbiAgICAgIHNlbGYuJGNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICBpZiAoY2hpbGQuJHJlZnNbdGhpcy5zaHV0dGxlUmVmXSAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgY2hpbGQucGFyZW50ID0gdGhpc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc2h1dHRsZShjaGlsZClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH0sXG4gIG1vdW50ZWQoKSB7XG4gICAgdGhpcy5zaHV0dGxlKClcbiAgfVxufVxuIiwiaW1wb3J0IEZpZWxkIGZyb20gJy4uLy4uL2ZpZWxkJ1xuaW1wb3J0IFNodXR0bGVNaXhpbiBmcm9tICcuLi8uLi8uLi9taXhpbnMvc2h1dHRsZSdcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnc3dDaGVja2JveEdyb3VwJyxcbiAgbWl4aW5zOiBbRmllbGQsIFNodXR0bGVNaXhpbl0sIC8vIGZvY3VzZWQsZGlzYWJsZWQsc2h1dHRsZVJlZlxuICBwcm9wczoge1xuICAgIHZhbHVlOiBCb29sZWFuIHwgQXJyYXlcbiAgfSxcbiAgZGF0YTogKCkgPT4gKHtcbiAgICBpbm5lclBvaW50ZXI6IHRydWUsXG4gICAgc2h1dHRsZVJlZjogJ2NoZWNrYm94J1xuICB9KSxcbiAgY29tcHV0ZWQ6IHt9LFxuICB3YXRjaDoge30sXG4gIG1ldGhvZHM6IHt9XG59IiwiaW1wb3J0IENoZWNrYm94R3JvdXAgZnJvbSAnLi9zcmMvbWFpbi5qcydcblxuY29uc3QgaW5zdGFsbCA9IGZ1bmN0aW9uIChWdWUpIHtcbiAgVnVlLmNvbXBvbmVudChDaGVja2JveEdyb3VwLm5hbWUsIENoZWNrYm94R3JvdXApXG59XG5cbkNoZWNrYm94R3JvdXAuaW5zdGFsbCA9IGluc3RhbGxcblxuZXhwb3J0IGRlZmF1bHQgQ2hlY2tib3hHcm91cFxuIiwiaW1wb3J0IEl0ZW0gZnJvbSAnLi4vLi4vaXRlbSdcbmltcG9ydCB7IGlzRGVlcEVxdWFsIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvaXMnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3N3UmFkaW8nLFxuICBjb21wb25lbnRzOiB7IEl0ZW0gfSxcbiAgcHJvcHM6IHtcbiAgICB2YWx1ZToge30sXG4gICAgdmFsOiB7XG4gICAgICByZXF1aXJlZDogdHJ1ZVxuICAgIH0sXG4gICAgbGFiZWw6IFN0cmluZyxcbiAgICBkaXNhYmxlZDogQm9vbGVhbixcbiAgICBjb2xvcjogU3RyaW5nLFxuICAgIHByaW1hcnk6IEJvb2xlYW4sXG4gICAgbmVnYXRpdmU6IEJvb2xlYW4sXG4gICAgcG9zaXRpdmU6IEJvb2xlYW4sXG4gICAgd2FybmluZzogQm9vbGVhbixcbiAgICBsZWZ0TGFiZWw6IEJvb2xlYW4sXG4gICAgY29sb3JMYWJlbDogQm9vbGVhbixcbiAgICBrZWVwQ29sb3I6IEJvb2xlYW5cbiAgfSxcbiAgZGF0YTogKCkgPT4gKHtcbiAgICBwYXJlbnQ6IHZvaWQgMFxuICB9KSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBtb2RlbCgpIHtcbiAgICAgIHJldHVybiB0aGlzLnBhcmVudCA9PT0gdm9pZCAwID8gdGhpcy52YWx1ZSA6IHRoaXMucGFyZW50LnZhbHVlXG4gICAgfSxcbiAgICBwYXJlbnREaXNhYmxlZCgpIHtcbiAgICAgIHJldHVybiB0aGlzLnBhcmVudCAmJiB0aGlzLnBhcmVudC5kaXNhYmxlZFxuICAgIH0sXG4gICAgY2hlY2tlZDoge1xuICAgICAgZ2V0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDaGVja2VkKHRoaXMudmFsKVxuICAgICAgfSxcbiAgICAgIHNldCgpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzLnBhcmVudCA9PT0gdm9pZCAwID8gdGhpcyA6IHRoaXMucGFyZW50XG5cbiAgICAgICAgc2VsZi4kZW1pdChcbiAgICAgICAgICAnaW5wdXQnLFxuICAgICAgICAgIHRoaXMudmFsXG4gICAgICAgIClcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIHdhdGNoOiB7fSxcbiAgbWV0aG9kczoge1xuICAgIGdldENoZWNrZWQodmFsKSB7XG4gICAgICByZXR1cm4gaXNEZWVwRXF1YWwodGhpcy5tb2RlbCwgdmFsKVxuICAgIH0sXG4gIH0sXG4gIHJlbmRlcihoKSB7XG4gICAgbGV0IGNoZWNrZWQgPSB0aGlzLmNoZWNrZWRcbiAgICBsZXQgY29sb3JMYWJlbCA9IGNoZWNrZWQgJiYgdGhpcy5jb2xvckxhYmVsXG4gICAgbGV0IGNvbG9yUmFkaW8gPSBjaGVja2VkIHx8IHRoaXMua2VlcENvbG9yXG4gICAgbGV0IGdldExhYmVsID0gKCkgPT4gW2goJ2RpdicsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiAnc3ctcmFkaW9fX3RleHQgbWFyZ2luLW1pbicsXG4gICAgICBjbGFzczoge1xuICAgICAgICAnY29sb3ItcHJpbWFyeSc6IGNvbG9yTGFiZWwgPyB0aGlzLnByaW1hcnkgOiB2b2lkIDAsXG4gICAgICAgICdjb2xvci1uZWdhdGl2ZSc6IGNvbG9yTGFiZWwgPyB0aGlzLm5lZ2F0aXZlIDogdm9pZCAwLFxuICAgICAgICAnY29sb3ItcG9zaXRpdmUnOiBjb2xvckxhYmVsID8gdGhpcy5wb3NpdGl2ZSA6IHZvaWQgMCxcbiAgICAgICAgJ2NvbG9yLXdhcm5pbmcnOiBjb2xvckxhYmVsID8gdGhpcy53YXJuaW5nIDogdm9pZCAwXG4gICAgICB9LFxuICAgICAgc3R5bGU6IHtcbiAgICAgICAgY29sb3I6IGNvbG9yTGFiZWwgPyB0aGlzLmNvbG9yIDogdm9pZCAwXG4gICAgICB9XG4gICAgfSwgdGhpcy5sYWJlbCldXG5cbiAgICByZXR1cm4gaCgnc3ctaXRlbScsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiAnc3ctcmFkaW8nLFxuICAgICAgcmVmOiAncmFkaW8nLFxuICAgICAgY2xhc3M6IHtcbiAgICAgICAgZGlzYWJsZTogdGhpcy5kaXNhYmxlZCB8fCB0aGlzLnBhcmVudERpc2FibGVkXG4gICAgICB9LFxuICAgICAgbmF0aXZlT246IHRoaXMuZGlzYWJsZWQgPyB2b2lkIDAgOiB7XG4gICAgICAgIGNsaWNrOiAoKSA9PiB7XG4gICAgICAgICAgaWYgKGNoZWNrZWQpIHsgcmV0dXJuIH1cbiAgICAgICAgICB0aGlzLmNoZWNrZWQgPSB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzY29wZWRTbG90czoge1xuICAgICAgICBiZWZvcmU6IHRoaXMubGFiZWwgJiYgdGhpcy5sZWZ0TGFiZWwgPyBnZXRMYWJlbCA6IHZvaWQgMCxcbiAgICAgICAgZGVmYXVsdDogKCkgPT4gW2goJ3N3LWljb24nLCB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6ICdtYXJnaW4tbWluJyxcbiAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgb3BhY2l0eTogY2hlY2tlZCA/IDEgOiAwLjZcbiAgICAgICAgICB9LFxuICAgICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICBzaXplOiAnMjBweCcsXG4gICAgICAgICAgICBuYW1lOiBjaGVja2VkID8gJ3JhZGlvX2J1dHRvbl9jaGVja2VkJyA6ICdyYWRpb19idXR0b25fdW5jaGVja2VkJyxcbiAgICAgICAgICAgIGNvbG9yOiBjb2xvclJhZGlvID8gdGhpcy5jb2xvciA6IHZvaWQgMCxcbiAgICAgICAgICAgIHByaW1hcnk6IGNvbG9yUmFkaW8gPyB0aGlzLnByaW1hcnkgOiB2b2lkIDAsXG4gICAgICAgICAgICBuZWdhdGl2ZTogY29sb3JSYWRpbyA/IHRoaXMubmVnYXRpdmUgOiB2b2lkIDAsXG4gICAgICAgICAgICBwb3NpdGl2ZTogY29sb3JSYWRpbyA/IHRoaXMucG9zaXRpdmUgOiB2b2lkIDAsXG4gICAgICAgICAgICB3YXJuaW5nOiBjb2xvclJhZGlvID8gdGhpcy53YXJuaW5nIDogdm9pZCAwXG4gICAgICAgICAgfVxuICAgICAgICB9KV0sXG4gICAgICAgIGFmdGVyOiB0aGlzLmxhYmVsICYmICF0aGlzLmxlZnRMYWJlbCA/IGdldExhYmVsIDogdm9pZCAwXG4gICAgICB9XG4gICAgfSlcbiAgfVxufSIsImltcG9ydCBSYWRpbyBmcm9tICcuL3NyYy9tYWluLmpzJ1xuXG5jb25zdCBpbnN0YWxsID0gZnVuY3Rpb24gKFZ1ZSkge1xuICBWdWUuY29tcG9uZW50KFJhZGlvLm5hbWUsIFJhZGlvKVxufVxuXG5SYWRpby5pbnN0YWxsID0gaW5zdGFsbFxuXG5leHBvcnQgZGVmYXVsdCBSYWRpb1xuIiwiaW1wb3J0IEZpZWxkIGZyb20gJy4uLy4uL2ZpZWxkJ1xuaW1wb3J0IFNodXR0bGVNaXhpbiBmcm9tICcuLi8uLi8uLi9taXhpbnMvc2h1dHRsZSdcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnc3dSYWRpb0dyb3VwJyxcbiAgbWl4aW5zOiBbRmllbGQsIFNodXR0bGVNaXhpbl0sIC8vIGZvY3VzZWQsZGlzYWJsZWQsc2h1dHRsZVJlZlxuICBwcm9wczoge1xuICAgIHZhbHVlOiB7XG4gICAgICByZXF1aXJlZDogdHJ1ZVxuICAgIH1cbiAgfSxcbiAgZGF0YTogKCkgPT4gKHtcbiAgICBpbm5lclBvaW50ZXI6IHRydWUsXG4gICAgc2h1dHRsZVJlZjogJ3JhZGlvJ1xuICB9KSxcbiAgY29tcHV0ZWQ6IHt9LFxuICB3YXRjaDoge30sXG4gIG1ldGhvZHM6IHt9XG59IiwiaW1wb3J0IFJhZGlvR3JvdXAgZnJvbSAnLi9zcmMvbWFpbi5qcydcblxuY29uc3QgaW5zdGFsbCA9IGZ1bmN0aW9uIChWdWUpIHtcbiAgVnVlLmNvbXBvbmVudChSYWRpb0dyb3VwLm5hbWUsIFJhZGlvR3JvdXApXG59XG5cblJhZGlvR3JvdXAuaW5zdGFsbCA9IGluc3RhbGxcblxuZXhwb3J0IGRlZmF1bHQgUmFkaW9Hcm91cFxuIiwiLyoqXG4gKlxuICpcbiAqIEBwYXJhbSB7Kn0gdG90YWwgIOWIhumhteaAu+aVsFxuICogQHBhcmFtIHsqfSBjdXIgIOW9k+WJjemhtemdoiAgM1xuICogQHBhcmFtIHsqfSBhcm91bmQgICAxIDIgMyA0IDUgICBhcm91bmQgPSAyXG4gKiBAcmV0dXJuc1xuICovXG5jb25zdCBtYWtlUmVzdWx0ID0gKHRvdGFsLGN1cixhcm91bmQpID0+IHtcbiAgbGV0IHJlc3VsdCA9IFtdO1xuICBsZXQgYmFzZUNvdW50ID0gYXJvdW5kICogMiArIDEgKyAyICsgMiArIDI7IC8v5oC75YWx5YWD57Sg5Liq5pWwXG4gIGxldCBzdXJwbHVzID0gYmFzZUNvdW50IC0gNDsgLy/lj6rlh7rnjrDkuIDkuKrnnIHnlaXlj7cg5Ymp5L2Z5YWD57Sg5Liq5pWwXG4gIGxldCBzdGFydFBvc2l0aW9uID0gMSArIDIgKyBhcm91bmQsZW5kUG9zaXRpb24gPSB0b3RhbCAtIDIgLSBhcm91bmQ7XG5cbiAgaWYodG90YWwgPD0gYmFzZUNvdW50IC0gMil7IC8v5YWo6YOo5pi+56S6IOS4jeWHuueOsOecgeeVpeWPt1xuICAgICAgcmVzdWx0ID0gIEFycmF5LmZyb20oe2xlbmd0aDogdG90YWx9LCAodiwgaSkgPT4gaSArIDEpO1xuICB9ZWxzZXsgLy/pnIDopoHlh7rnjrDnnIHnlaXlj7dcbiAgICAgIGlmKGN1ciA8PSBzdGFydFBvc2l0aW9uKXsgLy8xLuWPquacieWQjumdouWHuueOsOecgeeVpeWPt1xuICAgICAgICAgIHJlc3VsdCA9IFsuLi5BcnJheS5mcm9tKHtsZW5ndGg6IHN1cnBsdXN9LCAodiwgaSkgPT4gaSArIDEpLFwiwrfCt8K3XCIsdG90YWxdXG4gICAgICB9ZWxzZSBpZihjdXIgPj0gZW5kUG9zaXRpb24pIHsgLy8yLuWPquacieWJjei+ueWHuueOsOecgeeVpeWPt1xuICAgICAgICAgIHJlc3VsdCA9IFsxLCfCt8K3wrcnLC4uLkFycmF5LmZyb20oe2xlbmd0aDogc3VycGx1c30sICh2LCBpKSA9PiB0b3RhbCAtIHN1cnBsdXMgKyBpICsgMSldXG4gICAgICB9ZWxzZXsgLy8zLuS4pOi+uemDveacieecgeeVpeWPt1xuICAgICAgICAgIHJlc3VsdCA9IFsxLCfCt8K3wrcnLC4uLkFycmF5LmZyb20oe2xlbmd0aDogYXJvdW5kICogMiArIDF9LCAodiwgaSkgPT4gY3VyIC0gYXJvdW5kICsgaSksJ8K3wrfCtycsdG90YWxdXG4gICAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0XG59XG5cbmV4cG9ydCBkZWZhdWx0IG1ha2VSZXN1bHQiLCI8dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJzdy1wYWdpbmF0aW9uXCI+XG4gICAgPGRpdiBjbGFzcz1cInN3LXBhZ2luYXRpb24tdG90YWxcIiB2LWlmPVwibGF5b3V0LmluZGV4T2YoJ3RvdGFsJykgPiAtMVwiPiBcbiAgICAgIHt7YOWFsSR7dG90YWx95p2hYH19XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInN3LXBhZ2luYXRpb24tc2VsZWN0XCIgdi1pZj1cImxheW91dC5pbmRleE9mKCdzZWxlY3QnKSA+IC0xXCI+XG4gICAgICA8c3ctc2VsZWN0IHYtbW9kZWw9XCJwYWdlU2l6ZVZhbHVlXCIgOm9wdGlvbnM9XCJzZWxlY3RPcHRpb25cIiBzZWxlY3RlZEZpbGxlZCBib3JkZXJlZCBtaW5pIHNlbGVjdGVkU3R5bGU9XCJub25lXCI+PC9zdy1zZWxlY3Q+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInN3LXBhZ2luYXRpb24tcGFnZVwiPlxuICAgICAgPHNwYW4gY2xhc3M9XCJzdy1wYWdpbmF0aW9uLXBhZ2UtaXRlbVwiIEBjbGljaz1cImhhbmRsZUNsaWNrQXJyb3coJ2xlZnQnKVwiPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgc3ctcGFnaW5hdGlvbi1wYWdlLWl0ZW0taWNvblwiPmtleWJvYXJkX2Fycm93X2xlZnQ8L2k+PC9zcGFuPlxuICAgICAgPHNwYW4gdi1mb3I9XCIoaXRlbSwgaW5kZXgpIGluIHBhZ2luYXRpb25MaXN0XCIgOmNsYXNzPVwiWydzdy1wYWdpbmF0aW9uLXBhZ2UtaXRlbScsIGN1cnJlbnRQYWdlVmFsdWUgPT09IGl0ZW0gPyAnYWN0aXZlJyA6ICcnXVwiIEBjbGljaz1cImhhbmRsZUNsaWNrUGFnZShpdGVtLCBpbmRleClcIj5cbiAgICAgICAgPGkgdi1pZj1cIml0ZW0gPT09ICfCt8K3wrcnXCIgY2xhc3M9XCJtYXRlcmlhbC1pY29ucyBzdy1wYWdpbmF0aW9uLXBhZ2UtaXRlbS1pY29uXCI+bW9yZV9ob3JpejwvaT5cbiAgICAgICAgPHNwYW4gdi1lbHNlPlxuICAgICAgICAgIHt7aXRlbX19XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwic3ctcGFnaW5hdGlvbi1wYWdlLWl0ZW1cIiBAY2xpY2s9XCJoYW5kbGVDbGlja0Fycm93KCdyaWdodCcpXCI+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29ucyBzdy1wYWdpbmF0aW9uLXBhZ2UtaXRlbS1pY29uXCI+a2V5Ym9hcmRfYXJyb3dfcmlnaHQ8L2k+PC9zcGFuPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJzdy1wYWdpbmF0aW9uLWdvdG9cIiB2LWlmPVwibGF5b3V0LmluZGV4T2YoJ2dvdG8nKSA+IC0xXCI+XG4gICAgICA8c3Bhbj7liY3lvoA8L3NwYW4+XG4gICAgICA8ZGl2IGNsYXNzPVwic3ctcGFnaW5hdGlvbi1nb3RvLWlucHV0XCI+XG4gICAgICAgIDxzdy1pbnB1dCBib3JkZXJlZCB2LW1vZGVsPSdpbnB1dFZhbHVlJyBAa2V5dXAuZW50ZXIubmF0aXZlPVwiaGFuZGxlRW50ZXJHb3RvXCIgbWluaSBzdHlsZT1cIndpZHRoOjQwcHhcIj48L3N3LWlucHV0PlxuICAgICAgPC9kaXY+XG4gICAgICA8c3Bhbj7pobU8L3NwYW4+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCBzd1NlbGVjdCBmcm9tICcuLi8uLi9zZWxlY3QvaW5kZXgnXG5pbXBvcnQgbWFrZVJlc3VsdCBmcm9tICcuL3BhZ2luYXRpb24nXG5pbXBvcnQgc3dJbnB1dCBmcm9tICcuLi8uLi9pbnB1dC9pbmRleCdcbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3N3UGFnaW5hdGlvbicsXG4gIGRhdGEgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjdXJyZW50UGFnZVZhbHVlOiB0aGlzLmN1cnJlbnRQYWdlLFxuICAgICAgcGFnZVRvdGFsOiAnJyxcbiAgICAgIHBhZ2VTaXplVmFsdWU6IHRoaXMucGFnZVNpemUsXG4gICAgICBpbnB1dFZhbHVlOiAnMSdcbiAgICB9XG4gIH0sXG4gIHByb3BzOiB7XG4gICAgdG90YWw6IHtcbiAgICAgIHR5cGU6IE51bWJlclxuICAgIH0sXG4gICAgcGFnZVNpemU6IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIGRlZmF1bHQ6IDIwXG4gICAgfSxcbiAgICBvcHRpb25zOiB7XG4gICAgICB0eXBlOiBBcnJheSxcbiAgICAgIGRlZmF1bHQ6IFsyMCwgNDAsIDYwLCA4MF1cbiAgICB9LFxuICAgIGN1cnJlbnRQYWdlOiB7XG4gICAgICB0eXBlOiBOdW1iZXJcbiAgICB9LFxuICAgIGFyb3VuZDoge1xuICAgICAgdHlwZTogTnVtYmVyXG4gICAgfSxcbiAgICBsYXlvdXQ6IHtcbiAgICAgIHR5cGU6IFN0cmluZ1xuICAgIH1cbiAgfSxcbiAgd2F0Y2g6IHtcbiAgICBjdXJyZW50UGFnZVZhbHVlKCkge1xuICAgICAgdGhpcy4kZW1pdCgnY3VycmVudC1jaGFuZ2UnLCB0aGlzLmN1cnJlbnRQYWdlVmFsdWUpXG4gICAgfSxcbiAgICBwYWdlU2l6ZVZhbHVlKCkge1xuICAgICAgdGhpcy4kZW1pdCgnc2l6ZS1jaGFuZ2UnLCB0aGlzLnBhZ2VTaXplVmFsdWUpXG4gICAgfVxuICB9LFxuICBjb21wdXRlZDoge1xuICAgIHNlbGVjdE9wdGlvbigpIHtcbiAgICAgIGxldCBhcnkgPSBbXVxuICAgICAgdGhpcy5vcHRpb25zLm1hcChpPT57XG4gICAgICAgIGxldCBpdGVtID0ge31cbiAgICAgICAgaXRlbS5uYW1lID0gYCR7aX3mnaEv6aG1YFxuICAgICAgICBpdGVtLnZhbHVlID0gaVxuICAgICAgICBhcnkucHVzaChpdGVtKVxuICAgICAgfSlcbiAgICAgIHJldHVybiBhcnlcbiAgICB9LFxuICAgIHBhZ2luYXRpb25MaXN0KCkge1xuICAgICAgbGV0IHBhZ2VUb3RhbCA9IHRoaXMucGFnZVRvdGFsID0gdGhpcy50b3RhbCAvIHRoaXMucGFnZVNpemVWYWx1ZVxuICAgICAgaWYgKGAke3BhZ2VUb3RhbH1gLmluZGV4T2YoJy4nKSA+IC0xKSB7XG4gICAgICAgIHBhZ2VUb3RhbCA9IHRoaXMucGFnZVRvdGFsID0gcGFyc2VJbnQocGFnZVRvdGFsICsgMSlcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmN1cnJlbnRQYWdlVmFsdWUgPiBwYWdlVG90YWwpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50UGFnZVZhbHVlID0gcGFnZVRvdGFsXG4gICAgICB9XG4gICAgICBsZXQgcGFnZUxpc3QgPSBtYWtlUmVzdWx0KHBhZ2VUb3RhbCwgdGhpcy5jdXJyZW50UGFnZVZhbHVlLCB0aGlzLmFyb3VuZClcbiAgICAgIHJldHVybiBwYWdlTGlzdFxuICAgIH1cbiAgfSxcbiAgY29tcG9uZW50czoge1xuICAgIHN3U2VsZWN0LFxuICAgIHN3SW5wdXRcbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGhhbmRsZUVudGVyR290bygpIHtcbiAgICAgIGxldCBwYWdlID0gcGFyc2VJbnQodGhpcy5pbnB1dFZhbHVlKVxuICAgICAgaWYgKHBhZ2UgPCAxKSB7XG4gICAgICAgIHRoaXMuaW5wdXRWYWx1ZSA9ICcxJ1xuICAgICAgfVxuICAgICAgaWYgKHBhZ2UgPiB0aGlzLnBhZ2VUb3RhbCkge1xuICAgICAgICB0aGlzLmlucHV0VmFsdWUgPSBgJHt0aGlzLnBhZ2VUb3RhbH1gXG4gICAgICB9XG4gICAgICB0aGlzLmN1cnJlbnRQYWdlVmFsdWUgPSBwYXJzZUludCh0aGlzLmlucHV0VmFsdWUpXG4gICAgICB0aGlzLmlucHV0VmFsdWUgPSBgJHtwYXJzZUludCh0aGlzLmlucHV0VmFsdWUpfWBcbiAgICB9LFxuICAgIGhhbmRsZUNsaWNrUGFnZShpdGVtLCBpbmRleCl7XG4gICAgICBpZiAoaXRlbSA9PT0gJ8K3wrfCtycpIHtcbiAgICAgICAgaWYoaW5kZXggPT09IDEpe1xuICAgICAgICAgIHRoaXMuY3VycmVudFBhZ2VWYWx1ZSA9IDNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRQYWdlVmFsdWUgPSB0aGlzLnBhZ2VUb3RhbCAtIDJcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jdXJyZW50UGFnZVZhbHVlID0gaXRlbVxuICAgICAgfVxuICAgIH0sXG4gICAgaGFuZGxlQ2xpY2tBcnJvdyhwYXJhbXMpIHtcbiAgICAgIGlmIChwYXJhbXMgPT09ICdsZWZ0Jykge1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50UGFnZVZhbHVlICE9PSAxKSB7XG4gICAgICAgICAgdGhpcy5jdXJyZW50UGFnZVZhbHVlID0gdGhpcy5jdXJyZW50UGFnZVZhbHVlIC0gMVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRQYWdlVmFsdWUgPSAxXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRQYWdlVmFsdWUgIT09IHRoaXMucGFnZVRvdGFsKSB7XG4gICAgICAgICAgdGhpcy5jdXJyZW50UGFnZVZhbHVlID0gdGhpcy5jdXJyZW50UGFnZVZhbHVlICsgMVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY3VycmVudFBhZ2VWYWx1ZSA9IHRoaXMucGFnZVRvdGFsXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48c3R5bGU+XG5cbjwvc3R5bGU+XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZUNvbXBvbmVudCh0ZW1wbGF0ZSwgc3R5bGUsIHNjcmlwdCwgc2NvcGVJZCwgaXNGdW5jdGlvbmFsVGVtcGxhdGUsIG1vZHVsZUlkZW50aWZpZXJcbi8qIHNlcnZlciBvbmx5ICovXG4sIHNoYWRvd01vZGUsIGNyZWF0ZUluamVjdG9yLCBjcmVhdGVJbmplY3RvclNTUiwgY3JlYXRlSW5qZWN0b3JTaGFkb3cpIHtcbiAgaWYgKHR5cGVvZiBzaGFkb3dNb2RlICE9PSAnYm9vbGVhbicpIHtcbiAgICBjcmVhdGVJbmplY3RvclNTUiA9IGNyZWF0ZUluamVjdG9yO1xuICAgIGNyZWF0ZUluamVjdG9yID0gc2hhZG93TW9kZTtcbiAgICBzaGFkb3dNb2RlID0gZmFsc2U7XG4gIH0gLy8gVnVlLmV4dGVuZCBjb25zdHJ1Y3RvciBleHBvcnQgaW50ZXJvcC5cblxuXG4gIHZhciBvcHRpb25zID0gdHlwZW9mIHNjcmlwdCA9PT0gJ2Z1bmN0aW9uJyA/IHNjcmlwdC5vcHRpb25zIDogc2NyaXB0OyAvLyByZW5kZXIgZnVuY3Rpb25zXG5cbiAgaWYgKHRlbXBsYXRlICYmIHRlbXBsYXRlLnJlbmRlcikge1xuICAgIG9wdGlvbnMucmVuZGVyID0gdGVtcGxhdGUucmVuZGVyO1xuICAgIG9wdGlvbnMuc3RhdGljUmVuZGVyRm5zID0gdGVtcGxhdGUuc3RhdGljUmVuZGVyRm5zO1xuICAgIG9wdGlvbnMuX2NvbXBpbGVkID0gdHJ1ZTsgLy8gZnVuY3Rpb25hbCB0ZW1wbGF0ZVxuXG4gICAgaWYgKGlzRnVuY3Rpb25hbFRlbXBsYXRlKSB7XG4gICAgICBvcHRpb25zLmZ1bmN0aW9uYWwgPSB0cnVlO1xuICAgIH1cbiAgfSAvLyBzY29wZWRJZFxuXG5cbiAgaWYgKHNjb3BlSWQpIHtcbiAgICBvcHRpb25zLl9zY29wZUlkID0gc2NvcGVJZDtcbiAgfVxuXG4gIHZhciBob29rO1xuXG4gIGlmIChtb2R1bGVJZGVudGlmaWVyKSB7XG4gICAgLy8gc2VydmVyIGJ1aWxkXG4gICAgaG9vayA9IGZ1bmN0aW9uIGhvb2soY29udGV4dCkge1xuICAgICAgLy8gMi4zIGluamVjdGlvblxuICAgICAgY29udGV4dCA9IGNvbnRleHQgfHwgLy8gY2FjaGVkIGNhbGxcbiAgICAgIHRoaXMuJHZub2RlICYmIHRoaXMuJHZub2RlLnNzckNvbnRleHQgfHwgLy8gc3RhdGVmdWxcbiAgICAgIHRoaXMucGFyZW50ICYmIHRoaXMucGFyZW50LiR2bm9kZSAmJiB0aGlzLnBhcmVudC4kdm5vZGUuc3NyQ29udGV4dDsgLy8gZnVuY3Rpb25hbFxuICAgICAgLy8gMi4yIHdpdGggcnVuSW5OZXdDb250ZXh0OiB0cnVlXG5cbiAgICAgIGlmICghY29udGV4dCAmJiB0eXBlb2YgX19WVUVfU1NSX0NPTlRFWFRfXyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgY29udGV4dCA9IF9fVlVFX1NTUl9DT05URVhUX187XG4gICAgICB9IC8vIGluamVjdCBjb21wb25lbnQgc3R5bGVzXG5cblxuICAgICAgaWYgKHN0eWxlKSB7XG4gICAgICAgIHN0eWxlLmNhbGwodGhpcywgY3JlYXRlSW5qZWN0b3JTU1IoY29udGV4dCkpO1xuICAgICAgfSAvLyByZWdpc3RlciBjb21wb25lbnQgbW9kdWxlIGlkZW50aWZpZXIgZm9yIGFzeW5jIGNodW5rIGluZmVyZW5jZVxuXG5cbiAgICAgIGlmIChjb250ZXh0ICYmIGNvbnRleHQuX3JlZ2lzdGVyZWRDb21wb25lbnRzKSB7XG4gICAgICAgIGNvbnRleHQuX3JlZ2lzdGVyZWRDb21wb25lbnRzLmFkZChtb2R1bGVJZGVudGlmaWVyKTtcbiAgICAgIH1cbiAgICB9OyAvLyB1c2VkIGJ5IHNzciBpbiBjYXNlIGNvbXBvbmVudCBpcyBjYWNoZWQgYW5kIGJlZm9yZUNyZWF0ZVxuICAgIC8vIG5ldmVyIGdldHMgY2FsbGVkXG5cblxuICAgIG9wdGlvbnMuX3NzclJlZ2lzdGVyID0gaG9vaztcbiAgfSBlbHNlIGlmIChzdHlsZSkge1xuICAgIGhvb2sgPSBzaGFkb3dNb2RlID8gZnVuY3Rpb24gKCkge1xuICAgICAgc3R5bGUuY2FsbCh0aGlzLCBjcmVhdGVJbmplY3RvclNoYWRvdyh0aGlzLiRyb290LiRvcHRpb25zLnNoYWRvd1Jvb3QpKTtcbiAgICB9IDogZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICAgIHN0eWxlLmNhbGwodGhpcywgY3JlYXRlSW5qZWN0b3IoY29udGV4dCkpO1xuICAgIH07XG4gIH1cblxuICBpZiAoaG9vaykge1xuICAgIGlmIChvcHRpb25zLmZ1bmN0aW9uYWwpIHtcbiAgICAgIC8vIHJlZ2lzdGVyIGZvciBmdW5jdGlvbmFsIGNvbXBvbmVudCBpbiB2dWUgZmlsZVxuICAgICAgdmFyIG9yaWdpbmFsUmVuZGVyID0gb3B0aW9ucy5yZW5kZXI7XG5cbiAgICAgIG9wdGlvbnMucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyV2l0aFN0eWxlSW5qZWN0aW9uKGgsIGNvbnRleHQpIHtcbiAgICAgICAgaG9vay5jYWxsKGNvbnRleHQpO1xuICAgICAgICByZXR1cm4gb3JpZ2luYWxSZW5kZXIoaCwgY29udGV4dCk7XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBpbmplY3QgY29tcG9uZW50IHJlZ2lzdHJhdGlvbiBhcyBiZWZvcmVDcmVhdGUgaG9va1xuICAgICAgdmFyIGV4aXN0aW5nID0gb3B0aW9ucy5iZWZvcmVDcmVhdGU7XG4gICAgICBvcHRpb25zLmJlZm9yZUNyZWF0ZSA9IGV4aXN0aW5nID8gW10uY29uY2F0KGV4aXN0aW5nLCBob29rKSA6IFtob29rXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc2NyaXB0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5vcm1hbGl6ZUNvbXBvbmVudDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW5vcm1hbGl6ZS1jb21wb25lbnQuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBpc09sZElFID0gdHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgL21zaWUgWzYtOV1cXFxcYi8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpO1xuZnVuY3Rpb24gY3JlYXRlSW5qZWN0b3IoY29udGV4dCkge1xuICByZXR1cm4gZnVuY3Rpb24gKGlkLCBzdHlsZSkge1xuICAgIHJldHVybiBhZGRTdHlsZShpZCwgc3R5bGUpO1xuICB9O1xufVxudmFyIEhFQUQgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG52YXIgc3R5bGVzID0ge307XG5cbmZ1bmN0aW9uIGFkZFN0eWxlKGlkLCBjc3MpIHtcbiAgdmFyIGdyb3VwID0gaXNPbGRJRSA/IGNzcy5tZWRpYSB8fCAnZGVmYXVsdCcgOiBpZDtcbiAgdmFyIHN0eWxlID0gc3R5bGVzW2dyb3VwXSB8fCAoc3R5bGVzW2dyb3VwXSA9IHtcbiAgICBpZHM6IG5ldyBTZXQoKSxcbiAgICBzdHlsZXM6IFtdXG4gIH0pO1xuXG4gIGlmICghc3R5bGUuaWRzLmhhcyhpZCkpIHtcbiAgICBzdHlsZS5pZHMuYWRkKGlkKTtcbiAgICB2YXIgY29kZSA9IGNzcy5zb3VyY2U7XG5cbiAgICBpZiAoY3NzLm1hcCkge1xuICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIuY2hyb21lLmNvbS9kZXZ0b29scy9kb2NzL2phdmFzY3JpcHQtZGVidWdnaW5nXG4gICAgICAvLyB0aGlzIG1ha2VzIHNvdXJjZSBtYXBzIGluc2lkZSBzdHlsZSB0YWdzIHdvcmsgcHJvcGVybHkgaW4gQ2hyb21lXG4gICAgICBjb2RlICs9ICdcXG4vKiMgc291cmNlVVJMPScgKyBjc3MubWFwLnNvdXJjZXNbMF0gKyAnICovJzsgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcblxuICAgICAgY29kZSArPSAnXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCwnICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzLm1hcCkpKSkgKyAnICovJztcbiAgICB9XG5cbiAgICBpZiAoIXN0eWxlLmVsZW1lbnQpIHtcbiAgICAgIHN0eWxlLmVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgc3R5bGUuZWxlbWVudC50eXBlID0gJ3RleHQvY3NzJztcbiAgICAgIGlmIChjc3MubWVkaWEpIHN0eWxlLmVsZW1lbnQuc2V0QXR0cmlidXRlKCdtZWRpYScsIGNzcy5tZWRpYSk7XG4gICAgICBIRUFELmFwcGVuZENoaWxkKHN0eWxlLmVsZW1lbnQpO1xuICAgIH1cblxuICAgIGlmICgnc3R5bGVTaGVldCcgaW4gc3R5bGUuZWxlbWVudCkge1xuICAgICAgc3R5bGUuc3R5bGVzLnB1c2goY29kZSk7XG4gICAgICBzdHlsZS5lbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IHN0eWxlLnN0eWxlcy5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBpbmRleCA9IHN0eWxlLmlkcy5zaXplIC0gMTtcbiAgICAgIHZhciB0ZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNvZGUpO1xuICAgICAgdmFyIG5vZGVzID0gc3R5bGUuZWxlbWVudC5jaGlsZE5vZGVzO1xuICAgICAgaWYgKG5vZGVzW2luZGV4XSkgc3R5bGUuZWxlbWVudC5yZW1vdmVDaGlsZChub2Rlc1tpbmRleF0pO1xuICAgICAgaWYgKG5vZGVzLmxlbmd0aCkgc3R5bGUuZWxlbWVudC5pbnNlcnRCZWZvcmUodGV4dE5vZGUsIG5vZGVzW2luZGV4XSk7ZWxzZSBzdHlsZS5lbGVtZW50LmFwcGVuZENoaWxkKHRleHROb2RlKTtcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVJbmplY3Rvcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJyb3dzZXIuanMubWFwXG4iLCJpbXBvcnQgUGFnaW5hdGlvbiBmcm9tICcuL3NyYy9tYWluLnZ1ZSdcblxuY29uc3QgaW5zdGFsbCA9IGZ1bmN0aW9uIChWdWUpIHtcbiAgVnVlLmNvbXBvbmVudChQYWdpbmF0aW9uLm5hbWUsIFBhZ2luYXRpb24pXG59XG5cblBhZ2luYXRpb24uaW5zdGFsbCA9IGluc3RhbGxcblxuZXhwb3J0IGRlZmF1bHQgUGFnaW5hdGlvblxuIiwiXG5leHBvcnQgZGVmYXVsdCB7XG4gIGRhdGE6ICgpID0+ICh7XG4gICAgb2JzZXJ2ZXI6IHZvaWQgMCxcbiAgICBtZWFzdXJlZFdpZHRoOiB2b2lkIDBcbiAgfSksXG4gIGNvbXB1dGVkOiB7XG4gICAgdGFyZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuaG9yaXpvbnRhbCA/ICd3aWR0aCcgOiAnaGVpZ2h0J1xuICAgIH0sXG4gICAgbWVhc3VyZVRhcmdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmhvcml6b250YWwgPyAnb2Zmc2V0V2lkdGgnIDogJ29mZnNldEhlaWdodCdcbiAgICB9LFxuICAgIG1pblNpemUoKSB7XG4gICAgICByZXR1cm4gdGhpcy5taW4gIT09IHZvaWQgMCA/IGAke3RoaXMubWlufXB4YCA6IDBcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBpbml0U3R5bGUoKSB7XG4gICAgICBpZiAodGhpcy5pbm5lckNvbGxhcHNlZCkge1xuICAgICAgICB0aGlzLiRyZWZzLnNsaWRlLnN0eWxlW3RoaXMudGFyZ2V0XSA9IHRoaXMubWluU2l6ZVxuICAgICAgfVxuICAgIH0sXG4gICAgc2V0U3R5bGUocGFzc2l2ZSkge1xuICAgICAgbGV0IHNsaWRlVGFyZ2V0ID0gdGhpcy4kcmVmcy5zbGlkZVxuXG4gICAgICBpZiAocGFzc2l2ZSAmJiAhc2xpZGVUYXJnZXQuc3R5bGVbdGhpcy50YXJnZXRdKSB7IHJldHVybiB9XG4gICAgICBzbGlkZVRhcmdldC5zdHlsZVt0aGlzLnRhcmdldF0gPSBgJHt0aGlzLiRyZWZzLm9ic2VydmVbdGhpcy5tZWFzdXJlVGFyZ2V0XX1weGBcbiAgICAgIGlmICh0aGlzLmlubmVyQ29sbGFwc2VkKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHNsaWRlVGFyZ2V0LnN0eWxlW3RoaXMudGFyZ2V0XSA9IHRoaXMubWluU2l6ZVxuICAgICAgICB9LCAwKVxuICAgICAgfVxuICAgIH0sXG4gICAgY2xlYXJVcHBlclN0eWxlKHVwcGVyKSB7XG4gICAgICBsZXQgdXBwZXJTbGlkZVRhcmdldCA9IHVwcGVyLiRyZWZzLnNsaWRlXG5cbiAgICAgIGlmICh1cHBlclNsaWRlVGFyZ2V0KSB7XG4gICAgICAgIGlmICh1cHBlclNsaWRlVGFyZ2V0LnN0eWxlW3RoaXMudGFyZ2V0XSkge1xuICAgICAgICAgIHVwcGVyU2xpZGVUYXJnZXQuc3R5bGVbdGhpcy50YXJnZXRdID0gbnVsbFxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodXBwZXIuJHBhcmVudCAmJiB1cHBlci4kcGFyZW50LiRyZWZzKSB7XG4gICAgICAgIHRoaXMuY2xlYXJVcHBlclN0eWxlKHVwcGVyLiRwYXJlbnQpXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBtb3VudGVkKCkge1xuICAgIGlmICghdGhpcy4kcmVmcy5zbGlkZSB8fCAhdGhpcy4kcmVmcy5vYnNlcnZlKSB7IHJldHVybiB9XG4gICAgdGhpcy4kd2F0Y2goXG4gICAgICAnaW5uZXJDb2xsYXBzZWQnLFxuICAgICAgKCkgPT4ge1xuICAgICAgICB0aGlzLmNsZWFyVXBwZXJTdHlsZSh0aGlzLiRwYXJlbnQpXG4gICAgICAgIHRoaXMuc2V0U3R5bGUoKVxuICAgICAgfSlcbiAgICB0aGlzLmluaXRTdHlsZSgpXG4gICAgdGhpcy5vYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgIHRoaXMuc2V0U3R5bGUodHJ1ZSlcbiAgICB9KVxuXG4gICAgdGhpcy5vYnNlcnZlci5vYnNlcnZlKHRoaXMuJHJlZnMub2JzZXJ2ZSwge1xuICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgc3VidHJlZTogdHJ1ZSxcbiAgICAgIGNoYXJhY3RlckRhdGE6IHRydWVcbiAgICB9KVxuICB9LFxuICBiZWZvcmVEZXN0cm95KCkge1xuICAgIHRoaXMub2JzZXJ2ZXIgJiYgdGhpcy5vYnNlcnZlci5kaXNjb25uZWN0KClcbiAgfVxufVxuICAiLCJpbXBvcnQgU2xpZGVPYnNlcnZlciBmcm9tICcuLi8uLi8uLi9taXhpbnMvc2xpZGVPYnNlcnZlcidcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnc3dTbGlkZScsXG4gIG1peGluczogW1NsaWRlT2JzZXJ2ZXJdLFxuICBwcm9wczoge1xuICAgIGNvbGxhcHNlZDogQm9vbGVhbixcbiAgICBob3Jpem9udGFsOiBCb29sZWFuLFxuICAgIGZpdDogQm9vbGVhbixcbiAgICBtaW46IE51bWJlciB8IFN0cmluZ1xuICB9LFxuICBkYXRhOiAoKSA9PiAoe1xuICAgIGlubmVyQ29sbGFwc2VkOiB0cnVlXG4gIH0pLFxuICB3YXRjaDoge1xuICAgIGNvbGxhcHNlZDoge1xuICAgICAgaGFuZGxlcigpIHtcbiAgICAgICAgdGhpcy5pbm5lckNvbGxhcHNlZCA9IHRoaXMuY29sbGFwc2VkXG4gICAgICB9LFxuICAgICAgaW1tZWRpYXRlOiB0cnVlXG4gICAgfVxuICB9LFxuICByZW5kZXIoaCkge1xuICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICByZWY6ICdzbGlkZScsXG4gICAgICBzdGF0aWNDbGFzczogJ3N3LXNsaWRlX19jb250YWluZXInLFxuICAgIH0sIFtcbiAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgcmVmOiAnb2JzZXJ2ZScsXG4gICAgICAgIHN0YXRpY0NsYXNzOiBgc3ctc2xpZGVfX2NvbnRlbnRgLFxuICAgICAgICBjbGFzczoge1xuICAgICAgICAgICdtaW4td2lkdGgnOiB0aGlzLmhvcml6b250YWwgJiYgIXRoaXMuZml0LFxuICAgICAgICAgICdmaXQtd2lkdGgnOiB0aGlzLmhvcml6b250YWwgJiYgdGhpcy5maXQsXG4gICAgICAgICAgJ21pbi1oZWlnaHQnOiAhdGhpcy5ob3Jpem9udGFsICYmICF0aGlzLmZpdCxcbiAgICAgICAgICAnZml0LWhlaWdodCc6ICF0aGlzLmhvcml6b250YWwgJiYgdGhpcy5maXRcbiAgICAgICAgfVxuICAgICAgfSwgW3RoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQoKV0pXG4gICAgXSlcbiAgfVxufSIsImltcG9ydCBTbGlkZSBmcm9tICcuL3NyYy9tYWluLmpzJ1xuXG5jb25zdCBpbnN0YWxsID0gZnVuY3Rpb24gKFZ1ZSkge1xuICBWdWUuY29tcG9uZW50KFNsaWRlLm5hbWUsIFNsaWRlKVxufVxuXG5TbGlkZS5pbnN0YWxsID0gaW5zdGFsbFxuXG5leHBvcnQgZGVmYXVsdCBTbGlkZVxuIiwiaW1wb3J0IFNsaWRlIGZyb20gJy4uLy4uL3NsaWRlJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdzd0Jhc2ljSXRlbScsXG4gIGNvbXBvbmVudHM6IHsgU2xpZGUgfSxcbiAgcHJvcHM6IHtcbiAgICBjb250ZW50OiBTdHJpbmcsXG4gICAgc3ViQ29udGVudDogU3RyaW5nLFxuICAgIGljb246IFN0cmluZyxcbiAgICBkaXNhYmxlZDogQm9vbGVhbixcbiAgICBjb2xvcjogU3RyaW5nLFxuICAgIHByaW1hcnk6IEJvb2xlYW4sXG4gICAgbmVnYXRpdmU6IEJvb2xlYW4sXG4gICAgcG9zaXRpdmU6IEJvb2xlYW4sXG4gICAgd2FybmluZzogQm9vbGVhbixcbiAgICBjb2xsYXBzZWQ6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiB0cnVlXG4gICAgfSxcbiAgICBzcGxpdDogQm9vbGVhbixcbiAgICBtaW5pOiBCb29sZWFuLFxuICAgIHRvOiBTdHJpbmcgfCBPYmplY3QsXG4gICAgaW5kZW50TGV2ZWw6IE51bWJlciB8IFN0cmluZyxcbiAgICBjZW50ZXI6IEJvb2xlYW4sXG4gICAgZW5kOiBCb29sZWFuLFxuICAgIG1pbjogTnVtYmVyIHwgU3RyaW5nLFxuICAgIG1hc2s6IE9iamVjdCB8IEJvb2xlYW4sXG4gICAgcmlwcGxlOiBPYmplY3QgfCBCb29sZWFuLFxuICAgIHN1YjogQXJyYXlcbiAgfSxcbiAgZGF0YTogKCkgPT4gKHtcbiAgICBpbm5lckNvbGxhcHNlZDogdHJ1ZSxcbiAgICBtb3VzZW92ZXI6IGZhbHNlXG4gIH0pLFxuICB3YXRjaDoge1xuICAgIGNvbGxhcHNlZDoge1xuICAgICAgaGFuZGxlcigpIHtcbiAgICAgICAgdGhpcy5pbm5lckNvbGxhcHNlZCA9IHRoaXMuY29sbGFwc2VkXG4gICAgICB9LFxuICAgICAgaW1tZWRpYXRlOiB0cnVlXG4gICAgfVxuICB9LFxuICByZW5kZXIoaCkge1xuICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICBzdGF0aWNDbGFzczogJ3N3LWJhc2ljLWl0ZW0nLFxuICAgICAgY2xhc3M6IHtcbiAgICAgICAgc3BsaXQ6IHRoaXMuc3BsaXQgJiYgIXRoaXMuaW5uZXJDb2xsYXBzZWRcbiAgICAgIH0sXG4gICAgICBvbjogdGhpcy5kaXNhYmxlZCA/IHZvaWQgMCA6IHtcbiAgICAgICAgLi4udGhpcy4kbGlzdGVuZXJzXG4gICAgICB9XG4gICAgfSwgW1xuICAgICAgaCgnZGl2Jywge1xuICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWJhc2ljLWl0ZW1fX21haW4nLFxuICAgICAgICBjbGFzczoge1xuICAgICAgICAgICdjb2xvci1wcmltYXJ5JzogIXRoaXMuZGlzYWJsZWQgJiYgdGhpcy5wcmltYXJ5LFxuICAgICAgICAgICdjb2xvci1uZWdhdGl2ZSc6ICF0aGlzLmRpc2FibGVkICYmIHRoaXMubmVnYXRpdmUsXG4gICAgICAgICAgJ2NvbG9yLXBvc2l0aXZlJzogIXRoaXMuZGlzYWJsZWQgJiYgdGhpcy5wb3NpdGl2ZSxcbiAgICAgICAgICAnY29sb3Itd2FybmluZyc6ICF0aGlzLmRpc2FibGVkICYmIHRoaXMud2FybmluZyxcbiAgICAgICAgICBkaXNhYmxlOiB0aGlzLmRpc2FibGVkXG4gICAgICAgIH0sXG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgY29sb3I6ICF0aGlzLmRpc2FibGVkICYmIHRoaXMuY29sb3JcbiAgICAgICAgfVxuICAgICAgfSwgW1xuICAgICAgICBoKCdzdy1pdGVtJywge1xuICAgICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctYmFzaWMtaXRlbV9faW5uZXInLFxuICAgICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICB0bzogdGhpcy50byxcbiAgICAgICAgICAgIGNlbnRlcjogdGhpcy5jZW50ZXIsXG4gICAgICAgICAgICBlbmQ6IHRoaXMuZW5kLFxuICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuZGlzYWJsZWQsXG4gICAgICAgICAgICBtYXNrOiB0aGlzLm1hc2ssXG4gICAgICAgICAgICByaXBwbGU6IHRoaXMucmlwcGxlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjbGFzczoge1xuICAgICAgICAgICAgZXhwYW5kOiAhdGhpcy5pbm5lckNvbGxhcHNlZFxuICAgICAgICAgIH0sXG4gICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICdwYWRkaW5nLWxlZnQnOiBgJHt0aGlzLmluZGVudExldmVsICogMTJ9cHhgLFxuICAgICAgICAgICAgY3Vyc29yOiAhdGhpcy5kaXNhYmxlZCAmJiAodGhpcy50byAhPT0gdm9pZCAwIHx8IHRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQgfHwgdGhpcy5zdWIgIT09IHZvaWQgMCkgPyAncG9pbnRlcicgOiB2b2lkIDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uOiB0aGlzLmRpc2FibGVkID8gdm9pZCAwIDoge1xuICAgICAgICAgICAgLi4udGhpcy4kbGlzdGVuZXJzLFxuICAgICAgICAgICAgY2xpY2s6ICgpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQgfHwgdGhpcy5zdWIgIT09IHZvaWQgMCkgeyB0aGlzLmlubmVyQ29sbGFwc2VkID0gIXRoaXMuaW5uZXJDb2xsYXBzZWQgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1vdXNlb3ZlcjogKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLm1vdXNlb3ZlciA9IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtb3VzZW91dDogKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLm1vdXNlb3ZlciA9IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBzY29wZWRTbG90czoge1xuICAgICAgICAgICAgYmVmb3JlOiB0aGlzLiRzY29wZWRTbG90cy5iZWZvcmUgIT09IHZvaWQgMCA/IHRoaXMuJHNjb3BlZFNsb3RzLmJlZm9yZVxuICAgICAgICAgICAgICA6IHRoaXMuaWNvbiAhPT0gdm9pZCAwID8gKCkgPT4gW2goJ3N3LWljb24nLCB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1iYXNpYy1pdGVtX19pY29uJyxcbiAgICAgICAgICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgICAgICAgbmFtZTogdGhpcy5pY29uXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KV0gOiB2b2lkIDAsXG4gIFxuICAgICAgICAgICAgZGVmYXVsdDogKCkgPT4gW2goJ2RpdicsIHtcbiAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1iYXNpYy1pdGVtX19jb250ZW50IGZsZXggaXRlbXMtY2VudGVyJyxcbiAgICAgICAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAgICAgICAnc3BhY2UtbGVmdCc6IHRoaXMuJHNjb3BlZFNsb3RzLmJlZm9yZSAhPT0gdm9pZCAwIHx8IHRoaXMuaWNvbiAhPT0gdm9pZCAwLFxuICAgICAgICAgICAgICAgICdzcGFjZS1yaWdodCc6ICh0aGlzLiRzY29wZWRTbG90cy5hZnRlciAhPT0gdm9pZCAwIHx8IHRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQgIT09IHZvaWQgMCB8fCB0aGlzLnN1YiAhPT0gdm9pZCAwKSAmJiAodGhpcy4kc2NvcGVkU2xvdHMuY29udGVudCAhPT0gdm9pZCAwIHx8IHRoaXMuY29udGVudCAhPT0gdm9pZCAwIHx8IHRoaXMuc3ViQ29udGVudCAhPT0gdm9pZCAwKVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgICdtaW4taGVpZ2h0JzogdGhpcy5taW5pID8gJzM2cHgnIDogJzQ4cHgnXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIHRoaXMuJHNjb3BlZFNsb3RzLmNvbnRlbnQgIT09IHZvaWQgMCA/IFt0aGlzLiRzY29wZWRTbG90cy5jb250ZW50KCldIDogW1xuICAgICAgICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6ICdkZWZhdWx0LWNvbnRlbnQnXG4gICAgICAgICAgICAgIH0sIFtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQgIT09IHZvaWQgMCA/IGgoJ2RpdicsIHtcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctYmFzaWMtaXRlbV9fbGFiZWwnXG4gICAgICAgICAgICAgICAgfSwgdGhpcy5jb250ZW50KSA6IHZvaWQgMCxcbiAgICAgICAgICAgICAgICB0aGlzLnN1YkNvbnRlbnQgIT09IHZvaWQgMCA/IGgoJ2RpdicsIHtcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctYmFzaWMtaXRlbV9fc3VibGFiZWwnXG4gICAgICAgICAgICAgICAgfSwgdGhpcy5zdWJDb250ZW50KSA6IHZvaWQgMFxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgXVxuICAgICAgICAgICAgKV0sXG4gIFxuICAgICAgICAgICAgYWZ0ZXI6IHRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQgfHwgdGhpcy5zdWIgIT09IHZvaWQgMCA/ICgpID0+IFtoKCdzdy1pY29uJywge1xuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWJhc2ljLWl0ZW1fX2V4cGFuc2lvbiBjb2xvci1ncmV5JyxcbiAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICF0aGlzLmlubmVyQ29sbGFwc2VkID8gJ3JvdGF0ZSgxODBkZWcpJyA6IHZvaWQgMCxcbiAgICAgICAgICAgICAgICBjb2xvcjogdGhpcy5tb3VzZW92ZXIgPyAnY3VycmVudENvbG9yJyA6IHZvaWQgMFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdrZXlib2FyZF9hcnJvd19kb3duJ1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KV0gOiB0aGlzLiRzY29wZWRTbG90cy5hZnRlciAhPT0gdm9pZCAwID8gdGhpcy4kc2NvcGVkU2xvdHMuYWZ0ZXJcbiAgICAgICAgICAgICAgOiB2b2lkIDBcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICBdKSxcbiAgICAgIHRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQgfHwgdGhpcy5zdWIgIT09IHZvaWQgMCA/IGgoU2xpZGUsIHtcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICBjb2xsYXBzZWQ6IHRoaXMuaW5uZXJDb2xsYXBzZWQsXG4gICAgICAgICAgbWluOiB0aGlzLm1pblxuICAgICAgICB9LFxuICAgICAgICBzY29wZWRTbG90czoge1xuICAgICAgICAgIGRlZmF1bHQ6ICgpID0+IHtcbiAgICAgICAgICAgIGxldCBzdWIgPSB0aGlzLnN1YiAhPT0gdm9pZCAwID8gdGhpcy5zdWIubWFwKHByb3BzID0+IHtcbiAgICAgICAgICAgICAgbGV0IHBvc2l0aW9uID0gISFwcm9wcy5jZW50ZXIgfHwgISFwcm9wcy5lbmQgfHwgZmFsc2VcblxuICAgICAgICAgICAgICByZXR1cm4gaCgnc3ctYmFzaWMtaXRlbScsIHtcbiAgICAgICAgICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgICAgICAgY29udGVudDogcHJvcHMuY29udGVudCxcbiAgICAgICAgICAgICAgICAgIHN1YkNvbnRlbnQ6IHByb3BzLnN1YkNvbnRlbnQsXG4gICAgICAgICAgICAgICAgICBpY29uOiBwcm9wcy5pY29uLFxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHByb3BzLmRpc2FibGVkLFxuICAgICAgICAgICAgICAgICAgY29sbGFwc2VkOiBwcm9wcy5jb2xsYXBzZWQsXG4gICAgICAgICAgICAgICAgICB0bzogcHJvcHMudG8sXG4gICAgICAgICAgICAgICAgICBzdWI6IHByb3BzLnN1YixcbiAgICAgICAgICAgICAgICAgIGNvbG9yOiBwcm9wcy5jb2xvcixcbiAgICAgICAgICAgICAgICAgIHByaW1hcnk6IHByb3BzLnByaW1hcnksXG4gICAgICAgICAgICAgICAgICBuZWdhdGl2ZTogcHJvcHMubmVnYXRpdmUsXG4gICAgICAgICAgICAgICAgICBwb3NpdGl2ZTogcHJvcHMucG9zaXRpdmUsXG4gICAgICAgICAgICAgICAgICB3YXJuaW5nOiBwcm9wcy53YXJuaW5nLFxuICAgICAgICAgICAgICAgICAgY2VudGVyOiBwb3NpdGlvbiA/IHByb3BzLmNlbnRlciA6IHRoaXMuY2VudGVyLFxuICAgICAgICAgICAgICAgICAgZW5kOiBwb3NpdGlvbiA/IHByb3BzLmVuZCA6IHRoaXMuZW5kLFxuICAgICAgICAgICAgICAgICAgc3BsaXQ6IHByb3BzLnNwbGl0IHx8IHRoaXMuc3BsaXQsXG4gICAgICAgICAgICAgICAgICBtaW5pOiBwcm9wcy5taW5pIHx8IHRoaXMubWluaSxcbiAgICAgICAgICAgICAgICAgIGluZGVudExldmVsOiBwcm9wcy5pbmRlbnRMZXZlbCB8fCB0aGlzLmluZGVudExldmVsLFxuICAgICAgICAgICAgICAgICAgbWluOiBwcm9wcy5taW4gfHwgdGhpcy5taW4sXG4gICAgICAgICAgICAgICAgICBtYXNrOiBwcm9wcy5tYXNrIHx8IHRoaXMubWFzayxcbiAgICAgICAgICAgICAgICAgIHJpcHBsZTogcHJvcHMucmlwcGxlIHx8IHRoaXMucmlwcGxlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSkgOiBbXVxuXG4gICAgICAgICAgICBzdWIudW5zaGlmdCh0aGlzLiRzY29wZWRTbG90cy5kZWZhdWx0ID8gdGhpcy4kc2NvcGVkU2xvdHMuZGVmYXVsdCgpIDogdm9pZCAwKVxuICAgICAgICAgICAgcmV0dXJuIHN1YlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSkgOiB2b2lkIDBcbiAgICBdKVxuICB9XG59XG4gICIsImltcG9ydCBCYXNpY0l0ZW0gZnJvbSAnLi9zcmMvbWFpbi5qcydcblxuY29uc3QgaW5zdGFsbCA9IGZ1bmN0aW9uIChWdWUpIHtcbiAgVnVlLmNvbXBvbmVudChCYXNpY0l0ZW0ubmFtZSwgQmFzaWNJdGVtKVxufVxuXG5CYXNpY0l0ZW0uaW5zdGFsbCA9IGluc3RhbGxcblxuZXhwb3J0IGRlZmF1bHQgQmFzaWNJdGVtXG4iLCJleHBvcnQgZnVuY3Rpb24gaGFzT3duKG9iaiwga2V5KSB7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KTtcbn07XG5leHBvcnQgZnVuY3Rpb24gaXNWTm9kZShub2RlKSB7XG4gIHJldHVybiBub2RlICE9PSBudWxsICYmIHR5cGVvZiBub2RlID09PSAnb2JqZWN0JyAmJiBoYXNPd24obm9kZSwgJ2NvbXBvbmVudE9wdGlvbnMnKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRGaXJzdENvbXBvbmVudENoaWxkKGNoaWxkcmVuKSB7XG4gIHJldHVybiBjaGlsZHJlbiAmJiBjaGlsZHJlbi5maWx0ZXIoYyA9PiBjICYmIGMudGFnKVswXTtcbn07IiwiLy8gPHRlbXBsYXRlPlxuLy8gICA8ZGl2PlxuLy8gICAgIDxidXR0b24gQGNsaWNrPVwiaGFuZGxlQnRuXCI+Y2xpY2s8L2J1dHRvbj5cbi8vICAgICA8dHJhbnNpdGlvbiBuYW1lPSdzdy1ub3RpZmljYXRpb24tZmFkZSc+XG4vLyAgICAgICA8ZGl2IHYtaWY9XCJzaG93XCIgY2xhc3M9XCJzdy1ub3RpZmljYXRpb25cIj5cbi8vICAgICAgICAgPGgyIGNsYXNzPVwidGl0bGVcIj5cbi8vICAgICAgICAgICDmj5DnpLoxMTExXG4vLyAgICAgICAgIDwvaDI+XG4vLyAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250ZW50XCI+XG4vLyAgICAgICAgICAg6L+Z5piv5LiA5p2h5raI5oGvXG4vLyAgICAgICAgIDwvZGl2PlxuLy8gICAgICAgICA8ZGl2IGNsYXNzPVwiY2xvc2VcIiBAY2xpY2s9XCJoYW5kbGVCdG5cIj5cbi8vICAgICAgICAgICA8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+Y2xvc2U8L2k+XG4vLyAgICAgICAgIDwvZGl2PlxuLy8gICAgICAgPC9kaXY+XG4vLyAgICAgPC90cmFuc2l0aW9uPlxuLy8gICA8L2Rpdj5cbi8vIDwvdGVtcGxhdGU+XG5pbXBvcnQgVm5vZGUsIHsgaXNWTm9kZSB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL3Zkb20nXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdzd05vdGlmaWNhdGlvbicsXG4gIGRhdGEgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzaG93OiBmYWxzZSxcbiAgICAgIHZlcnRpY2FsT2Zmc2V0OiAwLFxuICAgICAgb25DbG9zZTogbnVsbCxcbiAgICAgIHBvc2l0aW9uOiAndG9wLXJpZ2h0JyxcbiAgICAgIHRpdGxlOiAnJyxcbiAgICAgIGNvbnRlbnQ6ICcnLFxuICAgICAgc2xvdDogbnVsbCxcbiAgICAgIGJhY2tncm91bmQ6ICcjZmZmJyxcbiAgICAgIGNsb3NlQ29sb3I6ICcjOTA5Mzk5J1xuICAgIH1cbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGhhbmRsZUJ0bigpIHtcbiAgICAgIHRoaXMuc2hvdyA9IGZhbHNlXG4gICAgICBpZiAodHlwZW9mIHRoaXMub25DbG9zZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLm9uQ2xvc2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGNvbXB1dGVkOiB7XG4gICAgdmVydGljYWxQcm9wZXJ0eSgpIHtcbiAgICAgIHJldHVybiAvXnRvcC0vLnRlc3QodGhpcy5wb3NpdGlvbikgPyAndG9wJyA6ICdib3R0b20nO1xuICAgIH0sXG5cbiAgICBwb3NpdGlvblN0eWxlKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgW3RoaXMudmVydGljYWxQcm9wZXJ0eV06IGAkeyB0aGlzLnZlcnRpY2FsT2Zmc2V0IH1weGAsXG4gICAgICB9O1xuICAgIH0sXG4gICAgZ2V0Vm5vZGUoKSB7XG4gICAgICBpZiAoaXNWTm9kZSh0aGlzLnNsb3QpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNsb3RcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1BsZWFzZSBjaGVjayB5b3VyIFZub2RlIHdyaXRpbmcnKVxuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gIH0sXG4gIHJlbmRlcihoKSB7XG4gICByZXR1cm4gaCgndHJhbnNpdGlvbicse1xuICAgICAgYXR0cnM6IHtcbiAgICAgICAgbmFtZTogJ3N3LW5vdGlmaWNhdGlvbi1mYWRlJ1xuICAgICAgfVxuICAgIH0sIFt0aGlzLnNob3cgPyBoKCdkaXYnLCB7XG4gICAgICAgICAgICBjbGFzczogJ3N3LW5vdGlmaWNhdGlvbicsXG4gICAgICAgICAgICBzdHlsZTogT2JqZWN0LmFzc2lnbih0aGlzLnBvc2l0aW9uU3R5bGUsIHsgYmFja2dyb3VuZDogdGhpcy5iYWNrZ3JvdW5kIH0pXG4gICAgICAgICAgfSwgW1xuICAgICAgICAgICAgdGhpcy5nZXRWbm9kZSA/ICcnIDogaCgnaDInLCB7XG4gICAgICAgICAgICAgIGNsYXNzOiAndGl0bGUnXG4gICAgICAgICAgICB9LCB0aGlzLnRpdGxlKSxcbiAgICAgICAgICAgIHRoaXMuZ2V0Vm5vZGUgPyB0aGlzLmdldFZub2RlIDogaCgnZGl2Jywge1xuICAgICAgICAgICAgICBjbGFzczogJ2NvbnRlbnQnXG4gICAgICAgICAgICB9LHRoaXMuY29udGVudCksXG4gICAgICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgICAgIGNsYXNzOiAnY2xvc2UnLFxuICAgICAgICAgICAgICBzdHlsZTogeyBjb2xvcjogdGhpcy5jbG9zZUNvbG9yIH0sXG4gICAgICAgICAgICB9LCBbaCgnZGl2Jywge1xuICAgICAgICAgICAgICAgICAgY2xhc3M6ICdtYXRlcmlhbC1pY29ucycsXG4gICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICBjbGljazogKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUJ0bigpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCAnY2xvc2UnKV0pXG4gICAgICAgICAgXSlcbiAgICBcbiAgICAgICAgOiB2b2lkIDBdIClcbiAgfVxufVxuXG4iLCJpbXBvcnQgVnVlIGZyb20gJ3Z1ZSc7XG5pbXBvcnQgTm90aWZpY2F0aW9uIGZyb20gJy4vbWFpbi5qcyc7XG5cbmNvbnN0IE5vdGlmaWNhdGlvbkNvbnN0cnVjdG9yID0gVnVlLmV4dGVuZChOb3RpZmljYXRpb24pXG5cbmxldCBpbnN0YW5jZTtcbmxldCBpbnN0YW5jZXMgPSBbXVxubGV0IHNlZWQgPSAxXG5jb25zdCBOb3RpZmljYXRpb25GdW4gPSBmdW5jdGlvbihvcHRpb25zKXtcbiAgaWYgKFZ1ZS5wcm90b3R5cGUuJGlzU2VydmVyKSByZXR1cm47XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBjb25zdCB1c2VyT25DbG9zZSA9IG9wdGlvbnMub25DbG9zZTtcbiAgY29uc3QgaWQgPSAnbm90aWZpY2F0aW9uXycgKyBzZWVkKys7XG4gIGNvbnN0IHBvc2l0aW9uID0gb3B0aW9ucy5wb3NpdGlvbiB8fCAndG9wLXJpZ2h0JztcbiAgb3B0aW9ucy5vbkNsb3NlID0gZnVuY3Rpb24oKSB7XG4gICAgTm90aWZpY2F0aW9uLmNsb3NlKGlkLCB1c2VyT25DbG9zZSlcbiAgfVxuICBpbnN0YW5jZSA9IG5ldyBOb3RpZmljYXRpb25Db25zdHJ1Y3Rvcih7XG4gICAgZGF0YTogb3B0aW9uc1xuICB9KVxuICBpbnN0YW5jZS5pZCA9IGlkXG4gIGluc3RhbmNlLiRtb3VudCgpO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGluc3RhbmNlLiRlbCk7XG4gIGluc3RhbmNlLnNob3cgPSB0cnVlXG4gIGxldCB2ZXJ0aWNhbE9mZnNldCA9IDBcbiAgaW5zdGFuY2VzLmZpbHRlcihpdGVtID0+IGl0ZW0ucG9zaXRpb24gPT09IHBvc2l0aW9uKS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgIHZlcnRpY2FsT2Zmc2V0ICs9IGVsZW1lbnQuJGVsLm9mZnNldEhlaWdodCArIDE2XG4gIH0pO1xuICB2ZXJ0aWNhbE9mZnNldCArPSAxNlxuICBpbnN0YW5jZS52ZXJ0aWNhbE9mZnNldCA9IHZlcnRpY2FsT2Zmc2V0XG4gIGluc3RhbmNlcy5wdXNoKGluc3RhbmNlKVxuICBjb25zb2xlLmxvZygpXG4gIHJldHVybiBpbnN0YW5jZTtcbn0gXG5Ob3RpZmljYXRpb24uY2xvc2UgPSBmdW5jdGlvbihpZCwgdXNlck9uQ2xvc2UpIHtcbiAgbGV0IGluZGV4ID0gLTFcbiAgY29uc3QgbGVuID0gaW5zdGFuY2VzLmxlbmd0aFxuICBjb25zdCBpbnN0YW5jZSA9IGluc3RhbmNlcy5maWx0ZXIoKGluc3RhbmNlLCBpKSA9PiB7XG4gICAgaWYgKGluc3RhbmNlLmlkID09PSBpZCkge1xuICAgICAgaW5kZXggPSBpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfSlbMF1cbiAgaWYgKCFpbnN0YW5jZSkgcmV0dXJuXG5cbiAgaWYgKHR5cGVvZiB1c2VyT25DbG9zZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHVzZXJPbkNsb3NlKGluc3RhbmNlKTtcbiAgfVxuICBpbnN0YW5jZXMuc3BsaWNlKGluZGV4LCAxKVxuXG4gIGlmIChsZW4gPD0gMSkgcmV0dXJuXG5cbiAgY29uc3QgcG9zaXRpb24gPSBpbnN0YW5jZS5wb3NpdGlvbjtcbiAgY29uc3QgcmVtb3ZlZEhlaWdodCA9IGluc3RhbmNlLiRlbC5vZmZzZXRIZWlnaHRcbiAgZm9yIChsZXQgaSA9IGluZGV4OyBpIDwgbGVuIC0gMTsgaSsrKXtcbiAgICBpZiAoaW5zdGFuY2VzW2ldLnBvc2l0aW9uID09PSBwb3NpdGlvbikge1xuICAgICAgaW5zdGFuY2VzW2ldLiRlbC5zdHlsZVtpbnN0YW5jZS52ZXJ0aWNhbFByb3BlcnR5XSA9IHBhcnNlSW50KGluc3RhbmNlc1tpXS4kZWwuc3R5bGVbaW5zdGFuY2UudmVydGljYWxQcm9wZXJ0eV0sIDEwKSAtIHJlbW92ZWRIZWlnaHQgLSAxNiArICdweCdcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTm90aWZpY2F0aW9uRnVuIiwiaW1wb3J0IFNsaWRlIGZyb20gJy4uLy4uL3NsaWRlJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdzd0xheW91dCcsXG4gIGNvbXBvbmVudHM6IHsgU2xpZGUgfSxcbiAgcHJvcHM6IHtcbiAgICBjb2xsYXBzZVRvcDogQm9vbGVhbixcbiAgICBjb2xsYXBzZUxlZnQ6IEJvb2xlYW4sXG4gICAgY29sbGFwc2VSaWdodDogQm9vbGVhbixcbiAgICBjb2xsYXBzZUJvdHRvbTogQm9vbGVhbixcbiAgICBmaXRUb3A6IEJvb2xlYW4sXG4gICAgZml0TGVmdDogQm9vbGVhbixcbiAgICBmaXRSaWdodDogQm9vbGVhbixcbiAgICBmaXRCb3R0b206IEJvb2xlYW4sXG4gICAgdG9wTWluOiBOdW1iZXIgfCBTdHJpbmcsXG4gICAgbGVmdE1pbjogTnVtYmVyIHwgU3RyaW5nLFxuICAgIHJpZ2h0TWluOiBOdW1iZXIgfCBTdHJpbmcsXG4gICAgYm90dG9tTWluOiBOdW1iZXIgfCBTdHJpbmdcbiAgfSxcbiAgZGF0YTogKCkgPT4gKHt9KSxcbiAgY29tcHV0ZWQ6IHtcbiAgICB2ZXJ0aWNhbFN0cmV0Y2goKSB7XG4gICAgICByZXR1cm4gdGhpcy4kc2NvcGVkU2xvdHMudG9wICE9PSB2b2lkIDAgfHwgdGhpcy4kc2NvcGVkU2xvdHMuYm90dG9tICE9PSB2b2lkIDBcbiAgICB9XG4gIH0sXG4gIHJlbmRlcihoKSB7XG4gICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiAnc3ctbGF5b3V0IGZsZXggbm8td3JhcCcsXG4gICAgICBzdHlsZToge1xuICAgICAgICAnZmxleC1kaXJlY3Rpb24nOiB0aGlzLnZlcnRpY2FsU3RyZXRjaCAmJiAnY29sdW1uJ1xuICAgICAgfVxuICAgIH0sIFtcbiAgICAgIHRoaXMuJHNjb3BlZFNsb3RzLnRvcCAhPT0gdm9pZCAwID8gaChTbGlkZSwge1xuICAgICAgICBwcm9wczoge1xuICAgICAgICAgIGNvbGxhcHNlZDogdGhpcy5jb2xsYXBzZVRvcCxcbiAgICAgICAgICBmaXQ6IHRoaXMuZml0VG9wLFxuICAgICAgICAgIG1pbjogdGhpcy50b3BNaW5cbiAgICAgICAgfSxcbiAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1sYXlvdXRfX2Fyb3VuZCcsXG4gICAgICAgIHNjb3BlZFNsb3RzOiB7XG4gICAgICAgICAgZGVmYXVsdDogdGhpcy4kc2NvcGVkU2xvdHMudG9wXG4gICAgICAgIH1cbiAgICAgIH0pIDogdm9pZCAwLFxuXG4gICAgICAhdGhpcy52ZXJ0aWNhbFN0cmV0Y2ggJiYgdGhpcy4kc2NvcGVkU2xvdHMubGVmdCAhPT0gdm9pZCAwID8gaChTbGlkZSwge1xuICAgICAgICBwcm9wczoge1xuICAgICAgICAgIGNvbGxhcHNlZDogdGhpcy5jb2xsYXBzZUxlZnQsXG4gICAgICAgICAgaG9yaXpvbnRhbDogdHJ1ZSxcbiAgICAgICAgICBmaXQ6IHRoaXMuZml0TGVmdCxcbiAgICAgICAgICBtaW46IHRoaXMubGVmdE1pblxuICAgICAgICB9LFxuICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWxheW91dF9fYXJvdW5kJyxcbiAgICAgICAgc2NvcGVkU2xvdHM6IHtcbiAgICAgICAgICBkZWZhdWx0OiB0aGlzLiRzY29wZWRTbG90cy5sZWZ0XG4gICAgICAgIH1cbiAgICAgIH0pIDogdm9pZCAwLFxuXG4gICAgICBoKCdkaXYnLCB7XG4gICAgICAgIHJlZjogJ2xheW91dE1haW4nLFxuICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWxheW91dF9fbWFpbicsXG4gICAgICB9LCBbW3RoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQgIT09IHZvaWQgMFxuICAgICAgICA/IHRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQoKSA6IHZvaWQgMF1dKSxcblxuICAgICAgIXRoaXMudmVydGljYWxTdHJldGNoICYmIHRoaXMuJHNjb3BlZFNsb3RzLnJpZ2h0ICE9PSB2b2lkIDAgPyBoKFNsaWRlLCB7XG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgY29sbGFwc2VkOiB0aGlzLmNvbGxhcHNlUmlnaHQsXG4gICAgICAgICAgaG9yaXpvbnRhbDogdHJ1ZSxcbiAgICAgICAgICBmaXQ6IHRoaXMuZml0UmlnaHQsXG4gICAgICAgICAgbWluOiB0aGlzLnJpZ2h0TWluXG4gICAgICAgIH0sXG4gICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctbGF5b3V0X19hcm91bmQnLFxuICAgICAgICBzY29wZWRTbG90czoge1xuICAgICAgICAgIGRlZmF1bHQ6IHRoaXMuJHNjb3BlZFNsb3RzLnJpZ2h0XG4gICAgICAgIH1cbiAgICAgIH0pIDogdm9pZCAwLFxuXG4gICAgICB0aGlzLiRzY29wZWRTbG90cy5ib3R0b20gIT09IHZvaWQgMCA/IGgoU2xpZGUsIHtcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICBjb2xsYXBzZWQ6IHRoaXMuY29sbGFwc2VCb3R0b20sXG4gICAgICAgICAgZml0OiB0aGlzLmZpdEJvdHRvbSxcbiAgICAgICAgICBtaW46IHRoaXMuYm90dG9tTWluXG4gICAgICAgIH0sXG4gICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctbGF5b3V0X19hcm91bmQnLFxuICAgICAgICBzY29wZWRTbG90czoge1xuICAgICAgICAgIGRlZmF1bHQ6IHRoaXMuJHNjb3BlZFNsb3RzLmJvdHRvbVxuICAgICAgICB9XG4gICAgICB9KSA6IHZvaWQgMFxuICAgIF0pXG4gIH1cbn0iLCJpbXBvcnQgTGF5b3V0IGZyb20gJy4vc3JjL21haW4uanMnXG5cbmNvbnN0IGluc3RhbGwgPSBmdW5jdGlvbiAoVnVlKSB7XG4gIFZ1ZS5jb21wb25lbnQoTGF5b3V0Lm5hbWUsIExheW91dClcbn1cblxuTGF5b3V0Lmluc3RhbGwgPSBpbnN0YWxsXG5cbmV4cG9ydCBkZWZhdWx0IExheW91dFxuIiwiY29uc3Qgc2hvd01hc2sgPSBjdHggPT4ge1xuICBpZiAoIWN0eC5kaXNhYmxlZCAmJiAhY3R4LnN0YXkpIHtcbiAgICBjdHgubm9kZS5jbGFzc0xpc3QucmVtb3ZlKCdpbnZpc2libGUnKVxuICB9XG59XG5jb25zdCBoaWRlTWFzayA9IGN0eCA9PiB7XG4gIGlmICghY3R4LmRpc2FibGVkICYmICFjdHguc3RheSkge1xuICAgIGN0eC5ub2RlLmNsYXNzTGlzdC5hZGQoJ2ludmlzaWJsZScpXG4gIH1cbn1cbmNvbnN0IGRpc2FibGVNYXNrID0gY3R4ID0+IHtcbiAgaWYgKGN0eC5kaXNhYmxlZCAmJiAhY3R4LnN0YXkpIHtcbiAgICBjdHgubm9kZS5jbGFzc0xpc3QuYWRkKCdpbnZpc2libGUnKVxuICB9XG59XG5jb25zdCBzdGF5TWFzayA9IGN0eCA9PiB7XG4gIGlmIChjdHguc3RheSkge1xuICAgIGN0eC5ub2RlLmNsYXNzTGlzdC5yZW1vdmUoJ2ludmlzaWJsZScpXG4gIH0gZWxzZSB7XG4gICAgY3R4Lm5vZGUuY2xhc3NMaXN0LmFkZCgnaW52aXNpYmxlJylcbiAgfVxufVxuY29uc3QgY29sb3JNYXNrID0gY3R4ID0+IHtcbiAgY3R4Lm5vZGUuc3R5bGUuY29sb3IgPSBjdHguY29sb3Jcbn1cbmNvbnN0IGdldERpc2FibGVkID0gdmFsdWUgPT4gdmFsdWUgIT09IHZvaWQgMCAmJiAodmFsdWUuZGlzYWJsZWQgPT09IHRydWUgfHwgZmFsc2UpXG5jb25zdCBnZXRTdGF5ID0gdmFsdWUgPT4gdmFsdWUgIT09IHZvaWQgMCAmJiAodmFsdWUuc3RheSA9PT0gdHJ1ZSB8fCBmYWxzZSlcbmNvbnN0IGdldENvbG9yID0gdmFsdWUgPT4gdmFsdWUgIT09IHZvaWQgMCAmJiB2YWx1ZS5jb2xvciB8fCB2b2lkIDBcbmNvbnN0IGluaXRNYXNrID0gKGVsLCBiaW5kaW5nKSA9PiB7XG4gIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICBjb25zdCBjdHggPSB7XG4gICAgbm9kZTogbm9kZSxcbiAgICBkaXNhYmxlZDogZ2V0RGlzYWJsZWQoYmluZGluZy52YWx1ZSksXG4gICAgc3RheTogZ2V0U3RheShiaW5kaW5nLnZhbHVlKSxcbiAgICBjb2xvcjogZ2V0Q29sb3IoYmluZGluZy52YWx1ZSksXG4gICAgc2hvd01hc2s6ICgpID0+IHtcbiAgICAgIHNob3dNYXNrKGN0eClcbiAgICB9LFxuICAgIGhpZGVNYXNrOiAoKSA9PiB7XG4gICAgICBoaWRlTWFzayhjdHgpXG4gICAgfVxuICB9XG5cbiAgY3R4Lm5vZGUuY2xhc3NMaXN0LmFkZCgnc3ctbWFzaycpXG4gIGRpc2FibGVNYXNrKGN0eClcbiAgc3RheU1hc2soY3R4KVxuICBjb2xvck1hc2soY3R4KVxuICBoaWRlTWFzayhjdHgpXG4gIGVsLm1hc2tDdHggPSBjdHhcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnbWFzaycsXG4gIGJpbmQoZWwsIGJpbmRpbmcpIHtcbiAgICBpbml0TWFzayhlbCwgYmluZGluZylcbiAgICBlbC5hcHBlbmRDaGlsZChlbC5tYXNrQ3R4Lm5vZGUpXG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgZWwubWFza0N0eC5zaG93TWFzaywgZmFsc2UpXG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCBlbC5tYXNrQ3R4LmhpZGVNYXNrLCBmYWxzZSlcbiAgfSxcbiAgdXBkYXRlKGVsLCBiaW5kaW5nKSB7XG4gICAgZWwubWFza0N0eC5kaXNhYmxlZCA9IGdldERpc2FibGVkKGJpbmRpbmcudmFsdWUpXG4gICAgaWYgKGdldERpc2FibGVkKGJpbmRpbmcub2xkVmFsdWUpICE9PSBlbC5tYXNrQ3R4LmRpc2FibGVkKSB7XG4gICAgICBkaXNhYmxlTWFzayhlbC5tYXNrQ3R4KVxuICAgIH1cblxuICAgIGVsLm1hc2tDdHguc3RheSA9IGdldFN0YXkoYmluZGluZy52YWx1ZSlcbiAgICBpZiAoZ2V0U3RheShiaW5kaW5nLm9sZFZhbHVlKSAhPT0gZWwubWFza0N0eC5zdGF5KSB7XG4gICAgICBzdGF5TWFzayhlbC5tYXNrQ3R4KVxuICAgIH1cblxuICAgIGVsLm1hc2tDdHguY29sb3IgPSBnZXRDb2xvcihiaW5kaW5nLnZhbHVlKVxuICAgIGlmIChnZXRDb2xvcihiaW5kaW5nLm9sZFZhbHVlKSAhPT0gZWwubWFza0N0eC5jb2xvcikge1xuICAgICAgY29sb3JNYXNrKGVsLm1hc2tDdHgpXG4gICAgfVxuICB9LFxuICB1bmJpbmQoZWwpIHtcbiAgICBpZiAoZWwubWFza0N0eCkge1xuICAgICAgZWwubWFza0N0eC5ub2RlLnJlbW92ZSgpXG4gICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBlbC5tYXNrQ3R4LnNob3dNYXNrLCBmYWxzZSlcbiAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgZWwubWFza0N0eC5oaWRlTWFzaywgZmFsc2UpXG4gICAgICBkZWxldGUgZWwubWFza0N0eFxuICAgIH1cbiAgfVxufSIsImltcG9ydCBNYXNrIGZyb20gJy4vc3JjL21haW4uanMnXG5cbmNvbnN0IGluc3RhbGwgPSBmdW5jdGlvbiAoVnVlKSB7XG4gIFZ1ZS5kaXJlY3RpdmUoTWFzay5uYW1lLCBNYXNrKVxufVxuXG5NYXNrLmluc3RhbGwgPSBpbnN0YWxsXG5cbmV4cG9ydCBkZWZhdWx0IE1hc2siLCJleHBvcnQgZnVuY3Rpb24gcG9zaXRpb24oZSkge1xuICBpZiAoZS50b3VjaGVzICYmIGUudG91Y2hlc1swXSkge1xuICAgIGUgPSBlLnRvdWNoZXNbMF1cbiAgfSBlbHNlIGlmIChlLmNoYW5nZWRUb3VjaGVzICYmIGUuY2hhbmdlZFRvdWNoZXNbMF0pIHtcbiAgICBlID0gZS5jaGFuZ2VkVG91Y2hlc1swXVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB0b3A6IGUuY2xpZW50WSxcbiAgICBsZWZ0OiBlLmNsaWVudFhcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RXZlbnRQYXRoKGUpIHtcbiAgaWYgKGUucGF0aCkge1xuICAgIHJldHVybiBlLnBhdGhcbiAgfVxuICBpZiAoZS5jb21wb3NlZFBhdGgpIHtcbiAgICByZXR1cm4gZS5jb21wb3NlZFBhdGgoKVxuICB9XG5cbiAgY29uc3QgcGF0aCA9IFtdXG4gIGxldCBlbCA9IGUudGFyZ2V0XG5cbiAgd2hpbGUgKGVsKSB7XG4gICAgcGF0aC5wdXNoKGVsKVxuXG4gICAgaWYgKGVsLnRhZ05hbWUgPT09ICdIVE1MJykge1xuICAgICAgcGF0aC5wdXNoKGRvY3VtZW50KVxuICAgICAgcGF0aC5wdXNoKHdpbmRvdylcbiAgICAgIHJldHVybiBwYXRoXG4gICAgfVxuXG4gICAgZWwgPSBlbC5wYXJlbnRFbGVtZW50XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0b3AoZSkge1xuICBlLnN0b3BQcm9wYWdhdGlvbigpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcmV2ZW50KGUpIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdG9wQW5kUHJldmVudChlKSB7XG4gIGUucHJldmVudERlZmF1bHQoKVxuICBlLnN0b3BQcm9wYWdhdGlvbigpXG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgcG9zaXRpb24sXG4gIGdldEV2ZW50UGF0aCxcbiAgc3RvcCxcbiAgcHJldmVudCxcbiAgc3RvcEFuZFByZXZlbnRcbn0iLCJpbXBvcnQgeyBjc3MgfSBmcm9tICcuLi8uLi8uLi91dGlscy9kb20uanMnXG5pbXBvcnQgeyBwb3NpdGlvbiB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2V2ZW50LmpzJ1xuXG5mdW5jdGlvbiBzaG93UmlwcGxlKGV2dCwgZWwsIGN0eCwgZm9yY2VDZW50ZXIpIHtcbiAgaWYgKGN0eC5tb2RpZmllcnMuc3RvcCA9PT0gdHJ1ZSkge1xuICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKVxuICB9XG5cbiAgbGV0IHsgY2VudGVyLCBjb2xvciB9ID0gY3R4Lm1vZGlmaWVyc1xuXG4gIGNlbnRlciA9IGNlbnRlciA9PT0gdHJ1ZSB8fCBmb3JjZUNlbnRlciA9PT0gdHJ1ZVxuXG4gIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgY29uc3QgaW5uZXJOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gIGNvbnN0IHBvcyA9IHBvc2l0aW9uKGV2dClcbiAgY29uc3QgeyBsZWZ0LCB0b3AsIHdpZHRoLCBoZWlnaHQgfSA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gIGNvbnN0IGRpYW1ldGVyID0gTWF0aC5zcXJ0KHdpZHRoICogd2lkdGggKyBoZWlnaHQgKiBoZWlnaHQpXG4gIGNvbnN0IHJhZGl1cyA9IGRpYW1ldGVyIC8gMlxuICBjb25zdCBjZW50ZXJYID0gYCR7KHdpZHRoIC0gZGlhbWV0ZXIpIC8gMn1weGBcbiAgY29uc3QgeCA9IGNlbnRlciA/IGNlbnRlclggOiBgJHtwb3MubGVmdCAtIGxlZnQgLSByYWRpdXN9cHhgXG4gIGNvbnN0IGNlbnRlclkgPSBgJHsoaGVpZ2h0IC0gZGlhbWV0ZXIpIC8gMn1weGBcbiAgY29uc3QgeSA9IGNlbnRlciA/IGNlbnRlclkgOiBgJHtwb3MudG9wIC0gdG9wIC0gcmFkaXVzfXB4YFxuICBsZXQgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBpbm5lck5vZGUuY2xhc3NMaXN0LmFkZCgnc3ctcmlwcGxlX19pbm5lci0tZW50ZXInKVxuICAgIGlubmVyTm9kZS5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlM2QoJHtjZW50ZXJYfSwgJHtjZW50ZXJZfSwgMCkgc2NhbGUzZCgxLCAxLCAxKWBcbiAgICBpbm5lck5vZGUuc3R5bGUub3BhY2l0eSA9IDAuMlxuXG4gICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlubmVyTm9kZS5jbGFzc0xpc3QucmVtb3ZlKCdzdy1yaXBwbGVfX2lubmVyLS1lbnRlcicpXG4gICAgICBpbm5lck5vZGUuY2xhc3NMaXN0LmFkZCgnc3ctcmlwcGxlX19pbm5lci0tbGVhdmUnKVxuICAgICAgaW5uZXJOb2RlLnN0eWxlLm9wYWNpdHkgPSAwXG5cbiAgICAgIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIG5vZGUgJiYgbm9kZS5yZW1vdmUoKVxuICAgICAgICBjdHguYWJvcnQgPSB2b2lkIDBcbiAgICAgIH0sIDI3NSlcbiAgICB9LCAyNTApXG4gIH0sIDUwKVxuXG4gIGlubmVyTm9kZS5jbGFzc05hbWUgPSAnc3ctcmlwcGxlX19pbm5lcidcbiAgY3NzKGlubmVyTm9kZSwge1xuICAgIGhlaWdodDogYCR7ZGlhbWV0ZXJ9cHhgLFxuICAgIHdpZHRoOiBgJHtkaWFtZXRlcn1weGAsXG4gICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlM2QoJHt4fSwgJHt5fSwgMCkgc2NhbGUzZCgwLjIsIDAuMiwgMSlgLFxuICAgIG9wYWNpdHk6IDBcbiAgfSlcbiAgaWYgKGNvbG9yKSB7IGNzcyhub2RlLCB7IGNvbG9yOiBjb2xvciB9KSB9XG4gIG5vZGUuY2xhc3NOYW1lID0gYHN3LXJpcHBsZWBcbiAgbm9kZS5hcHBlbmRDaGlsZChpbm5lck5vZGUpXG4gIGVsLmFwcGVuZENoaWxkKG5vZGUpXG5cbiAgY3R4LmFib3J0ID0gKCkgPT4ge1xuICAgIG5vZGUgJiYgbm9kZS5yZW1vdmUoKVxuICAgIGNsZWFyVGltZW91dCh0aW1lcilcbiAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGVDdHgoY3R4LCB7IHZhbHVlLCBtb2RpZmllcnMsIGFyZyB9KSB7XG4gIGN0eC5kaXNhYmxlZCA9IHZhbHVlICYmIHZhbHVlLmRpc2FibGVkIHx8IGZhbHNlXG5cbiAgaWYgKCFjdHguZGlzYWJsZWQpIHtcbiAgICBjdHgubW9kaWZpZXJzID0gT2JqZWN0KHZhbHVlKSA9PT0gdmFsdWVcbiAgICAgID8ge1xuICAgICAgICBzdG9wOiB2YWx1ZS5zdG9wID09PSB0cnVlIHx8IG1vZGlmaWVycy5zdG9wID09PSB0cnVlLFxuICAgICAgICBjZW50ZXI6IHZhbHVlLmNlbnRlciA9PT0gdHJ1ZSB8fCBtb2RpZmllcnMuY2VudGVyID09PSB0cnVlLFxuICAgICAgICBjb2xvcjogdmFsdWUuY29sb3IgfHwgYXJnXG4gICAgICB9XG4gICAgICA6IHtcbiAgICAgICAgc3RvcDogbW9kaWZpZXJzLnN0b3AsXG4gICAgICAgIGNlbnRlcjogbW9kaWZpZXJzLmNlbnRlcixcbiAgICAgICAgY29sb3I6IGFyZ1xuICAgICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3JpcHBsZScsXG4gIGluc2VydGVkKGVsLCBiaW5kaW5nKSB7XG4gICAgY29uc3QgY3R4ID0ge1xuICAgICAgbW9kaWZpZXJzOiB7fSxcbiAgICAgIGNsaWNrKGV2dCkge1xuICAgICAgICBpZiAoIWN0eC5kaXNhYmxlZCkge1xuICAgICAgICAgIHNob3dSaXBwbGUoZXZ0LCBlbCwgY3R4KVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAga2V5dXAoZXZ0KSB7XG4gICAgICAgIGlmICghY3R4LmRpc2FibGVkICYmIGV2dC5rZXlDb2RlID09PSAxMykge1xuICAgICAgICAgIHNob3dSaXBwbGUoZXZ0LCBlbCwgY3R4LCB0cnVlKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlQ3R4KGN0eCwgYmluZGluZylcbiAgICBpZiAoZWwucmlwcGxlQ3R4KSB7XG4gICAgICBlbC5yaXBwbGVDdHhPbGQgPSBlbC5yaXBwbGVDdHhcbiAgICB9XG4gICAgZWwucmlwcGxlQ3R4ID0gY3R4XG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjdHguY2xpY2ssIGZhbHNlKVxuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgY3R4LmtleXVwLCBmYWxzZSlcbiAgfSxcbiAgdXBkYXRlKGVsLCBiaW5kaW5nKSB7XG4gICAgZWwucmlwcGxlQ3R4ICE9PSB2b2lkIDAgJiYgdXBkYXRlQ3R4KGVsLnJpcHBsZUN0eCwgYmluZGluZylcbiAgfSxcbiAgdW5iaW5kKGVsKSB7XG4gICAgY29uc3QgY3R4ID0gZWwucmlwcGxlQ3R4T2xkIHx8IGVsLnJpcHBsZUN0eFxuXG4gICAgaWYgKGN0eCAhPT0gdm9pZCAwKSB7XG4gICAgICBjdHguYWJvcnQgIT09IHZvaWQgMCAmJiBjdHguYWJvcnQoKVxuICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjdHguY2xpY2ssIGZhbHNlKVxuICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBjdHgua2V5dXAsIGZhbHNlKVxuICAgICAgZGVsZXRlIGVsW2VsLnJpcHBsZUN0eE9sZCA/ICdyaXBwbGVDdHhPbGQnIDogJ3JpcHBsZUN0eCddXG4gICAgfVxuICB9XG59IiwiaW1wb3J0IFJpcHBsZSBmcm9tICcuL3NyYy9tYWluLmpzJ1xuXG5jb25zdCBpbnN0YWxsID0gZnVuY3Rpb24gKFZ1ZSkge1xuICBWdWUuZGlyZWN0aXZlKFJpcHBsZS5uYW1lLCBSaXBwbGUpXG59XG5cblJpcHBsZS5pbnN0YWxsID0gaW5zdGFsbFxuXG5leHBvcnQgZGVmYXVsdCBSaXBwbGUiLCJpbXBvcnQgJy4vY3NzL2luZGV4LnN0eWwnXG5cbmltcG9ydCBJY29uIGZyb20gJy4vY29tcG9uZW50cy9pY29uL2luZGV4LmpzJ1xuaW1wb3J0IEl0ZW0gZnJvbSAnLi9jb21wb25lbnRzL2l0ZW0vaW5kZXguanMnXG5pbXBvcnQgRmllbGQgZnJvbSAnLi9jb21wb25lbnRzL2ZpZWxkL2luZGV4LmpzJ1xuaW1wb3J0IElucHV0IGZyb20gJy4vY29tcG9uZW50cy9pbnB1dC9pbmRleC5qcydcbmltcG9ydCBTZWxlY3QgZnJvbSAnLi9jb21wb25lbnRzL3NlbGVjdC9pbmRleC5qcydcbmltcG9ydCBTY3JvbGxBcmVhIGZyb20gJy4vY29tcG9uZW50cy9zY3JvbGxBcmVhL2luZGV4LmpzJ1xuaW1wb3J0IE1vZGFsIGZyb20gJy4vY29tcG9uZW50cy9tb2RhbC9pbmRleC5qcydcbmltcG9ydCBQb3BvdmVyIGZyb20gJy4vY29tcG9uZW50cy9wb3BvdmVyL2luZGV4LmpzJ1xuaW1wb3J0IEJ1dHRvbiBmcm9tICcuL2NvbXBvbmVudHMvYnV0dG9uL2luZGV4LmpzJ1xuaW1wb3J0IENoZWNrYm94IGZyb20gJy4vY29tcG9uZW50cy9jaGVja2JveC9pbmRleC5qcydcbmltcG9ydCBDaGVja2JveEdyb3VwIGZyb20gJy4vY29tcG9uZW50cy9jaGVja2JveEdyb3VwL2luZGV4LmpzJ1xuaW1wb3J0IFJhZGlvIGZyb20gJy4vY29tcG9uZW50cy9yYWRpby9pbmRleC5qcydcbmltcG9ydCBSYWRpb0dyb3VwIGZyb20gJy4vY29tcG9uZW50cy9yYWRpb0dyb3VwL2luZGV4LmpzJ1xuaW1wb3J0IFBhZ2luYXRpb24gZnJvbSAnLi9jb21wb25lbnRzL3BhZ2luYXRpb24vaW5kZXguanMnXG5pbXBvcnQgQmFzaWNJdGVtIGZyb20gJy4vY29tcG9uZW50cy9iYXNpY0l0ZW0vaW5kZXguanMnXG5pbXBvcnQgTm90aWZpY2F0aW9uIGZyb20gJy4vY29tcG9uZW50cy9ub3RpZmljYXRpb24vaW5kZXguanMnXG5pbXBvcnQgTGF5b3V0IGZyb20gJy4vY29tcG9uZW50cy9sYXlvdXQvaW5kZXguanMnXG5pbXBvcnQgU2xpZGUgZnJvbSAnLi9jb21wb25lbnRzL3NsaWRlL2luZGV4LmpzJ1xuaW1wb3J0IE1hc2sgZnJvbSAnLi9kaXJlY3RpdmVzL21hc2svaW5kZXguanMnXG5pbXBvcnQgUmlwcGxlIGZyb20gJy4vZGlyZWN0aXZlcy9yaXBwbGUvaW5kZXguanMnXG5cbmNvbnN0IGNvbXBvbmVudHMgPSBbXG4gIEljb24sXG4gIEl0ZW0sXG4gIEZpZWxkLFxuICBJbnB1dCxcbiAgU2VsZWN0LFxuICBTY3JvbGxBcmVhLFxuICBNb2RhbCxcbiAgUG9wb3ZlcixcbiAgQnV0dG9uLFxuICBQYWdpbmF0aW9uLFxuICBDaGVja2JveCxcbiAgQ2hlY2tib3hHcm91cCxcbiAgUmFkaW8sXG4gIFJhZGlvR3JvdXAsXG4gIEJhc2ljSXRlbSxcbiAgTGF5b3V0LFxuICBTbGlkZVxuXVxuXG5jb25zdCBkaXJlY3RpdmVzID0gW1xuICBSaXBwbGUsXG4gIE1hc2tcbl1cblxuY29uc3QgaW5zdGFsbCA9IGZ1bmN0aW9uIChWdWUpIHtcbiAgY29tcG9uZW50cy5mb3JFYWNoKGNvbXBvbmVudCA9PiB7XG4gICAgVnVlLmNvbXBvbmVudChjb21wb25lbnQubmFtZSwgY29tcG9uZW50KVxuICB9KVxuICBkaXJlY3RpdmVzLmZvckVhY2goZGlyZWN0aXZlID0+IHtcbiAgICBWdWUuZGlyZWN0aXZlKGRpcmVjdGl2ZS5uYW1lLCBkaXJlY3RpdmUpXG4gIH0pXG4gIFZ1ZS5wcm90b3R5cGUuJG5vdGlmeSA9IE5vdGlmaWNhdGlvblxufVxuXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LlZ1ZSkge1xuICBpbnN0YWxsKHdpbmRvdy5WdWUpXG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaW5zdGFsbCxcbiAgSWNvbixcbiAgSXRlbSxcbiAgRmllbGQsXG4gIElucHV0LFxuICBTZWxlY3QsXG4gIFNjcm9sbEFyZWEsXG4gIFBvcG92ZXIsXG4gIE1vZGFsLFxuICBCdXR0b24sXG4gIFBhZ2luYXRpb24sXG4gIENoZWNrYm94LFxuICBDaGVja2JveEdyb3VwLFxuICBSYWRpbyxcbiAgUmFkaW9Hcm91cCxcbiAgQmFzaWNJdGVtLFxuICBOb3RpZmljYXRpb24sXG4gIExheW91dCxcbiAgU2xpZGUsXG4gIFJpcHBsZSxcbiAgTWFza1xufVxuIl0sIm5hbWVzIjpbIm5hbWUiLCJwcm9wcyIsIlN0cmluZyIsImNvbG9yIiwicHJpbWFyeSIsIkJvb2xlYW4iLCJuZWdhdGl2ZSIsInBvc2l0aXZlIiwid2FybmluZyIsImdyZXkiLCJsaWdodEdyZXkiLCJzaXplIiwiY29tcHV0ZWQiLCJjbGFzc2VzIiwiY2xzIiwiaWNvbiIsImNvbnRlbnQiLCJzdHlsZSIsImZvbnRTaXplIiwicmVuZGVyIiwiaCIsInN0YXRpY0NsYXNzIiwiY2xhc3MiLCJhdHRycyIsIm9uIiwiJGxpc3RlbmVycyIsImluc3RhbGwiLCJWdWUiLCJjb21wb25lbnQiLCJJY29uIiwid3JhcCIsImhpZGVCZWZvcmUiLCJoaWRlRGVmYXVsdCIsImhpZGVBZnRlciIsInRvIiwiT2JqZWN0IiwiY2VudGVyIiwiZW5kIiwiZGlzYWJsZWQiLCJtYXNrIiwicmlwcGxlIiwiZGF0YSIsImRpc2FibGUiLCJkaXJlY3RpdmVzIiwidmFsdWUiLCJzdGF5IiwiY29uY2F0IiwiJHNjb3BlZFNsb3RzIiwiYmVmb3JlIiwiaGlkZSIsImRlZmF1bHQiLCJhZnRlciIsIkl0ZW0iLCJlcnJvck1lc3NhZ2UiLCJydWxlcyIsIkFycmF5IiwiaXNEaXJ0eSIsImlubmVyRXJyb3IiLCJpbm5lckVycm9yTWVzc2FnZSIsIndhdGNoIiwiZm9yY2VDaGVjayIsInYiLCJ2YWxpZGF0ZSIsInZhbGlkYXRlVmFsdWUiLCJoYXNFcnJvciIsImNvbXB1dGVkRXJyb3JNZXNzYWdlIiwibW91bnRlZCIsIiRvbiIsInRyaWdnZXJWYWxpZGF0aW9uIiwiYmVmb3JlRGVzdHJveSIsIiRvZmYiLCJtZXRob2RzIiwicmVzZXRWYWxpZGF0aW9uIiwidmFsIiwibGVuZ3RoIiwidXBkYXRlIiwiZXJyIiwibXNnIiwibSIsInNvbWUiLCJydWxlIiwicmVzIiwiZm9yY2UiLCJhZHZhbmNlZEJsdXIiLCJlIiwiZXhjbHVkZWQiLCJnZXRSZWZzIiwicmVmTmFtZXMiLCJnZXREb21zIiwiZWxzIiwiaXNBcnJheSIsInJlZHVjZSIsImFjY3VtdWxhdG9yIiwiZWwiLCJwdXNoIiwiJGVsIiwicmVmIiwiJHJlZnMiLCJleGNsdWRlZEJsdXJSZWZzIiwicmVmcyIsImNvbnRhaW5zIiwidGFyZ2V0IiwiZm9jdXNlZCIsImZvY3VzZWRCZWZvcmUiLCJibHVyVHlwZSIsImJsdXJSZWZzIiwiJGVtaXQiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwibWl4aW5zIiwiVmFsaWRhdGVNaXhpbiIsIkFkdmFuY2VkQmx1ck1peGluIiwiY29tcG9uZW50cyIsInJlcXVpcmVkIiwidW5kZXJsaW5lZCIsImJvcmRlcmVkIiwiZmlsbGVkIiwibWluaSIsImxhYmVsIiwic3BhY2VBcm91bmQiLCJ0eXBlIiwiZm9jdXMiLCJibHVyIiwidW5kZXJsaW5lIiwiYm9yZGVyIiwiZmlsbCIsImVycm9yIiwiaW5uZXJQb2ludGVyIiwic2NvcGVkU2xvdHMiLCJnZXRJbm5lciIsImdldEFmdGVyIiwiRmllbGQiLCJwbGFjZWhvbGRlciIsImF1dG9jb21wbGV0ZSIsImlucHV0IiwiZG9tUHJvcHMiLCJJbnB1dCIsIngiLCJ5Iiwid2lkdGgiLCJoZWlnaHQiLCJzdHJldGNoIiwiU2Nyb2xsQXJlYSIsImlzRGVlcEVxdWFsIiwiYSIsImIiLCJEYXRlIiwiZ2V0VGltZSIsImtleXMiLCJldmVyeSIsInByb3AiLCJpc1N0cmluZ0NvbnRhaW4iLCJzIiwiaW5uZXJTIiwiaW5uZXJWIiwicmVwbGFjZSIsInNwbGl0Iiwic3VtIiwiZm9yRWFjaCIsImluY2x1ZGVzIiwiaXNPYmplY3QiLCJTY29ybGxBcmVhIiwibXVsdGlwbGUiLCJvcHRpb25zIiwiZmlsdGVyIiwib3B0aW9uc0hlaWdodCIsInNlbGVjdGVkU3R5bGUiLCJmaWx0ZXJWYWx1ZSIsImlubmVyVmFsdWUiLCJnZXQiLCJnZXRFeGFjdFZhbHVlcyIsInNldCIsImlubmVyT3B0aW9ucyIsImMiLCJnZXROYW1lIiwiJG5leHRUaWNrIiwiY2xlYXJGaWx0ZXIiLCJ0cmlnZ2VyQmx1ciIsImdldE9wdGlvbnMiLCJtYXAiLCJvcHRpb24iLCJzZWxlY3RlZCIsImNoZWNrU2VsZWN0ZWQiLCJuYXRpdmVPbiIsImNsaWNrIiwiZm9ybWF0VmFsdWUiLCJnZXRTZWxlY3RlZCIsImdldEV4YWN0T3B0aW9ucyIsInJlZkluRm9yIiwicGFkZGluZyIsImN1cnNvciIsInRyYW5zZm9ybSIsIm9wZSIsImR1cGxpY2F0ZWQiLCJnZXRWYWx1ZSIsImhhc093blByb3BlcnR5IiwiU2VsZWN0Iiwicm91bmQiLCJzaGFkb3ciLCJCdXR0b24iLCJzd0J1dHRvbiIsInNob3ciLCJ0aXRsZSIsInpJbmRleCIsIm9wYWNpdHkiLCJoYW5kbGVDYW5jZWwiLCJoYW5kbGVDb25maXJtIiwic2hvd01vZGFsIiwiaGlkZU1vZGFsIiwiZXZlbnQiLCJzdG9wUHJvcGFnYXRpb24iLCJoZWFkZXIiLCJmb290ZXIiLCJNb2RhbCIsImlzU2VydmVyIiwicHJvdG90eXBlIiwiJGlzU2VydmVyIiwiY3NzIiwiZWxlbWVudCIsImhhbmRsZXIiLCJhdHRhY2hFdmVudCIsIm9mZiIsImRldGFjaEV2ZW50IiwicG9wb3ZlclN0eWxlIiwiYXJyb3dTdHlsZSIsInJlZmVyZW5jZUVsbSIsIm1vZGVsIiwicGxhY2VtZW50IiwidHJpZ2dlciIsInZhbGlkYXRvciIsImluZGV4T2YiLCJzaG93VmFsdWUiLCJzaG93U3R5bGUiLCJnZXRTdHlsZSIsInBvcG92ZXJFbG0iLCJ0b3AiLCJvZmZzZXRIZWlnaHQiLCJsZWZ0Iiwib2Zmc2V0V2lkdGgiLCJyaWdodCIsImhhbmRsZUNsaWNrIiwiaGFuZGxlTW91c2VFbnRlciIsImhhbmRsZU1vdXNlTGVhdmUiLCJkb1Nob3ciLCJkb0Nsb3NlIiwiaGFuZGxlTWFudWFsIiwicG9wb3ZlciIsInJlZmVyZW5jZSIsImVsbSIsInF1ZXJ5U2VsZWN0b3IiLCJkZXN0cm95ZWQiLCJhc3NpZ24iLCJQb3BvdmVyIiwibGVmdExhYmVsIiwiY29sb3JMYWJlbCIsImtlZXBDb2xvciIsInBhcmVudCIsInBhcmVudERpc2FibGVkIiwiY2hlY2tlZCIsImJvb2xlYW5Nb2RlIiwiZ2V0Q2hlY2tlZCIsInNlbGYiLCJjb2xvckNoZWNrYm94IiwiZ2V0TGFiZWwiLCJDaGVja2JveCIsInNodXR0bGUiLCJfdGhpcyIsIiRjaGlsZHJlbiIsImNoaWxkIiwic2h1dHRsZVJlZiIsIlNodXR0bGVNaXhpbiIsIkNoZWNrYm94R3JvdXAiLCJjb2xvclJhZGlvIiwiUmFkaW8iLCJSYWRpb0dyb3VwIiwibWFrZVJlc3VsdCIsInRvdGFsIiwiY3VyIiwiYXJvdW5kIiwicmVzdWx0IiwiYmFzZUNvdW50Iiwic3VycGx1cyIsInN0YXJ0UG9zaXRpb24iLCJlbmRQb3NpdGlvbiIsImZyb20iLCJpIiwiUGFnaW5hdGlvbiIsIm9ic2VydmVyIiwibWVhc3VyZWRXaWR0aCIsImhvcml6b250YWwiLCJtZWFzdXJlVGFyZ2V0IiwibWluU2l6ZSIsIm1pbiIsImluaXRTdHlsZSIsImlubmVyQ29sbGFwc2VkIiwic2xpZGUiLCJzZXRTdHlsZSIsInBhc3NpdmUiLCJzbGlkZVRhcmdldCIsIm9ic2VydmUiLCJzZXRUaW1lb3V0IiwiY2xlYXJVcHBlclN0eWxlIiwidXBwZXIiLCJ1cHBlclNsaWRlVGFyZ2V0IiwiJHBhcmVudCIsIiR3YXRjaCIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJjaGlsZExpc3QiLCJzdWJ0cmVlIiwiY2hhcmFjdGVyRGF0YSIsImRpc2Nvbm5lY3QiLCJTbGlkZU9ic2VydmVyIiwiY29sbGFwc2VkIiwiZml0IiwiTnVtYmVyIiwiaW1tZWRpYXRlIiwiU2xpZGUiLCJzdWJDb250ZW50IiwiaW5kZW50TGV2ZWwiLCJzdWIiLCJtb3VzZW92ZXIiLCJleHBhbmQiLCJtb3VzZW91dCIsInBvc2l0aW9uIiwidW5zaGlmdCIsIkJhc2ljSXRlbSIsImhhc093biIsIm9iaiIsImtleSIsImNhbGwiLCJpc1ZOb2RlIiwibm9kZSIsInZlcnRpY2FsT2Zmc2V0Iiwib25DbG9zZSIsInNsb3QiLCJiYWNrZ3JvdW5kIiwiY2xvc2VDb2xvciIsImhhbmRsZUJ0biIsInZlcnRpY2FsUHJvcGVydHkiLCJ0ZXN0IiwicG9zaXRpb25TdHlsZSIsImdldFZub2RlIiwiY29uc29sZSIsIk5vdGlmaWNhdGlvbkNvbnN0cnVjdG9yIiwiZXh0ZW5kIiwiTm90aWZpY2F0aW9uIiwiaW5zdGFuY2UiLCJpbnN0YW5jZXMiLCJzZWVkIiwiTm90aWZpY2F0aW9uRnVuIiwidXNlck9uQ2xvc2UiLCJpZCIsImNsb3NlIiwiJG1vdW50IiwiYm9keSIsImFwcGVuZENoaWxkIiwiaXRlbSIsImxvZyIsImluZGV4IiwibGVuIiwic3BsaWNlIiwicmVtb3ZlZEhlaWdodCIsInBhcnNlSW50IiwiY29sbGFwc2VUb3AiLCJjb2xsYXBzZUxlZnQiLCJjb2xsYXBzZVJpZ2h0IiwiY29sbGFwc2VCb3R0b20iLCJmaXRUb3AiLCJmaXRMZWZ0IiwiZml0UmlnaHQiLCJmaXRCb3R0b20iLCJ0b3BNaW4iLCJsZWZ0TWluIiwicmlnaHRNaW4iLCJib3R0b21NaW4iLCJ2ZXJ0aWNhbFN0cmV0Y2giLCJib3R0b20iLCJMYXlvdXQiLCJzaG93TWFzayIsImN0eCIsImNsYXNzTGlzdCIsInJlbW92ZSIsImhpZGVNYXNrIiwiYWRkIiwiZGlzYWJsZU1hc2siLCJzdGF5TWFzayIsImNvbG9yTWFzayIsImdldERpc2FibGVkIiwiZ2V0U3RheSIsImdldENvbG9yIiwiaW5pdE1hc2siLCJiaW5kaW5nIiwiY3JlYXRlRWxlbWVudCIsIm1hc2tDdHgiLCJiaW5kIiwib2xkVmFsdWUiLCJ1bmJpbmQiLCJkaXJlY3RpdmUiLCJNYXNrIiwidG91Y2hlcyIsImNoYW5nZWRUb3VjaGVzIiwiY2xpZW50WSIsImNsaWVudFgiLCJzaG93UmlwcGxlIiwiZXZ0IiwiZm9yY2VDZW50ZXIiLCJtb2RpZmllcnMiLCJzdG9wIiwiaW5uZXJOb2RlIiwicG9zIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiZGlhbWV0ZXIiLCJNYXRoIiwic3FydCIsInJhZGl1cyIsImNlbnRlclgiLCJjZW50ZXJZIiwidGltZXIiLCJhYm9ydCIsImNsYXNzTmFtZSIsImNsZWFyVGltZW91dCIsInVwZGF0ZUN0eCIsImFyZyIsImluc2VydGVkIiwia2V5dXAiLCJrZXlDb2RlIiwicmlwcGxlQ3R4IiwicmlwcGxlQ3R4T2xkIiwiUmlwcGxlIiwiJG5vdGlmeSIsIndpbmRvdyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLFdBQWU7RUFDYkEsSUFBSSxFQUFFLFFBRE87RUFFYkMsS0FBSyxFQUFFO0lBQ0xELElBQUksRUFBRUUsTUFERDtJQUVMQyxLQUFLLEVBQUVELE1BRkY7SUFHTEUsT0FBTyxFQUFFQyxPQUhKO0lBSUxDLFFBQVEsRUFBRUQsT0FKTDtJQUtMRSxRQUFRLEVBQUVGLE9BTEw7SUFNTEcsT0FBTyxFQUFFSCxPQU5KO0lBT0xJLElBQUksRUFBRUosT0FQRDtJQVFMSyxTQUFTLEVBQUVMLE9BUk47SUFTTE0sSUFBSSxFQUFFVDtHQVhLO0VBYWJVLFFBQVEsRUFBRTtJQUNSQyxPQURRLHFCQUNFOzs7VUFDSkMsR0FBSjtVQUNNQyxJQUFJLEdBQUcsS0FBS2YsSUFBbEI7O1VBRUksQ0FBQ2UsSUFBTCxFQUFXOztPQUFYLE1BRU87UUFDTEQsR0FBRyxHQUFHLGdCQUFOOzs7OENBR0NBLEdBREgsRUFDUyxJQURULHlCQUVFLGVBRkYsRUFFbUIsS0FBS1YsT0FGeEIseUJBR0UsZ0JBSEYsRUFHb0IsS0FBS0UsUUFIekIseUJBSUUsZ0JBSkYsRUFJb0IsS0FBS0MsUUFKekIseUJBS0UsZUFMRixFQUttQixLQUFLQyxPQUx4Qix5QkFNRSxZQU5GLEVBTWdCLEtBQUtDLElBTnJCLHlCQU9FLGtCQVBGLEVBT3NCLEtBQUtDLFNBUDNCO0tBVk07SUFvQlJNLE9BcEJRLHFCQW9CRTthQUNELEtBQUtoQixJQUFMLElBQWEsR0FBcEI7S0FyQk07SUF1QlJpQixLQXZCUSxt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
