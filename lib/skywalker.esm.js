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
    ripple: Object | Boolean,
    active: {
      required: false
    }
  },
  data: function data() {
    return {};
  },
  render: function render(h) {
    return h("".concat(this.to !== void 0 ? 'router-link' : 'div'), {
      staticClass: 'sw-item flex items-center',
      class: {
        'no-wrap': !this.wrap,
        active: this.active,
        disable: this.disabled
      },
      on: this.disabled ? void 0 : _objectSpread({}, this.$listeners),
      props: {
        to: this.to
      },
      directives: (this.to !== void 0 || this.active !== void 0 || this.mask !== void 0 ? [{
        name: 'mask',
        value: {
          disabled: this.mask !== void 0 && this.mask.disabled || this.mask === void 0 && (this.to !== void 0 || this.active !== void 0),
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
          blur: function blur(e) {
            _this.$emit('blur', e.target.value);
          },
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
function isStringContain(s, v, random) {
  var innerS = String(s);
  var innerV = random === true ? v.replace(/\s+/g, '').split('') : v.replace(/\s+/g, ' ').split(' ');
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
      }
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

      if (passive) {
        if (slideTarget.style[this.target] && !this.innerCollapsed) {
          slideTarget.style[this.target] = null;
        }

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
      attributes: true,
      attributeFilter: ['mutate'],
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
    filled: Boolean,
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
    mask: Object | Boolean,
    ripple: Object | Boolean,
    sub: Array,
    active: Boolean,
    callback: Function,
    subFilter: String,
    subTag: Boolean
  },
  data: function data() {
    return {
      innerActive: false,
      innerCollapsed: true,
      collapsedBefore: true,
      mouseover: false,
      hide: false
    };
  },
  methods: {
    subFilterChange: function subFilterChange(restore, remember) {
      var _this = this;

      var isSubContain = function isSubContain(sub) {
        var contain = false;
        contain = sub.some(function (x) {
          if (x.sub) {
            return isSubContain(x.sub);
          } else {
            return isStringContain(x.content, _this.subFilter);
          }
        });
        return contain;
      };

      if (this.sub === void 0) {
        this.hide = !isStringContain(this.content, this.subFilter);
      } else {
        if (restore) {
          this.innerCollapsed = this.collapsedBefore;
          this.hide = false;
          return;
        }

        if (remember) {
          this.collapsedBefore = this.innerCollapsed;
        }

        this.innerCollapsed = false;
        this.hide = this.subTag && !isSubContain(this.sub);
      }
    }
  },
  created: function created() {
    var _this2 = this;

    if (this.collapsed !== void 0) {
      this.$watch('collapsed', function (v) {
        _this2.innerCollapsed = _this2.collapsedBefore = v === void 0 ? true : v;
      }, {
        immediate: true
      });
      this.$watch('innerCollapsed', function (v) {
        _this2.$emit('update:collapsed', v);
      }, {
        immediate: true
      });
    }

    if (this.sub !== void 0) {
      this.$on('update:collapsed', function () {
        console.log(_this2.sub);
      }, {
        immediate: true
      });
    }

    if (this.content !== void 0 && this.subFilter !== void 0) {
      this.$watch('subFilter', function (v, ov) {
        _this2.subFilterChange(v === '', ov === '');
      }, {
        immediate: true
      });
    }

    if (this.active !== void 0) {
      this.$watch('active', function (v) {
        _this2.innerActive = v;
      }, {
        immediate: true
      });
    }
  },
  render: function render(h) {
    var _this3 = this;

    return h('div', {
      staticClass: 'sw-basic-item',
      attrs: {
        mutate: this.hide
      },
      class: {
        split: this.split && !this.innerCollapsed,
        hide: this.hide
      }
    }, [h('div', {
      staticClass: 'sw-basic-item__main',
      class: this.disabled ? 'disable' : {
        'color-primary': !this.filled && this.primary,
        'color-negative': !this.filled && this.negative,
        'color-positive': !this.filled && this.positive,
        'color-warning': !this.filled && this.warning,
        'bg-primary': this.filled && this.primary,
        'bg-negative': this.filled && this.negative,
        'bg-positive': this.filled && this.positive,
        'bg-warning': this.filled && this.warning,
        'bg-dark color-white': this.filled
      },
      style: this.disabled ? void 0 : {
        color: !this.filled && this.color,
        'background-color': this.filled && this.color
      }
    }, [h('sw-item', {
      staticClass: 'sw-basic-item__inner',
      props: {
        to: !this.callback && this.to || void 0,
        center: this.center,
        end: this.end,
        disabled: this.disabled,
        mask: this.mask,
        ripple: this.ripple,
        active: this.innerActive
      },
      class: {
        expand: !this.innerCollapsed
      },
      style: {
        'min-height': this.mini ? '36px' : '48px',
        'padding-left': "".concat(this.indentLevel * 12, "px"),
        cursor: !this.disabled && (this.to !== void 0 || this.callback !== void 0 || this.$scopedSlots.default || this.sub !== void 0) ? 'pointer' : void 0
      },
      on: this.disabled ? void 0 : _objectSpread({}, this.$listeners, {
        click: function click() {
          if (_this3.$scopedSlots.default || _this3.sub !== void 0) {
            _this3.innerCollapsed = !_this3.innerCollapsed;
          }

          _this3.callback && _this3.callback(_this3);

          _this3.$emit('click');
        },
        mouseover: function mouseover() {
          _this3.mouseover = true;
        },
        mouseout: function mouseout() {
          _this3.mouseover = false;
        }
      }),
      scopedSlots: {
        before: this.$scopedSlots.before !== void 0 ? this.$scopedSlots.before : this.icon !== void 0 ? function () {
          return [h('sw-icon', {
            staticClass: 'sw-basic-item__icon',
            props: {
              name: _this3.icon
            }
          })];
        } : void 0,
        default: function _default() {
          return [h('div', {
            staticClass: 'sw-basic-item__content flex items-center',
            class: {
              'space-left': _this3.$scopedSlots.before !== void 0 || _this3.icon !== void 0,
              'space-right': (_this3.$scopedSlots.after !== void 0 || _this3.$scopedSlots.default !== void 0 || _this3.sub !== void 0) && (_this3.$scopedSlots.content !== void 0 || _this3.content !== void 0 || _this3.subContent !== void 0)
            }
          }, _this3.$scopedSlots.content !== void 0 ? [_this3.$scopedSlots.content()] : [h('div', {
            staticClass: 'default-content'
          }, [_this3.content !== void 0 ? h('div', {
            staticClass: 'sw-basic-item__label'
          }, _this3.content) : void 0, _this3.subContent !== void 0 ? h('div', {
            staticClass: 'sw-basic-item__sublabel'
          }, _this3.subContent) : void 0])])];
        },
        after: this.$scopedSlots.after !== void 0 ? this.$scopedSlots.after : this.$scopedSlots.default || this.sub !== void 0 ? function () {
          return [h('sw-icon', {
            staticClass: 'sw-basic-item__expansion color-grey',
            style: {
              transform: !_this3.innerCollapsed ? 'rotate(180deg)' : void 0,
              color: _this3.mouseover ? 'currentColor' : void 0
            },
            props: {
              name: 'keyboard_arrow_down'
            }
          })];
        } : void 0
      }
    })]), this.$scopedSlots.default || this.sub !== void 0 ? h(Slide, {
      props: {
        collapsed: this.innerCollapsed
      },
      scopedSlots: {
        default: function _default() {
          var sub = _this3.sub !== void 0 ? _this3.sub.map(function (props) {
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
                center: position ? props.center : _this3.center,
                end: position ? props.end : _this3.end,
                filled: props.filled !== void 0 ? props.filled : _this3.split,
                split: props.split !== void 0 ? props.split : _this3.split,
                mini: props.mini !== void 0 ? props.mini : _this3.mini,
                indentLevel: props.indentLevel !== void 0 ? props.indentLevel : _this3.indentLevel,
                mask: props.mask !== void 0 ? props.mask : _this3.mask,
                ripple: props.ripple !== void 0 ? props.ripple : _this3.ripple,
                callback: props.callback !== void 0 ? props.callback : _this3.callback,
                active: props.active,
                subFilter: _this3.subFilter,
                subTag: true // on: {
                //   'update:collapsed'(v) {
                //     props.collapsed = v
                //   }
                // }

              }
            });
          }) : [];
          sub.unshift(_this3.$scopedSlots.default ? _this3.$scopedSlots.default() : void 0);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2t5d2Fsa2VyLmVzbS5qcyIsInNvdXJjZXMiOlsiLi4vcGFja2FnZXMvY29tcG9uZW50cy9pY29uL3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9pY29uL2luZGV4LmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9pdGVtL3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9pdGVtL2luZGV4LmpzIiwiLi4vcGFja2FnZXMvbWl4aW5zL3ZhbGlkYXRlLmpzIiwiLi4vcGFja2FnZXMvbWl4aW5zL2FkdmFuY2VkQmx1ci5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvZmllbGQvc3JjL21haW4uanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL2ZpZWxkL2luZGV4LmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9pbnB1dC9zcmMvbWFpbi5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvaW5wdXQvaW5kZXguanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3Njcm9sbEFyZWEvc3JjL21haW4uanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3Njcm9sbEFyZWEvaW5kZXguanMiLCIuLi9wYWNrYWdlcy91dGlscy9pcy5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvc2VsZWN0L3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9zZWxlY3QvaW5kZXguanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL2J1dHRvbi9zcmMvbWFpbi5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvYnV0dG9uL2luZGV4LmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9tb2RhbC9zcmMvbWFpbi5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvbW9kYWwvaW5kZXguanMiLCIuLi9wYWNrYWdlcy91dGlscy9kb20uanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3BvcG92ZXIvc3JjL21haW4uanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3BvcG92ZXIvaW5kZXguanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL2NoZWNrYm94L3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9jaGVja2JveC9pbmRleC5qcyIsIi4uL3BhY2thZ2VzL21peGlucy9zaHV0dGxlLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9jaGVja2JveEdyb3VwL3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9jaGVja2JveEdyb3VwL2luZGV4LmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9yYWRpby9zcmMvbWFpbi5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvcmFkaW8vaW5kZXguanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3JhZGlvR3JvdXAvc3JjL21haW4uanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3JhZGlvR3JvdXAvaW5kZXguanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3BhZ2luYXRpb24vc3JjL3BhZ2luYXRpb24uanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3BhZ2luYXRpb24vc3JjL21haW4udnVlIiwiLi4vbm9kZV9tb2R1bGVzL3Z1ZS1ydW50aW1lLWhlbHBlcnMvZGlzdC9ub3JtYWxpemUtY29tcG9uZW50LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Z1ZS1ydW50aW1lLWhlbHBlcnMvZGlzdC9pbmplY3Qtc3R5bGUvYnJvd3Nlci5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvcGFnaW5hdGlvbi9pbmRleC5qcyIsIi4uL3BhY2thZ2VzL21peGlucy9zbGlkZU9ic2VydmVyLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9zbGlkZS9zcmMvbWFpbi5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvc2xpZGUvaW5kZXguanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL2Jhc2ljSXRlbS9zcmMvbWFpbi5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvYmFzaWNJdGVtL2luZGV4LmpzIiwiLi4vcGFja2FnZXMvdXRpbHMvdmRvbS5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvbm90aWZpY2F0aW9uL3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9ub3RpZmljYXRpb24vc3JjL25vdGlmaWNhdGlvbi5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvbGF5b3V0L3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9sYXlvdXQvaW5kZXguanMiLCIuLi9wYWNrYWdlcy9kaXJlY3RpdmVzL21hc2svc3JjL21haW4uanMiLCIuLi9wYWNrYWdlcy9kaXJlY3RpdmVzL21hc2svaW5kZXguanMiLCIuLi9wYWNrYWdlcy91dGlscy9ldmVudC5qcyIsIi4uL3BhY2thZ2VzL2RpcmVjdGl2ZXMvcmlwcGxlL3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvZGlyZWN0aXZlcy9yaXBwbGUvaW5kZXguanMiLCIuLi9wYWNrYWdlcy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdzd0ljb24nLFxuICBwcm9wczoge1xuICAgIG5hbWU6IFN0cmluZyxcbiAgICBjb2xvcjogU3RyaW5nLFxuICAgIHByaW1hcnk6IEJvb2xlYW4sXG4gICAgbmVnYXRpdmU6IEJvb2xlYW4sXG4gICAgcG9zaXRpdmU6IEJvb2xlYW4sXG4gICAgd2FybmluZzogQm9vbGVhbixcbiAgICBncmV5OiBCb29sZWFuLFxuICAgIGxpZ2h0R3JleTogQm9vbGVhbixcbiAgICBzaXplOiBTdHJpbmdcbiAgfSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBjbGFzc2VzKCkge1xuICAgICAgbGV0IGNsc1xuICAgICAgY29uc3QgaWNvbiA9IHRoaXMubmFtZVxuICBcbiAgICAgIGlmICghaWNvbikge1xuICAgICAgICByZXR1cm5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNscyA9ICdtYXRlcmlhbC1pY29ucydcbiAgICAgIH1cbiAgICAgIHJldHVybiB7XG4gICAgICAgIFtjbHNdOiB0cnVlLFxuICAgICAgICAnY29sb3ItcHJpbWFyeSc6IHRoaXMucHJpbWFyeSxcbiAgICAgICAgJ2NvbG9yLW5lZ2F0aXZlJzogdGhpcy5uZWdhdGl2ZSxcbiAgICAgICAgJ2NvbG9yLXBvc2l0aXZlJzogdGhpcy5wb3NpdGl2ZSxcbiAgICAgICAgJ2NvbG9yLXdhcm5pbmcnOiB0aGlzLndhcm5pbmcsXG4gICAgICAgICdjb2xvci1ncmV5JzogdGhpcy5ncmV5LFxuICAgICAgICAnY29sb3ItbGlnaHQtZ3JleSc6IHRoaXMubGlnaHRHcmV5LFxuICAgICAgfVxuICAgIH0sXG4gICAgY29udGVudCgpIHtcbiAgICAgIHJldHVybiB0aGlzLm5hbWUgfHwgJyAnXG4gICAgfSxcbiAgICBzdHlsZSgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGZvbnRTaXplOiB0aGlzLnNpemUgfHwgdm9pZCAwLFxuICAgICAgICBjb2xvcjogdGhpcy5jb2xvciB8fCB2b2lkIDBcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIHJlbmRlcihoKSB7XG4gICAgcmV0dXJuIGgoJ2knLCB7XG4gICAgICBzdGF0aWNDbGFzczogJ3N3LWljb24nLFxuICAgICAgY2xhc3M6IHRoaXMuY2xhc3NlcyxcbiAgICAgIHN0eWxlOiB0aGlzLnN0eWxlLFxuICAgICAgYXR0cnM6IHsgJ2FyaWEtaGlkZGVuJzogdHJ1ZSB9LFxuICAgICAgb246IHRoaXMuJGxpc3RlbmVyc1xuICAgIH0sIFtcbiAgICAgIHRoaXMuY29udGVudFxuICAgIF0pXG4gIH1cbn1cbiAgIiwiaW1wb3J0IEljb24gZnJvbSAnLi9zcmMvbWFpbi5qcydcblxuY29uc3QgaW5zdGFsbCA9IGZ1bmN0aW9uIChWdWUpIHtcbiAgVnVlLmNvbXBvbmVudChJY29uLm5hbWUsIEljb24pXG59XG5cbkljb24uaW5zdGFsbCA9IGluc3RhbGxcblxuZXhwb3J0IGRlZmF1bHQgSWNvblxuIiwiZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnc3dJdGVtJyxcbiAgcHJvcHM6IHtcbiAgICB3cmFwOiBCb29sZWFuLFxuICAgIGhpZGVCZWZvcmU6IEJvb2xlYW4sXG4gICAgaGlkZURlZmF1bHQ6IEJvb2xlYW4sXG4gICAgaGlkZUFmdGVyOiBCb29sZWFuLFxuICAgIHRvOiBTdHJpbmcgfCBPYmplY3QsXG4gICAgY2VudGVyOiBCb29sZWFuLFxuICAgIGVuZDogQm9vbGVhbixcbiAgICBkaXNhYmxlZDogQm9vbGVhbixcbiAgICBtYXNrOiBPYmplY3QgfCBCb29sZWFuLFxuICAgIHJpcHBsZTogT2JqZWN0IHwgQm9vbGVhbixcbiAgICBhY3RpdmU6IHtcbiAgICAgIHJlcXVpcmVkOiBmYWxzZVxuICAgIH1cbiAgfSxcbiAgZGF0YTogKCkgPT4gKHt9KSxcbiAgcmVuZGVyKGgpIHtcbiAgICByZXR1cm4gaChgJHt0aGlzLnRvICE9PSB2b2lkIDAgPyAncm91dGVyLWxpbmsnIDogJ2Rpdid9YCwge1xuICAgICAgc3RhdGljQ2xhc3M6ICdzdy1pdGVtIGZsZXggaXRlbXMtY2VudGVyJyxcbiAgICAgIGNsYXNzOiB7XG4gICAgICAgICduby13cmFwJzogIXRoaXMud3JhcCxcbiAgICAgICAgYWN0aXZlOiB0aGlzLmFjdGl2ZSxcbiAgICAgICAgZGlzYWJsZTogdGhpcy5kaXNhYmxlZFxuICAgICAgfSxcbiAgICAgIG9uOiB0aGlzLmRpc2FibGVkID8gdm9pZCAwIDoge1xuICAgICAgICAuLi50aGlzLiRsaXN0ZW5lcnNcbiAgICAgIH0sXG4gICAgICBwcm9wczoge1xuICAgICAgICB0bzogdGhpcy50b1xuICAgICAgfSxcbiAgICAgIGRpcmVjdGl2ZXM6ICh0aGlzLnRvICE9PSB2b2lkIDAgfHwgdGhpcy5hY3RpdmUgIT09IHZvaWQgMCB8fCB0aGlzLm1hc2sgIT09IHZvaWQgMCA/IFtcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdtYXNrJyxcbiAgICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMubWFzayAhPT0gdm9pZCAwICYmIHRoaXMubWFzay5kaXNhYmxlZCB8fCB0aGlzLm1hc2sgPT09IHZvaWQgMCAmJiAodGhpcy50byAhPT0gdm9pZCAwIHx8IHRoaXMuYWN0aXZlICE9PSB2b2lkIDApLFxuICAgICAgICAgICAgY29sb3I6IHRoaXMubWFzayAhPT0gdm9pZCAwICYmIHRoaXMubWFzay5jb2xvcixcbiAgICAgICAgICAgIHN0YXk6IHRoaXMubWFzayAhPT0gdm9pZCAwICYmIHRoaXMubWFzay5zdGF5XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgXSA6IFtdKS5jb25jYXQodGhpcy5yaXBwbGUgIT09IHZvaWQgMCA/IFtcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdyaXBwbGUnLFxuICAgICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5yaXBwbGUgIT09IHZvaWQgMCAmJiB0aGlzLnJpcHBsZS5kaXNhYmxlZCxcbiAgICAgICAgICAgIGNvbG9yOiB0aGlzLnJpcHBsZSAhPT0gdm9pZCAwICYmIHRoaXMucmlwcGxlLmNvbG9yLFxuICAgICAgICAgICAgY2VudGVyOiB0aGlzLnJpcHBsZSAhPT0gdm9pZCAwICYmIHRoaXMucmlwcGxlLmNlbnRlclxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXSA6IFtdKVxuICAgIH0sIFtcbiAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1pdGVtX19jb250ZW50IGZsZXggaXRlbXMtY2VudGVyJyxcbiAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAnbm8td3JhcCc6ICF0aGlzLndyYXBcbiAgICAgICAgfVxuICAgICAgfSwgW1xuXG4gICAgICAgIHRoaXMuJHNjb3BlZFNsb3RzLmJlZm9yZSAhPT0gdm9pZCAwID8gaCgnZGl2Jywge1xuICAgICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctaXRlbV9fYmVmb3JlIGZsZXggaXRlbXMtY2VudGVyJyxcbiAgICAgICAgICBjbGFzczoge1xuICAgICAgICAgICAgaGlkZTogdGhpcy5oaWRlQmVmb3JlLFxuICAgICAgICAgICAgJ2ZsZXgtYXV0byc6IHRoaXMuaGlkZURlZmF1bHQsXG4gICAgICAgICAgICAnbm8td3JhcCc6ICF0aGlzLndyYXBcbiAgICAgICAgICB9XG4gICAgICAgIH0sIFt0aGlzLiRzY29wZWRTbG90cy5iZWZvcmUoKV0pIDogdm9pZCAwLFxuICBcbiAgICAgICAgdGhpcy4kc2NvcGVkU2xvdHMuZGVmYXVsdCAhPT0gdm9pZCAwID8gaCgnZGl2Jywge1xuICAgICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctaXRlbV9faW5uZXIgZmxleCBpdGVtcy1jZW50ZXIgaXRlbXMtZW5kJyxcbiAgICAgICAgICBjbGFzczoge1xuICAgICAgICAgICAgaGlkZTogdGhpcy5oaWRlRGVmYXVsdCxcbiAgICAgICAgICAgICduby13cmFwJzogIXRoaXMud3JhcCxcbiAgICAgICAgICAgICdqdXN0aWZ5LWNlbnRlcic6IHRoaXMuY2VudGVyLFxuICAgICAgICAgICAgJ2p1c3RpZnktZW5kJzogdGhpcy5lbmRcblxuICAgICAgICAgIH1cbiAgICAgICAgfSwgW3RoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQoKV0pIDogdm9pZCAwLFxuICBcbiAgICAgICAgdGhpcy4kc2NvcGVkU2xvdHMuYWZ0ZXIgIT09IHZvaWQgMCA/IGgoJ2RpdicsIHtcbiAgICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWl0ZW1fX2FmdGVyIGZsZXggaXRlbXMtY2VudGVyJyxcbiAgICAgICAgICBjbGFzczoge1xuICAgICAgICAgICAgaGlkZTogdGhpcy5oaWRlQWZ0ZXIsXG4gICAgICAgICAgICAnbm8td3JhcCc6ICF0aGlzLndyYXBcbiAgICAgICAgICB9XG4gICAgICAgIH0sIFt0aGlzLiRzY29wZWRTbG90cy5hZnRlcigpXSkgOiB2b2lkIDBcbiAgICAgIF0pXG4gICAgXSlcbiAgfVxufVxuICAiLCJpbXBvcnQgSXRlbSBmcm9tICcuL3NyYy9tYWluLmpzJ1xuXG5jb25zdCBpbnN0YWxsID0gZnVuY3Rpb24gKFZ1ZSkge1xuICBWdWUuY29tcG9uZW50KEl0ZW0ubmFtZSwgSXRlbSlcbn1cblxuSXRlbS5pbnN0YWxsID0gaW5zdGFsbFxuXG5leHBvcnQgZGVmYXVsdCBJdGVtXG4iLCJcbmV4cG9ydCBkZWZhdWx0IHtcbiAgcHJvcHM6IHtcbiAgICBlcnJvck1lc3NhZ2U6IFN0cmluZyxcbiAgICBydWxlczogQXJyYXlcbiAgfSxcblxuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpc0RpcnR5OiBmYWxzZSxcbiAgICAgIGlubmVyRXJyb3I6IGZhbHNlLFxuICAgICAgaW5uZXJFcnJvck1lc3NhZ2U6IHZvaWQgMFxuICAgIH1cbiAgfSxcblxuICB3YXRjaDoge1xuICAgIGZvcmNlQ2hlY2sodikge1xuICAgICAgaWYgKHRoaXMucnVsZXMgPT09IHZvaWQgMCkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHRoaXMuaXNEaXJ0eSA9IHRydWVcbiAgICAgIHRoaXMudmFsaWRhdGUodilcbiAgICB9LFxuICAgIHZhbHVlKHYpIHtcbiAgICAgIGlmICh0aGlzLmZvcmNlQ2hlY2sgIT09IHZvaWQgMCB8fCB0aGlzLnJ1bGVzID09PSB2b2lkIDApIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICB0aGlzLmlzRGlydHkgPSB0cnVlXG4gICAgICB0aGlzLnZhbGlkYXRlKHYpXG4gICAgfVxuICB9LFxuXG4gIGNvbXB1dGVkOiB7XG4gICAgdmFsaWRhdGVWYWx1ZSgpIHtcbiAgICAgIHJldHVybiB0aGlzLmZvcmNlQ2hlY2sgPT09IHZvaWQgMCA/IHRoaXMudmFsdWUgOiB0aGlzLmZvcmNlQ2hlY2tcbiAgICB9LFxuICAgIGhhc0Vycm9yKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaW5uZXJFcnJvciA9PT0gdHJ1ZVxuICAgIH0sXG5cbiAgICBjb21wdXRlZEVycm9yTWVzc2FnZSgpIHtcbiAgICAgIHJldHVybiB0aGlzLmVycm9yTWVzc2FnZSAhPT0gdm9pZCAwXG4gICAgICAgID8gdGhpcy5lcnJvck1lc3NhZ2VcbiAgICAgICAgOiB0aGlzLmlubmVyRXJyb3JNZXNzYWdlXG4gICAgfVxuICB9LFxuXG4gIG1vdW50ZWQoKSB7XG4gICAgdGhpcy4kb24oYGJsdXJgLCB0aGlzLnRyaWdnZXJWYWxpZGF0aW9uKVxuICB9LFxuXG4gIGJlZm9yZURlc3Ryb3koKSB7XG4gICAgdGhpcy4kb2ZmKGBibHVyYCwgdGhpcy50cmlnZ2VyVmFsaWRhdGlvbilcbiAgfSxcblxuICBtZXRob2RzOiB7XG4gICAgcmVzZXRWYWxpZGF0aW9uKCkge1xuICAgICAgdGhpcy5pc0RpcnR5ID0gZmFsc2VcbiAgICAgIHRoaXMuaW5uZXJFcnJvciA9IGZhbHNlXG4gICAgICB0aGlzLmlubmVyRXJyb3JNZXNzYWdlID0gdm9pZCAwXG4gICAgfSxcblxuICAgIHZhbGlkYXRlKHZhbCA9IHRoaXMudmFsaWRhdGVWYWx1ZSkge1xuICAgICAgaWYgKCF0aGlzLnJ1bGVzIHx8IHRoaXMucnVsZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBjb25zdCB1cGRhdGUgPSAoZXJyLCBtc2cpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuaW5uZXJFcnJvciAhPT0gZXJyKSB7XG4gICAgICAgICAgdGhpcy5pbm5lckVycm9yID0gZXJyXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtID0gbXNnIHx8IHZvaWQgMFxuXG4gICAgICAgIGlmICh0aGlzLmlubmVyRXJyb3JNZXNzYWdlICE9PSBtKSB7XG4gICAgICAgICAgdGhpcy5pbm5lckVycm9yTWVzc2FnZSA9IG1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZXJyXG4gICAgICB9XG5cbiAgICAgIHJldHVybiAhdGhpcy5ydWxlcy5zb21lKHJ1bGUgPT4ge1xuICAgICAgICBsZXQgcmVzXG5cbiAgICAgICAgaWYgKHR5cGVvZiBydWxlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgcmVzID0gcnVsZSh2YWwpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlcyA9PT0gZmFsc2UgfHwgdHlwZW9mIHJlcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICByZXR1cm4gdXBkYXRlKHRydWUsIHJlcylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdXBkYXRlKGZhbHNlKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG5cbiAgICB0cmlnZ2VyVmFsaWRhdGlvbihmb3JjZSA9IHRydWUpIHtcbiAgICAgIGlmIChmb3JjZSA9PT0gdHJ1ZSB8fCB0aGlzLmlzRGlydHkgPT09IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuaXNEaXJ0eSA9IHRydWVcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGUodGhpcy52YWxpZGF0ZVZhbHVlKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiXG5leHBvcnQgZGVmYXVsdCB7XG4gIHByb3BzOiB7fSxcbiAgZGF0YTogKCkgPT4gKHt9KSxcbiAgd2F0Y2g6IHt9LFxuICBjb21wdXRlZDoge30sXG4gIG1ldGhvZHM6IHtcbiAgICBhZHZhbmNlZEJsdXIoZSkge1xuICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHsgcmV0dXJuIH1cbiAgICAgIGxldCBleGNsdWRlZCA9IGZhbHNlXG4gICAgICBsZXQgZ2V0UmVmcyA9IHJlZk5hbWVzID0+IHtcbiAgICAgICAgbGV0IGdldERvbXMgPSBlbHMgPT4ge1xuICAgICAgICAgIGVscyA9IEFycmF5LmlzQXJyYXkoZWxzKSA/IGVscyA6IFtlbHNdXG4gICAgICAgICAgcmV0dXJuIGVscy5yZWR1Y2UoKGFjY3VtdWxhdG9yLCBlbCkgPT4ge1xuICAgICAgICAgICAgYWNjdW11bGF0b3IucHVzaChlbCAmJiAoZWwuJGVsIHx8IGVsKSlcbiAgICAgICAgICAgIHJldHVybiBhY2N1bXVsYXRvclxuICAgICAgICAgIH0sIFtdKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlZk5hbWVzLnJlZHVjZSgoYWNjdW11bGF0b3IsIHJlZikgPT4gYWNjdW11bGF0b3IuY29uY2F0KGdldERvbXModGhpcy4kcmVmc1tyZWZdKSksIFtdKVxuICAgICAgfVxuICAgICAgXG4gICAgICBpZiAodGhpcy5leGNsdWRlZEJsdXJSZWZzKSB7XG4gICAgICAgIGxldCByZWZzID0gZ2V0UmVmcyh0aGlzLmV4Y2x1ZGVkQmx1clJlZnMpXG5cbiAgICAgICAgcmVmcy5zb21lKHJlZiA9PiB7XG4gICAgICAgICAgaWYgKHJlZiA9PT0gdm9pZCAwKSB7IHJldHVybiBmYWxzZSB9XG4gICAgICAgICAgZXhjbHVkZWQgPSByZWYuY29udGFpbnMoZS50YXJnZXQpIHx8IGZhbHNlXG4gICAgICAgICAgcmV0dXJuIGV4Y2x1ZGVkXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICBpZiAoZXhjbHVkZWQpIHtcbiAgICAgICAgdGhpcy5mb2N1c2VkID0gdHJ1ZVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGxldCBmb2N1c2VkQmVmb3JlID0gdGhpcy5mb2N1c2VkXG5cbiAgICAgIGlmICh0aGlzLmJsdXJUeXBlID09PSAncmV2ZXJzZScgJiYgZm9jdXNlZEJlZm9yZSkge1xuICAgICAgICB0aGlzLmZvY3VzZWQgPSAhZm9jdXNlZEJlZm9yZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHJlZnMgPSBnZXRSZWZzKHRoaXMuYmx1clJlZnMpXG5cbiAgICAgICAgcmVmcy5zb21lKHJlZiA9PiB7XG4gICAgICAgICAgaWYgKHJlZiA9PT0gdm9pZCAwKSB7IHJldHVybiBmYWxzZSB9XG4gICAgICAgICAgdGhpcy5mb2N1c2VkID0gcmVmLmNvbnRhaW5zKGUudGFyZ2V0KSB8fCBmYWxzZVxuICAgICAgICAgIHJldHVybiB0aGlzLmZvY3VzZWRcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5mb2N1c2VkICYmIGZvY3VzZWRCZWZvcmUpIHsgdGhpcy4kZW1pdChgYmx1cmAsIGUpIH1cbiAgICB9XG4gIH0sXG4gIG1vdW50ZWQoKSB7XG4gICAgaWYgKHRoaXMuYmx1clJlZnMpIHsgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuYWR2YW5jZWRCbHVyLCBmYWxzZSkgfVxuICB9LFxuICBiZWZvcmVEZXN0cm95KCkge1xuICAgIGlmICh0aGlzLmJsdXJSZWZzKSB7IGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmFkdmFuY2VkQmx1ciwgZmFsc2UpIH1cbiAgfSxcbn1cbiAgIiwiaW1wb3J0IFZhbGlkYXRlTWl4aW4gZnJvbSAnLi4vLi4vLi4vbWl4aW5zL3ZhbGlkYXRlJ1xuaW1wb3J0IEFkdmFuY2VkQmx1ck1peGluIGZyb20gJy4uLy4uLy4uL21peGlucy9hZHZhbmNlZEJsdXInXG5pbXBvcnQgSXRlbSBmcm9tICcuLi8uLi9pdGVtJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdzd0ZpZWxkJyxcbiAgbWl4aW5zOiBbVmFsaWRhdGVNaXhpbiwgQWR2YW5jZWRCbHVyTWl4aW5dLCAvLyBoYXNFcnJvcixjb21wdXRlZEVycm9yTWVzc2FnZVxuICBjb21wb25lbnRzOiB7IEl0ZW0gfSxcbiAgcHJvcHM6IHtcbiAgICByZXF1aXJlZDogQm9vbGVhbixcbiAgICB1bmRlcmxpbmVkOiBCb29sZWFuLFxuICAgIGJvcmRlcmVkOiBCb29sZWFuLFxuICAgIGZpbGxlZDogQm9vbGVhbixcbiAgICBkaXNhYmxlZDogQm9vbGVhbixcbiAgICBtaW5pOiBCb29sZWFuLFxuICAgIGxhYmVsOiBTdHJpbmcsXG4gICAgZm9yY2VDaGVjazogU3RyaW5nIHwgT2JqZWN0LFxuICAgIHNwYWNlQXJvdW5kOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgIH1cbiAgfSxcbiAgZGF0YTogKCkgPT4gKHtcbiAgICBmb2N1c2VkOiBmYWxzZVxuICB9KSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBibHVyUmVmcygpIHtcbiAgICAgIHJldHVybiBbJ2ZpZWxkQ29udGVudCddXG4gICAgfVxuICB9LFxuICB3YXRjaDoge1xuICAgIGZvY3VzZWQoKSB7XG4gICAgICBpZiAodGhpcy5mb2N1c2VkICYmIHRoaXMuZm9jdXMpIHsgdGhpcy5mb2N1cygpIH1cbiAgICAgIGlmICghdGhpcy5mb2N1c2VkICYmIHRoaXMuYmx1cikgeyB0aGlzLmJsdXIoKSB9XG4gICAgfVxuICB9LFxuICByZW5kZXIoaCkge1xuICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICBzdGF0aWNDbGFzczogJ3N3LWZpZWxkIGZsZXggbm8td3JhcCBpdGVtcy1jZW50ZXInLFxuICAgICAgY2xhc3M6IHtcbiAgICAgICAgZGlzYWJsZTogdGhpcy5kaXNhYmxlZCxcbiAgICAgICAgJ3NwYWNlLWFyb3VuZCc6IHRoaXMuc3BhY2VBcm91bmRcbiAgICAgIH1cbiAgICB9LCBbXG4gICAgICB0aGlzLmxhYmVsICE9PSB2b2lkIDAgPyBoKCdkaXYnLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctZmllbGRfX2xhYmVsIGZsZXggbm8td3JhcCBpdGVtcy1jZW50ZXInXG4gICAgICB9LCBbaCgnZGl2Jywge1xuICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWxhYmVsIGZsZXggbm8td3JhcCBpdGVtcy1jZW50ZXInLFxuICAgICAgICBjbGFzczoge1xuICAgICAgICAgIHJlcXVpcmVkOiB0aGlzLnJlcXVpcmVkXG4gICAgICAgIH1cbiAgICAgIH0sIHRoaXMubGFiZWwpXG4gICAgICBdKSA6IHZvaWQgMCxcblxuICAgICAgaCgnZGl2Jywge1xuICAgICAgICByZWY6ICdmaWVsZENvbnRlbnQnLFxuICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWZpZWxkX19jb250ZW50IGZsZXggbm8td3JhcCBpdGVtcy1jZW50ZXIgc3ctZm9ybScsXG4gICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgdW5kZXJsaW5lOiB0aGlzLnVuZGVybGluZWQsXG4gICAgICAgICAgYm9yZGVyOiB0aGlzLmJvcmRlcmVkLFxuICAgICAgICAgIGZpbGw6IHRoaXMuZmlsbGVkLFxuICAgICAgICAgIGZvY3VzOiAhdGhpcy5oYXNFcnJvciAmJiB0aGlzLmZvY3VzZWQsXG4gICAgICAgICAgZXJyb3I6IHRoaXMuaGFzRXJyb3IsXG4gICAgICAgICAgJ3BhZGRpbmctbWluJzogIXRoaXMubWluaSxcbiAgICAgICAgICAnaW5uZXItcG9pbnRlcic6IHRoaXMuaW5uZXJQb2ludGVyXG4gICAgICAgIH1cbiAgICAgIH0sIFtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA/IGgoJ2RpdicsIHtcbiAgICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWZpZWxkX19kaXNhYmxlZCdcbiAgICAgICAgfSkgOiB2b2lkIDAsXG5cbiAgICAgICAgaCgnc3ctaXRlbScsIHtcbiAgICAgICAgICBzdGF0aWNDbGFzczogJ2ZsZXgtYXV0bycsXG4gICAgICAgICAgc2NvcGVkU2xvdHM6IHtcbiAgICAgICAgICAgIGJlZm9yZTogdGhpcy4kc2NvcGVkU2xvdHMuYmVmb3JlICE9PSB2b2lkIDBcbiAgICAgICAgICAgICAgPyAoKSA9PiBbaCgnZGl2Jywge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiAnZmxleCBuby13cmFwIGl0ZW1zLWNlbnRlciBtYXJnaW4tbWluJ1xuICAgICAgICAgICAgICB9LCBbdGhpcy4kc2NvcGVkU2xvdHMuYmVmb3JlKCldKV0gOiB2b2lkIDAsXG5cbiAgICAgICAgICAgIGRlZmF1bHQ6IHRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQgIT09IHZvaWQgMCB8fCB0aGlzLmdldElubmVyICE9PSB2b2lkIDBcbiAgICAgICAgICAgICAgPyAoKSA9PiBbdGhpcy5nZXRJbm5lciAhPT0gdm9pZCAwID8gdGhpcy5nZXRJbm5lcihoKSA6IHZvaWQgMCwgdGhpcy4kc2NvcGVkU2xvdHMuZGVmYXVsdCAhPT0gdm9pZCAwICYmIHRoaXMuZ2V0SW5uZXIgPT09IHZvaWQgMCA/IHRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQoKSA6IHZvaWQgMF0gOiB2b2lkIDAsXG5cbiAgICAgICAgICAgIGFmdGVyOiB0aGlzLiRzY29wZWRTbG90cy5hZnRlciAhPT0gdm9pZCAwIHx8IHRoaXMuZ2V0QWZ0ZXIgIT09IHZvaWQgMFxuICAgICAgICAgICAgICA/ICgpID0+IFtoKCdkaXYnLCB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6ICdmbGV4IG5vLXdyYXAgaXRlbXMtY2VudGVyIG1hcmdpbi1taW4nXG4gICAgICAgICAgICAgIH0sIFt0aGlzLmdldEFmdGVyICE9PSB2b2lkIDAgPyB0aGlzLmdldEFmdGVyKGgpIDogdm9pZCAwLCB0aGlzLiRzY29wZWRTbG90cy5hZnRlciAhPT0gdm9pZCAwICYmIHRoaXMuZ2V0QWZ0ZXIgPT09IHZvaWQgMCA/IHRoaXMuJHNjb3BlZFNsb3RzLmFmdGVyKCkgOiB2b2lkIDBdKV0gOiB2b2lkIDBcbiAgICAgICAgICB9XG4gICAgICAgIH0pLFxuXG4gICAgICAgIHRoaXMuaGFzRXJyb3IgPyBoKCdkaXYnLCB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1maWVsZF9fZXJyb3IgZmxleCBuby13cmFwIGl0ZW1zLWNlbnRlcidcbiAgICAgICAgfSwgdGhpcy5jb21wdXRlZEVycm9yTWVzc2FnZSkgOiB2b2lkIDBcbiAgICAgIF0pXG4gICAgXSlcbiAgfVxufVxuICAiLCJpbXBvcnQgRmllbGQgZnJvbSAnLi9zcmMvbWFpbi5qcydcblxuY29uc3QgaW5zdGFsbCA9IGZ1bmN0aW9uIChWdWUpIHtcbiAgVnVlLmNvbXBvbmVudChGaWVsZC5uYW1lLCBGaWVsZClcbn1cblxuRmllbGQuaW5zdGFsbCA9IGluc3RhbGxcblxuZXhwb3J0IGRlZmF1bHQgRmllbGRcbiIsImltcG9ydCBGaWVsZCBmcm9tICcuLi8uLi9maWVsZCdcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnc3dJbnB1dCcsXG4gIG1peGluczogW0ZpZWxkXSwgLy8gZm9jdXNlZCxkaXNhYmxlZFxuICBwcm9wczoge1xuICAgIHZhbHVlOiBTdHJpbmcsXG4gICAgcGxhY2Vob2xkZXI6IFN0cmluZyxcbiAgICBhdXRvY29tcGxldGU6IEJvb2xlYW5cbiAgfSxcbiAgZGF0YTogKCkgPT4gKHt9KSxcbiAgY29tcHV0ZWQ6IHt9LFxuICBtZXRob2RzOiB7XG4gICAgZm9jdXMoKSB7XG4gICAgICB0aGlzLiRyZWZzLmlucHV0LmZvY3VzKClcbiAgICB9LFxuICAgIGJsdXIoKSB7XG4gICAgICB0aGlzLiRyZWZzLmlucHV0LmJsdXIoKVxuICAgIH0sXG4gICAgZ2V0SW5uZXIoaCkge1xuICAgICAgcmV0dXJuIFtoKCdpbnB1dCcsIHtcbiAgICAgICAgcmVmOiAnaW5wdXQnLFxuICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWlucHV0IG1hcmdpbi1taW4nLFxuICAgICAgICBhdHRyczoge1xuICAgICAgICAgIGF1dG9jb21wbGV0ZTogdGhpcy5hdXRvY29tcGxldGUgPyAnb24nIDogJ29mZidcbiAgICAgICAgfSxcbiAgICAgICAgZG9tUHJvcHM6IHtcbiAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcbiAgICAgICAgICBwbGFjZWhvbGRlcjogdGhpcy5wbGFjZWhvbGRlciB8fCAnJyxcbiAgICAgICAgICBkaXNhYmxlZDogdGhpcy5kaXNhYmxlZFxuICAgICAgICB9LFxuICAgICAgICBvbjoge1xuICAgICAgICAgIC4uLnRoaXMuJGxpc3RlbmVycyxcbiAgICAgICAgICBibHVyOiBlID0+IHtcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2JsdXInLCBlLnRhcmdldC52YWx1ZSlcbiAgICAgICAgICB9LFxuICAgICAgICAgIGlucHV0OiBlID0+IHtcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2lucHV0JywgZS50YXJnZXQudmFsdWUpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KV1cbiAgICB9XG4gIH1cbn1cbiAgIiwiaW1wb3J0IElucHV0IGZyb20gJy4vc3JjL21haW4uanMnXG5cbmNvbnN0IGluc3RhbGwgPSBmdW5jdGlvbiAoVnVlKSB7XG4gIFZ1ZS5jb21wb25lbnQoSW5wdXQubmFtZSwgSW5wdXQpXG59XG5cbklucHV0Lmluc3RhbGwgPSBpbnN0YWxsXG5cbmV4cG9ydCBkZWZhdWx0IElucHV0XG4iLCJleHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdzd1Njcm9sbEFyZWEnLFxuICBwcm9wczoge1xuICAgIHg6IEJvb2xlYW4sXG4gICAgeTogQm9vbGVhbixcbiAgICB3aWR0aDogU3RyaW5nLFxuICAgIGhlaWdodDogU3RyaW5nLFxuICAgIHN0cmV0Y2g6IEJvb2xlYW5cbiAgfSxcbiAgZGF0YTogKCkgPT4gKHt9KSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBzdHlsZSgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgICdvdmVyZmxvdy14JzogdGhpcy54ID8gJ2F1dG8nIDogJ2hpZGRlbicsXG4gICAgICAgICdvdmVyZmxvdy15JzogdGhpcy55ID8gJ2F1dG8nIDogJ2hpZGRlbicsXG4gICAgICAgICdtYXgtd2lkdGgnOiB0aGlzLndpZHRoIHx8ICcxMDAlJyxcbiAgICAgICAgd2lkdGg6IHRoaXMud2lkdGggfHwgJzEwMCUnLFxuICAgICAgICAnbWF4LWhlaWdodCc6IHRoaXMuaGVpZ2h0IHx8ICcxMDAlJyxcbiAgICAgICAgaGVpZ2h0OiB0aGlzLnN0cmV0Y2ggJiYgKHRoaXMuaGVpZ2h0IHx8ICcxMDAlJylcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHt9LFxuICByZW5kZXIoaCkge1xuICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICBzdGF0aWNDbGFzczogJ3N3LXNjcm9sbC1hcmVhJyxcbiAgICAgIHN0eWxlOiB0aGlzLnN0eWxlLFxuICAgICAgb246IHRoaXMuJGxpc3RlbmVyc1xuICAgIH0sIHRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQgIT09IHZvaWQgMCA/IFt0aGlzLiRzY29wZWRTbG90cy5kZWZhdWx0KCldIDogdm9pZCAwKVxuICB9XG59XG4gICIsImltcG9ydCBTY3JvbGxBcmVhIGZyb20gJy4vc3JjL21haW4uanMnXG5cbmNvbnN0IGluc3RhbGwgPSBmdW5jdGlvbiAoVnVlKSB7XG4gIFZ1ZS5jb21wb25lbnQoU2Nyb2xsQXJlYS5uYW1lLCBTY3JvbGxBcmVhKVxufVxuXG5TY3JvbGxBcmVhLmluc3RhbGwgPSBpbnN0YWxsXG5cbmV4cG9ydCBkZWZhdWx0IFNjcm9sbEFyZWFcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXNlbGYtY29tcGFyZSAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRGVlcEVxdWFsKGEsIGIpIHtcbiAgaWYgKGEgPT09IGIpIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgaWYgKGEgaW5zdGFuY2VvZiBEYXRlICYmIGIgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgcmV0dXJuIGEuZ2V0VGltZSgpID09PSBiLmdldFRpbWUoKVxuICB9XG5cbiAgaWYgKGEgIT09IGEgJiYgYiAhPT0gYikge1xuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBpZiAoYSAhPT0gT2JqZWN0KGEpIHx8IGIgIT09IE9iamVjdChiKSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgY29uc3QgcHJvcHMgPSBPYmplY3Qua2V5cyhhKVxuXG4gIGlmIChwcm9wcy5sZW5ndGggIT09IE9iamVjdC5rZXlzKGIpLmxlbmd0aCkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgcmV0dXJuIHByb3BzLmV2ZXJ5KHByb3AgPT4gaXNEZWVwRXF1YWwoYVtwcm9wXSwgYltwcm9wXSkpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZ0NvbnRhaW4ocywgdiwgcmFuZG9tKSB7XG4gIGxldCBpbm5lclMgPSBTdHJpbmcocylcbiAgbGV0IGlubmVyViA9IHJhbmRvbSA9PT0gdHJ1ZSA/IHYucmVwbGFjZSgvXFxzKy9nLCAnJykuc3BsaXQoJycpIDogdi5yZXBsYWNlKC9cXHMrL2csICcgJykuc3BsaXQoJyAnKVxuICBsZXQgc3VtID0gMFxuXG4gIGlubmVyVi5mb3JFYWNoKHggPT4ge1xuICAgIGlmIChpbm5lclMuaW5jbHVkZXMoeCkpIHtcbiAgICAgIGlubmVyUyA9IGlubmVyUy5yZXBsYWNlKHgsICcnKVxuICAgICAgc3VtKytcbiAgICB9XG4gIH0pXG4gIHJldHVybiBzdW0gPj0gaW5uZXJWLmxlbmd0aFxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNPYmplY3Qodikge1xuICByZXR1cm4gT2JqZWN0KHYpID09PSB2XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0RhdGUodikge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHYpID09PSAnW29iamVjdCBEYXRlXSdcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUmVnZXhwKHYpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2KSA9PT0gJ1tvYmplY3QgUmVnRXhwXSdcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtYmVyKHYpIHtcbiAgcmV0dXJuIHR5cGVvZiB2ID09PSAnbnVtYmVyJyAmJiBpc0Zpbml0ZSh2KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmcodikge1xuICByZXR1cm4gdHlwZW9mIHYgPT09ICdzdHJpbmcnXG59XG4iLCJpbXBvcnQgRmllbGQgZnJvbSAnLi4vLi4vZmllbGQnXG5pbXBvcnQgU2NvcmxsQXJlYSBmcm9tICcuLi8uLi9zY3JvbGxBcmVhJ1xuaW1wb3J0IHsgaXNEZWVwRXF1YWwsIGlzU3RyaW5nQ29udGFpbiwgaXNPYmplY3QgfSBmcm9tICcuLi8uLi8uLi91dGlscy9pcydcblxuLy8gaW1wb3J0IHsgZGVkdXBsaWNhdGUgfSBmcm9tICcuLi8uLi8uLi91dGlscy9kZWR1cGxpY2F0ZSdcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnc3dTZWxlY3QnLFxuICBtaXhpbnM6IFtGaWVsZF0sIC8vIGZvY3VzZWQsZGlzYWJsZWRcbiAgY29tcG9uZW50czoge1xuICAgIFNjb3JsbEFyZWFcbiAgfSxcbiAgcHJvcHM6IHtcbiAgICBtdWx0aXBsZTogQm9vbGVhbixcbiAgICB2YWx1ZToge1xuICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICB9LFxuICAgIG9wdGlvbnM6IEFycmF5LFxuICAgIGZpbHRlcjogQm9vbGVhbixcbiAgICBwbGFjZWhvbGRlcjogU3RyaW5nLFxuICAgIG9wdGlvbnNIZWlnaHQ6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICcyMDBweCdcbiAgICB9LFxuICAgIHNlbGVjdGVkU3R5bGU6IFN0cmluZ1xuICB9LFxuICBkYXRhOiAoKSA9PiAoe1xuICAgIGJsdXJUeXBlOiAncmV2ZXJzZScsXG4gICAgZmlsdGVyVmFsdWU6ICcnXG4gIH0pLFxuICBjb21wdXRlZDoge1xuICAgIGV4Y2x1ZGVkQmx1clJlZnMoKSB7XG4gICAgICByZXR1cm4gdGhpcy5maWx0ZXIgPyBbJ2lucHV0JywgJ3NlbGVjdGVkJywgJ3NlbGVjdE9wdGlvbnMnXSA6IFsnc2VsZWN0ZWQnLCAnc2VsZWN0T3B0aW9ucyddXG4gICAgfSxcbiAgICBpbm5lclZhbHVlOiB7XG4gICAgICBnZXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEV4YWN0VmFsdWVzKHRoaXMudmFsdWUpXG4gICAgICB9LFxuICAgICAgc2V0KHZhbCkge1xuICAgICAgICB0aGlzLiRlbWl0KFxuICAgICAgICAgICdpbnB1dCcsXG4gICAgICAgICAgdmFsXG4gICAgICAgIClcbiAgICAgIH1cbiAgICB9LFxuICAgIGlubmVyT3B0aW9ucygpIHtcbiAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMucmVkdWNlKChhLCBjKSA9PiB7XG4gICAgICAgIGlmIChpc1N0cmluZ0NvbnRhaW4odGhpcy5nZXROYW1lKGMpLCB0aGlzLmZpbHRlclZhbHVlKSkge1xuICAgICAgICAgIGEucHVzaChjKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhXG4gICAgICB9LCBbXSkgfHwgW11cbiAgICB9XG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgb3B0aW9ucygpIHtcbiAgICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHRoaXMuZ2V0RXhhY3RWYWx1ZXModGhpcy52YWx1ZSlcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBmb2N1cygpIHtcbiAgICAgIHRoaXMuJG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgdGhpcy4kcmVmcy5pbnB1dC5mb2N1cygpXG4gICAgICB9KVxuICAgIH0sXG4gICAgYmx1cigpIHtcbiAgICAgIHRoaXMuJHJlZnMuaW5wdXQuYmx1cigpXG4gICAgfSxcbiAgICBjbGVhckZpbHRlcigpIHtcbiAgICAgIHRoaXMuZmlsdGVyVmFsdWUgPSAnJ1xuICAgIH0sXG4gICAgdHJpZ2dlckJsdXIoZSkge1xuICAgICAgdGhpcy5mb2N1c2VkID0gZmFsc2VcbiAgICAgIHRoaXMuJGVtaXQoYGJsdXJgLCBlKVxuICAgIH0sXG4gICAgZ2V0SW5uZXIoaCkge1xuICAgICAgbGV0IGdldE9wdGlvbnMgPSBoID0+IHtcbiAgICAgICAgaWYgKHRoaXMuaW5uZXJPcHRpb25zLmxlbmd0aCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLmlubmVyT3B0aW9ucy5tYXAob3B0aW9uID0+IGgoJ3N3LWl0ZW0nLCB7XG4gICAgICAgICAgICBjbGFzczoge1xuICAgICAgICAgICAgICBzZWxlY3RlZDogdGhpcy5jaGVja1NlbGVjdGVkKG9wdGlvbilcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBuYXRpdmVPbjoge1xuICAgICAgICAgICAgICBjbGljazogZSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbm5lclZhbHVlID0gdGhpcy5mb3JtYXRWYWx1ZShvcHRpb24pXG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhckZpbHRlcigpXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXJCbHVyKGUpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuZm9jdXMoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNjb3BlZFNsb3RzOiB7XG4gICAgICAgICAgICAgIGRlZmF1bHQ6ICgpID0+IFtoKCdkaXYnLCB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1zZWxlY3RfX29wdGlvbidcbiAgICAgICAgICAgICAgfSwgU3RyaW5nKHRoaXMuZ2V0TmFtZShvcHRpb24pKSldXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIFtoKCdzdy1pdGVtJywge1xuICAgICAgICAgICAgc2NvcGVkU2xvdHM6IHtcbiAgICAgICAgICAgICAgZGVmYXVsdDogKCkgPT4gW2goJ2RpdicsIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogJ3N3LXNlbGVjdF9fb3B0aW9uIG5vLW9wdGlvbnMnXG4gICAgICAgICAgICAgIH0sICdubyBvcHRpb25zJyldXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSldXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGV0IGdldFNlbGVjdGVkID0gaCA9PiB0aGlzLmdldEV4YWN0T3B0aW9ucyh0aGlzLmlubmVyVmFsdWUpLm1hcCh4ID0+IGgoJ3N3LWl0ZW0nLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiAnbWFyZ2luLW1pbiBzdy1mb3JtIHNlbGVjdGVkLW9wdGlvbicsXG4gICAgICAgIGNsYXNzOiB0aGlzLnNlbGVjdGVkU3R5bGUgPT09IHZvaWQgMFxuICAgICAgICAgID8ge1xuICAgICAgICAgICAgdW5kZXJsaW5lOiB0aGlzLnVuZGVybGluZWQsXG4gICAgICAgICAgICBib3JkZXI6IHRoaXMuYm9yZGVyZWQsXG4gICAgICAgICAgICBmaWxsOiB0aGlzLmZpbGxlZFxuICAgICAgICAgIH0gOiB7XG4gICAgICAgICAgICBbdGhpcy5zZWxlY3RlZFN0eWxlXTogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgIHJlZjogJ3NlbGVjdGVkJyxcbiAgICAgICAgcmVmSW5Gb3I6IHRydWUsXG4gICAgICAgIHNjb3BlZFNsb3RzOiB7XG4gICAgICAgICAgZGVmYXVsdDogKCkgPT4gW2goJ2RpdicsIHtcbiAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgIHBhZGRpbmc6IHRoaXMubWluaSA/ICczcHggMCAzcHggOXB4JyA6ICczcHggOXB4JyxcbiAgICAgICAgICAgICAgJ3doaXRlLXNwYWNlJzogdGhpcy5taW5pID8gJ25vd3JhcCcgOiB2b2lkIDBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCBTdHJpbmcodGhpcy5nZXROYW1lKHgpKSldLFxuICAgICAgICAgIGFmdGVyOiAhdGhpcy5taW5pID8gKCkgPT4gW2goJ3N3LWljb24nLCB7XG4gICAgICAgICAgICBjbGFzczoge1xuICAgICAgICAgICAgICAnaG92ZXItY29sb3ItcHJpbWFyeSc6IHRydWUsXG4gICAgICAgICAgICAgICdjb2xvci1ncmV5JzogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICdib3JkZXItcmFkaXVzJzogJzUwJScsXG4gICAgICAgICAgICAgIHBhZGRpbmc6ICcwIDNweCAwIDAnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgICAgbmFtZTogdGhpcy5maWxsZWQgJiYgdGhpcy5zZWxlY3RlZFN0eWxlID09PSB2b2lkIDAgfHwgdGhpcy5zZWxlY3RlZFN0eWxlID09PSAnZmlsbCcgPyAnY2FuY2VsJyA6ICdjbGVhcicsXG4gICAgICAgICAgICAgIHNpemU6ICcxNHB4J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5hdGl2ZU9uOiB7XG4gICAgICAgICAgICAgIGNsaWNrOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbm5lclZhbHVlID0gdGhpcy5mb3JtYXRWYWx1ZSh4LCAncmVtb3ZlJylcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXSA6IHZvaWQgMFxuICAgICAgICB9XG4gICAgICB9KSlcblxuICAgICAgcmV0dXJuIFtoKCdzdy1pdGVtJywge1xuICAgICAgICBzdGF0aWNDbGFzczogJ2ZsZXgtYXV0bycsXG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgd3JhcDogdHJ1ZSxcbiAgICAgICAgICBoaWRlRGVmYXVsdDogdGhpcy5pbm5lclZhbHVlLmxlbmd0aCA+IDAgJiYgKCF0aGlzLmZvY3VzZWQgfHwgIXRoaXMuZmlsdGVyKVxuICAgICAgICB9LFxuICAgICAgICBzY29wZWRTbG90czoge1xuICAgICAgICAgIGJlZm9yZTogdGhpcy5pbm5lclZhbHVlLmxlbmd0aCA+IDAgPyAoKSA9PiBnZXRTZWxlY3RlZChoKSA6IHZvaWQgMCxcbiAgICAgICAgICBkZWZhdWx0OiAoKSA9PiBbaCgnaW5wdXQnLCB7XG4gICAgICAgICAgICByZWY6ICdpbnB1dCcsXG4gICAgICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWlucHV0IG1hcmdpbi1taW4nLFxuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgY3Vyc29yOiAhdGhpcy5maWx0ZXIgPyAncG9pbnRlcicgOiB2b2lkIDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkb21Qcm9wczoge1xuICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5maWx0ZXJWYWx1ZSxcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IHRoaXMucGxhY2Vob2xkZXIgfHwgJycsXG4gICAgICAgICAgICAgIGRpc2FibGVkOiAhdGhpcy5maWx0ZXJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAuLi50aGlzLiRsaXN0ZW5lcnMsXG4gICAgICAgICAgICAgIGlucHV0OiBlID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlclZhbHVlID0gZS50YXJnZXQudmFsdWVcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXVxuICAgICAgICB9XG4gICAgICB9KSwgdGhpcy5mb2N1c2VkID8gaCgnZGl2Jywge1xuICAgICAgICByZWY6ICdzZWxlY3RPcHRpb25zJyxcbiAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1zZWxlY3RfX29wdGlvbnMgY29tbW9uLXNoYWRvdycsXG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgJ21heC1oZWlnaHQnOiB0aGlzLm9wdGlvbnNIZWlnaHRcbiAgICAgICAgfVxuICAgICAgfSwgW2goJ3N3LXNjcm9sbC1hcmVhJywge1xuICAgICAgICBwcm9wczoge1xuICAgICAgICAgIHk6IHRydWUsXG4gICAgICAgICAgaGVpZ2h0OiB0aGlzLm9wdGlvbnNIZWlnaHRcbiAgICAgICAgfSxcbiAgICAgICAgc2NvcGVkU2xvdHM6IHtcbiAgICAgICAgICBkZWZhdWx0OiAoKSA9PiBnZXRPcHRpb25zKGgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICBdKSA6IHZvaWQgMF1cbiAgICB9LFxuICAgIGdldEFmdGVyKGgpIHtcbiAgICAgIHJldHVybiBbaCgnc3ctaWNvbicsIHtcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICBuYW1lOiAna2V5Ym9hcmRfYXJyb3dfZG93bicsXG4gICAgICAgICAgc2l6ZTogJzIwcHgnXG4gICAgICAgIH0sXG4gICAgICAgIHN0YXRpY0NsYXNzOiAnY29sb3ItZ3JleSBob3Zlci1jb2xvci1wcmltYXJ5JyxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHRoaXMuZm9jdXNlZCA/ICdyb3RhdGUoMTgwZGVnKScgOiB2b2lkIDBcbiAgICAgICAgfVxuICAgICAgfSldXG4gICAgfSxcbiAgICBmb3JtYXRWYWx1ZShvcHRpb24sIG9wZSkge1xuICAgICAgbGV0IGR1cGxpY2F0ZWQgPSBmYWxzZVxuICAgICAgbGV0IHJlcyA9IFtdXG5cbiAgICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgIHRoaXMuaW5uZXJWYWx1ZS5mb3JFYWNoKHggPT4ge1xuICAgICAgICAgIGlmIChpc0RlZXBFcXVhbCh4LCB0aGlzLmdldFZhbHVlKG9wdGlvbikpKSB7XG4gICAgICAgICAgICBkdXBsaWNhdGVkID0gdHJ1ZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXMucHVzaCh4KVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSBpZiAob3BlID09PSAncmVtb3ZlJykgeyBkdXBsaWNhdGVkID0gdHJ1ZSB9XG4gICAgICBpZiAoIWR1cGxpY2F0ZWQpIHtcbiAgICAgICAgcmVzLnB1c2godGhpcy5nZXRWYWx1ZShvcHRpb24pKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc1xuICAgIH0sXG4gICAgY2hlY2tTZWxlY3RlZChvcHRpb24pIHtcbiAgICAgIHJldHVybiB0aGlzLmlubmVyVmFsdWUuc29tZSh4ID0+IGlzRGVlcEVxdWFsKHgsIHRoaXMuZ2V0VmFsdWUob3B0aW9uKSkpXG4gICAgfSxcbiAgICBnZXRFeGFjdFZhbHVlcyh2YWx1ZSkge1xuICAgICAgbGV0IHYgPSBBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlIDogW3ZhbHVlXVxuXG4gICAgICByZXR1cm4gdi5yZWR1Y2UoKGEsIGMpID0+IHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5zb21lKHggPT4gaXNEZWVwRXF1YWwodGhpcy5nZXRWYWx1ZSh4KSwgYykpKSB7XG4gICAgICAgICAgYS5wdXNoKGMpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFcbiAgICAgIH0sIFtdKVxuICAgIH0sXG4gICAgZ2V0RXhhY3RPcHRpb25zKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdmFsdWUucmVkdWNlKChhLCBjKSA9PiB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5mb3JFYWNoKHggPT4ge1xuICAgICAgICAgIGlmIChpc0RlZXBFcXVhbCh0aGlzLmdldFZhbHVlKHgpLCBjKSkge1xuICAgICAgICAgICAgYS5wdXNoKHgpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gYVxuICAgICAgfSwgW10pXG4gICAgfSxcbiAgICBnZXRWYWx1ZShvcHRpb24pIHtcbiAgICAgIHJldHVybiBpc09iamVjdChvcHRpb24pICYmIG9wdGlvbi5oYXNPd25Qcm9wZXJ0eSgndmFsdWUnKVxuICAgICAgICA/IG9wdGlvbi52YWx1ZSA6IG9wdGlvblxuICAgIH0sXG4gICAgZ2V0TmFtZShvcHRpb24pIHtcbiAgICAgIHJldHVybiBpc09iamVjdChvcHRpb24pICYmIG9wdGlvbi5oYXNPd25Qcm9wZXJ0eSgnbmFtZScpXG4gICAgICAgID8gb3B0aW9uLm5hbWUgOiBvcHRpb25cbiAgICB9XG4gIH1cbn1cbiAgIiwiaW1wb3J0IFNlbGVjdCBmcm9tICcuL3NyYy9tYWluLmpzJ1xuXG5jb25zdCBpbnN0YWxsID0gZnVuY3Rpb24gKFZ1ZSkge1xuICBWdWUuY29tcG9uZW50KFNlbGVjdC5uYW1lLCBTZWxlY3QpXG59XG5cblNlbGVjdC5pbnN0YWxsID0gaW5zdGFsbFxuXG5leHBvcnQgZGVmYXVsdCBTZWxlY3RcbiIsImltcG9ydCBJdGVtIGZyb20gJy4uLy4uL2l0ZW0nXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3N3QnV0dG9uJyxcbiAgY29tcG9uZW50czogeyBJdGVtIH0sXG4gIHByb3BzOiB7XG4gICAgdW5kZXJsaW5lZDogQm9vbGVhbixcbiAgICBib3JkZXJlZDogQm9vbGVhbixcbiAgICBmaWxsZWQ6IEJvb2xlYW4sXG4gICAgZGlzYWJsZWQ6IEJvb2xlYW4sXG4gICAgY29sb3I6IFN0cmluZyxcbiAgICBwcmltYXJ5OiBCb29sZWFuLFxuICAgIG5lZ2F0aXZlOiBCb29sZWFuLFxuICAgIHBvc2l0aXZlOiBCb29sZWFuLFxuICAgIHdhcm5pbmc6IEJvb2xlYW4sXG4gICAgcm91bmQ6IEJvb2xlYW4sXG4gICAgc2hhZG93OiBCb29sZWFuLFxuICAgIG1pbmk6IEJvb2xlYW4sXG4gICAgdG86IFN0cmluZyB8IE9iamVjdCxcbiAgICBjZW50ZXI6IEJvb2xlYW4sXG4gICAgZW5kOiBCb29sZWFuXG4gIH0sXG4gIGRhdGE6ICgpID0+ICh7fSksXG4gIHJlbmRlcihoKSB7XG4gICAgcmV0dXJuIGgoJ2J1dHRvbicsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiAnc3ctYnV0dG9uIGZsZXggbm8td3JhcCBpdGVtcy1jZW50ZXInLFxuICAgICAgc3R5bGU6IHtcbiAgICAgICAgY29sb3I6ICF0aGlzLmRpc2FibGVkICYmICF0aGlzLmZpbGxlZCAmJiB0aGlzLmNvbG9yIHx8IHZvaWQgMCxcbiAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiAhdGhpcy5kaXNhYmxlZCAmJiB0aGlzLmZpbGxlZCAmJiB0aGlzLmNvbG9yIHx8IHZvaWQgMFxuICAgICAgfSxcbiAgICAgIGNsYXNzOiB7XG4gICAgICAgIHVuZGVybGluZTogdGhpcy51bmRlcmxpbmVkLFxuICAgICAgICBib3JkZXI6IHRoaXMuYm9yZGVyZWQsXG4gICAgICAgIGZpbGw6IHRoaXMuZmlsbGVkLFxuICAgICAgICBwcmltYXJ5OiB0aGlzLnByaW1hcnksXG4gICAgICAgIG5lZ2F0aXZlOiB0aGlzLm5lZ2F0aXZlLFxuICAgICAgICBwb3NpdGl2ZTogdGhpcy5wb3NpdGl2ZSxcbiAgICAgICAgd2FybmluZzogdGhpcy53YXJuaW5nLFxuICAgICAgICBncmV5OiB0aGlzLmRpc2FibGVkLFxuICAgICAgICByb3VuZDogdGhpcy5yb3VuZCAmJiAhdGhpcy51bmRlcmxpbmVkLFxuICAgICAgICAnY29tbW9uLXNoYWRvdyc6IHRoaXMuc2hhZG93ICYmICh0aGlzLmJvcmRlcmVkIHx8IHRoaXMuZmlsbGVkKVxuICAgICAgfVxuICAgIH0sIFtcbiAgICAgIGgoJ3N3LWl0ZW0nLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiAnZmxleC1hdXRvJyxcbiAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAncm91bmQtc2xvdCc6IHRoaXMuJHNjb3BlZFNsb3RzLnJvdW5kLFxuICAgICAgICAgIG1pbmk6IHRoaXMubWluaVxuICAgICAgICB9LFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgIGN1cnNvcjogJ3BvaW50ZXInXG4gICAgICAgIH0sXG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgdG86IHRoaXMudG8sXG4gICAgICAgICAgY2VudGVyOiB0aGlzLmNlbnRlcixcbiAgICAgICAgICBlbmQ6IHRoaXMuZW5kLFxuICAgICAgICAgIGRpc2FibGVkOiB0aGlzLmRpc2FibGVkXG4gICAgICAgIH0sXG4gICAgICAgIG9uOiB0aGlzLmRpc2FibGVkID8gdm9pZCAwIDoge1xuICAgICAgICAgIC4uLnRoaXMuJGxpc3RlbmVyc1xuICAgICAgICB9LFxuICAgICAgICBzY29wZWRTbG90czogdGhpcy4kc2NvcGVkU2xvdHMucm91bmQgIT09IHZvaWQgMFxuICAgICAgICAgID8ge1xuICAgICAgICAgICAgZGVmYXVsdDogKCkgPT4gW2goJ2RpdicsIHtcbiAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6ICdmbGV4IG5vLXdyYXAgaXRlbXMtY2VudGVyIG1hcmdpbi1taW4gc3ctYnV0dG9uX19pbm5lciBmbGV4LWF1dG8nXG4gICAgICAgICAgICB9LCBbdGhpcy4kc2NvcGVkU2xvdHMucm91bmQoKV0pXVxuICAgICAgICAgIH0gOiB7XG4gICAgICAgICAgICBiZWZvcmU6IHRoaXMuJHNjb3BlZFNsb3RzLmJlZm9yZSAhPT0gdm9pZCAwXG4gICAgICAgICAgICAgID8gKCkgPT4gW2goJ2RpdicsIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogJ2ZsZXggbm8td3JhcCBpdGVtcy1jZW50ZXIgbWFyZ2luLW1pbiBzdy1idXR0b25fX2JlZm9yZSdcbiAgICAgICAgICAgICAgfSwgW3RoaXMuJHNjb3BlZFNsb3RzLmJlZm9yZSgpXSldIDogdm9pZCAwLFxuICBcbiAgICAgICAgICAgIGRlZmF1bHQ6IHRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQgIT09IHZvaWQgMFxuICAgICAgICAgICAgICA/ICgpID0+IFtoKCdkaXYnLCB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6ICdmbGV4IG5vLXdyYXAgaXRlbXMtY2VudGVyIG1hcmdpbi1taW4gc3ctYnV0dG9uX19pbm5lciBmbGV4LWF1dG8nXG4gICAgICAgICAgICAgIH0sIFt0aGlzLiRzY29wZWRTbG90cy5kZWZhdWx0KCldKV0gOiB2b2lkIDAsXG4gIFxuICAgICAgICAgICAgYWZ0ZXI6IHRoaXMuJHNjb3BlZFNsb3RzLmFmdGVyICE9PSB2b2lkIDBcbiAgICAgICAgICAgICAgPyAoKSA9PiBbaCgnZGl2Jywge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiAnZmxleCBuby13cmFwIGl0ZW1zLWNlbnRlciBtYXJnaW4tbWluIHN3LWJ1dHRvbl9fYWZ0ZXInXG4gICAgICAgICAgICAgIH0sIFt0aGlzLiRzY29wZWRTbG90cy5hZnRlcigpXSldIDogdm9pZCAwXG4gICAgICAgICAgfVxuICAgICAgfSlcbiAgICBdKVxuICB9XG59XG4gICIsImltcG9ydCBCdXR0b24gZnJvbSAnLi9zcmMvbWFpbi5qcydcblxuY29uc3QgaW5zdGFsbCA9IGZ1bmN0aW9uIChWdWUpIHtcbiAgVnVlLmNvbXBvbmVudChCdXR0b24ubmFtZSwgQnV0dG9uKVxufVxuXG5CdXR0b24uaW5zdGFsbCA9IGluc3RhbGxcblxuZXhwb3J0IGRlZmF1bHQgQnV0dG9uXG4iLCJpbXBvcnQgc3dCdXR0b24gZnJvbSAnLi4vLi4vYnV0dG9uJ1xuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnc3dNb2RhbCcsXG4gIGNvbXBvbmVudHM6IHtcbiAgICBzd0J1dHRvblxuICB9LFxuICBwcm9wczoge1xuICAgIHNob3c6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICB9LFxuICAgIHRpdGxlOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAn5Z+65pys55So5rOVdGl0bGUnXG4gICAgfSxcbiAgICB3aWR0aDoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJzQwJSdcbiAgICB9XG4gIH0sXG4gIGNvbXB1dGVkOiB7XG4gICAgc3R5bGUoKSB7XG4gICAgICBpZiAodGhpcy5zaG93KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgekluZGV4OiA5OTksXG4gICAgICAgICAgb3BhY2l0eTogMVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHpJbmRleDogLTEwLFxuICAgICAgICAgIG9wYWNpdHk6IDBcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGhhbmRsZUNhbmNlbCgpIHtcbiAgICAgIHRoaXMuJGVtaXQoJ2NhbmNlbCcpXG4gICAgfSxcbiAgICBoYW5kbGVDb25maXJtKCkge1xuICAgICAgdGhpcy4kZW1pdCgnY29uZmlybScpXG4gICAgfSxcbiAgfSxcbiAgcmVuZGVyKGgpIHtcbiAgICByZXR1cm4gaCgnZGl2Jyx7XG4gICAgICBzdGF0aWNDbGFzczogJ3N3LW1vZGFsLW1hc2snLFxuICAgICAgc3R5bGU6IHRoaXMuc3R5bGUsXG4gICAgICBvbjoge1xuICAgICAgICBjbGljazogdGhpcy5oYW5kbGVDYW5jZWxcbiAgICAgIH0gXG4gICAgfSwgWyBoKCdkaXYnLCB7IFxuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogJ3N3LW1vZGFsJyxcbiAgICAgICAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAgICAgICBzaG93TW9kYWw6IHRoaXMuc2hvdyxcbiAgICAgICAgICAgICAgICBoaWRlTW9kYWw6ICF0aGlzLnNob3dcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICB3aWR0aDogdGhpcy53aWR0aFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgIGNsaWNrOiBldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgWyB0aGlzLiRzY29wZWRTbG90cy5oZWFkZXIgPT09IHZvaWQgMCBcbiAgICAgICAgICAgICAgICA/IGgoJ2RpdicsIFxuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiAnc3ctbW9kYWwtdGl0bGUnXG4gICAgICAgICAgICAgICAgICAgICAgfSwgWyBoKCdzcGFuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6ICdzdy1tb2RhbC10aXRsZS10ZXh0J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGl0bGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgaCgnc3BhbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiAnc3ctbW9kYWwtY2xvc2UtaWNvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6ICgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVDYW5jZWwoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGgoJ2knLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiAnbWF0ZXJpYWwtaWNvbnMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdjbG9zZScpIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICA6IHRoaXMuJHNjb3BlZFNsb3RzLmhlYWRlcigpLFxuICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlZFNsb3RzLmNvbnRlbnQoKSxcbiAgICAgICAgICAgICAgICB0aGlzLiRzY29wZWRTbG90cy5mb290ZXIgPT09IHZvaWQgMCBcbiAgICAgICAgICAgICAgICA/IGgoJ2RpdicsIFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzczogJ3N3LW1vZGFsLWZvb3RlcidcbiAgICAgICAgICAgICAgICAgICAgfSwgXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICBoKCdzdy1idXR0b24nLHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiAnYnRuIGxlZnQtYnRuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiAoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVDYW5jZWwoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfSwgJ+WPlua2iCcpLFxuICAgICAgICAgICAgICAgICAgICAgIGgoJ3N3LWJ1dHRvbicse1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6ICdidG4gcmlnaHQtYnRuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiAoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVDb25maXJtKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH0sICfnoa7lrponKVxuICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgIDogdGhpcy4kc2NvcGVkU2xvdHMuZm9vdGVyXG4gICAgICAgICAgICAgIF0gICAgICAgICAgICAgIFxuICAgICAgICAgIClcbiAgICAgICAgXVxuICAgIClcbiAgfVxufSIsImltcG9ydCBNb2RhbCBmcm9tICcuL3NyYy9tYWluLmpzJ1xuXG5jb25zdCBpbnN0YWxsID0gZnVuY3Rpb24gKFZ1ZSkge1xuICBWdWUuY29tcG9uZW50KE1vZGFsLm5hbWUsIE1vZGFsKVxufVxuXG5Nb2RhbC5pbnN0YWxsID0gaW5zdGFsbFxuXG5leHBvcnQgZGVmYXVsdCBNb2RhbFxuIiwiaW1wb3J0IFZ1ZSBmcm9tICd2dWUnXG5cbmNvbnN0IGlzU2VydmVyID0gVnVlLnByb3RvdHlwZS4kaXNTZXJ2ZXI7XG5cbmV4cG9ydCBmdW5jdGlvbiBvZmZzZXQoZWwpIHtcbiAgaWYgKGVsID09PSB3aW5kb3cpIHtcbiAgICByZXR1cm4geyB0b3A6IDAsIGxlZnQ6IDAgfVxuICB9XG4gIGNvbnN0IHsgdG9wLCBsZWZ0IH0gPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuXG4gIHJldHVybiB7IHRvcCwgbGVmdCB9XG59XG4gIFxuZXhwb3J0IGZ1bmN0aW9uIHN0eWxlKGVsLCBwcm9wZXJ0eSkge1xuICByZXR1cm4gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwpLmdldFByb3BlcnR5VmFsdWUocHJvcGVydHkpXG59XG4gIFxuZXhwb3J0IGZ1bmN0aW9uIGhlaWdodChlbCkge1xuICByZXR1cm4gZWwgPT09IHdpbmRvd1xuICAgID8gd2luZG93LmlubmVySGVpZ2h0XG4gICAgOiBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHRcbn1cbiAgXG5leHBvcnQgZnVuY3Rpb24gd2lkdGgoZWwpIHtcbiAgcmV0dXJuIGVsID09PSB3aW5kb3dcbiAgICA/IHdpbmRvdy5pbm5lcldpZHRoXG4gICAgOiBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aFxufVxuICBcbmV4cG9ydCBmdW5jdGlvbiBjc3MoZWxlbWVudCwgY3NzKSB7XG4gIGxldCBzdHlsZSA9IGVsZW1lbnQuc3R5bGVcbiAgXG4gIE9iamVjdC5rZXlzKGNzcykuZm9yRWFjaChwcm9wID0+IHtcbiAgICBzdHlsZVtwcm9wXSA9IGNzc1twcm9wXVxuICB9KVxufVxuICBcbmV4cG9ydCBmdW5jdGlvbiBjc3NCYXRjaChlbGVtZW50cywgc3R5bGUpIHtcbiAgZWxlbWVudHMuZm9yRWFjaChlbCA9PiBjc3MoZWwsIHN0eWxlKSlcbn1cbiAgXG5leHBvcnQgZnVuY3Rpb24gcmVhZHkoZm4pIHtcbiAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVyblxuICB9XG4gIFxuICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSAhPT0gJ2xvYWRpbmcnKSB7XG4gICAgcmV0dXJuIGZuKClcbiAgfVxuICBcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZuLCBmYWxzZSlcbn1cblxuZXhwb3J0IGNvbnN0IG9uID0gKGZ1bmN0aW9uKCkge1xuICBpZiAoIWlzU2VydmVyICYmIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oZWxlbWVudCwgZXZlbnQsIGhhbmRsZXIpIHtcbiAgICAgIGlmIChlbGVtZW50ICYmIGV2ZW50ICYmIGhhbmRsZXIpIHtcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oZWxlbWVudCwgZXZlbnQsIGhhbmRsZXIpIHtcbiAgICAgIGlmIChlbGVtZW50ICYmIGV2ZW50ICYmIGhhbmRsZXIpIHtcbiAgICAgICAgZWxlbWVudC5hdHRhY2hFdmVudCgnb24nICsgZXZlbnQsIGhhbmRsZXIpO1xuICAgICAgfVxuICAgIH07XG4gIH1cbn0pKCk7XG5cbmV4cG9ydCBjb25zdCBvZmYgPSAoZnVuY3Rpb24oKSB7XG4gIGlmICghaXNTZXJ2ZXIgJiYgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcikge1xuICAgIHJldHVybiBmdW5jdGlvbihlbGVtZW50LCBldmVudCwgaGFuZGxlcikge1xuICAgICAgaWYgKGVsZW1lbnQgJiYgZXZlbnQpIHtcbiAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oZWxlbWVudCwgZXZlbnQsIGhhbmRsZXIpIHtcbiAgICAgIGlmIChlbGVtZW50ICYmIGV2ZW50KSB7XG4gICAgICAgIGVsZW1lbnQuZGV0YWNoRXZlbnQoJ29uJyArIGV2ZW50LCBoYW5kbGVyKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG59KSgpOyAgXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgb2Zmc2V0LFxuICBzdHlsZSxcbiAgaGVpZ2h0LFxuICB3aWR0aCxcbiAgY3NzLFxuICBjc3NCYXRjaCxcbiAgcmVhZHksXG4gIG9uLFxuICBvZmZcbn0iLCJpbXBvcnQgeyBvbiwgb2ZmIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvZG9tJyBcbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3N3UG9wb3ZlcicsXG4gIGRhdGEgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBwb3BvdmVyU3R5bGU6IHt9LFxuICAgICAgYXJyb3dTdHlsZToge30sXG4gICAgICBzaG93OiBmYWxzZSxcbiAgICAgIHJlZmVyZW5jZUVsbToge31cbiAgICB9XG4gIH0sXG4gIG1vZGVsOiB7XG4gICAgcHJvcDogJ3ZhbHVlJyxcbiAgICBldmVudDogJ3VwZGF0ZSdcbiAgfSxcbiAgcHJvcHM6IHtcbiAgICB2YWx1ZToge1xuICAgICAgdHlwZTogQm9vbGVhblxuICAgIH0sXG4gICAgdGl0bGU6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICB9LFxuICAgIGNvbnRlbnQ6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICB9LFxuICAgIHBsYWNlbWVudDoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ3RvcCdcbiAgICB9LFxuICAgIHRyaWdnZXI6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdjbGljaycsXG4gICAgICB2YWxpZGF0b3I6IHZhbHVlID0+IFsnY2xpY2snLCAnZm9jdXMnLCAnaG92ZXInLCAnbWFudWFsJ10uaW5kZXhPZih2YWx1ZSkgPiAtMVxuICAgIH0sXG4gICAgd2lkdGg6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICB9XG4gIH0sXG4gIGNvbXB1dGVkOiB7XG4gICAgc2hvd1ZhbHVlOiB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVcbiAgICAgIH0sXG4gICAgICBzZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIH1cbiAgICB9LFxuICAgIHNob3dTdHlsZSgpIHtcbiAgICAgIGlmICh0aGlzLnRyaWdnZXIgIT09ICdtYW51YWwnKSB7XG4gICAgICAgIGlmICh0aGlzLnNob3cpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgekluZGV4OiA5OTksXG4gICAgICAgICAgICBvcGFjaXR5OiAxXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB6SW5kZXg6IC0xMCxcbiAgICAgICAgICAgIG9wYWNpdHk6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLnNob3dWYWx1ZSkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB6SW5kZXg6IDk5OSxcbiAgICAgICAgICAgIG9wYWNpdHk6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHpJbmRleDogLTEwLFxuICAgICAgICAgICAgb3BhY2l0eTogMFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGdldFN0eWxlKHBvcG92ZXJFbG0sIHJlZmVyZW5jZUVsbSkge1xuICAgICAgc3dpdGNoICh0aGlzLnBsYWNlbWVudCkge1xuICAgICAgICBjYXNlICd0b3Atc3RhcnQnOlxuICAgICAgICAgIHRoaXMucG9wb3ZlclN0eWxlID0ge1xuICAgICAgICAgICAgdG9wOiAnLScgKyAocG9wb3ZlckVsbS5vZmZzZXRIZWlnaHQgKyAxMCkgKyAncHgnXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuYXJyb3dTdHlsZSA9IHtcbiAgICAgICAgICAgIGxlZnQ6IChyZWZlcmVuY2VFbG0ub2Zmc2V0V2lkdGggLyAyIC0gNSkgKyAncHgnXG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICd0b3AnOlxuICAgICAgICAgIHRoaXMucG9wb3ZlclN0eWxlID0ge1xuICAgICAgICAgICAgdG9wOiAnLScgKyAocG9wb3ZlckVsbS5vZmZzZXRIZWlnaHQgKyAxMCkgKyAncHgnLFxuICAgICAgICAgICAgbGVmdDogKHJlZmVyZW5jZUVsbS5vZmZzZXRXaWR0aCAtIHBvcG92ZXJFbG0ub2Zmc2V0V2lkdGgpIC8gMiArICdweCdcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5hcnJvd1N0eWxlID0ge1xuICAgICAgICAgICAgbGVmdDogKHBvcG92ZXJFbG0ub2Zmc2V0V2lkdGggLyAyIC0gNSkgKyAncHgnXG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgJ2JvdHRvbS1zdGFydCc6IFxuICAgICAgICAgIHRoaXMucG9wb3ZlclN0eWxlID0ge1xuICAgICAgICAgICAgdG9wOiAocmVmZXJlbmNlRWxtLm9mZnNldEhlaWdodCArIDEwKSArICdweCdcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5hcnJvd1N0eWxlID0ge1xuICAgICAgICAgICAgbGVmdDogKHJlZmVyZW5jZUVsbS5vZmZzZXRXaWR0aCAvIDIgLSA1KSArICdweCdcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWsgXG4gICAgICAgIGNhc2UgJ2JvdHRvbSc6XG4gICAgICAgICAgdGhpcy5wb3BvdmVyU3R5bGUgPSB7XG4gICAgICAgICAgICB0b3A6IChyZWZlcmVuY2VFbG0ub2Zmc2V0SGVpZ2h0ICsgMTApICsgJ3B4JyxcbiAgICAgICAgICAgIGxlZnQ6IChyZWZlcmVuY2VFbG0ub2Zmc2V0V2lkdGggLSBwb3BvdmVyRWxtLm9mZnNldFdpZHRoKSAvIDIgKyAncHgnXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuYXJyb3dTdHlsZSA9IHtcbiAgICAgICAgICAgIGxlZnQ6IChwb3BvdmVyRWxtLm9mZnNldFdpZHRoIC8gMiAtIDUpICsgJ3B4J1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlICdyaWdodC1zdGFydCc6XG4gICAgICAgICAgdGhpcy5wb3BvdmVyU3R5bGUgPSB7XG4gICAgICAgICAgICBsZWZ0OiAocmVmZXJlbmNlRWxtLm9mZnNldFdpZHRoICsgMTApICsgJ3B4JyxcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5hcnJvd1N0eWxlID0ge1xuICAgICAgICAgICAgdG9wOiAocmVmZXJlbmNlRWxtLm9mZnNldEhlaWdodCAvIDIgLSA1KSArICdweCdcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWsgIFxuICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgdGhpcy5wb3BvdmVyU3R5bGUgPSB7XG4gICAgICAgICAgICBsZWZ0OiAocmVmZXJlbmNlRWxtLm9mZnNldFdpZHRoICsgMTApICsgJ3B4JyxcbiAgICAgICAgICAgIHRvcDogKHJlZmVyZW5jZUVsbS5vZmZzZXRIZWlnaHQgLSBwb3BvdmVyRWxtLm9mZnNldEhlaWdodCkgLyAyICsgJ3B4J1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmFycm93U3R5bGUgPSB7XG4gICAgICAgICAgICB0b3A6IChwb3BvdmVyRWxtLm9mZnNldEhlaWdodCAvIDIgLSA1KSArICdweCdcbiAgICAgICAgICB9IFxuICAgICAgICAgIGJyZWFrIFxuICAgICAgICBjYXNlICdsZWZ0LXN0YXJ0JzpcbiAgICAgICAgICB0aGlzLnBvcG92ZXJTdHlsZSA9IHtcbiAgICAgICAgICAgIHJpZ2h0OiAocmVmZXJlbmNlRWxtLm9mZnNldFdpZHRoICsgMTApICsgJ3B4JyxcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5hcnJvd1N0eWxlID0ge1xuICAgICAgICAgICAgdG9wOiAocmVmZXJlbmNlRWxtLm9mZnNldEhlaWdodCAvIDIgLSA1KSArICdweCdcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgdGhpcy5wb3BvdmVyU3R5bGUgPSB7XG4gICAgICAgICAgICByaWdodDogKHJlZmVyZW5jZUVsbS5vZmZzZXRXaWR0aCArIDEwKSArICdweCcsXG4gICAgICAgICAgICB0b3A6IChyZWZlcmVuY2VFbG0ub2Zmc2V0SGVpZ2h0IC0gcG9wb3ZlckVsbS5vZmZzZXRIZWlnaHQpIC8gMiArICdweCdcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5hcnJvd1N0eWxlID0ge1xuICAgICAgICAgICAgdG9wOiAocG9wb3ZlckVsbS5vZmZzZXRIZWlnaHQgLyAyIC0gNSkgKyAncHgnXG4gICAgICAgICAgfSBcbiAgICAgICAgICBicmVhayAgICAgICAgXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSxcbiAgICBoYW5kbGVDbGljaygpIHtcbiAgICAgIHRoaXMuc2hvdyA9ICF0aGlzLnNob3dcbiAgICB9LFxuICAgIGhhbmRsZU1vdXNlRW50ZXIoKSB7XG4gICAgICB0aGlzLnNob3cgPSB0cnVlXG4gICAgfSxcbiAgICBoYW5kbGVNb3VzZUxlYXZlKCkge1xuICAgICAgdGhpcy5zaG93ID0gZmFsc2VcbiAgICB9LFxuICAgIGRvU2hvdygpIHtcbiAgICAgIHRoaXMuc2hvdyA9IHRydWVcbiAgICB9LFxuICAgIGRvQ2xvc2UoKSB7XG4gICAgICB0aGlzLnNob3cgPSBmYWxzZVxuICAgIH0sXG4gICAgaGFuZGxlTWFudWFsKCkge1xuICAgICAgdGhpcy5zaG93VmFsdWUgPSAhdGhpcy5zaG93VmFsdWVcbiAgICAgIHRoaXMuJGVtaXQoXCJ1cGRhdGVcIiwgdGhpcy5zaG93VmFsdWUpO1xuICAgIH1cbiAgfSxcbiAgbW91bnRlZCAoKSB7XG4gICAgbGV0IHBvcG92ZXJFbG0gPSB0aGlzLiRyZWZzLnBvcG92ZXJcbiAgICBsZXQgcmVmZXJlbmNlRWxtID0gdGhpcy5yZWZlcmVuY2VFbG0gPSB0aGlzLiRzY29wZWRTbG90cy5yZWZlcmVuY2UoKVswXS5lbG1cbiAgICB0aGlzLmdldFN0eWxlKHBvcG92ZXJFbG0sIHJlZmVyZW5jZUVsbSlcbiAgICBpZih0aGlzLnRyaWdnZXIgPT09ICdtYW51YWwnKXtcbiAgICAgIG9uKHJlZmVyZW5jZUVsbSwgJ2NsaWNrJywgdGhpcy5oYW5kbGVNYW51YWwpO1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGlmICh0aGlzLnRyaWdnZXIgPT09ICdjbGljaycpIHtcbiAgICAgIG9uKHJlZmVyZW5jZUVsbSwgJ2NsaWNrJywgdGhpcy5oYW5kbGVDbGljayk7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgaWYodGhpcy50cmlnZ2VyID09PSAnaG92ZXInKXtcbiAgICAgIG9uKHJlZmVyZW5jZUVsbSwgJ21vdXNlZW50ZXInLCB0aGlzLmhhbmRsZU1vdXNlRW50ZXIpXG4gICAgICBvbihyZWZlcmVuY2VFbG0sICdtb3VzZWxlYXZlJywgdGhpcy5oYW5kbGVNb3VzZUxlYXZlKTtcbiAgICB9XG4gICAgaWYodGhpcy50cmlnZ2VyID09PSAnZm9jdXMnKXtcbiAgICAgIGlmIChyZWZlcmVuY2VFbG0ucXVlcnlTZWxlY3RvcignaW5wdXQsIHRleHRhcmVhJykpIHtcbiAgICAgICAgb24ocmVmZXJlbmNlRWxtLCAnZm9jdXNpbicsIHRoaXMuZG9TaG93KTtcbiAgICAgICAgb24ocmVmZXJlbmNlRWxtLCAnZm9jdXNvdXQnLCB0aGlzLmRvQ2xvc2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb24ocmVmZXJlbmNlRWxtLCAnbW91c2Vkb3duJywgdGhpcy5kb1Nob3cpO1xuICAgICAgICBvbihyZWZlcmVuY2VFbG0sICdtb3VzZXVwJywgdGhpcy5kb0Nsb3NlKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGRlc3Ryb3llZCAoKSB7XG4gICAgY29uc3QgcmVmZXJlbmNlID0gdGhpcy5yZWZlcmVuY2VFbG07XG4gICAgb2ZmKHJlZmVyZW5jZSwgJ2NsaWNrJywgdGhpcy5oYW5kbGVDbGljayk7XG4gICAgb2ZmKHJlZmVyZW5jZSwgJ21vdXNldXAnLCB0aGlzLmRvQ2xvc2UpO1xuICAgIG9mZihyZWZlcmVuY2UsICdtb3VzZWRvd24nLCB0aGlzLmRvU2hvdyk7XG4gICAgb2ZmKHJlZmVyZW5jZSwgJ2ZvY3VzaW4nLCB0aGlzLmRvU2hvdyk7XG4gICAgb2ZmKHJlZmVyZW5jZSwgJ2ZvY3Vzb3V0JywgdGhpcy5kb0Nsb3NlKTtcbiAgICBvZmYocmVmZXJlbmNlLCAnbW91c2Vkb3duJywgdGhpcy5kb1Nob3cpO1xuICAgIG9mZihyZWZlcmVuY2UsICdtb3VzZXVwJywgdGhpcy5kb0Nsb3NlKTtcbiAgICBvZmYocmVmZXJlbmNlLCAnbW91c2VsZWF2ZScsIHRoaXMuaGFuZGxlTW91c2VMZWF2ZSk7XG4gICAgb2ZmKHJlZmVyZW5jZSwgJ21vdXNlZW50ZXInLCB0aGlzLmhhbmRsZU1vdXNlRW50ZXIpO1xuICAgIG9mZihkb2N1bWVudCwgJ2NsaWNrJywgdGhpcy5oYW5kbGVNYW51YWwpO1xuICB9LFxuICByZW5kZXIoaCkge1xuICAgIHJldHVybiBoKCdkaXYnLHtcbiAgICAgIGNsYXNzOiAnc3ctcG9wb3Zlci1jb250YWluJyxcbiAgICB9LCBbIGgoJ2RpdicsIFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogJ3N3LXBvcG92ZXInLFxuICAgICAgICAgICAgICBjbGFzczogJ3N3LXBvcG92ZXItc2hvdycsXG4gICAgICAgICAgICAgIHJlZjogJ3BvcG92ZXInLFxuICAgICAgICAgICAgICBzdHlsZTogT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHRoaXMucG9wb3ZlclN0eWxlLCB7d2lkdGg6IHRoaXMud2lkdGggfSksIHRoaXMuc2hvd1N0eWxlKVxuICAgICAgICB9LCBbIHRoaXMudGl0bGUgIFxuICAgICAgICAgICAgICA/IGgoJ2RpdicsIHtcbiAgICAgICAgICAgICAgICBjbGFzczogJ3N3LXBvcG92ZXItdGl0bGUnXG4gICAgICAgICAgICAgIH0sIHRoaXMudGl0bGUpXG4gICAgICAgICAgICAgIDogJycsIFxuICAgICAgICAgICAgIHRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQgPT09IHZvaWQgMFxuICAgICAgICAgICAgID8gaCgnZGl2Jywge1xuICAgICAgICAgICAgICAgIGNsYXNzOiAnc3ctcG9wb3Zlci1jb250ZW50J1xuICAgICAgICAgICAgIH0sIHRoaXMuY29udGVudCB8fCAnJyApXG4gICAgICAgICAgICAgIDogdGhpcy4kc2NvcGVkU2xvdHMuZGVmYXVsdCgpLFxuICAgICAgICAgICAgIGgoJ2Rpdicse1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctcG9wb3Zlci1hcnJvdycsXG4gICAgICAgICAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAgICAgICAnc3ctcG9wb3Zlci1hcnJvdy10b3AnOiB0aGlzLnBsYWNlbWVudC5pbmRleE9mKCd0b3AnKSA+PSAwID8gdHJ1ZSA6IGZhbHNlLFxuICAgICAgICAgICAgICAgICdzdy1wb3BvdmVyLWFycm93LWJvdHRvbSc6IHRoaXMucGxhY2VtZW50LmluZGV4T2YoJ2JvdHRvbScpID49IDAgPyB0cnVlIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgJ3N3LXBvcG92ZXItYXJyb3ctcmlnaHQnOiB0aGlzLnBsYWNlbWVudC5pbmRleE9mKCdyaWdodCcpID49IDAgPyB0cnVlIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgJ3N3LXBvcG92ZXItYXJyb3ctbGVmdCc6IHRoaXMucGxhY2VtZW50LmluZGV4T2YoJ2xlZnQnKSA+PSAwID8gdHJ1ZSA6IGZhbHNlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc3R5bGU6IHRoaXMuYXJyb3dTdHlsZVxuICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdKSwgXG4gICAgICAgIHRoaXMuJHNjb3BlZFNsb3RzLnJlZmVyZW5jZSA9PT0gdm9pZCAwIFxuICAgICAgICA/IGgoKVxuICAgICAgICA6IHRoaXMuJHNjb3BlZFNsb3RzLnJlZmVyZW5jZSgpXG4gICAgICBdKSBcbiAgfVxufSIsImltcG9ydCBQb3BvdmVyIGZyb20gJy4vc3JjL21haW4uanMnXG5cbmNvbnN0IGluc3RhbGwgPSBmdW5jdGlvbiAoVnVlKSB7XG4gIFZ1ZS5jb21wb25lbnQoTW9kYWwubmFtZSwgUG9wb3Zlcilcbn1cblxuUG9wb3Zlci5pbnN0YWxsID0gaW5zdGFsbFxuXG5leHBvcnQgZGVmYXVsdCBQb3BvdmVyXG4iLCJpbXBvcnQgSXRlbSBmcm9tICcuLi8uLi9pdGVtJ1xuaW1wb3J0IHsgaXNEZWVwRXF1YWwgfSBmcm9tICcuLi8uLi8uLi91dGlscy9pcydcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnc3dDaGVja2JveCcsXG4gIGNvbXBvbmVudHM6IHsgSXRlbSB9LFxuICBwcm9wczoge1xuICAgIHZhbHVlOiBCb29sZWFuIHwgQXJyYXksXG4gICAgdmFsOiB7XG4gICAgICByZXF1aXJlZDogZmFsc2VcbiAgICB9LFxuICAgIGxhYmVsOiBTdHJpbmcsXG4gICAgZGlzYWJsZWQ6IEJvb2xlYW4sXG4gICAgY29sb3I6IFN0cmluZyxcbiAgICBwcmltYXJ5OiBCb29sZWFuLFxuICAgIG5lZ2F0aXZlOiBCb29sZWFuLFxuICAgIHBvc2l0aXZlOiBCb29sZWFuLFxuICAgIHdhcm5pbmc6IEJvb2xlYW4sXG4gICAgbGVmdExhYmVsOiBCb29sZWFuLFxuICAgIGNvbG9yTGFiZWw6IEJvb2xlYW4sXG4gICAga2VlcENvbG9yOiBCb29sZWFuXG4gIH0sXG4gIGRhdGE6ICgpID0+ICh7XG4gICAgcGFyZW50OiB2b2lkIDBcbiAgfSksXG4gIGNvbXB1dGVkOiB7XG4gICAgbW9kZWwoKSB7XG4gICAgICByZXR1cm4gdGhpcy5wYXJlbnQgPT09IHZvaWQgMCA/IHRoaXMudmFsdWUgOiB0aGlzLnBhcmVudC52YWx1ZVxuICAgIH0sXG4gICAgcGFyZW50RGlzYWJsZWQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5wYXJlbnQgJiYgdGhpcy5wYXJlbnQuZGlzYWJsZWRcbiAgICB9LFxuICAgIGNoZWNrZWQ6IHtcbiAgICAgIGdldCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYm9vbGVhbk1vZGUgPyB0aGlzLm1vZGVsIDogdGhpcy5nZXRDaGVja2VkKHRoaXMudmFsKVxuICAgICAgfSxcbiAgICAgIHNldCh2YWwpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzLnBhcmVudCA9PT0gdm9pZCAwID8gdGhpcyA6IHRoaXMucGFyZW50XG5cbiAgICAgICAgc2VsZi4kZW1pdChcbiAgICAgICAgICAnaW5wdXQnLFxuICAgICAgICAgIHRoaXMuZm9ybWF0VmFsdWUodmFsKVxuICAgICAgICApXG4gICAgICB9XG4gICAgfSxcbiAgICBpbm5lclZhbHVlKCkge1xuICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkodGhpcy5tb2RlbCkgPyB0aGlzLm1vZGVsIDogW3RoaXMubW9kZWxdXG4gICAgfSxcbiAgICBib29sZWFuTW9kZSgpIHtcbiAgICAgIHJldHVybiB0aGlzLnZhbCA9PT0gdm9pZCAwXG4gICAgfVxuICB9LFxuICB3YXRjaDoge30sXG4gIG1ldGhvZHM6IHtcbiAgICBnZXRDaGVja2VkKHZhbCkge1xuICAgICAgcmV0dXJuIHRoaXMuaW5uZXJWYWx1ZS5zb21lKHggPT4gaXNEZWVwRXF1YWwoeCwgdmFsKSlcbiAgICB9LFxuICAgIGZvcm1hdFZhbHVlKGNoZWNrZWQpIHtcbiAgICAgIGlmICh0aGlzLmJvb2xlYW5Nb2RlKSB7IHJldHVybiBjaGVja2VkIH1cbiAgICAgIGxldCByZXMgPSBbXVxuXG4gICAgICB0aGlzLmlubmVyVmFsdWUuZm9yRWFjaCh4ID0+IHtcbiAgICAgICAgaWYgKCFpc0RlZXBFcXVhbCh4LCB0aGlzLnZhbCkpIHtcbiAgICAgICAgICByZXMucHVzaCh4KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgaWYgKGNoZWNrZWQpIHsgcmVzLnB1c2godGhpcy52YWwpIH1cbiAgICAgIHJldHVybiByZXNcbiAgICB9LFxuICB9LFxuICByZW5kZXIoaCkge1xuICAgIGxldCBjaGVja2VkID0gdGhpcy5jaGVja2VkXG4gICAgbGV0IGNvbG9yTGFiZWwgPSBjaGVja2VkICYmIHRoaXMuY29sb3JMYWJlbFxuICAgIGxldCBjb2xvckNoZWNrYm94ID0gY2hlY2tlZCB8fCB0aGlzLmtlZXBDb2xvclxuICAgIGxldCBnZXRMYWJlbCA9ICgpID0+IFtoKCdkaXYnLCB7XG4gICAgICBzdGF0aWNDbGFzczogJ3N3LWNoZWNrYm94X190ZXh0IG1hcmdpbi1taW4nLFxuICAgICAgY2xhc3M6IHtcbiAgICAgICAgJ2NvbG9yLXByaW1hcnknOiBjb2xvckxhYmVsID8gdGhpcy5wcmltYXJ5IDogdm9pZCAwLFxuICAgICAgICAnY29sb3ItbmVnYXRpdmUnOiBjb2xvckxhYmVsID8gdGhpcy5uZWdhdGl2ZSA6IHZvaWQgMCxcbiAgICAgICAgJ2NvbG9yLXBvc2l0aXZlJzogY29sb3JMYWJlbCA/IHRoaXMucG9zaXRpdmUgOiB2b2lkIDAsXG4gICAgICAgICdjb2xvci13YXJuaW5nJzogY29sb3JMYWJlbCA/IHRoaXMud2FybmluZyA6IHZvaWQgMFxuICAgICAgfSxcbiAgICAgIHN0eWxlOiB7XG4gICAgICAgIGNvbG9yOiBjb2xvckxhYmVsID8gdGhpcy5jb2xvciA6IHZvaWQgMFxuICAgICAgfVxuICAgIH0sIHRoaXMubGFiZWwpXVxuXG4gICAgcmV0dXJuIGgoJ3N3LWl0ZW0nLCB7XG4gICAgICBzdGF0aWNDbGFzczogJ3N3LWNoZWNrYm94JyxcbiAgICAgIHJlZjogJ2NoZWNrYm94JyxcbiAgICAgIGNsYXNzOiB7XG4gICAgICAgIGRpc2FibGU6IHRoaXMuZGlzYWJsZWQgfHwgdGhpcy5wYXJlbnREaXNhYmxlZFxuICAgICAgfSxcbiAgICAgIG5hdGl2ZU9uOiB0aGlzLmRpc2FibGVkID8gdm9pZCAwIDoge1xuICAgICAgICBjbGljazogKCkgPT4ge1xuICAgICAgICAgIHRoaXMuY2hlY2tlZCA9ICFjaGVja2VkXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzY29wZWRTbG90czoge1xuICAgICAgICBiZWZvcmU6IHRoaXMubGFiZWwgJiYgdGhpcy5sZWZ0TGFiZWwgPyBnZXRMYWJlbCA6IHZvaWQgMCxcbiAgICAgICAgZGVmYXVsdDogKCkgPT4gW2goJ3N3LWljb24nLCB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6ICdtYXJnaW4tbWluJyxcbiAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgb3BhY2l0eTogY2hlY2tlZCA/IDEgOiAwLjZcbiAgICAgICAgICB9LFxuICAgICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICBzaXplOiAnMjBweCcsXG4gICAgICAgICAgICBuYW1lOiBjaGVja2VkID8gJ2NoZWNrX2JveCcgOiAnY2hlY2tfYm94X291dGxpbmVfYmxhbmsnLFxuICAgICAgICAgICAgY29sb3I6IGNvbG9yQ2hlY2tib3ggPyB0aGlzLmNvbG9yIDogdm9pZCAwLFxuICAgICAgICAgICAgcHJpbWFyeTogY29sb3JDaGVja2JveCA/IHRoaXMucHJpbWFyeSA6IHZvaWQgMCxcbiAgICAgICAgICAgIG5lZ2F0aXZlOiBjb2xvckNoZWNrYm94ID8gdGhpcy5uZWdhdGl2ZSA6IHZvaWQgMCxcbiAgICAgICAgICAgIHBvc2l0aXZlOiBjb2xvckNoZWNrYm94ID8gdGhpcy5wb3NpdGl2ZSA6IHZvaWQgMCxcbiAgICAgICAgICAgIHdhcm5pbmc6IGNvbG9yQ2hlY2tib3ggPyB0aGlzLndhcm5pbmcgOiB2b2lkIDBcbiAgICAgICAgICB9XG4gICAgICAgIH0pXSxcbiAgICAgICAgYWZ0ZXI6IHRoaXMubGFiZWwgJiYgIXRoaXMubGVmdExhYmVsID8gZ2V0TGFiZWwgOiB2b2lkIDBcbiAgICAgIH1cbiAgICB9KVxuICB9XG59IiwiaW1wb3J0IENoZWNrYm94IGZyb20gJy4vc3JjL21haW4uanMnXG5cbmNvbnN0IGluc3RhbGwgPSBmdW5jdGlvbiAoVnVlKSB7XG4gIFZ1ZS5jb21wb25lbnQoQ2hlY2tib3gubmFtZSwgQ2hlY2tib3gpXG59XG5cbkNoZWNrYm94Lmluc3RhbGwgPSBpbnN0YWxsXG5cbmV4cG9ydCBkZWZhdWx0IENoZWNrYm94XG4iLCJcbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YTogKCkgPT4gKHt9KSxcbiAgd2F0Y2g6IHt9LFxuICBjb21wdXRlZDoge30sXG4gIG1ldGhvZHM6IHtcbiAgICBzaHV0dGxlKF90aGlzKSB7XG4gICAgICBsZXQgc2VsZiA9IF90aGlzIHx8IHRoaXNcblxuICAgICAgc2VsZi4kY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgIGlmIChjaGlsZC4kcmVmc1t0aGlzLnNodXR0bGVSZWZdICE9PSB2b2lkIDApIHtcbiAgICAgICAgICBjaGlsZC5wYXJlbnQgPSB0aGlzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zaHV0dGxlKGNoaWxkKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfSxcbiAgbW91bnRlZCgpIHtcbiAgICB0aGlzLnNodXR0bGUoKVxuICB9XG59XG4iLCJpbXBvcnQgRmllbGQgZnJvbSAnLi4vLi4vZmllbGQnXG5pbXBvcnQgU2h1dHRsZU1peGluIGZyb20gJy4uLy4uLy4uL21peGlucy9zaHV0dGxlJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdzd0NoZWNrYm94R3JvdXAnLFxuICBtaXhpbnM6IFtGaWVsZCwgU2h1dHRsZU1peGluXSwgLy8gZm9jdXNlZCxkaXNhYmxlZCxzaHV0dGxlUmVmXG4gIHByb3BzOiB7XG4gICAgdmFsdWU6IEJvb2xlYW4gfCBBcnJheVxuICB9LFxuICBkYXRhOiAoKSA9PiAoe1xuICAgIGlubmVyUG9pbnRlcjogdHJ1ZSxcbiAgICBzaHV0dGxlUmVmOiAnY2hlY2tib3gnXG4gIH0pLFxuICBjb21wdXRlZDoge30sXG4gIHdhdGNoOiB7fSxcbiAgbWV0aG9kczoge31cbn0iLCJpbXBvcnQgQ2hlY2tib3hHcm91cCBmcm9tICcuL3NyYy9tYWluLmpzJ1xuXG5jb25zdCBpbnN0YWxsID0gZnVuY3Rpb24gKFZ1ZSkge1xuICBWdWUuY29tcG9uZW50KENoZWNrYm94R3JvdXAubmFtZSwgQ2hlY2tib3hHcm91cClcbn1cblxuQ2hlY2tib3hHcm91cC5pbnN0YWxsID0gaW5zdGFsbFxuXG5leHBvcnQgZGVmYXVsdCBDaGVja2JveEdyb3VwXG4iLCJpbXBvcnQgSXRlbSBmcm9tICcuLi8uLi9pdGVtJ1xuaW1wb3J0IHsgaXNEZWVwRXF1YWwgfSBmcm9tICcuLi8uLi8uLi91dGlscy9pcydcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnc3dSYWRpbycsXG4gIGNvbXBvbmVudHM6IHsgSXRlbSB9LFxuICBwcm9wczoge1xuICAgIHZhbHVlOiB7fSxcbiAgICB2YWw6IHtcbiAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgfSxcbiAgICBsYWJlbDogU3RyaW5nLFxuICAgIGRpc2FibGVkOiBCb29sZWFuLFxuICAgIGNvbG9yOiBTdHJpbmcsXG4gICAgcHJpbWFyeTogQm9vbGVhbixcbiAgICBuZWdhdGl2ZTogQm9vbGVhbixcbiAgICBwb3NpdGl2ZTogQm9vbGVhbixcbiAgICB3YXJuaW5nOiBCb29sZWFuLFxuICAgIGxlZnRMYWJlbDogQm9vbGVhbixcbiAgICBjb2xvckxhYmVsOiBCb29sZWFuLFxuICAgIGtlZXBDb2xvcjogQm9vbGVhblxuICB9LFxuICBkYXRhOiAoKSA9PiAoe1xuICAgIHBhcmVudDogdm9pZCAwXG4gIH0pLFxuICBjb21wdXRlZDoge1xuICAgIG1vZGVsKCkge1xuICAgICAgcmV0dXJuIHRoaXMucGFyZW50ID09PSB2b2lkIDAgPyB0aGlzLnZhbHVlIDogdGhpcy5wYXJlbnQudmFsdWVcbiAgICB9LFxuICAgIHBhcmVudERpc2FibGVkKCkge1xuICAgICAgcmV0dXJuIHRoaXMucGFyZW50ICYmIHRoaXMucGFyZW50LmRpc2FibGVkXG4gICAgfSxcbiAgICBjaGVja2VkOiB7XG4gICAgICBnZXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENoZWNrZWQodGhpcy52YWwpXG4gICAgICB9LFxuICAgICAgc2V0KCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXMucGFyZW50ID09PSB2b2lkIDAgPyB0aGlzIDogdGhpcy5wYXJlbnRcblxuICAgICAgICBzZWxmLiRlbWl0KFxuICAgICAgICAgICdpbnB1dCcsXG4gICAgICAgICAgdGhpcy52YWxcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgd2F0Y2g6IHt9LFxuICBtZXRob2RzOiB7XG4gICAgZ2V0Q2hlY2tlZCh2YWwpIHtcbiAgICAgIHJldHVybiBpc0RlZXBFcXVhbCh0aGlzLm1vZGVsLCB2YWwpXG4gICAgfSxcbiAgfSxcbiAgcmVuZGVyKGgpIHtcbiAgICBsZXQgY2hlY2tlZCA9IHRoaXMuY2hlY2tlZFxuICAgIGxldCBjb2xvckxhYmVsID0gY2hlY2tlZCAmJiB0aGlzLmNvbG9yTGFiZWxcbiAgICBsZXQgY29sb3JSYWRpbyA9IGNoZWNrZWQgfHwgdGhpcy5rZWVwQ29sb3JcbiAgICBsZXQgZ2V0TGFiZWwgPSAoKSA9PiBbaCgnZGl2Jywge1xuICAgICAgc3RhdGljQ2xhc3M6ICdzdy1yYWRpb19fdGV4dCBtYXJnaW4tbWluJyxcbiAgICAgIGNsYXNzOiB7XG4gICAgICAgICdjb2xvci1wcmltYXJ5JzogY29sb3JMYWJlbCA/IHRoaXMucHJpbWFyeSA6IHZvaWQgMCxcbiAgICAgICAgJ2NvbG9yLW5lZ2F0aXZlJzogY29sb3JMYWJlbCA/IHRoaXMubmVnYXRpdmUgOiB2b2lkIDAsXG4gICAgICAgICdjb2xvci1wb3NpdGl2ZSc6IGNvbG9yTGFiZWwgPyB0aGlzLnBvc2l0aXZlIDogdm9pZCAwLFxuICAgICAgICAnY29sb3Itd2FybmluZyc6IGNvbG9yTGFiZWwgPyB0aGlzLndhcm5pbmcgOiB2b2lkIDBcbiAgICAgIH0sXG4gICAgICBzdHlsZToge1xuICAgICAgICBjb2xvcjogY29sb3JMYWJlbCA/IHRoaXMuY29sb3IgOiB2b2lkIDBcbiAgICAgIH1cbiAgICB9LCB0aGlzLmxhYmVsKV1cblxuICAgIHJldHVybiBoKCdzdy1pdGVtJywge1xuICAgICAgc3RhdGljQ2xhc3M6ICdzdy1yYWRpbycsXG4gICAgICByZWY6ICdyYWRpbycsXG4gICAgICBjbGFzczoge1xuICAgICAgICBkaXNhYmxlOiB0aGlzLmRpc2FibGVkIHx8IHRoaXMucGFyZW50RGlzYWJsZWRcbiAgICAgIH0sXG4gICAgICBuYXRpdmVPbjogdGhpcy5kaXNhYmxlZCA/IHZvaWQgMCA6IHtcbiAgICAgICAgY2xpY2s6ICgpID0+IHtcbiAgICAgICAgICBpZiAoY2hlY2tlZCkgeyByZXR1cm4gfVxuICAgICAgICAgIHRoaXMuY2hlY2tlZCA9IHRydWVcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHNjb3BlZFNsb3RzOiB7XG4gICAgICAgIGJlZm9yZTogdGhpcy5sYWJlbCAmJiB0aGlzLmxlZnRMYWJlbCA/IGdldExhYmVsIDogdm9pZCAwLFxuICAgICAgICBkZWZhdWx0OiAoKSA9PiBbaCgnc3ctaWNvbicsIHtcbiAgICAgICAgICBzdGF0aWNDbGFzczogJ21hcmdpbi1taW4nLFxuICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICBvcGFjaXR5OiBjaGVja2VkID8gMSA6IDAuNlxuICAgICAgICAgIH0sXG4gICAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIHNpemU6ICcyMHB4JyxcbiAgICAgICAgICAgIG5hbWU6IGNoZWNrZWQgPyAncmFkaW9fYnV0dG9uX2NoZWNrZWQnIDogJ3JhZGlvX2J1dHRvbl91bmNoZWNrZWQnLFxuICAgICAgICAgICAgY29sb3I6IGNvbG9yUmFkaW8gPyB0aGlzLmNvbG9yIDogdm9pZCAwLFxuICAgICAgICAgICAgcHJpbWFyeTogY29sb3JSYWRpbyA/IHRoaXMucHJpbWFyeSA6IHZvaWQgMCxcbiAgICAgICAgICAgIG5lZ2F0aXZlOiBjb2xvclJhZGlvID8gdGhpcy5uZWdhdGl2ZSA6IHZvaWQgMCxcbiAgICAgICAgICAgIHBvc2l0aXZlOiBjb2xvclJhZGlvID8gdGhpcy5wb3NpdGl2ZSA6IHZvaWQgMCxcbiAgICAgICAgICAgIHdhcm5pbmc6IGNvbG9yUmFkaW8gPyB0aGlzLndhcm5pbmcgOiB2b2lkIDBcbiAgICAgICAgICB9XG4gICAgICAgIH0pXSxcbiAgICAgICAgYWZ0ZXI6IHRoaXMubGFiZWwgJiYgIXRoaXMubGVmdExhYmVsID8gZ2V0TGFiZWwgOiB2b2lkIDBcbiAgICAgIH1cbiAgICB9KVxuICB9XG59IiwiaW1wb3J0IFJhZGlvIGZyb20gJy4vc3JjL21haW4uanMnXG5cbmNvbnN0IGluc3RhbGwgPSBmdW5jdGlvbiAoVnVlKSB7XG4gIFZ1ZS5jb21wb25lbnQoUmFkaW8ubmFtZSwgUmFkaW8pXG59XG5cblJhZGlvLmluc3RhbGwgPSBpbnN0YWxsXG5cbmV4cG9ydCBkZWZhdWx0IFJhZGlvXG4iLCJpbXBvcnQgRmllbGQgZnJvbSAnLi4vLi4vZmllbGQnXG5pbXBvcnQgU2h1dHRsZU1peGluIGZyb20gJy4uLy4uLy4uL21peGlucy9zaHV0dGxlJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdzd1JhZGlvR3JvdXAnLFxuICBtaXhpbnM6IFtGaWVsZCwgU2h1dHRsZU1peGluXSwgLy8gZm9jdXNlZCxkaXNhYmxlZCxzaHV0dGxlUmVmXG4gIHByb3BzOiB7XG4gICAgdmFsdWU6IHtcbiAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgfVxuICB9LFxuICBkYXRhOiAoKSA9PiAoe1xuICAgIGlubmVyUG9pbnRlcjogdHJ1ZSxcbiAgICBzaHV0dGxlUmVmOiAncmFkaW8nXG4gIH0pLFxuICBjb21wdXRlZDoge30sXG4gIHdhdGNoOiB7fSxcbiAgbWV0aG9kczoge31cbn0iLCJpbXBvcnQgUmFkaW9Hcm91cCBmcm9tICcuL3NyYy9tYWluLmpzJ1xuXG5jb25zdCBpbnN0YWxsID0gZnVuY3Rpb24gKFZ1ZSkge1xuICBWdWUuY29tcG9uZW50KFJhZGlvR3JvdXAubmFtZSwgUmFkaW9Hcm91cClcbn1cblxuUmFkaW9Hcm91cC5pbnN0YWxsID0gaW5zdGFsbFxuXG5leHBvcnQgZGVmYXVsdCBSYWRpb0dyb3VwXG4iLCIvKipcbiAqXG4gKlxuICogQHBhcmFtIHsqfSB0b3RhbCAg5YiG6aG15oC75pWwXG4gKiBAcGFyYW0geyp9IGN1ciAg5b2T5YmN6aG16Z2iICAzXG4gKiBAcGFyYW0geyp9IGFyb3VuZCAgIDEgMiAzIDQgNSAgIGFyb3VuZCA9IDJcbiAqIEByZXR1cm5zXG4gKi9cbmNvbnN0IG1ha2VSZXN1bHQgPSAodG90YWwsY3VyLGFyb3VuZCkgPT4ge1xuICBsZXQgcmVzdWx0ID0gW107XG4gIGxldCBiYXNlQ291bnQgPSBhcm91bmQgKiAyICsgMSArIDIgKyAyICsgMjsgLy/mgLvlhbHlhYPntKDkuKrmlbBcbiAgbGV0IHN1cnBsdXMgPSBiYXNlQ291bnQgLSA0OyAvL+WPquWHuueOsOS4gOS4quecgeeVpeWPtyDliankvZnlhYPntKDkuKrmlbBcbiAgbGV0IHN0YXJ0UG9zaXRpb24gPSAxICsgMiArIGFyb3VuZCxlbmRQb3NpdGlvbiA9IHRvdGFsIC0gMiAtIGFyb3VuZDtcblxuICBpZih0b3RhbCA8PSBiYXNlQ291bnQgLSAyKXsgLy/lhajpg6jmmL7npLog5LiN5Ye6546w55yB55Wl5Y+3XG4gICAgICByZXN1bHQgPSAgQXJyYXkuZnJvbSh7bGVuZ3RoOiB0b3RhbH0sICh2LCBpKSA9PiBpICsgMSk7XG4gIH1lbHNleyAvL+mcgOimgeWHuueOsOecgeeVpeWPt1xuICAgICAgaWYoY3VyIDw9IHN0YXJ0UG9zaXRpb24peyAvLzEu5Y+q5pyJ5ZCO6Z2i5Ye6546w55yB55Wl5Y+3XG4gICAgICAgICAgcmVzdWx0ID0gWy4uLkFycmF5LmZyb20oe2xlbmd0aDogc3VycGx1c30sICh2LCBpKSA9PiBpICsgMSksXCLCt8K3wrdcIix0b3RhbF1cbiAgICAgIH1lbHNlIGlmKGN1ciA+PSBlbmRQb3NpdGlvbikgeyAvLzIu5Y+q5pyJ5YmN6L655Ye6546w55yB55Wl5Y+3XG4gICAgICAgICAgcmVzdWx0ID0gWzEsJ8K3wrfCtycsLi4uQXJyYXkuZnJvbSh7bGVuZ3RoOiBzdXJwbHVzfSwgKHYsIGkpID0+IHRvdGFsIC0gc3VycGx1cyArIGkgKyAxKV1cbiAgICAgIH1lbHNleyAvLzMu5Lik6L656YO95pyJ55yB55Wl5Y+3XG4gICAgICAgICAgcmVzdWx0ID0gWzEsJ8K3wrfCtycsLi4uQXJyYXkuZnJvbSh7bGVuZ3RoOiBhcm91bmQgKiAyICsgMX0sICh2LCBpKSA9PiBjdXIgLSBhcm91bmQgKyBpKSwnwrfCt8K3Jyx0b3RhbF1cbiAgICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHRcbn1cblxuZXhwb3J0IGRlZmF1bHQgbWFrZVJlc3VsdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cInN3LXBhZ2luYXRpb25cIj5cbiAgICA8ZGl2IGNsYXNzPVwic3ctcGFnaW5hdGlvbi10b3RhbFwiIHYtaWY9XCJsYXlvdXQuaW5kZXhPZigndG90YWwnKSA+IC0xXCI+IFxuICAgICAge3tg5YWxJHt0b3RhbH3mnaFgfX1cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwic3ctcGFnaW5hdGlvbi1zZWxlY3RcIiB2LWlmPVwibGF5b3V0LmluZGV4T2YoJ3NlbGVjdCcpID4gLTFcIj5cbiAgICAgIDxzdy1zZWxlY3Qgdi1tb2RlbD1cInBhZ2VTaXplVmFsdWVcIiA6b3B0aW9ucz1cInNlbGVjdE9wdGlvblwiIHNlbGVjdGVkRmlsbGVkIGJvcmRlcmVkIG1pbmkgc2VsZWN0ZWRTdHlsZT1cIm5vbmVcIj48L3N3LXNlbGVjdD5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwic3ctcGFnaW5hdGlvbi1wYWdlXCI+XG4gICAgICA8c3BhbiBjbGFzcz1cInN3LXBhZ2luYXRpb24tcGFnZS1pdGVtXCIgQGNsaWNrPVwiaGFuZGxlQ2xpY2tBcnJvdygnbGVmdCcpXCI+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29ucyBzdy1wYWdpbmF0aW9uLXBhZ2UtaXRlbS1pY29uXCI+a2V5Ym9hcmRfYXJyb3dfbGVmdDwvaT48L3NwYW4+XG4gICAgICA8c3BhbiB2LWZvcj1cIihpdGVtLCBpbmRleCkgaW4gcGFnaW5hdGlvbkxpc3RcIiA6Y2xhc3M9XCJbJ3N3LXBhZ2luYXRpb24tcGFnZS1pdGVtJywgY3VycmVudFBhZ2VWYWx1ZSA9PT0gaXRlbSA/ICdhY3RpdmUnIDogJyddXCIgQGNsaWNrPVwiaGFuZGxlQ2xpY2tQYWdlKGl0ZW0sIGluZGV4KVwiPlxuICAgICAgICA8aSB2LWlmPVwiaXRlbSA9PT0gJ8K3wrfCtydcIiBjbGFzcz1cIm1hdGVyaWFsLWljb25zIHN3LXBhZ2luYXRpb24tcGFnZS1pdGVtLWljb25cIj5tb3JlX2hvcml6PC9pPlxuICAgICAgICA8c3BhbiB2LWVsc2U+XG4gICAgICAgICAge3tpdGVtfX1cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJzdy1wYWdpbmF0aW9uLXBhZ2UtaXRlbVwiIEBjbGljaz1cImhhbmRsZUNsaWNrQXJyb3coJ3JpZ2h0JylcIj48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zIHN3LXBhZ2luYXRpb24tcGFnZS1pdGVtLWljb25cIj5rZXlib2FyZF9hcnJvd19yaWdodDwvaT48L3NwYW4+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInN3LXBhZ2luYXRpb24tZ290b1wiIHYtaWY9XCJsYXlvdXQuaW5kZXhPZignZ290bycpID4gLTFcIj5cbiAgICAgIDxzcGFuPuWJjeW+gDwvc3Bhbj5cbiAgICAgIDxkaXYgY2xhc3M9XCJzdy1wYWdpbmF0aW9uLWdvdG8taW5wdXRcIj5cbiAgICAgICAgPHN3LWlucHV0IGJvcmRlcmVkIHYtbW9kZWw9J2lucHV0VmFsdWUnIEBrZXl1cC5lbnRlci5uYXRpdmU9XCJoYW5kbGVFbnRlckdvdG9cIiBtaW5pIHN0eWxlPVwid2lkdGg6NDBweFwiPjwvc3ctaW5wdXQ+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxzcGFuPumhtTwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IHN3U2VsZWN0IGZyb20gJy4uLy4uL3NlbGVjdC9pbmRleCdcbmltcG9ydCBtYWtlUmVzdWx0IGZyb20gJy4vcGFnaW5hdGlvbidcbmltcG9ydCBzd0lucHV0IGZyb20gJy4uLy4uL2lucHV0L2luZGV4J1xuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnc3dQYWdpbmF0aW9uJyxcbiAgZGF0YSAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGN1cnJlbnRQYWdlVmFsdWU6IHRoaXMuY3VycmVudFBhZ2UsXG4gICAgICBwYWdlVG90YWw6ICcnLFxuICAgICAgcGFnZVNpemVWYWx1ZTogdGhpcy5wYWdlU2l6ZSxcbiAgICAgIGlucHV0VmFsdWU6ICcxJ1xuICAgIH1cbiAgfSxcbiAgcHJvcHM6IHtcbiAgICB0b3RhbDoge1xuICAgICAgdHlwZTogTnVtYmVyXG4gICAgfSxcbiAgICBwYWdlU2l6ZToge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgZGVmYXVsdDogMjBcbiAgICB9LFxuICAgIG9wdGlvbnM6IHtcbiAgICAgIHR5cGU6IEFycmF5LFxuICAgICAgZGVmYXVsdDogWzIwLCA0MCwgNjAsIDgwXVxuICAgIH0sXG4gICAgY3VycmVudFBhZ2U6IHtcbiAgICAgIHR5cGU6IE51bWJlclxuICAgIH0sXG4gICAgYXJvdW5kOiB7XG4gICAgICB0eXBlOiBOdW1iZXJcbiAgICB9LFxuICAgIGxheW91dDoge1xuICAgICAgdHlwZTogU3RyaW5nXG4gICAgfVxuICB9LFxuICB3YXRjaDoge1xuICAgIGN1cnJlbnRQYWdlVmFsdWUoKSB7XG4gICAgICB0aGlzLiRlbWl0KCdjdXJyZW50LWNoYW5nZScsIHRoaXMuY3VycmVudFBhZ2VWYWx1ZSlcbiAgICB9LFxuICAgIHBhZ2VTaXplVmFsdWUoKSB7XG4gICAgICB0aGlzLiRlbWl0KCdzaXplLWNoYW5nZScsIHRoaXMucGFnZVNpemVWYWx1ZSlcbiAgICB9XG4gIH0sXG4gIGNvbXB1dGVkOiB7XG4gICAgc2VsZWN0T3B0aW9uKCkge1xuICAgICAgbGV0IGFyeSA9IFtdXG4gICAgICB0aGlzLm9wdGlvbnMubWFwKGk9PntcbiAgICAgICAgbGV0IGl0ZW0gPSB7fVxuICAgICAgICBpdGVtLm5hbWUgPSBgJHtpfeadoS/pobVgXG4gICAgICAgIGl0ZW0udmFsdWUgPSBpXG4gICAgICAgIGFyeS5wdXNoKGl0ZW0pXG4gICAgICB9KVxuICAgICAgcmV0dXJuIGFyeVxuICAgIH0sXG4gICAgcGFnaW5hdGlvbkxpc3QoKSB7XG4gICAgICBsZXQgcGFnZVRvdGFsID0gdGhpcy5wYWdlVG90YWwgPSB0aGlzLnRvdGFsIC8gdGhpcy5wYWdlU2l6ZVZhbHVlXG4gICAgICBpZiAoYCR7cGFnZVRvdGFsfWAuaW5kZXhPZignLicpID4gLTEpIHtcbiAgICAgICAgcGFnZVRvdGFsID0gdGhpcy5wYWdlVG90YWwgPSBwYXJzZUludChwYWdlVG90YWwgKyAxKVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMuY3VycmVudFBhZ2VWYWx1ZSA+IHBhZ2VUb3RhbCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRQYWdlVmFsdWUgPSBwYWdlVG90YWxcbiAgICAgIH1cbiAgICAgIGxldCBwYWdlTGlzdCA9IG1ha2VSZXN1bHQocGFnZVRvdGFsLCB0aGlzLmN1cnJlbnRQYWdlVmFsdWUsIHRoaXMuYXJvdW5kKVxuICAgICAgcmV0dXJuIHBhZ2VMaXN0XG4gICAgfVxuICB9LFxuICBjb21wb25lbnRzOiB7XG4gICAgc3dTZWxlY3QsXG4gICAgc3dJbnB1dFxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgaGFuZGxlRW50ZXJHb3RvKCkge1xuICAgICAgbGV0IHBhZ2UgPSBwYXJzZUludCh0aGlzLmlucHV0VmFsdWUpXG4gICAgICBpZiAocGFnZSA8IDEpIHtcbiAgICAgICAgdGhpcy5pbnB1dFZhbHVlID0gJzEnXG4gICAgICB9XG4gICAgICBpZiAocGFnZSA+IHRoaXMucGFnZVRvdGFsKSB7XG4gICAgICAgIHRoaXMuaW5wdXRWYWx1ZSA9IGAke3RoaXMucGFnZVRvdGFsfWBcbiAgICAgIH1cbiAgICAgIHRoaXMuY3VycmVudFBhZ2VWYWx1ZSA9IHBhcnNlSW50KHRoaXMuaW5wdXRWYWx1ZSlcbiAgICAgIHRoaXMuaW5wdXRWYWx1ZSA9IGAke3BhcnNlSW50KHRoaXMuaW5wdXRWYWx1ZSl9YFxuICAgIH0sXG4gICAgaGFuZGxlQ2xpY2tQYWdlKGl0ZW0sIGluZGV4KXtcbiAgICAgIGlmIChpdGVtID09PSAnwrfCt8K3Jykge1xuICAgICAgICBpZihpbmRleCA9PT0gMSl7XG4gICAgICAgICAgdGhpcy5jdXJyZW50UGFnZVZhbHVlID0gM1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY3VycmVudFBhZ2VWYWx1ZSA9IHRoaXMucGFnZVRvdGFsIC0gMlxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmN1cnJlbnRQYWdlVmFsdWUgPSBpdGVtXG4gICAgICB9XG4gICAgfSxcbiAgICBoYW5kbGVDbGlja0Fycm93KHBhcmFtcykge1xuICAgICAgaWYgKHBhcmFtcyA9PT0gJ2xlZnQnKSB7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRQYWdlVmFsdWUgIT09IDEpIHtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRQYWdlVmFsdWUgPSB0aGlzLmN1cnJlbnRQYWdlVmFsdWUgLSAxXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIHRoaXMuY3VycmVudFBhZ2VWYWx1ZSA9IDFcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFBhZ2VWYWx1ZSAhPT0gdGhpcy5wYWdlVG90YWwpIHtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRQYWdlVmFsdWUgPSB0aGlzLmN1cnJlbnRQYWdlVmFsdWUgKyAxXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jdXJyZW50UGFnZVZhbHVlID0gdGhpcy5wYWdlVG90YWxcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cblxuPC9zdHlsZT5cbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gbm9ybWFsaXplQ29tcG9uZW50KHRlbXBsYXRlLCBzdHlsZSwgc2NyaXB0LCBzY29wZUlkLCBpc0Z1bmN0aW9uYWxUZW1wbGF0ZSwgbW9kdWxlSWRlbnRpZmllclxuLyogc2VydmVyIG9ubHkgKi9cbiwgc2hhZG93TW9kZSwgY3JlYXRlSW5qZWN0b3IsIGNyZWF0ZUluamVjdG9yU1NSLCBjcmVhdGVJbmplY3RvclNoYWRvdykge1xuICBpZiAodHlwZW9mIHNoYWRvd01vZGUgIT09ICdib29sZWFuJykge1xuICAgIGNyZWF0ZUluamVjdG9yU1NSID0gY3JlYXRlSW5qZWN0b3I7XG4gICAgY3JlYXRlSW5qZWN0b3IgPSBzaGFkb3dNb2RlO1xuICAgIHNoYWRvd01vZGUgPSBmYWxzZTtcbiAgfSAvLyBWdWUuZXh0ZW5kIGNvbnN0cnVjdG9yIGV4cG9ydCBpbnRlcm9wLlxuXG5cbiAgdmFyIG9wdGlvbnMgPSB0eXBlb2Ygc2NyaXB0ID09PSAnZnVuY3Rpb24nID8gc2NyaXB0Lm9wdGlvbnMgOiBzY3JpcHQ7IC8vIHJlbmRlciBmdW5jdGlvbnNcblxuICBpZiAodGVtcGxhdGUgJiYgdGVtcGxhdGUucmVuZGVyKSB7XG4gICAgb3B0aW9ucy5yZW5kZXIgPSB0ZW1wbGF0ZS5yZW5kZXI7XG4gICAgb3B0aW9ucy5zdGF0aWNSZW5kZXJGbnMgPSB0ZW1wbGF0ZS5zdGF0aWNSZW5kZXJGbnM7XG4gICAgb3B0aW9ucy5fY29tcGlsZWQgPSB0cnVlOyAvLyBmdW5jdGlvbmFsIHRlbXBsYXRlXG5cbiAgICBpZiAoaXNGdW5jdGlvbmFsVGVtcGxhdGUpIHtcbiAgICAgIG9wdGlvbnMuZnVuY3Rpb25hbCA9IHRydWU7XG4gICAgfVxuICB9IC8vIHNjb3BlZElkXG5cblxuICBpZiAoc2NvcGVJZCkge1xuICAgIG9wdGlvbnMuX3Njb3BlSWQgPSBzY29wZUlkO1xuICB9XG5cbiAgdmFyIGhvb2s7XG5cbiAgaWYgKG1vZHVsZUlkZW50aWZpZXIpIHtcbiAgICAvLyBzZXJ2ZXIgYnVpbGRcbiAgICBob29rID0gZnVuY3Rpb24gaG9vayhjb250ZXh0KSB7XG4gICAgICAvLyAyLjMgaW5qZWN0aW9uXG4gICAgICBjb250ZXh0ID0gY29udGV4dCB8fCAvLyBjYWNoZWQgY2FsbFxuICAgICAgdGhpcy4kdm5vZGUgJiYgdGhpcy4kdm5vZGUuc3NyQ29udGV4dCB8fCAvLyBzdGF0ZWZ1bFxuICAgICAgdGhpcy5wYXJlbnQgJiYgdGhpcy5wYXJlbnQuJHZub2RlICYmIHRoaXMucGFyZW50LiR2bm9kZS5zc3JDb250ZXh0OyAvLyBmdW5jdGlvbmFsXG4gICAgICAvLyAyLjIgd2l0aCBydW5Jbk5ld0NvbnRleHQ6IHRydWVcblxuICAgICAgaWYgKCFjb250ZXh0ICYmIHR5cGVvZiBfX1ZVRV9TU1JfQ09OVEVYVF9fICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjb250ZXh0ID0gX19WVUVfU1NSX0NPTlRFWFRfXztcbiAgICAgIH0gLy8gaW5qZWN0IGNvbXBvbmVudCBzdHlsZXNcblxuXG4gICAgICBpZiAoc3R5bGUpIHtcbiAgICAgICAgc3R5bGUuY2FsbCh0aGlzLCBjcmVhdGVJbmplY3RvclNTUihjb250ZXh0KSk7XG4gICAgICB9IC8vIHJlZ2lzdGVyIGNvbXBvbmVudCBtb2R1bGUgaWRlbnRpZmllciBmb3IgYXN5bmMgY2h1bmsgaW5mZXJlbmNlXG5cblxuICAgICAgaWYgKGNvbnRleHQgJiYgY29udGV4dC5fcmVnaXN0ZXJlZENvbXBvbmVudHMpIHtcbiAgICAgICAgY29udGV4dC5fcmVnaXN0ZXJlZENvbXBvbmVudHMuYWRkKG1vZHVsZUlkZW50aWZpZXIpO1xuICAgICAgfVxuICAgIH07IC8vIHVzZWQgYnkgc3NyIGluIGNhc2UgY29tcG9uZW50IGlzIGNhY2hlZCBhbmQgYmVmb3JlQ3JlYXRlXG4gICAgLy8gbmV2ZXIgZ2V0cyBjYWxsZWRcblxuXG4gICAgb3B0aW9ucy5fc3NyUmVnaXN0ZXIgPSBob29rO1xuICB9IGVsc2UgaWYgKHN0eWxlKSB7XG4gICAgaG9vayA9IHNoYWRvd01vZGUgPyBmdW5jdGlvbiAoKSB7XG4gICAgICBzdHlsZS5jYWxsKHRoaXMsIGNyZWF0ZUluamVjdG9yU2hhZG93KHRoaXMuJHJvb3QuJG9wdGlvbnMuc2hhZG93Um9vdCkpO1xuICAgIH0gOiBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgICAgc3R5bGUuY2FsbCh0aGlzLCBjcmVhdGVJbmplY3Rvcihjb250ZXh0KSk7XG4gICAgfTtcbiAgfVxuXG4gIGlmIChob29rKSB7XG4gICAgaWYgKG9wdGlvbnMuZnVuY3Rpb25hbCkge1xuICAgICAgLy8gcmVnaXN0ZXIgZm9yIGZ1bmN0aW9uYWwgY29tcG9uZW50IGluIHZ1ZSBmaWxlXG4gICAgICB2YXIgb3JpZ2luYWxSZW5kZXIgPSBvcHRpb25zLnJlbmRlcjtcblxuICAgICAgb3B0aW9ucy5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXJXaXRoU3R5bGVJbmplY3Rpb24oaCwgY29udGV4dCkge1xuICAgICAgICBob29rLmNhbGwoY29udGV4dCk7XG4gICAgICAgIHJldHVybiBvcmlnaW5hbFJlbmRlcihoLCBjb250ZXh0KTtcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGluamVjdCBjb21wb25lbnQgcmVnaXN0cmF0aW9uIGFzIGJlZm9yZUNyZWF0ZSBob29rXG4gICAgICB2YXIgZXhpc3RpbmcgPSBvcHRpb25zLmJlZm9yZUNyZWF0ZTtcbiAgICAgIG9wdGlvbnMuYmVmb3JlQ3JlYXRlID0gZXhpc3RpbmcgPyBbXS5jb25jYXQoZXhpc3RpbmcsIGhvb2spIDogW2hvb2tdO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzY3JpcHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbm9ybWFsaXplQ29tcG9uZW50O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bm9ybWFsaXplLWNvbXBvbmVudC5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGlzT2xkSUUgPSB0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiAvbXNpZSBbNi05XVxcXFxiLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSk7XG5mdW5jdGlvbiBjcmVhdGVJbmplY3Rvcihjb250ZXh0KSB7XG4gIHJldHVybiBmdW5jdGlvbiAoaWQsIHN0eWxlKSB7XG4gICAgcmV0dXJuIGFkZFN0eWxlKGlkLCBzdHlsZSk7XG4gIH07XG59XG52YXIgSEVBRCA9IGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcbnZhciBzdHlsZXMgPSB7fTtcblxuZnVuY3Rpb24gYWRkU3R5bGUoaWQsIGNzcykge1xuICB2YXIgZ3JvdXAgPSBpc09sZElFID8gY3NzLm1lZGlhIHx8ICdkZWZhdWx0JyA6IGlkO1xuICB2YXIgc3R5bGUgPSBzdHlsZXNbZ3JvdXBdIHx8IChzdHlsZXNbZ3JvdXBdID0ge1xuICAgIGlkczogbmV3IFNldCgpLFxuICAgIHN0eWxlczogW11cbiAgfSk7XG5cbiAgaWYgKCFzdHlsZS5pZHMuaGFzKGlkKSkge1xuICAgIHN0eWxlLmlkcy5hZGQoaWQpO1xuICAgIHZhciBjb2RlID0gY3NzLnNvdXJjZTtcblxuICAgIGlmIChjc3MubWFwKSB7XG4gICAgICAvLyBodHRwczovL2RldmVsb3Blci5jaHJvbWUuY29tL2RldnRvb2xzL2RvY3MvamF2YXNjcmlwdC1kZWJ1Z2dpbmdcbiAgICAgIC8vIHRoaXMgbWFrZXMgc291cmNlIG1hcHMgaW5zaWRlIHN0eWxlIHRhZ3Mgd29yayBwcm9wZXJseSBpbiBDaHJvbWVcbiAgICAgIGNvZGUgKz0gJ1xcbi8qIyBzb3VyY2VVUkw9JyArIGNzcy5tYXAuc291cmNlc1swXSArICcgKi8nOyAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxuXG4gICAgICBjb2RlICs9ICdcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LCcgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3MubWFwKSkpKSArICcgKi8nO1xuICAgIH1cblxuICAgIGlmICghc3R5bGUuZWxlbWVudCkge1xuICAgICAgc3R5bGUuZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICBzdHlsZS5lbGVtZW50LnR5cGUgPSAndGV4dC9jc3MnO1xuICAgICAgaWYgKGNzcy5tZWRpYSkgc3R5bGUuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ21lZGlhJywgY3NzLm1lZGlhKTtcbiAgICAgIEhFQUQuYXBwZW5kQ2hpbGQoc3R5bGUuZWxlbWVudCk7XG4gICAgfVxuXG4gICAgaWYgKCdzdHlsZVNoZWV0JyBpbiBzdHlsZS5lbGVtZW50KSB7XG4gICAgICBzdHlsZS5zdHlsZXMucHVzaChjb2RlKTtcbiAgICAgIHN0eWxlLmVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gc3R5bGUuc3R5bGVzLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGluZGV4ID0gc3R5bGUuaWRzLnNpemUgLSAxO1xuICAgICAgdmFyIHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY29kZSk7XG4gICAgICB2YXIgbm9kZXMgPSBzdHlsZS5lbGVtZW50LmNoaWxkTm9kZXM7XG4gICAgICBpZiAobm9kZXNbaW5kZXhdKSBzdHlsZS5lbGVtZW50LnJlbW92ZUNoaWxkKG5vZGVzW2luZGV4XSk7XG4gICAgICBpZiAobm9kZXMubGVuZ3RoKSBzdHlsZS5lbGVtZW50Lmluc2VydEJlZm9yZSh0ZXh0Tm9kZSwgbm9kZXNbaW5kZXhdKTtlbHNlIHN0eWxlLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGV4dE5vZGUpO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZUluamVjdG9yO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YnJvd3Nlci5qcy5tYXBcbiIsImltcG9ydCBQYWdpbmF0aW9uIGZyb20gJy4vc3JjL21haW4udnVlJ1xuXG5jb25zdCBpbnN0YWxsID0gZnVuY3Rpb24gKFZ1ZSkge1xuICBWdWUuY29tcG9uZW50KFBhZ2luYXRpb24ubmFtZSwgUGFnaW5hdGlvbilcbn1cblxuUGFnaW5hdGlvbi5pbnN0YWxsID0gaW5zdGFsbFxuXG5leHBvcnQgZGVmYXVsdCBQYWdpbmF0aW9uXG4iLCJcbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YTogKCkgPT4gKHtcbiAgICBvYnNlcnZlcjogdm9pZCAwLFxuICAgIG1lYXN1cmVkV2lkdGg6IHZvaWQgMFxuICB9KSxcbiAgY29tcHV0ZWQ6IHtcbiAgICB0YXJnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5ob3Jpem9udGFsID8gJ3dpZHRoJyA6ICdoZWlnaHQnXG4gICAgfSxcbiAgICBtZWFzdXJlVGFyZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuaG9yaXpvbnRhbCA/ICdvZmZzZXRXaWR0aCcgOiAnb2Zmc2V0SGVpZ2h0J1xuICAgIH0sXG4gICAgbWluU2l6ZSgpIHtcbiAgICAgIHJldHVybiB0aGlzLm1pbiAhPT0gdm9pZCAwID8gYCR7dGhpcy5taW59cHhgIDogMFxuICAgIH1cbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGluaXRTdHlsZSgpIHtcbiAgICAgIGlmICh0aGlzLmlubmVyQ29sbGFwc2VkKSB7XG4gICAgICAgIHRoaXMuJHJlZnMuc2xpZGUuc3R5bGVbdGhpcy50YXJnZXRdID0gdGhpcy5taW5TaXplXG4gICAgICB9XG4gICAgfSxcbiAgICBzZXRTdHlsZShwYXNzaXZlKSB7XG4gICAgICBsZXQgc2xpZGVUYXJnZXQgPSB0aGlzLiRyZWZzLnNsaWRlXG5cbiAgICAgIGlmIChwYXNzaXZlKSB7XG4gICAgICAgIGlmIChzbGlkZVRhcmdldC5zdHlsZVt0aGlzLnRhcmdldF0gJiYgIXRoaXMuaW5uZXJDb2xsYXBzZWQpIHtcbiAgICAgICAgICBzbGlkZVRhcmdldC5zdHlsZVt0aGlzLnRhcmdldF0gPSBudWxsXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBzbGlkZVRhcmdldC5zdHlsZVt0aGlzLnRhcmdldF0gPSBgJHt0aGlzLiRyZWZzLm9ic2VydmVbdGhpcy5tZWFzdXJlVGFyZ2V0XX1weGBcbiAgICAgIGlmICh0aGlzLmlubmVyQ29sbGFwc2VkKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHNsaWRlVGFyZ2V0LnN0eWxlW3RoaXMudGFyZ2V0XSA9IHRoaXMubWluU2l6ZVxuICAgICAgICB9LCAwKVxuICAgICAgfVxuICAgIH0sXG4gICAgY2xlYXJVcHBlclN0eWxlKHVwcGVyKSB7XG4gICAgICBsZXQgdXBwZXJTbGlkZVRhcmdldCA9IHVwcGVyLiRyZWZzLnNsaWRlXG5cbiAgICAgIGlmICh1cHBlclNsaWRlVGFyZ2V0KSB7XG4gICAgICAgIGlmICh1cHBlclNsaWRlVGFyZ2V0LnN0eWxlW3RoaXMudGFyZ2V0XSkge1xuICAgICAgICAgIHVwcGVyU2xpZGVUYXJnZXQuc3R5bGVbdGhpcy50YXJnZXRdID0gbnVsbFxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodXBwZXIuJHBhcmVudCAmJiB1cHBlci4kcGFyZW50LiRyZWZzKSB7XG4gICAgICAgIHRoaXMuY2xlYXJVcHBlclN0eWxlKHVwcGVyLiRwYXJlbnQpXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBtb3VudGVkKCkge1xuICAgIGlmICghdGhpcy4kcmVmcy5zbGlkZSB8fCAhdGhpcy4kcmVmcy5vYnNlcnZlKSB7IHJldHVybiB9XG4gICAgdGhpcy4kd2F0Y2goXG4gICAgICAnaW5uZXJDb2xsYXBzZWQnLFxuICAgICAgKCkgPT4ge1xuICAgICAgICB0aGlzLmNsZWFyVXBwZXJTdHlsZSh0aGlzLiRwYXJlbnQpXG4gICAgICAgIHRoaXMuc2V0U3R5bGUoKVxuICAgICAgfSlcbiAgICB0aGlzLmluaXRTdHlsZSgpXG4gICAgdGhpcy5vYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgIHRoaXMuc2V0U3R5bGUodHJ1ZSlcbiAgICB9KVxuXG4gICAgdGhpcy5vYnNlcnZlci5vYnNlcnZlKHRoaXMuJHJlZnMub2JzZXJ2ZSwge1xuICAgICAgYXR0cmlidXRlczogdHJ1ZSxcbiAgICAgIGF0dHJpYnV0ZUZpbHRlcjogWydtdXRhdGUnXSxcbiAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgIHN1YnRyZWU6IHRydWUsXG4gICAgICBjaGFyYWN0ZXJEYXRhOiB0cnVlXG4gICAgfSlcbiAgfSxcbiAgYmVmb3JlRGVzdHJveSgpIHtcbiAgICB0aGlzLm9ic2VydmVyICYmIHRoaXMub2JzZXJ2ZXIuZGlzY29ubmVjdCgpXG4gIH1cbn1cbiAgIiwiaW1wb3J0IFNsaWRlT2JzZXJ2ZXIgZnJvbSAnLi4vLi4vLi4vbWl4aW5zL3NsaWRlT2JzZXJ2ZXInXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3N3U2xpZGUnLFxuICBtaXhpbnM6IFtTbGlkZU9ic2VydmVyXSxcbiAgcHJvcHM6IHtcbiAgICBjb2xsYXBzZWQ6IEJvb2xlYW4sXG4gICAgaG9yaXpvbnRhbDogQm9vbGVhbixcbiAgICBmaXQ6IEJvb2xlYW4sXG4gICAgbWluOiBOdW1iZXIgfCBTdHJpbmdcbiAgfSxcbiAgZGF0YTogKCkgPT4gKHtcbiAgICBpbm5lckNvbGxhcHNlZDogdHJ1ZVxuICB9KSxcbiAgd2F0Y2g6IHtcbiAgICBjb2xsYXBzZWQ6IHtcbiAgICAgIGhhbmRsZXIoKSB7XG4gICAgICAgIHRoaXMuaW5uZXJDb2xsYXBzZWQgPSB0aGlzLmNvbGxhcHNlZFxuICAgICAgfSxcbiAgICAgIGltbWVkaWF0ZTogdHJ1ZVxuICAgIH1cbiAgfSxcbiAgcmVuZGVyKGgpIHtcbiAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgcmVmOiAnc2xpZGUnLFxuICAgICAgc3RhdGljQ2xhc3M6ICdzdy1zbGlkZV9fY29udGFpbmVyJyxcbiAgICB9LCBbXG4gICAgICBoKCdkaXYnLCB7XG4gICAgICAgIHJlZjogJ29ic2VydmUnLFxuICAgICAgICBzdGF0aWNDbGFzczogYHN3LXNsaWRlX19jb250ZW50YCxcbiAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAnbWluLXdpZHRoJzogdGhpcy5ob3Jpem9udGFsICYmICF0aGlzLmZpdCxcbiAgICAgICAgICAnZml0LXdpZHRoJzogdGhpcy5ob3Jpem9udGFsICYmIHRoaXMuZml0LFxuICAgICAgICAgICdtaW4taGVpZ2h0JzogIXRoaXMuaG9yaXpvbnRhbCAmJiAhdGhpcy5maXQsXG4gICAgICAgICAgJ2ZpdC1oZWlnaHQnOiAhdGhpcy5ob3Jpem9udGFsICYmIHRoaXMuZml0XG4gICAgICAgIH1cbiAgICAgIH0sIFt0aGlzLiRzY29wZWRTbG90cy5kZWZhdWx0KCldKVxuICAgIF0pXG4gIH1cbn0iLCJpbXBvcnQgU2xpZGUgZnJvbSAnLi9zcmMvbWFpbi5qcydcblxuY29uc3QgaW5zdGFsbCA9IGZ1bmN0aW9uIChWdWUpIHtcbiAgVnVlLmNvbXBvbmVudChTbGlkZS5uYW1lLCBTbGlkZSlcbn1cblxuU2xpZGUuaW5zdGFsbCA9IGluc3RhbGxcblxuZXhwb3J0IGRlZmF1bHQgU2xpZGVcbiIsImltcG9ydCBTbGlkZSBmcm9tICcuLi8uLi9zbGlkZSdcbmltcG9ydCB7IGlzU3RyaW5nQ29udGFpbiB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2lzJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdzd0Jhc2ljSXRlbScsXG4gIGNvbXBvbmVudHM6IHsgU2xpZGUgfSxcbiAgcHJvcHM6IHtcbiAgICBjb250ZW50OiBTdHJpbmcsXG4gICAgc3ViQ29udGVudDogU3RyaW5nLFxuICAgIGljb246IFN0cmluZyxcbiAgICBkaXNhYmxlZDogQm9vbGVhbixcbiAgICBmaWxsZWQ6IEJvb2xlYW4sXG4gICAgY29sb3I6IFN0cmluZyxcbiAgICBwcmltYXJ5OiBCb29sZWFuLFxuICAgIG5lZ2F0aXZlOiBCb29sZWFuLFxuICAgIHBvc2l0aXZlOiBCb29sZWFuLFxuICAgIHdhcm5pbmc6IEJvb2xlYW4sXG4gICAgY29sbGFwc2VkOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgIH0sXG4gICAgc3BsaXQ6IEJvb2xlYW4sXG4gICAgbWluaTogQm9vbGVhbixcbiAgICB0bzogU3RyaW5nIHwgT2JqZWN0LFxuICAgIGluZGVudExldmVsOiBOdW1iZXIgfCBTdHJpbmcsXG4gICAgY2VudGVyOiBCb29sZWFuLFxuICAgIGVuZDogQm9vbGVhbixcbiAgICBtYXNrOiBPYmplY3QgfCBCb29sZWFuLFxuICAgIHJpcHBsZTogT2JqZWN0IHwgQm9vbGVhbixcbiAgICBzdWI6IEFycmF5LFxuICAgIGFjdGl2ZTogQm9vbGVhbixcbiAgICBjYWxsYmFjazogRnVuY3Rpb24sXG4gICAgc3ViRmlsdGVyOiBTdHJpbmcsXG4gICAgc3ViVGFnOiBCb29sZWFuXG4gIH0sXG4gIGRhdGE6ICgpID0+ICh7XG4gICAgaW5uZXJBY3RpdmU6IGZhbHNlLFxuICAgIGlubmVyQ29sbGFwc2VkOiB0cnVlLFxuICAgIGNvbGxhcHNlZEJlZm9yZTogdHJ1ZSxcbiAgICBtb3VzZW92ZXI6IGZhbHNlLFxuICAgIGhpZGU6IGZhbHNlXG4gIH0pLFxuICBtZXRob2RzOiB7XG4gICAgc3ViRmlsdGVyQ2hhbmdlKHJlc3RvcmUsIHJlbWVtYmVyKSB7XG4gICAgICBjb25zdCBpc1N1YkNvbnRhaW4gPSBzdWIgPT4ge1xuICAgICAgICBsZXQgY29udGFpbiA9IGZhbHNlXG4gIFxuICAgICAgICBjb250YWluID0gc3ViLnNvbWUoeCA9PiB7XG4gICAgICAgICAgaWYgKHguc3ViKSB7XG4gICAgICAgICAgICByZXR1cm4gaXNTdWJDb250YWluKHguc3ViKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gaXNTdHJpbmdDb250YWluKHguY29udGVudCwgdGhpcy5zdWJGaWx0ZXIpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gY29udGFpblxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5zdWIgPT09IHZvaWQgMCkge1xuICAgICAgICB0aGlzLmhpZGUgPSAhaXNTdHJpbmdDb250YWluKHRoaXMuY29udGVudCwgdGhpcy5zdWJGaWx0ZXIpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAocmVzdG9yZSkge1xuICAgICAgICAgIHRoaXMuaW5uZXJDb2xsYXBzZWQgPSB0aGlzLmNvbGxhcHNlZEJlZm9yZVxuICAgICAgICAgIHRoaXMuaGlkZSA9IGZhbHNlXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlbWVtYmVyKSB7XG4gICAgICAgICAgdGhpcy5jb2xsYXBzZWRCZWZvcmUgPSB0aGlzLmlubmVyQ29sbGFwc2VkXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbm5lckNvbGxhcHNlZCA9IGZhbHNlXG4gICAgICAgIHRoaXMuaGlkZSA9IHRoaXMuc3ViVGFnICYmICFpc1N1YkNvbnRhaW4odGhpcy5zdWIpXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBjcmVhdGVkKCkge1xuICAgIGlmICh0aGlzLmNvbGxhcHNlZCAhPT0gdm9pZCAwKSB7XG4gICAgICB0aGlzLiR3YXRjaCgnY29sbGFwc2VkJywgdiA9PiB7XG4gICAgICAgIHRoaXMuaW5uZXJDb2xsYXBzZWQgPSB0aGlzLmNvbGxhcHNlZEJlZm9yZSA9IHYgPT09IHZvaWQgMCA/IHRydWUgOiB2XG4gICAgICB9LCB7IGltbWVkaWF0ZTogdHJ1ZSB9KVxuICAgICAgdGhpcy4kd2F0Y2goJ2lubmVyQ29sbGFwc2VkJywgdiA9PiB7XG4gICAgICAgIHRoaXMuJGVtaXQoJ3VwZGF0ZTpjb2xsYXBzZWQnLCB2KVxuICAgICAgfSwgeyBpbW1lZGlhdGU6IHRydWUgfSlcbiAgICB9XG4gICAgaWYgKHRoaXMuc3ViICE9PSB2b2lkIDApIHtcbiAgICAgIHRoaXMuJG9uKCd1cGRhdGU6Y29sbGFwc2VkJywgKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnN1YilcbiAgICAgIH0sIHsgaW1tZWRpYXRlOiB0cnVlIH0pXG4gICAgfVxuICAgIGlmICh0aGlzLmNvbnRlbnQgIT09IHZvaWQgMCAmJiB0aGlzLnN1YkZpbHRlciAhPT0gdm9pZCAwKSB7XG4gICAgICB0aGlzLiR3YXRjaCgnc3ViRmlsdGVyJywgKHYsIG92KSA9PiB7XG4gICAgICAgIHRoaXMuc3ViRmlsdGVyQ2hhbmdlKHYgPT09ICcnLCBvdiA9PT0gJycpXG4gICAgICB9LCB7IGltbWVkaWF0ZTogdHJ1ZSB9KVxuICAgIH1cbiAgICBpZiAodGhpcy5hY3RpdmUgIT09IHZvaWQgMCkge1xuICAgICAgdGhpcy4kd2F0Y2goJ2FjdGl2ZScsIHYgPT4ge1xuICAgICAgICB0aGlzLmlubmVyQWN0aXZlID0gdlxuICAgICAgfSwgeyBpbW1lZGlhdGU6IHRydWUgfSlcbiAgICB9XG4gIH0sXG4gIHJlbmRlcihoKSB7XG4gICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiAnc3ctYmFzaWMtaXRlbScsXG4gICAgICBhdHRyczoge1xuICAgICAgICBtdXRhdGU6IHRoaXMuaGlkZVxuICAgICAgfSxcbiAgICAgIGNsYXNzOiB7XG4gICAgICAgIHNwbGl0OiB0aGlzLnNwbGl0ICYmICF0aGlzLmlubmVyQ29sbGFwc2VkLFxuICAgICAgICBoaWRlOiB0aGlzLmhpZGVcbiAgICAgIH1cbiAgICB9LCBbXG4gICAgICBoKCdkaXYnLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctYmFzaWMtaXRlbV9fbWFpbicsXG4gICAgICAgIGNsYXNzOiB0aGlzLmRpc2FibGVkID8gJ2Rpc2FibGUnIDoge1xuICAgICAgICAgICdjb2xvci1wcmltYXJ5JzogIXRoaXMuZmlsbGVkICYmIHRoaXMucHJpbWFyeSxcbiAgICAgICAgICAnY29sb3ItbmVnYXRpdmUnOiAhdGhpcy5maWxsZWQgJiYgdGhpcy5uZWdhdGl2ZSxcbiAgICAgICAgICAnY29sb3ItcG9zaXRpdmUnOiAhdGhpcy5maWxsZWQgJiYgdGhpcy5wb3NpdGl2ZSxcbiAgICAgICAgICAnY29sb3Itd2FybmluZyc6ICF0aGlzLmZpbGxlZCAmJiB0aGlzLndhcm5pbmcsXG4gICAgICAgICAgJ2JnLXByaW1hcnknOiB0aGlzLmZpbGxlZCAmJiB0aGlzLnByaW1hcnksXG4gICAgICAgICAgJ2JnLW5lZ2F0aXZlJzogdGhpcy5maWxsZWQgJiYgdGhpcy5uZWdhdGl2ZSxcbiAgICAgICAgICAnYmctcG9zaXRpdmUnOiB0aGlzLmZpbGxlZCAmJiB0aGlzLnBvc2l0aXZlLFxuICAgICAgICAgICdiZy13YXJuaW5nJzogdGhpcy5maWxsZWQgJiYgdGhpcy53YXJuaW5nLFxuICAgICAgICAgICdiZy1kYXJrIGNvbG9yLXdoaXRlJzogdGhpcy5maWxsZWRcbiAgICAgICAgfSxcbiAgICAgICAgc3R5bGU6IHRoaXMuZGlzYWJsZWQgPyB2b2lkIDAgOiB7XG4gICAgICAgICAgY29sb3I6ICF0aGlzLmZpbGxlZCAmJiB0aGlzLmNvbG9yLFxuICAgICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogdGhpcy5maWxsZWQgJiYgdGhpcy5jb2xvclxuICAgICAgICB9XG4gICAgICB9LCBbXG4gICAgICAgIGgoJ3N3LWl0ZW0nLCB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1iYXNpYy1pdGVtX19pbm5lcicsXG4gICAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIHRvOiAhdGhpcy5jYWxsYmFjayAmJiB0aGlzLnRvIHx8IHZvaWQgMCxcbiAgICAgICAgICAgIGNlbnRlcjogdGhpcy5jZW50ZXIsXG4gICAgICAgICAgICBlbmQ6IHRoaXMuZW5kLFxuICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuZGlzYWJsZWQsXG4gICAgICAgICAgICBtYXNrOiB0aGlzLm1hc2ssXG4gICAgICAgICAgICByaXBwbGU6IHRoaXMucmlwcGxlLFxuICAgICAgICAgICAgYWN0aXZlOiB0aGlzLmlubmVyQWN0aXZlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjbGFzczoge1xuICAgICAgICAgICAgZXhwYW5kOiAhdGhpcy5pbm5lckNvbGxhcHNlZFxuICAgICAgICAgIH0sXG4gICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICdtaW4taGVpZ2h0JzogdGhpcy5taW5pID8gJzM2cHgnIDogJzQ4cHgnLFxuICAgICAgICAgICAgJ3BhZGRpbmctbGVmdCc6IGAke3RoaXMuaW5kZW50TGV2ZWwgKiAxMn1weGAsXG4gICAgICAgICAgICBjdXJzb3I6ICF0aGlzLmRpc2FibGVkICYmICh0aGlzLnRvICE9PSB2b2lkIDAgfHwgdGhpcy5jYWxsYmFjayAhPT0gdm9pZCAwIHx8IHRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQgfHwgdGhpcy5zdWIgIT09IHZvaWQgMCkgPyAncG9pbnRlcicgOiB2b2lkIDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uOiB0aGlzLmRpc2FibGVkID8gdm9pZCAwIDoge1xuICAgICAgICAgICAgLi4udGhpcy4kbGlzdGVuZXJzLFxuICAgICAgICAgICAgY2xpY2s6ICgpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQgfHwgdGhpcy5zdWIgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5uZXJDb2xsYXBzZWQgPSAhdGhpcy5pbm5lckNvbGxhcHNlZFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoaXMuY2FsbGJhY2sgJiYgdGhpcy5jYWxsYmFjayh0aGlzKVxuICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdjbGljaycpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbW91c2VvdmVyOiAoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMubW91c2VvdmVyID0gdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1vdXNlb3V0OiAoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMubW91c2VvdmVyID0gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIHNjb3BlZFNsb3RzOiB7XG4gICAgICAgICAgICBiZWZvcmU6IHRoaXMuJHNjb3BlZFNsb3RzLmJlZm9yZSAhPT0gdm9pZCAwID8gdGhpcy4kc2NvcGVkU2xvdHMuYmVmb3JlXG4gICAgICAgICAgICAgIDogdGhpcy5pY29uICE9PSB2b2lkIDAgPyAoKSA9PiBbaCgnc3ctaWNvbicsIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWJhc2ljLWl0ZW1fX2ljb24nLFxuICAgICAgICAgICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLmljb25cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXSA6IHZvaWQgMCxcbiAgXG4gICAgICAgICAgICBkZWZhdWx0OiAoKSA9PiBbaCgnZGl2Jywge1xuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWJhc2ljLWl0ZW1fX2NvbnRlbnQgZmxleCBpdGVtcy1jZW50ZXInLFxuICAgICAgICAgICAgICBjbGFzczoge1xuICAgICAgICAgICAgICAgICdzcGFjZS1sZWZ0JzogdGhpcy4kc2NvcGVkU2xvdHMuYmVmb3JlICE9PSB2b2lkIDAgfHwgdGhpcy5pY29uICE9PSB2b2lkIDAsXG4gICAgICAgICAgICAgICAgJ3NwYWNlLXJpZ2h0JzogKHRoaXMuJHNjb3BlZFNsb3RzLmFmdGVyICE9PSB2b2lkIDAgfHwgdGhpcy4kc2NvcGVkU2xvdHMuZGVmYXVsdCAhPT0gdm9pZCAwIHx8IHRoaXMuc3ViICE9PSB2b2lkIDApICYmICh0aGlzLiRzY29wZWRTbG90cy5jb250ZW50ICE9PSB2b2lkIDAgfHwgdGhpcy5jb250ZW50ICE9PSB2b2lkIDAgfHwgdGhpcy5zdWJDb250ZW50ICE9PSB2b2lkIDApXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIHRoaXMuJHNjb3BlZFNsb3RzLmNvbnRlbnQgIT09IHZvaWQgMCA/IFt0aGlzLiRzY29wZWRTbG90cy5jb250ZW50KCldIDogW1xuICAgICAgICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6ICdkZWZhdWx0LWNvbnRlbnQnXG4gICAgICAgICAgICAgIH0sIFtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQgIT09IHZvaWQgMCA/IGgoJ2RpdicsIHtcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctYmFzaWMtaXRlbV9fbGFiZWwnXG4gICAgICAgICAgICAgICAgfSwgdGhpcy5jb250ZW50KSA6IHZvaWQgMCxcbiAgICAgICAgICAgICAgICB0aGlzLnN1YkNvbnRlbnQgIT09IHZvaWQgMCA/IGgoJ2RpdicsIHtcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctYmFzaWMtaXRlbV9fc3VibGFiZWwnXG4gICAgICAgICAgICAgICAgfSwgdGhpcy5zdWJDb250ZW50KSA6IHZvaWQgMFxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgXVxuICAgICAgICAgICAgKV0sXG4gIFxuICAgICAgICAgICAgYWZ0ZXI6IHRoaXMuJHNjb3BlZFNsb3RzLmFmdGVyICE9PSB2b2lkIDAgPyB0aGlzLiRzY29wZWRTbG90cy5hZnRlciA6IHRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQgfHwgdGhpcy5zdWIgIT09IHZvaWQgMCA/ICgpID0+IFtoKCdzdy1pY29uJywge1xuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWJhc2ljLWl0ZW1fX2V4cGFuc2lvbiBjb2xvci1ncmV5JyxcbiAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICF0aGlzLmlubmVyQ29sbGFwc2VkID8gJ3JvdGF0ZSgxODBkZWcpJyA6IHZvaWQgMCxcbiAgICAgICAgICAgICAgICBjb2xvcjogdGhpcy5tb3VzZW92ZXIgPyAnY3VycmVudENvbG9yJyA6IHZvaWQgMFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdrZXlib2FyZF9hcnJvd19kb3duJ1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KV0gOiB2b2lkIDBcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICBdKSxcbiAgICAgIHRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQgfHwgdGhpcy5zdWIgIT09IHZvaWQgMCA/IGgoU2xpZGUsIHtcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICBjb2xsYXBzZWQ6IHRoaXMuaW5uZXJDb2xsYXBzZWRcbiAgICAgICAgfSxcbiAgICAgICAgc2NvcGVkU2xvdHM6IHtcbiAgICAgICAgICBkZWZhdWx0OiAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgc3ViID0gdGhpcy5zdWIgIT09IHZvaWQgMCA/IHRoaXMuc3ViLm1hcChwcm9wcyA9PiB7XG4gICAgICAgICAgICAgIGxldCBwb3NpdGlvbiA9ICEhcHJvcHMuY2VudGVyIHx8ICEhcHJvcHMuZW5kIHx8IGZhbHNlXG5cbiAgICAgICAgICAgICAgcmV0dXJuIGgoJ3N3LWJhc2ljLWl0ZW0nLCB7XG4gICAgICAgICAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHByb3BzLmNvbnRlbnQsXG4gICAgICAgICAgICAgICAgICBzdWJDb250ZW50OiBwcm9wcy5zdWJDb250ZW50LFxuICAgICAgICAgICAgICAgICAgaWNvbjogcHJvcHMuaWNvbixcbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBwcm9wcy5kaXNhYmxlZCxcbiAgICAgICAgICAgICAgICAgIGNvbGxhcHNlZDogcHJvcHMuY29sbGFwc2VkLFxuICAgICAgICAgICAgICAgICAgdG86IHByb3BzLnRvLFxuICAgICAgICAgICAgICAgICAgc3ViOiBwcm9wcy5zdWIsXG4gICAgICAgICAgICAgICAgICBjb2xvcjogcHJvcHMuY29sb3IsXG4gICAgICAgICAgICAgICAgICBwcmltYXJ5OiBwcm9wcy5wcmltYXJ5LFxuICAgICAgICAgICAgICAgICAgbmVnYXRpdmU6IHByb3BzLm5lZ2F0aXZlLFxuICAgICAgICAgICAgICAgICAgcG9zaXRpdmU6IHByb3BzLnBvc2l0aXZlLFxuICAgICAgICAgICAgICAgICAgd2FybmluZzogcHJvcHMud2FybmluZyxcbiAgICAgICAgICAgICAgICAgIGNlbnRlcjogcG9zaXRpb24gPyBwcm9wcy5jZW50ZXIgOiB0aGlzLmNlbnRlcixcbiAgICAgICAgICAgICAgICAgIGVuZDogcG9zaXRpb24gPyBwcm9wcy5lbmQgOiB0aGlzLmVuZCxcbiAgICAgICAgICAgICAgICAgIGZpbGxlZDogcHJvcHMuZmlsbGVkICE9PSB2b2lkIDAgPyBwcm9wcy5maWxsZWQgOiB0aGlzLnNwbGl0LFxuICAgICAgICAgICAgICAgICAgc3BsaXQ6IHByb3BzLnNwbGl0ICE9PSB2b2lkIDAgPyBwcm9wcy5zcGxpdCA6IHRoaXMuc3BsaXQsXG4gICAgICAgICAgICAgICAgICBtaW5pOiBwcm9wcy5taW5pICE9PSB2b2lkIDAgPyBwcm9wcy5taW5pIDogdGhpcy5taW5pLFxuICAgICAgICAgICAgICAgICAgaW5kZW50TGV2ZWw6IHByb3BzLmluZGVudExldmVsICE9PSB2b2lkIDAgPyBwcm9wcy5pbmRlbnRMZXZlbCA6IHRoaXMuaW5kZW50TGV2ZWwsXG4gICAgICAgICAgICAgICAgICBtYXNrOiBwcm9wcy5tYXNrICE9PSB2b2lkIDAgPyBwcm9wcy5tYXNrIDogdGhpcy5tYXNrLFxuICAgICAgICAgICAgICAgICAgcmlwcGxlOiBwcm9wcy5yaXBwbGUgIT09IHZvaWQgMCA/IHByb3BzLnJpcHBsZSA6IHRoaXMucmlwcGxlLFxuICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IHByb3BzLmNhbGxiYWNrICE9PSB2b2lkIDAgPyBwcm9wcy5jYWxsYmFjayA6IHRoaXMuY2FsbGJhY2ssXG4gICAgICAgICAgICAgICAgICBhY3RpdmU6IHByb3BzLmFjdGl2ZSxcbiAgICAgICAgICAgICAgICAgIHN1YkZpbHRlcjogdGhpcy5zdWJGaWx0ZXIsXG4gICAgICAgICAgICAgICAgICBzdWJUYWc6IHRydWVcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBvbjoge1xuICAgICAgICAgICAgICAgIC8vICAgJ3VwZGF0ZTpjb2xsYXBzZWQnKHYpIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgcHJvcHMuY29sbGFwc2VkID0gdlxuICAgICAgICAgICAgICAgIC8vICAgfVxuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pIDogW11cblxuICAgICAgICAgICAgc3ViLnVuc2hpZnQodGhpcy4kc2NvcGVkU2xvdHMuZGVmYXVsdCA/IHRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQoKSA6IHZvaWQgMClcbiAgICAgICAgICAgIHJldHVybiBzdWJcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pIDogdm9pZCAwXG4gICAgXSlcbiAgfVxufVxuICAiLCJpbXBvcnQgQmFzaWNJdGVtIGZyb20gJy4vc3JjL21haW4uanMnXG5cbmNvbnN0IGluc3RhbGwgPSBmdW5jdGlvbiAoVnVlKSB7XG4gIFZ1ZS5jb21wb25lbnQoQmFzaWNJdGVtLm5hbWUsIEJhc2ljSXRlbSlcbn1cblxuQmFzaWNJdGVtLmluc3RhbGwgPSBpbnN0YWxsXG5cbmV4cG9ydCBkZWZhdWx0IEJhc2ljSXRlbVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGhhc093bihvYmosIGtleSkge1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIGlzVk5vZGUobm9kZSkge1xuICByZXR1cm4gbm9kZSAhPT0gbnVsbCAmJiB0eXBlb2Ygbm9kZSA9PT0gJ29iamVjdCcgJiYgaGFzT3duKG5vZGUsICdjb21wb25lbnRPcHRpb25zJyk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Rmlyc3RDb21wb25lbnRDaGlsZChjaGlsZHJlbikge1xuICByZXR1cm4gY2hpbGRyZW4gJiYgY2hpbGRyZW4uZmlsdGVyKGMgPT4gYyAmJiBjLnRhZylbMF07XG59OyIsIi8vIDx0ZW1wbGF0ZT5cbi8vICAgPGRpdj5cbi8vICAgICA8YnV0dG9uIEBjbGljaz1cImhhbmRsZUJ0blwiPmNsaWNrPC9idXR0b24+XG4vLyAgICAgPHRyYW5zaXRpb24gbmFtZT0nc3ctbm90aWZpY2F0aW9uLWZhZGUnPlxuLy8gICAgICAgPGRpdiB2LWlmPVwic2hvd1wiIGNsYXNzPVwic3ctbm90aWZpY2F0aW9uXCI+XG4vLyAgICAgICAgIDxoMiBjbGFzcz1cInRpdGxlXCI+XG4vLyAgICAgICAgICAg5o+Q56S6MTExMVxuLy8gICAgICAgICA8L2gyPlxuLy8gICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGVudFwiPlxuLy8gICAgICAgICAgIOi/meaYr+S4gOadoea2iOaBr1xuLy8gICAgICAgICA8L2Rpdj5cbi8vICAgICAgICAgPGRpdiBjbGFzcz1cImNsb3NlXCIgQGNsaWNrPVwiaGFuZGxlQnRuXCI+XG4vLyAgICAgICAgICAgPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPmNsb3NlPC9pPlxuLy8gICAgICAgICA8L2Rpdj5cbi8vICAgICAgIDwvZGl2PlxuLy8gICAgIDwvdHJhbnNpdGlvbj5cbi8vICAgPC9kaXY+XG4vLyA8L3RlbXBsYXRlPlxuaW1wb3J0IFZub2RlLCB7IGlzVk5vZGUgfSBmcm9tICcuLi8uLi8uLi91dGlscy92ZG9tJ1xuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnc3dOb3RpZmljYXRpb24nLFxuICBkYXRhICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc2hvdzogZmFsc2UsXG4gICAgICB2ZXJ0aWNhbE9mZnNldDogMCxcbiAgICAgIG9uQ2xvc2U6IG51bGwsXG4gICAgICBwb3NpdGlvbjogJ3RvcC1yaWdodCcsXG4gICAgICB0aXRsZTogJycsXG4gICAgICBjb250ZW50OiAnJyxcbiAgICAgIHNsb3Q6IG51bGwsXG4gICAgICBiYWNrZ3JvdW5kOiAnI2ZmZicsXG4gICAgICBjbG9zZUNvbG9yOiAnIzkwOTM5OSdcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBoYW5kbGVCdG4oKSB7XG4gICAgICB0aGlzLnNob3cgPSBmYWxzZVxuICAgICAgaWYgKHR5cGVvZiB0aGlzLm9uQ2xvc2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5vbkNsb3NlKCk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBjb21wdXRlZDoge1xuICAgIHZlcnRpY2FsUHJvcGVydHkoKSB7XG4gICAgICByZXR1cm4gL150b3AtLy50ZXN0KHRoaXMucG9zaXRpb24pID8gJ3RvcCcgOiAnYm90dG9tJztcbiAgICB9LFxuXG4gICAgcG9zaXRpb25TdHlsZSgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIFt0aGlzLnZlcnRpY2FsUHJvcGVydHldOiBgJHsgdGhpcy52ZXJ0aWNhbE9mZnNldCB9cHhgLFxuICAgICAgfTtcbiAgICB9LFxuICAgIGdldFZub2RlKCkge1xuICAgICAgaWYgKGlzVk5vZGUodGhpcy5zbG90KSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zbG90XG4gICAgICB9XG4gICAgICBjb25zb2xlLmVycm9yKCdQbGVhc2UgY2hlY2sgeW91ciBWbm9kZSB3cml0aW5nJylcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICB9LFxuICByZW5kZXIoaCkge1xuICAgcmV0dXJuIGgoJ3RyYW5zaXRpb24nLHtcbiAgICAgIGF0dHJzOiB7XG4gICAgICAgIG5hbWU6ICdzdy1ub3RpZmljYXRpb24tZmFkZSdcbiAgICAgIH1cbiAgICB9LCBbdGhpcy5zaG93ID8gaCgnZGl2Jywge1xuICAgICAgICAgICAgY2xhc3M6ICdzdy1ub3RpZmljYXRpb24nLFxuICAgICAgICAgICAgc3R5bGU6IE9iamVjdC5hc3NpZ24odGhpcy5wb3NpdGlvblN0eWxlLCB7IGJhY2tncm91bmQ6IHRoaXMuYmFja2dyb3VuZCB9KVxuICAgICAgICAgIH0sIFtcbiAgICAgICAgICAgIHRoaXMuZ2V0Vm5vZGUgPyAnJyA6IGgoJ2gyJywge1xuICAgICAgICAgICAgICBjbGFzczogJ3RpdGxlJ1xuICAgICAgICAgICAgfSwgdGhpcy50aXRsZSksXG4gICAgICAgICAgICB0aGlzLmdldFZub2RlID8gdGhpcy5nZXRWbm9kZSA6IGgoJ2RpdicsIHtcbiAgICAgICAgICAgICAgY2xhc3M6ICdjb250ZW50J1xuICAgICAgICAgICAgfSx0aGlzLmNvbnRlbnQpLFxuICAgICAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgICAgICBjbGFzczogJ2Nsb3NlJyxcbiAgICAgICAgICAgICAgc3R5bGU6IHsgY29sb3I6IHRoaXMuY2xvc2VDb2xvciB9LFxuICAgICAgICAgICAgfSwgW2goJ2RpdicsIHtcbiAgICAgICAgICAgICAgICAgIGNsYXNzOiAnbWF0ZXJpYWwtaWNvbnMnLFxuICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgY2xpY2s6ICgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVCdG4oKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgJ2Nsb3NlJyldKVxuICAgICAgICAgIF0pXG4gICAgXG4gICAgICAgIDogdm9pZCAwXSApXG4gIH1cbn1cblxuIiwiaW1wb3J0IFZ1ZSBmcm9tICd2dWUnO1xuaW1wb3J0IE5vdGlmaWNhdGlvbiBmcm9tICcuL21haW4uanMnO1xuXG5jb25zdCBOb3RpZmljYXRpb25Db25zdHJ1Y3RvciA9IFZ1ZS5leHRlbmQoTm90aWZpY2F0aW9uKVxuXG5sZXQgaW5zdGFuY2U7XG5sZXQgaW5zdGFuY2VzID0gW11cbmxldCBzZWVkID0gMVxuY29uc3QgTm90aWZpY2F0aW9uRnVuID0gZnVuY3Rpb24ob3B0aW9ucyl7XG4gIGlmIChWdWUucHJvdG90eXBlLiRpc1NlcnZlcikgcmV0dXJuO1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgY29uc3QgdXNlck9uQ2xvc2UgPSBvcHRpb25zLm9uQ2xvc2U7XG4gIGNvbnN0IGlkID0gJ25vdGlmaWNhdGlvbl8nICsgc2VlZCsrO1xuICBjb25zdCBwb3NpdGlvbiA9IG9wdGlvbnMucG9zaXRpb24gfHwgJ3RvcC1yaWdodCc7XG4gIG9wdGlvbnMub25DbG9zZSA9IGZ1bmN0aW9uKCkge1xuICAgIE5vdGlmaWNhdGlvbi5jbG9zZShpZCwgdXNlck9uQ2xvc2UpXG4gIH1cbiAgaW5zdGFuY2UgPSBuZXcgTm90aWZpY2F0aW9uQ29uc3RydWN0b3Ioe1xuICAgIGRhdGE6IG9wdGlvbnNcbiAgfSlcbiAgaW5zdGFuY2UuaWQgPSBpZFxuICBpbnN0YW5jZS4kbW91bnQoKTtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChpbnN0YW5jZS4kZWwpO1xuICBpbnN0YW5jZS5zaG93ID0gdHJ1ZVxuICBsZXQgdmVydGljYWxPZmZzZXQgPSAwXG4gIGluc3RhbmNlcy5maWx0ZXIoaXRlbSA9PiBpdGVtLnBvc2l0aW9uID09PSBwb3NpdGlvbikuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICB2ZXJ0aWNhbE9mZnNldCArPSBlbGVtZW50LiRlbC5vZmZzZXRIZWlnaHQgKyAxNlxuICB9KTtcbiAgdmVydGljYWxPZmZzZXQgKz0gMTZcbiAgaW5zdGFuY2UudmVydGljYWxPZmZzZXQgPSB2ZXJ0aWNhbE9mZnNldFxuICBpbnN0YW5jZXMucHVzaChpbnN0YW5jZSlcbiAgY29uc29sZS5sb2coKVxuICByZXR1cm4gaW5zdGFuY2U7XG59IFxuTm90aWZpY2F0aW9uLmNsb3NlID0gZnVuY3Rpb24oaWQsIHVzZXJPbkNsb3NlKSB7XG4gIGxldCBpbmRleCA9IC0xXG4gIGNvbnN0IGxlbiA9IGluc3RhbmNlcy5sZW5ndGhcbiAgY29uc3QgaW5zdGFuY2UgPSBpbnN0YW5jZXMuZmlsdGVyKChpbnN0YW5jZSwgaSkgPT4ge1xuICAgIGlmIChpbnN0YW5jZS5pZCA9PT0gaWQpIHtcbiAgICAgIGluZGV4ID0gaTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0pWzBdXG4gIGlmICghaW5zdGFuY2UpIHJldHVyblxuXG4gIGlmICh0eXBlb2YgdXNlck9uQ2xvc2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICB1c2VyT25DbG9zZShpbnN0YW5jZSk7XG4gIH1cbiAgaW5zdGFuY2VzLnNwbGljZShpbmRleCwgMSlcblxuICBpZiAobGVuIDw9IDEpIHJldHVyblxuXG4gIGNvbnN0IHBvc2l0aW9uID0gaW5zdGFuY2UucG9zaXRpb247XG4gIGNvbnN0IHJlbW92ZWRIZWlnaHQgPSBpbnN0YW5jZS4kZWwub2Zmc2V0SGVpZ2h0XG4gIGZvciAobGV0IGkgPSBpbmRleDsgaSA8IGxlbiAtIDE7IGkrKyl7XG4gICAgaWYgKGluc3RhbmNlc1tpXS5wb3NpdGlvbiA9PT0gcG9zaXRpb24pIHtcbiAgICAgIGluc3RhbmNlc1tpXS4kZWwuc3R5bGVbaW5zdGFuY2UudmVydGljYWxQcm9wZXJ0eV0gPSBwYXJzZUludChpbnN0YW5jZXNbaV0uJGVsLnN0eWxlW2luc3RhbmNlLnZlcnRpY2FsUHJvcGVydHldLCAxMCkgLSByZW1vdmVkSGVpZ2h0IC0gMTYgKyAncHgnXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE5vdGlmaWNhdGlvbkZ1biIsImltcG9ydCBTbGlkZSBmcm9tICcuLi8uLi9zbGlkZSdcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnc3dMYXlvdXQnLFxuICBjb21wb25lbnRzOiB7IFNsaWRlIH0sXG4gIHByb3BzOiB7XG4gICAgY29sbGFwc2VUb3A6IEJvb2xlYW4sXG4gICAgY29sbGFwc2VMZWZ0OiBCb29sZWFuLFxuICAgIGNvbGxhcHNlUmlnaHQ6IEJvb2xlYW4sXG4gICAgY29sbGFwc2VCb3R0b206IEJvb2xlYW4sXG4gICAgZml0VG9wOiBCb29sZWFuLFxuICAgIGZpdExlZnQ6IEJvb2xlYW4sXG4gICAgZml0UmlnaHQ6IEJvb2xlYW4sXG4gICAgZml0Qm90dG9tOiBCb29sZWFuLFxuICAgIHRvcE1pbjogTnVtYmVyIHwgU3RyaW5nLFxuICAgIGxlZnRNaW46IE51bWJlciB8IFN0cmluZyxcbiAgICByaWdodE1pbjogTnVtYmVyIHwgU3RyaW5nLFxuICAgIGJvdHRvbU1pbjogTnVtYmVyIHwgU3RyaW5nXG4gIH0sXG4gIGRhdGE6ICgpID0+ICh7fSksXG4gIGNvbXB1dGVkOiB7XG4gICAgdmVydGljYWxTdHJldGNoKCkge1xuICAgICAgcmV0dXJuIHRoaXMuJHNjb3BlZFNsb3RzLnRvcCAhPT0gdm9pZCAwIHx8IHRoaXMuJHNjb3BlZFNsb3RzLmJvdHRvbSAhPT0gdm9pZCAwXG4gICAgfVxuICB9LFxuICByZW5kZXIoaCkge1xuICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICBzdGF0aWNDbGFzczogJ3N3LWxheW91dCBmbGV4IG5vLXdyYXAnLFxuICAgICAgc3R5bGU6IHtcbiAgICAgICAgJ2ZsZXgtZGlyZWN0aW9uJzogdGhpcy52ZXJ0aWNhbFN0cmV0Y2ggJiYgJ2NvbHVtbidcbiAgICAgIH1cbiAgICB9LCBbXG4gICAgICB0aGlzLiRzY29wZWRTbG90cy50b3AgIT09IHZvaWQgMCA/IGgoU2xpZGUsIHtcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICBjb2xsYXBzZWQ6IHRoaXMuY29sbGFwc2VUb3AsXG4gICAgICAgICAgZml0OiB0aGlzLmZpdFRvcCxcbiAgICAgICAgICBtaW46IHRoaXMudG9wTWluXG4gICAgICAgIH0sXG4gICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctbGF5b3V0X19hcm91bmQnLFxuICAgICAgICBzY29wZWRTbG90czoge1xuICAgICAgICAgIGRlZmF1bHQ6IHRoaXMuJHNjb3BlZFNsb3RzLnRvcFxuICAgICAgICB9XG4gICAgICB9KSA6IHZvaWQgMCxcblxuICAgICAgIXRoaXMudmVydGljYWxTdHJldGNoICYmIHRoaXMuJHNjb3BlZFNsb3RzLmxlZnQgIT09IHZvaWQgMCA/IGgoU2xpZGUsIHtcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICBjb2xsYXBzZWQ6IHRoaXMuY29sbGFwc2VMZWZ0LFxuICAgICAgICAgIGhvcml6b250YWw6IHRydWUsXG4gICAgICAgICAgZml0OiB0aGlzLmZpdExlZnQsXG4gICAgICAgICAgbWluOiB0aGlzLmxlZnRNaW5cbiAgICAgICAgfSxcbiAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1sYXlvdXRfX2Fyb3VuZCcsXG4gICAgICAgIHNjb3BlZFNsb3RzOiB7XG4gICAgICAgICAgZGVmYXVsdDogdGhpcy4kc2NvcGVkU2xvdHMubGVmdFxuICAgICAgICB9XG4gICAgICB9KSA6IHZvaWQgMCxcblxuICAgICAgaCgnZGl2Jywge1xuICAgICAgICByZWY6ICdsYXlvdXRNYWluJyxcbiAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1sYXlvdXRfX21haW4nLFxuICAgICAgfSwgW1t0aGlzLiRzY29wZWRTbG90cy5kZWZhdWx0ICE9PSB2b2lkIDBcbiAgICAgICAgPyB0aGlzLiRzY29wZWRTbG90cy5kZWZhdWx0KCkgOiB2b2lkIDBdXSksXG5cbiAgICAgICF0aGlzLnZlcnRpY2FsU3RyZXRjaCAmJiB0aGlzLiRzY29wZWRTbG90cy5yaWdodCAhPT0gdm9pZCAwID8gaChTbGlkZSwge1xuICAgICAgICBwcm9wczoge1xuICAgICAgICAgIGNvbGxhcHNlZDogdGhpcy5jb2xsYXBzZVJpZ2h0LFxuICAgICAgICAgIGhvcml6b250YWw6IHRydWUsXG4gICAgICAgICAgZml0OiB0aGlzLmZpdFJpZ2h0LFxuICAgICAgICAgIG1pbjogdGhpcy5yaWdodE1pblxuICAgICAgICB9LFxuICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWxheW91dF9fYXJvdW5kJyxcbiAgICAgICAgc2NvcGVkU2xvdHM6IHtcbiAgICAgICAgICBkZWZhdWx0OiB0aGlzLiRzY29wZWRTbG90cy5yaWdodFxuICAgICAgICB9XG4gICAgICB9KSA6IHZvaWQgMCxcblxuICAgICAgdGhpcy4kc2NvcGVkU2xvdHMuYm90dG9tICE9PSB2b2lkIDAgPyBoKFNsaWRlLCB7XG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgY29sbGFwc2VkOiB0aGlzLmNvbGxhcHNlQm90dG9tLFxuICAgICAgICAgIGZpdDogdGhpcy5maXRCb3R0b20sXG4gICAgICAgICAgbWluOiB0aGlzLmJvdHRvbU1pblxuICAgICAgICB9LFxuICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWxheW91dF9fYXJvdW5kJyxcbiAgICAgICAgc2NvcGVkU2xvdHM6IHtcbiAgICAgICAgICBkZWZhdWx0OiB0aGlzLiRzY29wZWRTbG90cy5ib3R0b21cbiAgICAgICAgfVxuICAgICAgfSkgOiB2b2lkIDBcbiAgICBdKVxuICB9XG59IiwiaW1wb3J0IExheW91dCBmcm9tICcuL3NyYy9tYWluLmpzJ1xuXG5jb25zdCBpbnN0YWxsID0gZnVuY3Rpb24gKFZ1ZSkge1xuICBWdWUuY29tcG9uZW50KExheW91dC5uYW1lLCBMYXlvdXQpXG59XG5cbkxheW91dC5pbnN0YWxsID0gaW5zdGFsbFxuXG5leHBvcnQgZGVmYXVsdCBMYXlvdXRcbiIsImNvbnN0IHNob3dNYXNrID0gY3R4ID0+IHtcbiAgaWYgKCFjdHguZGlzYWJsZWQgJiYgIWN0eC5zdGF5KSB7XG4gICAgY3R4Lm5vZGUuY2xhc3NMaXN0LnJlbW92ZSgnaW52aXNpYmxlJylcbiAgfVxufVxuY29uc3QgaGlkZU1hc2sgPSBjdHggPT4ge1xuICBpZiAoIWN0eC5kaXNhYmxlZCAmJiAhY3R4LnN0YXkpIHtcbiAgICBjdHgubm9kZS5jbGFzc0xpc3QuYWRkKCdpbnZpc2libGUnKVxuICB9XG59XG5jb25zdCBkaXNhYmxlTWFzayA9IGN0eCA9PiB7XG4gIGlmIChjdHguZGlzYWJsZWQgJiYgIWN0eC5zdGF5KSB7XG4gICAgY3R4Lm5vZGUuY2xhc3NMaXN0LmFkZCgnaW52aXNpYmxlJylcbiAgfVxufVxuY29uc3Qgc3RheU1hc2sgPSBjdHggPT4ge1xuICBpZiAoY3R4LnN0YXkpIHtcbiAgICBjdHgubm9kZS5jbGFzc0xpc3QucmVtb3ZlKCdpbnZpc2libGUnKVxuICB9IGVsc2Uge1xuICAgIGN0eC5ub2RlLmNsYXNzTGlzdC5hZGQoJ2ludmlzaWJsZScpXG4gIH1cbn1cbmNvbnN0IGNvbG9yTWFzayA9IGN0eCA9PiB7XG4gIGN0eC5ub2RlLnN0eWxlLmNvbG9yID0gY3R4LmNvbG9yXG59XG5jb25zdCBnZXREaXNhYmxlZCA9IHZhbHVlID0+IHZhbHVlICE9PSB2b2lkIDAgJiYgKHZhbHVlLmRpc2FibGVkID09PSB0cnVlIHx8IGZhbHNlKVxuY29uc3QgZ2V0U3RheSA9IHZhbHVlID0+IHZhbHVlICE9PSB2b2lkIDAgJiYgKHZhbHVlLnN0YXkgPT09IHRydWUgfHwgZmFsc2UpXG5jb25zdCBnZXRDb2xvciA9IHZhbHVlID0+IHZhbHVlICE9PSB2b2lkIDAgJiYgdmFsdWUuY29sb3IgfHwgdm9pZCAwXG5jb25zdCBpbml0TWFzayA9IChlbCwgYmluZGluZykgPT4ge1xuICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgY29uc3QgY3R4ID0ge1xuICAgIG5vZGU6IG5vZGUsXG4gICAgZGlzYWJsZWQ6IGdldERpc2FibGVkKGJpbmRpbmcudmFsdWUpLFxuICAgIHN0YXk6IGdldFN0YXkoYmluZGluZy52YWx1ZSksXG4gICAgY29sb3I6IGdldENvbG9yKGJpbmRpbmcudmFsdWUpLFxuICAgIHNob3dNYXNrOiAoKSA9PiB7XG4gICAgICBzaG93TWFzayhjdHgpXG4gICAgfSxcbiAgICBoaWRlTWFzazogKCkgPT4ge1xuICAgICAgaGlkZU1hc2soY3R4KVxuICAgIH1cbiAgfVxuXG4gIGN0eC5ub2RlLmNsYXNzTGlzdC5hZGQoJ3N3LW1hc2snKVxuICBkaXNhYmxlTWFzayhjdHgpXG4gIHN0YXlNYXNrKGN0eClcbiAgY29sb3JNYXNrKGN0eClcbiAgaGlkZU1hc2soY3R4KVxuICBlbC5tYXNrQ3R4ID0gY3R4XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ21hc2snLFxuICBiaW5kKGVsLCBiaW5kaW5nKSB7XG4gICAgaW5pdE1hc2soZWwsIGJpbmRpbmcpXG4gICAgZWwuYXBwZW5kQ2hpbGQoZWwubWFza0N0eC5ub2RlKVxuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIGVsLm1hc2tDdHguc2hvd01hc2ssIGZhbHNlKVxuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgZWwubWFza0N0eC5oaWRlTWFzaywgZmFsc2UpXG4gIH0sXG4gIHVwZGF0ZShlbCwgYmluZGluZykge1xuICAgIGVsLm1hc2tDdHguZGlzYWJsZWQgPSBnZXREaXNhYmxlZChiaW5kaW5nLnZhbHVlKVxuICAgIGlmIChnZXREaXNhYmxlZChiaW5kaW5nLm9sZFZhbHVlKSAhPT0gZWwubWFza0N0eC5kaXNhYmxlZCkge1xuICAgICAgZGlzYWJsZU1hc2soZWwubWFza0N0eClcbiAgICB9XG5cbiAgICBlbC5tYXNrQ3R4LnN0YXkgPSBnZXRTdGF5KGJpbmRpbmcudmFsdWUpXG4gICAgaWYgKGdldFN0YXkoYmluZGluZy5vbGRWYWx1ZSkgIT09IGVsLm1hc2tDdHguc3RheSkge1xuICAgICAgc3RheU1hc2soZWwubWFza0N0eClcbiAgICB9XG5cbiAgICBlbC5tYXNrQ3R4LmNvbG9yID0gZ2V0Q29sb3IoYmluZGluZy52YWx1ZSlcbiAgICBpZiAoZ2V0Q29sb3IoYmluZGluZy5vbGRWYWx1ZSkgIT09IGVsLm1hc2tDdHguY29sb3IpIHtcbiAgICAgIGNvbG9yTWFzayhlbC5tYXNrQ3R4KVxuICAgIH1cbiAgfSxcbiAgdW5iaW5kKGVsKSB7XG4gICAgaWYgKGVsLm1hc2tDdHgpIHtcbiAgICAgIGVsLm1hc2tDdHgubm9kZS5yZW1vdmUoKVxuICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgZWwubWFza0N0eC5zaG93TWFzaywgZmFsc2UpXG4gICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIGVsLm1hc2tDdHguaGlkZU1hc2ssIGZhbHNlKVxuICAgICAgZGVsZXRlIGVsLm1hc2tDdHhcbiAgICB9XG4gIH1cbn0iLCJpbXBvcnQgTWFzayBmcm9tICcuL3NyYy9tYWluLmpzJ1xuXG5jb25zdCBpbnN0YWxsID0gZnVuY3Rpb24gKFZ1ZSkge1xuICBWdWUuZGlyZWN0aXZlKE1hc2submFtZSwgTWFzaylcbn1cblxuTWFzay5pbnN0YWxsID0gaW5zdGFsbFxuXG5leHBvcnQgZGVmYXVsdCBNYXNrIiwiZXhwb3J0IGZ1bmN0aW9uIHBvc2l0aW9uKGUpIHtcbiAgaWYgKGUudG91Y2hlcyAmJiBlLnRvdWNoZXNbMF0pIHtcbiAgICBlID0gZS50b3VjaGVzWzBdXG4gIH0gZWxzZSBpZiAoZS5jaGFuZ2VkVG91Y2hlcyAmJiBlLmNoYW5nZWRUb3VjaGVzWzBdKSB7XG4gICAgZSA9IGUuY2hhbmdlZFRvdWNoZXNbMF1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgdG9wOiBlLmNsaWVudFksXG4gICAgbGVmdDogZS5jbGllbnRYXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEV2ZW50UGF0aChlKSB7XG4gIGlmIChlLnBhdGgpIHtcbiAgICByZXR1cm4gZS5wYXRoXG4gIH1cbiAgaWYgKGUuY29tcG9zZWRQYXRoKSB7XG4gICAgcmV0dXJuIGUuY29tcG9zZWRQYXRoKClcbiAgfVxuXG4gIGNvbnN0IHBhdGggPSBbXVxuICBsZXQgZWwgPSBlLnRhcmdldFxuXG4gIHdoaWxlIChlbCkge1xuICAgIHBhdGgucHVzaChlbClcblxuICAgIGlmIChlbC50YWdOYW1lID09PSAnSFRNTCcpIHtcbiAgICAgIHBhdGgucHVzaChkb2N1bWVudClcbiAgICAgIHBhdGgucHVzaCh3aW5kb3cpXG4gICAgICByZXR1cm4gcGF0aFxuICAgIH1cblxuICAgIGVsID0gZWwucGFyZW50RWxlbWVudFxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdG9wKGUpIHtcbiAgZS5zdG9wUHJvcGFnYXRpb24oKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJldmVudChlKSB7XG4gIGUucHJldmVudERlZmF1bHQoKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RvcEFuZFByZXZlbnQoZSkge1xuICBlLnByZXZlbnREZWZhdWx0KClcbiAgZS5zdG9wUHJvcGFnYXRpb24oKVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHBvc2l0aW9uLFxuICBnZXRFdmVudFBhdGgsXG4gIHN0b3AsXG4gIHByZXZlbnQsXG4gIHN0b3BBbmRQcmV2ZW50XG59IiwiaW1wb3J0IHsgY3NzIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvZG9tLmpzJ1xuaW1wb3J0IHsgcG9zaXRpb24gfSBmcm9tICcuLi8uLi8uLi91dGlscy9ldmVudC5qcydcblxuZnVuY3Rpb24gc2hvd1JpcHBsZShldnQsIGVsLCBjdHgsIGZvcmNlQ2VudGVyKSB7XG4gIGlmIChjdHgubW9kaWZpZXJzLnN0b3AgPT09IHRydWUpIHtcbiAgICBldnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgfVxuXG4gIGxldCB7IGNlbnRlciwgY29sb3IgfSA9IGN0eC5tb2RpZmllcnNcblxuICBjZW50ZXIgPSBjZW50ZXIgPT09IHRydWUgfHwgZm9yY2VDZW50ZXIgPT09IHRydWVcblxuICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gIGNvbnN0IGlubmVyTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICBjb25zdCBwb3MgPSBwb3NpdGlvbihldnQpXG4gIGNvbnN0IHsgbGVmdCwgdG9wLCB3aWR0aCwgaGVpZ2h0IH0gPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICBjb25zdCBkaWFtZXRlciA9IE1hdGguc3FydCh3aWR0aCAqIHdpZHRoICsgaGVpZ2h0ICogaGVpZ2h0KVxuICBjb25zdCByYWRpdXMgPSBkaWFtZXRlciAvIDJcbiAgY29uc3QgY2VudGVyWCA9IGAkeyh3aWR0aCAtIGRpYW1ldGVyKSAvIDJ9cHhgXG4gIGNvbnN0IHggPSBjZW50ZXIgPyBjZW50ZXJYIDogYCR7cG9zLmxlZnQgLSBsZWZ0IC0gcmFkaXVzfXB4YFxuICBjb25zdCBjZW50ZXJZID0gYCR7KGhlaWdodCAtIGRpYW1ldGVyKSAvIDJ9cHhgXG4gIGNvbnN0IHkgPSBjZW50ZXIgPyBjZW50ZXJZIDogYCR7cG9zLnRvcCAtIHRvcCAtIHJhZGl1c31weGBcbiAgbGV0IHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgaW5uZXJOb2RlLmNsYXNzTGlzdC5hZGQoJ3N3LXJpcHBsZV9faW5uZXItLWVudGVyJylcbiAgICBpbm5lck5vZGUuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZTNkKCR7Y2VudGVyWH0sICR7Y2VudGVyWX0sIDApIHNjYWxlM2QoMSwgMSwgMSlgXG4gICAgaW5uZXJOb2RlLnN0eWxlLm9wYWNpdHkgPSAwLjJcblxuICAgIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpbm5lck5vZGUuY2xhc3NMaXN0LnJlbW92ZSgnc3ctcmlwcGxlX19pbm5lci0tZW50ZXInKVxuICAgICAgaW5uZXJOb2RlLmNsYXNzTGlzdC5hZGQoJ3N3LXJpcHBsZV9faW5uZXItLWxlYXZlJylcbiAgICAgIGlubmVyTm9kZS5zdHlsZS5vcGFjaXR5ID0gMFxuXG4gICAgICB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBub2RlICYmIG5vZGUucmVtb3ZlKClcbiAgICAgICAgY3R4LmFib3J0ID0gdm9pZCAwXG4gICAgICB9LCAyNzUpXG4gICAgfSwgMjUwKVxuICB9LCA1MClcblxuICBpbm5lck5vZGUuY2xhc3NOYW1lID0gJ3N3LXJpcHBsZV9faW5uZXInXG4gIGNzcyhpbm5lck5vZGUsIHtcbiAgICBoZWlnaHQ6IGAke2RpYW1ldGVyfXB4YCxcbiAgICB3aWR0aDogYCR7ZGlhbWV0ZXJ9cHhgLFxuICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZTNkKCR7eH0sICR7eX0sIDApIHNjYWxlM2QoMC4yLCAwLjIsIDEpYCxcbiAgICBvcGFjaXR5OiAwXG4gIH0pXG4gIGlmIChjb2xvcikgeyBjc3Mobm9kZSwgeyBjb2xvcjogY29sb3IgfSkgfVxuICBub2RlLmNsYXNzTmFtZSA9IGBzdy1yaXBwbGVgXG4gIG5vZGUuYXBwZW5kQ2hpbGQoaW5uZXJOb2RlKVxuICBlbC5hcHBlbmRDaGlsZChub2RlKVxuXG4gIGN0eC5hYm9ydCA9ICgpID0+IHtcbiAgICBub2RlICYmIG5vZGUucmVtb3ZlKClcbiAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlQ3R4KGN0eCwgeyB2YWx1ZSwgbW9kaWZpZXJzLCBhcmcgfSkge1xuICBjdHguZGlzYWJsZWQgPSB2YWx1ZSAmJiB2YWx1ZS5kaXNhYmxlZCB8fCBmYWxzZVxuXG4gIGlmICghY3R4LmRpc2FibGVkKSB7XG4gICAgY3R4Lm1vZGlmaWVycyA9IE9iamVjdCh2YWx1ZSkgPT09IHZhbHVlXG4gICAgICA/IHtcbiAgICAgICAgc3RvcDogdmFsdWUuc3RvcCA9PT0gdHJ1ZSB8fCBtb2RpZmllcnMuc3RvcCA9PT0gdHJ1ZSxcbiAgICAgICAgY2VudGVyOiB2YWx1ZS5jZW50ZXIgPT09IHRydWUgfHwgbW9kaWZpZXJzLmNlbnRlciA9PT0gdHJ1ZSxcbiAgICAgICAgY29sb3I6IHZhbHVlLmNvbG9yIHx8IGFyZ1xuICAgICAgfVxuICAgICAgOiB7XG4gICAgICAgIHN0b3A6IG1vZGlmaWVycy5zdG9wLFxuICAgICAgICBjZW50ZXI6IG1vZGlmaWVycy5jZW50ZXIsXG4gICAgICAgIGNvbG9yOiBhcmdcbiAgICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdyaXBwbGUnLFxuICBpbnNlcnRlZChlbCwgYmluZGluZykge1xuICAgIGNvbnN0IGN0eCA9IHtcbiAgICAgIG1vZGlmaWVyczoge30sXG4gICAgICBjbGljayhldnQpIHtcbiAgICAgICAgaWYgKCFjdHguZGlzYWJsZWQpIHtcbiAgICAgICAgICBzaG93UmlwcGxlKGV2dCwgZWwsIGN0eClcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGtleXVwKGV2dCkge1xuICAgICAgICBpZiAoIWN0eC5kaXNhYmxlZCAmJiBldnQua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgICAgICBzaG93UmlwcGxlKGV2dCwgZWwsIGN0eCwgdHJ1ZSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZUN0eChjdHgsIGJpbmRpbmcpXG4gICAgaWYgKGVsLnJpcHBsZUN0eCkge1xuICAgICAgZWwucmlwcGxlQ3R4T2xkID0gZWwucmlwcGxlQ3R4XG4gICAgfVxuICAgIGVsLnJpcHBsZUN0eCA9IGN0eFxuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY3R4LmNsaWNrLCBmYWxzZSlcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGN0eC5rZXl1cCwgZmFsc2UpXG4gIH0sXG4gIHVwZGF0ZShlbCwgYmluZGluZykge1xuICAgIGVsLnJpcHBsZUN0eCAhPT0gdm9pZCAwICYmIHVwZGF0ZUN0eChlbC5yaXBwbGVDdHgsIGJpbmRpbmcpXG4gIH0sXG4gIHVuYmluZChlbCkge1xuICAgIGNvbnN0IGN0eCA9IGVsLnJpcHBsZUN0eE9sZCB8fCBlbC5yaXBwbGVDdHhcblxuICAgIGlmIChjdHggIT09IHZvaWQgMCkge1xuICAgICAgY3R4LmFib3J0ICE9PSB2b2lkIDAgJiYgY3R4LmFib3J0KClcbiAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY3R4LmNsaWNrLCBmYWxzZSlcbiAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgY3R4LmtleXVwLCBmYWxzZSlcbiAgICAgIGRlbGV0ZSBlbFtlbC5yaXBwbGVDdHhPbGQgPyAncmlwcGxlQ3R4T2xkJyA6ICdyaXBwbGVDdHgnXVxuICAgIH1cbiAgfVxufSIsImltcG9ydCBSaXBwbGUgZnJvbSAnLi9zcmMvbWFpbi5qcydcblxuY29uc3QgaW5zdGFsbCA9IGZ1bmN0aW9uIChWdWUpIHtcbiAgVnVlLmRpcmVjdGl2ZShSaXBwbGUubmFtZSwgUmlwcGxlKVxufVxuXG5SaXBwbGUuaW5zdGFsbCA9IGluc3RhbGxcblxuZXhwb3J0IGRlZmF1bHQgUmlwcGxlIiwiaW1wb3J0ICcuL2Nzcy9pbmRleC5zdHlsJ1xuXG5pbXBvcnQgSWNvbiBmcm9tICcuL2NvbXBvbmVudHMvaWNvbi9pbmRleC5qcydcbmltcG9ydCBJdGVtIGZyb20gJy4vY29tcG9uZW50cy9pdGVtL2luZGV4LmpzJ1xuaW1wb3J0IEZpZWxkIGZyb20gJy4vY29tcG9uZW50cy9maWVsZC9pbmRleC5qcydcbmltcG9ydCBJbnB1dCBmcm9tICcuL2NvbXBvbmVudHMvaW5wdXQvaW5kZXguanMnXG5pbXBvcnQgU2VsZWN0IGZyb20gJy4vY29tcG9uZW50cy9zZWxlY3QvaW5kZXguanMnXG5pbXBvcnQgU2Nyb2xsQXJlYSBmcm9tICcuL2NvbXBvbmVudHMvc2Nyb2xsQXJlYS9pbmRleC5qcydcbmltcG9ydCBNb2RhbCBmcm9tICcuL2NvbXBvbmVudHMvbW9kYWwvaW5kZXguanMnXG5pbXBvcnQgUG9wb3ZlciBmcm9tICcuL2NvbXBvbmVudHMvcG9wb3Zlci9pbmRleC5qcydcbmltcG9ydCBCdXR0b24gZnJvbSAnLi9jb21wb25lbnRzL2J1dHRvbi9pbmRleC5qcydcbmltcG9ydCBDaGVja2JveCBmcm9tICcuL2NvbXBvbmVudHMvY2hlY2tib3gvaW5kZXguanMnXG5pbXBvcnQgQ2hlY2tib3hHcm91cCBmcm9tICcuL2NvbXBvbmVudHMvY2hlY2tib3hHcm91cC9pbmRleC5qcydcbmltcG9ydCBSYWRpbyBmcm9tICcuL2NvbXBvbmVudHMvcmFkaW8vaW5kZXguanMnXG5pbXBvcnQgUmFkaW9Hcm91cCBmcm9tICcuL2NvbXBvbmVudHMvcmFkaW9Hcm91cC9pbmRleC5qcydcbmltcG9ydCBQYWdpbmF0aW9uIGZyb20gJy4vY29tcG9uZW50cy9wYWdpbmF0aW9uL2luZGV4LmpzJ1xuaW1wb3J0IEJhc2ljSXRlbSBmcm9tICcuL2NvbXBvbmVudHMvYmFzaWNJdGVtL2luZGV4LmpzJ1xuaW1wb3J0IE5vdGlmaWNhdGlvbiBmcm9tICcuL2NvbXBvbmVudHMvbm90aWZpY2F0aW9uL2luZGV4LmpzJ1xuaW1wb3J0IExheW91dCBmcm9tICcuL2NvbXBvbmVudHMvbGF5b3V0L2luZGV4LmpzJ1xuaW1wb3J0IFNsaWRlIGZyb20gJy4vY29tcG9uZW50cy9zbGlkZS9pbmRleC5qcydcbmltcG9ydCBNYXNrIGZyb20gJy4vZGlyZWN0aXZlcy9tYXNrL2luZGV4LmpzJ1xuaW1wb3J0IFJpcHBsZSBmcm9tICcuL2RpcmVjdGl2ZXMvcmlwcGxlL2luZGV4LmpzJ1xuXG5jb25zdCBjb21wb25lbnRzID0gW1xuICBJY29uLFxuICBJdGVtLFxuICBGaWVsZCxcbiAgSW5wdXQsXG4gIFNlbGVjdCxcbiAgU2Nyb2xsQXJlYSxcbiAgTW9kYWwsXG4gIFBvcG92ZXIsXG4gIEJ1dHRvbixcbiAgUGFnaW5hdGlvbixcbiAgQ2hlY2tib3gsXG4gIENoZWNrYm94R3JvdXAsXG4gIFJhZGlvLFxuICBSYWRpb0dyb3VwLFxuICBCYXNpY0l0ZW0sXG4gIExheW91dCxcbiAgU2xpZGVcbl1cblxuY29uc3QgZGlyZWN0aXZlcyA9IFtcbiAgUmlwcGxlLFxuICBNYXNrXG5dXG5cbmNvbnN0IGluc3RhbGwgPSBmdW5jdGlvbiAoVnVlKSB7XG4gIGNvbXBvbmVudHMuZm9yRWFjaChjb21wb25lbnQgPT4ge1xuICAgIFZ1ZS5jb21wb25lbnQoY29tcG9uZW50Lm5hbWUsIGNvbXBvbmVudClcbiAgfSlcbiAgZGlyZWN0aXZlcy5mb3JFYWNoKGRpcmVjdGl2ZSA9PiB7XG4gICAgVnVlLmRpcmVjdGl2ZShkaXJlY3RpdmUubmFtZSwgZGlyZWN0aXZlKVxuICB9KVxuICBWdWUucHJvdG90eXBlLiRub3RpZnkgPSBOb3RpZmljYXRpb25cbn1cblxuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5WdWUpIHtcbiAgaW5zdGFsbCh3aW5kb3cuVnVlKVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGluc3RhbGwsXG4gIEljb24sXG4gIEl0ZW0sXG4gIEZpZWxkLFxuICBJbnB1dCxcbiAgU2VsZWN0LFxuICBTY3JvbGxBcmVhLFxuICBQb3BvdmVyLFxuICBNb2RhbCxcbiAgQnV0dG9uLFxuICBQYWdpbmF0aW9uLFxuICBDaGVja2JveCxcbiAgQ2hlY2tib3hHcm91cCxcbiAgUmFkaW8sXG4gIFJhZGlvR3JvdXAsXG4gIEJhc2ljSXRlbSxcbiAgTm90aWZpY2F0aW9uLFxuICBMYXlvdXQsXG4gIFNsaWRlLFxuICBSaXBwbGUsXG4gIE1hc2tcbn1cbiJdLCJuYW1lcyI6WyJuYW1lIiwicHJvcHMiLCJTdHJpbmciLCJjb2xvciIsInByaW1hcnkiLCJCb29sZWFuIiwibmVnYXRpdmUiLCJwb3NpdGl2ZSIsIndhcm5pbmciLCJncmV5IiwibGlnaHRHcmV5Iiwic2l6ZSIsImNvbXB1dGVkIiwiY2xhc3NlcyIsImNscyIsImljb24iLCJjb250ZW50Iiwic3R5bGUiLCJmb250U2l6ZSIsInJlbmRlciIsImgiLCJzdGF0aWNDbGFzcyIsImNsYXNzIiwiYXR0cnMiLCJvbiIsIiRsaXN0ZW5lcnMiLCJpbnN0YWxsIiwiVnVlIiwiY29tcG9uZW50IiwiSWNvbiIsIndyYXAiLCJoaWRlQmVmb3JlIiwiaGlkZURlZmF1bHQiLCJoaWRlQWZ0ZXIiLCJ0byIsIk9iamVjdCIsImNlbnRlciIsImVuZCIsImRpc2FibGVkIiwibWFzayIsInJpcHBsZSIsImFjdGl2ZSIsInJlcXVpcmVkIiwiZGF0YSIsImRpc2FibGUiLCJkaXJlY3RpdmVzIiwidmFsdWUiLCJzdGF5IiwiY29uY2F0IiwiJHNjb3BlZFNsb3RzIiwiYmVmb3JlIiwiaGlkZSIsImRlZmF1bHQiLCJhZnRlciIsIkl0ZW0iLCJlcnJvck1lc3NhZ2UiLCJydWxlcyIsIkFycmF5IiwiaXNEaXJ0eSIsImlubmVyRXJyb3IiLCJpbm5lckVycm9yTWVzc2FnZSIsIndhdGNoIiwiZm9yY2VDaGVjayIsInYiLCJ2YWxpZGF0ZSIsInZhbGlkYXRlVmFsdWUiLCJoYXNFcnJvciIsImNvbXB1dGVkRXJyb3JNZXNzYWdlIiwibW91bnRlZCIsIiRvbiIsInRyaWdnZXJWYWxpZGF0aW9uIiwiYmVmb3JlRGVzdHJveSIsIiRvZmYiLCJtZXRob2RzIiwicmVzZXRWYWxpZGF0aW9uIiwidmFsIiwibGVuZ3RoIiwidXBkYXRlIiwiZXJyIiwibXNnIiwibSIsInNvbWUiLCJydWxlIiwicmVzIiwiZm9yY2UiLCJhZHZhbmNlZEJsdXIiLCJlIiwiZXhjbHVkZWQiLCJnZXRSZWZzIiwicmVmTmFtZXMiLCJnZXREb21zIiwiZWxzIiwiaXNBcnJheSIsInJlZHVjZSIsImFjY3VtdWxhdG9yIiwiZWwiLCJwdXNoIiwiJGVsIiwicmVmIiwiJHJlZnMiLCJleGNsdWRlZEJsdXJSZWZzIiwicmVmcyIsImNvbnRhaW5zIiwidGFyZ2V0IiwiZm9jdXNlZCIsImZvY3VzZWRCZWZvcmUiLCJibHVyVHlwZSIsImJsdXJSZWZzIiwiJGVtaXQiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwibWl4aW5zIiwiVmFsaWRhdGVNaXhpbiIsIkFkdmFuY2VkQmx1ck1peGluIiwiY29tcG9uZW50cyIsInVuZGVybGluZWQiLCJib3JkZXJlZCIsImZpbGxlZCIsIm1pbmkiLCJsYWJlbCIsInNwYWNlQXJvdW5kIiwidHlwZSIsImZvY3VzIiwiYmx1ciIsInVuZGVybGluZSIsImJvcmRlciIsImZpbGwiLCJlcnJvciIsImlubmVyUG9pbnRlciIsInNjb3BlZFNsb3RzIiwiZ2V0SW5uZXIiLCJnZXRBZnRlciIsIkZpZWxkIiwicGxhY2Vob2xkZXIiLCJhdXRvY29tcGxldGUiLCJpbnB1dCIsImRvbVByb3BzIiwiSW5wdXQiLCJ4IiwieSIsIndpZHRoIiwiaGVpZ2h0Iiwic3RyZXRjaCIsIlNjcm9sbEFyZWEiLCJpc0RlZXBFcXVhbCIsImEiLCJiIiwiRGF0ZSIsImdldFRpbWUiLCJrZXlzIiwiZXZlcnkiLCJwcm9wIiwiaXNTdHJpbmdDb250YWluIiwicyIsInJhbmRvbSIsImlubmVyUyIsImlubmVyViIsInJlcGxhY2UiLCJzcGxpdCIsInN1bSIsImZvckVhY2giLCJpbmNsdWRlcyIsImlzT2JqZWN0IiwiU2NvcmxsQXJlYSIsIm11bHRpcGxlIiwib3B0aW9ucyIsImZpbHRlciIsIm9wdGlvbnNIZWlnaHQiLCJzZWxlY3RlZFN0eWxlIiwiZmlsdGVyVmFsdWUiLCJpbm5lclZhbHVlIiwiZ2V0IiwiZ2V0RXhhY3RWYWx1ZXMiLCJzZXQiLCJpbm5lck9wdGlvbnMiLCJjIiwiZ2V0TmFtZSIsIiRuZXh0VGljayIsImNsZWFyRmlsdGVyIiwidHJpZ2dlckJsdXIiLCJnZXRPcHRpb25zIiwibWFwIiwib3B0aW9uIiwic2VsZWN0ZWQiLCJjaGVja1NlbGVjdGVkIiwibmF0aXZlT24iLCJjbGljayIsImZvcm1hdFZhbHVlIiwiZ2V0U2VsZWN0ZWQiLCJnZXRFeGFjdE9wdGlvbnMiLCJyZWZJbkZvciIsInBhZGRpbmciLCJjdXJzb3IiLCJ0cmFuc2Zvcm0iLCJvcGUiLCJkdXBsaWNhdGVkIiwiZ2V0VmFsdWUiLCJoYXNPd25Qcm9wZXJ0eSIsIlNlbGVjdCIsInJvdW5kIiwic2hhZG93IiwiQnV0dG9uIiwic3dCdXR0b24iLCJzaG93IiwidGl0bGUiLCJ6SW5kZXgiLCJvcGFjaXR5IiwiaGFuZGxlQ2FuY2VsIiwiaGFuZGxlQ29uZmlybSIsInNob3dNb2RhbCIsImhpZGVNb2RhbCIsImV2ZW50Iiwic3RvcFByb3BhZ2F0aW9uIiwiaGVhZGVyIiwiZm9vdGVyIiwiTW9kYWwiLCJpc1NlcnZlciIsInByb3RvdHlwZSIsIiRpc1NlcnZlciIsImNzcyIsImVsZW1lbnQiLCJoYW5kbGVyIiwiYXR0YWNoRXZlbnQiLCJvZmYiLCJkZXRhY2hFdmVudCIsInBvcG92ZXJTdHlsZSIsImFycm93U3R5bGUiLCJyZWZlcmVuY2VFbG0iLCJtb2RlbCIsInBsYWNlbWVudCIsInRyaWdnZXIiLCJ2YWxpZGF0b3IiLCJpbmRleE9mIiwic2hvd1ZhbHVlIiwic2hvd1N0eWxlIiwiZ2V0U3R5bGUiLCJwb3BvdmVyRWxtIiwidG9wIiwib2Zmc2V0SGVpZ2h0IiwibGVmdCIsIm9mZnNldFdpZHRoIiwicmlnaHQiLCJoYW5kbGVDbGljayIsImhhbmRsZU1vdXNlRW50ZXIiLCJoYW5kbGVNb3VzZUxlYXZlIiwiZG9TaG93IiwiZG9DbG9zZSIsImhhbmRsZU1hbnVhbCIsInBvcG92ZXIiLCJyZWZlcmVuY2UiLCJlbG0iLCJxdWVyeVNlbGVjdG9yIiwiZGVzdHJveWVkIiwiYXNzaWduIiwiUG9wb3ZlciIsImxlZnRMYWJlbCIsImNvbG9yTGFiZWwiLCJrZWVwQ29sb3IiLCJwYXJlbnQiLCJwYXJlbnREaXNhYmxlZCIsImNoZWNrZWQiLCJib29sZWFuTW9kZSIsImdldENoZWNrZWQiLCJzZWxmIiwiY29sb3JDaGVja2JveCIsImdldExhYmVsIiwiQ2hlY2tib3giLCJzaHV0dGxlIiwiX3RoaXMiLCIkY2hpbGRyZW4iLCJjaGlsZCIsInNodXR0bGVSZWYiLCJTaHV0dGxlTWl4aW4iLCJDaGVja2JveEdyb3VwIiwiY29sb3JSYWRpbyIsIlJhZGlvIiwiUmFkaW9Hcm91cCIsIm1ha2VSZXN1bHQiLCJ0b3RhbCIsImN1ciIsImFyb3VuZCIsInJlc3VsdCIsImJhc2VDb3VudCIsInN1cnBsdXMiLCJzdGFydFBvc2l0aW9uIiwiZW5kUG9zaXRpb24iLCJmcm9tIiwiaSIsIlBhZ2luYXRpb24iLCJvYnNlcnZlciIsIm1lYXN1cmVkV2lkdGgiLCJob3Jpem9udGFsIiwibWVhc3VyZVRhcmdldCIsIm1pblNpemUiLCJtaW4iLCJpbml0U3R5bGUiLCJpbm5lckNvbGxhcHNlZCIsInNsaWRlIiwic2V0U3R5bGUiLCJwYXNzaXZlIiwic2xpZGVUYXJnZXQiLCJvYnNlcnZlIiwic2V0VGltZW91dCIsImNsZWFyVXBwZXJTdHlsZSIsInVwcGVyIiwidXBwZXJTbGlkZVRhcmdldCIsIiRwYXJlbnQiLCIkd2F0Y2giLCJNdXRhdGlvbk9ic2VydmVyIiwiYXR0cmlidXRlcyIsImF0dHJpYnV0ZUZpbHRlciIsImNoaWxkTGlzdCIsInN1YnRyZWUiLCJjaGFyYWN0ZXJEYXRhIiwiZGlzY29ubmVjdCIsIlNsaWRlT2JzZXJ2ZXIiLCJjb2xsYXBzZWQiLCJmaXQiLCJOdW1iZXIiLCJpbW1lZGlhdGUiLCJTbGlkZSIsInN1YkNvbnRlbnQiLCJpbmRlbnRMZXZlbCIsInN1YiIsImNhbGxiYWNrIiwiRnVuY3Rpb24iLCJzdWJGaWx0ZXIiLCJzdWJUYWciLCJpbm5lckFjdGl2ZSIsImNvbGxhcHNlZEJlZm9yZSIsIm1vdXNlb3ZlciIsInN1YkZpbHRlckNoYW5nZSIsInJlc3RvcmUiLCJyZW1lbWJlciIsImlzU3ViQ29udGFpbiIsImNvbnRhaW4iLCJjcmVhdGVkIiwiY29uc29sZSIsImxvZyIsIm92IiwibXV0YXRlIiwiZXhwYW5kIiwibW91c2VvdXQiLCJwb3NpdGlvbiIsInVuc2hpZnQiLCJCYXNpY0l0ZW0iLCJoYXNPd24iLCJvYmoiLCJrZXkiLCJjYWxsIiwiaXNWTm9kZSIsIm5vZGUiLCJ2ZXJ0aWNhbE9mZnNldCIsIm9uQ2xvc2UiLCJzbG90IiwiYmFja2dyb3VuZCIsImNsb3NlQ29sb3IiLCJoYW5kbGVCdG4iLCJ2ZXJ0aWNhbFByb3BlcnR5IiwidGVzdCIsInBvc2l0aW9uU3R5bGUiLCJnZXRWbm9kZSIsIk5vdGlmaWNhdGlvbkNvbnN0cnVjdG9yIiwiZXh0ZW5kIiwiTm90aWZpY2F0aW9uIiwiaW5zdGFuY2UiLCJpbnN0YW5jZXMiLCJzZWVkIiwiTm90aWZpY2F0aW9uRnVuIiwidXNlck9uQ2xvc2UiLCJpZCIsImNsb3NlIiwiJG1vdW50IiwiYm9keSIsImFwcGVuZENoaWxkIiwiaXRlbSIsImluZGV4IiwibGVuIiwic3BsaWNlIiwicmVtb3ZlZEhlaWdodCIsInBhcnNlSW50IiwiY29sbGFwc2VUb3AiLCJjb2xsYXBzZUxlZnQiLCJjb2xsYXBzZVJpZ2h0IiwiY29sbGFwc2VCb3R0b20iLCJmaXRUb3AiLCJmaXRMZWZ0IiwiZml0UmlnaHQiLCJmaXRCb3R0b20iLCJ0b3BNaW4iLCJsZWZ0TWluIiwicmlnaHRNaW4iLCJib3R0b21NaW4iLCJ2ZXJ0aWNhbFN0cmV0Y2giLCJib3R0b20iLCJMYXlvdXQiLCJzaG93TWFzayIsImN0eCIsImNsYXNzTGlzdCIsInJlbW92ZSIsImhpZGVNYXNrIiwiYWRkIiwiZGlzYWJsZU1hc2siLCJzdGF5TWFzayIsImNvbG9yTWFzayIsImdldERpc2FibGVkIiwiZ2V0U3RheSIsImdldENvbG9yIiwiaW5pdE1hc2siLCJiaW5kaW5nIiwiY3JlYXRlRWxlbWVudCIsIm1hc2tDdHgiLCJiaW5kIiwib2xkVmFsdWUiLCJ1bmJpbmQiLCJkaXJlY3RpdmUiLCJNYXNrIiwidG91Y2hlcyIsImNoYW5nZWRUb3VjaGVzIiwiY2xpZW50WSIsImNsaWVudFgiLCJzaG93UmlwcGxlIiwiZXZ0IiwiZm9yY2VDZW50ZXIiLCJtb2RpZmllcnMiLCJzdG9wIiwiaW5uZXJOb2RlIiwicG9zIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiZGlhbWV0ZXIiLCJNYXRoIiwic3FydCIsInJhZGl1cyIsImNlbnRlclgiLCJjZW50ZXJZIiwidGltZXIiLCJhYm9ydCIsImNsYXNzTmFtZSIsImNsZWFyVGltZW91dCIsInVwZGF0ZUN0eCIsImFyZyIsImluc2VydGVkIiwia2V5dXAiLCJrZXlDb2RlIiwicmlwcGxlQ3R4IiwicmlwcGxlQ3R4T2xkIiwiUmlwcGxlIiwiJG5vdGlmeSIsIndpbmRvdyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLFdBQWU7RUFDYkEsSUFBSSxFQUFFLFFBRE87RUFFYkMsS0FBSyxFQUFFO0lB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
