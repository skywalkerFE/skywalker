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
    to: String | Object
  },
  data: function data() {
    return {};
  },
  computed: {
    style: function style() {
      return this.to ? {
        cursor: 'pointer'
      } : void 0;
    }
  },
  render: function render(h) {
    var _this = this;

    return h('div', {
      staticClass: 'sw-item flex items-center',
      class: {
        'no-wrap': !this.wrap
      },
      style: this.style,
      on: _objectSpread({}, this.$listeners, {
        click: function click(e) {
          if (_this.to) {
            _this.$router.push(_this.to);
          }

          _this.$emit('click', e);
        }
      })
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
      staticClass: 'sw-item__inner flex items-center',
      class: {
        hide: this.hideDefault,
        'no-wrap': !this.wrap
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
    forceCheck: String | Object
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
        disable: this.disabled
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
    placeholder: String
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
    height: String
  },
  data: function data() {
    return {};
  },
  computed: {
    style: function style() {
      return {
        'overflow-x': this.x ? 'auto' : void 0,
        'overflow-y': this.y ? 'auto' : void 0,
        width: this.width || '100%',
        'max-height': this.height || '100%'
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
  var innerV = Array.isArray(v) ? v : [v];
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
        var filterArr = _this.filterValue.replace(/\s+/g, '').split('');

        if (isStringContain(_this.getName(c), filterArr)) {
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
          name: this.focused ? 'keyboard_arrow_up' : 'keyboard_arrow_down',
          size: '20px'
        },
        staticClass: 'color-grey hover-color-primary'
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
    noHover: Boolean,
    to: String | Object
  },
  data: function data() {
    return {
      mouseover: false
    };
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
      on: this.disabled ? void 0 : _objectSpread({}, this.$listeners, {
        mouseover: function mouseover(e) {
          _this.mouseover = true;

          _this.$emit('mouseover', e);
        },
        mouseout: function mouseout(e) {
          _this.mouseover = false;

          _this.$emit('mouseout', e);
        }
      })
    }, [h('sw-item', {
      staticClass: 'flex-auto',
      class: {
        'round-slot': this.$scopedSlots.round
      },
      style: {
        'z-index': 1,
        cursor: 'pointer'
      },
      props: {
        to: this.to
      },
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
    }), h('div', {
      staticClass: 'sw-mask',
      class: {
        invisible: !this.disabled && (!this.mouseover || this.noHover)
      },
      style: {
        'z-index': this.disabled ? 9 : 0,
        'background-color': this.disabled ? 'transparent' : 'currentColor'
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
      nativeOn: {
        click: function click() {
          if (_this2.disabled) {
            return;
          }

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
      nativeOn: {
        click: function click() {
          if (_this.disabled || checked) {
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
  ctx.enabled = value !== false;

  if (ctx.enabled === true) {
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
        if (ctx.enabled === true) {
          showRipple(evt, el, ctx);
        }
      },
      keyup: function keyup(evt) {
        if (ctx.enabled === true && evt.keyCode === 13) {
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

var install$e = function install(Vue) {
  Vue.directive(Ripple.name, Ripple);
};

Ripple.install = install$e;

var components = [Icon, Item, Field, Input, Select, ScrollArea, Modal$1, Popover, Button, Pagination, // Notification,
Checkbox, CheckboxGroup, Radio, RadioGroup];
var directives = [Ripple];

var install$f = function install(Vue) {
  components.forEach(function (component) {
    Vue.component(component.name, component);
  });
  directives.forEach(function (directive) {
    Vue.directive(directive.name, directive);
  });
  Vue.prototype.$notify = NotificationFun;
};

if (typeof window !== 'undefined' && window.Vue) {
  install$f(window.Vue);
}

var index = {
  install: install$f,
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
  Ripple: Ripple
};

export default index;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2t5d2Fsa2VyLmVzbS5qcyIsInNvdXJjZXMiOlsiLi4vcGFja2FnZXMvY29tcG9uZW50cy9pY29uL3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9pY29uL2luZGV4LmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9pdGVtL3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9pdGVtL2luZGV4LmpzIiwiLi4vcGFja2FnZXMvbWl4aW5zL3ZhbGlkYXRlLmpzIiwiLi4vcGFja2FnZXMvbWl4aW5zL2FkdmFuY2VkQmx1ci5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvZmllbGQvc3JjL21haW4uanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL2ZpZWxkL2luZGV4LmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9pbnB1dC9zcmMvbWFpbi5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvaW5wdXQvaW5kZXguanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3Njcm9sbEFyZWEvc3JjL21haW4uanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3Njcm9sbEFyZWEvaW5kZXguanMiLCIuLi9wYWNrYWdlcy91dGlscy9pcy5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvc2VsZWN0L3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9zZWxlY3QvaW5kZXguanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL2J1dHRvbi9zcmMvbWFpbi5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvYnV0dG9uL2luZGV4LmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9tb2RhbC9zcmMvbWFpbi5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvbW9kYWwvaW5kZXguanMiLCIuLi9wYWNrYWdlcy91dGlscy9kb20uanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3BvcG92ZXIvc3JjL21haW4uanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3BvcG92ZXIvaW5kZXguanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL2NoZWNrYm94L3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9jaGVja2JveC9pbmRleC5qcyIsIi4uL3BhY2thZ2VzL21peGlucy9zaHV0dGxlLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9jaGVja2JveEdyb3VwL3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9jaGVja2JveEdyb3VwL2luZGV4LmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9yYWRpby9zcmMvbWFpbi5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvcmFkaW8vaW5kZXguanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3JhZGlvR3JvdXAvc3JjL21haW4uanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3JhZGlvR3JvdXAvaW5kZXguanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3BhZ2luYXRpb24vc3JjL3BhZ2luYXRpb24uanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3BhZ2luYXRpb24vc3JjL21haW4udnVlIiwiLi4vbm9kZV9tb2R1bGVzL3Z1ZS1ydW50aW1lLWhlbHBlcnMvZGlzdC9ub3JtYWxpemUtY29tcG9uZW50LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Z1ZS1ydW50aW1lLWhlbHBlcnMvZGlzdC9pbmplY3Qtc3R5bGUvYnJvd3Nlci5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvcGFnaW5hdGlvbi9pbmRleC5qcyIsIi4uL3BhY2thZ2VzL3V0aWxzL3Zkb20uanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL25vdGlmaWNhdGlvbi9zcmMvbWFpbi5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvbm90aWZpY2F0aW9uL3NyYy9ub3RpZmljYXRpb24uanMiLCIuLi9wYWNrYWdlcy91dGlscy9ldmVudC5qcyIsIi4uL3BhY2thZ2VzL2RpcmVjdGl2ZXMvcmlwcGxlL3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvZGlyZWN0aXZlcy9yaXBwbGUvaW5kZXguanMiLCIuLi9wYWNrYWdlcy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdzd0ljb24nLFxuICBwcm9wczoge1xuICAgIG5hbWU6IFN0cmluZyxcbiAgICBjb2xvcjogU3RyaW5nLFxuICAgIHByaW1hcnk6IEJvb2xlYW4sXG4gICAgbmVnYXRpdmU6IEJvb2xlYW4sXG4gICAgcG9zaXRpdmU6IEJvb2xlYW4sXG4gICAgd2FybmluZzogQm9vbGVhbixcbiAgICBncmV5OiBCb29sZWFuLFxuICAgIGxpZ2h0R3JleTogQm9vbGVhbixcbiAgICBzaXplOiBTdHJpbmdcbiAgfSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBjbGFzc2VzKCkge1xuICAgICAgbGV0IGNsc1xuICAgICAgY29uc3QgaWNvbiA9IHRoaXMubmFtZVxuICBcbiAgICAgIGlmICghaWNvbikge1xuICAgICAgICByZXR1cm5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNscyA9ICdtYXRlcmlhbC1pY29ucydcbiAgICAgIH1cbiAgICAgIHJldHVybiB7XG4gICAgICAgIFtjbHNdOiB0cnVlLFxuICAgICAgICAnY29sb3ItcHJpbWFyeSc6IHRoaXMucHJpbWFyeSxcbiAgICAgICAgJ2NvbG9yLW5lZ2F0aXZlJzogdGhpcy5uZWdhdGl2ZSxcbiAgICAgICAgJ2NvbG9yLXBvc2l0aXZlJzogdGhpcy5wb3NpdGl2ZSxcbiAgICAgICAgJ2NvbG9yLXdhcm5pbmcnOiB0aGlzLndhcm5pbmcsXG4gICAgICAgICdjb2xvci1ncmV5JzogdGhpcy5ncmV5LFxuICAgICAgICAnY29sb3ItbGlnaHQtZ3JleSc6IHRoaXMubGlnaHRHcmV5LFxuICAgICAgfVxuICAgIH0sXG4gICAgY29udGVudCgpIHtcbiAgICAgIHJldHVybiB0aGlzLm5hbWUgfHwgJyAnXG4gICAgfSxcbiAgICBzdHlsZSgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGZvbnRTaXplOiB0aGlzLnNpemUgfHwgdm9pZCAwLFxuICAgICAgICBjb2xvcjogdGhpcy5jb2xvciB8fCB2b2lkIDBcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIHJlbmRlcihoKSB7XG4gICAgcmV0dXJuIGgoJ2knLCB7XG4gICAgICBzdGF0aWNDbGFzczogJ3N3LWljb24nLFxuICAgICAgY2xhc3M6IHRoaXMuY2xhc3NlcyxcbiAgICAgIHN0eWxlOiB0aGlzLnN0eWxlLFxuICAgICAgYXR0cnM6IHsgJ2FyaWEtaGlkZGVuJzogdHJ1ZSB9LFxuICAgICAgb246IHRoaXMuJGxpc3RlbmVyc1xuICAgIH0sIFtcbiAgICAgIHRoaXMuY29udGVudFxuICAgIF0pXG4gIH1cbn1cbiAgIiwiaW1wb3J0IEljb24gZnJvbSAnLi9zcmMvbWFpbi5qcydcblxuY29uc3QgaW5zdGFsbCA9IGZ1bmN0aW9uIChWdWUpIHtcbiAgVnVlLmNvbXBvbmVudChJY29uLm5hbWUsIEljb24pXG59XG5cbkljb24uaW5zdGFsbCA9IGluc3RhbGxcblxuZXhwb3J0IGRlZmF1bHQgSWNvblxuIiwiZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnc3dJdGVtJyxcbiAgcHJvcHM6IHtcbiAgICB3cmFwOiBCb29sZWFuLFxuICAgIGhpZGVCZWZvcmU6IEJvb2xlYW4sXG4gICAgaGlkZURlZmF1bHQ6IEJvb2xlYW4sXG4gICAgaGlkZUFmdGVyOiBCb29sZWFuLFxuICAgIHRvOiBTdHJpbmcgfCBPYmplY3RcbiAgfSxcbiAgZGF0YTogKCkgPT4gKHt9KSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBzdHlsZSgpIHtcbiAgICAgIHJldHVybiB0aGlzLnRvID8geyBjdXJzb3I6ICdwb2ludGVyJyB9IDogdm9pZCAwXG4gICAgfVxuICB9LFxuICByZW5kZXIoaCkge1xuICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICBzdGF0aWNDbGFzczogJ3N3LWl0ZW0gZmxleCBpdGVtcy1jZW50ZXInLFxuICAgICAgY2xhc3M6IHtcbiAgICAgICAgJ25vLXdyYXAnOiAhdGhpcy53cmFwXG4gICAgICB9LFxuICAgICAgc3R5bGU6IHRoaXMuc3R5bGUsXG4gICAgICBvbjoge1xuICAgICAgICAuLi50aGlzLiRsaXN0ZW5lcnMsXG4gICAgICAgIGNsaWNrOiBlID0+IHtcbiAgICAgICAgICBpZiAodGhpcy50bykge1xuICAgICAgICAgICAgdGhpcy4kcm91dGVyLnB1c2godGhpcy50bylcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy4kZW1pdCgnY2xpY2snLCBlKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwgW1xuICAgICAgaCgnZGl2Jywge1xuICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWl0ZW1fX2NvbnRlbnQgZmxleCBpdGVtcy1jZW50ZXInLFxuICAgICAgICBjbGFzczoge1xuICAgICAgICAgICduby13cmFwJzogIXRoaXMud3JhcFxuICAgICAgICB9XG4gICAgICB9LCBbXG5cbiAgICAgICAgdGhpcy4kc2NvcGVkU2xvdHMuYmVmb3JlICE9PSB2b2lkIDAgPyBoKCdkaXYnLCB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1pdGVtX19iZWZvcmUgZmxleCBpdGVtcy1jZW50ZXInLFxuICAgICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgICBoaWRlOiB0aGlzLmhpZGVCZWZvcmUsXG4gICAgICAgICAgICAnZmxleC1hdXRvJzogdGhpcy5oaWRlRGVmYXVsdCxcbiAgICAgICAgICAgICduby13cmFwJzogIXRoaXMud3JhcFxuICAgICAgICAgIH1cbiAgICAgICAgfSwgW3RoaXMuJHNjb3BlZFNsb3RzLmJlZm9yZSgpXSkgOiB2b2lkIDAsXG4gIFxuICAgICAgICB0aGlzLiRzY29wZWRTbG90cy5kZWZhdWx0ICE9PSB2b2lkIDAgPyBoKCdkaXYnLCB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1pdGVtX19pbm5lciBmbGV4IGl0ZW1zLWNlbnRlcicsXG4gICAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAgIGhpZGU6IHRoaXMuaGlkZURlZmF1bHQsXG4gICAgICAgICAgICAnbm8td3JhcCc6ICF0aGlzLndyYXBcbiAgICAgICAgICB9XG4gICAgICAgIH0sIFt0aGlzLiRzY29wZWRTbG90cy5kZWZhdWx0KCldKSA6IHZvaWQgMCxcbiAgXG4gICAgICAgIHRoaXMuJHNjb3BlZFNsb3RzLmFmdGVyICE9PSB2b2lkIDAgPyBoKCdkaXYnLCB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1pdGVtX19hZnRlciBmbGV4IGl0ZW1zLWNlbnRlcicsXG4gICAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAgIGhpZGU6IHRoaXMuaGlkZUFmdGVyLFxuICAgICAgICAgICAgJ25vLXdyYXAnOiAhdGhpcy53cmFwXG4gICAgICAgICAgfVxuICAgICAgICB9LCBbdGhpcy4kc2NvcGVkU2xvdHMuYWZ0ZXIoKV0pIDogdm9pZCAwXG4gICAgICBdKVxuICAgIF0pXG4gIH1cbn1cbiAgIiwiaW1wb3J0IEl0ZW0gZnJvbSAnLi9zcmMvbWFpbi5qcydcblxuY29uc3QgaW5zdGFsbCA9IGZ1bmN0aW9uIChWdWUpIHtcbiAgVnVlLmNvbXBvbmVudChJdGVtLm5hbWUsIEl0ZW0pXG59XG5cbkl0ZW0uaW5zdGFsbCA9IGluc3RhbGxcblxuZXhwb3J0IGRlZmF1bHQgSXRlbVxuIiwiXG5leHBvcnQgZGVmYXVsdCB7XG4gIHByb3BzOiB7XG4gICAgZXJyb3JNZXNzYWdlOiBTdHJpbmcsXG4gICAgcnVsZXM6IEFycmF5XG4gIH0sXG5cbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaXNEaXJ0eTogZmFsc2UsXG4gICAgICBpbm5lckVycm9yOiBmYWxzZSxcbiAgICAgIGlubmVyRXJyb3JNZXNzYWdlOiB2b2lkIDBcbiAgICB9XG4gIH0sXG5cbiAgd2F0Y2g6IHtcbiAgICBmb3JjZUNoZWNrKHYpIHtcbiAgICAgIGlmICh0aGlzLnJ1bGVzID09PSB2b2lkIDApIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICB0aGlzLmlzRGlydHkgPSB0cnVlXG4gICAgICB0aGlzLnZhbGlkYXRlKHYpXG4gICAgfSxcbiAgICB2YWx1ZSh2KSB7XG4gICAgICBpZiAodGhpcy5mb3JjZUNoZWNrICE9PSB2b2lkIDAgfHwgdGhpcy5ydWxlcyA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgdGhpcy5pc0RpcnR5ID0gdHJ1ZVxuICAgICAgdGhpcy52YWxpZGF0ZSh2KVxuICAgIH1cbiAgfSxcblxuICBjb21wdXRlZDoge1xuICAgIHZhbGlkYXRlVmFsdWUoKSB7XG4gICAgICByZXR1cm4gdGhpcy5mb3JjZUNoZWNrID09PSB2b2lkIDAgPyB0aGlzLnZhbHVlIDogdGhpcy5mb3JjZUNoZWNrXG4gICAgfSxcbiAgICBoYXNFcnJvcigpIHtcbiAgICAgIHJldHVybiB0aGlzLmlubmVyRXJyb3IgPT09IHRydWVcbiAgICB9LFxuXG4gICAgY29tcHV0ZWRFcnJvck1lc3NhZ2UoKSB7XG4gICAgICByZXR1cm4gdGhpcy5lcnJvck1lc3NhZ2UgIT09IHZvaWQgMFxuICAgICAgICA/IHRoaXMuZXJyb3JNZXNzYWdlXG4gICAgICAgIDogdGhpcy5pbm5lckVycm9yTWVzc2FnZVxuICAgIH1cbiAgfSxcblxuICBtb3VudGVkKCkge1xuICAgIHRoaXMuJG9uKGBibHVyYCwgdGhpcy50cmlnZ2VyVmFsaWRhdGlvbilcbiAgfSxcblxuICBiZWZvcmVEZXN0cm95KCkge1xuICAgIHRoaXMuJG9mZihgYmx1cmAsIHRoaXMudHJpZ2dlclZhbGlkYXRpb24pXG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIHJlc2V0VmFsaWRhdGlvbigpIHtcbiAgICAgIHRoaXMuaXNEaXJ0eSA9IGZhbHNlXG4gICAgICB0aGlzLmlubmVyRXJyb3IgPSBmYWxzZVxuICAgICAgdGhpcy5pbm5lckVycm9yTWVzc2FnZSA9IHZvaWQgMFxuICAgIH0sXG5cbiAgICB2YWxpZGF0ZSh2YWwgPSB0aGlzLnZhbGlkYXRlVmFsdWUpIHtcbiAgICAgIGlmICghdGhpcy5ydWxlcyB8fCB0aGlzLnJ1bGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgY29uc3QgdXBkYXRlID0gKGVyciwgbXNnKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmlubmVyRXJyb3IgIT09IGVycikge1xuICAgICAgICAgIHRoaXMuaW5uZXJFcnJvciA9IGVyclxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbSA9IG1zZyB8fCB2b2lkIDBcblxuICAgICAgICBpZiAodGhpcy5pbm5lckVycm9yTWVzc2FnZSAhPT0gbSkge1xuICAgICAgICAgIHRoaXMuaW5uZXJFcnJvck1lc3NhZ2UgPSBtXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVyclxuICAgICAgfVxuXG4gICAgICByZXR1cm4gIXRoaXMucnVsZXMuc29tZShydWxlID0+IHtcbiAgICAgICAgbGV0IHJlc1xuXG4gICAgICAgIGlmICh0eXBlb2YgcnVsZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHJlcyA9IHJ1bGUodmFsKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIGlmIChyZXMgPT09IGZhbHNlIHx8IHR5cGVvZiByZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgcmV0dXJuIHVwZGF0ZSh0cnVlLCByZXMpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHVwZGF0ZShmYWxzZSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuXG4gICAgdHJpZ2dlclZhbGlkYXRpb24oZm9yY2UgPSB0cnVlKSB7XG4gICAgICBpZiAoZm9yY2UgPT09IHRydWUgfHwgdGhpcy5pc0RpcnR5ID09PSBmYWxzZSkge1xuICAgICAgICB0aGlzLmlzRGlydHkgPSB0cnVlXG4gICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlKHRoaXMudmFsaWRhdGVWYWx1ZSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsIlxuZXhwb3J0IGRlZmF1bHQge1xuICBwcm9wczoge30sXG4gIGRhdGE6ICgpID0+ICh7fSksXG4gIHdhdGNoOiB7fSxcbiAgY29tcHV0ZWQ6IHt9LFxuICBtZXRob2RzOiB7XG4gICAgYWR2YW5jZWRCbHVyKGUpIHtcbiAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7IHJldHVybiB9XG4gICAgICBsZXQgZXhjbHVkZWQgPSBmYWxzZVxuICAgICAgbGV0IGdldFJlZnMgPSByZWZOYW1lcyA9PiB7XG4gICAgICAgIGxldCBnZXREb21zID0gZWxzID0+IHtcbiAgICAgICAgICBlbHMgPSBBcnJheS5pc0FycmF5KGVscykgPyBlbHMgOiBbZWxzXVxuICAgICAgICAgIHJldHVybiBlbHMucmVkdWNlKChhY2N1bXVsYXRvciwgZWwpID0+IHtcbiAgICAgICAgICAgIGFjY3VtdWxhdG9yLnB1c2goZWwgJiYgKGVsLiRlbCB8fCBlbCkpXG4gICAgICAgICAgICByZXR1cm4gYWNjdW11bGF0b3JcbiAgICAgICAgICB9LCBbXSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZWZOYW1lcy5yZWR1Y2UoKGFjY3VtdWxhdG9yLCByZWYpID0+IGFjY3VtdWxhdG9yLmNvbmNhdChnZXREb21zKHRoaXMuJHJlZnNbcmVmXSkpLCBbXSlcbiAgICAgIH1cbiAgICAgIFxuICAgICAgaWYgKHRoaXMuZXhjbHVkZWRCbHVyUmVmcykge1xuICAgICAgICBsZXQgcmVmcyA9IGdldFJlZnModGhpcy5leGNsdWRlZEJsdXJSZWZzKVxuXG4gICAgICAgIHJlZnMuc29tZShyZWYgPT4ge1xuICAgICAgICAgIGlmIChyZWYgPT09IHZvaWQgMCkgeyByZXR1cm4gZmFsc2UgfVxuICAgICAgICAgIGV4Y2x1ZGVkID0gcmVmLmNvbnRhaW5zKGUudGFyZ2V0KSB8fCBmYWxzZVxuICAgICAgICAgIHJldHVybiBleGNsdWRlZFxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgaWYgKGV4Y2x1ZGVkKSB7XG4gICAgICAgIHRoaXMuZm9jdXNlZCA9IHRydWVcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBsZXQgZm9jdXNlZEJlZm9yZSA9IHRoaXMuZm9jdXNlZFxuXG4gICAgICBpZiAodGhpcy5ibHVyVHlwZSA9PT0gJ3JldmVyc2UnICYmIGZvY3VzZWRCZWZvcmUpIHtcbiAgICAgICAgdGhpcy5mb2N1c2VkID0gIWZvY3VzZWRCZWZvcmVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCByZWZzID0gZ2V0UmVmcyh0aGlzLmJsdXJSZWZzKVxuXG4gICAgICAgIHJlZnMuc29tZShyZWYgPT4ge1xuICAgICAgICAgIGlmIChyZWYgPT09IHZvaWQgMCkgeyByZXR1cm4gZmFsc2UgfVxuICAgICAgICAgIHRoaXMuZm9jdXNlZCA9IHJlZi5jb250YWlucyhlLnRhcmdldCkgfHwgZmFsc2VcbiAgICAgICAgICByZXR1cm4gdGhpcy5mb2N1c2VkXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMuZm9jdXNlZCAmJiBmb2N1c2VkQmVmb3JlKSB7IHRoaXMuJGVtaXQoYGJsdXJgLCBlKSB9XG4gICAgfVxuICB9LFxuICBtb3VudGVkKCkge1xuICAgIGlmICh0aGlzLmJsdXJSZWZzKSB7IGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmFkdmFuY2VkQmx1ciwgZmFsc2UpIH1cbiAgfSxcbiAgYmVmb3JlRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5ibHVyUmVmcykgeyBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5hZHZhbmNlZEJsdXIsIGZhbHNlKSB9XG4gIH0sXG59XG4gICIsImltcG9ydCBWYWxpZGF0ZU1peGluIGZyb20gJy4uLy4uLy4uL21peGlucy92YWxpZGF0ZSdcbmltcG9ydCBBZHZhbmNlZEJsdXJNaXhpbiBmcm9tICcuLi8uLi8uLi9taXhpbnMvYWR2YW5jZWRCbHVyJ1xuaW1wb3J0IEl0ZW0gZnJvbSAnLi4vLi4vaXRlbSdcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnc3dGaWVsZCcsXG4gIG1peGluczogW1ZhbGlkYXRlTWl4aW4sIEFkdmFuY2VkQmx1ck1peGluXSwgLy8gaGFzRXJyb3IsY29tcHV0ZWRFcnJvck1lc3NhZ2VcbiAgY29tcG9uZW50czogeyBJdGVtIH0sXG4gIHByb3BzOiB7XG4gICAgcmVxdWlyZWQ6IEJvb2xlYW4sXG4gICAgdW5kZXJsaW5lZDogQm9vbGVhbixcbiAgICBib3JkZXJlZDogQm9vbGVhbixcbiAgICBmaWxsZWQ6IEJvb2xlYW4sXG4gICAgZGlzYWJsZWQ6IEJvb2xlYW4sXG4gICAgbWluaTogQm9vbGVhbixcbiAgICBsYWJlbDogU3RyaW5nLFxuICAgIGZvcmNlQ2hlY2s6IFN0cmluZyB8IE9iamVjdFxuICB9LFxuICBkYXRhOiAoKSA9PiAoe1xuICAgIGZvY3VzZWQ6IGZhbHNlXG4gIH0pLFxuICBjb21wdXRlZDoge1xuICAgIGJsdXJSZWZzKCkge1xuICAgICAgcmV0dXJuIFsnZmllbGRDb250ZW50J11cbiAgICB9XG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgZm9jdXNlZCgpIHtcbiAgICAgIGlmICh0aGlzLmZvY3VzZWQgJiYgdGhpcy5mb2N1cykgeyB0aGlzLmZvY3VzKCkgfVxuICAgICAgaWYgKCF0aGlzLmZvY3VzZWQgJiYgdGhpcy5ibHVyKSB7IHRoaXMuYmx1cigpIH1cbiAgICB9XG4gIH0sXG4gIHJlbmRlcihoKSB7XG4gICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiAnc3ctZmllbGQgZmxleCBuby13cmFwIGl0ZW1zLWNlbnRlcicsXG4gICAgICBjbGFzczoge1xuICAgICAgICBkaXNhYmxlOiB0aGlzLmRpc2FibGVkXG4gICAgICB9XG4gICAgfSwgW1xuICAgICAgdGhpcy5sYWJlbCAhPT0gdm9pZCAwID8gaCgnZGl2Jywge1xuICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWZpZWxkX19sYWJlbCBmbGV4IG5vLXdyYXAgaXRlbXMtY2VudGVyJ1xuICAgICAgfSwgW2goJ2RpdicsIHtcbiAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1sYWJlbCBmbGV4IG5vLXdyYXAgaXRlbXMtY2VudGVyJyxcbiAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICByZXF1aXJlZDogdGhpcy5yZXF1aXJlZFxuICAgICAgICB9XG4gICAgICB9LCB0aGlzLmxhYmVsKVxuICAgICAgXSkgOiB2b2lkIDAsXG5cbiAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgcmVmOiAnZmllbGRDb250ZW50JyxcbiAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1maWVsZF9fY29udGVudCBmbGV4IG5vLXdyYXAgaXRlbXMtY2VudGVyIHN3LWZvcm0nLFxuICAgICAgICBjbGFzczoge1xuICAgICAgICAgIHVuZGVybGluZTogdGhpcy51bmRlcmxpbmVkLFxuICAgICAgICAgIGJvcmRlcjogdGhpcy5ib3JkZXJlZCxcbiAgICAgICAgICBmaWxsOiB0aGlzLmZpbGxlZCxcbiAgICAgICAgICBmb2N1czogIXRoaXMuaGFzRXJyb3IgJiYgdGhpcy5mb2N1c2VkLFxuICAgICAgICAgIGVycm9yOiB0aGlzLmhhc0Vycm9yLFxuICAgICAgICAgICdwYWRkaW5nLW1pbic6ICF0aGlzLm1pbmksXG4gICAgICAgICAgJ2lubmVyLXBvaW50ZXInOiB0aGlzLmlubmVyUG9pbnRlclxuICAgICAgICB9XG4gICAgICB9LCBbXG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPyBoKCdkaXYnLCB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1maWVsZF9fZGlzYWJsZWQnXG4gICAgICAgIH0pIDogdm9pZCAwLFxuXG4gICAgICAgIGgoJ3N3LWl0ZW0nLCB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6ICdmbGV4LWF1dG8nLFxuICAgICAgICAgIHNjb3BlZFNsb3RzOiB7XG4gICAgICAgICAgICBiZWZvcmU6IHRoaXMuJHNjb3BlZFNsb3RzLmJlZm9yZSAhPT0gdm9pZCAwXG4gICAgICAgICAgICAgID8gKCkgPT4gW2goJ2RpdicsIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogJ2ZsZXggbm8td3JhcCBpdGVtcy1jZW50ZXIgbWFyZ2luLW1pbidcbiAgICAgICAgICAgICAgfSwgW3RoaXMuJHNjb3BlZFNsb3RzLmJlZm9yZSgpXSldIDogdm9pZCAwLFxuXG4gICAgICAgICAgICBkZWZhdWx0OiB0aGlzLiRzY29wZWRTbG90cy5kZWZhdWx0ICE9PSB2b2lkIDAgfHwgdGhpcy5nZXRJbm5lciAhPT0gdm9pZCAwXG4gICAgICAgICAgICAgID8gKCkgPT4gW3RoaXMuZ2V0SW5uZXIgIT09IHZvaWQgMCA/IHRoaXMuZ2V0SW5uZXIoaCkgOiB2b2lkIDAsIHRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQgIT09IHZvaWQgMCAmJiB0aGlzLmdldElubmVyID09PSB2b2lkIDAgPyB0aGlzLiRzY29wZWRTbG90cy5kZWZhdWx0KCkgOiB2b2lkIDBdIDogdm9pZCAwLFxuXG4gICAgICAgICAgICBhZnRlcjogdGhpcy4kc2NvcGVkU2xvdHMuYWZ0ZXIgIT09IHZvaWQgMCB8fCB0aGlzLmdldEFmdGVyICE9PSB2b2lkIDBcbiAgICAgICAgICAgICAgPyAoKSA9PiBbaCgnZGl2Jywge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiAnZmxleCBuby13cmFwIGl0ZW1zLWNlbnRlciBtYXJnaW4tbWluJ1xuICAgICAgICAgICAgICB9LCBbdGhpcy5nZXRBZnRlciAhPT0gdm9pZCAwID8gdGhpcy5nZXRBZnRlcihoKSA6IHZvaWQgMCwgdGhpcy4kc2NvcGVkU2xvdHMuYWZ0ZXIgIT09IHZvaWQgMCAmJiB0aGlzLmdldEFmdGVyID09PSB2b2lkIDAgPyB0aGlzLiRzY29wZWRTbG90cy5hZnRlcigpIDogdm9pZCAwXSldIDogdm9pZCAwXG4gICAgICAgICAgfVxuICAgICAgICB9KSxcblxuICAgICAgICB0aGlzLmhhc0Vycm9yID8gaCgnZGl2Jywge1xuICAgICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctZmllbGRfX2Vycm9yIGZsZXggbm8td3JhcCBpdGVtcy1jZW50ZXInXG4gICAgICAgIH0sIHRoaXMuY29tcHV0ZWRFcnJvck1lc3NhZ2UpIDogdm9pZCAwXG4gICAgICBdKVxuICAgIF0pXG4gIH1cbn1cbiAgIiwiaW1wb3J0IEZpZWxkIGZyb20gJy4vc3JjL21haW4uanMnXG5cbmNvbnN0IGluc3RhbGwgPSBmdW5jdGlvbiAoVnVlKSB7XG4gIFZ1ZS5jb21wb25lbnQoRmllbGQubmFtZSwgRmllbGQpXG59XG5cbkZpZWxkLmluc3RhbGwgPSBpbnN0YWxsXG5cbmV4cG9ydCBkZWZhdWx0IEZpZWxkXG4iLCJpbXBvcnQgRmllbGQgZnJvbSAnLi4vLi4vZmllbGQnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3N3SW5wdXQnLFxuICBtaXhpbnM6IFtGaWVsZF0sIC8vIGZvY3VzZWQsZGlzYWJsZWRcbiAgcHJvcHM6IHtcbiAgICB2YWx1ZTogU3RyaW5nLFxuICAgIHBsYWNlaG9sZGVyOiBTdHJpbmdcbiAgfSxcbiAgZGF0YTogKCkgPT4gKHt9KSxcbiAgY29tcHV0ZWQ6IHt9LFxuICBtZXRob2RzOiB7XG4gICAgZm9jdXMoKSB7XG4gICAgICB0aGlzLiRyZWZzLmlucHV0LmZvY3VzKClcbiAgICB9LFxuICAgIGJsdXIoKSB7XG4gICAgICB0aGlzLiRyZWZzLmlucHV0LmJsdXIoKVxuICAgIH0sXG4gICAgZ2V0SW5uZXIoaCkge1xuICAgICAgcmV0dXJuIFtoKCdpbnB1dCcsIHtcbiAgICAgICAgcmVmOiAnaW5wdXQnLFxuICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWlucHV0IG1hcmdpbi1taW4nLFxuICAgICAgICBkb21Qcm9wczoge1xuICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlLFxuICAgICAgICAgIHBsYWNlaG9sZGVyOiB0aGlzLnBsYWNlaG9sZGVyIHx8ICcnLFxuICAgICAgICAgIGRpc2FibGVkOiB0aGlzLmRpc2FibGVkXG4gICAgICAgIH0sXG4gICAgICAgIG9uOiB7XG4gICAgICAgICAgLi4udGhpcy4kbGlzdGVuZXJzLFxuICAgICAgICAgIGlucHV0OiBlID0+IHtcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2lucHV0JywgZS50YXJnZXQudmFsdWUpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KV1cbiAgICB9XG4gIH1cbn1cbiAgIiwiaW1wb3J0IElucHV0IGZyb20gJy4vc3JjL21haW4uanMnXG5cbmNvbnN0IGluc3RhbGwgPSBmdW5jdGlvbiAoVnVlKSB7XG4gIFZ1ZS5jb21wb25lbnQoSW5wdXQubmFtZSwgSW5wdXQpXG59XG5cbklucHV0Lmluc3RhbGwgPSBpbnN0YWxsXG5cbmV4cG9ydCBkZWZhdWx0IElucHV0XG4iLCJleHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdzd1Njcm9sbEFyZWEnLFxuICBwcm9wczoge1xuICAgIHg6IEJvb2xlYW4sXG4gICAgeTogQm9vbGVhbixcbiAgICB3aWR0aDogU3RyaW5nLFxuICAgIGhlaWdodDogU3RyaW5nXG4gIH0sXG4gIGRhdGE6ICgpID0+ICh7fSksXG4gIGNvbXB1dGVkOiB7XG4gICAgc3R5bGUoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAnb3ZlcmZsb3cteCc6IHRoaXMueCA/ICdhdXRvJyA6IHZvaWQgMCxcbiAgICAgICAgJ292ZXJmbG93LXknOiB0aGlzLnkgPyAnYXV0bycgOiB2b2lkIDAsXG4gICAgICAgIHdpZHRoOiB0aGlzLndpZHRoIHx8ICcxMDAlJyxcbiAgICAgICAgJ21heC1oZWlnaHQnOiB0aGlzLmhlaWdodCB8fCAnMTAwJSdcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHt9LFxuICByZW5kZXIoaCkge1xuICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICBzdGF0aWNDbGFzczogJ3N3LXNjcm9sbC1hcmVhJyxcbiAgICAgIHN0eWxlOiB0aGlzLnN0eWxlLFxuICAgICAgb246IHRoaXMuJGxpc3RlbmVyc1xuICAgIH0sIHRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQgIT09IHZvaWQgMCA/IFt0aGlzLiRzY29wZWRTbG90cy5kZWZhdWx0KCldIDogdm9pZCAwKVxuICB9XG59XG4gICIsImltcG9ydCBTY3JvbGxBcmVhIGZyb20gJy4vc3JjL21haW4uanMnXG5cbmNvbnN0IGluc3RhbGwgPSBmdW5jdGlvbiAoVnVlKSB7XG4gIFZ1ZS5jb21wb25lbnQoU2Nyb2xsQXJlYS5uYW1lLCBTY3JvbGxBcmVhKVxufVxuXG5TY3JvbGxBcmVhLmluc3RhbGwgPSBpbnN0YWxsXG5cbmV4cG9ydCBkZWZhdWx0IFNjcm9sbEFyZWFcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXNlbGYtY29tcGFyZSAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRGVlcEVxdWFsKGEsIGIpIHtcbiAgaWYgKGEgPT09IGIpIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgaWYgKGEgaW5zdGFuY2VvZiBEYXRlICYmIGIgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgcmV0dXJuIGEuZ2V0VGltZSgpID09PSBiLmdldFRpbWUoKVxuICB9XG5cbiAgaWYgKGEgIT09IGEgJiYgYiAhPT0gYikge1xuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBpZiAoYSAhPT0gT2JqZWN0KGEpIHx8IGIgIT09IE9iamVjdChiKSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgY29uc3QgcHJvcHMgPSBPYmplY3Qua2V5cyhhKVxuXG4gIGlmIChwcm9wcy5sZW5ndGggIT09IE9iamVjdC5rZXlzKGIpLmxlbmd0aCkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgcmV0dXJuIHByb3BzLmV2ZXJ5KHByb3AgPT4gaXNEZWVwRXF1YWwoYVtwcm9wXSwgYltwcm9wXSkpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZ0NvbnRhaW4ocywgdikge1xuICBsZXQgaW5uZXJTID0gU3RyaW5nKHMpXG4gIGxldCBpbm5lclYgPSBBcnJheS5pc0FycmF5KHYpID8gdiA6IFt2XVxuICBsZXQgc3VtID0gMFxuXG4gIGlubmVyVi5mb3JFYWNoKHggPT4ge1xuICAgIGlmIChpbm5lclMuaW5jbHVkZXMoeCkpIHtcbiAgICAgIGlubmVyUyA9IGlubmVyUy5yZXBsYWNlKHgsICcnKVxuICAgICAgc3VtKytcbiAgICB9XG4gIH0pXG4gIHJldHVybiBzdW0gPj0gaW5uZXJWLmxlbmd0aFxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNPYmplY3Qodikge1xuICByZXR1cm4gT2JqZWN0KHYpID09PSB2XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0RhdGUodikge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHYpID09PSAnW29iamVjdCBEYXRlXSdcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUmVnZXhwKHYpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2KSA9PT0gJ1tvYmplY3QgUmVnRXhwXSdcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtYmVyKHYpIHtcbiAgcmV0dXJuIHR5cGVvZiB2ID09PSAnbnVtYmVyJyAmJiBpc0Zpbml0ZSh2KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmcodikge1xuICByZXR1cm4gdHlwZW9mIHYgPT09ICdzdHJpbmcnXG59XG4iLCJpbXBvcnQgRmllbGQgZnJvbSAnLi4vLi4vZmllbGQnXG5pbXBvcnQgU2NvcmxsQXJlYSBmcm9tICcuLi8uLi9zY3JvbGxBcmVhJ1xuaW1wb3J0IHsgaXNEZWVwRXF1YWwsIGlzU3RyaW5nQ29udGFpbiwgaXNPYmplY3QgfSBmcm9tICcuLi8uLi8uLi91dGlscy9pcydcblxuLy8gaW1wb3J0IHsgZGVkdXBsaWNhdGUgfSBmcm9tICcuLi8uLi8uLi91dGlscy9kZWR1cGxpY2F0ZSdcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnc3dTZWxlY3QnLFxuICBtaXhpbnM6IFtGaWVsZF0sIC8vIGZvY3VzZWQsZGlzYWJsZWRcbiAgY29tcG9uZW50czoge1xuICAgIFNjb3JsbEFyZWFcbiAgfSxcbiAgcHJvcHM6IHtcbiAgICBtdWx0aXBsZTogQm9vbGVhbixcbiAgICB2YWx1ZToge1xuICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICB9LFxuICAgIG9wdGlvbnM6IEFycmF5LFxuICAgIGZpbHRlcjogQm9vbGVhbixcbiAgICBwbGFjZWhvbGRlcjogU3RyaW5nLFxuICAgIG9wdGlvbnNIZWlnaHQ6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICcyMDBweCdcbiAgICB9LFxuICAgIHNlbGVjdGVkU3R5bGU6IFN0cmluZ1xuICB9LFxuICBkYXRhOiAoKSA9PiAoe1xuICAgIGJsdXJUeXBlOiAncmV2ZXJzZScsXG4gICAgZmlsdGVyVmFsdWU6ICcnXG4gIH0pLFxuICBjb21wdXRlZDoge1xuICAgIGV4Y2x1ZGVkQmx1clJlZnMoKSB7XG4gICAgICByZXR1cm4gdGhpcy5maWx0ZXIgPyBbJ2lucHV0JywgJ3NlbGVjdGVkJywgJ3NlbGVjdE9wdGlvbnMnXSA6IFsnc2VsZWN0ZWQnLCAnc2VsZWN0T3B0aW9ucyddXG4gICAgfSxcbiAgICBpbm5lclZhbHVlOiB7XG4gICAgICBnZXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEV4YWN0VmFsdWVzKHRoaXMudmFsdWUpXG4gICAgICB9LFxuICAgICAgc2V0KHZhbCkge1xuICAgICAgICB0aGlzLiRlbWl0KFxuICAgICAgICAgICdpbnB1dCcsXG4gICAgICAgICAgdmFsXG4gICAgICAgIClcbiAgICAgIH1cbiAgICB9LFxuICAgIGlubmVyT3B0aW9ucygpIHtcbiAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMucmVkdWNlKChhLCBjKSA9PiB7XG4gICAgICAgIGxldCBmaWx0ZXJBcnIgPSB0aGlzLmZpbHRlclZhbHVlLnJlcGxhY2UoL1xccysvZywgJycpLnNwbGl0KCcnKVxuXG4gICAgICAgIGlmIChpc1N0cmluZ0NvbnRhaW4odGhpcy5nZXROYW1lKGMpLCBmaWx0ZXJBcnIpKSB7XG4gICAgICAgICAgYS5wdXNoKGMpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFcbiAgICAgIH0sIFtdKSB8fCBbXVxuICAgIH1cbiAgfSxcbiAgd2F0Y2g6IHtcbiAgICBvcHRpb25zKCkge1xuICAgICAgdGhpcy5pbm5lclZhbHVlID0gdGhpcy5nZXRFeGFjdFZhbHVlcyh0aGlzLnZhbHVlKVxuICAgIH1cbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGZvY3VzKCkge1xuICAgICAgdGhpcy4kbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICB0aGlzLiRyZWZzLmlucHV0LmZvY3VzKClcbiAgICAgIH0pXG4gICAgfSxcbiAgICBibHVyKCkge1xuICAgICAgdGhpcy4kcmVmcy5pbnB1dC5ibHVyKClcbiAgICB9LFxuICAgIGNsZWFyRmlsdGVyKCkge1xuICAgICAgdGhpcy5maWx0ZXJWYWx1ZSA9ICcnXG4gICAgfSxcbiAgICB0cmlnZ2VyQmx1cihlKSB7XG4gICAgICB0aGlzLmZvY3VzZWQgPSBmYWxzZVxuICAgICAgdGhpcy4kZW1pdChgYmx1cmAsIGUpXG4gICAgfSxcbiAgICBnZXRJbm5lcihoKSB7XG4gICAgICBsZXQgZ2V0T3B0aW9ucyA9IGggPT4ge1xuICAgICAgICBpZiAodGhpcy5pbm5lck9wdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuaW5uZXJPcHRpb25zLm1hcChvcHRpb24gPT4gaCgnc3ctaXRlbScsIHtcbiAgICAgICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgICAgIHNlbGVjdGVkOiB0aGlzLmNoZWNrU2VsZWN0ZWQob3B0aW9uKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5hdGl2ZU9uOiB7XG4gICAgICAgICAgICAgIGNsaWNrOiBlID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmlubmVyVmFsdWUgPSB0aGlzLmZvcm1hdFZhbHVlKG9wdGlvbilcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyRmlsdGVyKClcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMubXVsdGlwbGUpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlckJsdXIoZSlcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgdGhpcy5mb2N1cygpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2NvcGVkU2xvdHM6IHtcbiAgICAgICAgICAgICAgZGVmYXVsdDogKCkgPT4gW2goJ2RpdicsIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogJ3N3LXNlbGVjdF9fb3B0aW9uJ1xuICAgICAgICAgICAgICB9LCBTdHJpbmcodGhpcy5nZXROYW1lKG9wdGlvbikpKV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gW2goJ3N3LWl0ZW0nLCB7XG4gICAgICAgICAgICBzY29wZWRTbG90czoge1xuICAgICAgICAgICAgICBkZWZhdWx0OiAoKSA9PiBbaCgnZGl2Jywge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctc2VsZWN0X19vcHRpb24gbm8tb3B0aW9ucydcbiAgICAgICAgICAgICAgfSwgJ25vIG9wdGlvbnMnKV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KV1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsZXQgZ2V0U2VsZWN0ZWQgPSBoID0+IHRoaXMuZ2V0RXhhY3RPcHRpb25zKHRoaXMuaW5uZXJWYWx1ZSkubWFwKHggPT4gaCgnc3ctaXRlbScsIHtcbiAgICAgICAgc3RhdGljQ2xhc3M6ICdtYXJnaW4tbWluIHN3LWZvcm0gc2VsZWN0ZWQtb3B0aW9uJyxcbiAgICAgICAgY2xhc3M6IHRoaXMuc2VsZWN0ZWRTdHlsZSA9PT0gdm9pZCAwXG4gICAgICAgICAgPyB7XG4gICAgICAgICAgICB1bmRlcmxpbmU6IHRoaXMudW5kZXJsaW5lZCxcbiAgICAgICAgICAgIGJvcmRlcjogdGhpcy5ib3JkZXJlZCxcbiAgICAgICAgICAgIGZpbGw6IHRoaXMuZmlsbGVkXG4gICAgICAgICAgfSA6IHtcbiAgICAgICAgICAgIFt0aGlzLnNlbGVjdGVkU3R5bGVdOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgcmVmOiAnc2VsZWN0ZWQnLFxuICAgICAgICByZWZJbkZvcjogdHJ1ZSxcbiAgICAgICAgc2NvcGVkU2xvdHM6IHtcbiAgICAgICAgICBkZWZhdWx0OiAoKSA9PiBbaCgnZGl2Jywge1xuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgcGFkZGluZzogdGhpcy5taW5pID8gJzNweCAwIDNweCA5cHgnIDogJzNweCA5cHgnLFxuICAgICAgICAgICAgICAnd2hpdGUtc3BhY2UnOiB0aGlzLm1pbmkgPyAnbm93cmFwJyA6IHZvaWQgMFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIFN0cmluZyh0aGlzLmdldE5hbWUoeCkpKV0sXG4gICAgICAgICAgYWZ0ZXI6ICF0aGlzLm1pbmkgPyAoKSA9PiBbaCgnc3ctaWNvbicsIHtcbiAgICAgICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgICAgICdob3Zlci1jb2xvci1wcmltYXJ5JzogdHJ1ZSxcbiAgICAgICAgICAgICAgJ2NvbG9yLWdyZXknOiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgJ2JvcmRlci1yYWRpdXMnOiAnNTAlJyxcbiAgICAgICAgICAgICAgcGFkZGluZzogJzAgM3B4IDAgMCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgICBuYW1lOiB0aGlzLmZpbGxlZCAmJiB0aGlzLnNlbGVjdGVkU3R5bGUgPT09IHZvaWQgMCB8fCB0aGlzLnNlbGVjdGVkU3R5bGUgPT09ICdmaWxsJyA/ICdjYW5jZWwnIDogJ2NsZWFyJyxcbiAgICAgICAgICAgICAgc2l6ZTogJzE0cHgnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbmF0aXZlT246IHtcbiAgICAgICAgICAgICAgY2xpY2s6ICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmlubmVyVmFsdWUgPSB0aGlzLmZvcm1hdFZhbHVlKHgsICdyZW1vdmUnKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSldIDogdm9pZCAwXG4gICAgICAgIH1cbiAgICAgIH0pKVxuXG4gICAgICByZXR1cm4gW2goJ3N3LWl0ZW0nLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiAnZmxleC1hdXRvJyxcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICB3cmFwOiB0cnVlLFxuICAgICAgICAgIGhpZGVEZWZhdWx0OiB0aGlzLmlubmVyVmFsdWUubGVuZ3RoID4gMCAmJiAoIXRoaXMuZm9jdXNlZCB8fCAhdGhpcy5maWx0ZXIpXG4gICAgICAgIH0sXG4gICAgICAgIHNjb3BlZFNsb3RzOiB7XG4gICAgICAgICAgYmVmb3JlOiB0aGlzLmlubmVyVmFsdWUubGVuZ3RoID4gMCA/ICgpID0+IGdldFNlbGVjdGVkKGgpIDogdm9pZCAwLFxuICAgICAgICAgIGRlZmF1bHQ6ICgpID0+IFtoKCdpbnB1dCcsIHtcbiAgICAgICAgICAgIHJlZjogJ2lucHV0JyxcbiAgICAgICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctaW5wdXQgbWFyZ2luLW1pbicsXG4gICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICBjdXJzb3I6ICF0aGlzLmZpbHRlciA/ICdwb2ludGVyJyA6IHZvaWQgMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRvbVByb3BzOiB7XG4gICAgICAgICAgICAgIHZhbHVlOiB0aGlzLmZpbHRlclZhbHVlLFxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogdGhpcy5wbGFjZWhvbGRlciB8fCAnJyxcbiAgICAgICAgICAgICAgZGlzYWJsZWQ6ICF0aGlzLmZpbHRlclxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgIC4uLnRoaXMuJGxpc3RlbmVycyxcbiAgICAgICAgICAgICAgaW5wdXQ6IGUgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyVmFsdWUgPSBlLnRhcmdldC52YWx1ZVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSldXG4gICAgICAgIH1cbiAgICAgIH0pLCB0aGlzLmZvY3VzZWQgPyBoKCdkaXYnLCB7XG4gICAgICAgIHJlZjogJ3NlbGVjdE9wdGlvbnMnLFxuICAgICAgICBzdGF0aWNDbGFzczogJ3N3LXNlbGVjdF9fb3B0aW9ucyBjb21tb24tc2hhZG93JyxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAnbWF4LWhlaWdodCc6IHRoaXMub3B0aW9uc0hlaWdodFxuICAgICAgICB9XG4gICAgICB9LCBbaCgnc3ctc2Nyb2xsLWFyZWEnLCB7XG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgeTogdHJ1ZSxcbiAgICAgICAgICBoZWlnaHQ6IHRoaXMub3B0aW9uc0hlaWdodFxuICAgICAgICB9LFxuICAgICAgICBzY29wZWRTbG90czoge1xuICAgICAgICAgIGRlZmF1bHQ6ICgpID0+IGdldE9wdGlvbnMoaClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIF0pIDogdm9pZCAwXVxuICAgIH0sXG4gICAgZ2V0QWZ0ZXIoaCkge1xuICAgICAgcmV0dXJuIFtoKCdzdy1pY29uJywge1xuICAgICAgICBwcm9wczoge1xuICAgICAgICAgIG5hbWU6IHRoaXMuZm9jdXNlZCA/ICdrZXlib2FyZF9hcnJvd191cCcgOiAna2V5Ym9hcmRfYXJyb3dfZG93bicsXG4gICAgICAgICAgc2l6ZTogJzIwcHgnXG4gICAgICAgIH0sXG4gICAgICAgIHN0YXRpY0NsYXNzOiAnY29sb3ItZ3JleSBob3Zlci1jb2xvci1wcmltYXJ5J1xuICAgICAgfSldXG4gICAgfSxcbiAgICBmb3JtYXRWYWx1ZShvcHRpb24sIG9wZSkge1xuICAgICAgbGV0IGR1cGxpY2F0ZWQgPSBmYWxzZVxuICAgICAgbGV0IHJlcyA9IFtdXG5cbiAgICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgIHRoaXMuaW5uZXJWYWx1ZS5mb3JFYWNoKHggPT4ge1xuICAgICAgICAgIGlmIChpc0RlZXBFcXVhbCh4LCB0aGlzLmdldFZhbHVlKG9wdGlvbikpKSB7XG4gICAgICAgICAgICBkdXBsaWNhdGVkID0gdHJ1ZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXMucHVzaCh4KVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSBpZiAob3BlID09PSAncmVtb3ZlJykgeyBkdXBsaWNhdGVkID0gdHJ1ZSB9XG4gICAgICBpZiAoIWR1cGxpY2F0ZWQpIHtcbiAgICAgICAgcmVzLnB1c2godGhpcy5nZXRWYWx1ZShvcHRpb24pKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc1xuICAgIH0sXG4gICAgY2hlY2tTZWxlY3RlZChvcHRpb24pIHtcbiAgICAgIHJldHVybiB0aGlzLmlubmVyVmFsdWUuc29tZSh4ID0+IGlzRGVlcEVxdWFsKHgsIHRoaXMuZ2V0VmFsdWUob3B0aW9uKSkpXG4gICAgfSxcbiAgICBnZXRFeGFjdFZhbHVlcyh2YWx1ZSkge1xuICAgICAgbGV0IHYgPSBBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlIDogW3ZhbHVlXVxuXG4gICAgICByZXR1cm4gdi5yZWR1Y2UoKGEsIGMpID0+IHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5zb21lKHggPT4gaXNEZWVwRXF1YWwodGhpcy5nZXRWYWx1ZSh4KSwgYykpKSB7XG4gICAgICAgICAgYS5wdXNoKGMpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFcbiAgICAgIH0sIFtdKVxuICAgIH0sXG4gICAgZ2V0RXhhY3RPcHRpb25zKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdmFsdWUucmVkdWNlKChhLCBjKSA9PiB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5mb3JFYWNoKHggPT4ge1xuICAgICAgICAgIGlmIChpc0RlZXBFcXVhbCh0aGlzLmdldFZhbHVlKHgpLCBjKSkge1xuICAgICAgICAgICAgYS5wdXNoKHgpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gYVxuICAgICAgfSwgW10pXG4gICAgfSxcbiAgICBnZXRWYWx1ZShvcHRpb24pIHtcbiAgICAgIHJldHVybiBpc09iamVjdChvcHRpb24pICYmIG9wdGlvbi5oYXNPd25Qcm9wZXJ0eSgndmFsdWUnKVxuICAgICAgICA/IG9wdGlvbi52YWx1ZSA6IG9wdGlvblxuICAgIH0sXG4gICAgZ2V0TmFtZShvcHRpb24pIHtcbiAgICAgIHJldHVybiBpc09iamVjdChvcHRpb24pICYmIG9wdGlvbi5oYXNPd25Qcm9wZXJ0eSgnbmFtZScpXG4gICAgICAgID8gb3B0aW9uLm5hbWUgOiBvcHRpb25cbiAgICB9XG4gIH1cbn1cbiAgIiwiaW1wb3J0IFNlbGVjdCBmcm9tICcuL3NyYy9tYWluLmpzJ1xuXG5jb25zdCBpbnN0YWxsID0gZnVuY3Rpb24gKFZ1ZSkge1xuICBWdWUuY29tcG9uZW50KFNlbGVjdC5uYW1lLCBTZWxlY3QpXG59XG5cblNlbGVjdC5pbnN0YWxsID0gaW5zdGFsbFxuXG5leHBvcnQgZGVmYXVsdCBTZWxlY3RcbiIsImltcG9ydCBJdGVtIGZyb20gJy4uLy4uL2l0ZW0nXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3N3QnV0dG9uJyxcbiAgY29tcG9uZW50czogeyBJdGVtIH0sXG4gIHByb3BzOiB7XG4gICAgdW5kZXJsaW5lZDogQm9vbGVhbixcbiAgICBib3JkZXJlZDogQm9vbGVhbixcbiAgICBmaWxsZWQ6IEJvb2xlYW4sXG4gICAgZGlzYWJsZWQ6IEJvb2xlYW4sXG4gICAgY29sb3I6IFN0cmluZyxcbiAgICBwcmltYXJ5OiBCb29sZWFuLFxuICAgIG5lZ2F0aXZlOiBCb29sZWFuLFxuICAgIHBvc2l0aXZlOiBCb29sZWFuLFxuICAgIHdhcm5pbmc6IEJvb2xlYW4sXG4gICAgcm91bmQ6IEJvb2xlYW4sXG4gICAgc2hhZG93OiBCb29sZWFuLFxuICAgIG5vSG92ZXI6IEJvb2xlYW4sXG4gICAgdG86IFN0cmluZyB8IE9iamVjdFxuICB9LFxuICBkYXRhOiAoKSA9PiAoe1xuICAgIG1vdXNlb3ZlcjogZmFsc2VcbiAgfSksXG4gIHJlbmRlcihoKSB7XG4gICAgcmV0dXJuIGgoJ2J1dHRvbicsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiAnc3ctYnV0dG9uIGZsZXggbm8td3JhcCBpdGVtcy1jZW50ZXInLFxuICAgICAgc3R5bGU6IHtcbiAgICAgICAgY29sb3I6ICF0aGlzLmRpc2FibGVkICYmICF0aGlzLmZpbGxlZCAmJiB0aGlzLmNvbG9yIHx8IHZvaWQgMCxcbiAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiAhdGhpcy5kaXNhYmxlZCAmJiB0aGlzLmZpbGxlZCAmJiB0aGlzLmNvbG9yIHx8IHZvaWQgMFxuICAgICAgfSxcbiAgICAgIGNsYXNzOiB7XG4gICAgICAgIHVuZGVybGluZTogdGhpcy51bmRlcmxpbmVkLFxuICAgICAgICBib3JkZXI6IHRoaXMuYm9yZGVyZWQsXG4gICAgICAgIGZpbGw6IHRoaXMuZmlsbGVkLFxuICAgICAgICBwcmltYXJ5OiB0aGlzLnByaW1hcnksXG4gICAgICAgIG5lZ2F0aXZlOiB0aGlzLm5lZ2F0aXZlLFxuICAgICAgICBwb3NpdGl2ZTogdGhpcy5wb3NpdGl2ZSxcbiAgICAgICAgd2FybmluZzogdGhpcy53YXJuaW5nLFxuICAgICAgICBncmV5OiB0aGlzLmRpc2FibGVkLFxuICAgICAgICByb3VuZDogdGhpcy5yb3VuZCAmJiAhdGhpcy51bmRlcmxpbmVkLFxuICAgICAgICAnY29tbW9uLXNoYWRvdyc6IHRoaXMuc2hhZG93ICYmICh0aGlzLmJvcmRlcmVkIHx8IHRoaXMuZmlsbGVkKVxuICAgICAgfSxcbiAgICAgIG9uOiB0aGlzLmRpc2FibGVkID8gdm9pZCAwIDoge1xuICAgICAgICAuLi50aGlzLiRsaXN0ZW5lcnMsXG4gICAgICAgIG1vdXNlb3ZlcjogZSA9PiB7XG4gICAgICAgICAgdGhpcy5tb3VzZW92ZXIgPSB0cnVlXG4gICAgICAgICAgdGhpcy4kZW1pdCgnbW91c2VvdmVyJywgZSlcbiAgICAgICAgfSxcbiAgICAgICAgbW91c2VvdXQ6IGUgPT4ge1xuICAgICAgICAgIHRoaXMubW91c2VvdmVyID0gZmFsc2VcbiAgICAgICAgICB0aGlzLiRlbWl0KCdtb3VzZW91dCcsIGUpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCBbXG4gICAgICBoKCdzdy1pdGVtJywge1xuICAgICAgICBzdGF0aWNDbGFzczogJ2ZsZXgtYXV0bycsXG4gICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgJ3JvdW5kLXNsb3QnOiB0aGlzLiRzY29wZWRTbG90cy5yb3VuZFxuICAgICAgICB9LFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgICd6LWluZGV4JzogMSxcbiAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJyxcbiAgICAgICAgfSxcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICB0bzogdGhpcy50b1xuICAgICAgICB9LFxuICAgICAgICBzY29wZWRTbG90czogdGhpcy4kc2NvcGVkU2xvdHMucm91bmQgIT09IHZvaWQgMFxuICAgICAgICAgID8ge1xuICAgICAgICAgICAgZGVmYXVsdDogKCkgPT4gW2goJ2RpdicsIHtcbiAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6ICdmbGV4IG5vLXdyYXAgaXRlbXMtY2VudGVyIG1hcmdpbi1taW4gc3ctYnV0dG9uX19pbm5lciBmbGV4LWF1dG8nXG4gICAgICAgICAgICB9LCBbdGhpcy4kc2NvcGVkU2xvdHMucm91bmQoKV0pXVxuICAgICAgICAgIH0gOiB7XG4gICAgICAgICAgICBiZWZvcmU6IHRoaXMuJHNjb3BlZFNsb3RzLmJlZm9yZSAhPT0gdm9pZCAwXG4gICAgICAgICAgICAgID8gKCkgPT4gW2goJ2RpdicsIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogJ2ZsZXggbm8td3JhcCBpdGVtcy1jZW50ZXIgbWFyZ2luLW1pbiBzdy1idXR0b25fX2JlZm9yZSdcbiAgICAgICAgICAgICAgfSwgW3RoaXMuJHNjb3BlZFNsb3RzLmJlZm9yZSgpXSldIDogdm9pZCAwLFxuICBcbiAgICAgICAgICAgIGRlZmF1bHQ6IHRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQgIT09IHZvaWQgMFxuICAgICAgICAgICAgICA/ICgpID0+IFtoKCdkaXYnLCB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6ICdmbGV4IG5vLXdyYXAgaXRlbXMtY2VudGVyIG1hcmdpbi1taW4gc3ctYnV0dG9uX19pbm5lciBmbGV4LWF1dG8nXG4gICAgICAgICAgICAgIH0sIFt0aGlzLiRzY29wZWRTbG90cy5kZWZhdWx0KCldKV0gOiB2b2lkIDAsXG4gIFxuICAgICAgICAgICAgYWZ0ZXI6IHRoaXMuJHNjb3BlZFNsb3RzLmFmdGVyICE9PSB2b2lkIDBcbiAgICAgICAgICAgICAgPyAoKSA9PiBbaCgnZGl2Jywge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiAnZmxleCBuby13cmFwIGl0ZW1zLWNlbnRlciBtYXJnaW4tbWluIHN3LWJ1dHRvbl9fYWZ0ZXInXG4gICAgICAgICAgICAgIH0sIFt0aGlzLiRzY29wZWRTbG90cy5hZnRlcigpXSldIDogdm9pZCAwXG4gICAgICAgICAgfVxuICAgICAgfSksXG4gICAgICBoKCdkaXYnLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctbWFzaycsXG4gICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgaW52aXNpYmxlOiAhdGhpcy5kaXNhYmxlZCAmJiAoIXRoaXMubW91c2VvdmVyIHx8IHRoaXMubm9Ib3ZlcilcbiAgICAgICAgfSxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAnei1pbmRleCc6IHRoaXMuZGlzYWJsZWQgPyA5IDogMCxcbiAgICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6IHRoaXMuZGlzYWJsZWQgPyAndHJhbnNwYXJlbnQnIDogJ2N1cnJlbnRDb2xvcidcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICBdKVxuICB9XG59XG4gICIsImltcG9ydCBCdXR0b24gZnJvbSAnLi9zcmMvbWFpbi5qcydcblxuY29uc3QgaW5zdGFsbCA9IGZ1bmN0aW9uIChWdWUpIHtcbiAgVnVlLmNvbXBvbmVudChCdXR0b24ubmFtZSwgQnV0dG9uKVxufVxuXG5CdXR0b24uaW5zdGFsbCA9IGluc3RhbGxcblxuZXhwb3J0IGRlZmF1bHQgQnV0dG9uXG4iLCJpbXBvcnQgc3dCdXR0b24gZnJvbSAnLi4vLi4vYnV0dG9uJ1xuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnc3dNb2RhbCcsXG4gIGNvbXBvbmVudHM6IHtcbiAgICBzd0J1dHRvblxuICB9LFxuICBwcm9wczoge1xuICAgIHNob3c6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICB9LFxuICAgIHRpdGxlOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAn5Z+65pys55So5rOVdGl0bGUnXG4gICAgfSxcbiAgICB3aWR0aDoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJzQwJSdcbiAgICB9XG4gIH0sXG4gIGNvbXB1dGVkOiB7XG4gICAgc3R5bGUoKSB7XG4gICAgICBpZiAodGhpcy5zaG93KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgekluZGV4OiA5OTksXG4gICAgICAgICAgb3BhY2l0eTogMVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHpJbmRleDogLTEwLFxuICAgICAgICAgIG9wYWNpdHk6IDBcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGhhbmRsZUNhbmNlbCgpIHtcbiAgICAgIHRoaXMuJGVtaXQoJ2NhbmNlbCcpXG4gICAgfSxcbiAgICBoYW5kbGVDb25maXJtKCkge1xuICAgICAgdGhpcy4kZW1pdCgnY29uZmlybScpXG4gICAgfSxcbiAgfSxcbiAgcmVuZGVyKGgpIHtcbiAgICByZXR1cm4gaCgnZGl2Jyx7XG4gICAgICBzdGF0aWNDbGFzczogJ3N3LW1vZGFsLW1hc2snLFxuICAgICAgc3R5bGU6IHRoaXMuc3R5bGUsXG4gICAgICBvbjoge1xuICAgICAgICBjbGljazogdGhpcy5oYW5kbGVDYW5jZWxcbiAgICAgIH0gXG4gICAgfSwgWyBoKCdkaXYnLCB7IFxuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogJ3N3LW1vZGFsJyxcbiAgICAgICAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAgICAgICBzaG93TW9kYWw6IHRoaXMuc2hvdyxcbiAgICAgICAgICAgICAgICBoaWRlTW9kYWw6ICF0aGlzLnNob3dcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICB3aWR0aDogdGhpcy53aWR0aFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgIGNsaWNrOiBldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgWyB0aGlzLiRzY29wZWRTbG90cy5oZWFkZXIgPT09IHZvaWQgMCBcbiAgICAgICAgICAgICAgICA/IGgoJ2RpdicsIFxuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiAnc3ctbW9kYWwtdGl0bGUnXG4gICAgICAgICAgICAgICAgICAgICAgfSwgWyBoKCdzcGFuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6ICdzdy1tb2RhbC10aXRsZS10ZXh0J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGl0bGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgaCgnc3BhbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiAnc3ctbW9kYWwtY2xvc2UtaWNvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6ICgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVDYW5jZWwoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGgoJ2knLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiAnbWF0ZXJpYWwtaWNvbnMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdjbG9zZScpIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICA6IHRoaXMuJHNjb3BlZFNsb3RzLmhlYWRlcigpLFxuICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlZFNsb3RzLmNvbnRlbnQoKSxcbiAgICAgICAgICAgICAgICB0aGlzLiRzY29wZWRTbG90cy5mb290ZXIgPT09IHZvaWQgMCBcbiAgICAgICAgICAgICAgICA/IGgoJ2RpdicsIFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzczogJ3N3LW1vZGFsLWZvb3RlcidcbiAgICAgICAgICAgICAgICAgICAgfSwgXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICBoKCdzdy1idXR0b24nLHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiAnYnRuIGxlZnQtYnRuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiAoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVDYW5jZWwoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfSwgJ+WPlua2iCcpLFxuICAgICAgICAgICAgICAgICAgICAgIGgoJ3N3LWJ1dHRvbicse1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6ICdidG4gcmlnaHQtYnRuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiAoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVDb25maXJtKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH0sICfnoa7lrponKVxuICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgIDogdGhpcy4kc2NvcGVkU2xvdHMuZm9vdGVyXG4gICAgICAgICAgICAgIF0gICAgICAgICAgICAgIFxuICAgICAgICAgIClcbiAgICAgICAgXVxuICAgIClcbiAgfVxufSIsImltcG9ydCBNb2RhbCBmcm9tICcuL3NyYy9tYWluLmpzJ1xuXG5jb25zdCBpbnN0YWxsID0gZnVuY3Rpb24gKFZ1ZSkge1xuICBWdWUuY29tcG9uZW50KE1vZGFsLm5hbWUsIE1vZGFsKVxufVxuXG5Nb2RhbC5pbnN0YWxsID0gaW5zdGFsbFxuXG5leHBvcnQgZGVmYXVsdCBNb2RhbFxuIiwiaW1wb3J0IFZ1ZSBmcm9tICd2dWUnXG5cbmNvbnN0IGlzU2VydmVyID0gVnVlLnByb3RvdHlwZS4kaXNTZXJ2ZXI7XG5cbmV4cG9ydCBmdW5jdGlvbiBvZmZzZXQoZWwpIHtcbiAgaWYgKGVsID09PSB3aW5kb3cpIHtcbiAgICByZXR1cm4geyB0b3A6IDAsIGxlZnQ6IDAgfVxuICB9XG4gIGNvbnN0IHsgdG9wLCBsZWZ0IH0gPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuXG4gIHJldHVybiB7IHRvcCwgbGVmdCB9XG59XG4gIFxuZXhwb3J0IGZ1bmN0aW9uIHN0eWxlKGVsLCBwcm9wZXJ0eSkge1xuICByZXR1cm4gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwpLmdldFByb3BlcnR5VmFsdWUocHJvcGVydHkpXG59XG4gIFxuZXhwb3J0IGZ1bmN0aW9uIGhlaWdodChlbCkge1xuICByZXR1cm4gZWwgPT09IHdpbmRvd1xuICAgID8gd2luZG93LmlubmVySGVpZ2h0XG4gICAgOiBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHRcbn1cbiAgXG5leHBvcnQgZnVuY3Rpb24gd2lkdGgoZWwpIHtcbiAgcmV0dXJuIGVsID09PSB3aW5kb3dcbiAgICA/IHdpbmRvdy5pbm5lcldpZHRoXG4gICAgOiBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aFxufVxuICBcbmV4cG9ydCBmdW5jdGlvbiBjc3MoZWxlbWVudCwgY3NzKSB7XG4gIGxldCBzdHlsZSA9IGVsZW1lbnQuc3R5bGVcbiAgXG4gIE9iamVjdC5rZXlzKGNzcykuZm9yRWFjaChwcm9wID0+IHtcbiAgICBzdHlsZVtwcm9wXSA9IGNzc1twcm9wXVxuICB9KVxufVxuICBcbmV4cG9ydCBmdW5jdGlvbiBjc3NCYXRjaChlbGVtZW50cywgc3R5bGUpIHtcbiAgZWxlbWVudHMuZm9yRWFjaChlbCA9PiBjc3MoZWwsIHN0eWxlKSlcbn1cbiAgXG5leHBvcnQgZnVuY3Rpb24gcmVhZHkoZm4pIHtcbiAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVyblxuICB9XG4gIFxuICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSAhPT0gJ2xvYWRpbmcnKSB7XG4gICAgcmV0dXJuIGZuKClcbiAgfVxuICBcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZuLCBmYWxzZSlcbn1cblxuZXhwb3J0IGNvbnN0IG9uID0gKGZ1bmN0aW9uKCkge1xuICBpZiAoIWlzU2VydmVyICYmIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oZWxlbWVudCwgZXZlbnQsIGhhbmRsZXIpIHtcbiAgICAgIGlmIChlbGVtZW50ICYmIGV2ZW50ICYmIGhhbmRsZXIpIHtcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oZWxlbWVudCwgZXZlbnQsIGhhbmRsZXIpIHtcbiAgICAgIGlmIChlbGVtZW50ICYmIGV2ZW50ICYmIGhhbmRsZXIpIHtcbiAgICAgICAgZWxlbWVudC5hdHRhY2hFdmVudCgnb24nICsgZXZlbnQsIGhhbmRsZXIpO1xuICAgICAgfVxuICAgIH07XG4gIH1cbn0pKCk7XG5cbmV4cG9ydCBjb25zdCBvZmYgPSAoZnVuY3Rpb24oKSB7XG4gIGlmICghaXNTZXJ2ZXIgJiYgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcikge1xuICAgIHJldHVybiBmdW5jdGlvbihlbGVtZW50LCBldmVudCwgaGFuZGxlcikge1xuICAgICAgaWYgKGVsZW1lbnQgJiYgZXZlbnQpIHtcbiAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oZWxlbWVudCwgZXZlbnQsIGhhbmRsZXIpIHtcbiAgICAgIGlmIChlbGVtZW50ICYmIGV2ZW50KSB7XG4gICAgICAgIGVsZW1lbnQuZGV0YWNoRXZlbnQoJ29uJyArIGV2ZW50LCBoYW5kbGVyKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG59KSgpOyAgXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgb2Zmc2V0LFxuICBzdHlsZSxcbiAgaGVpZ2h0LFxuICB3aWR0aCxcbiAgY3NzLFxuICBjc3NCYXRjaCxcbiAgcmVhZHksXG4gIG9uLFxuICBvZmZcbn0iLCJpbXBvcnQgeyBvbiwgb2ZmIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvZG9tJyBcbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3N3UG9wb3ZlcicsXG4gIGRhdGEgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBwb3BvdmVyU3R5bGU6IHt9LFxuICAgICAgYXJyb3dTdHlsZToge30sXG4gICAgICBzaG93OiBmYWxzZSxcbiAgICAgIHJlZmVyZW5jZUVsbToge31cbiAgICB9XG4gIH0sXG4gIG1vZGVsOiB7XG4gICAgcHJvcDogJ3ZhbHVlJyxcbiAgICBldmVudDogJ3VwZGF0ZSdcbiAgfSxcbiAgcHJvcHM6IHtcbiAgICB2YWx1ZToge1xuICAgICAgdHlwZTogQm9vbGVhblxuICAgIH0sXG4gICAgdGl0bGU6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICB9LFxuICAgIGNvbnRlbnQ6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICB9LFxuICAgIHBsYWNlbWVudDoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ3RvcCdcbiAgICB9LFxuICAgIHRyaWdnZXI6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdjbGljaycsXG4gICAgICB2YWxpZGF0b3I6IHZhbHVlID0+IFsnY2xpY2snLCAnZm9jdXMnLCAnaG92ZXInLCAnbWFudWFsJ10uaW5kZXhPZih2YWx1ZSkgPiAtMVxuICAgIH0sXG4gICAgd2lkdGg6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICB9XG4gIH0sXG4gIGNvbXB1dGVkOiB7XG4gICAgc2hvd1ZhbHVlOiB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVcbiAgICAgIH0sXG4gICAgICBzZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIH1cbiAgICB9LFxuICAgIHNob3dTdHlsZSgpIHtcbiAgICAgIGlmICh0aGlzLnRyaWdnZXIgIT09ICdtYW51YWwnKSB7XG4gICAgICAgIGlmICh0aGlzLnNob3cpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgekluZGV4OiA5OTksXG4gICAgICAgICAgICBvcGFjaXR5OiAxXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB6SW5kZXg6IC0xMCxcbiAgICAgICAgICAgIG9wYWNpdHk6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLnNob3dWYWx1ZSkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB6SW5kZXg6IDk5OSxcbiAgICAgICAgICAgIG9wYWNpdHk6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHpJbmRleDogLTEwLFxuICAgICAgICAgICAgb3BhY2l0eTogMFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGdldFN0eWxlKHBvcG92ZXJFbG0sIHJlZmVyZW5jZUVsbSkge1xuICAgICAgc3dpdGNoICh0aGlzLnBsYWNlbWVudCkge1xuICAgICAgICBjYXNlICd0b3Atc3RhcnQnOlxuICAgICAgICAgIHRoaXMucG9wb3ZlclN0eWxlID0ge1xuICAgICAgICAgICAgdG9wOiAnLScgKyAocG9wb3ZlckVsbS5vZmZzZXRIZWlnaHQgKyAxMCkgKyAncHgnXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuYXJyb3dTdHlsZSA9IHtcbiAgICAgICAgICAgIGxlZnQ6IChyZWZlcmVuY2VFbG0ub2Zmc2V0V2lkdGggLyAyIC0gNSkgKyAncHgnXG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICd0b3AnOlxuICAgICAgICAgIHRoaXMucG9wb3ZlclN0eWxlID0ge1xuICAgICAgICAgICAgdG9wOiAnLScgKyAocG9wb3ZlckVsbS5vZmZzZXRIZWlnaHQgKyAxMCkgKyAncHgnLFxuICAgICAgICAgICAgbGVmdDogKHJlZmVyZW5jZUVsbS5vZmZzZXRXaWR0aCAtIHBvcG92ZXJFbG0ub2Zmc2V0V2lkdGgpIC8gMiArICdweCdcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5hcnJvd1N0eWxlID0ge1xuICAgICAgICAgICAgbGVmdDogKHBvcG92ZXJFbG0ub2Zmc2V0V2lkdGggLyAyIC0gNSkgKyAncHgnXG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgJ2JvdHRvbS1zdGFydCc6IFxuICAgICAgICAgIHRoaXMucG9wb3ZlclN0eWxlID0ge1xuICAgICAgICAgICAgdG9wOiAocmVmZXJlbmNlRWxtLm9mZnNldEhlaWdodCArIDEwKSArICdweCdcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5hcnJvd1N0eWxlID0ge1xuICAgICAgICAgICAgbGVmdDogKHJlZmVyZW5jZUVsbS5vZmZzZXRXaWR0aCAvIDIgLSA1KSArICdweCdcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWsgXG4gICAgICAgIGNhc2UgJ2JvdHRvbSc6XG4gICAgICAgICAgdGhpcy5wb3BvdmVyU3R5bGUgPSB7XG4gICAgICAgICAgICB0b3A6IChyZWZlcmVuY2VFbG0ub2Zmc2V0SGVpZ2h0ICsgMTApICsgJ3B4JyxcbiAgICAgICAgICAgIGxlZnQ6IChyZWZlcmVuY2VFbG0ub2Zmc2V0V2lkdGggLSBwb3BvdmVyRWxtLm9mZnNldFdpZHRoKSAvIDIgKyAncHgnXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuYXJyb3dTdHlsZSA9IHtcbiAgICAgICAgICAgIGxlZnQ6IChwb3BvdmVyRWxtLm9mZnNldFdpZHRoIC8gMiAtIDUpICsgJ3B4J1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlICdyaWdodC1zdGFydCc6XG4gICAgICAgICAgdGhpcy5wb3BvdmVyU3R5bGUgPSB7XG4gICAgICAgICAgICBsZWZ0OiAocmVmZXJlbmNlRWxtLm9mZnNldFdpZHRoICsgMTApICsgJ3B4JyxcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5hcnJvd1N0eWxlID0ge1xuICAgICAgICAgICAgdG9wOiAocmVmZXJlbmNlRWxtLm9mZnNldEhlaWdodCAvIDIgLSA1KSArICdweCdcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWsgIFxuICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgdGhpcy5wb3BvdmVyU3R5bGUgPSB7XG4gICAgICAgICAgICBsZWZ0OiAocmVmZXJlbmNlRWxtLm9mZnNldFdpZHRoICsgMTApICsgJ3B4JyxcbiAgICAgICAgICAgIHRvcDogKHJlZmVyZW5jZUVsbS5vZmZzZXRIZWlnaHQgLSBwb3BvdmVyRWxtLm9mZnNldEhlaWdodCkgLyAyICsgJ3B4J1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmFycm93U3R5bGUgPSB7XG4gICAgICAgICAgICB0b3A6IChwb3BvdmVyRWxtLm9mZnNldEhlaWdodCAvIDIgLSA1KSArICdweCdcbiAgICAgICAgICB9IFxuICAgICAgICAgIGJyZWFrIFxuICAgICAgICBjYXNlICdsZWZ0LXN0YXJ0JzpcbiAgICAgICAgICB0aGlzLnBvcG92ZXJTdHlsZSA9IHtcbiAgICAgICAgICAgIHJpZ2h0OiAocmVmZXJlbmNlRWxtLm9mZnNldFdpZHRoICsgMTApICsgJ3B4JyxcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5hcnJvd1N0eWxlID0ge1xuICAgICAgICAgICAgdG9wOiAocmVmZXJlbmNlRWxtLm9mZnNldEhlaWdodCAvIDIgLSA1KSArICdweCdcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgdGhpcy5wb3BvdmVyU3R5bGUgPSB7XG4gICAgICAgICAgICByaWdodDogKHJlZmVyZW5jZUVsbS5vZmZzZXRXaWR0aCArIDEwKSArICdweCcsXG4gICAgICAgICAgICB0b3A6IChyZWZlcmVuY2VFbG0ub2Zmc2V0SGVpZ2h0IC0gcG9wb3ZlckVsbS5vZmZzZXRIZWlnaHQpIC8gMiArICdweCdcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5hcnJvd1N0eWxlID0ge1xuICAgICAgICAgICAgdG9wOiAocG9wb3ZlckVsbS5vZmZzZXRIZWlnaHQgLyAyIC0gNSkgKyAncHgnXG4gICAgICAgICAgfSBcbiAgICAgICAgICBicmVhayAgICAgICAgXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSxcbiAgICBoYW5kbGVDbGljaygpIHtcbiAgICAgIHRoaXMuc2hvdyA9ICF0aGlzLnNob3dcbiAgICB9LFxuICAgIGhhbmRsZU1vdXNlRW50ZXIoKSB7XG4gICAgICB0aGlzLnNob3cgPSB0cnVlXG4gICAgfSxcbiAgICBoYW5kbGVNb3VzZUxlYXZlKCkge1xuICAgICAgdGhpcy5zaG93ID0gZmFsc2VcbiAgICB9LFxuICAgIGRvU2hvdygpIHtcbiAgICAgIHRoaXMuc2hvdyA9IHRydWVcbiAgICB9LFxuICAgIGRvQ2xvc2UoKSB7XG4gICAgICB0aGlzLnNob3cgPSBmYWxzZVxuICAgIH0sXG4gICAgaGFuZGxlTWFudWFsKCkge1xuICAgICAgdGhpcy5zaG93VmFsdWUgPSAhdGhpcy5zaG93VmFsdWVcbiAgICAgIHRoaXMuJGVtaXQoXCJ1cGRhdGVcIiwgdGhpcy5zaG93VmFsdWUpO1xuICAgIH1cbiAgfSxcbiAgbW91bnRlZCAoKSB7XG4gICAgbGV0IHBvcG92ZXJFbG0gPSB0aGlzLiRyZWZzLnBvcG92ZXJcbiAgICBsZXQgcmVmZXJlbmNlRWxtID0gdGhpcy5yZWZlcmVuY2VFbG0gPSB0aGlzLiRzY29wZWRTbG90cy5yZWZlcmVuY2UoKVswXS5lbG1cbiAgICB0aGlzLmdldFN0eWxlKHBvcG92ZXJFbG0sIHJlZmVyZW5jZUVsbSlcbiAgICBpZih0aGlzLnRyaWdnZXIgPT09ICdtYW51YWwnKXtcbiAgICAgIG9uKHJlZmVyZW5jZUVsbSwgJ2NsaWNrJywgdGhpcy5oYW5kbGVNYW51YWwpO1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGlmICh0aGlzLnRyaWdnZXIgPT09ICdjbGljaycpIHtcbiAgICAgIG9uKHJlZmVyZW5jZUVsbSwgJ2NsaWNrJywgdGhpcy5oYW5kbGVDbGljayk7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgaWYodGhpcy50cmlnZ2VyID09PSAnaG92ZXInKXtcbiAgICAgIG9uKHJlZmVyZW5jZUVsbSwgJ21vdXNlZW50ZXInLCB0aGlzLmhhbmRsZU1vdXNlRW50ZXIpXG4gICAgICBvbihyZWZlcmVuY2VFbG0sICdtb3VzZWxlYXZlJywgdGhpcy5oYW5kbGVNb3VzZUxlYXZlKTtcbiAgICB9XG4gICAgaWYodGhpcy50cmlnZ2VyID09PSAnZm9jdXMnKXtcbiAgICAgIGlmIChyZWZlcmVuY2VFbG0ucXVlcnlTZWxlY3RvcignaW5wdXQsIHRleHRhcmVhJykpIHtcbiAgICAgICAgb24ocmVmZXJlbmNlRWxtLCAnZm9jdXNpbicsIHRoaXMuZG9TaG93KTtcbiAgICAgICAgb24ocmVmZXJlbmNlRWxtLCAnZm9jdXNvdXQnLCB0aGlzLmRvQ2xvc2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb24ocmVmZXJlbmNlRWxtLCAnbW91c2Vkb3duJywgdGhpcy5kb1Nob3cpO1xuICAgICAgICBvbihyZWZlcmVuY2VFbG0sICdtb3VzZXVwJywgdGhpcy5kb0Nsb3NlKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGRlc3Ryb3llZCAoKSB7XG4gICAgY29uc3QgcmVmZXJlbmNlID0gdGhpcy5yZWZlcmVuY2VFbG07XG4gICAgb2ZmKHJlZmVyZW5jZSwgJ2NsaWNrJywgdGhpcy5oYW5kbGVDbGljayk7XG4gICAgb2ZmKHJlZmVyZW5jZSwgJ21vdXNldXAnLCB0aGlzLmRvQ2xvc2UpO1xuICAgIG9mZihyZWZlcmVuY2UsICdtb3VzZWRvd24nLCB0aGlzLmRvU2hvdyk7XG4gICAgb2ZmKHJlZmVyZW5jZSwgJ2ZvY3VzaW4nLCB0aGlzLmRvU2hvdyk7XG4gICAgb2ZmKHJlZmVyZW5jZSwgJ2ZvY3Vzb3V0JywgdGhpcy5kb0Nsb3NlKTtcbiAgICBvZmYocmVmZXJlbmNlLCAnbW91c2Vkb3duJywgdGhpcy5kb1Nob3cpO1xuICAgIG9mZihyZWZlcmVuY2UsICdtb3VzZXVwJywgdGhpcy5kb0Nsb3NlKTtcbiAgICBvZmYocmVmZXJlbmNlLCAnbW91c2VsZWF2ZScsIHRoaXMuaGFuZGxlTW91c2VMZWF2ZSk7XG4gICAgb2ZmKHJlZmVyZW5jZSwgJ21vdXNlZW50ZXInLCB0aGlzLmhhbmRsZU1vdXNlRW50ZXIpO1xuICAgIG9mZihkb2N1bWVudCwgJ2NsaWNrJywgdGhpcy5oYW5kbGVNYW51YWwpO1xuICB9LFxuICByZW5kZXIoaCkge1xuICAgIHJldHVybiBoKCdkaXYnLHtcbiAgICAgIGNsYXNzOiAnc3ctcG9wb3Zlci1jb250YWluJyxcbiAgICB9LCBbIGgoJ2RpdicsIFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogJ3N3LXBvcG92ZXInLFxuICAgICAgICAgICAgICBjbGFzczogJ3N3LXBvcG92ZXItc2hvdycsXG4gICAgICAgICAgICAgIHJlZjogJ3BvcG92ZXInLFxuICAgICAgICAgICAgICBzdHlsZTogT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHRoaXMucG9wb3ZlclN0eWxlLCB7d2lkdGg6IHRoaXMud2lkdGggfSksIHRoaXMuc2hvd1N0eWxlKVxuICAgICAgICB9LCBbIHRoaXMudGl0bGUgIFxuICAgICAgICAgICAgICA/IGgoJ2RpdicsIHtcbiAgICAgICAgICAgICAgICBjbGFzczogJ3N3LXBvcG92ZXItdGl0bGUnXG4gICAgICAgICAgICAgIH0sIHRoaXMudGl0bGUpXG4gICAgICAgICAgICAgIDogJycsIFxuICAgICAgICAgICAgIHRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQgPT09IHZvaWQgMFxuICAgICAgICAgICAgID8gaCgnZGl2Jywge1xuICAgICAgICAgICAgICAgIGNsYXNzOiAnc3ctcG9wb3Zlci1jb250ZW50J1xuICAgICAgICAgICAgIH0sIHRoaXMuY29udGVudCB8fCAnJyApXG4gICAgICAgICAgICAgIDogdGhpcy4kc2NvcGVkU2xvdHMuZGVmYXVsdCgpLFxuICAgICAgICAgICAgIGgoJ2Rpdicse1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctcG9wb3Zlci1hcnJvdycsXG4gICAgICAgICAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAgICAgICAnc3ctcG9wb3Zlci1hcnJvdy10b3AnOiB0aGlzLnBsYWNlbWVudC5pbmRleE9mKCd0b3AnKSA+PSAwID8gdHJ1ZSA6IGZhbHNlLFxuICAgICAgICAgICAgICAgICdzdy1wb3BvdmVyLWFycm93LWJvdHRvbSc6IHRoaXMucGxhY2VtZW50LmluZGV4T2YoJ2JvdHRvbScpID49IDAgPyB0cnVlIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgJ3N3LXBvcG92ZXItYXJyb3ctcmlnaHQnOiB0aGlzLnBsYWNlbWVudC5pbmRleE9mKCdyaWdodCcpID49IDAgPyB0cnVlIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgJ3N3LXBvcG92ZXItYXJyb3ctbGVmdCc6IHRoaXMucGxhY2VtZW50LmluZGV4T2YoJ2xlZnQnKSA+PSAwID8gdHJ1ZSA6IGZhbHNlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc3R5bGU6IHRoaXMuYXJyb3dTdHlsZVxuICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdKSwgXG4gICAgICAgIHRoaXMuJHNjb3BlZFNsb3RzLnJlZmVyZW5jZSA9PT0gdm9pZCAwIFxuICAgICAgICA/IGgoKVxuICAgICAgICA6IHRoaXMuJHNjb3BlZFNsb3RzLnJlZmVyZW5jZSgpXG4gICAgICBdKSBcbiAgfVxufSIsImltcG9ydCBQb3BvdmVyIGZyb20gJy4vc3JjL21haW4uanMnXG5cbmNvbnN0IGluc3RhbGwgPSBmdW5jdGlvbiAoVnVlKSB7XG4gIFZ1ZS5jb21wb25lbnQoTW9kYWwubmFtZSwgUG9wb3Zlcilcbn1cblxuUG9wb3Zlci5pbnN0YWxsID0gaW5zdGFsbFxuXG5leHBvcnQgZGVmYXVsdCBQb3BvdmVyXG4iLCJpbXBvcnQgSXRlbSBmcm9tICcuLi8uLi9pdGVtJ1xuaW1wb3J0IHsgaXNEZWVwRXF1YWwgfSBmcm9tICcuLi8uLi8uLi91dGlscy9pcydcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnc3dDaGVja2JveCcsXG4gIGNvbXBvbmVudHM6IHsgSXRlbSB9LFxuICBwcm9wczoge1xuICAgIHZhbHVlOiBCb29sZWFuIHwgQXJyYXksXG4gICAgdmFsOiB7XG4gICAgICByZXF1aXJlZDogZmFsc2VcbiAgICB9LFxuICAgIGxhYmVsOiBTdHJpbmcsXG4gICAgZGlzYWJsZWQ6IEJvb2xlYW4sXG4gICAgY29sb3I6IFN0cmluZyxcbiAgICBwcmltYXJ5OiBCb29sZWFuLFxuICAgIG5lZ2F0aXZlOiBCb29sZWFuLFxuICAgIHBvc2l0aXZlOiBCb29sZWFuLFxuICAgIHdhcm5pbmc6IEJvb2xlYW4sXG4gICAgbGVmdExhYmVsOiBCb29sZWFuLFxuICAgIGNvbG9yTGFiZWw6IEJvb2xlYW4sXG4gICAga2VlcENvbG9yOiBCb29sZWFuXG4gIH0sXG4gIGRhdGE6ICgpID0+ICh7XG4gICAgcGFyZW50OiB2b2lkIDBcbiAgfSksXG4gIGNvbXB1dGVkOiB7XG4gICAgbW9kZWwoKSB7XG4gICAgICByZXR1cm4gdGhpcy5wYXJlbnQgPT09IHZvaWQgMCA/IHRoaXMudmFsdWUgOiB0aGlzLnBhcmVudC52YWx1ZVxuICAgIH0sXG4gICAgcGFyZW50RGlzYWJsZWQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5wYXJlbnQgJiYgdGhpcy5wYXJlbnQuZGlzYWJsZWRcbiAgICB9LFxuICAgIGNoZWNrZWQ6IHtcbiAgICAgIGdldCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYm9vbGVhbk1vZGUgPyB0aGlzLm1vZGVsIDogdGhpcy5nZXRDaGVja2VkKHRoaXMudmFsKVxuICAgICAgfSxcbiAgICAgIHNldCh2YWwpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzLnBhcmVudCA9PT0gdm9pZCAwID8gdGhpcyA6IHRoaXMucGFyZW50XG5cbiAgICAgICAgc2VsZi4kZW1pdChcbiAgICAgICAgICAnaW5wdXQnLFxuICAgICAgICAgIHRoaXMuZm9ybWF0VmFsdWUodmFsKVxuICAgICAgICApXG4gICAgICB9XG4gICAgfSxcbiAgICBpbm5lclZhbHVlKCkge1xuICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkodGhpcy5tb2RlbCkgPyB0aGlzLm1vZGVsIDogW3RoaXMubW9kZWxdXG4gICAgfSxcbiAgICBib29sZWFuTW9kZSgpIHtcbiAgICAgIHJldHVybiB0aGlzLnZhbCA9PT0gdm9pZCAwXG4gICAgfVxuICB9LFxuICB3YXRjaDoge30sXG4gIG1ldGhvZHM6IHtcbiAgICBnZXRDaGVja2VkKHZhbCkge1xuICAgICAgcmV0dXJuIHRoaXMuaW5uZXJWYWx1ZS5zb21lKHggPT4gaXNEZWVwRXF1YWwoeCwgdmFsKSlcbiAgICB9LFxuICAgIGZvcm1hdFZhbHVlKGNoZWNrZWQpIHtcbiAgICAgIGlmICh0aGlzLmJvb2xlYW5Nb2RlKSB7IHJldHVybiBjaGVja2VkIH1cbiAgICAgIGxldCByZXMgPSBbXVxuXG4gICAgICB0aGlzLmlubmVyVmFsdWUuZm9yRWFjaCh4ID0+IHtcbiAgICAgICAgaWYgKCFpc0RlZXBFcXVhbCh4LCB0aGlzLnZhbCkpIHtcbiAgICAgICAgICByZXMucHVzaCh4KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgaWYgKGNoZWNrZWQpIHsgcmVzLnB1c2godGhpcy52YWwpIH1cbiAgICAgIHJldHVybiByZXNcbiAgICB9LFxuICB9LFxuICByZW5kZXIoaCkge1xuICAgIGxldCBjaGVja2VkID0gdGhpcy5jaGVja2VkXG4gICAgbGV0IGNvbG9yTGFiZWwgPSBjaGVja2VkICYmIHRoaXMuY29sb3JMYWJlbFxuICAgIGxldCBjb2xvckNoZWNrYm94ID0gY2hlY2tlZCB8fCB0aGlzLmtlZXBDb2xvclxuICAgIGxldCBnZXRMYWJlbCA9ICgpID0+IFtoKCdkaXYnLCB7XG4gICAgICBzdGF0aWNDbGFzczogJ3N3LWNoZWNrYm94X190ZXh0IG1hcmdpbi1taW4nLFxuICAgICAgY2xhc3M6IHtcbiAgICAgICAgJ2NvbG9yLXByaW1hcnknOiBjb2xvckxhYmVsID8gdGhpcy5wcmltYXJ5IDogdm9pZCAwLFxuICAgICAgICAnY29sb3ItbmVnYXRpdmUnOiBjb2xvckxhYmVsID8gdGhpcy5uZWdhdGl2ZSA6IHZvaWQgMCxcbiAgICAgICAgJ2NvbG9yLXBvc2l0aXZlJzogY29sb3JMYWJlbCA/IHRoaXMucG9zaXRpdmUgOiB2b2lkIDAsXG4gICAgICAgICdjb2xvci13YXJuaW5nJzogY29sb3JMYWJlbCA/IHRoaXMud2FybmluZyA6IHZvaWQgMFxuICAgICAgfSxcbiAgICAgIHN0eWxlOiB7XG4gICAgICAgIGNvbG9yOiBjb2xvckxhYmVsID8gdGhpcy5jb2xvciA6IHZvaWQgMFxuICAgICAgfVxuICAgIH0sIHRoaXMubGFiZWwpXVxuXG4gICAgcmV0dXJuIGgoJ3N3LWl0ZW0nLCB7XG4gICAgICBzdGF0aWNDbGFzczogJ3N3LWNoZWNrYm94JyxcbiAgICAgIHJlZjogJ2NoZWNrYm94JyxcbiAgICAgIGNsYXNzOiB7XG4gICAgICAgIGRpc2FibGU6IHRoaXMuZGlzYWJsZWQgfHwgdGhpcy5wYXJlbnREaXNhYmxlZFxuICAgICAgfSxcbiAgICAgIG5hdGl2ZU9uOiB7XG4gICAgICAgIGNsaWNrOiAoKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHsgcmV0dXJuIH1cbiAgICAgICAgICB0aGlzLmNoZWNrZWQgPSAhY2hlY2tlZFxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgc2NvcGVkU2xvdHM6IHtcbiAgICAgICAgYmVmb3JlOiB0aGlzLmxhYmVsICYmIHRoaXMubGVmdExhYmVsID8gZ2V0TGFiZWwgOiB2b2lkIDAsXG4gICAgICAgIGRlZmF1bHQ6ICgpID0+IFtoKCdzdy1pY29uJywge1xuICAgICAgICAgIHN0YXRpY0NsYXNzOiAnbWFyZ2luLW1pbicsXG4gICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIG9wYWNpdHk6IGNoZWNrZWQgPyAxIDogMC42XG4gICAgICAgICAgfSxcbiAgICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgc2l6ZTogJzIwcHgnLFxuICAgICAgICAgICAgbmFtZTogY2hlY2tlZCA/ICdjaGVja19ib3gnIDogJ2NoZWNrX2JveF9vdXRsaW5lX2JsYW5rJyxcbiAgICAgICAgICAgIGNvbG9yOiBjb2xvckNoZWNrYm94ID8gdGhpcy5jb2xvciA6IHZvaWQgMCxcbiAgICAgICAgICAgIHByaW1hcnk6IGNvbG9yQ2hlY2tib3ggPyB0aGlzLnByaW1hcnkgOiB2b2lkIDAsXG4gICAgICAgICAgICBuZWdhdGl2ZTogY29sb3JDaGVja2JveCA/IHRoaXMubmVnYXRpdmUgOiB2b2lkIDAsXG4gICAgICAgICAgICBwb3NpdGl2ZTogY29sb3JDaGVja2JveCA/IHRoaXMucG9zaXRpdmUgOiB2b2lkIDAsXG4gICAgICAgICAgICB3YXJuaW5nOiBjb2xvckNoZWNrYm94ID8gdGhpcy53YXJuaW5nIDogdm9pZCAwXG4gICAgICAgICAgfVxuICAgICAgICB9KV0sXG4gICAgICAgIGFmdGVyOiB0aGlzLmxhYmVsICYmICF0aGlzLmxlZnRMYWJlbCA/IGdldExhYmVsIDogdm9pZCAwXG4gICAgICB9XG4gICAgfSlcbiAgfVxufSIsImltcG9ydCBDaGVja2JveCBmcm9tICcuL3NyYy9tYWluLmpzJ1xuXG5jb25zdCBpbnN0YWxsID0gZnVuY3Rpb24gKFZ1ZSkge1xuICBWdWUuY29tcG9uZW50KENoZWNrYm94Lm5hbWUsIENoZWNrYm94KVxufVxuXG5DaGVja2JveC5pbnN0YWxsID0gaW5zdGFsbFxuXG5leHBvcnQgZGVmYXVsdCBDaGVja2JveFxuIiwiXG5leHBvcnQgZGVmYXVsdCB7XG4gIGRhdGE6ICgpID0+ICh7fSksXG4gIHdhdGNoOiB7fSxcbiAgY29tcHV0ZWQ6IHt9LFxuICBtZXRob2RzOiB7XG4gICAgc2h1dHRsZShfdGhpcykge1xuICAgICAgbGV0IHNlbGYgPSBfdGhpcyB8fCB0aGlzXG5cbiAgICAgIHNlbGYuJGNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICBpZiAoY2hpbGQuJHJlZnNbdGhpcy5zaHV0dGxlUmVmXSAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgY2hpbGQucGFyZW50ID0gdGhpc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc2h1dHRsZShjaGlsZClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH0sXG4gIG1vdW50ZWQoKSB7XG4gICAgdGhpcy5zaHV0dGxlKClcbiAgfVxufVxuIiwiaW1wb3J0IEZpZWxkIGZyb20gJy4uLy4uL2ZpZWxkJ1xuaW1wb3J0IFNodXR0bGVNaXhpbiBmcm9tICcuLi8uLi8uLi9taXhpbnMvc2h1dHRsZSdcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnc3dDaGVja2JveEdyb3VwJyxcbiAgbWl4aW5zOiBbRmllbGQsIFNodXR0bGVNaXhpbl0sIC8vIGZvY3VzZWQsZGlzYWJsZWQsc2h1dHRsZVJlZlxuICBwcm9wczoge1xuICAgIHZhbHVlOiBCb29sZWFuIHwgQXJyYXlcbiAgfSxcbiAgZGF0YTogKCkgPT4gKHtcbiAgICBpbm5lclBvaW50ZXI6IHRydWUsXG4gICAgc2h1dHRsZVJlZjogJ2NoZWNrYm94J1xuICB9KSxcbiAgY29tcHV0ZWQ6IHt9LFxuICB3YXRjaDoge30sXG4gIG1ldGhvZHM6IHt9XG59IiwiaW1wb3J0IENoZWNrYm94R3JvdXAgZnJvbSAnLi9zcmMvbWFpbi5qcydcblxuY29uc3QgaW5zdGFsbCA9IGZ1bmN0aW9uIChWdWUpIHtcbiAgVnVlLmNvbXBvbmVudChDaGVja2JveEdyb3VwLm5hbWUsIENoZWNrYm94R3JvdXApXG59XG5cbkNoZWNrYm94R3JvdXAuaW5zdGFsbCA9IGluc3RhbGxcblxuZXhwb3J0IGRlZmF1bHQgQ2hlY2tib3hHcm91cFxuIiwiaW1wb3J0IEl0ZW0gZnJvbSAnLi4vLi4vaXRlbSdcbmltcG9ydCB7IGlzRGVlcEVxdWFsIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvaXMnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3N3UmFkaW8nLFxuICBjb21wb25lbnRzOiB7IEl0ZW0gfSxcbiAgcHJvcHM6IHtcbiAgICB2YWx1ZToge30sXG4gICAgdmFsOiB7XG4gICAgICByZXF1aXJlZDogdHJ1ZVxuICAgIH0sXG4gICAgbGFiZWw6IFN0cmluZyxcbiAgICBkaXNhYmxlZDogQm9vbGVhbixcbiAgICBjb2xvcjogU3RyaW5nLFxuICAgIHByaW1hcnk6IEJvb2xlYW4sXG4gICAgbmVnYXRpdmU6IEJvb2xlYW4sXG4gICAgcG9zaXRpdmU6IEJvb2xlYW4sXG4gICAgd2FybmluZzogQm9vbGVhbixcbiAgICBsZWZ0TGFiZWw6IEJvb2xlYW4sXG4gICAgY29sb3JMYWJlbDogQm9vbGVhbixcbiAgICBrZWVwQ29sb3I6IEJvb2xlYW5cbiAgfSxcbiAgZGF0YTogKCkgPT4gKHtcbiAgICBwYXJlbnQ6IHZvaWQgMFxuICB9KSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBtb2RlbCgpIHtcbiAgICAgIHJldHVybiB0aGlzLnBhcmVudCA9PT0gdm9pZCAwID8gdGhpcy52YWx1ZSA6IHRoaXMucGFyZW50LnZhbHVlXG4gICAgfSxcbiAgICBwYXJlbnREaXNhYmxlZCgpIHtcbiAgICAgIHJldHVybiB0aGlzLnBhcmVudCAmJiB0aGlzLnBhcmVudC5kaXNhYmxlZFxuICAgIH0sXG4gICAgY2hlY2tlZDoge1xuICAgICAgZ2V0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDaGVja2VkKHRoaXMudmFsKVxuICAgICAgfSxcbiAgICAgIHNldCgpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzLnBhcmVudCA9PT0gdm9pZCAwID8gdGhpcyA6IHRoaXMucGFyZW50XG5cbiAgICAgICAgc2VsZi4kZW1pdChcbiAgICAgICAgICAnaW5wdXQnLFxuICAgICAgICAgIHRoaXMudmFsXG4gICAgICAgIClcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIHdhdGNoOiB7fSxcbiAgbWV0aG9kczoge1xuICAgIGdldENoZWNrZWQodmFsKSB7XG4gICAgICByZXR1cm4gaXNEZWVwRXF1YWwodGhpcy5tb2RlbCwgdmFsKVxuICAgIH0sXG4gIH0sXG4gIHJlbmRlcihoKSB7XG4gICAgbGV0IGNoZWNrZWQgPSB0aGlzLmNoZWNrZWRcbiAgICBsZXQgY29sb3JMYWJlbCA9IGNoZWNrZWQgJiYgdGhpcy5jb2xvckxhYmVsXG4gICAgbGV0IGNvbG9yUmFkaW8gPSBjaGVja2VkIHx8IHRoaXMua2VlcENvbG9yXG4gICAgbGV0IGdldExhYmVsID0gKCkgPT4gW2goJ2RpdicsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiAnc3ctcmFkaW9fX3RleHQgbWFyZ2luLW1pbicsXG4gICAgICBjbGFzczoge1xuICAgICAgICAnY29sb3ItcHJpbWFyeSc6IGNvbG9yTGFiZWwgPyB0aGlzLnByaW1hcnkgOiB2b2lkIDAsXG4gICAgICAgICdjb2xvci1uZWdhdGl2ZSc6IGNvbG9yTGFiZWwgPyB0aGlzLm5lZ2F0aXZlIDogdm9pZCAwLFxuICAgICAgICAnY29sb3ItcG9zaXRpdmUnOiBjb2xvckxhYmVsID8gdGhpcy5wb3NpdGl2ZSA6IHZvaWQgMCxcbiAgICAgICAgJ2NvbG9yLXdhcm5pbmcnOiBjb2xvckxhYmVsID8gdGhpcy53YXJuaW5nIDogdm9pZCAwXG4gICAgICB9LFxuICAgICAgc3R5bGU6IHtcbiAgICAgICAgY29sb3I6IGNvbG9yTGFiZWwgPyB0aGlzLmNvbG9yIDogdm9pZCAwXG4gICAgICB9XG4gICAgfSwgdGhpcy5sYWJlbCldXG5cbiAgICByZXR1cm4gaCgnc3ctaXRlbScsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiAnc3ctcmFkaW8nLFxuICAgICAgcmVmOiAncmFkaW8nLFxuICAgICAgY2xhc3M6IHtcbiAgICAgICAgZGlzYWJsZTogdGhpcy5kaXNhYmxlZCB8fCB0aGlzLnBhcmVudERpc2FibGVkXG4gICAgICB9LFxuICAgICAgbmF0aXZlT246IHtcbiAgICAgICAgY2xpY2s6ICgpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCBjaGVja2VkKSB7IHJldHVybiB9XG4gICAgICAgICAgdGhpcy5jaGVja2VkID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgc2NvcGVkU2xvdHM6IHtcbiAgICAgICAgYmVmb3JlOiB0aGlzLmxhYmVsICYmIHRoaXMubGVmdExhYmVsID8gZ2V0TGFiZWwgOiB2b2lkIDAsXG4gICAgICAgIGRlZmF1bHQ6ICgpID0+IFtoKCdzdy1pY29uJywge1xuICAgICAgICAgIHN0YXRpY0NsYXNzOiAnbWFyZ2luLW1pbicsXG4gICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIG9wYWNpdHk6IGNoZWNrZWQgPyAxIDogMC42XG4gICAgICAgICAgfSxcbiAgICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgc2l6ZTogJzIwcHgnLFxuICAgICAgICAgICAgbmFtZTogY2hlY2tlZCA/ICdyYWRpb19idXR0b25fY2hlY2tlZCcgOiAncmFkaW9fYnV0dG9uX3VuY2hlY2tlZCcsXG4gICAgICAgICAgICBjb2xvcjogY29sb3JSYWRpbyA/IHRoaXMuY29sb3IgOiB2b2lkIDAsXG4gICAgICAgICAgICBwcmltYXJ5OiBjb2xvclJhZGlvID8gdGhpcy5wcmltYXJ5IDogdm9pZCAwLFxuICAgICAgICAgICAgbmVnYXRpdmU6IGNvbG9yUmFkaW8gPyB0aGlzLm5lZ2F0aXZlIDogdm9pZCAwLFxuICAgICAgICAgICAgcG9zaXRpdmU6IGNvbG9yUmFkaW8gPyB0aGlzLnBvc2l0aXZlIDogdm9pZCAwLFxuICAgICAgICAgICAgd2FybmluZzogY29sb3JSYWRpbyA/IHRoaXMud2FybmluZyA6IHZvaWQgMFxuICAgICAgICAgIH1cbiAgICAgICAgfSldLFxuICAgICAgICBhZnRlcjogdGhpcy5sYWJlbCAmJiAhdGhpcy5sZWZ0TGFiZWwgPyBnZXRMYWJlbCA6IHZvaWQgMFxuICAgICAgfVxuICAgIH0pXG4gIH1cbn0iLCJpbXBvcnQgUmFkaW8gZnJvbSAnLi9zcmMvbWFpbi5qcydcblxuY29uc3QgaW5zdGFsbCA9IGZ1bmN0aW9uIChWdWUpIHtcbiAgVnVlLmNvbXBvbmVudChSYWRpby5uYW1lLCBSYWRpbylcbn1cblxuUmFkaW8uaW5zdGFsbCA9IGluc3RhbGxcblxuZXhwb3J0IGRlZmF1bHQgUmFkaW9cbiIsImltcG9ydCBGaWVsZCBmcm9tICcuLi8uLi9maWVsZCdcbmltcG9ydCBTaHV0dGxlTWl4aW4gZnJvbSAnLi4vLi4vLi4vbWl4aW5zL3NodXR0bGUnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3N3UmFkaW9Hcm91cCcsXG4gIG1peGluczogW0ZpZWxkLCBTaHV0dGxlTWl4aW5dLCAvLyBmb2N1c2VkLGRpc2FibGVkLHNodXR0bGVSZWZcbiAgcHJvcHM6IHtcbiAgICB2YWx1ZToge1xuICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICB9XG4gIH0sXG4gIGRhdGE6ICgpID0+ICh7XG4gICAgaW5uZXJQb2ludGVyOiB0cnVlLFxuICAgIHNodXR0bGVSZWY6ICdyYWRpbydcbiAgfSksXG4gIGNvbXB1dGVkOiB7fSxcbiAgd2F0Y2g6IHt9LFxuICBtZXRob2RzOiB7fVxufSIsImltcG9ydCBSYWRpb0dyb3VwIGZyb20gJy4vc3JjL21haW4uanMnXG5cbmNvbnN0IGluc3RhbGwgPSBmdW5jdGlvbiAoVnVlKSB7XG4gIFZ1ZS5jb21wb25lbnQoUmFkaW9Hcm91cC5uYW1lLCBSYWRpb0dyb3VwKVxufVxuXG5SYWRpb0dyb3VwLmluc3RhbGwgPSBpbnN0YWxsXG5cbmV4cG9ydCBkZWZhdWx0IFJhZGlvR3JvdXBcbiIsIi8qKlxuICpcbiAqXG4gKiBAcGFyYW0geyp9IHRvdGFsICDliIbpobXmgLvmlbBcbiAqIEBwYXJhbSB7Kn0gY3VyICDlvZPliY3pobXpnaIgIDNcbiAqIEBwYXJhbSB7Kn0gYXJvdW5kICAgMSAyIDMgNCA1ICAgYXJvdW5kID0gMlxuICogQHJldHVybnNcbiAqL1xuY29uc3QgbWFrZVJlc3VsdCA9ICh0b3RhbCxjdXIsYXJvdW5kKSA9PiB7XG4gIGxldCByZXN1bHQgPSBbXTtcbiAgbGV0IGJhc2VDb3VudCA9IGFyb3VuZCAqIDIgKyAxICsgMiArIDIgKyAyOyAvL+aAu+WFseWFg+e0oOS4quaVsFxuICBsZXQgc3VycGx1cyA9IGJhc2VDb3VudCAtIDQ7IC8v5Y+q5Ye6546w5LiA5Liq55yB55Wl5Y+3IOWJqeS9meWFg+e0oOS4quaVsFxuICBsZXQgc3RhcnRQb3NpdGlvbiA9IDEgKyAyICsgYXJvdW5kLGVuZFBvc2l0aW9uID0gdG90YWwgLSAyIC0gYXJvdW5kO1xuXG4gIGlmKHRvdGFsIDw9IGJhc2VDb3VudCAtIDIpeyAvL+WFqOmDqOaYvuekuiDkuI3lh7rnjrDnnIHnlaXlj7dcbiAgICAgIHJlc3VsdCA9ICBBcnJheS5mcm9tKHtsZW5ndGg6IHRvdGFsfSwgKHYsIGkpID0+IGkgKyAxKTtcbiAgfWVsc2V7IC8v6ZyA6KaB5Ye6546w55yB55Wl5Y+3XG4gICAgICBpZihjdXIgPD0gc3RhcnRQb3NpdGlvbil7IC8vMS7lj6rmnInlkI7pnaLlh7rnjrDnnIHnlaXlj7dcbiAgICAgICAgICByZXN1bHQgPSBbLi4uQXJyYXkuZnJvbSh7bGVuZ3RoOiBzdXJwbHVzfSwgKHYsIGkpID0+IGkgKyAxKSxcIsK3wrfCt1wiLHRvdGFsXVxuICAgICAgfWVsc2UgaWYoY3VyID49IGVuZFBvc2l0aW9uKSB7IC8vMi7lj6rmnInliY3ovrnlh7rnjrDnnIHnlaXlj7dcbiAgICAgICAgICByZXN1bHQgPSBbMSwnwrfCt8K3JywuLi5BcnJheS5mcm9tKHtsZW5ndGg6IHN1cnBsdXN9LCAodiwgaSkgPT4gdG90YWwgLSBzdXJwbHVzICsgaSArIDEpXVxuICAgICAgfWVsc2V7IC8vMy7kuKTovrnpg73mnInnnIHnlaXlj7dcbiAgICAgICAgICByZXN1bHQgPSBbMSwnwrfCt8K3JywuLi5BcnJheS5mcm9tKHtsZW5ndGg6IGFyb3VuZCAqIDIgKyAxfSwgKHYsIGkpID0+IGN1ciAtIGFyb3VuZCArIGkpLCfCt8K3wrcnLHRvdGFsXVxuICAgICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5leHBvcnQgZGVmYXVsdCBtYWtlUmVzdWx0IiwiPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwic3ctcGFnaW5hdGlvblwiPlxuICAgIDxkaXYgY2xhc3M9XCJzdy1wYWdpbmF0aW9uLXRvdGFsXCIgdi1pZj1cImxheW91dC5pbmRleE9mKCd0b3RhbCcpID4gLTFcIj4gXG4gICAgICB7e2DlhbEke3RvdGFsfeadoWB9fVxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJzdy1wYWdpbmF0aW9uLXNlbGVjdFwiIHYtaWY9XCJsYXlvdXQuaW5kZXhPZignc2VsZWN0JykgPiAtMVwiPlxuICAgICAgPHN3LXNlbGVjdCB2LW1vZGVsPVwicGFnZVNpemVWYWx1ZVwiIDpvcHRpb25zPVwic2VsZWN0T3B0aW9uXCIgc2VsZWN0ZWRGaWxsZWQgYm9yZGVyZWQgbWluaSBzZWxlY3RlZFN0eWxlPVwibm9uZVwiPjwvc3ctc2VsZWN0PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJzdy1wYWdpbmF0aW9uLXBhZ2VcIj5cbiAgICAgIDxzcGFuIGNsYXNzPVwic3ctcGFnaW5hdGlvbi1wYWdlLWl0ZW1cIiBAY2xpY2s9XCJoYW5kbGVDbGlja0Fycm93KCdsZWZ0JylcIj48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zIHN3LXBhZ2luYXRpb24tcGFnZS1pdGVtLWljb25cIj5rZXlib2FyZF9hcnJvd19sZWZ0PC9pPjwvc3Bhbj5cbiAgICAgIDxzcGFuIHYtZm9yPVwiKGl0ZW0sIGluZGV4KSBpbiBwYWdpbmF0aW9uTGlzdFwiIDpjbGFzcz1cIlsnc3ctcGFnaW5hdGlvbi1wYWdlLWl0ZW0nLCBjdXJyZW50UGFnZVZhbHVlID09PSBpdGVtID8gJ2FjdGl2ZScgOiAnJ11cIiBAY2xpY2s9XCJoYW5kbGVDbGlja1BhZ2UoaXRlbSwgaW5kZXgpXCI+XG4gICAgICAgIDxpIHYtaWY9XCJpdGVtID09PSAnwrfCt8K3J1wiIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgc3ctcGFnaW5hdGlvbi1wYWdlLWl0ZW0taWNvblwiPm1vcmVfaG9yaXo8L2k+XG4gICAgICAgIDxzcGFuIHYtZWxzZT5cbiAgICAgICAgICB7e2l0ZW19fVxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cInN3LXBhZ2luYXRpb24tcGFnZS1pdGVtXCIgQGNsaWNrPVwiaGFuZGxlQ2xpY2tBcnJvdygncmlnaHQnKVwiPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgc3ctcGFnaW5hdGlvbi1wYWdlLWl0ZW0taWNvblwiPmtleWJvYXJkX2Fycm93X3JpZ2h0PC9pPjwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwic3ctcGFnaW5hdGlvbi1nb3RvXCIgdi1pZj1cImxheW91dC5pbmRleE9mKCdnb3RvJykgPiAtMVwiPlxuICAgICAgPHNwYW4+5YmN5b6APC9zcGFuPlxuICAgICAgPGRpdiBjbGFzcz1cInN3LXBhZ2luYXRpb24tZ290by1pbnB1dFwiPlxuICAgICAgICA8c3ctaW5wdXQgYm9yZGVyZWQgdi1tb2RlbD0naW5wdXRWYWx1ZScgQGtleXVwLmVudGVyLm5hdGl2ZT1cImhhbmRsZUVudGVyR290b1wiIG1pbmkgc3R5bGU9XCJ3aWR0aDo0MHB4XCI+PC9zdy1pbnB1dD5cbiAgICAgIDwvZGl2PlxuICAgICAgPHNwYW4+6aG1PC9zcGFuPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgc3dTZWxlY3QgZnJvbSAnLi4vLi4vc2VsZWN0L2luZGV4J1xuaW1wb3J0IG1ha2VSZXN1bHQgZnJvbSAnLi9wYWdpbmF0aW9uJ1xuaW1wb3J0IHN3SW5wdXQgZnJvbSAnLi4vLi4vaW5wdXQvaW5kZXgnXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdzd1BhZ2luYXRpb24nLFxuICBkYXRhICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY3VycmVudFBhZ2VWYWx1ZTogdGhpcy5jdXJyZW50UGFnZSxcbiAgICAgIHBhZ2VUb3RhbDogJycsXG4gICAgICBwYWdlU2l6ZVZhbHVlOiB0aGlzLnBhZ2VTaXplLFxuICAgICAgaW5wdXRWYWx1ZTogJzEnXG4gICAgfVxuICB9LFxuICBwcm9wczoge1xuICAgIHRvdGFsOiB7XG4gICAgICB0eXBlOiBOdW1iZXJcbiAgICB9LFxuICAgIHBhZ2VTaXplOiB7XG4gICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICBkZWZhdWx0OiAyMFxuICAgIH0sXG4gICAgb3B0aW9uczoge1xuICAgICAgdHlwZTogQXJyYXksXG4gICAgICBkZWZhdWx0OiBbMjAsIDQwLCA2MCwgODBdXG4gICAgfSxcbiAgICBjdXJyZW50UGFnZToge1xuICAgICAgdHlwZTogTnVtYmVyXG4gICAgfSxcbiAgICBhcm91bmQ6IHtcbiAgICAgIHR5cGU6IE51bWJlclxuICAgIH0sXG4gICAgbGF5b3V0OiB7XG4gICAgICB0eXBlOiBTdHJpbmdcbiAgICB9XG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgY3VycmVudFBhZ2VWYWx1ZSgpIHtcbiAgICAgIHRoaXMuJGVtaXQoJ2N1cnJlbnQtY2hhbmdlJywgdGhpcy5jdXJyZW50UGFnZVZhbHVlKVxuICAgIH0sXG4gICAgcGFnZVNpemVWYWx1ZSgpIHtcbiAgICAgIHRoaXMuJGVtaXQoJ3NpemUtY2hhbmdlJywgdGhpcy5wYWdlU2l6ZVZhbHVlKVxuICAgIH1cbiAgfSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBzZWxlY3RPcHRpb24oKSB7XG4gICAgICBsZXQgYXJ5ID0gW11cbiAgICAgIHRoaXMub3B0aW9ucy5tYXAoaT0+e1xuICAgICAgICBsZXQgaXRlbSA9IHt9XG4gICAgICAgIGl0ZW0ubmFtZSA9IGAke2l95p2hL+mhtWBcbiAgICAgICAgaXRlbS52YWx1ZSA9IGlcbiAgICAgICAgYXJ5LnB1c2goaXRlbSlcbiAgICAgIH0pXG4gICAgICByZXR1cm4gYXJ5XG4gICAgfSxcbiAgICBwYWdpbmF0aW9uTGlzdCgpIHtcbiAgICAgIGxldCBwYWdlVG90YWwgPSB0aGlzLnBhZ2VUb3RhbCA9IHRoaXMudG90YWwgLyB0aGlzLnBhZ2VTaXplVmFsdWVcbiAgICAgIGlmIChgJHtwYWdlVG90YWx9YC5pbmRleE9mKCcuJykgPiAtMSkge1xuICAgICAgICBwYWdlVG90YWwgPSB0aGlzLnBhZ2VUb3RhbCA9IHBhcnNlSW50KHBhZ2VUb3RhbCArIDEpXG4gICAgICB9XG4gICAgICBpZiAodGhpcy5jdXJyZW50UGFnZVZhbHVlID4gcGFnZVRvdGFsKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFBhZ2VWYWx1ZSA9IHBhZ2VUb3RhbFxuICAgICAgfVxuICAgICAgbGV0IHBhZ2VMaXN0ID0gbWFrZVJlc3VsdChwYWdlVG90YWwsIHRoaXMuY3VycmVudFBhZ2VWYWx1ZSwgdGhpcy5hcm91bmQpXG4gICAgICByZXR1cm4gcGFnZUxpc3RcbiAgICB9XG4gIH0sXG4gIGNvbXBvbmVudHM6IHtcbiAgICBzd1NlbGVjdCxcbiAgICBzd0lucHV0XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBoYW5kbGVFbnRlckdvdG8oKSB7XG4gICAgICBsZXQgcGFnZSA9IHBhcnNlSW50KHRoaXMuaW5wdXRWYWx1ZSlcbiAgICAgIGlmIChwYWdlIDwgMSkge1xuICAgICAgICB0aGlzLmlucHV0VmFsdWUgPSAnMSdcbiAgICAgIH1cbiAgICAgIGlmIChwYWdlID4gdGhpcy5wYWdlVG90YWwpIHtcbiAgICAgICAgdGhpcy5pbnB1dFZhbHVlID0gYCR7dGhpcy5wYWdlVG90YWx9YFxuICAgICAgfVxuICAgICAgdGhpcy5jdXJyZW50UGFnZVZhbHVlID0gcGFyc2VJbnQodGhpcy5pbnB1dFZhbHVlKVxuICAgICAgdGhpcy5pbnB1dFZhbHVlID0gYCR7cGFyc2VJbnQodGhpcy5pbnB1dFZhbHVlKX1gXG4gICAgfSxcbiAgICBoYW5kbGVDbGlja1BhZ2UoaXRlbSwgaW5kZXgpe1xuICAgICAgaWYgKGl0ZW0gPT09ICfCt8K3wrcnKSB7XG4gICAgICAgIGlmKGluZGV4ID09PSAxKXtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRQYWdlVmFsdWUgPSAzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jdXJyZW50UGFnZVZhbHVlID0gdGhpcy5wYWdlVG90YWwgLSAyXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY3VycmVudFBhZ2VWYWx1ZSA9IGl0ZW1cbiAgICAgIH1cbiAgICB9LFxuICAgIGhhbmRsZUNsaWNrQXJyb3cocGFyYW1zKSB7XG4gICAgICBpZiAocGFyYW1zID09PSAnbGVmdCcpIHtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFBhZ2VWYWx1ZSAhPT0gMSkge1xuICAgICAgICAgIHRoaXMuY3VycmVudFBhZ2VWYWx1ZSA9IHRoaXMuY3VycmVudFBhZ2VWYWx1ZSAtIDFcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgdGhpcy5jdXJyZW50UGFnZVZhbHVlID0gMVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50UGFnZVZhbHVlICE9PSB0aGlzLnBhZ2VUb3RhbCkge1xuICAgICAgICAgIHRoaXMuY3VycmVudFBhZ2VWYWx1ZSA9IHRoaXMuY3VycmVudFBhZ2VWYWx1ZSArIDFcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRQYWdlVmFsdWUgPSB0aGlzLnBhZ2VUb3RhbFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cblxuPHN0eWxlPlxuXG48L3N0eWxlPlxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBub3JtYWxpemVDb21wb25lbnQodGVtcGxhdGUsIHN0eWxlLCBzY3JpcHQsIHNjb3BlSWQsIGlzRnVuY3Rpb25hbFRlbXBsYXRlLCBtb2R1bGVJZGVudGlmaWVyXG4vKiBzZXJ2ZXIgb25seSAqL1xuLCBzaGFkb3dNb2RlLCBjcmVhdGVJbmplY3RvciwgY3JlYXRlSW5qZWN0b3JTU1IsIGNyZWF0ZUluamVjdG9yU2hhZG93KSB7XG4gIGlmICh0eXBlb2Ygc2hhZG93TW9kZSAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgY3JlYXRlSW5qZWN0b3JTU1IgPSBjcmVhdGVJbmplY3RvcjtcbiAgICBjcmVhdGVJbmplY3RvciA9IHNoYWRvd01vZGU7XG4gICAgc2hhZG93TW9kZSA9IGZhbHNlO1xuICB9IC8vIFZ1ZS5leHRlbmQgY29uc3RydWN0b3IgZXhwb3J0IGludGVyb3AuXG5cblxuICB2YXIgb3B0aW9ucyA9IHR5cGVvZiBzY3JpcHQgPT09ICdmdW5jdGlvbicgPyBzY3JpcHQub3B0aW9ucyA6IHNjcmlwdDsgLy8gcmVuZGVyIGZ1bmN0aW9uc1xuXG4gIGlmICh0ZW1wbGF0ZSAmJiB0ZW1wbGF0ZS5yZW5kZXIpIHtcbiAgICBvcHRpb25zLnJlbmRlciA9IHRlbXBsYXRlLnJlbmRlcjtcbiAgICBvcHRpb25zLnN0YXRpY1JlbmRlckZucyA9IHRlbXBsYXRlLnN0YXRpY1JlbmRlckZucztcbiAgICBvcHRpb25zLl9jb21waWxlZCA9IHRydWU7IC8vIGZ1bmN0aW9uYWwgdGVtcGxhdGVcblxuICAgIGlmIChpc0Z1bmN0aW9uYWxUZW1wbGF0ZSkge1xuICAgICAgb3B0aW9ucy5mdW5jdGlvbmFsID0gdHJ1ZTtcbiAgICB9XG4gIH0gLy8gc2NvcGVkSWRcblxuXG4gIGlmIChzY29wZUlkKSB7XG4gICAgb3B0aW9ucy5fc2NvcGVJZCA9IHNjb3BlSWQ7XG4gIH1cblxuICB2YXIgaG9vaztcblxuICBpZiAobW9kdWxlSWRlbnRpZmllcikge1xuICAgIC8vIHNlcnZlciBidWlsZFxuICAgIGhvb2sgPSBmdW5jdGlvbiBob29rKGNvbnRleHQpIHtcbiAgICAgIC8vIDIuMyBpbmplY3Rpb25cbiAgICAgIGNvbnRleHQgPSBjb250ZXh0IHx8IC8vIGNhY2hlZCBjYWxsXG4gICAgICB0aGlzLiR2bm9kZSAmJiB0aGlzLiR2bm9kZS5zc3JDb250ZXh0IHx8IC8vIHN0YXRlZnVsXG4gICAgICB0aGlzLnBhcmVudCAmJiB0aGlzLnBhcmVudC4kdm5vZGUgJiYgdGhpcy5wYXJlbnQuJHZub2RlLnNzckNvbnRleHQ7IC8vIGZ1bmN0aW9uYWxcbiAgICAgIC8vIDIuMiB3aXRoIHJ1bkluTmV3Q29udGV4dDogdHJ1ZVxuXG4gICAgICBpZiAoIWNvbnRleHQgJiYgdHlwZW9mIF9fVlVFX1NTUl9DT05URVhUX18gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGNvbnRleHQgPSBfX1ZVRV9TU1JfQ09OVEVYVF9fO1xuICAgICAgfSAvLyBpbmplY3QgY29tcG9uZW50IHN0eWxlc1xuXG5cbiAgICAgIGlmIChzdHlsZSkge1xuICAgICAgICBzdHlsZS5jYWxsKHRoaXMsIGNyZWF0ZUluamVjdG9yU1NSKGNvbnRleHQpKTtcbiAgICAgIH0gLy8gcmVnaXN0ZXIgY29tcG9uZW50IG1vZHVsZSBpZGVudGlmaWVyIGZvciBhc3luYyBjaHVuayBpbmZlcmVuY2VcblxuXG4gICAgICBpZiAoY29udGV4dCAmJiBjb250ZXh0Ll9yZWdpc3RlcmVkQ29tcG9uZW50cykge1xuICAgICAgICBjb250ZXh0Ll9yZWdpc3RlcmVkQ29tcG9uZW50cy5hZGQobW9kdWxlSWRlbnRpZmllcik7XG4gICAgICB9XG4gICAgfTsgLy8gdXNlZCBieSBzc3IgaW4gY2FzZSBjb21wb25lbnQgaXMgY2FjaGVkIGFuZCBiZWZvcmVDcmVhdGVcbiAgICAvLyBuZXZlciBnZXRzIGNhbGxlZFxuXG5cbiAgICBvcHRpb25zLl9zc3JSZWdpc3RlciA9IGhvb2s7XG4gIH0gZWxzZSBpZiAoc3R5bGUpIHtcbiAgICBob29rID0gc2hhZG93TW9kZSA/IGZ1bmN0aW9uICgpIHtcbiAgICAgIHN0eWxlLmNhbGwodGhpcywgY3JlYXRlSW5qZWN0b3JTaGFkb3codGhpcy4kcm9vdC4kb3B0aW9ucy5zaGFkb3dSb290KSk7XG4gICAgfSA6IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICBzdHlsZS5jYWxsKHRoaXMsIGNyZWF0ZUluamVjdG9yKGNvbnRleHQpKTtcbiAgICB9O1xuICB9XG5cbiAgaWYgKGhvb2spIHtcbiAgICBpZiAob3B0aW9ucy5mdW5jdGlvbmFsKSB7XG4gICAgICAvLyByZWdpc3RlciBmb3IgZnVuY3Rpb25hbCBjb21wb25lbnQgaW4gdnVlIGZpbGVcbiAgICAgIHZhciBvcmlnaW5hbFJlbmRlciA9IG9wdGlvbnMucmVuZGVyO1xuXG4gICAgICBvcHRpb25zLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcldpdGhTdHlsZUluamVjdGlvbihoLCBjb250ZXh0KSB7XG4gICAgICAgIGhvb2suY2FsbChjb250ZXh0KTtcbiAgICAgICAgcmV0dXJuIG9yaWdpbmFsUmVuZGVyKGgsIGNvbnRleHQpO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaW5qZWN0IGNvbXBvbmVudCByZWdpc3RyYXRpb24gYXMgYmVmb3JlQ3JlYXRlIGhvb2tcbiAgICAgIHZhciBleGlzdGluZyA9IG9wdGlvbnMuYmVmb3JlQ3JlYXRlO1xuICAgICAgb3B0aW9ucy5iZWZvcmVDcmVhdGUgPSBleGlzdGluZyA/IFtdLmNvbmNhdChleGlzdGluZywgaG9vaykgOiBbaG9va107XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHNjcmlwdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBub3JtYWxpemVDb21wb25lbnQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1ub3JtYWxpemUtY29tcG9uZW50LmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNPbGRJRSA9IHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIC9tc2llIFs2LTldXFxcXGIvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKTtcbmZ1bmN0aW9uIGNyZWF0ZUluamVjdG9yKGNvbnRleHQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChpZCwgc3R5bGUpIHtcbiAgICByZXR1cm4gYWRkU3R5bGUoaWQsIHN0eWxlKTtcbiAgfTtcbn1cbnZhciBIRUFEID0gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xudmFyIHN0eWxlcyA9IHt9O1xuXG5mdW5jdGlvbiBhZGRTdHlsZShpZCwgY3NzKSB7XG4gIHZhciBncm91cCA9IGlzT2xkSUUgPyBjc3MubWVkaWEgfHwgJ2RlZmF1bHQnIDogaWQ7XG4gIHZhciBzdHlsZSA9IHN0eWxlc1tncm91cF0gfHwgKHN0eWxlc1tncm91cF0gPSB7XG4gICAgaWRzOiBuZXcgU2V0KCksXG4gICAgc3R5bGVzOiBbXVxuICB9KTtcblxuICBpZiAoIXN0eWxlLmlkcy5oYXMoaWQpKSB7XG4gICAgc3R5bGUuaWRzLmFkZChpZCk7XG4gICAgdmFyIGNvZGUgPSBjc3Muc291cmNlO1xuXG4gICAgaWYgKGNzcy5tYXApIHtcbiAgICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLmNocm9tZS5jb20vZGV2dG9vbHMvZG9jcy9qYXZhc2NyaXB0LWRlYnVnZ2luZ1xuICAgICAgLy8gdGhpcyBtYWtlcyBzb3VyY2UgbWFwcyBpbnNpZGUgc3R5bGUgdGFncyB3b3JrIHByb3Blcmx5IGluIENocm9tZVxuICAgICAgY29kZSArPSAnXFxuLyojIHNvdXJjZVVSTD0nICsgY3NzLm1hcC5zb3VyY2VzWzBdICsgJyAqLyc7IC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XG5cbiAgICAgIGNvZGUgKz0gJ1xcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsJyArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzcy5tYXApKSkpICsgJyAqLyc7XG4gICAgfVxuXG4gICAgaWYgKCFzdHlsZS5lbGVtZW50KSB7XG4gICAgICBzdHlsZS5lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgIHN0eWxlLmVsZW1lbnQudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgICBpZiAoY3NzLm1lZGlhKSBzdHlsZS5lbGVtZW50LnNldEF0dHJpYnV0ZSgnbWVkaWEnLCBjc3MubWVkaWEpO1xuICAgICAgSEVBRC5hcHBlbmRDaGlsZChzdHlsZS5lbGVtZW50KTtcbiAgICB9XG5cbiAgICBpZiAoJ3N0eWxlU2hlZXQnIGluIHN0eWxlLmVsZW1lbnQpIHtcbiAgICAgIHN0eWxlLnN0eWxlcy5wdXNoKGNvZGUpO1xuICAgICAgc3R5bGUuZWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBzdHlsZS5zdHlsZXMuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgaW5kZXggPSBzdHlsZS5pZHMuc2l6ZSAtIDE7XG4gICAgICB2YXIgdGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjb2RlKTtcbiAgICAgIHZhciBub2RlcyA9IHN0eWxlLmVsZW1lbnQuY2hpbGROb2RlcztcbiAgICAgIGlmIChub2Rlc1tpbmRleF0pIHN0eWxlLmVsZW1lbnQucmVtb3ZlQ2hpbGQobm9kZXNbaW5kZXhdKTtcbiAgICAgIGlmIChub2Rlcy5sZW5ndGgpIHN0eWxlLmVsZW1lbnQuaW5zZXJ0QmVmb3JlKHRleHROb2RlLCBub2Rlc1tpbmRleF0pO2Vsc2Ugc3R5bGUuZWxlbWVudC5hcHBlbmRDaGlsZCh0ZXh0Tm9kZSk7XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlSW5qZWN0b3I7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1icm93c2VyLmpzLm1hcFxuIiwiaW1wb3J0IFBhZ2luYXRpb24gZnJvbSAnLi9zcmMvbWFpbi52dWUnXG5cbmNvbnN0IGluc3RhbGwgPSBmdW5jdGlvbiAoVnVlKSB7XG4gIFZ1ZS5jb21wb25lbnQoUGFnaW5hdGlvbi5uYW1lLCBQYWdpbmF0aW9uKVxufVxuXG5QYWdpbmF0aW9uLmluc3RhbGwgPSBpbnN0YWxsXG5cbmV4cG9ydCBkZWZhdWx0IFBhZ2luYXRpb25cbiIsImV4cG9ydCBmdW5jdGlvbiBoYXNPd24ob2JqLCBrZXkpIHtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBpc1ZOb2RlKG5vZGUpIHtcbiAgcmV0dXJuIG5vZGUgIT09IG51bGwgJiYgdHlwZW9mIG5vZGUgPT09ICdvYmplY3QnICYmIGhhc093bihub2RlLCAnY29tcG9uZW50T3B0aW9ucycpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEZpcnN0Q29tcG9uZW50Q2hpbGQoY2hpbGRyZW4pIHtcbiAgcmV0dXJuIGNoaWxkcmVuICYmIGNoaWxkcmVuLmZpbHRlcihjID0+IGMgJiYgYy50YWcpWzBdO1xufTsiLCIvLyA8dGVtcGxhdGU+XG4vLyAgIDxkaXY+XG4vLyAgICAgPGJ1dHRvbiBAY2xpY2s9XCJoYW5kbGVCdG5cIj5jbGljazwvYnV0dG9uPlxuLy8gICAgIDx0cmFuc2l0aW9uIG5hbWU9J3N3LW5vdGlmaWNhdGlvbi1mYWRlJz5cbi8vICAgICAgIDxkaXYgdi1pZj1cInNob3dcIiBjbGFzcz1cInN3LW5vdGlmaWNhdGlvblwiPlxuLy8gICAgICAgICA8aDIgY2xhc3M9XCJ0aXRsZVwiPlxuLy8gICAgICAgICAgIOaPkOekujExMTFcbi8vICAgICAgICAgPC9oMj5cbi8vICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRlbnRcIj5cbi8vICAgICAgICAgICDov5nmmK/kuIDmnaHmtojmga9cbi8vICAgICAgICAgPC9kaXY+XG4vLyAgICAgICAgIDxkaXYgY2xhc3M9XCJjbG9zZVwiIEBjbGljaz1cImhhbmRsZUJ0blwiPlxuLy8gICAgICAgICAgIDxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5jbG9zZTwvaT5cbi8vICAgICAgICAgPC9kaXY+XG4vLyAgICAgICA8L2Rpdj5cbi8vICAgICA8L3RyYW5zaXRpb24+XG4vLyAgIDwvZGl2PlxuLy8gPC90ZW1wbGF0ZT5cbmltcG9ydCBWbm9kZSwgeyBpc1ZOb2RlIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvdmRvbSdcbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3N3Tm90aWZpY2F0aW9uJyxcbiAgZGF0YSAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHNob3c6IGZhbHNlLFxuICAgICAgdmVydGljYWxPZmZzZXQ6IDAsXG4gICAgICBvbkNsb3NlOiBudWxsLFxuICAgICAgcG9zaXRpb246ICd0b3AtcmlnaHQnLFxuICAgICAgdGl0bGU6ICcnLFxuICAgICAgY29udGVudDogJycsXG4gICAgICBzbG90OiBudWxsLFxuICAgICAgYmFja2dyb3VuZDogJyNmZmYnLFxuICAgICAgY2xvc2VDb2xvcjogJyM5MDkzOTknXG4gICAgfVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgaGFuZGxlQnRuKCkge1xuICAgICAgdGhpcy5zaG93ID0gZmFsc2VcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5vbkNsb3NlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMub25DbG9zZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgY29tcHV0ZWQ6IHtcbiAgICB2ZXJ0aWNhbFByb3BlcnR5KCkge1xuICAgICAgcmV0dXJuIC9edG9wLS8udGVzdCh0aGlzLnBvc2l0aW9uKSA/ICd0b3AnIDogJ2JvdHRvbSc7XG4gICAgfSxcblxuICAgIHBvc2l0aW9uU3R5bGUoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBbdGhpcy52ZXJ0aWNhbFByb3BlcnR5XTogYCR7IHRoaXMudmVydGljYWxPZmZzZXQgfXB4YCxcbiAgICAgIH07XG4gICAgfSxcbiAgICBnZXRWbm9kZSgpIHtcbiAgICAgIGlmIChpc1ZOb2RlKHRoaXMuc2xvdCkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2xvdFxuICAgICAgfVxuICAgICAgY29uc29sZS5lcnJvcignUGxlYXNlIGNoZWNrIHlvdXIgVm5vZGUgd3JpdGluZycpXG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgfSxcbiAgcmVuZGVyKGgpIHtcbiAgIHJldHVybiBoKCd0cmFuc2l0aW9uJyx7XG4gICAgICBhdHRyczoge1xuICAgICAgICBuYW1lOiAnc3ctbm90aWZpY2F0aW9uLWZhZGUnXG4gICAgICB9XG4gICAgfSwgW3RoaXMuc2hvdyA/IGgoJ2RpdicsIHtcbiAgICAgICAgICAgIGNsYXNzOiAnc3ctbm90aWZpY2F0aW9uJyxcbiAgICAgICAgICAgIHN0eWxlOiBPYmplY3QuYXNzaWduKHRoaXMucG9zaXRpb25TdHlsZSwgeyBiYWNrZ3JvdW5kOiB0aGlzLmJhY2tncm91bmQgfSlcbiAgICAgICAgICB9LCBbXG4gICAgICAgICAgICB0aGlzLmdldFZub2RlID8gJycgOiBoKCdoMicsIHtcbiAgICAgICAgICAgICAgY2xhc3M6ICd0aXRsZSdcbiAgICAgICAgICAgIH0sIHRoaXMudGl0bGUpLFxuICAgICAgICAgICAgdGhpcy5nZXRWbm9kZSA/IHRoaXMuZ2V0Vm5vZGUgOiBoKCdkaXYnLCB7XG4gICAgICAgICAgICAgIGNsYXNzOiAnY29udGVudCdcbiAgICAgICAgICAgIH0sdGhpcy5jb250ZW50KSxcbiAgICAgICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAgICAgY2xhc3M6ICdjbG9zZScsXG4gICAgICAgICAgICAgIHN0eWxlOiB7IGNvbG9yOiB0aGlzLmNsb3NlQ29sb3IgfSxcbiAgICAgICAgICAgIH0sIFtoKCdkaXYnLCB7XG4gICAgICAgICAgICAgICAgICBjbGFzczogJ21hdGVyaWFsLWljb25zJyxcbiAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgIGNsaWNrOiAoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQnRuKClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sICdjbG9zZScpXSlcbiAgICAgICAgICBdKVxuICAgIFxuICAgICAgICA6IHZvaWQgMF0gKVxuICB9XG59XG5cbiIsImltcG9ydCBWdWUgZnJvbSAndnVlJztcbmltcG9ydCBOb3RpZmljYXRpb24gZnJvbSAnLi9tYWluLmpzJztcblxuY29uc3QgTm90aWZpY2F0aW9uQ29uc3RydWN0b3IgPSBWdWUuZXh0ZW5kKE5vdGlmaWNhdGlvbilcblxubGV0IGluc3RhbmNlO1xubGV0IGluc3RhbmNlcyA9IFtdXG5sZXQgc2VlZCA9IDFcbmNvbnN0IE5vdGlmaWNhdGlvbkZ1biA9IGZ1bmN0aW9uKG9wdGlvbnMpe1xuICBpZiAoVnVlLnByb3RvdHlwZS4kaXNTZXJ2ZXIpIHJldHVybjtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGNvbnN0IHVzZXJPbkNsb3NlID0gb3B0aW9ucy5vbkNsb3NlO1xuICBjb25zdCBpZCA9ICdub3RpZmljYXRpb25fJyArIHNlZWQrKztcbiAgY29uc3QgcG9zaXRpb24gPSBvcHRpb25zLnBvc2l0aW9uIHx8ICd0b3AtcmlnaHQnO1xuICBvcHRpb25zLm9uQ2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgICBOb3RpZmljYXRpb24uY2xvc2UoaWQsIHVzZXJPbkNsb3NlKVxuICB9XG4gIGluc3RhbmNlID0gbmV3IE5vdGlmaWNhdGlvbkNvbnN0cnVjdG9yKHtcbiAgICBkYXRhOiBvcHRpb25zXG4gIH0pXG4gIGluc3RhbmNlLmlkID0gaWRcbiAgaW5zdGFuY2UuJG1vdW50KCk7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoaW5zdGFuY2UuJGVsKTtcbiAgaW5zdGFuY2Uuc2hvdyA9IHRydWVcbiAgbGV0IHZlcnRpY2FsT2Zmc2V0ID0gMFxuICBpbnN0YW5jZXMuZmlsdGVyKGl0ZW0gPT4gaXRlbS5wb3NpdGlvbiA9PT0gcG9zaXRpb24pLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgdmVydGljYWxPZmZzZXQgKz0gZWxlbWVudC4kZWwub2Zmc2V0SGVpZ2h0ICsgMTZcbiAgfSk7XG4gIHZlcnRpY2FsT2Zmc2V0ICs9IDE2XG4gIGluc3RhbmNlLnZlcnRpY2FsT2Zmc2V0ID0gdmVydGljYWxPZmZzZXRcbiAgaW5zdGFuY2VzLnB1c2goaW5zdGFuY2UpXG4gIGNvbnNvbGUubG9nKClcbiAgcmV0dXJuIGluc3RhbmNlO1xufSBcbk5vdGlmaWNhdGlvbi5jbG9zZSA9IGZ1bmN0aW9uKGlkLCB1c2VyT25DbG9zZSkge1xuICBsZXQgaW5kZXggPSAtMVxuICBjb25zdCBsZW4gPSBpbnN0YW5jZXMubGVuZ3RoXG4gIGNvbnN0IGluc3RhbmNlID0gaW5zdGFuY2VzLmZpbHRlcigoaW5zdGFuY2UsIGkpID0+IHtcbiAgICBpZiAoaW5zdGFuY2UuaWQgPT09IGlkKSB7XG4gICAgICBpbmRleCA9IGk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9KVswXVxuICBpZiAoIWluc3RhbmNlKSByZXR1cm5cblxuICBpZiAodHlwZW9mIHVzZXJPbkNsb3NlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdXNlck9uQ2xvc2UoaW5zdGFuY2UpO1xuICB9XG4gIGluc3RhbmNlcy5zcGxpY2UoaW5kZXgsIDEpXG5cbiAgaWYgKGxlbiA8PSAxKSByZXR1cm5cblxuICBjb25zdCBwb3NpdGlvbiA9IGluc3RhbmNlLnBvc2l0aW9uO1xuICBjb25zdCByZW1vdmVkSGVpZ2h0ID0gaW5zdGFuY2UuJGVsLm9mZnNldEhlaWdodFxuICBmb3IgKGxldCBpID0gaW5kZXg7IGkgPCBsZW4gLSAxOyBpKyspe1xuICAgIGlmIChpbnN0YW5jZXNbaV0ucG9zaXRpb24gPT09IHBvc2l0aW9uKSB7XG4gICAgICBpbnN0YW5jZXNbaV0uJGVsLnN0eWxlW2luc3RhbmNlLnZlcnRpY2FsUHJvcGVydHldID0gcGFyc2VJbnQoaW5zdGFuY2VzW2ldLiRlbC5zdHlsZVtpbnN0YW5jZS52ZXJ0aWNhbFByb3BlcnR5XSwgMTApIC0gcmVtb3ZlZEhlaWdodCAtIDE2ICsgJ3B4J1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBOb3RpZmljYXRpb25GdW4iLCJleHBvcnQgZnVuY3Rpb24gcG9zaXRpb24oZSkge1xuICBpZiAoZS50b3VjaGVzICYmIGUudG91Y2hlc1swXSkge1xuICAgIGUgPSBlLnRvdWNoZXNbMF1cbiAgfSBlbHNlIGlmIChlLmNoYW5nZWRUb3VjaGVzICYmIGUuY2hhbmdlZFRvdWNoZXNbMF0pIHtcbiAgICBlID0gZS5jaGFuZ2VkVG91Y2hlc1swXVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB0b3A6IGUuY2xpZW50WSxcbiAgICBsZWZ0OiBlLmNsaWVudFhcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RXZlbnRQYXRoKGUpIHtcbiAgaWYgKGUucGF0aCkge1xuICAgIHJldHVybiBlLnBhdGhcbiAgfVxuICBpZiAoZS5jb21wb3NlZFBhdGgpIHtcbiAgICByZXR1cm4gZS5jb21wb3NlZFBhdGgoKVxuICB9XG5cbiAgY29uc3QgcGF0aCA9IFtdXG4gIGxldCBlbCA9IGUudGFyZ2V0XG5cbiAgd2hpbGUgKGVsKSB7XG4gICAgcGF0aC5wdXNoKGVsKVxuXG4gICAgaWYgKGVsLnRhZ05hbWUgPT09ICdIVE1MJykge1xuICAgICAgcGF0aC5wdXNoKGRvY3VtZW50KVxuICAgICAgcGF0aC5wdXNoKHdpbmRvdylcbiAgICAgIHJldHVybiBwYXRoXG4gICAgfVxuXG4gICAgZWwgPSBlbC5wYXJlbnRFbGVtZW50XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0b3AoZSkge1xuICBlLnN0b3BQcm9wYWdhdGlvbigpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcmV2ZW50KGUpIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdG9wQW5kUHJldmVudChlKSB7XG4gIGUucHJldmVudERlZmF1bHQoKVxuICBlLnN0b3BQcm9wYWdhdGlvbigpXG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgcG9zaXRpb24sXG4gIGdldEV2ZW50UGF0aCxcbiAgc3RvcCxcbiAgcHJldmVudCxcbiAgc3RvcEFuZFByZXZlbnRcbn0iLCJpbXBvcnQgeyBjc3MgfSBmcm9tICcuLi8uLi8uLi91dGlscy9kb20uanMnXG5pbXBvcnQgeyBwb3NpdGlvbiB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2V2ZW50LmpzJ1xuXG5mdW5jdGlvbiBzaG93UmlwcGxlKGV2dCwgZWwsIGN0eCwgZm9yY2VDZW50ZXIpIHtcbiAgaWYgKGN0eC5tb2RpZmllcnMuc3RvcCA9PT0gdHJ1ZSkge1xuICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKVxuICB9XG5cbiAgbGV0IHsgY2VudGVyLCBjb2xvciB9ID0gY3R4Lm1vZGlmaWVyc1xuXG4gIGNlbnRlciA9IGNlbnRlciA9PT0gdHJ1ZSB8fCBmb3JjZUNlbnRlciA9PT0gdHJ1ZVxuXG4gIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgY29uc3QgaW5uZXJOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gIGNvbnN0IHBvcyA9IHBvc2l0aW9uKGV2dClcbiAgY29uc3QgeyBsZWZ0LCB0b3AsIHdpZHRoLCBoZWlnaHQgfSA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gIGNvbnN0IGRpYW1ldGVyID0gTWF0aC5zcXJ0KHdpZHRoICogd2lkdGggKyBoZWlnaHQgKiBoZWlnaHQpXG4gIGNvbnN0IHJhZGl1cyA9IGRpYW1ldGVyIC8gMlxuICBjb25zdCBjZW50ZXJYID0gYCR7KHdpZHRoIC0gZGlhbWV0ZXIpIC8gMn1weGBcbiAgY29uc3QgeCA9IGNlbnRlciA/IGNlbnRlclggOiBgJHtwb3MubGVmdCAtIGxlZnQgLSByYWRpdXN9cHhgXG4gIGNvbnN0IGNlbnRlclkgPSBgJHsoaGVpZ2h0IC0gZGlhbWV0ZXIpIC8gMn1weGBcbiAgY29uc3QgeSA9IGNlbnRlciA/IGNlbnRlclkgOiBgJHtwb3MudG9wIC0gdG9wIC0gcmFkaXVzfXB4YFxuICBsZXQgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBpbm5lck5vZGUuY2xhc3NMaXN0LmFkZCgnc3ctcmlwcGxlX19pbm5lci0tZW50ZXInKVxuICAgIGlubmVyTm9kZS5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlM2QoJHtjZW50ZXJYfSwgJHtjZW50ZXJZfSwgMCkgc2NhbGUzZCgxLCAxLCAxKWBcbiAgICBpbm5lck5vZGUuc3R5bGUub3BhY2l0eSA9IDAuMlxuXG4gICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlubmVyTm9kZS5jbGFzc0xpc3QucmVtb3ZlKCdzdy1yaXBwbGVfX2lubmVyLS1lbnRlcicpXG4gICAgICBpbm5lck5vZGUuY2xhc3NMaXN0LmFkZCgnc3ctcmlwcGxlX19pbm5lci0tbGVhdmUnKVxuICAgICAgaW5uZXJOb2RlLnN0eWxlLm9wYWNpdHkgPSAwXG5cbiAgICAgIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIG5vZGUgJiYgbm9kZS5yZW1vdmUoKVxuICAgICAgICBjdHguYWJvcnQgPSB2b2lkIDBcbiAgICAgIH0sIDI3NSlcbiAgICB9LCAyNTApXG4gIH0sIDUwKVxuXG4gIGlubmVyTm9kZS5jbGFzc05hbWUgPSAnc3ctcmlwcGxlX19pbm5lcidcbiAgY3NzKGlubmVyTm9kZSwge1xuICAgIGhlaWdodDogYCR7ZGlhbWV0ZXJ9cHhgLFxuICAgIHdpZHRoOiBgJHtkaWFtZXRlcn1weGAsXG4gICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlM2QoJHt4fSwgJHt5fSwgMCkgc2NhbGUzZCgwLjIsIDAuMiwgMSlgLFxuICAgIG9wYWNpdHk6IDBcbiAgfSlcbiAgaWYgKGNvbG9yKSB7IGNzcyhub2RlLCB7IGNvbG9yOiBjb2xvciB9KSB9XG4gIG5vZGUuY2xhc3NOYW1lID0gYHN3LXJpcHBsZWBcbiAgbm9kZS5hcHBlbmRDaGlsZChpbm5lck5vZGUpXG4gIGVsLmFwcGVuZENoaWxkKG5vZGUpXG5cbiAgY3R4LmFib3J0ID0gKCkgPT4ge1xuICAgIG5vZGUgJiYgbm9kZS5yZW1vdmUoKVxuICAgIGNsZWFyVGltZW91dCh0aW1lcilcbiAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGVDdHgoY3R4LCB7IHZhbHVlLCBtb2RpZmllcnMsIGFyZyB9KSB7XG4gIGN0eC5lbmFibGVkID0gdmFsdWUgIT09IGZhbHNlXG5cbiAgaWYgKGN0eC5lbmFibGVkID09PSB0cnVlKSB7XG4gICAgY3R4Lm1vZGlmaWVycyA9IE9iamVjdCh2YWx1ZSkgPT09IHZhbHVlXG4gICAgICA/IHtcbiAgICAgICAgc3RvcDogdmFsdWUuc3RvcCA9PT0gdHJ1ZSB8fCBtb2RpZmllcnMuc3RvcCA9PT0gdHJ1ZSxcbiAgICAgICAgY2VudGVyOiB2YWx1ZS5jZW50ZXIgPT09IHRydWUgfHwgbW9kaWZpZXJzLmNlbnRlciA9PT0gdHJ1ZSxcbiAgICAgICAgY29sb3I6IHZhbHVlLmNvbG9yIHx8IGFyZ1xuICAgICAgfVxuICAgICAgOiB7XG4gICAgICAgIHN0b3A6IG1vZGlmaWVycy5zdG9wLFxuICAgICAgICBjZW50ZXI6IG1vZGlmaWVycy5jZW50ZXIsXG4gICAgICAgIGNvbG9yOiBhcmdcbiAgICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdyaXBwbGUnLFxuICBpbnNlcnRlZChlbCwgYmluZGluZykge1xuICAgIGNvbnN0IGN0eCA9IHtcbiAgICAgIG1vZGlmaWVyczoge30sXG4gICAgICBjbGljayhldnQpIHtcbiAgICAgICAgaWYgKGN0eC5lbmFibGVkID09PSB0cnVlKSB7XG4gICAgICAgICAgc2hvd1JpcHBsZShldnQsIGVsLCBjdHgpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBrZXl1cChldnQpIHtcbiAgICAgICAgaWYgKGN0eC5lbmFibGVkID09PSB0cnVlICYmIGV2dC5rZXlDb2RlID09PSAxMykge1xuICAgICAgICAgIHNob3dSaXBwbGUoZXZ0LCBlbCwgY3R4LCB0cnVlKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlQ3R4KGN0eCwgYmluZGluZylcbiAgICBpZiAoZWwucmlwcGxlQ3R4KSB7XG4gICAgICBlbC5yaXBwbGVDdHhPbGQgPSBlbC5yaXBwbGVDdHhcbiAgICB9XG4gICAgZWwucmlwcGxlQ3R4ID0gY3R4XG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjdHguY2xpY2ssIGZhbHNlKVxuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgY3R4LmtleXVwLCBmYWxzZSlcbiAgfSxcbiAgdXBkYXRlKGVsLCBiaW5kaW5nKSB7XG4gICAgZWwucmlwcGxlQ3R4ICE9PSB2b2lkIDAgJiYgdXBkYXRlQ3R4KGVsLnJpcHBsZUN0eCwgYmluZGluZylcbiAgfSxcbiAgdW5iaW5kKGVsKSB7XG4gICAgY29uc3QgY3R4ID0gZWwucmlwcGxlQ3R4T2xkIHx8IGVsLnJpcHBsZUN0eFxuXG4gICAgaWYgKGN0eCAhPT0gdm9pZCAwKSB7XG4gICAgICBjdHguYWJvcnQgIT09IHZvaWQgMCAmJiBjdHguYWJvcnQoKVxuICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjdHguY2xpY2ssIGZhbHNlKVxuICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBjdHgua2V5dXAsIGZhbHNlKVxuICAgICAgZGVsZXRlIGVsW2VsLnJpcHBsZUN0eE9sZCA/ICdyaXBwbGVDdHhPbGQnIDogJ3JpcHBsZUN0eCddXG4gICAgfVxuICB9XG59IiwiaW1wb3J0IFJpcHBsZSBmcm9tICcuL3NyYy9tYWluLmpzJ1xuXG5jb25zdCBpbnN0YWxsID0gZnVuY3Rpb24gKFZ1ZSkge1xuICBWdWUuZGlyZWN0aXZlKFJpcHBsZS5uYW1lLCBSaXBwbGUpXG59XG5cblJpcHBsZS5pbnN0YWxsID0gaW5zdGFsbFxuXG5leHBvcnQgZGVmYXVsdCBSaXBwbGUiLCJpbXBvcnQgJy4vY3NzL2luZGV4LnN0eWwnXG5pbXBvcnQgSWNvbiBmcm9tICcuL2NvbXBvbmVudHMvaWNvbi9pbmRleC5qcydcbmltcG9ydCBJdGVtIGZyb20gJy4vY29tcG9uZW50cy9pdGVtL2luZGV4LmpzJ1xuaW1wb3J0IEZpZWxkIGZyb20gJy4vY29tcG9uZW50cy9maWVsZC9pbmRleC5qcydcbmltcG9ydCBJbnB1dCBmcm9tICcuL2NvbXBvbmVudHMvaW5wdXQvaW5kZXguanMnXG5pbXBvcnQgU2VsZWN0IGZyb20gJy4vY29tcG9uZW50cy9zZWxlY3QvaW5kZXguanMnXG5pbXBvcnQgU2Nyb2xsQXJlYSBmcm9tICcuL2NvbXBvbmVudHMvc2Nyb2xsQXJlYS9pbmRleC5qcydcbmltcG9ydCBNb2RhbCBmcm9tICcuL2NvbXBvbmVudHMvbW9kYWwvaW5kZXguanMnXG5pbXBvcnQgUG9wb3ZlciBmcm9tICcuL2NvbXBvbmVudHMvcG9wb3Zlci9pbmRleC5qcydcbmltcG9ydCBCdXR0b24gZnJvbSAnLi9jb21wb25lbnRzL2J1dHRvbi9pbmRleC5qcydcbmltcG9ydCBDaGVja2JveCBmcm9tICcuL2NvbXBvbmVudHMvY2hlY2tib3gvaW5kZXguanMnXG5pbXBvcnQgQ2hlY2tib3hHcm91cCBmcm9tICcuL2NvbXBvbmVudHMvY2hlY2tib3hHcm91cC9pbmRleC5qcydcbmltcG9ydCBSYWRpbyBmcm9tICcuL2NvbXBvbmVudHMvcmFkaW8vaW5kZXguanMnXG5pbXBvcnQgUmFkaW9Hcm91cCBmcm9tICcuL2NvbXBvbmVudHMvcmFkaW9Hcm91cC9pbmRleC5qcydcbmltcG9ydCBQYWdpbmF0aW9uIGZyb20gJy4vY29tcG9uZW50cy9wYWdpbmF0aW9uL2luZGV4LmpzJ1xuaW1wb3J0IE5vdGlmaWNhdGlvbiBmcm9tICcuL2NvbXBvbmVudHMvbm90aWZpY2F0aW9uL2luZGV4LmpzJ1xuaW1wb3J0IFJpcHBsZSBmcm9tICcuL2RpcmVjdGl2ZXMvcmlwcGxlL2luZGV4LmpzJ1xuXG5jb25zdCBjb21wb25lbnRzID0gW1xuICBJY29uLFxuICBJdGVtLFxuICBGaWVsZCxcbiAgSW5wdXQsXG4gIFNlbGVjdCxcbiAgU2Nyb2xsQXJlYSxcbiAgTW9kYWwsXG4gIFBvcG92ZXIsXG4gIEJ1dHRvbixcbiAgUGFnaW5hdGlvbixcblxuICAvLyBOb3RpZmljYXRpb24sXG4gIENoZWNrYm94LFxuICBDaGVja2JveEdyb3VwLFxuICBSYWRpbyxcbiAgUmFkaW9Hcm91cFxuXVxuXG5jb25zdCBkaXJlY3RpdmVzID0gW1xuICBSaXBwbGVcbl1cblxuY29uc3QgaW5zdGFsbCA9IGZ1bmN0aW9uIChWdWUpIHtcbiAgY29tcG9uZW50cy5mb3JFYWNoKGNvbXBvbmVudCA9PiB7XG4gICAgVnVlLmNvbXBvbmVudChjb21wb25lbnQubmFtZSwgY29tcG9uZW50KVxuICB9KVxuICBkaXJlY3RpdmVzLmZvckVhY2goZGlyZWN0aXZlID0+IHtcbiAgICBWdWUuZGlyZWN0aXZlKGRpcmVjdGl2ZS5uYW1lLCBkaXJlY3RpdmUpXG4gIH0pXG4gIFZ1ZS5wcm90b3R5cGUuJG5vdGlmeSA9IE5vdGlmaWNhdGlvblxufVxuXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LlZ1ZSkge1xuICBpbnN0YWxsKHdpbmRvdy5WdWUpXG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaW5zdGFsbCxcbiAgSWNvbixcbiAgSXRlbSxcbiAgRmllbGQsXG4gIElucHV0LFxuICBTZWxlY3QsXG4gIFNjcm9sbEFyZWEsXG4gIFBvcG92ZXIsXG4gIE1vZGFsLFxuICBCdXR0b24sXG4gIFBhZ2luYXRpb24sXG4gIENoZWNrYm94LFxuICBDaGVja2JveEdyb3VwLFxuICBSYWRpbyxcbiAgUmFkaW9Hcm91cCxcbiAgUmlwcGxlXG59XG4iXSwibmFtZXMiOlsibmFtZSIsInByb3BzIiwiU3RyaW5nIiwiY29sb3IiLCJwcmltYXJ5IiwiQm9vbGVhbiIsIm5lZ2F0aXZlIiwicG9zaXRpdmUiLCJ3YXJuaW5nIiwiZ3JleSIsImxpZ2h0R3JleSIsInNpemUiLCJjb21wdXRlZCIsImNsYXNzZXMiLCJjbHMiLCJpY29uIiwiY29udGVudCIsInN0eWxlIiwiZm9udFNpemUiLCJyZW5kZXIiLCJoIiwic3RhdGljQ2xhc3MiLCJjbGFzcyIsImF0dHJzIiwib24iLCIkbGlzdGVuZXJzIiwiaW5zdGFsbCIsIlZ1ZSIsImNvbXBvbmVudCIsIkljb24iLCJ3cmFwIiwiaGlkZUJlZm9yZSIsImhpZGVEZWZhdWx0IiwiaGlkZUFmdGVyIiwidG8iLCJPYmplY3QiLCJkYXRhIiwiY3Vyc29yIiwiY2xpY2siLCJlIiwiJHJvdXRlciIsInB1c2giLCIkZW1pdCIsIiRzY29wZWRTbG90cyIsImJlZm9yZSIsImhpZGUiLCJkZWZhdWx0IiwiYWZ0ZXIiLCJJdGVtIiwiZXJyb3JNZXNzYWdlIiwicnVsZXMiLCJBcnJheSIsImlzRGlydHkiLCJpbm5lckVycm9yIiwiaW5uZXJFcnJvck1lc3NhZ2UiLCJ3YXRjaCIsImZvcmNlQ2hlY2siLCJ2IiwidmFsaWRhdGUiLCJ2YWx1ZSIsInZhbGlkYXRlVmFsdWUiLCJoYXNFcnJvciIsImNvbXB1dGVkRXJyb3JNZXNzYWdlIiwibW91bnRlZCIsIiRvbiIsInRyaWdnZXJWYWxpZGF0aW9uIiwiYmVmb3JlRGVzdHJveSIsIiRvZmYiLCJtZXRob2RzIiwicmVzZXRWYWxpZGF0aW9uIiwidmFsIiwibGVuZ3RoIiwidXBkYXRlIiwiZXJyIiwibXNnIiwibSIsInNvbWUiLCJydWxlIiwicmVzIiwiZm9yY2UiLCJhZHZhbmNlZEJsdXIiLCJkaXNhYmxlZCIsImV4Y2x1ZGVkIiwiZ2V0UmVmcyIsInJlZk5hbWVzIiwiZ2V0RG9tcyIsImVscyIsImlzQXJyYXkiLCJyZWR1Y2UiLCJhY2N1bXVsYXRvciIsImVsIiwiJGVsIiwicmVmIiwiY29uY2F0IiwiJHJlZnMiLCJleGNsdWRlZEJsdXJSZWZzIiwicmVmcyIsImNvbnRhaW5zIiwidGFyZ2V0IiwiZm9jdXNlZCIsImZvY3VzZWRCZWZvcmUiLCJibHVyVHlwZSIsImJsdXJSZWZzIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIm1peGlucyIsIlZhbGlkYXRlTWl4aW4iLCJBZHZhbmNlZEJsdXJNaXhpbiIsImNvbXBvbmVudHMiLCJyZXF1aXJlZCIsInVuZGVybGluZWQiLCJib3JkZXJlZCIsImZpbGxlZCIsIm1pbmkiLCJsYWJlbCIsImZvY3VzIiwiYmx1ciIsImRpc2FibGUiLCJ1bmRlcmxpbmUiLCJib3JkZXIiLCJmaWxsIiwiZXJyb3IiLCJpbm5lclBvaW50ZXIiLCJzY29wZWRTbG90cyIsImdldElubmVyIiwiZ2V0QWZ0ZXIiLCJGaWVsZCIsInBsYWNlaG9sZGVyIiwiaW5wdXQiLCJkb21Qcm9wcyIsIklucHV0IiwieCIsInkiLCJ3aWR0aCIsImhlaWdodCIsIlNjcm9sbEFyZWEiLCJpc0RlZXBFcXVhbCIsImEiLCJiIiwiRGF0ZSIsImdldFRpbWUiLCJrZXlzIiwiZXZlcnkiLCJwcm9wIiwiaXNTdHJpbmdDb250YWluIiwicyIsImlubmVyUyIsImlubmVyViIsInN1bSIsImZvckVhY2giLCJpbmNsdWRlcyIsInJlcGxhY2UiLCJpc09iamVjdCIsIlNjb3JsbEFyZWEiLCJtdWx0aXBsZSIsIm9wdGlvbnMiLCJmaWx0ZXIiLCJvcHRpb25zSGVpZ2h0IiwidHlwZSIsInNlbGVjdGVkU3R5bGUiLCJmaWx0ZXJWYWx1ZSIsImlubmVyVmFsdWUiLCJnZXQiLCJnZXRFeGFjdFZhbHVlcyIsInNldCIsImlubmVyT3B0aW9ucyIsImMiLCJmaWx0ZXJBcnIiLCJzcGxpdCIsImdldE5hbWUiLCIkbmV4dFRpY2siLCJjbGVhckZpbHRlciIsInRyaWdnZXJCbHVyIiwiZ2V0T3B0aW9ucyIsIm1hcCIsIm9wdGlvbiIsInNlbGVjdGVkIiwiY2hlY2tTZWxlY3RlZCIsIm5hdGl2ZU9uIiwiZm9ybWF0VmFsdWUiLCJnZXRTZWxlY3RlZCIsImdldEV4YWN0T3B0aW9ucyIsInJlZkluRm9yIiwicGFkZGluZyIsIm9wZSIsImR1cGxpY2F0ZWQiLCJnZXRWYWx1ZSIsImhhc093blByb3BlcnR5IiwiU2VsZWN0Iiwicm91bmQiLCJzaGFkb3ciLCJub0hvdmVyIiwibW91c2VvdmVyIiwibW91c2VvdXQiLCJpbnZpc2libGUiLCJCdXR0b24iLCJzd0J1dHRvbiIsInNob3ciLCJ0aXRsZSIsInpJbmRleCIsIm9wYWNpdHkiLCJoYW5kbGVDYW5jZWwiLCJoYW5kbGVDb25maXJtIiwic2hvd01vZGFsIiwiaGlkZU1vZGFsIiwiZXZlbnQiLCJzdG9wUHJvcGFnYXRpb24iLCJoZWFkZXIiLCJmb290ZXIiLCJNb2RhbCIsImlzU2VydmVyIiwicHJvdG90eXBlIiwiJGlzU2VydmVyIiwiY3NzIiwiZWxlbWVudCIsImhhbmRsZXIiLCJhdHRhY2hFdmVudCIsIm9mZiIsImRldGFjaEV2ZW50IiwicG9wb3ZlclN0eWxlIiwiYXJyb3dTdHlsZSIsInJlZmVyZW5jZUVsbSIsIm1vZGVsIiwicGxhY2VtZW50IiwidHJpZ2dlciIsInZhbGlkYXRvciIsImluZGV4T2YiLCJzaG93VmFsdWUiLCJzaG93U3R5bGUiLCJnZXRTdHlsZSIsInBvcG92ZXJFbG0iLCJ0b3AiLCJvZmZzZXRIZWlnaHQiLCJsZWZ0Iiwib2Zmc2V0V2lkdGgiLCJyaWdodCIsImhhbmRsZUNsaWNrIiwiaGFuZGxlTW91c2VFbnRlciIsImhhbmRsZU1vdXNlTGVhdmUiLCJkb1Nob3ciLCJkb0Nsb3NlIiwiaGFuZGxlTWFudWFsIiwicG9wb3ZlciIsInJlZmVyZW5jZSIsImVsbSIsInF1ZXJ5U2VsZWN0b3IiLCJkZXN0cm95ZWQiLCJhc3NpZ24iLCJQb3BvdmVyIiwibGVmdExhYmVsIiwiY29sb3JMYWJlbCIsImtlZXBDb2xvciIsInBhcmVudCIsInBhcmVudERpc2FibGVkIiwiY2hlY2tlZCIsImJvb2xlYW5Nb2RlIiwiZ2V0Q2hlY2tlZCIsInNlbGYiLCJjb2xvckNoZWNrYm94IiwiZ2V0TGFiZWwiLCJDaGVja2JveCIsInNodXR0bGUiLCJfdGhpcyIsIiRjaGlsZHJlbiIsImNoaWxkIiwic2h1dHRsZVJlZiIsIlNodXR0bGVNaXhpbiIsIkNoZWNrYm94R3JvdXAiLCJjb2xvclJhZGlvIiwiUmFkaW8iLCJSYWRpb0dyb3VwIiwibWFrZVJlc3VsdCIsInRvdGFsIiwiY3VyIiwiYXJvdW5kIiwicmVzdWx0IiwiYmFzZUNvdW50Iiwic3VycGx1cyIsInN0YXJ0UG9zaXRpb24iLCJlbmRQb3NpdGlvbiIsImZyb20iLCJpIiwiUGFnaW5hdGlvbiIsImhhc093biIsIm9iaiIsImtleSIsImNhbGwiLCJpc1ZOb2RlIiwibm9kZSIsInZlcnRpY2FsT2Zmc2V0Iiwib25DbG9zZSIsInBvc2l0aW9uIiwic2xvdCIsImJhY2tncm91bmQiLCJjbG9zZUNvbG9yIiwiaGFuZGxlQnRuIiwidmVydGljYWxQcm9wZXJ0eSIsInRlc3QiLCJwb3NpdGlvblN0eWxlIiwiZ2V0Vm5vZGUiLCJjb25zb2xlIiwiTm90aWZpY2F0aW9uQ29uc3RydWN0b3IiLCJleHRlbmQiLCJOb3RpZmljYXRpb24iLCJpbnN0YW5jZSIsImluc3RhbmNlcyIsInNlZWQiLCJOb3RpZmljYXRpb25GdW4iLCJ1c2VyT25DbG9zZSIsImlkIiwiY2xvc2UiLCIkbW91bnQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJpdGVtIiwibG9nIiwiaW5kZXgiLCJsZW4iLCJzcGxpY2UiLCJyZW1vdmVkSGVpZ2h0IiwicGFyc2VJbnQiLCJ0b3VjaGVzIiwiY2hhbmdlZFRvdWNoZXMiLCJjbGllbnRZIiwiY2xpZW50WCIsInNob3dSaXBwbGUiLCJldnQiLCJjdHgiLCJmb3JjZUNlbnRlciIsIm1vZGlmaWVycyIsInN0b3AiLCJjZW50ZXIiLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJOb2RlIiwicG9zIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiZGlhbWV0ZXIiLCJNYXRoIiwic3FydCIsInJhZGl1cyIsImNlbnRlclgiLCJjZW50ZXJZIiwidGltZXIiLCJzZXRUaW1lb3V0IiwiY2xhc3NMaXN0IiwiYWRkIiwidHJhbnNmb3JtIiwicmVtb3ZlIiwiYWJvcnQiLCJjbGFzc05hbWUiLCJjbGVhclRpbWVvdXQiLCJ1cGRhdGVDdHgiLCJhcmciLCJlbmFibGVkIiwiaW5zZXJ0ZWQiLCJiaW5kaW5nIiwia2V5dXAiLCJrZXlDb2RlIiwicmlwcGxlQ3R4IiwicmlwcGxlQ3R4T2xkIiwidW5iaW5kIiwiZGlyZWN0aXZlIiwiUmlwcGxlIiwiZGlyZWN0aXZlcyIsIiRub3RpZnkiLCJ3aW5kb3ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxXQUFlO0VBQ2JBLElBQUksRUFBRSxRQURPO0VBRWJDLEtBQUssRUFBRTtJQUNMRCxJQUFJLEVBQUVFLE1BREQ7SUFF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
