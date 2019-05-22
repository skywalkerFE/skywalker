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

  return index;

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2t5d2Fsa2VyLmNvbW1vbi5qcyIsInNvdXJjZXMiOlsiLi4vcGFja2FnZXMvY29tcG9uZW50cy9pY29uL3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9pY29uL2luZGV4LmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9pdGVtL3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9pdGVtL2luZGV4LmpzIiwiLi4vcGFja2FnZXMvbWl4aW5zL3ZhbGlkYXRlLmpzIiwiLi4vcGFja2FnZXMvbWl4aW5zL2FkdmFuY2VkQmx1ci5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvZmllbGQvc3JjL21haW4uanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL2ZpZWxkL2luZGV4LmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9pbnB1dC9zcmMvbWFpbi5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvaW5wdXQvaW5kZXguanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3Njcm9sbEFyZWEvc3JjL21haW4uanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3Njcm9sbEFyZWEvaW5kZXguanMiLCIuLi9wYWNrYWdlcy91dGlscy9pcy5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvc2VsZWN0L3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9zZWxlY3QvaW5kZXguanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL2J1dHRvbi9zcmMvbWFpbi5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvYnV0dG9uL2luZGV4LmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9tb2RhbC9zcmMvbWFpbi5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvbW9kYWwvaW5kZXguanMiLCIuLi9wYWNrYWdlcy91dGlscy9kb20uanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3BvcG92ZXIvc3JjL21haW4uanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3BvcG92ZXIvaW5kZXguanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL2NoZWNrYm94L3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9jaGVja2JveC9pbmRleC5qcyIsIi4uL3BhY2thZ2VzL21peGlucy9zaHV0dGxlLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9jaGVja2JveEdyb3VwL3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9jaGVja2JveEdyb3VwL2luZGV4LmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9yYWRpby9zcmMvbWFpbi5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvcmFkaW8vaW5kZXguanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3JhZGlvR3JvdXAvc3JjL21haW4uanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3JhZGlvR3JvdXAvaW5kZXguanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3BhZ2luYXRpb24vc3JjL3BhZ2luYXRpb24uanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3BhZ2luYXRpb24vc3JjL21haW4udnVlIiwiLi4vbm9kZV9tb2R1bGVzL3Z1ZS1ydW50aW1lLWhlbHBlcnMvZGlzdC9ub3JtYWxpemUtY29tcG9uZW50LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Z1ZS1ydW50aW1lLWhlbHBlcnMvZGlzdC9pbmplY3Qtc3R5bGUvYnJvd3Nlci5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvcGFnaW5hdGlvbi9pbmRleC5qcyIsIi4uL3BhY2thZ2VzL21peGlucy9zbGlkZU9ic2VydmVyLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9zbGlkZS9zcmMvbWFpbi5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvc2xpZGUvaW5kZXguanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL2Jhc2ljSXRlbS9zcmMvbWFpbi5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvYmFzaWNJdGVtL2luZGV4LmpzIiwiLi4vcGFja2FnZXMvdXRpbHMvdmRvbS5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvbm90aWZpY2F0aW9uL3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9ub3RpZmljYXRpb24vc3JjL25vdGlmaWNhdGlvbi5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvbGF5b3V0L3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9sYXlvdXQvaW5kZXguanMiLCIuLi9wYWNrYWdlcy9kaXJlY3RpdmVzL21hc2svc3JjL21haW4uanMiLCIuLi9wYWNrYWdlcy9kaXJlY3RpdmVzL21hc2svaW5kZXguanMiLCIuLi9wYWNrYWdlcy91dGlscy9ldmVudC5qcyIsIi4uL3BhY2thZ2VzL2RpcmVjdGl2ZXMvcmlwcGxlL3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvZGlyZWN0aXZlcy9yaXBwbGUvaW5kZXguanMiLCIuLi9wYWNrYWdlcy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdzd0ljb24nLFxuICBwcm9wczoge1xuICAgIG5hbWU6IFN0cmluZyxcbiAgICBjb2xvcjogU3RyaW5nLFxuICAgIHByaW1hcnk6IEJvb2xlYW4sXG4gICAgbmVnYXRpdmU6IEJvb2xlYW4sXG4gICAgcG9zaXRpdmU6IEJvb2xlYW4sXG4gICAgd2FybmluZzogQm9vbGVhbixcbiAgICBncmV5OiBCb29sZWFuLFxuICAgIGxpZ2h0R3JleTogQm9vbGVhbixcbiAgICBzaXplOiBTdHJpbmdcbiAgfSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBjbGFzc2VzKCkge1xuICAgICAgbGV0IGNsc1xuICAgICAgY29uc3QgaWNvbiA9IHRoaXMubmFtZVxuICBcbiAgICAgIGlmICghaWNvbikge1xuICAgICAgICByZXR1cm5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNscyA9ICdtYXRlcmlhbC1pY29ucydcbiAgICAgIH1cbiAgICAgIHJldHVybiB7XG4gICAgICAgIFtjbHNdOiB0cnVlLFxuICAgICAgICAnY29sb3ItcHJpbWFyeSc6IHRoaXMucHJpbWFyeSxcbiAgICAgICAgJ2NvbG9yLW5lZ2F0aXZlJzogdGhpcy5uZWdhdGl2ZSxcbiAgICAgICAgJ2NvbG9yLXBvc2l0aXZlJzogdGhpcy5wb3NpdGl2ZSxcbiAgICAgICAgJ2NvbG9yLXdhcm5pbmcnOiB0aGlzLndhcm5pbmcsXG4gICAgICAgICdjb2xvci1ncmV5JzogdGhpcy5ncmV5LFxuICAgICAgICAnY29sb3ItbGlnaHQtZ3JleSc6IHRoaXMubGlnaHRHcmV5LFxuICAgICAgfVxuICAgIH0sXG4gICAgY29udGVudCgpIHtcbiAgICAgIHJldHVybiB0aGlzLm5hbWUgfHwgJyAnXG4gICAgfSxcbiAgICBzdHlsZSgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGZvbnRTaXplOiB0aGlzLnNpemUgfHwgdm9pZCAwLFxuICAgICAgICBjb2xvcjogdGhpcy5jb2xvciB8fCB2b2lkIDBcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIHJlbmRlcihoKSB7XG4gICAgcmV0dXJuIGgoJ2knLCB7XG4gICAgICBzdGF0aWNDbGFzczogJ3N3LWljb24nLFxuICAgICAgY2xhc3M6IHRoaXMuY2xhc3NlcyxcbiAgICAgIHN0eWxlOiB0aGlzLnN0eWxlLFxuICAgICAgYXR0cnM6IHsgJ2FyaWEtaGlkZGVuJzogdHJ1ZSB9LFxuICAgICAgb246IHRoaXMuJGxpc3RlbmVyc1xuICAgIH0sIFtcbiAgICAgIHRoaXMuY29udGVudFxuICAgIF0pXG4gIH1cbn1cbiAgIiwiaW1wb3J0IEljb24gZnJvbSAnLi9zcmMvbWFpbi5qcydcblxuY29uc3QgaW5zdGFsbCA9IGZ1bmN0aW9uIChWdWUpIHtcbiAgVnVlLmNvbXBvbmVudChJY29uLm5hbWUsIEljb24pXG59XG5cbkljb24uaW5zdGFsbCA9IGluc3RhbGxcblxuZXhwb3J0IGRlZmF1bHQgSWNvblxuIiwiZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnc3dJdGVtJyxcbiAgcHJvcHM6IHtcbiAgICB3cmFwOiBCb29sZWFuLFxuICAgIGhpZGVCZWZvcmU6IEJvb2xlYW4sXG4gICAgaGlkZURlZmF1bHQ6IEJvb2xlYW4sXG4gICAgaGlkZUFmdGVyOiBCb29sZWFuLFxuICAgIHRvOiBTdHJpbmcgfCBPYmplY3QsXG4gICAgY2VudGVyOiBCb29sZWFuLFxuICAgIGVuZDogQm9vbGVhbixcbiAgICBkaXNhYmxlZDogQm9vbGVhbixcbiAgICBtYXNrOiBPYmplY3QgfCBCb29sZWFuLFxuICAgIHJpcHBsZTogT2JqZWN0IHwgQm9vbGVhblxuICB9LFxuICBkYXRhOiAoKSA9PiAoe30pLFxuICByZW5kZXIoaCkge1xuICAgIHJldHVybiBoKGAke3RoaXMudG8gIT09IHZvaWQgMCA/ICdyb3V0ZXItbGluaycgOiAnZGl2J31gLCB7XG4gICAgICBzdGF0aWNDbGFzczogJ3N3LWl0ZW0gZmxleCBpdGVtcy1jZW50ZXInLFxuICAgICAgY2xhc3M6IHtcbiAgICAgICAgJ25vLXdyYXAnOiAhdGhpcy53cmFwLFxuICAgICAgICBkaXNhYmxlOiB0aGlzLmRpc2FibGVkXG4gICAgICB9LFxuICAgICAgb246IHRoaXMuZGlzYWJsZWQgPyB2b2lkIDAgOiB7XG4gICAgICAgIC4uLnRoaXMuJGxpc3RlbmVyc1xuICAgICAgfSxcbiAgICAgIHByb3BzOiB7XG4gICAgICAgIHRvOiB0aGlzLnRvXG4gICAgICB9LFxuICAgICAgZGlyZWN0aXZlczogKHRoaXMudG8gIT09IHZvaWQgMCB8fCB0aGlzLm1hc2sgIT09IHZvaWQgMCA/IFtcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdtYXNrJyxcbiAgICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMubWFzayAhPT0gdm9pZCAwICYmIHRoaXMubWFzay5kaXNhYmxlZCB8fCB0aGlzLm1hc2sgPT09IHZvaWQgMCAmJiB0aGlzLnRvICE9PSB2b2lkIDAsXG4gICAgICAgICAgICBjb2xvcjogdGhpcy5tYXNrICE9PSB2b2lkIDAgJiYgdGhpcy5tYXNrLmNvbG9yLFxuICAgICAgICAgICAgc3RheTogdGhpcy5tYXNrICE9PSB2b2lkIDAgJiYgdGhpcy5tYXNrLnN0YXlcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICBdIDogW10pLmNvbmNhdCh0aGlzLnJpcHBsZSAhPT0gdm9pZCAwID8gW1xuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ3JpcHBsZScsXG4gICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnJpcHBsZSAhPT0gdm9pZCAwICYmIHRoaXMucmlwcGxlLmRpc2FibGVkLFxuICAgICAgICAgICAgY29sb3I6IHRoaXMucmlwcGxlICE9PSB2b2lkIDAgJiYgdGhpcy5yaXBwbGUuY29sb3IsXG4gICAgICAgICAgICBjZW50ZXI6IHRoaXMucmlwcGxlICE9PSB2b2lkIDAgJiYgdGhpcy5yaXBwbGUuY2VudGVyXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBdIDogW10pXG4gICAgfSwgW1xuICAgICAgaCgnZGl2Jywge1xuICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWl0ZW1fX2NvbnRlbnQgZmxleCBpdGVtcy1jZW50ZXInLFxuICAgICAgICBjbGFzczoge1xuICAgICAgICAgICduby13cmFwJzogIXRoaXMud3JhcFxuICAgICAgICB9XG4gICAgICB9LCBbXG5cbiAgICAgICAgdGhpcy4kc2NvcGVkU2xvdHMuYmVmb3JlICE9PSB2b2lkIDAgPyBoKCdkaXYnLCB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1pdGVtX19iZWZvcmUgZmxleCBpdGVtcy1jZW50ZXInLFxuICAgICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgICBoaWRlOiB0aGlzLmhpZGVCZWZvcmUsXG4gICAgICAgICAgICAnZmxleC1hdXRvJzogdGhpcy5oaWRlRGVmYXVsdCxcbiAgICAgICAgICAgICduby13cmFwJzogIXRoaXMud3JhcFxuICAgICAgICAgIH1cbiAgICAgICAgfSwgW3RoaXMuJHNjb3BlZFNsb3RzLmJlZm9yZSgpXSkgOiB2b2lkIDAsXG4gIFxuICAgICAgICB0aGlzLiRzY29wZWRTbG90cy5kZWZhdWx0ICE9PSB2b2lkIDAgPyBoKCdkaXYnLCB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1pdGVtX19pbm5lciBmbGV4IGl0ZW1zLWNlbnRlciBpdGVtcy1lbmQnLFxuICAgICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgICBoaWRlOiB0aGlzLmhpZGVEZWZhdWx0LFxuICAgICAgICAgICAgJ25vLXdyYXAnOiAhdGhpcy53cmFwLFxuICAgICAgICAgICAgJ2p1c3RpZnktY2VudGVyJzogdGhpcy5jZW50ZXIsXG4gICAgICAgICAgICAnanVzdGlmeS1lbmQnOiB0aGlzLmVuZFxuXG4gICAgICAgICAgfVxuICAgICAgICB9LCBbdGhpcy4kc2NvcGVkU2xvdHMuZGVmYXVsdCgpXSkgOiB2b2lkIDAsXG4gIFxuICAgICAgICB0aGlzLiRzY29wZWRTbG90cy5hZnRlciAhPT0gdm9pZCAwID8gaCgnZGl2Jywge1xuICAgICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctaXRlbV9fYWZ0ZXIgZmxleCBpdGVtcy1jZW50ZXInLFxuICAgICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgICBoaWRlOiB0aGlzLmhpZGVBZnRlcixcbiAgICAgICAgICAgICduby13cmFwJzogIXRoaXMud3JhcFxuICAgICAgICAgIH1cbiAgICAgICAgfSwgW3RoaXMuJHNjb3BlZFNsb3RzLmFmdGVyKCldKSA6IHZvaWQgMFxuICAgICAgXSlcbiAgICBdKVxuICB9XG59XG4gICIsImltcG9ydCBJdGVtIGZyb20gJy4vc3JjL21haW4uanMnXG5cbmNvbnN0IGluc3RhbGwgPSBmdW5jdGlvbiAoVnVlKSB7XG4gIFZ1ZS5jb21wb25lbnQoSXRlbS5uYW1lLCBJdGVtKVxufVxuXG5JdGVtLmluc3RhbGwgPSBpbnN0YWxsXG5cbmV4cG9ydCBkZWZhdWx0IEl0ZW1cbiIsIlxuZXhwb3J0IGRlZmF1bHQge1xuICBwcm9wczoge1xuICAgIGVycm9yTWVzc2FnZTogU3RyaW5nLFxuICAgIHJ1bGVzOiBBcnJheVxuICB9LFxuXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlzRGlydHk6IGZhbHNlLFxuICAgICAgaW5uZXJFcnJvcjogZmFsc2UsXG4gICAgICBpbm5lckVycm9yTWVzc2FnZTogdm9pZCAwXG4gICAgfVxuICB9LFxuXG4gIHdhdGNoOiB7XG4gICAgZm9yY2VDaGVjayh2KSB7XG4gICAgICBpZiAodGhpcy5ydWxlcyA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgdGhpcy5pc0RpcnR5ID0gdHJ1ZVxuICAgICAgdGhpcy52YWxpZGF0ZSh2KVxuICAgIH0sXG4gICAgdmFsdWUodikge1xuICAgICAgaWYgKHRoaXMuZm9yY2VDaGVjayAhPT0gdm9pZCAwIHx8IHRoaXMucnVsZXMgPT09IHZvaWQgMCkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHRoaXMuaXNEaXJ0eSA9IHRydWVcbiAgICAgIHRoaXMudmFsaWRhdGUodilcbiAgICB9XG4gIH0sXG5cbiAgY29tcHV0ZWQ6IHtcbiAgICB2YWxpZGF0ZVZhbHVlKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZm9yY2VDaGVjayA9PT0gdm9pZCAwID8gdGhpcy52YWx1ZSA6IHRoaXMuZm9yY2VDaGVja1xuICAgIH0sXG4gICAgaGFzRXJyb3IoKSB7XG4gICAgICByZXR1cm4gdGhpcy5pbm5lckVycm9yID09PSB0cnVlXG4gICAgfSxcblxuICAgIGNvbXB1dGVkRXJyb3JNZXNzYWdlKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZXJyb3JNZXNzYWdlICE9PSB2b2lkIDBcbiAgICAgICAgPyB0aGlzLmVycm9yTWVzc2FnZVxuICAgICAgICA6IHRoaXMuaW5uZXJFcnJvck1lc3NhZ2VcbiAgICB9XG4gIH0sXG5cbiAgbW91bnRlZCgpIHtcbiAgICB0aGlzLiRvbihgYmx1cmAsIHRoaXMudHJpZ2dlclZhbGlkYXRpb24pXG4gIH0sXG5cbiAgYmVmb3JlRGVzdHJveSgpIHtcbiAgICB0aGlzLiRvZmYoYGJsdXJgLCB0aGlzLnRyaWdnZXJWYWxpZGF0aW9uKVxuICB9LFxuXG4gIG1ldGhvZHM6IHtcbiAgICByZXNldFZhbGlkYXRpb24oKSB7XG4gICAgICB0aGlzLmlzRGlydHkgPSBmYWxzZVxuICAgICAgdGhpcy5pbm5lckVycm9yID0gZmFsc2VcbiAgICAgIHRoaXMuaW5uZXJFcnJvck1lc3NhZ2UgPSB2b2lkIDBcbiAgICB9LFxuXG4gICAgdmFsaWRhdGUodmFsID0gdGhpcy52YWxpZGF0ZVZhbHVlKSB7XG4gICAgICBpZiAoIXRoaXMucnVsZXMgfHwgdGhpcy5ydWxlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHVwZGF0ZSA9IChlcnIsIG1zZykgPT4ge1xuICAgICAgICBpZiAodGhpcy5pbm5lckVycm9yICE9PSBlcnIpIHtcbiAgICAgICAgICB0aGlzLmlubmVyRXJyb3IgPSBlcnJcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG0gPSBtc2cgfHwgdm9pZCAwXG5cbiAgICAgICAgaWYgKHRoaXMuaW5uZXJFcnJvck1lc3NhZ2UgIT09IG0pIHtcbiAgICAgICAgICB0aGlzLmlubmVyRXJyb3JNZXNzYWdlID0gbVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlcnJcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICF0aGlzLnJ1bGVzLnNvbWUocnVsZSA9PiB7XG4gICAgICAgIGxldCByZXNcblxuICAgICAgICBpZiAodHlwZW9mIHJ1bGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICByZXMgPSBydWxlKHZhbClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVzID09PSBmYWxzZSB8fCB0eXBlb2YgcmVzID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIHJldHVybiB1cGRhdGUodHJ1ZSwgcmVzKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB1cGRhdGUoZmFsc2UpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcblxuICAgIHRyaWdnZXJWYWxpZGF0aW9uKGZvcmNlID0gdHJ1ZSkge1xuICAgICAgaWYgKGZvcmNlID09PSB0cnVlIHx8IHRoaXMuaXNEaXJ0eSA9PT0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5pc0RpcnR5ID0gdHJ1ZVxuICAgICAgICByZXR1cm4gdGhpcy52YWxpZGF0ZSh0aGlzLnZhbGlkYXRlVmFsdWUpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJcbmV4cG9ydCBkZWZhdWx0IHtcbiAgcHJvcHM6IHt9LFxuICBkYXRhOiAoKSA9PiAoe30pLFxuICB3YXRjaDoge30sXG4gIGNvbXB1dGVkOiB7fSxcbiAgbWV0aG9kczoge1xuICAgIGFkdmFuY2VkQmx1cihlKSB7XG4gICAgICBpZiAodGhpcy5kaXNhYmxlZCkgeyByZXR1cm4gfVxuICAgICAgbGV0IGV4Y2x1ZGVkID0gZmFsc2VcbiAgICAgIGxldCBnZXRSZWZzID0gcmVmTmFtZXMgPT4ge1xuICAgICAgICBsZXQgZ2V0RG9tcyA9IGVscyA9PiB7XG4gICAgICAgICAgZWxzID0gQXJyYXkuaXNBcnJheShlbHMpID8gZWxzIDogW2Vsc11cbiAgICAgICAgICByZXR1cm4gZWxzLnJlZHVjZSgoYWNjdW11bGF0b3IsIGVsKSA9PiB7XG4gICAgICAgICAgICBhY2N1bXVsYXRvci5wdXNoKGVsICYmIChlbC4kZWwgfHwgZWwpKVxuICAgICAgICAgICAgcmV0dXJuIGFjY3VtdWxhdG9yXG4gICAgICAgICAgfSwgW10pXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVmTmFtZXMucmVkdWNlKChhY2N1bXVsYXRvciwgcmVmKSA9PiBhY2N1bXVsYXRvci5jb25jYXQoZ2V0RG9tcyh0aGlzLiRyZWZzW3JlZl0pKSwgW10pXG4gICAgICB9XG4gICAgICBcbiAgICAgIGlmICh0aGlzLmV4Y2x1ZGVkQmx1clJlZnMpIHtcbiAgICAgICAgbGV0IHJlZnMgPSBnZXRSZWZzKHRoaXMuZXhjbHVkZWRCbHVyUmVmcylcblxuICAgICAgICByZWZzLnNvbWUocmVmID0+IHtcbiAgICAgICAgICBpZiAocmVmID09PSB2b2lkIDApIHsgcmV0dXJuIGZhbHNlIH1cbiAgICAgICAgICBleGNsdWRlZCA9IHJlZi5jb250YWlucyhlLnRhcmdldCkgfHwgZmFsc2VcbiAgICAgICAgICByZXR1cm4gZXhjbHVkZWRcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICAgIGlmIChleGNsdWRlZCkge1xuICAgICAgICB0aGlzLmZvY3VzZWQgPSB0cnVlXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgbGV0IGZvY3VzZWRCZWZvcmUgPSB0aGlzLmZvY3VzZWRcblxuICAgICAgaWYgKHRoaXMuYmx1clR5cGUgPT09ICdyZXZlcnNlJyAmJiBmb2N1c2VkQmVmb3JlKSB7XG4gICAgICAgIHRoaXMuZm9jdXNlZCA9ICFmb2N1c2VkQmVmb3JlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgcmVmcyA9IGdldFJlZnModGhpcy5ibHVyUmVmcylcblxuICAgICAgICByZWZzLnNvbWUocmVmID0+IHtcbiAgICAgICAgICBpZiAocmVmID09PSB2b2lkIDApIHsgcmV0dXJuIGZhbHNlIH1cbiAgICAgICAgICB0aGlzLmZvY3VzZWQgPSByZWYuY29udGFpbnMoZS50YXJnZXQpIHx8IGZhbHNlXG4gICAgICAgICAgcmV0dXJuIHRoaXMuZm9jdXNlZFxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLmZvY3VzZWQgJiYgZm9jdXNlZEJlZm9yZSkgeyB0aGlzLiRlbWl0KGBibHVyYCwgZSkgfVxuICAgIH1cbiAgfSxcbiAgbW91bnRlZCgpIHtcbiAgICBpZiAodGhpcy5ibHVyUmVmcykgeyBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5hZHZhbmNlZEJsdXIsIGZhbHNlKSB9XG4gIH0sXG4gIGJlZm9yZURlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuYmx1clJlZnMpIHsgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuYWR2YW5jZWRCbHVyLCBmYWxzZSkgfVxuICB9LFxufVxuICAiLCJpbXBvcnQgVmFsaWRhdGVNaXhpbiBmcm9tICcuLi8uLi8uLi9taXhpbnMvdmFsaWRhdGUnXG5pbXBvcnQgQWR2YW5jZWRCbHVyTWl4aW4gZnJvbSAnLi4vLi4vLi4vbWl4aW5zL2FkdmFuY2VkQmx1cidcbmltcG9ydCBJdGVtIGZyb20gJy4uLy4uL2l0ZW0nXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3N3RmllbGQnLFxuICBtaXhpbnM6IFtWYWxpZGF0ZU1peGluLCBBZHZhbmNlZEJsdXJNaXhpbl0sIC8vIGhhc0Vycm9yLGNvbXB1dGVkRXJyb3JNZXNzYWdlXG4gIGNvbXBvbmVudHM6IHsgSXRlbSB9LFxuICBwcm9wczoge1xuICAgIHJlcXVpcmVkOiBCb29sZWFuLFxuICAgIHVuZGVybGluZWQ6IEJvb2xlYW4sXG4gICAgYm9yZGVyZWQ6IEJvb2xlYW4sXG4gICAgZmlsbGVkOiBCb29sZWFuLFxuICAgIGRpc2FibGVkOiBCb29sZWFuLFxuICAgIG1pbmk6IEJvb2xlYW4sXG4gICAgbGFiZWw6IFN0cmluZyxcbiAgICBmb3JjZUNoZWNrOiBTdHJpbmcgfCBPYmplY3QsXG4gICAgc3BhY2VBcm91bmQ6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiB0cnVlXG4gICAgfVxuICB9LFxuICBkYXRhOiAoKSA9PiAoe1xuICAgIGZvY3VzZWQ6IGZhbHNlXG4gIH0pLFxuICBjb21wdXRlZDoge1xuICAgIGJsdXJSZWZzKCkge1xuICAgICAgcmV0dXJuIFsnZmllbGRDb250ZW50J11cbiAgICB9XG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgZm9jdXNlZCgpIHtcbiAgICAgIGlmICh0aGlzLmZvY3VzZWQgJiYgdGhpcy5mb2N1cykgeyB0aGlzLmZvY3VzKCkgfVxuICAgICAgaWYgKCF0aGlzLmZvY3VzZWQgJiYgdGhpcy5ibHVyKSB7IHRoaXMuYmx1cigpIH1cbiAgICB9XG4gIH0sXG4gIHJlbmRlcihoKSB7XG4gICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiAnc3ctZmllbGQgZmxleCBuby13cmFwIGl0ZW1zLWNlbnRlcicsXG4gICAgICBjbGFzczoge1xuICAgICAgICBkaXNhYmxlOiB0aGlzLmRpc2FibGVkLFxuICAgICAgICAnc3BhY2UtYXJvdW5kJzogdGhpcy5zcGFjZUFyb3VuZFxuICAgICAgfVxuICAgIH0sIFtcbiAgICAgIHRoaXMubGFiZWwgIT09IHZvaWQgMCA/IGgoJ2RpdicsIHtcbiAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1maWVsZF9fbGFiZWwgZmxleCBuby13cmFwIGl0ZW1zLWNlbnRlcidcbiAgICAgIH0sIFtoKCdkaXYnLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctbGFiZWwgZmxleCBuby13cmFwIGl0ZW1zLWNlbnRlcicsXG4gICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgcmVxdWlyZWQ6IHRoaXMucmVxdWlyZWRcbiAgICAgICAgfVxuICAgICAgfSwgdGhpcy5sYWJlbClcbiAgICAgIF0pIDogdm9pZCAwLFxuXG4gICAgICBoKCdkaXYnLCB7XG4gICAgICAgIHJlZjogJ2ZpZWxkQ29udGVudCcsXG4gICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctZmllbGRfX2NvbnRlbnQgZmxleCBuby13cmFwIGl0ZW1zLWNlbnRlciBzdy1mb3JtJyxcbiAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICB1bmRlcmxpbmU6IHRoaXMudW5kZXJsaW5lZCxcbiAgICAgICAgICBib3JkZXI6IHRoaXMuYm9yZGVyZWQsXG4gICAgICAgICAgZmlsbDogdGhpcy5maWxsZWQsXG4gICAgICAgICAgZm9jdXM6ICF0aGlzLmhhc0Vycm9yICYmIHRoaXMuZm9jdXNlZCxcbiAgICAgICAgICBlcnJvcjogdGhpcy5oYXNFcnJvcixcbiAgICAgICAgICAncGFkZGluZy1taW4nOiAhdGhpcy5taW5pLFxuICAgICAgICAgICdpbm5lci1wb2ludGVyJzogdGhpcy5pbm5lclBvaW50ZXJcbiAgICAgICAgfVxuICAgICAgfSwgW1xuICAgICAgICB0aGlzLmRpc2FibGVkID8gaCgnZGl2Jywge1xuICAgICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctZmllbGRfX2Rpc2FibGVkJ1xuICAgICAgICB9KSA6IHZvaWQgMCxcblxuICAgICAgICBoKCdzdy1pdGVtJywge1xuICAgICAgICAgIHN0YXRpY0NsYXNzOiAnZmxleC1hdXRvJyxcbiAgICAgICAgICBzY29wZWRTbG90czoge1xuICAgICAgICAgICAgYmVmb3JlOiB0aGlzLiRzY29wZWRTbG90cy5iZWZvcmUgIT09IHZvaWQgMFxuICAgICAgICAgICAgICA/ICgpID0+IFtoKCdkaXYnLCB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6ICdmbGV4IG5vLXdyYXAgaXRlbXMtY2VudGVyIG1hcmdpbi1taW4nXG4gICAgICAgICAgICAgIH0sIFt0aGlzLiRzY29wZWRTbG90cy5iZWZvcmUoKV0pXSA6IHZvaWQgMCxcblxuICAgICAgICAgICAgZGVmYXVsdDogdGhpcy4kc2NvcGVkU2xvdHMuZGVmYXVsdCAhPT0gdm9pZCAwIHx8IHRoaXMuZ2V0SW5uZXIgIT09IHZvaWQgMFxuICAgICAgICAgICAgICA/ICgpID0+IFt0aGlzLmdldElubmVyICE9PSB2b2lkIDAgPyB0aGlzLmdldElubmVyKGgpIDogdm9pZCAwLCB0aGlzLiRzY29wZWRTbG90cy5kZWZhdWx0ICE9PSB2b2lkIDAgJiYgdGhpcy5nZXRJbm5lciA9PT0gdm9pZCAwID8gdGhpcy4kc2NvcGVkU2xvdHMuZGVmYXVsdCgpIDogdm9pZCAwXSA6IHZvaWQgMCxcblxuICAgICAgICAgICAgYWZ0ZXI6IHRoaXMuJHNjb3BlZFNsb3RzLmFmdGVyICE9PSB2b2lkIDAgfHwgdGhpcy5nZXRBZnRlciAhPT0gdm9pZCAwXG4gICAgICAgICAgICAgID8gKCkgPT4gW2goJ2RpdicsIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogJ2ZsZXggbm8td3JhcCBpdGVtcy1jZW50ZXIgbWFyZ2luLW1pbidcbiAgICAgICAgICAgICAgfSwgW3RoaXMuZ2V0QWZ0ZXIgIT09IHZvaWQgMCA/IHRoaXMuZ2V0QWZ0ZXIoaCkgOiB2b2lkIDAsIHRoaXMuJHNjb3BlZFNsb3RzLmFmdGVyICE9PSB2b2lkIDAgJiYgdGhpcy5nZXRBZnRlciA9PT0gdm9pZCAwID8gdGhpcy4kc2NvcGVkU2xvdHMuYWZ0ZXIoKSA6IHZvaWQgMF0pXSA6IHZvaWQgMFxuICAgICAgICAgIH1cbiAgICAgICAgfSksXG5cbiAgICAgICAgdGhpcy5oYXNFcnJvciA/IGgoJ2RpdicsIHtcbiAgICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWZpZWxkX19lcnJvciBmbGV4IG5vLXdyYXAgaXRlbXMtY2VudGVyJ1xuICAgICAgICB9LCB0aGlzLmNvbXB1dGVkRXJyb3JNZXNzYWdlKSA6IHZvaWQgMFxuICAgICAgXSlcbiAgICBdKVxuICB9XG59XG4gICIsImltcG9ydCBGaWVsZCBmcm9tICcuL3NyYy9tYWluLmpzJ1xuXG5jb25zdCBpbnN0YWxsID0gZnVuY3Rpb24gKFZ1ZSkge1xuICBWdWUuY29tcG9uZW50KEZpZWxkLm5hbWUsIEZpZWxkKVxufVxuXG5GaWVsZC5pbnN0YWxsID0gaW5zdGFsbFxuXG5leHBvcnQgZGVmYXVsdCBGaWVsZFxuIiwiaW1wb3J0IEZpZWxkIGZyb20gJy4uLy4uL2ZpZWxkJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdzd0lucHV0JyxcbiAgbWl4aW5zOiBbRmllbGRdLCAvLyBmb2N1c2VkLGRpc2FibGVkXG4gIHByb3BzOiB7XG4gICAgdmFsdWU6IFN0cmluZyxcbiAgICBwbGFjZWhvbGRlcjogU3RyaW5nLFxuICAgIGF1dG9jb21wbGV0ZTogQm9vbGVhblxuICB9LFxuICBkYXRhOiAoKSA9PiAoe30pLFxuICBjb21wdXRlZDoge30sXG4gIG1ldGhvZHM6IHtcbiAgICBmb2N1cygpIHtcbiAgICAgIHRoaXMuJHJlZnMuaW5wdXQuZm9jdXMoKVxuICAgIH0sXG4gICAgYmx1cigpIHtcbiAgICAgIHRoaXMuJHJlZnMuaW5wdXQuYmx1cigpXG4gICAgfSxcbiAgICBnZXRJbm5lcihoKSB7XG4gICAgICByZXR1cm4gW2goJ2lucHV0Jywge1xuICAgICAgICByZWY6ICdpbnB1dCcsXG4gICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctaW5wdXQgbWFyZ2luLW1pbicsXG4gICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgYXV0b2NvbXBsZXRlOiB0aGlzLmF1dG9jb21wbGV0ZSA/ICdvbicgOiAnb2ZmJ1xuICAgICAgICB9LFxuICAgICAgICBkb21Qcm9wczoge1xuICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlLFxuICAgICAgICAgIHBsYWNlaG9sZGVyOiB0aGlzLnBsYWNlaG9sZGVyIHx8ICcnLFxuICAgICAgICAgIGRpc2FibGVkOiB0aGlzLmRpc2FibGVkXG4gICAgICAgIH0sXG4gICAgICAgIG9uOiB7XG4gICAgICAgICAgLi4udGhpcy4kbGlzdGVuZXJzLFxuICAgICAgICAgIGlucHV0OiBlID0+IHtcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2lucHV0JywgZS50YXJnZXQudmFsdWUpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KV1cbiAgICB9XG4gIH1cbn1cbiAgIiwiaW1wb3J0IElucHV0IGZyb20gJy4vc3JjL21haW4uanMnXG5cbmNvbnN0IGluc3RhbGwgPSBmdW5jdGlvbiAoVnVlKSB7XG4gIFZ1ZS5jb21wb25lbnQoSW5wdXQubmFtZSwgSW5wdXQpXG59XG5cbklucHV0Lmluc3RhbGwgPSBpbnN0YWxsXG5cbmV4cG9ydCBkZWZhdWx0IElucHV0XG4iLCJleHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdzd1Njcm9sbEFyZWEnLFxuICBwcm9wczoge1xuICAgIHg6IEJvb2xlYW4sXG4gICAgeTogQm9vbGVhbixcbiAgICB3aWR0aDogU3RyaW5nLFxuICAgIGhlaWdodDogU3RyaW5nLFxuICAgIHN0cmV0Y2g6IEJvb2xlYW5cbiAgfSxcbiAgZGF0YTogKCkgPT4gKHt9KSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBzdHlsZSgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgICdvdmVyZmxvdy14JzogdGhpcy54ID8gJ2F1dG8nIDogJ2hpZGRlbicsXG4gICAgICAgICdvdmVyZmxvdy15JzogdGhpcy55ID8gJ2F1dG8nIDogJ2hpZGRlbicsXG4gICAgICAgICdtYXgtd2lkdGgnOiB0aGlzLndpZHRoIHx8ICcxMDAlJyxcbiAgICAgICAgd2lkdGg6IHRoaXMud2lkdGggfHwgJzEwMCUnLFxuICAgICAgICAnbWF4LWhlaWdodCc6IHRoaXMuaGVpZ2h0IHx8ICcxMDAlJyxcbiAgICAgICAgaGVpZ2h0OiB0aGlzLnN0cmV0Y2ggJiYgKHRoaXMuaGVpZ2h0IHx8ICcxMDAlJylcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHt9LFxuICByZW5kZXIoaCkge1xuICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICBzdGF0aWNDbGFzczogJ3N3LXNjcm9sbC1hcmVhJyxcbiAgICAgIHN0eWxlOiB0aGlzLnN0eWxlLFxuICAgICAgb246IHRoaXMuJGxpc3RlbmVyc1xuICAgIH0sIHRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQgIT09IHZvaWQgMCA/IFt0aGlzLiRzY29wZWRTbG90cy5kZWZhdWx0KCldIDogdm9pZCAwKVxuICB9XG59XG4gICIsImltcG9ydCBTY3JvbGxBcmVhIGZyb20gJy4vc3JjL21haW4uanMnXG5cbmNvbnN0IGluc3RhbGwgPSBmdW5jdGlvbiAoVnVlKSB7XG4gIFZ1ZS5jb21wb25lbnQoU2Nyb2xsQXJlYS5uYW1lLCBTY3JvbGxBcmVhKVxufVxuXG5TY3JvbGxBcmVhLmluc3RhbGwgPSBpbnN0YWxsXG5cbmV4cG9ydCBkZWZhdWx0IFNjcm9sbEFyZWFcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXNlbGYtY29tcGFyZSAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRGVlcEVxdWFsKGEsIGIpIHtcbiAgaWYgKGEgPT09IGIpIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgaWYgKGEgaW5zdGFuY2VvZiBEYXRlICYmIGIgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgcmV0dXJuIGEuZ2V0VGltZSgpID09PSBiLmdldFRpbWUoKVxuICB9XG5cbiAgaWYgKGEgIT09IGEgJiYgYiAhPT0gYikge1xuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBpZiAoYSAhPT0gT2JqZWN0KGEpIHx8IGIgIT09IE9iamVjdChiKSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgY29uc3QgcHJvcHMgPSBPYmplY3Qua2V5cyhhKVxuXG4gIGlmIChwcm9wcy5sZW5ndGggIT09IE9iamVjdC5rZXlzKGIpLmxlbmd0aCkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgcmV0dXJuIHByb3BzLmV2ZXJ5KHByb3AgPT4gaXNEZWVwRXF1YWwoYVtwcm9wXSwgYltwcm9wXSkpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZ0NvbnRhaW4ocywgdikge1xuICBsZXQgaW5uZXJTID0gU3RyaW5nKHMpXG4gIGxldCBpbm5lclYgPSB2LnJlcGxhY2UoL1xccysvZywgJycpLnNwbGl0KCcnKVxuICBsZXQgc3VtID0gMFxuXG4gIGlubmVyVi5mb3JFYWNoKHggPT4ge1xuICAgIGlmIChpbm5lclMuaW5jbHVkZXMoeCkpIHtcbiAgICAgIGlubmVyUyA9IGlubmVyUy5yZXBsYWNlKHgsICcnKVxuICAgICAgc3VtKytcbiAgICB9XG4gIH0pXG4gIHJldHVybiBzdW0gPj0gaW5uZXJWLmxlbmd0aFxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNPYmplY3Qodikge1xuICByZXR1cm4gT2JqZWN0KHYpID09PSB2XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0RhdGUodikge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHYpID09PSAnW29iamVjdCBEYXRlXSdcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUmVnZXhwKHYpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2KSA9PT0gJ1tvYmplY3QgUmVnRXhwXSdcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtYmVyKHYpIHtcbiAgcmV0dXJuIHR5cGVvZiB2ID09PSAnbnVtYmVyJyAmJiBpc0Zpbml0ZSh2KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmcodikge1xuICByZXR1cm4gdHlwZW9mIHYgPT09ICdzdHJpbmcnXG59XG4iLCJpbXBvcnQgRmllbGQgZnJvbSAnLi4vLi4vZmllbGQnXG5pbXBvcnQgU2NvcmxsQXJlYSBmcm9tICcuLi8uLi9zY3JvbGxBcmVhJ1xuaW1wb3J0IHsgaXNEZWVwRXF1YWwsIGlzU3RyaW5nQ29udGFpbiwgaXNPYmplY3QgfSBmcm9tICcuLi8uLi8uLi91dGlscy9pcydcblxuLy8gaW1wb3J0IHsgZGVkdXBsaWNhdGUgfSBmcm9tICcuLi8uLi8uLi91dGlscy9kZWR1cGxpY2F0ZSdcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnc3dTZWxlY3QnLFxuICBtaXhpbnM6IFtGaWVsZF0sIC8vIGZvY3VzZWQsZGlzYWJsZWRcbiAgY29tcG9uZW50czoge1xuICAgIFNjb3JsbEFyZWFcbiAgfSxcbiAgcHJvcHM6IHtcbiAgICBtdWx0aXBsZTogQm9vbGVhbixcbiAgICB2YWx1ZToge1xuICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICB9LFxuICAgIG9wdGlvbnM6IEFycmF5LFxuICAgIGZpbHRlcjogQm9vbGVhbixcbiAgICBwbGFjZWhvbGRlcjogU3RyaW5nLFxuICAgIG9wdGlvbnNIZWlnaHQ6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICcyMDBweCdcbiAgICB9LFxuICAgIHNlbGVjdGVkU3R5bGU6IFN0cmluZ1xuICB9LFxuICBkYXRhOiAoKSA9PiAoe1xuICAgIGJsdXJUeXBlOiAncmV2ZXJzZScsXG4gICAgZmlsdGVyVmFsdWU6ICcnXG4gIH0pLFxuICBjb21wdXRlZDoge1xuICAgIGV4Y2x1ZGVkQmx1clJlZnMoKSB7XG4gICAgICByZXR1cm4gdGhpcy5maWx0ZXIgPyBbJ2lucHV0JywgJ3NlbGVjdGVkJywgJ3NlbGVjdE9wdGlvbnMnXSA6IFsnc2VsZWN0ZWQnLCAnc2VsZWN0T3B0aW9ucyddXG4gICAgfSxcbiAgICBpbm5lclZhbHVlOiB7XG4gICAgICBnZXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEV4YWN0VmFsdWVzKHRoaXMudmFsdWUpXG4gICAgICB9LFxuICAgICAgc2V0KHZhbCkge1xuICAgICAgICB0aGlzLiRlbWl0KFxuICAgICAgICAgICdpbnB1dCcsXG4gICAgICAgICAgdmFsXG4gICAgICAgIClcbiAgICAgIH1cbiAgICB9LFxuICAgIGlubmVyT3B0aW9ucygpIHtcbiAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMucmVkdWNlKChhLCBjKSA9PiB7XG4gICAgICAgIGlmIChpc1N0cmluZ0NvbnRhaW4odGhpcy5nZXROYW1lKGMpLCB0aGlzLmZpbHRlclZhbHVlKSkge1xuICAgICAgICAgIGEucHVzaChjKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhXG4gICAgICB9LCBbXSkgfHwgW11cbiAgICB9XG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgb3B0aW9ucygpIHtcbiAgICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHRoaXMuZ2V0RXhhY3RWYWx1ZXModGhpcy52YWx1ZSlcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBmb2N1cygpIHtcbiAgICAgIHRoaXMuJG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgdGhpcy4kcmVmcy5pbnB1dC5mb2N1cygpXG4gICAgICB9KVxuICAgIH0sXG4gICAgYmx1cigpIHtcbiAgICAgIHRoaXMuJHJlZnMuaW5wdXQuYmx1cigpXG4gICAgfSxcbiAgICBjbGVhckZpbHRlcigpIHtcbiAgICAgIHRoaXMuZmlsdGVyVmFsdWUgPSAnJ1xuICAgIH0sXG4gICAgdHJpZ2dlckJsdXIoZSkge1xuICAgICAgdGhpcy5mb2N1c2VkID0gZmFsc2VcbiAgICAgIHRoaXMuJGVtaXQoYGJsdXJgLCBlKVxuICAgIH0sXG4gICAgZ2V0SW5uZXIoaCkge1xuICAgICAgbGV0IGdldE9wdGlvbnMgPSBoID0+IHtcbiAgICAgICAgaWYgKHRoaXMuaW5uZXJPcHRpb25zLmxlbmd0aCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLmlubmVyT3B0aW9ucy5tYXAob3B0aW9uID0+IGgoJ3N3LWl0ZW0nLCB7XG4gICAgICAgICAgICBjbGFzczoge1xuICAgICAgICAgICAgICBzZWxlY3RlZDogdGhpcy5jaGVja1NlbGVjdGVkKG9wdGlvbilcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBuYXRpdmVPbjoge1xuICAgICAgICAgICAgICBjbGljazogZSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbm5lclZhbHVlID0gdGhpcy5mb3JtYXRWYWx1ZShvcHRpb24pXG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhckZpbHRlcigpXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXJCbHVyKGUpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuZm9jdXMoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNjb3BlZFNsb3RzOiB7XG4gICAgICAgICAgICAgIGRlZmF1bHQ6ICgpID0+IFtoKCdkaXYnLCB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1zZWxlY3RfX29wdGlvbidcbiAgICAgICAgICAgICAgfSwgU3RyaW5nKHRoaXMuZ2V0TmFtZShvcHRpb24pKSldXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIFtoKCdzdy1pdGVtJywge1xuICAgICAgICAgICAgc2NvcGVkU2xvdHM6IHtcbiAgICAgICAgICAgICAgZGVmYXVsdDogKCkgPT4gW2goJ2RpdicsIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogJ3N3LXNlbGVjdF9fb3B0aW9uIG5vLW9wdGlvbnMnXG4gICAgICAgICAgICAgIH0sICdubyBvcHRpb25zJyldXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSldXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGV0IGdldFNlbGVjdGVkID0gaCA9PiB0aGlzLmdldEV4YWN0T3B0aW9ucyh0aGlzLmlubmVyVmFsdWUpLm1hcCh4ID0+IGgoJ3N3LWl0ZW0nLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiAnbWFyZ2luLW1pbiBzdy1mb3JtIHNlbGVjdGVkLW9wdGlvbicsXG4gICAgICAgIGNsYXNzOiB0aGlzLnNlbGVjdGVkU3R5bGUgPT09IHZvaWQgMFxuICAgICAgICAgID8ge1xuICAgICAgICAgICAgdW5kZXJsaW5lOiB0aGlzLnVuZGVybGluZWQsXG4gICAgICAgICAgICBib3JkZXI6IHRoaXMuYm9yZGVyZWQsXG4gICAgICAgICAgICBmaWxsOiB0aGlzLmZpbGxlZFxuICAgICAgICAgIH0gOiB7XG4gICAgICAgICAgICBbdGhpcy5zZWxlY3RlZFN0eWxlXTogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgIHJlZjogJ3NlbGVjdGVkJyxcbiAgICAgICAgcmVmSW5Gb3I6IHRydWUsXG4gICAgICAgIHNjb3BlZFNsb3RzOiB7XG4gICAgICAgICAgZGVmYXVsdDogKCkgPT4gW2goJ2RpdicsIHtcbiAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgIHBhZGRpbmc6IHRoaXMubWluaSA/ICczcHggMCAzcHggOXB4JyA6ICczcHggOXB4JyxcbiAgICAgICAgICAgICAgJ3doaXRlLXNwYWNlJzogdGhpcy5taW5pID8gJ25vd3JhcCcgOiB2b2lkIDBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCBTdHJpbmcodGhpcy5nZXROYW1lKHgpKSldLFxuICAgICAgICAgIGFmdGVyOiAhdGhpcy5taW5pID8gKCkgPT4gW2goJ3N3LWljb24nLCB7XG4gICAgICAgICAgICBjbGFzczoge1xuICAgICAgICAgICAgICAnaG92ZXItY29sb3ItcHJpbWFyeSc6IHRydWUsXG4gICAgICAgICAgICAgICdjb2xvci1ncmV5JzogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICdib3JkZXItcmFkaXVzJzogJzUwJScsXG4gICAgICAgICAgICAgIHBhZGRpbmc6ICcwIDNweCAwIDAnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgICAgbmFtZTogdGhpcy5maWxsZWQgJiYgdGhpcy5zZWxlY3RlZFN0eWxlID09PSB2b2lkIDAgfHwgdGhpcy5zZWxlY3RlZFN0eWxlID09PSAnZmlsbCcgPyAnY2FuY2VsJyA6ICdjbGVhcicsXG4gICAgICAgICAgICAgIHNpemU6ICcxNHB4J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5hdGl2ZU9uOiB7XG4gICAgICAgICAgICAgIGNsaWNrOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbm5lclZhbHVlID0gdGhpcy5mb3JtYXRWYWx1ZSh4LCAncmVtb3ZlJylcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXSA6IHZvaWQgMFxuICAgICAgICB9XG4gICAgICB9KSlcblxuICAgICAgcmV0dXJuIFtoKCdzdy1pdGVtJywge1xuICAgICAgICBzdGF0aWNDbGFzczogJ2ZsZXgtYXV0bycsXG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgd3JhcDogdHJ1ZSxcbiAgICAgICAgICBoaWRlRGVmYXVsdDogdGhpcy5pbm5lclZhbHVlLmxlbmd0aCA+IDAgJiYgKCF0aGlzLmZvY3VzZWQgfHwgIXRoaXMuZmlsdGVyKVxuICAgICAgICB9LFxuICAgICAgICBzY29wZWRTbG90czoge1xuICAgICAgICAgIGJlZm9yZTogdGhpcy5pbm5lclZhbHVlLmxlbmd0aCA+IDAgPyAoKSA9PiBnZXRTZWxlY3RlZChoKSA6IHZvaWQgMCxcbiAgICAgICAgICBkZWZhdWx0OiAoKSA9PiBbaCgnaW5wdXQnLCB7XG4gICAgICAgICAgICByZWY6ICdpbnB1dCcsXG4gICAgICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWlucHV0IG1hcmdpbi1taW4nLFxuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgY3Vyc29yOiAhdGhpcy5maWx0ZXIgPyAncG9pbnRlcicgOiB2b2lkIDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkb21Qcm9wczoge1xuICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5maWx0ZXJWYWx1ZSxcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IHRoaXMucGxhY2Vob2xkZXIgfHwgJycsXG4gICAgICAgICAgICAgIGRpc2FibGVkOiAhdGhpcy5maWx0ZXJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAuLi50aGlzLiRsaXN0ZW5lcnMsXG4gICAgICAgICAgICAgIGlucHV0OiBlID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlclZhbHVlID0gZS50YXJnZXQudmFsdWVcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXVxuICAgICAgICB9XG4gICAgICB9KSwgdGhpcy5mb2N1c2VkID8gaCgnZGl2Jywge1xuICAgICAgICByZWY6ICdzZWxlY3RPcHRpb25zJyxcbiAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1zZWxlY3RfX29wdGlvbnMgY29tbW9uLXNoYWRvdycsXG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgJ21heC1oZWlnaHQnOiB0aGlzLm9wdGlvbnNIZWlnaHRcbiAgICAgICAgfVxuICAgICAgfSwgW2goJ3N3LXNjcm9sbC1hcmVhJywge1xuICAgICAgICBwcm9wczoge1xuICAgICAgICAgIHk6IHRydWUsXG4gICAgICAgICAgaGVpZ2h0OiB0aGlzLm9wdGlvbnNIZWlnaHRcbiAgICAgICAgfSxcbiAgICAgICAgc2NvcGVkU2xvdHM6IHtcbiAgICAgICAgICBkZWZhdWx0OiAoKSA9PiBnZXRPcHRpb25zKGgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICBdKSA6IHZvaWQgMF1cbiAgICB9LFxuICAgIGdldEFmdGVyKGgpIHtcbiAgICAgIHJldHVybiBbaCgnc3ctaWNvbicsIHtcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICBuYW1lOiAna2V5Ym9hcmRfYXJyb3dfZG93bicsXG4gICAgICAgICAgc2l6ZTogJzIwcHgnXG4gICAgICAgIH0sXG4gICAgICAgIHN0YXRpY0NsYXNzOiAnY29sb3ItZ3JleSBob3Zlci1jb2xvci1wcmltYXJ5JyxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHRoaXMuZm9jdXNlZCA/ICdyb3RhdGUoMTgwZGVnKScgOiB2b2lkIDBcbiAgICAgICAgfVxuICAgICAgfSldXG4gICAgfSxcbiAgICBmb3JtYXRWYWx1ZShvcHRpb24sIG9wZSkge1xuICAgICAgbGV0IGR1cGxpY2F0ZWQgPSBmYWxzZVxuICAgICAgbGV0IHJlcyA9IFtdXG5cbiAgICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgIHRoaXMuaW5uZXJWYWx1ZS5mb3JFYWNoKHggPT4ge1xuICAgICAgICAgIGlmIChpc0RlZXBFcXVhbCh4LCB0aGlzLmdldFZhbHVlKG9wdGlvbikpKSB7XG4gICAgICAgICAgICBkdXBsaWNhdGVkID0gdHJ1ZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXMucHVzaCh4KVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSBpZiAob3BlID09PSAncmVtb3ZlJykgeyBkdXBsaWNhdGVkID0gdHJ1ZSB9XG4gICAgICBpZiAoIWR1cGxpY2F0ZWQpIHtcbiAgICAgICAgcmVzLnB1c2godGhpcy5nZXRWYWx1ZShvcHRpb24pKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc1xuICAgIH0sXG4gICAgY2hlY2tTZWxlY3RlZChvcHRpb24pIHtcbiAgICAgIHJldHVybiB0aGlzLmlubmVyVmFsdWUuc29tZSh4ID0+IGlzRGVlcEVxdWFsKHgsIHRoaXMuZ2V0VmFsdWUob3B0aW9uKSkpXG4gICAgfSxcbiAgICBnZXRFeGFjdFZhbHVlcyh2YWx1ZSkge1xuICAgICAgbGV0IHYgPSBBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlIDogW3ZhbHVlXVxuXG4gICAgICByZXR1cm4gdi5yZWR1Y2UoKGEsIGMpID0+IHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5zb21lKHggPT4gaXNEZWVwRXF1YWwodGhpcy5nZXRWYWx1ZSh4KSwgYykpKSB7XG4gICAgICAgICAgYS5wdXNoKGMpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFcbiAgICAgIH0sIFtdKVxuICAgIH0sXG4gICAgZ2V0RXhhY3RPcHRpb25zKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdmFsdWUucmVkdWNlKChhLCBjKSA9PiB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5mb3JFYWNoKHggPT4ge1xuICAgICAgICAgIGlmIChpc0RlZXBFcXVhbCh0aGlzLmdldFZhbHVlKHgpLCBjKSkge1xuICAgICAgICAgICAgYS5wdXNoKHgpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gYVxuICAgICAgfSwgW10pXG4gICAgfSxcbiAgICBnZXRWYWx1ZShvcHRpb24pIHtcbiAgICAgIHJldHVybiBpc09iamVjdChvcHRpb24pICYmIG9wdGlvbi5oYXNPd25Qcm9wZXJ0eSgndmFsdWUnKVxuICAgICAgICA/IG9wdGlvbi52YWx1ZSA6IG9wdGlvblxuICAgIH0sXG4gICAgZ2V0TmFtZShvcHRpb24pIHtcbiAgICAgIHJldHVybiBpc09iamVjdChvcHRpb24pICYmIG9wdGlvbi5oYXNPd25Qcm9wZXJ0eSgnbmFtZScpXG4gICAgICAgID8gb3B0aW9uLm5hbWUgOiBvcHRpb25cbiAgICB9XG4gIH1cbn1cbiAgIiwiaW1wb3J0IFNlbGVjdCBmcm9tICcuL3NyYy9tYWluLmpzJ1xuXG5jb25zdCBpbnN0YWxsID0gZnVuY3Rpb24gKFZ1ZSkge1xuICBWdWUuY29tcG9uZW50KFNlbGVjdC5uYW1lLCBTZWxlY3QpXG59XG5cblNlbGVjdC5pbnN0YWxsID0gaW5zdGFsbFxuXG5leHBvcnQgZGVmYXVsdCBTZWxlY3RcbiIsImltcG9ydCBJdGVtIGZyb20gJy4uLy4uL2l0ZW0nXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3N3QnV0dG9uJyxcbiAgY29tcG9uZW50czogeyBJdGVtIH0sXG4gIHByb3BzOiB7XG4gICAgdW5kZXJsaW5lZDogQm9vbGVhbixcbiAgICBib3JkZXJlZDogQm9vbGVhbixcbiAgICBmaWxsZWQ6IEJvb2xlYW4sXG4gICAgZGlzYWJsZWQ6IEJvb2xlYW4sXG4gICAgY29sb3I6IFN0cmluZyxcbiAgICBwcmltYXJ5OiBCb29sZWFuLFxuICAgIG5lZ2F0aXZlOiBCb29sZWFuLFxuICAgIHBvc2l0aXZlOiBCb29sZWFuLFxuICAgIHdhcm5pbmc6IEJvb2xlYW4sXG4gICAgcm91bmQ6IEJvb2xlYW4sXG4gICAgc2hhZG93OiBCb29sZWFuLFxuICAgIG1pbmk6IEJvb2xlYW4sXG4gICAgdG86IFN0cmluZyB8IE9iamVjdCxcbiAgICBjZW50ZXI6IEJvb2xlYW4sXG4gICAgZW5kOiBCb29sZWFuXG4gIH0sXG4gIGRhdGE6ICgpID0+ICh7fSksXG4gIHJlbmRlcihoKSB7XG4gICAgcmV0dXJuIGgoJ2J1dHRvbicsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiAnc3ctYnV0dG9uIGZsZXggbm8td3JhcCBpdGVtcy1jZW50ZXInLFxuICAgICAgc3R5bGU6IHtcbiAgICAgICAgY29sb3I6ICF0aGlzLmRpc2FibGVkICYmICF0aGlzLmZpbGxlZCAmJiB0aGlzLmNvbG9yIHx8IHZvaWQgMCxcbiAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiAhdGhpcy5kaXNhYmxlZCAmJiB0aGlzLmZpbGxlZCAmJiB0aGlzLmNvbG9yIHx8IHZvaWQgMFxuICAgICAgfSxcbiAgICAgIGNsYXNzOiB7XG4gICAgICAgIHVuZGVybGluZTogdGhpcy51bmRlcmxpbmVkLFxuICAgICAgICBib3JkZXI6IHRoaXMuYm9yZGVyZWQsXG4gICAgICAgIGZpbGw6IHRoaXMuZmlsbGVkLFxuICAgICAgICBwcmltYXJ5OiB0aGlzLnByaW1hcnksXG4gICAgICAgIG5lZ2F0aXZlOiB0aGlzLm5lZ2F0aXZlLFxuICAgICAgICBwb3NpdGl2ZTogdGhpcy5wb3NpdGl2ZSxcbiAgICAgICAgd2FybmluZzogdGhpcy53YXJuaW5nLFxuICAgICAgICBncmV5OiB0aGlzLmRpc2FibGVkLFxuICAgICAgICByb3VuZDogdGhpcy5yb3VuZCAmJiAhdGhpcy51bmRlcmxpbmVkLFxuICAgICAgICAnY29tbW9uLXNoYWRvdyc6IHRoaXMuc2hhZG93ICYmICh0aGlzLmJvcmRlcmVkIHx8IHRoaXMuZmlsbGVkKVxuICAgICAgfSxcbiAgICAgIG9uOiB0aGlzLmRpc2FibGVkID8gdm9pZCAwIDoge1xuICAgICAgICAuLi50aGlzLiRsaXN0ZW5lcnNcbiAgICAgIH1cbiAgICB9LCBbXG4gICAgICBoKCdzdy1pdGVtJywge1xuICAgICAgICBzdGF0aWNDbGFzczogJ2ZsZXgtYXV0bycsXG4gICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgJ3JvdW5kLXNsb3QnOiB0aGlzLiRzY29wZWRTbG90cy5yb3VuZCxcbiAgICAgICAgICBtaW5pOiB0aGlzLm1pbmlcbiAgICAgICAgfSxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJ1xuICAgICAgICB9LFxuICAgICAgICBwcm9wczoge1xuICAgICAgICAgIHRvOiB0aGlzLnRvLFxuICAgICAgICAgIGNlbnRlcjogdGhpcy5jZW50ZXIsXG4gICAgICAgICAgZW5kOiB0aGlzLmVuZCxcbiAgICAgICAgICBkaXNhYmxlZDogdGhpcy5kaXNhYmxlZFxuICAgICAgICB9LFxuICAgICAgICBvbjogdGhpcy5kaXNhYmxlZCA/IHZvaWQgMCA6IHtcbiAgICAgICAgICAuLi50aGlzLiRsaXN0ZW5lcnNcbiAgICAgICAgfSxcbiAgICAgICAgc2NvcGVkU2xvdHM6IHRoaXMuJHNjb3BlZFNsb3RzLnJvdW5kICE9PSB2b2lkIDBcbiAgICAgICAgICA/IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6ICgpID0+IFtoKCdkaXYnLCB7XG4gICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiAnZmxleCBuby13cmFwIGl0ZW1zLWNlbnRlciBtYXJnaW4tbWluIHN3LWJ1dHRvbl9faW5uZXIgZmxleC1hdXRvJ1xuICAgICAgICAgICAgfSwgW3RoaXMuJHNjb3BlZFNsb3RzLnJvdW5kKCldKV1cbiAgICAgICAgICB9IDoge1xuICAgICAgICAgICAgYmVmb3JlOiB0aGlzLiRzY29wZWRTbG90cy5iZWZvcmUgIT09IHZvaWQgMFxuICAgICAgICAgICAgICA/ICgpID0+IFtoKCdkaXYnLCB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6ICdmbGV4IG5vLXdyYXAgaXRlbXMtY2VudGVyIG1hcmdpbi1taW4gc3ctYnV0dG9uX19iZWZvcmUnXG4gICAgICAgICAgICAgIH0sIFt0aGlzLiRzY29wZWRTbG90cy5iZWZvcmUoKV0pXSA6IHZvaWQgMCxcbiAgXG4gICAgICAgICAgICBkZWZhdWx0OiB0aGlzLiRzY29wZWRTbG90cy5kZWZhdWx0ICE9PSB2b2lkIDBcbiAgICAgICAgICAgICAgPyAoKSA9PiBbaCgnZGl2Jywge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiAnZmxleCBuby13cmFwIGl0ZW1zLWNlbnRlciBtYXJnaW4tbWluIHN3LWJ1dHRvbl9faW5uZXIgZmxleC1hdXRvJ1xuICAgICAgICAgICAgICB9LCBbdGhpcy4kc2NvcGVkU2xvdHMuZGVmYXVsdCgpXSldIDogdm9pZCAwLFxuICBcbiAgICAgICAgICAgIGFmdGVyOiB0aGlzLiRzY29wZWRTbG90cy5hZnRlciAhPT0gdm9pZCAwXG4gICAgICAgICAgICAgID8gKCkgPT4gW2goJ2RpdicsIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogJ2ZsZXggbm8td3JhcCBpdGVtcy1jZW50ZXIgbWFyZ2luLW1pbiBzdy1idXR0b25fX2FmdGVyJ1xuICAgICAgICAgICAgICB9LCBbdGhpcy4kc2NvcGVkU2xvdHMuYWZ0ZXIoKV0pXSA6IHZvaWQgMFxuICAgICAgICAgIH1cbiAgICAgIH0pXG4gICAgXSlcbiAgfVxufVxuICAiLCJpbXBvcnQgQnV0dG9uIGZyb20gJy4vc3JjL21haW4uanMnXG5cbmNvbnN0IGluc3RhbGwgPSBmdW5jdGlvbiAoVnVlKSB7XG4gIFZ1ZS5jb21wb25lbnQoQnV0dG9uLm5hbWUsIEJ1dHRvbilcbn1cblxuQnV0dG9uLmluc3RhbGwgPSBpbnN0YWxsXG5cbmV4cG9ydCBkZWZhdWx0IEJ1dHRvblxuIiwiaW1wb3J0IHN3QnV0dG9uIGZyb20gJy4uLy4uL2J1dHRvbidcbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3N3TW9kYWwnLFxuICBjb21wb25lbnRzOiB7XG4gICAgc3dCdXR0b25cbiAgfSxcbiAgcHJvcHM6IHtcbiAgICBzaG93OiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogZmFsc2UsXG4gICAgfSxcbiAgICB0aXRsZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ+WfuuacrOeUqOazlXRpdGxlJ1xuICAgIH0sXG4gICAgd2lkdGg6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICc0MCUnXG4gICAgfVxuICB9LFxuICBjb21wdXRlZDoge1xuICAgIHN0eWxlKCkge1xuICAgICAgaWYgKHRoaXMuc2hvdykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHpJbmRleDogOTk5LFxuICAgICAgICAgIG9wYWNpdHk6IDFcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB6SW5kZXg6IC0xMCxcbiAgICAgICAgICBvcGFjaXR5OiAwXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBoYW5kbGVDYW5jZWwoKSB7XG4gICAgICB0aGlzLiRlbWl0KCdjYW5jZWwnKVxuICAgIH0sXG4gICAgaGFuZGxlQ29uZmlybSgpIHtcbiAgICAgIHRoaXMuJGVtaXQoJ2NvbmZpcm0nKVxuICAgIH0sXG4gIH0sXG4gIHJlbmRlcihoKSB7XG4gICAgcmV0dXJuIGgoJ2Rpdicse1xuICAgICAgc3RhdGljQ2xhc3M6ICdzdy1tb2RhbC1tYXNrJyxcbiAgICAgIHN0eWxlOiB0aGlzLnN0eWxlLFxuICAgICAgb246IHtcbiAgICAgICAgY2xpY2s6IHRoaXMuaGFuZGxlQ2FuY2VsXG4gICAgICB9IFxuICAgIH0sIFsgaCgnZGl2JywgeyBcbiAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1tb2RhbCcsXG4gICAgICAgICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgICAgICAgc2hvd01vZGFsOiB0aGlzLnNob3csXG4gICAgICAgICAgICAgICAgaGlkZU1vZGFsOiAhdGhpcy5zaG93XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgd2lkdGg6IHRoaXMud2lkdGhcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICBjbGljazogZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFsgdGhpcy4kc2NvcGVkU2xvdHMuaGVhZGVyID09PSB2b2lkIDAgXG4gICAgICAgICAgICAgICAgPyBoKCdkaXYnLCBcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzczogJ3N3LW1vZGFsLXRpdGxlJ1xuICAgICAgICAgICAgICAgICAgICAgIH0sIFsgaCgnc3BhbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiAnc3ctbW9kYWwtdGl0bGUtdGV4dCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRpdGxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGgoJ3NwYW4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzczogJ3N3LW1vZGFsLWNsb3NlLWljb24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiAoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2FuY2VsKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoKCdpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzczogJ21hdGVyaWFsLWljb25zJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnY2xvc2UnKSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgOiB0aGlzLiRzY29wZWRTbG90cy5oZWFkZXIoKSxcbiAgICAgICAgICAgICAgICB0aGlzLiRzY29wZWRTbG90cy5jb250ZW50KCksXG4gICAgICAgICAgICAgICAgdGhpcy4kc2NvcGVkU2xvdHMuZm9vdGVyID09PSB2b2lkIDAgXG4gICAgICAgICAgICAgICAgPyBoKCdkaXYnLCBcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6ICdzdy1tb2RhbC1mb290ZXInXG4gICAgICAgICAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgaCgnc3ctYnV0dG9uJyx7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzczogJ2J0biBsZWZ0LWJ0bicsXG4gICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2FuY2VsKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH0sICflj5bmtognKSxcbiAgICAgICAgICAgICAgICAgICAgICBoKCdzdy1idXR0b24nLHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiAnYnRuIHJpZ2h0LWJ0bicsXG4gICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQ29uZmlybSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9LCAn56Gu5a6aJylcbiAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICA6IHRoaXMuJHNjb3BlZFNsb3RzLmZvb3RlclxuICAgICAgICAgICAgICBdICAgICAgICAgICAgICBcbiAgICAgICAgICApXG4gICAgICAgIF1cbiAgICApXG4gIH1cbn0iLCJpbXBvcnQgTW9kYWwgZnJvbSAnLi9zcmMvbWFpbi5qcydcblxuY29uc3QgaW5zdGFsbCA9IGZ1bmN0aW9uIChWdWUpIHtcbiAgVnVlLmNvbXBvbmVudChNb2RhbC5uYW1lLCBNb2RhbClcbn1cblxuTW9kYWwuaW5zdGFsbCA9IGluc3RhbGxcblxuZXhwb3J0IGRlZmF1bHQgTW9kYWxcbiIsImltcG9ydCBWdWUgZnJvbSAndnVlJ1xuXG5jb25zdCBpc1NlcnZlciA9IFZ1ZS5wcm90b3R5cGUuJGlzU2VydmVyO1xuXG5leHBvcnQgZnVuY3Rpb24gb2Zmc2V0KGVsKSB7XG4gIGlmIChlbCA9PT0gd2luZG93KSB7XG4gICAgcmV0dXJuIHsgdG9wOiAwLCBsZWZ0OiAwIH1cbiAgfVxuICBjb25zdCB7IHRvcCwgbGVmdCB9ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuICByZXR1cm4geyB0b3AsIGxlZnQgfVxufVxuICBcbmV4cG9ydCBmdW5jdGlvbiBzdHlsZShlbCwgcHJvcGVydHkpIHtcbiAgcmV0dXJuIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsKS5nZXRQcm9wZXJ0eVZhbHVlKHByb3BlcnR5KVxufVxuICBcbmV4cG9ydCBmdW5jdGlvbiBoZWlnaHQoZWwpIHtcbiAgcmV0dXJuIGVsID09PSB3aW5kb3dcbiAgICA/IHdpbmRvdy5pbm5lckhlaWdodFxuICAgIDogZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0XG59XG4gIFxuZXhwb3J0IGZ1bmN0aW9uIHdpZHRoKGVsKSB7XG4gIHJldHVybiBlbCA9PT0gd2luZG93XG4gICAgPyB3aW5kb3cuaW5uZXJXaWR0aFxuICAgIDogZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGhcbn1cbiAgXG5leHBvcnQgZnVuY3Rpb24gY3NzKGVsZW1lbnQsIGNzcykge1xuICBsZXQgc3R5bGUgPSBlbGVtZW50LnN0eWxlXG4gIFxuICBPYmplY3Qua2V5cyhjc3MpLmZvckVhY2gocHJvcCA9PiB7XG4gICAgc3R5bGVbcHJvcF0gPSBjc3NbcHJvcF1cbiAgfSlcbn1cbiAgXG5leHBvcnQgZnVuY3Rpb24gY3NzQmF0Y2goZWxlbWVudHMsIHN0eWxlKSB7XG4gIGVsZW1lbnRzLmZvckVhY2goZWwgPT4gY3NzKGVsLCBzdHlsZSkpXG59XG4gIFxuZXhwb3J0IGZ1bmN0aW9uIHJlYWR5KGZuKSB7XG4gIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm5cbiAgfVxuICBcbiAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgIT09ICdsb2FkaW5nJykge1xuICAgIHJldHVybiBmbigpXG4gIH1cbiAgXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmbiwgZmFsc2UpXG59XG5cbmV4cG9ydCBjb25zdCBvbiA9IChmdW5jdGlvbigpIHtcbiAgaWYgKCFpc1NlcnZlciAmJiBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGVsZW1lbnQsIGV2ZW50LCBoYW5kbGVyKSB7XG4gICAgICBpZiAoZWxlbWVudCAmJiBldmVudCAmJiBoYW5kbGVyKSB7XG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlciwgZmFsc2UpO1xuICAgICAgfVxuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGVsZW1lbnQsIGV2ZW50LCBoYW5kbGVyKSB7XG4gICAgICBpZiAoZWxlbWVudCAmJiBldmVudCAmJiBoYW5kbGVyKSB7XG4gICAgICAgIGVsZW1lbnQuYXR0YWNoRXZlbnQoJ29uJyArIGV2ZW50LCBoYW5kbGVyKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG59KSgpO1xuXG5leHBvcnQgY29uc3Qgb2ZmID0gKGZ1bmN0aW9uKCkge1xuICBpZiAoIWlzU2VydmVyICYmIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oZWxlbWVudCwgZXZlbnQsIGhhbmRsZXIpIHtcbiAgICAgIGlmIChlbGVtZW50ICYmIGV2ZW50KSB7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlciwgZmFsc2UpO1xuICAgICAgfVxuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGVsZW1lbnQsIGV2ZW50LCBoYW5kbGVyKSB7XG4gICAgICBpZiAoZWxlbWVudCAmJiBldmVudCkge1xuICAgICAgICBlbGVtZW50LmRldGFjaEV2ZW50KCdvbicgKyBldmVudCwgaGFuZGxlcik7XG4gICAgICB9XG4gICAgfTtcbiAgfVxufSkoKTsgIFxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG9mZnNldCxcbiAgc3R5bGUsXG4gIGhlaWdodCxcbiAgd2lkdGgsXG4gIGNzcyxcbiAgY3NzQmF0Y2gsXG4gIHJlYWR5LFxuICBvbixcbiAgb2ZmXG59IiwiaW1wb3J0IHsgb24sIG9mZiB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2RvbScgXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdzd1BvcG92ZXInLFxuICBkYXRhICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcG9wb3ZlclN0eWxlOiB7fSxcbiAgICAgIGFycm93U3R5bGU6IHt9LFxuICAgICAgc2hvdzogZmFsc2UsXG4gICAgICByZWZlcmVuY2VFbG06IHt9XG4gICAgfVxuICB9LFxuICBtb2RlbDoge1xuICAgIHByb3A6ICd2YWx1ZScsXG4gICAgZXZlbnQ6ICd1cGRhdGUnXG4gIH0sXG4gIHByb3BzOiB7XG4gICAgdmFsdWU6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW5cbiAgICB9LFxuICAgIHRpdGxlOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgfSxcbiAgICBjb250ZW50OiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgfSxcbiAgICBwbGFjZW1lbnQ6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICd0b3AnXG4gICAgfSxcbiAgICB0cmlnZ2VyOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnY2xpY2snLFxuICAgICAgdmFsaWRhdG9yOiB2YWx1ZSA9PiBbJ2NsaWNrJywgJ2ZvY3VzJywgJ2hvdmVyJywgJ21hbnVhbCddLmluZGV4T2YodmFsdWUpID4gLTFcbiAgICB9LFxuICAgIHdpZHRoOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgfVxuICB9LFxuICBjb21wdXRlZDoge1xuICAgIHNob3dWYWx1ZToge1xuICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlXG4gICAgICB9LFxuICAgICAgc2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICB9XG4gICAgfSxcbiAgICBzaG93U3R5bGUoKSB7XG4gICAgICBpZiAodGhpcy50cmlnZ2VyICE9PSAnbWFudWFsJykge1xuICAgICAgICBpZiAodGhpcy5zaG93KSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHpJbmRleDogOTk5LFxuICAgICAgICAgICAgb3BhY2l0eTogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgekluZGV4OiAtMTAsXG4gICAgICAgICAgICBvcGFjaXR5OiAwXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5zaG93VmFsdWUpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgekluZGV4OiA5OTksXG4gICAgICAgICAgICBvcGFjaXR5OiAxXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB6SW5kZXg6IC0xMCxcbiAgICAgICAgICAgIG9wYWNpdHk6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBnZXRTdHlsZShwb3BvdmVyRWxtLCByZWZlcmVuY2VFbG0pIHtcbiAgICAgIHN3aXRjaCAodGhpcy5wbGFjZW1lbnQpIHtcbiAgICAgICAgY2FzZSAndG9wLXN0YXJ0JzpcbiAgICAgICAgICB0aGlzLnBvcG92ZXJTdHlsZSA9IHtcbiAgICAgICAgICAgIHRvcDogJy0nICsgKHBvcG92ZXJFbG0ub2Zmc2V0SGVpZ2h0ICsgMTApICsgJ3B4J1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmFycm93U3R5bGUgPSB7XG4gICAgICAgICAgICBsZWZ0OiAocmVmZXJlbmNlRWxtLm9mZnNldFdpZHRoIC8gMiAtIDUpICsgJ3B4J1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAndG9wJzpcbiAgICAgICAgICB0aGlzLnBvcG92ZXJTdHlsZSA9IHtcbiAgICAgICAgICAgIHRvcDogJy0nICsgKHBvcG92ZXJFbG0ub2Zmc2V0SGVpZ2h0ICsgMTApICsgJ3B4JyxcbiAgICAgICAgICAgIGxlZnQ6IChyZWZlcmVuY2VFbG0ub2Zmc2V0V2lkdGggLSBwb3BvdmVyRWxtLm9mZnNldFdpZHRoKSAvIDIgKyAncHgnXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuYXJyb3dTdHlsZSA9IHtcbiAgICAgICAgICAgIGxlZnQ6IChwb3BvdmVyRWxtLm9mZnNldFdpZHRoIC8gMiAtIDUpICsgJ3B4J1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlICdib3R0b20tc3RhcnQnOiBcbiAgICAgICAgICB0aGlzLnBvcG92ZXJTdHlsZSA9IHtcbiAgICAgICAgICAgIHRvcDogKHJlZmVyZW5jZUVsbS5vZmZzZXRIZWlnaHQgKyAxMCkgKyAncHgnXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuYXJyb3dTdHlsZSA9IHtcbiAgICAgICAgICAgIGxlZnQ6IChyZWZlcmVuY2VFbG0ub2Zmc2V0V2lkdGggLyAyIC0gNSkgKyAncHgnXG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrIFxuICAgICAgICBjYXNlICdib3R0b20nOlxuICAgICAgICAgIHRoaXMucG9wb3ZlclN0eWxlID0ge1xuICAgICAgICAgICAgdG9wOiAocmVmZXJlbmNlRWxtLm9mZnNldEhlaWdodCArIDEwKSArICdweCcsXG4gICAgICAgICAgICBsZWZ0OiAocmVmZXJlbmNlRWxtLm9mZnNldFdpZHRoIC0gcG9wb3ZlckVsbS5vZmZzZXRXaWR0aCkgLyAyICsgJ3B4J1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmFycm93U3R5bGUgPSB7XG4gICAgICAgICAgICBsZWZ0OiAocG9wb3ZlckVsbS5vZmZzZXRXaWR0aCAvIDIgLSA1KSArICdweCdcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAncmlnaHQtc3RhcnQnOlxuICAgICAgICAgIHRoaXMucG9wb3ZlclN0eWxlID0ge1xuICAgICAgICAgICAgbGVmdDogKHJlZmVyZW5jZUVsbS5vZmZzZXRXaWR0aCArIDEwKSArICdweCcsXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuYXJyb3dTdHlsZSA9IHtcbiAgICAgICAgICAgIHRvcDogKHJlZmVyZW5jZUVsbS5vZmZzZXRIZWlnaHQgLyAyIC0gNSkgKyAncHgnXG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrICBcbiAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgIHRoaXMucG9wb3ZlclN0eWxlID0ge1xuICAgICAgICAgICAgbGVmdDogKHJlZmVyZW5jZUVsbS5vZmZzZXRXaWR0aCArIDEwKSArICdweCcsXG4gICAgICAgICAgICB0b3A6IChyZWZlcmVuY2VFbG0ub2Zmc2V0SGVpZ2h0IC0gcG9wb3ZlckVsbS5vZmZzZXRIZWlnaHQpIC8gMiArICdweCdcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5hcnJvd1N0eWxlID0ge1xuICAgICAgICAgICAgdG9wOiAocG9wb3ZlckVsbS5vZmZzZXRIZWlnaHQgLyAyIC0gNSkgKyAncHgnXG4gICAgICAgICAgfSBcbiAgICAgICAgICBicmVhayBcbiAgICAgICAgY2FzZSAnbGVmdC1zdGFydCc6XG4gICAgICAgICAgdGhpcy5wb3BvdmVyU3R5bGUgPSB7XG4gICAgICAgICAgICByaWdodDogKHJlZmVyZW5jZUVsbS5vZmZzZXRXaWR0aCArIDEwKSArICdweCcsXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuYXJyb3dTdHlsZSA9IHtcbiAgICAgICAgICAgIHRvcDogKHJlZmVyZW5jZUVsbS5vZmZzZXRIZWlnaHQgLyAyIC0gNSkgKyAncHgnXG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgIHRoaXMucG9wb3ZlclN0eWxlID0ge1xuICAgICAgICAgICAgcmlnaHQ6IChyZWZlcmVuY2VFbG0ub2Zmc2V0V2lkdGggKyAxMCkgKyAncHgnLFxuICAgICAgICAgICAgdG9wOiAocmVmZXJlbmNlRWxtLm9mZnNldEhlaWdodCAtIHBvcG92ZXJFbG0ub2Zmc2V0SGVpZ2h0KSAvIDIgKyAncHgnXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuYXJyb3dTdHlsZSA9IHtcbiAgICAgICAgICAgIHRvcDogKHBvcG92ZXJFbG0ub2Zmc2V0SGVpZ2h0IC8gMiAtIDUpICsgJ3B4J1xuICAgICAgICAgIH0gXG4gICAgICAgICAgYnJlYWsgICAgICAgIFxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0sXG4gICAgaGFuZGxlQ2xpY2soKSB7XG4gICAgICB0aGlzLnNob3cgPSAhdGhpcy5zaG93XG4gICAgfSxcbiAgICBoYW5kbGVNb3VzZUVudGVyKCkge1xuICAgICAgdGhpcy5zaG93ID0gdHJ1ZVxuICAgIH0sXG4gICAgaGFuZGxlTW91c2VMZWF2ZSgpIHtcbiAgICAgIHRoaXMuc2hvdyA9IGZhbHNlXG4gICAgfSxcbiAgICBkb1Nob3coKSB7XG4gICAgICB0aGlzLnNob3cgPSB0cnVlXG4gICAgfSxcbiAgICBkb0Nsb3NlKCkge1xuICAgICAgdGhpcy5zaG93ID0gZmFsc2VcbiAgICB9LFxuICAgIGhhbmRsZU1hbnVhbCgpIHtcbiAgICAgIHRoaXMuc2hvd1ZhbHVlID0gIXRoaXMuc2hvd1ZhbHVlXG4gICAgICB0aGlzLiRlbWl0KFwidXBkYXRlXCIsIHRoaXMuc2hvd1ZhbHVlKTtcbiAgICB9XG4gIH0sXG4gIG1vdW50ZWQgKCkge1xuICAgIGxldCBwb3BvdmVyRWxtID0gdGhpcy4kcmVmcy5wb3BvdmVyXG4gICAgbGV0IHJlZmVyZW5jZUVsbSA9IHRoaXMucmVmZXJlbmNlRWxtID0gdGhpcy4kc2NvcGVkU2xvdHMucmVmZXJlbmNlKClbMF0uZWxtXG4gICAgdGhpcy5nZXRTdHlsZShwb3BvdmVyRWxtLCByZWZlcmVuY2VFbG0pXG4gICAgaWYodGhpcy50cmlnZ2VyID09PSAnbWFudWFsJyl7XG4gICAgICBvbihyZWZlcmVuY2VFbG0sICdjbGljaycsIHRoaXMuaGFuZGxlTWFudWFsKTtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBpZiAodGhpcy50cmlnZ2VyID09PSAnY2xpY2snKSB7XG4gICAgICBvbihyZWZlcmVuY2VFbG0sICdjbGljaycsIHRoaXMuaGFuZGxlQ2xpY2spO1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGlmKHRoaXMudHJpZ2dlciA9PT0gJ2hvdmVyJyl7XG4gICAgICBvbihyZWZlcmVuY2VFbG0sICdtb3VzZWVudGVyJywgdGhpcy5oYW5kbGVNb3VzZUVudGVyKVxuICAgICAgb24ocmVmZXJlbmNlRWxtLCAnbW91c2VsZWF2ZScsIHRoaXMuaGFuZGxlTW91c2VMZWF2ZSk7XG4gICAgfVxuICAgIGlmKHRoaXMudHJpZ2dlciA9PT0gJ2ZvY3VzJyl7XG4gICAgICBpZiAocmVmZXJlbmNlRWxtLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0LCB0ZXh0YXJlYScpKSB7XG4gICAgICAgIG9uKHJlZmVyZW5jZUVsbSwgJ2ZvY3VzaW4nLCB0aGlzLmRvU2hvdyk7XG4gICAgICAgIG9uKHJlZmVyZW5jZUVsbSwgJ2ZvY3Vzb3V0JywgdGhpcy5kb0Nsb3NlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9uKHJlZmVyZW5jZUVsbSwgJ21vdXNlZG93bicsIHRoaXMuZG9TaG93KTtcbiAgICAgICAgb24ocmVmZXJlbmNlRWxtLCAnbW91c2V1cCcsIHRoaXMuZG9DbG9zZSk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBkZXN0cm95ZWQgKCkge1xuICAgIGNvbnN0IHJlZmVyZW5jZSA9IHRoaXMucmVmZXJlbmNlRWxtO1xuICAgIG9mZihyZWZlcmVuY2UsICdjbGljaycsIHRoaXMuaGFuZGxlQ2xpY2spO1xuICAgIG9mZihyZWZlcmVuY2UsICdtb3VzZXVwJywgdGhpcy5kb0Nsb3NlKTtcbiAgICBvZmYocmVmZXJlbmNlLCAnbW91c2Vkb3duJywgdGhpcy5kb1Nob3cpO1xuICAgIG9mZihyZWZlcmVuY2UsICdmb2N1c2luJywgdGhpcy5kb1Nob3cpO1xuICAgIG9mZihyZWZlcmVuY2UsICdmb2N1c291dCcsIHRoaXMuZG9DbG9zZSk7XG4gICAgb2ZmKHJlZmVyZW5jZSwgJ21vdXNlZG93bicsIHRoaXMuZG9TaG93KTtcbiAgICBvZmYocmVmZXJlbmNlLCAnbW91c2V1cCcsIHRoaXMuZG9DbG9zZSk7XG4gICAgb2ZmKHJlZmVyZW5jZSwgJ21vdXNlbGVhdmUnLCB0aGlzLmhhbmRsZU1vdXNlTGVhdmUpO1xuICAgIG9mZihyZWZlcmVuY2UsICdtb3VzZWVudGVyJywgdGhpcy5oYW5kbGVNb3VzZUVudGVyKTtcbiAgICBvZmYoZG9jdW1lbnQsICdjbGljaycsIHRoaXMuaGFuZGxlTWFudWFsKTtcbiAgfSxcbiAgcmVuZGVyKGgpIHtcbiAgICByZXR1cm4gaCgnZGl2Jyx7XG4gICAgICBjbGFzczogJ3N3LXBvcG92ZXItY29udGFpbicsXG4gICAgfSwgWyBoKCdkaXYnLCBcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1wb3BvdmVyJyxcbiAgICAgICAgICAgICAgY2xhc3M6ICdzdy1wb3BvdmVyLXNob3cnLFxuICAgICAgICAgICAgICByZWY6ICdwb3BvdmVyJyxcbiAgICAgICAgICAgICAgc3R5bGU6IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih0aGlzLnBvcG92ZXJTdHlsZSwge3dpZHRoOiB0aGlzLndpZHRoIH0pLCB0aGlzLnNob3dTdHlsZSlcbiAgICAgICAgfSwgWyB0aGlzLnRpdGxlICBcbiAgICAgICAgICAgICAgPyBoKCdkaXYnLCB7XG4gICAgICAgICAgICAgICAgY2xhc3M6ICdzdy1wb3BvdmVyLXRpdGxlJ1xuICAgICAgICAgICAgICB9LCB0aGlzLnRpdGxlKVxuICAgICAgICAgICAgICA6ICcnLCBcbiAgICAgICAgICAgICB0aGlzLiRzY29wZWRTbG90cy5kZWZhdWx0ID09PSB2b2lkIDBcbiAgICAgICAgICAgICA/IGgoJ2RpdicsIHtcbiAgICAgICAgICAgICAgICBjbGFzczogJ3N3LXBvcG92ZXItY29udGVudCdcbiAgICAgICAgICAgICB9LCB0aGlzLmNvbnRlbnQgfHwgJycgKVxuICAgICAgICAgICAgICA6IHRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQoKSxcbiAgICAgICAgICAgICBoKCdkaXYnLHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogJ3N3LXBvcG92ZXItYXJyb3cnLFxuICAgICAgICAgICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgICAgICAgJ3N3LXBvcG92ZXItYXJyb3ctdG9wJzogdGhpcy5wbGFjZW1lbnQuaW5kZXhPZigndG9wJykgPj0gMCA/IHRydWUgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAnc3ctcG9wb3Zlci1hcnJvdy1ib3R0b20nOiB0aGlzLnBsYWNlbWVudC5pbmRleE9mKCdib3R0b20nKSA+PSAwID8gdHJ1ZSA6IGZhbHNlLFxuICAgICAgICAgICAgICAgICdzdy1wb3BvdmVyLWFycm93LXJpZ2h0JzogdGhpcy5wbGFjZW1lbnQuaW5kZXhPZigncmlnaHQnKSA+PSAwID8gdHJ1ZSA6IGZhbHNlLFxuICAgICAgICAgICAgICAgICdzdy1wb3BvdmVyLWFycm93LWxlZnQnOiB0aGlzLnBsYWNlbWVudC5pbmRleE9mKCdsZWZ0JykgPj0gMCA/IHRydWUgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHN0eWxlOiB0aGlzLmFycm93U3R5bGVcbiAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSksIFxuICAgICAgICB0aGlzLiRzY29wZWRTbG90cy5yZWZlcmVuY2UgPT09IHZvaWQgMCBcbiAgICAgICAgPyBoKClcbiAgICAgICAgOiB0aGlzLiRzY29wZWRTbG90cy5yZWZlcmVuY2UoKVxuICAgICAgXSkgXG4gIH1cbn0iLCJpbXBvcnQgUG9wb3ZlciBmcm9tICcuL3NyYy9tYWluLmpzJ1xuXG5jb25zdCBpbnN0YWxsID0gZnVuY3Rpb24gKFZ1ZSkge1xuICBWdWUuY29tcG9uZW50KE1vZGFsLm5hbWUsIFBvcG92ZXIpXG59XG5cblBvcG92ZXIuaW5zdGFsbCA9IGluc3RhbGxcblxuZXhwb3J0IGRlZmF1bHQgUG9wb3ZlclxuIiwiaW1wb3J0IEl0ZW0gZnJvbSAnLi4vLi4vaXRlbSdcbmltcG9ydCB7IGlzRGVlcEVxdWFsIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvaXMnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3N3Q2hlY2tib3gnLFxuICBjb21wb25lbnRzOiB7IEl0ZW0gfSxcbiAgcHJvcHM6IHtcbiAgICB2YWx1ZTogQm9vbGVhbiB8IEFycmF5LFxuICAgIHZhbDoge1xuICAgICAgcmVxdWlyZWQ6IGZhbHNlXG4gICAgfSxcbiAgICBsYWJlbDogU3RyaW5nLFxuICAgIGRpc2FibGVkOiBCb29sZWFuLFxuICAgIGNvbG9yOiBTdHJpbmcsXG4gICAgcHJpbWFyeTogQm9vbGVhbixcbiAgICBuZWdhdGl2ZTogQm9vbGVhbixcbiAgICBwb3NpdGl2ZTogQm9vbGVhbixcbiAgICB3YXJuaW5nOiBCb29sZWFuLFxuICAgIGxlZnRMYWJlbDogQm9vbGVhbixcbiAgICBjb2xvckxhYmVsOiBCb29sZWFuLFxuICAgIGtlZXBDb2xvcjogQm9vbGVhblxuICB9LFxuICBkYXRhOiAoKSA9PiAoe1xuICAgIHBhcmVudDogdm9pZCAwXG4gIH0pLFxuICBjb21wdXRlZDoge1xuICAgIG1vZGVsKCkge1xuICAgICAgcmV0dXJuIHRoaXMucGFyZW50ID09PSB2b2lkIDAgPyB0aGlzLnZhbHVlIDogdGhpcy5wYXJlbnQudmFsdWVcbiAgICB9LFxuICAgIHBhcmVudERpc2FibGVkKCkge1xuICAgICAgcmV0dXJuIHRoaXMucGFyZW50ICYmIHRoaXMucGFyZW50LmRpc2FibGVkXG4gICAgfSxcbiAgICBjaGVja2VkOiB7XG4gICAgICBnZXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJvb2xlYW5Nb2RlID8gdGhpcy5tb2RlbCA6IHRoaXMuZ2V0Q2hlY2tlZCh0aGlzLnZhbClcbiAgICAgIH0sXG4gICAgICBzZXQodmFsKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcy5wYXJlbnQgPT09IHZvaWQgMCA/IHRoaXMgOiB0aGlzLnBhcmVudFxuXG4gICAgICAgIHNlbGYuJGVtaXQoXG4gICAgICAgICAgJ2lucHV0JyxcbiAgICAgICAgICB0aGlzLmZvcm1hdFZhbHVlKHZhbClcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH0sXG4gICAgaW5uZXJWYWx1ZSgpIHtcbiAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KHRoaXMubW9kZWwpID8gdGhpcy5tb2RlbCA6IFt0aGlzLm1vZGVsXVxuICAgIH0sXG4gICAgYm9vbGVhbk1vZGUoKSB7XG4gICAgICByZXR1cm4gdGhpcy52YWwgPT09IHZvaWQgMFxuICAgIH1cbiAgfSxcbiAgd2F0Y2g6IHt9LFxuICBtZXRob2RzOiB7XG4gICAgZ2V0Q2hlY2tlZCh2YWwpIHtcbiAgICAgIHJldHVybiB0aGlzLmlubmVyVmFsdWUuc29tZSh4ID0+IGlzRGVlcEVxdWFsKHgsIHZhbCkpXG4gICAgfSxcbiAgICBmb3JtYXRWYWx1ZShjaGVja2VkKSB7XG4gICAgICBpZiAodGhpcy5ib29sZWFuTW9kZSkgeyByZXR1cm4gY2hlY2tlZCB9XG4gICAgICBsZXQgcmVzID0gW11cblxuICAgICAgdGhpcy5pbm5lclZhbHVlLmZvckVhY2goeCA9PiB7XG4gICAgICAgIGlmICghaXNEZWVwRXF1YWwoeCwgdGhpcy52YWwpKSB7XG4gICAgICAgICAgcmVzLnB1c2goeClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIGlmIChjaGVja2VkKSB7IHJlcy5wdXNoKHRoaXMudmFsKSB9XG4gICAgICByZXR1cm4gcmVzXG4gICAgfSxcbiAgfSxcbiAgcmVuZGVyKGgpIHtcbiAgICBsZXQgY2hlY2tlZCA9IHRoaXMuY2hlY2tlZFxuICAgIGxldCBjb2xvckxhYmVsID0gY2hlY2tlZCAmJiB0aGlzLmNvbG9yTGFiZWxcbiAgICBsZXQgY29sb3JDaGVja2JveCA9IGNoZWNrZWQgfHwgdGhpcy5rZWVwQ29sb3JcbiAgICBsZXQgZ2V0TGFiZWwgPSAoKSA9PiBbaCgnZGl2Jywge1xuICAgICAgc3RhdGljQ2xhc3M6ICdzdy1jaGVja2JveF9fdGV4dCBtYXJnaW4tbWluJyxcbiAgICAgIGNsYXNzOiB7XG4gICAgICAgICdjb2xvci1wcmltYXJ5JzogY29sb3JMYWJlbCA/IHRoaXMucHJpbWFyeSA6IHZvaWQgMCxcbiAgICAgICAgJ2NvbG9yLW5lZ2F0aXZlJzogY29sb3JMYWJlbCA/IHRoaXMubmVnYXRpdmUgOiB2b2lkIDAsXG4gICAgICAgICdjb2xvci1wb3NpdGl2ZSc6IGNvbG9yTGFiZWwgPyB0aGlzLnBvc2l0aXZlIDogdm9pZCAwLFxuICAgICAgICAnY29sb3Itd2FybmluZyc6IGNvbG9yTGFiZWwgPyB0aGlzLndhcm5pbmcgOiB2b2lkIDBcbiAgICAgIH0sXG4gICAgICBzdHlsZToge1xuICAgICAgICBjb2xvcjogY29sb3JMYWJlbCA/IHRoaXMuY29sb3IgOiB2b2lkIDBcbiAgICAgIH1cbiAgICB9LCB0aGlzLmxhYmVsKV1cblxuICAgIHJldHVybiBoKCdzdy1pdGVtJywge1xuICAgICAgc3RhdGljQ2xhc3M6ICdzdy1jaGVja2JveCcsXG4gICAgICByZWY6ICdjaGVja2JveCcsXG4gICAgICBjbGFzczoge1xuICAgICAgICBkaXNhYmxlOiB0aGlzLmRpc2FibGVkIHx8IHRoaXMucGFyZW50RGlzYWJsZWRcbiAgICAgIH0sXG4gICAgICBuYXRpdmVPbjogdGhpcy5kaXNhYmxlZCA/IHZvaWQgMCA6IHtcbiAgICAgICAgY2xpY2s6ICgpID0+IHtcbiAgICAgICAgICB0aGlzLmNoZWNrZWQgPSAhY2hlY2tlZFxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgc2NvcGVkU2xvdHM6IHtcbiAgICAgICAgYmVmb3JlOiB0aGlzLmxhYmVsICYmIHRoaXMubGVmdExhYmVsID8gZ2V0TGFiZWwgOiB2b2lkIDAsXG4gICAgICAgIGRlZmF1bHQ6ICgpID0+IFtoKCdzdy1pY29uJywge1xuICAgICAgICAgIHN0YXRpY0NsYXNzOiAnbWFyZ2luLW1pbicsXG4gICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIG9wYWNpdHk6IGNoZWNrZWQgPyAxIDogMC42XG4gICAgICAgICAgfSxcbiAgICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgc2l6ZTogJzIwcHgnLFxuICAgICAgICAgICAgbmFtZTogY2hlY2tlZCA/ICdjaGVja19ib3gnIDogJ2NoZWNrX2JveF9vdXRsaW5lX2JsYW5rJyxcbiAgICAgICAgICAgIGNvbG9yOiBjb2xvckNoZWNrYm94ID8gdGhpcy5jb2xvciA6IHZvaWQgMCxcbiAgICAgICAgICAgIHByaW1hcnk6IGNvbG9yQ2hlY2tib3ggPyB0aGlzLnByaW1hcnkgOiB2b2lkIDAsXG4gICAgICAgICAgICBuZWdhdGl2ZTogY29sb3JDaGVja2JveCA/IHRoaXMubmVnYXRpdmUgOiB2b2lkIDAsXG4gICAgICAgICAgICBwb3NpdGl2ZTogY29sb3JDaGVja2JveCA/IHRoaXMucG9zaXRpdmUgOiB2b2lkIDAsXG4gICAgICAgICAgICB3YXJuaW5nOiBjb2xvckNoZWNrYm94ID8gdGhpcy53YXJuaW5nIDogdm9pZCAwXG4gICAgICAgICAgfVxuICAgICAgICB9KV0sXG4gICAgICAgIGFmdGVyOiB0aGlzLmxhYmVsICYmICF0aGlzLmxlZnRMYWJlbCA/IGdldExhYmVsIDogdm9pZCAwXG4gICAgICB9XG4gICAgfSlcbiAgfVxufSIsImltcG9ydCBDaGVja2JveCBmcm9tICcuL3NyYy9tYWluLmpzJ1xuXG5jb25zdCBpbnN0YWxsID0gZnVuY3Rpb24gKFZ1ZSkge1xuICBWdWUuY29tcG9uZW50KENoZWNrYm94Lm5hbWUsIENoZWNrYm94KVxufVxuXG5DaGVja2JveC5pbnN0YWxsID0gaW5zdGFsbFxuXG5leHBvcnQgZGVmYXVsdCBDaGVja2JveFxuIiwiXG5leHBvcnQgZGVmYXVsdCB7XG4gIGRhdGE6ICgpID0+ICh7fSksXG4gIHdhdGNoOiB7fSxcbiAgY29tcHV0ZWQ6IHt9LFxuICBtZXRob2RzOiB7XG4gICAgc2h1dHRsZShfdGhpcykge1xuICAgICAgbGV0IHNlbGYgPSBfdGhpcyB8fCB0aGlzXG5cbiAgICAgIHNlbGYuJGNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICBpZiAoY2hpbGQuJHJlZnNbdGhpcy5zaHV0dGxlUmVmXSAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgY2hpbGQucGFyZW50ID0gdGhpc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc2h1dHRsZShjaGlsZClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH0sXG4gIG1vdW50ZWQoKSB7XG4gICAgdGhpcy5zaHV0dGxlKClcbiAgfVxufVxuIiwiaW1wb3J0IEZpZWxkIGZyb20gJy4uLy4uL2ZpZWxkJ1xuaW1wb3J0IFNodXR0bGVNaXhpbiBmcm9tICcuLi8uLi8uLi9taXhpbnMvc2h1dHRsZSdcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnc3dDaGVja2JveEdyb3VwJyxcbiAgbWl4aW5zOiBbRmllbGQsIFNodXR0bGVNaXhpbl0sIC8vIGZvY3VzZWQsZGlzYWJsZWQsc2h1dHRsZVJlZlxuICBwcm9wczoge1xuICAgIHZhbHVlOiBCb29sZWFuIHwgQXJyYXlcbiAgfSxcbiAgZGF0YTogKCkgPT4gKHtcbiAgICBpbm5lclBvaW50ZXI6IHRydWUsXG4gICAgc2h1dHRsZVJlZjogJ2NoZWNrYm94J1xuICB9KSxcbiAgY29tcHV0ZWQ6IHt9LFxuICB3YXRjaDoge30sXG4gIG1ldGhvZHM6IHt9XG59IiwiaW1wb3J0IENoZWNrYm94R3JvdXAgZnJvbSAnLi9zcmMvbWFpbi5qcydcblxuY29uc3QgaW5zdGFsbCA9IGZ1bmN0aW9uIChWdWUpIHtcbiAgVnVlLmNvbXBvbmVudChDaGVja2JveEdyb3VwLm5hbWUsIENoZWNrYm94R3JvdXApXG59XG5cbkNoZWNrYm94R3JvdXAuaW5zdGFsbCA9IGluc3RhbGxcblxuZXhwb3J0IGRlZmF1bHQgQ2hlY2tib3hHcm91cFxuIiwiaW1wb3J0IEl0ZW0gZnJvbSAnLi4vLi4vaXRlbSdcbmltcG9ydCB7IGlzRGVlcEVxdWFsIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvaXMnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3N3UmFkaW8nLFxuICBjb21wb25lbnRzOiB7IEl0ZW0gfSxcbiAgcHJvcHM6IHtcbiAgICB2YWx1ZToge30sXG4gICAgdmFsOiB7XG4gICAgICByZXF1aXJlZDogdHJ1ZVxuICAgIH0sXG4gICAgbGFiZWw6IFN0cmluZyxcbiAgICBkaXNhYmxlZDogQm9vbGVhbixcbiAgICBjb2xvcjogU3RyaW5nLFxuICAgIHByaW1hcnk6IEJvb2xlYW4sXG4gICAgbmVnYXRpdmU6IEJvb2xlYW4sXG4gICAgcG9zaXRpdmU6IEJvb2xlYW4sXG4gICAgd2FybmluZzogQm9vbGVhbixcbiAgICBsZWZ0TGFiZWw6IEJvb2xlYW4sXG4gICAgY29sb3JMYWJlbDogQm9vbGVhbixcbiAgICBrZWVwQ29sb3I6IEJvb2xlYW5cbiAgfSxcbiAgZGF0YTogKCkgPT4gKHtcbiAgICBwYXJlbnQ6IHZvaWQgMFxuICB9KSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBtb2RlbCgpIHtcbiAgICAgIHJldHVybiB0aGlzLnBhcmVudCA9PT0gdm9pZCAwID8gdGhpcy52YWx1ZSA6IHRoaXMucGFyZW50LnZhbHVlXG4gICAgfSxcbiAgICBwYXJlbnREaXNhYmxlZCgpIHtcbiAgICAgIHJldHVybiB0aGlzLnBhcmVudCAmJiB0aGlzLnBhcmVudC5kaXNhYmxlZFxuICAgIH0sXG4gICAgY2hlY2tlZDoge1xuICAgICAgZ2V0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDaGVja2VkKHRoaXMudmFsKVxuICAgICAgfSxcbiAgICAgIHNldCgpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzLnBhcmVudCA9PT0gdm9pZCAwID8gdGhpcyA6IHRoaXMucGFyZW50XG5cbiAgICAgICAgc2VsZi4kZW1pdChcbiAgICAgICAgICAnaW5wdXQnLFxuICAgICAgICAgIHRoaXMudmFsXG4gICAgICAgIClcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIHdhdGNoOiB7fSxcbiAgbWV0aG9kczoge1xuICAgIGdldENoZWNrZWQodmFsKSB7XG4gICAgICByZXR1cm4gaXNEZWVwRXF1YWwodGhpcy5tb2RlbCwgdmFsKVxuICAgIH0sXG4gIH0sXG4gIHJlbmRlcihoKSB7XG4gICAgbGV0IGNoZWNrZWQgPSB0aGlzLmNoZWNrZWRcbiAgICBsZXQgY29sb3JMYWJlbCA9IGNoZWNrZWQgJiYgdGhpcy5jb2xvckxhYmVsXG4gICAgbGV0IGNvbG9yUmFkaW8gPSBjaGVja2VkIHx8IHRoaXMua2VlcENvbG9yXG4gICAgbGV0IGdldExhYmVsID0gKCkgPT4gW2goJ2RpdicsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiAnc3ctcmFkaW9fX3RleHQgbWFyZ2luLW1pbicsXG4gICAgICBjbGFzczoge1xuICAgICAgICAnY29sb3ItcHJpbWFyeSc6IGNvbG9yTGFiZWwgPyB0aGlzLnByaW1hcnkgOiB2b2lkIDAsXG4gICAgICAgICdjb2xvci1uZWdhdGl2ZSc6IGNvbG9yTGFiZWwgPyB0aGlzLm5lZ2F0aXZlIDogdm9pZCAwLFxuICAgICAgICAnY29sb3ItcG9zaXRpdmUnOiBjb2xvckxhYmVsID8gdGhpcy5wb3NpdGl2ZSA6IHZvaWQgMCxcbiAgICAgICAgJ2NvbG9yLXdhcm5pbmcnOiBjb2xvckxhYmVsID8gdGhpcy53YXJuaW5nIDogdm9pZCAwXG4gICAgICB9LFxuICAgICAgc3R5bGU6IHtcbiAgICAgICAgY29sb3I6IGNvbG9yTGFiZWwgPyB0aGlzLmNvbG9yIDogdm9pZCAwXG4gICAgICB9XG4gICAgfSwgdGhpcy5sYWJlbCldXG5cbiAgICByZXR1cm4gaCgnc3ctaXRlbScsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiAnc3ctcmFkaW8nLFxuICAgICAgcmVmOiAncmFkaW8nLFxuICAgICAgY2xhc3M6IHtcbiAgICAgICAgZGlzYWJsZTogdGhpcy5kaXNhYmxlZCB8fCB0aGlzLnBhcmVudERpc2FibGVkXG4gICAgICB9LFxuICAgICAgbmF0aXZlT246IHRoaXMuZGlzYWJsZWQgPyB2b2lkIDAgOiB7XG4gICAgICAgIGNsaWNrOiAoKSA9PiB7XG4gICAgICAgICAgaWYgKGNoZWNrZWQpIHsgcmV0dXJuIH1cbiAgICAgICAgICB0aGlzLmNoZWNrZWQgPSB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzY29wZWRTbG90czoge1xuICAgICAgICBiZWZvcmU6IHRoaXMubGFiZWwgJiYgdGhpcy5sZWZ0TGFiZWwgPyBnZXRMYWJlbCA6IHZvaWQgMCxcbiAgICAgICAgZGVmYXVsdDogKCkgPT4gW2goJ3N3LWljb24nLCB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6ICdtYXJnaW4tbWluJyxcbiAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgb3BhY2l0eTogY2hlY2tlZCA/IDEgOiAwLjZcbiAgICAgICAgICB9LFxuICAgICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICBzaXplOiAnMjBweCcsXG4gICAgICAgICAgICBuYW1lOiBjaGVja2VkID8gJ3JhZGlvX2J1dHRvbl9jaGVja2VkJyA6ICdyYWRpb19idXR0b25fdW5jaGVja2VkJyxcbiAgICAgICAgICAgIGNvbG9yOiBjb2xvclJhZGlvID8gdGhpcy5jb2xvciA6IHZvaWQgMCxcbiAgICAgICAgICAgIHByaW1hcnk6IGNvbG9yUmFkaW8gPyB0aGlzLnByaW1hcnkgOiB2b2lkIDAsXG4gICAgICAgICAgICBuZWdhdGl2ZTogY29sb3JSYWRpbyA/IHRoaXMubmVnYXRpdmUgOiB2b2lkIDAsXG4gICAgICAgICAgICBwb3NpdGl2ZTogY29sb3JSYWRpbyA/IHRoaXMucG9zaXRpdmUgOiB2b2lkIDAsXG4gICAgICAgICAgICB3YXJuaW5nOiBjb2xvclJhZGlvID8gdGhpcy53YXJuaW5nIDogdm9pZCAwXG4gICAgICAgICAgfVxuICAgICAgICB9KV0sXG4gICAgICAgIGFmdGVyOiB0aGlzLmxhYmVsICYmICF0aGlzLmxlZnRMYWJlbCA/IGdldExhYmVsIDogdm9pZCAwXG4gICAgICB9XG4gICAgfSlcbiAgfVxufSIsImltcG9ydCBSYWRpbyBmcm9tICcuL3NyYy9tYWluLmpzJ1xuXG5jb25zdCBpbnN0YWxsID0gZnVuY3Rpb24gKFZ1ZSkge1xuICBWdWUuY29tcG9uZW50KFJhZGlvLm5hbWUsIFJhZGlvKVxufVxuXG5SYWRpby5pbnN0YWxsID0gaW5zdGFsbFxuXG5leHBvcnQgZGVmYXVsdCBSYWRpb1xuIiwiaW1wb3J0IEZpZWxkIGZyb20gJy4uLy4uL2ZpZWxkJ1xuaW1wb3J0IFNodXR0bGVNaXhpbiBmcm9tICcuLi8uLi8uLi9taXhpbnMvc2h1dHRsZSdcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnc3dSYWRpb0dyb3VwJyxcbiAgbWl4aW5zOiBbRmllbGQsIFNodXR0bGVNaXhpbl0sIC8vIGZvY3VzZWQsZGlzYWJsZWQsc2h1dHRsZVJlZlxuICBwcm9wczoge1xuICAgIHZhbHVlOiB7XG4gICAgICByZXF1aXJlZDogdHJ1ZVxuICAgIH1cbiAgfSxcbiAgZGF0YTogKCkgPT4gKHtcbiAgICBpbm5lclBvaW50ZXI6IHRydWUsXG4gICAgc2h1dHRsZVJlZjogJ3JhZGlvJ1xuICB9KSxcbiAgY29tcHV0ZWQ6IHt9LFxuICB3YXRjaDoge30sXG4gIG1ldGhvZHM6IHt9XG59IiwiaW1wb3J0IFJhZGlvR3JvdXAgZnJvbSAnLi9zcmMvbWFpbi5qcydcblxuY29uc3QgaW5zdGFsbCA9IGZ1bmN0aW9uIChWdWUpIHtcbiAgVnVlLmNvbXBvbmVudChSYWRpb0dyb3VwLm5hbWUsIFJhZGlvR3JvdXApXG59XG5cblJhZGlvR3JvdXAuaW5zdGFsbCA9IGluc3RhbGxcblxuZXhwb3J0IGRlZmF1bHQgUmFkaW9Hcm91cFxuIiwiLyoqXG4gKlxuICpcbiAqIEBwYXJhbSB7Kn0gdG90YWwgIOWIhumhteaAu+aVsFxuICogQHBhcmFtIHsqfSBjdXIgIOW9k+WJjemhtemdoiAgM1xuICogQHBhcmFtIHsqfSBhcm91bmQgICAxIDIgMyA0IDUgICBhcm91bmQgPSAyXG4gKiBAcmV0dXJuc1xuICovXG5jb25zdCBtYWtlUmVzdWx0ID0gKHRvdGFsLGN1cixhcm91bmQpID0+IHtcbiAgbGV0IHJlc3VsdCA9IFtdO1xuICBsZXQgYmFzZUNvdW50ID0gYXJvdW5kICogMiArIDEgKyAyICsgMiArIDI7IC8v5oC75YWx5YWD57Sg5Liq5pWwXG4gIGxldCBzdXJwbHVzID0gYmFzZUNvdW50IC0gNDsgLy/lj6rlh7rnjrDkuIDkuKrnnIHnlaXlj7cg5Ymp5L2Z5YWD57Sg5Liq5pWwXG4gIGxldCBzdGFydFBvc2l0aW9uID0gMSArIDIgKyBhcm91bmQsZW5kUG9zaXRpb24gPSB0b3RhbCAtIDIgLSBhcm91bmQ7XG5cbiAgaWYodG90YWwgPD0gYmFzZUNvdW50IC0gMil7IC8v5YWo6YOo5pi+56S6IOS4jeWHuueOsOecgeeVpeWPt1xuICAgICAgcmVzdWx0ID0gIEFycmF5LmZyb20oe2xlbmd0aDogdG90YWx9LCAodiwgaSkgPT4gaSArIDEpO1xuICB9ZWxzZXsgLy/pnIDopoHlh7rnjrDnnIHnlaXlj7dcbiAgICAgIGlmKGN1ciA8PSBzdGFydFBvc2l0aW9uKXsgLy8xLuWPquacieWQjumdouWHuueOsOecgeeVpeWPt1xuICAgICAgICAgIHJlc3VsdCA9IFsuLi5BcnJheS5mcm9tKHtsZW5ndGg6IHN1cnBsdXN9LCAodiwgaSkgPT4gaSArIDEpLFwiwrfCt8K3XCIsdG90YWxdXG4gICAgICB9ZWxzZSBpZihjdXIgPj0gZW5kUG9zaXRpb24pIHsgLy8yLuWPquacieWJjei+ueWHuueOsOecgeeVpeWPt1xuICAgICAgICAgIHJlc3VsdCA9IFsxLCfCt8K3wrcnLC4uLkFycmF5LmZyb20oe2xlbmd0aDogc3VycGx1c30sICh2LCBpKSA9PiB0b3RhbCAtIHN1cnBsdXMgKyBpICsgMSldXG4gICAgICB9ZWxzZXsgLy8zLuS4pOi+uemDveacieecgeeVpeWPt1xuICAgICAgICAgIHJlc3VsdCA9IFsxLCfCt8K3wrcnLC4uLkFycmF5LmZyb20oe2xlbmd0aDogYXJvdW5kICogMiArIDF9LCAodiwgaSkgPT4gY3VyIC0gYXJvdW5kICsgaSksJ8K3wrfCtycsdG90YWxdXG4gICAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0XG59XG5cbmV4cG9ydCBkZWZhdWx0IG1ha2VSZXN1bHQiLCI8dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJzdy1wYWdpbmF0aW9uXCI+XG4gICAgPGRpdiBjbGFzcz1cInN3LXBhZ2luYXRpb24tdG90YWxcIiB2LWlmPVwibGF5b3V0LmluZGV4T2YoJ3RvdGFsJykgPiAtMVwiPiBcbiAgICAgIHt7YOWFsSR7dG90YWx95p2hYH19XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInN3LXBhZ2luYXRpb24tc2VsZWN0XCIgdi1pZj1cImxheW91dC5pbmRleE9mKCdzZWxlY3QnKSA+IC0xXCI+XG4gICAgICA8c3ctc2VsZWN0IHYtbW9kZWw9XCJwYWdlU2l6ZVZhbHVlXCIgOm9wdGlvbnM9XCJzZWxlY3RPcHRpb25cIiBzZWxlY3RlZEZpbGxlZCBib3JkZXJlZCBtaW5pIHNlbGVjdGVkU3R5bGU9XCJub25lXCI+PC9zdy1zZWxlY3Q+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInN3LXBhZ2luYXRpb24tcGFnZVwiPlxuICAgICAgPHNwYW4gY2xhc3M9XCJzdy1wYWdpbmF0aW9uLXBhZ2UtaXRlbVwiIEBjbGljaz1cImhhbmRsZUNsaWNrQXJyb3coJ2xlZnQnKVwiPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgc3ctcGFnaW5hdGlvbi1wYWdlLWl0ZW0taWNvblwiPmtleWJvYXJkX2Fycm93X2xlZnQ8L2k+PC9zcGFuPlxuICAgICAgPHNwYW4gdi1mb3I9XCIoaXRlbSwgaW5kZXgpIGluIHBhZ2luYXRpb25MaXN0XCIgOmNsYXNzPVwiWydzdy1wYWdpbmF0aW9uLXBhZ2UtaXRlbScsIGN1cnJlbnRQYWdlVmFsdWUgPT09IGl0ZW0gPyAnYWN0aXZlJyA6ICcnXVwiIEBjbGljaz1cImhhbmRsZUNsaWNrUGFnZShpdGVtLCBpbmRleClcIj5cbiAgICAgICAgPGkgdi1pZj1cIml0ZW0gPT09ICfCt8K3wrcnXCIgY2xhc3M9XCJtYXRlcmlhbC1pY29ucyBzdy1wYWdpbmF0aW9uLXBhZ2UtaXRlbS1pY29uXCI+bW9yZV9ob3JpejwvaT5cbiAgICAgICAgPHNwYW4gdi1lbHNlPlxuICAgICAgICAgIHt7aXRlbX19XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwic3ctcGFnaW5hdGlvbi1wYWdlLWl0ZW1cIiBAY2xpY2s9XCJoYW5kbGVDbGlja0Fycm93KCdyaWdodCcpXCI+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29ucyBzdy1wYWdpbmF0aW9uLXBhZ2UtaXRlbS1pY29uXCI+a2V5Ym9hcmRfYXJyb3dfcmlnaHQ8L2k+PC9zcGFuPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJzdy1wYWdpbmF0aW9uLWdvdG9cIiB2LWlmPVwibGF5b3V0LmluZGV4T2YoJ2dvdG8nKSA+IC0xXCI+XG4gICAgICA8c3Bhbj7liY3lvoA8L3NwYW4+XG4gICAgICA8ZGl2IGNsYXNzPVwic3ctcGFnaW5hdGlvbi1nb3RvLWlucHV0XCI+XG4gICAgICAgIDxzdy1pbnB1dCBib3JkZXJlZCB2LW1vZGVsPSdpbnB1dFZhbHVlJyBAa2V5dXAuZW50ZXIubmF0aXZlPVwiaGFuZGxlRW50ZXJHb3RvXCIgbWluaSBzdHlsZT1cIndpZHRoOjQwcHhcIj48L3N3LWlucHV0PlxuICAgICAgPC9kaXY+XG4gICAgICA8c3Bhbj7pobU8L3NwYW4+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCBzd1NlbGVjdCBmcm9tICcuLi8uLi9zZWxlY3QvaW5kZXgnXG5pbXBvcnQgbWFrZVJlc3VsdCBmcm9tICcuL3BhZ2luYXRpb24nXG5pbXBvcnQgc3dJbnB1dCBmcm9tICcuLi8uLi9pbnB1dC9pbmRleCdcbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3N3UGFnaW5hdGlvbicsXG4gIGRhdGEgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjdXJyZW50UGFnZVZhbHVlOiB0aGlzLmN1cnJlbnRQYWdlLFxuICAgICAgcGFnZVRvdGFsOiAnJyxcbiAgICAgIHBhZ2VTaXplVmFsdWU6IHRoaXMucGFnZVNpemUsXG4gICAgICBpbnB1dFZhbHVlOiAnMSdcbiAgICB9XG4gIH0sXG4gIHByb3BzOiB7XG4gICAgdG90YWw6IHtcbiAgICAgIHR5cGU6IE51bWJlclxuICAgIH0sXG4gICAgcGFnZVNpemU6IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIGRlZmF1bHQ6IDIwXG4gICAgfSxcbiAgICBvcHRpb25zOiB7XG4gICAgICB0eXBlOiBBcnJheSxcbiAgICAgIGRlZmF1bHQ6IFsyMCwgNDAsIDYwLCA4MF1cbiAgICB9LFxuICAgIGN1cnJlbnRQYWdlOiB7XG4gICAgICB0eXBlOiBOdW1iZXJcbiAgICB9LFxuICAgIGFyb3VuZDoge1xuICAgICAgdHlwZTogTnVtYmVyXG4gICAgfSxcbiAgICBsYXlvdXQ6IHtcbiAgICAgIHR5cGU6IFN0cmluZ1xuICAgIH1cbiAgfSxcbiAgd2F0Y2g6IHtcbiAgICBjdXJyZW50UGFnZVZhbHVlKCkge1xuICAgICAgdGhpcy4kZW1pdCgnY3VycmVudC1jaGFuZ2UnLCB0aGlzLmN1cnJlbnRQYWdlVmFsdWUpXG4gICAgfSxcbiAgICBwYWdlU2l6ZVZhbHVlKCkge1xuICAgICAgdGhpcy4kZW1pdCgnc2l6ZS1jaGFuZ2UnLCB0aGlzLnBhZ2VTaXplVmFsdWUpXG4gICAgfVxuICB9LFxuICBjb21wdXRlZDoge1xuICAgIHNlbGVjdE9wdGlvbigpIHtcbiAgICAgIGxldCBhcnkgPSBbXVxuICAgICAgdGhpcy5vcHRpb25zLm1hcChpPT57XG4gICAgICAgIGxldCBpdGVtID0ge31cbiAgICAgICAgaXRlbS5uYW1lID0gYCR7aX3mnaEv6aG1YFxuICAgICAgICBpdGVtLnZhbHVlID0gaVxuICAgICAgICBhcnkucHVzaChpdGVtKVxuICAgICAgfSlcbiAgICAgIHJldHVybiBhcnlcbiAgICB9LFxuICAgIHBhZ2luYXRpb25MaXN0KCkge1xuICAgICAgbGV0IHBhZ2VUb3RhbCA9IHRoaXMucGFnZVRvdGFsID0gdGhpcy50b3RhbCAvIHRoaXMucGFnZVNpemVWYWx1ZVxuICAgICAgaWYgKGAke3BhZ2VUb3RhbH1gLmluZGV4T2YoJy4nKSA+IC0xKSB7XG4gICAgICAgIHBhZ2VUb3RhbCA9IHRoaXMucGFnZVRvdGFsID0gcGFyc2VJbnQocGFnZVRvdGFsICsgMSlcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmN1cnJlbnRQYWdlVmFsdWUgPiBwYWdlVG90YWwpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50UGFnZVZhbHVlID0gcGFnZVRvdGFsXG4gICAgICB9XG4gICAgICBsZXQgcGFnZUxpc3QgPSBtYWtlUmVzdWx0KHBhZ2VUb3RhbCwgdGhpcy5jdXJyZW50UGFnZVZhbHVlLCB0aGlzLmFyb3VuZClcbiAgICAgIHJldHVybiBwYWdlTGlzdFxuICAgIH1cbiAgfSxcbiAgY29tcG9uZW50czoge1xuICAgIHN3U2VsZWN0LFxuICAgIHN3SW5wdXRcbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGhhbmRsZUVudGVyR290bygpIHtcbiAgICAgIGxldCBwYWdlID0gcGFyc2VJbnQodGhpcy5pbnB1dFZhbHVlKVxuICAgICAgaWYgKHBhZ2UgPCAxKSB7XG4gICAgICAgIHRoaXMuaW5wdXRWYWx1ZSA9ICcxJ1xuICAgICAgfVxuICAgICAgaWYgKHBhZ2UgPiB0aGlzLnBhZ2VUb3RhbCkge1xuICAgICAgICB0aGlzLmlucHV0VmFsdWUgPSBgJHt0aGlzLnBhZ2VUb3RhbH1gXG4gICAgICB9XG4gICAgICB0aGlzLmN1cnJlbnRQYWdlVmFsdWUgPSBwYXJzZUludCh0aGlzLmlucHV0VmFsdWUpXG4gICAgICB0aGlzLmlucHV0VmFsdWUgPSBgJHtwYXJzZUludCh0aGlzLmlucHV0VmFsdWUpfWBcbiAgICB9LFxuICAgIGhhbmRsZUNsaWNrUGFnZShpdGVtLCBpbmRleCl7XG4gICAgICBpZiAoaXRlbSA9PT0gJ8K3wrfCtycpIHtcbiAgICAgICAgaWYoaW5kZXggPT09IDEpe1xuICAgICAgICAgIHRoaXMuY3VycmVudFBhZ2VWYWx1ZSA9IDNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRQYWdlVmFsdWUgPSB0aGlzLnBhZ2VUb3RhbCAtIDJcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jdXJyZW50UGFnZVZhbHVlID0gaXRlbVxuICAgICAgfVxuICAgIH0sXG4gICAgaGFuZGxlQ2xpY2tBcnJvdyhwYXJhbXMpIHtcbiAgICAgIGlmIChwYXJhbXMgPT09ICdsZWZ0Jykge1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50UGFnZVZhbHVlICE9PSAxKSB7XG4gICAgICAgICAgdGhpcy5jdXJyZW50UGFnZVZhbHVlID0gdGhpcy5jdXJyZW50UGFnZVZhbHVlIC0gMVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRQYWdlVmFsdWUgPSAxXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRQYWdlVmFsdWUgIT09IHRoaXMucGFnZVRvdGFsKSB7XG4gICAgICAgICAgdGhpcy5jdXJyZW50UGFnZVZhbHVlID0gdGhpcy5jdXJyZW50UGFnZVZhbHVlICsgMVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY3VycmVudFBhZ2VWYWx1ZSA9IHRoaXMucGFnZVRvdGFsXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48c3R5bGU+XG5cbjwvc3R5bGU+XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZUNvbXBvbmVudCh0ZW1wbGF0ZSwgc3R5bGUsIHNjcmlwdCwgc2NvcGVJZCwgaXNGdW5jdGlvbmFsVGVtcGxhdGUsIG1vZHVsZUlkZW50aWZpZXJcbi8qIHNlcnZlciBvbmx5ICovXG4sIHNoYWRvd01vZGUsIGNyZWF0ZUluamVjdG9yLCBjcmVhdGVJbmplY3RvclNTUiwgY3JlYXRlSW5qZWN0b3JTaGFkb3cpIHtcbiAgaWYgKHR5cGVvZiBzaGFkb3dNb2RlICE9PSAnYm9vbGVhbicpIHtcbiAgICBjcmVhdGVJbmplY3RvclNTUiA9IGNyZWF0ZUluamVjdG9yO1xuICAgIGNyZWF0ZUluamVjdG9yID0gc2hhZG93TW9kZTtcbiAgICBzaGFkb3dNb2RlID0gZmFsc2U7XG4gIH0gLy8gVnVlLmV4dGVuZCBjb25zdHJ1Y3RvciBleHBvcnQgaW50ZXJvcC5cblxuXG4gIHZhciBvcHRpb25zID0gdHlwZW9mIHNjcmlwdCA9PT0gJ2Z1bmN0aW9uJyA/IHNjcmlwdC5vcHRpb25zIDogc2NyaXB0OyAvLyByZW5kZXIgZnVuY3Rpb25zXG5cbiAgaWYgKHRlbXBsYXRlICYmIHRlbXBsYXRlLnJlbmRlcikge1xuICAgIG9wdGlvbnMucmVuZGVyID0gdGVtcGxhdGUucmVuZGVyO1xuICAgIG9wdGlvbnMuc3RhdGljUmVuZGVyRm5zID0gdGVtcGxhdGUuc3RhdGljUmVuZGVyRm5zO1xuICAgIG9wdGlvbnMuX2NvbXBpbGVkID0gdHJ1ZTsgLy8gZnVuY3Rpb25hbCB0ZW1wbGF0ZVxuXG4gICAgaWYgKGlzRnVuY3Rpb25hbFRlbXBsYXRlKSB7XG4gICAgICBvcHRpb25zLmZ1bmN0aW9uYWwgPSB0cnVlO1xuICAgIH1cbiAgfSAvLyBzY29wZWRJZFxuXG5cbiAgaWYgKHNjb3BlSWQpIHtcbiAgICBvcHRpb25zLl9zY29wZUlkID0gc2NvcGVJZDtcbiAgfVxuXG4gIHZhciBob29rO1xuXG4gIGlmIChtb2R1bGVJZGVudGlmaWVyKSB7XG4gICAgLy8gc2VydmVyIGJ1aWxkXG4gICAgaG9vayA9IGZ1bmN0aW9uIGhvb2soY29udGV4dCkge1xuICAgICAgLy8gMi4zIGluamVjdGlvblxuICAgICAgY29udGV4dCA9IGNvbnRleHQgfHwgLy8gY2FjaGVkIGNhbGxcbiAgICAgIHRoaXMuJHZub2RlICYmIHRoaXMuJHZub2RlLnNzckNvbnRleHQgfHwgLy8gc3RhdGVmdWxcbiAgICAgIHRoaXMucGFyZW50ICYmIHRoaXMucGFyZW50LiR2bm9kZSAmJiB0aGlzLnBhcmVudC4kdm5vZGUuc3NyQ29udGV4dDsgLy8gZnVuY3Rpb25hbFxuICAgICAgLy8gMi4yIHdpdGggcnVuSW5OZXdDb250ZXh0OiB0cnVlXG5cbiAgICAgIGlmICghY29udGV4dCAmJiB0eXBlb2YgX19WVUVfU1NSX0NPTlRFWFRfXyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgY29udGV4dCA9IF9fVlVFX1NTUl9DT05URVhUX187XG4gICAgICB9IC8vIGluamVjdCBjb21wb25lbnQgc3R5bGVzXG5cblxuICAgICAgaWYgKHN0eWxlKSB7XG4gICAgICAgIHN0eWxlLmNhbGwodGhpcywgY3JlYXRlSW5qZWN0b3JTU1IoY29udGV4dCkpO1xuICAgICAgfSAvLyByZWdpc3RlciBjb21wb25lbnQgbW9kdWxlIGlkZW50aWZpZXIgZm9yIGFzeW5jIGNodW5rIGluZmVyZW5jZVxuXG5cbiAgICAgIGlmIChjb250ZXh0ICYmIGNvbnRleHQuX3JlZ2lzdGVyZWRDb21wb25lbnRzKSB7XG4gICAgICAgIGNvbnRleHQuX3JlZ2lzdGVyZWRDb21wb25lbnRzLmFkZChtb2R1bGVJZGVudGlmaWVyKTtcbiAgICAgIH1cbiAgICB9OyAvLyB1c2VkIGJ5IHNzciBpbiBjYXNlIGNvbXBvbmVudCBpcyBjYWNoZWQgYW5kIGJlZm9yZUNyZWF0ZVxuICAgIC8vIG5ldmVyIGdldHMgY2FsbGVkXG5cblxuICAgIG9wdGlvbnMuX3NzclJlZ2lzdGVyID0gaG9vaztcbiAgfSBlbHNlIGlmIChzdHlsZSkge1xuICAgIGhvb2sgPSBzaGFkb3dNb2RlID8gZnVuY3Rpb24gKCkge1xuICAgICAgc3R5bGUuY2FsbCh0aGlzLCBjcmVhdGVJbmplY3RvclNoYWRvdyh0aGlzLiRyb290LiRvcHRpb25zLnNoYWRvd1Jvb3QpKTtcbiAgICB9IDogZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICAgIHN0eWxlLmNhbGwodGhpcywgY3JlYXRlSW5qZWN0b3IoY29udGV4dCkpO1xuICAgIH07XG4gIH1cblxuICBpZiAoaG9vaykge1xuICAgIGlmIChvcHRpb25zLmZ1bmN0aW9uYWwpIHtcbiAgICAgIC8vIHJlZ2lzdGVyIGZvciBmdW5jdGlvbmFsIGNvbXBvbmVudCBpbiB2dWUgZmlsZVxuICAgICAgdmFyIG9yaWdpbmFsUmVuZGVyID0gb3B0aW9ucy5yZW5kZXI7XG5cbiAgICAgIG9wdGlvbnMucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyV2l0aFN0eWxlSW5qZWN0aW9uKGgsIGNvbnRleHQpIHtcbiAgICAgICAgaG9vay5jYWxsKGNvbnRleHQpO1xuICAgICAgICByZXR1cm4gb3JpZ2luYWxSZW5kZXIoaCwgY29udGV4dCk7XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBpbmplY3QgY29tcG9uZW50IHJlZ2lzdHJhdGlvbiBhcyBiZWZvcmVDcmVhdGUgaG9va1xuICAgICAgdmFyIGV4aXN0aW5nID0gb3B0aW9ucy5iZWZvcmVDcmVhdGU7XG4gICAgICBvcHRpb25zLmJlZm9yZUNyZWF0ZSA9IGV4aXN0aW5nID8gW10uY29uY2F0KGV4aXN0aW5nLCBob29rKSA6IFtob29rXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc2NyaXB0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5vcm1hbGl6ZUNvbXBvbmVudDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW5vcm1hbGl6ZS1jb21wb25lbnQuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBpc09sZElFID0gdHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgL21zaWUgWzYtOV1cXFxcYi8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpO1xuZnVuY3Rpb24gY3JlYXRlSW5qZWN0b3IoY29udGV4dCkge1xuICByZXR1cm4gZnVuY3Rpb24gKGlkLCBzdHlsZSkge1xuICAgIHJldHVybiBhZGRTdHlsZShpZCwgc3R5bGUpO1xuICB9O1xufVxudmFyIEhFQUQgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG52YXIgc3R5bGVzID0ge307XG5cbmZ1bmN0aW9uIGFkZFN0eWxlKGlkLCBjc3MpIHtcbiAgdmFyIGdyb3VwID0gaXNPbGRJRSA/IGNzcy5tZWRpYSB8fCAnZGVmYXVsdCcgOiBpZDtcbiAgdmFyIHN0eWxlID0gc3R5bGVzW2dyb3VwXSB8fCAoc3R5bGVzW2dyb3VwXSA9IHtcbiAgICBpZHM6IG5ldyBTZXQoKSxcbiAgICBzdHlsZXM6IFtdXG4gIH0pO1xuXG4gIGlmICghc3R5bGUuaWRzLmhhcyhpZCkpIHtcbiAgICBzdHlsZS5pZHMuYWRkKGlkKTtcbiAgICB2YXIgY29kZSA9IGNzcy5zb3VyY2U7XG5cbiAgICBpZiAoY3NzLm1hcCkge1xuICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIuY2hyb21lLmNvbS9kZXZ0b29scy9kb2NzL2phdmFzY3JpcHQtZGVidWdnaW5nXG4gICAgICAvLyB0aGlzIG1ha2VzIHNvdXJjZSBtYXBzIGluc2lkZSBzdHlsZSB0YWdzIHdvcmsgcHJvcGVybHkgaW4gQ2hyb21lXG4gICAgICBjb2RlICs9ICdcXG4vKiMgc291cmNlVVJMPScgKyBjc3MubWFwLnNvdXJjZXNbMF0gKyAnICovJzsgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcblxuICAgICAgY29kZSArPSAnXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCwnICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzLm1hcCkpKSkgKyAnICovJztcbiAgICB9XG5cbiAgICBpZiAoIXN0eWxlLmVsZW1lbnQpIHtcbiAgICAgIHN0eWxlLmVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgc3R5bGUuZWxlbWVudC50eXBlID0gJ3RleHQvY3NzJztcbiAgICAgIGlmIChjc3MubWVkaWEpIHN0eWxlLmVsZW1lbnQuc2V0QXR0cmlidXRlKCdtZWRpYScsIGNzcy5tZWRpYSk7XG4gICAgICBIRUFELmFwcGVuZENoaWxkKHN0eWxlLmVsZW1lbnQpO1xuICAgIH1cblxuICAgIGlmICgnc3R5bGVTaGVldCcgaW4gc3R5bGUuZWxlbWVudCkge1xuICAgICAgc3R5bGUuc3R5bGVzLnB1c2goY29kZSk7XG4gICAgICBzdHlsZS5lbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IHN0eWxlLnN0eWxlcy5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBpbmRleCA9IHN0eWxlLmlkcy5zaXplIC0gMTtcbiAgICAgIHZhciB0ZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNvZGUpO1xuICAgICAgdmFyIG5vZGVzID0gc3R5bGUuZWxlbWVudC5jaGlsZE5vZGVzO1xuICAgICAgaWYgKG5vZGVzW2luZGV4XSkgc3R5bGUuZWxlbWVudC5yZW1vdmVDaGlsZChub2Rlc1tpbmRleF0pO1xuICAgICAgaWYgKG5vZGVzLmxlbmd0aCkgc3R5bGUuZWxlbWVudC5pbnNlcnRCZWZvcmUodGV4dE5vZGUsIG5vZGVzW2luZGV4XSk7ZWxzZSBzdHlsZS5lbGVtZW50LmFwcGVuZENoaWxkKHRleHROb2RlKTtcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVJbmplY3Rvcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJyb3dzZXIuanMubWFwXG4iLCJpbXBvcnQgUGFnaW5hdGlvbiBmcm9tICcuL3NyYy9tYWluLnZ1ZSdcblxuY29uc3QgaW5zdGFsbCA9IGZ1bmN0aW9uIChWdWUpIHtcbiAgVnVlLmNvbXBvbmVudChQYWdpbmF0aW9uLm5hbWUsIFBhZ2luYXRpb24pXG59XG5cblBhZ2luYXRpb24uaW5zdGFsbCA9IGluc3RhbGxcblxuZXhwb3J0IGRlZmF1bHQgUGFnaW5hdGlvblxuIiwiXG5leHBvcnQgZGVmYXVsdCB7XG4gIGRhdGE6ICgpID0+ICh7XG4gICAgb2JzZXJ2ZXI6IHZvaWQgMCxcbiAgICBtZWFzdXJlZFdpZHRoOiB2b2lkIDBcbiAgfSksXG4gIGNvbXB1dGVkOiB7XG4gICAgdGFyZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuaG9yaXpvbnRhbCA/ICd3aWR0aCcgOiAnaGVpZ2h0J1xuICAgIH0sXG4gICAgbWVhc3VyZVRhcmdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmhvcml6b250YWwgPyAnb2Zmc2V0V2lkdGgnIDogJ29mZnNldEhlaWdodCdcbiAgICB9LFxuICAgIG1pblNpemUoKSB7XG4gICAgICByZXR1cm4gdGhpcy5taW4gIT09IHZvaWQgMCA/IGAke3RoaXMubWlufXB4YCA6IDBcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBpbml0U3R5bGUoKSB7XG4gICAgICBpZiAodGhpcy5pbm5lckNvbGxhcHNlZCkge1xuICAgICAgICB0aGlzLiRyZWZzLnNsaWRlLnN0eWxlW3RoaXMudGFyZ2V0XSA9IHRoaXMubWluU2l6ZVxuICAgICAgfVxuICAgIH0sXG4gICAgc2V0U3R5bGUocGFzc2l2ZSkge1xuICAgICAgbGV0IHNsaWRlVGFyZ2V0ID0gdGhpcy4kcmVmcy5zbGlkZVxuXG4gICAgICBpZiAocGFzc2l2ZSAmJiAhc2xpZGVUYXJnZXQuc3R5bGVbdGhpcy50YXJnZXRdKSB7IHJldHVybiB9XG4gICAgICBzbGlkZVRhcmdldC5zdHlsZVt0aGlzLnRhcmdldF0gPSBgJHt0aGlzLiRyZWZzLm9ic2VydmVbdGhpcy5tZWFzdXJlVGFyZ2V0XX1weGBcbiAgICAgIGlmICh0aGlzLmlubmVyQ29sbGFwc2VkKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHNsaWRlVGFyZ2V0LnN0eWxlW3RoaXMudGFyZ2V0XSA9IHRoaXMubWluU2l6ZVxuICAgICAgICB9LCAwKVxuICAgICAgfVxuICAgIH0sXG4gICAgY2xlYXJVcHBlclN0eWxlKHVwcGVyKSB7XG4gICAgICBsZXQgdXBwZXJTbGlkZVRhcmdldCA9IHVwcGVyLiRyZWZzLnNsaWRlXG5cbiAgICAgIGlmICh1cHBlclNsaWRlVGFyZ2V0KSB7XG4gICAgICAgIGlmICh1cHBlclNsaWRlVGFyZ2V0LnN0eWxlW3RoaXMudGFyZ2V0XSkge1xuICAgICAgICAgIHVwcGVyU2xpZGVUYXJnZXQuc3R5bGVbdGhpcy50YXJnZXRdID0gbnVsbFxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodXBwZXIuJHBhcmVudCAmJiB1cHBlci4kcGFyZW50LiRyZWZzKSB7XG4gICAgICAgIHRoaXMuY2xlYXJVcHBlclN0eWxlKHVwcGVyLiRwYXJlbnQpXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBtb3VudGVkKCkge1xuICAgIGlmICghdGhpcy4kcmVmcy5zbGlkZSB8fCAhdGhpcy4kcmVmcy5vYnNlcnZlKSB7IHJldHVybiB9XG4gICAgdGhpcy4kd2F0Y2goXG4gICAgICAnaW5uZXJDb2xsYXBzZWQnLFxuICAgICAgKCkgPT4ge1xuICAgICAgICB0aGlzLmNsZWFyVXBwZXJTdHlsZSh0aGlzLiRwYXJlbnQpXG4gICAgICAgIHRoaXMuc2V0U3R5bGUoKVxuICAgICAgfSlcbiAgICB0aGlzLmluaXRTdHlsZSgpXG4gICAgdGhpcy5vYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgIHRoaXMuc2V0U3R5bGUodHJ1ZSlcbiAgICB9KVxuXG4gICAgdGhpcy5vYnNlcnZlci5vYnNlcnZlKHRoaXMuJHJlZnMub2JzZXJ2ZSwge1xuICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgc3VidHJlZTogdHJ1ZSxcbiAgICAgIGNoYXJhY3RlckRhdGE6IHRydWVcbiAgICB9KVxuICB9LFxuICBiZWZvcmVEZXN0cm95KCkge1xuICAgIHRoaXMub2JzZXJ2ZXIgJiYgdGhpcy5vYnNlcnZlci5kaXNjb25uZWN0KClcbiAgfVxufVxuICAiLCJpbXBvcnQgU2xpZGVPYnNlcnZlciBmcm9tICcuLi8uLi8uLi9taXhpbnMvc2xpZGVPYnNlcnZlcidcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnc3dTbGlkZScsXG4gIG1peGluczogW1NsaWRlT2JzZXJ2ZXJdLFxuICBwcm9wczoge1xuICAgIGNvbGxhcHNlZDogQm9vbGVhbixcbiAgICBob3Jpem9udGFsOiBCb29sZWFuLFxuICAgIGZpdDogQm9vbGVhbixcbiAgICBtaW46IE51bWJlciB8IFN0cmluZ1xuICB9LFxuICBkYXRhOiAoKSA9PiAoe1xuICAgIGlubmVyQ29sbGFwc2VkOiB0cnVlXG4gIH0pLFxuICB3YXRjaDoge1xuICAgIGNvbGxhcHNlZDoge1xuICAgICAgaGFuZGxlcigpIHtcbiAgICAgICAgdGhpcy5pbm5lckNvbGxhcHNlZCA9IHRoaXMuY29sbGFwc2VkXG4gICAgICB9LFxuICAgICAgaW1tZWRpYXRlOiB0cnVlXG4gICAgfVxuICB9LFxuICByZW5kZXIoaCkge1xuICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICByZWY6ICdzbGlkZScsXG4gICAgICBzdGF0aWNDbGFzczogJ3N3LXNsaWRlX19jb250YWluZXInLFxuICAgIH0sIFtcbiAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgcmVmOiAnb2JzZXJ2ZScsXG4gICAgICAgIHN0YXRpY0NsYXNzOiBgc3ctc2xpZGVfX2NvbnRlbnRgLFxuICAgICAgICBjbGFzczoge1xuICAgICAgICAgICdtaW4td2lkdGgnOiB0aGlzLmhvcml6b250YWwgJiYgIXRoaXMuZml0LFxuICAgICAgICAgICdmaXQtd2lkdGgnOiB0aGlzLmhvcml6b250YWwgJiYgdGhpcy5maXQsXG4gICAgICAgICAgJ21pbi1oZWlnaHQnOiAhdGhpcy5ob3Jpem9udGFsICYmICF0aGlzLmZpdCxcbiAgICAgICAgICAnZml0LWhlaWdodCc6ICF0aGlzLmhvcml6b250YWwgJiYgdGhpcy5maXRcbiAgICAgICAgfVxuICAgICAgfSwgW3RoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQoKV0pXG4gICAgXSlcbiAgfVxufSIsImltcG9ydCBTbGlkZSBmcm9tICcuL3NyYy9tYWluLmpzJ1xuXG5jb25zdCBpbnN0YWxsID0gZnVuY3Rpb24gKFZ1ZSkge1xuICBWdWUuY29tcG9uZW50KFNsaWRlLm5hbWUsIFNsaWRlKVxufVxuXG5TbGlkZS5pbnN0YWxsID0gaW5zdGFsbFxuXG5leHBvcnQgZGVmYXVsdCBTbGlkZVxuIiwiaW1wb3J0IFNsaWRlIGZyb20gJy4uLy4uL3NsaWRlJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdzd0Jhc2ljSXRlbScsXG4gIGNvbXBvbmVudHM6IHsgU2xpZGUgfSxcbiAgcHJvcHM6IHtcbiAgICBjb250ZW50OiBTdHJpbmcsXG4gICAgc3ViQ29udGVudDogU3RyaW5nLFxuICAgIGljb246IFN0cmluZyxcbiAgICBkaXNhYmxlZDogQm9vbGVhbixcbiAgICBjb2xvcjogU3RyaW5nLFxuICAgIHByaW1hcnk6IEJvb2xlYW4sXG4gICAgbmVnYXRpdmU6IEJvb2xlYW4sXG4gICAgcG9zaXRpdmU6IEJvb2xlYW4sXG4gICAgd2FybmluZzogQm9vbGVhbixcbiAgICBjb2xsYXBzZWQ6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiB0cnVlXG4gICAgfSxcbiAgICBzcGxpdDogQm9vbGVhbixcbiAgICBtaW5pOiBCb29sZWFuLFxuICAgIHRvOiBTdHJpbmcgfCBPYmplY3QsXG4gICAgaW5kZW50TGV2ZWw6IE51bWJlciB8IFN0cmluZyxcbiAgICBjZW50ZXI6IEJvb2xlYW4sXG4gICAgZW5kOiBCb29sZWFuLFxuICAgIG1pbjogTnVtYmVyIHwgU3RyaW5nLFxuICAgIG1hc2s6IE9iamVjdCB8IEJvb2xlYW4sXG4gICAgcmlwcGxlOiBPYmplY3QgfCBCb29sZWFuLFxuICAgIHN1YjogQXJyYXlcbiAgfSxcbiAgZGF0YTogKCkgPT4gKHtcbiAgICBpbm5lckNvbGxhcHNlZDogdHJ1ZSxcbiAgICBtb3VzZW92ZXI6IGZhbHNlXG4gIH0pLFxuICB3YXRjaDoge1xuICAgIGNvbGxhcHNlZDoge1xuICAgICAgaGFuZGxlcigpIHtcbiAgICAgICAgdGhpcy5pbm5lckNvbGxhcHNlZCA9IHRoaXMuY29sbGFwc2VkXG4gICAgICB9LFxuICAgICAgaW1tZWRpYXRlOiB0cnVlXG4gICAgfVxuICB9LFxuICByZW5kZXIoaCkge1xuICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICBzdGF0aWNDbGFzczogJ3N3LWJhc2ljLWl0ZW0nLFxuICAgICAgY2xhc3M6IHtcbiAgICAgICAgc3BsaXQ6IHRoaXMuc3BsaXQgJiYgIXRoaXMuaW5uZXJDb2xsYXBzZWRcbiAgICAgIH0sXG4gICAgICBvbjogdGhpcy5kaXNhYmxlZCA/IHZvaWQgMCA6IHtcbiAgICAgICAgLi4udGhpcy4kbGlzdGVuZXJzXG4gICAgICB9XG4gICAgfSwgW1xuICAgICAgaCgnZGl2Jywge1xuICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWJhc2ljLWl0ZW1fX21haW4nLFxuICAgICAgICBjbGFzczoge1xuICAgICAgICAgICdjb2xvci1wcmltYXJ5JzogIXRoaXMuZGlzYWJsZWQgJiYgdGhpcy5wcmltYXJ5LFxuICAgICAgICAgICdjb2xvci1uZWdhdGl2ZSc6ICF0aGlzLmRpc2FibGVkICYmIHRoaXMubmVnYXRpdmUsXG4gICAgICAgICAgJ2NvbG9yLXBvc2l0aXZlJzogIXRoaXMuZGlzYWJsZWQgJiYgdGhpcy5wb3NpdGl2ZSxcbiAgICAgICAgICAnY29sb3Itd2FybmluZyc6ICF0aGlzLmRpc2FibGVkICYmIHRoaXMud2FybmluZyxcbiAgICAgICAgICBkaXNhYmxlOiB0aGlzLmRpc2FibGVkXG4gICAgICAgIH0sXG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgY29sb3I6ICF0aGlzLmRpc2FibGVkICYmIHRoaXMuY29sb3JcbiAgICAgICAgfVxuICAgICAgfSwgW1xuICAgICAgICBoKCdzdy1pdGVtJywge1xuICAgICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctYmFzaWMtaXRlbV9faW5uZXInLFxuICAgICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICB0bzogdGhpcy50byxcbiAgICAgICAgICAgIGNlbnRlcjogdGhpcy5jZW50ZXIsXG4gICAgICAgICAgICBlbmQ6IHRoaXMuZW5kLFxuICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuZGlzYWJsZWQsXG4gICAgICAgICAgICBtYXNrOiB0aGlzLm1hc2ssXG4gICAgICAgICAgICByaXBwbGU6IHRoaXMucmlwcGxlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjbGFzczoge1xuICAgICAgICAgICAgZXhwYW5kOiAhdGhpcy5pbm5lckNvbGxhcHNlZFxuICAgICAgICAgIH0sXG4gICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICdwYWRkaW5nLWxlZnQnOiBgJHt0aGlzLmluZGVudExldmVsICogMTJ9cHhgLFxuICAgICAgICAgICAgY3Vyc29yOiAhdGhpcy5kaXNhYmxlZCAmJiAodGhpcy50byAhPT0gdm9pZCAwIHx8IHRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQgfHwgdGhpcy5zdWIgIT09IHZvaWQgMCkgPyAncG9pbnRlcicgOiB2b2lkIDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uOiB0aGlzLmRpc2FibGVkID8gdm9pZCAwIDoge1xuICAgICAgICAgICAgLi4udGhpcy4kbGlzdGVuZXJzLFxuICAgICAgICAgICAgY2xpY2s6ICgpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQgfHwgdGhpcy5zdWIgIT09IHZvaWQgMCkgeyB0aGlzLmlubmVyQ29sbGFwc2VkID0gIXRoaXMuaW5uZXJDb2xsYXBzZWQgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1vdXNlb3ZlcjogKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLm1vdXNlb3ZlciA9IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtb3VzZW91dDogKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLm1vdXNlb3ZlciA9IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBzY29wZWRTbG90czoge1xuICAgICAgICAgICAgYmVmb3JlOiB0aGlzLiRzY29wZWRTbG90cy5iZWZvcmUgIT09IHZvaWQgMCA/IHRoaXMuJHNjb3BlZFNsb3RzLmJlZm9yZVxuICAgICAgICAgICAgICA6IHRoaXMuaWNvbiAhPT0gdm9pZCAwID8gKCkgPT4gW2goJ3N3LWljb24nLCB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1iYXNpYy1pdGVtX19pY29uJyxcbiAgICAgICAgICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgICAgICAgbmFtZTogdGhpcy5pY29uXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KV0gOiB2b2lkIDAsXG4gIFxuICAgICAgICAgICAgZGVmYXVsdDogKCkgPT4gW2goJ2RpdicsIHtcbiAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1iYXNpYy1pdGVtX19jb250ZW50IGZsZXggaXRlbXMtY2VudGVyJyxcbiAgICAgICAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAgICAgICAnc3BhY2UtbGVmdCc6IHRoaXMuJHNjb3BlZFNsb3RzLmJlZm9yZSAhPT0gdm9pZCAwIHx8IHRoaXMuaWNvbiAhPT0gdm9pZCAwLFxuICAgICAgICAgICAgICAgICdzcGFjZS1yaWdodCc6ICh0aGlzLiRzY29wZWRTbG90cy5hZnRlciAhPT0gdm9pZCAwIHx8IHRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQgIT09IHZvaWQgMCB8fCB0aGlzLnN1YiAhPT0gdm9pZCAwKSAmJiAodGhpcy4kc2NvcGVkU2xvdHMuY29udGVudCAhPT0gdm9pZCAwIHx8IHRoaXMuY29udGVudCAhPT0gdm9pZCAwIHx8IHRoaXMuc3ViQ29udGVudCAhPT0gdm9pZCAwKVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgICdtaW4taGVpZ2h0JzogdGhpcy5taW5pID8gJzM2cHgnIDogJzQ4cHgnXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIHRoaXMuJHNjb3BlZFNsb3RzLmNvbnRlbnQgIT09IHZvaWQgMCA/IFt0aGlzLiRzY29wZWRTbG90cy5jb250ZW50KCldIDogW1xuICAgICAgICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6ICdkZWZhdWx0LWNvbnRlbnQnXG4gICAgICAgICAgICAgIH0sIFtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQgIT09IHZvaWQgMCA/IGgoJ2RpdicsIHtcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctYmFzaWMtaXRlbV9fbGFiZWwnXG4gICAgICAgICAgICAgICAgfSwgdGhpcy5jb250ZW50KSA6IHZvaWQgMCxcbiAgICAgICAgICAgICAgICB0aGlzLnN1YkNvbnRlbnQgIT09IHZvaWQgMCA/IGgoJ2RpdicsIHtcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctYmFzaWMtaXRlbV9fc3VibGFiZWwnXG4gICAgICAgICAgICAgICAgfSwgdGhpcy5zdWJDb250ZW50KSA6IHZvaWQgMFxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgXVxuICAgICAgICAgICAgKV0sXG4gIFxuICAgICAgICAgICAgYWZ0ZXI6IHRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQgfHwgdGhpcy5zdWIgIT09IHZvaWQgMCA/ICgpID0+IFtoKCdzdy1pY29uJywge1xuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWJhc2ljLWl0ZW1fX2V4cGFuc2lvbiBjb2xvci1ncmV5JyxcbiAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICF0aGlzLmlubmVyQ29sbGFwc2VkID8gJ3JvdGF0ZSgxODBkZWcpJyA6IHZvaWQgMCxcbiAgICAgICAgICAgICAgICBjb2xvcjogdGhpcy5tb3VzZW92ZXIgPyAnY3VycmVudENvbG9yJyA6IHZvaWQgMFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdrZXlib2FyZF9hcnJvd19kb3duJ1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KV0gOiB0aGlzLiRzY29wZWRTbG90cy5hZnRlciAhPT0gdm9pZCAwID8gdGhpcy4kc2NvcGVkU2xvdHMuYWZ0ZXJcbiAgICAgICAgICAgICAgOiB2b2lkIDBcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICBdKSxcbiAgICAgIHRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQgfHwgdGhpcy5zdWIgIT09IHZvaWQgMCA/IGgoU2xpZGUsIHtcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICBjb2xsYXBzZWQ6IHRoaXMuaW5uZXJDb2xsYXBzZWQsXG4gICAgICAgICAgbWluOiB0aGlzLm1pblxuICAgICAgICB9LFxuICAgICAgICBzY29wZWRTbG90czoge1xuICAgICAgICAgIGRlZmF1bHQ6ICgpID0+IHtcbiAgICAgICAgICAgIGxldCBzdWIgPSB0aGlzLnN1YiAhPT0gdm9pZCAwID8gdGhpcy5zdWIubWFwKHByb3BzID0+IHtcbiAgICAgICAgICAgICAgbGV0IHBvc2l0aW9uID0gISFwcm9wcy5jZW50ZXIgfHwgISFwcm9wcy5lbmQgfHwgZmFsc2VcblxuICAgICAgICAgICAgICByZXR1cm4gaCgnc3ctYmFzaWMtaXRlbScsIHtcbiAgICAgICAgICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgICAgICAgY29udGVudDogcHJvcHMuY29udGVudCxcbiAgICAgICAgICAgICAgICAgIHN1YkNvbnRlbnQ6IHByb3BzLnN1YkNvbnRlbnQsXG4gICAgICAgICAgICAgICAgICBpY29uOiBwcm9wcy5pY29uLFxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHByb3BzLmRpc2FibGVkLFxuICAgICAgICAgICAgICAgICAgY29sbGFwc2VkOiBwcm9wcy5jb2xsYXBzZWQsXG4gICAgICAgICAgICAgICAgICB0bzogcHJvcHMudG8sXG4gICAgICAgICAgICAgICAgICBzdWI6IHByb3BzLnN1YixcbiAgICAgICAgICAgICAgICAgIGNvbG9yOiBwcm9wcy5jb2xvcixcbiAgICAgICAgICAgICAgICAgIHByaW1hcnk6IHByb3BzLnByaW1hcnksXG4gICAgICAgICAgICAgICAgICBuZWdhdGl2ZTogcHJvcHMubmVnYXRpdmUsXG4gICAgICAgICAgICAgICAgICBwb3NpdGl2ZTogcHJvcHMucG9zaXRpdmUsXG4gICAgICAgICAgICAgICAgICB3YXJuaW5nOiBwcm9wcy53YXJuaW5nLFxuICAgICAgICAgICAgICAgICAgY2VudGVyOiBwb3NpdGlvbiA/IHByb3BzLmNlbnRlciA6IHRoaXMuY2VudGVyLFxuICAgICAgICAgICAgICAgICAgZW5kOiBwb3NpdGlvbiA/IHByb3BzLmVuZCA6IHRoaXMuZW5kLFxuICAgICAgICAgICAgICAgICAgc3BsaXQ6IHByb3BzLnNwbGl0IHx8IHRoaXMuc3BsaXQsXG4gICAgICAgICAgICAgICAgICBtaW5pOiBwcm9wcy5taW5pIHx8IHRoaXMubWluaSxcbiAgICAgICAgICAgICAgICAgIGluZGVudExldmVsOiBwcm9wcy5pbmRlbnRMZXZlbCB8fCB0aGlzLmluZGVudExldmVsLFxuICAgICAgICAgICAgICAgICAgbWluOiBwcm9wcy5taW4gfHwgdGhpcy5taW4sXG4gICAgICAgICAgICAgICAgICBtYXNrOiBwcm9wcy5tYXNrIHx8IHRoaXMubWFzayxcbiAgICAgICAgICAgICAgICAgIHJpcHBsZTogcHJvcHMucmlwcGxlIHx8IHRoaXMucmlwcGxlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSkgOiBbXVxuXG4gICAgICAgICAgICBzdWIudW5zaGlmdCh0aGlzLiRzY29wZWRTbG90cy5kZWZhdWx0ID8gdGhpcy4kc2NvcGVkU2xvdHMuZGVmYXVsdCgpIDogdm9pZCAwKVxuICAgICAgICAgICAgcmV0dXJuIHN1YlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSkgOiB2b2lkIDBcbiAgICBdKVxuICB9XG59XG4gICIsImltcG9ydCBCYXNpY0l0ZW0gZnJvbSAnLi9zcmMvbWFpbi5qcydcblxuY29uc3QgaW5zdGFsbCA9IGZ1bmN0aW9uIChWdWUpIHtcbiAgVnVlLmNvbXBvbmVudChCYXNpY0l0ZW0ubmFtZSwgQmFzaWNJdGVtKVxufVxuXG5CYXNpY0l0ZW0uaW5zdGFsbCA9IGluc3RhbGxcblxuZXhwb3J0IGRlZmF1bHQgQmFzaWNJdGVtXG4iLCJleHBvcnQgZnVuY3Rpb24gaGFzT3duKG9iaiwga2V5KSB7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KTtcbn07XG5leHBvcnQgZnVuY3Rpb24gaXNWTm9kZShub2RlKSB7XG4gIHJldHVybiBub2RlICE9PSBudWxsICYmIHR5cGVvZiBub2RlID09PSAnb2JqZWN0JyAmJiBoYXNPd24obm9kZSwgJ2NvbXBvbmVudE9wdGlvbnMnKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRGaXJzdENvbXBvbmVudENoaWxkKGNoaWxkcmVuKSB7XG4gIHJldHVybiBjaGlsZHJlbiAmJiBjaGlsZHJlbi5maWx0ZXIoYyA9PiBjICYmIGMudGFnKVswXTtcbn07IiwiLy8gPHRlbXBsYXRlPlxuLy8gICA8ZGl2PlxuLy8gICAgIDxidXR0b24gQGNsaWNrPVwiaGFuZGxlQnRuXCI+Y2xpY2s8L2J1dHRvbj5cbi8vICAgICA8dHJhbnNpdGlvbiBuYW1lPSdzdy1ub3RpZmljYXRpb24tZmFkZSc+XG4vLyAgICAgICA8ZGl2IHYtaWY9XCJzaG93XCIgY2xhc3M9XCJzdy1ub3RpZmljYXRpb25cIj5cbi8vICAgICAgICAgPGgyIGNsYXNzPVwidGl0bGVcIj5cbi8vICAgICAgICAgICDmj5DnpLoxMTExXG4vLyAgICAgICAgIDwvaDI+XG4vLyAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250ZW50XCI+XG4vLyAgICAgICAgICAg6L+Z5piv5LiA5p2h5raI5oGvXG4vLyAgICAgICAgIDwvZGl2PlxuLy8gICAgICAgICA8ZGl2IGNsYXNzPVwiY2xvc2VcIiBAY2xpY2s9XCJoYW5kbGVCdG5cIj5cbi8vICAgICAgICAgICA8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+Y2xvc2U8L2k+XG4vLyAgICAgICAgIDwvZGl2PlxuLy8gICAgICAgPC9kaXY+XG4vLyAgICAgPC90cmFuc2l0aW9uPlxuLy8gICA8L2Rpdj5cbi8vIDwvdGVtcGxhdGU+XG5pbXBvcnQgVm5vZGUsIHsgaXNWTm9kZSB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL3Zkb20nXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdzd05vdGlmaWNhdGlvbicsXG4gIGRhdGEgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzaG93OiBmYWxzZSxcbiAgICAgIHZlcnRpY2FsT2Zmc2V0OiAwLFxuICAgICAgb25DbG9zZTogbnVsbCxcbiAgICAgIHBvc2l0aW9uOiAndG9wLXJpZ2h0JyxcbiAgICAgIHRpdGxlOiAnJyxcbiAgICAgIGNvbnRlbnQ6ICcnLFxuICAgICAgc2xvdDogbnVsbCxcbiAgICAgIGJhY2tncm91bmQ6ICcjZmZmJyxcbiAgICAgIGNsb3NlQ29sb3I6ICcjOTA5Mzk5J1xuICAgIH1cbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGhhbmRsZUJ0bigpIHtcbiAgICAgIHRoaXMuc2hvdyA9IGZhbHNlXG4gICAgICBpZiAodHlwZW9mIHRoaXMub25DbG9zZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLm9uQ2xvc2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGNvbXB1dGVkOiB7XG4gICAgdmVydGljYWxQcm9wZXJ0eSgpIHtcbiAgICAgIHJldHVybiAvXnRvcC0vLnRlc3QodGhpcy5wb3NpdGlvbikgPyAndG9wJyA6ICdib3R0b20nO1xuICAgIH0sXG5cbiAgICBwb3NpdGlvblN0eWxlKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgW3RoaXMudmVydGljYWxQcm9wZXJ0eV06IGAkeyB0aGlzLnZlcnRpY2FsT2Zmc2V0IH1weGAsXG4gICAgICB9O1xuICAgIH0sXG4gICAgZ2V0Vm5vZGUoKSB7XG4gICAgICBpZiAoaXNWTm9kZSh0aGlzLnNsb3QpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNsb3RcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1BsZWFzZSBjaGVjayB5b3VyIFZub2RlIHdyaXRpbmcnKVxuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gIH0sXG4gIHJlbmRlcihoKSB7XG4gICByZXR1cm4gaCgndHJhbnNpdGlvbicse1xuICAgICAgYXR0cnM6IHtcbiAgICAgICAgbmFtZTogJ3N3LW5vdGlmaWNhdGlvbi1mYWRlJ1xuICAgICAgfVxuICAgIH0sIFt0aGlzLnNob3cgPyBoKCdkaXYnLCB7XG4gICAgICAgICAgICBjbGFzczogJ3N3LW5vdGlmaWNhdGlvbicsXG4gICAgICAgICAgICBzdHlsZTogT2JqZWN0LmFzc2lnbih0aGlzLnBvc2l0aW9uU3R5bGUsIHsgYmFja2dyb3VuZDogdGhpcy5iYWNrZ3JvdW5kIH0pXG4gICAgICAgICAgfSwgW1xuICAgICAgICAgICAgdGhpcy5nZXRWbm9kZSA/ICcnIDogaCgnaDInLCB7XG4gICAgICAgICAgICAgIGNsYXNzOiAndGl0bGUnXG4gICAgICAgICAgICB9LCB0aGlzLnRpdGxlKSxcbiAgICAgICAgICAgIHRoaXMuZ2V0Vm5vZGUgPyB0aGlzLmdldFZub2RlIDogaCgnZGl2Jywge1xuICAgICAgICAgICAgICBjbGFzczogJ2NvbnRlbnQnXG4gICAgICAgICAgICB9LHRoaXMuY29udGVudCksXG4gICAgICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgICAgIGNsYXNzOiAnY2xvc2UnLFxuICAgICAgICAgICAgICBzdHlsZTogeyBjb2xvcjogdGhpcy5jbG9zZUNvbG9yIH0sXG4gICAgICAgICAgICB9LCBbaCgnZGl2Jywge1xuICAgICAgICAgICAgICAgICAgY2xhc3M6ICdtYXRlcmlhbC1pY29ucycsXG4gICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICBjbGljazogKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUJ0bigpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCAnY2xvc2UnKV0pXG4gICAgICAgICAgXSlcbiAgICBcbiAgICAgICAgOiB2b2lkIDBdIClcbiAgfVxufVxuXG4iLCJpbXBvcnQgVnVlIGZyb20gJ3Z1ZSc7XG5pbXBvcnQgTm90aWZpY2F0aW9uIGZyb20gJy4vbWFpbi5qcyc7XG5cbmNvbnN0IE5vdGlmaWNhdGlvbkNvbnN0cnVjdG9yID0gVnVlLmV4dGVuZChOb3RpZmljYXRpb24pXG5cbmxldCBpbnN0YW5jZTtcbmxldCBpbnN0YW5jZXMgPSBbXVxubGV0IHNlZWQgPSAxXG5jb25zdCBOb3RpZmljYXRpb25GdW4gPSBmdW5jdGlvbihvcHRpb25zKXtcbiAgaWYgKFZ1ZS5wcm90b3R5cGUuJGlzU2VydmVyKSByZXR1cm47XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBjb25zdCB1c2VyT25DbG9zZSA9IG9wdGlvbnMub25DbG9zZTtcbiAgY29uc3QgaWQgPSAnbm90aWZpY2F0aW9uXycgKyBzZWVkKys7XG4gIGNvbnN0IHBvc2l0aW9uID0gb3B0aW9ucy5wb3NpdGlvbiB8fCAndG9wLXJpZ2h0JztcbiAgb3B0aW9ucy5vbkNsb3NlID0gZnVuY3Rpb24oKSB7XG4gICAgTm90aWZpY2F0aW9uLmNsb3NlKGlkLCB1c2VyT25DbG9zZSlcbiAgfVxuICBpbnN0YW5jZSA9IG5ldyBOb3RpZmljYXRpb25Db25zdHJ1Y3Rvcih7XG4gICAgZGF0YTogb3B0aW9uc1xuICB9KVxuICBpbnN0YW5jZS5pZCA9IGlkXG4gIGluc3RhbmNlLiRtb3VudCgpO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGluc3RhbmNlLiRlbCk7XG4gIGluc3RhbmNlLnNob3cgPSB0cnVlXG4gIGxldCB2ZXJ0aWNhbE9mZnNldCA9IDBcbiAgaW5zdGFuY2VzLmZpbHRlcihpdGVtID0+IGl0ZW0ucG9zaXRpb24gPT09IHBvc2l0aW9uKS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgIHZlcnRpY2FsT2Zmc2V0ICs9IGVsZW1lbnQuJGVsLm9mZnNldEhlaWdodCArIDE2XG4gIH0pO1xuICB2ZXJ0aWNhbE9mZnNldCArPSAxNlxuICBpbnN0YW5jZS52ZXJ0aWNhbE9mZnNldCA9IHZlcnRpY2FsT2Zmc2V0XG4gIGluc3RhbmNlcy5wdXNoKGluc3RhbmNlKVxuICBjb25zb2xlLmxvZygpXG4gIHJldHVybiBpbnN0YW5jZTtcbn0gXG5Ob3RpZmljYXRpb24uY2xvc2UgPSBmdW5jdGlvbihpZCwgdXNlck9uQ2xvc2UpIHtcbiAgbGV0IGluZGV4ID0gLTFcbiAgY29uc3QgbGVuID0gaW5zdGFuY2VzLmxlbmd0aFxuICBjb25zdCBpbnN0YW5jZSA9IGluc3RhbmNlcy5maWx0ZXIoKGluc3RhbmNlLCBpKSA9PiB7XG4gICAgaWYgKGluc3RhbmNlLmlkID09PSBpZCkge1xuICAgICAgaW5kZXggPSBpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfSlbMF1cbiAgaWYgKCFpbnN0YW5jZSkgcmV0dXJuXG5cbiAgaWYgKHR5cGVvZiB1c2VyT25DbG9zZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHVzZXJPbkNsb3NlKGluc3RhbmNlKTtcbiAgfVxuICBpbnN0YW5jZXMuc3BsaWNlKGluZGV4LCAxKVxuXG4gIGlmIChsZW4gPD0gMSkgcmV0dXJuXG5cbiAgY29uc3QgcG9zaXRpb24gPSBpbnN0YW5jZS5wb3NpdGlvbjtcbiAgY29uc3QgcmVtb3ZlZEhlaWdodCA9IGluc3RhbmNlLiRlbC5vZmZzZXRIZWlnaHRcbiAgZm9yIChsZXQgaSA9IGluZGV4OyBpIDwgbGVuIC0gMTsgaSsrKXtcbiAgICBpZiAoaW5zdGFuY2VzW2ldLnBvc2l0aW9uID09PSBwb3NpdGlvbikge1xuICAgICAgaW5zdGFuY2VzW2ldLiRlbC5zdHlsZVtpbnN0YW5jZS52ZXJ0aWNhbFByb3BlcnR5XSA9IHBhcnNlSW50KGluc3RhbmNlc1tpXS4kZWwuc3R5bGVbaW5zdGFuY2UudmVydGljYWxQcm9wZXJ0eV0sIDEwKSAtIHJlbW92ZWRIZWlnaHQgLSAxNiArICdweCdcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTm90aWZpY2F0aW9uRnVuIiwiaW1wb3J0IFNsaWRlIGZyb20gJy4uLy4uL3NsaWRlJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdzd0xheW91dCcsXG4gIGNvbXBvbmVudHM6IHsgU2xpZGUgfSxcbiAgcHJvcHM6IHtcbiAgICBjb2xsYXBzZVRvcDogQm9vbGVhbixcbiAgICBjb2xsYXBzZUxlZnQ6IEJvb2xlYW4sXG4gICAgY29sbGFwc2VSaWdodDogQm9vbGVhbixcbiAgICBjb2xsYXBzZUJvdHRvbTogQm9vbGVhbixcbiAgICBmaXRUb3A6IEJvb2xlYW4sXG4gICAgZml0TGVmdDogQm9vbGVhbixcbiAgICBmaXRSaWdodDogQm9vbGVhbixcbiAgICBmaXRCb3R0b206IEJvb2xlYW4sXG4gICAgdG9wTWluOiBOdW1iZXIgfCBTdHJpbmcsXG4gICAgbGVmdE1pbjogTnVtYmVyIHwgU3RyaW5nLFxuICAgIHJpZ2h0TWluOiBOdW1iZXIgfCBTdHJpbmcsXG4gICAgYm90dG9tTWluOiBOdW1iZXIgfCBTdHJpbmdcbiAgfSxcbiAgZGF0YTogKCkgPT4gKHt9KSxcbiAgY29tcHV0ZWQ6IHtcbiAgICB2ZXJ0aWNhbFN0cmV0Y2goKSB7XG4gICAgICByZXR1cm4gdGhpcy4kc2NvcGVkU2xvdHMudG9wICE9PSB2b2lkIDAgfHwgdGhpcy4kc2NvcGVkU2xvdHMuYm90dG9tICE9PSB2b2lkIDBcbiAgICB9XG4gIH0sXG4gIHJlbmRlcihoKSB7XG4gICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiAnc3ctbGF5b3V0IGZsZXggbm8td3JhcCcsXG4gICAgICBzdHlsZToge1xuICAgICAgICAnZmxleC1kaXJlY3Rpb24nOiB0aGlzLnZlcnRpY2FsU3RyZXRjaCAmJiAnY29sdW1uJ1xuICAgICAgfVxuICAgIH0sIFtcbiAgICAgIHRoaXMuJHNjb3BlZFNsb3RzLnRvcCAhPT0gdm9pZCAwID8gaChTbGlkZSwge1xuICAgICAgICBwcm9wczoge1xuICAgICAgICAgIGNvbGxhcHNlZDogdGhpcy5jb2xsYXBzZVRvcCxcbiAgICAgICAgICBmaXQ6IHRoaXMuZml0VG9wLFxuICAgICAgICAgIG1pbjogdGhpcy50b3BNaW5cbiAgICAgICAgfSxcbiAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1sYXlvdXRfX2Fyb3VuZCcsXG4gICAgICAgIHNjb3BlZFNsb3RzOiB7XG4gICAgICAgICAgZGVmYXVsdDogdGhpcy4kc2NvcGVkU2xvdHMudG9wXG4gICAgICAgIH1cbiAgICAgIH0pIDogdm9pZCAwLFxuXG4gICAgICAhdGhpcy52ZXJ0aWNhbFN0cmV0Y2ggJiYgdGhpcy4kc2NvcGVkU2xvdHMubGVmdCAhPT0gdm9pZCAwID8gaChTbGlkZSwge1xuICAgICAgICBwcm9wczoge1xuICAgICAgICAgIGNvbGxhcHNlZDogdGhpcy5jb2xsYXBzZUxlZnQsXG4gICAgICAgICAgaG9yaXpvbnRhbDogdHJ1ZSxcbiAgICAgICAgICBmaXQ6IHRoaXMuZml0TGVmdCxcbiAgICAgICAgICBtaW46IHRoaXMubGVmdE1pblxuICAgICAgICB9LFxuICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWxheW91dF9fYXJvdW5kJyxcbiAgICAgICAgc2NvcGVkU2xvdHM6IHtcbiAgICAgICAgICBkZWZhdWx0OiB0aGlzLiRzY29wZWRTbG90cy5sZWZ0XG4gICAgICAgIH1cbiAgICAgIH0pIDogdm9pZCAwLFxuXG4gICAgICBoKCdkaXYnLCB7XG4gICAgICAgIHJlZjogJ2xheW91dE1haW4nLFxuICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWxheW91dF9fbWFpbicsXG4gICAgICB9LCBbW3RoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQgIT09IHZvaWQgMFxuICAgICAgICA/IHRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQoKSA6IHZvaWQgMF1dKSxcblxuICAgICAgIXRoaXMudmVydGljYWxTdHJldGNoICYmIHRoaXMuJHNjb3BlZFNsb3RzLnJpZ2h0ICE9PSB2b2lkIDAgPyBoKFNsaWRlLCB7XG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgY29sbGFwc2VkOiB0aGlzLmNvbGxhcHNlUmlnaHQsXG4gICAgICAgICAgaG9yaXpvbnRhbDogdHJ1ZSxcbiAgICAgICAgICBmaXQ6IHRoaXMuZml0UmlnaHQsXG4gICAgICAgICAgbWluOiB0aGlzLnJpZ2h0TWluXG4gICAgICAgIH0sXG4gICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctbGF5b3V0X19hcm91bmQnLFxuICAgICAgICBzY29wZWRTbG90czoge1xuICAgICAgICAgIGRlZmF1bHQ6IHRoaXMuJHNjb3BlZFNsb3RzLnJpZ2h0XG4gICAgICAgIH1cbiAgICAgIH0pIDogdm9pZCAwLFxuXG4gICAgICB0aGlzLiRzY29wZWRTbG90cy5ib3R0b20gIT09IHZvaWQgMCA/IGgoU2xpZGUsIHtcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICBjb2xsYXBzZWQ6IHRoaXMuY29sbGFwc2VCb3R0b20sXG4gICAgICAgICAgZml0OiB0aGlzLmZpdEJvdHRvbSxcbiAgICAgICAgICBtaW46IHRoaXMuYm90dG9tTWluXG4gICAgICAgIH0sXG4gICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctbGF5b3V0X19hcm91bmQnLFxuICAgICAgICBzY29wZWRTbG90czoge1xuICAgICAgICAgIGRlZmF1bHQ6IHRoaXMuJHNjb3BlZFNsb3RzLmJvdHRvbVxuICAgICAgICB9XG4gICAgICB9KSA6IHZvaWQgMFxuICAgIF0pXG4gIH1cbn0iLCJpbXBvcnQgTGF5b3V0IGZyb20gJy4vc3JjL21haW4uanMnXG5cbmNvbnN0IGluc3RhbGwgPSBmdW5jdGlvbiAoVnVlKSB7XG4gIFZ1ZS5jb21wb25lbnQoTGF5b3V0Lm5hbWUsIExheW91dClcbn1cblxuTGF5b3V0Lmluc3RhbGwgPSBpbnN0YWxsXG5cbmV4cG9ydCBkZWZhdWx0IExheW91dFxuIiwiY29uc3Qgc2hvd01hc2sgPSBjdHggPT4ge1xuICBpZiAoIWN0eC5kaXNhYmxlZCAmJiAhY3R4LnN0YXkpIHtcbiAgICBjdHgubm9kZS5jbGFzc0xpc3QucmVtb3ZlKCdpbnZpc2libGUnKVxuICB9XG59XG5jb25zdCBoaWRlTWFzayA9IGN0eCA9PiB7XG4gIGlmICghY3R4LmRpc2FibGVkICYmICFjdHguc3RheSkge1xuICAgIGN0eC5ub2RlLmNsYXNzTGlzdC5hZGQoJ2ludmlzaWJsZScpXG4gIH1cbn1cbmNvbnN0IGRpc2FibGVNYXNrID0gY3R4ID0+IHtcbiAgaWYgKGN0eC5kaXNhYmxlZCAmJiAhY3R4LnN0YXkpIHtcbiAgICBjdHgubm9kZS5jbGFzc0xpc3QuYWRkKCdpbnZpc2libGUnKVxuICB9XG59XG5jb25zdCBzdGF5TWFzayA9IGN0eCA9PiB7XG4gIGlmIChjdHguc3RheSkge1xuICAgIGN0eC5ub2RlLmNsYXNzTGlzdC5yZW1vdmUoJ2ludmlzaWJsZScpXG4gIH0gZWxzZSB7XG4gICAgY3R4Lm5vZGUuY2xhc3NMaXN0LmFkZCgnaW52aXNpYmxlJylcbiAgfVxufVxuY29uc3QgY29sb3JNYXNrID0gY3R4ID0+IHtcbiAgY3R4Lm5vZGUuc3R5bGUuY29sb3IgPSBjdHguY29sb3Jcbn1cbmNvbnN0IGdldERpc2FibGVkID0gdmFsdWUgPT4gdmFsdWUgIT09IHZvaWQgMCAmJiAodmFsdWUuZGlzYWJsZWQgPT09IHRydWUgfHwgZmFsc2UpXG5jb25zdCBnZXRTdGF5ID0gdmFsdWUgPT4gdmFsdWUgIT09IHZvaWQgMCAmJiAodmFsdWUuc3RheSA9PT0gdHJ1ZSB8fCBmYWxzZSlcbmNvbnN0IGdldENvbG9yID0gdmFsdWUgPT4gdmFsdWUgIT09IHZvaWQgMCAmJiB2YWx1ZS5jb2xvciB8fCB2b2lkIDBcbmNvbnN0IGluaXRNYXNrID0gKGVsLCBiaW5kaW5nKSA9PiB7XG4gIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICBjb25zdCBjdHggPSB7XG4gICAgbm9kZTogbm9kZSxcbiAgICBkaXNhYmxlZDogZ2V0RGlzYWJsZWQoYmluZGluZy52YWx1ZSksXG4gICAgc3RheTogZ2V0U3RheShiaW5kaW5nLnZhbHVlKSxcbiAgICBjb2xvcjogZ2V0Q29sb3IoYmluZGluZy52YWx1ZSksXG4gICAgc2hvd01hc2s6ICgpID0+IHtcbiAgICAgIHNob3dNYXNrKGN0eClcbiAgICB9LFxuICAgIGhpZGVNYXNrOiAoKSA9PiB7XG4gICAgICBoaWRlTWFzayhjdHgpXG4gICAgfVxuICB9XG5cbiAgY3R4Lm5vZGUuY2xhc3NMaXN0LmFkZCgnc3ctbWFzaycpXG4gIGRpc2FibGVNYXNrKGN0eClcbiAgc3RheU1hc2soY3R4KVxuICBjb2xvck1hc2soY3R4KVxuICBoaWRlTWFzayhjdHgpXG4gIGVsLm1hc2tDdHggPSBjdHhcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnbWFzaycsXG4gIGJpbmQoZWwsIGJpbmRpbmcpIHtcbiAgICBpbml0TWFzayhlbCwgYmluZGluZylcbiAgICBlbC5hcHBlbmRDaGlsZChlbC5tYXNrQ3R4Lm5vZGUpXG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgZWwubWFza0N0eC5zaG93TWFzaywgZmFsc2UpXG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCBlbC5tYXNrQ3R4LmhpZGVNYXNrLCBmYWxzZSlcbiAgfSxcbiAgdXBkYXRlKGVsLCBiaW5kaW5nKSB7XG4gICAgZWwubWFza0N0eC5kaXNhYmxlZCA9IGdldERpc2FibGVkKGJpbmRpbmcudmFsdWUpXG4gICAgaWYgKGdldERpc2FibGVkKGJpbmRpbmcub2xkVmFsdWUpICE9PSBlbC5tYXNrQ3R4LmRpc2FibGVkKSB7XG4gICAgICBkaXNhYmxlTWFzayhlbC5tYXNrQ3R4KVxuICAgIH1cblxuICAgIGVsLm1hc2tDdHguc3RheSA9IGdldFN0YXkoYmluZGluZy52YWx1ZSlcbiAgICBpZiAoZ2V0U3RheShiaW5kaW5nLm9sZFZhbHVlKSAhPT0gZWwubWFza0N0eC5zdGF5KSB7XG4gICAgICBzdGF5TWFzayhlbC5tYXNrQ3R4KVxuICAgIH1cblxuICAgIGVsLm1hc2tDdHguY29sb3IgPSBnZXRDb2xvcihiaW5kaW5nLnZhbHVlKVxuICAgIGlmIChnZXRDb2xvcihiaW5kaW5nLm9sZFZhbHVlKSAhPT0gZWwubWFza0N0eC5jb2xvcikge1xuICAgICAgY29sb3JNYXNrKGVsLm1hc2tDdHgpXG4gICAgfVxuICB9LFxuICB1bmJpbmQoZWwpIHtcbiAgICBpZiAoZWwubWFza0N0eCkge1xuICAgICAgZWwubWFza0N0eC5ub2RlLnJlbW92ZSgpXG4gICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBlbC5tYXNrQ3R4LnNob3dNYXNrLCBmYWxzZSlcbiAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgZWwubWFza0N0eC5oaWRlTWFzaywgZmFsc2UpXG4gICAgICBkZWxldGUgZWwubWFza0N0eFxuICAgIH1cbiAgfVxufSIsImltcG9ydCBNYXNrIGZyb20gJy4vc3JjL21haW4uanMnXG5cbmNvbnN0IGluc3RhbGwgPSBmdW5jdGlvbiAoVnVlKSB7XG4gIFZ1ZS5kaXJlY3RpdmUoTWFzay5uYW1lLCBNYXNrKVxufVxuXG5NYXNrLmluc3RhbGwgPSBpbnN0YWxsXG5cbmV4cG9ydCBkZWZhdWx0IE1hc2siLCJleHBvcnQgZnVuY3Rpb24gcG9zaXRpb24oZSkge1xuICBpZiAoZS50b3VjaGVzICYmIGUudG91Y2hlc1swXSkge1xuICAgIGUgPSBlLnRvdWNoZXNbMF1cbiAgfSBlbHNlIGlmIChlLmNoYW5nZWRUb3VjaGVzICYmIGUuY2hhbmdlZFRvdWNoZXNbMF0pIHtcbiAgICBlID0gZS5jaGFuZ2VkVG91Y2hlc1swXVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB0b3A6IGUuY2xpZW50WSxcbiAgICBsZWZ0OiBlLmNsaWVudFhcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RXZlbnRQYXRoKGUpIHtcbiAgaWYgKGUucGF0aCkge1xuICAgIHJldHVybiBlLnBhdGhcbiAgfVxuICBpZiAoZS5jb21wb3NlZFBhdGgpIHtcbiAgICByZXR1cm4gZS5jb21wb3NlZFBhdGgoKVxuICB9XG5cbiAgY29uc3QgcGF0aCA9IFtdXG4gIGxldCBlbCA9IGUudGFyZ2V0XG5cbiAgd2hpbGUgKGVsKSB7XG4gICAgcGF0aC5wdXNoKGVsKVxuXG4gICAgaWYgKGVsLnRhZ05hbWUgPT09ICdIVE1MJykge1xuICAgICAgcGF0aC5wdXNoKGRvY3VtZW50KVxuICAgICAgcGF0aC5wdXNoKHdpbmRvdylcbiAgICAgIHJldHVybiBwYXRoXG4gICAgfVxuXG4gICAgZWwgPSBlbC5wYXJlbnRFbGVtZW50XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0b3AoZSkge1xuICBlLnN0b3BQcm9wYWdhdGlvbigpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcmV2ZW50KGUpIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdG9wQW5kUHJldmVudChlKSB7XG4gIGUucHJldmVudERlZmF1bHQoKVxuICBlLnN0b3BQcm9wYWdhdGlvbigpXG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgcG9zaXRpb24sXG4gIGdldEV2ZW50UGF0aCxcbiAgc3RvcCxcbiAgcHJldmVudCxcbiAgc3RvcEFuZFByZXZlbnRcbn0iLCJpbXBvcnQgeyBjc3MgfSBmcm9tICcuLi8uLi8uLi91dGlscy9kb20uanMnXG5pbXBvcnQgeyBwb3NpdGlvbiB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2V2ZW50LmpzJ1xuXG5mdW5jdGlvbiBzaG93UmlwcGxlKGV2dCwgZWwsIGN0eCwgZm9yY2VDZW50ZXIpIHtcbiAgaWYgKGN0eC5tb2RpZmllcnMuc3RvcCA9PT0gdHJ1ZSkge1xuICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKVxuICB9XG5cbiAgbGV0IHsgY2VudGVyLCBjb2xvciB9ID0gY3R4Lm1vZGlmaWVyc1xuXG4gIGNlbnRlciA9IGNlbnRlciA9PT0gdHJ1ZSB8fCBmb3JjZUNlbnRlciA9PT0gdHJ1ZVxuXG4gIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgY29uc3QgaW5uZXJOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gIGNvbnN0IHBvcyA9IHBvc2l0aW9uKGV2dClcbiAgY29uc3QgeyBsZWZ0LCB0b3AsIHdpZHRoLCBoZWlnaHQgfSA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gIGNvbnN0IGRpYW1ldGVyID0gTWF0aC5zcXJ0KHdpZHRoICogd2lkdGggKyBoZWlnaHQgKiBoZWlnaHQpXG4gIGNvbnN0IHJhZGl1cyA9IGRpYW1ldGVyIC8gMlxuICBjb25zdCBjZW50ZXJYID0gYCR7KHdpZHRoIC0gZGlhbWV0ZXIpIC8gMn1weGBcbiAgY29uc3QgeCA9IGNlbnRlciA/IGNlbnRlclggOiBgJHtwb3MubGVmdCAtIGxlZnQgLSByYWRpdXN9cHhgXG4gIGNvbnN0IGNlbnRlclkgPSBgJHsoaGVpZ2h0IC0gZGlhbWV0ZXIpIC8gMn1weGBcbiAgY29uc3QgeSA9IGNlbnRlciA/IGNlbnRlclkgOiBgJHtwb3MudG9wIC0gdG9wIC0gcmFkaXVzfXB4YFxuICBsZXQgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBpbm5lck5vZGUuY2xhc3NMaXN0LmFkZCgnc3ctcmlwcGxlX19pbm5lci0tZW50ZXInKVxuICAgIGlubmVyTm9kZS5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlM2QoJHtjZW50ZXJYfSwgJHtjZW50ZXJZfSwgMCkgc2NhbGUzZCgxLCAxLCAxKWBcbiAgICBpbm5lck5vZGUuc3R5bGUub3BhY2l0eSA9IDAuMlxuXG4gICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlubmVyTm9kZS5jbGFzc0xpc3QucmVtb3ZlKCdzdy1yaXBwbGVfX2lubmVyLS1lbnRlcicpXG4gICAgICBpbm5lck5vZGUuY2xhc3NMaXN0LmFkZCgnc3ctcmlwcGxlX19pbm5lci0tbGVhdmUnKVxuICAgICAgaW5uZXJOb2RlLnN0eWxlLm9wYWNpdHkgPSAwXG5cbiAgICAgIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIG5vZGUgJiYgbm9kZS5yZW1vdmUoKVxuICAgICAgICBjdHguYWJvcnQgPSB2b2lkIDBcbiAgICAgIH0sIDI3NSlcbiAgICB9LCAyNTApXG4gIH0sIDUwKVxuXG4gIGlubmVyTm9kZS5jbGFzc05hbWUgPSAnc3ctcmlwcGxlX19pbm5lcidcbiAgY3NzKGlubmVyTm9kZSwge1xuICAgIGhlaWdodDogYCR7ZGlhbWV0ZXJ9cHhgLFxuICAgIHdpZHRoOiBgJHtkaWFtZXRlcn1weGAsXG4gICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlM2QoJHt4fSwgJHt5fSwgMCkgc2NhbGUzZCgwLjIsIDAuMiwgMSlgLFxuICAgIG9wYWNpdHk6IDBcbiAgfSlcbiAgaWYgKGNvbG9yKSB7IGNzcyhub2RlLCB7IGNvbG9yOiBjb2xvciB9KSB9XG4gIG5vZGUuY2xhc3NOYW1lID0gYHN3LXJpcHBsZWBcbiAgbm9kZS5hcHBlbmRDaGlsZChpbm5lck5vZGUpXG4gIGVsLmFwcGVuZENoaWxkKG5vZGUpXG5cbiAgY3R4LmFib3J0ID0gKCkgPT4ge1xuICAgIG5vZGUgJiYgbm9kZS5yZW1vdmUoKVxuICAgIGNsZWFyVGltZW91dCh0aW1lcilcbiAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGVDdHgoY3R4LCB7IHZhbHVlLCBtb2RpZmllcnMsIGFyZyB9KSB7XG4gIGN0eC5kaXNhYmxlZCA9IHZhbHVlICYmIHZhbHVlLmRpc2FibGVkIHx8IGZhbHNlXG5cbiAgaWYgKCFjdHguZGlzYWJsZWQpIHtcbiAgICBjdHgubW9kaWZpZXJzID0gT2JqZWN0KHZhbHVlKSA9PT0gdmFsdWVcbiAgICAgID8ge1xuICAgICAgICBzdG9wOiB2YWx1ZS5zdG9wID09PSB0cnVlIHx8IG1vZGlmaWVycy5zdG9wID09PSB0cnVlLFxuICAgICAgICBjZW50ZXI6IHZhbHVlLmNlbnRlciA9PT0gdHJ1ZSB8fCBtb2RpZmllcnMuY2VudGVyID09PSB0cnVlLFxuICAgICAgICBjb2xvcjogdmFsdWUuY29sb3IgfHwgYXJnXG4gICAgICB9XG4gICAgICA6IHtcbiAgICAgICAgc3RvcDogbW9kaWZpZXJzLnN0b3AsXG4gICAgICAgIGNlbnRlcjogbW9kaWZpZXJzLmNlbnRlcixcbiAgICAgICAgY29sb3I6IGFyZ1xuICAgICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3JpcHBsZScsXG4gIGluc2VydGVkKGVsLCBiaW5kaW5nKSB7XG4gICAgY29uc3QgY3R4ID0ge1xuICAgICAgbW9kaWZpZXJzOiB7fSxcbiAgICAgIGNsaWNrKGV2dCkge1xuICAgICAgICBpZiAoIWN0eC5kaXNhYmxlZCkge1xuICAgICAgICAgIHNob3dSaXBwbGUoZXZ0LCBlbCwgY3R4KVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAga2V5dXAoZXZ0KSB7XG4gICAgICAgIGlmICghY3R4LmRpc2FibGVkICYmIGV2dC5rZXlDb2RlID09PSAxMykge1xuICAgICAgICAgIHNob3dSaXBwbGUoZXZ0LCBlbCwgY3R4LCB0cnVlKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlQ3R4KGN0eCwgYmluZGluZylcbiAgICBpZiAoZWwucmlwcGxlQ3R4KSB7XG4gICAgICBlbC5yaXBwbGVDdHhPbGQgPSBlbC5yaXBwbGVDdHhcbiAgICB9XG4gICAgZWwucmlwcGxlQ3R4ID0gY3R4XG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjdHguY2xpY2ssIGZhbHNlKVxuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgY3R4LmtleXVwLCBmYWxzZSlcbiAgfSxcbiAgdXBkYXRlKGVsLCBiaW5kaW5nKSB7XG4gICAgZWwucmlwcGxlQ3R4ICE9PSB2b2lkIDAgJiYgdXBkYXRlQ3R4KGVsLnJpcHBsZUN0eCwgYmluZGluZylcbiAgfSxcbiAgdW5iaW5kKGVsKSB7XG4gICAgY29uc3QgY3R4ID0gZWwucmlwcGxlQ3R4T2xkIHx8IGVsLnJpcHBsZUN0eFxuXG4gICAgaWYgKGN0eCAhPT0gdm9pZCAwKSB7XG4gICAgICBjdHguYWJvcnQgIT09IHZvaWQgMCAmJiBjdHguYWJvcnQoKVxuICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjdHguY2xpY2ssIGZhbHNlKVxuICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBjdHgua2V5dXAsIGZhbHNlKVxuICAgICAgZGVsZXRlIGVsW2VsLnJpcHBsZUN0eE9sZCA/ICdyaXBwbGVDdHhPbGQnIDogJ3JpcHBsZUN0eCddXG4gICAgfVxuICB9XG59IiwiaW1wb3J0IFJpcHBsZSBmcm9tICcuL3NyYy9tYWluLmpzJ1xuXG5jb25zdCBpbnN0YWxsID0gZnVuY3Rpb24gKFZ1ZSkge1xuICBWdWUuZGlyZWN0aXZlKFJpcHBsZS5uYW1lLCBSaXBwbGUpXG59XG5cblJpcHBsZS5pbnN0YWxsID0gaW5zdGFsbFxuXG5leHBvcnQgZGVmYXVsdCBSaXBwbGUiLCJpbXBvcnQgJy4vY3NzL2luZGV4LnN0eWwnXG5cbmltcG9ydCBJY29uIGZyb20gJy4vY29tcG9uZW50cy9pY29uL2luZGV4LmpzJ1xuaW1wb3J0IEl0ZW0gZnJvbSAnLi9jb21wb25lbnRzL2l0ZW0vaW5kZXguanMnXG5pbXBvcnQgRmllbGQgZnJvbSAnLi9jb21wb25lbnRzL2ZpZWxkL2luZGV4LmpzJ1xuaW1wb3J0IElucHV0IGZyb20gJy4vY29tcG9uZW50cy9pbnB1dC9pbmRleC5qcydcbmltcG9ydCBTZWxlY3QgZnJvbSAnLi9jb21wb25lbnRzL3NlbGVjdC9pbmRleC5qcydcbmltcG9ydCBTY3JvbGxBcmVhIGZyb20gJy4vY29tcG9uZW50cy9zY3JvbGxBcmVhL2luZGV4LmpzJ1xuaW1wb3J0IE1vZGFsIGZyb20gJy4vY29tcG9uZW50cy9tb2RhbC9pbmRleC5qcydcbmltcG9ydCBQb3BvdmVyIGZyb20gJy4vY29tcG9uZW50cy9wb3BvdmVyL2luZGV4LmpzJ1xuaW1wb3J0IEJ1dHRvbiBmcm9tICcuL2NvbXBvbmVudHMvYnV0dG9uL2luZGV4LmpzJ1xuaW1wb3J0IENoZWNrYm94IGZyb20gJy4vY29tcG9uZW50cy9jaGVja2JveC9pbmRleC5qcydcbmltcG9ydCBDaGVja2JveEdyb3VwIGZyb20gJy4vY29tcG9uZW50cy9jaGVja2JveEdyb3VwL2luZGV4LmpzJ1xuaW1wb3J0IFJhZGlvIGZyb20gJy4vY29tcG9uZW50cy9yYWRpby9pbmRleC5qcydcbmltcG9ydCBSYWRpb0dyb3VwIGZyb20gJy4vY29tcG9uZW50cy9yYWRpb0dyb3VwL2luZGV4LmpzJ1xuaW1wb3J0IFBhZ2luYXRpb24gZnJvbSAnLi9jb21wb25lbnRzL3BhZ2luYXRpb24vaW5kZXguanMnXG5pbXBvcnQgQmFzaWNJdGVtIGZyb20gJy4vY29tcG9uZW50cy9iYXNpY0l0ZW0vaW5kZXguanMnXG5pbXBvcnQgTm90aWZpY2F0aW9uIGZyb20gJy4vY29tcG9uZW50cy9ub3RpZmljYXRpb24vaW5kZXguanMnXG5pbXBvcnQgTGF5b3V0IGZyb20gJy4vY29tcG9uZW50cy9sYXlvdXQvaW5kZXguanMnXG5pbXBvcnQgU2xpZGUgZnJvbSAnLi9jb21wb25lbnRzL3NsaWRlL2luZGV4LmpzJ1xuaW1wb3J0IE1hc2sgZnJvbSAnLi9kaXJlY3RpdmVzL21hc2svaW5kZXguanMnXG5pbXBvcnQgUmlwcGxlIGZyb20gJy4vZGlyZWN0aXZlcy9yaXBwbGUvaW5kZXguanMnXG5cbmNvbnN0IGNvbXBvbmVudHMgPSBbXG4gIEljb24sXG4gIEl0ZW0sXG4gIEZpZWxkLFxuICBJbnB1dCxcbiAgU2VsZWN0LFxuICBTY3JvbGxBcmVhLFxuICBNb2RhbCxcbiAgUG9wb3ZlcixcbiAgQnV0dG9uLFxuICBQYWdpbmF0aW9uLFxuICBDaGVja2JveCxcbiAgQ2hlY2tib3hHcm91cCxcbiAgUmFkaW8sXG4gIFJhZGlvR3JvdXAsXG4gIEJhc2ljSXRlbSxcbiAgTGF5b3V0LFxuICBTbGlkZVxuXVxuXG5jb25zdCBkaXJlY3RpdmVzID0gW1xuICBSaXBwbGUsXG4gIE1hc2tcbl1cblxuY29uc3QgaW5zdGFsbCA9IGZ1bmN0aW9uIChWdWUpIHtcbiAgY29tcG9uZW50cy5mb3JFYWNoKGNvbXBvbmVudCA9PiB7XG4gICAgVnVlLmNvbXBvbmVudChjb21wb25lbnQubmFtZSwgY29tcG9uZW50KVxuICB9KVxuICBkaXJlY3RpdmVzLmZvckVhY2goZGlyZWN0aXZlID0+IHtcbiAgICBWdWUuZGlyZWN0aXZlKGRpcmVjdGl2ZS5uYW1lLCBkaXJlY3RpdmUpXG4gIH0pXG4gIFZ1ZS5wcm90b3R5cGUuJG5vdGlmeSA9IE5vdGlmaWNhdGlvblxufVxuXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LlZ1ZSkge1xuICBpbnN0YWxsKHdpbmRvdy5WdWUpXG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaW5zdGFsbCxcbiAgSWNvbixcbiAgSXRlbSxcbiAgRmllbGQsXG4gIElucHV0LFxuICBTZWxlY3QsXG4gIFNjcm9sbEFyZWEsXG4gIFBvcG92ZXIsXG4gIE1vZGFsLFxuICBCdXR0b24sXG4gIFBhZ2luYXRpb24sXG4gIENoZWNrYm94LFxuICBDaGVja2JveEdyb3VwLFxuICBSYWRpbyxcbiAgUmFkaW9Hcm91cCxcbiAgQmFzaWNJdGVtLFxuICBOb3RpZmljYXRpb24sXG4gIExheW91dCxcbiAgU2xpZGUsXG4gIFJpcHBsZSxcbiAgTWFza1xufVxuIl0sIm5hbWVzIjpbIm5hbWUiLCJwcm9wcyIsIlN0cmluZyIsImNvbG9yIiwicHJpbWFyeSIsIkJvb2xlYW4iLCJuZWdhdGl2ZSIsInBvc2l0aXZlIiwid2FybmluZyIsImdyZXkiLCJsaWdodEdyZXkiLCJzaXplIiwiY29tcHV0ZWQiLCJjbGFzc2VzIiwiY2xzIiwiaWNvbiIsImNvbnRlbnQiLCJzdHlsZSIsImZvbnRTaXplIiwicmVuZGVyIiwiaCIsInN0YXRpY0NsYXNzIiwiY2xhc3MiLCJhdHRycyIsIm9uIiwiJGxpc3RlbmVycyIsImluc3RhbGwiLCJWdWUiLCJjb21wb25lbnQiLCJJY29uIiwid3JhcCIsImhpZGVCZWZvcmUiLCJoaWRlRGVmYXVsdCIsImhpZGVBZnRlciIsInRvIiwiT2JqZWN0IiwiY2VudGVyIiwiZW5kIiwiZGlzYWJsZWQiLCJtYXNrIiwicmlwcGxlIiwiZGF0YSIsImRpc2FibGUiLCJkaXJlY3RpdmVzIiwidmFsdWUiLCJzdGF5IiwiY29uY2F0IiwiJHNjb3BlZFNsb3RzIiwiYmVmb3JlIiwiaGlkZSIsImRlZmF1bHQiLCJhZnRlciIsIkl0ZW0iLCJlcnJvck1lc3NhZ2UiLCJydWxlcyIsIkFycmF5IiwiaXNEaXJ0eSIsImlubmVyRXJyb3IiLCJpbm5lckVycm9yTWVzc2FnZSIsIndhdGNoIiwiZm9yY2VDaGVjayIsInYiLCJ2YWxpZGF0ZSIsInZhbGlkYXRlVmFsdWUiLCJoYXNFcnJvciIsImNvbXB1dGVkRXJyb3JNZXNzYWdlIiwibW91bnRlZCIsIiRvbiIsInRyaWdnZXJWYWxpZGF0aW9uIiwiYmVmb3JlRGVzdHJveSIsIiRvZmYiLCJtZXRob2RzIiwicmVzZXRWYWxpZGF0aW9uIiwidmFsIiwibGVuZ3RoIiwidXBkYXRlIiwiZXJyIiwibXNnIiwibSIsInNvbWUiLCJydWxlIiwicmVzIiwiZm9yY2UiLCJhZHZhbmNlZEJsdXIiLCJlIiwiZXhjbHVkZWQiLCJnZXRSZWZzIiwicmVmTmFtZXMiLCJnZXREb21zIiwiZWxzIiwiaXNBcnJheSIsInJlZHVjZSIsImFjY3VtdWxhdG9yIiwiZWwiLCJwdXNoIiwiJGVsIiwicmVmIiwiJHJlZnMiLCJleGNsdWRlZEJsdXJSZWZzIiwicmVmcyIsImNvbnRhaW5zIiwidGFyZ2V0IiwiZm9jdXNlZCIsImZvY3VzZWRCZWZvcmUiLCJibHVyVHlwZSIsImJsdXJSZWZzIiwiJGVtaXQiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwibWl4aW5zIiwiVmFsaWRhdGVNaXhpbiIsIkFkdmFuY2VkQmx1ck1peGluIiwiY29tcG9uZW50cyIsInJlcXVpcmVkIiwidW5kZXJsaW5lZCIsImJvcmRlcmVkIiwiZmlsbGVkIiwibWluaSIsImxhYmVsIiwic3BhY2VBcm91bmQiLCJ0eXBlIiwiZm9jdXMiLCJibHVyIiwidW5kZXJsaW5lIiwiYm9yZGVyIiwiZmlsbCIsImVycm9yIiwiaW5uZXJQb2ludGVyIiwic2NvcGVkU2xvdHMiLCJnZXRJbm5lciIsImdldEFmdGVyIiwiRmllbGQiLCJwbGFjZWhvbGRlciIsImF1dG9jb21wbGV0ZSIsImlucHV0IiwiZG9tUHJvcHMiLCJJbnB1dCIsIngiLCJ5Iiwid2lkdGgiLCJoZWlnaHQiLCJzdHJldGNoIiwiU2Nyb2xsQXJlYSIsImlzRGVlcEVxdWFsIiwiYSIsImIiLCJEYXRlIiwiZ2V0VGltZSIsImtleXMiLCJldmVyeSIsInByb3AiLCJpc1N0cmluZ0NvbnRhaW4iLCJzIiwiaW5uZXJTIiwiaW5uZXJWIiwicmVwbGFjZSIsInNwbGl0Iiwic3VtIiwiZm9yRWFjaCIsImluY2x1ZGVzIiwiaXNPYmplY3QiLCJTY29ybGxBcmVhIiwibXVsdGlwbGUiLCJvcHRpb25zIiwiZmlsdGVyIiwib3B0aW9uc0hlaWdodCIsInNlbGVjdGVkU3R5bGUiLCJmaWx0ZXJWYWx1ZSIsImlubmVyVmFsdWUiLCJnZXQiLCJnZXRFeGFjdFZhbHVlcyIsInNldCIsImlubmVyT3B0aW9ucyIsImMiLCJnZXROYW1lIiwiJG5leHRUaWNrIiwiY2xlYXJGaWx0ZXIiLCJ0cmlnZ2VyQmx1ciIsImdldE9wdGlvbnMiLCJtYXAiLCJvcHRpb24iLCJzZWxlY3RlZCIsImNoZWNrU2VsZWN0ZWQiLCJuYXRpdmVPbiIsImNsaWNrIiwiZm9ybWF0VmFsdWUiLCJnZXRTZWxlY3RlZCIsImdldEV4YWN0T3B0aW9ucyIsInJlZkluRm9yIiwicGFkZGluZyIsImN1cnNvciIsInRyYW5zZm9ybSIsIm9wZSIsImR1cGxpY2F0ZWQiLCJnZXRWYWx1ZSIsImhhc093blByb3BlcnR5IiwiU2VsZWN0Iiwicm91bmQiLCJzaGFkb3ciLCJCdXR0b24iLCJzd0J1dHRvbiIsInNob3ciLCJ0aXRsZSIsInpJbmRleCIsIm9wYWNpdHkiLCJoYW5kbGVDYW5jZWwiLCJoYW5kbGVDb25maXJtIiwic2hvd01vZGFsIiwiaGlkZU1vZGFsIiwiZXZlbnQiLCJzdG9wUHJvcGFnYXRpb24iLCJoZWFkZXIiLCJmb290ZXIiLCJNb2RhbCIsImlzU2VydmVyIiwicHJvdG90eXBlIiwiJGlzU2VydmVyIiwiY3NzIiwiZWxlbWVudCIsImhhbmRsZXIiLCJhdHRhY2hFdmVudCIsIm9mZiIsImRldGFjaEV2ZW50IiwicG9wb3ZlclN0eWxlIiwiYXJyb3dTdHlsZSIsInJlZmVyZW5jZUVsbSIsIm1vZGVsIiwicGxhY2VtZW50IiwidHJpZ2dlciIsInZhbGlkYXRvciIsImluZGV4T2YiLCJzaG93VmFsdWUiLCJzaG93U3R5bGUiLCJnZXRTdHlsZSIsInBvcG92ZXJFbG0iLCJ0b3AiLCJvZmZzZXRIZWlnaHQiLCJsZWZ0Iiwib2Zmc2V0V2lkdGgiLCJyaWdodCIsImhhbmRsZUNsaWNrIiwiaGFuZGxlTW91c2VFbnRlciIsImhhbmRsZU1vdXNlTGVhdmUiLCJkb1Nob3ciLCJkb0Nsb3NlIiwiaGFuZGxlTWFudWFsIiwicG9wb3ZlciIsInJlZmVyZW5jZSIsImVsbSIsInF1ZXJ5U2VsZWN0b3IiLCJkZXN0cm95ZWQiLCJhc3NpZ24iLCJQb3BvdmVyIiwibGVmdExhYmVsIiwiY29sb3JMYWJlbCIsImtlZXBDb2xvciIsInBhcmVudCIsInBhcmVudERpc2FibGVkIiwiY2hlY2tlZCIsImJvb2xlYW5Nb2RlIiwiZ2V0Q2hlY2tlZCIsInNlbGYiLCJjb2xvckNoZWNrYm94IiwiZ2V0TGFiZWwiLCJDaGVja2JveCIsInNodXR0bGUiLCJfdGhpcyIsIiRjaGlsZHJlbiIsImNoaWxkIiwic2h1dHRsZVJlZiIsIlNodXR0bGVNaXhpbiIsIkNoZWNrYm94R3JvdXAiLCJjb2xvclJhZGlvIiwiUmFkaW8iLCJSYWRpb0dyb3VwIiwibWFrZVJlc3VsdCIsInRvdGFsIiwiY3VyIiwiYXJvdW5kIiwicmVzdWx0IiwiYmFzZUNvdW50Iiwic3VycGx1cyIsInN0YXJ0UG9zaXRpb24iLCJlbmRQb3NpdGlvbiIsImZyb20iLCJpIiwiUGFnaW5hdGlvbiIsIm9ic2VydmVyIiwibWVhc3VyZWRXaWR0aCIsImhvcml6b250YWwiLCJtZWFzdXJlVGFyZ2V0IiwibWluU2l6ZSIsIm1pbiIsImluaXRTdHlsZSIsImlubmVyQ29sbGFwc2VkIiwic2xpZGUiLCJzZXRTdHlsZSIsInBhc3NpdmUiLCJzbGlkZVRhcmdldCIsIm9ic2VydmUiLCJzZXRUaW1lb3V0IiwiY2xlYXJVcHBlclN0eWxlIiwidXBwZXIiLCJ1cHBlclNsaWRlVGFyZ2V0IiwiJHBhcmVudCIsIiR3YXRjaCIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJjaGlsZExpc3QiLCJzdWJ0cmVlIiwiY2hhcmFjdGVyRGF0YSIsImRpc2Nvbm5lY3QiLCJTbGlkZU9ic2VydmVyIiwiY29sbGFwc2VkIiwiZml0IiwiTnVtYmVyIiwiaW1tZWRpYXRlIiwiU2xpZGUiLCJzdWJDb250ZW50IiwiaW5kZW50TGV2ZWwiLCJzdWIiLCJtb3VzZW92ZXIiLCJleHBhbmQiLCJtb3VzZW91dCIsInBvc2l0aW9uIiwidW5zaGlmdCIsIkJhc2ljSXRlbSIsImhhc093biIsIm9iaiIsImtleSIsImNhbGwiLCJpc1ZOb2RlIiwibm9kZSIsInZlcnRpY2FsT2Zmc2V0Iiwib25DbG9zZSIsInNsb3QiLCJiYWNrZ3JvdW5kIiwiY2xvc2VDb2xvciIsImhhbmRsZUJ0biIsInZlcnRpY2FsUHJvcGVydHkiLCJ0ZXN0IiwicG9zaXRpb25TdHlsZSIsImdldFZub2RlIiwiY29uc29sZSIsIk5vdGlmaWNhdGlvbkNvbnN0cnVjdG9yIiwiZXh0ZW5kIiwiTm90aWZpY2F0aW9uIiwiaW5zdGFuY2UiLCJpbnN0YW5jZXMiLCJzZWVkIiwiTm90aWZpY2F0aW9uRnVuIiwidXNlck9uQ2xvc2UiLCJpZCIsImNsb3NlIiwiJG1vdW50IiwiYm9keSIsImFwcGVuZENoaWxkIiwiaXRlbSIsImxvZyIsImluZGV4IiwibGVuIiwic3BsaWNlIiwicmVtb3ZlZEhlaWdodCIsInBhcnNlSW50IiwiY29sbGFwc2VUb3AiLCJjb2xsYXBzZUxlZnQiLCJjb2xsYXBzZVJpZ2h0IiwiY29sbGFwc2VCb3R0b20iLCJmaXRUb3AiLCJmaXRMZWZ0IiwiZml0UmlnaHQiLCJmaXRCb3R0b20iLCJ0b3BNaW4iLCJsZWZ0TWluIiwicmlnaHRNaW4iLCJib3R0b21NaW4iLCJ2ZXJ0aWNhbFN0cmV0Y2giLCJib3R0b20iLCJMYXlvdXQiLCJzaG93TWFzayIsImN0eCIsImNsYXNzTGlzdCIsInJlbW92ZSIsImhpZGVNYXNrIiwiYWRkIiwiZGlzYWJsZU1hc2siLCJzdGF5TWFzayIsImNvbG9yTWFzayIsImdldERpc2FibGVkIiwiZ2V0U3RheSIsImdldENvbG9yIiwiaW5pdE1hc2siLCJiaW5kaW5nIiwiY3JlYXRlRWxlbWVudCIsIm1hc2tDdHgiLCJiaW5kIiwib2xkVmFsdWUiLCJ1bmJpbmQiLCJkaXJlY3RpdmUiLCJNYXNrIiwidG91Y2hlcyIsImNoYW5nZWRUb3VjaGVzIiwiY2xpZW50WSIsImNsaWVudFgiLCJzaG93UmlwcGxlIiwiZXZ0IiwiZm9yY2VDZW50ZXIiLCJtb2RpZmllcnMiLCJzdG9wIiwiaW5uZXJOb2RlIiwicG9zIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiZGlhbWV0ZXIiLCJNYXRoIiwic3FydCIsInJhZGl1cyIsImNlbnRlclgiLCJjZW50ZXJZIiwidGltZXIiLCJhYm9ydCIsImNsYXNzTmFtZSIsImNsZWFyVGltZW91dCIsInVwZGF0ZUN0eCIsImFyZyIsImluc2VydGVkIiwia2V5dXAiLCJrZXlDb2RlIiwicmlwcGxlQ3R4IiwicmlwcGxlQ3R4T2xkIiwiUmlwcGxlIiwiJG5vdGlmeSIsIndpbmRvdyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGFBQWU7RUFDYkEsRUFBQUEsSUFBSSxFQUFFLFFBRE87RUFFYkMsRUFBQUEsS0FBSyxFQUFFO0VBQ0xELElBQUFBLElBQUksRUFBRUUsTUFERDtFQUVMQyxJQUFBQSxLQUFLLEVBQUVELE1BRkY7RUFHTEUsSUFBQUEsT0FBTyxFQUFFQyxPQUhKO0VBSUxDLElBQUFBLFFBQVEsRUFBRUQsT0FKTDtFQUtMRSxJQUFBQSxRQUFRLEVBQUVGLE9BTEw7RUFNTEcsSUFBQUEsT0FBTyxFQUFFSCxPQU5KO0VBT0xJLElBQUFBLElBQUksRUFBRUosT0FQRDtFQVFMSyxJQUFBQSxTQUFTLEVBQUVMLE9BUk47RUFTTE0sSUFBQUEsSUFBSSxFQUFFVDtFQVRELEdBRk07RUFhYlUsRUFBQUEsUUFBUSxFQUFFO0VBQ1JDLElBQUFBLE9BRFEscUJBQ0U7RUFBQTs7RUFDUixVQUFJQyxHQUFKO0VBQ0EsVUFBTUMsSUFBSSxHQUFHLEtBQUtmLElBQWxCOztFQUVBLFVBQUksQ0FBQ2UsSUFBTCxFQUFXO0VBQ1Q7RUFDRCxPQUZELE1BRU87RUFDTEQsUUFBQUEsR0FBRyxHQUFHLGdCQUFOO0VBQ0Q7O0VBQ0QsOENBQ0dBLEdBREgsRUFDUyxJQURULHlCQUVFLGVBRkYsRUFFbUIsS0FBS1YsT0FGeEIseUJBR0UsZ0JBSEYsRUFHb0IsS0FBS0UsUUFIekIseUJBSUUsZ0JBSkYsRUFJb0IsS0FBS0MsUUFKekIseUJBS0UsZUFMRixFQUttQixLQUFLQyxPQUx4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
