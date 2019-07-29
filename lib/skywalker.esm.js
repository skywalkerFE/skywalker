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
    active: Boolean,
    mask: Object | Boolean,
    ripple: Object | Boolean
  },
  data: function data() {
    return {};
  },
  render: function render(h) {
    var _this = this;

    return h("".concat(this.to !== void 0 ? 'router-link' : 'div'), {
      staticClass: 'sw-item flex items-center',
      class: {
        'no-wrap': !this.wrap,
        active: this.active,
        disable: this.disabled
      },
      on: this.disabled ? void 0 : _objectSpread({}, this.$listeners, {
        click: function click() {
          _this.$emit('click');
        }
      }),
      props: {
        to: this.to
      },
      directives: (this.to !== void 0 || this.active !== void 0 || this.mask ? [{
        name: 'mask',
        value: this.mask ? {
          disabled: this.mask.disabled,
          color: this.mask.color,
          stay: this.mask.stay
        } : {
          disabled: true
        }
      }] : []).concat(this.ripple ? [{
        name: 'ripple',
        value: {
          disabled: this.ripple.disabled,
          color: this.ripple.color,
          center: this.ripple.center
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
    min: Number | String,
    shadow: Boolean
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
      staticClass: 'sw-slide__container',
      class: {
        shadow: this.shadow
      }
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
    to: String | Object,
    indentLevel: Number | String,
    mask: Object | Boolean,
    ripple: Object | Boolean,
    sub: Array,
    active: {
      type: Boolean,
      default: false
    },
    callback: Function,
    subFilter: String,
    filled: {
      type: Boolean,
      default: void 0
    },
    shadow: {
      type: Boolean,
      default: void 0
    },
    split: {
      type: Boolean,
      default: void 0
    },
    mini: {
      type: Boolean,
      default: void 0
    },
    center: {
      type: Boolean,
      default: void 0
    },
    end: {
      type: Boolean,
      default: void 0
    }
  },
  data: function data() {
    return {
      collapsedBefore: true,
      mouseover: false,
      hide: false,
      eventOrigin: false,
      eventHub: void 0
    };
  },
  computed: {
    hasBefore: function hasBefore() {
      return this.$scopedSlots.before !== void 0 || this.icon !== void 0;
    },
    hasContent: function hasContent() {
      return this.$scopedSlots.content !== void 0 || this.content !== void 0 || this.subContent !== void 0;
    },
    hasSub: function hasSub() {
      return this.$scopedSlots.default !== void 0 || this.sub !== void 0;
    },
    hasAction: function hasAction() {
      return !this.disabled && (this.to !== void 0 || this.callback !== void 0 || this.$scopedSlots.default || this.sub !== void 0);
    },
    innerCenter: function innerCenter() {
      return this.center !== void 0 ? this.center : this.rootParams.center;
    },
    innerEnd: function innerEnd() {
      return this.end !== void 0 ? this.end : this.rootParams.end;
    },
    innerFilled: function innerFilled() {
      return this.filled !== void 0 ? this.filled : this.rootParams.filled;
    },
    innerSplit: function innerSplit() {
      return this.split !== void 0 ? this.split : this.rootParams.split;
    },
    innerMini: function innerMini() {
      return this.mini !== void 0 ? this.mini : this.rootParams.mini;
    },
    innerShadow: function innerShadow() {
      return this.shadow !== void 0 ? this.shadow : this.rootParams.shadow;
    },
    innerMask: function innerMask() {
      return this.mask !== void 0 ? this.mask : this.rootParams.mask;
    },
    innerRipple: function innerRipple() {
      return this.ripple !== void 0 ? this.ripple : this.rootParams.ripple;
    },
    innerIndentLevel: function innerIndentLevel() {
      return this.indentLevel || this.rootParams.indentLevel;
    },
    innerCallback: function innerCallback() {
      return this.callback || this.rootParams.callback;
    },
    innerSubFilter: function innerSubFilter() {
      return this.root === void 0 ? this.subFilter : this.root.subFilter;
    },
    innerEventHub: function innerEventHub() {
      return this.eventHub || this.root.eventHub;
    },
    rootParams: function rootParams() {
      return this.root || {};
    },
    minHeight: function minHeight() {
      return this.innerMini ? '36px' : '48px';
    }
  },
  inject: {
    root: {
      default: function _default() {
        return void 0;
      }
    }
  },
  provide: function provide() {
    return this.root === void 0 ? {
      root: this
    } : void 0;
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
            return isStringContain(x.content, _this.innerSubFilter);
          }
        });
        return contain;
      };

      if (this.sub === void 0) {
        this.hide = !isStringContain(this.content, this.innerSubFilter);
      } else {
        if (restore) {
          this.$emit('update:collapsed', this.collapsedBefore);
          this.hide = false;
          return;
        }

        if (remember) {
          this.collapsedBefore = this.collapsed;
        }

        this.$emit('update:collapsed', false);
        this.hide = this.root !== void 0 && !isSubContain(this.sub);
      }
    },
    initEventHub: function initEventHub() {
      var _this2 = this;

      if (this.root === void 0) {
        this.eventHub = new Vue();
      }

      this.innerEventHub.$on('change:active', function () {
        if (!_this2.eventOrigin) {
          _this2.$emit('update:active', false);
        }

        _this2.eventOrigin = false;
      });
    },
    emitActive: function emitActive() {
      this.eventOrigin = true;
      this.$emit('update:active', true);
      this.innerEventHub.$emit('change:active');
    }
  },
  created: function created() {
    var _this3 = this;

    this.initEventHub();

    if (this.content !== void 0 && this.innerSubFilter !== void 0) {
      this.$watch('innerSubFilter', function (v, ov) {
        if (v !== '' || ov !== void 0) {
          _this3.subFilterChange(v === '', ov === '');
        }
      }, {
        immediate: true
      });
    }
  },
  render: function render(h) {
    var _this4 = this;

    return h('div', {
      staticClass: 'sw-basic-item',
      attrs: {
        mutate: this.hide
      },
      class: {
        split: this.innerSplit && !this.collapsed,
        hide: this.hide
      }
    }, [h('div', {
      staticClass: 'sw-basic-item__main',
      class: this.disabled ? 'disable' : this.innerFilled ? {
        'bg-primary': this.primary,
        'bg-negative': this.negative,
        'bg-positive': this.positive,
        'bg-warning': this.warning,
        'bg-dark color-white': true
      } : {
        'color-primary': this.primary,
        'color-negative': this.negative,
        'color-positive': this.positive,
        'color-warning': this.warning
      },
      style: this.disabled ? void 0 : this.innerFilled ? {
        'background-color': this.color
      } : {
        color: this.color
      }
    }, [h('sw-item', {
      staticClass: 'sw-basic-item__inner',
      props: {
        to: this.innerCallback ? void 0 : this.to,
        center: this.innerCenter,
        end: this.innerEnd,
        disabled: this.disabled,
        mask: this.innerMask,
        ripple: this.innerRipple,
        active: this.active
      },
      class: {
        expand: !this.collapsed
      },
      style: {
        'min-height': this.minHeight,
        'padding-left': "".concat(this.innerIndentLevel * 12, "px"),
        cursor: this.hasAction ? 'pointer' : void 0
      },
      on: this.disabled ? void 0 : _objectSpread({}, this.$listeners, {
        click: function click() {
          if (_this4.hasSub) {
            _this4.$emit('update:collapsed', !_this4.collapsed);
          } else {
            _this4.emitActive();
          }

          _this4.innerCallback && _this4.innerCallback(_this4);

          _this4.$emit('click');
        },
        mouseover: function mouseover() {
          _this4.mouseover = true;
        },
        mouseout: function mouseout() {
          _this4.mouseover = false;
        }
      }),
      scopedSlots: {
        before: function before() {
          return [h('div', {
            staticClass: 'flex items-center',
            class: {
              'space-right': _this4.hasBefore
            }
          }, _this4.$scopedSlots.before !== void 0 ? [_this4.$scopedSlots.before()] : _this4.icon !== void 0 ? [h('sw-icon', {
            staticClass: 'sw-basic-item__icon',
            props: {
              name: _this4.icon
            }
          })] : void 0)];
        },
        default: function _default() {
          return [h('div', {
            staticClass: 'sw-basic-item__content flex items-center',
            class: {
              'space-right': _this4.hasContent
            }
          }, _this4.$scopedSlots.content !== void 0 ? [_this4.$scopedSlots.content()] : [h('div', {
            staticClass: 'default-content'
          }, [_this4.content !== void 0 ? h('div', {
            staticClass: 'sw-basic-item__label'
          }, _this4.content) : void 0, _this4.subContent !== void 0 ? h('div', {
            staticClass: 'sw-basic-item__sublabel'
          }, _this4.subContent) : void 0])])];
        },
        after: function after() {
          return [h('div', {
            staticClass: 'flex items-center'
          }, _this4.$scopedSlots.after !== void 0 ? [_this4.$scopedSlots.after()] : _this4.hasSub ? [h('sw-icon', {
            staticClass: 'sw-basic-item__expansion color-grey',
            style: {
              transform: !_this4.collapsed ? 'rotate(180deg)' : void 0,
              color: _this4.mouseover ? 'currentColor' : void 0
            },
            props: {
              name: 'keyboard_arrow_down'
            }
          })] : void 0)];
        }
      }
    })]), this.hasSub ? h(Slide, {
      props: {
        collapsed: this.collapsed,
        shadow: this.innerShadow
      },
      scopedSlots: {
        default: function _default() {
          var sub = _this4.sub !== void 0 ? _this4.sub.map(function (props) {
            return h('sw-basic-item', {
              props: props,
              on: {
                'update:collapsed': function updateCollapsed(v) {
                  props.collapsed = v;

                  _this4.$forceUpdate();
                },
                'update:active': function updateActive(v) {
                  props.active = v;

                  _this4.$forceUpdate();
                }
              }
            });
          }) : [];
          sub.unshift(_this4.$scopedSlots.default ? _this4.$scopedSlots.default() : void 0);
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
    bottomMin: Number | String,
    shadow: Boolean
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
      class: {
        shadow: this.shadow
      },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2t5d2Fsa2VyLmVzbS5qcyIsInNvdXJjZXMiOlsiLi4vcGFja2FnZXMvY29tcG9uZW50cy9pY29uL3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9pY29uL2luZGV4LmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9pdGVtL3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9pdGVtL2luZGV4LmpzIiwiLi4vcGFja2FnZXMvbWl4aW5zL3ZhbGlkYXRlLmpzIiwiLi4vcGFja2FnZXMvbWl4aW5zL2FkdmFuY2VkQmx1ci5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvZmllbGQvc3JjL21haW4uanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL2ZpZWxkL2luZGV4LmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9pbnB1dC9zcmMvbWFpbi5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvaW5wdXQvaW5kZXguanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3Njcm9sbEFyZWEvc3JjL21haW4uanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3Njcm9sbEFyZWEvaW5kZXguanMiLCIuLi9wYWNrYWdlcy91dGlscy9pcy5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvc2VsZWN0L3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9zZWxlY3QvaW5kZXguanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL2J1dHRvbi9zcmMvbWFpbi5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvYnV0dG9uL2luZGV4LmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9tb2RhbC9zcmMvbWFpbi5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvbW9kYWwvaW5kZXguanMiLCIuLi9wYWNrYWdlcy91dGlscy9kb20uanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3BvcG92ZXIvc3JjL21haW4uanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3BvcG92ZXIvaW5kZXguanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL2NoZWNrYm94L3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9jaGVja2JveC9pbmRleC5qcyIsIi4uL3BhY2thZ2VzL21peGlucy9zaHV0dGxlLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9jaGVja2JveEdyb3VwL3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9jaGVja2JveEdyb3VwL2luZGV4LmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9yYWRpby9zcmMvbWFpbi5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvcmFkaW8vaW5kZXguanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3JhZGlvR3JvdXAvc3JjL21haW4uanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3JhZGlvR3JvdXAvaW5kZXguanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3BhZ2luYXRpb24vc3JjL3BhZ2luYXRpb24uanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3BhZ2luYXRpb24vc3JjL21haW4udnVlIiwiLi4vbm9kZV9tb2R1bGVzL3Z1ZS1ydW50aW1lLWhlbHBlcnMvZGlzdC9ub3JtYWxpemUtY29tcG9uZW50LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Z1ZS1ydW50aW1lLWhlbHBlcnMvZGlzdC9pbmplY3Qtc3R5bGUvYnJvd3Nlci5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvcGFnaW5hdGlvbi9pbmRleC5qcyIsIi4uL3BhY2thZ2VzL21peGlucy9zbGlkZU9ic2VydmVyLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9zbGlkZS9zcmMvbWFpbi5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvc2xpZGUvaW5kZXguanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL2Jhc2ljSXRlbS9zcmMvbWFpbi5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvYmFzaWNJdGVtL2luZGV4LmpzIiwiLi4vcGFja2FnZXMvdXRpbHMvdmRvbS5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvbm90aWZpY2F0aW9uL3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9ub3RpZmljYXRpb24vc3JjL25vdGlmaWNhdGlvbi5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvbGF5b3V0L3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9sYXlvdXQvaW5kZXguanMiLCIuLi9wYWNrYWdlcy9kaXJlY3RpdmVzL21hc2svc3JjL21haW4uanMiLCIuLi9wYWNrYWdlcy9kaXJlY3RpdmVzL21hc2svaW5kZXguanMiLCIuLi9wYWNrYWdlcy91dGlscy9ldmVudC5qcyIsIi4uL3BhY2thZ2VzL2RpcmVjdGl2ZXMvcmlwcGxlL3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvZGlyZWN0aXZlcy9yaXBwbGUvaW5kZXguanMiLCIuLi9wYWNrYWdlcy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdzd0ljb24nLFxuICBwcm9wczoge1xuICAgIG5hbWU6IFN0cmluZyxcbiAgICBjb2xvcjogU3RyaW5nLFxuICAgIHByaW1hcnk6IEJvb2xlYW4sXG4gICAgbmVnYXRpdmU6IEJvb2xlYW4sXG4gICAgcG9zaXRpdmU6IEJvb2xlYW4sXG4gICAgd2FybmluZzogQm9vbGVhbixcbiAgICBncmV5OiBCb29sZWFuLFxuICAgIGxpZ2h0R3JleTogQm9vbGVhbixcbiAgICBzaXplOiBTdHJpbmdcbiAgfSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBjbGFzc2VzKCkge1xuICAgICAgbGV0IGNsc1xuICAgICAgY29uc3QgaWNvbiA9IHRoaXMubmFtZVxuICBcbiAgICAgIGlmICghaWNvbikge1xuICAgICAgICByZXR1cm5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNscyA9ICdtYXRlcmlhbC1pY29ucydcbiAgICAgIH1cbiAgICAgIHJldHVybiB7XG4gICAgICAgIFtjbHNdOiB0cnVlLFxuICAgICAgICAnY29sb3ItcHJpbWFyeSc6IHRoaXMucHJpbWFyeSxcbiAgICAgICAgJ2NvbG9yLW5lZ2F0aXZlJzogdGhpcy5uZWdhdGl2ZSxcbiAgICAgICAgJ2NvbG9yLXBvc2l0aXZlJzogdGhpcy5wb3NpdGl2ZSxcbiAgICAgICAgJ2NvbG9yLXdhcm5pbmcnOiB0aGlzLndhcm5pbmcsXG4gICAgICAgICdjb2xvci1ncmV5JzogdGhpcy5ncmV5LFxuICAgICAgICAnY29sb3ItbGlnaHQtZ3JleSc6IHRoaXMubGlnaHRHcmV5LFxuICAgICAgfVxuICAgIH0sXG4gICAgY29udGVudCgpIHtcbiAgICAgIHJldHVybiB0aGlzLm5hbWUgfHwgJyAnXG4gICAgfSxcbiAgICBzdHlsZSgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGZvbnRTaXplOiB0aGlzLnNpemUgfHwgdm9pZCAwLFxuICAgICAgICBjb2xvcjogdGhpcy5jb2xvciB8fCB2b2lkIDBcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIHJlbmRlcihoKSB7XG4gICAgcmV0dXJuIGgoJ2knLCB7XG4gICAgICBzdGF0aWNDbGFzczogJ3N3LWljb24nLFxuICAgICAgY2xhc3M6IHRoaXMuY2xhc3NlcyxcbiAgICAgIHN0eWxlOiB0aGlzLnN0eWxlLFxuICAgICAgYXR0cnM6IHsgJ2FyaWEtaGlkZGVuJzogdHJ1ZSB9LFxuICAgICAgb246IHRoaXMuJGxpc3RlbmVyc1xuICAgIH0sIFtcbiAgICAgIHRoaXMuY29udGVudFxuICAgIF0pXG4gIH1cbn1cbiAgIiwiaW1wb3J0IEljb24gZnJvbSAnLi9zcmMvbWFpbi5qcydcblxuY29uc3QgaW5zdGFsbCA9IGZ1bmN0aW9uIChWdWUpIHtcbiAgVnVlLmNvbXBvbmVudChJY29uLm5hbWUsIEljb24pXG59XG5cbkljb24uaW5zdGFsbCA9IGluc3RhbGxcblxuZXhwb3J0IGRlZmF1bHQgSWNvblxuIiwiZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnc3dJdGVtJyxcbiAgcHJvcHM6IHtcbiAgICB3cmFwOiBCb29sZWFuLFxuICAgIGhpZGVCZWZvcmU6IEJvb2xlYW4sXG4gICAgaGlkZURlZmF1bHQ6IEJvb2xlYW4sXG4gICAgaGlkZUFmdGVyOiBCb29sZWFuLFxuICAgIHRvOiBTdHJpbmcgfCBPYmplY3QsXG4gICAgY2VudGVyOiBCb29sZWFuLFxuICAgIGVuZDogQm9vbGVhbixcbiAgICBkaXNhYmxlZDogQm9vbGVhbixcbiAgICBhY3RpdmU6IEJvb2xlYW4sXG4gICAgbWFzazogT2JqZWN0IHwgQm9vbGVhbixcbiAgICByaXBwbGU6IE9iamVjdCB8IEJvb2xlYW5cbiAgfSxcbiAgZGF0YTogKCkgPT4gKHt9KSxcbiAgcmVuZGVyKGgpIHtcbiAgICByZXR1cm4gaChgJHt0aGlzLnRvICE9PSB2b2lkIDAgPyAncm91dGVyLWxpbmsnIDogJ2Rpdid9YCwge1xuICAgICAgc3RhdGljQ2xhc3M6ICdzdy1pdGVtIGZsZXggaXRlbXMtY2VudGVyJyxcbiAgICAgIGNsYXNzOiB7XG4gICAgICAgICduby13cmFwJzogIXRoaXMud3JhcCxcbiAgICAgICAgYWN0aXZlOiB0aGlzLmFjdGl2ZSxcbiAgICAgICAgZGlzYWJsZTogdGhpcy5kaXNhYmxlZFxuICAgICAgfSxcbiAgICAgIG9uOiB0aGlzLmRpc2FibGVkID8gdm9pZCAwIDoge1xuICAgICAgICAuLi50aGlzLiRsaXN0ZW5lcnMsXG4gICAgICAgIGNsaWNrOiAoKSA9PiB7XG4gICAgICAgICAgdGhpcy4kZW1pdCgnY2xpY2snKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcHJvcHM6IHtcbiAgICAgICAgdG86IHRoaXMudG9cbiAgICAgIH0sXG4gICAgICBkaXJlY3RpdmVzOiAodGhpcy50byAhPT0gdm9pZCAwIHx8IHRoaXMuYWN0aXZlICE9PSB2b2lkIDAgfHwgdGhpcy5tYXNrID8gW1xuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ21hc2snLFxuICAgICAgICAgIHZhbHVlOiB0aGlzLm1hc2sgPyB7XG4gICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5tYXNrLmRpc2FibGVkLFxuICAgICAgICAgICAgY29sb3I6IHRoaXMubWFzay5jb2xvcixcbiAgICAgICAgICAgIHN0YXk6IHRoaXMubWFzay5zdGF5XG4gICAgICAgICAgfSA6IHsgZGlzYWJsZWQ6IHRydWUgfVxuICAgICAgICB9LFxuICAgICAgXSA6IFtdKS5jb25jYXQodGhpcy5yaXBwbGUgPyBbXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiAncmlwcGxlJyxcbiAgICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMucmlwcGxlLmRpc2FibGVkLFxuICAgICAgICAgICAgY29sb3I6IHRoaXMucmlwcGxlLmNvbG9yLFxuICAgICAgICAgICAgY2VudGVyOiB0aGlzLnJpcHBsZS5jZW50ZXJcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF0gOiBbXSlcbiAgICB9LCBbXG4gICAgICBoKCdkaXYnLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctaXRlbV9fY29udGVudCBmbGV4IGl0ZW1zLWNlbnRlcicsXG4gICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgJ25vLXdyYXAnOiAhdGhpcy53cmFwXG4gICAgICAgIH1cbiAgICAgIH0sIFtcblxuICAgICAgICB0aGlzLiRzY29wZWRTbG90cy5iZWZvcmUgIT09IHZvaWQgMCA/IGgoJ2RpdicsIHtcbiAgICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWl0ZW1fX2JlZm9yZSBmbGV4IGl0ZW1zLWNlbnRlcicsXG4gICAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAgIGhpZGU6IHRoaXMuaGlkZUJlZm9yZSxcbiAgICAgICAgICAgICdmbGV4LWF1dG8nOiB0aGlzLmhpZGVEZWZhdWx0LFxuICAgICAgICAgICAgJ25vLXdyYXAnOiAhdGhpcy53cmFwXG4gICAgICAgICAgfVxuICAgICAgICB9LCBbdGhpcy4kc2NvcGVkU2xvdHMuYmVmb3JlKCldKSA6IHZvaWQgMCxcbiAgXG4gICAgICAgIHRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQgIT09IHZvaWQgMCA/IGgoJ2RpdicsIHtcbiAgICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWl0ZW1fX2lubmVyIGZsZXggaXRlbXMtY2VudGVyIGl0ZW1zLWVuZCcsXG4gICAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAgIGhpZGU6IHRoaXMuaGlkZURlZmF1bHQsXG4gICAgICAgICAgICAnbm8td3JhcCc6ICF0aGlzLndyYXAsXG4gICAgICAgICAgICAnanVzdGlmeS1jZW50ZXInOiB0aGlzLmNlbnRlcixcbiAgICAgICAgICAgICdqdXN0aWZ5LWVuZCc6IHRoaXMuZW5kXG5cbiAgICAgICAgICB9XG4gICAgICAgIH0sIFt0aGlzLiRzY29wZWRTbG90cy5kZWZhdWx0KCldKSA6IHZvaWQgMCxcbiAgXG4gICAgICAgIHRoaXMuJHNjb3BlZFNsb3RzLmFmdGVyICE9PSB2b2lkIDAgPyBoKCdkaXYnLCB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1pdGVtX19hZnRlciBmbGV4IGl0ZW1zLWNlbnRlcicsXG4gICAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAgIGhpZGU6IHRoaXMuaGlkZUFmdGVyLFxuICAgICAgICAgICAgJ25vLXdyYXAnOiAhdGhpcy53cmFwXG4gICAgICAgICAgfVxuICAgICAgICB9LCBbdGhpcy4kc2NvcGVkU2xvdHMuYWZ0ZXIoKV0pIDogdm9pZCAwXG4gICAgICBdKVxuICAgIF0pXG4gIH1cbn1cbiAgIiwiaW1wb3J0IEl0ZW0gZnJvbSAnLi9zcmMvbWFpbi5qcydcblxuY29uc3QgaW5zdGFsbCA9IGZ1bmN0aW9uIChWdWUpIHtcbiAgVnVlLmNvbXBvbmVudChJdGVtLm5hbWUsIEl0ZW0pXG59XG5cbkl0ZW0uaW5zdGFsbCA9IGluc3RhbGxcblxuZXhwb3J0IGRlZmF1bHQgSXRlbVxuIiwiXG5leHBvcnQgZGVmYXVsdCB7XG4gIHByb3BzOiB7XG4gICAgZXJyb3JNZXNzYWdlOiBTdHJpbmcsXG4gICAgcnVsZXM6IEFycmF5XG4gIH0sXG5cbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaXNEaXJ0eTogZmFsc2UsXG4gICAgICBpbm5lckVycm9yOiBmYWxzZSxcbiAgICAgIGlubmVyRXJyb3JNZXNzYWdlOiB2b2lkIDBcbiAgICB9XG4gIH0sXG5cbiAgd2F0Y2g6IHtcbiAgICBmb3JjZUNoZWNrKHYpIHtcbiAgICAgIGlmICh0aGlzLnJ1bGVzID09PSB2b2lkIDApIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICB0aGlzLmlzRGlydHkgPSB0cnVlXG4gICAgICB0aGlzLnZhbGlkYXRlKHYpXG4gICAgfSxcbiAgICB2YWx1ZSh2KSB7XG4gICAgICBpZiAodGhpcy5mb3JjZUNoZWNrICE9PSB2b2lkIDAgfHwgdGhpcy5ydWxlcyA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgdGhpcy5pc0RpcnR5ID0gdHJ1ZVxuICAgICAgdGhpcy52YWxpZGF0ZSh2KVxuICAgIH1cbiAgfSxcblxuICBjb21wdXRlZDoge1xuICAgIHZhbGlkYXRlVmFsdWUoKSB7XG4gICAgICByZXR1cm4gdGhpcy5mb3JjZUNoZWNrID09PSB2b2lkIDAgPyB0aGlzLnZhbHVlIDogdGhpcy5mb3JjZUNoZWNrXG4gICAgfSxcbiAgICBoYXNFcnJvcigpIHtcbiAgICAgIHJldHVybiB0aGlzLmlubmVyRXJyb3IgPT09IHRydWVcbiAgICB9LFxuXG4gICAgY29tcHV0ZWRFcnJvck1lc3NhZ2UoKSB7XG4gICAgICByZXR1cm4gdGhpcy5lcnJvck1lc3NhZ2UgIT09IHZvaWQgMFxuICAgICAgICA/IHRoaXMuZXJyb3JNZXNzYWdlXG4gICAgICAgIDogdGhpcy5pbm5lckVycm9yTWVzc2FnZVxuICAgIH1cbiAgfSxcblxuICBtb3VudGVkKCkge1xuICAgIHRoaXMuJG9uKGBibHVyYCwgdGhpcy50cmlnZ2VyVmFsaWRhdGlvbilcbiAgfSxcblxuICBiZWZvcmVEZXN0cm95KCkge1xuICAgIHRoaXMuJG9mZihgYmx1cmAsIHRoaXMudHJpZ2dlclZhbGlkYXRpb24pXG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIHJlc2V0VmFsaWRhdGlvbigpIHtcbiAgICAgIHRoaXMuaXNEaXJ0eSA9IGZhbHNlXG4gICAgICB0aGlzLmlubmVyRXJyb3IgPSBmYWxzZVxuICAgICAgdGhpcy5pbm5lckVycm9yTWVzc2FnZSA9IHZvaWQgMFxuICAgIH0sXG5cbiAgICB2YWxpZGF0ZSh2YWwgPSB0aGlzLnZhbGlkYXRlVmFsdWUpIHtcbiAgICAgIGlmICghdGhpcy5ydWxlcyB8fCB0aGlzLnJ1bGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgY29uc3QgdXBkYXRlID0gKGVyciwgbXNnKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmlubmVyRXJyb3IgIT09IGVycikge1xuICAgICAgICAgIHRoaXMuaW5uZXJFcnJvciA9IGVyclxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbSA9IG1zZyB8fCB2b2lkIDBcblxuICAgICAgICBpZiAodGhpcy5pbm5lckVycm9yTWVzc2FnZSAhPT0gbSkge1xuICAgICAgICAgIHRoaXMuaW5uZXJFcnJvck1lc3NhZ2UgPSBtXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVyclxuICAgICAgfVxuXG4gICAgICByZXR1cm4gIXRoaXMucnVsZXMuc29tZShydWxlID0+IHtcbiAgICAgICAgbGV0IHJlc1xuXG4gICAgICAgIGlmICh0eXBlb2YgcnVsZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHJlcyA9IHJ1bGUodmFsKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIGlmIChyZXMgPT09IGZhbHNlIHx8IHR5cGVvZiByZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgcmV0dXJuIHVwZGF0ZSh0cnVlLCByZXMpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHVwZGF0ZShmYWxzZSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuXG4gICAgdHJpZ2dlclZhbGlkYXRpb24oZm9yY2UgPSB0cnVlKSB7XG4gICAgICBpZiAoZm9yY2UgPT09IHRydWUgfHwgdGhpcy5pc0RpcnR5ID09PSBmYWxzZSkge1xuICAgICAgICB0aGlzLmlzRGlydHkgPSB0cnVlXG4gICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlKHRoaXMudmFsaWRhdGVWYWx1ZSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsIlxuZXhwb3J0IGRlZmF1bHQge1xuICBwcm9wczoge30sXG4gIGRhdGE6ICgpID0+ICh7fSksXG4gIHdhdGNoOiB7fSxcbiAgY29tcHV0ZWQ6IHt9LFxuICBtZXRob2RzOiB7XG4gICAgYWR2YW5jZWRCbHVyKGUpIHtcbiAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7IHJldHVybiB9XG4gICAgICBsZXQgZXhjbHVkZWQgPSBmYWxzZVxuICAgICAgbGV0IGdldFJlZnMgPSByZWZOYW1lcyA9PiB7XG4gICAgICAgIGxldCBnZXREb21zID0gZWxzID0+IHtcbiAgICAgICAgICBlbHMgPSBBcnJheS5pc0FycmF5KGVscykgPyBlbHMgOiBbZWxzXVxuICAgICAgICAgIHJldHVybiBlbHMucmVkdWNlKChhY2N1bXVsYXRvciwgZWwpID0+IHtcbiAgICAgICAgICAgIGFjY3VtdWxhdG9yLnB1c2goZWwgJiYgKGVsLiRlbCB8fCBlbCkpXG4gICAgICAgICAgICByZXR1cm4gYWNjdW11bGF0b3JcbiAgICAgICAgICB9LCBbXSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZWZOYW1lcy5yZWR1Y2UoKGFjY3VtdWxhdG9yLCByZWYpID0+IGFjY3VtdWxhdG9yLmNvbmNhdChnZXREb21zKHRoaXMuJHJlZnNbcmVmXSkpLCBbXSlcbiAgICAgIH1cbiAgICAgIFxuICAgICAgaWYgKHRoaXMuZXhjbHVkZWRCbHVyUmVmcykge1xuICAgICAgICBsZXQgcmVmcyA9IGdldFJlZnModGhpcy5leGNsdWRlZEJsdXJSZWZzKVxuXG4gICAgICAgIHJlZnMuc29tZShyZWYgPT4ge1xuICAgICAgICAgIGlmIChyZWYgPT09IHZvaWQgMCkgeyByZXR1cm4gZmFsc2UgfVxuICAgICAgICAgIGV4Y2x1ZGVkID0gcmVmLmNvbnRhaW5zKGUudGFyZ2V0KSB8fCBmYWxzZVxuICAgICAgICAgIHJldHVybiBleGNsdWRlZFxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgaWYgKGV4Y2x1ZGVkKSB7XG4gICAgICAgIHRoaXMuZm9jdXNlZCA9IHRydWVcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBsZXQgZm9jdXNlZEJlZm9yZSA9IHRoaXMuZm9jdXNlZFxuXG4gICAgICBpZiAodGhpcy5ibHVyVHlwZSA9PT0gJ3JldmVyc2UnICYmIGZvY3VzZWRCZWZvcmUpIHtcbiAgICAgICAgdGhpcy5mb2N1c2VkID0gIWZvY3VzZWRCZWZvcmVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCByZWZzID0gZ2V0UmVmcyh0aGlzLmJsdXJSZWZzKVxuXG4gICAgICAgIHJlZnMuc29tZShyZWYgPT4ge1xuICAgICAgICAgIGlmIChyZWYgPT09IHZvaWQgMCkgeyByZXR1cm4gZmFsc2UgfVxuICAgICAgICAgIHRoaXMuZm9jdXNlZCA9IHJlZi5jb250YWlucyhlLnRhcmdldCkgfHwgZmFsc2VcbiAgICAgICAgICByZXR1cm4gdGhpcy5mb2N1c2VkXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMuZm9jdXNlZCAmJiBmb2N1c2VkQmVmb3JlKSB7IHRoaXMuJGVtaXQoYGJsdXJgLCBlKSB9XG4gICAgfVxuICB9LFxuICBtb3VudGVkKCkge1xuICAgIGlmICh0aGlzLmJsdXJSZWZzKSB7IGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmFkdmFuY2VkQmx1ciwgZmFsc2UpIH1cbiAgfSxcbiAgYmVmb3JlRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5ibHVyUmVmcykgeyBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5hZHZhbmNlZEJsdXIsIGZhbHNlKSB9XG4gIH0sXG59XG4gICIsImltcG9ydCBWYWxpZGF0ZU1peGluIGZyb20gJy4uLy4uLy4uL21peGlucy92YWxpZGF0ZSdcbmltcG9ydCBBZHZhbmNlZEJsdXJNaXhpbiBmcm9tICcuLi8uLi8uLi9taXhpbnMvYWR2YW5jZWRCbHVyJ1xuaW1wb3J0IEl0ZW0gZnJvbSAnLi4vLi4vaXRlbSdcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnc3dGaWVsZCcsXG4gIG1peGluczogW1ZhbGlkYXRlTWl4aW4sIEFkdmFuY2VkQmx1ck1peGluXSwgLy8gaGFzRXJyb3IsY29tcHV0ZWRFcnJvck1lc3NhZ2VcbiAgY29tcG9uZW50czogeyBJdGVtIH0sXG4gIHByb3BzOiB7XG4gICAgcmVxdWlyZWQ6IEJvb2xlYW4sXG4gICAgdW5kZXJsaW5lZDogQm9vbGVhbixcbiAgICBib3JkZXJlZDogQm9vbGVhbixcbiAgICBmaWxsZWQ6IEJvb2xlYW4sXG4gICAgZGlzYWJsZWQ6IEJvb2xlYW4sXG4gICAgbWluaTogQm9vbGVhbixcbiAgICBsYWJlbDogU3RyaW5nLFxuICAgIGZvcmNlQ2hlY2s6IFN0cmluZyB8IE9iamVjdCxcbiAgICBzcGFjZUFyb3VuZDoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IHRydWVcbiAgICB9XG4gIH0sXG4gIGRhdGE6ICgpID0+ICh7XG4gICAgZm9jdXNlZDogZmFsc2VcbiAgfSksXG4gIGNvbXB1dGVkOiB7XG4gICAgYmx1clJlZnMoKSB7XG4gICAgICByZXR1cm4gWydmaWVsZENvbnRlbnQnXVxuICAgIH1cbiAgfSxcbiAgd2F0Y2g6IHtcbiAgICBmb2N1c2VkKCkge1xuICAgICAgaWYgKHRoaXMuZm9jdXNlZCAmJiB0aGlzLmZvY3VzKSB7IHRoaXMuZm9jdXMoKSB9XG4gICAgICBpZiAoIXRoaXMuZm9jdXNlZCAmJiB0aGlzLmJsdXIpIHsgdGhpcy5ibHVyKCkgfVxuICAgIH1cbiAgfSxcbiAgcmVuZGVyKGgpIHtcbiAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgc3RhdGljQ2xhc3M6ICdzdy1maWVsZCBmbGV4IG5vLXdyYXAgaXRlbXMtY2VudGVyJyxcbiAgICAgIGNsYXNzOiB7XG4gICAgICAgIGRpc2FibGU6IHRoaXMuZGlzYWJsZWQsXG4gICAgICAgICdzcGFjZS1hcm91bmQnOiB0aGlzLnNwYWNlQXJvdW5kXG4gICAgICB9XG4gICAgfSwgW1xuICAgICAgdGhpcy5sYWJlbCAhPT0gdm9pZCAwID8gaCgnZGl2Jywge1xuICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWZpZWxkX19sYWJlbCBmbGV4IG5vLXdyYXAgaXRlbXMtY2VudGVyJ1xuICAgICAgfSwgW2goJ2RpdicsIHtcbiAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1sYWJlbCBmbGV4IG5vLXdyYXAgaXRlbXMtY2VudGVyJyxcbiAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICByZXF1aXJlZDogdGhpcy5yZXF1aXJlZFxuICAgICAgICB9XG4gICAgICB9LCB0aGlzLmxhYmVsKVxuICAgICAgXSkgOiB2b2lkIDAsXG5cbiAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgcmVmOiAnZmllbGRDb250ZW50JyxcbiAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1maWVsZF9fY29udGVudCBmbGV4IG5vLXdyYXAgaXRlbXMtY2VudGVyIHN3LWZvcm0nLFxuICAgICAgICBjbGFzczoge1xuICAgICAgICAgIHVuZGVybGluZTogdGhpcy51bmRlcmxpbmVkLFxuICAgICAgICAgIGJvcmRlcjogdGhpcy5ib3JkZXJlZCxcbiAgICAgICAgICBmaWxsOiB0aGlzLmZpbGxlZCxcbiAgICAgICAgICBmb2N1czogIXRoaXMuaGFzRXJyb3IgJiYgdGhpcy5mb2N1c2VkLFxuICAgICAgICAgIGVycm9yOiB0aGlzLmhhc0Vycm9yLFxuICAgICAgICAgICdwYWRkaW5nLW1pbic6ICF0aGlzLm1pbmksXG4gICAgICAgICAgJ2lubmVyLXBvaW50ZXInOiB0aGlzLmlubmVyUG9pbnRlclxuICAgICAgICB9XG4gICAgICB9LCBbXG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPyBoKCdkaXYnLCB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1maWVsZF9fZGlzYWJsZWQnXG4gICAgICAgIH0pIDogdm9pZCAwLFxuXG4gICAgICAgIGgoJ3N3LWl0ZW0nLCB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6ICdmbGV4LWF1dG8nLFxuICAgICAgICAgIHNjb3BlZFNsb3RzOiB7XG4gICAgICAgICAgICBiZWZvcmU6IHRoaXMuJHNjb3BlZFNsb3RzLmJlZm9yZSAhPT0gdm9pZCAwXG4gICAgICAgICAgICAgID8gKCkgPT4gW2goJ2RpdicsIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogJ2ZsZXggbm8td3JhcCBpdGVtcy1jZW50ZXIgbWFyZ2luLW1pbidcbiAgICAgICAgICAgICAgfSwgW3RoaXMuJHNjb3BlZFNsb3RzLmJlZm9yZSgpXSldIDogdm9pZCAwLFxuXG4gICAgICAgICAgICBkZWZhdWx0OiB0aGlzLiRzY29wZWRTbG90cy5kZWZhdWx0ICE9PSB2b2lkIDAgfHwgdGhpcy5nZXRJbm5lciAhPT0gdm9pZCAwXG4gICAgICAgICAgICAgID8gKCkgPT4gW3RoaXMuZ2V0SW5uZXIgIT09IHZvaWQgMCA/IHRoaXMuZ2V0SW5uZXIoaCkgOiB2b2lkIDAsIHRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQgIT09IHZvaWQgMCAmJiB0aGlzLmdldElubmVyID09PSB2b2lkIDAgPyB0aGlzLiRzY29wZWRTbG90cy5kZWZhdWx0KCkgOiB2b2lkIDBdIDogdm9pZCAwLFxuXG4gICAgICAgICAgICBhZnRlcjogdGhpcy4kc2NvcGVkU2xvdHMuYWZ0ZXIgIT09IHZvaWQgMCB8fCB0aGlzLmdldEFmdGVyICE9PSB2b2lkIDBcbiAgICAgICAgICAgICAgPyAoKSA9PiBbaCgnZGl2Jywge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiAnZmxleCBuby13cmFwIGl0ZW1zLWNlbnRlciBtYXJnaW4tbWluJ1xuICAgICAgICAgICAgICB9LCBbdGhpcy5nZXRBZnRlciAhPT0gdm9pZCAwID8gdGhpcy5nZXRBZnRlcihoKSA6IHZvaWQgMCwgdGhpcy4kc2NvcGVkU2xvdHMuYWZ0ZXIgIT09IHZvaWQgMCAmJiB0aGlzLmdldEFmdGVyID09PSB2b2lkIDAgPyB0aGlzLiRzY29wZWRTbG90cy5hZnRlcigpIDogdm9pZCAwXSldIDogdm9pZCAwXG4gICAgICAgICAgfVxuICAgICAgICB9KSxcblxuICAgICAgICB0aGlzLmhhc0Vycm9yID8gaCgnZGl2Jywge1xuICAgICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctZmllbGRfX2Vycm9yIGZsZXggbm8td3JhcCBpdGVtcy1jZW50ZXInXG4gICAgICAgIH0sIHRoaXMuY29tcHV0ZWRFcnJvck1lc3NhZ2UpIDogdm9pZCAwXG4gICAgICBdKVxuICAgIF0pXG4gIH1cbn1cbiAgIiwiaW1wb3J0IEZpZWxkIGZyb20gJy4vc3JjL21haW4uanMnXG5cbmNvbnN0IGluc3RhbGwgPSBmdW5jdGlvbiAoVnVlKSB7XG4gIFZ1ZS5jb21wb25lbnQoRmllbGQubmFtZSwgRmllbGQpXG59XG5cbkZpZWxkLmluc3RhbGwgPSBpbnN0YWxsXG5cbmV4cG9ydCBkZWZhdWx0IEZpZWxkXG4iLCJpbXBvcnQgRmllbGQgZnJvbSAnLi4vLi4vZmllbGQnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3N3SW5wdXQnLFxuICBtaXhpbnM6IFtGaWVsZF0sIC8vIGZvY3VzZWQsZGlzYWJsZWRcbiAgcHJvcHM6IHtcbiAgICB2YWx1ZTogU3RyaW5nLFxuICAgIHBsYWNlaG9sZGVyOiBTdHJpbmcsXG4gICAgYXV0b2NvbXBsZXRlOiBCb29sZWFuXG4gIH0sXG4gIGRhdGE6ICgpID0+ICh7fSksXG4gIGNvbXB1dGVkOiB7fSxcbiAgbWV0aG9kczoge1xuICAgIGZvY3VzKCkge1xuICAgICAgdGhpcy4kcmVmcy5pbnB1dC5mb2N1cygpXG4gICAgfSxcbiAgICBibHVyKCkge1xuICAgICAgdGhpcy4kcmVmcy5pbnB1dC5ibHVyKClcbiAgICB9LFxuICAgIGdldElubmVyKGgpIHtcbiAgICAgIHJldHVybiBbaCgnaW5wdXQnLCB7XG4gICAgICAgIHJlZjogJ2lucHV0JyxcbiAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1pbnB1dCBtYXJnaW4tbWluJyxcbiAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICBhdXRvY29tcGxldGU6IHRoaXMuYXV0b2NvbXBsZXRlID8gJ29uJyA6ICdvZmYnXG4gICAgICAgIH0sXG4gICAgICAgIGRvbVByb3BzOiB7XG4gICAgICAgICAgdmFsdWU6IHRoaXMudmFsdWUsXG4gICAgICAgICAgcGxhY2Vob2xkZXI6IHRoaXMucGxhY2Vob2xkZXIgfHwgJycsXG4gICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuZGlzYWJsZWRcbiAgICAgICAgfSxcbiAgICAgICAgb246IHtcbiAgICAgICAgICAuLi50aGlzLiRsaXN0ZW5lcnMsXG4gICAgICAgICAgYmx1cjogZSA9PiB7XG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdibHVyJywgZS50YXJnZXQudmFsdWUpXG4gICAgICAgICAgfSxcbiAgICAgICAgICBpbnB1dDogZSA9PiB7XG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdpbnB1dCcsIGUudGFyZ2V0LnZhbHVlKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSldXG4gICAgfVxuICB9XG59XG4gICIsImltcG9ydCBJbnB1dCBmcm9tICcuL3NyYy9tYWluLmpzJ1xuXG5jb25zdCBpbnN0YWxsID0gZnVuY3Rpb24gKFZ1ZSkge1xuICBWdWUuY29tcG9uZW50KElucHV0Lm5hbWUsIElucHV0KVxufVxuXG5JbnB1dC5pbnN0YWxsID0gaW5zdGFsbFxuXG5leHBvcnQgZGVmYXVsdCBJbnB1dFxuIiwiZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnc3dTY3JvbGxBcmVhJyxcbiAgcHJvcHM6IHtcbiAgICB4OiBCb29sZWFuLFxuICAgIHk6IEJvb2xlYW4sXG4gICAgd2lkdGg6IFN0cmluZyxcbiAgICBoZWlnaHQ6IFN0cmluZyxcbiAgICBzdHJldGNoOiBCb29sZWFuXG4gIH0sXG4gIGRhdGE6ICgpID0+ICh7fSksXG4gIGNvbXB1dGVkOiB7XG4gICAgc3R5bGUoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAnb3ZlcmZsb3cteCc6IHRoaXMueCA/ICdhdXRvJyA6ICdoaWRkZW4nLFxuICAgICAgICAnb3ZlcmZsb3cteSc6IHRoaXMueSA/ICdhdXRvJyA6ICdoaWRkZW4nLFxuICAgICAgICAnbWF4LXdpZHRoJzogdGhpcy53aWR0aCB8fCAnMTAwJScsXG4gICAgICAgIHdpZHRoOiB0aGlzLndpZHRoIHx8ICcxMDAlJyxcbiAgICAgICAgJ21heC1oZWlnaHQnOiB0aGlzLmhlaWdodCB8fCAnMTAwJScsXG4gICAgICAgIGhlaWdodDogdGhpcy5zdHJldGNoICYmICh0aGlzLmhlaWdodCB8fCAnMTAwJScpXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBtZXRob2RzOiB7fSxcbiAgcmVuZGVyKGgpIHtcbiAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgc3RhdGljQ2xhc3M6ICdzdy1zY3JvbGwtYXJlYScsXG4gICAgICBzdHlsZTogdGhpcy5zdHlsZSxcbiAgICAgIG9uOiB0aGlzLiRsaXN0ZW5lcnNcbiAgICB9LCB0aGlzLiRzY29wZWRTbG90cy5kZWZhdWx0ICE9PSB2b2lkIDAgPyBbdGhpcy4kc2NvcGVkU2xvdHMuZGVmYXVsdCgpXSA6IHZvaWQgMClcbiAgfVxufVxuICAiLCJpbXBvcnQgU2Nyb2xsQXJlYSBmcm9tICcuL3NyYy9tYWluLmpzJ1xuXG5jb25zdCBpbnN0YWxsID0gZnVuY3Rpb24gKFZ1ZSkge1xuICBWdWUuY29tcG9uZW50KFNjcm9sbEFyZWEubmFtZSwgU2Nyb2xsQXJlYSlcbn1cblxuU2Nyb2xsQXJlYS5pbnN0YWxsID0gaW5zdGFsbFxuXG5leHBvcnQgZGVmYXVsdCBTY3JvbGxBcmVhXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1zZWxmLWNvbXBhcmUgKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0RlZXBFcXVhbChhLCBiKSB7XG4gIGlmIChhID09PSBiKSB7XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIGlmIChhIGluc3RhbmNlb2YgRGF0ZSAmJiBiIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgIHJldHVybiBhLmdldFRpbWUoKSA9PT0gYi5nZXRUaW1lKClcbiAgfVxuXG4gIGlmIChhICE9PSBhICYmIGIgIT09IGIpIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgaWYgKGEgIT09IE9iamVjdChhKSB8fCBiICE9PSBPYmplY3QoYikpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIGNvbnN0IHByb3BzID0gT2JqZWN0LmtleXMoYSlcblxuICBpZiAocHJvcHMubGVuZ3RoICE9PSBPYmplY3Qua2V5cyhiKS5sZW5ndGgpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIHJldHVybiBwcm9wcy5ldmVyeShwcm9wID0+IGlzRGVlcEVxdWFsKGFbcHJvcF0sIGJbcHJvcF0pKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmdDb250YWluKHMsIHYsIHJhbmRvbSkge1xuICBsZXQgaW5uZXJTID0gU3RyaW5nKHMpXG4gIGxldCBpbm5lclYgPSByYW5kb20gPT09IHRydWUgPyB2LnJlcGxhY2UoL1xccysvZywgJycpLnNwbGl0KCcnKSA6IHYucmVwbGFjZSgvXFxzKy9nLCAnICcpLnNwbGl0KCcgJylcbiAgbGV0IHN1bSA9IDBcblxuICBpbm5lclYuZm9yRWFjaCh4ID0+IHtcbiAgICBpZiAoaW5uZXJTLmluY2x1ZGVzKHgpKSB7XG4gICAgICBpbm5lclMgPSBpbm5lclMucmVwbGFjZSh4LCAnJylcbiAgICAgIHN1bSsrXG4gICAgfVxuICB9KVxuICByZXR1cm4gc3VtID49IGlubmVyVi5sZW5ndGhcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzT2JqZWN0KHYpIHtcbiAgcmV0dXJuIE9iamVjdCh2KSA9PT0gdlxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNEYXRlKHYpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2KSA9PT0gJ1tvYmplY3QgRGF0ZV0nXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1JlZ2V4cCh2KSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodikgPT09ICdbb2JqZWN0IFJlZ0V4cF0nXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlcih2KSB7XG4gIHJldHVybiB0eXBlb2YgdiA9PT0gJ251bWJlcicgJiYgaXNGaW5pdGUodilcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nKHYpIHtcbiAgcmV0dXJuIHR5cGVvZiB2ID09PSAnc3RyaW5nJ1xufVxuIiwiaW1wb3J0IEZpZWxkIGZyb20gJy4uLy4uL2ZpZWxkJ1xuaW1wb3J0IFNjb3JsbEFyZWEgZnJvbSAnLi4vLi4vc2Nyb2xsQXJlYSdcbmltcG9ydCB7IGlzRGVlcEVxdWFsLCBpc1N0cmluZ0NvbnRhaW4sIGlzT2JqZWN0IH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvaXMnXG5cbi8vIGltcG9ydCB7IGRlZHVwbGljYXRlIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvZGVkdXBsaWNhdGUnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3N3U2VsZWN0JyxcbiAgbWl4aW5zOiBbRmllbGRdLCAvLyBmb2N1c2VkLGRpc2FibGVkXG4gIGNvbXBvbmVudHM6IHtcbiAgICBTY29ybGxBcmVhXG4gIH0sXG4gIHByb3BzOiB7XG4gICAgbXVsdGlwbGU6IEJvb2xlYW4sXG4gICAgdmFsdWU6IHtcbiAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgfSxcbiAgICBvcHRpb25zOiBBcnJheSxcbiAgICBmaWx0ZXI6IEJvb2xlYW4sXG4gICAgcGxhY2Vob2xkZXI6IFN0cmluZyxcbiAgICBvcHRpb25zSGVpZ2h0OiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnMjAwcHgnXG4gICAgfSxcbiAgICBzZWxlY3RlZFN0eWxlOiBTdHJpbmdcbiAgfSxcbiAgZGF0YTogKCkgPT4gKHtcbiAgICBibHVyVHlwZTogJ3JldmVyc2UnLFxuICAgIGZpbHRlclZhbHVlOiAnJ1xuICB9KSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBleGNsdWRlZEJsdXJSZWZzKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyID8gWydpbnB1dCcsICdzZWxlY3RlZCcsICdzZWxlY3RPcHRpb25zJ10gOiBbJ3NlbGVjdGVkJywgJ3NlbGVjdE9wdGlvbnMnXVxuICAgIH0sXG4gICAgaW5uZXJWYWx1ZToge1xuICAgICAgZ2V0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRFeGFjdFZhbHVlcyh0aGlzLnZhbHVlKVxuICAgICAgfSxcbiAgICAgIHNldCh2YWwpIHtcbiAgICAgICAgdGhpcy4kZW1pdChcbiAgICAgICAgICAnaW5wdXQnLFxuICAgICAgICAgIHZhbFxuICAgICAgICApXG4gICAgICB9XG4gICAgfSxcbiAgICBpbm5lck9wdGlvbnMoKSB7XG4gICAgICByZXR1cm4gdGhpcy5vcHRpb25zLnJlZHVjZSgoYSwgYykgPT4ge1xuICAgICAgICBpZiAoaXNTdHJpbmdDb250YWluKHRoaXMuZ2V0TmFtZShjKSwgdGhpcy5maWx0ZXJWYWx1ZSkpIHtcbiAgICAgICAgICBhLnB1c2goYylcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYVxuICAgICAgfSwgW10pIHx8IFtdXG4gICAgfVxuICB9LFxuICB3YXRjaDoge1xuICAgIG9wdGlvbnMoKSB7XG4gICAgICB0aGlzLmlubmVyVmFsdWUgPSB0aGlzLmdldEV4YWN0VmFsdWVzKHRoaXMudmFsdWUpXG4gICAgfVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgZm9jdXMoKSB7XG4gICAgICB0aGlzLiRuZXh0VGljaygoKSA9PiB7XG4gICAgICAgIHRoaXMuJHJlZnMuaW5wdXQuZm9jdXMoKVxuICAgICAgfSlcbiAgICB9LFxuICAgIGJsdXIoKSB7XG4gICAgICB0aGlzLiRyZWZzLmlucHV0LmJsdXIoKVxuICAgIH0sXG4gICAgY2xlYXJGaWx0ZXIoKSB7XG4gICAgICB0aGlzLmZpbHRlclZhbHVlID0gJydcbiAgICB9LFxuICAgIHRyaWdnZXJCbHVyKGUpIHtcbiAgICAgIHRoaXMuZm9jdXNlZCA9IGZhbHNlXG4gICAgICB0aGlzLiRlbWl0KGBibHVyYCwgZSlcbiAgICB9LFxuICAgIGdldElubmVyKGgpIHtcbiAgICAgIGxldCBnZXRPcHRpb25zID0gaCA9PiB7XG4gICAgICAgIGlmICh0aGlzLmlubmVyT3B0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5pbm5lck9wdGlvbnMubWFwKG9wdGlvbiA9PiBoKCdzdy1pdGVtJywge1xuICAgICAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAgICAgc2VsZWN0ZWQ6IHRoaXMuY2hlY2tTZWxlY3RlZChvcHRpb24pXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbmF0aXZlT246IHtcbiAgICAgICAgICAgICAgY2xpY2s6IGUgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHRoaXMuZm9ybWF0VmFsdWUob3B0aW9uKVxuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJGaWx0ZXIoKVxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5tdWx0aXBsZSkge1xuICAgICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyQmx1cihlKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLmZvY3VzKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzY29wZWRTbG90czoge1xuICAgICAgICAgICAgICBkZWZhdWx0OiAoKSA9PiBbaCgnZGl2Jywge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctc2VsZWN0X19vcHRpb24nXG4gICAgICAgICAgICAgIH0sIFN0cmluZyh0aGlzLmdldE5hbWUob3B0aW9uKSkpXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBbaCgnc3ctaXRlbScsIHtcbiAgICAgICAgICAgIHNjb3BlZFNsb3RzOiB7XG4gICAgICAgICAgICAgIGRlZmF1bHQ6ICgpID0+IFtoKCdkaXYnLCB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1zZWxlY3RfX29wdGlvbiBuby1vcHRpb25zJ1xuICAgICAgICAgICAgICB9LCAnbm8gb3B0aW9ucycpXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxldCBnZXRTZWxlY3RlZCA9IGggPT4gdGhpcy5nZXRFeGFjdE9wdGlvbnModGhpcy5pbm5lclZhbHVlKS5tYXAoeCA9PiBoKCdzdy1pdGVtJywge1xuICAgICAgICBzdGF0aWNDbGFzczogJ21hcmdpbi1taW4gc3ctZm9ybSBzZWxlY3RlZC1vcHRpb24nLFxuICAgICAgICBjbGFzczogdGhpcy5zZWxlY3RlZFN0eWxlID09PSB2b2lkIDBcbiAgICAgICAgICA/IHtcbiAgICAgICAgICAgIHVuZGVybGluZTogdGhpcy51bmRlcmxpbmVkLFxuICAgICAgICAgICAgYm9yZGVyOiB0aGlzLmJvcmRlcmVkLFxuICAgICAgICAgICAgZmlsbDogdGhpcy5maWxsZWRcbiAgICAgICAgICB9IDoge1xuICAgICAgICAgICAgW3RoaXMuc2VsZWN0ZWRTdHlsZV06IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICByZWY6ICdzZWxlY3RlZCcsXG4gICAgICAgIHJlZkluRm9yOiB0cnVlLFxuICAgICAgICBzY29wZWRTbG90czoge1xuICAgICAgICAgIGRlZmF1bHQ6ICgpID0+IFtoKCdkaXYnLCB7XG4gICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICBwYWRkaW5nOiB0aGlzLm1pbmkgPyAnM3B4IDAgM3B4IDlweCcgOiAnM3B4IDlweCcsXG4gICAgICAgICAgICAgICd3aGl0ZS1zcGFjZSc6IHRoaXMubWluaSA/ICdub3dyYXAnIDogdm9pZCAwXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgU3RyaW5nKHRoaXMuZ2V0TmFtZSh4KSkpXSxcbiAgICAgICAgICBhZnRlcjogIXRoaXMubWluaSA/ICgpID0+IFtoKCdzdy1pY29uJywge1xuICAgICAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAgICAgJ2hvdmVyLWNvbG9yLXByaW1hcnknOiB0cnVlLFxuICAgICAgICAgICAgICAnY29sb3ItZ3JleSc6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAnYm9yZGVyLXJhZGl1cyc6ICc1MCUnLFxuICAgICAgICAgICAgICBwYWRkaW5nOiAnMCAzcHggMCAwJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICAgIG5hbWU6IHRoaXMuZmlsbGVkICYmIHRoaXMuc2VsZWN0ZWRTdHlsZSA9PT0gdm9pZCAwIHx8IHRoaXMuc2VsZWN0ZWRTdHlsZSA9PT0gJ2ZpbGwnID8gJ2NhbmNlbCcgOiAnY2xlYXInLFxuICAgICAgICAgICAgICBzaXplOiAnMTRweCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBuYXRpdmVPbjoge1xuICAgICAgICAgICAgICBjbGljazogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHRoaXMuZm9ybWF0VmFsdWUoeCwgJ3JlbW92ZScpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KV0gOiB2b2lkIDBcbiAgICAgICAgfVxuICAgICAgfSkpXG5cbiAgICAgIHJldHVybiBbaCgnc3ctaXRlbScsIHtcbiAgICAgICAgc3RhdGljQ2xhc3M6ICdmbGV4LWF1dG8nLFxuICAgICAgICBwcm9wczoge1xuICAgICAgICAgIHdyYXA6IHRydWUsXG4gICAgICAgICAgaGlkZURlZmF1bHQ6IHRoaXMuaW5uZXJWYWx1ZS5sZW5ndGggPiAwICYmICghdGhpcy5mb2N1c2VkIHx8ICF0aGlzLmZpbHRlcilcbiAgICAgICAgfSxcbiAgICAgICAgc2NvcGVkU2xvdHM6IHtcbiAgICAgICAgICBiZWZvcmU6IHRoaXMuaW5uZXJWYWx1ZS5sZW5ndGggPiAwID8gKCkgPT4gZ2V0U2VsZWN0ZWQoaCkgOiB2b2lkIDAsXG4gICAgICAgICAgZGVmYXVsdDogKCkgPT4gW2goJ2lucHV0Jywge1xuICAgICAgICAgICAgcmVmOiAnaW5wdXQnLFxuICAgICAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1pbnB1dCBtYXJnaW4tbWluJyxcbiAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgIGN1cnNvcjogIXRoaXMuZmlsdGVyID8gJ3BvaW50ZXInIDogdm9pZCAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZG9tUHJvcHM6IHtcbiAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuZmlsdGVyVmFsdWUsXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiB0aGlzLnBsYWNlaG9sZGVyIHx8ICcnLFxuICAgICAgICAgICAgICBkaXNhYmxlZDogIXRoaXMuZmlsdGVyXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgLi4udGhpcy4kbGlzdGVuZXJzLFxuICAgICAgICAgICAgICBpbnB1dDogZSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJWYWx1ZSA9IGUudGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KV1cbiAgICAgICAgfVxuICAgICAgfSksIHRoaXMuZm9jdXNlZCA/IGgoJ2RpdicsIHtcbiAgICAgICAgcmVmOiAnc2VsZWN0T3B0aW9ucycsXG4gICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctc2VsZWN0X19vcHRpb25zIGNvbW1vbi1zaGFkb3cnLFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgICdtYXgtaGVpZ2h0JzogdGhpcy5vcHRpb25zSGVpZ2h0XG4gICAgICAgIH1cbiAgICAgIH0sIFtoKCdzdy1zY3JvbGwtYXJlYScsIHtcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICB5OiB0cnVlLFxuICAgICAgICAgIGhlaWdodDogdGhpcy5vcHRpb25zSGVpZ2h0XG4gICAgICAgIH0sXG4gICAgICAgIHNjb3BlZFNsb3RzOiB7XG4gICAgICAgICAgZGVmYXVsdDogKCkgPT4gZ2V0T3B0aW9ucyhoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgXSkgOiB2b2lkIDBdXG4gICAgfSxcbiAgICBnZXRBZnRlcihoKSB7XG4gICAgICByZXR1cm4gW2goJ3N3LWljb24nLCB7XG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgbmFtZTogJ2tleWJvYXJkX2Fycm93X2Rvd24nLFxuICAgICAgICAgIHNpemU6ICcyMHB4J1xuICAgICAgICB9LFxuICAgICAgICBzdGF0aWNDbGFzczogJ2NvbG9yLWdyZXkgaG92ZXItY29sb3ItcHJpbWFyeScsXG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgdHJhbnNmb3JtOiB0aGlzLmZvY3VzZWQgPyAncm90YXRlKDE4MGRlZyknIDogdm9pZCAwXG4gICAgICAgIH1cbiAgICAgIH0pXVxuICAgIH0sXG4gICAgZm9ybWF0VmFsdWUob3B0aW9uLCBvcGUpIHtcbiAgICAgIGxldCBkdXBsaWNhdGVkID0gZmFsc2VcbiAgICAgIGxldCByZXMgPSBbXVxuXG4gICAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xuICAgICAgICB0aGlzLmlubmVyVmFsdWUuZm9yRWFjaCh4ID0+IHtcbiAgICAgICAgICBpZiAoaXNEZWVwRXF1YWwoeCwgdGhpcy5nZXRWYWx1ZShvcHRpb24pKSkge1xuICAgICAgICAgICAgZHVwbGljYXRlZCA9IHRydWVcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzLnB1c2goeClcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9IGVsc2UgaWYgKG9wZSA9PT0gJ3JlbW92ZScpIHsgZHVwbGljYXRlZCA9IHRydWUgfVxuICAgICAgaWYgKCFkdXBsaWNhdGVkKSB7XG4gICAgICAgIHJlcy5wdXNoKHRoaXMuZ2V0VmFsdWUob3B0aW9uKSlcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXNcbiAgICB9LFxuICAgIGNoZWNrU2VsZWN0ZWQob3B0aW9uKSB7XG4gICAgICByZXR1cm4gdGhpcy5pbm5lclZhbHVlLnNvbWUoeCA9PiBpc0RlZXBFcXVhbCh4LCB0aGlzLmdldFZhbHVlKG9wdGlvbikpKVxuICAgIH0sXG4gICAgZ2V0RXhhY3RWYWx1ZXModmFsdWUpIHtcbiAgICAgIGxldCB2ID0gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZSA6IFt2YWx1ZV1cblxuICAgICAgcmV0dXJuIHYucmVkdWNlKChhLCBjKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuc29tZSh4ID0+IGlzRGVlcEVxdWFsKHRoaXMuZ2V0VmFsdWUoeCksIGMpKSkge1xuICAgICAgICAgIGEucHVzaChjKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhXG4gICAgICB9LCBbXSlcbiAgICB9LFxuICAgIGdldEV4YWN0T3B0aW9ucyh2YWx1ZSkge1xuICAgICAgcmV0dXJuIHZhbHVlLnJlZHVjZSgoYSwgYykgPT4ge1xuICAgICAgICB0aGlzLm9wdGlvbnMuZm9yRWFjaCh4ID0+IHtcbiAgICAgICAgICBpZiAoaXNEZWVwRXF1YWwodGhpcy5nZXRWYWx1ZSh4KSwgYykpIHtcbiAgICAgICAgICAgIGEucHVzaCh4KVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIGFcbiAgICAgIH0sIFtdKVxuICAgIH0sXG4gICAgZ2V0VmFsdWUob3B0aW9uKSB7XG4gICAgICByZXR1cm4gaXNPYmplY3Qob3B0aW9uKSAmJiBvcHRpb24uaGFzT3duUHJvcGVydHkoJ3ZhbHVlJylcbiAgICAgICAgPyBvcHRpb24udmFsdWUgOiBvcHRpb25cbiAgICB9LFxuICAgIGdldE5hbWUob3B0aW9uKSB7XG4gICAgICByZXR1cm4gaXNPYmplY3Qob3B0aW9uKSAmJiBvcHRpb24uaGFzT3duUHJvcGVydHkoJ25hbWUnKVxuICAgICAgICA/IG9wdGlvbi5uYW1lIDogb3B0aW9uXG4gICAgfVxuICB9XG59XG4gICIsImltcG9ydCBTZWxlY3QgZnJvbSAnLi9zcmMvbWFpbi5qcydcblxuY29uc3QgaW5zdGFsbCA9IGZ1bmN0aW9uIChWdWUpIHtcbiAgVnVlLmNvbXBvbmVudChTZWxlY3QubmFtZSwgU2VsZWN0KVxufVxuXG5TZWxlY3QuaW5zdGFsbCA9IGluc3RhbGxcblxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0XG4iLCJpbXBvcnQgSXRlbSBmcm9tICcuLi8uLi9pdGVtJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdzd0J1dHRvbicsXG4gIGNvbXBvbmVudHM6IHsgSXRlbSB9LFxuICBwcm9wczoge1xuICAgIHVuZGVybGluZWQ6IEJvb2xlYW4sXG4gICAgYm9yZGVyZWQ6IEJvb2xlYW4sXG4gICAgZmlsbGVkOiBCb29sZWFuLFxuICAgIGRpc2FibGVkOiBCb29sZWFuLFxuICAgIGNvbG9yOiBTdHJpbmcsXG4gICAgcHJpbWFyeTogQm9vbGVhbixcbiAgICBuZWdhdGl2ZTogQm9vbGVhbixcbiAgICBwb3NpdGl2ZTogQm9vbGVhbixcbiAgICB3YXJuaW5nOiBCb29sZWFuLFxuICAgIHJvdW5kOiBCb29sZWFuLFxuICAgIHNoYWRvdzogQm9vbGVhbixcbiAgICBtaW5pOiBCb29sZWFuLFxuICAgIHRvOiBTdHJpbmcgfCBPYmplY3QsXG4gICAgY2VudGVyOiBCb29sZWFuLFxuICAgIGVuZDogQm9vbGVhblxuICB9LFxuICBkYXRhOiAoKSA9PiAoe30pLFxuICByZW5kZXIoaCkge1xuICAgIHJldHVybiBoKCdidXR0b24nLCB7XG4gICAgICBzdGF0aWNDbGFzczogJ3N3LWJ1dHRvbiBmbGV4IG5vLXdyYXAgaXRlbXMtY2VudGVyJyxcbiAgICAgIHN0eWxlOiB7XG4gICAgICAgIGNvbG9yOiAhdGhpcy5kaXNhYmxlZCAmJiAhdGhpcy5maWxsZWQgJiYgdGhpcy5jb2xvciB8fCB2b2lkIDAsXG4gICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogIXRoaXMuZGlzYWJsZWQgJiYgdGhpcy5maWxsZWQgJiYgdGhpcy5jb2xvciB8fCB2b2lkIDBcbiAgICAgIH0sXG4gICAgICBjbGFzczoge1xuICAgICAgICB1bmRlcmxpbmU6IHRoaXMudW5kZXJsaW5lZCxcbiAgICAgICAgYm9yZGVyOiB0aGlzLmJvcmRlcmVkLFxuICAgICAgICBmaWxsOiB0aGlzLmZpbGxlZCxcbiAgICAgICAgcHJpbWFyeTogdGhpcy5wcmltYXJ5LFxuICAgICAgICBuZWdhdGl2ZTogdGhpcy5uZWdhdGl2ZSxcbiAgICAgICAgcG9zaXRpdmU6IHRoaXMucG9zaXRpdmUsXG4gICAgICAgIHdhcm5pbmc6IHRoaXMud2FybmluZyxcbiAgICAgICAgZ3JleTogdGhpcy5kaXNhYmxlZCxcbiAgICAgICAgcm91bmQ6IHRoaXMucm91bmQgJiYgIXRoaXMudW5kZXJsaW5lZCxcbiAgICAgICAgJ2NvbW1vbi1zaGFkb3cnOiB0aGlzLnNoYWRvdyAmJiAodGhpcy5ib3JkZXJlZCB8fCB0aGlzLmZpbGxlZClcbiAgICAgIH1cbiAgICB9LCBbXG4gICAgICBoKCdzdy1pdGVtJywge1xuICAgICAgICBzdGF0aWNDbGFzczogJ2ZsZXgtYXV0bycsXG4gICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgJ3JvdW5kLXNsb3QnOiB0aGlzLiRzY29wZWRTbG90cy5yb3VuZCxcbiAgICAgICAgICBtaW5pOiB0aGlzLm1pbmlcbiAgICAgICAgfSxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJ1xuICAgICAgICB9LFxuICAgICAgICBwcm9wczoge1xuICAgICAgICAgIHRvOiB0aGlzLnRvLFxuICAgICAgICAgIGNlbnRlcjogdGhpcy5jZW50ZXIsXG4gICAgICAgICAgZW5kOiB0aGlzLmVuZCxcbiAgICAgICAgICBkaXNhYmxlZDogdGhpcy5kaXNhYmxlZFxuICAgICAgICB9LFxuICAgICAgICBvbjogdGhpcy5kaXNhYmxlZCA/IHZvaWQgMCA6IHtcbiAgICAgICAgICAuLi50aGlzLiRsaXN0ZW5lcnNcbiAgICAgICAgfSxcbiAgICAgICAgc2NvcGVkU2xvdHM6IHRoaXMuJHNjb3BlZFNsb3RzLnJvdW5kICE9PSB2b2lkIDBcbiAgICAgICAgICA/IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6ICgpID0+IFtoKCdkaXYnLCB7XG4gICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiAnZmxleCBuby13cmFwIGl0ZW1zLWNlbnRlciBtYXJnaW4tbWluIHN3LWJ1dHRvbl9faW5uZXIgZmxleC1hdXRvJ1xuICAgICAgICAgICAgfSwgW3RoaXMuJHNjb3BlZFNsb3RzLnJvdW5kKCldKV1cbiAgICAgICAgICB9IDoge1xuICAgICAgICAgICAgYmVmb3JlOiB0aGlzLiRzY29wZWRTbG90cy5iZWZvcmUgIT09IHZvaWQgMFxuICAgICAgICAgICAgICA/ICgpID0+IFtoKCdkaXYnLCB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6ICdmbGV4IG5vLXdyYXAgaXRlbXMtY2VudGVyIG1hcmdpbi1taW4gc3ctYnV0dG9uX19iZWZvcmUnXG4gICAgICAgICAgICAgIH0sIFt0aGlzLiRzY29wZWRTbG90cy5iZWZvcmUoKV0pXSA6IHZvaWQgMCxcbiAgXG4gICAgICAgICAgICBkZWZhdWx0OiB0aGlzLiRzY29wZWRTbG90cy5kZWZhdWx0ICE9PSB2b2lkIDBcbiAgICAgICAgICAgICAgPyAoKSA9PiBbaCgnZGl2Jywge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiAnZmxleCBuby13cmFwIGl0ZW1zLWNlbnRlciBtYXJnaW4tbWluIHN3LWJ1dHRvbl9faW5uZXIgZmxleC1hdXRvJ1xuICAgICAgICAgICAgICB9LCBbdGhpcy4kc2NvcGVkU2xvdHMuZGVmYXVsdCgpXSldIDogdm9pZCAwLFxuICBcbiAgICAgICAgICAgIGFmdGVyOiB0aGlzLiRzY29wZWRTbG90cy5hZnRlciAhPT0gdm9pZCAwXG4gICAgICAgICAgICAgID8gKCkgPT4gW2goJ2RpdicsIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogJ2ZsZXggbm8td3JhcCBpdGVtcy1jZW50ZXIgbWFyZ2luLW1pbiBzdy1idXR0b25fX2FmdGVyJ1xuICAgICAgICAgICAgICB9LCBbdGhpcy4kc2NvcGVkU2xvdHMuYWZ0ZXIoKV0pXSA6IHZvaWQgMFxuICAgICAgICAgIH1cbiAgICAgIH0pXG4gICAgXSlcbiAgfVxufVxuICAiLCJpbXBvcnQgQnV0dG9uIGZyb20gJy4vc3JjL21haW4uanMnXG5cbmNvbnN0IGluc3RhbGwgPSBmdW5jdGlvbiAoVnVlKSB7XG4gIFZ1ZS5jb21wb25lbnQoQnV0dG9uLm5hbWUsIEJ1dHRvbilcbn1cblxuQnV0dG9uLmluc3RhbGwgPSBpbnN0YWxsXG5cbmV4cG9ydCBkZWZhdWx0IEJ1dHRvblxuIiwiaW1wb3J0IHN3QnV0dG9uIGZyb20gJy4uLy4uL2J1dHRvbidcbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3N3TW9kYWwnLFxuICBjb21wb25lbnRzOiB7XG4gICAgc3dCdXR0b25cbiAgfSxcbiAgcHJvcHM6IHtcbiAgICBzaG93OiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogZmFsc2UsXG4gICAgfSxcbiAgICB0aXRsZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ+WfuuacrOeUqOazlXRpdGxlJ1xuICAgIH0sXG4gICAgd2lkdGg6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICc0MCUnXG4gICAgfVxuICB9LFxuICBjb21wdXRlZDoge1xuICAgIHN0eWxlKCkge1xuICAgICAgaWYgKHRoaXMuc2hvdykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHpJbmRleDogOTk5LFxuICAgICAgICAgIG9wYWNpdHk6IDFcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB6SW5kZXg6IC0xMCxcbiAgICAgICAgICBvcGFjaXR5OiAwXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBoYW5kbGVDYW5jZWwoKSB7XG4gICAgICB0aGlzLiRlbWl0KCdjYW5jZWwnKVxuICAgIH0sXG4gICAgaGFuZGxlQ29uZmlybSgpIHtcbiAgICAgIHRoaXMuJGVtaXQoJ2NvbmZpcm0nKVxuICAgIH0sXG4gIH0sXG4gIHJlbmRlcihoKSB7XG4gICAgcmV0dXJuIGgoJ2Rpdicse1xuICAgICAgc3RhdGljQ2xhc3M6ICdzdy1tb2RhbC1tYXNrJyxcbiAgICAgIHN0eWxlOiB0aGlzLnN0eWxlLFxuICAgICAgb246IHtcbiAgICAgICAgY2xpY2s6IHRoaXMuaGFuZGxlQ2FuY2VsXG4gICAgICB9IFxuICAgIH0sIFsgaCgnZGl2JywgeyBcbiAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1tb2RhbCcsXG4gICAgICAgICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgICAgICAgc2hvd01vZGFsOiB0aGlzLnNob3csXG4gICAgICAgICAgICAgICAgaGlkZU1vZGFsOiAhdGhpcy5zaG93XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgd2lkdGg6IHRoaXMud2lkdGhcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICBjbGljazogZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFsgdGhpcy4kc2NvcGVkU2xvdHMuaGVhZGVyID09PSB2b2lkIDAgXG4gICAgICAgICAgICAgICAgPyBoKCdkaXYnLCBcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzczogJ3N3LW1vZGFsLXRpdGxlJ1xuICAgICAgICAgICAgICAgICAgICAgIH0sIFsgaCgnc3BhbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiAnc3ctbW9kYWwtdGl0bGUtdGV4dCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRpdGxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGgoJ3NwYW4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzczogJ3N3LW1vZGFsLWNsb3NlLWljb24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiAoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2FuY2VsKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoKCdpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzczogJ21hdGVyaWFsLWljb25zJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnY2xvc2UnKSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgOiB0aGlzLiRzY29wZWRTbG90cy5oZWFkZXIoKSxcbiAgICAgICAgICAgICAgICB0aGlzLiRzY29wZWRTbG90cy5jb250ZW50KCksXG4gICAgICAgICAgICAgICAgdGhpcy4kc2NvcGVkU2xvdHMuZm9vdGVyID09PSB2b2lkIDAgXG4gICAgICAgICAgICAgICAgPyBoKCdkaXYnLCBcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6ICdzdy1tb2RhbC1mb290ZXInXG4gICAgICAgICAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgaCgnc3ctYnV0dG9uJyx7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzczogJ2J0biBsZWZ0LWJ0bicsXG4gICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2FuY2VsKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH0sICflj5bmtognKSxcbiAgICAgICAgICAgICAgICAgICAgICBoKCdzdy1idXR0b24nLHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiAnYnRuIHJpZ2h0LWJ0bicsXG4gICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQ29uZmlybSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9LCAn56Gu5a6aJylcbiAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICA6IHRoaXMuJHNjb3BlZFNsb3RzLmZvb3RlclxuICAgICAgICAgICAgICBdICAgICAgICAgICAgICBcbiAgICAgICAgICApXG4gICAgICAgIF1cbiAgICApXG4gIH1cbn0iLCJpbXBvcnQgTW9kYWwgZnJvbSAnLi9zcmMvbWFpbi5qcydcblxuY29uc3QgaW5zdGFsbCA9IGZ1bmN0aW9uIChWdWUpIHtcbiAgVnVlLmNvbXBvbmVudChNb2RhbC5uYW1lLCBNb2RhbClcbn1cblxuTW9kYWwuaW5zdGFsbCA9IGluc3RhbGxcblxuZXhwb3J0IGRlZmF1bHQgTW9kYWxcbiIsImltcG9ydCBWdWUgZnJvbSAndnVlJ1xuXG5jb25zdCBpc1NlcnZlciA9IFZ1ZS5wcm90b3R5cGUuJGlzU2VydmVyO1xuXG5leHBvcnQgZnVuY3Rpb24gb2Zmc2V0KGVsKSB7XG4gIGlmIChlbCA9PT0gd2luZG93KSB7XG4gICAgcmV0dXJuIHsgdG9wOiAwLCBsZWZ0OiAwIH1cbiAgfVxuICBjb25zdCB7IHRvcCwgbGVmdCB9ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuICByZXR1cm4geyB0b3AsIGxlZnQgfVxufVxuICBcbmV4cG9ydCBmdW5jdGlvbiBzdHlsZShlbCwgcHJvcGVydHkpIHtcbiAgcmV0dXJuIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsKS5nZXRQcm9wZXJ0eVZhbHVlKHByb3BlcnR5KVxufVxuICBcbmV4cG9ydCBmdW5jdGlvbiBoZWlnaHQoZWwpIHtcbiAgcmV0dXJuIGVsID09PSB3aW5kb3dcbiAgICA/IHdpbmRvdy5pbm5lckhlaWdodFxuICAgIDogZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0XG59XG4gIFxuZXhwb3J0IGZ1bmN0aW9uIHdpZHRoKGVsKSB7XG4gIHJldHVybiBlbCA9PT0gd2luZG93XG4gICAgPyB3aW5kb3cuaW5uZXJXaWR0aFxuICAgIDogZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGhcbn1cbiAgXG5leHBvcnQgZnVuY3Rpb24gY3NzKGVsZW1lbnQsIGNzcykge1xuICBsZXQgc3R5bGUgPSBlbGVtZW50LnN0eWxlXG4gIFxuICBPYmplY3Qua2V5cyhjc3MpLmZvckVhY2gocHJvcCA9PiB7XG4gICAgc3R5bGVbcHJvcF0gPSBjc3NbcHJvcF1cbiAgfSlcbn1cbiAgXG5leHBvcnQgZnVuY3Rpb24gY3NzQmF0Y2goZWxlbWVudHMsIHN0eWxlKSB7XG4gIGVsZW1lbnRzLmZvckVhY2goZWwgPT4gY3NzKGVsLCBzdHlsZSkpXG59XG4gIFxuZXhwb3J0IGZ1bmN0aW9uIHJlYWR5KGZuKSB7XG4gIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm5cbiAgfVxuICBcbiAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgIT09ICdsb2FkaW5nJykge1xuICAgIHJldHVybiBmbigpXG4gIH1cbiAgXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmbiwgZmFsc2UpXG59XG5cbmV4cG9ydCBjb25zdCBvbiA9IChmdW5jdGlvbigpIHtcbiAgaWYgKCFpc1NlcnZlciAmJiBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGVsZW1lbnQsIGV2ZW50LCBoYW5kbGVyKSB7XG4gICAgICBpZiAoZWxlbWVudCAmJiBldmVudCAmJiBoYW5kbGVyKSB7XG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlciwgZmFsc2UpO1xuICAgICAgfVxuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGVsZW1lbnQsIGV2ZW50LCBoYW5kbGVyKSB7XG4gICAgICBpZiAoZWxlbWVudCAmJiBldmVudCAmJiBoYW5kbGVyKSB7XG4gICAgICAgIGVsZW1lbnQuYXR0YWNoRXZlbnQoJ29uJyArIGV2ZW50LCBoYW5kbGVyKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG59KSgpO1xuXG5leHBvcnQgY29uc3Qgb2ZmID0gKGZ1bmN0aW9uKCkge1xuICBpZiAoIWlzU2VydmVyICYmIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oZWxlbWVudCwgZXZlbnQsIGhhbmRsZXIpIHtcbiAgICAgIGlmIChlbGVtZW50ICYmIGV2ZW50KSB7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlciwgZmFsc2UpO1xuICAgICAgfVxuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGVsZW1lbnQsIGV2ZW50LCBoYW5kbGVyKSB7XG4gICAgICBpZiAoZWxlbWVudCAmJiBldmVudCkge1xuICAgICAgICBlbGVtZW50LmRldGFjaEV2ZW50KCdvbicgKyBldmVudCwgaGFuZGxlcik7XG4gICAgICB9XG4gICAgfTtcbiAgfVxufSkoKTsgIFxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG9mZnNldCxcbiAgc3R5bGUsXG4gIGhlaWdodCxcbiAgd2lkdGgsXG4gIGNzcyxcbiAgY3NzQmF0Y2gsXG4gIHJlYWR5LFxuICBvbixcbiAgb2ZmXG59IiwiaW1wb3J0IHsgb24sIG9mZiB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2RvbScgXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdzd1BvcG92ZXInLFxuICBkYXRhICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcG9wb3ZlclN0eWxlOiB7fSxcbiAgICAgIGFycm93U3R5bGU6IHt9LFxuICAgICAgc2hvdzogZmFsc2UsXG4gICAgICByZWZlcmVuY2VFbG06IHt9XG4gICAgfVxuICB9LFxuICBtb2RlbDoge1xuICAgIHByb3A6ICd2YWx1ZScsXG4gICAgZXZlbnQ6ICd1cGRhdGUnXG4gIH0sXG4gIHByb3BzOiB7XG4gICAgdmFsdWU6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW5cbiAgICB9LFxuICAgIHRpdGxlOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgfSxcbiAgICBjb250ZW50OiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgfSxcbiAgICBwbGFjZW1lbnQ6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICd0b3AnXG4gICAgfSxcbiAgICB0cmlnZ2VyOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnY2xpY2snLFxuICAgICAgdmFsaWRhdG9yOiB2YWx1ZSA9PiBbJ2NsaWNrJywgJ2ZvY3VzJywgJ2hvdmVyJywgJ21hbnVhbCddLmluZGV4T2YodmFsdWUpID4gLTFcbiAgICB9LFxuICAgIHdpZHRoOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgfVxuICB9LFxuICBjb21wdXRlZDoge1xuICAgIHNob3dWYWx1ZToge1xuICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlXG4gICAgICB9LFxuICAgICAgc2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICB9XG4gICAgfSxcbiAgICBzaG93U3R5bGUoKSB7XG4gICAgICBpZiAodGhpcy50cmlnZ2VyICE9PSAnbWFudWFsJykge1xuICAgICAgICBpZiAodGhpcy5zaG93KSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHpJbmRleDogOTk5LFxuICAgICAgICAgICAgb3BhY2l0eTogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgekluZGV4OiAtMTAsXG4gICAgICAgICAgICBvcGFjaXR5OiAwXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5zaG93VmFsdWUpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgekluZGV4OiA5OTksXG4gICAgICAgICAgICBvcGFjaXR5OiAxXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB6SW5kZXg6IC0xMCxcbiAgICAgICAgICAgIG9wYWNpdHk6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBnZXRTdHlsZShwb3BvdmVyRWxtLCByZWZlcmVuY2VFbG0pIHtcbiAgICAgIHN3aXRjaCAodGhpcy5wbGFjZW1lbnQpIHtcbiAgICAgICAgY2FzZSAndG9wLXN0YXJ0JzpcbiAgICAgICAgICB0aGlzLnBvcG92ZXJTdHlsZSA9IHtcbiAgICAgICAgICAgIHRvcDogJy0nICsgKHBvcG92ZXJFbG0ub2Zmc2V0SGVpZ2h0ICsgMTApICsgJ3B4J1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmFycm93U3R5bGUgPSB7XG4gICAgICAgICAgICBsZWZ0OiAocmVmZXJlbmNlRWxtLm9mZnNldFdpZHRoIC8gMiAtIDUpICsgJ3B4J1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAndG9wJzpcbiAgICAgICAgICB0aGlzLnBvcG92ZXJTdHlsZSA9IHtcbiAgICAgICAgICAgIHRvcDogJy0nICsgKHBvcG92ZXJFbG0ub2Zmc2V0SGVpZ2h0ICsgMTApICsgJ3B4JyxcbiAgICAgICAgICAgIGxlZnQ6IChyZWZlcmVuY2VFbG0ub2Zmc2V0V2lkdGggLSBwb3BvdmVyRWxtLm9mZnNldFdpZHRoKSAvIDIgKyAncHgnXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuYXJyb3dTdHlsZSA9IHtcbiAgICAgICAgICAgIGxlZnQ6IChwb3BvdmVyRWxtLm9mZnNldFdpZHRoIC8gMiAtIDUpICsgJ3B4J1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlICdib3R0b20tc3RhcnQnOiBcbiAgICAgICAgICB0aGlzLnBvcG92ZXJTdHlsZSA9IHtcbiAgICAgICAgICAgIHRvcDogKHJlZmVyZW5jZUVsbS5vZmZzZXRIZWlnaHQgKyAxMCkgKyAncHgnXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuYXJyb3dTdHlsZSA9IHtcbiAgICAgICAgICAgIGxlZnQ6IChyZWZlcmVuY2VFbG0ub2Zmc2V0V2lkdGggLyAyIC0gNSkgKyAncHgnXG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrIFxuICAgICAgICBjYXNlICdib3R0b20nOlxuICAgICAgICAgIHRoaXMucG9wb3ZlclN0eWxlID0ge1xuICAgICAgICAgICAgdG9wOiAocmVmZXJlbmNlRWxtLm9mZnNldEhlaWdodCArIDEwKSArICdweCcsXG4gICAgICAgICAgICBsZWZ0OiAocmVmZXJlbmNlRWxtLm9mZnNldFdpZHRoIC0gcG9wb3ZlckVsbS5vZmZzZXRXaWR0aCkgLyAyICsgJ3B4J1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmFycm93U3R5bGUgPSB7XG4gICAgICAgICAgICBsZWZ0OiAocG9wb3ZlckVsbS5vZmZzZXRXaWR0aCAvIDIgLSA1KSArICdweCdcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAncmlnaHQtc3RhcnQnOlxuICAgICAgICAgIHRoaXMucG9wb3ZlclN0eWxlID0ge1xuICAgICAgICAgICAgbGVmdDogKHJlZmVyZW5jZUVsbS5vZmZzZXRXaWR0aCArIDEwKSArICdweCcsXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuYXJyb3dTdHlsZSA9IHtcbiAgICAgICAgICAgIHRvcDogKHJlZmVyZW5jZUVsbS5vZmZzZXRIZWlnaHQgLyAyIC0gNSkgKyAncHgnXG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrICBcbiAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgIHRoaXMucG9wb3ZlclN0eWxlID0ge1xuICAgICAgICAgICAgbGVmdDogKHJlZmVyZW5jZUVsbS5vZmZzZXRXaWR0aCArIDEwKSArICdweCcsXG4gICAgICAgICAgICB0b3A6IChyZWZlcmVuY2VFbG0ub2Zmc2V0SGVpZ2h0IC0gcG9wb3ZlckVsbS5vZmZzZXRIZWlnaHQpIC8gMiArICdweCdcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5hcnJvd1N0eWxlID0ge1xuICAgICAgICAgICAgdG9wOiAocG9wb3ZlckVsbS5vZmZzZXRIZWlnaHQgLyAyIC0gNSkgKyAncHgnXG4gICAgICAgICAgfSBcbiAgICAgICAgICBicmVhayBcbiAgICAgICAgY2FzZSAnbGVmdC1zdGFydCc6XG4gICAgICAgICAgdGhpcy5wb3BvdmVyU3R5bGUgPSB7XG4gICAgICAgICAgICByaWdodDogKHJlZmVyZW5jZUVsbS5vZmZzZXRXaWR0aCArIDEwKSArICdweCcsXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuYXJyb3dTdHlsZSA9IHtcbiAgICAgICAgICAgIHRvcDogKHJlZmVyZW5jZUVsbS5vZmZzZXRIZWlnaHQgLyAyIC0gNSkgKyAncHgnXG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgIHRoaXMucG9wb3ZlclN0eWxlID0ge1xuICAgICAgICAgICAgcmlnaHQ6IChyZWZlcmVuY2VFbG0ub2Zmc2V0V2lkdGggKyAxMCkgKyAncHgnLFxuICAgICAgICAgICAgdG9wOiAocmVmZXJlbmNlRWxtLm9mZnNldEhlaWdodCAtIHBvcG92ZXJFbG0ub2Zmc2V0SGVpZ2h0KSAvIDIgKyAncHgnXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuYXJyb3dTdHlsZSA9IHtcbiAgICAgICAgICAgIHRvcDogKHBvcG92ZXJFbG0ub2Zmc2V0SGVpZ2h0IC8gMiAtIDUpICsgJ3B4J1xuICAgICAgICAgIH0gXG4gICAgICAgICAgYnJlYWsgICAgICAgIFxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0sXG4gICAgaGFuZGxlQ2xpY2soKSB7XG4gICAgICB0aGlzLnNob3cgPSAhdGhpcy5zaG93XG4gICAgfSxcbiAgICBoYW5kbGVNb3VzZUVudGVyKCkge1xuICAgICAgdGhpcy5zaG93ID0gdHJ1ZVxuICAgIH0sXG4gICAgaGFuZGxlTW91c2VMZWF2ZSgpIHtcbiAgICAgIHRoaXMuc2hvdyA9IGZhbHNlXG4gICAgfSxcbiAgICBkb1Nob3coKSB7XG4gICAgICB0aGlzLnNob3cgPSB0cnVlXG4gICAgfSxcbiAgICBkb0Nsb3NlKCkge1xuICAgICAgdGhpcy5zaG93ID0gZmFsc2VcbiAgICB9LFxuICAgIGhhbmRsZU1hbnVhbCgpIHtcbiAgICAgIHRoaXMuc2hvd1ZhbHVlID0gIXRoaXMuc2hvd1ZhbHVlXG4gICAgICB0aGlzLiRlbWl0KFwidXBkYXRlXCIsIHRoaXMuc2hvd1ZhbHVlKTtcbiAgICB9XG4gIH0sXG4gIG1vdW50ZWQgKCkge1xuICAgIGxldCBwb3BvdmVyRWxtID0gdGhpcy4kcmVmcy5wb3BvdmVyXG4gICAgbGV0IHJlZmVyZW5jZUVsbSA9IHRoaXMucmVmZXJlbmNlRWxtID0gdGhpcy4kc2NvcGVkU2xvdHMucmVmZXJlbmNlKClbMF0uZWxtXG4gICAgdGhpcy5nZXRTdHlsZShwb3BvdmVyRWxtLCByZWZlcmVuY2VFbG0pXG4gICAgaWYodGhpcy50cmlnZ2VyID09PSAnbWFudWFsJyl7XG4gICAgICBvbihyZWZlcmVuY2VFbG0sICdjbGljaycsIHRoaXMuaGFuZGxlTWFudWFsKTtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBpZiAodGhpcy50cmlnZ2VyID09PSAnY2xpY2snKSB7XG4gICAgICBvbihyZWZlcmVuY2VFbG0sICdjbGljaycsIHRoaXMuaGFuZGxlQ2xpY2spO1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGlmKHRoaXMudHJpZ2dlciA9PT0gJ2hvdmVyJyl7XG4gICAgICBvbihyZWZlcmVuY2VFbG0sICdtb3VzZWVudGVyJywgdGhpcy5oYW5kbGVNb3VzZUVudGVyKVxuICAgICAgb24ocmVmZXJlbmNlRWxtLCAnbW91c2VsZWF2ZScsIHRoaXMuaGFuZGxlTW91c2VMZWF2ZSk7XG4gICAgfVxuICAgIGlmKHRoaXMudHJpZ2dlciA9PT0gJ2ZvY3VzJyl7XG4gICAgICBpZiAocmVmZXJlbmNlRWxtLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0LCB0ZXh0YXJlYScpKSB7XG4gICAgICAgIG9uKHJlZmVyZW5jZUVsbSwgJ2ZvY3VzaW4nLCB0aGlzLmRvU2hvdyk7XG4gICAgICAgIG9uKHJlZmVyZW5jZUVsbSwgJ2ZvY3Vzb3V0JywgdGhpcy5kb0Nsb3NlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9uKHJlZmVyZW5jZUVsbSwgJ21vdXNlZG93bicsIHRoaXMuZG9TaG93KTtcbiAgICAgICAgb24ocmVmZXJlbmNlRWxtLCAnbW91c2V1cCcsIHRoaXMuZG9DbG9zZSk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBkZXN0cm95ZWQgKCkge1xuICAgIGNvbnN0IHJlZmVyZW5jZSA9IHRoaXMucmVmZXJlbmNlRWxtO1xuICAgIG9mZihyZWZlcmVuY2UsICdjbGljaycsIHRoaXMuaGFuZGxlQ2xpY2spO1xuICAgIG9mZihyZWZlcmVuY2UsICdtb3VzZXVwJywgdGhpcy5kb0Nsb3NlKTtcbiAgICBvZmYocmVmZXJlbmNlLCAnbW91c2Vkb3duJywgdGhpcy5kb1Nob3cpO1xuICAgIG9mZihyZWZlcmVuY2UsICdmb2N1c2luJywgdGhpcy5kb1Nob3cpO1xuICAgIG9mZihyZWZlcmVuY2UsICdmb2N1c291dCcsIHRoaXMuZG9DbG9zZSk7XG4gICAgb2ZmKHJlZmVyZW5jZSwgJ21vdXNlZG93bicsIHRoaXMuZG9TaG93KTtcbiAgICBvZmYocmVmZXJlbmNlLCAnbW91c2V1cCcsIHRoaXMuZG9DbG9zZSk7XG4gICAgb2ZmKHJlZmVyZW5jZSwgJ21vdXNlbGVhdmUnLCB0aGlzLmhhbmRsZU1vdXNlTGVhdmUpO1xuICAgIG9mZihyZWZlcmVuY2UsICdtb3VzZWVudGVyJywgdGhpcy5oYW5kbGVNb3VzZUVudGVyKTtcbiAgICBvZmYoZG9jdW1lbnQsICdjbGljaycsIHRoaXMuaGFuZGxlTWFudWFsKTtcbiAgfSxcbiAgcmVuZGVyKGgpIHtcbiAgICByZXR1cm4gaCgnZGl2Jyx7XG4gICAgICBjbGFzczogJ3N3LXBvcG92ZXItY29udGFpbicsXG4gICAgfSwgWyBoKCdkaXYnLCBcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1wb3BvdmVyJyxcbiAgICAgICAgICAgICAgY2xhc3M6ICdzdy1wb3BvdmVyLXNob3cnLFxuICAgICAgICAgICAgICByZWY6ICdwb3BvdmVyJyxcbiAgICAgICAgICAgICAgc3R5bGU6IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih0aGlzLnBvcG92ZXJTdHlsZSwge3dpZHRoOiB0aGlzLndpZHRoIH0pLCB0aGlzLnNob3dTdHlsZSlcbiAgICAgICAgfSwgWyB0aGlzLnRpdGxlICBcbiAgICAgICAgICAgICAgPyBoKCdkaXYnLCB7XG4gICAgICAgICAgICAgICAgY2xhc3M6ICdzdy1wb3BvdmVyLXRpdGxlJ1xuICAgICAgICAgICAgICB9LCB0aGlzLnRpdGxlKVxuICAgICAgICAgICAgICA6ICcnLCBcbiAgICAgICAgICAgICB0aGlzLiRzY29wZWRTbG90cy5kZWZhdWx0ID09PSB2b2lkIDBcbiAgICAgICAgICAgICA/IGgoJ2RpdicsIHtcbiAgICAgICAgICAgICAgICBjbGFzczogJ3N3LXBvcG92ZXItY29udGVudCdcbiAgICAgICAgICAgICB9LCB0aGlzLmNvbnRlbnQgfHwgJycgKVxuICAgICAgICAgICAgICA6IHRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQoKSxcbiAgICAgICAgICAgICBoKCdkaXYnLHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogJ3N3LXBvcG92ZXItYXJyb3cnLFxuICAgICAgICAgICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgICAgICAgJ3N3LXBvcG92ZXItYXJyb3ctdG9wJzogdGhpcy5wbGFjZW1lbnQuaW5kZXhPZigndG9wJykgPj0gMCA/IHRydWUgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAnc3ctcG9wb3Zlci1hcnJvdy1ib3R0b20nOiB0aGlzLnBsYWNlbWVudC5pbmRleE9mKCdib3R0b20nKSA+PSAwID8gdHJ1ZSA6IGZhbHNlLFxuICAgICAgICAgICAgICAgICdzdy1wb3BvdmVyLWFycm93LXJpZ2h0JzogdGhpcy5wbGFjZW1lbnQuaW5kZXhPZigncmlnaHQnKSA+PSAwID8gdHJ1ZSA6IGZhbHNlLFxuICAgICAgICAgICAgICAgICdzdy1wb3BvdmVyLWFycm93LWxlZnQnOiB0aGlzLnBsYWNlbWVudC5pbmRleE9mKCdsZWZ0JykgPj0gMCA/IHRydWUgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHN0eWxlOiB0aGlzLmFycm93U3R5bGVcbiAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSksIFxuICAgICAgICB0aGlzLiRzY29wZWRTbG90cy5yZWZlcmVuY2UgPT09IHZvaWQgMCBcbiAgICAgICAgPyBoKClcbiAgICAgICAgOiB0aGlzLiRzY29wZWRTbG90cy5yZWZlcmVuY2UoKVxuICAgICAgXSkgXG4gIH1cbn0iLCJpbXBvcnQgUG9wb3ZlciBmcm9tICcuL3NyYy9tYWluLmpzJ1xuXG5jb25zdCBpbnN0YWxsID0gZnVuY3Rpb24gKFZ1ZSkge1xuICBWdWUuY29tcG9uZW50KE1vZGFsLm5hbWUsIFBvcG92ZXIpXG59XG5cblBvcG92ZXIuaW5zdGFsbCA9IGluc3RhbGxcblxuZXhwb3J0IGRlZmF1bHQgUG9wb3ZlclxuIiwiaW1wb3J0IEl0ZW0gZnJvbSAnLi4vLi4vaXRlbSdcbmltcG9ydCB7IGlzRGVlcEVxdWFsIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvaXMnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3N3Q2hlY2tib3gnLFxuICBjb21wb25lbnRzOiB7IEl0ZW0gfSxcbiAgcHJvcHM6IHtcbiAgICB2YWx1ZTogQm9vbGVhbiB8IEFycmF5LFxuICAgIHZhbDoge1xuICAgICAgcmVxdWlyZWQ6IGZhbHNlXG4gICAgfSxcbiAgICBsYWJlbDogU3RyaW5nLFxuICAgIGRpc2FibGVkOiBCb29sZWFuLFxuICAgIGNvbG9yOiBTdHJpbmcsXG4gICAgcHJpbWFyeTogQm9vbGVhbixcbiAgICBuZWdhdGl2ZTogQm9vbGVhbixcbiAgICBwb3NpdGl2ZTogQm9vbGVhbixcbiAgICB3YXJuaW5nOiBCb29sZWFuLFxuICAgIGxlZnRMYWJlbDogQm9vbGVhbixcbiAgICBjb2xvckxhYmVsOiBCb29sZWFuLFxuICAgIGtlZXBDb2xvcjogQm9vbGVhblxuICB9LFxuICBkYXRhOiAoKSA9PiAoe1xuICAgIHBhcmVudDogdm9pZCAwXG4gIH0pLFxuICBjb21wdXRlZDoge1xuICAgIG1vZGVsKCkge1xuICAgICAgcmV0dXJuIHRoaXMucGFyZW50ID09PSB2b2lkIDAgPyB0aGlzLnZhbHVlIDogdGhpcy5wYXJlbnQudmFsdWVcbiAgICB9LFxuICAgIHBhcmVudERpc2FibGVkKCkge1xuICAgICAgcmV0dXJuIHRoaXMucGFyZW50ICYmIHRoaXMucGFyZW50LmRpc2FibGVkXG4gICAgfSxcbiAgICBjaGVja2VkOiB7XG4gICAgICBnZXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJvb2xlYW5Nb2RlID8gdGhpcy5tb2RlbCA6IHRoaXMuZ2V0Q2hlY2tlZCh0aGlzLnZhbClcbiAgICAgIH0sXG4gICAgICBzZXQodmFsKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcy5wYXJlbnQgPT09IHZvaWQgMCA/IHRoaXMgOiB0aGlzLnBhcmVudFxuXG4gICAgICAgIHNlbGYuJGVtaXQoXG4gICAgICAgICAgJ2lucHV0JyxcbiAgICAgICAgICB0aGlzLmZvcm1hdFZhbHVlKHZhbClcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH0sXG4gICAgaW5uZXJWYWx1ZSgpIHtcbiAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KHRoaXMubW9kZWwpID8gdGhpcy5tb2RlbCA6IFt0aGlzLm1vZGVsXVxuICAgIH0sXG4gICAgYm9vbGVhbk1vZGUoKSB7XG4gICAgICByZXR1cm4gdGhpcy52YWwgPT09IHZvaWQgMFxuICAgIH1cbiAgfSxcbiAgd2F0Y2g6IHt9LFxuICBtZXRob2RzOiB7XG4gICAgZ2V0Q2hlY2tlZCh2YWwpIHtcbiAgICAgIHJldHVybiB0aGlzLmlubmVyVmFsdWUuc29tZSh4ID0+IGlzRGVlcEVxdWFsKHgsIHZhbCkpXG4gICAgfSxcbiAgICBmb3JtYXRWYWx1ZShjaGVja2VkKSB7XG4gICAgICBpZiAodGhpcy5ib29sZWFuTW9kZSkgeyByZXR1cm4gY2hlY2tlZCB9XG4gICAgICBsZXQgcmVzID0gW11cblxuICAgICAgdGhpcy5pbm5lclZhbHVlLmZvckVhY2goeCA9PiB7XG4gICAgICAgIGlmICghaXNEZWVwRXF1YWwoeCwgdGhpcy52YWwpKSB7XG4gICAgICAgICAgcmVzLnB1c2goeClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIGlmIChjaGVja2VkKSB7IHJlcy5wdXNoKHRoaXMudmFsKSB9XG4gICAgICByZXR1cm4gcmVzXG4gICAgfSxcbiAgfSxcbiAgcmVuZGVyKGgpIHtcbiAgICBsZXQgY2hlY2tlZCA9IHRoaXMuY2hlY2tlZFxuICAgIGxldCBjb2xvckxhYmVsID0gY2hlY2tlZCAmJiB0aGlzLmNvbG9yTGFiZWxcbiAgICBsZXQgY29sb3JDaGVja2JveCA9IGNoZWNrZWQgfHwgdGhpcy5rZWVwQ29sb3JcbiAgICBsZXQgZ2V0TGFiZWwgPSAoKSA9PiBbaCgnZGl2Jywge1xuICAgICAgc3RhdGljQ2xhc3M6ICdzdy1jaGVja2JveF9fdGV4dCBtYXJnaW4tbWluJyxcbiAgICAgIGNsYXNzOiB7XG4gICAgICAgICdjb2xvci1wcmltYXJ5JzogY29sb3JMYWJlbCA/IHRoaXMucHJpbWFyeSA6IHZvaWQgMCxcbiAgICAgICAgJ2NvbG9yLW5lZ2F0aXZlJzogY29sb3JMYWJlbCA/IHRoaXMubmVnYXRpdmUgOiB2b2lkIDAsXG4gICAgICAgICdjb2xvci1wb3NpdGl2ZSc6IGNvbG9yTGFiZWwgPyB0aGlzLnBvc2l0aXZlIDogdm9pZCAwLFxuICAgICAgICAnY29sb3Itd2FybmluZyc6IGNvbG9yTGFiZWwgPyB0aGlzLndhcm5pbmcgOiB2b2lkIDBcbiAgICAgIH0sXG4gICAgICBzdHlsZToge1xuICAgICAgICBjb2xvcjogY29sb3JMYWJlbCA/IHRoaXMuY29sb3IgOiB2b2lkIDBcbiAgICAgIH1cbiAgICB9LCB0aGlzLmxhYmVsKV1cblxuICAgIHJldHVybiBoKCdzdy1pdGVtJywge1xuICAgICAgc3RhdGljQ2xhc3M6ICdzdy1jaGVja2JveCcsXG4gICAgICByZWY6ICdjaGVja2JveCcsXG4gICAgICBjbGFzczoge1xuICAgICAgICBkaXNhYmxlOiB0aGlzLmRpc2FibGVkIHx8IHRoaXMucGFyZW50RGlzYWJsZWRcbiAgICAgIH0sXG4gICAgICBuYXRpdmVPbjogdGhpcy5kaXNhYmxlZCA/IHZvaWQgMCA6IHtcbiAgICAgICAgY2xpY2s6ICgpID0+IHtcbiAgICAgICAgICB0aGlzLmNoZWNrZWQgPSAhY2hlY2tlZFxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgc2NvcGVkU2xvdHM6IHtcbiAgICAgICAgYmVmb3JlOiB0aGlzLmxhYmVsICYmIHRoaXMubGVmdExhYmVsID8gZ2V0TGFiZWwgOiB2b2lkIDAsXG4gICAgICAgIGRlZmF1bHQ6ICgpID0+IFtoKCdzdy1pY29uJywge1xuICAgICAgICAgIHN0YXRpY0NsYXNzOiAnbWFyZ2luLW1pbicsXG4gICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIG9wYWNpdHk6IGNoZWNrZWQgPyAxIDogMC42XG4gICAgICAgICAgfSxcbiAgICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgc2l6ZTogJzIwcHgnLFxuICAgICAgICAgICAgbmFtZTogY2hlY2tlZCA/ICdjaGVja19ib3gnIDogJ2NoZWNrX2JveF9vdXRsaW5lX2JsYW5rJyxcbiAgICAgICAgICAgIGNvbG9yOiBjb2xvckNoZWNrYm94ID8gdGhpcy5jb2xvciA6IHZvaWQgMCxcbiAgICAgICAgICAgIHByaW1hcnk6IGNvbG9yQ2hlY2tib3ggPyB0aGlzLnByaW1hcnkgOiB2b2lkIDAsXG4gICAgICAgICAgICBuZWdhdGl2ZTogY29sb3JDaGVja2JveCA/IHRoaXMubmVnYXRpdmUgOiB2b2lkIDAsXG4gICAgICAgICAgICBwb3NpdGl2ZTogY29sb3JDaGVja2JveCA/IHRoaXMucG9zaXRpdmUgOiB2b2lkIDAsXG4gICAgICAgICAgICB3YXJuaW5nOiBjb2xvckNoZWNrYm94ID8gdGhpcy53YXJuaW5nIDogdm9pZCAwXG4gICAgICAgICAgfVxuICAgICAgICB9KV0sXG4gICAgICAgIGFmdGVyOiB0aGlzLmxhYmVsICYmICF0aGlzLmxlZnRMYWJlbCA/IGdldExhYmVsIDogdm9pZCAwXG4gICAgICB9XG4gICAgfSlcbiAgfVxufSIsImltcG9ydCBDaGVja2JveCBmcm9tICcuL3NyYy9tYWluLmpzJ1xuXG5jb25zdCBpbnN0YWxsID0gZnVuY3Rpb24gKFZ1ZSkge1xuICBWdWUuY29tcG9uZW50KENoZWNrYm94Lm5hbWUsIENoZWNrYm94KVxufVxuXG5DaGVja2JveC5pbnN0YWxsID0gaW5zdGFsbFxuXG5leHBvcnQgZGVmYXVsdCBDaGVja2JveFxuIiwiXG5leHBvcnQgZGVmYXVsdCB7XG4gIGRhdGE6ICgpID0+ICh7fSksXG4gIHdhdGNoOiB7fSxcbiAgY29tcHV0ZWQ6IHt9LFxuICBtZXRob2RzOiB7XG4gICAgc2h1dHRsZShfdGhpcykge1xuICAgICAgbGV0IHNlbGYgPSBfdGhpcyB8fCB0aGlzXG5cbiAgICAgIHNlbGYuJGNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICBpZiAoY2hpbGQuJHJlZnNbdGhpcy5zaHV0dGxlUmVmXSAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgY2hpbGQucGFyZW50ID0gdGhpc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc2h1dHRsZShjaGlsZClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH0sXG4gIG1vdW50ZWQoKSB7XG4gICAgdGhpcy5zaHV0dGxlKClcbiAgfVxufVxuIiwiaW1wb3J0IEZpZWxkIGZyb20gJy4uLy4uL2ZpZWxkJ1xuaW1wb3J0IFNodXR0bGVNaXhpbiBmcm9tICcuLi8uLi8uLi9taXhpbnMvc2h1dHRsZSdcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnc3dDaGVja2JveEdyb3VwJyxcbiAgbWl4aW5zOiBbRmllbGQsIFNodXR0bGVNaXhpbl0sIC8vIGZvY3VzZWQsZGlzYWJsZWQsc2h1dHRsZVJlZlxuICBwcm9wczoge1xuICAgIHZhbHVlOiBCb29sZWFuIHwgQXJyYXlcbiAgfSxcbiAgZGF0YTogKCkgPT4gKHtcbiAgICBpbm5lclBvaW50ZXI6IHRydWUsXG4gICAgc2h1dHRsZVJlZjogJ2NoZWNrYm94J1xuICB9KSxcbiAgY29tcHV0ZWQ6IHt9LFxuICB3YXRjaDoge30sXG4gIG1ldGhvZHM6IHt9XG59IiwiaW1wb3J0IENoZWNrYm94R3JvdXAgZnJvbSAnLi9zcmMvbWFpbi5qcydcblxuY29uc3QgaW5zdGFsbCA9IGZ1bmN0aW9uIChWdWUpIHtcbiAgVnVlLmNvbXBvbmVudChDaGVja2JveEdyb3VwLm5hbWUsIENoZWNrYm94R3JvdXApXG59XG5cbkNoZWNrYm94R3JvdXAuaW5zdGFsbCA9IGluc3RhbGxcblxuZXhwb3J0IGRlZmF1bHQgQ2hlY2tib3hHcm91cFxuIiwiaW1wb3J0IEl0ZW0gZnJvbSAnLi4vLi4vaXRlbSdcbmltcG9ydCB7IGlzRGVlcEVxdWFsIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvaXMnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3N3UmFkaW8nLFxuICBjb21wb25lbnRzOiB7IEl0ZW0gfSxcbiAgcHJvcHM6IHtcbiAgICB2YWx1ZToge30sXG4gICAgdmFsOiB7XG4gICAgICByZXF1aXJlZDogdHJ1ZVxuICAgIH0sXG4gICAgbGFiZWw6IFN0cmluZyxcbiAgICBkaXNhYmxlZDogQm9vbGVhbixcbiAgICBjb2xvcjogU3RyaW5nLFxuICAgIHByaW1hcnk6IEJvb2xlYW4sXG4gICAgbmVnYXRpdmU6IEJvb2xlYW4sXG4gICAgcG9zaXRpdmU6IEJvb2xlYW4sXG4gICAgd2FybmluZzogQm9vbGVhbixcbiAgICBsZWZ0TGFiZWw6IEJvb2xlYW4sXG4gICAgY29sb3JMYWJlbDogQm9vbGVhbixcbiAgICBrZWVwQ29sb3I6IEJvb2xlYW5cbiAgfSxcbiAgZGF0YTogKCkgPT4gKHtcbiAgICBwYXJlbnQ6IHZvaWQgMFxuICB9KSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBtb2RlbCgpIHtcbiAgICAgIHJldHVybiB0aGlzLnBhcmVudCA9PT0gdm9pZCAwID8gdGhpcy52YWx1ZSA6IHRoaXMucGFyZW50LnZhbHVlXG4gICAgfSxcbiAgICBwYXJlbnREaXNhYmxlZCgpIHtcbiAgICAgIHJldHVybiB0aGlzLnBhcmVudCAmJiB0aGlzLnBhcmVudC5kaXNhYmxlZFxuICAgIH0sXG4gICAgY2hlY2tlZDoge1xuICAgICAgZ2V0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDaGVja2VkKHRoaXMudmFsKVxuICAgICAgfSxcbiAgICAgIHNldCgpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzLnBhcmVudCA9PT0gdm9pZCAwID8gdGhpcyA6IHRoaXMucGFyZW50XG5cbiAgICAgICAgc2VsZi4kZW1pdChcbiAgICAgICAgICAnaW5wdXQnLFxuICAgICAgICAgIHRoaXMudmFsXG4gICAgICAgIClcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIHdhdGNoOiB7fSxcbiAgbWV0aG9kczoge1xuICAgIGdldENoZWNrZWQodmFsKSB7XG4gICAgICByZXR1cm4gaXNEZWVwRXF1YWwodGhpcy5tb2RlbCwgdmFsKVxuICAgIH0sXG4gIH0sXG4gIHJlbmRlcihoKSB7XG4gICAgbGV0IGNoZWNrZWQgPSB0aGlzLmNoZWNrZWRcbiAgICBsZXQgY29sb3JMYWJlbCA9IGNoZWNrZWQgJiYgdGhpcy5jb2xvckxhYmVsXG4gICAgbGV0IGNvbG9yUmFkaW8gPSBjaGVja2VkIHx8IHRoaXMua2VlcENvbG9yXG4gICAgbGV0IGdldExhYmVsID0gKCkgPT4gW2goJ2RpdicsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiAnc3ctcmFkaW9fX3RleHQgbWFyZ2luLW1pbicsXG4gICAgICBjbGFzczoge1xuICAgICAgICAnY29sb3ItcHJpbWFyeSc6IGNvbG9yTGFiZWwgPyB0aGlzLnByaW1hcnkgOiB2b2lkIDAsXG4gICAgICAgICdjb2xvci1uZWdhdGl2ZSc6IGNvbG9yTGFiZWwgPyB0aGlzLm5lZ2F0aXZlIDogdm9pZCAwLFxuICAgICAgICAnY29sb3ItcG9zaXRpdmUnOiBjb2xvckxhYmVsID8gdGhpcy5wb3NpdGl2ZSA6IHZvaWQgMCxcbiAgICAgICAgJ2NvbG9yLXdhcm5pbmcnOiBjb2xvckxhYmVsID8gdGhpcy53YXJuaW5nIDogdm9pZCAwXG4gICAgICB9LFxuICAgICAgc3R5bGU6IHtcbiAgICAgICAgY29sb3I6IGNvbG9yTGFiZWwgPyB0aGlzLmNvbG9yIDogdm9pZCAwXG4gICAgICB9XG4gICAgfSwgdGhpcy5sYWJlbCldXG5cbiAgICByZXR1cm4gaCgnc3ctaXRlbScsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiAnc3ctcmFkaW8nLFxuICAgICAgcmVmOiAncmFkaW8nLFxuICAgICAgY2xhc3M6IHtcbiAgICAgICAgZGlzYWJsZTogdGhpcy5kaXNhYmxlZCB8fCB0aGlzLnBhcmVudERpc2FibGVkXG4gICAgICB9LFxuICAgICAgbmF0aXZlT246IHRoaXMuZGlzYWJsZWQgPyB2b2lkIDAgOiB7XG4gICAgICAgIGNsaWNrOiAoKSA9PiB7XG4gICAgICAgICAgaWYgKGNoZWNrZWQpIHsgcmV0dXJuIH1cbiAgICAgICAgICB0aGlzLmNoZWNrZWQgPSB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzY29wZWRTbG90czoge1xuICAgICAgICBiZWZvcmU6IHRoaXMubGFiZWwgJiYgdGhpcy5sZWZ0TGFiZWwgPyBnZXRMYWJlbCA6IHZvaWQgMCxcbiAgICAgICAgZGVmYXVsdDogKCkgPT4gW2goJ3N3LWljb24nLCB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6ICdtYXJnaW4tbWluJyxcbiAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgb3BhY2l0eTogY2hlY2tlZCA/IDEgOiAwLjZcbiAgICAgICAgICB9LFxuICAgICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICBzaXplOiAnMjBweCcsXG4gICAgICAgICAgICBuYW1lOiBjaGVja2VkID8gJ3JhZGlvX2J1dHRvbl9jaGVja2VkJyA6ICdyYWRpb19idXR0b25fdW5jaGVja2VkJyxcbiAgICAgICAgICAgIGNvbG9yOiBjb2xvclJhZGlvID8gdGhpcy5jb2xvciA6IHZvaWQgMCxcbiAgICAgICAgICAgIHByaW1hcnk6IGNvbG9yUmFkaW8gPyB0aGlzLnByaW1hcnkgOiB2b2lkIDAsXG4gICAgICAgICAgICBuZWdhdGl2ZTogY29sb3JSYWRpbyA/IHRoaXMubmVnYXRpdmUgOiB2b2lkIDAsXG4gICAgICAgICAgICBwb3NpdGl2ZTogY29sb3JSYWRpbyA/IHRoaXMucG9zaXRpdmUgOiB2b2lkIDAsXG4gICAgICAgICAgICB3YXJuaW5nOiBjb2xvclJhZGlvID8gdGhpcy53YXJuaW5nIDogdm9pZCAwXG4gICAgICAgICAgfVxuICAgICAgICB9KV0sXG4gICAgICAgIGFmdGVyOiB0aGlzLmxhYmVsICYmICF0aGlzLmxlZnRMYWJlbCA/IGdldExhYmVsIDogdm9pZCAwXG4gICAgICB9XG4gICAgfSlcbiAgfVxufSIsImltcG9ydCBSYWRpbyBmcm9tICcuL3NyYy9tYWluLmpzJ1xuXG5jb25zdCBpbnN0YWxsID0gZnVuY3Rpb24gKFZ1ZSkge1xuICBWdWUuY29tcG9uZW50KFJhZGlvLm5hbWUsIFJhZGlvKVxufVxuXG5SYWRpby5pbnN0YWxsID0gaW5zdGFsbFxuXG5leHBvcnQgZGVmYXVsdCBSYWRpb1xuIiwiaW1wb3J0IEZpZWxkIGZyb20gJy4uLy4uL2ZpZWxkJ1xuaW1wb3J0IFNodXR0bGVNaXhpbiBmcm9tICcuLi8uLi8uLi9taXhpbnMvc2h1dHRsZSdcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnc3dSYWRpb0dyb3VwJyxcbiAgbWl4aW5zOiBbRmllbGQsIFNodXR0bGVNaXhpbl0sIC8vIGZvY3VzZWQsZGlzYWJsZWQsc2h1dHRsZVJlZlxuICBwcm9wczoge1xuICAgIHZhbHVlOiB7XG4gICAgICByZXF1aXJlZDogdHJ1ZVxuICAgIH1cbiAgfSxcbiAgZGF0YTogKCkgPT4gKHtcbiAgICBpbm5lclBvaW50ZXI6IHRydWUsXG4gICAgc2h1dHRsZVJlZjogJ3JhZGlvJ1xuICB9KSxcbiAgY29tcHV0ZWQ6IHt9LFxuICB3YXRjaDoge30sXG4gIG1ldGhvZHM6IHt9XG59IiwiaW1wb3J0IFJhZGlvR3JvdXAgZnJvbSAnLi9zcmMvbWFpbi5qcydcblxuY29uc3QgaW5zdGFsbCA9IGZ1bmN0aW9uIChWdWUpIHtcbiAgVnVlLmNvbXBvbmVudChSYWRpb0dyb3VwLm5hbWUsIFJhZGlvR3JvdXApXG59XG5cblJhZGlvR3JvdXAuaW5zdGFsbCA9IGluc3RhbGxcblxuZXhwb3J0IGRlZmF1bHQgUmFkaW9Hcm91cFxuIiwiLyoqXG4gKlxuICpcbiAqIEBwYXJhbSB7Kn0gdG90YWwgIOWIhumhteaAu+aVsFxuICogQHBhcmFtIHsqfSBjdXIgIOW9k+WJjemhtemdoiAgM1xuICogQHBhcmFtIHsqfSBhcm91bmQgICAxIDIgMyA0IDUgICBhcm91bmQgPSAyXG4gKiBAcmV0dXJuc1xuICovXG5jb25zdCBtYWtlUmVzdWx0ID0gKHRvdGFsLGN1cixhcm91bmQpID0+IHtcbiAgbGV0IHJlc3VsdCA9IFtdO1xuICBsZXQgYmFzZUNvdW50ID0gYXJvdW5kICogMiArIDEgKyAyICsgMiArIDI7IC8v5oC75YWx5YWD57Sg5Liq5pWwXG4gIGxldCBzdXJwbHVzID0gYmFzZUNvdW50IC0gNDsgLy/lj6rlh7rnjrDkuIDkuKrnnIHnlaXlj7cg5Ymp5L2Z5YWD57Sg5Liq5pWwXG4gIGxldCBzdGFydFBvc2l0aW9uID0gMSArIDIgKyBhcm91bmQsZW5kUG9zaXRpb24gPSB0b3RhbCAtIDIgLSBhcm91bmQ7XG5cbiAgaWYodG90YWwgPD0gYmFzZUNvdW50IC0gMil7IC8v5YWo6YOo5pi+56S6IOS4jeWHuueOsOecgeeVpeWPt1xuICAgICAgcmVzdWx0ID0gIEFycmF5LmZyb20oe2xlbmd0aDogdG90YWx9LCAodiwgaSkgPT4gaSArIDEpO1xuICB9ZWxzZXsgLy/pnIDopoHlh7rnjrDnnIHnlaXlj7dcbiAgICAgIGlmKGN1ciA8PSBzdGFydFBvc2l0aW9uKXsgLy8xLuWPquacieWQjumdouWHuueOsOecgeeVpeWPt1xuICAgICAgICAgIHJlc3VsdCA9IFsuLi5BcnJheS5mcm9tKHtsZW5ndGg6IHN1cnBsdXN9LCAodiwgaSkgPT4gaSArIDEpLFwiwrfCt8K3XCIsdG90YWxdXG4gICAgICB9ZWxzZSBpZihjdXIgPj0gZW5kUG9zaXRpb24pIHsgLy8yLuWPquacieWJjei+ueWHuueOsOecgeeVpeWPt1xuICAgICAgICAgIHJlc3VsdCA9IFsxLCfCt8K3wrcnLC4uLkFycmF5LmZyb20oe2xlbmd0aDogc3VycGx1c30sICh2LCBpKSA9PiB0b3RhbCAtIHN1cnBsdXMgKyBpICsgMSldXG4gICAgICB9ZWxzZXsgLy8zLuS4pOi+uemDveacieecgeeVpeWPt1xuICAgICAgICAgIHJlc3VsdCA9IFsxLCfCt8K3wrcnLC4uLkFycmF5LmZyb20oe2xlbmd0aDogYXJvdW5kICogMiArIDF9LCAodiwgaSkgPT4gY3VyIC0gYXJvdW5kICsgaSksJ8K3wrfCtycsdG90YWxdXG4gICAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0XG59XG5cbmV4cG9ydCBkZWZhdWx0IG1ha2VSZXN1bHQiLCI8dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJzdy1wYWdpbmF0aW9uXCI+XG4gICAgPGRpdiBjbGFzcz1cInN3LXBhZ2luYXRpb24tdG90YWxcIiB2LWlmPVwibGF5b3V0LmluZGV4T2YoJ3RvdGFsJykgPiAtMVwiPiBcbiAgICAgIHt7YOWFsSR7dG90YWx95p2hYH19XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInN3LXBhZ2luYXRpb24tc2VsZWN0XCIgdi1pZj1cImxheW91dC5pbmRleE9mKCdzZWxlY3QnKSA+IC0xXCI+XG4gICAgICA8c3ctc2VsZWN0IHYtbW9kZWw9XCJwYWdlU2l6ZVZhbHVlXCIgOm9wdGlvbnM9XCJzZWxlY3RPcHRpb25cIiBzZWxlY3RlZEZpbGxlZCBib3JkZXJlZCBtaW5pIHNlbGVjdGVkU3R5bGU9XCJub25lXCI+PC9zdy1zZWxlY3Q+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInN3LXBhZ2luYXRpb24tcGFnZVwiPlxuICAgICAgPHNwYW4gY2xhc3M9XCJzdy1wYWdpbmF0aW9uLXBhZ2UtaXRlbVwiIEBjbGljaz1cImhhbmRsZUNsaWNrQXJyb3coJ2xlZnQnKVwiPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgc3ctcGFnaW5hdGlvbi1wYWdlLWl0ZW0taWNvblwiPmtleWJvYXJkX2Fycm93X2xlZnQ8L2k+PC9zcGFuPlxuICAgICAgPHNwYW4gdi1mb3I9XCIoaXRlbSwgaW5kZXgpIGluIHBhZ2luYXRpb25MaXN0XCIgOmNsYXNzPVwiWydzdy1wYWdpbmF0aW9uLXBhZ2UtaXRlbScsIGN1cnJlbnRQYWdlVmFsdWUgPT09IGl0ZW0gPyAnYWN0aXZlJyA6ICcnXVwiIEBjbGljaz1cImhhbmRsZUNsaWNrUGFnZShpdGVtLCBpbmRleClcIj5cbiAgICAgICAgPGkgdi1pZj1cIml0ZW0gPT09ICfCt8K3wrcnXCIgY2xhc3M9XCJtYXRlcmlhbC1pY29ucyBzdy1wYWdpbmF0aW9uLXBhZ2UtaXRlbS1pY29uXCI+bW9yZV9ob3JpejwvaT5cbiAgICAgICAgPHNwYW4gdi1lbHNlPlxuICAgICAgICAgIHt7aXRlbX19XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwic3ctcGFnaW5hdGlvbi1wYWdlLWl0ZW1cIiBAY2xpY2s9XCJoYW5kbGVDbGlja0Fycm93KCdyaWdodCcpXCI+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29ucyBzdy1wYWdpbmF0aW9uLXBhZ2UtaXRlbS1pY29uXCI+a2V5Ym9hcmRfYXJyb3dfcmlnaHQ8L2k+PC9zcGFuPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJzdy1wYWdpbmF0aW9uLWdvdG9cIiB2LWlmPVwibGF5b3V0LmluZGV4T2YoJ2dvdG8nKSA+IC0xXCI+XG4gICAgICA8c3Bhbj7liY3lvoA8L3NwYW4+XG4gICAgICA8ZGl2IGNsYXNzPVwic3ctcGFnaW5hdGlvbi1nb3RvLWlucHV0XCI+XG4gICAgICAgIDxzdy1pbnB1dCBib3JkZXJlZCB2LW1vZGVsPSdpbnB1dFZhbHVlJyBAa2V5dXAuZW50ZXIubmF0aXZlPVwiaGFuZGxlRW50ZXJHb3RvXCIgbWluaSBzdHlsZT1cIndpZHRoOjQwcHhcIj48L3N3LWlucHV0PlxuICAgICAgPC9kaXY+XG4gICAgICA8c3Bhbj7pobU8L3NwYW4+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCBzd1NlbGVjdCBmcm9tICcuLi8uLi9zZWxlY3QvaW5kZXgnXG5pbXBvcnQgbWFrZVJlc3VsdCBmcm9tICcuL3BhZ2luYXRpb24nXG5pbXBvcnQgc3dJbnB1dCBmcm9tICcuLi8uLi9pbnB1dC9pbmRleCdcbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3N3UGFnaW5hdGlvbicsXG4gIGRhdGEgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjdXJyZW50UGFnZVZhbHVlOiB0aGlzLmN1cnJlbnRQYWdlLFxuICAgICAgcGFnZVRvdGFsOiAnJyxcbiAgICAgIHBhZ2VTaXplVmFsdWU6IHRoaXMucGFnZVNpemUsXG4gICAgICBpbnB1dFZhbHVlOiAnMSdcbiAgICB9XG4gIH0sXG4gIHByb3BzOiB7XG4gICAgdG90YWw6IHtcbiAgICAgIHR5cGU6IE51bWJlclxuICAgIH0sXG4gICAgcGFnZVNpemU6IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIGRlZmF1bHQ6IDIwXG4gICAgfSxcbiAgICBvcHRpb25zOiB7XG4gICAgICB0eXBlOiBBcnJheSxcbiAgICAgIGRlZmF1bHQ6IFsyMCwgNDAsIDYwLCA4MF1cbiAgICB9LFxuICAgIGN1cnJlbnRQYWdlOiB7XG4gICAgICB0eXBlOiBOdW1iZXJcbiAgICB9LFxuICAgIGFyb3VuZDoge1xuICAgICAgdHlwZTogTnVtYmVyXG4gICAgfSxcbiAgICBsYXlvdXQ6IHtcbiAgICAgIHR5cGU6IFN0cmluZ1xuICAgIH1cbiAgfSxcbiAgd2F0Y2g6IHtcbiAgICBjdXJyZW50UGFnZVZhbHVlKCkge1xuICAgICAgdGhpcy4kZW1pdCgnY3VycmVudC1jaGFuZ2UnLCB0aGlzLmN1cnJlbnRQYWdlVmFsdWUpXG4gICAgfSxcbiAgICBwYWdlU2l6ZVZhbHVlKCkge1xuICAgICAgdGhpcy4kZW1pdCgnc2l6ZS1jaGFuZ2UnLCB0aGlzLnBhZ2VTaXplVmFsdWUpXG4gICAgfVxuICB9LFxuICBjb21wdXRlZDoge1xuICAgIHNlbGVjdE9wdGlvbigpIHtcbiAgICAgIGxldCBhcnkgPSBbXVxuICAgICAgdGhpcy5vcHRpb25zLm1hcChpPT57XG4gICAgICAgIGxldCBpdGVtID0ge31cbiAgICAgICAgaXRlbS5uYW1lID0gYCR7aX3mnaEv6aG1YFxuICAgICAgICBpdGVtLnZhbHVlID0gaVxuICAgICAgICBhcnkucHVzaChpdGVtKVxuICAgICAgfSlcbiAgICAgIHJldHVybiBhcnlcbiAgICB9LFxuICAgIHBhZ2luYXRpb25MaXN0KCkge1xuICAgICAgbGV0IHBhZ2VUb3RhbCA9IHRoaXMucGFnZVRvdGFsID0gdGhpcy50b3RhbCAvIHRoaXMucGFnZVNpemVWYWx1ZVxuICAgICAgaWYgKGAke3BhZ2VUb3RhbH1gLmluZGV4T2YoJy4nKSA+IC0xKSB7XG4gICAgICAgIHBhZ2VUb3RhbCA9IHRoaXMucGFnZVRvdGFsID0gcGFyc2VJbnQocGFnZVRvdGFsICsgMSlcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmN1cnJlbnRQYWdlVmFsdWUgPiBwYWdlVG90YWwpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50UGFnZVZhbHVlID0gcGFnZVRvdGFsXG4gICAgICB9XG4gICAgICBsZXQgcGFnZUxpc3QgPSBtYWtlUmVzdWx0KHBhZ2VUb3RhbCwgdGhpcy5jdXJyZW50UGFnZVZhbHVlLCB0aGlzLmFyb3VuZClcbiAgICAgIHJldHVybiBwYWdlTGlzdFxuICAgIH1cbiAgfSxcbiAgY29tcG9uZW50czoge1xuICAgIHN3U2VsZWN0LFxuICAgIHN3SW5wdXRcbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGhhbmRsZUVudGVyR290bygpIHtcbiAgICAgIGxldCBwYWdlID0gcGFyc2VJbnQodGhpcy5pbnB1dFZhbHVlKVxuICAgICAgaWYgKHBhZ2UgPCAxKSB7XG4gICAgICAgIHRoaXMuaW5wdXRWYWx1ZSA9ICcxJ1xuICAgICAgfVxuICAgICAgaWYgKHBhZ2UgPiB0aGlzLnBhZ2VUb3RhbCkge1xuICAgICAgICB0aGlzLmlucHV0VmFsdWUgPSBgJHt0aGlzLnBhZ2VUb3RhbH1gXG4gICAgICB9XG4gICAgICB0aGlzLmN1cnJlbnRQYWdlVmFsdWUgPSBwYXJzZUludCh0aGlzLmlucHV0VmFsdWUpXG4gICAgICB0aGlzLmlucHV0VmFsdWUgPSBgJHtwYXJzZUludCh0aGlzLmlucHV0VmFsdWUpfWBcbiAgICB9LFxuICAgIGhhbmRsZUNsaWNrUGFnZShpdGVtLCBpbmRleCl7XG4gICAgICBpZiAoaXRlbSA9PT0gJ8K3wrfCtycpIHtcbiAgICAgICAgaWYoaW5kZXggPT09IDEpe1xuICAgICAgICAgIHRoaXMuY3VycmVudFBhZ2VWYWx1ZSA9IDNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRQYWdlVmFsdWUgPSB0aGlzLnBhZ2VUb3RhbCAtIDJcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jdXJyZW50UGFnZVZhbHVlID0gaXRlbVxuICAgICAgfVxuICAgIH0sXG4gICAgaGFuZGxlQ2xpY2tBcnJvdyhwYXJhbXMpIHtcbiAgICAgIGlmIChwYXJhbXMgPT09ICdsZWZ0Jykge1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50UGFnZVZhbHVlICE9PSAxKSB7XG4gICAgICAgICAgdGhpcy5jdXJyZW50UGFnZVZhbHVlID0gdGhpcy5jdXJyZW50UGFnZVZhbHVlIC0gMVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRQYWdlVmFsdWUgPSAxXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRQYWdlVmFsdWUgIT09IHRoaXMucGFnZVRvdGFsKSB7XG4gICAgICAgICAgdGhpcy5jdXJyZW50UGFnZVZhbHVlID0gdGhpcy5jdXJyZW50UGFnZVZhbHVlICsgMVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY3VycmVudFBhZ2VWYWx1ZSA9IHRoaXMucGFnZVRvdGFsXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48c3R5bGU+XG5cbjwvc3R5bGU+XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZUNvbXBvbmVudCh0ZW1wbGF0ZSwgc3R5bGUsIHNjcmlwdCwgc2NvcGVJZCwgaXNGdW5jdGlvbmFsVGVtcGxhdGUsIG1vZHVsZUlkZW50aWZpZXJcbi8qIHNlcnZlciBvbmx5ICovXG4sIHNoYWRvd01vZGUsIGNyZWF0ZUluamVjdG9yLCBjcmVhdGVJbmplY3RvclNTUiwgY3JlYXRlSW5qZWN0b3JTaGFkb3cpIHtcbiAgaWYgKHR5cGVvZiBzaGFkb3dNb2RlICE9PSAnYm9vbGVhbicpIHtcbiAgICBjcmVhdGVJbmplY3RvclNTUiA9IGNyZWF0ZUluamVjdG9yO1xuICAgIGNyZWF0ZUluamVjdG9yID0gc2hhZG93TW9kZTtcbiAgICBzaGFkb3dNb2RlID0gZmFsc2U7XG4gIH0gLy8gVnVlLmV4dGVuZCBjb25zdHJ1Y3RvciBleHBvcnQgaW50ZXJvcC5cblxuXG4gIHZhciBvcHRpb25zID0gdHlwZW9mIHNjcmlwdCA9PT0gJ2Z1bmN0aW9uJyA/IHNjcmlwdC5vcHRpb25zIDogc2NyaXB0OyAvLyByZW5kZXIgZnVuY3Rpb25zXG5cbiAgaWYgKHRlbXBsYXRlICYmIHRlbXBsYXRlLnJlbmRlcikge1xuICAgIG9wdGlvbnMucmVuZGVyID0gdGVtcGxhdGUucmVuZGVyO1xuICAgIG9wdGlvbnMuc3RhdGljUmVuZGVyRm5zID0gdGVtcGxhdGUuc3RhdGljUmVuZGVyRm5zO1xuICAgIG9wdGlvbnMuX2NvbXBpbGVkID0gdHJ1ZTsgLy8gZnVuY3Rpb25hbCB0ZW1wbGF0ZVxuXG4gICAgaWYgKGlzRnVuY3Rpb25hbFRlbXBsYXRlKSB7XG4gICAgICBvcHRpb25zLmZ1bmN0aW9uYWwgPSB0cnVlO1xuICAgIH1cbiAgfSAvLyBzY29wZWRJZFxuXG5cbiAgaWYgKHNjb3BlSWQpIHtcbiAgICBvcHRpb25zLl9zY29wZUlkID0gc2NvcGVJZDtcbiAgfVxuXG4gIHZhciBob29rO1xuXG4gIGlmIChtb2R1bGVJZGVudGlmaWVyKSB7XG4gICAgLy8gc2VydmVyIGJ1aWxkXG4gICAgaG9vayA9IGZ1bmN0aW9uIGhvb2soY29udGV4dCkge1xuICAgICAgLy8gMi4zIGluamVjdGlvblxuICAgICAgY29udGV4dCA9IGNvbnRleHQgfHwgLy8gY2FjaGVkIGNhbGxcbiAgICAgIHRoaXMuJHZub2RlICYmIHRoaXMuJHZub2RlLnNzckNvbnRleHQgfHwgLy8gc3RhdGVmdWxcbiAgICAgIHRoaXMucGFyZW50ICYmIHRoaXMucGFyZW50LiR2bm9kZSAmJiB0aGlzLnBhcmVudC4kdm5vZGUuc3NyQ29udGV4dDsgLy8gZnVuY3Rpb25hbFxuICAgICAgLy8gMi4yIHdpdGggcnVuSW5OZXdDb250ZXh0OiB0cnVlXG5cbiAgICAgIGlmICghY29udGV4dCAmJiB0eXBlb2YgX19WVUVfU1NSX0NPTlRFWFRfXyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgY29udGV4dCA9IF9fVlVFX1NTUl9DT05URVhUX187XG4gICAgICB9IC8vIGluamVjdCBjb21wb25lbnQgc3R5bGVzXG5cblxuICAgICAgaWYgKHN0eWxlKSB7XG4gICAgICAgIHN0eWxlLmNhbGwodGhpcywgY3JlYXRlSW5qZWN0b3JTU1IoY29udGV4dCkpO1xuICAgICAgfSAvLyByZWdpc3RlciBjb21wb25lbnQgbW9kdWxlIGlkZW50aWZpZXIgZm9yIGFzeW5jIGNodW5rIGluZmVyZW5jZVxuXG5cbiAgICAgIGlmIChjb250ZXh0ICYmIGNvbnRleHQuX3JlZ2lzdGVyZWRDb21wb25lbnRzKSB7XG4gICAgICAgIGNvbnRleHQuX3JlZ2lzdGVyZWRDb21wb25lbnRzLmFkZChtb2R1bGVJZGVudGlmaWVyKTtcbiAgICAgIH1cbiAgICB9OyAvLyB1c2VkIGJ5IHNzciBpbiBjYXNlIGNvbXBvbmVudCBpcyBjYWNoZWQgYW5kIGJlZm9yZUNyZWF0ZVxuICAgIC8vIG5ldmVyIGdldHMgY2FsbGVkXG5cblxuICAgIG9wdGlvbnMuX3NzclJlZ2lzdGVyID0gaG9vaztcbiAgfSBlbHNlIGlmIChzdHlsZSkge1xuICAgIGhvb2sgPSBzaGFkb3dNb2RlID8gZnVuY3Rpb24gKCkge1xuICAgICAgc3R5bGUuY2FsbCh0aGlzLCBjcmVhdGVJbmplY3RvclNoYWRvdyh0aGlzLiRyb290LiRvcHRpb25zLnNoYWRvd1Jvb3QpKTtcbiAgICB9IDogZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICAgIHN0eWxlLmNhbGwodGhpcywgY3JlYXRlSW5qZWN0b3IoY29udGV4dCkpO1xuICAgIH07XG4gIH1cblxuICBpZiAoaG9vaykge1xuICAgIGlmIChvcHRpb25zLmZ1bmN0aW9uYWwpIHtcbiAgICAgIC8vIHJlZ2lzdGVyIGZvciBmdW5jdGlvbmFsIGNvbXBvbmVudCBpbiB2dWUgZmlsZVxuICAgICAgdmFyIG9yaWdpbmFsUmVuZGVyID0gb3B0aW9ucy5yZW5kZXI7XG5cbiAgICAgIG9wdGlvbnMucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyV2l0aFN0eWxlSW5qZWN0aW9uKGgsIGNvbnRleHQpIHtcbiAgICAgICAgaG9vay5jYWxsKGNvbnRleHQpO1xuICAgICAgICByZXR1cm4gb3JpZ2luYWxSZW5kZXIoaCwgY29udGV4dCk7XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBpbmplY3QgY29tcG9uZW50IHJlZ2lzdHJhdGlvbiBhcyBiZWZvcmVDcmVhdGUgaG9va1xuICAgICAgdmFyIGV4aXN0aW5nID0gb3B0aW9ucy5iZWZvcmVDcmVhdGU7XG4gICAgICBvcHRpb25zLmJlZm9yZUNyZWF0ZSA9IGV4aXN0aW5nID8gW10uY29uY2F0KGV4aXN0aW5nLCBob29rKSA6IFtob29rXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc2NyaXB0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5vcm1hbGl6ZUNvbXBvbmVudDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW5vcm1hbGl6ZS1jb21wb25lbnQuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBpc09sZElFID0gdHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgL21zaWUgWzYtOV1cXFxcYi8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpO1xuZnVuY3Rpb24gY3JlYXRlSW5qZWN0b3IoY29udGV4dCkge1xuICByZXR1cm4gZnVuY3Rpb24gKGlkLCBzdHlsZSkge1xuICAgIHJldHVybiBhZGRTdHlsZShpZCwgc3R5bGUpO1xuICB9O1xufVxudmFyIEhFQUQgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG52YXIgc3R5bGVzID0ge307XG5cbmZ1bmN0aW9uIGFkZFN0eWxlKGlkLCBjc3MpIHtcbiAgdmFyIGdyb3VwID0gaXNPbGRJRSA/IGNzcy5tZWRpYSB8fCAnZGVmYXVsdCcgOiBpZDtcbiAgdmFyIHN0eWxlID0gc3R5bGVzW2dyb3VwXSB8fCAoc3R5bGVzW2dyb3VwXSA9IHtcbiAgICBpZHM6IG5ldyBTZXQoKSxcbiAgICBzdHlsZXM6IFtdXG4gIH0pO1xuXG4gIGlmICghc3R5bGUuaWRzLmhhcyhpZCkpIHtcbiAgICBzdHlsZS5pZHMuYWRkKGlkKTtcbiAgICB2YXIgY29kZSA9IGNzcy5zb3VyY2U7XG5cbiAgICBpZiAoY3NzLm1hcCkge1xuICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIuY2hyb21lLmNvbS9kZXZ0b29scy9kb2NzL2phdmFzY3JpcHQtZGVidWdnaW5nXG4gICAgICAvLyB0aGlzIG1ha2VzIHNvdXJjZSBtYXBzIGluc2lkZSBzdHlsZSB0YWdzIHdvcmsgcHJvcGVybHkgaW4gQ2hyb21lXG4gICAgICBjb2RlICs9ICdcXG4vKiMgc291cmNlVVJMPScgKyBjc3MubWFwLnNvdXJjZXNbMF0gKyAnICovJzsgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcblxuICAgICAgY29kZSArPSAnXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCwnICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzLm1hcCkpKSkgKyAnICovJztcbiAgICB9XG5cbiAgICBpZiAoIXN0eWxlLmVsZW1lbnQpIHtcbiAgICAgIHN0eWxlLmVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgc3R5bGUuZWxlbWVudC50eXBlID0gJ3RleHQvY3NzJztcbiAgICAgIGlmIChjc3MubWVkaWEpIHN0eWxlLmVsZW1lbnQuc2V0QXR0cmlidXRlKCdtZWRpYScsIGNzcy5tZWRpYSk7XG4gICAgICBIRUFELmFwcGVuZENoaWxkKHN0eWxlLmVsZW1lbnQpO1xuICAgIH1cblxuICAgIGlmICgnc3R5bGVTaGVldCcgaW4gc3R5bGUuZWxlbWVudCkge1xuICAgICAgc3R5bGUuc3R5bGVzLnB1c2goY29kZSk7XG4gICAgICBzdHlsZS5lbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IHN0eWxlLnN0eWxlcy5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBpbmRleCA9IHN0eWxlLmlkcy5zaXplIC0gMTtcbiAgICAgIHZhciB0ZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNvZGUpO1xuICAgICAgdmFyIG5vZGVzID0gc3R5bGUuZWxlbWVudC5jaGlsZE5vZGVzO1xuICAgICAgaWYgKG5vZGVzW2luZGV4XSkgc3R5bGUuZWxlbWVudC5yZW1vdmVDaGlsZChub2Rlc1tpbmRleF0pO1xuICAgICAgaWYgKG5vZGVzLmxlbmd0aCkgc3R5bGUuZWxlbWVudC5pbnNlcnRCZWZvcmUodGV4dE5vZGUsIG5vZGVzW2luZGV4XSk7ZWxzZSBzdHlsZS5lbGVtZW50LmFwcGVuZENoaWxkKHRleHROb2RlKTtcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVJbmplY3Rvcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJyb3dzZXIuanMubWFwXG4iLCJpbXBvcnQgUGFnaW5hdGlvbiBmcm9tICcuL3NyYy9tYWluLnZ1ZSdcblxuY29uc3QgaW5zdGFsbCA9IGZ1bmN0aW9uIChWdWUpIHtcbiAgVnVlLmNvbXBvbmVudChQYWdpbmF0aW9uLm5hbWUsIFBhZ2luYXRpb24pXG59XG5cblBhZ2luYXRpb24uaW5zdGFsbCA9IGluc3RhbGxcblxuZXhwb3J0IGRlZmF1bHQgUGFnaW5hdGlvblxuIiwiXG5leHBvcnQgZGVmYXVsdCB7XG4gIGRhdGE6ICgpID0+ICh7XG4gICAgb2JzZXJ2ZXI6IHZvaWQgMCxcbiAgICBtZWFzdXJlZFdpZHRoOiB2b2lkIDBcbiAgfSksXG4gIGNvbXB1dGVkOiB7XG4gICAgdGFyZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuaG9yaXpvbnRhbCA/ICd3aWR0aCcgOiAnaGVpZ2h0J1xuICAgIH0sXG4gICAgbWVhc3VyZVRhcmdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmhvcml6b250YWwgPyAnb2Zmc2V0V2lkdGgnIDogJ29mZnNldEhlaWdodCdcbiAgICB9LFxuICAgIG1pblNpemUoKSB7XG4gICAgICByZXR1cm4gdGhpcy5taW4gIT09IHZvaWQgMCA/IGAke3RoaXMubWlufXB4YCA6IDBcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBpbml0U3R5bGUoKSB7XG4gICAgICBpZiAodGhpcy5pbm5lckNvbGxhcHNlZCkge1xuICAgICAgICB0aGlzLiRyZWZzLnNsaWRlLnN0eWxlW3RoaXMudGFyZ2V0XSA9IHRoaXMubWluU2l6ZVxuICAgICAgfVxuICAgIH0sXG4gICAgc2V0U3R5bGUocGFzc2l2ZSkge1xuICAgICAgbGV0IHNsaWRlVGFyZ2V0ID0gdGhpcy4kcmVmcy5zbGlkZVxuXG4gICAgICBpZiAocGFzc2l2ZSkge1xuICAgICAgICBpZiAoc2xpZGVUYXJnZXQuc3R5bGVbdGhpcy50YXJnZXRdICYmICF0aGlzLmlubmVyQ29sbGFwc2VkKSB7XG4gICAgICAgICAgc2xpZGVUYXJnZXQuc3R5bGVbdGhpcy50YXJnZXRdID0gbnVsbFxuICAgICAgICB9XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgc2xpZGVUYXJnZXQuc3R5bGVbdGhpcy50YXJnZXRdID0gYCR7dGhpcy4kcmVmcy5vYnNlcnZlW3RoaXMubWVhc3VyZVRhcmdldF19cHhgXG4gICAgICBpZiAodGhpcy5pbm5lckNvbGxhcHNlZCkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBzbGlkZVRhcmdldC5zdHlsZVt0aGlzLnRhcmdldF0gPSB0aGlzLm1pblNpemVcbiAgICAgICAgfSwgMClcbiAgICAgIH1cbiAgICB9LFxuICAgIGNsZWFyVXBwZXJTdHlsZSh1cHBlcikge1xuICAgICAgbGV0IHVwcGVyU2xpZGVUYXJnZXQgPSB1cHBlci4kcmVmcy5zbGlkZVxuXG4gICAgICBpZiAodXBwZXJTbGlkZVRhcmdldCkge1xuICAgICAgICBpZiAodXBwZXJTbGlkZVRhcmdldC5zdHlsZVt0aGlzLnRhcmdldF0pIHtcbiAgICAgICAgICB1cHBlclNsaWRlVGFyZ2V0LnN0eWxlW3RoaXMudGFyZ2V0XSA9IG51bGxcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHVwcGVyLiRwYXJlbnQgJiYgdXBwZXIuJHBhcmVudC4kcmVmcykge1xuICAgICAgICB0aGlzLmNsZWFyVXBwZXJTdHlsZSh1cHBlci4kcGFyZW50KVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgbW91bnRlZCgpIHtcbiAgICBpZiAoIXRoaXMuJHJlZnMuc2xpZGUgfHwgIXRoaXMuJHJlZnMub2JzZXJ2ZSkgeyByZXR1cm4gfVxuICAgIHRoaXMuJHdhdGNoKFxuICAgICAgJ2lubmVyQ29sbGFwc2VkJyxcbiAgICAgICgpID0+IHtcbiAgICAgICAgdGhpcy5jbGVhclVwcGVyU3R5bGUodGhpcy4kcGFyZW50KVxuICAgICAgICB0aGlzLnNldFN0eWxlKClcbiAgICAgIH0pXG4gICAgdGhpcy5pbml0U3R5bGUoKVxuICAgIHRoaXMub2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgICB0aGlzLnNldFN0eWxlKHRydWUpXG4gICAgfSlcblxuICAgIHRoaXMub2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLiRyZWZzLm9ic2VydmUsIHtcbiAgICAgIGF0dHJpYnV0ZXM6IHRydWUsXG4gICAgICBhdHRyaWJ1dGVGaWx0ZXI6IFsnbXV0YXRlJ10sXG4gICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgICAgY2hhcmFjdGVyRGF0YTogdHJ1ZVxuICAgIH0pXG4gIH0sXG4gIGJlZm9yZURlc3Ryb3koKSB7XG4gICAgdGhpcy5vYnNlcnZlciAmJiB0aGlzLm9ic2VydmVyLmRpc2Nvbm5lY3QoKVxuICB9XG59XG4gICIsImltcG9ydCBTbGlkZU9ic2VydmVyIGZyb20gJy4uLy4uLy4uL21peGlucy9zbGlkZU9ic2VydmVyJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdzd1NsaWRlJyxcbiAgbWl4aW5zOiBbU2xpZGVPYnNlcnZlcl0sXG4gIHByb3BzOiB7XG4gICAgY29sbGFwc2VkOiBCb29sZWFuLFxuICAgIGhvcml6b250YWw6IEJvb2xlYW4sXG4gICAgZml0OiBCb29sZWFuLFxuICAgIG1pbjogTnVtYmVyIHwgU3RyaW5nLFxuICAgIHNoYWRvdzogQm9vbGVhblxuICB9LFxuICBkYXRhOiAoKSA9PiAoe1xuICAgIGlubmVyQ29sbGFwc2VkOiB0cnVlXG4gIH0pLFxuICB3YXRjaDoge1xuICAgIGNvbGxhcHNlZDoge1xuICAgICAgaGFuZGxlcigpIHtcbiAgICAgICAgdGhpcy5pbm5lckNvbGxhcHNlZCA9IHRoaXMuY29sbGFwc2VkXG4gICAgICB9LFxuICAgICAgaW1tZWRpYXRlOiB0cnVlXG4gICAgfVxuICB9LFxuICByZW5kZXIoaCkge1xuICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICByZWY6ICdzbGlkZScsXG4gICAgICBzdGF0aWNDbGFzczogJ3N3LXNsaWRlX19jb250YWluZXInLFxuICAgICAgY2xhc3M6IHtcbiAgICAgICAgc2hhZG93OiB0aGlzLnNoYWRvd1xuICAgICAgfVxuICAgIH0sIFtcbiAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgcmVmOiAnb2JzZXJ2ZScsXG4gICAgICAgIHN0YXRpY0NsYXNzOiBgc3ctc2xpZGVfX2NvbnRlbnRgLFxuICAgICAgICBjbGFzczoge1xuICAgICAgICAgICdtaW4td2lkdGgnOiB0aGlzLmhvcml6b250YWwgJiYgIXRoaXMuZml0LFxuICAgICAgICAgICdmaXQtd2lkdGgnOiB0aGlzLmhvcml6b250YWwgJiYgdGhpcy5maXQsXG4gICAgICAgICAgJ21pbi1oZWlnaHQnOiAhdGhpcy5ob3Jpem9udGFsICYmICF0aGlzLmZpdCxcbiAgICAgICAgICAnZml0LWhlaWdodCc6ICF0aGlzLmhvcml6b250YWwgJiYgdGhpcy5maXRcbiAgICAgICAgfVxuICAgICAgfSwgW3RoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQoKV0pXG4gICAgXSlcbiAgfVxufSIsImltcG9ydCBTbGlkZSBmcm9tICcuL3NyYy9tYWluLmpzJ1xuXG5jb25zdCBpbnN0YWxsID0gZnVuY3Rpb24gKFZ1ZSkge1xuICBWdWUuY29tcG9uZW50KFNsaWRlLm5hbWUsIFNsaWRlKVxufVxuXG5TbGlkZS5pbnN0YWxsID0gaW5zdGFsbFxuXG5leHBvcnQgZGVmYXVsdCBTbGlkZVxuIiwiaW1wb3J0IFZ1ZSBmcm9tICd2dWUnXG5pbXBvcnQgU2xpZGUgZnJvbSAnLi4vLi4vc2xpZGUnXG5pbXBvcnQgeyBpc1N0cmluZ0NvbnRhaW4gfSBmcm9tICcuLi8uLi8uLi91dGlscy9pcydcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnc3dCYXNpY0l0ZW0nLFxuICBjb21wb25lbnRzOiB7IFNsaWRlIH0sXG4gIHByb3BzOiB7XG4gICAgY29udGVudDogU3RyaW5nLFxuICAgIHN1YkNvbnRlbnQ6IFN0cmluZyxcbiAgICBpY29uOiBTdHJpbmcsXG4gICAgZGlzYWJsZWQ6IEJvb2xlYW4sXG4gICAgY29sb3I6IFN0cmluZyxcbiAgICBwcmltYXJ5OiBCb29sZWFuLFxuICAgIG5lZ2F0aXZlOiBCb29sZWFuLFxuICAgIHBvc2l0aXZlOiBCb29sZWFuLFxuICAgIHdhcm5pbmc6IEJvb2xlYW4sXG4gICAgY29sbGFwc2VkOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgIH0sXG4gICAgdG86IFN0cmluZyB8IE9iamVjdCxcbiAgICBpbmRlbnRMZXZlbDogTnVtYmVyIHwgU3RyaW5nLFxuICAgIG1hc2s6IE9iamVjdCB8IEJvb2xlYW4sXG4gICAgcmlwcGxlOiBPYmplY3QgfCBCb29sZWFuLFxuICAgIHN1YjogQXJyYXksXG4gICAgYWN0aXZlOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICB9LFxuICAgIGNhbGxiYWNrOiBGdW5jdGlvbixcbiAgICBzdWJGaWx0ZXI6IFN0cmluZyxcbiAgICBmaWxsZWQ6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiB2b2lkIDBcbiAgICB9LFxuICAgIHNoYWRvdzoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IHZvaWQgMFxuICAgIH0sXG4gICAgc3BsaXQ6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiB2b2lkIDBcbiAgICB9LFxuICAgIG1pbmk6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiB2b2lkIDBcbiAgICB9LFxuICAgIGNlbnRlcjoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IHZvaWQgMFxuICAgIH0sXG4gICAgZW5kOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogdm9pZCAwXG4gICAgfVxuICB9LFxuICBkYXRhOiAoKSA9PiAoe1xuICAgIGNvbGxhcHNlZEJlZm9yZTogdHJ1ZSxcbiAgICBtb3VzZW92ZXI6IGZhbHNlLFxuICAgIGhpZGU6IGZhbHNlLFxuICAgIGV2ZW50T3JpZ2luOiBmYWxzZSxcbiAgICBldmVudEh1Yjogdm9pZCAwXG4gIH0pLFxuICBjb21wdXRlZDoge1xuICAgIGhhc0JlZm9yZSgpIHtcbiAgICAgIHJldHVybiB0aGlzLiRzY29wZWRTbG90cy5iZWZvcmUgIT09IHZvaWQgMCB8fCB0aGlzLmljb24gIT09IHZvaWQgMFxuICAgIH0sXG4gICAgaGFzQ29udGVudCgpIHtcbiAgICAgIHJldHVybiB0aGlzLiRzY29wZWRTbG90cy5jb250ZW50ICE9PSB2b2lkIDAgfHwgdGhpcy5jb250ZW50ICE9PSB2b2lkIDAgfHwgdGhpcy5zdWJDb250ZW50ICE9PSB2b2lkIDBcbiAgICB9LFxuICAgIGhhc1N1YigpIHtcbiAgICAgIHJldHVybiB0aGlzLiRzY29wZWRTbG90cy5kZWZhdWx0ICE9PSB2b2lkIDAgfHwgdGhpcy5zdWIgIT09IHZvaWQgMFxuICAgIH0sXG4gICAgaGFzQWN0aW9uKCkge1xuICAgICAgcmV0dXJuICF0aGlzLmRpc2FibGVkICYmICh0aGlzLnRvICE9PSB2b2lkIDAgfHwgdGhpcy5jYWxsYmFjayAhPT0gdm9pZCAwIHx8IHRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQgfHwgdGhpcy5zdWIgIT09IHZvaWQgMClcbiAgICB9LFxuICAgIGlubmVyQ2VudGVyKCkge1xuICAgICAgcmV0dXJuIHRoaXMuY2VudGVyICE9PSB2b2lkIDAgPyB0aGlzLmNlbnRlciA6IHRoaXMucm9vdFBhcmFtcy5jZW50ZXJcbiAgICB9LFxuICAgIGlubmVyRW5kKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZW5kICE9PSB2b2lkIDAgPyB0aGlzLmVuZCA6IHRoaXMucm9vdFBhcmFtcy5lbmRcbiAgICB9LFxuICAgIGlubmVyRmlsbGVkKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZmlsbGVkICE9PSB2b2lkIDAgPyB0aGlzLmZpbGxlZCA6IHRoaXMucm9vdFBhcmFtcy5maWxsZWRcbiAgICB9LFxuICAgIGlubmVyU3BsaXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5zcGxpdCAhPT0gdm9pZCAwID8gdGhpcy5zcGxpdCA6IHRoaXMucm9vdFBhcmFtcy5zcGxpdFxuICAgIH0sXG4gICAgaW5uZXJNaW5pKCkge1xuICAgICAgcmV0dXJuIHRoaXMubWluaSAhPT0gdm9pZCAwID8gdGhpcy5taW5pIDogdGhpcy5yb290UGFyYW1zLm1pbmlcbiAgICB9LFxuICAgIGlubmVyU2hhZG93KCkge1xuICAgICAgcmV0dXJuIHRoaXMuc2hhZG93ICE9PSB2b2lkIDAgPyB0aGlzLnNoYWRvdyA6IHRoaXMucm9vdFBhcmFtcy5zaGFkb3dcbiAgICB9LFxuICAgIGlubmVyTWFzaygpIHtcbiAgICAgIHJldHVybiB0aGlzLm1hc2sgIT09IHZvaWQgMCA/IHRoaXMubWFzayA6IHRoaXMucm9vdFBhcmFtcy5tYXNrXG4gICAgfSxcbiAgICBpbm5lclJpcHBsZSgpIHtcbiAgICAgIHJldHVybiB0aGlzLnJpcHBsZSAhPT0gdm9pZCAwID8gdGhpcy5yaXBwbGUgOiB0aGlzLnJvb3RQYXJhbXMucmlwcGxlXG4gICAgfSxcbiAgICBpbm5lckluZGVudExldmVsKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaW5kZW50TGV2ZWwgfHwgdGhpcy5yb290UGFyYW1zLmluZGVudExldmVsXG4gICAgfSxcbiAgICBpbm5lckNhbGxiYWNrKCkge1xuICAgICAgcmV0dXJuIHRoaXMuY2FsbGJhY2sgfHwgdGhpcy5yb290UGFyYW1zLmNhbGxiYWNrXG4gICAgfSxcbiAgICBpbm5lclN1YkZpbHRlcigpIHtcbiAgICAgIHJldHVybiB0aGlzLnJvb3QgPT09IHZvaWQgMCA/IHRoaXMuc3ViRmlsdGVyIDogdGhpcy5yb290LnN1YkZpbHRlclxuICAgIH0sXG4gICAgaW5uZXJFdmVudEh1YigpIHtcbiAgICAgIHJldHVybiB0aGlzLmV2ZW50SHViIHx8IHRoaXMucm9vdC5ldmVudEh1YlxuICAgIH0sXG4gICAgcm9vdFBhcmFtcygpIHtcbiAgICAgIHJldHVybiB0aGlzLnJvb3QgfHwge31cbiAgICB9LFxuICAgIG1pbkhlaWdodCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmlubmVyTWluaSA/ICczNnB4JyA6ICc0OHB4J1xuICAgIH1cbiAgfSxcbiAgaW5qZWN0OiB7XG4gICAgcm9vdDoge1xuICAgICAgZGVmYXVsdCgpIHtcbiAgICAgICAgcmV0dXJuIHZvaWQgMFxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgcHJvdmlkZSgpIHtcbiAgICByZXR1cm4gdGhpcy5yb290ID09PSB2b2lkIDAgPyB7XG4gICAgICByb290OiB0aGlzXG4gICAgfSA6IHZvaWQgMFxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgc3ViRmlsdGVyQ2hhbmdlKHJlc3RvcmUsIHJlbWVtYmVyKSB7XG4gICAgICBjb25zdCBpc1N1YkNvbnRhaW4gPSBzdWIgPT4ge1xuICAgICAgICBsZXQgY29udGFpbiA9IGZhbHNlXG4gIFxuICAgICAgICBjb250YWluID0gc3ViLnNvbWUoeCA9PiB7XG4gICAgICAgICAgaWYgKHguc3ViKSB7XG4gICAgICAgICAgICByZXR1cm4gaXNTdWJDb250YWluKHguc3ViKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gaXNTdHJpbmdDb250YWluKHguY29udGVudCwgdGhpcy5pbm5lclN1YkZpbHRlcilcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiBjb250YWluXG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLnN1YiA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHRoaXMuaGlkZSA9ICFpc1N0cmluZ0NvbnRhaW4odGhpcy5jb250ZW50LCB0aGlzLmlubmVyU3ViRmlsdGVyKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHJlc3RvcmUpIHtcbiAgICAgICAgICB0aGlzLiRlbWl0KCd1cGRhdGU6Y29sbGFwc2VkJywgdGhpcy5jb2xsYXBzZWRCZWZvcmUpXG4gICAgICAgICAgdGhpcy5oaWRlID0gZmFsc2VcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBpZiAocmVtZW1iZXIpIHtcbiAgICAgICAgICB0aGlzLmNvbGxhcHNlZEJlZm9yZSA9IHRoaXMuY29sbGFwc2VkXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy4kZW1pdCgndXBkYXRlOmNvbGxhcHNlZCcsIGZhbHNlKVxuICAgICAgICB0aGlzLmhpZGUgPSB0aGlzLnJvb3QgIT09IHZvaWQgMCAmJiAhaXNTdWJDb250YWluKHRoaXMuc3ViKVxuICAgICAgfVxuICAgIH0sXG4gICAgaW5pdEV2ZW50SHViKCkge1xuICAgICAgaWYgKHRoaXMucm9vdCA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHRoaXMuZXZlbnRIdWIgPSBuZXcgVnVlKClcbiAgICAgIH1cbiAgICAgIHRoaXMuaW5uZXJFdmVudEh1Yi4kb24oJ2NoYW5nZTphY3RpdmUnLCAoKSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5ldmVudE9yaWdpbikge1xuICAgICAgICAgIHRoaXMuJGVtaXQoJ3VwZGF0ZTphY3RpdmUnLCBmYWxzZSlcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmV2ZW50T3JpZ2luID0gZmFsc2VcbiAgICAgIH0pXG4gICAgfSxcbiAgICBlbWl0QWN0aXZlKCkge1xuICAgICAgdGhpcy5ldmVudE9yaWdpbiA9IHRydWVcbiAgICAgIHRoaXMuJGVtaXQoJ3VwZGF0ZTphY3RpdmUnLCB0cnVlKVxuICAgICAgdGhpcy5pbm5lckV2ZW50SHViLiRlbWl0KCdjaGFuZ2U6YWN0aXZlJylcbiAgICB9XG4gIH0sXG4gIGNyZWF0ZWQoKSB7XG4gICAgdGhpcy5pbml0RXZlbnRIdWIoKVxuICAgIGlmICh0aGlzLmNvbnRlbnQgIT09IHZvaWQgMCAmJiB0aGlzLmlubmVyU3ViRmlsdGVyICE9PSB2b2lkIDApIHtcbiAgICAgIHRoaXMuJHdhdGNoKCdpbm5lclN1YkZpbHRlcicsICh2LCBvdikgPT4ge1xuICAgICAgICBpZiAodiAhPT0gJycgfHwgb3YgIT09IHZvaWQgMCkge1xuICAgICAgICAgIHRoaXMuc3ViRmlsdGVyQ2hhbmdlKHYgPT09ICcnLCBvdiA9PT0gJycpXG4gICAgICAgIH1cbiAgICAgIH0sIHsgaW1tZWRpYXRlOiB0cnVlIH0pXG4gICAgfVxuICB9LFxuICByZW5kZXIoaCkge1xuICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICBzdGF0aWNDbGFzczogJ3N3LWJhc2ljLWl0ZW0nLFxuICAgICAgYXR0cnM6IHtcbiAgICAgICAgbXV0YXRlOiB0aGlzLmhpZGVcbiAgICAgIH0sXG4gICAgICBjbGFzczoge1xuICAgICAgICBzcGxpdDogdGhpcy5pbm5lclNwbGl0ICYmICF0aGlzLmNvbGxhcHNlZCxcbiAgICAgICAgaGlkZTogdGhpcy5oaWRlXG4gICAgICB9XG4gICAgfSwgW1xuICAgICAgaCgnZGl2Jywge1xuICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWJhc2ljLWl0ZW1fX21haW4nLFxuICAgICAgICBjbGFzczogdGhpcy5kaXNhYmxlZCA/ICdkaXNhYmxlJyA6IHRoaXMuaW5uZXJGaWxsZWQgPyB7XG4gICAgICAgICAgJ2JnLXByaW1hcnknOiB0aGlzLnByaW1hcnksXG4gICAgICAgICAgJ2JnLW5lZ2F0aXZlJzogdGhpcy5uZWdhdGl2ZSxcbiAgICAgICAgICAnYmctcG9zaXRpdmUnOiB0aGlzLnBvc2l0aXZlLFxuICAgICAgICAgICdiZy13YXJuaW5nJzogdGhpcy53YXJuaW5nLFxuICAgICAgICAgICdiZy1kYXJrIGNvbG9yLXdoaXRlJzogdHJ1ZVxuICAgICAgICB9IDoge1xuICAgICAgICAgICdjb2xvci1wcmltYXJ5JzogdGhpcy5wcmltYXJ5LFxuICAgICAgICAgICdjb2xvci1uZWdhdGl2ZSc6IHRoaXMubmVnYXRpdmUsXG4gICAgICAgICAgJ2NvbG9yLXBvc2l0aXZlJzogdGhpcy5wb3NpdGl2ZSxcbiAgICAgICAgICAnY29sb3Itd2FybmluZyc6IHRoaXMud2FybmluZ1xuICAgICAgICB9LFxuICAgICAgICBzdHlsZTogdGhpcy5kaXNhYmxlZCA/IHZvaWQgMCA6IHRoaXMuaW5uZXJGaWxsZWQgPyB7XG4gICAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiB0aGlzLmNvbG9yXG4gICAgICAgIH0gOiB7XG4gICAgICAgICAgY29sb3I6IHRoaXMuY29sb3JcbiAgICAgICAgfVxuICAgICAgfSwgW1xuICAgICAgICBoKCdzdy1pdGVtJywge1xuICAgICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctYmFzaWMtaXRlbV9faW5uZXInLFxuICAgICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICB0bzogdGhpcy5pbm5lckNhbGxiYWNrID8gdm9pZCAwIDogdGhpcy50byxcbiAgICAgICAgICAgIGNlbnRlcjogdGhpcy5pbm5lckNlbnRlcixcbiAgICAgICAgICAgIGVuZDogdGhpcy5pbm5lckVuZCxcbiAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLmRpc2FibGVkLFxuICAgICAgICAgICAgbWFzazogdGhpcy5pbm5lck1hc2ssXG4gICAgICAgICAgICByaXBwbGU6IHRoaXMuaW5uZXJSaXBwbGUsXG4gICAgICAgICAgICBhY3RpdmU6IHRoaXMuYWN0aXZlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjbGFzczoge1xuICAgICAgICAgICAgZXhwYW5kOiAhdGhpcy5jb2xsYXBzZWRcbiAgICAgICAgICB9LFxuICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAnbWluLWhlaWdodCc6IHRoaXMubWluSGVpZ2h0LFxuICAgICAgICAgICAgJ3BhZGRpbmctbGVmdCc6IGAke3RoaXMuaW5uZXJJbmRlbnRMZXZlbCAqIDEyfXB4YCxcbiAgICAgICAgICAgIGN1cnNvcjogdGhpcy5oYXNBY3Rpb24gPyAncG9pbnRlcicgOiB2b2lkIDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uOiB0aGlzLmRpc2FibGVkID8gdm9pZCAwIDoge1xuICAgICAgICAgICAgLi4udGhpcy4kbGlzdGVuZXJzLFxuICAgICAgICAgICAgY2xpY2s6ICgpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuaGFzU3ViKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgndXBkYXRlOmNvbGxhcHNlZCcsICF0aGlzLmNvbGxhcHNlZClcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXRBY3RpdmUoKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoaXMuaW5uZXJDYWxsYmFjayAmJiB0aGlzLmlubmVyQ2FsbGJhY2sodGhpcylcbiAgICAgICAgICAgICAgdGhpcy4kZW1pdCgnY2xpY2snKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1vdXNlb3ZlcjogKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLm1vdXNlb3ZlciA9IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtb3VzZW91dDogKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLm1vdXNlb3ZlciA9IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBzY29wZWRTbG90czoge1xuICAgICAgICAgICAgYmVmb3JlOiAoKSA9PiBbaCgnZGl2Jywge1xuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogJ2ZsZXggaXRlbXMtY2VudGVyJyxcbiAgICAgICAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAgICAgICAnc3BhY2UtcmlnaHQnOiB0aGlzLmhhc0JlZm9yZVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCB0aGlzLiRzY29wZWRTbG90cy5iZWZvcmUgIT09IHZvaWQgMCA/IFt0aGlzLiRzY29wZWRTbG90cy5iZWZvcmUoKV1cbiAgICAgICAgICAgICAgOiB0aGlzLmljb24gIT09IHZvaWQgMCA/IFtoKCdzdy1pY29uJywge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctYmFzaWMtaXRlbV9faWNvbicsXG4gICAgICAgICAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMuaWNvblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSldIDogdm9pZCAwKV0sXG4gIFxuICAgICAgICAgICAgZGVmYXVsdDogKCkgPT4gW2goJ2RpdicsIHtcbiAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1iYXNpYy1pdGVtX19jb250ZW50IGZsZXggaXRlbXMtY2VudGVyJyxcbiAgICAgICAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAgICAgICAnc3BhY2UtcmlnaHQnOiB0aGlzLmhhc0NvbnRlbnRcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgdGhpcy4kc2NvcGVkU2xvdHMuY29udGVudCAhPT0gdm9pZCAwID8gW3RoaXMuJHNjb3BlZFNsb3RzLmNvbnRlbnQoKV0gOiBbXG4gICAgICAgICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogJ2RlZmF1bHQtY29udGVudCdcbiAgICAgICAgICAgICAgfSwgW1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudCAhPT0gdm9pZCAwID8gaCgnZGl2Jywge1xuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1iYXNpYy1pdGVtX19sYWJlbCdcbiAgICAgICAgICAgICAgICB9LCB0aGlzLmNvbnRlbnQpIDogdm9pZCAwLFxuICAgICAgICAgICAgICAgIHRoaXMuc3ViQ29udGVudCAhPT0gdm9pZCAwID8gaCgnZGl2Jywge1xuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1iYXNpYy1pdGVtX19zdWJsYWJlbCdcbiAgICAgICAgICAgICAgICB9LCB0aGlzLnN1YkNvbnRlbnQpIDogdm9pZCAwXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICBdXG4gICAgICAgICAgICApXSxcbiAgXG4gICAgICAgICAgICBhZnRlcjogKCkgPT4gW2goJ2RpdicsIHtcbiAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6ICdmbGV4IGl0ZW1zLWNlbnRlcidcbiAgICAgICAgICAgIH0sIHRoaXMuJHNjb3BlZFNsb3RzLmFmdGVyICE9PSB2b2lkIDAgPyBbdGhpcy4kc2NvcGVkU2xvdHMuYWZ0ZXIoKV1cbiAgICAgICAgICAgICAgOiB0aGlzLmhhc1N1YiA/IFtoKCdzdy1pY29uJywge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctYmFzaWMtaXRlbV9fZXhwYW5zaW9uIGNvbG9yLWdyZXknLFxuICAgICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICF0aGlzLmNvbGxhcHNlZCA/ICdyb3RhdGUoMTgwZGVnKScgOiB2b2lkIDAsXG4gICAgICAgICAgICAgICAgICBjb2xvcjogdGhpcy5tb3VzZW92ZXIgPyAnY3VycmVudENvbG9yJyA6IHZvaWQgMFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgICAgICAgIG5hbWU6ICdrZXlib2FyZF9hcnJvd19kb3duJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSldIDogdm9pZCAwKV1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICBdKSxcbiAgICAgIHRoaXMuaGFzU3ViID8gaChTbGlkZSwge1xuICAgICAgICBwcm9wczoge1xuICAgICAgICAgIGNvbGxhcHNlZDogdGhpcy5jb2xsYXBzZWQsXG4gICAgICAgICAgc2hhZG93OiB0aGlzLmlubmVyU2hhZG93XG4gICAgICAgIH0sXG4gICAgICAgIHNjb3BlZFNsb3RzOiB7XG4gICAgICAgICAgZGVmYXVsdDogKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHN1YiA9IHRoaXMuc3ViICE9PSB2b2lkIDAgPyB0aGlzLnN1Yi5tYXAocHJvcHMgPT4gaCgnc3ctYmFzaWMtaXRlbScsIHtcbiAgICAgICAgICAgICAgcHJvcHM6IHByb3BzLFxuICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICd1cGRhdGU6Y29sbGFwc2VkJzogdiA9PiB7XG4gICAgICAgICAgICAgICAgICBwcm9wcy5jb2xsYXBzZWQgPSB2XG4gICAgICAgICAgICAgICAgICB0aGlzLiRmb3JjZVVwZGF0ZSgpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAndXBkYXRlOmFjdGl2ZSc6IHYgPT4ge1xuICAgICAgICAgICAgICAgICAgcHJvcHMuYWN0aXZlID0gdlxuICAgICAgICAgICAgICAgICAgdGhpcy4kZm9yY2VVcGRhdGUoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpIDogW11cblxuICAgICAgICAgICAgc3ViLnVuc2hpZnQodGhpcy4kc2NvcGVkU2xvdHMuZGVmYXVsdCA/IHRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQoKSA6IHZvaWQgMClcbiAgICAgICAgICAgIHJldHVybiBzdWJcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pIDogdm9pZCAwXG4gICAgXSlcbiAgfVxufSIsImltcG9ydCBCYXNpY0l0ZW0gZnJvbSAnLi9zcmMvbWFpbi5qcydcblxuY29uc3QgaW5zdGFsbCA9IGZ1bmN0aW9uIChWdWUpIHtcbiAgVnVlLmNvbXBvbmVudChCYXNpY0l0ZW0ubmFtZSwgQmFzaWNJdGVtKVxufVxuXG5CYXNpY0l0ZW0uaW5zdGFsbCA9IGluc3RhbGxcblxuZXhwb3J0IGRlZmF1bHQgQmFzaWNJdGVtXG4iLCJleHBvcnQgZnVuY3Rpb24gaGFzT3duKG9iaiwga2V5KSB7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KTtcbn07XG5leHBvcnQgZnVuY3Rpb24gaXNWTm9kZShub2RlKSB7XG4gIHJldHVybiBub2RlICE9PSBudWxsICYmIHR5cGVvZiBub2RlID09PSAnb2JqZWN0JyAmJiBoYXNPd24obm9kZSwgJ2NvbXBvbmVudE9wdGlvbnMnKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRGaXJzdENvbXBvbmVudENoaWxkKGNoaWxkcmVuKSB7XG4gIHJldHVybiBjaGlsZHJlbiAmJiBjaGlsZHJlbi5maWx0ZXIoYyA9PiBjICYmIGMudGFnKVswXTtcbn07IiwiLy8gPHRlbXBsYXRlPlxuLy8gICA8ZGl2PlxuLy8gICAgIDxidXR0b24gQGNsaWNrPVwiaGFuZGxlQnRuXCI+Y2xpY2s8L2J1dHRvbj5cbi8vICAgICA8dHJhbnNpdGlvbiBuYW1lPSdzdy1ub3RpZmljYXRpb24tZmFkZSc+XG4vLyAgICAgICA8ZGl2IHYtaWY9XCJzaG93XCIgY2xhc3M9XCJzdy1ub3RpZmljYXRpb25cIj5cbi8vICAgICAgICAgPGgyIGNsYXNzPVwidGl0bGVcIj5cbi8vICAgICAgICAgICDmj5DnpLoxMTExXG4vLyAgICAgICAgIDwvaDI+XG4vLyAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250ZW50XCI+XG4vLyAgICAgICAgICAg6L+Z5piv5LiA5p2h5raI5oGvXG4vLyAgICAgICAgIDwvZGl2PlxuLy8gICAgICAgICA8ZGl2IGNsYXNzPVwiY2xvc2VcIiBAY2xpY2s9XCJoYW5kbGVCdG5cIj5cbi8vICAgICAgICAgICA8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+Y2xvc2U8L2k+XG4vLyAgICAgICAgIDwvZGl2PlxuLy8gICAgICAgPC9kaXY+XG4vLyAgICAgPC90cmFuc2l0aW9uPlxuLy8gICA8L2Rpdj5cbi8vIDwvdGVtcGxhdGU+XG5pbXBvcnQgVm5vZGUsIHsgaXNWTm9kZSB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL3Zkb20nXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdzd05vdGlmaWNhdGlvbicsXG4gIGRhdGEgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzaG93OiBmYWxzZSxcbiAgICAgIHZlcnRpY2FsT2Zmc2V0OiAwLFxuICAgICAgb25DbG9zZTogbnVsbCxcbiAgICAgIHBvc2l0aW9uOiAndG9wLXJpZ2h0JyxcbiAgICAgIHRpdGxlOiAnJyxcbiAgICAgIGNvbnRlbnQ6ICcnLFxuICAgICAgc2xvdDogbnVsbCxcbiAgICAgIGJhY2tncm91bmQ6ICcjZmZmJyxcbiAgICAgIGNsb3NlQ29sb3I6ICcjOTA5Mzk5J1xuICAgIH1cbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGhhbmRsZUJ0bigpIHtcbiAgICAgIHRoaXMuc2hvdyA9IGZhbHNlXG4gICAgICBpZiAodHlwZW9mIHRoaXMub25DbG9zZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLm9uQ2xvc2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGNvbXB1dGVkOiB7XG4gICAgdmVydGljYWxQcm9wZXJ0eSgpIHtcbiAgICAgIHJldHVybiAvXnRvcC0vLnRlc3QodGhpcy5wb3NpdGlvbikgPyAndG9wJyA6ICdib3R0b20nO1xuICAgIH0sXG5cbiAgICBwb3NpdGlvblN0eWxlKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgW3RoaXMudmVydGljYWxQcm9wZXJ0eV06IGAkeyB0aGlzLnZlcnRpY2FsT2Zmc2V0IH1weGAsXG4gICAgICB9O1xuICAgIH0sXG4gICAgZ2V0Vm5vZGUoKSB7XG4gICAgICBpZiAoaXNWTm9kZSh0aGlzLnNsb3QpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNsb3RcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1BsZWFzZSBjaGVjayB5b3VyIFZub2RlIHdyaXRpbmcnKVxuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gIH0sXG4gIHJlbmRlcihoKSB7XG4gICByZXR1cm4gaCgndHJhbnNpdGlvbicse1xuICAgICAgYXR0cnM6IHtcbiAgICAgICAgbmFtZTogJ3N3LW5vdGlmaWNhdGlvbi1mYWRlJ1xuICAgICAgfVxuICAgIH0sIFt0aGlzLnNob3cgPyBoKCdkaXYnLCB7XG4gICAgICAgICAgICBjbGFzczogJ3N3LW5vdGlmaWNhdGlvbicsXG4gICAgICAgICAgICBzdHlsZTogT2JqZWN0LmFzc2lnbih0aGlzLnBvc2l0aW9uU3R5bGUsIHsgYmFja2dyb3VuZDogdGhpcy5iYWNrZ3JvdW5kIH0pXG4gICAgICAgICAgfSwgW1xuICAgICAgICAgICAgdGhpcy5nZXRWbm9kZSA/ICcnIDogaCgnaDInLCB7XG4gICAgICAgICAgICAgIGNsYXNzOiAndGl0bGUnXG4gICAgICAgICAgICB9LCB0aGlzLnRpdGxlKSxcbiAgICAgICAgICAgIHRoaXMuZ2V0Vm5vZGUgPyB0aGlzLmdldFZub2RlIDogaCgnZGl2Jywge1xuICAgICAgICAgICAgICBjbGFzczogJ2NvbnRlbnQnXG4gICAgICAgICAgICB9LHRoaXMuY29udGVudCksXG4gICAgICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgICAgIGNsYXNzOiAnY2xvc2UnLFxuICAgICAgICAgICAgICBzdHlsZTogeyBjb2xvcjogdGhpcy5jbG9zZUNvbG9yIH0sXG4gICAgICAgICAgICB9LCBbaCgnZGl2Jywge1xuICAgICAgICAgICAgICAgICAgY2xhc3M6ICdtYXRlcmlhbC1pY29ucycsXG4gICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICBjbGljazogKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUJ0bigpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCAnY2xvc2UnKV0pXG4gICAgICAgICAgXSlcbiAgICBcbiAgICAgICAgOiB2b2lkIDBdIClcbiAgfVxufVxuXG4iLCJpbXBvcnQgVnVlIGZyb20gJ3Z1ZSc7XG5pbXBvcnQgTm90aWZpY2F0aW9uIGZyb20gJy4vbWFpbi5qcyc7XG5cbmNvbnN0IE5vdGlmaWNhdGlvbkNvbnN0cnVjdG9yID0gVnVlLmV4dGVuZChOb3RpZmljYXRpb24pXG5cbmxldCBpbnN0YW5jZTtcbmxldCBpbnN0YW5jZXMgPSBbXVxubGV0IHNlZWQgPSAxXG5jb25zdCBOb3RpZmljYXRpb25GdW4gPSBmdW5jdGlvbihvcHRpb25zKXtcbiAgaWYgKFZ1ZS5wcm90b3R5cGUuJGlzU2VydmVyKSByZXR1cm47XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBjb25zdCB1c2VyT25DbG9zZSA9IG9wdGlvbnMub25DbG9zZTtcbiAgY29uc3QgaWQgPSAnbm90aWZpY2F0aW9uXycgKyBzZWVkKys7XG4gIGNvbnN0IHBvc2l0aW9uID0gb3B0aW9ucy5wb3NpdGlvbiB8fCAndG9wLXJpZ2h0JztcbiAgb3B0aW9ucy5vbkNsb3NlID0gZnVuY3Rpb24oKSB7XG4gICAgTm90aWZpY2F0aW9uLmNsb3NlKGlkLCB1c2VyT25DbG9zZSlcbiAgfVxuICBpbnN0YW5jZSA9IG5ldyBOb3RpZmljYXRpb25Db25zdHJ1Y3Rvcih7XG4gICAgZGF0YTogb3B0aW9uc1xuICB9KVxuICBpbnN0YW5jZS5pZCA9IGlkXG4gIGluc3RhbmNlLiRtb3VudCgpO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGluc3RhbmNlLiRlbCk7XG4gIGluc3RhbmNlLnNob3cgPSB0cnVlXG4gIGxldCB2ZXJ0aWNhbE9mZnNldCA9IDBcbiAgaW5zdGFuY2VzLmZpbHRlcihpdGVtID0+IGl0ZW0ucG9zaXRpb24gPT09IHBvc2l0aW9uKS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgIHZlcnRpY2FsT2Zmc2V0ICs9IGVsZW1lbnQuJGVsLm9mZnNldEhlaWdodCArIDE2XG4gIH0pO1xuICB2ZXJ0aWNhbE9mZnNldCArPSAxNlxuICBpbnN0YW5jZS52ZXJ0aWNhbE9mZnNldCA9IHZlcnRpY2FsT2Zmc2V0XG4gIGluc3RhbmNlcy5wdXNoKGluc3RhbmNlKVxuICBjb25zb2xlLmxvZygpXG4gIHJldHVybiBpbnN0YW5jZTtcbn0gXG5Ob3RpZmljYXRpb24uY2xvc2UgPSBmdW5jdGlvbihpZCwgdXNlck9uQ2xvc2UpIHtcbiAgbGV0IGluZGV4ID0gLTFcbiAgY29uc3QgbGVuID0gaW5zdGFuY2VzLmxlbmd0aFxuICBjb25zdCBpbnN0YW5jZSA9IGluc3RhbmNlcy5maWx0ZXIoKGluc3RhbmNlLCBpKSA9PiB7XG4gICAgaWYgKGluc3RhbmNlLmlkID09PSBpZCkge1xuICAgICAgaW5kZXggPSBpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfSlbMF1cbiAgaWYgKCFpbnN0YW5jZSkgcmV0dXJuXG5cbiAgaWYgKHR5cGVvZiB1c2VyT25DbG9zZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHVzZXJPbkNsb3NlKGluc3RhbmNlKTtcbiAgfVxuICBpbnN0YW5jZXMuc3BsaWNlKGluZGV4LCAxKVxuXG4gIGlmIChsZW4gPD0gMSkgcmV0dXJuXG5cbiAgY29uc3QgcG9zaXRpb24gPSBpbnN0YW5jZS5wb3NpdGlvbjtcbiAgY29uc3QgcmVtb3ZlZEhlaWdodCA9IGluc3RhbmNlLiRlbC5vZmZzZXRIZWlnaHRcbiAgZm9yIChsZXQgaSA9IGluZGV4OyBpIDwgbGVuIC0gMTsgaSsrKXtcbiAgICBpZiAoaW5zdGFuY2VzW2ldLnBvc2l0aW9uID09PSBwb3NpdGlvbikge1xuICAgICAgaW5zdGFuY2VzW2ldLiRlbC5zdHlsZVtpbnN0YW5jZS52ZXJ0aWNhbFByb3BlcnR5XSA9IHBhcnNlSW50KGluc3RhbmNlc1tpXS4kZWwuc3R5bGVbaW5zdGFuY2UudmVydGljYWxQcm9wZXJ0eV0sIDEwKSAtIHJlbW92ZWRIZWlnaHQgLSAxNiArICdweCdcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTm90aWZpY2F0aW9uRnVuIiwiaW1wb3J0IFNsaWRlIGZyb20gJy4uLy4uL3NsaWRlJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdzd0xheW91dCcsXG4gIGNvbXBvbmVudHM6IHsgU2xpZGUgfSxcbiAgcHJvcHM6IHtcbiAgICBjb2xsYXBzZVRvcDogQm9vbGVhbixcbiAgICBjb2xsYXBzZUxlZnQ6IEJvb2xlYW4sXG4gICAgY29sbGFwc2VSaWdodDogQm9vbGVhbixcbiAgICBjb2xsYXBzZUJvdHRvbTogQm9vbGVhbixcbiAgICBmaXRUb3A6IEJvb2xlYW4sXG4gICAgZml0TGVmdDogQm9vbGVhbixcbiAgICBmaXRSaWdodDogQm9vbGVhbixcbiAgICBmaXRCb3R0b206IEJvb2xlYW4sXG4gICAgdG9wTWluOiBOdW1iZXIgfCBTdHJpbmcsXG4gICAgbGVmdE1pbjogTnVtYmVyIHwgU3RyaW5nLFxuICAgIHJpZ2h0TWluOiBOdW1iZXIgfCBTdHJpbmcsXG4gICAgYm90dG9tTWluOiBOdW1iZXIgfCBTdHJpbmcsXG4gICAgc2hhZG93OiBCb29sZWFuXG4gIH0sXG4gIGRhdGE6ICgpID0+ICh7fSksXG4gIGNvbXB1dGVkOiB7XG4gICAgdmVydGljYWxTdHJldGNoKCkge1xuICAgICAgcmV0dXJuIHRoaXMuJHNjb3BlZFNsb3RzLnRvcCAhPT0gdm9pZCAwIHx8IHRoaXMuJHNjb3BlZFNsb3RzLmJvdHRvbSAhPT0gdm9pZCAwXG4gICAgfVxuICB9LFxuICByZW5kZXIoaCkge1xuICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICBzdGF0aWNDbGFzczogJ3N3LWxheW91dCBmbGV4IG5vLXdyYXAnLFxuICAgICAgY2xhc3M6IHtcbiAgICAgICAgc2hhZG93OiB0aGlzLnNoYWRvd1xuICAgICAgfSxcbiAgICAgIHN0eWxlOiB7XG4gICAgICAgICdmbGV4LWRpcmVjdGlvbic6IHRoaXMudmVydGljYWxTdHJldGNoICYmICdjb2x1bW4nXG4gICAgICB9XG4gICAgfSwgW1xuICAgICAgdGhpcy4kc2NvcGVkU2xvdHMudG9wICE9PSB2b2lkIDAgPyBoKFNsaWRlLCB7XG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgY29sbGFwc2VkOiB0aGlzLmNvbGxhcHNlVG9wLFxuICAgICAgICAgIGZpdDogdGhpcy5maXRUb3AsXG4gICAgICAgICAgbWluOiB0aGlzLnRvcE1pblxuICAgICAgICB9LFxuICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWxheW91dF9fYXJvdW5kJyxcbiAgICAgICAgc2NvcGVkU2xvdHM6IHtcbiAgICAgICAgICBkZWZhdWx0OiB0aGlzLiRzY29wZWRTbG90cy50b3BcbiAgICAgICAgfVxuICAgICAgfSkgOiB2b2lkIDAsXG5cbiAgICAgICF0aGlzLnZlcnRpY2FsU3RyZXRjaCAmJiB0aGlzLiRzY29wZWRTbG90cy5sZWZ0ICE9PSB2b2lkIDAgPyBoKFNsaWRlLCB7XG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgY29sbGFwc2VkOiB0aGlzLmNvbGxhcHNlTGVmdCxcbiAgICAgICAgICBob3Jpem9udGFsOiB0cnVlLFxuICAgICAgICAgIGZpdDogdGhpcy5maXRMZWZ0LFxuICAgICAgICAgIG1pbjogdGhpcy5sZWZ0TWluXG4gICAgICAgIH0sXG4gICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctbGF5b3V0X19hcm91bmQnLFxuICAgICAgICBzY29wZWRTbG90czoge1xuICAgICAgICAgIGRlZmF1bHQ6IHRoaXMuJHNjb3BlZFNsb3RzLmxlZnRcbiAgICAgICAgfVxuICAgICAgfSkgOiB2b2lkIDAsXG5cbiAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgcmVmOiAnbGF5b3V0TWFpbicsXG4gICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctbGF5b3V0X19tYWluJyxcbiAgICAgIH0sIFtbdGhpcy4kc2NvcGVkU2xvdHMuZGVmYXVsdCAhPT0gdm9pZCAwXG4gICAgICAgID8gdGhpcy4kc2NvcGVkU2xvdHMuZGVmYXVsdCgpIDogdm9pZCAwXV0pLFxuXG4gICAgICAhdGhpcy52ZXJ0aWNhbFN0cmV0Y2ggJiYgdGhpcy4kc2NvcGVkU2xvdHMucmlnaHQgIT09IHZvaWQgMCA/IGgoU2xpZGUsIHtcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICBjb2xsYXBzZWQ6IHRoaXMuY29sbGFwc2VSaWdodCxcbiAgICAgICAgICBob3Jpem9udGFsOiB0cnVlLFxuICAgICAgICAgIGZpdDogdGhpcy5maXRSaWdodCxcbiAgICAgICAgICBtaW46IHRoaXMucmlnaHRNaW5cbiAgICAgICAgfSxcbiAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1sYXlvdXRfX2Fyb3VuZCcsXG4gICAgICAgIHNjb3BlZFNsb3RzOiB7XG4gICAgICAgICAgZGVmYXVsdDogdGhpcy4kc2NvcGVkU2xvdHMucmlnaHRcbiAgICAgICAgfVxuICAgICAgfSkgOiB2b2lkIDAsXG5cbiAgICAgIHRoaXMuJHNjb3BlZFNsb3RzLmJvdHRvbSAhPT0gdm9pZCAwID8gaChTbGlkZSwge1xuICAgICAgICBwcm9wczoge1xuICAgICAgICAgIGNvbGxhcHNlZDogdGhpcy5jb2xsYXBzZUJvdHRvbSxcbiAgICAgICAgICBmaXQ6IHRoaXMuZml0Qm90dG9tLFxuICAgICAgICAgIG1pbjogdGhpcy5ib3R0b21NaW5cbiAgICAgICAgfSxcbiAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1sYXlvdXRfX2Fyb3VuZCcsXG4gICAgICAgIHNjb3BlZFNsb3RzOiB7XG4gICAgICAgICAgZGVmYXVsdDogdGhpcy4kc2NvcGVkU2xvdHMuYm90dG9tXG4gICAgICAgIH1cbiAgICAgIH0pIDogdm9pZCAwXG4gICAgXSlcbiAgfVxufSIsImltcG9ydCBMYXlvdXQgZnJvbSAnLi9zcmMvbWFpbi5qcydcblxuY29uc3QgaW5zdGFsbCA9IGZ1bmN0aW9uIChWdWUpIHtcbiAgVnVlLmNvbXBvbmVudChMYXlvdXQubmFtZSwgTGF5b3V0KVxufVxuXG5MYXlvdXQuaW5zdGFsbCA9IGluc3RhbGxcblxuZXhwb3J0IGRlZmF1bHQgTGF5b3V0XG4iLCJjb25zdCBzaG93TWFzayA9IGN0eCA9PiB7XG4gIGlmICghY3R4LmRpc2FibGVkICYmICFjdHguc3RheSkge1xuICAgIGN0eC5ub2RlLmNsYXNzTGlzdC5yZW1vdmUoJ2ludmlzaWJsZScpXG4gIH1cbn1cbmNvbnN0IGhpZGVNYXNrID0gY3R4ID0+IHtcbiAgaWYgKCFjdHguZGlzYWJsZWQgJiYgIWN0eC5zdGF5KSB7XG4gICAgY3R4Lm5vZGUuY2xhc3NMaXN0LmFkZCgnaW52aXNpYmxlJylcbiAgfVxufVxuY29uc3QgZGlzYWJsZU1hc2sgPSBjdHggPT4ge1xuICBpZiAoY3R4LmRpc2FibGVkICYmICFjdHguc3RheSkge1xuICAgIGN0eC5ub2RlLmNsYXNzTGlzdC5hZGQoJ2ludmlzaWJsZScpXG4gIH1cbn1cbmNvbnN0IHN0YXlNYXNrID0gY3R4ID0+IHtcbiAgaWYgKGN0eC5zdGF5KSB7XG4gICAgY3R4Lm5vZGUuY2xhc3NMaXN0LnJlbW92ZSgnaW52aXNpYmxlJylcbiAgfSBlbHNlIHtcbiAgICBjdHgubm9kZS5jbGFzc0xpc3QuYWRkKCdpbnZpc2libGUnKVxuICB9XG59XG5jb25zdCBjb2xvck1hc2sgPSBjdHggPT4ge1xuICBjdHgubm9kZS5zdHlsZS5jb2xvciA9IGN0eC5jb2xvclxufVxuY29uc3QgZ2V0RGlzYWJsZWQgPSB2YWx1ZSA9PiB2YWx1ZSAhPT0gdm9pZCAwICYmICh2YWx1ZS5kaXNhYmxlZCA9PT0gdHJ1ZSB8fCBmYWxzZSlcbmNvbnN0IGdldFN0YXkgPSB2YWx1ZSA9PiB2YWx1ZSAhPT0gdm9pZCAwICYmICh2YWx1ZS5zdGF5ID09PSB0cnVlIHx8IGZhbHNlKVxuY29uc3QgZ2V0Q29sb3IgPSB2YWx1ZSA9PiB2YWx1ZSAhPT0gdm9pZCAwICYmIHZhbHVlLmNvbG9yIHx8IHZvaWQgMFxuY29uc3QgaW5pdE1hc2sgPSAoZWwsIGJpbmRpbmcpID0+IHtcbiAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gIGNvbnN0IGN0eCA9IHtcbiAgICBub2RlOiBub2RlLFxuICAgIGRpc2FibGVkOiBnZXREaXNhYmxlZChiaW5kaW5nLnZhbHVlKSxcbiAgICBzdGF5OiBnZXRTdGF5KGJpbmRpbmcudmFsdWUpLFxuICAgIGNvbG9yOiBnZXRDb2xvcihiaW5kaW5nLnZhbHVlKSxcbiAgICBzaG93TWFzazogKCkgPT4ge1xuICAgICAgc2hvd01hc2soY3R4KVxuICAgIH0sXG4gICAgaGlkZU1hc2s6ICgpID0+IHtcbiAgICAgIGhpZGVNYXNrKGN0eClcbiAgICB9XG4gIH1cblxuICBjdHgubm9kZS5jbGFzc0xpc3QuYWRkKCdzdy1tYXNrJylcbiAgZGlzYWJsZU1hc2soY3R4KVxuICBzdGF5TWFzayhjdHgpXG4gIGNvbG9yTWFzayhjdHgpXG4gIGhpZGVNYXNrKGN0eClcbiAgZWwubWFza0N0eCA9IGN0eFxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdtYXNrJyxcbiAgYmluZChlbCwgYmluZGluZykge1xuICAgIGluaXRNYXNrKGVsLCBiaW5kaW5nKVxuICAgIGVsLmFwcGVuZENoaWxkKGVsLm1hc2tDdHgubm9kZSlcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBlbC5tYXNrQ3R4LnNob3dNYXNrLCBmYWxzZSlcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIGVsLm1hc2tDdHguaGlkZU1hc2ssIGZhbHNlKVxuICB9LFxuICB1cGRhdGUoZWwsIGJpbmRpbmcpIHtcbiAgICBlbC5tYXNrQ3R4LmRpc2FibGVkID0gZ2V0RGlzYWJsZWQoYmluZGluZy52YWx1ZSlcbiAgICBpZiAoZ2V0RGlzYWJsZWQoYmluZGluZy5vbGRWYWx1ZSkgIT09IGVsLm1hc2tDdHguZGlzYWJsZWQpIHtcbiAgICAgIGRpc2FibGVNYXNrKGVsLm1hc2tDdHgpXG4gICAgfVxuXG4gICAgZWwubWFza0N0eC5zdGF5ID0gZ2V0U3RheShiaW5kaW5nLnZhbHVlKVxuICAgIGlmIChnZXRTdGF5KGJpbmRpbmcub2xkVmFsdWUpICE9PSBlbC5tYXNrQ3R4LnN0YXkpIHtcbiAgICAgIHN0YXlNYXNrKGVsLm1hc2tDdHgpXG4gICAgfVxuXG4gICAgZWwubWFza0N0eC5jb2xvciA9IGdldENvbG9yKGJpbmRpbmcudmFsdWUpXG4gICAgaWYgKGdldENvbG9yKGJpbmRpbmcub2xkVmFsdWUpICE9PSBlbC5tYXNrQ3R4LmNvbG9yKSB7XG4gICAgICBjb2xvck1hc2soZWwubWFza0N0eClcbiAgICB9XG4gIH0sXG4gIHVuYmluZChlbCkge1xuICAgIGlmIChlbC5tYXNrQ3R4KSB7XG4gICAgICBlbC5tYXNrQ3R4Lm5vZGUucmVtb3ZlKClcbiAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIGVsLm1hc2tDdHguc2hvd01hc2ssIGZhbHNlKVxuICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCBlbC5tYXNrQ3R4LmhpZGVNYXNrLCBmYWxzZSlcbiAgICAgIGRlbGV0ZSBlbC5tYXNrQ3R4XG4gICAgfVxuICB9XG59IiwiaW1wb3J0IE1hc2sgZnJvbSAnLi9zcmMvbWFpbi5qcydcblxuY29uc3QgaW5zdGFsbCA9IGZ1bmN0aW9uIChWdWUpIHtcbiAgVnVlLmRpcmVjdGl2ZShNYXNrLm5hbWUsIE1hc2spXG59XG5cbk1hc2suaW5zdGFsbCA9IGluc3RhbGxcblxuZXhwb3J0IGRlZmF1bHQgTWFzayIsImV4cG9ydCBmdW5jdGlvbiBwb3NpdGlvbihlKSB7XG4gIGlmIChlLnRvdWNoZXMgJiYgZS50b3VjaGVzWzBdKSB7XG4gICAgZSA9IGUudG91Y2hlc1swXVxuICB9IGVsc2UgaWYgKGUuY2hhbmdlZFRvdWNoZXMgJiYgZS5jaGFuZ2VkVG91Y2hlc1swXSkge1xuICAgIGUgPSBlLmNoYW5nZWRUb3VjaGVzWzBdXG4gIH1cblxuICByZXR1cm4ge1xuICAgIHRvcDogZS5jbGllbnRZLFxuICAgIGxlZnQ6IGUuY2xpZW50WFxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFdmVudFBhdGgoZSkge1xuICBpZiAoZS5wYXRoKSB7XG4gICAgcmV0dXJuIGUucGF0aFxuICB9XG4gIGlmIChlLmNvbXBvc2VkUGF0aCkge1xuICAgIHJldHVybiBlLmNvbXBvc2VkUGF0aCgpXG4gIH1cblxuICBjb25zdCBwYXRoID0gW11cbiAgbGV0IGVsID0gZS50YXJnZXRcblxuICB3aGlsZSAoZWwpIHtcbiAgICBwYXRoLnB1c2goZWwpXG5cbiAgICBpZiAoZWwudGFnTmFtZSA9PT0gJ0hUTUwnKSB7XG4gICAgICBwYXRoLnB1c2goZG9jdW1lbnQpXG4gICAgICBwYXRoLnB1c2god2luZG93KVxuICAgICAgcmV0dXJuIHBhdGhcbiAgICB9XG5cbiAgICBlbCA9IGVsLnBhcmVudEVsZW1lbnRcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RvcChlKSB7XG4gIGUuc3RvcFByb3BhZ2F0aW9uKClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByZXZlbnQoZSkge1xuICBlLnByZXZlbnREZWZhdWx0KClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0b3BBbmRQcmV2ZW50KGUpIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gIGUuc3RvcFByb3BhZ2F0aW9uKClcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBwb3NpdGlvbixcbiAgZ2V0RXZlbnRQYXRoLFxuICBzdG9wLFxuICBwcmV2ZW50LFxuICBzdG9wQW5kUHJldmVudFxufSIsImltcG9ydCB7IGNzcyB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2RvbS5qcydcbmltcG9ydCB7IHBvc2l0aW9uIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvZXZlbnQuanMnXG5cbmZ1bmN0aW9uIHNob3dSaXBwbGUoZXZ0LCBlbCwgY3R4LCBmb3JjZUNlbnRlcikge1xuICBpZiAoY3R4Lm1vZGlmaWVycy5zdG9wID09PSB0cnVlKSB7XG4gICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpXG4gIH1cblxuICBsZXQgeyBjZW50ZXIsIGNvbG9yIH0gPSBjdHgubW9kaWZpZXJzXG5cbiAgY2VudGVyID0gY2VudGVyID09PSB0cnVlIHx8IGZvcmNlQ2VudGVyID09PSB0cnVlXG5cbiAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICBjb25zdCBpbm5lck5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgY29uc3QgcG9zID0gcG9zaXRpb24oZXZ0KVxuICBjb25zdCB7IGxlZnQsIHRvcCwgd2lkdGgsIGhlaWdodCB9ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgY29uc3QgZGlhbWV0ZXIgPSBNYXRoLnNxcnQod2lkdGggKiB3aWR0aCArIGhlaWdodCAqIGhlaWdodClcbiAgY29uc3QgcmFkaXVzID0gZGlhbWV0ZXIgLyAyXG4gIGNvbnN0IGNlbnRlclggPSBgJHsod2lkdGggLSBkaWFtZXRlcikgLyAyfXB4YFxuICBjb25zdCB4ID0gY2VudGVyID8gY2VudGVyWCA6IGAke3Bvcy5sZWZ0IC0gbGVmdCAtIHJhZGl1c31weGBcbiAgY29uc3QgY2VudGVyWSA9IGAkeyhoZWlnaHQgLSBkaWFtZXRlcikgLyAyfXB4YFxuICBjb25zdCB5ID0gY2VudGVyID8gY2VudGVyWSA6IGAke3Bvcy50b3AgLSB0b3AgLSByYWRpdXN9cHhgXG4gIGxldCB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGlubmVyTm9kZS5jbGFzc0xpc3QuYWRkKCdzdy1yaXBwbGVfX2lubmVyLS1lbnRlcicpXG4gICAgaW5uZXJOb2RlLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUzZCgke2NlbnRlclh9LCAke2NlbnRlcll9LCAwKSBzY2FsZTNkKDEsIDEsIDEpYFxuICAgIGlubmVyTm9kZS5zdHlsZS5vcGFjaXR5ID0gMC4yXG5cbiAgICB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaW5uZXJOb2RlLmNsYXNzTGlzdC5yZW1vdmUoJ3N3LXJpcHBsZV9faW5uZXItLWVudGVyJylcbiAgICAgIGlubmVyTm9kZS5jbGFzc0xpc3QuYWRkKCdzdy1yaXBwbGVfX2lubmVyLS1sZWF2ZScpXG4gICAgICBpbm5lck5vZGUuc3R5bGUub3BhY2l0eSA9IDBcblxuICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgbm9kZSAmJiBub2RlLnJlbW92ZSgpXG4gICAgICAgIGN0eC5hYm9ydCA9IHZvaWQgMFxuICAgICAgfSwgMjc1KVxuICAgIH0sIDI1MClcbiAgfSwgNTApXG5cbiAgaW5uZXJOb2RlLmNsYXNzTmFtZSA9ICdzdy1yaXBwbGVfX2lubmVyJ1xuICBjc3MoaW5uZXJOb2RlLCB7XG4gICAgaGVpZ2h0OiBgJHtkaWFtZXRlcn1weGAsXG4gICAgd2lkdGg6IGAke2RpYW1ldGVyfXB4YCxcbiAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGUzZCgke3h9LCAke3l9LCAwKSBzY2FsZTNkKDAuMiwgMC4yLCAxKWAsXG4gICAgb3BhY2l0eTogMFxuICB9KVxuICBpZiAoY29sb3IpIHsgY3NzKG5vZGUsIHsgY29sb3I6IGNvbG9yIH0pIH1cbiAgbm9kZS5jbGFzc05hbWUgPSBgc3ctcmlwcGxlYFxuICBub2RlLmFwcGVuZENoaWxkKGlubmVyTm9kZSlcbiAgZWwuYXBwZW5kQ2hpbGQobm9kZSlcblxuICBjdHguYWJvcnQgPSAoKSA9PiB7XG4gICAgbm9kZSAmJiBub2RlLnJlbW92ZSgpXG4gICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICB9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUN0eChjdHgsIHsgdmFsdWUsIG1vZGlmaWVycywgYXJnIH0pIHtcbiAgY3R4LmRpc2FibGVkID0gdmFsdWUgJiYgdmFsdWUuZGlzYWJsZWQgfHwgZmFsc2VcblxuICBpZiAoIWN0eC5kaXNhYmxlZCkge1xuICAgIGN0eC5tb2RpZmllcnMgPSBPYmplY3QodmFsdWUpID09PSB2YWx1ZVxuICAgICAgPyB7XG4gICAgICAgIHN0b3A6IHZhbHVlLnN0b3AgPT09IHRydWUgfHwgbW9kaWZpZXJzLnN0b3AgPT09IHRydWUsXG4gICAgICAgIGNlbnRlcjogdmFsdWUuY2VudGVyID09PSB0cnVlIHx8IG1vZGlmaWVycy5jZW50ZXIgPT09IHRydWUsXG4gICAgICAgIGNvbG9yOiB2YWx1ZS5jb2xvciB8fCBhcmdcbiAgICAgIH1cbiAgICAgIDoge1xuICAgICAgICBzdG9wOiBtb2RpZmllcnMuc3RvcCxcbiAgICAgICAgY2VudGVyOiBtb2RpZmllcnMuY2VudGVyLFxuICAgICAgICBjb2xvcjogYXJnXG4gICAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAncmlwcGxlJyxcbiAgaW5zZXJ0ZWQoZWwsIGJpbmRpbmcpIHtcbiAgICBjb25zdCBjdHggPSB7XG4gICAgICBtb2RpZmllcnM6IHt9LFxuICAgICAgY2xpY2soZXZ0KSB7XG4gICAgICAgIGlmICghY3R4LmRpc2FibGVkKSB7XG4gICAgICAgICAgc2hvd1JpcHBsZShldnQsIGVsLCBjdHgpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBrZXl1cChldnQpIHtcbiAgICAgICAgaWYgKCFjdHguZGlzYWJsZWQgJiYgZXZ0LmtleUNvZGUgPT09IDEzKSB7XG4gICAgICAgICAgc2hvd1JpcHBsZShldnQsIGVsLCBjdHgsIHRydWUpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVDdHgoY3R4LCBiaW5kaW5nKVxuICAgIGlmIChlbC5yaXBwbGVDdHgpIHtcbiAgICAgIGVsLnJpcHBsZUN0eE9sZCA9IGVsLnJpcHBsZUN0eFxuICAgIH1cbiAgICBlbC5yaXBwbGVDdHggPSBjdHhcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGN0eC5jbGljaywgZmFsc2UpXG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBjdHgua2V5dXAsIGZhbHNlKVxuICB9LFxuICB1cGRhdGUoZWwsIGJpbmRpbmcpIHtcbiAgICBlbC5yaXBwbGVDdHggIT09IHZvaWQgMCAmJiB1cGRhdGVDdHgoZWwucmlwcGxlQ3R4LCBiaW5kaW5nKVxuICB9LFxuICB1bmJpbmQoZWwpIHtcbiAgICBjb25zdCBjdHggPSBlbC5yaXBwbGVDdHhPbGQgfHwgZWwucmlwcGxlQ3R4XG5cbiAgICBpZiAoY3R4ICE9PSB2b2lkIDApIHtcbiAgICAgIGN0eC5hYm9ydCAhPT0gdm9pZCAwICYmIGN0eC5hYm9ydCgpXG4gICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGN0eC5jbGljaywgZmFsc2UpXG4gICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXl1cCcsIGN0eC5rZXl1cCwgZmFsc2UpXG4gICAgICBkZWxldGUgZWxbZWwucmlwcGxlQ3R4T2xkID8gJ3JpcHBsZUN0eE9sZCcgOiAncmlwcGxlQ3R4J11cbiAgICB9XG4gIH1cbn0iLCJpbXBvcnQgUmlwcGxlIGZyb20gJy4vc3JjL21haW4uanMnXG5cbmNvbnN0IGluc3RhbGwgPSBmdW5jdGlvbiAoVnVlKSB7XG4gIFZ1ZS5kaXJlY3RpdmUoUmlwcGxlLm5hbWUsIFJpcHBsZSlcbn1cblxuUmlwcGxlLmluc3RhbGwgPSBpbnN0YWxsXG5cbmV4cG9ydCBkZWZhdWx0IFJpcHBsZSIsImltcG9ydCAnLi9jc3MvaW5kZXguc3R5bCdcblxuaW1wb3J0IEljb24gZnJvbSAnLi9jb21wb25lbnRzL2ljb24vaW5kZXguanMnXG5pbXBvcnQgSXRlbSBmcm9tICcuL2NvbXBvbmVudHMvaXRlbS9pbmRleC5qcydcbmltcG9ydCBGaWVsZCBmcm9tICcuL2NvbXBvbmVudHMvZmllbGQvaW5kZXguanMnXG5pbXBvcnQgSW5wdXQgZnJvbSAnLi9jb21wb25lbnRzL2lucHV0L2luZGV4LmpzJ1xuaW1wb3J0IFNlbGVjdCBmcm9tICcuL2NvbXBvbmVudHMvc2VsZWN0L2luZGV4LmpzJ1xuaW1wb3J0IFNjcm9sbEFyZWEgZnJvbSAnLi9jb21wb25lbnRzL3Njcm9sbEFyZWEvaW5kZXguanMnXG5pbXBvcnQgTW9kYWwgZnJvbSAnLi9jb21wb25lbnRzL21vZGFsL2luZGV4LmpzJ1xuaW1wb3J0IFBvcG92ZXIgZnJvbSAnLi9jb21wb25lbnRzL3BvcG92ZXIvaW5kZXguanMnXG5pbXBvcnQgQnV0dG9uIGZyb20gJy4vY29tcG9uZW50cy9idXR0b24vaW5kZXguanMnXG5pbXBvcnQgQ2hlY2tib3ggZnJvbSAnLi9jb21wb25lbnRzL2NoZWNrYm94L2luZGV4LmpzJ1xuaW1wb3J0IENoZWNrYm94R3JvdXAgZnJvbSAnLi9jb21wb25lbnRzL2NoZWNrYm94R3JvdXAvaW5kZXguanMnXG5pbXBvcnQgUmFkaW8gZnJvbSAnLi9jb21wb25lbnRzL3JhZGlvL2luZGV4LmpzJ1xuaW1wb3J0IFJhZGlvR3JvdXAgZnJvbSAnLi9jb21wb25lbnRzL3JhZGlvR3JvdXAvaW5kZXguanMnXG5pbXBvcnQgUGFnaW5hdGlvbiBmcm9tICcuL2NvbXBvbmVudHMvcGFnaW5hdGlvbi9pbmRleC5qcydcbmltcG9ydCBCYXNpY0l0ZW0gZnJvbSAnLi9jb21wb25lbnRzL2Jhc2ljSXRlbS9pbmRleC5qcydcbmltcG9ydCBOb3RpZmljYXRpb24gZnJvbSAnLi9jb21wb25lbnRzL25vdGlmaWNhdGlvbi9pbmRleC5qcydcbmltcG9ydCBMYXlvdXQgZnJvbSAnLi9jb21wb25lbnRzL2xheW91dC9pbmRleC5qcydcbmltcG9ydCBTbGlkZSBmcm9tICcuL2NvbXBvbmVudHMvc2xpZGUvaW5kZXguanMnXG5pbXBvcnQgTWFzayBmcm9tICcuL2RpcmVjdGl2ZXMvbWFzay9pbmRleC5qcydcbmltcG9ydCBSaXBwbGUgZnJvbSAnLi9kaXJlY3RpdmVzL3JpcHBsZS9pbmRleC5qcydcblxuY29uc3QgY29tcG9uZW50cyA9IFtcbiAgSWNvbixcbiAgSXRlbSxcbiAgRmllbGQsXG4gIElucHV0LFxuICBTZWxlY3QsXG4gIFNjcm9sbEFyZWEsXG4gIE1vZGFsLFxuICBQb3BvdmVyLFxuICBCdXR0b24sXG4gIFBhZ2luYXRpb24sXG4gIENoZWNrYm94LFxuICBDaGVja2JveEdyb3VwLFxuICBSYWRpbyxcbiAgUmFkaW9Hcm91cCxcbiAgQmFzaWNJdGVtLFxuICBMYXlvdXQsXG4gIFNsaWRlXG5dXG5cbmNvbnN0IGRpcmVjdGl2ZXMgPSBbXG4gIFJpcHBsZSxcbiAgTWFza1xuXVxuXG5jb25zdCBpbnN0YWxsID0gZnVuY3Rpb24gKFZ1ZSkge1xuICBjb21wb25lbnRzLmZvckVhY2goY29tcG9uZW50ID0+IHtcbiAgICBWdWUuY29tcG9uZW50KGNvbXBvbmVudC5uYW1lLCBjb21wb25lbnQpXG4gIH0pXG4gIGRpcmVjdGl2ZXMuZm9yRWFjaChkaXJlY3RpdmUgPT4ge1xuICAgIFZ1ZS5kaXJlY3RpdmUoZGlyZWN0aXZlLm5hbWUsIGRpcmVjdGl2ZSlcbiAgfSlcbiAgVnVlLnByb3RvdHlwZS4kbm90aWZ5ID0gTm90aWZpY2F0aW9uXG59XG5cbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuVnVlKSB7XG4gIGluc3RhbGwod2luZG93LlZ1ZSlcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBpbnN0YWxsLFxuICBJY29uLFxuICBJdGVtLFxuICBGaWVsZCxcbiAgSW5wdXQsXG4gIFNlbGVjdCxcbiAgU2Nyb2xsQXJlYSxcbiAgUG9wb3ZlcixcbiAgTW9kYWwsXG4gIEJ1dHRvbixcbiAgUGFnaW5hdGlvbixcbiAgQ2hlY2tib3gsXG4gIENoZWNrYm94R3JvdXAsXG4gIFJhZGlvLFxuICBSYWRpb0dyb3VwLFxuICBCYXNpY0l0ZW0sXG4gIE5vdGlmaWNhdGlvbixcbiAgTGF5b3V0LFxuICBTbGlkZSxcbiAgUmlwcGxlLFxuICBNYXNrXG59XG4iXSwibmFtZXMiOlsibmFtZSIsInByb3BzIiwiU3RyaW5nIiwiY29sb3IiLCJwcmltYXJ5IiwiQm9vbGVhbiIsIm5lZ2F0aXZlIiwicG9zaXRpdmUiLCJ3YXJuaW5nIiwiZ3JleSIsImxpZ2h0R3JleSIsInNpemUiLCJjb21wdXRlZCIsImNsYXNzZXMiLCJjbHMiLCJpY29uIiwiY29udGVudCIsInN0eWxlIiwiZm9udFNpemUiLCJyZW5kZXIiLCJoIiwic3RhdGljQ2xhc3MiLCJjbGFzcyIsImF0dHJzIiwib24iLCIkbGlzdGVuZXJzIiwiaW5zdGFsbCIsIlZ1ZSIsImNvbXBvbmVudCIsIkljb24iLCJ3cmFwIiwiaGlkZUJlZm9yZSIsImhpZGVEZWZhdWx0IiwiaGlkZUFmdGVyIiwidG8iLCJPYmplY3QiLCJjZW50ZXIiLCJlbmQiLCJkaXNhYmxlZCIsImFjdGl2ZSIsIm1hc2siLCJyaXBwbGUiLCJkYXRhIiwiZGlzYWJsZSIsImNsaWNrIiwiJGVtaXQiLCJkaXJlY3RpdmVzIiwidmFsdWUiLCJzdGF5IiwiY29uY2F0IiwiJHNjb3BlZFNsb3RzIiwiYmVmb3JlIiwiaGlkZSIsImRlZmF1bHQiLCJhZnRlciIsIkl0ZW0iLCJlcnJvck1lc3NhZ2UiLCJydWxlcyIsIkFycmF5IiwiaXNEaXJ0eSIsImlubmVyRXJyb3IiLCJpbm5lckVycm9yTWVzc2FnZSIsIndhdGNoIiwiZm9yY2VDaGVjayIsInYiLCJ2YWxpZGF0ZSIsInZhbGlkYXRlVmFsdWUiLCJoYXNFcnJvciIsImNvbXB1dGVkRXJyb3JNZXNzYWdlIiwibW91bnRlZCIsIiRvbiIsInRyaWdnZXJWYWxpZGF0aW9uIiwiYmVmb3JlRGVzdHJveSIsIiRvZmYiLCJtZXRob2RzIiwicmVzZXRWYWxpZGF0aW9uIiwidmFsIiwibGVuZ3RoIiwidXBkYXRlIiwiZXJyIiwibXNnIiwibSIsInNvbWUiLCJydWxlIiwicmVzIiwiZm9yY2UiLCJhZHZhbmNlZEJsdXIiLCJlIiwiZXhjbHVkZWQiLCJnZXRSZWZzIiwicmVmTmFtZXMiLCJnZXREb21zIiwiZWxzIiwiaXNBcnJheSIsInJlZHVjZSIsImFjY3VtdWxhdG9yIiwiZWwiLCJwdXNoIiwiJGVsIiwicmVmIiwiJHJlZnMiLCJleGNsdWRlZEJsdXJSZWZzIiwicmVmcyIsImNvbnRhaW5zIiwidGFyZ2V0IiwiZm9jdXNlZCIsImZvY3VzZWRCZWZvcmUiLCJibHVyVHlwZSIsImJsdXJSZWZzIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIm1peGlucyIsIlZhbGlkYXRlTWl4aW4iLCJBZHZhbmNlZEJsdXJNaXhpbiIsImNvbXBvbmVudHMiLCJyZXF1aXJlZCIsInVuZGVybGluZWQiLCJib3JkZXJlZCIsImZpbGxlZCIsIm1pbmkiLCJsYWJlbCIsInNwYWNlQXJvdW5kIiwidHlwZSIsImZvY3VzIiwiYmx1ciIsInVuZGVybGluZSIsImJvcmRlciIsImZpbGwiLCJlcnJvciIsImlubmVyUG9pbnRlciIsInNjb3BlZFNsb3RzIiwiZ2V0SW5uZXIiLCJnZXRBZnRlciIsIkZpZWxkIiwicGxhY2Vob2xkZXIiLCJhdXRvY29tcGxldGUiLCJpbnB1dCIsImRvbVByb3BzIiwiSW5wdXQiLCJ4IiwieSIsIndpZHRoIiwiaGVpZ2h0Iiwic3RyZXRjaCIsIlNjcm9sbEFyZWEiLCJpc0RlZXBFcXVhbCIsImEiLCJiIiwiRGF0ZSIsImdldFRpbWUiLCJrZXlzIiwiZXZlcnkiLCJwcm9wIiwiaXNTdHJpbmdDb250YWluIiwicyIsInJhbmRvbSIsImlubmVyUyIsImlubmVyViIsInJlcGxhY2UiLCJzcGxpdCIsInN1bSIsImZvckVhY2giLCJpbmNsdWRlcyIsImlzT2JqZWN0IiwiU2NvcmxsQXJlYSIsIm11bHRpcGxlIiwib3B0aW9ucyIsImZpbHRlciIsIm9wdGlvbnNIZWlnaHQiLCJzZWxlY3RlZFN0eWxlIiwiZmlsdGVyVmFsdWUiLCJpbm5lclZhbHVlIiwiZ2V0IiwiZ2V0RXhhY3RWYWx1ZXMiLCJzZXQiLCJpbm5lck9wdGlvbnMiLCJjIiwiZ2V0TmFtZSIsIiRuZXh0VGljayIsImNsZWFyRmlsdGVyIiwidHJpZ2dlckJsdXIiLCJnZXRPcHRpb25zIiwibWFwIiwib3B0aW9uIiwic2VsZWN0ZWQiLCJjaGVja1NlbGVjdGVkIiwibmF0aXZlT24iLCJmb3JtYXRWYWx1ZSIsImdldFNlbGVjdGVkIiwiZ2V0RXhhY3RPcHRpb25zIiwicmVmSW5Gb3IiLCJwYWRkaW5nIiwiY3Vyc29yIiwidHJhbnNmb3JtIiwib3BlIiwiZHVwbGljYXRlZCIsImdldFZhbHVlIiwiaGFzT3duUHJvcGVydHkiLCJTZWxlY3QiLCJyb3VuZCIsInNoYWRvdyIsIkJ1dHRvbiIsInN3QnV0dG9uIiwic2hvdyIsInRpdGxlIiwiekluZGV4Iiwib3BhY2l0eSIsImhhbmRsZUNhbmNlbCIsImhhbmRsZUNvbmZpcm0iLCJzaG93TW9kYWwiLCJoaWRlTW9kYWwiLCJldmVudCIsInN0b3BQcm9wYWdhdGlvbiIsImhlYWRlciIsImZvb3RlciIsIk1vZGFsIiwiaXNTZXJ2ZXIiLCJwcm90b3R5cGUiLCIkaXNTZXJ2ZXIiLCJjc3MiLCJlbGVtZW50IiwiaGFuZGxlciIsImF0dGFjaEV2ZW50Iiwib2ZmIiwiZGV0YWNoRXZlbnQiLCJwb3BvdmVyU3R5bGUiLCJhcnJvd1N0eWxlIiwicmVmZXJlbmNlRWxtIiwibW9kZWwiLCJwbGFjZW1lbnQiLCJ0cmlnZ2VyIiwidmFsaWRhdG9yIiwiaW5kZXhPZiIsInNob3dWYWx1ZSIsInNob3dTdHlsZSIsImdldFN0eWxlIiwicG9wb3ZlckVsbSIsInRvcCIsIm9mZnNldEhlaWdodCIsImxlZnQiLCJvZmZzZXRXaWR0aCIsInJpZ2h0IiwiaGFuZGxlQ2xpY2siLCJoYW5kbGVNb3VzZUVudGVyIiwiaGFuZGxlTW91c2VMZWF2ZSIsImRvU2hvdyIsImRvQ2xvc2UiLCJoYW5kbGVNYW51YWwiLCJwb3BvdmVyIiwicmVmZXJlbmNlIiwiZWxtIiwicXVlcnlTZWxlY3RvciIsImRlc3Ryb3llZCIsImFzc2lnbiIsIlBvcG92ZXIiLCJsZWZ0TGFiZWwiLCJjb2xvckxhYmVsIiwia2VlcENvbG9yIiwicGFyZW50IiwicGFyZW50RGlzYWJsZWQiLCJjaGVja2VkIiwiYm9vbGVhbk1vZGUiLCJnZXRDaGVja2VkIiwic2VsZiIsImNvbG9yQ2hlY2tib3giLCJnZXRMYWJlbCIsIkNoZWNrYm94Iiwic2h1dHRsZSIsIl90aGlzIiwiJGNoaWxkcmVuIiwiY2hpbGQiLCJzaHV0dGxlUmVmIiwiU2h1dHRsZU1peGluIiwiQ2hlY2tib3hHcm91cCIsImNvbG9yUmFkaW8iLCJSYWRpbyIsIlJhZGlvR3JvdXAiLCJtYWtlUmVzdWx0IiwidG90YWwiLCJjdXIiLCJhcm91bmQiLCJyZXN1bHQiLCJiYXNlQ291bnQiLCJzdXJwbHVzIiwic3RhcnRQb3NpdGlvbiIsImVuZFBvc2l0aW9uIiwiZnJvbSIsImkiLCJQYWdpbmF0aW9uIiwib2JzZXJ2ZXIiLCJtZWFzdXJlZFdpZHRoIiwiaG9yaXpvbnRhbCIsIm1lYXN1cmVUYXJnZXQiLCJtaW5TaXplIiwibWluIiwiaW5pdFN0eWxlIiwiaW5uZXJDb2xsYXBzZWQiLCJzbGlkZSIsInNldFN0eWxlIiwicGFzc2l2ZSIsInNsaWRlVGFyZ2V0Iiwib2JzZXJ2ZSIsInNldFRpbWVvdXQiLCJjbGVhclVwcGVyU3R5bGUiLCJ1cHBlciIsInVwcGVyU2xpZGVUYXJnZXQiLCIkcGFyZW50IiwiJHdhdGNoIiwiTXV0YXRpb25PYnNlcnZlciIsImF0dHJpYnV0ZXMiLCJhdHRyaWJ1dGVGaWx0ZXIiLCJjaGlsZExpc3QiLCJzdWJ0cmVlIiwiY2hhcmFjdGVyRGF0YSIsImRpc2Nvbm5lY3QiLCJTbGlkZU9ic2VydmVyIiwiY29sbGFwc2VkIiwiZml0IiwiTnVtYmVyIiwiaW1tZWRpYXRlIiwiU2xpZGUiLCJzdWJDb250ZW50IiwiaW5kZW50TGV2ZWwiLCJzdWIiLCJjYWxsYmFjayIsIkZ1bmN0aW9uIiwic3ViRmlsdGVyIiwiY29sbGFwc2VkQmVmb3JlIiwibW91c2VvdmVyIiwiZXZlbnRPcmlnaW4iLCJldmVudEh1YiIsImhhc0JlZm9yZSIsImhhc0NvbnRlbnQiLCJoYXNTdWIiLCJoYXNBY3Rpb24iLCJpbm5lckNlbnRlciIsInJvb3RQYXJhbXMiLCJpbm5lckVuZCIsImlubmVyRmlsbGVkIiwiaW5uZXJTcGxpdCIsImlubmVyTWluaSIsImlubmVyU2hhZG93IiwiaW5uZXJNYXNrIiwiaW5uZXJSaXBwbGUiLCJpbm5lckluZGVudExldmVsIiwiaW5uZXJDYWxsYmFjayIsImlubmVyU3ViRmlsdGVyIiwicm9vdCIsImlubmVyRXZlbnRIdWIiLCJtaW5IZWlnaHQiLCJpbmplY3QiLCJwcm92aWRlIiwic3ViRmlsdGVyQ2hhbmdlIiwicmVzdG9yZSIsInJlbWVtYmVyIiwiaXNTdWJDb250YWluIiwiY29udGFpbiIsImluaXRFdmVudEh1YiIsImVtaXRBY3RpdmUiLCJjcmVhdGVkIiwib3YiLCJtdXRhdGUiLCJleHBhbmQiLCJtb3VzZW91dCIsIiRmb3JjZVVwZGF0ZSIsInVuc2hpZnQiLCJCYXNpY0l0ZW0iLCJoYXNPd24iLCJvYmoiLCJrZXkiLCJjYWxsIiwiaXNWTm9kZSIsIm5vZGUiLCJ2ZXJ0aWNhbE9mZnNldCIsIm9uQ2xvc2UiLCJwb3NpdGlvbiIsInNsb3QiLCJiYWNrZ3JvdW5kIiwiY2xvc2VDb2xvciIsImhhbmRsZUJ0biIsInZlcnRpY2FsUHJvcGVydHkiLCJ0ZXN0IiwicG9zaXRpb25TdHlsZSIsImdldFZub2RlIiwiY29uc29sZSIsIk5vdGlmaWNhdGlvbkNvbnN0cnVjdG9yIiwiZXh0ZW5kIiwiTm90aWZpY2F0aW9uIiwiaW5zdGFuY2UiLCJpbnN0YW5jZXMiLCJzZWVkIiwiTm90aWZpY2F0aW9uRnVuIiwidXNlck9uQ2xvc2UiLCJpZCIsImNsb3NlIiwiJG1vdW50IiwiYm9keSIsImFwcGVuZENoaWxkIiwiaXRlbSIsImxvZyIsImluZGV4IiwibGVuIiwic3BsaWNlIiwicmVtb3ZlZEhlaWdodCIsInBhcnNlSW50IiwiY29sbGFwc2VUb3AiLCJjb2xsYXBzZUxlZnQiLCJjb2xsYXBzZVJpZ2h0IiwiY29sbGFwc2VCb3R0b20iLCJmaXRUb3AiLCJmaXRMZWZ0IiwiZml0UmlnaHQiLCJmaXRCb3R0b20iLCJ0b3BNaW4iLCJsZWZ0TWluIiwicmlnaHRNaW4iLCJib3R0b21NaW4iLCJ2ZXJ0aWNhbFN0cmV0Y2giLCJib3R0b20iLCJMYXlvdXQiLCJzaG93TWFzayIsImN0eCIsImNsYXNzTGlzdCIsInJlbW92ZSIsImhpZGVNYXNrIiwiYWRkIiwiZGlzYWJsZU1hc2siLCJzdGF5TWFzayIsImNvbG9yTWFzayIsImdldERpc2FibGVkIiwiZ2V0U3RheSIsImdldENvbG9yIiwiaW5pdE1hc2siLCJiaW5kaW5nIiwiY3JlYXRlRWxlbWVudCIsIm1hc2tDdHgiLCJiaW5kIiwib2xkVmFsdWUiLCJ1bmJpbmQiLCJkaXJlY3RpdmUiLCJNYXNrIiwidG91Y2hlcyIsImNoYW5nZWRUb3VjaGVzIiwiY2xpZW50WSIsImNsaWVudFgiLCJzaG93UmlwcGxlIiwiZXZ0IiwiZm9yY2VDZW50ZXIiLCJtb2RpZmllcnMiLCJzdG9wIiwiaW5uZXJOb2RlIiwicG9zIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiZGlhbWV0ZXIiLCJNYXRoIiwic3FydCIsInJhZGl1cyIsImNlbnRlclgiLCJjZW50ZXJZIiwidGltZXIiLCJhYm9ydCIsImNsYXNzTmFtZSIsImNsZWFyVGltZW91dCIsInVwZGF0ZUN0eCIsImFyZyIsImluc2VydGVkIiwia2V5dXAiLCJrZXlDb2RlIiwicmlwcGxlQ3R4IiwicmlwcGxlQ3R4T2xkIiwiUmlwcGxlIiwiJG5vdGlmeSIsIndpbmRvdyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLFdBQWU7RUFDYkEsSUFBSSxFQUFFLFFBRE87RUFFYkMsS0FBSyxFQUFFO0lBQ0xELElBQUksRUFBRUUsTUFERDtJQUVMQyxLQUFLLEVBQUVELE1BRkY7SUFHTEUsT0FBTyxFQUFFQyxPQUhKO0lBSUxDLFFBQVEsRUFBRUQsT0FKTDtJQUtMRSxRQUFRLEVBQUVGLE9BTEw7SUFNTEcsT0FBTyxFQUFFSCxPQU5KO0lBT0xJLElBQUksRUFBRUosT0FQRDtJQVFMSyxTQUFTLEVBQUVMLE9BUk47SUFTTE0sSUFBSSxFQUFFVDtHQVhLO0VBYWJVLFFBQVEsRUFBRTtJQUNSQyxPQURRLHFCQUNFOzs7VUFDSkMsR0FBSjtVQUNNQyxJQUFJLEdBQUcsS0FBS2YsSUFBbEI7O1VBRUksQ0FBQ2UsSUFBTCxFQUFXOztPQUFYLE1BRU87UUFDTEQsR0FBRyxHQUFHLGdCQUFOOzs7OENBR0NBLEdBREgsRUFDUyxJQURULHlCQUVFLGVBRkYsRUFFbUIsS0FBS1YsT0FGeEIseUJBR0UsZ0JBSEYsRUFHb0IsS0FBS0UsUUFIekIseUJBSUUsZ0JBSkYsRUFJb0IsS0FBS0MsUUFKekIseUJBS0UsZUFMRixFQUttQixLQUFLQyxPQUx4Qix5QkFNRSxZQU5GLEVBTWdCLEtBQUtDLElBTnJCLHlCQU9FLGtCQVBGLEVBT3NCLEtBQUtDLFNBUDNCO0tBVk07SUFvQlJNLE9BcEJRLHFCQW9CRTthQUNELEtBQUtoQixJQUFMLElBQWEsR0FBcEI7S0FyQk07SUF1QlJpQixLQXZCUSxtQkF1QkE7YUFDQztRQUNMQyxRQUFRLEVBQUUsS0FBS1AsSUFBTCxJQUFhLEtBQUssQ0FEdkI7UUFFTFIsS0FBSyxFQUFFLEtBQUtB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
