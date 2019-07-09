(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) :
  typeof define === 'function' && define.amd ? define(['vue'], factory) :
  (global = global || self, global.skywalker = factory(global.Vue));
}(this, function (Vue) { 'use strict';

  Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue;

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

  return index;

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2t5d2Fsa2VyLmNvbW1vbi5qcyIsInNvdXJjZXMiOlsiLi4vcGFja2FnZXMvY29tcG9uZW50cy9pY29uL3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9pY29uL2luZGV4LmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9pdGVtL3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9pdGVtL2luZGV4LmpzIiwiLi4vcGFja2FnZXMvbWl4aW5zL3ZhbGlkYXRlLmpzIiwiLi4vcGFja2FnZXMvbWl4aW5zL2FkdmFuY2VkQmx1ci5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvZmllbGQvc3JjL21haW4uanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL2ZpZWxkL2luZGV4LmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9pbnB1dC9zcmMvbWFpbi5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvaW5wdXQvaW5kZXguanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3Njcm9sbEFyZWEvc3JjL21haW4uanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3Njcm9sbEFyZWEvaW5kZXguanMiLCIuLi9wYWNrYWdlcy91dGlscy9pcy5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvc2VsZWN0L3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9zZWxlY3QvaW5kZXguanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL2J1dHRvbi9zcmMvbWFpbi5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvYnV0dG9uL2luZGV4LmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9tb2RhbC9zcmMvbWFpbi5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvbW9kYWwvaW5kZXguanMiLCIuLi9wYWNrYWdlcy91dGlscy9kb20uanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3BvcG92ZXIvc3JjL21haW4uanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3BvcG92ZXIvaW5kZXguanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL2NoZWNrYm94L3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9jaGVja2JveC9pbmRleC5qcyIsIi4uL3BhY2thZ2VzL21peGlucy9zaHV0dGxlLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9jaGVja2JveEdyb3VwL3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9jaGVja2JveEdyb3VwL2luZGV4LmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9yYWRpby9zcmMvbWFpbi5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvcmFkaW8vaW5kZXguanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3JhZGlvR3JvdXAvc3JjL21haW4uanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3JhZGlvR3JvdXAvaW5kZXguanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3BhZ2luYXRpb24vc3JjL3BhZ2luYXRpb24uanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3BhZ2luYXRpb24vc3JjL21haW4udnVlIiwiLi4vbm9kZV9tb2R1bGVzL3Z1ZS1ydW50aW1lLWhlbHBlcnMvZGlzdC9ub3JtYWxpemUtY29tcG9uZW50LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Z1ZS1ydW50aW1lLWhlbHBlcnMvZGlzdC9pbmplY3Qtc3R5bGUvYnJvd3Nlci5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvcGFnaW5hdGlvbi9pbmRleC5qcyIsIi4uL3BhY2thZ2VzL21peGlucy9zbGlkZU9ic2VydmVyLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9zbGlkZS9zcmMvbWFpbi5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvc2xpZGUvaW5kZXguanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL2Jhc2ljSXRlbS9zcmMvbWFpbi5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvYmFzaWNJdGVtL2luZGV4LmpzIiwiLi4vcGFja2FnZXMvdXRpbHMvdmRvbS5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvbm90aWZpY2F0aW9uL3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9ub3RpZmljYXRpb24vc3JjL25vdGlmaWNhdGlvbi5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvbGF5b3V0L3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9sYXlvdXQvaW5kZXguanMiLCIuLi9wYWNrYWdlcy9kaXJlY3RpdmVzL21hc2svc3JjL21haW4uanMiLCIuLi9wYWNrYWdlcy9kaXJlY3RpdmVzL21hc2svaW5kZXguanMiLCIuLi9wYWNrYWdlcy91dGlscy9ldmVudC5qcyIsIi4uL3BhY2thZ2VzL2RpcmVjdGl2ZXMvcmlwcGxlL3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvZGlyZWN0aXZlcy9yaXBwbGUvaW5kZXguanMiLCIuLi9wYWNrYWdlcy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdzd0ljb24nLFxuICBwcm9wczoge1xuICAgIG5hbWU6IFN0cmluZyxcbiAgICBjb2xvcjogU3RyaW5nLFxuICAgIHByaW1hcnk6IEJvb2xlYW4sXG4gICAgbmVnYXRpdmU6IEJvb2xlYW4sXG4gICAgcG9zaXRpdmU6IEJvb2xlYW4sXG4gICAgd2FybmluZzogQm9vbGVhbixcbiAgICBncmV5OiBCb29sZWFuLFxuICAgIGxpZ2h0R3JleTogQm9vbGVhbixcbiAgICBzaXplOiBTdHJpbmdcbiAgfSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBjbGFzc2VzKCkge1xuICAgICAgbGV0IGNsc1xuICAgICAgY29uc3QgaWNvbiA9IHRoaXMubmFtZVxuICBcbiAgICAgIGlmICghaWNvbikge1xuICAgICAgICByZXR1cm5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNscyA9ICdtYXRlcmlhbC1pY29ucydcbiAgICAgIH1cbiAgICAgIHJldHVybiB7XG4gICAgICAgIFtjbHNdOiB0cnVlLFxuICAgICAgICAnY29sb3ItcHJpbWFyeSc6IHRoaXMucHJpbWFyeSxcbiAgICAgICAgJ2NvbG9yLW5lZ2F0aXZlJzogdGhpcy5uZWdhdGl2ZSxcbiAgICAgICAgJ2NvbG9yLXBvc2l0aXZlJzogdGhpcy5wb3NpdGl2ZSxcbiAgICAgICAgJ2NvbG9yLXdhcm5pbmcnOiB0aGlzLndhcm5pbmcsXG4gICAgICAgICdjb2xvci1ncmV5JzogdGhpcy5ncmV5LFxuICAgICAgICAnY29sb3ItbGlnaHQtZ3JleSc6IHRoaXMubGlnaHRHcmV5LFxuICAgICAgfVxuICAgIH0sXG4gICAgY29udGVudCgpIHtcbiAgICAgIHJldHVybiB0aGlzLm5hbWUgfHwgJyAnXG4gICAgfSxcbiAgICBzdHlsZSgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGZvbnRTaXplOiB0aGlzLnNpemUgfHwgdm9pZCAwLFxuICAgICAgICBjb2xvcjogdGhpcy5jb2xvciB8fCB2b2lkIDBcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIHJlbmRlcihoKSB7XG4gICAgcmV0dXJuIGgoJ2knLCB7XG4gICAgICBzdGF0aWNDbGFzczogJ3N3LWljb24nLFxuICAgICAgY2xhc3M6IHRoaXMuY2xhc3NlcyxcbiAgICAgIHN0eWxlOiB0aGlzLnN0eWxlLFxuICAgICAgYXR0cnM6IHsgJ2FyaWEtaGlkZGVuJzogdHJ1ZSB9LFxuICAgICAgb246IHRoaXMuJGxpc3RlbmVyc1xuICAgIH0sIFtcbiAgICAgIHRoaXMuY29udGVudFxuICAgIF0pXG4gIH1cbn1cbiAgIiwiaW1wb3J0IEljb24gZnJvbSAnLi9zcmMvbWFpbi5qcydcblxuY29uc3QgaW5zdGFsbCA9IGZ1bmN0aW9uIChWdWUpIHtcbiAgVnVlLmNvbXBvbmVudChJY29uLm5hbWUsIEljb24pXG59XG5cbkljb24uaW5zdGFsbCA9IGluc3RhbGxcblxuZXhwb3J0IGRlZmF1bHQgSWNvblxuIiwiZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnc3dJdGVtJyxcbiAgcHJvcHM6IHtcbiAgICB3cmFwOiBCb29sZWFuLFxuICAgIGhpZGVCZWZvcmU6IEJvb2xlYW4sXG4gICAgaGlkZURlZmF1bHQ6IEJvb2xlYW4sXG4gICAgaGlkZUFmdGVyOiBCb29sZWFuLFxuICAgIHRvOiBTdHJpbmcgfCBPYmplY3QsXG4gICAgY2VudGVyOiBCb29sZWFuLFxuICAgIGVuZDogQm9vbGVhbixcbiAgICBkaXNhYmxlZDogQm9vbGVhbixcbiAgICBtYXNrOiBPYmplY3QgfCBCb29sZWFuLFxuICAgIHJpcHBsZTogT2JqZWN0IHwgQm9vbGVhbixcbiAgICBhY3RpdmU6IHtcbiAgICAgIHJlcXVpcmVkOiBmYWxzZVxuICAgIH1cbiAgfSxcbiAgZGF0YTogKCkgPT4gKHt9KSxcbiAgcmVuZGVyKGgpIHtcbiAgICByZXR1cm4gaChgJHt0aGlzLnRvICE9PSB2b2lkIDAgPyAncm91dGVyLWxpbmsnIDogJ2Rpdid9YCwge1xuICAgICAgc3RhdGljQ2xhc3M6ICdzdy1pdGVtIGZsZXggaXRlbXMtY2VudGVyJyxcbiAgICAgIGNsYXNzOiB7XG4gICAgICAgICduby13cmFwJzogIXRoaXMud3JhcCxcbiAgICAgICAgYWN0aXZlOiB0aGlzLmFjdGl2ZSxcbiAgICAgICAgZGlzYWJsZTogdGhpcy5kaXNhYmxlZFxuICAgICAgfSxcbiAgICAgIG9uOiB0aGlzLmRpc2FibGVkID8gdm9pZCAwIDoge1xuICAgICAgICAuLi50aGlzLiRsaXN0ZW5lcnNcbiAgICAgIH0sXG4gICAgICBwcm9wczoge1xuICAgICAgICB0bzogdGhpcy50b1xuICAgICAgfSxcbiAgICAgIGRpcmVjdGl2ZXM6ICh0aGlzLnRvICE9PSB2b2lkIDAgfHwgdGhpcy5hY3RpdmUgIT09IHZvaWQgMCB8fCB0aGlzLm1hc2sgIT09IHZvaWQgMCA/IFtcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdtYXNrJyxcbiAgICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMubWFzayAhPT0gdm9pZCAwICYmIHRoaXMubWFzay5kaXNhYmxlZCB8fCB0aGlzLm1hc2sgPT09IHZvaWQgMCAmJiAodGhpcy50byAhPT0gdm9pZCAwIHx8IHRoaXMuYWN0aXZlICE9PSB2b2lkIDApLFxuICAgICAgICAgICAgY29sb3I6IHRoaXMubWFzayAhPT0gdm9pZCAwICYmIHRoaXMubWFzay5jb2xvcixcbiAgICAgICAgICAgIHN0YXk6IHRoaXMubWFzayAhPT0gdm9pZCAwICYmIHRoaXMubWFzay5zdGF5XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgXSA6IFtdKS5jb25jYXQodGhpcy5yaXBwbGUgIT09IHZvaWQgMCA/IFtcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdyaXBwbGUnLFxuICAgICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5yaXBwbGUgIT09IHZvaWQgMCAmJiB0aGlzLnJpcHBsZS5kaXNhYmxlZCxcbiAgICAgICAgICAgIGNvbG9yOiB0aGlzLnJpcHBsZSAhPT0gdm9pZCAwICYmIHRoaXMucmlwcGxlLmNvbG9yLFxuICAgICAgICAgICAgY2VudGVyOiB0aGlzLnJpcHBsZSAhPT0gdm9pZCAwICYmIHRoaXMucmlwcGxlLmNlbnRlclxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXSA6IFtdKVxuICAgIH0sIFtcbiAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1pdGVtX19jb250ZW50IGZsZXggaXRlbXMtY2VudGVyJyxcbiAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAnbm8td3JhcCc6ICF0aGlzLndyYXBcbiAgICAgICAgfVxuICAgICAgfSwgW1xuXG4gICAgICAgIHRoaXMuJHNjb3BlZFNsb3RzLmJlZm9yZSAhPT0gdm9pZCAwID8gaCgnZGl2Jywge1xuICAgICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctaXRlbV9fYmVmb3JlIGZsZXggaXRlbXMtY2VudGVyJyxcbiAgICAgICAgICBjbGFzczoge1xuICAgICAgICAgICAgaGlkZTogdGhpcy5oaWRlQmVmb3JlLFxuICAgICAgICAgICAgJ2ZsZXgtYXV0byc6IHRoaXMuaGlkZURlZmF1bHQsXG4gICAgICAgICAgICAnbm8td3JhcCc6ICF0aGlzLndyYXBcbiAgICAgICAgICB9XG4gICAgICAgIH0sIFt0aGlzLiRzY29wZWRTbG90cy5iZWZvcmUoKV0pIDogdm9pZCAwLFxuICBcbiAgICAgICAgdGhpcy4kc2NvcGVkU2xvdHMuZGVmYXVsdCAhPT0gdm9pZCAwID8gaCgnZGl2Jywge1xuICAgICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctaXRlbV9faW5uZXIgZmxleCBpdGVtcy1jZW50ZXIgaXRlbXMtZW5kJyxcbiAgICAgICAgICBjbGFzczoge1xuICAgICAgICAgICAgaGlkZTogdGhpcy5oaWRlRGVmYXVsdCxcbiAgICAgICAgICAgICduby13cmFwJzogIXRoaXMud3JhcCxcbiAgICAgICAgICAgICdqdXN0aWZ5LWNlbnRlcic6IHRoaXMuY2VudGVyLFxuICAgICAgICAgICAgJ2p1c3RpZnktZW5kJzogdGhpcy5lbmRcblxuICAgICAgICAgIH1cbiAgICAgICAgfSwgW3RoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQoKV0pIDogdm9pZCAwLFxuICBcbiAgICAgICAgdGhpcy4kc2NvcGVkU2xvdHMuYWZ0ZXIgIT09IHZvaWQgMCA/IGgoJ2RpdicsIHtcbiAgICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWl0ZW1fX2FmdGVyIGZsZXggaXRlbXMtY2VudGVyJyxcbiAgICAgICAgICBjbGFzczoge1xuICAgICAgICAgICAgaGlkZTogdGhpcy5oaWRlQWZ0ZXIsXG4gICAgICAgICAgICAnbm8td3JhcCc6ICF0aGlzLndyYXBcbiAgICAgICAgICB9XG4gICAgICAgIH0sIFt0aGlzLiRzY29wZWRTbG90cy5hZnRlcigpXSkgOiB2b2lkIDBcbiAgICAgIF0pXG4gICAgXSlcbiAgfVxufVxuICAiLCJpbXBvcnQgSXRlbSBmcm9tICcuL3NyYy9tYWluLmpzJ1xuXG5jb25zdCBpbnN0YWxsID0gZnVuY3Rpb24gKFZ1ZSkge1xuICBWdWUuY29tcG9uZW50KEl0ZW0ubmFtZSwgSXRlbSlcbn1cblxuSXRlbS5pbnN0YWxsID0gaW5zdGFsbFxuXG5leHBvcnQgZGVmYXVsdCBJdGVtXG4iLCJcbmV4cG9ydCBkZWZhdWx0IHtcbiAgcHJvcHM6IHtcbiAgICBlcnJvck1lc3NhZ2U6IFN0cmluZyxcbiAgICBydWxlczogQXJyYXlcbiAgfSxcblxuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpc0RpcnR5OiBmYWxzZSxcbiAgICAgIGlubmVyRXJyb3I6IGZhbHNlLFxuICAgICAgaW5uZXJFcnJvck1lc3NhZ2U6IHZvaWQgMFxuICAgIH1cbiAgfSxcblxuICB3YXRjaDoge1xuICAgIGZvcmNlQ2hlY2sodikge1xuICAgICAgaWYgKHRoaXMucnVsZXMgPT09IHZvaWQgMCkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHRoaXMuaXNEaXJ0eSA9IHRydWVcbiAgICAgIHRoaXMudmFsaWRhdGUodilcbiAgICB9LFxuICAgIHZhbHVlKHYpIHtcbiAgICAgIGlmICh0aGlzLmZvcmNlQ2hlY2sgIT09IHZvaWQgMCB8fCB0aGlzLnJ1bGVzID09PSB2b2lkIDApIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICB0aGlzLmlzRGlydHkgPSB0cnVlXG4gICAgICB0aGlzLnZhbGlkYXRlKHYpXG4gICAgfVxuICB9LFxuXG4gIGNvbXB1dGVkOiB7XG4gICAgdmFsaWRhdGVWYWx1ZSgpIHtcbiAgICAgIHJldHVybiB0aGlzLmZvcmNlQ2hlY2sgPT09IHZvaWQgMCA/IHRoaXMudmFsdWUgOiB0aGlzLmZvcmNlQ2hlY2tcbiAgICB9LFxuICAgIGhhc0Vycm9yKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaW5uZXJFcnJvciA9PT0gdHJ1ZVxuICAgIH0sXG5cbiAgICBjb21wdXRlZEVycm9yTWVzc2FnZSgpIHtcbiAgICAgIHJldHVybiB0aGlzLmVycm9yTWVzc2FnZSAhPT0gdm9pZCAwXG4gICAgICAgID8gdGhpcy5lcnJvck1lc3NhZ2VcbiAgICAgICAgOiB0aGlzLmlubmVyRXJyb3JNZXNzYWdlXG4gICAgfVxuICB9LFxuXG4gIG1vdW50ZWQoKSB7XG4gICAgdGhpcy4kb24oYGJsdXJgLCB0aGlzLnRyaWdnZXJWYWxpZGF0aW9uKVxuICB9LFxuXG4gIGJlZm9yZURlc3Ryb3koKSB7XG4gICAgdGhpcy4kb2ZmKGBibHVyYCwgdGhpcy50cmlnZ2VyVmFsaWRhdGlvbilcbiAgfSxcblxuICBtZXRob2RzOiB7XG4gICAgcmVzZXRWYWxpZGF0aW9uKCkge1xuICAgICAgdGhpcy5pc0RpcnR5ID0gZmFsc2VcbiAgICAgIHRoaXMuaW5uZXJFcnJvciA9IGZhbHNlXG4gICAgICB0aGlzLmlubmVyRXJyb3JNZXNzYWdlID0gdm9pZCAwXG4gICAgfSxcblxuICAgIHZhbGlkYXRlKHZhbCA9IHRoaXMudmFsaWRhdGVWYWx1ZSkge1xuICAgICAgaWYgKCF0aGlzLnJ1bGVzIHx8IHRoaXMucnVsZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBjb25zdCB1cGRhdGUgPSAoZXJyLCBtc2cpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuaW5uZXJFcnJvciAhPT0gZXJyKSB7XG4gICAgICAgICAgdGhpcy5pbm5lckVycm9yID0gZXJyXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtID0gbXNnIHx8IHZvaWQgMFxuXG4gICAgICAgIGlmICh0aGlzLmlubmVyRXJyb3JNZXNzYWdlICE9PSBtKSB7XG4gICAgICAgICAgdGhpcy5pbm5lckVycm9yTWVzc2FnZSA9IG1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZXJyXG4gICAgICB9XG5cbiAgICAgIHJldHVybiAhdGhpcy5ydWxlcy5zb21lKHJ1bGUgPT4ge1xuICAgICAgICBsZXQgcmVzXG5cbiAgICAgICAgaWYgKHR5cGVvZiBydWxlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgcmVzID0gcnVsZSh2YWwpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlcyA9PT0gZmFsc2UgfHwgdHlwZW9mIHJlcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICByZXR1cm4gdXBkYXRlKHRydWUsIHJlcylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdXBkYXRlKGZhbHNlKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG5cbiAgICB0cmlnZ2VyVmFsaWRhdGlvbihmb3JjZSA9IHRydWUpIHtcbiAgICAgIGlmIChmb3JjZSA9PT0gdHJ1ZSB8fCB0aGlzLmlzRGlydHkgPT09IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuaXNEaXJ0eSA9IHRydWVcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGUodGhpcy52YWxpZGF0ZVZhbHVlKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiXG5leHBvcnQgZGVmYXVsdCB7XG4gIHByb3BzOiB7fSxcbiAgZGF0YTogKCkgPT4gKHt9KSxcbiAgd2F0Y2g6IHt9LFxuICBjb21wdXRlZDoge30sXG4gIG1ldGhvZHM6IHtcbiAgICBhZHZhbmNlZEJsdXIoZSkge1xuICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHsgcmV0dXJuIH1cbiAgICAgIGxldCBleGNsdWRlZCA9IGZhbHNlXG4gICAgICBsZXQgZ2V0UmVmcyA9IHJlZk5hbWVzID0+IHtcbiAgICAgICAgbGV0IGdldERvbXMgPSBlbHMgPT4ge1xuICAgICAgICAgIGVscyA9IEFycmF5LmlzQXJyYXkoZWxzKSA/IGVscyA6IFtlbHNdXG4gICAgICAgICAgcmV0dXJuIGVscy5yZWR1Y2UoKGFjY3VtdWxhdG9yLCBlbCkgPT4ge1xuICAgICAgICAgICAgYWNjdW11bGF0b3IucHVzaChlbCAmJiAoZWwuJGVsIHx8IGVsKSlcbiAgICAgICAgICAgIHJldHVybiBhY2N1bXVsYXRvclxuICAgICAgICAgIH0sIFtdKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlZk5hbWVzLnJlZHVjZSgoYWNjdW11bGF0b3IsIHJlZikgPT4gYWNjdW11bGF0b3IuY29uY2F0KGdldERvbXModGhpcy4kcmVmc1tyZWZdKSksIFtdKVxuICAgICAgfVxuICAgICAgXG4gICAgICBpZiAodGhpcy5leGNsdWRlZEJsdXJSZWZzKSB7XG4gICAgICAgIGxldCByZWZzID0gZ2V0UmVmcyh0aGlzLmV4Y2x1ZGVkQmx1clJlZnMpXG5cbiAgICAgICAgcmVmcy5zb21lKHJlZiA9PiB7XG4gICAgICAgICAgaWYgKHJlZiA9PT0gdm9pZCAwKSB7IHJldHVybiBmYWxzZSB9XG4gICAgICAgICAgZXhjbHVkZWQgPSByZWYuY29udGFpbnMoZS50YXJnZXQpIHx8IGZhbHNlXG4gICAgICAgICAgcmV0dXJuIGV4Y2x1ZGVkXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICBpZiAoZXhjbHVkZWQpIHtcbiAgICAgICAgdGhpcy5mb2N1c2VkID0gdHJ1ZVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGxldCBmb2N1c2VkQmVmb3JlID0gdGhpcy5mb2N1c2VkXG5cbiAgICAgIGlmICh0aGlzLmJsdXJUeXBlID09PSAncmV2ZXJzZScgJiYgZm9jdXNlZEJlZm9yZSkge1xuICAgICAgICB0aGlzLmZvY3VzZWQgPSAhZm9jdXNlZEJlZm9yZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHJlZnMgPSBnZXRSZWZzKHRoaXMuYmx1clJlZnMpXG5cbiAgICAgICAgcmVmcy5zb21lKHJlZiA9PiB7XG4gICAgICAgICAgaWYgKHJlZiA9PT0gdm9pZCAwKSB7IHJldHVybiBmYWxzZSB9XG4gICAgICAgICAgdGhpcy5mb2N1c2VkID0gcmVmLmNvbnRhaW5zKGUudGFyZ2V0KSB8fCBmYWxzZVxuICAgICAgICAgIHJldHVybiB0aGlzLmZvY3VzZWRcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5mb2N1c2VkICYmIGZvY3VzZWRCZWZvcmUpIHsgdGhpcy4kZW1pdChgYmx1cmAsIGUpIH1cbiAgICB9XG4gIH0sXG4gIG1vdW50ZWQoKSB7XG4gICAgaWYgKHRoaXMuYmx1clJlZnMpIHsgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuYWR2YW5jZWRCbHVyLCBmYWxzZSkgfVxuICB9LFxuICBiZWZvcmVEZXN0cm95KCkge1xuICAgIGlmICh0aGlzLmJsdXJSZWZzKSB7IGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmFkdmFuY2VkQmx1ciwgZmFsc2UpIH1cbiAgfSxcbn1cbiAgIiwiaW1wb3J0IFZhbGlkYXRlTWl4aW4gZnJvbSAnLi4vLi4vLi4vbWl4aW5zL3ZhbGlkYXRlJ1xuaW1wb3J0IEFkdmFuY2VkQmx1ck1peGluIGZyb20gJy4uLy4uLy4uL21peGlucy9hZHZhbmNlZEJsdXInXG5pbXBvcnQgSXRlbSBmcm9tICcuLi8uLi9pdGVtJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdzd0ZpZWxkJyxcbiAgbWl4aW5zOiBbVmFsaWRhdGVNaXhpbiwgQWR2YW5jZWRCbHVyTWl4aW5dLCAvLyBoYXNFcnJvcixjb21wdXRlZEVycm9yTWVzc2FnZVxuICBjb21wb25lbnRzOiB7IEl0ZW0gfSxcbiAgcHJvcHM6IHtcbiAgICByZXF1aXJlZDogQm9vbGVhbixcbiAgICB1bmRlcmxpbmVkOiBCb29sZWFuLFxuICAgIGJvcmRlcmVkOiBCb29sZWFuLFxuICAgIGZpbGxlZDogQm9vbGVhbixcbiAgICBkaXNhYmxlZDogQm9vbGVhbixcbiAgICBtaW5pOiBCb29sZWFuLFxuICAgIGxhYmVsOiBTdHJpbmcsXG4gICAgZm9yY2VDaGVjazogU3RyaW5nIHwgT2JqZWN0LFxuICAgIHNwYWNlQXJvdW5kOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgIH1cbiAgfSxcbiAgZGF0YTogKCkgPT4gKHtcbiAgICBmb2N1c2VkOiBmYWxzZVxuICB9KSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBibHVyUmVmcygpIHtcbiAgICAgIHJldHVybiBbJ2ZpZWxkQ29udGVudCddXG4gICAgfVxuICB9LFxuICB3YXRjaDoge1xuICAgIGZvY3VzZWQoKSB7XG4gICAgICBpZiAodGhpcy5mb2N1c2VkICYmIHRoaXMuZm9jdXMpIHsgdGhpcy5mb2N1cygpIH1cbiAgICAgIGlmICghdGhpcy5mb2N1c2VkICYmIHRoaXMuYmx1cikgeyB0aGlzLmJsdXIoKSB9XG4gICAgfVxuICB9LFxuICByZW5kZXIoaCkge1xuICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICBzdGF0aWNDbGFzczogJ3N3LWZpZWxkIGZsZXggbm8td3JhcCBpdGVtcy1jZW50ZXInLFxuICAgICAgY2xhc3M6IHtcbiAgICAgICAgZGlzYWJsZTogdGhpcy5kaXNhYmxlZCxcbiAgICAgICAgJ3NwYWNlLWFyb3VuZCc6IHRoaXMuc3BhY2VBcm91bmRcbiAgICAgIH1cbiAgICB9LCBbXG4gICAgICB0aGlzLmxhYmVsICE9PSB2b2lkIDAgPyBoKCdkaXYnLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctZmllbGRfX2xhYmVsIGZsZXggbm8td3JhcCBpdGVtcy1jZW50ZXInXG4gICAgICB9LCBbaCgnZGl2Jywge1xuICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWxhYmVsIGZsZXggbm8td3JhcCBpdGVtcy1jZW50ZXInLFxuICAgICAgICBjbGFzczoge1xuICAgICAgICAgIHJlcXVpcmVkOiB0aGlzLnJlcXVpcmVkXG4gICAgICAgIH1cbiAgICAgIH0sIHRoaXMubGFiZWwpXG4gICAgICBdKSA6IHZvaWQgMCxcblxuICAgICAgaCgnZGl2Jywge1xuICAgICAgICByZWY6ICdmaWVsZENvbnRlbnQnLFxuICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWZpZWxkX19jb250ZW50IGZsZXggbm8td3JhcCBpdGVtcy1jZW50ZXIgc3ctZm9ybScsXG4gICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgdW5kZXJsaW5lOiB0aGlzLnVuZGVybGluZWQsXG4gICAgICAgICAgYm9yZGVyOiB0aGlzLmJvcmRlcmVkLFxuICAgICAgICAgIGZpbGw6IHRoaXMuZmlsbGVkLFxuICAgICAgICAgIGZvY3VzOiAhdGhpcy5oYXNFcnJvciAmJiB0aGlzLmZvY3VzZWQsXG4gICAgICAgICAgZXJyb3I6IHRoaXMuaGFzRXJyb3IsXG4gICAgICAgICAgJ3BhZGRpbmctbWluJzogIXRoaXMubWluaSxcbiAgICAgICAgICAnaW5uZXItcG9pbnRlcic6IHRoaXMuaW5uZXJQb2ludGVyXG4gICAgICAgIH1cbiAgICAgIH0sIFtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA/IGgoJ2RpdicsIHtcbiAgICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWZpZWxkX19kaXNhYmxlZCdcbiAgICAgICAgfSkgOiB2b2lkIDAsXG5cbiAgICAgICAgaCgnc3ctaXRlbScsIHtcbiAgICAgICAgICBzdGF0aWNDbGFzczogJ2ZsZXgtYXV0bycsXG4gICAgICAgICAgc2NvcGVkU2xvdHM6IHtcbiAgICAgICAgICAgIGJlZm9yZTogdGhpcy4kc2NvcGVkU2xvdHMuYmVmb3JlICE9PSB2b2lkIDBcbiAgICAgICAgICAgICAgPyAoKSA9PiBbaCgnZGl2Jywge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiAnZmxleCBuby13cmFwIGl0ZW1zLWNlbnRlciBtYXJnaW4tbWluJ1xuICAgICAgICAgICAgICB9LCBbdGhpcy4kc2NvcGVkU2xvdHMuYmVmb3JlKCldKV0gOiB2b2lkIDAsXG5cbiAgICAgICAgICAgIGRlZmF1bHQ6IHRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQgIT09IHZvaWQgMCB8fCB0aGlzLmdldElubmVyICE9PSB2b2lkIDBcbiAgICAgICAgICAgICAgPyAoKSA9PiBbdGhpcy5nZXRJbm5lciAhPT0gdm9pZCAwID8gdGhpcy5nZXRJbm5lcihoKSA6IHZvaWQgMCwgdGhpcy4kc2NvcGVkU2xvdHMuZGVmYXVsdCAhPT0gdm9pZCAwICYmIHRoaXMuZ2V0SW5uZXIgPT09IHZvaWQgMCA/IHRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQoKSA6IHZvaWQgMF0gOiB2b2lkIDAsXG5cbiAgICAgICAgICAgIGFmdGVyOiB0aGlzLiRzY29wZWRTbG90cy5hZnRlciAhPT0gdm9pZCAwIHx8IHRoaXMuZ2V0QWZ0ZXIgIT09IHZvaWQgMFxuICAgICAgICAgICAgICA/ICgpID0+IFtoKCdkaXYnLCB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6ICdmbGV4IG5vLXdyYXAgaXRlbXMtY2VudGVyIG1hcmdpbi1taW4nXG4gICAgICAgICAgICAgIH0sIFt0aGlzLmdldEFmdGVyICE9PSB2b2lkIDAgPyB0aGlzLmdldEFmdGVyKGgpIDogdm9pZCAwLCB0aGlzLiRzY29wZWRTbG90cy5hZnRlciAhPT0gdm9pZCAwICYmIHRoaXMuZ2V0QWZ0ZXIgPT09IHZvaWQgMCA/IHRoaXMuJHNjb3BlZFNsb3RzLmFmdGVyKCkgOiB2b2lkIDBdKV0gOiB2b2lkIDBcbiAgICAgICAgICB9XG4gICAgICAgIH0pLFxuXG4gICAgICAgIHRoaXMuaGFzRXJyb3IgPyBoKCdkaXYnLCB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1maWVsZF9fZXJyb3IgZmxleCBuby13cmFwIGl0ZW1zLWNlbnRlcidcbiAgICAgICAgfSwgdGhpcy5jb21wdXRlZEVycm9yTWVzc2FnZSkgOiB2b2lkIDBcbiAgICAgIF0pXG4gICAgXSlcbiAgfVxufVxuICAiLCJpbXBvcnQgRmllbGQgZnJvbSAnLi9zcmMvbWFpbi5qcydcblxuY29uc3QgaW5zdGFsbCA9IGZ1bmN0aW9uIChWdWUpIHtcbiAgVnVlLmNvbXBvbmVudChGaWVsZC5uYW1lLCBGaWVsZClcbn1cblxuRmllbGQuaW5zdGFsbCA9IGluc3RhbGxcblxuZXhwb3J0IGRlZmF1bHQgRmllbGRcbiIsImltcG9ydCBGaWVsZCBmcm9tICcuLi8uLi9maWVsZCdcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnc3dJbnB1dCcsXG4gIG1peGluczogW0ZpZWxkXSwgLy8gZm9jdXNlZCxkaXNhYmxlZFxuICBwcm9wczoge1xuICAgIHZhbHVlOiBTdHJpbmcsXG4gICAgcGxhY2Vob2xkZXI6IFN0cmluZyxcbiAgICBhdXRvY29tcGxldGU6IEJvb2xlYW5cbiAgfSxcbiAgZGF0YTogKCkgPT4gKHt9KSxcbiAgY29tcHV0ZWQ6IHt9LFxuICBtZXRob2RzOiB7XG4gICAgZm9jdXMoKSB7XG4gICAgICB0aGlzLiRyZWZzLmlucHV0LmZvY3VzKClcbiAgICB9LFxuICAgIGJsdXIoKSB7XG4gICAgICB0aGlzLiRyZWZzLmlucHV0LmJsdXIoKVxuICAgIH0sXG4gICAgZ2V0SW5uZXIoaCkge1xuICAgICAgcmV0dXJuIFtoKCdpbnB1dCcsIHtcbiAgICAgICAgcmVmOiAnaW5wdXQnLFxuICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWlucHV0IG1hcmdpbi1taW4nLFxuICAgICAgICBhdHRyczoge1xuICAgICAgICAgIGF1dG9jb21wbGV0ZTogdGhpcy5hdXRvY29tcGxldGUgPyAnb24nIDogJ29mZidcbiAgICAgICAgfSxcbiAgICAgICAgZG9tUHJvcHM6IHtcbiAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcbiAgICAgICAgICBwbGFjZWhvbGRlcjogdGhpcy5wbGFjZWhvbGRlciB8fCAnJyxcbiAgICAgICAgICBkaXNhYmxlZDogdGhpcy5kaXNhYmxlZFxuICAgICAgICB9LFxuICAgICAgICBvbjoge1xuICAgICAgICAgIC4uLnRoaXMuJGxpc3RlbmVycyxcbiAgICAgICAgICBibHVyOiBlID0+IHtcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2JsdXInLCBlLnRhcmdldC52YWx1ZSlcbiAgICAgICAgICB9LFxuICAgICAgICAgIGlucHV0OiBlID0+IHtcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2lucHV0JywgZS50YXJnZXQudmFsdWUpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KV1cbiAgICB9XG4gIH1cbn1cbiAgIiwiaW1wb3J0IElucHV0IGZyb20gJy4vc3JjL21haW4uanMnXG5cbmNvbnN0IGluc3RhbGwgPSBmdW5jdGlvbiAoVnVlKSB7XG4gIFZ1ZS5jb21wb25lbnQoSW5wdXQubmFtZSwgSW5wdXQpXG59XG5cbklucHV0Lmluc3RhbGwgPSBpbnN0YWxsXG5cbmV4cG9ydCBkZWZhdWx0IElucHV0XG4iLCJleHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdzd1Njcm9sbEFyZWEnLFxuICBwcm9wczoge1xuICAgIHg6IEJvb2xlYW4sXG4gICAgeTogQm9vbGVhbixcbiAgICB3aWR0aDogU3RyaW5nLFxuICAgIGhlaWdodDogU3RyaW5nLFxuICAgIHN0cmV0Y2g6IEJvb2xlYW5cbiAgfSxcbiAgZGF0YTogKCkgPT4gKHt9KSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBzdHlsZSgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgICdvdmVyZmxvdy14JzogdGhpcy54ID8gJ2F1dG8nIDogJ2hpZGRlbicsXG4gICAgICAgICdvdmVyZmxvdy15JzogdGhpcy55ID8gJ2F1dG8nIDogJ2hpZGRlbicsXG4gICAgICAgICdtYXgtd2lkdGgnOiB0aGlzLndpZHRoIHx8ICcxMDAlJyxcbiAgICAgICAgd2lkdGg6IHRoaXMud2lkdGggfHwgJzEwMCUnLFxuICAgICAgICAnbWF4LWhlaWdodCc6IHRoaXMuaGVpZ2h0IHx8ICcxMDAlJyxcbiAgICAgICAgaGVpZ2h0OiB0aGlzLnN0cmV0Y2ggJiYgKHRoaXMuaGVpZ2h0IHx8ICcxMDAlJylcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHt9LFxuICByZW5kZXIoaCkge1xuICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICBzdGF0aWNDbGFzczogJ3N3LXNjcm9sbC1hcmVhJyxcbiAgICAgIHN0eWxlOiB0aGlzLnN0eWxlLFxuICAgICAgb246IHRoaXMuJGxpc3RlbmVyc1xuICAgIH0sIHRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQgIT09IHZvaWQgMCA/IFt0aGlzLiRzY29wZWRTbG90cy5kZWZhdWx0KCldIDogdm9pZCAwKVxuICB9XG59XG4gICIsImltcG9ydCBTY3JvbGxBcmVhIGZyb20gJy4vc3JjL21haW4uanMnXG5cbmNvbnN0IGluc3RhbGwgPSBmdW5jdGlvbiAoVnVlKSB7XG4gIFZ1ZS5jb21wb25lbnQoU2Nyb2xsQXJlYS5uYW1lLCBTY3JvbGxBcmVhKVxufVxuXG5TY3JvbGxBcmVhLmluc3RhbGwgPSBpbnN0YWxsXG5cbmV4cG9ydCBkZWZhdWx0IFNjcm9sbEFyZWFcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXNlbGYtY29tcGFyZSAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRGVlcEVxdWFsKGEsIGIpIHtcbiAgaWYgKGEgPT09IGIpIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgaWYgKGEgaW5zdGFuY2VvZiBEYXRlICYmIGIgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgcmV0dXJuIGEuZ2V0VGltZSgpID09PSBiLmdldFRpbWUoKVxuICB9XG5cbiAgaWYgKGEgIT09IGEgJiYgYiAhPT0gYikge1xuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBpZiAoYSAhPT0gT2JqZWN0KGEpIHx8IGIgIT09IE9iamVjdChiKSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgY29uc3QgcHJvcHMgPSBPYmplY3Qua2V5cyhhKVxuXG4gIGlmIChwcm9wcy5sZW5ndGggIT09IE9iamVjdC5rZXlzKGIpLmxlbmd0aCkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgcmV0dXJuIHByb3BzLmV2ZXJ5KHByb3AgPT4gaXNEZWVwRXF1YWwoYVtwcm9wXSwgYltwcm9wXSkpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZ0NvbnRhaW4ocywgdiwgcmFuZG9tKSB7XG4gIGxldCBpbm5lclMgPSBTdHJpbmcocylcbiAgbGV0IGlubmVyViA9IHJhbmRvbSA9PT0gdHJ1ZSA/IHYucmVwbGFjZSgvXFxzKy9nLCAnJykuc3BsaXQoJycpIDogdi5yZXBsYWNlKC9cXHMrL2csICcgJykuc3BsaXQoJyAnKVxuICBsZXQgc3VtID0gMFxuXG4gIGlubmVyVi5mb3JFYWNoKHggPT4ge1xuICAgIGlmIChpbm5lclMuaW5jbHVkZXMoeCkpIHtcbiAgICAgIGlubmVyUyA9IGlubmVyUy5yZXBsYWNlKHgsICcnKVxuICAgICAgc3VtKytcbiAgICB9XG4gIH0pXG4gIHJldHVybiBzdW0gPj0gaW5uZXJWLmxlbmd0aFxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNPYmplY3Qodikge1xuICByZXR1cm4gT2JqZWN0KHYpID09PSB2XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0RhdGUodikge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHYpID09PSAnW29iamVjdCBEYXRlXSdcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUmVnZXhwKHYpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2KSA9PT0gJ1tvYmplY3QgUmVnRXhwXSdcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtYmVyKHYpIHtcbiAgcmV0dXJuIHR5cGVvZiB2ID09PSAnbnVtYmVyJyAmJiBpc0Zpbml0ZSh2KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmcodikge1xuICByZXR1cm4gdHlwZW9mIHYgPT09ICdzdHJpbmcnXG59XG4iLCJpbXBvcnQgRmllbGQgZnJvbSAnLi4vLi4vZmllbGQnXG5pbXBvcnQgU2NvcmxsQXJlYSBmcm9tICcuLi8uLi9zY3JvbGxBcmVhJ1xuaW1wb3J0IHsgaXNEZWVwRXF1YWwsIGlzU3RyaW5nQ29udGFpbiwgaXNPYmplY3QgfSBmcm9tICcuLi8uLi8uLi91dGlscy9pcydcblxuLy8gaW1wb3J0IHsgZGVkdXBsaWNhdGUgfSBmcm9tICcuLi8uLi8uLi91dGlscy9kZWR1cGxpY2F0ZSdcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnc3dTZWxlY3QnLFxuICBtaXhpbnM6IFtGaWVsZF0sIC8vIGZvY3VzZWQsZGlzYWJsZWRcbiAgY29tcG9uZW50czoge1xuICAgIFNjb3JsbEFyZWFcbiAgfSxcbiAgcHJvcHM6IHtcbiAgICBtdWx0aXBsZTogQm9vbGVhbixcbiAgICB2YWx1ZToge1xuICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICB9LFxuICAgIG9wdGlvbnM6IEFycmF5LFxuICAgIGZpbHRlcjogQm9vbGVhbixcbiAgICBwbGFjZWhvbGRlcjogU3RyaW5nLFxuICAgIG9wdGlvbnNIZWlnaHQ6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICcyMDBweCdcbiAgICB9LFxuICAgIHNlbGVjdGVkU3R5bGU6IFN0cmluZ1xuICB9LFxuICBkYXRhOiAoKSA9PiAoe1xuICAgIGJsdXJUeXBlOiAncmV2ZXJzZScsXG4gICAgZmlsdGVyVmFsdWU6ICcnXG4gIH0pLFxuICBjb21wdXRlZDoge1xuICAgIGV4Y2x1ZGVkQmx1clJlZnMoKSB7XG4gICAgICByZXR1cm4gdGhpcy5maWx0ZXIgPyBbJ2lucHV0JywgJ3NlbGVjdGVkJywgJ3NlbGVjdE9wdGlvbnMnXSA6IFsnc2VsZWN0ZWQnLCAnc2VsZWN0T3B0aW9ucyddXG4gICAgfSxcbiAgICBpbm5lclZhbHVlOiB7XG4gICAgICBnZXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEV4YWN0VmFsdWVzKHRoaXMudmFsdWUpXG4gICAgICB9LFxuICAgICAgc2V0KHZhbCkge1xuICAgICAgICB0aGlzLiRlbWl0KFxuICAgICAgICAgICdpbnB1dCcsXG4gICAgICAgICAgdmFsXG4gICAgICAgIClcbiAgICAgIH1cbiAgICB9LFxuICAgIGlubmVyT3B0aW9ucygpIHtcbiAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMucmVkdWNlKChhLCBjKSA9PiB7XG4gICAgICAgIGlmIChpc1N0cmluZ0NvbnRhaW4odGhpcy5nZXROYW1lKGMpLCB0aGlzLmZpbHRlclZhbHVlKSkge1xuICAgICAgICAgIGEucHVzaChjKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhXG4gICAgICB9LCBbXSkgfHwgW11cbiAgICB9XG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgb3B0aW9ucygpIHtcbiAgICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHRoaXMuZ2V0RXhhY3RWYWx1ZXModGhpcy52YWx1ZSlcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBmb2N1cygpIHtcbiAgICAgIHRoaXMuJG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgdGhpcy4kcmVmcy5pbnB1dC5mb2N1cygpXG4gICAgICB9KVxuICAgIH0sXG4gICAgYmx1cigpIHtcbiAgICAgIHRoaXMuJHJlZnMuaW5wdXQuYmx1cigpXG4gICAgfSxcbiAgICBjbGVhckZpbHRlcigpIHtcbiAgICAgIHRoaXMuZmlsdGVyVmFsdWUgPSAnJ1xuICAgIH0sXG4gICAgdHJpZ2dlckJsdXIoZSkge1xuICAgICAgdGhpcy5mb2N1c2VkID0gZmFsc2VcbiAgICAgIHRoaXMuJGVtaXQoYGJsdXJgLCBlKVxuICAgIH0sXG4gICAgZ2V0SW5uZXIoaCkge1xuICAgICAgbGV0IGdldE9wdGlvbnMgPSBoID0+IHtcbiAgICAgICAgaWYgKHRoaXMuaW5uZXJPcHRpb25zLmxlbmd0aCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLmlubmVyT3B0aW9ucy5tYXAob3B0aW9uID0+IGgoJ3N3LWl0ZW0nLCB7XG4gICAgICAgICAgICBjbGFzczoge1xuICAgICAgICAgICAgICBzZWxlY3RlZDogdGhpcy5jaGVja1NlbGVjdGVkKG9wdGlvbilcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBuYXRpdmVPbjoge1xuICAgICAgICAgICAgICBjbGljazogZSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbm5lclZhbHVlID0gdGhpcy5mb3JtYXRWYWx1ZShvcHRpb24pXG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhckZpbHRlcigpXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXJCbHVyKGUpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuZm9jdXMoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNjb3BlZFNsb3RzOiB7XG4gICAgICAgICAgICAgIGRlZmF1bHQ6ICgpID0+IFtoKCdkaXYnLCB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1zZWxlY3RfX29wdGlvbidcbiAgICAgICAgICAgICAgfSwgU3RyaW5nKHRoaXMuZ2V0TmFtZShvcHRpb24pKSldXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIFtoKCdzdy1pdGVtJywge1xuICAgICAgICAgICAgc2NvcGVkU2xvdHM6IHtcbiAgICAgICAgICAgICAgZGVmYXVsdDogKCkgPT4gW2goJ2RpdicsIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogJ3N3LXNlbGVjdF9fb3B0aW9uIG5vLW9wdGlvbnMnXG4gICAgICAgICAgICAgIH0sICdubyBvcHRpb25zJyldXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSldXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGV0IGdldFNlbGVjdGVkID0gaCA9PiB0aGlzLmdldEV4YWN0T3B0aW9ucyh0aGlzLmlubmVyVmFsdWUpLm1hcCh4ID0+IGgoJ3N3LWl0ZW0nLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiAnbWFyZ2luLW1pbiBzdy1mb3JtIHNlbGVjdGVkLW9wdGlvbicsXG4gICAgICAgIGNsYXNzOiB0aGlzLnNlbGVjdGVkU3R5bGUgPT09IHZvaWQgMFxuICAgICAgICAgID8ge1xuICAgICAgICAgICAgdW5kZXJsaW5lOiB0aGlzLnVuZGVybGluZWQsXG4gICAgICAgICAgICBib3JkZXI6IHRoaXMuYm9yZGVyZWQsXG4gICAgICAgICAgICBmaWxsOiB0aGlzLmZpbGxlZFxuICAgICAgICAgIH0gOiB7XG4gICAgICAgICAgICBbdGhpcy5zZWxlY3RlZFN0eWxlXTogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgIHJlZjogJ3NlbGVjdGVkJyxcbiAgICAgICAgcmVmSW5Gb3I6IHRydWUsXG4gICAgICAgIHNjb3BlZFNsb3RzOiB7XG4gICAgICAgICAgZGVmYXVsdDogKCkgPT4gW2goJ2RpdicsIHtcbiAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgIHBhZGRpbmc6IHRoaXMubWluaSA/ICczcHggMCAzcHggOXB4JyA6ICczcHggOXB4JyxcbiAgICAgICAgICAgICAgJ3doaXRlLXNwYWNlJzogdGhpcy5taW5pID8gJ25vd3JhcCcgOiB2b2lkIDBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCBTdHJpbmcodGhpcy5nZXROYW1lKHgpKSldLFxuICAgICAgICAgIGFmdGVyOiAhdGhpcy5taW5pID8gKCkgPT4gW2goJ3N3LWljb24nLCB7XG4gICAgICAgICAgICBjbGFzczoge1xuICAgICAgICAgICAgICAnaG92ZXItY29sb3ItcHJpbWFyeSc6IHRydWUsXG4gICAgICAgICAgICAgICdjb2xvci1ncmV5JzogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICdib3JkZXItcmFkaXVzJzogJzUwJScsXG4gICAgICAgICAgICAgIHBhZGRpbmc6ICcwIDNweCAwIDAnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgICAgbmFtZTogdGhpcy5maWxsZWQgJiYgdGhpcy5zZWxlY3RlZFN0eWxlID09PSB2b2lkIDAgfHwgdGhpcy5zZWxlY3RlZFN0eWxlID09PSAnZmlsbCcgPyAnY2FuY2VsJyA6ICdjbGVhcicsXG4gICAgICAgICAgICAgIHNpemU6ICcxNHB4J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5hdGl2ZU9uOiB7XG4gICAgICAgICAgICAgIGNsaWNrOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbm5lclZhbHVlID0gdGhpcy5mb3JtYXRWYWx1ZSh4LCAncmVtb3ZlJylcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXSA6IHZvaWQgMFxuICAgICAgICB9XG4gICAgICB9KSlcblxuICAgICAgcmV0dXJuIFtoKCdzdy1pdGVtJywge1xuICAgICAgICBzdGF0aWNDbGFzczogJ2ZsZXgtYXV0bycsXG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgd3JhcDogdHJ1ZSxcbiAgICAgICAgICBoaWRlRGVmYXVsdDogdGhpcy5pbm5lclZhbHVlLmxlbmd0aCA+IDAgJiYgKCF0aGlzLmZvY3VzZWQgfHwgIXRoaXMuZmlsdGVyKVxuICAgICAgICB9LFxuICAgICAgICBzY29wZWRTbG90czoge1xuICAgICAgICAgIGJlZm9yZTogdGhpcy5pbm5lclZhbHVlLmxlbmd0aCA+IDAgPyAoKSA9PiBnZXRTZWxlY3RlZChoKSA6IHZvaWQgMCxcbiAgICAgICAgICBkZWZhdWx0OiAoKSA9PiBbaCgnaW5wdXQnLCB7XG4gICAgICAgICAgICByZWY6ICdpbnB1dCcsXG4gICAgICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWlucHV0IG1hcmdpbi1taW4nLFxuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgY3Vyc29yOiAhdGhpcy5maWx0ZXIgPyAncG9pbnRlcicgOiB2b2lkIDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkb21Qcm9wczoge1xuICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5maWx0ZXJWYWx1ZSxcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IHRoaXMucGxhY2Vob2xkZXIgfHwgJycsXG4gICAgICAgICAgICAgIGRpc2FibGVkOiAhdGhpcy5maWx0ZXJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAuLi50aGlzLiRsaXN0ZW5lcnMsXG4gICAgICAgICAgICAgIGlucHV0OiBlID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlclZhbHVlID0gZS50YXJnZXQudmFsdWVcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXVxuICAgICAgICB9XG4gICAgICB9KSwgdGhpcy5mb2N1c2VkID8gaCgnZGl2Jywge1xuICAgICAgICByZWY6ICdzZWxlY3RPcHRpb25zJyxcbiAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1zZWxlY3RfX29wdGlvbnMgY29tbW9uLXNoYWRvdycsXG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgJ21heC1oZWlnaHQnOiB0aGlzLm9wdGlvbnNIZWlnaHRcbiAgICAgICAgfVxuICAgICAgfSwgW2goJ3N3LXNjcm9sbC1hcmVhJywge1xuICAgICAgICBwcm9wczoge1xuICAgICAgICAgIHk6IHRydWUsXG4gICAgICAgICAgaGVpZ2h0OiB0aGlzLm9wdGlvbnNIZWlnaHRcbiAgICAgICAgfSxcbiAgICAgICAgc2NvcGVkU2xvdHM6IHtcbiAgICAgICAgICBkZWZhdWx0OiAoKSA9PiBnZXRPcHRpb25zKGgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICBdKSA6IHZvaWQgMF1cbiAgICB9LFxuICAgIGdldEFmdGVyKGgpIHtcbiAgICAgIHJldHVybiBbaCgnc3ctaWNvbicsIHtcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICBuYW1lOiAna2V5Ym9hcmRfYXJyb3dfZG93bicsXG4gICAgICAgICAgc2l6ZTogJzIwcHgnXG4gICAgICAgIH0sXG4gICAgICAgIHN0YXRpY0NsYXNzOiAnY29sb3ItZ3JleSBob3Zlci1jb2xvci1wcmltYXJ5JyxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHRoaXMuZm9jdXNlZCA/ICdyb3RhdGUoMTgwZGVnKScgOiB2b2lkIDBcbiAgICAgICAgfVxuICAgICAgfSldXG4gICAgfSxcbiAgICBmb3JtYXRWYWx1ZShvcHRpb24sIG9wZSkge1xuICAgICAgbGV0IGR1cGxpY2F0ZWQgPSBmYWxzZVxuICAgICAgbGV0IHJlcyA9IFtdXG5cbiAgICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgIHRoaXMuaW5uZXJWYWx1ZS5mb3JFYWNoKHggPT4ge1xuICAgICAgICAgIGlmIChpc0RlZXBFcXVhbCh4LCB0aGlzLmdldFZhbHVlKG9wdGlvbikpKSB7XG4gICAgICAgICAgICBkdXBsaWNhdGVkID0gdHJ1ZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXMucHVzaCh4KVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSBpZiAob3BlID09PSAncmVtb3ZlJykgeyBkdXBsaWNhdGVkID0gdHJ1ZSB9XG4gICAgICBpZiAoIWR1cGxpY2F0ZWQpIHtcbiAgICAgICAgcmVzLnB1c2godGhpcy5nZXRWYWx1ZShvcHRpb24pKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc1xuICAgIH0sXG4gICAgY2hlY2tTZWxlY3RlZChvcHRpb24pIHtcbiAgICAgIHJldHVybiB0aGlzLmlubmVyVmFsdWUuc29tZSh4ID0+IGlzRGVlcEVxdWFsKHgsIHRoaXMuZ2V0VmFsdWUob3B0aW9uKSkpXG4gICAgfSxcbiAgICBnZXRFeGFjdFZhbHVlcyh2YWx1ZSkge1xuICAgICAgbGV0IHYgPSBBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlIDogW3ZhbHVlXVxuXG4gICAgICByZXR1cm4gdi5yZWR1Y2UoKGEsIGMpID0+IHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5zb21lKHggPT4gaXNEZWVwRXF1YWwodGhpcy5nZXRWYWx1ZSh4KSwgYykpKSB7XG4gICAgICAgICAgYS5wdXNoKGMpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFcbiAgICAgIH0sIFtdKVxuICAgIH0sXG4gICAgZ2V0RXhhY3RPcHRpb25zKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdmFsdWUucmVkdWNlKChhLCBjKSA9PiB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5mb3JFYWNoKHggPT4ge1xuICAgICAgICAgIGlmIChpc0RlZXBFcXVhbCh0aGlzLmdldFZhbHVlKHgpLCBjKSkge1xuICAgICAgICAgICAgYS5wdXNoKHgpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gYVxuICAgICAgfSwgW10pXG4gICAgfSxcbiAgICBnZXRWYWx1ZShvcHRpb24pIHtcbiAgICAgIHJldHVybiBpc09iamVjdChvcHRpb24pICYmIG9wdGlvbi5oYXNPd25Qcm9wZXJ0eSgndmFsdWUnKVxuICAgICAgICA/IG9wdGlvbi52YWx1ZSA6IG9wdGlvblxuICAgIH0sXG4gICAgZ2V0TmFtZShvcHRpb24pIHtcbiAgICAgIHJldHVybiBpc09iamVjdChvcHRpb24pICYmIG9wdGlvbi5oYXNPd25Qcm9wZXJ0eSgnbmFtZScpXG4gICAgICAgID8gb3B0aW9uLm5hbWUgOiBvcHRpb25cbiAgICB9XG4gIH1cbn1cbiAgIiwiaW1wb3J0IFNlbGVjdCBmcm9tICcuL3NyYy9tYWluLmpzJ1xuXG5jb25zdCBpbnN0YWxsID0gZnVuY3Rpb24gKFZ1ZSkge1xuICBWdWUuY29tcG9uZW50KFNlbGVjdC5uYW1lLCBTZWxlY3QpXG59XG5cblNlbGVjdC5pbnN0YWxsID0gaW5zdGFsbFxuXG5leHBvcnQgZGVmYXVsdCBTZWxlY3RcbiIsImltcG9ydCBJdGVtIGZyb20gJy4uLy4uL2l0ZW0nXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3N3QnV0dG9uJyxcbiAgY29tcG9uZW50czogeyBJdGVtIH0sXG4gIHByb3BzOiB7XG4gICAgdW5kZXJsaW5lZDogQm9vbGVhbixcbiAgICBib3JkZXJlZDogQm9vbGVhbixcbiAgICBmaWxsZWQ6IEJvb2xlYW4sXG4gICAgZGlzYWJsZWQ6IEJvb2xlYW4sXG4gICAgY29sb3I6IFN0cmluZyxcbiAgICBwcmltYXJ5OiBCb29sZWFuLFxuICAgIG5lZ2F0aXZlOiBCb29sZWFuLFxuICAgIHBvc2l0aXZlOiBCb29sZWFuLFxuICAgIHdhcm5pbmc6IEJvb2xlYW4sXG4gICAgcm91bmQ6IEJvb2xlYW4sXG4gICAgc2hhZG93OiBCb29sZWFuLFxuICAgIG1pbmk6IEJvb2xlYW4sXG4gICAgdG86IFN0cmluZyB8IE9iamVjdCxcbiAgICBjZW50ZXI6IEJvb2xlYW4sXG4gICAgZW5kOiBCb29sZWFuXG4gIH0sXG4gIGRhdGE6ICgpID0+ICh7fSksXG4gIHJlbmRlcihoKSB7XG4gICAgcmV0dXJuIGgoJ2J1dHRvbicsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiAnc3ctYnV0dG9uIGZsZXggbm8td3JhcCBpdGVtcy1jZW50ZXInLFxuICAgICAgc3R5bGU6IHtcbiAgICAgICAgY29sb3I6ICF0aGlzLmRpc2FibGVkICYmICF0aGlzLmZpbGxlZCAmJiB0aGlzLmNvbG9yIHx8IHZvaWQgMCxcbiAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiAhdGhpcy5kaXNhYmxlZCAmJiB0aGlzLmZpbGxlZCAmJiB0aGlzLmNvbG9yIHx8IHZvaWQgMFxuICAgICAgfSxcbiAgICAgIGNsYXNzOiB7XG4gICAgICAgIHVuZGVybGluZTogdGhpcy51bmRlcmxpbmVkLFxuICAgICAgICBib3JkZXI6IHRoaXMuYm9yZGVyZWQsXG4gICAgICAgIGZpbGw6IHRoaXMuZmlsbGVkLFxuICAgICAgICBwcmltYXJ5OiB0aGlzLnByaW1hcnksXG4gICAgICAgIG5lZ2F0aXZlOiB0aGlzLm5lZ2F0aXZlLFxuICAgICAgICBwb3NpdGl2ZTogdGhpcy5wb3NpdGl2ZSxcbiAgICAgICAgd2FybmluZzogdGhpcy53YXJuaW5nLFxuICAgICAgICBncmV5OiB0aGlzLmRpc2FibGVkLFxuICAgICAgICByb3VuZDogdGhpcy5yb3VuZCAmJiAhdGhpcy51bmRlcmxpbmVkLFxuICAgICAgICAnY29tbW9uLXNoYWRvdyc6IHRoaXMuc2hhZG93ICYmICh0aGlzLmJvcmRlcmVkIHx8IHRoaXMuZmlsbGVkKVxuICAgICAgfVxuICAgIH0sIFtcbiAgICAgIGgoJ3N3LWl0ZW0nLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiAnZmxleC1hdXRvJyxcbiAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAncm91bmQtc2xvdCc6IHRoaXMuJHNjb3BlZFNsb3RzLnJvdW5kLFxuICAgICAgICAgIG1pbmk6IHRoaXMubWluaVxuICAgICAgICB9LFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgIGN1cnNvcjogJ3BvaW50ZXInXG4gICAgICAgIH0sXG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgdG86IHRoaXMudG8sXG4gICAgICAgICAgY2VudGVyOiB0aGlzLmNlbnRlcixcbiAgICAgICAgICBlbmQ6IHRoaXMuZW5kLFxuICAgICAgICAgIGRpc2FibGVkOiB0aGlzLmRpc2FibGVkXG4gICAgICAgIH0sXG4gICAgICAgIG9uOiB0aGlzLmRpc2FibGVkID8gdm9pZCAwIDoge1xuICAgICAgICAgIC4uLnRoaXMuJGxpc3RlbmVyc1xuICAgICAgICB9LFxuICAgICAgICBzY29wZWRTbG90czogdGhpcy4kc2NvcGVkU2xvdHMucm91bmQgIT09IHZvaWQgMFxuICAgICAgICAgID8ge1xuICAgICAgICAgICAgZGVmYXVsdDogKCkgPT4gW2goJ2RpdicsIHtcbiAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6ICdmbGV4IG5vLXdyYXAgaXRlbXMtY2VudGVyIG1hcmdpbi1taW4gc3ctYnV0dG9uX19pbm5lciBmbGV4LWF1dG8nXG4gICAgICAgICAgICB9LCBbdGhpcy4kc2NvcGVkU2xvdHMucm91bmQoKV0pXVxuICAgICAgICAgIH0gOiB7XG4gICAgICAgICAgICBiZWZvcmU6IHRoaXMuJHNjb3BlZFNsb3RzLmJlZm9yZSAhPT0gdm9pZCAwXG4gICAgICAgICAgICAgID8gKCkgPT4gW2goJ2RpdicsIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogJ2ZsZXggbm8td3JhcCBpdGVtcy1jZW50ZXIgbWFyZ2luLW1pbiBzdy1idXR0b25fX2JlZm9yZSdcbiAgICAgICAgICAgICAgfSwgW3RoaXMuJHNjb3BlZFNsb3RzLmJlZm9yZSgpXSldIDogdm9pZCAwLFxuICBcbiAgICAgICAgICAgIGRlZmF1bHQ6IHRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQgIT09IHZvaWQgMFxuICAgICAgICAgICAgICA/ICgpID0+IFtoKCdkaXYnLCB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6ICdmbGV4IG5vLXdyYXAgaXRlbXMtY2VudGVyIG1hcmdpbi1taW4gc3ctYnV0dG9uX19pbm5lciBmbGV4LWF1dG8nXG4gICAgICAgICAgICAgIH0sIFt0aGlzLiRzY29wZWRTbG90cy5kZWZhdWx0KCldKV0gOiB2b2lkIDAsXG4gIFxuICAgICAgICAgICAgYWZ0ZXI6IHRoaXMuJHNjb3BlZFNsb3RzLmFmdGVyICE9PSB2b2lkIDBcbiAgICAgICAgICAgICAgPyAoKSA9PiBbaCgnZGl2Jywge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiAnZmxleCBuby13cmFwIGl0ZW1zLWNlbnRlciBtYXJnaW4tbWluIHN3LWJ1dHRvbl9fYWZ0ZXInXG4gICAgICAgICAgICAgIH0sIFt0aGlzLiRzY29wZWRTbG90cy5hZnRlcigpXSldIDogdm9pZCAwXG4gICAgICAgICAgfVxuICAgICAgfSlcbiAgICBdKVxuICB9XG59XG4gICIsImltcG9ydCBCdXR0b24gZnJvbSAnLi9zcmMvbWFpbi5qcydcblxuY29uc3QgaW5zdGFsbCA9IGZ1bmN0aW9uIChWdWUpIHtcbiAgVnVlLmNvbXBvbmVudChCdXR0b24ubmFtZSwgQnV0dG9uKVxufVxuXG5CdXR0b24uaW5zdGFsbCA9IGluc3RhbGxcblxuZXhwb3J0IGRlZmF1bHQgQnV0dG9uXG4iLCJpbXBvcnQgc3dCdXR0b24gZnJvbSAnLi4vLi4vYnV0dG9uJ1xuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnc3dNb2RhbCcsXG4gIGNvbXBvbmVudHM6IHtcbiAgICBzd0J1dHRvblxuICB9LFxuICBwcm9wczoge1xuICAgIHNob3c6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICB9LFxuICAgIHRpdGxlOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAn5Z+65pys55So5rOVdGl0bGUnXG4gICAgfSxcbiAgICB3aWR0aDoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJzQwJSdcbiAgICB9XG4gIH0sXG4gIGNvbXB1dGVkOiB7XG4gICAgc3R5bGUoKSB7XG4gICAgICBpZiAodGhpcy5zaG93KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgekluZGV4OiA5OTksXG4gICAgICAgICAgb3BhY2l0eTogMVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHpJbmRleDogLTEwLFxuICAgICAgICAgIG9wYWNpdHk6IDBcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGhhbmRsZUNhbmNlbCgpIHtcbiAgICAgIHRoaXMuJGVtaXQoJ2NhbmNlbCcpXG4gICAgfSxcbiAgICBoYW5kbGVDb25maXJtKCkge1xuICAgICAgdGhpcy4kZW1pdCgnY29uZmlybScpXG4gICAgfSxcbiAgfSxcbiAgcmVuZGVyKGgpIHtcbiAgICByZXR1cm4gaCgnZGl2Jyx7XG4gICAgICBzdGF0aWNDbGFzczogJ3N3LW1vZGFsLW1hc2snLFxuICAgICAgc3R5bGU6IHRoaXMuc3R5bGUsXG4gICAgICBvbjoge1xuICAgICAgICBjbGljazogdGhpcy5oYW5kbGVDYW5jZWxcbiAgICAgIH0gXG4gICAgfSwgWyBoKCdkaXYnLCB7IFxuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogJ3N3LW1vZGFsJyxcbiAgICAgICAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAgICAgICBzaG93TW9kYWw6IHRoaXMuc2hvdyxcbiAgICAgICAgICAgICAgICBoaWRlTW9kYWw6ICF0aGlzLnNob3dcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICB3aWR0aDogdGhpcy53aWR0aFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgIGNsaWNrOiBldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgWyB0aGlzLiRzY29wZWRTbG90cy5oZWFkZXIgPT09IHZvaWQgMCBcbiAgICAgICAgICAgICAgICA/IGgoJ2RpdicsIFxuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiAnc3ctbW9kYWwtdGl0bGUnXG4gICAgICAgICAgICAgICAgICAgICAgfSwgWyBoKCdzcGFuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6ICdzdy1tb2RhbC10aXRsZS10ZXh0J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGl0bGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgaCgnc3BhbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiAnc3ctbW9kYWwtY2xvc2UtaWNvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6ICgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVDYW5jZWwoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGgoJ2knLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiAnbWF0ZXJpYWwtaWNvbnMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdjbG9zZScpIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICA6IHRoaXMuJHNjb3BlZFNsb3RzLmhlYWRlcigpLFxuICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlZFNsb3RzLmNvbnRlbnQoKSxcbiAgICAgICAgICAgICAgICB0aGlzLiRzY29wZWRTbG90cy5mb290ZXIgPT09IHZvaWQgMCBcbiAgICAgICAgICAgICAgICA/IGgoJ2RpdicsIFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzczogJ3N3LW1vZGFsLWZvb3RlcidcbiAgICAgICAgICAgICAgICAgICAgfSwgXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICBoKCdzdy1idXR0b24nLHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiAnYnRuIGxlZnQtYnRuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiAoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVDYW5jZWwoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfSwgJ+WPlua2iCcpLFxuICAgICAgICAgICAgICAgICAgICAgIGgoJ3N3LWJ1dHRvbicse1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6ICdidG4gcmlnaHQtYnRuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiAoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVDb25maXJtKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH0sICfnoa7lrponKVxuICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgIDogdGhpcy4kc2NvcGVkU2xvdHMuZm9vdGVyXG4gICAgICAgICAgICAgIF0gICAgICAgICAgICAgIFxuICAgICAgICAgIClcbiAgICAgICAgXVxuICAgIClcbiAgfVxufSIsImltcG9ydCBNb2RhbCBmcm9tICcuL3NyYy9tYWluLmpzJ1xuXG5jb25zdCBpbnN0YWxsID0gZnVuY3Rpb24gKFZ1ZSkge1xuICBWdWUuY29tcG9uZW50KE1vZGFsLm5hbWUsIE1vZGFsKVxufVxuXG5Nb2RhbC5pbnN0YWxsID0gaW5zdGFsbFxuXG5leHBvcnQgZGVmYXVsdCBNb2RhbFxuIiwiaW1wb3J0IFZ1ZSBmcm9tICd2dWUnXG5cbmNvbnN0IGlzU2VydmVyID0gVnVlLnByb3RvdHlwZS4kaXNTZXJ2ZXI7XG5cbmV4cG9ydCBmdW5jdGlvbiBvZmZzZXQoZWwpIHtcbiAgaWYgKGVsID09PSB3aW5kb3cpIHtcbiAgICByZXR1cm4geyB0b3A6IDAsIGxlZnQ6IDAgfVxuICB9XG4gIGNvbnN0IHsgdG9wLCBsZWZ0IH0gPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuXG4gIHJldHVybiB7IHRvcCwgbGVmdCB9XG59XG4gIFxuZXhwb3J0IGZ1bmN0aW9uIHN0eWxlKGVsLCBwcm9wZXJ0eSkge1xuICByZXR1cm4gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwpLmdldFByb3BlcnR5VmFsdWUocHJvcGVydHkpXG59XG4gIFxuZXhwb3J0IGZ1bmN0aW9uIGhlaWdodChlbCkge1xuICByZXR1cm4gZWwgPT09IHdpbmRvd1xuICAgID8gd2luZG93LmlubmVySGVpZ2h0XG4gICAgOiBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHRcbn1cbiAgXG5leHBvcnQgZnVuY3Rpb24gd2lkdGgoZWwpIHtcbiAgcmV0dXJuIGVsID09PSB3aW5kb3dcbiAgICA/IHdpbmRvdy5pbm5lcldpZHRoXG4gICAgOiBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aFxufVxuICBcbmV4cG9ydCBmdW5jdGlvbiBjc3MoZWxlbWVudCwgY3NzKSB7XG4gIGxldCBzdHlsZSA9IGVsZW1lbnQuc3R5bGVcbiAgXG4gIE9iamVjdC5rZXlzKGNzcykuZm9yRWFjaChwcm9wID0+IHtcbiAgICBzdHlsZVtwcm9wXSA9IGNzc1twcm9wXVxuICB9KVxufVxuICBcbmV4cG9ydCBmdW5jdGlvbiBjc3NCYXRjaChlbGVtZW50cywgc3R5bGUpIHtcbiAgZWxlbWVudHMuZm9yRWFjaChlbCA9PiBjc3MoZWwsIHN0eWxlKSlcbn1cbiAgXG5leHBvcnQgZnVuY3Rpb24gcmVhZHkoZm4pIHtcbiAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVyblxuICB9XG4gIFxuICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSAhPT0gJ2xvYWRpbmcnKSB7XG4gICAgcmV0dXJuIGZuKClcbiAgfVxuICBcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZuLCBmYWxzZSlcbn1cblxuZXhwb3J0IGNvbnN0IG9uID0gKGZ1bmN0aW9uKCkge1xuICBpZiAoIWlzU2VydmVyICYmIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oZWxlbWVudCwgZXZlbnQsIGhhbmRsZXIpIHtcbiAgICAgIGlmIChlbGVtZW50ICYmIGV2ZW50ICYmIGhhbmRsZXIpIHtcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oZWxlbWVudCwgZXZlbnQsIGhhbmRsZXIpIHtcbiAgICAgIGlmIChlbGVtZW50ICYmIGV2ZW50ICYmIGhhbmRsZXIpIHtcbiAgICAgICAgZWxlbWVudC5hdHRhY2hFdmVudCgnb24nICsgZXZlbnQsIGhhbmRsZXIpO1xuICAgICAgfVxuICAgIH07XG4gIH1cbn0pKCk7XG5cbmV4cG9ydCBjb25zdCBvZmYgPSAoZnVuY3Rpb24oKSB7XG4gIGlmICghaXNTZXJ2ZXIgJiYgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcikge1xuICAgIHJldHVybiBmdW5jdGlvbihlbGVtZW50LCBldmVudCwgaGFuZGxlcikge1xuICAgICAgaWYgKGVsZW1lbnQgJiYgZXZlbnQpIHtcbiAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oZWxlbWVudCwgZXZlbnQsIGhhbmRsZXIpIHtcbiAgICAgIGlmIChlbGVtZW50ICYmIGV2ZW50KSB7XG4gICAgICAgIGVsZW1lbnQuZGV0YWNoRXZlbnQoJ29uJyArIGV2ZW50LCBoYW5kbGVyKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG59KSgpOyAgXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgb2Zmc2V0LFxuICBzdHlsZSxcbiAgaGVpZ2h0LFxuICB3aWR0aCxcbiAgY3NzLFxuICBjc3NCYXRjaCxcbiAgcmVhZHksXG4gIG9uLFxuICBvZmZcbn0iLCJpbXBvcnQgeyBvbiwgb2ZmIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvZG9tJyBcbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3N3UG9wb3ZlcicsXG4gIGRhdGEgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBwb3BvdmVyU3R5bGU6IHt9LFxuICAgICAgYXJyb3dTdHlsZToge30sXG4gICAgICBzaG93OiBmYWxzZSxcbiAgICAgIHJlZmVyZW5jZUVsbToge31cbiAgICB9XG4gIH0sXG4gIG1vZGVsOiB7XG4gICAgcHJvcDogJ3ZhbHVlJyxcbiAgICBldmVudDogJ3VwZGF0ZSdcbiAgfSxcbiAgcHJvcHM6IHtcbiAgICB2YWx1ZToge1xuICAgICAgdHlwZTogQm9vbGVhblxuICAgIH0sXG4gICAgdGl0bGU6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICB9LFxuICAgIGNvbnRlbnQ6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICB9LFxuICAgIHBsYWNlbWVudDoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ3RvcCdcbiAgICB9LFxuICAgIHRyaWdnZXI6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdjbGljaycsXG4gICAgICB2YWxpZGF0b3I6IHZhbHVlID0+IFsnY2xpY2snLCAnZm9jdXMnLCAnaG92ZXInLCAnbWFudWFsJ10uaW5kZXhPZih2YWx1ZSkgPiAtMVxuICAgIH0sXG4gICAgd2lkdGg6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICB9XG4gIH0sXG4gIGNvbXB1dGVkOiB7XG4gICAgc2hvd1ZhbHVlOiB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVcbiAgICAgIH0sXG4gICAgICBzZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIH1cbiAgICB9LFxuICAgIHNob3dTdHlsZSgpIHtcbiAgICAgIGlmICh0aGlzLnRyaWdnZXIgIT09ICdtYW51YWwnKSB7XG4gICAgICAgIGlmICh0aGlzLnNob3cpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgekluZGV4OiA5OTksXG4gICAgICAgICAgICBvcGFjaXR5OiAxXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB6SW5kZXg6IC0xMCxcbiAgICAgICAgICAgIG9wYWNpdHk6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLnNob3dWYWx1ZSkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB6SW5kZXg6IDk5OSxcbiAgICAgICAgICAgIG9wYWNpdHk6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHpJbmRleDogLTEwLFxuICAgICAgICAgICAgb3BhY2l0eTogMFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGdldFN0eWxlKHBvcG92ZXJFbG0sIHJlZmVyZW5jZUVsbSkge1xuICAgICAgc3dpdGNoICh0aGlzLnBsYWNlbWVudCkge1xuICAgICAgICBjYXNlICd0b3Atc3RhcnQnOlxuICAgICAgICAgIHRoaXMucG9wb3ZlclN0eWxlID0ge1xuICAgICAgICAgICAgdG9wOiAnLScgKyAocG9wb3ZlckVsbS5vZmZzZXRIZWlnaHQgKyAxMCkgKyAncHgnXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuYXJyb3dTdHlsZSA9IHtcbiAgICAgICAgICAgIGxlZnQ6IChyZWZlcmVuY2VFbG0ub2Zmc2V0V2lkdGggLyAyIC0gNSkgKyAncHgnXG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICd0b3AnOlxuICAgICAgICAgIHRoaXMucG9wb3ZlclN0eWxlID0ge1xuICAgICAgICAgICAgdG9wOiAnLScgKyAocG9wb3ZlckVsbS5vZmZzZXRIZWlnaHQgKyAxMCkgKyAncHgnLFxuICAgICAgICAgICAgbGVmdDogKHJlZmVyZW5jZUVsbS5vZmZzZXRXaWR0aCAtIHBvcG92ZXJFbG0ub2Zmc2V0V2lkdGgpIC8gMiArICdweCdcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5hcnJvd1N0eWxlID0ge1xuICAgICAgICAgICAgbGVmdDogKHBvcG92ZXJFbG0ub2Zmc2V0V2lkdGggLyAyIC0gNSkgKyAncHgnXG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgJ2JvdHRvbS1zdGFydCc6IFxuICAgICAgICAgIHRoaXMucG9wb3ZlclN0eWxlID0ge1xuICAgICAgICAgICAgdG9wOiAocmVmZXJlbmNlRWxtLm9mZnNldEhlaWdodCArIDEwKSArICdweCdcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5hcnJvd1N0eWxlID0ge1xuICAgICAgICAgICAgbGVmdDogKHJlZmVyZW5jZUVsbS5vZmZzZXRXaWR0aCAvIDIgLSA1KSArICdweCdcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWsgXG4gICAgICAgIGNhc2UgJ2JvdHRvbSc6XG4gICAgICAgICAgdGhpcy5wb3BvdmVyU3R5bGUgPSB7XG4gICAgICAgICAgICB0b3A6IChyZWZlcmVuY2VFbG0ub2Zmc2V0SGVpZ2h0ICsgMTApICsgJ3B4JyxcbiAgICAgICAgICAgIGxlZnQ6IChyZWZlcmVuY2VFbG0ub2Zmc2V0V2lkdGggLSBwb3BvdmVyRWxtLm9mZnNldFdpZHRoKSAvIDIgKyAncHgnXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuYXJyb3dTdHlsZSA9IHtcbiAgICAgICAgICAgIGxlZnQ6IChwb3BvdmVyRWxtLm9mZnNldFdpZHRoIC8gMiAtIDUpICsgJ3B4J1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlICdyaWdodC1zdGFydCc6XG4gICAgICAgICAgdGhpcy5wb3BvdmVyU3R5bGUgPSB7XG4gICAgICAgICAgICBsZWZ0OiAocmVmZXJlbmNlRWxtLm9mZnNldFdpZHRoICsgMTApICsgJ3B4JyxcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5hcnJvd1N0eWxlID0ge1xuICAgICAgICAgICAgdG9wOiAocmVmZXJlbmNlRWxtLm9mZnNldEhlaWdodCAvIDIgLSA1KSArICdweCdcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWsgIFxuICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgdGhpcy5wb3BvdmVyU3R5bGUgPSB7XG4gICAgICAgICAgICBsZWZ0OiAocmVmZXJlbmNlRWxtLm9mZnNldFdpZHRoICsgMTApICsgJ3B4JyxcbiAgICAgICAgICAgIHRvcDogKHJlZmVyZW5jZUVsbS5vZmZzZXRIZWlnaHQgLSBwb3BvdmVyRWxtLm9mZnNldEhlaWdodCkgLyAyICsgJ3B4J1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmFycm93U3R5bGUgPSB7XG4gICAgICAgICAgICB0b3A6IChwb3BvdmVyRWxtLm9mZnNldEhlaWdodCAvIDIgLSA1KSArICdweCdcbiAgICAgICAgICB9IFxuICAgICAgICAgIGJyZWFrIFxuICAgICAgICBjYXNlICdsZWZ0LXN0YXJ0JzpcbiAgICAgICAgICB0aGlzLnBvcG92ZXJTdHlsZSA9IHtcbiAgICAgICAgICAgIHJpZ2h0OiAocmVmZXJlbmNlRWxtLm9mZnNldFdpZHRoICsgMTApICsgJ3B4JyxcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5hcnJvd1N0eWxlID0ge1xuICAgICAgICAgICAgdG9wOiAocmVmZXJlbmNlRWxtLm9mZnNldEhlaWdodCAvIDIgLSA1KSArICdweCdcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgdGhpcy5wb3BvdmVyU3R5bGUgPSB7XG4gICAgICAgICAgICByaWdodDogKHJlZmVyZW5jZUVsbS5vZmZzZXRXaWR0aCArIDEwKSArICdweCcsXG4gICAgICAgICAgICB0b3A6IChyZWZlcmVuY2VFbG0ub2Zmc2V0SGVpZ2h0IC0gcG9wb3ZlckVsbS5vZmZzZXRIZWlnaHQpIC8gMiArICdweCdcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5hcnJvd1N0eWxlID0ge1xuICAgICAgICAgICAgdG9wOiAocG9wb3ZlckVsbS5vZmZzZXRIZWlnaHQgLyAyIC0gNSkgKyAncHgnXG4gICAgICAgICAgfSBcbiAgICAgICAgICBicmVhayAgICAgICAgXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSxcbiAgICBoYW5kbGVDbGljaygpIHtcbiAgICAgIHRoaXMuc2hvdyA9ICF0aGlzLnNob3dcbiAgICB9LFxuICAgIGhhbmRsZU1vdXNlRW50ZXIoKSB7XG4gICAgICB0aGlzLnNob3cgPSB0cnVlXG4gICAgfSxcbiAgICBoYW5kbGVNb3VzZUxlYXZlKCkge1xuICAgICAgdGhpcy5zaG93ID0gZmFsc2VcbiAgICB9LFxuICAgIGRvU2hvdygpIHtcbiAgICAgIHRoaXMuc2hvdyA9IHRydWVcbiAgICB9LFxuICAgIGRvQ2xvc2UoKSB7XG4gICAgICB0aGlzLnNob3cgPSBmYWxzZVxuICAgIH0sXG4gICAgaGFuZGxlTWFudWFsKCkge1xuICAgICAgdGhpcy5zaG93VmFsdWUgPSAhdGhpcy5zaG93VmFsdWVcbiAgICAgIHRoaXMuJGVtaXQoXCJ1cGRhdGVcIiwgdGhpcy5zaG93VmFsdWUpO1xuICAgIH1cbiAgfSxcbiAgbW91bnRlZCAoKSB7XG4gICAgbGV0IHBvcG92ZXJFbG0gPSB0aGlzLiRyZWZzLnBvcG92ZXJcbiAgICBsZXQgcmVmZXJlbmNlRWxtID0gdGhpcy5yZWZlcmVuY2VFbG0gPSB0aGlzLiRzY29wZWRTbG90cy5yZWZlcmVuY2UoKVswXS5lbG1cbiAgICB0aGlzLmdldFN0eWxlKHBvcG92ZXJFbG0sIHJlZmVyZW5jZUVsbSlcbiAgICBpZih0aGlzLnRyaWdnZXIgPT09ICdtYW51YWwnKXtcbiAgICAgIG9uKHJlZmVyZW5jZUVsbSwgJ2NsaWNrJywgdGhpcy5oYW5kbGVNYW51YWwpO1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGlmICh0aGlzLnRyaWdnZXIgPT09ICdjbGljaycpIHtcbiAgICAgIG9uKHJlZmVyZW5jZUVsbSwgJ2NsaWNrJywgdGhpcy5oYW5kbGVDbGljayk7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgaWYodGhpcy50cmlnZ2VyID09PSAnaG92ZXInKXtcbiAgICAgIG9uKHJlZmVyZW5jZUVsbSwgJ21vdXNlZW50ZXInLCB0aGlzLmhhbmRsZU1vdXNlRW50ZXIpXG4gICAgICBvbihyZWZlcmVuY2VFbG0sICdtb3VzZWxlYXZlJywgdGhpcy5oYW5kbGVNb3VzZUxlYXZlKTtcbiAgICB9XG4gICAgaWYodGhpcy50cmlnZ2VyID09PSAnZm9jdXMnKXtcbiAgICAgIGlmIChyZWZlcmVuY2VFbG0ucXVlcnlTZWxlY3RvcignaW5wdXQsIHRleHRhcmVhJykpIHtcbiAgICAgICAgb24ocmVmZXJlbmNlRWxtLCAnZm9jdXNpbicsIHRoaXMuZG9TaG93KTtcbiAgICAgICAgb24ocmVmZXJlbmNlRWxtLCAnZm9jdXNvdXQnLCB0aGlzLmRvQ2xvc2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb24ocmVmZXJlbmNlRWxtLCAnbW91c2Vkb3duJywgdGhpcy5kb1Nob3cpO1xuICAgICAgICBvbihyZWZlcmVuY2VFbG0sICdtb3VzZXVwJywgdGhpcy5kb0Nsb3NlKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGRlc3Ryb3llZCAoKSB7XG4gICAgY29uc3QgcmVmZXJlbmNlID0gdGhpcy5yZWZlcmVuY2VFbG07XG4gICAgb2ZmKHJlZmVyZW5jZSwgJ2NsaWNrJywgdGhpcy5oYW5kbGVDbGljayk7XG4gICAgb2ZmKHJlZmVyZW5jZSwgJ21vdXNldXAnLCB0aGlzLmRvQ2xvc2UpO1xuICAgIG9mZihyZWZlcmVuY2UsICdtb3VzZWRvd24nLCB0aGlzLmRvU2hvdyk7XG4gICAgb2ZmKHJlZmVyZW5jZSwgJ2ZvY3VzaW4nLCB0aGlzLmRvU2hvdyk7XG4gICAgb2ZmKHJlZmVyZW5jZSwgJ2ZvY3Vzb3V0JywgdGhpcy5kb0Nsb3NlKTtcbiAgICBvZmYocmVmZXJlbmNlLCAnbW91c2Vkb3duJywgdGhpcy5kb1Nob3cpO1xuICAgIG9mZihyZWZlcmVuY2UsICdtb3VzZXVwJywgdGhpcy5kb0Nsb3NlKTtcbiAgICBvZmYocmVmZXJlbmNlLCAnbW91c2VsZWF2ZScsIHRoaXMuaGFuZGxlTW91c2VMZWF2ZSk7XG4gICAgb2ZmKHJlZmVyZW5jZSwgJ21vdXNlZW50ZXInLCB0aGlzLmhhbmRsZU1vdXNlRW50ZXIpO1xuICAgIG9mZihkb2N1bWVudCwgJ2NsaWNrJywgdGhpcy5oYW5kbGVNYW51YWwpO1xuICB9LFxuICByZW5kZXIoaCkge1xuICAgIHJldHVybiBoKCdkaXYnLHtcbiAgICAgIGNsYXNzOiAnc3ctcG9wb3Zlci1jb250YWluJyxcbiAgICB9LCBbIGgoJ2RpdicsIFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogJ3N3LXBvcG92ZXInLFxuICAgICAgICAgICAgICBjbGFzczogJ3N3LXBvcG92ZXItc2hvdycsXG4gICAgICAgICAgICAgIHJlZjogJ3BvcG92ZXInLFxuICAgICAgICAgICAgICBzdHlsZTogT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHRoaXMucG9wb3ZlclN0eWxlLCB7d2lkdGg6IHRoaXMud2lkdGggfSksIHRoaXMuc2hvd1N0eWxlKVxuICAgICAgICB9LCBbIHRoaXMudGl0bGUgIFxuICAgICAgICAgICAgICA/IGgoJ2RpdicsIHtcbiAgICAgICAgICAgICAgICBjbGFzczogJ3N3LXBvcG92ZXItdGl0bGUnXG4gICAgICAgICAgICAgIH0sIHRoaXMudGl0bGUpXG4gICAgICAgICAgICAgIDogJycsIFxuICAgICAgICAgICAgIHRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQgPT09IHZvaWQgMFxuICAgICAgICAgICAgID8gaCgnZGl2Jywge1xuICAgICAgICAgICAgICAgIGNsYXNzOiAnc3ctcG9wb3Zlci1jb250ZW50J1xuICAgICAgICAgICAgIH0sIHRoaXMuY29udGVudCB8fCAnJyApXG4gICAgICAgICAgICAgIDogdGhpcy4kc2NvcGVkU2xvdHMuZGVmYXVsdCgpLFxuICAgICAgICAgICAgIGgoJ2Rpdicse1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctcG9wb3Zlci1hcnJvdycsXG4gICAgICAgICAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAgICAgICAnc3ctcG9wb3Zlci1hcnJvdy10b3AnOiB0aGlzLnBsYWNlbWVudC5pbmRleE9mKCd0b3AnKSA+PSAwID8gdHJ1ZSA6IGZhbHNlLFxuICAgICAgICAgICAgICAgICdzdy1wb3BvdmVyLWFycm93LWJvdHRvbSc6IHRoaXMucGxhY2VtZW50LmluZGV4T2YoJ2JvdHRvbScpID49IDAgPyB0cnVlIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgJ3N3LXBvcG92ZXItYXJyb3ctcmlnaHQnOiB0aGlzLnBsYWNlbWVudC5pbmRleE9mKCdyaWdodCcpID49IDAgPyB0cnVlIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgJ3N3LXBvcG92ZXItYXJyb3ctbGVmdCc6IHRoaXMucGxhY2VtZW50LmluZGV4T2YoJ2xlZnQnKSA+PSAwID8gdHJ1ZSA6IGZhbHNlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc3R5bGU6IHRoaXMuYXJyb3dTdHlsZVxuICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdKSwgXG4gICAgICAgIHRoaXMuJHNjb3BlZFNsb3RzLnJlZmVyZW5jZSA9PT0gdm9pZCAwIFxuICAgICAgICA/IGgoKVxuICAgICAgICA6IHRoaXMuJHNjb3BlZFNsb3RzLnJlZmVyZW5jZSgpXG4gICAgICBdKSBcbiAgfVxufSIsImltcG9ydCBQb3BvdmVyIGZyb20gJy4vc3JjL21haW4uanMnXG5cbmNvbnN0IGluc3RhbGwgPSBmdW5jdGlvbiAoVnVlKSB7XG4gIFZ1ZS5jb21wb25lbnQoTW9kYWwubmFtZSwgUG9wb3Zlcilcbn1cblxuUG9wb3Zlci5pbnN0YWxsID0gaW5zdGFsbFxuXG5leHBvcnQgZGVmYXVsdCBQb3BvdmVyXG4iLCJpbXBvcnQgSXRlbSBmcm9tICcuLi8uLi9pdGVtJ1xuaW1wb3J0IHsgaXNEZWVwRXF1YWwgfSBmcm9tICcuLi8uLi8uLi91dGlscy9pcydcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnc3dDaGVja2JveCcsXG4gIGNvbXBvbmVudHM6IHsgSXRlbSB9LFxuICBwcm9wczoge1xuICAgIHZhbHVlOiBCb29sZWFuIHwgQXJyYXksXG4gICAgdmFsOiB7XG4gICAgICByZXF1aXJlZDogZmFsc2VcbiAgICB9LFxuICAgIGxhYmVsOiBTdHJpbmcsXG4gICAgZGlzYWJsZWQ6IEJvb2xlYW4sXG4gICAgY29sb3I6IFN0cmluZyxcbiAgICBwcmltYXJ5OiBCb29sZWFuLFxuICAgIG5lZ2F0aXZlOiBCb29sZWFuLFxuICAgIHBvc2l0aXZlOiBCb29sZWFuLFxuICAgIHdhcm5pbmc6IEJvb2xlYW4sXG4gICAgbGVmdExhYmVsOiBCb29sZWFuLFxuICAgIGNvbG9yTGFiZWw6IEJvb2xlYW4sXG4gICAga2VlcENvbG9yOiBCb29sZWFuXG4gIH0sXG4gIGRhdGE6ICgpID0+ICh7XG4gICAgcGFyZW50OiB2b2lkIDBcbiAgfSksXG4gIGNvbXB1dGVkOiB7XG4gICAgbW9kZWwoKSB7XG4gICAgICByZXR1cm4gdGhpcy5wYXJlbnQgPT09IHZvaWQgMCA/IHRoaXMudmFsdWUgOiB0aGlzLnBhcmVudC52YWx1ZVxuICAgIH0sXG4gICAgcGFyZW50RGlzYWJsZWQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5wYXJlbnQgJiYgdGhpcy5wYXJlbnQuZGlzYWJsZWRcbiAgICB9LFxuICAgIGNoZWNrZWQ6IHtcbiAgICAgIGdldCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYm9vbGVhbk1vZGUgPyB0aGlzLm1vZGVsIDogdGhpcy5nZXRDaGVja2VkKHRoaXMudmFsKVxuICAgICAgfSxcbiAgICAgIHNldCh2YWwpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzLnBhcmVudCA9PT0gdm9pZCAwID8gdGhpcyA6IHRoaXMucGFyZW50XG5cbiAgICAgICAgc2VsZi4kZW1pdChcbiAgICAgICAgICAnaW5wdXQnLFxuICAgICAgICAgIHRoaXMuZm9ybWF0VmFsdWUodmFsKVxuICAgICAgICApXG4gICAgICB9XG4gICAgfSxcbiAgICBpbm5lclZhbHVlKCkge1xuICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkodGhpcy5tb2RlbCkgPyB0aGlzLm1vZGVsIDogW3RoaXMubW9kZWxdXG4gICAgfSxcbiAgICBib29sZWFuTW9kZSgpIHtcbiAgICAgIHJldHVybiB0aGlzLnZhbCA9PT0gdm9pZCAwXG4gICAgfVxuICB9LFxuICB3YXRjaDoge30sXG4gIG1ldGhvZHM6IHtcbiAgICBnZXRDaGVja2VkKHZhbCkge1xuICAgICAgcmV0dXJuIHRoaXMuaW5uZXJWYWx1ZS5zb21lKHggPT4gaXNEZWVwRXF1YWwoeCwgdmFsKSlcbiAgICB9LFxuICAgIGZvcm1hdFZhbHVlKGNoZWNrZWQpIHtcbiAgICAgIGlmICh0aGlzLmJvb2xlYW5Nb2RlKSB7IHJldHVybiBjaGVja2VkIH1cbiAgICAgIGxldCByZXMgPSBbXVxuXG4gICAgICB0aGlzLmlubmVyVmFsdWUuZm9yRWFjaCh4ID0+IHtcbiAgICAgICAgaWYgKCFpc0RlZXBFcXVhbCh4LCB0aGlzLnZhbCkpIHtcbiAgICAgICAgICByZXMucHVzaCh4KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgaWYgKGNoZWNrZWQpIHsgcmVzLnB1c2godGhpcy52YWwpIH1cbiAgICAgIHJldHVybiByZXNcbiAgICB9LFxuICB9LFxuICByZW5kZXIoaCkge1xuICAgIGxldCBjaGVja2VkID0gdGhpcy5jaGVja2VkXG4gICAgbGV0IGNvbG9yTGFiZWwgPSBjaGVja2VkICYmIHRoaXMuY29sb3JMYWJlbFxuICAgIGxldCBjb2xvckNoZWNrYm94ID0gY2hlY2tlZCB8fCB0aGlzLmtlZXBDb2xvclxuICAgIGxldCBnZXRMYWJlbCA9ICgpID0+IFtoKCdkaXYnLCB7XG4gICAgICBzdGF0aWNDbGFzczogJ3N3LWNoZWNrYm94X190ZXh0IG1hcmdpbi1taW4nLFxuICAgICAgY2xhc3M6IHtcbiAgICAgICAgJ2NvbG9yLXByaW1hcnknOiBjb2xvckxhYmVsID8gdGhpcy5wcmltYXJ5IDogdm9pZCAwLFxuICAgICAgICAnY29sb3ItbmVnYXRpdmUnOiBjb2xvckxhYmVsID8gdGhpcy5uZWdhdGl2ZSA6IHZvaWQgMCxcbiAgICAgICAgJ2NvbG9yLXBvc2l0aXZlJzogY29sb3JMYWJlbCA/IHRoaXMucG9zaXRpdmUgOiB2b2lkIDAsXG4gICAgICAgICdjb2xvci13YXJuaW5nJzogY29sb3JMYWJlbCA/IHRoaXMud2FybmluZyA6IHZvaWQgMFxuICAgICAgfSxcbiAgICAgIHN0eWxlOiB7XG4gICAgICAgIGNvbG9yOiBjb2xvckxhYmVsID8gdGhpcy5jb2xvciA6IHZvaWQgMFxuICAgICAgfVxuICAgIH0sIHRoaXMubGFiZWwpXVxuXG4gICAgcmV0dXJuIGgoJ3N3LWl0ZW0nLCB7XG4gICAgICBzdGF0aWNDbGFzczogJ3N3LWNoZWNrYm94JyxcbiAgICAgIHJlZjogJ2NoZWNrYm94JyxcbiAgICAgIGNsYXNzOiB7XG4gICAgICAgIGRpc2FibGU6IHRoaXMuZGlzYWJsZWQgfHwgdGhpcy5wYXJlbnREaXNhYmxlZFxuICAgICAgfSxcbiAgICAgIG5hdGl2ZU9uOiB0aGlzLmRpc2FibGVkID8gdm9pZCAwIDoge1xuICAgICAgICBjbGljazogKCkgPT4ge1xuICAgICAgICAgIHRoaXMuY2hlY2tlZCA9ICFjaGVja2VkXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzY29wZWRTbG90czoge1xuICAgICAgICBiZWZvcmU6IHRoaXMubGFiZWwgJiYgdGhpcy5sZWZ0TGFiZWwgPyBnZXRMYWJlbCA6IHZvaWQgMCxcbiAgICAgICAgZGVmYXVsdDogKCkgPT4gW2goJ3N3LWljb24nLCB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6ICdtYXJnaW4tbWluJyxcbiAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgb3BhY2l0eTogY2hlY2tlZCA/IDEgOiAwLjZcbiAgICAgICAgICB9LFxuICAgICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICBzaXplOiAnMjBweCcsXG4gICAgICAgICAgICBuYW1lOiBjaGVja2VkID8gJ2NoZWNrX2JveCcgOiAnY2hlY2tfYm94X291dGxpbmVfYmxhbmsnLFxuICAgICAgICAgICAgY29sb3I6IGNvbG9yQ2hlY2tib3ggPyB0aGlzLmNvbG9yIDogdm9pZCAwLFxuICAgICAgICAgICAgcHJpbWFyeTogY29sb3JDaGVja2JveCA/IHRoaXMucHJpbWFyeSA6IHZvaWQgMCxcbiAgICAgICAgICAgIG5lZ2F0aXZlOiBjb2xvckNoZWNrYm94ID8gdGhpcy5uZWdhdGl2ZSA6IHZvaWQgMCxcbiAgICAgICAgICAgIHBvc2l0aXZlOiBjb2xvckNoZWNrYm94ID8gdGhpcy5wb3NpdGl2ZSA6IHZvaWQgMCxcbiAgICAgICAgICAgIHdhcm5pbmc6IGNvbG9yQ2hlY2tib3ggPyB0aGlzLndhcm5pbmcgOiB2b2lkIDBcbiAgICAgICAgICB9XG4gICAgICAgIH0pXSxcbiAgICAgICAgYWZ0ZXI6IHRoaXMubGFiZWwgJiYgIXRoaXMubGVmdExhYmVsID8gZ2V0TGFiZWwgOiB2b2lkIDBcbiAgICAgIH1cbiAgICB9KVxuICB9XG59IiwiaW1wb3J0IENoZWNrYm94IGZyb20gJy4vc3JjL21haW4uanMnXG5cbmNvbnN0IGluc3RhbGwgPSBmdW5jdGlvbiAoVnVlKSB7XG4gIFZ1ZS5jb21wb25lbnQoQ2hlY2tib3gubmFtZSwgQ2hlY2tib3gpXG59XG5cbkNoZWNrYm94Lmluc3RhbGwgPSBpbnN0YWxsXG5cbmV4cG9ydCBkZWZhdWx0IENoZWNrYm94XG4iLCJcbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YTogKCkgPT4gKHt9KSxcbiAgd2F0Y2g6IHt9LFxuICBjb21wdXRlZDoge30sXG4gIG1ldGhvZHM6IHtcbiAgICBzaHV0dGxlKF90aGlzKSB7XG4gICAgICBsZXQgc2VsZiA9IF90aGlzIHx8IHRoaXNcblxuICAgICAgc2VsZi4kY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgIGlmIChjaGlsZC4kcmVmc1t0aGlzLnNodXR0bGVSZWZdICE9PSB2b2lkIDApIHtcbiAgICAgICAgICBjaGlsZC5wYXJlbnQgPSB0aGlzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zaHV0dGxlKGNoaWxkKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfSxcbiAgbW91bnRlZCgpIHtcbiAgICB0aGlzLnNodXR0bGUoKVxuICB9XG59XG4iLCJpbXBvcnQgRmllbGQgZnJvbSAnLi4vLi4vZmllbGQnXG5pbXBvcnQgU2h1dHRsZU1peGluIGZyb20gJy4uLy4uLy4uL21peGlucy9zaHV0dGxlJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdzd0NoZWNrYm94R3JvdXAnLFxuICBtaXhpbnM6IFtGaWVsZCwgU2h1dHRsZU1peGluXSwgLy8gZm9jdXNlZCxkaXNhYmxlZCxzaHV0dGxlUmVmXG4gIHByb3BzOiB7XG4gICAgdmFsdWU6IEJvb2xlYW4gfCBBcnJheVxuICB9LFxuICBkYXRhOiAoKSA9PiAoe1xuICAgIGlubmVyUG9pbnRlcjogdHJ1ZSxcbiAgICBzaHV0dGxlUmVmOiAnY2hlY2tib3gnXG4gIH0pLFxuICBjb21wdXRlZDoge30sXG4gIHdhdGNoOiB7fSxcbiAgbWV0aG9kczoge31cbn0iLCJpbXBvcnQgQ2hlY2tib3hHcm91cCBmcm9tICcuL3NyYy9tYWluLmpzJ1xuXG5jb25zdCBpbnN0YWxsID0gZnVuY3Rpb24gKFZ1ZSkge1xuICBWdWUuY29tcG9uZW50KENoZWNrYm94R3JvdXAubmFtZSwgQ2hlY2tib3hHcm91cClcbn1cblxuQ2hlY2tib3hHcm91cC5pbnN0YWxsID0gaW5zdGFsbFxuXG5leHBvcnQgZGVmYXVsdCBDaGVja2JveEdyb3VwXG4iLCJpbXBvcnQgSXRlbSBmcm9tICcuLi8uLi9pdGVtJ1xuaW1wb3J0IHsgaXNEZWVwRXF1YWwgfSBmcm9tICcuLi8uLi8uLi91dGlscy9pcydcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnc3dSYWRpbycsXG4gIGNvbXBvbmVudHM6IHsgSXRlbSB9LFxuICBwcm9wczoge1xuICAgIHZhbHVlOiB7fSxcbiAgICB2YWw6IHtcbiAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgfSxcbiAgICBsYWJlbDogU3RyaW5nLFxuICAgIGRpc2FibGVkOiBCb29sZWFuLFxuICAgIGNvbG9yOiBTdHJpbmcsXG4gICAgcHJpbWFyeTogQm9vbGVhbixcbiAgICBuZWdhdGl2ZTogQm9vbGVhbixcbiAgICBwb3NpdGl2ZTogQm9vbGVhbixcbiAgICB3YXJuaW5nOiBCb29sZWFuLFxuICAgIGxlZnRMYWJlbDogQm9vbGVhbixcbiAgICBjb2xvckxhYmVsOiBCb29sZWFuLFxuICAgIGtlZXBDb2xvcjogQm9vbGVhblxuICB9LFxuICBkYXRhOiAoKSA9PiAoe1xuICAgIHBhcmVudDogdm9pZCAwXG4gIH0pLFxuICBjb21wdXRlZDoge1xuICAgIG1vZGVsKCkge1xuICAgICAgcmV0dXJuIHRoaXMucGFyZW50ID09PSB2b2lkIDAgPyB0aGlzLnZhbHVlIDogdGhpcy5wYXJlbnQudmFsdWVcbiAgICB9LFxuICAgIHBhcmVudERpc2FibGVkKCkge1xuICAgICAgcmV0dXJuIHRoaXMucGFyZW50ICYmIHRoaXMucGFyZW50LmRpc2FibGVkXG4gICAgfSxcbiAgICBjaGVja2VkOiB7XG4gICAgICBnZXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENoZWNrZWQodGhpcy52YWwpXG4gICAgICB9LFxuICAgICAgc2V0KCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXMucGFyZW50ID09PSB2b2lkIDAgPyB0aGlzIDogdGhpcy5wYXJlbnRcblxuICAgICAgICBzZWxmLiRlbWl0KFxuICAgICAgICAgICdpbnB1dCcsXG4gICAgICAgICAgdGhpcy52YWxcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgd2F0Y2g6IHt9LFxuICBtZXRob2RzOiB7XG4gICAgZ2V0Q2hlY2tlZCh2YWwpIHtcbiAgICAgIHJldHVybiBpc0RlZXBFcXVhbCh0aGlzLm1vZGVsLCB2YWwpXG4gICAgfSxcbiAgfSxcbiAgcmVuZGVyKGgpIHtcbiAgICBsZXQgY2hlY2tlZCA9IHRoaXMuY2hlY2tlZFxuICAgIGxldCBjb2xvckxhYmVsID0gY2hlY2tlZCAmJiB0aGlzLmNvbG9yTGFiZWxcbiAgICBsZXQgY29sb3JSYWRpbyA9IGNoZWNrZWQgfHwgdGhpcy5rZWVwQ29sb3JcbiAgICBsZXQgZ2V0TGFiZWwgPSAoKSA9PiBbaCgnZGl2Jywge1xuICAgICAgc3RhdGljQ2xhc3M6ICdzdy1yYWRpb19fdGV4dCBtYXJnaW4tbWluJyxcbiAgICAgIGNsYXNzOiB7XG4gICAgICAgICdjb2xvci1wcmltYXJ5JzogY29sb3JMYWJlbCA/IHRoaXMucHJpbWFyeSA6IHZvaWQgMCxcbiAgICAgICAgJ2NvbG9yLW5lZ2F0aXZlJzogY29sb3JMYWJlbCA/IHRoaXMubmVnYXRpdmUgOiB2b2lkIDAsXG4gICAgICAgICdjb2xvci1wb3NpdGl2ZSc6IGNvbG9yTGFiZWwgPyB0aGlzLnBvc2l0aXZlIDogdm9pZCAwLFxuICAgICAgICAnY29sb3Itd2FybmluZyc6IGNvbG9yTGFiZWwgPyB0aGlzLndhcm5pbmcgOiB2b2lkIDBcbiAgICAgIH0sXG4gICAgICBzdHlsZToge1xuICAgICAgICBjb2xvcjogY29sb3JMYWJlbCA/IHRoaXMuY29sb3IgOiB2b2lkIDBcbiAgICAgIH1cbiAgICB9LCB0aGlzLmxhYmVsKV1cblxuICAgIHJldHVybiBoKCdzdy1pdGVtJywge1xuICAgICAgc3RhdGljQ2xhc3M6ICdzdy1yYWRpbycsXG4gICAgICByZWY6ICdyYWRpbycsXG4gICAgICBjbGFzczoge1xuICAgICAgICBkaXNhYmxlOiB0aGlzLmRpc2FibGVkIHx8IHRoaXMucGFyZW50RGlzYWJsZWRcbiAgICAgIH0sXG4gICAgICBuYXRpdmVPbjogdGhpcy5kaXNhYmxlZCA/IHZvaWQgMCA6IHtcbiAgICAgICAgY2xpY2s6ICgpID0+IHtcbiAgICAgICAgICBpZiAoY2hlY2tlZCkgeyByZXR1cm4gfVxuICAgICAgICAgIHRoaXMuY2hlY2tlZCA9IHRydWVcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHNjb3BlZFNsb3RzOiB7XG4gICAgICAgIGJlZm9yZTogdGhpcy5sYWJlbCAmJiB0aGlzLmxlZnRMYWJlbCA/IGdldExhYmVsIDogdm9pZCAwLFxuICAgICAgICBkZWZhdWx0OiAoKSA9PiBbaCgnc3ctaWNvbicsIHtcbiAgICAgICAgICBzdGF0aWNDbGFzczogJ21hcmdpbi1taW4nLFxuICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICBvcGFjaXR5OiBjaGVja2VkID8gMSA6IDAuNlxuICAgICAgICAgIH0sXG4gICAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIHNpemU6ICcyMHB4JyxcbiAgICAgICAgICAgIG5hbWU6IGNoZWNrZWQgPyAncmFkaW9fYnV0dG9uX2NoZWNrZWQnIDogJ3JhZGlvX2J1dHRvbl91bmNoZWNrZWQnLFxuICAgICAgICAgICAgY29sb3I6IGNvbG9yUmFkaW8gPyB0aGlzLmNvbG9yIDogdm9pZCAwLFxuICAgICAgICAgICAgcHJpbWFyeTogY29sb3JSYWRpbyA/IHRoaXMucHJpbWFyeSA6IHZvaWQgMCxcbiAgICAgICAgICAgIG5lZ2F0aXZlOiBjb2xvclJhZGlvID8gdGhpcy5uZWdhdGl2ZSA6IHZvaWQgMCxcbiAgICAgICAgICAgIHBvc2l0aXZlOiBjb2xvclJhZGlvID8gdGhpcy5wb3NpdGl2ZSA6IHZvaWQgMCxcbiAgICAgICAgICAgIHdhcm5pbmc6IGNvbG9yUmFkaW8gPyB0aGlzLndhcm5pbmcgOiB2b2lkIDBcbiAgICAgICAgICB9XG4gICAgICAgIH0pXSxcbiAgICAgICAgYWZ0ZXI6IHRoaXMubGFiZWwgJiYgIXRoaXMubGVmdExhYmVsID8gZ2V0TGFiZWwgOiB2b2lkIDBcbiAgICAgIH1cbiAgICB9KVxuICB9XG59IiwiaW1wb3J0IFJhZGlvIGZyb20gJy4vc3JjL21haW4uanMnXG5cbmNvbnN0IGluc3RhbGwgPSBmdW5jdGlvbiAoVnVlKSB7XG4gIFZ1ZS5jb21wb25lbnQoUmFkaW8ubmFtZSwgUmFkaW8pXG59XG5cblJhZGlvLmluc3RhbGwgPSBpbnN0YWxsXG5cbmV4cG9ydCBkZWZhdWx0IFJhZGlvXG4iLCJpbXBvcnQgRmllbGQgZnJvbSAnLi4vLi4vZmllbGQnXG5pbXBvcnQgU2h1dHRsZU1peGluIGZyb20gJy4uLy4uLy4uL21peGlucy9zaHV0dGxlJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdzd1JhZGlvR3JvdXAnLFxuICBtaXhpbnM6IFtGaWVsZCwgU2h1dHRsZU1peGluXSwgLy8gZm9jdXNlZCxkaXNhYmxlZCxzaHV0dGxlUmVmXG4gIHByb3BzOiB7XG4gICAgdmFsdWU6IHtcbiAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgfVxuICB9LFxuICBkYXRhOiAoKSA9PiAoe1xuICAgIGlubmVyUG9pbnRlcjogdHJ1ZSxcbiAgICBzaHV0dGxlUmVmOiAncmFkaW8nXG4gIH0pLFxuICBjb21wdXRlZDoge30sXG4gIHdhdGNoOiB7fSxcbiAgbWV0aG9kczoge31cbn0iLCJpbXBvcnQgUmFkaW9Hcm91cCBmcm9tICcuL3NyYy9tYWluLmpzJ1xuXG5jb25zdCBpbnN0YWxsID0gZnVuY3Rpb24gKFZ1ZSkge1xuICBWdWUuY29tcG9uZW50KFJhZGlvR3JvdXAubmFtZSwgUmFkaW9Hcm91cClcbn1cblxuUmFkaW9Hcm91cC5pbnN0YWxsID0gaW5zdGFsbFxuXG5leHBvcnQgZGVmYXVsdCBSYWRpb0dyb3VwXG4iLCIvKipcbiAqXG4gKlxuICogQHBhcmFtIHsqfSB0b3RhbCAg5YiG6aG15oC75pWwXG4gKiBAcGFyYW0geyp9IGN1ciAg5b2T5YmN6aG16Z2iICAzXG4gKiBAcGFyYW0geyp9IGFyb3VuZCAgIDEgMiAzIDQgNSAgIGFyb3VuZCA9IDJcbiAqIEByZXR1cm5zXG4gKi9cbmNvbnN0IG1ha2VSZXN1bHQgPSAodG90YWwsY3VyLGFyb3VuZCkgPT4ge1xuICBsZXQgcmVzdWx0ID0gW107XG4gIGxldCBiYXNlQ291bnQgPSBhcm91bmQgKiAyICsgMSArIDIgKyAyICsgMjsgLy/mgLvlhbHlhYPntKDkuKrmlbBcbiAgbGV0IHN1cnBsdXMgPSBiYXNlQ291bnQgLSA0OyAvL+WPquWHuueOsOS4gOS4quecgeeVpeWPtyDliankvZnlhYPntKDkuKrmlbBcbiAgbGV0IHN0YXJ0UG9zaXRpb24gPSAxICsgMiArIGFyb3VuZCxlbmRQb3NpdGlvbiA9IHRvdGFsIC0gMiAtIGFyb3VuZDtcblxuICBpZih0b3RhbCA8PSBiYXNlQ291bnQgLSAyKXsgLy/lhajpg6jmmL7npLog5LiN5Ye6546w55yB55Wl5Y+3XG4gICAgICByZXN1bHQgPSAgQXJyYXkuZnJvbSh7bGVuZ3RoOiB0b3RhbH0sICh2LCBpKSA9PiBpICsgMSk7XG4gIH1lbHNleyAvL+mcgOimgeWHuueOsOecgeeVpeWPt1xuICAgICAgaWYoY3VyIDw9IHN0YXJ0UG9zaXRpb24peyAvLzEu5Y+q5pyJ5ZCO6Z2i5Ye6546w55yB55Wl5Y+3XG4gICAgICAgICAgcmVzdWx0ID0gWy4uLkFycmF5LmZyb20oe2xlbmd0aDogc3VycGx1c30sICh2LCBpKSA9PiBpICsgMSksXCLCt8K3wrdcIix0b3RhbF1cbiAgICAgIH1lbHNlIGlmKGN1ciA+PSBlbmRQb3NpdGlvbikgeyAvLzIu5Y+q5pyJ5YmN6L655Ye6546w55yB55Wl5Y+3XG4gICAgICAgICAgcmVzdWx0ID0gWzEsJ8K3wrfCtycsLi4uQXJyYXkuZnJvbSh7bGVuZ3RoOiBzdXJwbHVzfSwgKHYsIGkpID0+IHRvdGFsIC0gc3VycGx1cyArIGkgKyAxKV1cbiAgICAgIH1lbHNleyAvLzMu5Lik6L656YO95pyJ55yB55Wl5Y+3XG4gICAgICAgICAgcmVzdWx0ID0gWzEsJ8K3wrfCtycsLi4uQXJyYXkuZnJvbSh7bGVuZ3RoOiBhcm91bmQgKiAyICsgMX0sICh2LCBpKSA9PiBjdXIgLSBhcm91bmQgKyBpKSwnwrfCt8K3Jyx0b3RhbF1cbiAgICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHRcbn1cblxuZXhwb3J0IGRlZmF1bHQgbWFrZVJlc3VsdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cInN3LXBhZ2luYXRpb25cIj5cbiAgICA8ZGl2IGNsYXNzPVwic3ctcGFnaW5hdGlvbi10b3RhbFwiIHYtaWY9XCJsYXlvdXQuaW5kZXhPZigndG90YWwnKSA+IC0xXCI+IFxuICAgICAge3tg5YWxJHt0b3RhbH3mnaFgfX1cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwic3ctcGFnaW5hdGlvbi1zZWxlY3RcIiB2LWlmPVwibGF5b3V0LmluZGV4T2YoJ3NlbGVjdCcpID4gLTFcIj5cbiAgICAgIDxzdy1zZWxlY3Qgdi1tb2RlbD1cInBhZ2VTaXplVmFsdWVcIiA6b3B0aW9ucz1cInNlbGVjdE9wdGlvblwiIHNlbGVjdGVkRmlsbGVkIGJvcmRlcmVkIG1pbmkgc2VsZWN0ZWRTdHlsZT1cIm5vbmVcIj48L3N3LXNlbGVjdD5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwic3ctcGFnaW5hdGlvbi1wYWdlXCI+XG4gICAgICA8c3BhbiBjbGFzcz1cInN3LXBhZ2luYXRpb24tcGFnZS1pdGVtXCIgQGNsaWNrPVwiaGFuZGxlQ2xpY2tBcnJvdygnbGVmdCcpXCI+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29ucyBzdy1wYWdpbmF0aW9uLXBhZ2UtaXRlbS1pY29uXCI+a2V5Ym9hcmRfYXJyb3dfbGVmdDwvaT48L3NwYW4+XG4gICAgICA8c3BhbiB2LWZvcj1cIihpdGVtLCBpbmRleCkgaW4gcGFnaW5hdGlvbkxpc3RcIiA6Y2xhc3M9XCJbJ3N3LXBhZ2luYXRpb24tcGFnZS1pdGVtJywgY3VycmVudFBhZ2VWYWx1ZSA9PT0gaXRlbSA/ICdhY3RpdmUnIDogJyddXCIgQGNsaWNrPVwiaGFuZGxlQ2xpY2tQYWdlKGl0ZW0sIGluZGV4KVwiPlxuICAgICAgICA8aSB2LWlmPVwiaXRlbSA9PT0gJ8K3wrfCtydcIiBjbGFzcz1cIm1hdGVyaWFsLWljb25zIHN3LXBhZ2luYXRpb24tcGFnZS1pdGVtLWljb25cIj5tb3JlX2hvcml6PC9pPlxuICAgICAgICA8c3BhbiB2LWVsc2U+XG4gICAgICAgICAge3tpdGVtfX1cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJzdy1wYWdpbmF0aW9uLXBhZ2UtaXRlbVwiIEBjbGljaz1cImhhbmRsZUNsaWNrQXJyb3coJ3JpZ2h0JylcIj48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zIHN3LXBhZ2luYXRpb24tcGFnZS1pdGVtLWljb25cIj5rZXlib2FyZF9hcnJvd19yaWdodDwvaT48L3NwYW4+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInN3LXBhZ2luYXRpb24tZ290b1wiIHYtaWY9XCJsYXlvdXQuaW5kZXhPZignZ290bycpID4gLTFcIj5cbiAgICAgIDxzcGFuPuWJjeW+gDwvc3Bhbj5cbiAgICAgIDxkaXYgY2xhc3M9XCJzdy1wYWdpbmF0aW9uLWdvdG8taW5wdXRcIj5cbiAgICAgICAgPHN3LWlucHV0IGJvcmRlcmVkIHYtbW9kZWw9J2lucHV0VmFsdWUnIEBrZXl1cC5lbnRlci5uYXRpdmU9XCJoYW5kbGVFbnRlckdvdG9cIiBtaW5pIHN0eWxlPVwid2lkdGg6NDBweFwiPjwvc3ctaW5wdXQ+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxzcGFuPumhtTwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IHN3U2VsZWN0IGZyb20gJy4uLy4uL3NlbGVjdC9pbmRleCdcbmltcG9ydCBtYWtlUmVzdWx0IGZyb20gJy4vcGFnaW5hdGlvbidcbmltcG9ydCBzd0lucHV0IGZyb20gJy4uLy4uL2lucHV0L2luZGV4J1xuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnc3dQYWdpbmF0aW9uJyxcbiAgZGF0YSAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGN1cnJlbnRQYWdlVmFsdWU6IHRoaXMuY3VycmVudFBhZ2UsXG4gICAgICBwYWdlVG90YWw6ICcnLFxuICAgICAgcGFnZVNpemVWYWx1ZTogdGhpcy5wYWdlU2l6ZSxcbiAgICAgIGlucHV0VmFsdWU6ICcxJ1xuICAgIH1cbiAgfSxcbiAgcHJvcHM6IHtcbiAgICB0b3RhbDoge1xuICAgICAgdHlwZTogTnVtYmVyXG4gICAgfSxcbiAgICBwYWdlU2l6ZToge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgZGVmYXVsdDogMjBcbiAgICB9LFxuICAgIG9wdGlvbnM6IHtcbiAgICAgIHR5cGU6IEFycmF5LFxuICAgICAgZGVmYXVsdDogWzIwLCA0MCwgNjAsIDgwXVxuICAgIH0sXG4gICAgY3VycmVudFBhZ2U6IHtcbiAgICAgIHR5cGU6IE51bWJlclxuICAgIH0sXG4gICAgYXJvdW5kOiB7XG4gICAgICB0eXBlOiBOdW1iZXJcbiAgICB9LFxuICAgIGxheW91dDoge1xuICAgICAgdHlwZTogU3RyaW5nXG4gICAgfVxuICB9LFxuICB3YXRjaDoge1xuICAgIGN1cnJlbnRQYWdlVmFsdWUoKSB7XG4gICAgICB0aGlzLiRlbWl0KCdjdXJyZW50LWNoYW5nZScsIHRoaXMuY3VycmVudFBhZ2VWYWx1ZSlcbiAgICB9LFxuICAgIHBhZ2VTaXplVmFsdWUoKSB7XG4gICAgICB0aGlzLiRlbWl0KCdzaXplLWNoYW5nZScsIHRoaXMucGFnZVNpemVWYWx1ZSlcbiAgICB9XG4gIH0sXG4gIGNvbXB1dGVkOiB7XG4gICAgc2VsZWN0T3B0aW9uKCkge1xuICAgICAgbGV0IGFyeSA9IFtdXG4gICAgICB0aGlzLm9wdGlvbnMubWFwKGk9PntcbiAgICAgICAgbGV0IGl0ZW0gPSB7fVxuICAgICAgICBpdGVtLm5hbWUgPSBgJHtpfeadoS/pobVgXG4gICAgICAgIGl0ZW0udmFsdWUgPSBpXG4gICAgICAgIGFyeS5wdXNoKGl0ZW0pXG4gICAgICB9KVxuICAgICAgcmV0dXJuIGFyeVxuICAgIH0sXG4gICAgcGFnaW5hdGlvbkxpc3QoKSB7XG4gICAgICBsZXQgcGFnZVRvdGFsID0gdGhpcy5wYWdlVG90YWwgPSB0aGlzLnRvdGFsIC8gdGhpcy5wYWdlU2l6ZVZhbHVlXG4gICAgICBpZiAoYCR7cGFnZVRvdGFsfWAuaW5kZXhPZignLicpID4gLTEpIHtcbiAgICAgICAgcGFnZVRvdGFsID0gdGhpcy5wYWdlVG90YWwgPSBwYXJzZUludChwYWdlVG90YWwgKyAxKVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMuY3VycmVudFBhZ2VWYWx1ZSA+IHBhZ2VUb3RhbCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRQYWdlVmFsdWUgPSBwYWdlVG90YWxcbiAgICAgIH1cbiAgICAgIGxldCBwYWdlTGlzdCA9IG1ha2VSZXN1bHQocGFnZVRvdGFsLCB0aGlzLmN1cnJlbnRQYWdlVmFsdWUsIHRoaXMuYXJvdW5kKVxuICAgICAgcmV0dXJuIHBhZ2VMaXN0XG4gICAgfVxuICB9LFxuICBjb21wb25lbnRzOiB7XG4gICAgc3dTZWxlY3QsXG4gICAgc3dJbnB1dFxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgaGFuZGxlRW50ZXJHb3RvKCkge1xuICAgICAgbGV0IHBhZ2UgPSBwYXJzZUludCh0aGlzLmlucHV0VmFsdWUpXG4gICAgICBpZiAocGFnZSA8IDEpIHtcbiAgICAgICAgdGhpcy5pbnB1dFZhbHVlID0gJzEnXG4gICAgICB9XG4gICAgICBpZiAocGFnZSA+IHRoaXMucGFnZVRvdGFsKSB7XG4gICAgICAgIHRoaXMuaW5wdXRWYWx1ZSA9IGAke3RoaXMucGFnZVRvdGFsfWBcbiAgICAgIH1cbiAgICAgIHRoaXMuY3VycmVudFBhZ2VWYWx1ZSA9IHBhcnNlSW50KHRoaXMuaW5wdXRWYWx1ZSlcbiAgICAgIHRoaXMuaW5wdXRWYWx1ZSA9IGAke3BhcnNlSW50KHRoaXMuaW5wdXRWYWx1ZSl9YFxuICAgIH0sXG4gICAgaGFuZGxlQ2xpY2tQYWdlKGl0ZW0sIGluZGV4KXtcbiAgICAgIGlmIChpdGVtID09PSAnwrfCt8K3Jykge1xuICAgICAgICBpZihpbmRleCA9PT0gMSl7XG4gICAgICAgICAgdGhpcy5jdXJyZW50UGFnZVZhbHVlID0gM1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY3VycmVudFBhZ2VWYWx1ZSA9IHRoaXMucGFnZVRvdGFsIC0gMlxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmN1cnJlbnRQYWdlVmFsdWUgPSBpdGVtXG4gICAgICB9XG4gICAgfSxcbiAgICBoYW5kbGVDbGlja0Fycm93KHBhcmFtcykge1xuICAgICAgaWYgKHBhcmFtcyA9PT0gJ2xlZnQnKSB7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRQYWdlVmFsdWUgIT09IDEpIHtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRQYWdlVmFsdWUgPSB0aGlzLmN1cnJlbnRQYWdlVmFsdWUgLSAxXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIHRoaXMuY3VycmVudFBhZ2VWYWx1ZSA9IDFcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFBhZ2VWYWx1ZSAhPT0gdGhpcy5wYWdlVG90YWwpIHtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRQYWdlVmFsdWUgPSB0aGlzLmN1cnJlbnRQYWdlVmFsdWUgKyAxXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jdXJyZW50UGFnZVZhbHVlID0gdGhpcy5wYWdlVG90YWxcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cblxuPC9zdHlsZT5cbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gbm9ybWFsaXplQ29tcG9uZW50KHRlbXBsYXRlLCBzdHlsZSwgc2NyaXB0LCBzY29wZUlkLCBpc0Z1bmN0aW9uYWxUZW1wbGF0ZSwgbW9kdWxlSWRlbnRpZmllclxuLyogc2VydmVyIG9ubHkgKi9cbiwgc2hhZG93TW9kZSwgY3JlYXRlSW5qZWN0b3IsIGNyZWF0ZUluamVjdG9yU1NSLCBjcmVhdGVJbmplY3RvclNoYWRvdykge1xuICBpZiAodHlwZW9mIHNoYWRvd01vZGUgIT09ICdib29sZWFuJykge1xuICAgIGNyZWF0ZUluamVjdG9yU1NSID0gY3JlYXRlSW5qZWN0b3I7XG4gICAgY3JlYXRlSW5qZWN0b3IgPSBzaGFkb3dNb2RlO1xuICAgIHNoYWRvd01vZGUgPSBmYWxzZTtcbiAgfSAvLyBWdWUuZXh0ZW5kIGNvbnN0cnVjdG9yIGV4cG9ydCBpbnRlcm9wLlxuXG5cbiAgdmFyIG9wdGlvbnMgPSB0eXBlb2Ygc2NyaXB0ID09PSAnZnVuY3Rpb24nID8gc2NyaXB0Lm9wdGlvbnMgOiBzY3JpcHQ7IC8vIHJlbmRlciBmdW5jdGlvbnNcblxuICBpZiAodGVtcGxhdGUgJiYgdGVtcGxhdGUucmVuZGVyKSB7XG4gICAgb3B0aW9ucy5yZW5kZXIgPSB0ZW1wbGF0ZS5yZW5kZXI7XG4gICAgb3B0aW9ucy5zdGF0aWNSZW5kZXJGbnMgPSB0ZW1wbGF0ZS5zdGF0aWNSZW5kZXJGbnM7XG4gICAgb3B0aW9ucy5fY29tcGlsZWQgPSB0cnVlOyAvLyBmdW5jdGlvbmFsIHRlbXBsYXRlXG5cbiAgICBpZiAoaXNGdW5jdGlvbmFsVGVtcGxhdGUpIHtcbiAgICAgIG9wdGlvbnMuZnVuY3Rpb25hbCA9IHRydWU7XG4gICAgfVxuICB9IC8vIHNjb3BlZElkXG5cblxuICBpZiAoc2NvcGVJZCkge1xuICAgIG9wdGlvbnMuX3Njb3BlSWQgPSBzY29wZUlkO1xuICB9XG5cbiAgdmFyIGhvb2s7XG5cbiAgaWYgKG1vZHVsZUlkZW50aWZpZXIpIHtcbiAgICAvLyBzZXJ2ZXIgYnVpbGRcbiAgICBob29rID0gZnVuY3Rpb24gaG9vayhjb250ZXh0KSB7XG4gICAgICAvLyAyLjMgaW5qZWN0aW9uXG4gICAgICBjb250ZXh0ID0gY29udGV4dCB8fCAvLyBjYWNoZWQgY2FsbFxuICAgICAgdGhpcy4kdm5vZGUgJiYgdGhpcy4kdm5vZGUuc3NyQ29udGV4dCB8fCAvLyBzdGF0ZWZ1bFxuICAgICAgdGhpcy5wYXJlbnQgJiYgdGhpcy5wYXJlbnQuJHZub2RlICYmIHRoaXMucGFyZW50LiR2bm9kZS5zc3JDb250ZXh0OyAvLyBmdW5jdGlvbmFsXG4gICAgICAvLyAyLjIgd2l0aCBydW5Jbk5ld0NvbnRleHQ6IHRydWVcblxuICAgICAgaWYgKCFjb250ZXh0ICYmIHR5cGVvZiBfX1ZVRV9TU1JfQ09OVEVYVF9fICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjb250ZXh0ID0gX19WVUVfU1NSX0NPTlRFWFRfXztcbiAgICAgIH0gLy8gaW5qZWN0IGNvbXBvbmVudCBzdHlsZXNcblxuXG4gICAgICBpZiAoc3R5bGUpIHtcbiAgICAgICAgc3R5bGUuY2FsbCh0aGlzLCBjcmVhdGVJbmplY3RvclNTUihjb250ZXh0KSk7XG4gICAgICB9IC8vIHJlZ2lzdGVyIGNvbXBvbmVudCBtb2R1bGUgaWRlbnRpZmllciBmb3IgYXN5bmMgY2h1bmsgaW5mZXJlbmNlXG5cblxuICAgICAgaWYgKGNvbnRleHQgJiYgY29udGV4dC5fcmVnaXN0ZXJlZENvbXBvbmVudHMpIHtcbiAgICAgICAgY29udGV4dC5fcmVnaXN0ZXJlZENvbXBvbmVudHMuYWRkKG1vZHVsZUlkZW50aWZpZXIpO1xuICAgICAgfVxuICAgIH07IC8vIHVzZWQgYnkgc3NyIGluIGNhc2UgY29tcG9uZW50IGlzIGNhY2hlZCBhbmQgYmVmb3JlQ3JlYXRlXG4gICAgLy8gbmV2ZXIgZ2V0cyBjYWxsZWRcblxuXG4gICAgb3B0aW9ucy5fc3NyUmVnaXN0ZXIgPSBob29rO1xuICB9IGVsc2UgaWYgKHN0eWxlKSB7XG4gICAgaG9vayA9IHNoYWRvd01vZGUgPyBmdW5jdGlvbiAoKSB7XG4gICAgICBzdHlsZS5jYWxsKHRoaXMsIGNyZWF0ZUluamVjdG9yU2hhZG93KHRoaXMuJHJvb3QuJG9wdGlvbnMuc2hhZG93Um9vdCkpO1xuICAgIH0gOiBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgICAgc3R5bGUuY2FsbCh0aGlzLCBjcmVhdGVJbmplY3Rvcihjb250ZXh0KSk7XG4gICAgfTtcbiAgfVxuXG4gIGlmIChob29rKSB7XG4gICAgaWYgKG9wdGlvbnMuZnVuY3Rpb25hbCkge1xuICAgICAgLy8gcmVnaXN0ZXIgZm9yIGZ1bmN0aW9uYWwgY29tcG9uZW50IGluIHZ1ZSBmaWxlXG4gICAgICB2YXIgb3JpZ2luYWxSZW5kZXIgPSBvcHRpb25zLnJlbmRlcjtcblxuICAgICAgb3B0aW9ucy5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXJXaXRoU3R5bGVJbmplY3Rpb24oaCwgY29udGV4dCkge1xuICAgICAgICBob29rLmNhbGwoY29udGV4dCk7XG4gICAgICAgIHJldHVybiBvcmlnaW5hbFJlbmRlcihoLCBjb250ZXh0KTtcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGluamVjdCBjb21wb25lbnQgcmVnaXN0cmF0aW9uIGFzIGJlZm9yZUNyZWF0ZSBob29rXG4gICAgICB2YXIgZXhpc3RpbmcgPSBvcHRpb25zLmJlZm9yZUNyZWF0ZTtcbiAgICAgIG9wdGlvbnMuYmVmb3JlQ3JlYXRlID0gZXhpc3RpbmcgPyBbXS5jb25jYXQoZXhpc3RpbmcsIGhvb2spIDogW2hvb2tdO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzY3JpcHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbm9ybWFsaXplQ29tcG9uZW50O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bm9ybWFsaXplLWNvbXBvbmVudC5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGlzT2xkSUUgPSB0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiAvbXNpZSBbNi05XVxcXFxiLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSk7XG5mdW5jdGlvbiBjcmVhdGVJbmplY3Rvcihjb250ZXh0KSB7XG4gIHJldHVybiBmdW5jdGlvbiAoaWQsIHN0eWxlKSB7XG4gICAgcmV0dXJuIGFkZFN0eWxlKGlkLCBzdHlsZSk7XG4gIH07XG59XG52YXIgSEVBRCA9IGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcbnZhciBzdHlsZXMgPSB7fTtcblxuZnVuY3Rpb24gYWRkU3R5bGUoaWQsIGNzcykge1xuICB2YXIgZ3JvdXAgPSBpc09sZElFID8gY3NzLm1lZGlhIHx8ICdkZWZhdWx0JyA6IGlkO1xuICB2YXIgc3R5bGUgPSBzdHlsZXNbZ3JvdXBdIHx8IChzdHlsZXNbZ3JvdXBdID0ge1xuICAgIGlkczogbmV3IFNldCgpLFxuICAgIHN0eWxlczogW11cbiAgfSk7XG5cbiAgaWYgKCFzdHlsZS5pZHMuaGFzKGlkKSkge1xuICAgIHN0eWxlLmlkcy5hZGQoaWQpO1xuICAgIHZhciBjb2RlID0gY3NzLnNvdXJjZTtcblxuICAgIGlmIChjc3MubWFwKSB7XG4gICAgICAvLyBodHRwczovL2RldmVsb3Blci5jaHJvbWUuY29tL2RldnRvb2xzL2RvY3MvamF2YXNjcmlwdC1kZWJ1Z2dpbmdcbiAgICAgIC8vIHRoaXMgbWFrZXMgc291cmNlIG1hcHMgaW5zaWRlIHN0eWxlIHRhZ3Mgd29yayBwcm9wZXJseSBpbiBDaHJvbWVcbiAgICAgIGNvZGUgKz0gJ1xcbi8qIyBzb3VyY2VVUkw9JyArIGNzcy5tYXAuc291cmNlc1swXSArICcgKi8nOyAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxuXG4gICAgICBjb2RlICs9ICdcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LCcgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3MubWFwKSkpKSArICcgKi8nO1xuICAgIH1cblxuICAgIGlmICghc3R5bGUuZWxlbWVudCkge1xuICAgICAgc3R5bGUuZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICBzdHlsZS5lbGVtZW50LnR5cGUgPSAndGV4dC9jc3MnO1xuICAgICAgaWYgKGNzcy5tZWRpYSkgc3R5bGUuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ21lZGlhJywgY3NzLm1lZGlhKTtcbiAgICAgIEhFQUQuYXBwZW5kQ2hpbGQoc3R5bGUuZWxlbWVudCk7XG4gICAgfVxuXG4gICAgaWYgKCdzdHlsZVNoZWV0JyBpbiBzdHlsZS5lbGVtZW50KSB7XG4gICAgICBzdHlsZS5zdHlsZXMucHVzaChjb2RlKTtcbiAgICAgIHN0eWxlLmVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gc3R5bGUuc3R5bGVzLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGluZGV4ID0gc3R5bGUuaWRzLnNpemUgLSAxO1xuICAgICAgdmFyIHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY29kZSk7XG4gICAgICB2YXIgbm9kZXMgPSBzdHlsZS5lbGVtZW50LmNoaWxkTm9kZXM7XG4gICAgICBpZiAobm9kZXNbaW5kZXhdKSBzdHlsZS5lbGVtZW50LnJlbW92ZUNoaWxkKG5vZGVzW2luZGV4XSk7XG4gICAgICBpZiAobm9kZXMubGVuZ3RoKSBzdHlsZS5lbGVtZW50Lmluc2VydEJlZm9yZSh0ZXh0Tm9kZSwgbm9kZXNbaW5kZXhdKTtlbHNlIHN0eWxlLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGV4dE5vZGUpO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZUluamVjdG9yO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YnJvd3Nlci5qcy5tYXBcbiIsImltcG9ydCBQYWdpbmF0aW9uIGZyb20gJy4vc3JjL21haW4udnVlJ1xuXG5jb25zdCBpbnN0YWxsID0gZnVuY3Rpb24gKFZ1ZSkge1xuICBWdWUuY29tcG9uZW50KFBhZ2luYXRpb24ubmFtZSwgUGFnaW5hdGlvbilcbn1cblxuUGFnaW5hdGlvbi5pbnN0YWxsID0gaW5zdGFsbFxuXG5leHBvcnQgZGVmYXVsdCBQYWdpbmF0aW9uXG4iLCJcbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YTogKCkgPT4gKHtcbiAgICBvYnNlcnZlcjogdm9pZCAwLFxuICAgIG1lYXN1cmVkV2lkdGg6IHZvaWQgMFxuICB9KSxcbiAgY29tcHV0ZWQ6IHtcbiAgICB0YXJnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5ob3Jpem9udGFsID8gJ3dpZHRoJyA6ICdoZWlnaHQnXG4gICAgfSxcbiAgICBtZWFzdXJlVGFyZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuaG9yaXpvbnRhbCA/ICdvZmZzZXRXaWR0aCcgOiAnb2Zmc2V0SGVpZ2h0J1xuICAgIH0sXG4gICAgbWluU2l6ZSgpIHtcbiAgICAgIHJldHVybiB0aGlzLm1pbiAhPT0gdm9pZCAwID8gYCR7dGhpcy5taW59cHhgIDogMFxuICAgIH1cbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGluaXRTdHlsZSgpIHtcbiAgICAgIGlmICh0aGlzLmlubmVyQ29sbGFwc2VkKSB7XG4gICAgICAgIHRoaXMuJHJlZnMuc2xpZGUuc3R5bGVbdGhpcy50YXJnZXRdID0gdGhpcy5taW5TaXplXG4gICAgICB9XG4gICAgfSxcbiAgICBzZXRTdHlsZShwYXNzaXZlKSB7XG4gICAgICBsZXQgc2xpZGVUYXJnZXQgPSB0aGlzLiRyZWZzLnNsaWRlXG5cbiAgICAgIGlmIChwYXNzaXZlKSB7XG4gICAgICAgIGlmIChzbGlkZVRhcmdldC5zdHlsZVt0aGlzLnRhcmdldF0gJiYgIXRoaXMuaW5uZXJDb2xsYXBzZWQpIHtcbiAgICAgICAgICBzbGlkZVRhcmdldC5zdHlsZVt0aGlzLnRhcmdldF0gPSBudWxsXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBzbGlkZVRhcmdldC5zdHlsZVt0aGlzLnRhcmdldF0gPSBgJHt0aGlzLiRyZWZzLm9ic2VydmVbdGhpcy5tZWFzdXJlVGFyZ2V0XX1weGBcbiAgICAgIGlmICh0aGlzLmlubmVyQ29sbGFwc2VkKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHNsaWRlVGFyZ2V0LnN0eWxlW3RoaXMudGFyZ2V0XSA9IHRoaXMubWluU2l6ZVxuICAgICAgICB9LCAwKVxuICAgICAgfVxuICAgIH0sXG4gICAgY2xlYXJVcHBlclN0eWxlKHVwcGVyKSB7XG4gICAgICBsZXQgdXBwZXJTbGlkZVRhcmdldCA9IHVwcGVyLiRyZWZzLnNsaWRlXG5cbiAgICAgIGlmICh1cHBlclNsaWRlVGFyZ2V0KSB7XG4gICAgICAgIGlmICh1cHBlclNsaWRlVGFyZ2V0LnN0eWxlW3RoaXMudGFyZ2V0XSkge1xuICAgICAgICAgIHVwcGVyU2xpZGVUYXJnZXQuc3R5bGVbdGhpcy50YXJnZXRdID0gbnVsbFxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodXBwZXIuJHBhcmVudCAmJiB1cHBlci4kcGFyZW50LiRyZWZzKSB7XG4gICAgICAgIHRoaXMuY2xlYXJVcHBlclN0eWxlKHVwcGVyLiRwYXJlbnQpXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBtb3VudGVkKCkge1xuICAgIGlmICghdGhpcy4kcmVmcy5zbGlkZSB8fCAhdGhpcy4kcmVmcy5vYnNlcnZlKSB7IHJldHVybiB9XG4gICAgdGhpcy4kd2F0Y2goXG4gICAgICAnaW5uZXJDb2xsYXBzZWQnLFxuICAgICAgKCkgPT4ge1xuICAgICAgICB0aGlzLmNsZWFyVXBwZXJTdHlsZSh0aGlzLiRwYXJlbnQpXG4gICAgICAgIHRoaXMuc2V0U3R5bGUoKVxuICAgICAgfSlcbiAgICB0aGlzLmluaXRTdHlsZSgpXG4gICAgdGhpcy5vYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgIHRoaXMuc2V0U3R5bGUodHJ1ZSlcbiAgICB9KVxuXG4gICAgdGhpcy5vYnNlcnZlci5vYnNlcnZlKHRoaXMuJHJlZnMub2JzZXJ2ZSwge1xuICAgICAgYXR0cmlidXRlczogdHJ1ZSxcbiAgICAgIGF0dHJpYnV0ZUZpbHRlcjogWydtdXRhdGUnXSxcbiAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgIHN1YnRyZWU6IHRydWUsXG4gICAgICBjaGFyYWN0ZXJEYXRhOiB0cnVlXG4gICAgfSlcbiAgfSxcbiAgYmVmb3JlRGVzdHJveSgpIHtcbiAgICB0aGlzLm9ic2VydmVyICYmIHRoaXMub2JzZXJ2ZXIuZGlzY29ubmVjdCgpXG4gIH1cbn1cbiAgIiwiaW1wb3J0IFNsaWRlT2JzZXJ2ZXIgZnJvbSAnLi4vLi4vLi4vbWl4aW5zL3NsaWRlT2JzZXJ2ZXInXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3N3U2xpZGUnLFxuICBtaXhpbnM6IFtTbGlkZU9ic2VydmVyXSxcbiAgcHJvcHM6IHtcbiAgICBjb2xsYXBzZWQ6IEJvb2xlYW4sXG4gICAgaG9yaXpvbnRhbDogQm9vbGVhbixcbiAgICBmaXQ6IEJvb2xlYW4sXG4gICAgbWluOiBOdW1iZXIgfCBTdHJpbmdcbiAgfSxcbiAgZGF0YTogKCkgPT4gKHtcbiAgICBpbm5lckNvbGxhcHNlZDogdHJ1ZVxuICB9KSxcbiAgd2F0Y2g6IHtcbiAgICBjb2xsYXBzZWQ6IHtcbiAgICAgIGhhbmRsZXIoKSB7XG4gICAgICAgIHRoaXMuaW5uZXJDb2xsYXBzZWQgPSB0aGlzLmNvbGxhcHNlZFxuICAgICAgfSxcbiAgICAgIGltbWVkaWF0ZTogdHJ1ZVxuICAgIH1cbiAgfSxcbiAgcmVuZGVyKGgpIHtcbiAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgcmVmOiAnc2xpZGUnLFxuICAgICAgc3RhdGljQ2xhc3M6ICdzdy1zbGlkZV9fY29udGFpbmVyJyxcbiAgICB9LCBbXG4gICAgICBoKCdkaXYnLCB7XG4gICAgICAgIHJlZjogJ29ic2VydmUnLFxuICAgICAgICBzdGF0aWNDbGFzczogYHN3LXNsaWRlX19jb250ZW50YCxcbiAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAnbWluLXdpZHRoJzogdGhpcy5ob3Jpem9udGFsICYmICF0aGlzLmZpdCxcbiAgICAgICAgICAnZml0LXdpZHRoJzogdGhpcy5ob3Jpem9udGFsICYmIHRoaXMuZml0LFxuICAgICAgICAgICdtaW4taGVpZ2h0JzogIXRoaXMuaG9yaXpvbnRhbCAmJiAhdGhpcy5maXQsXG4gICAgICAgICAgJ2ZpdC1oZWlnaHQnOiAhdGhpcy5ob3Jpem9udGFsICYmIHRoaXMuZml0XG4gICAgICAgIH1cbiAgICAgIH0sIFt0aGlzLiRzY29wZWRTbG90cy5kZWZhdWx0KCldKVxuICAgIF0pXG4gIH1cbn0iLCJpbXBvcnQgU2xpZGUgZnJvbSAnLi9zcmMvbWFpbi5qcydcblxuY29uc3QgaW5zdGFsbCA9IGZ1bmN0aW9uIChWdWUpIHtcbiAgVnVlLmNvbXBvbmVudChTbGlkZS5uYW1lLCBTbGlkZSlcbn1cblxuU2xpZGUuaW5zdGFsbCA9IGluc3RhbGxcblxuZXhwb3J0IGRlZmF1bHQgU2xpZGVcbiIsImltcG9ydCBTbGlkZSBmcm9tICcuLi8uLi9zbGlkZSdcbmltcG9ydCB7IGlzU3RyaW5nQ29udGFpbiB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2lzJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdzd0Jhc2ljSXRlbScsXG4gIGNvbXBvbmVudHM6IHsgU2xpZGUgfSxcbiAgcHJvcHM6IHtcbiAgICBjb250ZW50OiBTdHJpbmcsXG4gICAgc3ViQ29udGVudDogU3RyaW5nLFxuICAgIGljb246IFN0cmluZyxcbiAgICBkaXNhYmxlZDogQm9vbGVhbixcbiAgICBmaWxsZWQ6IEJvb2xlYW4sXG4gICAgY29sb3I6IFN0cmluZyxcbiAgICBwcmltYXJ5OiBCb29sZWFuLFxuICAgIG5lZ2F0aXZlOiBCb29sZWFuLFxuICAgIHBvc2l0aXZlOiBCb29sZWFuLFxuICAgIHdhcm5pbmc6IEJvb2xlYW4sXG4gICAgY29sbGFwc2VkOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgIH0sXG4gICAgc3BsaXQ6IEJvb2xlYW4sXG4gICAgbWluaTogQm9vbGVhbixcbiAgICB0bzogU3RyaW5nIHwgT2JqZWN0LFxuICAgIGluZGVudExldmVsOiBOdW1iZXIgfCBTdHJpbmcsXG4gICAgY2VudGVyOiBCb29sZWFuLFxuICAgIGVuZDogQm9vbGVhbixcbiAgICBtYXNrOiBPYmplY3QgfCBCb29sZWFuLFxuICAgIHJpcHBsZTogT2JqZWN0IHwgQm9vbGVhbixcbiAgICBzdWI6IEFycmF5LFxuICAgIGFjdGl2ZTogQm9vbGVhbixcbiAgICBjYWxsYmFjazogRnVuY3Rpb24sXG4gICAgc3ViRmlsdGVyOiBTdHJpbmcsXG4gICAgc3ViVGFnOiBCb29sZWFuXG4gIH0sXG4gIGRhdGE6ICgpID0+ICh7XG4gICAgaW5uZXJBY3RpdmU6IGZhbHNlLFxuICAgIGlubmVyQ29sbGFwc2VkOiB0cnVlLFxuICAgIGNvbGxhcHNlZEJlZm9yZTogdHJ1ZSxcbiAgICBtb3VzZW92ZXI6IGZhbHNlLFxuICAgIGhpZGU6IGZhbHNlXG4gIH0pLFxuICBtZXRob2RzOiB7XG4gICAgc3ViRmlsdGVyQ2hhbmdlKHJlc3RvcmUsIHJlbWVtYmVyKSB7XG4gICAgICBjb25zdCBpc1N1YkNvbnRhaW4gPSBzdWIgPT4ge1xuICAgICAgICBsZXQgY29udGFpbiA9IGZhbHNlXG4gIFxuICAgICAgICBjb250YWluID0gc3ViLnNvbWUoeCA9PiB7XG4gICAgICAgICAgaWYgKHguc3ViKSB7XG4gICAgICAgICAgICByZXR1cm4gaXNTdWJDb250YWluKHguc3ViKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gaXNTdHJpbmdDb250YWluKHguY29udGVudCwgdGhpcy5zdWJGaWx0ZXIpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gY29udGFpblxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5zdWIgPT09IHZvaWQgMCkge1xuICAgICAgICB0aGlzLmhpZGUgPSAhaXNTdHJpbmdDb250YWluKHRoaXMuY29udGVudCwgdGhpcy5zdWJGaWx0ZXIpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAocmVzdG9yZSkge1xuICAgICAgICAgIHRoaXMuaW5uZXJDb2xsYXBzZWQgPSB0aGlzLmNvbGxhcHNlZEJlZm9yZVxuICAgICAgICAgIHRoaXMuaGlkZSA9IGZhbHNlXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlbWVtYmVyKSB7XG4gICAgICAgICAgdGhpcy5jb2xsYXBzZWRCZWZvcmUgPSB0aGlzLmlubmVyQ29sbGFwc2VkXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbm5lckNvbGxhcHNlZCA9IGZhbHNlXG4gICAgICAgIHRoaXMuaGlkZSA9IHRoaXMuc3ViVGFnICYmICFpc1N1YkNvbnRhaW4odGhpcy5zdWIpXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBjcmVhdGVkKCkge1xuICAgIGlmICh0aGlzLmNvbGxhcHNlZCAhPT0gdm9pZCAwKSB7XG4gICAgICB0aGlzLiR3YXRjaCgnY29sbGFwc2VkJywgdiA9PiB7XG4gICAgICAgIHRoaXMuaW5uZXJDb2xsYXBzZWQgPSB0aGlzLmNvbGxhcHNlZEJlZm9yZSA9IHYgPT09IHZvaWQgMCA/IHRydWUgOiB2XG4gICAgICB9LCB7IGltbWVkaWF0ZTogdHJ1ZSB9KVxuICAgICAgdGhpcy4kd2F0Y2goJ2lubmVyQ29sbGFwc2VkJywgdiA9PiB7XG4gICAgICAgIHRoaXMuJGVtaXQoJ3VwZGF0ZTpjb2xsYXBzZWQnLCB2KVxuICAgICAgfSwgeyBpbW1lZGlhdGU6IHRydWUgfSlcbiAgICB9XG4gICAgaWYgKHRoaXMuc3ViICE9PSB2b2lkIDApIHtcbiAgICAgIHRoaXMuJG9uKCd1cGRhdGU6Y29sbGFwc2VkJywgKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnN1YilcbiAgICAgIH0sIHsgaW1tZWRpYXRlOiB0cnVlIH0pXG4gICAgfVxuICAgIGlmICh0aGlzLmNvbnRlbnQgIT09IHZvaWQgMCAmJiB0aGlzLnN1YkZpbHRlciAhPT0gdm9pZCAwKSB7XG4gICAgICB0aGlzLiR3YXRjaCgnc3ViRmlsdGVyJywgKHYsIG92KSA9PiB7XG4gICAgICAgIHRoaXMuc3ViRmlsdGVyQ2hhbmdlKHYgPT09ICcnLCBvdiA9PT0gJycpXG4gICAgICB9LCB7IGltbWVkaWF0ZTogdHJ1ZSB9KVxuICAgIH1cbiAgICBpZiAodGhpcy5hY3RpdmUgIT09IHZvaWQgMCkge1xuICAgICAgdGhpcy4kd2F0Y2goJ2FjdGl2ZScsIHYgPT4ge1xuICAgICAgICB0aGlzLmlubmVyQWN0aXZlID0gdlxuICAgICAgfSwgeyBpbW1lZGlhdGU6IHRydWUgfSlcbiAgICB9XG4gIH0sXG4gIHJlbmRlcihoKSB7XG4gICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiAnc3ctYmFzaWMtaXRlbScsXG4gICAgICBhdHRyczoge1xuICAgICAgICBtdXRhdGU6IHRoaXMuaGlkZVxuICAgICAgfSxcbiAgICAgIGNsYXNzOiB7XG4gICAgICAgIHNwbGl0OiB0aGlzLnNwbGl0ICYmICF0aGlzLmlubmVyQ29sbGFwc2VkLFxuICAgICAgICBoaWRlOiB0aGlzLmhpZGVcbiAgICAgIH1cbiAgICB9LCBbXG4gICAgICBoKCdkaXYnLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctYmFzaWMtaXRlbV9fbWFpbicsXG4gICAgICAgIGNsYXNzOiB0aGlzLmRpc2FibGVkID8gJ2Rpc2FibGUnIDoge1xuICAgICAgICAgICdjb2xvci1wcmltYXJ5JzogIXRoaXMuZmlsbGVkICYmIHRoaXMucHJpbWFyeSxcbiAgICAgICAgICAnY29sb3ItbmVnYXRpdmUnOiAhdGhpcy5maWxsZWQgJiYgdGhpcy5uZWdhdGl2ZSxcbiAgICAgICAgICAnY29sb3ItcG9zaXRpdmUnOiAhdGhpcy5maWxsZWQgJiYgdGhpcy5wb3NpdGl2ZSxcbiAgICAgICAgICAnY29sb3Itd2FybmluZyc6ICF0aGlzLmZpbGxlZCAmJiB0aGlzLndhcm5pbmcsXG4gICAgICAgICAgJ2JnLXByaW1hcnknOiB0aGlzLmZpbGxlZCAmJiB0aGlzLnByaW1hcnksXG4gICAgICAgICAgJ2JnLW5lZ2F0aXZlJzogdGhpcy5maWxsZWQgJiYgdGhpcy5uZWdhdGl2ZSxcbiAgICAgICAgICAnYmctcG9zaXRpdmUnOiB0aGlzLmZpbGxlZCAmJiB0aGlzLnBvc2l0aXZlLFxuICAgICAgICAgICdiZy13YXJuaW5nJzogdGhpcy5maWxsZWQgJiYgdGhpcy53YXJuaW5nLFxuICAgICAgICAgICdiZy1kYXJrIGNvbG9yLXdoaXRlJzogdGhpcy5maWxsZWRcbiAgICAgICAgfSxcbiAgICAgICAgc3R5bGU6IHRoaXMuZGlzYWJsZWQgPyB2b2lkIDAgOiB7XG4gICAgICAgICAgY29sb3I6ICF0aGlzLmZpbGxlZCAmJiB0aGlzLmNvbG9yLFxuICAgICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogdGhpcy5maWxsZWQgJiYgdGhpcy5jb2xvclxuICAgICAgICB9XG4gICAgICB9LCBbXG4gICAgICAgIGgoJ3N3LWl0ZW0nLCB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1iYXNpYy1pdGVtX19pbm5lcicsXG4gICAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIHRvOiAhdGhpcy5jYWxsYmFjayAmJiB0aGlzLnRvIHx8IHZvaWQgMCxcbiAgICAgICAgICAgIGNlbnRlcjogdGhpcy5jZW50ZXIsXG4gICAgICAgICAgICBlbmQ6IHRoaXMuZW5kLFxuICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuZGlzYWJsZWQsXG4gICAgICAgICAgICBtYXNrOiB0aGlzLm1hc2ssXG4gICAgICAgICAgICByaXBwbGU6IHRoaXMucmlwcGxlLFxuICAgICAgICAgICAgYWN0aXZlOiB0aGlzLmlubmVyQWN0aXZlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjbGFzczoge1xuICAgICAgICAgICAgZXhwYW5kOiAhdGhpcy5pbm5lckNvbGxhcHNlZFxuICAgICAgICAgIH0sXG4gICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICdtaW4taGVpZ2h0JzogdGhpcy5taW5pID8gJzM2cHgnIDogJzQ4cHgnLFxuICAgICAgICAgICAgJ3BhZGRpbmctbGVmdCc6IGAke3RoaXMuaW5kZW50TGV2ZWwgKiAxMn1weGAsXG4gICAgICAgICAgICBjdXJzb3I6ICF0aGlzLmRpc2FibGVkICYmICh0aGlzLnRvICE9PSB2b2lkIDAgfHwgdGhpcy5jYWxsYmFjayAhPT0gdm9pZCAwIHx8IHRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQgfHwgdGhpcy5zdWIgIT09IHZvaWQgMCkgPyAncG9pbnRlcicgOiB2b2lkIDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uOiB0aGlzLmRpc2FibGVkID8gdm9pZCAwIDoge1xuICAgICAgICAgICAgLi4udGhpcy4kbGlzdGVuZXJzLFxuICAgICAgICAgICAgY2xpY2s6ICgpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQgfHwgdGhpcy5zdWIgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5uZXJDb2xsYXBzZWQgPSAhdGhpcy5pbm5lckNvbGxhcHNlZFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoaXMuY2FsbGJhY2sgJiYgdGhpcy5jYWxsYmFjayh0aGlzKVxuICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdjbGljaycpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbW91c2VvdmVyOiAoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMubW91c2VvdmVyID0gdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1vdXNlb3V0OiAoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMubW91c2VvdmVyID0gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIHNjb3BlZFNsb3RzOiB7XG4gICAgICAgICAgICBiZWZvcmU6IHRoaXMuJHNjb3BlZFNsb3RzLmJlZm9yZSAhPT0gdm9pZCAwID8gdGhpcy4kc2NvcGVkU2xvdHMuYmVmb3JlXG4gICAgICAgICAgICAgIDogdGhpcy5pY29uICE9PSB2b2lkIDAgPyAoKSA9PiBbaCgnc3ctaWNvbicsIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWJhc2ljLWl0ZW1fX2ljb24nLFxuICAgICAgICAgICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLmljb25cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXSA6IHZvaWQgMCxcbiAgXG4gICAgICAgICAgICBkZWZhdWx0OiAoKSA9PiBbaCgnZGl2Jywge1xuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWJhc2ljLWl0ZW1fX2NvbnRlbnQgZmxleCBpdGVtcy1jZW50ZXInLFxuICAgICAgICAgICAgICBjbGFzczoge1xuICAgICAgICAgICAgICAgICdzcGFjZS1sZWZ0JzogdGhpcy4kc2NvcGVkU2xvdHMuYmVmb3JlICE9PSB2b2lkIDAgfHwgdGhpcy5pY29uICE9PSB2b2lkIDAsXG4gICAgICAgICAgICAgICAgJ3NwYWNlLXJpZ2h0JzogKHRoaXMuJHNjb3BlZFNsb3RzLmFmdGVyICE9PSB2b2lkIDAgfHwgdGhpcy4kc2NvcGVkU2xvdHMuZGVmYXVsdCAhPT0gdm9pZCAwIHx8IHRoaXMuc3ViICE9PSB2b2lkIDApICYmICh0aGlzLiRzY29wZWRTbG90cy5jb250ZW50ICE9PSB2b2lkIDAgfHwgdGhpcy5jb250ZW50ICE9PSB2b2lkIDAgfHwgdGhpcy5zdWJDb250ZW50ICE9PSB2b2lkIDApXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIHRoaXMuJHNjb3BlZFNsb3RzLmNvbnRlbnQgIT09IHZvaWQgMCA/IFt0aGlzLiRzY29wZWRTbG90cy5jb250ZW50KCldIDogW1xuICAgICAgICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6ICdkZWZhdWx0LWNvbnRlbnQnXG4gICAgICAgICAgICAgIH0sIFtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQgIT09IHZvaWQgMCA/IGgoJ2RpdicsIHtcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctYmFzaWMtaXRlbV9fbGFiZWwnXG4gICAgICAgICAgICAgICAgfSwgdGhpcy5jb250ZW50KSA6IHZvaWQgMCxcbiAgICAgICAgICAgICAgICB0aGlzLnN1YkNvbnRlbnQgIT09IHZvaWQgMCA/IGgoJ2RpdicsIHtcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctYmFzaWMtaXRlbV9fc3VibGFiZWwnXG4gICAgICAgICAgICAgICAgfSwgdGhpcy5zdWJDb250ZW50KSA6IHZvaWQgMFxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgXVxuICAgICAgICAgICAgKV0sXG4gIFxuICAgICAgICAgICAgYWZ0ZXI6IHRoaXMuJHNjb3BlZFNsb3RzLmFmdGVyICE9PSB2b2lkIDAgPyB0aGlzLiRzY29wZWRTbG90cy5hZnRlciA6IHRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQgfHwgdGhpcy5zdWIgIT09IHZvaWQgMCA/ICgpID0+IFtoKCdzdy1pY29uJywge1xuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWJhc2ljLWl0ZW1fX2V4cGFuc2lvbiBjb2xvci1ncmV5JyxcbiAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICF0aGlzLmlubmVyQ29sbGFwc2VkID8gJ3JvdGF0ZSgxODBkZWcpJyA6IHZvaWQgMCxcbiAgICAgICAgICAgICAgICBjb2xvcjogdGhpcy5tb3VzZW92ZXIgPyAnY3VycmVudENvbG9yJyA6IHZvaWQgMFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdrZXlib2FyZF9hcnJvd19kb3duJ1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KV0gOiB2b2lkIDBcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICBdKSxcbiAgICAgIHRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQgfHwgdGhpcy5zdWIgIT09IHZvaWQgMCA/IGgoU2xpZGUsIHtcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICBjb2xsYXBzZWQ6IHRoaXMuaW5uZXJDb2xsYXBzZWRcbiAgICAgICAgfSxcbiAgICAgICAgc2NvcGVkU2xvdHM6IHtcbiAgICAgICAgICBkZWZhdWx0OiAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgc3ViID0gdGhpcy5zdWIgIT09IHZvaWQgMCA/IHRoaXMuc3ViLm1hcChwcm9wcyA9PiB7XG4gICAgICAgICAgICAgIGxldCBwb3NpdGlvbiA9ICEhcHJvcHMuY2VudGVyIHx8ICEhcHJvcHMuZW5kIHx8IGZhbHNlXG5cbiAgICAgICAgICAgICAgcmV0dXJuIGgoJ3N3LWJhc2ljLWl0ZW0nLCB7XG4gICAgICAgICAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHByb3BzLmNvbnRlbnQsXG4gICAgICAgICAgICAgICAgICBzdWJDb250ZW50OiBwcm9wcy5zdWJDb250ZW50LFxuICAgICAgICAgICAgICAgICAgaWNvbjogcHJvcHMuaWNvbixcbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBwcm9wcy5kaXNhYmxlZCxcbiAgICAgICAgICAgICAgICAgIGNvbGxhcHNlZDogcHJvcHMuY29sbGFwc2VkLFxuICAgICAgICAgICAgICAgICAgdG86IHByb3BzLnRvLFxuICAgICAgICAgICAgICAgICAgc3ViOiBwcm9wcy5zdWIsXG4gICAgICAgICAgICAgICAgICBjb2xvcjogcHJvcHMuY29sb3IsXG4gICAgICAgICAgICAgICAgICBwcmltYXJ5OiBwcm9wcy5wcmltYXJ5LFxuICAgICAgICAgICAgICAgICAgbmVnYXRpdmU6IHByb3BzLm5lZ2F0aXZlLFxuICAgICAgICAgICAgICAgICAgcG9zaXRpdmU6IHByb3BzLnBvc2l0aXZlLFxuICAgICAgICAgICAgICAgICAgd2FybmluZzogcHJvcHMud2FybmluZyxcbiAgICAgICAgICAgICAgICAgIGNlbnRlcjogcG9zaXRpb24gPyBwcm9wcy5jZW50ZXIgOiB0aGlzLmNlbnRlcixcbiAgICAgICAgICAgICAgICAgIGVuZDogcG9zaXRpb24gPyBwcm9wcy5lbmQgOiB0aGlzLmVuZCxcbiAgICAgICAgICAgICAgICAgIGZpbGxlZDogcHJvcHMuZmlsbGVkICE9PSB2b2lkIDAgPyBwcm9wcy5maWxsZWQgOiB0aGlzLnNwbGl0LFxuICAgICAgICAgICAgICAgICAgc3BsaXQ6IHByb3BzLnNwbGl0ICE9PSB2b2lkIDAgPyBwcm9wcy5zcGxpdCA6IHRoaXMuc3BsaXQsXG4gICAgICAgICAgICAgICAgICBtaW5pOiBwcm9wcy5taW5pICE9PSB2b2lkIDAgPyBwcm9wcy5taW5pIDogdGhpcy5taW5pLFxuICAgICAgICAgICAgICAgICAgaW5kZW50TGV2ZWw6IHByb3BzLmluZGVudExldmVsICE9PSB2b2lkIDAgPyBwcm9wcy5pbmRlbnRMZXZlbCA6IHRoaXMuaW5kZW50TGV2ZWwsXG4gICAgICAgICAgICAgICAgICBtYXNrOiBwcm9wcy5tYXNrICE9PSB2b2lkIDAgPyBwcm9wcy5tYXNrIDogdGhpcy5tYXNrLFxuICAgICAgICAgICAgICAgICAgcmlwcGxlOiBwcm9wcy5yaXBwbGUgIT09IHZvaWQgMCA/IHByb3BzLnJpcHBsZSA6IHRoaXMucmlwcGxlLFxuICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IHByb3BzLmNhbGxiYWNrICE9PSB2b2lkIDAgPyBwcm9wcy5jYWxsYmFjayA6IHRoaXMuY2FsbGJhY2ssXG4gICAgICAgICAgICAgICAgICBhY3RpdmU6IHByb3BzLmFjdGl2ZSxcbiAgICAgICAgICAgICAgICAgIHN1YkZpbHRlcjogdGhpcy5zdWJGaWx0ZXIsXG4gICAgICAgICAgICAgICAgICBzdWJUYWc6IHRydWVcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBvbjoge1xuICAgICAgICAgICAgICAgIC8vICAgJ3VwZGF0ZTpjb2xsYXBzZWQnKHYpIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgcHJvcHMuY29sbGFwc2VkID0gdlxuICAgICAgICAgICAgICAgIC8vICAgfVxuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pIDogW11cblxuICAgICAgICAgICAgc3ViLnVuc2hpZnQodGhpcy4kc2NvcGVkU2xvdHMuZGVmYXVsdCA/IHRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQoKSA6IHZvaWQgMClcbiAgICAgICAgICAgIHJldHVybiBzdWJcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pIDogdm9pZCAwXG4gICAgXSlcbiAgfVxufVxuICAiLCJpbXBvcnQgQmFzaWNJdGVtIGZyb20gJy4vc3JjL21haW4uanMnXG5cbmNvbnN0IGluc3RhbGwgPSBmdW5jdGlvbiAoVnVlKSB7XG4gIFZ1ZS5jb21wb25lbnQoQmFzaWNJdGVtLm5hbWUsIEJhc2ljSXRlbSlcbn1cblxuQmFzaWNJdGVtLmluc3RhbGwgPSBpbnN0YWxsXG5cbmV4cG9ydCBkZWZhdWx0IEJhc2ljSXRlbVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGhhc093bihvYmosIGtleSkge1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIGlzVk5vZGUobm9kZSkge1xuICByZXR1cm4gbm9kZSAhPT0gbnVsbCAmJiB0eXBlb2Ygbm9kZSA9PT0gJ29iamVjdCcgJiYgaGFzT3duKG5vZGUsICdjb21wb25lbnRPcHRpb25zJyk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Rmlyc3RDb21wb25lbnRDaGlsZChjaGlsZHJlbikge1xuICByZXR1cm4gY2hpbGRyZW4gJiYgY2hpbGRyZW4uZmlsdGVyKGMgPT4gYyAmJiBjLnRhZylbMF07XG59OyIsIi8vIDx0ZW1wbGF0ZT5cbi8vICAgPGRpdj5cbi8vICAgICA8YnV0dG9uIEBjbGljaz1cImhhbmRsZUJ0blwiPmNsaWNrPC9idXR0b24+XG4vLyAgICAgPHRyYW5zaXRpb24gbmFtZT0nc3ctbm90aWZpY2F0aW9uLWZhZGUnPlxuLy8gICAgICAgPGRpdiB2LWlmPVwic2hvd1wiIGNsYXNzPVwic3ctbm90aWZpY2F0aW9uXCI+XG4vLyAgICAgICAgIDxoMiBjbGFzcz1cInRpdGxlXCI+XG4vLyAgICAgICAgICAg5o+Q56S6MTExMVxuLy8gICAgICAgICA8L2gyPlxuLy8gICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGVudFwiPlxuLy8gICAgICAgICAgIOi/meaYr+S4gOadoea2iOaBr1xuLy8gICAgICAgICA8L2Rpdj5cbi8vICAgICAgICAgPGRpdiBjbGFzcz1cImNsb3NlXCIgQGNsaWNrPVwiaGFuZGxlQnRuXCI+XG4vLyAgICAgICAgICAgPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPmNsb3NlPC9pPlxuLy8gICAgICAgICA8L2Rpdj5cbi8vICAgICAgIDwvZGl2PlxuLy8gICAgIDwvdHJhbnNpdGlvbj5cbi8vICAgPC9kaXY+XG4vLyA8L3RlbXBsYXRlPlxuaW1wb3J0IFZub2RlLCB7IGlzVk5vZGUgfSBmcm9tICcuLi8uLi8uLi91dGlscy92ZG9tJ1xuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnc3dOb3RpZmljYXRpb24nLFxuICBkYXRhICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc2hvdzogZmFsc2UsXG4gICAgICB2ZXJ0aWNhbE9mZnNldDogMCxcbiAgICAgIG9uQ2xvc2U6IG51bGwsXG4gICAgICBwb3NpdGlvbjogJ3RvcC1yaWdodCcsXG4gICAgICB0aXRsZTogJycsXG4gICAgICBjb250ZW50OiAnJyxcbiAgICAgIHNsb3Q6IG51bGwsXG4gICAgICBiYWNrZ3JvdW5kOiAnI2ZmZicsXG4gICAgICBjbG9zZUNvbG9yOiAnIzkwOTM5OSdcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBoYW5kbGVCdG4oKSB7XG4gICAgICB0aGlzLnNob3cgPSBmYWxzZVxuICAgICAgaWYgKHR5cGVvZiB0aGlzLm9uQ2xvc2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5vbkNsb3NlKCk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBjb21wdXRlZDoge1xuICAgIHZlcnRpY2FsUHJvcGVydHkoKSB7XG4gICAgICByZXR1cm4gL150b3AtLy50ZXN0KHRoaXMucG9zaXRpb24pID8gJ3RvcCcgOiAnYm90dG9tJztcbiAgICB9LFxuXG4gICAgcG9zaXRpb25TdHlsZSgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIFt0aGlzLnZlcnRpY2FsUHJvcGVydHldOiBgJHsgdGhpcy52ZXJ0aWNhbE9mZnNldCB9cHhgLFxuICAgICAgfTtcbiAgICB9LFxuICAgIGdldFZub2RlKCkge1xuICAgICAgaWYgKGlzVk5vZGUodGhpcy5zbG90KSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zbG90XG4gICAgICB9XG4gICAgICBjb25zb2xlLmVycm9yKCdQbGVhc2UgY2hlY2sgeW91ciBWbm9kZSB3cml0aW5nJylcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICB9LFxuICByZW5kZXIoaCkge1xuICAgcmV0dXJuIGgoJ3RyYW5zaXRpb24nLHtcbiAgICAgIGF0dHJzOiB7XG4gICAgICAgIG5hbWU6ICdzdy1ub3RpZmljYXRpb24tZmFkZSdcbiAgICAgIH1cbiAgICB9LCBbdGhpcy5zaG93ID8gaCgnZGl2Jywge1xuICAgICAgICAgICAgY2xhc3M6ICdzdy1ub3RpZmljYXRpb24nLFxuICAgICAgICAgICAgc3R5bGU6IE9iamVjdC5hc3NpZ24odGhpcy5wb3NpdGlvblN0eWxlLCB7IGJhY2tncm91bmQ6IHRoaXMuYmFja2dyb3VuZCB9KVxuICAgICAgICAgIH0sIFtcbiAgICAgICAgICAgIHRoaXMuZ2V0Vm5vZGUgPyAnJyA6IGgoJ2gyJywge1xuICAgICAgICAgICAgICBjbGFzczogJ3RpdGxlJ1xuICAgICAgICAgICAgfSwgdGhpcy50aXRsZSksXG4gICAgICAgICAgICB0aGlzLmdldFZub2RlID8gdGhpcy5nZXRWbm9kZSA6IGgoJ2RpdicsIHtcbiAgICAgICAgICAgICAgY2xhc3M6ICdjb250ZW50J1xuICAgICAgICAgICAgfSx0aGlzLmNvbnRlbnQpLFxuICAgICAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgICAgICBjbGFzczogJ2Nsb3NlJyxcbiAgICAgICAgICAgICAgc3R5bGU6IHsgY29sb3I6IHRoaXMuY2xvc2VDb2xvciB9LFxuICAgICAgICAgICAgfSwgW2goJ2RpdicsIHtcbiAgICAgICAgICAgICAgICAgIGNsYXNzOiAnbWF0ZXJpYWwtaWNvbnMnLFxuICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgY2xpY2s6ICgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVCdG4oKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgJ2Nsb3NlJyldKVxuICAgICAgICAgIF0pXG4gICAgXG4gICAgICAgIDogdm9pZCAwXSApXG4gIH1cbn1cblxuIiwiaW1wb3J0IFZ1ZSBmcm9tICd2dWUnO1xuaW1wb3J0IE5vdGlmaWNhdGlvbiBmcm9tICcuL21haW4uanMnO1xuXG5jb25zdCBOb3RpZmljYXRpb25Db25zdHJ1Y3RvciA9IFZ1ZS5leHRlbmQoTm90aWZpY2F0aW9uKVxuXG5sZXQgaW5zdGFuY2U7XG5sZXQgaW5zdGFuY2VzID0gW11cbmxldCBzZWVkID0gMVxuY29uc3QgTm90aWZpY2F0aW9uRnVuID0gZnVuY3Rpb24ob3B0aW9ucyl7XG4gIGlmIChWdWUucHJvdG90eXBlLiRpc1NlcnZlcikgcmV0dXJuO1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgY29uc3QgdXNlck9uQ2xvc2UgPSBvcHRpb25zLm9uQ2xvc2U7XG4gIGNvbnN0IGlkID0gJ25vdGlmaWNhdGlvbl8nICsgc2VlZCsrO1xuICBjb25zdCBwb3NpdGlvbiA9IG9wdGlvbnMucG9zaXRpb24gfHwgJ3RvcC1yaWdodCc7XG4gIG9wdGlvbnMub25DbG9zZSA9IGZ1bmN0aW9uKCkge1xuICAgIE5vdGlmaWNhdGlvbi5jbG9zZShpZCwgdXNlck9uQ2xvc2UpXG4gIH1cbiAgaW5zdGFuY2UgPSBuZXcgTm90aWZpY2F0aW9uQ29uc3RydWN0b3Ioe1xuICAgIGRhdGE6IG9wdGlvbnNcbiAgfSlcbiAgaW5zdGFuY2UuaWQgPSBpZFxuICBpbnN0YW5jZS4kbW91bnQoKTtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChpbnN0YW5jZS4kZWwpO1xuICBpbnN0YW5jZS5zaG93ID0gdHJ1ZVxuICBsZXQgdmVydGljYWxPZmZzZXQgPSAwXG4gIGluc3RhbmNlcy5maWx0ZXIoaXRlbSA9PiBpdGVtLnBvc2l0aW9uID09PSBwb3NpdGlvbikuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICB2ZXJ0aWNhbE9mZnNldCArPSBlbGVtZW50LiRlbC5vZmZzZXRIZWlnaHQgKyAxNlxuICB9KTtcbiAgdmVydGljYWxPZmZzZXQgKz0gMTZcbiAgaW5zdGFuY2UudmVydGljYWxPZmZzZXQgPSB2ZXJ0aWNhbE9mZnNldFxuICBpbnN0YW5jZXMucHVzaChpbnN0YW5jZSlcbiAgY29uc29sZS5sb2coKVxuICByZXR1cm4gaW5zdGFuY2U7XG59IFxuTm90aWZpY2F0aW9uLmNsb3NlID0gZnVuY3Rpb24oaWQsIHVzZXJPbkNsb3NlKSB7XG4gIGxldCBpbmRleCA9IC0xXG4gIGNvbnN0IGxlbiA9IGluc3RhbmNlcy5sZW5ndGhcbiAgY29uc3QgaW5zdGFuY2UgPSBpbnN0YW5jZXMuZmlsdGVyKChpbnN0YW5jZSwgaSkgPT4ge1xuICAgIGlmIChpbnN0YW5jZS5pZCA9PT0gaWQpIHtcbiAgICAgIGluZGV4ID0gaTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0pWzBdXG4gIGlmICghaW5zdGFuY2UpIHJldHVyblxuXG4gIGlmICh0eXBlb2YgdXNlck9uQ2xvc2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICB1c2VyT25DbG9zZShpbnN0YW5jZSk7XG4gIH1cbiAgaW5zdGFuY2VzLnNwbGljZShpbmRleCwgMSlcblxuICBpZiAobGVuIDw9IDEpIHJldHVyblxuXG4gIGNvbnN0IHBvc2l0aW9uID0gaW5zdGFuY2UucG9zaXRpb247XG4gIGNvbnN0IHJlbW92ZWRIZWlnaHQgPSBpbnN0YW5jZS4kZWwub2Zmc2V0SGVpZ2h0XG4gIGZvciAobGV0IGkgPSBpbmRleDsgaSA8IGxlbiAtIDE7IGkrKyl7XG4gICAgaWYgKGluc3RhbmNlc1tpXS5wb3NpdGlvbiA9PT0gcG9zaXRpb24pIHtcbiAgICAgIGluc3RhbmNlc1tpXS4kZWwuc3R5bGVbaW5zdGFuY2UudmVydGljYWxQcm9wZXJ0eV0gPSBwYXJzZUludChpbnN0YW5jZXNbaV0uJGVsLnN0eWxlW2luc3RhbmNlLnZlcnRpY2FsUHJvcGVydHldLCAxMCkgLSByZW1vdmVkSGVpZ2h0IC0gMTYgKyAncHgnXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE5vdGlmaWNhdGlvbkZ1biIsImltcG9ydCBTbGlkZSBmcm9tICcuLi8uLi9zbGlkZSdcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnc3dMYXlvdXQnLFxuICBjb21wb25lbnRzOiB7IFNsaWRlIH0sXG4gIHByb3BzOiB7XG4gICAgY29sbGFwc2VUb3A6IEJvb2xlYW4sXG4gICAgY29sbGFwc2VMZWZ0OiBCb29sZWFuLFxuICAgIGNvbGxhcHNlUmlnaHQ6IEJvb2xlYW4sXG4gICAgY29sbGFwc2VCb3R0b206IEJvb2xlYW4sXG4gICAgZml0VG9wOiBCb29sZWFuLFxuICAgIGZpdExlZnQ6IEJvb2xlYW4sXG4gICAgZml0UmlnaHQ6IEJvb2xlYW4sXG4gICAgZml0Qm90dG9tOiBCb29sZWFuLFxuICAgIHRvcE1pbjogTnVtYmVyIHwgU3RyaW5nLFxuICAgIGxlZnRNaW46IE51bWJlciB8IFN0cmluZyxcbiAgICByaWdodE1pbjogTnVtYmVyIHwgU3RyaW5nLFxuICAgIGJvdHRvbU1pbjogTnVtYmVyIHwgU3RyaW5nXG4gIH0sXG4gIGRhdGE6ICgpID0+ICh7fSksXG4gIGNvbXB1dGVkOiB7XG4gICAgdmVydGljYWxTdHJldGNoKCkge1xuICAgICAgcmV0dXJuIHRoaXMuJHNjb3BlZFNsb3RzLnRvcCAhPT0gdm9pZCAwIHx8IHRoaXMuJHNjb3BlZFNsb3RzLmJvdHRvbSAhPT0gdm9pZCAwXG4gICAgfVxuICB9LFxuICByZW5kZXIoaCkge1xuICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICBzdGF0aWNDbGFzczogJ3N3LWxheW91dCBmbGV4IG5vLXdyYXAnLFxuICAgICAgc3R5bGU6IHtcbiAgICAgICAgJ2ZsZXgtZGlyZWN0aW9uJzogdGhpcy52ZXJ0aWNhbFN0cmV0Y2ggJiYgJ2NvbHVtbidcbiAgICAgIH1cbiAgICB9LCBbXG4gICAgICB0aGlzLiRzY29wZWRTbG90cy50b3AgIT09IHZvaWQgMCA/IGgoU2xpZGUsIHtcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICBjb2xsYXBzZWQ6IHRoaXMuY29sbGFwc2VUb3AsXG4gICAgICAgICAgZml0OiB0aGlzLmZpdFRvcCxcbiAgICAgICAgICBtaW46IHRoaXMudG9wTWluXG4gICAgICAgIH0sXG4gICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctbGF5b3V0X19hcm91bmQnLFxuICAgICAgICBzY29wZWRTbG90czoge1xuICAgICAgICAgIGRlZmF1bHQ6IHRoaXMuJHNjb3BlZFNsb3RzLnRvcFxuICAgICAgICB9XG4gICAgICB9KSA6IHZvaWQgMCxcblxuICAgICAgIXRoaXMudmVydGljYWxTdHJldGNoICYmIHRoaXMuJHNjb3BlZFNsb3RzLmxlZnQgIT09IHZvaWQgMCA/IGgoU2xpZGUsIHtcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICBjb2xsYXBzZWQ6IHRoaXMuY29sbGFwc2VMZWZ0LFxuICAgICAgICAgIGhvcml6b250YWw6IHRydWUsXG4gICAgICAgICAgZml0OiB0aGlzLmZpdExlZnQsXG4gICAgICAgICAgbWluOiB0aGlzLmxlZnRNaW5cbiAgICAgICAgfSxcbiAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1sYXlvdXRfX2Fyb3VuZCcsXG4gICAgICAgIHNjb3BlZFNsb3RzOiB7XG4gICAgICAgICAgZGVmYXVsdDogdGhpcy4kc2NvcGVkU2xvdHMubGVmdFxuICAgICAgICB9XG4gICAgICB9KSA6IHZvaWQgMCxcblxuICAgICAgaCgnZGl2Jywge1xuICAgICAgICByZWY6ICdsYXlvdXRNYWluJyxcbiAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1sYXlvdXRfX21haW4nLFxuICAgICAgfSwgW1t0aGlzLiRzY29wZWRTbG90cy5kZWZhdWx0ICE9PSB2b2lkIDBcbiAgICAgICAgPyB0aGlzLiRzY29wZWRTbG90cy5kZWZhdWx0KCkgOiB2b2lkIDBdXSksXG5cbiAgICAgICF0aGlzLnZlcnRpY2FsU3RyZXRjaCAmJiB0aGlzLiRzY29wZWRTbG90cy5yaWdodCAhPT0gdm9pZCAwID8gaChTbGlkZSwge1xuICAgICAgICBwcm9wczoge1xuICAgICAgICAgIGNvbGxhcHNlZDogdGhpcy5jb2xsYXBzZVJpZ2h0LFxuICAgICAgICAgIGhvcml6b250YWw6IHRydWUsXG4gICAgICAgICAgZml0OiB0aGlzLmZpdFJpZ2h0LFxuICAgICAgICAgIG1pbjogdGhpcy5yaWdodE1pblxuICAgICAgICB9LFxuICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWxheW91dF9fYXJvdW5kJyxcbiAgICAgICAgc2NvcGVkU2xvdHM6IHtcbiAgICAgICAgICBkZWZhdWx0OiB0aGlzLiRzY29wZWRTbG90cy5yaWdodFxuICAgICAgICB9XG4gICAgICB9KSA6IHZvaWQgMCxcblxuICAgICAgdGhpcy4kc2NvcGVkU2xvdHMuYm90dG9tICE9PSB2b2lkIDAgPyBoKFNsaWRlLCB7XG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgY29sbGFwc2VkOiB0aGlzLmNvbGxhcHNlQm90dG9tLFxuICAgICAgICAgIGZpdDogdGhpcy5maXRCb3R0b20sXG4gICAgICAgICAgbWluOiB0aGlzLmJvdHRvbU1pblxuICAgICAgICB9LFxuICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWxheW91dF9fYXJvdW5kJyxcbiAgICAgICAgc2NvcGVkU2xvdHM6IHtcbiAgICAgICAgICBkZWZhdWx0OiB0aGlzLiRzY29wZWRTbG90cy5ib3R0b21cbiAgICAgICAgfVxuICAgICAgfSkgOiB2b2lkIDBcbiAgICBdKVxuICB9XG59IiwiaW1wb3J0IExheW91dCBmcm9tICcuL3NyYy9tYWluLmpzJ1xuXG5jb25zdCBpbnN0YWxsID0gZnVuY3Rpb24gKFZ1ZSkge1xuICBWdWUuY29tcG9uZW50KExheW91dC5uYW1lLCBMYXlvdXQpXG59XG5cbkxheW91dC5pbnN0YWxsID0gaW5zdGFsbFxuXG5leHBvcnQgZGVmYXVsdCBMYXlvdXRcbiIsImNvbnN0IHNob3dNYXNrID0gY3R4ID0+IHtcbiAgaWYgKCFjdHguZGlzYWJsZWQgJiYgIWN0eC5zdGF5KSB7XG4gICAgY3R4Lm5vZGUuY2xhc3NMaXN0LnJlbW92ZSgnaW52aXNpYmxlJylcbiAgfVxufVxuY29uc3QgaGlkZU1hc2sgPSBjdHggPT4ge1xuICBpZiAoIWN0eC5kaXNhYmxlZCAmJiAhY3R4LnN0YXkpIHtcbiAgICBjdHgubm9kZS5jbGFzc0xpc3QuYWRkKCdpbnZpc2libGUnKVxuICB9XG59XG5jb25zdCBkaXNhYmxlTWFzayA9IGN0eCA9PiB7XG4gIGlmIChjdHguZGlzYWJsZWQgJiYgIWN0eC5zdGF5KSB7XG4gICAgY3R4Lm5vZGUuY2xhc3NMaXN0LmFkZCgnaW52aXNpYmxlJylcbiAgfVxufVxuY29uc3Qgc3RheU1hc2sgPSBjdHggPT4ge1xuICBpZiAoY3R4LnN0YXkpIHtcbiAgICBjdHgubm9kZS5jbGFzc0xpc3QucmVtb3ZlKCdpbnZpc2libGUnKVxuICB9IGVsc2Uge1xuICAgIGN0eC5ub2RlLmNsYXNzTGlzdC5hZGQoJ2ludmlzaWJsZScpXG4gIH1cbn1cbmNvbnN0IGNvbG9yTWFzayA9IGN0eCA9PiB7XG4gIGN0eC5ub2RlLnN0eWxlLmNvbG9yID0gY3R4LmNvbG9yXG59XG5jb25zdCBnZXREaXNhYmxlZCA9IHZhbHVlID0+IHZhbHVlICE9PSB2b2lkIDAgJiYgKHZhbHVlLmRpc2FibGVkID09PSB0cnVlIHx8IGZhbHNlKVxuY29uc3QgZ2V0U3RheSA9IHZhbHVlID0+IHZhbHVlICE9PSB2b2lkIDAgJiYgKHZhbHVlLnN0YXkgPT09IHRydWUgfHwgZmFsc2UpXG5jb25zdCBnZXRDb2xvciA9IHZhbHVlID0+IHZhbHVlICE9PSB2b2lkIDAgJiYgdmFsdWUuY29sb3IgfHwgdm9pZCAwXG5jb25zdCBpbml0TWFzayA9IChlbCwgYmluZGluZykgPT4ge1xuICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgY29uc3QgY3R4ID0ge1xuICAgIG5vZGU6IG5vZGUsXG4gICAgZGlzYWJsZWQ6IGdldERpc2FibGVkKGJpbmRpbmcudmFsdWUpLFxuICAgIHN0YXk6IGdldFN0YXkoYmluZGluZy52YWx1ZSksXG4gICAgY29sb3I6IGdldENvbG9yKGJpbmRpbmcudmFsdWUpLFxuICAgIHNob3dNYXNrOiAoKSA9PiB7XG4gICAgICBzaG93TWFzayhjdHgpXG4gICAgfSxcbiAgICBoaWRlTWFzazogKCkgPT4ge1xuICAgICAgaGlkZU1hc2soY3R4KVxuICAgIH1cbiAgfVxuXG4gIGN0eC5ub2RlLmNsYXNzTGlzdC5hZGQoJ3N3LW1hc2snKVxuICBkaXNhYmxlTWFzayhjdHgpXG4gIHN0YXlNYXNrKGN0eClcbiAgY29sb3JNYXNrKGN0eClcbiAgaGlkZU1hc2soY3R4KVxuICBlbC5tYXNrQ3R4ID0gY3R4XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ21hc2snLFxuICBiaW5kKGVsLCBiaW5kaW5nKSB7XG4gICAgaW5pdE1hc2soZWwsIGJpbmRpbmcpXG4gICAgZWwuYXBwZW5kQ2hpbGQoZWwubWFza0N0eC5ub2RlKVxuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIGVsLm1hc2tDdHguc2hvd01hc2ssIGZhbHNlKVxuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgZWwubWFza0N0eC5oaWRlTWFzaywgZmFsc2UpXG4gIH0sXG4gIHVwZGF0ZShlbCwgYmluZGluZykge1xuICAgIGVsLm1hc2tDdHguZGlzYWJsZWQgPSBnZXREaXNhYmxlZChiaW5kaW5nLnZhbHVlKVxuICAgIGlmIChnZXREaXNhYmxlZChiaW5kaW5nLm9sZFZhbHVlKSAhPT0gZWwubWFza0N0eC5kaXNhYmxlZCkge1xuICAgICAgZGlzYWJsZU1hc2soZWwubWFza0N0eClcbiAgICB9XG5cbiAgICBlbC5tYXNrQ3R4LnN0YXkgPSBnZXRTdGF5KGJpbmRpbmcudmFsdWUpXG4gICAgaWYgKGdldFN0YXkoYmluZGluZy5vbGRWYWx1ZSkgIT09IGVsLm1hc2tDdHguc3RheSkge1xuICAgICAgc3RheU1hc2soZWwubWFza0N0eClcbiAgICB9XG5cbiAgICBlbC5tYXNrQ3R4LmNvbG9yID0gZ2V0Q29sb3IoYmluZGluZy52YWx1ZSlcbiAgICBpZiAoZ2V0Q29sb3IoYmluZGluZy5vbGRWYWx1ZSkgIT09IGVsLm1hc2tDdHguY29sb3IpIHtcbiAgICAgIGNvbG9yTWFzayhlbC5tYXNrQ3R4KVxuICAgIH1cbiAgfSxcbiAgdW5iaW5kKGVsKSB7XG4gICAgaWYgKGVsLm1hc2tDdHgpIHtcbiAgICAgIGVsLm1hc2tDdHgubm9kZS5yZW1vdmUoKVxuICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgZWwubWFza0N0eC5zaG93TWFzaywgZmFsc2UpXG4gICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIGVsLm1hc2tDdHguaGlkZU1hc2ssIGZhbHNlKVxuICAgICAgZGVsZXRlIGVsLm1hc2tDdHhcbiAgICB9XG4gIH1cbn0iLCJpbXBvcnQgTWFzayBmcm9tICcuL3NyYy9tYWluLmpzJ1xuXG5jb25zdCBpbnN0YWxsID0gZnVuY3Rpb24gKFZ1ZSkge1xuICBWdWUuZGlyZWN0aXZlKE1hc2submFtZSwgTWFzaylcbn1cblxuTWFzay5pbnN0YWxsID0gaW5zdGFsbFxuXG5leHBvcnQgZGVmYXVsdCBNYXNrIiwiZXhwb3J0IGZ1bmN0aW9uIHBvc2l0aW9uKGUpIHtcbiAgaWYgKGUudG91Y2hlcyAmJiBlLnRvdWNoZXNbMF0pIHtcbiAgICBlID0gZS50b3VjaGVzWzBdXG4gIH0gZWxzZSBpZiAoZS5jaGFuZ2VkVG91Y2hlcyAmJiBlLmNoYW5nZWRUb3VjaGVzWzBdKSB7XG4gICAgZSA9IGUuY2hhbmdlZFRvdWNoZXNbMF1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgdG9wOiBlLmNsaWVudFksXG4gICAgbGVmdDogZS5jbGllbnRYXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEV2ZW50UGF0aChlKSB7XG4gIGlmIChlLnBhdGgpIHtcbiAgICByZXR1cm4gZS5wYXRoXG4gIH1cbiAgaWYgKGUuY29tcG9zZWRQYXRoKSB7XG4gICAgcmV0dXJuIGUuY29tcG9zZWRQYXRoKClcbiAgfVxuXG4gIGNvbnN0IHBhdGggPSBbXVxuICBsZXQgZWwgPSBlLnRhcmdldFxuXG4gIHdoaWxlIChlbCkge1xuICAgIHBhdGgucHVzaChlbClcblxuICAgIGlmIChlbC50YWdOYW1lID09PSAnSFRNTCcpIHtcbiAgICAgIHBhdGgucHVzaChkb2N1bWVudClcbiAgICAgIHBhdGgucHVzaCh3aW5kb3cpXG4gICAgICByZXR1cm4gcGF0aFxuICAgIH1cblxuICAgIGVsID0gZWwucGFyZW50RWxlbWVudFxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdG9wKGUpIHtcbiAgZS5zdG9wUHJvcGFnYXRpb24oKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJldmVudChlKSB7XG4gIGUucHJldmVudERlZmF1bHQoKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RvcEFuZFByZXZlbnQoZSkge1xuICBlLnByZXZlbnREZWZhdWx0KClcbiAgZS5zdG9wUHJvcGFnYXRpb24oKVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHBvc2l0aW9uLFxuICBnZXRFdmVudFBhdGgsXG4gIHN0b3AsXG4gIHByZXZlbnQsXG4gIHN0b3BBbmRQcmV2ZW50XG59IiwiaW1wb3J0IHsgY3NzIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvZG9tLmpzJ1xuaW1wb3J0IHsgcG9zaXRpb24gfSBmcm9tICcuLi8uLi8uLi91dGlscy9ldmVudC5qcydcblxuZnVuY3Rpb24gc2hvd1JpcHBsZShldnQsIGVsLCBjdHgsIGZvcmNlQ2VudGVyKSB7XG4gIGlmIChjdHgubW9kaWZpZXJzLnN0b3AgPT09IHRydWUpIHtcbiAgICBldnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgfVxuXG4gIGxldCB7IGNlbnRlciwgY29sb3IgfSA9IGN0eC5tb2RpZmllcnNcblxuICBjZW50ZXIgPSBjZW50ZXIgPT09IHRydWUgfHwgZm9yY2VDZW50ZXIgPT09IHRydWVcblxuICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gIGNvbnN0IGlubmVyTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICBjb25zdCBwb3MgPSBwb3NpdGlvbihldnQpXG4gIGNvbnN0IHsgbGVmdCwgdG9wLCB3aWR0aCwgaGVpZ2h0IH0gPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICBjb25zdCBkaWFtZXRlciA9IE1hdGguc3FydCh3aWR0aCAqIHdpZHRoICsgaGVpZ2h0ICogaGVpZ2h0KVxuICBjb25zdCByYWRpdXMgPSBkaWFtZXRlciAvIDJcbiAgY29uc3QgY2VudGVyWCA9IGAkeyh3aWR0aCAtIGRpYW1ldGVyKSAvIDJ9cHhgXG4gIGNvbnN0IHggPSBjZW50ZXIgPyBjZW50ZXJYIDogYCR7cG9zLmxlZnQgLSBsZWZ0IC0gcmFkaXVzfXB4YFxuICBjb25zdCBjZW50ZXJZID0gYCR7KGhlaWdodCAtIGRpYW1ldGVyKSAvIDJ9cHhgXG4gIGNvbnN0IHkgPSBjZW50ZXIgPyBjZW50ZXJZIDogYCR7cG9zLnRvcCAtIHRvcCAtIHJhZGl1c31weGBcbiAgbGV0IHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgaW5uZXJOb2RlLmNsYXNzTGlzdC5hZGQoJ3N3LXJpcHBsZV9faW5uZXItLWVudGVyJylcbiAgICBpbm5lck5vZGUuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZTNkKCR7Y2VudGVyWH0sICR7Y2VudGVyWX0sIDApIHNjYWxlM2QoMSwgMSwgMSlgXG4gICAgaW5uZXJOb2RlLnN0eWxlLm9wYWNpdHkgPSAwLjJcblxuICAgIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpbm5lck5vZGUuY2xhc3NMaXN0LnJlbW92ZSgnc3ctcmlwcGxlX19pbm5lci0tZW50ZXInKVxuICAgICAgaW5uZXJOb2RlLmNsYXNzTGlzdC5hZGQoJ3N3LXJpcHBsZV9faW5uZXItLWxlYXZlJylcbiAgICAgIGlubmVyTm9kZS5zdHlsZS5vcGFjaXR5ID0gMFxuXG4gICAgICB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBub2RlICYmIG5vZGUucmVtb3ZlKClcbiAgICAgICAgY3R4LmFib3J0ID0gdm9pZCAwXG4gICAgICB9LCAyNzUpXG4gICAgfSwgMjUwKVxuICB9LCA1MClcblxuICBpbm5lck5vZGUuY2xhc3NOYW1lID0gJ3N3LXJpcHBsZV9faW5uZXInXG4gIGNzcyhpbm5lck5vZGUsIHtcbiAgICBoZWlnaHQ6IGAke2RpYW1ldGVyfXB4YCxcbiAgICB3aWR0aDogYCR7ZGlhbWV0ZXJ9cHhgLFxuICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZTNkKCR7eH0sICR7eX0sIDApIHNjYWxlM2QoMC4yLCAwLjIsIDEpYCxcbiAgICBvcGFjaXR5OiAwXG4gIH0pXG4gIGlmIChjb2xvcikgeyBjc3Mobm9kZSwgeyBjb2xvcjogY29sb3IgfSkgfVxuICBub2RlLmNsYXNzTmFtZSA9IGBzdy1yaXBwbGVgXG4gIG5vZGUuYXBwZW5kQ2hpbGQoaW5uZXJOb2RlKVxuICBlbC5hcHBlbmRDaGlsZChub2RlKVxuXG4gIGN0eC5hYm9ydCA9ICgpID0+IHtcbiAgICBub2RlICYmIG5vZGUucmVtb3ZlKClcbiAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlQ3R4KGN0eCwgeyB2YWx1ZSwgbW9kaWZpZXJzLCBhcmcgfSkge1xuICBjdHguZGlzYWJsZWQgPSB2YWx1ZSAmJiB2YWx1ZS5kaXNhYmxlZCB8fCBmYWxzZVxuXG4gIGlmICghY3R4LmRpc2FibGVkKSB7XG4gICAgY3R4Lm1vZGlmaWVycyA9IE9iamVjdCh2YWx1ZSkgPT09IHZhbHVlXG4gICAgICA/IHtcbiAgICAgICAgc3RvcDogdmFsdWUuc3RvcCA9PT0gdHJ1ZSB8fCBtb2RpZmllcnMuc3RvcCA9PT0gdHJ1ZSxcbiAgICAgICAgY2VudGVyOiB2YWx1ZS5jZW50ZXIgPT09IHRydWUgfHwgbW9kaWZpZXJzLmNlbnRlciA9PT0gdHJ1ZSxcbiAgICAgICAgY29sb3I6IHZhbHVlLmNvbG9yIHx8IGFyZ1xuICAgICAgfVxuICAgICAgOiB7XG4gICAgICAgIHN0b3A6IG1vZGlmaWVycy5zdG9wLFxuICAgICAgICBjZW50ZXI6IG1vZGlmaWVycy5jZW50ZXIsXG4gICAgICAgIGNvbG9yOiBhcmdcbiAgICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdyaXBwbGUnLFxuICBpbnNlcnRlZChlbCwgYmluZGluZykge1xuICAgIGNvbnN0IGN0eCA9IHtcbiAgICAgIG1vZGlmaWVyczoge30sXG4gICAgICBjbGljayhldnQpIHtcbiAgICAgICAgaWYgKCFjdHguZGlzYWJsZWQpIHtcbiAgICAgICAgICBzaG93UmlwcGxlKGV2dCwgZWwsIGN0eClcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGtleXVwKGV2dCkge1xuICAgICAgICBpZiAoIWN0eC5kaXNhYmxlZCAmJiBldnQua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgICAgICBzaG93UmlwcGxlKGV2dCwgZWwsIGN0eCwgdHJ1ZSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZUN0eChjdHgsIGJpbmRpbmcpXG4gICAgaWYgKGVsLnJpcHBsZUN0eCkge1xuICAgICAgZWwucmlwcGxlQ3R4T2xkID0gZWwucmlwcGxlQ3R4XG4gICAgfVxuICAgIGVsLnJpcHBsZUN0eCA9IGN0eFxuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY3R4LmNsaWNrLCBmYWxzZSlcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGN0eC5rZXl1cCwgZmFsc2UpXG4gIH0sXG4gIHVwZGF0ZShlbCwgYmluZGluZykge1xuICAgIGVsLnJpcHBsZUN0eCAhPT0gdm9pZCAwICYmIHVwZGF0ZUN0eChlbC5yaXBwbGVDdHgsIGJpbmRpbmcpXG4gIH0sXG4gIHVuYmluZChlbCkge1xuICAgIGNvbnN0IGN0eCA9IGVsLnJpcHBsZUN0eE9sZCB8fCBlbC5yaXBwbGVDdHhcblxuICAgIGlmIChjdHggIT09IHZvaWQgMCkge1xuICAgICAgY3R4LmFib3J0ICE9PSB2b2lkIDAgJiYgY3R4LmFib3J0KClcbiAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY3R4LmNsaWNrLCBmYWxzZSlcbiAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgY3R4LmtleXVwLCBmYWxzZSlcbiAgICAgIGRlbGV0ZSBlbFtlbC5yaXBwbGVDdHhPbGQgPyAncmlwcGxlQ3R4T2xkJyA6ICdyaXBwbGVDdHgnXVxuICAgIH1cbiAgfVxufSIsImltcG9ydCBSaXBwbGUgZnJvbSAnLi9zcmMvbWFpbi5qcydcblxuY29uc3QgaW5zdGFsbCA9IGZ1bmN0aW9uIChWdWUpIHtcbiAgVnVlLmRpcmVjdGl2ZShSaXBwbGUubmFtZSwgUmlwcGxlKVxufVxuXG5SaXBwbGUuaW5zdGFsbCA9IGluc3RhbGxcblxuZXhwb3J0IGRlZmF1bHQgUmlwcGxlIiwiaW1wb3J0ICcuL2Nzcy9pbmRleC5zdHlsJ1xuXG5pbXBvcnQgSWNvbiBmcm9tICcuL2NvbXBvbmVudHMvaWNvbi9pbmRleC5qcydcbmltcG9ydCBJdGVtIGZyb20gJy4vY29tcG9uZW50cy9pdGVtL2luZGV4LmpzJ1xuaW1wb3J0IEZpZWxkIGZyb20gJy4vY29tcG9uZW50cy9maWVsZC9pbmRleC5qcydcbmltcG9ydCBJbnB1dCBmcm9tICcuL2NvbXBvbmVudHMvaW5wdXQvaW5kZXguanMnXG5pbXBvcnQgU2VsZWN0IGZyb20gJy4vY29tcG9uZW50cy9zZWxlY3QvaW5kZXguanMnXG5pbXBvcnQgU2Nyb2xsQXJlYSBmcm9tICcuL2NvbXBvbmVudHMvc2Nyb2xsQXJlYS9pbmRleC5qcydcbmltcG9ydCBNb2RhbCBmcm9tICcuL2NvbXBvbmVudHMvbW9kYWwvaW5kZXguanMnXG5pbXBvcnQgUG9wb3ZlciBmcm9tICcuL2NvbXBvbmVudHMvcG9wb3Zlci9pbmRleC5qcydcbmltcG9ydCBCdXR0b24gZnJvbSAnLi9jb21wb25lbnRzL2J1dHRvbi9pbmRleC5qcydcbmltcG9ydCBDaGVja2JveCBmcm9tICcuL2NvbXBvbmVudHMvY2hlY2tib3gvaW5kZXguanMnXG5pbXBvcnQgQ2hlY2tib3hHcm91cCBmcm9tICcuL2NvbXBvbmVudHMvY2hlY2tib3hHcm91cC9pbmRleC5qcydcbmltcG9ydCBSYWRpbyBmcm9tICcuL2NvbXBvbmVudHMvcmFkaW8vaW5kZXguanMnXG5pbXBvcnQgUmFkaW9Hcm91cCBmcm9tICcuL2NvbXBvbmVudHMvcmFkaW9Hcm91cC9pbmRleC5qcydcbmltcG9ydCBQYWdpbmF0aW9uIGZyb20gJy4vY29tcG9uZW50cy9wYWdpbmF0aW9uL2luZGV4LmpzJ1xuaW1wb3J0IEJhc2ljSXRlbSBmcm9tICcuL2NvbXBvbmVudHMvYmFzaWNJdGVtL2luZGV4LmpzJ1xuaW1wb3J0IE5vdGlmaWNhdGlvbiBmcm9tICcuL2NvbXBvbmVudHMvbm90aWZpY2F0aW9uL2luZGV4LmpzJ1xuaW1wb3J0IExheW91dCBmcm9tICcuL2NvbXBvbmVudHMvbGF5b3V0L2luZGV4LmpzJ1xuaW1wb3J0IFNsaWRlIGZyb20gJy4vY29tcG9uZW50cy9zbGlkZS9pbmRleC5qcydcbmltcG9ydCBNYXNrIGZyb20gJy4vZGlyZWN0aXZlcy9tYXNrL2luZGV4LmpzJ1xuaW1wb3J0IFJpcHBsZSBmcm9tICcuL2RpcmVjdGl2ZXMvcmlwcGxlL2luZGV4LmpzJ1xuXG5jb25zdCBjb21wb25lbnRzID0gW1xuICBJY29uLFxuICBJdGVtLFxuICBGaWVsZCxcbiAgSW5wdXQsXG4gIFNlbGVjdCxcbiAgU2Nyb2xsQXJlYSxcbiAgTW9kYWwsXG4gIFBvcG92ZXIsXG4gIEJ1dHRvbixcbiAgUGFnaW5hdGlvbixcbiAgQ2hlY2tib3gsXG4gIENoZWNrYm94R3JvdXAsXG4gIFJhZGlvLFxuICBSYWRpb0dyb3VwLFxuICBCYXNpY0l0ZW0sXG4gIExheW91dCxcbiAgU2xpZGVcbl1cblxuY29uc3QgZGlyZWN0aXZlcyA9IFtcbiAgUmlwcGxlLFxuICBNYXNrXG5dXG5cbmNvbnN0IGluc3RhbGwgPSBmdW5jdGlvbiAoVnVlKSB7XG4gIGNvbXBvbmVudHMuZm9yRWFjaChjb21wb25lbnQgPT4ge1xuICAgIFZ1ZS5jb21wb25lbnQoY29tcG9uZW50Lm5hbWUsIGNvbXBvbmVudClcbiAgfSlcbiAgZGlyZWN0aXZlcy5mb3JFYWNoKGRpcmVjdGl2ZSA9PiB7XG4gICAgVnVlLmRpcmVjdGl2ZShkaXJlY3RpdmUubmFtZSwgZGlyZWN0aXZlKVxuICB9KVxuICBWdWUucHJvdG90eXBlLiRub3RpZnkgPSBOb3RpZmljYXRpb25cbn1cblxuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5WdWUpIHtcbiAgaW5zdGFsbCh3aW5kb3cuVnVlKVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGluc3RhbGwsXG4gIEljb24sXG4gIEl0ZW0sXG4gIEZpZWxkLFxuICBJbnB1dCxcbiAgU2VsZWN0LFxuICBTY3JvbGxBcmVhLFxuICBQb3BvdmVyLFxuICBNb2RhbCxcbiAgQnV0dG9uLFxuICBQYWdpbmF0aW9uLFxuICBDaGVja2JveCxcbiAgQ2hlY2tib3hHcm91cCxcbiAgUmFkaW8sXG4gIFJhZGlvR3JvdXAsXG4gIEJhc2ljSXRlbSxcbiAgTm90aWZpY2F0aW9uLFxuICBMYXlvdXQsXG4gIFNsaWRlLFxuICBSaXBwbGUsXG4gIE1hc2tcbn1cbiJdLCJuYW1lcyI6WyJuYW1lIiwicHJvcHMiLCJTdHJpbmciLCJjb2xvciIsInByaW1hcnkiLCJCb29sZWFuIiwibmVnYXRpdmUiLCJwb3NpdGl2ZSIsIndhcm5pbmciLCJncmV5IiwibGlnaHRHcmV5Iiwic2l6ZSIsImNvbXB1dGVkIiwiY2xhc3NlcyIsImNscyIsImljb24iLCJjb250ZW50Iiwic3R5bGUiLCJmb250U2l6ZSIsInJlbmRlciIsImgiLCJzdGF0aWNDbGFzcyIsImNsYXNzIiwiYXR0cnMiLCJvbiIsIiRsaXN0ZW5lcnMiLCJpbnN0YWxsIiwiVnVlIiwiY29tcG9uZW50IiwiSWNvbiIsIndyYXAiLCJoaWRlQmVmb3JlIiwiaGlkZURlZmF1bHQiLCJoaWRlQWZ0ZXIiLCJ0byIsIk9iamVjdCIsImNlbnRlciIsImVuZCIsImRpc2FibGVkIiwibWFzayIsInJpcHBsZSIsImFjdGl2ZSIsInJlcXVpcmVkIiwiZGF0YSIsImRpc2FibGUiLCJkaXJlY3RpdmVzIiwidmFsdWUiLCJzdGF5IiwiY29uY2F0IiwiJHNjb3BlZFNsb3RzIiwiYmVmb3JlIiwiaGlkZSIsImRlZmF1bHQiLCJhZnRlciIsIkl0ZW0iLCJlcnJvck1lc3NhZ2UiLCJydWxlcyIsIkFycmF5IiwiaXNEaXJ0eSIsImlubmVyRXJyb3IiLCJpbm5lckVycm9yTWVzc2FnZSIsIndhdGNoIiwiZm9yY2VDaGVjayIsInYiLCJ2YWxpZGF0ZSIsInZhbGlkYXRlVmFsdWUiLCJoYXNFcnJvciIsImNvbXB1dGVkRXJyb3JNZXNzYWdlIiwibW91bnRlZCIsIiRvbiIsInRyaWdnZXJWYWxpZGF0aW9uIiwiYmVmb3JlRGVzdHJveSIsIiRvZmYiLCJtZXRob2RzIiwicmVzZXRWYWxpZGF0aW9uIiwidmFsIiwibGVuZ3RoIiwidXBkYXRlIiwiZXJyIiwibXNnIiwibSIsInNvbWUiLCJydWxlIiwicmVzIiwiZm9yY2UiLCJhZHZhbmNlZEJsdXIiLCJlIiwiZXhjbHVkZWQiLCJnZXRSZWZzIiwicmVmTmFtZXMiLCJnZXREb21zIiwiZWxzIiwiaXNBcnJheSIsInJlZHVjZSIsImFjY3VtdWxhdG9yIiwiZWwiLCJwdXNoIiwiJGVsIiwicmVmIiwiJHJlZnMiLCJleGNsdWRlZEJsdXJSZWZzIiwicmVmcyIsImNvbnRhaW5zIiwidGFyZ2V0IiwiZm9jdXNlZCIsImZvY3VzZWRCZWZvcmUiLCJibHVyVHlwZSIsImJsdXJSZWZzIiwiJGVtaXQiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwibWl4aW5zIiwiVmFsaWRhdGVNaXhpbiIsIkFkdmFuY2VkQmx1ck1peGluIiwiY29tcG9uZW50cyIsInVuZGVybGluZWQiLCJib3JkZXJlZCIsImZpbGxlZCIsIm1pbmkiLCJsYWJlbCIsInNwYWNlQXJvdW5kIiwidHlwZSIsImZvY3VzIiwiYmx1ciIsInVuZGVybGluZSIsImJvcmRlciIsImZpbGwiLCJlcnJvciIsImlubmVyUG9pbnRlciIsInNjb3BlZFNsb3RzIiwiZ2V0SW5uZXIiLCJnZXRBZnRlciIsIkZpZWxkIiwicGxhY2Vob2xkZXIiLCJhdXRvY29tcGxldGUiLCJpbnB1dCIsImRvbVByb3BzIiwiSW5wdXQiLCJ4IiwieSIsIndpZHRoIiwiaGVpZ2h0Iiwic3RyZXRjaCIsIlNjcm9sbEFyZWEiLCJpc0RlZXBFcXVhbCIsImEiLCJiIiwiRGF0ZSIsImdldFRpbWUiLCJrZXlzIiwiZXZlcnkiLCJwcm9wIiwiaXNTdHJpbmdDb250YWluIiwicyIsInJhbmRvbSIsImlubmVyUyIsImlubmVyViIsInJlcGxhY2UiLCJzcGxpdCIsInN1bSIsImZvckVhY2giLCJpbmNsdWRlcyIsImlzT2JqZWN0IiwiU2NvcmxsQXJlYSIsIm11bHRpcGxlIiwib3B0aW9ucyIsImZpbHRlciIsIm9wdGlvbnNIZWlnaHQiLCJzZWxlY3RlZFN0eWxlIiwiZmlsdGVyVmFsdWUiLCJpbm5lclZhbHVlIiwiZ2V0IiwiZ2V0RXhhY3RWYWx1ZXMiLCJzZXQiLCJpbm5lck9wdGlvbnMiLCJjIiwiZ2V0TmFtZSIsIiRuZXh0VGljayIsImNsZWFyRmlsdGVyIiwidHJpZ2dlckJsdXIiLCJnZXRPcHRpb25zIiwibWFwIiwib3B0aW9uIiwic2VsZWN0ZWQiLCJjaGVja1NlbGVjdGVkIiwibmF0aXZlT24iLCJjbGljayIsImZvcm1hdFZhbHVlIiwiZ2V0U2VsZWN0ZWQiLCJnZXRFeGFjdE9wdGlvbnMiLCJyZWZJbkZvciIsInBhZGRpbmciLCJjdXJzb3IiLCJ0cmFuc2Zvcm0iLCJvcGUiLCJkdXBsaWNhdGVkIiwiZ2V0VmFsdWUiLCJoYXNPd25Qcm9wZXJ0eSIsIlNlbGVjdCIsInJvdW5kIiwic2hhZG93IiwiQnV0dG9uIiwic3dCdXR0b24iLCJzaG93IiwidGl0bGUiLCJ6SW5kZXgiLCJvcGFjaXR5IiwiaGFuZGxlQ2FuY2VsIiwiaGFuZGxlQ29uZmlybSIsInNob3dNb2RhbCIsImhpZGVNb2RhbCIsImV2ZW50Iiwic3RvcFByb3BhZ2F0aW9uIiwiaGVhZGVyIiwiZm9vdGVyIiwiTW9kYWwiLCJpc1NlcnZlciIsInByb3RvdHlwZSIsIiRpc1NlcnZlciIsImNzcyIsImVsZW1lbnQiLCJoYW5kbGVyIiwiYXR0YWNoRXZlbnQiLCJvZmYiLCJkZXRhY2hFdmVudCIsInBvcG92ZXJTdHlsZSIsImFycm93U3R5bGUiLCJyZWZlcmVuY2VFbG0iLCJtb2RlbCIsInBsYWNlbWVudCIsInRyaWdnZXIiLCJ2YWxpZGF0b3IiLCJpbmRleE9mIiwic2hvd1ZhbHVlIiwic2hvd1N0eWxlIiwiZ2V0U3R5bGUiLCJwb3BvdmVyRWxtIiwidG9wIiwib2Zmc2V0SGVpZ2h0IiwibGVmdCIsIm9mZnNldFdpZHRoIiwicmlnaHQiLCJoYW5kbGVDbGljayIsImhhbmRsZU1vdXNlRW50ZXIiLCJoYW5kbGVNb3VzZUxlYXZlIiwiZG9TaG93IiwiZG9DbG9zZSIsImhhbmRsZU1hbnVhbCIsInBvcG92ZXIiLCJyZWZlcmVuY2UiLCJlbG0iLCJxdWVyeVNlbGVjdG9yIiwiZGVzdHJveWVkIiwiYXNzaWduIiwiUG9wb3ZlciIsImxlZnRMYWJlbCIsImNvbG9yTGFiZWwiLCJrZWVwQ29sb3IiLCJwYXJlbnQiLCJwYXJlbnREaXNhYmxlZCIsImNoZWNrZWQiLCJib29sZWFuTW9kZSIsImdldENoZWNrZWQiLCJzZWxmIiwiY29sb3JDaGVja2JveCIsImdldExhYmVsIiwiQ2hlY2tib3giLCJzaHV0dGxlIiwiX3RoaXMiLCIkY2hpbGRyZW4iLCJjaGlsZCIsInNodXR0bGVSZWYiLCJTaHV0dGxlTWl4aW4iLCJDaGVja2JveEdyb3VwIiwiY29sb3JSYWRpbyIsIlJhZGlvIiwiUmFkaW9Hcm91cCIsIm1ha2VSZXN1bHQiLCJ0b3RhbCIsImN1ciIsImFyb3VuZCIsInJlc3VsdCIsImJhc2VDb3VudCIsInN1cnBsdXMiLCJzdGFydFBvc2l0aW9uIiwiZW5kUG9zaXRpb24iLCJmcm9tIiwiaSIsIlBhZ2luYXRpb24iLCJvYnNlcnZlciIsIm1lYXN1cmVkV2lkdGgiLCJob3Jpem9udGFsIiwibWVhc3VyZVRhcmdldCIsIm1pblNpemUiLCJtaW4iLCJpbml0U3R5bGUiLCJpbm5lckNvbGxhcHNlZCIsInNsaWRlIiwic2V0U3R5bGUiLCJwYXNzaXZlIiwic2xpZGVUYXJnZXQiLCJvYnNlcnZlIiwic2V0VGltZW91dCIsImNsZWFyVXBwZXJTdHlsZSIsInVwcGVyIiwidXBwZXJTbGlkZVRhcmdldCIsIiRwYXJlbnQiLCIkd2F0Y2giLCJNdXRhdGlvbk9ic2VydmVyIiwiYXR0cmlidXRlcyIsImF0dHJpYnV0ZUZpbHRlciIsImNoaWxkTGlzdCIsInN1YnRyZWUiLCJjaGFyYWN0ZXJEYXRhIiwiZGlzY29ubmVjdCIsIlNsaWRlT2JzZXJ2ZXIiLCJjb2xsYXBzZWQiLCJmaXQiLCJOdW1iZXIiLCJpbW1lZGlhdGUiLCJTbGlkZSIsInN1YkNvbnRlbnQiLCJpbmRlbnRMZXZlbCIsInN1YiIsImNhbGxiYWNrIiwiRnVuY3Rpb24iLCJzdWJGaWx0ZXIiLCJzdWJUYWciLCJpbm5lckFjdGl2ZSIsImNvbGxhcHNlZEJlZm9yZSIsIm1vdXNlb3ZlciIsInN1YkZpbHRlckNoYW5nZSIsInJlc3RvcmUiLCJyZW1lbWJlciIsImlzU3ViQ29udGFpbiIsImNvbnRhaW4iLCJjcmVhdGVkIiwiY29uc29sZSIsImxvZyIsIm92IiwibXV0YXRlIiwiZXhwYW5kIiwibW91c2VvdXQiLCJwb3NpdGlvbiIsInVuc2hpZnQiLCJCYXNpY0l0ZW0iLCJoYXNPd24iLCJvYmoiLCJrZXkiLCJjYWxsIiwiaXNWTm9kZSIsIm5vZGUiLCJ2ZXJ0aWNhbE9mZnNldCIsIm9uQ2xvc2UiLCJzbG90IiwiYmFja2dyb3VuZCIsImNsb3NlQ29sb3IiLCJoYW5kbGVCdG4iLCJ2ZXJ0aWNhbFByb3BlcnR5IiwidGVzdCIsInBvc2l0aW9uU3R5bGUiLCJnZXRWbm9kZSIsIk5vdGlmaWNhdGlvbkNvbnN0cnVjdG9yIiwiZXh0ZW5kIiwiTm90aWZpY2F0aW9uIiwiaW5zdGFuY2UiLCJpbnN0YW5jZXMiLCJzZWVkIiwiTm90aWZpY2F0aW9uRnVuIiwidXNlck9uQ2xvc2UiLCJpZCIsImNsb3NlIiwiJG1vdW50IiwiYm9keSIsImFwcGVuZENoaWxkIiwiaXRlbSIsImluZGV4IiwibGVuIiwic3BsaWNlIiwicmVtb3ZlZEhlaWdodCIsInBhcnNlSW50IiwiY29sbGFwc2VUb3AiLCJjb2xsYXBzZUxlZnQiLCJjb2xsYXBzZVJpZ2h0IiwiY29sbGFwc2VCb3R0b20iLCJmaXRUb3AiLCJmaXRMZWZ0IiwiZml0UmlnaHQiLCJmaXRCb3R0b20iLCJ0b3BNaW4iLCJsZWZ0TWluIiwicmlnaHRNaW4iLCJib3R0b21NaW4iLCJ2ZXJ0aWNhbFN0cmV0Y2giLCJib3R0b20iLCJMYXlvdXQiLCJzaG93TWFzayIsImN0eCIsImNsYXNzTGlzdCIsInJlbW92ZSIsImhpZGVNYXNrIiwiYWRkIiwiZGlzYWJsZU1hc2siLCJzdGF5TWFzayIsImNvbG9yTWFzayIsImdldERpc2FibGVkIiwiZ2V0U3RheSIsImdldENvbG9yIiwiaW5pdE1hc2siLCJiaW5kaW5nIiwiY3JlYXRlRWxlbWVudCIsIm1hc2tDdHgiLCJiaW5kIiwib2xkVmFsdWUiLCJ1bmJpbmQiLCJkaXJlY3RpdmUiLCJNYXNrIiwidG91Y2hlcyIsImNoYW5nZWRUb3VjaGVzIiwiY2xpZW50WSIsImNsaWVudFgiLCJzaG93UmlwcGxlIiwiZXZ0IiwiZm9yY2VDZW50ZXIiLCJtb2RpZmllcnMiLCJzdG9wIiwiaW5uZXJOb2RlIiwicG9zIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiZGlhbWV0ZXIiLCJNYXRoIiwic3FydCIsInJhZGl1cyIsImNlbnRlclgiLCJjZW50ZXJZIiwidGltZXIiLCJhYm9ydCIsImNsYXNzTmFtZSIsImNsZWFyVGltZW91dCIsInVwZGF0ZUN0eCIsImFyZyIsImluc2VydGVkIiwia2V5dXAiLCJrZXlDb2RlIiwicmlwcGxlQ3R4IiwicmlwcGxlQ3R4T2xkIiwiUmlwcGxlIiwiJG5vdGlmeSIsIndpbmRvdyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGFBQWU7RUFDYkEsRUFBQUEsSUFBSSxFQUFFLFFBRE87RUFF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
