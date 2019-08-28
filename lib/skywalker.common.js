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
        staticClass: 'sw-item__inner flex items-center',
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
        innerCollapsed: true,
        overflow: 'hidden'
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
    mounted: function mounted() {
      var _this = this;

      this.overflow = this.innerCollapsed ? 'hidden' : 'inherit';
      this.$refs.slide.addEventListener('transitionstart', function () {
        _this.overflow = 'hidden';
      });
      this.$refs.slide.addEventListener('transitionend', function () {
        _this.overflow = _this.innerCollapsed ? 'hidden' : 'inherit';
      });
    },
    render: function render(h) {
      return h('div', {
        ref: 'slide',
        staticClass: 'sw-slide__container',
        class: {
          shadow: this.shadow
        },
        style: {
          overflow: this.overflow
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

  return index;

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2t5d2Fsa2VyLmNvbW1vbi5qcyIsInNvdXJjZXMiOlsiLi4vcGFja2FnZXMvY29tcG9uZW50cy9pY29uL3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9pY29uL2luZGV4LmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9pdGVtL3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9pdGVtL2luZGV4LmpzIiwiLi4vcGFja2FnZXMvbWl4aW5zL3ZhbGlkYXRlLmpzIiwiLi4vcGFja2FnZXMvbWl4aW5zL2FkdmFuY2VkQmx1ci5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvZmllbGQvc3JjL21haW4uanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL2ZpZWxkL2luZGV4LmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9pbnB1dC9zcmMvbWFpbi5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvaW5wdXQvaW5kZXguanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3Njcm9sbEFyZWEvc3JjL21haW4uanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3Njcm9sbEFyZWEvaW5kZXguanMiLCIuLi9wYWNrYWdlcy91dGlscy9pcy5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvc2VsZWN0L3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9zZWxlY3QvaW5kZXguanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL2J1dHRvbi9zcmMvbWFpbi5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvYnV0dG9uL2luZGV4LmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9tb2RhbC9zcmMvbWFpbi5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvbW9kYWwvaW5kZXguanMiLCIuLi9wYWNrYWdlcy91dGlscy9kb20uanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3BvcG92ZXIvc3JjL21haW4uanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3BvcG92ZXIvaW5kZXguanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL2NoZWNrYm94L3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9jaGVja2JveC9pbmRleC5qcyIsIi4uL3BhY2thZ2VzL21peGlucy9zaHV0dGxlLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9jaGVja2JveEdyb3VwL3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9jaGVja2JveEdyb3VwL2luZGV4LmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9yYWRpby9zcmMvbWFpbi5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvcmFkaW8vaW5kZXguanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3JhZGlvR3JvdXAvc3JjL21haW4uanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3JhZGlvR3JvdXAvaW5kZXguanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3BhZ2luYXRpb24vc3JjL3BhZ2luYXRpb24uanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3BhZ2luYXRpb24vc3JjL21haW4udnVlIiwiLi4vbm9kZV9tb2R1bGVzL3Z1ZS1ydW50aW1lLWhlbHBlcnMvZGlzdC9ub3JtYWxpemUtY29tcG9uZW50LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Z1ZS1ydW50aW1lLWhlbHBlcnMvZGlzdC9pbmplY3Qtc3R5bGUvYnJvd3Nlci5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvcGFnaW5hdGlvbi9pbmRleC5qcyIsIi4uL3BhY2thZ2VzL21peGlucy9zbGlkZU9ic2VydmVyLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9zbGlkZS9zcmMvbWFpbi5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvc2xpZGUvaW5kZXguanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL2Jhc2ljSXRlbS9zcmMvbWFpbi5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvYmFzaWNJdGVtL2luZGV4LmpzIiwiLi4vcGFja2FnZXMvdXRpbHMvdmRvbS5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvbm90aWZpY2F0aW9uL3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9ub3RpZmljYXRpb24vc3JjL25vdGlmaWNhdGlvbi5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvbGF5b3V0L3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9sYXlvdXQvaW5kZXguanMiLCIuLi9wYWNrYWdlcy9kaXJlY3RpdmVzL21hc2svc3JjL21haW4uanMiLCIuLi9wYWNrYWdlcy9kaXJlY3RpdmVzL21hc2svaW5kZXguanMiLCIuLi9wYWNrYWdlcy91dGlscy9ldmVudC5qcyIsIi4uL3BhY2thZ2VzL2RpcmVjdGl2ZXMvcmlwcGxlL3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvZGlyZWN0aXZlcy9yaXBwbGUvaW5kZXguanMiLCIuLi9wYWNrYWdlcy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdzd0ljb24nLFxuICBwcm9wczoge1xuICAgIG5hbWU6IFN0cmluZyxcbiAgICBjb2xvcjogU3RyaW5nLFxuICAgIHByaW1hcnk6IEJvb2xlYW4sXG4gICAgbmVnYXRpdmU6IEJvb2xlYW4sXG4gICAgcG9zaXRpdmU6IEJvb2xlYW4sXG4gICAgd2FybmluZzogQm9vbGVhbixcbiAgICBncmV5OiBCb29sZWFuLFxuICAgIGxpZ2h0R3JleTogQm9vbGVhbixcbiAgICBzaXplOiBTdHJpbmdcbiAgfSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBjbGFzc2VzKCkge1xuICAgICAgbGV0IGNsc1xuICAgICAgY29uc3QgaWNvbiA9IHRoaXMubmFtZVxuICBcbiAgICAgIGlmICghaWNvbikge1xuICAgICAgICByZXR1cm5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNscyA9ICdtYXRlcmlhbC1pY29ucydcbiAgICAgIH1cbiAgICAgIHJldHVybiB7XG4gICAgICAgIFtjbHNdOiB0cnVlLFxuICAgICAgICAnY29sb3ItcHJpbWFyeSc6IHRoaXMucHJpbWFyeSxcbiAgICAgICAgJ2NvbG9yLW5lZ2F0aXZlJzogdGhpcy5uZWdhdGl2ZSxcbiAgICAgICAgJ2NvbG9yLXBvc2l0aXZlJzogdGhpcy5wb3NpdGl2ZSxcbiAgICAgICAgJ2NvbG9yLXdhcm5pbmcnOiB0aGlzLndhcm5pbmcsXG4gICAgICAgICdjb2xvci1ncmV5JzogdGhpcy5ncmV5LFxuICAgICAgICAnY29sb3ItbGlnaHQtZ3JleSc6IHRoaXMubGlnaHRHcmV5LFxuICAgICAgfVxuICAgIH0sXG4gICAgY29udGVudCgpIHtcbiAgICAgIHJldHVybiB0aGlzLm5hbWUgfHwgJyAnXG4gICAgfSxcbiAgICBzdHlsZSgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGZvbnRTaXplOiB0aGlzLnNpemUgfHwgdm9pZCAwLFxuICAgICAgICBjb2xvcjogdGhpcy5jb2xvciB8fCB2b2lkIDBcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIHJlbmRlcihoKSB7XG4gICAgcmV0dXJuIGgoJ2knLCB7XG4gICAgICBzdGF0aWNDbGFzczogJ3N3LWljb24nLFxuICAgICAgY2xhc3M6IHRoaXMuY2xhc3NlcyxcbiAgICAgIHN0eWxlOiB0aGlzLnN0eWxlLFxuICAgICAgYXR0cnM6IHsgJ2FyaWEtaGlkZGVuJzogdHJ1ZSB9LFxuICAgICAgb246IHRoaXMuJGxpc3RlbmVyc1xuICAgIH0sIFtcbiAgICAgIHRoaXMuY29udGVudFxuICAgIF0pXG4gIH1cbn1cbiAgIiwiaW1wb3J0IEljb24gZnJvbSAnLi9zcmMvbWFpbi5qcydcblxuY29uc3QgaW5zdGFsbCA9IGZ1bmN0aW9uIChWdWUpIHtcbiAgVnVlLmNvbXBvbmVudChJY29uLm5hbWUsIEljb24pXG59XG5cbkljb24uaW5zdGFsbCA9IGluc3RhbGxcblxuZXhwb3J0IGRlZmF1bHQgSWNvblxuIiwiZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnc3dJdGVtJyxcbiAgcHJvcHM6IHtcbiAgICB3cmFwOiBCb29sZWFuLFxuICAgIGhpZGVCZWZvcmU6IEJvb2xlYW4sXG4gICAgaGlkZURlZmF1bHQ6IEJvb2xlYW4sXG4gICAgaGlkZUFmdGVyOiBCb29sZWFuLFxuICAgIHRvOiBTdHJpbmcgfCBPYmplY3QsXG4gICAgY2VudGVyOiBCb29sZWFuLFxuICAgIGVuZDogQm9vbGVhbixcbiAgICBkaXNhYmxlZDogQm9vbGVhbixcbiAgICBhY3RpdmU6IEJvb2xlYW4sXG4gICAgbWFzazogT2JqZWN0IHwgQm9vbGVhbixcbiAgICByaXBwbGU6IE9iamVjdCB8IEJvb2xlYW5cbiAgfSxcbiAgZGF0YTogKCkgPT4gKHt9KSxcbiAgcmVuZGVyKGgpIHtcbiAgICByZXR1cm4gaChgJHt0aGlzLnRvICE9PSB2b2lkIDAgPyAncm91dGVyLWxpbmsnIDogJ2Rpdid9YCwge1xuICAgICAgc3RhdGljQ2xhc3M6ICdzdy1pdGVtIGZsZXggaXRlbXMtY2VudGVyJyxcbiAgICAgIGNsYXNzOiB7XG4gICAgICAgICduby13cmFwJzogIXRoaXMud3JhcCxcbiAgICAgICAgYWN0aXZlOiB0aGlzLmFjdGl2ZSxcbiAgICAgICAgZGlzYWJsZTogdGhpcy5kaXNhYmxlZFxuICAgICAgfSxcbiAgICAgIG9uOiB0aGlzLmRpc2FibGVkID8gdm9pZCAwIDoge1xuICAgICAgICAuLi50aGlzLiRsaXN0ZW5lcnMsXG4gICAgICAgIGNsaWNrOiAoKSA9PiB7XG4gICAgICAgICAgdGhpcy4kZW1pdCgnY2xpY2snKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcHJvcHM6IHtcbiAgICAgICAgdG86IHRoaXMudG9cbiAgICAgIH0sXG4gICAgICBkaXJlY3RpdmVzOiAodGhpcy50byAhPT0gdm9pZCAwIHx8IHRoaXMuYWN0aXZlICE9PSB2b2lkIDAgfHwgdGhpcy5tYXNrID8gW1xuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ21hc2snLFxuICAgICAgICAgIHZhbHVlOiB0aGlzLm1hc2sgPyB7XG4gICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5tYXNrLmRpc2FibGVkLFxuICAgICAgICAgICAgY29sb3I6IHRoaXMubWFzay5jb2xvcixcbiAgICAgICAgICAgIHN0YXk6IHRoaXMubWFzay5zdGF5XG4gICAgICAgICAgfSA6IHsgZGlzYWJsZWQ6IHRydWUgfVxuICAgICAgICB9LFxuICAgICAgXSA6IFtdKS5jb25jYXQodGhpcy5yaXBwbGUgPyBbXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiAncmlwcGxlJyxcbiAgICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMucmlwcGxlLmRpc2FibGVkLFxuICAgICAgICAgICAgY29sb3I6IHRoaXMucmlwcGxlLmNvbG9yLFxuICAgICAgICAgICAgY2VudGVyOiB0aGlzLnJpcHBsZS5jZW50ZXJcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF0gOiBbXSlcbiAgICB9LCBbXG4gICAgICBoKCdkaXYnLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctaXRlbV9fY29udGVudCBmbGV4IGl0ZW1zLWNlbnRlcicsXG4gICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgJ25vLXdyYXAnOiAhdGhpcy53cmFwXG4gICAgICAgIH1cbiAgICAgIH0sIFtcblxuICAgICAgICB0aGlzLiRzY29wZWRTbG90cy5iZWZvcmUgIT09IHZvaWQgMCA/IGgoJ2RpdicsIHtcbiAgICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWl0ZW1fX2JlZm9yZSBmbGV4IGl0ZW1zLWNlbnRlcicsXG4gICAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAgIGhpZGU6IHRoaXMuaGlkZUJlZm9yZSxcbiAgICAgICAgICAgICdmbGV4LWF1dG8nOiB0aGlzLmhpZGVEZWZhdWx0LFxuICAgICAgICAgICAgJ25vLXdyYXAnOiAhdGhpcy53cmFwXG4gICAgICAgICAgfVxuICAgICAgICB9LCBbdGhpcy4kc2NvcGVkU2xvdHMuYmVmb3JlKCldKSA6IHZvaWQgMCxcbiAgXG4gICAgICAgIHRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQgIT09IHZvaWQgMCA/IGgoJ2RpdicsIHtcbiAgICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWl0ZW1fX2lubmVyIGZsZXggaXRlbXMtY2VudGVyJyxcbiAgICAgICAgICBjbGFzczoge1xuICAgICAgICAgICAgaGlkZTogdGhpcy5oaWRlRGVmYXVsdCxcbiAgICAgICAgICAgICduby13cmFwJzogIXRoaXMud3JhcCxcbiAgICAgICAgICAgICdqdXN0aWZ5LWNlbnRlcic6IHRoaXMuY2VudGVyLFxuICAgICAgICAgICAgJ2p1c3RpZnktZW5kJzogdGhpcy5lbmRcblxuICAgICAgICAgIH1cbiAgICAgICAgfSwgW3RoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQoKV0pIDogdm9pZCAwLFxuICBcbiAgICAgICAgdGhpcy4kc2NvcGVkU2xvdHMuYWZ0ZXIgIT09IHZvaWQgMCA/IGgoJ2RpdicsIHtcbiAgICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWl0ZW1fX2FmdGVyIGZsZXggaXRlbXMtY2VudGVyJyxcbiAgICAgICAgICBjbGFzczoge1xuICAgICAgICAgICAgaGlkZTogdGhpcy5oaWRlQWZ0ZXIsXG4gICAgICAgICAgICAnbm8td3JhcCc6ICF0aGlzLndyYXBcbiAgICAgICAgICB9XG4gICAgICAgIH0sIFt0aGlzLiRzY29wZWRTbG90cy5hZnRlcigpXSkgOiB2b2lkIDBcbiAgICAgIF0pXG4gICAgXSlcbiAgfVxufVxuICAiLCJpbXBvcnQgSXRlbSBmcm9tICcuL3NyYy9tYWluLmpzJ1xuXG5jb25zdCBpbnN0YWxsID0gZnVuY3Rpb24gKFZ1ZSkge1xuICBWdWUuY29tcG9uZW50KEl0ZW0ubmFtZSwgSXRlbSlcbn1cblxuSXRlbS5pbnN0YWxsID0gaW5zdGFsbFxuXG5leHBvcnQgZGVmYXVsdCBJdGVtXG4iLCJcbmV4cG9ydCBkZWZhdWx0IHtcbiAgcHJvcHM6IHtcbiAgICBlcnJvck1lc3NhZ2U6IFN0cmluZyxcbiAgICBydWxlczogQXJyYXlcbiAgfSxcblxuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpc0RpcnR5OiBmYWxzZSxcbiAgICAgIGlubmVyRXJyb3I6IGZhbHNlLFxuICAgICAgaW5uZXJFcnJvck1lc3NhZ2U6IHZvaWQgMFxuICAgIH1cbiAgfSxcblxuICB3YXRjaDoge1xuICAgIGZvcmNlQ2hlY2sodikge1xuICAgICAgaWYgKHRoaXMucnVsZXMgPT09IHZvaWQgMCkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHRoaXMuaXNEaXJ0eSA9IHRydWVcbiAgICAgIHRoaXMudmFsaWRhdGUodilcbiAgICB9LFxuICAgIHZhbHVlKHYpIHtcbiAgICAgIGlmICh0aGlzLmZvcmNlQ2hlY2sgIT09IHZvaWQgMCB8fCB0aGlzLnJ1bGVzID09PSB2b2lkIDApIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICB0aGlzLmlzRGlydHkgPSB0cnVlXG4gICAgICB0aGlzLnZhbGlkYXRlKHYpXG4gICAgfVxuICB9LFxuXG4gIGNvbXB1dGVkOiB7XG4gICAgdmFsaWRhdGVWYWx1ZSgpIHtcbiAgICAgIHJldHVybiB0aGlzLmZvcmNlQ2hlY2sgPT09IHZvaWQgMCA/IHRoaXMudmFsdWUgOiB0aGlzLmZvcmNlQ2hlY2tcbiAgICB9LFxuICAgIGhhc0Vycm9yKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaW5uZXJFcnJvciA9PT0gdHJ1ZVxuICAgIH0sXG5cbiAgICBjb21wdXRlZEVycm9yTWVzc2FnZSgpIHtcbiAgICAgIHJldHVybiB0aGlzLmVycm9yTWVzc2FnZSAhPT0gdm9pZCAwXG4gICAgICAgID8gdGhpcy5lcnJvck1lc3NhZ2VcbiAgICAgICAgOiB0aGlzLmlubmVyRXJyb3JNZXNzYWdlXG4gICAgfVxuICB9LFxuXG4gIG1vdW50ZWQoKSB7XG4gICAgdGhpcy4kb24oYGJsdXJgLCB0aGlzLnRyaWdnZXJWYWxpZGF0aW9uKVxuICB9LFxuXG4gIGJlZm9yZURlc3Ryb3koKSB7XG4gICAgdGhpcy4kb2ZmKGBibHVyYCwgdGhpcy50cmlnZ2VyVmFsaWRhdGlvbilcbiAgfSxcblxuICBtZXRob2RzOiB7XG4gICAgcmVzZXRWYWxpZGF0aW9uKCkge1xuICAgICAgdGhpcy5pc0RpcnR5ID0gZmFsc2VcbiAgICAgIHRoaXMuaW5uZXJFcnJvciA9IGZhbHNlXG4gICAgICB0aGlzLmlubmVyRXJyb3JNZXNzYWdlID0gdm9pZCAwXG4gICAgfSxcblxuICAgIHZhbGlkYXRlKHZhbCA9IHRoaXMudmFsaWRhdGVWYWx1ZSkge1xuICAgICAgaWYgKCF0aGlzLnJ1bGVzIHx8IHRoaXMucnVsZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBjb25zdCB1cGRhdGUgPSAoZXJyLCBtc2cpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuaW5uZXJFcnJvciAhPT0gZXJyKSB7XG4gICAgICAgICAgdGhpcy5pbm5lckVycm9yID0gZXJyXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtID0gbXNnIHx8IHZvaWQgMFxuXG4gICAgICAgIGlmICh0aGlzLmlubmVyRXJyb3JNZXNzYWdlICE9PSBtKSB7XG4gICAgICAgICAgdGhpcy5pbm5lckVycm9yTWVzc2FnZSA9IG1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZXJyXG4gICAgICB9XG5cbiAgICAgIHJldHVybiAhdGhpcy5ydWxlcy5zb21lKHJ1bGUgPT4ge1xuICAgICAgICBsZXQgcmVzXG5cbiAgICAgICAgaWYgKHR5cGVvZiBydWxlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgcmVzID0gcnVsZSh2YWwpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlcyA9PT0gZmFsc2UgfHwgdHlwZW9mIHJlcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICByZXR1cm4gdXBkYXRlKHRydWUsIHJlcylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdXBkYXRlKGZhbHNlKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG5cbiAgICB0cmlnZ2VyVmFsaWRhdGlvbihmb3JjZSA9IHRydWUpIHtcbiAgICAgIGlmIChmb3JjZSA9PT0gdHJ1ZSB8fCB0aGlzLmlzRGlydHkgPT09IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuaXNEaXJ0eSA9IHRydWVcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGUodGhpcy52YWxpZGF0ZVZhbHVlKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiXG5leHBvcnQgZGVmYXVsdCB7XG4gIHByb3BzOiB7fSxcbiAgZGF0YTogKCkgPT4gKHt9KSxcbiAgd2F0Y2g6IHt9LFxuICBjb21wdXRlZDoge30sXG4gIG1ldGhvZHM6IHtcbiAgICBhZHZhbmNlZEJsdXIoZSkge1xuICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHsgcmV0dXJuIH1cbiAgICAgIGxldCBleGNsdWRlZCA9IGZhbHNlXG4gICAgICBsZXQgZ2V0UmVmcyA9IHJlZk5hbWVzID0+IHtcbiAgICAgICAgbGV0IGdldERvbXMgPSBlbHMgPT4ge1xuICAgICAgICAgIGVscyA9IEFycmF5LmlzQXJyYXkoZWxzKSA/IGVscyA6IFtlbHNdXG4gICAgICAgICAgcmV0dXJuIGVscy5yZWR1Y2UoKGFjY3VtdWxhdG9yLCBlbCkgPT4ge1xuICAgICAgICAgICAgYWNjdW11bGF0b3IucHVzaChlbCAmJiAoZWwuJGVsIHx8IGVsKSlcbiAgICAgICAgICAgIHJldHVybiBhY2N1bXVsYXRvclxuICAgICAgICAgIH0sIFtdKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlZk5hbWVzLnJlZHVjZSgoYWNjdW11bGF0b3IsIHJlZikgPT4gYWNjdW11bGF0b3IuY29uY2F0KGdldERvbXModGhpcy4kcmVmc1tyZWZdKSksIFtdKVxuICAgICAgfVxuICAgICAgXG4gICAgICBpZiAodGhpcy5leGNsdWRlZEJsdXJSZWZzKSB7XG4gICAgICAgIGxldCByZWZzID0gZ2V0UmVmcyh0aGlzLmV4Y2x1ZGVkQmx1clJlZnMpXG5cbiAgICAgICAgcmVmcy5zb21lKHJlZiA9PiB7XG4gICAgICAgICAgaWYgKHJlZiA9PT0gdm9pZCAwKSB7IHJldHVybiBmYWxzZSB9XG4gICAgICAgICAgZXhjbHVkZWQgPSByZWYuY29udGFpbnMoZS50YXJnZXQpIHx8IGZhbHNlXG4gICAgICAgICAgcmV0dXJuIGV4Y2x1ZGVkXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICBpZiAoZXhjbHVkZWQpIHtcbiAgICAgICAgdGhpcy5mb2N1c2VkID0gdHJ1ZVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGxldCBmb2N1c2VkQmVmb3JlID0gdGhpcy5mb2N1c2VkXG5cbiAgICAgIGlmICh0aGlzLmJsdXJUeXBlID09PSAncmV2ZXJzZScgJiYgZm9jdXNlZEJlZm9yZSkge1xuICAgICAgICB0aGlzLmZvY3VzZWQgPSAhZm9jdXNlZEJlZm9yZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHJlZnMgPSBnZXRSZWZzKHRoaXMuYmx1clJlZnMpXG5cbiAgICAgICAgcmVmcy5zb21lKHJlZiA9PiB7XG4gICAgICAgICAgaWYgKHJlZiA9PT0gdm9pZCAwKSB7IHJldHVybiBmYWxzZSB9XG4gICAgICAgICAgdGhpcy5mb2N1c2VkID0gcmVmLmNvbnRhaW5zKGUudGFyZ2V0KSB8fCBmYWxzZVxuICAgICAgICAgIHJldHVybiB0aGlzLmZvY3VzZWRcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5mb2N1c2VkICYmIGZvY3VzZWRCZWZvcmUpIHsgdGhpcy4kZW1pdChgYmx1cmAsIGUpIH1cbiAgICB9XG4gIH0sXG4gIG1vdW50ZWQoKSB7XG4gICAgaWYgKHRoaXMuYmx1clJlZnMpIHsgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuYWR2YW5jZWRCbHVyLCBmYWxzZSkgfVxuICB9LFxuICBiZWZvcmVEZXN0cm95KCkge1xuICAgIGlmICh0aGlzLmJsdXJSZWZzKSB7IGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmFkdmFuY2VkQmx1ciwgZmFsc2UpIH1cbiAgfSxcbn1cbiAgIiwiaW1wb3J0IFZhbGlkYXRlTWl4aW4gZnJvbSAnLi4vLi4vLi4vbWl4aW5zL3ZhbGlkYXRlJ1xuaW1wb3J0IEFkdmFuY2VkQmx1ck1peGluIGZyb20gJy4uLy4uLy4uL21peGlucy9hZHZhbmNlZEJsdXInXG5pbXBvcnQgSXRlbSBmcm9tICcuLi8uLi9pdGVtJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdzd0ZpZWxkJyxcbiAgbWl4aW5zOiBbVmFsaWRhdGVNaXhpbiwgQWR2YW5jZWRCbHVyTWl4aW5dLCAvLyBoYXNFcnJvcixjb21wdXRlZEVycm9yTWVzc2FnZVxuICBjb21wb25lbnRzOiB7IEl0ZW0gfSxcbiAgcHJvcHM6IHtcbiAgICByZXF1aXJlZDogQm9vbGVhbixcbiAgICB1bmRlcmxpbmVkOiBCb29sZWFuLFxuICAgIGJvcmRlcmVkOiBCb29sZWFuLFxuICAgIGZpbGxlZDogQm9vbGVhbixcbiAgICBkaXNhYmxlZDogQm9vbGVhbixcbiAgICBtaW5pOiBCb29sZWFuLFxuICAgIGxhYmVsOiBTdHJpbmcsXG4gICAgZm9yY2VDaGVjazogU3RyaW5nIHwgT2JqZWN0LFxuICAgIHNwYWNlQXJvdW5kOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgIH1cbiAgfSxcbiAgZGF0YTogKCkgPT4gKHtcbiAgICBmb2N1c2VkOiBmYWxzZVxuICB9KSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBibHVyUmVmcygpIHtcbiAgICAgIHJldHVybiBbJ2ZpZWxkQ29udGVudCddXG4gICAgfVxuICB9LFxuICB3YXRjaDoge1xuICAgIGZvY3VzZWQoKSB7XG4gICAgICBpZiAodGhpcy5mb2N1c2VkICYmIHRoaXMuZm9jdXMpIHsgdGhpcy5mb2N1cygpIH1cbiAgICAgIGlmICghdGhpcy5mb2N1c2VkICYmIHRoaXMuYmx1cikgeyB0aGlzLmJsdXIoKSB9XG4gICAgfVxuICB9LFxuICByZW5kZXIoaCkge1xuICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICBzdGF0aWNDbGFzczogJ3N3LWZpZWxkIGZsZXggbm8td3JhcCBpdGVtcy1jZW50ZXInLFxuICAgICAgY2xhc3M6IHtcbiAgICAgICAgZGlzYWJsZTogdGhpcy5kaXNhYmxlZCxcbiAgICAgICAgJ3NwYWNlLWFyb3VuZCc6IHRoaXMuc3BhY2VBcm91bmRcbiAgICAgIH1cbiAgICB9LCBbXG4gICAgICB0aGlzLmxhYmVsICE9PSB2b2lkIDAgPyBoKCdkaXYnLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctZmllbGRfX2xhYmVsIGZsZXggbm8td3JhcCBpdGVtcy1jZW50ZXInXG4gICAgICB9LCBbaCgnZGl2Jywge1xuICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWxhYmVsIGZsZXggbm8td3JhcCBpdGVtcy1jZW50ZXInLFxuICAgICAgICBjbGFzczoge1xuICAgICAgICAgIHJlcXVpcmVkOiB0aGlzLnJlcXVpcmVkXG4gICAgICAgIH1cbiAgICAgIH0sIHRoaXMubGFiZWwpXG4gICAgICBdKSA6IHZvaWQgMCxcblxuICAgICAgaCgnZGl2Jywge1xuICAgICAgICByZWY6ICdmaWVsZENvbnRlbnQnLFxuICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWZpZWxkX19jb250ZW50IGZsZXggbm8td3JhcCBpdGVtcy1jZW50ZXIgc3ctZm9ybScsXG4gICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgdW5kZXJsaW5lOiB0aGlzLnVuZGVybGluZWQsXG4gICAgICAgICAgYm9yZGVyOiB0aGlzLmJvcmRlcmVkLFxuICAgICAgICAgIGZpbGw6IHRoaXMuZmlsbGVkLFxuICAgICAgICAgIGZvY3VzOiAhdGhpcy5oYXNFcnJvciAmJiB0aGlzLmZvY3VzZWQsXG4gICAgICAgICAgZXJyb3I6IHRoaXMuaGFzRXJyb3IsXG4gICAgICAgICAgJ3BhZGRpbmctbWluJzogIXRoaXMubWluaSxcbiAgICAgICAgICAnaW5uZXItcG9pbnRlcic6IHRoaXMuaW5uZXJQb2ludGVyXG4gICAgICAgIH1cbiAgICAgIH0sIFtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA/IGgoJ2RpdicsIHtcbiAgICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWZpZWxkX19kaXNhYmxlZCdcbiAgICAgICAgfSkgOiB2b2lkIDAsXG5cbiAgICAgICAgaCgnc3ctaXRlbScsIHtcbiAgICAgICAgICBzdGF0aWNDbGFzczogJ2ZsZXgtYXV0bycsXG4gICAgICAgICAgc2NvcGVkU2xvdHM6IHtcbiAgICAgICAgICAgIGJlZm9yZTogdGhpcy4kc2NvcGVkU2xvdHMuYmVmb3JlICE9PSB2b2lkIDBcbiAgICAgICAgICAgICAgPyAoKSA9PiBbaCgnZGl2Jywge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiAnZmxleCBuby13cmFwIGl0ZW1zLWNlbnRlciBtYXJnaW4tbWluJ1xuICAgICAgICAgICAgICB9LCBbdGhpcy4kc2NvcGVkU2xvdHMuYmVmb3JlKCldKV0gOiB2b2lkIDAsXG5cbiAgICAgICAgICAgIGRlZmF1bHQ6IHRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQgIT09IHZvaWQgMCB8fCB0aGlzLmdldElubmVyICE9PSB2b2lkIDBcbiAgICAgICAgICAgICAgPyAoKSA9PiBbdGhpcy5nZXRJbm5lciAhPT0gdm9pZCAwID8gdGhpcy5nZXRJbm5lcihoKSA6IHZvaWQgMCwgdGhpcy4kc2NvcGVkU2xvdHMuZGVmYXVsdCAhPT0gdm9pZCAwICYmIHRoaXMuZ2V0SW5uZXIgPT09IHZvaWQgMCA/IHRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQoKSA6IHZvaWQgMF0gOiB2b2lkIDAsXG5cbiAgICAgICAgICAgIGFmdGVyOiB0aGlzLiRzY29wZWRTbG90cy5hZnRlciAhPT0gdm9pZCAwIHx8IHRoaXMuZ2V0QWZ0ZXIgIT09IHZvaWQgMFxuICAgICAgICAgICAgICA/ICgpID0+IFtoKCdkaXYnLCB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6ICdmbGV4IG5vLXdyYXAgaXRlbXMtY2VudGVyIG1hcmdpbi1taW4nXG4gICAgICAgICAgICAgIH0sIFt0aGlzLmdldEFmdGVyICE9PSB2b2lkIDAgPyB0aGlzLmdldEFmdGVyKGgpIDogdm9pZCAwLCB0aGlzLiRzY29wZWRTbG90cy5hZnRlciAhPT0gdm9pZCAwICYmIHRoaXMuZ2V0QWZ0ZXIgPT09IHZvaWQgMCA/IHRoaXMuJHNjb3BlZFNsb3RzLmFmdGVyKCkgOiB2b2lkIDBdKV0gOiB2b2lkIDBcbiAgICAgICAgICB9XG4gICAgICAgIH0pLFxuXG4gICAgICAgIHRoaXMuaGFzRXJyb3IgPyBoKCdkaXYnLCB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1maWVsZF9fZXJyb3IgZmxleCBuby13cmFwIGl0ZW1zLWNlbnRlcidcbiAgICAgICAgfSwgdGhpcy5jb21wdXRlZEVycm9yTWVzc2FnZSkgOiB2b2lkIDBcbiAgICAgIF0pXG4gICAgXSlcbiAgfVxufVxuICAiLCJpbXBvcnQgRmllbGQgZnJvbSAnLi9zcmMvbWFpbi5qcydcblxuY29uc3QgaW5zdGFsbCA9IGZ1bmN0aW9uIChWdWUpIHtcbiAgVnVlLmNvbXBvbmVudChGaWVsZC5uYW1lLCBGaWVsZClcbn1cblxuRmllbGQuaW5zdGFsbCA9IGluc3RhbGxcblxuZXhwb3J0IGRlZmF1bHQgRmllbGRcbiIsImltcG9ydCBGaWVsZCBmcm9tICcuLi8uLi9maWVsZCdcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnc3dJbnB1dCcsXG4gIG1peGluczogW0ZpZWxkXSwgLy8gZm9jdXNlZCxkaXNhYmxlZFxuICBwcm9wczoge1xuICAgIHZhbHVlOiBTdHJpbmcsXG4gICAgcGxhY2Vob2xkZXI6IFN0cmluZyxcbiAgICBhdXRvY29tcGxldGU6IEJvb2xlYW5cbiAgfSxcbiAgZGF0YTogKCkgPT4gKHt9KSxcbiAgY29tcHV0ZWQ6IHt9LFxuICBtZXRob2RzOiB7XG4gICAgZm9jdXMoKSB7XG4gICAgICB0aGlzLiRyZWZzLmlucHV0LmZvY3VzKClcbiAgICB9LFxuICAgIGJsdXIoKSB7XG4gICAgICB0aGlzLiRyZWZzLmlucHV0LmJsdXIoKVxuICAgIH0sXG4gICAgZ2V0SW5uZXIoaCkge1xuICAgICAgcmV0dXJuIFtoKCdpbnB1dCcsIHtcbiAgICAgICAgcmVmOiAnaW5wdXQnLFxuICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWlucHV0IG1hcmdpbi1taW4nLFxuICAgICAgICBhdHRyczoge1xuICAgICAgICAgIGF1dG9jb21wbGV0ZTogdGhpcy5hdXRvY29tcGxldGUgPyAnb24nIDogJ29mZidcbiAgICAgICAgfSxcbiAgICAgICAgZG9tUHJvcHM6IHtcbiAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcbiAgICAgICAgICBwbGFjZWhvbGRlcjogdGhpcy5wbGFjZWhvbGRlciB8fCAnJyxcbiAgICAgICAgICBkaXNhYmxlZDogdGhpcy5kaXNhYmxlZFxuICAgICAgICB9LFxuICAgICAgICBvbjoge1xuICAgICAgICAgIC4uLnRoaXMuJGxpc3RlbmVycyxcbiAgICAgICAgICBibHVyOiBlID0+IHtcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2JsdXInLCBlLnRhcmdldC52YWx1ZSlcbiAgICAgICAgICB9LFxuICAgICAgICAgIGlucHV0OiBlID0+IHtcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2lucHV0JywgZS50YXJnZXQudmFsdWUpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KV1cbiAgICB9XG4gIH1cbn1cbiAgIiwiaW1wb3J0IElucHV0IGZyb20gJy4vc3JjL21haW4uanMnXG5cbmNvbnN0IGluc3RhbGwgPSBmdW5jdGlvbiAoVnVlKSB7XG4gIFZ1ZS5jb21wb25lbnQoSW5wdXQubmFtZSwgSW5wdXQpXG59XG5cbklucHV0Lmluc3RhbGwgPSBpbnN0YWxsXG5cbmV4cG9ydCBkZWZhdWx0IElucHV0XG4iLCJleHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdzd1Njcm9sbEFyZWEnLFxuICBwcm9wczoge1xuICAgIHg6IEJvb2xlYW4sXG4gICAgeTogQm9vbGVhbixcbiAgICB3aWR0aDogU3RyaW5nLFxuICAgIGhlaWdodDogU3RyaW5nLFxuICAgIHN0cmV0Y2g6IEJvb2xlYW5cbiAgfSxcbiAgZGF0YTogKCkgPT4gKHt9KSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBzdHlsZSgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgICdvdmVyZmxvdy14JzogdGhpcy54ID8gJ2F1dG8nIDogJ2hpZGRlbicsXG4gICAgICAgICdvdmVyZmxvdy15JzogdGhpcy55ID8gJ2F1dG8nIDogJ2hpZGRlbicsXG4gICAgICAgICdtYXgtd2lkdGgnOiB0aGlzLndpZHRoIHx8ICcxMDAlJyxcbiAgICAgICAgd2lkdGg6IHRoaXMud2lkdGggfHwgJzEwMCUnLFxuICAgICAgICAnbWF4LWhlaWdodCc6IHRoaXMuaGVpZ2h0IHx8ICcxMDAlJyxcbiAgICAgICAgaGVpZ2h0OiB0aGlzLnN0cmV0Y2ggJiYgKHRoaXMuaGVpZ2h0IHx8ICcxMDAlJylcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHt9LFxuICByZW5kZXIoaCkge1xuICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICBzdGF0aWNDbGFzczogJ3N3LXNjcm9sbC1hcmVhJyxcbiAgICAgIHN0eWxlOiB0aGlzLnN0eWxlLFxuICAgICAgb246IHRoaXMuJGxpc3RlbmVyc1xuICAgIH0sIHRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQgIT09IHZvaWQgMCA/IFt0aGlzLiRzY29wZWRTbG90cy5kZWZhdWx0KCldIDogdm9pZCAwKVxuICB9XG59XG4gICIsImltcG9ydCBTY3JvbGxBcmVhIGZyb20gJy4vc3JjL21haW4uanMnXG5cbmNvbnN0IGluc3RhbGwgPSBmdW5jdGlvbiAoVnVlKSB7XG4gIFZ1ZS5jb21wb25lbnQoU2Nyb2xsQXJlYS5uYW1lLCBTY3JvbGxBcmVhKVxufVxuXG5TY3JvbGxBcmVhLmluc3RhbGwgPSBpbnN0YWxsXG5cbmV4cG9ydCBkZWZhdWx0IFNjcm9sbEFyZWFcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXNlbGYtY29tcGFyZSAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRGVlcEVxdWFsKGEsIGIpIHtcbiAgaWYgKGEgPT09IGIpIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgaWYgKGEgaW5zdGFuY2VvZiBEYXRlICYmIGIgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgcmV0dXJuIGEuZ2V0VGltZSgpID09PSBiLmdldFRpbWUoKVxuICB9XG5cbiAgaWYgKGEgIT09IGEgJiYgYiAhPT0gYikge1xuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBpZiAoYSAhPT0gT2JqZWN0KGEpIHx8IGIgIT09IE9iamVjdChiKSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgY29uc3QgcHJvcHMgPSBPYmplY3Qua2V5cyhhKVxuXG4gIGlmIChwcm9wcy5sZW5ndGggIT09IE9iamVjdC5rZXlzKGIpLmxlbmd0aCkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgcmV0dXJuIHByb3BzLmV2ZXJ5KHByb3AgPT4gaXNEZWVwRXF1YWwoYVtwcm9wXSwgYltwcm9wXSkpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZ0NvbnRhaW4ocywgdiwgcmFuZG9tKSB7XG4gIGxldCBpbm5lclMgPSBTdHJpbmcocylcbiAgbGV0IGlubmVyViA9IHJhbmRvbSA9PT0gdHJ1ZSA/IHYucmVwbGFjZSgvXFxzKy9nLCAnJykuc3BsaXQoJycpIDogdi5yZXBsYWNlKC9cXHMrL2csICcgJykuc3BsaXQoJyAnKVxuICBsZXQgc3VtID0gMFxuXG4gIGlubmVyVi5mb3JFYWNoKHggPT4ge1xuICAgIGlmIChpbm5lclMuaW5jbHVkZXMoeCkpIHtcbiAgICAgIGlubmVyUyA9IGlubmVyUy5yZXBsYWNlKHgsICcnKVxuICAgICAgc3VtKytcbiAgICB9XG4gIH0pXG4gIHJldHVybiBzdW0gPj0gaW5uZXJWLmxlbmd0aFxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNPYmplY3Qodikge1xuICByZXR1cm4gT2JqZWN0KHYpID09PSB2XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0RhdGUodikge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHYpID09PSAnW29iamVjdCBEYXRlXSdcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUmVnZXhwKHYpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2KSA9PT0gJ1tvYmplY3QgUmVnRXhwXSdcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtYmVyKHYpIHtcbiAgcmV0dXJuIHR5cGVvZiB2ID09PSAnbnVtYmVyJyAmJiBpc0Zpbml0ZSh2KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmcodikge1xuICByZXR1cm4gdHlwZW9mIHYgPT09ICdzdHJpbmcnXG59XG4iLCJpbXBvcnQgRmllbGQgZnJvbSAnLi4vLi4vZmllbGQnXG5pbXBvcnQgU2NvcmxsQXJlYSBmcm9tICcuLi8uLi9zY3JvbGxBcmVhJ1xuaW1wb3J0IHsgaXNEZWVwRXF1YWwsIGlzU3RyaW5nQ29udGFpbiwgaXNPYmplY3QgfSBmcm9tICcuLi8uLi8uLi91dGlscy9pcydcblxuLy8gaW1wb3J0IHsgZGVkdXBsaWNhdGUgfSBmcm9tICcuLi8uLi8uLi91dGlscy9kZWR1cGxpY2F0ZSdcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnc3dTZWxlY3QnLFxuICBtaXhpbnM6IFtGaWVsZF0sIC8vIGZvY3VzZWQsZGlzYWJsZWRcbiAgY29tcG9uZW50czoge1xuICAgIFNjb3JsbEFyZWFcbiAgfSxcbiAgcHJvcHM6IHtcbiAgICBtdWx0aXBsZTogQm9vbGVhbixcbiAgICB2YWx1ZToge1xuICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICB9LFxuICAgIG9wdGlvbnM6IEFycmF5LFxuICAgIGZpbHRlcjogQm9vbGVhbixcbiAgICBwbGFjZWhvbGRlcjogU3RyaW5nLFxuICAgIG9wdGlvbnNIZWlnaHQ6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICcyMDBweCdcbiAgICB9LFxuICAgIHNlbGVjdGVkU3R5bGU6IFN0cmluZ1xuICB9LFxuICBkYXRhOiAoKSA9PiAoe1xuICAgIGJsdXJUeXBlOiAncmV2ZXJzZScsXG4gICAgZmlsdGVyVmFsdWU6ICcnXG4gIH0pLFxuICBjb21wdXRlZDoge1xuICAgIGV4Y2x1ZGVkQmx1clJlZnMoKSB7XG4gICAgICByZXR1cm4gdGhpcy5maWx0ZXIgPyBbJ2lucHV0JywgJ3NlbGVjdGVkJywgJ3NlbGVjdE9wdGlvbnMnXSA6IFsnc2VsZWN0ZWQnLCAnc2VsZWN0T3B0aW9ucyddXG4gICAgfSxcbiAgICBpbm5lclZhbHVlOiB7XG4gICAgICBnZXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEV4YWN0VmFsdWVzKHRoaXMudmFsdWUpXG4gICAgICB9LFxuICAgICAgc2V0KHZhbCkge1xuICAgICAgICB0aGlzLiRlbWl0KFxuICAgICAgICAgICdpbnB1dCcsXG4gICAgICAgICAgdmFsXG4gICAgICAgIClcbiAgICAgIH1cbiAgICB9LFxuICAgIGlubmVyT3B0aW9ucygpIHtcbiAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMucmVkdWNlKChhLCBjKSA9PiB7XG4gICAgICAgIGlmIChpc1N0cmluZ0NvbnRhaW4odGhpcy5nZXROYW1lKGMpLCB0aGlzLmZpbHRlclZhbHVlKSkge1xuICAgICAgICAgIGEucHVzaChjKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhXG4gICAgICB9LCBbXSkgfHwgW11cbiAgICB9XG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgb3B0aW9ucygpIHtcbiAgICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHRoaXMuZ2V0RXhhY3RWYWx1ZXModGhpcy52YWx1ZSlcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBmb2N1cygpIHtcbiAgICAgIHRoaXMuJG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgdGhpcy4kcmVmcy5pbnB1dC5mb2N1cygpXG4gICAgICB9KVxuICAgIH0sXG4gICAgYmx1cigpIHtcbiAgICAgIHRoaXMuJHJlZnMuaW5wdXQuYmx1cigpXG4gICAgfSxcbiAgICBjbGVhckZpbHRlcigpIHtcbiAgICAgIHRoaXMuZmlsdGVyVmFsdWUgPSAnJ1xuICAgIH0sXG4gICAgdHJpZ2dlckJsdXIoZSkge1xuICAgICAgdGhpcy5mb2N1c2VkID0gZmFsc2VcbiAgICAgIHRoaXMuJGVtaXQoYGJsdXJgLCBlKVxuICAgIH0sXG4gICAgZ2V0SW5uZXIoaCkge1xuICAgICAgbGV0IGdldE9wdGlvbnMgPSBoID0+IHtcbiAgICAgICAgaWYgKHRoaXMuaW5uZXJPcHRpb25zLmxlbmd0aCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLmlubmVyT3B0aW9ucy5tYXAob3B0aW9uID0+IGgoJ3N3LWl0ZW0nLCB7XG4gICAgICAgICAgICBjbGFzczoge1xuICAgICAgICAgICAgICBzZWxlY3RlZDogdGhpcy5jaGVja1NlbGVjdGVkKG9wdGlvbilcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBuYXRpdmVPbjoge1xuICAgICAgICAgICAgICBjbGljazogZSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbm5lclZhbHVlID0gdGhpcy5mb3JtYXRWYWx1ZShvcHRpb24pXG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhckZpbHRlcigpXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXJCbHVyKGUpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuZm9jdXMoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNjb3BlZFNsb3RzOiB7XG4gICAgICAgICAgICAgIGRlZmF1bHQ6ICgpID0+IFtoKCdkaXYnLCB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1zZWxlY3RfX29wdGlvbidcbiAgICAgICAgICAgICAgfSwgU3RyaW5nKHRoaXMuZ2V0TmFtZShvcHRpb24pKSldXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIFtoKCdzdy1pdGVtJywge1xuICAgICAgICAgICAgc2NvcGVkU2xvdHM6IHtcbiAgICAgICAgICAgICAgZGVmYXVsdDogKCkgPT4gW2goJ2RpdicsIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogJ3N3LXNlbGVjdF9fb3B0aW9uIG5vLW9wdGlvbnMnXG4gICAgICAgICAgICAgIH0sICdubyBvcHRpb25zJyldXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSldXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGV0IGdldFNlbGVjdGVkID0gaCA9PiB0aGlzLmdldEV4YWN0T3B0aW9ucyh0aGlzLmlubmVyVmFsdWUpLm1hcCh4ID0+IGgoJ3N3LWl0ZW0nLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiAnbWFyZ2luLW1pbiBzdy1mb3JtIHNlbGVjdGVkLW9wdGlvbicsXG4gICAgICAgIGNsYXNzOiB0aGlzLnNlbGVjdGVkU3R5bGUgPT09IHZvaWQgMFxuICAgICAgICAgID8ge1xuICAgICAgICAgICAgdW5kZXJsaW5lOiB0aGlzLnVuZGVybGluZWQsXG4gICAgICAgICAgICBib3JkZXI6IHRoaXMuYm9yZGVyZWQsXG4gICAgICAgICAgICBmaWxsOiB0aGlzLmZpbGxlZFxuICAgICAgICAgIH0gOiB7XG4gICAgICAgICAgICBbdGhpcy5zZWxlY3RlZFN0eWxlXTogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgIHJlZjogJ3NlbGVjdGVkJyxcbiAgICAgICAgcmVmSW5Gb3I6IHRydWUsXG4gICAgICAgIHNjb3BlZFNsb3RzOiB7XG4gICAgICAgICAgZGVmYXVsdDogKCkgPT4gW2goJ2RpdicsIHtcbiAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgIHBhZGRpbmc6IHRoaXMubWluaSA/ICczcHggMCAzcHggOXB4JyA6ICczcHggOXB4JyxcbiAgICAgICAgICAgICAgJ3doaXRlLXNwYWNlJzogdGhpcy5taW5pID8gJ25vd3JhcCcgOiB2b2lkIDBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCBTdHJpbmcodGhpcy5nZXROYW1lKHgpKSldLFxuICAgICAgICAgIGFmdGVyOiAhdGhpcy5taW5pID8gKCkgPT4gW2goJ3N3LWljb24nLCB7XG4gICAgICAgICAgICBjbGFzczoge1xuICAgICAgICAgICAgICAnaG92ZXItY29sb3ItcHJpbWFyeSc6IHRydWUsXG4gICAgICAgICAgICAgICdjb2xvci1ncmV5JzogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICdib3JkZXItcmFkaXVzJzogJzUwJScsXG4gICAgICAgICAgICAgIHBhZGRpbmc6ICcwIDNweCAwIDAnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgICAgbmFtZTogdGhpcy5maWxsZWQgJiYgdGhpcy5zZWxlY3RlZFN0eWxlID09PSB2b2lkIDAgfHwgdGhpcy5zZWxlY3RlZFN0eWxlID09PSAnZmlsbCcgPyAnY2FuY2VsJyA6ICdjbGVhcicsXG4gICAgICAgICAgICAgIHNpemU6ICcxNHB4J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5hdGl2ZU9uOiB7XG4gICAgICAgICAgICAgIGNsaWNrOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbm5lclZhbHVlID0gdGhpcy5mb3JtYXRWYWx1ZSh4LCAncmVtb3ZlJylcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXSA6IHZvaWQgMFxuICAgICAgICB9XG4gICAgICB9KSlcblxuICAgICAgcmV0dXJuIFtoKCdzdy1pdGVtJywge1xuICAgICAgICBzdGF0aWNDbGFzczogJ2ZsZXgtYXV0bycsXG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgd3JhcDogdHJ1ZSxcbiAgICAgICAgICBoaWRlRGVmYXVsdDogdGhpcy5pbm5lclZhbHVlLmxlbmd0aCA+IDAgJiYgKCF0aGlzLmZvY3VzZWQgfHwgIXRoaXMuZmlsdGVyKVxuICAgICAgICB9LFxuICAgICAgICBzY29wZWRTbG90czoge1xuICAgICAgICAgIGJlZm9yZTogdGhpcy5pbm5lclZhbHVlLmxlbmd0aCA+IDAgPyAoKSA9PiBnZXRTZWxlY3RlZChoKSA6IHZvaWQgMCxcbiAgICAgICAgICBkZWZhdWx0OiAoKSA9PiBbaCgnaW5wdXQnLCB7XG4gICAgICAgICAgICByZWY6ICdpbnB1dCcsXG4gICAgICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWlucHV0IG1hcmdpbi1taW4nLFxuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgY3Vyc29yOiAhdGhpcy5maWx0ZXIgPyAncG9pbnRlcicgOiB2b2lkIDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkb21Qcm9wczoge1xuICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5maWx0ZXJWYWx1ZSxcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IHRoaXMucGxhY2Vob2xkZXIgfHwgJycsXG4gICAgICAgICAgICAgIGRpc2FibGVkOiAhdGhpcy5maWx0ZXJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAuLi50aGlzLiRsaXN0ZW5lcnMsXG4gICAgICAgICAgICAgIGlucHV0OiBlID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlclZhbHVlID0gZS50YXJnZXQudmFsdWVcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXVxuICAgICAgICB9XG4gICAgICB9KSwgdGhpcy5mb2N1c2VkID8gaCgnZGl2Jywge1xuICAgICAgICByZWY6ICdzZWxlY3RPcHRpb25zJyxcbiAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1zZWxlY3RfX29wdGlvbnMgY29tbW9uLXNoYWRvdycsXG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgJ21heC1oZWlnaHQnOiB0aGlzLm9wdGlvbnNIZWlnaHRcbiAgICAgICAgfVxuICAgICAgfSwgW2goJ3N3LXNjcm9sbC1hcmVhJywge1xuICAgICAgICBwcm9wczoge1xuICAgICAgICAgIHk6IHRydWUsXG4gICAgICAgICAgaGVpZ2h0OiB0aGlzLm9wdGlvbnNIZWlnaHRcbiAgICAgICAgfSxcbiAgICAgICAgc2NvcGVkU2xvdHM6IHtcbiAgICAgICAgICBkZWZhdWx0OiAoKSA9PiBnZXRPcHRpb25zKGgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICBdKSA6IHZvaWQgMF1cbiAgICB9LFxuICAgIGdldEFmdGVyKGgpIHtcbiAgICAgIHJldHVybiBbaCgnc3ctaWNvbicsIHtcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICBuYW1lOiAna2V5Ym9hcmRfYXJyb3dfZG93bicsXG4gICAgICAgICAgc2l6ZTogJzIwcHgnXG4gICAgICAgIH0sXG4gICAgICAgIHN0YXRpY0NsYXNzOiAnY29sb3ItZ3JleSBob3Zlci1jb2xvci1wcmltYXJ5JyxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHRoaXMuZm9jdXNlZCA/ICdyb3RhdGUoMTgwZGVnKScgOiB2b2lkIDBcbiAgICAgICAgfVxuICAgICAgfSldXG4gICAgfSxcbiAgICBmb3JtYXRWYWx1ZShvcHRpb24sIG9wZSkge1xuICAgICAgbGV0IGR1cGxpY2F0ZWQgPSBmYWxzZVxuICAgICAgbGV0IHJlcyA9IFtdXG5cbiAgICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgIHRoaXMuaW5uZXJWYWx1ZS5mb3JFYWNoKHggPT4ge1xuICAgICAgICAgIGlmIChpc0RlZXBFcXVhbCh4LCB0aGlzLmdldFZhbHVlKG9wdGlvbikpKSB7XG4gICAgICAgICAgICBkdXBsaWNhdGVkID0gdHJ1ZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXMucHVzaCh4KVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSBpZiAob3BlID09PSAncmVtb3ZlJykgeyBkdXBsaWNhdGVkID0gdHJ1ZSB9XG4gICAgICBpZiAoIWR1cGxpY2F0ZWQpIHtcbiAgICAgICAgcmVzLnB1c2godGhpcy5nZXRWYWx1ZShvcHRpb24pKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc1xuICAgIH0sXG4gICAgY2hlY2tTZWxlY3RlZChvcHRpb24pIHtcbiAgICAgIHJldHVybiB0aGlzLmlubmVyVmFsdWUuc29tZSh4ID0+IGlzRGVlcEVxdWFsKHgsIHRoaXMuZ2V0VmFsdWUob3B0aW9uKSkpXG4gICAgfSxcbiAgICBnZXRFeGFjdFZhbHVlcyh2YWx1ZSkge1xuICAgICAgbGV0IHYgPSBBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlIDogW3ZhbHVlXVxuXG4gICAgICByZXR1cm4gdi5yZWR1Y2UoKGEsIGMpID0+IHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5zb21lKHggPT4gaXNEZWVwRXF1YWwodGhpcy5nZXRWYWx1ZSh4KSwgYykpKSB7XG4gICAgICAgICAgYS5wdXNoKGMpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFcbiAgICAgIH0sIFtdKVxuICAgIH0sXG4gICAgZ2V0RXhhY3RPcHRpb25zKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdmFsdWUucmVkdWNlKChhLCBjKSA9PiB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5mb3JFYWNoKHggPT4ge1xuICAgICAgICAgIGlmIChpc0RlZXBFcXVhbCh0aGlzLmdldFZhbHVlKHgpLCBjKSkge1xuICAgICAgICAgICAgYS5wdXNoKHgpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gYVxuICAgICAgfSwgW10pXG4gICAgfSxcbiAgICBnZXRWYWx1ZShvcHRpb24pIHtcbiAgICAgIHJldHVybiBpc09iamVjdChvcHRpb24pICYmIG9wdGlvbi5oYXNPd25Qcm9wZXJ0eSgndmFsdWUnKVxuICAgICAgICA/IG9wdGlvbi52YWx1ZSA6IG9wdGlvblxuICAgIH0sXG4gICAgZ2V0TmFtZShvcHRpb24pIHtcbiAgICAgIHJldHVybiBpc09iamVjdChvcHRpb24pICYmIG9wdGlvbi5oYXNPd25Qcm9wZXJ0eSgnbmFtZScpXG4gICAgICAgID8gb3B0aW9uLm5hbWUgOiBvcHRpb25cbiAgICB9XG4gIH1cbn1cbiAgIiwiaW1wb3J0IFNlbGVjdCBmcm9tICcuL3NyYy9tYWluLmpzJ1xuXG5jb25zdCBpbnN0YWxsID0gZnVuY3Rpb24gKFZ1ZSkge1xuICBWdWUuY29tcG9uZW50KFNlbGVjdC5uYW1lLCBTZWxlY3QpXG59XG5cblNlbGVjdC5pbnN0YWxsID0gaW5zdGFsbFxuXG5leHBvcnQgZGVmYXVsdCBTZWxlY3RcbiIsImltcG9ydCBJdGVtIGZyb20gJy4uLy4uL2l0ZW0nXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3N3QnV0dG9uJyxcbiAgY29tcG9uZW50czogeyBJdGVtIH0sXG4gIHByb3BzOiB7XG4gICAgdW5kZXJsaW5lZDogQm9vbGVhbixcbiAgICBib3JkZXJlZDogQm9vbGVhbixcbiAgICBmaWxsZWQ6IEJvb2xlYW4sXG4gICAgZGlzYWJsZWQ6IEJvb2xlYW4sXG4gICAgY29sb3I6IFN0cmluZyxcbiAgICBwcmltYXJ5OiBCb29sZWFuLFxuICAgIG5lZ2F0aXZlOiBCb29sZWFuLFxuICAgIHBvc2l0aXZlOiBCb29sZWFuLFxuICAgIHdhcm5pbmc6IEJvb2xlYW4sXG4gICAgcm91bmQ6IEJvb2xlYW4sXG4gICAgc2hhZG93OiBCb29sZWFuLFxuICAgIG1pbmk6IEJvb2xlYW4sXG4gICAgdG86IFN0cmluZyB8IE9iamVjdCxcbiAgICBjZW50ZXI6IEJvb2xlYW4sXG4gICAgZW5kOiBCb29sZWFuXG4gIH0sXG4gIGRhdGE6ICgpID0+ICh7fSksXG4gIHJlbmRlcihoKSB7XG4gICAgcmV0dXJuIGgoJ2J1dHRvbicsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiAnc3ctYnV0dG9uIGZsZXggbm8td3JhcCBpdGVtcy1jZW50ZXInLFxuICAgICAgc3R5bGU6IHtcbiAgICAgICAgY29sb3I6ICF0aGlzLmRpc2FibGVkICYmICF0aGlzLmZpbGxlZCAmJiB0aGlzLmNvbG9yIHx8IHZvaWQgMCxcbiAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiAhdGhpcy5kaXNhYmxlZCAmJiB0aGlzLmZpbGxlZCAmJiB0aGlzLmNvbG9yIHx8IHZvaWQgMFxuICAgICAgfSxcbiAgICAgIGNsYXNzOiB7XG4gICAgICAgIHVuZGVybGluZTogdGhpcy51bmRlcmxpbmVkLFxuICAgICAgICBib3JkZXI6IHRoaXMuYm9yZGVyZWQsXG4gICAgICAgIGZpbGw6IHRoaXMuZmlsbGVkLFxuICAgICAgICBwcmltYXJ5OiB0aGlzLnByaW1hcnksXG4gICAgICAgIG5lZ2F0aXZlOiB0aGlzLm5lZ2F0aXZlLFxuICAgICAgICBwb3NpdGl2ZTogdGhpcy5wb3NpdGl2ZSxcbiAgICAgICAgd2FybmluZzogdGhpcy53YXJuaW5nLFxuICAgICAgICBncmV5OiB0aGlzLmRpc2FibGVkLFxuICAgICAgICByb3VuZDogdGhpcy5yb3VuZCAmJiAhdGhpcy51bmRlcmxpbmVkLFxuICAgICAgICAnY29tbW9uLXNoYWRvdyc6IHRoaXMuc2hhZG93ICYmICh0aGlzLmJvcmRlcmVkIHx8IHRoaXMuZmlsbGVkKVxuICAgICAgfVxuICAgIH0sIFtcbiAgICAgIGgoJ3N3LWl0ZW0nLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiAnZmxleC1hdXRvJyxcbiAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAncm91bmQtc2xvdCc6IHRoaXMuJHNjb3BlZFNsb3RzLnJvdW5kLFxuICAgICAgICAgIG1pbmk6IHRoaXMubWluaVxuICAgICAgICB9LFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgIGN1cnNvcjogJ3BvaW50ZXInXG4gICAgICAgIH0sXG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgdG86IHRoaXMudG8sXG4gICAgICAgICAgY2VudGVyOiB0aGlzLmNlbnRlcixcbiAgICAgICAgICBlbmQ6IHRoaXMuZW5kLFxuICAgICAgICAgIGRpc2FibGVkOiB0aGlzLmRpc2FibGVkXG4gICAgICAgIH0sXG4gICAgICAgIG9uOiB0aGlzLmRpc2FibGVkID8gdm9pZCAwIDoge1xuICAgICAgICAgIC4uLnRoaXMuJGxpc3RlbmVyc1xuICAgICAgICB9LFxuICAgICAgICBzY29wZWRTbG90czogdGhpcy4kc2NvcGVkU2xvdHMucm91bmQgIT09IHZvaWQgMFxuICAgICAgICAgID8ge1xuICAgICAgICAgICAgZGVmYXVsdDogKCkgPT4gW2goJ2RpdicsIHtcbiAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6ICdmbGV4IG5vLXdyYXAgaXRlbXMtY2VudGVyIG1hcmdpbi1taW4gc3ctYnV0dG9uX19pbm5lciBmbGV4LWF1dG8nXG4gICAgICAgICAgICB9LCBbdGhpcy4kc2NvcGVkU2xvdHMucm91bmQoKV0pXVxuICAgICAgICAgIH0gOiB7XG4gICAgICAgICAgICBiZWZvcmU6IHRoaXMuJHNjb3BlZFNsb3RzLmJlZm9yZSAhPT0gdm9pZCAwXG4gICAgICAgICAgICAgID8gKCkgPT4gW2goJ2RpdicsIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogJ2ZsZXggbm8td3JhcCBpdGVtcy1jZW50ZXIgbWFyZ2luLW1pbiBzdy1idXR0b25fX2JlZm9yZSdcbiAgICAgICAgICAgICAgfSwgW3RoaXMuJHNjb3BlZFNsb3RzLmJlZm9yZSgpXSldIDogdm9pZCAwLFxuICBcbiAgICAgICAgICAgIGRlZmF1bHQ6IHRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQgIT09IHZvaWQgMFxuICAgICAgICAgICAgICA/ICgpID0+IFtoKCdkaXYnLCB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6ICdmbGV4IG5vLXdyYXAgaXRlbXMtY2VudGVyIG1hcmdpbi1taW4gc3ctYnV0dG9uX19pbm5lciBmbGV4LWF1dG8nXG4gICAgICAgICAgICAgIH0sIFt0aGlzLiRzY29wZWRTbG90cy5kZWZhdWx0KCldKV0gOiB2b2lkIDAsXG4gIFxuICAgICAgICAgICAgYWZ0ZXI6IHRoaXMuJHNjb3BlZFNsb3RzLmFmdGVyICE9PSB2b2lkIDBcbiAgICAgICAgICAgICAgPyAoKSA9PiBbaCgnZGl2Jywge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiAnZmxleCBuby13cmFwIGl0ZW1zLWNlbnRlciBtYXJnaW4tbWluIHN3LWJ1dHRvbl9fYWZ0ZXInXG4gICAgICAgICAgICAgIH0sIFt0aGlzLiRzY29wZWRTbG90cy5hZnRlcigpXSldIDogdm9pZCAwXG4gICAgICAgICAgfVxuICAgICAgfSlcbiAgICBdKVxuICB9XG59XG4gICIsImltcG9ydCBCdXR0b24gZnJvbSAnLi9zcmMvbWFpbi5qcydcblxuY29uc3QgaW5zdGFsbCA9IGZ1bmN0aW9uIChWdWUpIHtcbiAgVnVlLmNvbXBvbmVudChCdXR0b24ubmFtZSwgQnV0dG9uKVxufVxuXG5CdXR0b24uaW5zdGFsbCA9IGluc3RhbGxcblxuZXhwb3J0IGRlZmF1bHQgQnV0dG9uXG4iLCJpbXBvcnQgc3dCdXR0b24gZnJvbSAnLi4vLi4vYnV0dG9uJ1xuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnc3dNb2RhbCcsXG4gIGNvbXBvbmVudHM6IHtcbiAgICBzd0J1dHRvblxuICB9LFxuICBwcm9wczoge1xuICAgIHNob3c6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICB9LFxuICAgIHRpdGxlOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAn5Z+65pys55So5rOVdGl0bGUnXG4gICAgfSxcbiAgICB3aWR0aDoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJzQwJSdcbiAgICB9XG4gIH0sXG4gIGNvbXB1dGVkOiB7XG4gICAgc3R5bGUoKSB7XG4gICAgICBpZiAodGhpcy5zaG93KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgekluZGV4OiA5OTksXG4gICAgICAgICAgb3BhY2l0eTogMVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHpJbmRleDogLTEwLFxuICAgICAgICAgIG9wYWNpdHk6IDBcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGhhbmRsZUNhbmNlbCgpIHtcbiAgICAgIHRoaXMuJGVtaXQoJ2NhbmNlbCcpXG4gICAgfSxcbiAgICBoYW5kbGVDb25maXJtKCkge1xuICAgICAgdGhpcy4kZW1pdCgnY29uZmlybScpXG4gICAgfSxcbiAgfSxcbiAgcmVuZGVyKGgpIHtcbiAgICByZXR1cm4gaCgnZGl2Jyx7XG4gICAgICBzdGF0aWNDbGFzczogJ3N3LW1vZGFsLW1hc2snLFxuICAgICAgc3R5bGU6IHRoaXMuc3R5bGUsXG4gICAgICBvbjoge1xuICAgICAgICBjbGljazogdGhpcy5oYW5kbGVDYW5jZWxcbiAgICAgIH0gXG4gICAgfSwgWyBoKCdkaXYnLCB7IFxuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogJ3N3LW1vZGFsJyxcbiAgICAgICAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAgICAgICBzaG93TW9kYWw6IHRoaXMuc2hvdyxcbiAgICAgICAgICAgICAgICBoaWRlTW9kYWw6ICF0aGlzLnNob3dcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICB3aWR0aDogdGhpcy53aWR0aFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgIGNsaWNrOiBldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgWyB0aGlzLiRzY29wZWRTbG90cy5oZWFkZXIgPT09IHZvaWQgMCBcbiAgICAgICAgICAgICAgICA/IGgoJ2RpdicsIFxuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiAnc3ctbW9kYWwtdGl0bGUnXG4gICAgICAgICAgICAgICAgICAgICAgfSwgWyBoKCdzcGFuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6ICdzdy1tb2RhbC10aXRsZS10ZXh0J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGl0bGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgaCgnc3BhbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiAnc3ctbW9kYWwtY2xvc2UtaWNvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6ICgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVDYW5jZWwoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGgoJ2knLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiAnbWF0ZXJpYWwtaWNvbnMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdjbG9zZScpIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICA6IHRoaXMuJHNjb3BlZFNsb3RzLmhlYWRlcigpLFxuICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlZFNsb3RzLmNvbnRlbnQoKSxcbiAgICAgICAgICAgICAgICB0aGlzLiRzY29wZWRTbG90cy5mb290ZXIgPT09IHZvaWQgMCBcbiAgICAgICAgICAgICAgICA/IGgoJ2RpdicsIFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzczogJ3N3LW1vZGFsLWZvb3RlcidcbiAgICAgICAgICAgICAgICAgICAgfSwgXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICBoKCdzdy1idXR0b24nLHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiAnYnRuIGxlZnQtYnRuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiAoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVDYW5jZWwoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfSwgJ+WPlua2iCcpLFxuICAgICAgICAgICAgICAgICAgICAgIGgoJ3N3LWJ1dHRvbicse1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6ICdidG4gcmlnaHQtYnRuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiAoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVDb25maXJtKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH0sICfnoa7lrponKVxuICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgIDogdGhpcy4kc2NvcGVkU2xvdHMuZm9vdGVyXG4gICAgICAgICAgICAgIF0gICAgICAgICAgICAgIFxuICAgICAgICAgIClcbiAgICAgICAgXVxuICAgIClcbiAgfVxufSIsImltcG9ydCBNb2RhbCBmcm9tICcuL3NyYy9tYWluLmpzJ1xuXG5jb25zdCBpbnN0YWxsID0gZnVuY3Rpb24gKFZ1ZSkge1xuICBWdWUuY29tcG9uZW50KE1vZGFsLm5hbWUsIE1vZGFsKVxufVxuXG5Nb2RhbC5pbnN0YWxsID0gaW5zdGFsbFxuXG5leHBvcnQgZGVmYXVsdCBNb2RhbFxuIiwiaW1wb3J0IFZ1ZSBmcm9tICd2dWUnXG5cbmNvbnN0IGlzU2VydmVyID0gVnVlLnByb3RvdHlwZS4kaXNTZXJ2ZXI7XG5cbmV4cG9ydCBmdW5jdGlvbiBvZmZzZXQoZWwpIHtcbiAgaWYgKGVsID09PSB3aW5kb3cpIHtcbiAgICByZXR1cm4geyB0b3A6IDAsIGxlZnQ6IDAgfVxuICB9XG4gIGNvbnN0IHsgdG9wLCBsZWZ0IH0gPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuXG4gIHJldHVybiB7IHRvcCwgbGVmdCB9XG59XG4gIFxuZXhwb3J0IGZ1bmN0aW9uIHN0eWxlKGVsLCBwcm9wZXJ0eSkge1xuICByZXR1cm4gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwpLmdldFByb3BlcnR5VmFsdWUocHJvcGVydHkpXG59XG4gIFxuZXhwb3J0IGZ1bmN0aW9uIGhlaWdodChlbCkge1xuICByZXR1cm4gZWwgPT09IHdpbmRvd1xuICAgID8gd2luZG93LmlubmVySGVpZ2h0XG4gICAgOiBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHRcbn1cbiAgXG5leHBvcnQgZnVuY3Rpb24gd2lkdGgoZWwpIHtcbiAgcmV0dXJuIGVsID09PSB3aW5kb3dcbiAgICA/IHdpbmRvdy5pbm5lcldpZHRoXG4gICAgOiBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aFxufVxuICBcbmV4cG9ydCBmdW5jdGlvbiBjc3MoZWxlbWVudCwgY3NzKSB7XG4gIGxldCBzdHlsZSA9IGVsZW1lbnQuc3R5bGVcbiAgXG4gIE9iamVjdC5rZXlzKGNzcykuZm9yRWFjaChwcm9wID0+IHtcbiAgICBzdHlsZVtwcm9wXSA9IGNzc1twcm9wXVxuICB9KVxufVxuICBcbmV4cG9ydCBmdW5jdGlvbiBjc3NCYXRjaChlbGVtZW50cywgc3R5bGUpIHtcbiAgZWxlbWVudHMuZm9yRWFjaChlbCA9PiBjc3MoZWwsIHN0eWxlKSlcbn1cbiAgXG5leHBvcnQgZnVuY3Rpb24gcmVhZHkoZm4pIHtcbiAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVyblxuICB9XG4gIFxuICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSAhPT0gJ2xvYWRpbmcnKSB7XG4gICAgcmV0dXJuIGZuKClcbiAgfVxuICBcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZuLCBmYWxzZSlcbn1cblxuZXhwb3J0IGNvbnN0IG9uID0gKGZ1bmN0aW9uKCkge1xuICBpZiAoIWlzU2VydmVyICYmIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oZWxlbWVudCwgZXZlbnQsIGhhbmRsZXIpIHtcbiAgICAgIGlmIChlbGVtZW50ICYmIGV2ZW50ICYmIGhhbmRsZXIpIHtcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oZWxlbWVudCwgZXZlbnQsIGhhbmRsZXIpIHtcbiAgICAgIGlmIChlbGVtZW50ICYmIGV2ZW50ICYmIGhhbmRsZXIpIHtcbiAgICAgICAgZWxlbWVudC5hdHRhY2hFdmVudCgnb24nICsgZXZlbnQsIGhhbmRsZXIpO1xuICAgICAgfVxuICAgIH07XG4gIH1cbn0pKCk7XG5cbmV4cG9ydCBjb25zdCBvZmYgPSAoZnVuY3Rpb24oKSB7XG4gIGlmICghaXNTZXJ2ZXIgJiYgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcikge1xuICAgIHJldHVybiBmdW5jdGlvbihlbGVtZW50LCBldmVudCwgaGFuZGxlcikge1xuICAgICAgaWYgKGVsZW1lbnQgJiYgZXZlbnQpIHtcbiAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oZWxlbWVudCwgZXZlbnQsIGhhbmRsZXIpIHtcbiAgICAgIGlmIChlbGVtZW50ICYmIGV2ZW50KSB7XG4gICAgICAgIGVsZW1lbnQuZGV0YWNoRXZlbnQoJ29uJyArIGV2ZW50LCBoYW5kbGVyKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG59KSgpOyAgXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgb2Zmc2V0LFxuICBzdHlsZSxcbiAgaGVpZ2h0LFxuICB3aWR0aCxcbiAgY3NzLFxuICBjc3NCYXRjaCxcbiAgcmVhZHksXG4gIG9uLFxuICBvZmZcbn0iLCJpbXBvcnQgeyBvbiwgb2ZmIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvZG9tJyBcbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3N3UG9wb3ZlcicsXG4gIGRhdGEgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBwb3BvdmVyU3R5bGU6IHt9LFxuICAgICAgYXJyb3dTdHlsZToge30sXG4gICAgICBzaG93OiBmYWxzZSxcbiAgICAgIHJlZmVyZW5jZUVsbToge31cbiAgICB9XG4gIH0sXG4gIG1vZGVsOiB7XG4gICAgcHJvcDogJ3ZhbHVlJyxcbiAgICBldmVudDogJ3VwZGF0ZSdcbiAgfSxcbiAgcHJvcHM6IHtcbiAgICB2YWx1ZToge1xuICAgICAgdHlwZTogQm9vbGVhblxuICAgIH0sXG4gICAgdGl0bGU6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICB9LFxuICAgIGNvbnRlbnQ6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICB9LFxuICAgIHBsYWNlbWVudDoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ3RvcCdcbiAgICB9LFxuICAgIHRyaWdnZXI6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdjbGljaycsXG4gICAgICB2YWxpZGF0b3I6IHZhbHVlID0+IFsnY2xpY2snLCAnZm9jdXMnLCAnaG92ZXInLCAnbWFudWFsJ10uaW5kZXhPZih2YWx1ZSkgPiAtMVxuICAgIH0sXG4gICAgd2lkdGg6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICB9XG4gIH0sXG4gIGNvbXB1dGVkOiB7XG4gICAgc2hvd1ZhbHVlOiB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVcbiAgICAgIH0sXG4gICAgICBzZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIH1cbiAgICB9LFxuICAgIHNob3dTdHlsZSgpIHtcbiAgICAgIGlmICh0aGlzLnRyaWdnZXIgIT09ICdtYW51YWwnKSB7XG4gICAgICAgIGlmICh0aGlzLnNob3cpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgekluZGV4OiA5OTksXG4gICAgICAgICAgICBvcGFjaXR5OiAxXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB6SW5kZXg6IC0xMCxcbiAgICAgICAgICAgIG9wYWNpdHk6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLnNob3dWYWx1ZSkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB6SW5kZXg6IDk5OSxcbiAgICAgICAgICAgIG9wYWNpdHk6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHpJbmRleDogLTEwLFxuICAgICAgICAgICAgb3BhY2l0eTogMFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGdldFN0eWxlKHBvcG92ZXJFbG0sIHJlZmVyZW5jZUVsbSkge1xuICAgICAgc3dpdGNoICh0aGlzLnBsYWNlbWVudCkge1xuICAgICAgICBjYXNlICd0b3Atc3RhcnQnOlxuICAgICAgICAgIHRoaXMucG9wb3ZlclN0eWxlID0ge1xuICAgICAgICAgICAgdG9wOiAnLScgKyAocG9wb3ZlckVsbS5vZmZzZXRIZWlnaHQgKyAxMCkgKyAncHgnXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuYXJyb3dTdHlsZSA9IHtcbiAgICAgICAgICAgIGxlZnQ6IChyZWZlcmVuY2VFbG0ub2Zmc2V0V2lkdGggLyAyIC0gNSkgKyAncHgnXG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICd0b3AnOlxuICAgICAgICAgIHRoaXMucG9wb3ZlclN0eWxlID0ge1xuICAgICAgICAgICAgdG9wOiAnLScgKyAocG9wb3ZlckVsbS5vZmZzZXRIZWlnaHQgKyAxMCkgKyAncHgnLFxuICAgICAgICAgICAgbGVmdDogKHJlZmVyZW5jZUVsbS5vZmZzZXRXaWR0aCAtIHBvcG92ZXJFbG0ub2Zmc2V0V2lkdGgpIC8gMiArICdweCdcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5hcnJvd1N0eWxlID0ge1xuICAgICAgICAgICAgbGVmdDogKHBvcG92ZXJFbG0ub2Zmc2V0V2lkdGggLyAyIC0gNSkgKyAncHgnXG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgJ2JvdHRvbS1zdGFydCc6IFxuICAgICAgICAgIHRoaXMucG9wb3ZlclN0eWxlID0ge1xuICAgICAgICAgICAgdG9wOiAocmVmZXJlbmNlRWxtLm9mZnNldEhlaWdodCArIDEwKSArICdweCdcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5hcnJvd1N0eWxlID0ge1xuICAgICAgICAgICAgbGVmdDogKHJlZmVyZW5jZUVsbS5vZmZzZXRXaWR0aCAvIDIgLSA1KSArICdweCdcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWsgXG4gICAgICAgIGNhc2UgJ2JvdHRvbSc6XG4gICAgICAgICAgdGhpcy5wb3BvdmVyU3R5bGUgPSB7XG4gICAgICAgICAgICB0b3A6IChyZWZlcmVuY2VFbG0ub2Zmc2V0SGVpZ2h0ICsgMTApICsgJ3B4JyxcbiAgICAgICAgICAgIGxlZnQ6IChyZWZlcmVuY2VFbG0ub2Zmc2V0V2lkdGggLSBwb3BvdmVyRWxtLm9mZnNldFdpZHRoKSAvIDIgKyAncHgnXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuYXJyb3dTdHlsZSA9IHtcbiAgICAgICAgICAgIGxlZnQ6IChwb3BvdmVyRWxtLm9mZnNldFdpZHRoIC8gMiAtIDUpICsgJ3B4J1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlICdyaWdodC1zdGFydCc6XG4gICAgICAgICAgdGhpcy5wb3BvdmVyU3R5bGUgPSB7XG4gICAgICAgICAgICBsZWZ0OiAocmVmZXJlbmNlRWxtLm9mZnNldFdpZHRoICsgMTApICsgJ3B4JyxcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5hcnJvd1N0eWxlID0ge1xuICAgICAgICAgICAgdG9wOiAocmVmZXJlbmNlRWxtLm9mZnNldEhlaWdodCAvIDIgLSA1KSArICdweCdcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWsgIFxuICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgdGhpcy5wb3BvdmVyU3R5bGUgPSB7XG4gICAgICAgICAgICBsZWZ0OiAocmVmZXJlbmNlRWxtLm9mZnNldFdpZHRoICsgMTApICsgJ3B4JyxcbiAgICAgICAgICAgIHRvcDogKHJlZmVyZW5jZUVsbS5vZmZzZXRIZWlnaHQgLSBwb3BvdmVyRWxtLm9mZnNldEhlaWdodCkgLyAyICsgJ3B4J1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmFycm93U3R5bGUgPSB7XG4gICAgICAgICAgICB0b3A6IChwb3BvdmVyRWxtLm9mZnNldEhlaWdodCAvIDIgLSA1KSArICdweCdcbiAgICAgICAgICB9IFxuICAgICAgICAgIGJyZWFrIFxuICAgICAgICBjYXNlICdsZWZ0LXN0YXJ0JzpcbiAgICAgICAgICB0aGlzLnBvcG92ZXJTdHlsZSA9IHtcbiAgICAgICAgICAgIHJpZ2h0OiAocmVmZXJlbmNlRWxtLm9mZnNldFdpZHRoICsgMTApICsgJ3B4JyxcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5hcnJvd1N0eWxlID0ge1xuICAgICAgICAgICAgdG9wOiAocmVmZXJlbmNlRWxtLm9mZnNldEhlaWdodCAvIDIgLSA1KSArICdweCdcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgdGhpcy5wb3BvdmVyU3R5bGUgPSB7XG4gICAgICAgICAgICByaWdodDogKHJlZmVyZW5jZUVsbS5vZmZzZXRXaWR0aCArIDEwKSArICdweCcsXG4gICAgICAgICAgICB0b3A6IChyZWZlcmVuY2VFbG0ub2Zmc2V0SGVpZ2h0IC0gcG9wb3ZlckVsbS5vZmZzZXRIZWlnaHQpIC8gMiArICdweCdcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5hcnJvd1N0eWxlID0ge1xuICAgICAgICAgICAgdG9wOiAocG9wb3ZlckVsbS5vZmZzZXRIZWlnaHQgLyAyIC0gNSkgKyAncHgnXG4gICAgICAgICAgfSBcbiAgICAgICAgICBicmVhayAgICAgICAgXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSxcbiAgICBoYW5kbGVDbGljaygpIHtcbiAgICAgIHRoaXMuc2hvdyA9ICF0aGlzLnNob3dcbiAgICB9LFxuICAgIGhhbmRsZU1vdXNlRW50ZXIoKSB7XG4gICAgICB0aGlzLnNob3cgPSB0cnVlXG4gICAgfSxcbiAgICBoYW5kbGVNb3VzZUxlYXZlKCkge1xuICAgICAgdGhpcy5zaG93ID0gZmFsc2VcbiAgICB9LFxuICAgIGRvU2hvdygpIHtcbiAgICAgIHRoaXMuc2hvdyA9IHRydWVcbiAgICB9LFxuICAgIGRvQ2xvc2UoKSB7XG4gICAgICB0aGlzLnNob3cgPSBmYWxzZVxuICAgIH0sXG4gICAgaGFuZGxlTWFudWFsKCkge1xuICAgICAgdGhpcy5zaG93VmFsdWUgPSAhdGhpcy5zaG93VmFsdWVcbiAgICAgIHRoaXMuJGVtaXQoXCJ1cGRhdGVcIiwgdGhpcy5zaG93VmFsdWUpO1xuICAgIH1cbiAgfSxcbiAgbW91bnRlZCAoKSB7XG4gICAgbGV0IHBvcG92ZXJFbG0gPSB0aGlzLiRyZWZzLnBvcG92ZXJcbiAgICBsZXQgcmVmZXJlbmNlRWxtID0gdGhpcy5yZWZlcmVuY2VFbG0gPSB0aGlzLiRzY29wZWRTbG90cy5yZWZlcmVuY2UoKVswXS5lbG1cbiAgICB0aGlzLmdldFN0eWxlKHBvcG92ZXJFbG0sIHJlZmVyZW5jZUVsbSlcbiAgICBpZih0aGlzLnRyaWdnZXIgPT09ICdtYW51YWwnKXtcbiAgICAgIG9uKHJlZmVyZW5jZUVsbSwgJ2NsaWNrJywgdGhpcy5oYW5kbGVNYW51YWwpO1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGlmICh0aGlzLnRyaWdnZXIgPT09ICdjbGljaycpIHtcbiAgICAgIG9uKHJlZmVyZW5jZUVsbSwgJ2NsaWNrJywgdGhpcy5oYW5kbGVDbGljayk7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgaWYodGhpcy50cmlnZ2VyID09PSAnaG92ZXInKXtcbiAgICAgIG9uKHJlZmVyZW5jZUVsbSwgJ21vdXNlZW50ZXInLCB0aGlzLmhhbmRsZU1vdXNlRW50ZXIpXG4gICAgICBvbihyZWZlcmVuY2VFbG0sICdtb3VzZWxlYXZlJywgdGhpcy5oYW5kbGVNb3VzZUxlYXZlKTtcbiAgICB9XG4gICAgaWYodGhpcy50cmlnZ2VyID09PSAnZm9jdXMnKXtcbiAgICAgIGlmIChyZWZlcmVuY2VFbG0ucXVlcnlTZWxlY3RvcignaW5wdXQsIHRleHRhcmVhJykpIHtcbiAgICAgICAgb24ocmVmZXJlbmNlRWxtLCAnZm9jdXNpbicsIHRoaXMuZG9TaG93KTtcbiAgICAgICAgb24ocmVmZXJlbmNlRWxtLCAnZm9jdXNvdXQnLCB0aGlzLmRvQ2xvc2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb24ocmVmZXJlbmNlRWxtLCAnbW91c2Vkb3duJywgdGhpcy5kb1Nob3cpO1xuICAgICAgICBvbihyZWZlcmVuY2VFbG0sICdtb3VzZXVwJywgdGhpcy5kb0Nsb3NlKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGRlc3Ryb3llZCAoKSB7XG4gICAgY29uc3QgcmVmZXJlbmNlID0gdGhpcy5yZWZlcmVuY2VFbG07XG4gICAgb2ZmKHJlZmVyZW5jZSwgJ2NsaWNrJywgdGhpcy5oYW5kbGVDbGljayk7XG4gICAgb2ZmKHJlZmVyZW5jZSwgJ21vdXNldXAnLCB0aGlzLmRvQ2xvc2UpO1xuICAgIG9mZihyZWZlcmVuY2UsICdtb3VzZWRvd24nLCB0aGlzLmRvU2hvdyk7XG4gICAgb2ZmKHJlZmVyZW5jZSwgJ2ZvY3VzaW4nLCB0aGlzLmRvU2hvdyk7XG4gICAgb2ZmKHJlZmVyZW5jZSwgJ2ZvY3Vzb3V0JywgdGhpcy5kb0Nsb3NlKTtcbiAgICBvZmYocmVmZXJlbmNlLCAnbW91c2Vkb3duJywgdGhpcy5kb1Nob3cpO1xuICAgIG9mZihyZWZlcmVuY2UsICdtb3VzZXVwJywgdGhpcy5kb0Nsb3NlKTtcbiAgICBvZmYocmVmZXJlbmNlLCAnbW91c2VsZWF2ZScsIHRoaXMuaGFuZGxlTW91c2VMZWF2ZSk7XG4gICAgb2ZmKHJlZmVyZW5jZSwgJ21vdXNlZW50ZXInLCB0aGlzLmhhbmRsZU1vdXNlRW50ZXIpO1xuICAgIG9mZihkb2N1bWVudCwgJ2NsaWNrJywgdGhpcy5oYW5kbGVNYW51YWwpO1xuICB9LFxuICByZW5kZXIoaCkge1xuICAgIHJldHVybiBoKCdkaXYnLHtcbiAgICAgIGNsYXNzOiAnc3ctcG9wb3Zlci1jb250YWluJyxcbiAgICB9LCBbIGgoJ2RpdicsIFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogJ3N3LXBvcG92ZXInLFxuICAgICAgICAgICAgICBjbGFzczogJ3N3LXBvcG92ZXItc2hvdycsXG4gICAgICAgICAgICAgIHJlZjogJ3BvcG92ZXInLFxuICAgICAgICAgICAgICBzdHlsZTogT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHRoaXMucG9wb3ZlclN0eWxlLCB7d2lkdGg6IHRoaXMud2lkdGggfSksIHRoaXMuc2hvd1N0eWxlKVxuICAgICAgICB9LCBbIHRoaXMudGl0bGUgIFxuICAgICAgICAgICAgICA/IGgoJ2RpdicsIHtcbiAgICAgICAgICAgICAgICBjbGFzczogJ3N3LXBvcG92ZXItdGl0bGUnXG4gICAgICAgICAgICAgIH0sIHRoaXMudGl0bGUpXG4gICAgICAgICAgICAgIDogJycsIFxuICAgICAgICAgICAgIHRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQgPT09IHZvaWQgMFxuICAgICAgICAgICAgID8gaCgnZGl2Jywge1xuICAgICAgICAgICAgICAgIGNsYXNzOiAnc3ctcG9wb3Zlci1jb250ZW50J1xuICAgICAgICAgICAgIH0sIHRoaXMuY29udGVudCB8fCAnJyApXG4gICAgICAgICAgICAgIDogdGhpcy4kc2NvcGVkU2xvdHMuZGVmYXVsdCgpLFxuICAgICAgICAgICAgIGgoJ2Rpdicse1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctcG9wb3Zlci1hcnJvdycsXG4gICAgICAgICAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAgICAgICAnc3ctcG9wb3Zlci1hcnJvdy10b3AnOiB0aGlzLnBsYWNlbWVudC5pbmRleE9mKCd0b3AnKSA+PSAwID8gdHJ1ZSA6IGZhbHNlLFxuICAgICAgICAgICAgICAgICdzdy1wb3BvdmVyLWFycm93LWJvdHRvbSc6IHRoaXMucGxhY2VtZW50LmluZGV4T2YoJ2JvdHRvbScpID49IDAgPyB0cnVlIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgJ3N3LXBvcG92ZXItYXJyb3ctcmlnaHQnOiB0aGlzLnBsYWNlbWVudC5pbmRleE9mKCdyaWdodCcpID49IDAgPyB0cnVlIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgJ3N3LXBvcG92ZXItYXJyb3ctbGVmdCc6IHRoaXMucGxhY2VtZW50LmluZGV4T2YoJ2xlZnQnKSA+PSAwID8gdHJ1ZSA6IGZhbHNlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc3R5bGU6IHRoaXMuYXJyb3dTdHlsZVxuICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdKSwgXG4gICAgICAgIHRoaXMuJHNjb3BlZFNsb3RzLnJlZmVyZW5jZSA9PT0gdm9pZCAwIFxuICAgICAgICA/IGgoKVxuICAgICAgICA6IHRoaXMuJHNjb3BlZFNsb3RzLnJlZmVyZW5jZSgpXG4gICAgICBdKSBcbiAgfVxufSIsImltcG9ydCBQb3BvdmVyIGZyb20gJy4vc3JjL21haW4uanMnXG5cbmNvbnN0IGluc3RhbGwgPSBmdW5jdGlvbiAoVnVlKSB7XG4gIFZ1ZS5jb21wb25lbnQoTW9kYWwubmFtZSwgUG9wb3Zlcilcbn1cblxuUG9wb3Zlci5pbnN0YWxsID0gaW5zdGFsbFxuXG5leHBvcnQgZGVmYXVsdCBQb3BvdmVyXG4iLCJpbXBvcnQgSXRlbSBmcm9tICcuLi8uLi9pdGVtJ1xuaW1wb3J0IHsgaXNEZWVwRXF1YWwgfSBmcm9tICcuLi8uLi8uLi91dGlscy9pcydcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnc3dDaGVja2JveCcsXG4gIGNvbXBvbmVudHM6IHsgSXRlbSB9LFxuICBwcm9wczoge1xuICAgIHZhbHVlOiBCb29sZWFuIHwgQXJyYXksXG4gICAgdmFsOiB7XG4gICAgICByZXF1aXJlZDogZmFsc2VcbiAgICB9LFxuICAgIGxhYmVsOiBTdHJpbmcsXG4gICAgZGlzYWJsZWQ6IEJvb2xlYW4sXG4gICAgY29sb3I6IFN0cmluZyxcbiAgICBwcmltYXJ5OiBCb29sZWFuLFxuICAgIG5lZ2F0aXZlOiBCb29sZWFuLFxuICAgIHBvc2l0aXZlOiBCb29sZWFuLFxuICAgIHdhcm5pbmc6IEJvb2xlYW4sXG4gICAgbGVmdExhYmVsOiBCb29sZWFuLFxuICAgIGNvbG9yTGFiZWw6IEJvb2xlYW4sXG4gICAga2VlcENvbG9yOiBCb29sZWFuXG4gIH0sXG4gIGRhdGE6ICgpID0+ICh7XG4gICAgcGFyZW50OiB2b2lkIDBcbiAgfSksXG4gIGNvbXB1dGVkOiB7XG4gICAgbW9kZWwoKSB7XG4gICAgICByZXR1cm4gdGhpcy5wYXJlbnQgPT09IHZvaWQgMCA/IHRoaXMudmFsdWUgOiB0aGlzLnBhcmVudC52YWx1ZVxuICAgIH0sXG4gICAgcGFyZW50RGlzYWJsZWQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5wYXJlbnQgJiYgdGhpcy5wYXJlbnQuZGlzYWJsZWRcbiAgICB9LFxuICAgIGNoZWNrZWQ6IHtcbiAgICAgIGdldCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYm9vbGVhbk1vZGUgPyB0aGlzLm1vZGVsIDogdGhpcy5nZXRDaGVja2VkKHRoaXMudmFsKVxuICAgICAgfSxcbiAgICAgIHNldCh2YWwpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzLnBhcmVudCA9PT0gdm9pZCAwID8gdGhpcyA6IHRoaXMucGFyZW50XG5cbiAgICAgICAgc2VsZi4kZW1pdChcbiAgICAgICAgICAnaW5wdXQnLFxuICAgICAgICAgIHRoaXMuZm9ybWF0VmFsdWUodmFsKVxuICAgICAgICApXG4gICAgICB9XG4gICAgfSxcbiAgICBpbm5lclZhbHVlKCkge1xuICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkodGhpcy5tb2RlbCkgPyB0aGlzLm1vZGVsIDogW3RoaXMubW9kZWxdXG4gICAgfSxcbiAgICBib29sZWFuTW9kZSgpIHtcbiAgICAgIHJldHVybiB0aGlzLnZhbCA9PT0gdm9pZCAwXG4gICAgfVxuICB9LFxuICB3YXRjaDoge30sXG4gIG1ldGhvZHM6IHtcbiAgICBnZXRDaGVja2VkKHZhbCkge1xuICAgICAgcmV0dXJuIHRoaXMuaW5uZXJWYWx1ZS5zb21lKHggPT4gaXNEZWVwRXF1YWwoeCwgdmFsKSlcbiAgICB9LFxuICAgIGZvcm1hdFZhbHVlKGNoZWNrZWQpIHtcbiAgICAgIGlmICh0aGlzLmJvb2xlYW5Nb2RlKSB7IHJldHVybiBjaGVja2VkIH1cbiAgICAgIGxldCByZXMgPSBbXVxuXG4gICAgICB0aGlzLmlubmVyVmFsdWUuZm9yRWFjaCh4ID0+IHtcbiAgICAgICAgaWYgKCFpc0RlZXBFcXVhbCh4LCB0aGlzLnZhbCkpIHtcbiAgICAgICAgICByZXMucHVzaCh4KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgaWYgKGNoZWNrZWQpIHsgcmVzLnB1c2godGhpcy52YWwpIH1cbiAgICAgIHJldHVybiByZXNcbiAgICB9LFxuICB9LFxuICByZW5kZXIoaCkge1xuICAgIGxldCBjaGVja2VkID0gdGhpcy5jaGVja2VkXG4gICAgbGV0IGNvbG9yTGFiZWwgPSBjaGVja2VkICYmIHRoaXMuY29sb3JMYWJlbFxuICAgIGxldCBjb2xvckNoZWNrYm94ID0gY2hlY2tlZCB8fCB0aGlzLmtlZXBDb2xvclxuICAgIGxldCBnZXRMYWJlbCA9ICgpID0+IFtoKCdkaXYnLCB7XG4gICAgICBzdGF0aWNDbGFzczogJ3N3LWNoZWNrYm94X190ZXh0IG1hcmdpbi1taW4nLFxuICAgICAgY2xhc3M6IHtcbiAgICAgICAgJ2NvbG9yLXByaW1hcnknOiBjb2xvckxhYmVsID8gdGhpcy5wcmltYXJ5IDogdm9pZCAwLFxuICAgICAgICAnY29sb3ItbmVnYXRpdmUnOiBjb2xvckxhYmVsID8gdGhpcy5uZWdhdGl2ZSA6IHZvaWQgMCxcbiAgICAgICAgJ2NvbG9yLXBvc2l0aXZlJzogY29sb3JMYWJlbCA/IHRoaXMucG9zaXRpdmUgOiB2b2lkIDAsXG4gICAgICAgICdjb2xvci13YXJuaW5nJzogY29sb3JMYWJlbCA/IHRoaXMud2FybmluZyA6IHZvaWQgMFxuICAgICAgfSxcbiAgICAgIHN0eWxlOiB7XG4gICAgICAgIGNvbG9yOiBjb2xvckxhYmVsID8gdGhpcy5jb2xvciA6IHZvaWQgMFxuICAgICAgfVxuICAgIH0sIHRoaXMubGFiZWwpXVxuXG4gICAgcmV0dXJuIGgoJ3N3LWl0ZW0nLCB7XG4gICAgICBzdGF0aWNDbGFzczogJ3N3LWNoZWNrYm94JyxcbiAgICAgIHJlZjogJ2NoZWNrYm94JyxcbiAgICAgIGNsYXNzOiB7XG4gICAgICAgIGRpc2FibGU6IHRoaXMuZGlzYWJsZWQgfHwgdGhpcy5wYXJlbnREaXNhYmxlZFxuICAgICAgfSxcbiAgICAgIG5hdGl2ZU9uOiB0aGlzLmRpc2FibGVkID8gdm9pZCAwIDoge1xuICAgICAgICBjbGljazogKCkgPT4ge1xuICAgICAgICAgIHRoaXMuY2hlY2tlZCA9ICFjaGVja2VkXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzY29wZWRTbG90czoge1xuICAgICAgICBiZWZvcmU6IHRoaXMubGFiZWwgJiYgdGhpcy5sZWZ0TGFiZWwgPyBnZXRMYWJlbCA6IHZvaWQgMCxcbiAgICAgICAgZGVmYXVsdDogKCkgPT4gW2goJ3N3LWljb24nLCB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6ICdtYXJnaW4tbWluJyxcbiAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgb3BhY2l0eTogY2hlY2tlZCA/IDEgOiAwLjZcbiAgICAgICAgICB9LFxuICAgICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICBzaXplOiAnMjBweCcsXG4gICAgICAgICAgICBuYW1lOiBjaGVja2VkID8gJ2NoZWNrX2JveCcgOiAnY2hlY2tfYm94X291dGxpbmVfYmxhbmsnLFxuICAgICAgICAgICAgY29sb3I6IGNvbG9yQ2hlY2tib3ggPyB0aGlzLmNvbG9yIDogdm9pZCAwLFxuICAgICAgICAgICAgcHJpbWFyeTogY29sb3JDaGVja2JveCA/IHRoaXMucHJpbWFyeSA6IHZvaWQgMCxcbiAgICAgICAgICAgIG5lZ2F0aXZlOiBjb2xvckNoZWNrYm94ID8gdGhpcy5uZWdhdGl2ZSA6IHZvaWQgMCxcbiAgICAgICAgICAgIHBvc2l0aXZlOiBjb2xvckNoZWNrYm94ID8gdGhpcy5wb3NpdGl2ZSA6IHZvaWQgMCxcbiAgICAgICAgICAgIHdhcm5pbmc6IGNvbG9yQ2hlY2tib3ggPyB0aGlzLndhcm5pbmcgOiB2b2lkIDBcbiAgICAgICAgICB9XG4gICAgICAgIH0pXSxcbiAgICAgICAgYWZ0ZXI6IHRoaXMubGFiZWwgJiYgIXRoaXMubGVmdExhYmVsID8gZ2V0TGFiZWwgOiB2b2lkIDBcbiAgICAgIH1cbiAgICB9KVxuICB9XG59IiwiaW1wb3J0IENoZWNrYm94IGZyb20gJy4vc3JjL21haW4uanMnXG5cbmNvbnN0IGluc3RhbGwgPSBmdW5jdGlvbiAoVnVlKSB7XG4gIFZ1ZS5jb21wb25lbnQoQ2hlY2tib3gubmFtZSwgQ2hlY2tib3gpXG59XG5cbkNoZWNrYm94Lmluc3RhbGwgPSBpbnN0YWxsXG5cbmV4cG9ydCBkZWZhdWx0IENoZWNrYm94XG4iLCJcbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YTogKCkgPT4gKHt9KSxcbiAgd2F0Y2g6IHt9LFxuICBjb21wdXRlZDoge30sXG4gIG1ldGhvZHM6IHtcbiAgICBzaHV0dGxlKF90aGlzKSB7XG4gICAgICBsZXQgc2VsZiA9IF90aGlzIHx8IHRoaXNcblxuICAgICAgc2VsZi4kY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgIGlmIChjaGlsZC4kcmVmc1t0aGlzLnNodXR0bGVSZWZdICE9PSB2b2lkIDApIHtcbiAgICAgICAgICBjaGlsZC5wYXJlbnQgPSB0aGlzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zaHV0dGxlKGNoaWxkKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfSxcbiAgbW91bnRlZCgpIHtcbiAgICB0aGlzLnNodXR0bGUoKVxuICB9XG59XG4iLCJpbXBvcnQgRmllbGQgZnJvbSAnLi4vLi4vZmllbGQnXG5pbXBvcnQgU2h1dHRsZU1peGluIGZyb20gJy4uLy4uLy4uL21peGlucy9zaHV0dGxlJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdzd0NoZWNrYm94R3JvdXAnLFxuICBtaXhpbnM6IFtGaWVsZCwgU2h1dHRsZU1peGluXSwgLy8gZm9jdXNlZCxkaXNhYmxlZCxzaHV0dGxlUmVmXG4gIHByb3BzOiB7XG4gICAgdmFsdWU6IEJvb2xlYW4gfCBBcnJheVxuICB9LFxuICBkYXRhOiAoKSA9PiAoe1xuICAgIGlubmVyUG9pbnRlcjogdHJ1ZSxcbiAgICBzaHV0dGxlUmVmOiAnY2hlY2tib3gnXG4gIH0pLFxuICBjb21wdXRlZDoge30sXG4gIHdhdGNoOiB7fSxcbiAgbWV0aG9kczoge31cbn0iLCJpbXBvcnQgQ2hlY2tib3hHcm91cCBmcm9tICcuL3NyYy9tYWluLmpzJ1xuXG5jb25zdCBpbnN0YWxsID0gZnVuY3Rpb24gKFZ1ZSkge1xuICBWdWUuY29tcG9uZW50KENoZWNrYm94R3JvdXAubmFtZSwgQ2hlY2tib3hHcm91cClcbn1cblxuQ2hlY2tib3hHcm91cC5pbnN0YWxsID0gaW5zdGFsbFxuXG5leHBvcnQgZGVmYXVsdCBDaGVja2JveEdyb3VwXG4iLCJpbXBvcnQgSXRlbSBmcm9tICcuLi8uLi9pdGVtJ1xuaW1wb3J0IHsgaXNEZWVwRXF1YWwgfSBmcm9tICcuLi8uLi8uLi91dGlscy9pcydcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnc3dSYWRpbycsXG4gIGNvbXBvbmVudHM6IHsgSXRlbSB9LFxuICBwcm9wczoge1xuICAgIHZhbHVlOiB7fSxcbiAgICB2YWw6IHtcbiAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgfSxcbiAgICBsYWJlbDogU3RyaW5nLFxuICAgIGRpc2FibGVkOiBCb29sZWFuLFxuICAgIGNvbG9yOiBTdHJpbmcsXG4gICAgcHJpbWFyeTogQm9vbGVhbixcbiAgICBuZWdhdGl2ZTogQm9vbGVhbixcbiAgICBwb3NpdGl2ZTogQm9vbGVhbixcbiAgICB3YXJuaW5nOiBCb29sZWFuLFxuICAgIGxlZnRMYWJlbDogQm9vbGVhbixcbiAgICBjb2xvckxhYmVsOiBCb29sZWFuLFxuICAgIGtlZXBDb2xvcjogQm9vbGVhblxuICB9LFxuICBkYXRhOiAoKSA9PiAoe1xuICAgIHBhcmVudDogdm9pZCAwXG4gIH0pLFxuICBjb21wdXRlZDoge1xuICAgIG1vZGVsKCkge1xuICAgICAgcmV0dXJuIHRoaXMucGFyZW50ID09PSB2b2lkIDAgPyB0aGlzLnZhbHVlIDogdGhpcy5wYXJlbnQudmFsdWVcbiAgICB9LFxuICAgIHBhcmVudERpc2FibGVkKCkge1xuICAgICAgcmV0dXJuIHRoaXMucGFyZW50ICYmIHRoaXMucGFyZW50LmRpc2FibGVkXG4gICAgfSxcbiAgICBjaGVja2VkOiB7XG4gICAgICBnZXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENoZWNrZWQodGhpcy52YWwpXG4gICAgICB9LFxuICAgICAgc2V0KCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXMucGFyZW50ID09PSB2b2lkIDAgPyB0aGlzIDogdGhpcy5wYXJlbnRcblxuICAgICAgICBzZWxmLiRlbWl0KFxuICAgICAgICAgICdpbnB1dCcsXG4gICAgICAgICAgdGhpcy52YWxcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgd2F0Y2g6IHt9LFxuICBtZXRob2RzOiB7XG4gICAgZ2V0Q2hlY2tlZCh2YWwpIHtcbiAgICAgIHJldHVybiBpc0RlZXBFcXVhbCh0aGlzLm1vZGVsLCB2YWwpXG4gICAgfSxcbiAgfSxcbiAgcmVuZGVyKGgpIHtcbiAgICBsZXQgY2hlY2tlZCA9IHRoaXMuY2hlY2tlZFxuICAgIGxldCBjb2xvckxhYmVsID0gY2hlY2tlZCAmJiB0aGlzLmNvbG9yTGFiZWxcbiAgICBsZXQgY29sb3JSYWRpbyA9IGNoZWNrZWQgfHwgdGhpcy5rZWVwQ29sb3JcbiAgICBsZXQgZ2V0TGFiZWwgPSAoKSA9PiBbaCgnZGl2Jywge1xuICAgICAgc3RhdGljQ2xhc3M6ICdzdy1yYWRpb19fdGV4dCBtYXJnaW4tbWluJyxcbiAgICAgIGNsYXNzOiB7XG4gICAgICAgICdjb2xvci1wcmltYXJ5JzogY29sb3JMYWJlbCA/IHRoaXMucHJpbWFyeSA6IHZvaWQgMCxcbiAgICAgICAgJ2NvbG9yLW5lZ2F0aXZlJzogY29sb3JMYWJlbCA/IHRoaXMubmVnYXRpdmUgOiB2b2lkIDAsXG4gICAgICAgICdjb2xvci1wb3NpdGl2ZSc6IGNvbG9yTGFiZWwgPyB0aGlzLnBvc2l0aXZlIDogdm9pZCAwLFxuICAgICAgICAnY29sb3Itd2FybmluZyc6IGNvbG9yTGFiZWwgPyB0aGlzLndhcm5pbmcgOiB2b2lkIDBcbiAgICAgIH0sXG4gICAgICBzdHlsZToge1xuICAgICAgICBjb2xvcjogY29sb3JMYWJlbCA/IHRoaXMuY29sb3IgOiB2b2lkIDBcbiAgICAgIH1cbiAgICB9LCB0aGlzLmxhYmVsKV1cblxuICAgIHJldHVybiBoKCdzdy1pdGVtJywge1xuICAgICAgc3RhdGljQ2xhc3M6ICdzdy1yYWRpbycsXG4gICAgICByZWY6ICdyYWRpbycsXG4gICAgICBjbGFzczoge1xuICAgICAgICBkaXNhYmxlOiB0aGlzLmRpc2FibGVkIHx8IHRoaXMucGFyZW50RGlzYWJsZWRcbiAgICAgIH0sXG4gICAgICBuYXRpdmVPbjogdGhpcy5kaXNhYmxlZCA/IHZvaWQgMCA6IHtcbiAgICAgICAgY2xpY2s6ICgpID0+IHtcbiAgICAgICAgICBpZiAoY2hlY2tlZCkgeyByZXR1cm4gfVxuICAgICAgICAgIHRoaXMuY2hlY2tlZCA9IHRydWVcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHNjb3BlZFNsb3RzOiB7XG4gICAgICAgIGJlZm9yZTogdGhpcy5sYWJlbCAmJiB0aGlzLmxlZnRMYWJlbCA/IGdldExhYmVsIDogdm9pZCAwLFxuICAgICAgICBkZWZhdWx0OiAoKSA9PiBbaCgnc3ctaWNvbicsIHtcbiAgICAgICAgICBzdGF0aWNDbGFzczogJ21hcmdpbi1taW4nLFxuICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICBvcGFjaXR5OiBjaGVja2VkID8gMSA6IDAuNlxuICAgICAgICAgIH0sXG4gICAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIHNpemU6ICcyMHB4JyxcbiAgICAgICAgICAgIG5hbWU6IGNoZWNrZWQgPyAncmFkaW9fYnV0dG9uX2NoZWNrZWQnIDogJ3JhZGlvX2J1dHRvbl91bmNoZWNrZWQnLFxuICAgICAgICAgICAgY29sb3I6IGNvbG9yUmFkaW8gPyB0aGlzLmNvbG9yIDogdm9pZCAwLFxuICAgICAgICAgICAgcHJpbWFyeTogY29sb3JSYWRpbyA/IHRoaXMucHJpbWFyeSA6IHZvaWQgMCxcbiAgICAgICAgICAgIG5lZ2F0aXZlOiBjb2xvclJhZGlvID8gdGhpcy5uZWdhdGl2ZSA6IHZvaWQgMCxcbiAgICAgICAgICAgIHBvc2l0aXZlOiBjb2xvclJhZGlvID8gdGhpcy5wb3NpdGl2ZSA6IHZvaWQgMCxcbiAgICAgICAgICAgIHdhcm5pbmc6IGNvbG9yUmFkaW8gPyB0aGlzLndhcm5pbmcgOiB2b2lkIDBcbiAgICAgICAgICB9XG4gICAgICAgIH0pXSxcbiAgICAgICAgYWZ0ZXI6IHRoaXMubGFiZWwgJiYgIXRoaXMubGVmdExhYmVsID8gZ2V0TGFiZWwgOiB2b2lkIDBcbiAgICAgIH1cbiAgICB9KVxuICB9XG59IiwiaW1wb3J0IFJhZGlvIGZyb20gJy4vc3JjL21haW4uanMnXG5cbmNvbnN0IGluc3RhbGwgPSBmdW5jdGlvbiAoVnVlKSB7XG4gIFZ1ZS5jb21wb25lbnQoUmFkaW8ubmFtZSwgUmFkaW8pXG59XG5cblJhZGlvLmluc3RhbGwgPSBpbnN0YWxsXG5cbmV4cG9ydCBkZWZhdWx0IFJhZGlvXG4iLCJpbXBvcnQgRmllbGQgZnJvbSAnLi4vLi4vZmllbGQnXG5pbXBvcnQgU2h1dHRsZU1peGluIGZyb20gJy4uLy4uLy4uL21peGlucy9zaHV0dGxlJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdzd1JhZGlvR3JvdXAnLFxuICBtaXhpbnM6IFtGaWVsZCwgU2h1dHRsZU1peGluXSwgLy8gZm9jdXNlZCxkaXNhYmxlZCxzaHV0dGxlUmVmXG4gIHByb3BzOiB7XG4gICAgdmFsdWU6IHtcbiAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgfVxuICB9LFxuICBkYXRhOiAoKSA9PiAoe1xuICAgIGlubmVyUG9pbnRlcjogdHJ1ZSxcbiAgICBzaHV0dGxlUmVmOiAncmFkaW8nXG4gIH0pLFxuICBjb21wdXRlZDoge30sXG4gIHdhdGNoOiB7fSxcbiAgbWV0aG9kczoge31cbn0iLCJpbXBvcnQgUmFkaW9Hcm91cCBmcm9tICcuL3NyYy9tYWluLmpzJ1xuXG5jb25zdCBpbnN0YWxsID0gZnVuY3Rpb24gKFZ1ZSkge1xuICBWdWUuY29tcG9uZW50KFJhZGlvR3JvdXAubmFtZSwgUmFkaW9Hcm91cClcbn1cblxuUmFkaW9Hcm91cC5pbnN0YWxsID0gaW5zdGFsbFxuXG5leHBvcnQgZGVmYXVsdCBSYWRpb0dyb3VwXG4iLCIvKipcbiAqXG4gKlxuICogQHBhcmFtIHsqfSB0b3RhbCAg5YiG6aG15oC75pWwXG4gKiBAcGFyYW0geyp9IGN1ciAg5b2T5YmN6aG16Z2iICAzXG4gKiBAcGFyYW0geyp9IGFyb3VuZCAgIDEgMiAzIDQgNSAgIGFyb3VuZCA9IDJcbiAqIEByZXR1cm5zXG4gKi9cbmNvbnN0IG1ha2VSZXN1bHQgPSAodG90YWwsY3VyLGFyb3VuZCkgPT4ge1xuICBsZXQgcmVzdWx0ID0gW107XG4gIGxldCBiYXNlQ291bnQgPSBhcm91bmQgKiAyICsgMSArIDIgKyAyICsgMjsgLy/mgLvlhbHlhYPntKDkuKrmlbBcbiAgbGV0IHN1cnBsdXMgPSBiYXNlQ291bnQgLSA0OyAvL+WPquWHuueOsOS4gOS4quecgeeVpeWPtyDliankvZnlhYPntKDkuKrmlbBcbiAgbGV0IHN0YXJ0UG9zaXRpb24gPSAxICsgMiArIGFyb3VuZCxlbmRQb3NpdGlvbiA9IHRvdGFsIC0gMiAtIGFyb3VuZDtcblxuICBpZih0b3RhbCA8PSBiYXNlQ291bnQgLSAyKXsgLy/lhajpg6jmmL7npLog5LiN5Ye6546w55yB55Wl5Y+3XG4gICAgICByZXN1bHQgPSAgQXJyYXkuZnJvbSh7bGVuZ3RoOiB0b3RhbH0sICh2LCBpKSA9PiBpICsgMSk7XG4gIH1lbHNleyAvL+mcgOimgeWHuueOsOecgeeVpeWPt1xuICAgICAgaWYoY3VyIDw9IHN0YXJ0UG9zaXRpb24peyAvLzEu5Y+q5pyJ5ZCO6Z2i5Ye6546w55yB55Wl5Y+3XG4gICAgICAgICAgcmVzdWx0ID0gWy4uLkFycmF5LmZyb20oe2xlbmd0aDogc3VycGx1c30sICh2LCBpKSA9PiBpICsgMSksXCLCt8K3wrdcIix0b3RhbF1cbiAgICAgIH1lbHNlIGlmKGN1ciA+PSBlbmRQb3NpdGlvbikgeyAvLzIu5Y+q5pyJ5YmN6L655Ye6546w55yB55Wl5Y+3XG4gICAgICAgICAgcmVzdWx0ID0gWzEsJ8K3wrfCtycsLi4uQXJyYXkuZnJvbSh7bGVuZ3RoOiBzdXJwbHVzfSwgKHYsIGkpID0+IHRvdGFsIC0gc3VycGx1cyArIGkgKyAxKV1cbiAgICAgIH1lbHNleyAvLzMu5Lik6L656YO95pyJ55yB55Wl5Y+3XG4gICAgICAgICAgcmVzdWx0ID0gWzEsJ8K3wrfCtycsLi4uQXJyYXkuZnJvbSh7bGVuZ3RoOiBhcm91bmQgKiAyICsgMX0sICh2LCBpKSA9PiBjdXIgLSBhcm91bmQgKyBpKSwnwrfCt8K3Jyx0b3RhbF1cbiAgICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHRcbn1cblxuZXhwb3J0IGRlZmF1bHQgbWFrZVJlc3VsdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cInN3LXBhZ2luYXRpb25cIj5cbiAgICA8ZGl2IGNsYXNzPVwic3ctcGFnaW5hdGlvbi10b3RhbFwiIHYtaWY9XCJsYXlvdXQuaW5kZXhPZigndG90YWwnKSA+IC0xXCI+IFxuICAgICAge3tg5YWxJHt0b3RhbH3mnaFgfX1cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwic3ctcGFnaW5hdGlvbi1zZWxlY3RcIiB2LWlmPVwibGF5b3V0LmluZGV4T2YoJ3NlbGVjdCcpID4gLTFcIj5cbiAgICAgIDxzdy1zZWxlY3Qgdi1tb2RlbD1cInBhZ2VTaXplVmFsdWVcIiA6b3B0aW9ucz1cInNlbGVjdE9wdGlvblwiIHNlbGVjdGVkRmlsbGVkIGJvcmRlcmVkIG1pbmkgc2VsZWN0ZWRTdHlsZT1cIm5vbmVcIj48L3N3LXNlbGVjdD5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwic3ctcGFnaW5hdGlvbi1wYWdlXCI+XG4gICAgICA8c3BhbiBjbGFzcz1cInN3LXBhZ2luYXRpb24tcGFnZS1pdGVtXCIgQGNsaWNrPVwiaGFuZGxlQ2xpY2tBcnJvdygnbGVmdCcpXCI+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29ucyBzdy1wYWdpbmF0aW9uLXBhZ2UtaXRlbS1pY29uXCI+a2V5Ym9hcmRfYXJyb3dfbGVmdDwvaT48L3NwYW4+XG4gICAgICA8c3BhbiB2LWZvcj1cIihpdGVtLCBpbmRleCkgaW4gcGFnaW5hdGlvbkxpc3RcIiA6Y2xhc3M9XCJbJ3N3LXBhZ2luYXRpb24tcGFnZS1pdGVtJywgY3VycmVudFBhZ2VWYWx1ZSA9PT0gaXRlbSA/ICdhY3RpdmUnIDogJyddXCIgQGNsaWNrPVwiaGFuZGxlQ2xpY2tQYWdlKGl0ZW0sIGluZGV4KVwiPlxuICAgICAgICA8aSB2LWlmPVwiaXRlbSA9PT0gJ8K3wrfCtydcIiBjbGFzcz1cIm1hdGVyaWFsLWljb25zIHN3LXBhZ2luYXRpb24tcGFnZS1pdGVtLWljb25cIj5tb3JlX2hvcml6PC9pPlxuICAgICAgICA8c3BhbiB2LWVsc2U+XG4gICAgICAgICAge3tpdGVtfX1cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJzdy1wYWdpbmF0aW9uLXBhZ2UtaXRlbVwiIEBjbGljaz1cImhhbmRsZUNsaWNrQXJyb3coJ3JpZ2h0JylcIj48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zIHN3LXBhZ2luYXRpb24tcGFnZS1pdGVtLWljb25cIj5rZXlib2FyZF9hcnJvd19yaWdodDwvaT48L3NwYW4+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInN3LXBhZ2luYXRpb24tZ290b1wiIHYtaWY9XCJsYXlvdXQuaW5kZXhPZignZ290bycpID4gLTFcIj5cbiAgICAgIDxzcGFuPuWJjeW+gDwvc3Bhbj5cbiAgICAgIDxkaXYgY2xhc3M9XCJzdy1wYWdpbmF0aW9uLWdvdG8taW5wdXRcIj5cbiAgICAgICAgPHN3LWlucHV0IGJvcmRlcmVkIHYtbW9kZWw9J2lucHV0VmFsdWUnIEBrZXl1cC5lbnRlci5uYXRpdmU9XCJoYW5kbGVFbnRlckdvdG9cIiBtaW5pIHN0eWxlPVwid2lkdGg6NDBweFwiPjwvc3ctaW5wdXQ+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxzcGFuPumhtTwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IHN3U2VsZWN0IGZyb20gJy4uLy4uL3NlbGVjdC9pbmRleCdcbmltcG9ydCBtYWtlUmVzdWx0IGZyb20gJy4vcGFnaW5hdGlvbidcbmltcG9ydCBzd0lucHV0IGZyb20gJy4uLy4uL2lucHV0L2luZGV4J1xuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnc3dQYWdpbmF0aW9uJyxcbiAgZGF0YSAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGN1cnJlbnRQYWdlVmFsdWU6IHRoaXMuY3VycmVudFBhZ2UsXG4gICAgICBwYWdlVG90YWw6ICcnLFxuICAgICAgcGFnZVNpemVWYWx1ZTogdGhpcy5wYWdlU2l6ZSxcbiAgICAgIGlucHV0VmFsdWU6ICcxJ1xuICAgIH1cbiAgfSxcbiAgcHJvcHM6IHtcbiAgICB0b3RhbDoge1xuICAgICAgdHlwZTogTnVtYmVyXG4gICAgfSxcbiAgICBwYWdlU2l6ZToge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgZGVmYXVsdDogMjBcbiAgICB9LFxuICAgIG9wdGlvbnM6IHtcbiAgICAgIHR5cGU6IEFycmF5LFxuICAgICAgZGVmYXVsdDogWzIwLCA0MCwgNjAsIDgwXVxuICAgIH0sXG4gICAgY3VycmVudFBhZ2U6IHtcbiAgICAgIHR5cGU6IE51bWJlclxuICAgIH0sXG4gICAgYXJvdW5kOiB7XG4gICAgICB0eXBlOiBOdW1iZXJcbiAgICB9LFxuICAgIGxheW91dDoge1xuICAgICAgdHlwZTogU3RyaW5nXG4gICAgfVxuICB9LFxuICB3YXRjaDoge1xuICAgIGN1cnJlbnRQYWdlVmFsdWUoKSB7XG4gICAgICB0aGlzLiRlbWl0KCdjdXJyZW50LWNoYW5nZScsIHRoaXMuY3VycmVudFBhZ2VWYWx1ZSlcbiAgICB9LFxuICAgIHBhZ2VTaXplVmFsdWUoKSB7XG4gICAgICB0aGlzLiRlbWl0KCdzaXplLWNoYW5nZScsIHRoaXMucGFnZVNpemVWYWx1ZSlcbiAgICB9XG4gIH0sXG4gIGNvbXB1dGVkOiB7XG4gICAgc2VsZWN0T3B0aW9uKCkge1xuICAgICAgbGV0IGFyeSA9IFtdXG4gICAgICB0aGlzLm9wdGlvbnMubWFwKGk9PntcbiAgICAgICAgbGV0IGl0ZW0gPSB7fVxuICAgICAgICBpdGVtLm5hbWUgPSBgJHtpfeadoS/pobVgXG4gICAgICAgIGl0ZW0udmFsdWUgPSBpXG4gICAgICAgIGFyeS5wdXNoKGl0ZW0pXG4gICAgICB9KVxuICAgICAgcmV0dXJuIGFyeVxuICAgIH0sXG4gICAgcGFnaW5hdGlvbkxpc3QoKSB7XG4gICAgICBsZXQgcGFnZVRvdGFsID0gdGhpcy5wYWdlVG90YWwgPSB0aGlzLnRvdGFsIC8gdGhpcy5wYWdlU2l6ZVZhbHVlXG4gICAgICBpZiAoYCR7cGFnZVRvdGFsfWAuaW5kZXhPZignLicpID4gLTEpIHtcbiAgICAgICAgcGFnZVRvdGFsID0gdGhpcy5wYWdlVG90YWwgPSBwYXJzZUludChwYWdlVG90YWwgKyAxKVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMuY3VycmVudFBhZ2VWYWx1ZSA+IHBhZ2VUb3RhbCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRQYWdlVmFsdWUgPSBwYWdlVG90YWxcbiAgICAgIH1cbiAgICAgIGxldCBwYWdlTGlzdCA9IG1ha2VSZXN1bHQocGFnZVRvdGFsLCB0aGlzLmN1cnJlbnRQYWdlVmFsdWUsIHRoaXMuYXJvdW5kKVxuICAgICAgcmV0dXJuIHBhZ2VMaXN0XG4gICAgfVxuICB9LFxuICBjb21wb25lbnRzOiB7XG4gICAgc3dTZWxlY3QsXG4gICAgc3dJbnB1dFxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgaGFuZGxlRW50ZXJHb3RvKCkge1xuICAgICAgbGV0IHBhZ2UgPSBwYXJzZUludCh0aGlzLmlucHV0VmFsdWUpXG4gICAgICBpZiAocGFnZSA8IDEpIHtcbiAgICAgICAgdGhpcy5pbnB1dFZhbHVlID0gJzEnXG4gICAgICB9XG4gICAgICBpZiAocGFnZSA+IHRoaXMucGFnZVRvdGFsKSB7XG4gICAgICAgIHRoaXMuaW5wdXRWYWx1ZSA9IGAke3RoaXMucGFnZVRvdGFsfWBcbiAgICAgIH1cbiAgICAgIHRoaXMuY3VycmVudFBhZ2VWYWx1ZSA9IHBhcnNlSW50KHRoaXMuaW5wdXRWYWx1ZSlcbiAgICAgIHRoaXMuaW5wdXRWYWx1ZSA9IGAke3BhcnNlSW50KHRoaXMuaW5wdXRWYWx1ZSl9YFxuICAgIH0sXG4gICAgaGFuZGxlQ2xpY2tQYWdlKGl0ZW0sIGluZGV4KXtcbiAgICAgIGlmIChpdGVtID09PSAnwrfCt8K3Jykge1xuICAgICAgICBpZihpbmRleCA9PT0gMSl7XG4gICAgICAgICAgdGhpcy5jdXJyZW50UGFnZVZhbHVlID0gM1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY3VycmVudFBhZ2VWYWx1ZSA9IHRoaXMucGFnZVRvdGFsIC0gMlxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmN1cnJlbnRQYWdlVmFsdWUgPSBpdGVtXG4gICAgICB9XG4gICAgfSxcbiAgICBoYW5kbGVDbGlja0Fycm93KHBhcmFtcykge1xuICAgICAgaWYgKHBhcmFtcyA9PT0gJ2xlZnQnKSB7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRQYWdlVmFsdWUgIT09IDEpIHtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRQYWdlVmFsdWUgPSB0aGlzLmN1cnJlbnRQYWdlVmFsdWUgLSAxXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIHRoaXMuY3VycmVudFBhZ2VWYWx1ZSA9IDFcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFBhZ2VWYWx1ZSAhPT0gdGhpcy5wYWdlVG90YWwpIHtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRQYWdlVmFsdWUgPSB0aGlzLmN1cnJlbnRQYWdlVmFsdWUgKyAxXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jdXJyZW50UGFnZVZhbHVlID0gdGhpcy5wYWdlVG90YWxcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cblxuPC9zdHlsZT5cbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gbm9ybWFsaXplQ29tcG9uZW50KHRlbXBsYXRlLCBzdHlsZSwgc2NyaXB0LCBzY29wZUlkLCBpc0Z1bmN0aW9uYWxUZW1wbGF0ZSwgbW9kdWxlSWRlbnRpZmllclxuLyogc2VydmVyIG9ubHkgKi9cbiwgc2hhZG93TW9kZSwgY3JlYXRlSW5qZWN0b3IsIGNyZWF0ZUluamVjdG9yU1NSLCBjcmVhdGVJbmplY3RvclNoYWRvdykge1xuICBpZiAodHlwZW9mIHNoYWRvd01vZGUgIT09ICdib29sZWFuJykge1xuICAgIGNyZWF0ZUluamVjdG9yU1NSID0gY3JlYXRlSW5qZWN0b3I7XG4gICAgY3JlYXRlSW5qZWN0b3IgPSBzaGFkb3dNb2RlO1xuICAgIHNoYWRvd01vZGUgPSBmYWxzZTtcbiAgfSAvLyBWdWUuZXh0ZW5kIGNvbnN0cnVjdG9yIGV4cG9ydCBpbnRlcm9wLlxuXG5cbiAgdmFyIG9wdGlvbnMgPSB0eXBlb2Ygc2NyaXB0ID09PSAnZnVuY3Rpb24nID8gc2NyaXB0Lm9wdGlvbnMgOiBzY3JpcHQ7IC8vIHJlbmRlciBmdW5jdGlvbnNcblxuICBpZiAodGVtcGxhdGUgJiYgdGVtcGxhdGUucmVuZGVyKSB7XG4gICAgb3B0aW9ucy5yZW5kZXIgPSB0ZW1wbGF0ZS5yZW5kZXI7XG4gICAgb3B0aW9ucy5zdGF0aWNSZW5kZXJGbnMgPSB0ZW1wbGF0ZS5zdGF0aWNSZW5kZXJGbnM7XG4gICAgb3B0aW9ucy5fY29tcGlsZWQgPSB0cnVlOyAvLyBmdW5jdGlvbmFsIHRlbXBsYXRlXG5cbiAgICBpZiAoaXNGdW5jdGlvbmFsVGVtcGxhdGUpIHtcbiAgICAgIG9wdGlvbnMuZnVuY3Rpb25hbCA9IHRydWU7XG4gICAgfVxuICB9IC8vIHNjb3BlZElkXG5cblxuICBpZiAoc2NvcGVJZCkge1xuICAgIG9wdGlvbnMuX3Njb3BlSWQgPSBzY29wZUlkO1xuICB9XG5cbiAgdmFyIGhvb2s7XG5cbiAgaWYgKG1vZHVsZUlkZW50aWZpZXIpIHtcbiAgICAvLyBzZXJ2ZXIgYnVpbGRcbiAgICBob29rID0gZnVuY3Rpb24gaG9vayhjb250ZXh0KSB7XG4gICAgICAvLyAyLjMgaW5qZWN0aW9uXG4gICAgICBjb250ZXh0ID0gY29udGV4dCB8fCAvLyBjYWNoZWQgY2FsbFxuICAgICAgdGhpcy4kdm5vZGUgJiYgdGhpcy4kdm5vZGUuc3NyQ29udGV4dCB8fCAvLyBzdGF0ZWZ1bFxuICAgICAgdGhpcy5wYXJlbnQgJiYgdGhpcy5wYXJlbnQuJHZub2RlICYmIHRoaXMucGFyZW50LiR2bm9kZS5zc3JDb250ZXh0OyAvLyBmdW5jdGlvbmFsXG4gICAgICAvLyAyLjIgd2l0aCBydW5Jbk5ld0NvbnRleHQ6IHRydWVcblxuICAgICAgaWYgKCFjb250ZXh0ICYmIHR5cGVvZiBfX1ZVRV9TU1JfQ09OVEVYVF9fICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjb250ZXh0ID0gX19WVUVfU1NSX0NPTlRFWFRfXztcbiAgICAgIH0gLy8gaW5qZWN0IGNvbXBvbmVudCBzdHlsZXNcblxuXG4gICAgICBpZiAoc3R5bGUpIHtcbiAgICAgICAgc3R5bGUuY2FsbCh0aGlzLCBjcmVhdGVJbmplY3RvclNTUihjb250ZXh0KSk7XG4gICAgICB9IC8vIHJlZ2lzdGVyIGNvbXBvbmVudCBtb2R1bGUgaWRlbnRpZmllciBmb3IgYXN5bmMgY2h1bmsgaW5mZXJlbmNlXG5cblxuICAgICAgaWYgKGNvbnRleHQgJiYgY29udGV4dC5fcmVnaXN0ZXJlZENvbXBvbmVudHMpIHtcbiAgICAgICAgY29udGV4dC5fcmVnaXN0ZXJlZENvbXBvbmVudHMuYWRkKG1vZHVsZUlkZW50aWZpZXIpO1xuICAgICAgfVxuICAgIH07IC8vIHVzZWQgYnkgc3NyIGluIGNhc2UgY29tcG9uZW50IGlzIGNhY2hlZCBhbmQgYmVmb3JlQ3JlYXRlXG4gICAgLy8gbmV2ZXIgZ2V0cyBjYWxsZWRcblxuXG4gICAgb3B0aW9ucy5fc3NyUmVnaXN0ZXIgPSBob29rO1xuICB9IGVsc2UgaWYgKHN0eWxlKSB7XG4gICAgaG9vayA9IHNoYWRvd01vZGUgPyBmdW5jdGlvbiAoKSB7XG4gICAgICBzdHlsZS5jYWxsKHRoaXMsIGNyZWF0ZUluamVjdG9yU2hhZG93KHRoaXMuJHJvb3QuJG9wdGlvbnMuc2hhZG93Um9vdCkpO1xuICAgIH0gOiBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgICAgc3R5bGUuY2FsbCh0aGlzLCBjcmVhdGVJbmplY3Rvcihjb250ZXh0KSk7XG4gICAgfTtcbiAgfVxuXG4gIGlmIChob29rKSB7XG4gICAgaWYgKG9wdGlvbnMuZnVuY3Rpb25hbCkge1xuICAgICAgLy8gcmVnaXN0ZXIgZm9yIGZ1bmN0aW9uYWwgY29tcG9uZW50IGluIHZ1ZSBmaWxlXG4gICAgICB2YXIgb3JpZ2luYWxSZW5kZXIgPSBvcHRpb25zLnJlbmRlcjtcblxuICAgICAgb3B0aW9ucy5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXJXaXRoU3R5bGVJbmplY3Rpb24oaCwgY29udGV4dCkge1xuICAgICAgICBob29rLmNhbGwoY29udGV4dCk7XG4gICAgICAgIHJldHVybiBvcmlnaW5hbFJlbmRlcihoLCBjb250ZXh0KTtcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGluamVjdCBjb21wb25lbnQgcmVnaXN0cmF0aW9uIGFzIGJlZm9yZUNyZWF0ZSBob29rXG4gICAgICB2YXIgZXhpc3RpbmcgPSBvcHRpb25zLmJlZm9yZUNyZWF0ZTtcbiAgICAgIG9wdGlvbnMuYmVmb3JlQ3JlYXRlID0gZXhpc3RpbmcgPyBbXS5jb25jYXQoZXhpc3RpbmcsIGhvb2spIDogW2hvb2tdO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzY3JpcHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbm9ybWFsaXplQ29tcG9uZW50O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bm9ybWFsaXplLWNvbXBvbmVudC5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGlzT2xkSUUgPSB0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiAvbXNpZSBbNi05XVxcXFxiLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSk7XG5mdW5jdGlvbiBjcmVhdGVJbmplY3Rvcihjb250ZXh0KSB7XG4gIHJldHVybiBmdW5jdGlvbiAoaWQsIHN0eWxlKSB7XG4gICAgcmV0dXJuIGFkZFN0eWxlKGlkLCBzdHlsZSk7XG4gIH07XG59XG52YXIgSEVBRCA9IGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcbnZhciBzdHlsZXMgPSB7fTtcblxuZnVuY3Rpb24gYWRkU3R5bGUoaWQsIGNzcykge1xuICB2YXIgZ3JvdXAgPSBpc09sZElFID8gY3NzLm1lZGlhIHx8ICdkZWZhdWx0JyA6IGlkO1xuICB2YXIgc3R5bGUgPSBzdHlsZXNbZ3JvdXBdIHx8IChzdHlsZXNbZ3JvdXBdID0ge1xuICAgIGlkczogbmV3IFNldCgpLFxuICAgIHN0eWxlczogW11cbiAgfSk7XG5cbiAgaWYgKCFzdHlsZS5pZHMuaGFzKGlkKSkge1xuICAgIHN0eWxlLmlkcy5hZGQoaWQpO1xuICAgIHZhciBjb2RlID0gY3NzLnNvdXJjZTtcblxuICAgIGlmIChjc3MubWFwKSB7XG4gICAgICAvLyBodHRwczovL2RldmVsb3Blci5jaHJvbWUuY29tL2RldnRvb2xzL2RvY3MvamF2YXNjcmlwdC1kZWJ1Z2dpbmdcbiAgICAgIC8vIHRoaXMgbWFrZXMgc291cmNlIG1hcHMgaW5zaWRlIHN0eWxlIHRhZ3Mgd29yayBwcm9wZXJseSBpbiBDaHJvbWVcbiAgICAgIGNvZGUgKz0gJ1xcbi8qIyBzb3VyY2VVUkw9JyArIGNzcy5tYXAuc291cmNlc1swXSArICcgKi8nOyAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxuXG4gICAgICBjb2RlICs9ICdcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LCcgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3MubWFwKSkpKSArICcgKi8nO1xuICAgIH1cblxuICAgIGlmICghc3R5bGUuZWxlbWVudCkge1xuICAgICAgc3R5bGUuZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICBzdHlsZS5lbGVtZW50LnR5cGUgPSAndGV4dC9jc3MnO1xuICAgICAgaWYgKGNzcy5tZWRpYSkgc3R5bGUuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ21lZGlhJywgY3NzLm1lZGlhKTtcbiAgICAgIEhFQUQuYXBwZW5kQ2hpbGQoc3R5bGUuZWxlbWVudCk7XG4gICAgfVxuXG4gICAgaWYgKCdzdHlsZVNoZWV0JyBpbiBzdHlsZS5lbGVtZW50KSB7XG4gICAgICBzdHlsZS5zdHlsZXMucHVzaChjb2RlKTtcbiAgICAgIHN0eWxlLmVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gc3R5bGUuc3R5bGVzLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGluZGV4ID0gc3R5bGUuaWRzLnNpemUgLSAxO1xuICAgICAgdmFyIHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY29kZSk7XG4gICAgICB2YXIgbm9kZXMgPSBzdHlsZS5lbGVtZW50LmNoaWxkTm9kZXM7XG4gICAgICBpZiAobm9kZXNbaW5kZXhdKSBzdHlsZS5lbGVtZW50LnJlbW92ZUNoaWxkKG5vZGVzW2luZGV4XSk7XG4gICAgICBpZiAobm9kZXMubGVuZ3RoKSBzdHlsZS5lbGVtZW50Lmluc2VydEJlZm9yZSh0ZXh0Tm9kZSwgbm9kZXNbaW5kZXhdKTtlbHNlIHN0eWxlLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGV4dE5vZGUpO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZUluamVjdG9yO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YnJvd3Nlci5qcy5tYXBcbiIsImltcG9ydCBQYWdpbmF0aW9uIGZyb20gJy4vc3JjL21haW4udnVlJ1xuXG5jb25zdCBpbnN0YWxsID0gZnVuY3Rpb24gKFZ1ZSkge1xuICBWdWUuY29tcG9uZW50KFBhZ2luYXRpb24ubmFtZSwgUGFnaW5hdGlvbilcbn1cblxuUGFnaW5hdGlvbi5pbnN0YWxsID0gaW5zdGFsbFxuXG5leHBvcnQgZGVmYXVsdCBQYWdpbmF0aW9uXG4iLCJcbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YTogKCkgPT4gKHtcbiAgICBvYnNlcnZlcjogdm9pZCAwLFxuICAgIG1lYXN1cmVkV2lkdGg6IHZvaWQgMFxuICB9KSxcbiAgY29tcHV0ZWQ6IHtcbiAgICB0YXJnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5ob3Jpem9udGFsID8gJ3dpZHRoJyA6ICdoZWlnaHQnXG4gICAgfSxcbiAgICBtZWFzdXJlVGFyZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuaG9yaXpvbnRhbCA/ICdvZmZzZXRXaWR0aCcgOiAnb2Zmc2V0SGVpZ2h0J1xuICAgIH0sXG4gICAgbWluU2l6ZSgpIHtcbiAgICAgIHJldHVybiB0aGlzLm1pbiAhPT0gdm9pZCAwID8gYCR7dGhpcy5taW59cHhgIDogMFxuICAgIH1cbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGluaXRTdHlsZSgpIHtcbiAgICAgIGlmICh0aGlzLmlubmVyQ29sbGFwc2VkKSB7XG4gICAgICAgIHRoaXMuJHJlZnMuc2xpZGUuc3R5bGVbdGhpcy50YXJnZXRdID0gdGhpcy5taW5TaXplXG4gICAgICB9XG4gICAgfSxcbiAgICBzZXRTdHlsZShwYXNzaXZlKSB7XG4gICAgICBsZXQgc2xpZGVUYXJnZXQgPSB0aGlzLiRyZWZzLnNsaWRlXG5cbiAgICAgIGlmIChwYXNzaXZlKSB7XG4gICAgICAgIGlmIChzbGlkZVRhcmdldC5zdHlsZVt0aGlzLnRhcmdldF0gJiYgIXRoaXMuaW5uZXJDb2xsYXBzZWQpIHtcbiAgICAgICAgICBzbGlkZVRhcmdldC5zdHlsZVt0aGlzLnRhcmdldF0gPSBudWxsXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBzbGlkZVRhcmdldC5zdHlsZVt0aGlzLnRhcmdldF0gPSBgJHt0aGlzLiRyZWZzLm9ic2VydmVbdGhpcy5tZWFzdXJlVGFyZ2V0XX1weGBcbiAgICAgIGlmICh0aGlzLmlubmVyQ29sbGFwc2VkKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHNsaWRlVGFyZ2V0LnN0eWxlW3RoaXMudGFyZ2V0XSA9IHRoaXMubWluU2l6ZVxuICAgICAgICB9LCAwKVxuICAgICAgfVxuICAgIH0sXG4gICAgY2xlYXJVcHBlclN0eWxlKHVwcGVyKSB7XG4gICAgICBsZXQgdXBwZXJTbGlkZVRhcmdldCA9IHVwcGVyLiRyZWZzLnNsaWRlXG5cbiAgICAgIGlmICh1cHBlclNsaWRlVGFyZ2V0KSB7XG4gICAgICAgIGlmICh1cHBlclNsaWRlVGFyZ2V0LnN0eWxlW3RoaXMudGFyZ2V0XSkge1xuICAgICAgICAgIHVwcGVyU2xpZGVUYXJnZXQuc3R5bGVbdGhpcy50YXJnZXRdID0gbnVsbFxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodXBwZXIuJHBhcmVudCAmJiB1cHBlci4kcGFyZW50LiRyZWZzKSB7XG4gICAgICAgIHRoaXMuY2xlYXJVcHBlclN0eWxlKHVwcGVyLiRwYXJlbnQpXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBtb3VudGVkKCkge1xuICAgIGlmICghdGhpcy4kcmVmcy5zbGlkZSB8fCAhdGhpcy4kcmVmcy5vYnNlcnZlKSB7IHJldHVybiB9XG4gICAgdGhpcy4kd2F0Y2goXG4gICAgICAnaW5uZXJDb2xsYXBzZWQnLFxuICAgICAgKCkgPT4ge1xuICAgICAgICB0aGlzLmNsZWFyVXBwZXJTdHlsZSh0aGlzLiRwYXJlbnQpXG4gICAgICAgIHRoaXMuc2V0U3R5bGUoKVxuICAgICAgfSlcbiAgICB0aGlzLmluaXRTdHlsZSgpXG4gICAgdGhpcy5vYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgIHRoaXMuc2V0U3R5bGUodHJ1ZSlcbiAgICB9KVxuXG4gICAgdGhpcy5vYnNlcnZlci5vYnNlcnZlKHRoaXMuJHJlZnMub2JzZXJ2ZSwge1xuICAgICAgYXR0cmlidXRlczogdHJ1ZSxcbiAgICAgIGF0dHJpYnV0ZUZpbHRlcjogWydtdXRhdGUnXSxcbiAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgIHN1YnRyZWU6IHRydWUsXG4gICAgICBjaGFyYWN0ZXJEYXRhOiB0cnVlXG4gICAgfSlcbiAgfSxcbiAgYmVmb3JlRGVzdHJveSgpIHtcbiAgICB0aGlzLm9ic2VydmVyICYmIHRoaXMub2JzZXJ2ZXIuZGlzY29ubmVjdCgpXG4gIH1cbn1cbiAgIiwiaW1wb3J0IFNsaWRlT2JzZXJ2ZXIgZnJvbSAnLi4vLi4vLi4vbWl4aW5zL3NsaWRlT2JzZXJ2ZXInXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3N3U2xpZGUnLFxuICBtaXhpbnM6IFtTbGlkZU9ic2VydmVyXSxcbiAgcHJvcHM6IHtcbiAgICBjb2xsYXBzZWQ6IEJvb2xlYW4sXG4gICAgaG9yaXpvbnRhbDogQm9vbGVhbixcbiAgICBmaXQ6IEJvb2xlYW4sXG4gICAgbWluOiBOdW1iZXIgfCBTdHJpbmcsXG4gICAgc2hhZG93OiBCb29sZWFuXG4gIH0sXG4gIGRhdGE6ICgpID0+ICh7XG4gICAgaW5uZXJDb2xsYXBzZWQ6IHRydWUsXG4gICAgb3ZlcmZsb3c6ICdoaWRkZW4nXG4gIH0pLFxuICB3YXRjaDoge1xuICAgIGNvbGxhcHNlZDoge1xuICAgICAgaGFuZGxlcigpIHtcbiAgICAgICAgdGhpcy5pbm5lckNvbGxhcHNlZCA9IHRoaXMuY29sbGFwc2VkXG4gICAgICB9LFxuICAgICAgaW1tZWRpYXRlOiB0cnVlXG4gICAgfVxuICB9LFxuICBtb3VudGVkKCl7XG4gICAgdGhpcy5vdmVyZmxvdyA9IHRoaXMuaW5uZXJDb2xsYXBzZWQgPyAnaGlkZGVuJyA6ICdpbmhlcml0J1xuICAgIHRoaXMuJHJlZnMuc2xpZGUuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbnN0YXJ0JywgKCkgPT4ge1xuICAgICAgdGhpcy5vdmVyZmxvdyA9ICdoaWRkZW4nXG4gICAgfSlcbiAgICB0aGlzLiRyZWZzLnNsaWRlLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCAoKSA9PiB7XG4gICAgICB0aGlzLm92ZXJmbG93ID0gdGhpcy5pbm5lckNvbGxhcHNlZCA/ICdoaWRkZW4nIDogJ2luaGVyaXQnXG4gICAgfSlcbiAgfSxcbiAgcmVuZGVyKGgpIHtcbiAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgcmVmOiAnc2xpZGUnLFxuICAgICAgc3RhdGljQ2xhc3M6ICdzdy1zbGlkZV9fY29udGFpbmVyJyxcbiAgICAgIGNsYXNzOiB7XG4gICAgICAgIHNoYWRvdzogdGhpcy5zaGFkb3dcbiAgICAgIH0sXG4gICAgICBzdHlsZTp7XG4gICAgICAgIG92ZXJmbG93OiB0aGlzLm92ZXJmbG93XG4gICAgICB9XG4gICAgfSwgW1xuICAgICAgaCgnZGl2Jywge1xuICAgICAgICByZWY6ICdvYnNlcnZlJyxcbiAgICAgICAgc3RhdGljQ2xhc3M6IGBzdy1zbGlkZV9fY29udGVudGAsXG4gICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgJ21pbi13aWR0aCc6IHRoaXMuaG9yaXpvbnRhbCAmJiAhdGhpcy5maXQsXG4gICAgICAgICAgJ2ZpdC13aWR0aCc6IHRoaXMuaG9yaXpvbnRhbCAmJiB0aGlzLmZpdCxcbiAgICAgICAgICAnbWluLWhlaWdodCc6ICF0aGlzLmhvcml6b250YWwgJiYgIXRoaXMuZml0LFxuICAgICAgICAgICdmaXQtaGVpZ2h0JzogIXRoaXMuaG9yaXpvbnRhbCAmJiB0aGlzLmZpdFxuICAgICAgICB9XG4gICAgICB9LCBbdGhpcy4kc2NvcGVkU2xvdHMuZGVmYXVsdCgpXSlcbiAgICBdKVxuICB9XG59IiwiaW1wb3J0IFNsaWRlIGZyb20gJy4vc3JjL21haW4uanMnXG5cbmNvbnN0IGluc3RhbGwgPSBmdW5jdGlvbiAoVnVlKSB7XG4gIFZ1ZS5jb21wb25lbnQoU2xpZGUubmFtZSwgU2xpZGUpXG59XG5cblNsaWRlLmluc3RhbGwgPSBpbnN0YWxsXG5cbmV4cG9ydCBkZWZhdWx0IFNsaWRlXG4iLCJpbXBvcnQgVnVlIGZyb20gJ3Z1ZSdcbmltcG9ydCBTbGlkZSBmcm9tICcuLi8uLi9zbGlkZSdcbmltcG9ydCB7IGlzU3RyaW5nQ29udGFpbiB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2lzJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdzd0Jhc2ljSXRlbScsXG4gIGNvbXBvbmVudHM6IHsgU2xpZGUgfSxcbiAgcHJvcHM6IHtcbiAgICBjb250ZW50OiBTdHJpbmcsXG4gICAgc3ViQ29udGVudDogU3RyaW5nLFxuICAgIGljb246IFN0cmluZyxcbiAgICBkaXNhYmxlZDogQm9vbGVhbixcbiAgICBjb2xvcjogU3RyaW5nLFxuICAgIHByaW1hcnk6IEJvb2xlYW4sXG4gICAgbmVnYXRpdmU6IEJvb2xlYW4sXG4gICAgcG9zaXRpdmU6IEJvb2xlYW4sXG4gICAgd2FybmluZzogQm9vbGVhbixcbiAgICBjb2xsYXBzZWQ6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiB0cnVlXG4gICAgfSxcbiAgICB0bzogU3RyaW5nIHwgT2JqZWN0LFxuICAgIGluZGVudExldmVsOiBOdW1iZXIgfCBTdHJpbmcsXG4gICAgbWFzazogT2JqZWN0IHwgQm9vbGVhbixcbiAgICByaXBwbGU6IE9iamVjdCB8IEJvb2xlYW4sXG4gICAgc3ViOiBBcnJheSxcbiAgICBhY3RpdmU6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiBmYWxzZVxuICAgIH0sXG4gICAgY2FsbGJhY2s6IEZ1bmN0aW9uLFxuICAgIHN1YkZpbHRlcjogU3RyaW5nLFxuICAgIGZpbGxlZDoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IHZvaWQgMFxuICAgIH0sXG4gICAgc2hhZG93OiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogdm9pZCAwXG4gICAgfSxcbiAgICBzcGxpdDoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IHZvaWQgMFxuICAgIH0sXG4gICAgbWluaToge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IHZvaWQgMFxuICAgIH0sXG4gICAgY2VudGVyOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogdm9pZCAwXG4gICAgfSxcbiAgICBlbmQ6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiB2b2lkIDBcbiAgICB9XG4gIH0sXG4gIGRhdGE6ICgpID0+ICh7XG4gICAgY29sbGFwc2VkQmVmb3JlOiB0cnVlLFxuICAgIG1vdXNlb3ZlcjogZmFsc2UsXG4gICAgaGlkZTogZmFsc2UsXG4gICAgZXZlbnRPcmlnaW46IGZhbHNlLFxuICAgIGV2ZW50SHViOiB2b2lkIDBcbiAgfSksXG4gIGNvbXB1dGVkOiB7XG4gICAgaGFzQmVmb3JlKCkge1xuICAgICAgcmV0dXJuIHRoaXMuJHNjb3BlZFNsb3RzLmJlZm9yZSAhPT0gdm9pZCAwIHx8IHRoaXMuaWNvbiAhPT0gdm9pZCAwXG4gICAgfSxcbiAgICBoYXNDb250ZW50KCkge1xuICAgICAgcmV0dXJuIHRoaXMuJHNjb3BlZFNsb3RzLmNvbnRlbnQgIT09IHZvaWQgMCB8fCB0aGlzLmNvbnRlbnQgIT09IHZvaWQgMCB8fCB0aGlzLnN1YkNvbnRlbnQgIT09IHZvaWQgMFxuICAgIH0sXG4gICAgaGFzU3ViKCkge1xuICAgICAgcmV0dXJuIHRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQgIT09IHZvaWQgMCB8fCB0aGlzLnN1YiAhPT0gdm9pZCAwXG4gICAgfSxcbiAgICBoYXNBY3Rpb24oKSB7XG4gICAgICByZXR1cm4gIXRoaXMuZGlzYWJsZWQgJiYgKHRoaXMudG8gIT09IHZvaWQgMCB8fCB0aGlzLmNhbGxiYWNrICE9PSB2b2lkIDAgfHwgdGhpcy4kc2NvcGVkU2xvdHMuZGVmYXVsdCB8fCB0aGlzLnN1YiAhPT0gdm9pZCAwKVxuICAgIH0sXG4gICAgaW5uZXJDZW50ZXIoKSB7XG4gICAgICByZXR1cm4gdGhpcy5jZW50ZXIgIT09IHZvaWQgMCA/IHRoaXMuY2VudGVyIDogdGhpcy5yb290UGFyYW1zLmNlbnRlclxuICAgIH0sXG4gICAgaW5uZXJFbmQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5lbmQgIT09IHZvaWQgMCA/IHRoaXMuZW5kIDogdGhpcy5yb290UGFyYW1zLmVuZFxuICAgIH0sXG4gICAgaW5uZXJGaWxsZWQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5maWxsZWQgIT09IHZvaWQgMCA/IHRoaXMuZmlsbGVkIDogdGhpcy5yb290UGFyYW1zLmZpbGxlZFxuICAgIH0sXG4gICAgaW5uZXJTcGxpdCgpIHtcbiAgICAgIHJldHVybiB0aGlzLnNwbGl0ICE9PSB2b2lkIDAgPyB0aGlzLnNwbGl0IDogdGhpcy5yb290UGFyYW1zLnNwbGl0XG4gICAgfSxcbiAgICBpbm5lck1pbmkoKSB7XG4gICAgICByZXR1cm4gdGhpcy5taW5pICE9PSB2b2lkIDAgPyB0aGlzLm1pbmkgOiB0aGlzLnJvb3RQYXJhbXMubWluaVxuICAgIH0sXG4gICAgaW5uZXJTaGFkb3coKSB7XG4gICAgICByZXR1cm4gdGhpcy5zaGFkb3cgIT09IHZvaWQgMCA/IHRoaXMuc2hhZG93IDogdGhpcy5yb290UGFyYW1zLnNoYWRvd1xuICAgIH0sXG4gICAgaW5uZXJNYXNrKCkge1xuICAgICAgcmV0dXJuIHRoaXMubWFzayAhPT0gdm9pZCAwID8gdGhpcy5tYXNrIDogdGhpcy5yb290UGFyYW1zLm1hc2tcbiAgICB9LFxuICAgIGlubmVyUmlwcGxlKCkge1xuICAgICAgcmV0dXJuIHRoaXMucmlwcGxlICE9PSB2b2lkIDAgPyB0aGlzLnJpcHBsZSA6IHRoaXMucm9vdFBhcmFtcy5yaXBwbGVcbiAgICB9LFxuICAgIGlubmVySW5kZW50TGV2ZWwoKSB7XG4gICAgICByZXR1cm4gdGhpcy5pbmRlbnRMZXZlbCB8fCB0aGlzLnJvb3RQYXJhbXMuaW5kZW50TGV2ZWxcbiAgICB9LFxuICAgIGlubmVyQ2FsbGJhY2soKSB7XG4gICAgICByZXR1cm4gdGhpcy5jYWxsYmFjayB8fCB0aGlzLnJvb3RQYXJhbXMuY2FsbGJhY2tcbiAgICB9LFxuICAgIGlubmVyU3ViRmlsdGVyKCkge1xuICAgICAgcmV0dXJuIHRoaXMucm9vdCA9PT0gdm9pZCAwID8gdGhpcy5zdWJGaWx0ZXIgOiB0aGlzLnJvb3Quc3ViRmlsdGVyXG4gICAgfSxcbiAgICBpbm5lckV2ZW50SHViKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZXZlbnRIdWIgfHwgdGhpcy5yb290LmV2ZW50SHViXG4gICAgfSxcbiAgICByb290UGFyYW1zKCkge1xuICAgICAgcmV0dXJuIHRoaXMucm9vdCB8fCB7fVxuICAgIH0sXG4gICAgbWluSGVpZ2h0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuaW5uZXJNaW5pID8gJzM2cHgnIDogJzQ4cHgnXG4gICAgfVxuICB9LFxuICBpbmplY3Q6IHtcbiAgICByb290OiB7XG4gICAgICBkZWZhdWx0KCkge1xuICAgICAgICByZXR1cm4gdm9pZCAwXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBwcm92aWRlKCkge1xuICAgIHJldHVybiB0aGlzLnJvb3QgPT09IHZvaWQgMCA/IHtcbiAgICAgIHJvb3Q6IHRoaXNcbiAgICB9IDogdm9pZCAwXG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBzdWJGaWx0ZXJDaGFuZ2UocmVzdG9yZSwgcmVtZW1iZXIpIHtcbiAgICAgIGNvbnN0IGlzU3ViQ29udGFpbiA9IHN1YiA9PiB7XG4gICAgICAgIGxldCBjb250YWluID0gZmFsc2VcbiAgXG4gICAgICAgIGNvbnRhaW4gPSBzdWIuc29tZSh4ID0+IHtcbiAgICAgICAgICBpZiAoeC5zdWIpIHtcbiAgICAgICAgICAgIHJldHVybiBpc1N1YkNvbnRhaW4oeC5zdWIpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBpc1N0cmluZ0NvbnRhaW4oeC5jb250ZW50LCB0aGlzLmlubmVyU3ViRmlsdGVyKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5cbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuc3ViID09PSB2b2lkIDApIHtcbiAgICAgICAgdGhpcy5oaWRlID0gIWlzU3RyaW5nQ29udGFpbih0aGlzLmNvbnRlbnQsIHRoaXMuaW5uZXJTdWJGaWx0ZXIpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAocmVzdG9yZSkge1xuICAgICAgICAgIHRoaXMuJGVtaXQoJ3VwZGF0ZTpjb2xsYXBzZWQnLCB0aGlzLmNvbGxhcHNlZEJlZm9yZSlcbiAgICAgICAgICB0aGlzLmhpZGUgPSBmYWxzZVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGlmIChyZW1lbWJlcikge1xuICAgICAgICAgIHRoaXMuY29sbGFwc2VkQmVmb3JlID0gdGhpcy5jb2xsYXBzZWRcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiRlbWl0KCd1cGRhdGU6Y29sbGFwc2VkJywgZmFsc2UpXG4gICAgICAgIHRoaXMuaGlkZSA9IHRoaXMucm9vdCAhPT0gdm9pZCAwICYmICFpc1N1YkNvbnRhaW4odGhpcy5zdWIpXG4gICAgICB9XG4gICAgfSxcbiAgICBpbml0RXZlbnRIdWIoKSB7XG4gICAgICBpZiAodGhpcy5yb290ID09PSB2b2lkIDApIHtcbiAgICAgICAgdGhpcy5ldmVudEh1YiA9IG5ldyBWdWUoKVxuICAgICAgfVxuICAgICAgdGhpcy5pbm5lckV2ZW50SHViLiRvbignY2hhbmdlOmFjdGl2ZScsICgpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLmV2ZW50T3JpZ2luKSB7XG4gICAgICAgICAgdGhpcy4kZW1pdCgndXBkYXRlOmFjdGl2ZScsIGZhbHNlKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuZXZlbnRPcmlnaW4gPSBmYWxzZVxuICAgICAgfSlcbiAgICB9LFxuICAgIGVtaXRBY3RpdmUoKSB7XG4gICAgICB0aGlzLmV2ZW50T3JpZ2luID0gdHJ1ZVxuICAgICAgdGhpcy4kZW1pdCgndXBkYXRlOmFjdGl2ZScsIHRydWUpXG4gICAgICB0aGlzLmlubmVyRXZlbnRIdWIuJGVtaXQoJ2NoYW5nZTphY3RpdmUnKVxuICAgIH1cbiAgfSxcbiAgY3JlYXRlZCgpIHtcbiAgICB0aGlzLmluaXRFdmVudEh1YigpXG4gICAgaWYgKHRoaXMuY29udGVudCAhPT0gdm9pZCAwICYmIHRoaXMuaW5uZXJTdWJGaWx0ZXIgIT09IHZvaWQgMCkge1xuICAgICAgdGhpcy4kd2F0Y2goJ2lubmVyU3ViRmlsdGVyJywgKHYsIG92KSA9PiB7XG4gICAgICAgIGlmICh2ICE9PSAnJyB8fCBvdiAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgdGhpcy5zdWJGaWx0ZXJDaGFuZ2UodiA9PT0gJycsIG92ID09PSAnJylcbiAgICAgICAgfVxuICAgICAgfSwgeyBpbW1lZGlhdGU6IHRydWUgfSlcbiAgICB9XG4gIH0sXG4gIHJlbmRlcihoKSB7XG4gICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiAnc3ctYmFzaWMtaXRlbScsXG4gICAgICBhdHRyczoge1xuICAgICAgICBtdXRhdGU6IHRoaXMuaGlkZVxuICAgICAgfSxcbiAgICAgIGNsYXNzOiB7XG4gICAgICAgIHNwbGl0OiB0aGlzLmlubmVyU3BsaXQgJiYgIXRoaXMuY29sbGFwc2VkLFxuICAgICAgICBoaWRlOiB0aGlzLmhpZGVcbiAgICAgIH1cbiAgICB9LCBbXG4gICAgICBoKCdkaXYnLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctYmFzaWMtaXRlbV9fbWFpbicsXG4gICAgICAgIGNsYXNzOiB0aGlzLmRpc2FibGVkID8gJ2Rpc2FibGUnIDogdGhpcy5pbm5lckZpbGxlZCA/IHtcbiAgICAgICAgICAnYmctcHJpbWFyeSc6IHRoaXMucHJpbWFyeSxcbiAgICAgICAgICAnYmctbmVnYXRpdmUnOiB0aGlzLm5lZ2F0aXZlLFxuICAgICAgICAgICdiZy1wb3NpdGl2ZSc6IHRoaXMucG9zaXRpdmUsXG4gICAgICAgICAgJ2JnLXdhcm5pbmcnOiB0aGlzLndhcm5pbmcsXG4gICAgICAgICAgJ2JnLWRhcmsgY29sb3Itd2hpdGUnOiB0cnVlXG4gICAgICAgIH0gOiB7XG4gICAgICAgICAgJ2NvbG9yLXByaW1hcnknOiB0aGlzLnByaW1hcnksXG4gICAgICAgICAgJ2NvbG9yLW5lZ2F0aXZlJzogdGhpcy5uZWdhdGl2ZSxcbiAgICAgICAgICAnY29sb3ItcG9zaXRpdmUnOiB0aGlzLnBvc2l0aXZlLFxuICAgICAgICAgICdjb2xvci13YXJuaW5nJzogdGhpcy53YXJuaW5nXG4gICAgICAgIH0sXG4gICAgICAgIHN0eWxlOiB0aGlzLmRpc2FibGVkID8gdm9pZCAwIDogdGhpcy5pbm5lckZpbGxlZCA/IHtcbiAgICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6IHRoaXMuY29sb3JcbiAgICAgICAgfSA6IHtcbiAgICAgICAgICBjb2xvcjogdGhpcy5jb2xvclxuICAgICAgICB9XG4gICAgICB9LCBbXG4gICAgICAgIGgoJ3N3LWl0ZW0nLCB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1iYXNpYy1pdGVtX19pbm5lcicsXG4gICAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIHRvOiB0aGlzLmlubmVyQ2FsbGJhY2sgPyB2b2lkIDAgOiB0aGlzLnRvLFxuICAgICAgICAgICAgY2VudGVyOiB0aGlzLmlubmVyQ2VudGVyLFxuICAgICAgICAgICAgZW5kOiB0aGlzLmlubmVyRW5kLFxuICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuZGlzYWJsZWQsXG4gICAgICAgICAgICBtYXNrOiB0aGlzLmlubmVyTWFzayxcbiAgICAgICAgICAgIHJpcHBsZTogdGhpcy5pbm5lclJpcHBsZSxcbiAgICAgICAgICAgIGFjdGl2ZTogdGhpcy5hY3RpdmVcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgICBleHBhbmQ6ICF0aGlzLmNvbGxhcHNlZFxuICAgICAgICAgIH0sXG4gICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICdtaW4taGVpZ2h0JzogdGhpcy5taW5IZWlnaHQsXG4gICAgICAgICAgICAncGFkZGluZy1sZWZ0JzogYCR7dGhpcy5pbm5lckluZGVudExldmVsICogMTJ9cHhgLFxuICAgICAgICAgICAgY3Vyc29yOiB0aGlzLmhhc0FjdGlvbiA/ICdwb2ludGVyJyA6IHZvaWQgMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgb246IHRoaXMuZGlzYWJsZWQgPyB2b2lkIDAgOiB7XG4gICAgICAgICAgICAuLi50aGlzLiRsaXN0ZW5lcnMsXG4gICAgICAgICAgICBjbGljazogKCkgPT4ge1xuICAgICAgICAgICAgICBpZiAodGhpcy5oYXNTdWIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCd1cGRhdGU6Y29sbGFwc2VkJywgIXRoaXMuY29sbGFwc2VkKVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdEFjdGl2ZSgpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGhpcy5pbm5lckNhbGxiYWNrICYmIHRoaXMuaW5uZXJDYWxsYmFjayh0aGlzKVxuICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdjbGljaycpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbW91c2VvdmVyOiAoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMubW91c2VvdmVyID0gdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1vdXNlb3V0OiAoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMubW91c2VvdmVyID0gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIHNjb3BlZFNsb3RzOiB7XG4gICAgICAgICAgICBiZWZvcmU6ICgpID0+IFtoKCdkaXYnLCB7XG4gICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiAnZmxleCBpdGVtcy1jZW50ZXInLFxuICAgICAgICAgICAgICBjbGFzczoge1xuICAgICAgICAgICAgICAgICdzcGFjZS1yaWdodCc6IHRoaXMuaGFzQmVmb3JlXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIHRoaXMuJHNjb3BlZFNsb3RzLmJlZm9yZSAhPT0gdm9pZCAwID8gW3RoaXMuJHNjb3BlZFNsb3RzLmJlZm9yZSgpXVxuICAgICAgICAgICAgICA6IHRoaXMuaWNvbiAhPT0gdm9pZCAwID8gW2goJ3N3LWljb24nLCB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1iYXNpYy1pdGVtX19pY29uJyxcbiAgICAgICAgICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgICAgICAgbmFtZTogdGhpcy5pY29uXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KV0gOiB2b2lkIDApXSxcbiAgXG4gICAgICAgICAgICBkZWZhdWx0OiAoKSA9PiBbaCgnZGl2Jywge1xuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWJhc2ljLWl0ZW1fX2NvbnRlbnQgZmxleCBpdGVtcy1jZW50ZXInLFxuICAgICAgICAgICAgICBjbGFzczoge1xuICAgICAgICAgICAgICAgICdzcGFjZS1yaWdodCc6IHRoaXMuaGFzQ29udGVudFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCB0aGlzLiRzY29wZWRTbG90cy5jb250ZW50ICE9PSB2b2lkIDAgPyBbdGhpcy4kc2NvcGVkU2xvdHMuY29udGVudCgpXSA6IFtcbiAgICAgICAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiAnZGVmYXVsdC1jb250ZW50J1xuICAgICAgICAgICAgICB9LCBbXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50ICE9PSB2b2lkIDAgPyBoKCdkaXYnLCB7XG4gICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWJhc2ljLWl0ZW1fX2xhYmVsJ1xuICAgICAgICAgICAgICAgIH0sIHRoaXMuY29udGVudCkgOiB2b2lkIDAsXG4gICAgICAgICAgICAgICAgdGhpcy5zdWJDb250ZW50ICE9PSB2b2lkIDAgPyBoKCdkaXYnLCB7XG4gICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWJhc2ljLWl0ZW1fX3N1YmxhYmVsJ1xuICAgICAgICAgICAgICAgIH0sIHRoaXMuc3ViQ29udGVudCkgOiB2b2lkIDBcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIF1cbiAgICAgICAgICAgICldLFxuICBcbiAgICAgICAgICAgIGFmdGVyOiAoKSA9PiBbaCgnZGl2Jywge1xuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogJ2ZsZXggaXRlbXMtY2VudGVyJ1xuICAgICAgICAgICAgfSwgdGhpcy4kc2NvcGVkU2xvdHMuYWZ0ZXIgIT09IHZvaWQgMCA/IFt0aGlzLiRzY29wZWRTbG90cy5hZnRlcigpXVxuICAgICAgICAgICAgICA6IHRoaXMuaGFzU3ViID8gW2goJ3N3LWljb24nLCB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1iYXNpYy1pdGVtX19leHBhbnNpb24gY29sb3ItZ3JleScsXG4gICAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogIXRoaXMuY29sbGFwc2VkID8gJ3JvdGF0ZSgxODBkZWcpJyA6IHZvaWQgMCxcbiAgICAgICAgICAgICAgICAgIGNvbG9yOiB0aGlzLm1vdXNlb3ZlciA/ICdjdXJyZW50Q29sb3InIDogdm9pZCAwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgICAgICAgbmFtZTogJ2tleWJvYXJkX2Fycm93X2Rvd24nXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KV0gOiB2b2lkIDApXVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIF0pLFxuICAgICAgdGhpcy5oYXNTdWIgPyBoKFNsaWRlLCB7XG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgY29sbGFwc2VkOiB0aGlzLmNvbGxhcHNlZCxcbiAgICAgICAgICBzaGFkb3c6IHRoaXMuaW5uZXJTaGFkb3dcbiAgICAgICAgfSxcbiAgICAgICAgc2NvcGVkU2xvdHM6IHtcbiAgICAgICAgICBkZWZhdWx0OiAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgc3ViID0gdGhpcy5zdWIgIT09IHZvaWQgMCA/IHRoaXMuc3ViLm1hcChwcm9wcyA9PiBoKCdzdy1iYXNpYy1pdGVtJywge1xuICAgICAgICAgICAgICBwcm9wczogcHJvcHMsXG4gICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgJ3VwZGF0ZTpjb2xsYXBzZWQnOiB2ID0+IHtcbiAgICAgICAgICAgICAgICAgIHByb3BzLmNvbGxhcHNlZCA9IHZcbiAgICAgICAgICAgICAgICAgIHRoaXMuJGZvcmNlVXBkYXRlKClcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICd1cGRhdGU6YWN0aXZlJzogdiA9PiB7XG4gICAgICAgICAgICAgICAgICBwcm9wcy5hY3RpdmUgPSB2XG4gICAgICAgICAgICAgICAgICB0aGlzLiRmb3JjZVVwZGF0ZSgpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSkgOiBbXVxuXG4gICAgICAgICAgICBzdWIudW5zaGlmdCh0aGlzLiRzY29wZWRTbG90cy5kZWZhdWx0ID8gdGhpcy4kc2NvcGVkU2xvdHMuZGVmYXVsdCgpIDogdm9pZCAwKVxuICAgICAgICAgICAgcmV0dXJuIHN1YlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSkgOiB2b2lkIDBcbiAgICBdKVxuICB9XG59IiwiaW1wb3J0IEJhc2ljSXRlbSBmcm9tICcuL3NyYy9tYWluLmpzJ1xuXG5jb25zdCBpbnN0YWxsID0gZnVuY3Rpb24gKFZ1ZSkge1xuICBWdWUuY29tcG9uZW50KEJhc2ljSXRlbS5uYW1lLCBCYXNpY0l0ZW0pXG59XG5cbkJhc2ljSXRlbS5pbnN0YWxsID0gaW5zdGFsbFxuXG5leHBvcnQgZGVmYXVsdCBCYXNpY0l0ZW1cbiIsImV4cG9ydCBmdW5jdGlvbiBoYXNPd24ob2JqLCBrZXkpIHtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBpc1ZOb2RlKG5vZGUpIHtcbiAgcmV0dXJuIG5vZGUgIT09IG51bGwgJiYgdHlwZW9mIG5vZGUgPT09ICdvYmplY3QnICYmIGhhc093bihub2RlLCAnY29tcG9uZW50T3B0aW9ucycpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEZpcnN0Q29tcG9uZW50Q2hpbGQoY2hpbGRyZW4pIHtcbiAgcmV0dXJuIGNoaWxkcmVuICYmIGNoaWxkcmVuLmZpbHRlcihjID0+IGMgJiYgYy50YWcpWzBdO1xufTsiLCIvLyA8dGVtcGxhdGU+XG4vLyAgIDxkaXY+XG4vLyAgICAgPGJ1dHRvbiBAY2xpY2s9XCJoYW5kbGVCdG5cIj5jbGljazwvYnV0dG9uPlxuLy8gICAgIDx0cmFuc2l0aW9uIG5hbWU9J3N3LW5vdGlmaWNhdGlvbi1mYWRlJz5cbi8vICAgICAgIDxkaXYgdi1pZj1cInNob3dcIiBjbGFzcz1cInN3LW5vdGlmaWNhdGlvblwiPlxuLy8gICAgICAgICA8aDIgY2xhc3M9XCJ0aXRsZVwiPlxuLy8gICAgICAgICAgIOaPkOekujExMTFcbi8vICAgICAgICAgPC9oMj5cbi8vICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRlbnRcIj5cbi8vICAgICAgICAgICDov5nmmK/kuIDmnaHmtojmga9cbi8vICAgICAgICAgPC9kaXY+XG4vLyAgICAgICAgIDxkaXYgY2xhc3M9XCJjbG9zZVwiIEBjbGljaz1cImhhbmRsZUJ0blwiPlxuLy8gICAgICAgICAgIDxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5jbG9zZTwvaT5cbi8vICAgICAgICAgPC9kaXY+XG4vLyAgICAgICA8L2Rpdj5cbi8vICAgICA8L3RyYW5zaXRpb24+XG4vLyAgIDwvZGl2PlxuLy8gPC90ZW1wbGF0ZT5cbmltcG9ydCBWbm9kZSwgeyBpc1ZOb2RlIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvdmRvbSdcbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3N3Tm90aWZpY2F0aW9uJyxcbiAgZGF0YSAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHNob3c6IGZhbHNlLFxuICAgICAgdmVydGljYWxPZmZzZXQ6IDAsXG4gICAgICBvbkNsb3NlOiBudWxsLFxuICAgICAgcG9zaXRpb246ICd0b3AtcmlnaHQnLFxuICAgICAgdGl0bGU6ICcnLFxuICAgICAgY29udGVudDogJycsXG4gICAgICBzbG90OiBudWxsLFxuICAgICAgYmFja2dyb3VuZDogJyNmZmYnLFxuICAgICAgY2xvc2VDb2xvcjogJyM5MDkzOTknXG4gICAgfVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgaGFuZGxlQnRuKCkge1xuICAgICAgdGhpcy5zaG93ID0gZmFsc2VcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5vbkNsb3NlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMub25DbG9zZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgY29tcHV0ZWQ6IHtcbiAgICB2ZXJ0aWNhbFByb3BlcnR5KCkge1xuICAgICAgcmV0dXJuIC9edG9wLS8udGVzdCh0aGlzLnBvc2l0aW9uKSA/ICd0b3AnIDogJ2JvdHRvbSc7XG4gICAgfSxcblxuICAgIHBvc2l0aW9uU3R5bGUoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBbdGhpcy52ZXJ0aWNhbFByb3BlcnR5XTogYCR7IHRoaXMudmVydGljYWxPZmZzZXQgfXB4YCxcbiAgICAgIH07XG4gICAgfSxcbiAgICBnZXRWbm9kZSgpIHtcbiAgICAgIGlmIChpc1ZOb2RlKHRoaXMuc2xvdCkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2xvdFxuICAgICAgfVxuICAgICAgY29uc29sZS5lcnJvcignUGxlYXNlIGNoZWNrIHlvdXIgVm5vZGUgd3JpdGluZycpXG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgfSxcbiAgcmVuZGVyKGgpIHtcbiAgIHJldHVybiBoKCd0cmFuc2l0aW9uJyx7XG4gICAgICBhdHRyczoge1xuICAgICAgICBuYW1lOiAnc3ctbm90aWZpY2F0aW9uLWZhZGUnXG4gICAgICB9XG4gICAgfSwgW3RoaXMuc2hvdyA/IGgoJ2RpdicsIHtcbiAgICAgICAgICAgIGNsYXNzOiAnc3ctbm90aWZpY2F0aW9uJyxcbiAgICAgICAgICAgIHN0eWxlOiBPYmplY3QuYXNzaWduKHRoaXMucG9zaXRpb25TdHlsZSwgeyBiYWNrZ3JvdW5kOiB0aGlzLmJhY2tncm91bmQgfSlcbiAgICAgICAgICB9LCBbXG4gICAgICAgICAgICB0aGlzLmdldFZub2RlID8gJycgOiBoKCdoMicsIHtcbiAgICAgICAgICAgICAgY2xhc3M6ICd0aXRsZSdcbiAgICAgICAgICAgIH0sIHRoaXMudGl0bGUpLFxuICAgICAgICAgICAgdGhpcy5nZXRWbm9kZSA/IHRoaXMuZ2V0Vm5vZGUgOiBoKCdkaXYnLCB7XG4gICAgICAgICAgICAgIGNsYXNzOiAnY29udGVudCdcbiAgICAgICAgICAgIH0sdGhpcy5jb250ZW50KSxcbiAgICAgICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAgICAgY2xhc3M6ICdjbG9zZScsXG4gICAgICAgICAgICAgIHN0eWxlOiB7IGNvbG9yOiB0aGlzLmNsb3NlQ29sb3IgfSxcbiAgICAgICAgICAgIH0sIFtoKCdkaXYnLCB7XG4gICAgICAgICAgICAgICAgICBjbGFzczogJ21hdGVyaWFsLWljb25zJyxcbiAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgIGNsaWNrOiAoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQnRuKClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sICdjbG9zZScpXSlcbiAgICAgICAgICBdKVxuICAgIFxuICAgICAgICA6IHZvaWQgMF0gKVxuICB9XG59XG5cbiIsImltcG9ydCBWdWUgZnJvbSAndnVlJztcbmltcG9ydCBOb3RpZmljYXRpb24gZnJvbSAnLi9tYWluLmpzJztcblxuY29uc3QgTm90aWZpY2F0aW9uQ29uc3RydWN0b3IgPSBWdWUuZXh0ZW5kKE5vdGlmaWNhdGlvbilcblxubGV0IGluc3RhbmNlO1xubGV0IGluc3RhbmNlcyA9IFtdXG5sZXQgc2VlZCA9IDFcbmNvbnN0IE5vdGlmaWNhdGlvbkZ1biA9IGZ1bmN0aW9uKG9wdGlvbnMpe1xuICBpZiAoVnVlLnByb3RvdHlwZS4kaXNTZXJ2ZXIpIHJldHVybjtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGNvbnN0IHVzZXJPbkNsb3NlID0gb3B0aW9ucy5vbkNsb3NlO1xuICBjb25zdCBpZCA9ICdub3RpZmljYXRpb25fJyArIHNlZWQrKztcbiAgY29uc3QgcG9zaXRpb24gPSBvcHRpb25zLnBvc2l0aW9uIHx8ICd0b3AtcmlnaHQnO1xuICBvcHRpb25zLm9uQ2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgICBOb3RpZmljYXRpb24uY2xvc2UoaWQsIHVzZXJPbkNsb3NlKVxuICB9XG4gIGluc3RhbmNlID0gbmV3IE5vdGlmaWNhdGlvbkNvbnN0cnVjdG9yKHtcbiAgICBkYXRhOiBvcHRpb25zXG4gIH0pXG4gIGluc3RhbmNlLmlkID0gaWRcbiAgaW5zdGFuY2UuJG1vdW50KCk7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoaW5zdGFuY2UuJGVsKTtcbiAgaW5zdGFuY2Uuc2hvdyA9IHRydWVcbiAgbGV0IHZlcnRpY2FsT2Zmc2V0ID0gMFxuICBpbnN0YW5jZXMuZmlsdGVyKGl0ZW0gPT4gaXRlbS5wb3NpdGlvbiA9PT0gcG9zaXRpb24pLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgdmVydGljYWxPZmZzZXQgKz0gZWxlbWVudC4kZWwub2Zmc2V0SGVpZ2h0ICsgMTZcbiAgfSk7XG4gIHZlcnRpY2FsT2Zmc2V0ICs9IDE2XG4gIGluc3RhbmNlLnZlcnRpY2FsT2Zmc2V0ID0gdmVydGljYWxPZmZzZXRcbiAgaW5zdGFuY2VzLnB1c2goaW5zdGFuY2UpXG4gIGNvbnNvbGUubG9nKClcbiAgcmV0dXJuIGluc3RhbmNlO1xufSBcbk5vdGlmaWNhdGlvbi5jbG9zZSA9IGZ1bmN0aW9uKGlkLCB1c2VyT25DbG9zZSkge1xuICBsZXQgaW5kZXggPSAtMVxuICBjb25zdCBsZW4gPSBpbnN0YW5jZXMubGVuZ3RoXG4gIGNvbnN0IGluc3RhbmNlID0gaW5zdGFuY2VzLmZpbHRlcigoaW5zdGFuY2UsIGkpID0+IHtcbiAgICBpZiAoaW5zdGFuY2UuaWQgPT09IGlkKSB7XG4gICAgICBpbmRleCA9IGk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9KVswXVxuICBpZiAoIWluc3RhbmNlKSByZXR1cm5cblxuICBpZiAodHlwZW9mIHVzZXJPbkNsb3NlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdXNlck9uQ2xvc2UoaW5zdGFuY2UpO1xuICB9XG4gIGluc3RhbmNlcy5zcGxpY2UoaW5kZXgsIDEpXG5cbiAgaWYgKGxlbiA8PSAxKSByZXR1cm5cblxuICBjb25zdCBwb3NpdGlvbiA9IGluc3RhbmNlLnBvc2l0aW9uO1xuICBjb25zdCByZW1vdmVkSGVpZ2h0ID0gaW5zdGFuY2UuJGVsLm9mZnNldEhlaWdodFxuICBmb3IgKGxldCBpID0gaW5kZXg7IGkgPCBsZW4gLSAxOyBpKyspe1xuICAgIGlmIChpbnN0YW5jZXNbaV0ucG9zaXRpb24gPT09IHBvc2l0aW9uKSB7XG4gICAgICBpbnN0YW5jZXNbaV0uJGVsLnN0eWxlW2luc3RhbmNlLnZlcnRpY2FsUHJvcGVydHldID0gcGFyc2VJbnQoaW5zdGFuY2VzW2ldLiRlbC5zdHlsZVtpbnN0YW5jZS52ZXJ0aWNhbFByb3BlcnR5XSwgMTApIC0gcmVtb3ZlZEhlaWdodCAtIDE2ICsgJ3B4J1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBOb3RpZmljYXRpb25GdW4iLCJpbXBvcnQgU2xpZGUgZnJvbSAnLi4vLi4vc2xpZGUnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3N3TGF5b3V0JyxcbiAgY29tcG9uZW50czogeyBTbGlkZSB9LFxuICBwcm9wczoge1xuICAgIGNvbGxhcHNlVG9wOiBCb29sZWFuLFxuICAgIGNvbGxhcHNlTGVmdDogQm9vbGVhbixcbiAgICBjb2xsYXBzZVJpZ2h0OiBCb29sZWFuLFxuICAgIGNvbGxhcHNlQm90dG9tOiBCb29sZWFuLFxuICAgIGZpdFRvcDogQm9vbGVhbixcbiAgICBmaXRMZWZ0OiBCb29sZWFuLFxuICAgIGZpdFJpZ2h0OiBCb29sZWFuLFxuICAgIGZpdEJvdHRvbTogQm9vbGVhbixcbiAgICB0b3BNaW46IE51bWJlciB8IFN0cmluZyxcbiAgICBsZWZ0TWluOiBOdW1iZXIgfCBTdHJpbmcsXG4gICAgcmlnaHRNaW46IE51bWJlciB8IFN0cmluZyxcbiAgICBib3R0b21NaW46IE51bWJlciB8IFN0cmluZyxcbiAgICBzaGFkb3c6IEJvb2xlYW5cbiAgfSxcbiAgZGF0YTogKCkgPT4gKHt9KSxcbiAgY29tcHV0ZWQ6IHtcbiAgICB2ZXJ0aWNhbFN0cmV0Y2goKSB7XG4gICAgICByZXR1cm4gdGhpcy4kc2NvcGVkU2xvdHMudG9wICE9PSB2b2lkIDAgfHwgdGhpcy4kc2NvcGVkU2xvdHMuYm90dG9tICE9PSB2b2lkIDBcbiAgICB9XG4gIH0sXG4gIHJlbmRlcihoKSB7XG4gICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiAnc3ctbGF5b3V0IGZsZXggbm8td3JhcCcsXG4gICAgICBjbGFzczoge1xuICAgICAgICBzaGFkb3c6IHRoaXMuc2hhZG93XG4gICAgICB9LFxuICAgICAgc3R5bGU6IHtcbiAgICAgICAgJ2ZsZXgtZGlyZWN0aW9uJzogdGhpcy52ZXJ0aWNhbFN0cmV0Y2ggJiYgJ2NvbHVtbidcbiAgICAgIH1cbiAgICB9LCBbXG4gICAgICB0aGlzLiRzY29wZWRTbG90cy50b3AgIT09IHZvaWQgMCA/IGgoU2xpZGUsIHtcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICBjb2xsYXBzZWQ6IHRoaXMuY29sbGFwc2VUb3AsXG4gICAgICAgICAgZml0OiB0aGlzLmZpdFRvcCxcbiAgICAgICAgICBtaW46IHRoaXMudG9wTWluXG4gICAgICAgIH0sXG4gICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctbGF5b3V0X19hcm91bmQnLFxuICAgICAgICBzY29wZWRTbG90czoge1xuICAgICAgICAgIGRlZmF1bHQ6IHRoaXMuJHNjb3BlZFNsb3RzLnRvcFxuICAgICAgICB9XG4gICAgICB9KSA6IHZvaWQgMCxcblxuICAgICAgIXRoaXMudmVydGljYWxTdHJldGNoICYmIHRoaXMuJHNjb3BlZFNsb3RzLmxlZnQgIT09IHZvaWQgMCA/IGgoU2xpZGUsIHtcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICBjb2xsYXBzZWQ6IHRoaXMuY29sbGFwc2VMZWZ0LFxuICAgICAgICAgIGhvcml6b250YWw6IHRydWUsXG4gICAgICAgICAgZml0OiB0aGlzLmZpdExlZnQsXG4gICAgICAgICAgbWluOiB0aGlzLmxlZnRNaW5cbiAgICAgICAgfSxcbiAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1sYXlvdXRfX2Fyb3VuZCcsXG4gICAgICAgIHNjb3BlZFNsb3RzOiB7XG4gICAgICAgICAgZGVmYXVsdDogdGhpcy4kc2NvcGVkU2xvdHMubGVmdFxuICAgICAgICB9XG4gICAgICB9KSA6IHZvaWQgMCxcblxuICAgICAgaCgnZGl2Jywge1xuICAgICAgICByZWY6ICdsYXlvdXRNYWluJyxcbiAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1sYXlvdXRfX21haW4nLFxuICAgICAgfSwgW1t0aGlzLiRzY29wZWRTbG90cy5kZWZhdWx0ICE9PSB2b2lkIDBcbiAgICAgICAgPyB0aGlzLiRzY29wZWRTbG90cy5kZWZhdWx0KCkgOiB2b2lkIDBdXSksXG5cbiAgICAgICF0aGlzLnZlcnRpY2FsU3RyZXRjaCAmJiB0aGlzLiRzY29wZWRTbG90cy5yaWdodCAhPT0gdm9pZCAwID8gaChTbGlkZSwge1xuICAgICAgICBwcm9wczoge1xuICAgICAgICAgIGNvbGxhcHNlZDogdGhpcy5jb2xsYXBzZVJpZ2h0LFxuICAgICAgICAgIGhvcml6b250YWw6IHRydWUsXG4gICAgICAgICAgZml0OiB0aGlzLmZpdFJpZ2h0LFxuICAgICAgICAgIG1pbjogdGhpcy5yaWdodE1pblxuICAgICAgICB9LFxuICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWxheW91dF9fYXJvdW5kJyxcbiAgICAgICAgc2NvcGVkU2xvdHM6IHtcbiAgICAgICAgICBkZWZhdWx0OiB0aGlzLiRzY29wZWRTbG90cy5yaWdodFxuICAgICAgICB9XG4gICAgICB9KSA6IHZvaWQgMCxcblxuICAgICAgdGhpcy4kc2NvcGVkU2xvdHMuYm90dG9tICE9PSB2b2lkIDAgPyBoKFNsaWRlLCB7XG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgY29sbGFwc2VkOiB0aGlzLmNvbGxhcHNlQm90dG9tLFxuICAgICAgICAgIGZpdDogdGhpcy5maXRCb3R0b20sXG4gICAgICAgICAgbWluOiB0aGlzLmJvdHRvbU1pblxuICAgICAgICB9LFxuICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWxheW91dF9fYXJvdW5kJyxcbiAgICAgICAgc2NvcGVkU2xvdHM6IHtcbiAgICAgICAgICBkZWZhdWx0OiB0aGlzLiRzY29wZWRTbG90cy5ib3R0b21cbiAgICAgICAgfVxuICAgICAgfSkgOiB2b2lkIDBcbiAgICBdKVxuICB9XG59IiwiaW1wb3J0IExheW91dCBmcm9tICcuL3NyYy9tYWluLmpzJ1xuXG5jb25zdCBpbnN0YWxsID0gZnVuY3Rpb24gKFZ1ZSkge1xuICBWdWUuY29tcG9uZW50KExheW91dC5uYW1lLCBMYXlvdXQpXG59XG5cbkxheW91dC5pbnN0YWxsID0gaW5zdGFsbFxuXG5leHBvcnQgZGVmYXVsdCBMYXlvdXRcbiIsImNvbnN0IHNob3dNYXNrID0gY3R4ID0+IHtcbiAgaWYgKCFjdHguZGlzYWJsZWQgJiYgIWN0eC5zdGF5KSB7XG4gICAgY3R4Lm5vZGUuY2xhc3NMaXN0LnJlbW92ZSgnaW52aXNpYmxlJylcbiAgfVxufVxuY29uc3QgaGlkZU1hc2sgPSBjdHggPT4ge1xuICBpZiAoIWN0eC5kaXNhYmxlZCAmJiAhY3R4LnN0YXkpIHtcbiAgICBjdHgubm9kZS5jbGFzc0xpc3QuYWRkKCdpbnZpc2libGUnKVxuICB9XG59XG5jb25zdCBkaXNhYmxlTWFzayA9IGN0eCA9PiB7XG4gIGlmIChjdHguZGlzYWJsZWQgJiYgIWN0eC5zdGF5KSB7XG4gICAgY3R4Lm5vZGUuY2xhc3NMaXN0LmFkZCgnaW52aXNpYmxlJylcbiAgfVxufVxuY29uc3Qgc3RheU1hc2sgPSBjdHggPT4ge1xuICBpZiAoY3R4LnN0YXkpIHtcbiAgICBjdHgubm9kZS5jbGFzc0xpc3QucmVtb3ZlKCdpbnZpc2libGUnKVxuICB9IGVsc2Uge1xuICAgIGN0eC5ub2RlLmNsYXNzTGlzdC5hZGQoJ2ludmlzaWJsZScpXG4gIH1cbn1cbmNvbnN0IGNvbG9yTWFzayA9IGN0eCA9PiB7XG4gIGN0eC5ub2RlLnN0eWxlLmNvbG9yID0gY3R4LmNvbG9yXG59XG5jb25zdCBnZXREaXNhYmxlZCA9IHZhbHVlID0+IHZhbHVlICE9PSB2b2lkIDAgJiYgKHZhbHVlLmRpc2FibGVkID09PSB0cnVlIHx8IGZhbHNlKVxuY29uc3QgZ2V0U3RheSA9IHZhbHVlID0+IHZhbHVlICE9PSB2b2lkIDAgJiYgKHZhbHVlLnN0YXkgPT09IHRydWUgfHwgZmFsc2UpXG5jb25zdCBnZXRDb2xvciA9IHZhbHVlID0+IHZhbHVlICE9PSB2b2lkIDAgJiYgdmFsdWUuY29sb3IgfHwgdm9pZCAwXG5jb25zdCBpbml0TWFzayA9IChlbCwgYmluZGluZykgPT4ge1xuICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgY29uc3QgY3R4ID0ge1xuICAgIG5vZGU6IG5vZGUsXG4gICAgZGlzYWJsZWQ6IGdldERpc2FibGVkKGJpbmRpbmcudmFsdWUpLFxuICAgIHN0YXk6IGdldFN0YXkoYmluZGluZy52YWx1ZSksXG4gICAgY29sb3I6IGdldENvbG9yKGJpbmRpbmcudmFsdWUpLFxuICAgIHNob3dNYXNrOiAoKSA9PiB7XG4gICAgICBzaG93TWFzayhjdHgpXG4gICAgfSxcbiAgICBoaWRlTWFzazogKCkgPT4ge1xuICAgICAgaGlkZU1hc2soY3R4KVxuICAgIH1cbiAgfVxuXG4gIGN0eC5ub2RlLmNsYXNzTGlzdC5hZGQoJ3N3LW1hc2snKVxuICBkaXNhYmxlTWFzayhjdHgpXG4gIHN0YXlNYXNrKGN0eClcbiAgY29sb3JNYXNrKGN0eClcbiAgaGlkZU1hc2soY3R4KVxuICBlbC5tYXNrQ3R4ID0gY3R4XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ21hc2snLFxuICBiaW5kKGVsLCBiaW5kaW5nKSB7XG4gICAgaW5pdE1hc2soZWwsIGJpbmRpbmcpXG4gICAgZWwuYXBwZW5kQ2hpbGQoZWwubWFza0N0eC5ub2RlKVxuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIGVsLm1hc2tDdHguc2hvd01hc2ssIGZhbHNlKVxuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgZWwubWFza0N0eC5oaWRlTWFzaywgZmFsc2UpXG4gIH0sXG4gIHVwZGF0ZShlbCwgYmluZGluZykge1xuICAgIGVsLm1hc2tDdHguZGlzYWJsZWQgPSBnZXREaXNhYmxlZChiaW5kaW5nLnZhbHVlKVxuICAgIGlmIChnZXREaXNhYmxlZChiaW5kaW5nLm9sZFZhbHVlKSAhPT0gZWwubWFza0N0eC5kaXNhYmxlZCkge1xuICAgICAgZGlzYWJsZU1hc2soZWwubWFza0N0eClcbiAgICB9XG5cbiAgICBlbC5tYXNrQ3R4LnN0YXkgPSBnZXRTdGF5KGJpbmRpbmcudmFsdWUpXG4gICAgaWYgKGdldFN0YXkoYmluZGluZy5vbGRWYWx1ZSkgIT09IGVsLm1hc2tDdHguc3RheSkge1xuICAgICAgc3RheU1hc2soZWwubWFza0N0eClcbiAgICB9XG5cbiAgICBlbC5tYXNrQ3R4LmNvbG9yID0gZ2V0Q29sb3IoYmluZGluZy52YWx1ZSlcbiAgICBpZiAoZ2V0Q29sb3IoYmluZGluZy5vbGRWYWx1ZSkgIT09IGVsLm1hc2tDdHguY29sb3IpIHtcbiAgICAgIGNvbG9yTWFzayhlbC5tYXNrQ3R4KVxuICAgIH1cbiAgfSxcbiAgdW5iaW5kKGVsKSB7XG4gICAgaWYgKGVsLm1hc2tDdHgpIHtcbiAgICAgIGVsLm1hc2tDdHgubm9kZS5yZW1vdmUoKVxuICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgZWwubWFza0N0eC5zaG93TWFzaywgZmFsc2UpXG4gICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIGVsLm1hc2tDdHguaGlkZU1hc2ssIGZhbHNlKVxuICAgICAgZGVsZXRlIGVsLm1hc2tDdHhcbiAgICB9XG4gIH1cbn0iLCJpbXBvcnQgTWFzayBmcm9tICcuL3NyYy9tYWluLmpzJ1xuXG5jb25zdCBpbnN0YWxsID0gZnVuY3Rpb24gKFZ1ZSkge1xuICBWdWUuZGlyZWN0aXZlKE1hc2submFtZSwgTWFzaylcbn1cblxuTWFzay5pbnN0YWxsID0gaW5zdGFsbFxuXG5leHBvcnQgZGVmYXVsdCBNYXNrIiwiZXhwb3J0IGZ1bmN0aW9uIHBvc2l0aW9uKGUpIHtcbiAgaWYgKGUudG91Y2hlcyAmJiBlLnRvdWNoZXNbMF0pIHtcbiAgICBlID0gZS50b3VjaGVzWzBdXG4gIH0gZWxzZSBpZiAoZS5jaGFuZ2VkVG91Y2hlcyAmJiBlLmNoYW5nZWRUb3VjaGVzWzBdKSB7XG4gICAgZSA9IGUuY2hhbmdlZFRvdWNoZXNbMF1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgdG9wOiBlLmNsaWVudFksXG4gICAgbGVmdDogZS5jbGllbnRYXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEV2ZW50UGF0aChlKSB7XG4gIGlmIChlLnBhdGgpIHtcbiAgICByZXR1cm4gZS5wYXRoXG4gIH1cbiAgaWYgKGUuY29tcG9zZWRQYXRoKSB7XG4gICAgcmV0dXJuIGUuY29tcG9zZWRQYXRoKClcbiAgfVxuXG4gIGNvbnN0IHBhdGggPSBbXVxuICBsZXQgZWwgPSBlLnRhcmdldFxuXG4gIHdoaWxlIChlbCkge1xuICAgIHBhdGgucHVzaChlbClcblxuICAgIGlmIChlbC50YWdOYW1lID09PSAnSFRNTCcpIHtcbiAgICAgIHBhdGgucHVzaChkb2N1bWVudClcbiAgICAgIHBhdGgucHVzaCh3aW5kb3cpXG4gICAgICByZXR1cm4gcGF0aFxuICAgIH1cblxuICAgIGVsID0gZWwucGFyZW50RWxlbWVudFxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdG9wKGUpIHtcbiAgZS5zdG9wUHJvcGFnYXRpb24oKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJldmVudChlKSB7XG4gIGUucHJldmVudERlZmF1bHQoKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RvcEFuZFByZXZlbnQoZSkge1xuICBlLnByZXZlbnREZWZhdWx0KClcbiAgZS5zdG9wUHJvcGFnYXRpb24oKVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHBvc2l0aW9uLFxuICBnZXRFdmVudFBhdGgsXG4gIHN0b3AsXG4gIHByZXZlbnQsXG4gIHN0b3BBbmRQcmV2ZW50XG59IiwiaW1wb3J0IHsgY3NzIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvZG9tLmpzJ1xuaW1wb3J0IHsgcG9zaXRpb24gfSBmcm9tICcuLi8uLi8uLi91dGlscy9ldmVudC5qcydcblxuZnVuY3Rpb24gc2hvd1JpcHBsZShldnQsIGVsLCBjdHgsIGZvcmNlQ2VudGVyKSB7XG4gIGlmIChjdHgubW9kaWZpZXJzLnN0b3AgPT09IHRydWUpIHtcbiAgICBldnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgfVxuXG4gIGxldCB7IGNlbnRlciwgY29sb3IgfSA9IGN0eC5tb2RpZmllcnNcblxuICBjZW50ZXIgPSBjZW50ZXIgPT09IHRydWUgfHwgZm9yY2VDZW50ZXIgPT09IHRydWVcblxuICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gIGNvbnN0IGlubmVyTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICBjb25zdCBwb3MgPSBwb3NpdGlvbihldnQpXG4gIGNvbnN0IHsgbGVmdCwgdG9wLCB3aWR0aCwgaGVpZ2h0IH0gPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICBjb25zdCBkaWFtZXRlciA9IE1hdGguc3FydCh3aWR0aCAqIHdpZHRoICsgaGVpZ2h0ICogaGVpZ2h0KVxuICBjb25zdCByYWRpdXMgPSBkaWFtZXRlciAvIDJcbiAgY29uc3QgY2VudGVyWCA9IGAkeyh3aWR0aCAtIGRpYW1ldGVyKSAvIDJ9cHhgXG4gIGNvbnN0IHggPSBjZW50ZXIgPyBjZW50ZXJYIDogYCR7cG9zLmxlZnQgLSBsZWZ0IC0gcmFkaXVzfXB4YFxuICBjb25zdCBjZW50ZXJZID0gYCR7KGhlaWdodCAtIGRpYW1ldGVyKSAvIDJ9cHhgXG4gIGNvbnN0IHkgPSBjZW50ZXIgPyBjZW50ZXJZIDogYCR7cG9zLnRvcCAtIHRvcCAtIHJhZGl1c31weGBcbiAgbGV0IHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgaW5uZXJOb2RlLmNsYXNzTGlzdC5hZGQoJ3N3LXJpcHBsZV9faW5uZXItLWVudGVyJylcbiAgICBpbm5lck5vZGUuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZTNkKCR7Y2VudGVyWH0sICR7Y2VudGVyWX0sIDApIHNjYWxlM2QoMSwgMSwgMSlgXG4gICAgaW5uZXJOb2RlLnN0eWxlLm9wYWNpdHkgPSAwLjJcblxuICAgIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpbm5lck5vZGUuY2xhc3NMaXN0LnJlbW92ZSgnc3ctcmlwcGxlX19pbm5lci0tZW50ZXInKVxuICAgICAgaW5uZXJOb2RlLmNsYXNzTGlzdC5hZGQoJ3N3LXJpcHBsZV9faW5uZXItLWxlYXZlJylcbiAgICAgIGlubmVyTm9kZS5zdHlsZS5vcGFjaXR5ID0gMFxuXG4gICAgICB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBub2RlICYmIG5vZGUucmVtb3ZlKClcbiAgICAgICAgY3R4LmFib3J0ID0gdm9pZCAwXG4gICAgICB9LCAyNzUpXG4gICAgfSwgMjUwKVxuICB9LCA1MClcblxuICBpbm5lck5vZGUuY2xhc3NOYW1lID0gJ3N3LXJpcHBsZV9faW5uZXInXG4gIGNzcyhpbm5lck5vZGUsIHtcbiAgICBoZWlnaHQ6IGAke2RpYW1ldGVyfXB4YCxcbiAgICB3aWR0aDogYCR7ZGlhbWV0ZXJ9cHhgLFxuICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZTNkKCR7eH0sICR7eX0sIDApIHNjYWxlM2QoMC4yLCAwLjIsIDEpYCxcbiAgICBvcGFjaXR5OiAwXG4gIH0pXG4gIGlmIChjb2xvcikgeyBjc3Mobm9kZSwgeyBjb2xvcjogY29sb3IgfSkgfVxuICBub2RlLmNsYXNzTmFtZSA9IGBzdy1yaXBwbGVgXG4gIG5vZGUuYXBwZW5kQ2hpbGQoaW5uZXJOb2RlKVxuICBlbC5hcHBlbmRDaGlsZChub2RlKVxuXG4gIGN0eC5hYm9ydCA9ICgpID0+IHtcbiAgICBub2RlICYmIG5vZGUucmVtb3ZlKClcbiAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlQ3R4KGN0eCwgeyB2YWx1ZSwgbW9kaWZpZXJzLCBhcmcgfSkge1xuICBjdHguZGlzYWJsZWQgPSB2YWx1ZSAmJiB2YWx1ZS5kaXNhYmxlZCB8fCBmYWxzZVxuXG4gIGlmICghY3R4LmRpc2FibGVkKSB7XG4gICAgY3R4Lm1vZGlmaWVycyA9IE9iamVjdCh2YWx1ZSkgPT09IHZhbHVlXG4gICAgICA/IHtcbiAgICAgICAgc3RvcDogdmFsdWUuc3RvcCA9PT0gdHJ1ZSB8fCBtb2RpZmllcnMuc3RvcCA9PT0gdHJ1ZSxcbiAgICAgICAgY2VudGVyOiB2YWx1ZS5jZW50ZXIgPT09IHRydWUgfHwgbW9kaWZpZXJzLmNlbnRlciA9PT0gdHJ1ZSxcbiAgICAgICAgY29sb3I6IHZhbHVlLmNvbG9yIHx8IGFyZ1xuICAgICAgfVxuICAgICAgOiB7XG4gICAgICAgIHN0b3A6IG1vZGlmaWVycy5zdG9wLFxuICAgICAgICBjZW50ZXI6IG1vZGlmaWVycy5jZW50ZXIsXG4gICAgICAgIGNvbG9yOiBhcmdcbiAgICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdyaXBwbGUnLFxuICBpbnNlcnRlZChlbCwgYmluZGluZykge1xuICAgIGNvbnN0IGN0eCA9IHtcbiAgICAgIG1vZGlmaWVyczoge30sXG4gICAgICBjbGljayhldnQpIHtcbiAgICAgICAgaWYgKCFjdHguZGlzYWJsZWQpIHtcbiAgICAgICAgICBzaG93UmlwcGxlKGV2dCwgZWwsIGN0eClcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGtleXVwKGV2dCkge1xuICAgICAgICBpZiAoIWN0eC5kaXNhYmxlZCAmJiBldnQua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgICAgICBzaG93UmlwcGxlKGV2dCwgZWwsIGN0eCwgdHJ1ZSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZUN0eChjdHgsIGJpbmRpbmcpXG4gICAgaWYgKGVsLnJpcHBsZUN0eCkge1xuICAgICAgZWwucmlwcGxlQ3R4T2xkID0gZWwucmlwcGxlQ3R4XG4gICAgfVxuICAgIGVsLnJpcHBsZUN0eCA9IGN0eFxuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY3R4LmNsaWNrLCBmYWxzZSlcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGN0eC5rZXl1cCwgZmFsc2UpXG4gIH0sXG4gIHVwZGF0ZShlbCwgYmluZGluZykge1xuICAgIGVsLnJpcHBsZUN0eCAhPT0gdm9pZCAwICYmIHVwZGF0ZUN0eChlbC5yaXBwbGVDdHgsIGJpbmRpbmcpXG4gIH0sXG4gIHVuYmluZChlbCkge1xuICAgIGNvbnN0IGN0eCA9IGVsLnJpcHBsZUN0eE9sZCB8fCBlbC5yaXBwbGVDdHhcblxuICAgIGlmIChjdHggIT09IHZvaWQgMCkge1xuICAgICAgY3R4LmFib3J0ICE9PSB2b2lkIDAgJiYgY3R4LmFib3J0KClcbiAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY3R4LmNsaWNrLCBmYWxzZSlcbiAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgY3R4LmtleXVwLCBmYWxzZSlcbiAgICAgIGRlbGV0ZSBlbFtlbC5yaXBwbGVDdHhPbGQgPyAncmlwcGxlQ3R4T2xkJyA6ICdyaXBwbGVDdHgnXVxuICAgIH1cbiAgfVxufSIsImltcG9ydCBSaXBwbGUgZnJvbSAnLi9zcmMvbWFpbi5qcydcblxuY29uc3QgaW5zdGFsbCA9IGZ1bmN0aW9uIChWdWUpIHtcbiAgVnVlLmRpcmVjdGl2ZShSaXBwbGUubmFtZSwgUmlwcGxlKVxufVxuXG5SaXBwbGUuaW5zdGFsbCA9IGluc3RhbGxcblxuZXhwb3J0IGRlZmF1bHQgUmlwcGxlIiwiaW1wb3J0ICcuL2Nzcy9pbmRleC5zdHlsJ1xuXG5pbXBvcnQgSWNvbiBmcm9tICcuL2NvbXBvbmVudHMvaWNvbi9pbmRleC5qcydcbmltcG9ydCBJdGVtIGZyb20gJy4vY29tcG9uZW50cy9pdGVtL2luZGV4LmpzJ1xuaW1wb3J0IEZpZWxkIGZyb20gJy4vY29tcG9uZW50cy9maWVsZC9pbmRleC5qcydcbmltcG9ydCBJbnB1dCBmcm9tICcuL2NvbXBvbmVudHMvaW5wdXQvaW5kZXguanMnXG5pbXBvcnQgU2VsZWN0IGZyb20gJy4vY29tcG9uZW50cy9zZWxlY3QvaW5kZXguanMnXG5pbXBvcnQgU2Nyb2xsQXJlYSBmcm9tICcuL2NvbXBvbmVudHMvc2Nyb2xsQXJlYS9pbmRleC5qcydcbmltcG9ydCBNb2RhbCBmcm9tICcuL2NvbXBvbmVudHMvbW9kYWwvaW5kZXguanMnXG5pbXBvcnQgUG9wb3ZlciBmcm9tICcuL2NvbXBvbmVudHMvcG9wb3Zlci9pbmRleC5qcydcbmltcG9ydCBCdXR0b24gZnJvbSAnLi9jb21wb25lbnRzL2J1dHRvbi9pbmRleC5qcydcbmltcG9ydCBDaGVja2JveCBmcm9tICcuL2NvbXBvbmVudHMvY2hlY2tib3gvaW5kZXguanMnXG5pbXBvcnQgQ2hlY2tib3hHcm91cCBmcm9tICcuL2NvbXBvbmVudHMvY2hlY2tib3hHcm91cC9pbmRleC5qcydcbmltcG9ydCBSYWRpbyBmcm9tICcuL2NvbXBvbmVudHMvcmFkaW8vaW5kZXguanMnXG5pbXBvcnQgUmFkaW9Hcm91cCBmcm9tICcuL2NvbXBvbmVudHMvcmFkaW9Hcm91cC9pbmRleC5qcydcbmltcG9ydCBQYWdpbmF0aW9uIGZyb20gJy4vY29tcG9uZW50cy9wYWdpbmF0aW9uL2luZGV4LmpzJ1xuaW1wb3J0IEJhc2ljSXRlbSBmcm9tICcuL2NvbXBvbmVudHMvYmFzaWNJdGVtL2luZGV4LmpzJ1xuaW1wb3J0IE5vdGlmaWNhdGlvbiBmcm9tICcuL2NvbXBvbmVudHMvbm90aWZpY2F0aW9uL2luZGV4LmpzJ1xuaW1wb3J0IExheW91dCBmcm9tICcuL2NvbXBvbmVudHMvbGF5b3V0L2luZGV4LmpzJ1xuaW1wb3J0IFNsaWRlIGZyb20gJy4vY29tcG9uZW50cy9zbGlkZS9pbmRleC5qcydcbmltcG9ydCBNYXNrIGZyb20gJy4vZGlyZWN0aXZlcy9tYXNrL2luZGV4LmpzJ1xuaW1wb3J0IFJpcHBsZSBmcm9tICcuL2RpcmVjdGl2ZXMvcmlwcGxlL2luZGV4LmpzJ1xuXG5jb25zdCBjb21wb25lbnRzID0gW1xuICBJY29uLFxuICBJdGVtLFxuICBGaWVsZCxcbiAgSW5wdXQsXG4gIFNlbGVjdCxcbiAgU2Nyb2xsQXJlYSxcbiAgTW9kYWwsXG4gIFBvcG92ZXIsXG4gIEJ1dHRvbixcbiAgUGFnaW5hdGlvbixcbiAgQ2hlY2tib3gsXG4gIENoZWNrYm94R3JvdXAsXG4gIFJhZGlvLFxuICBSYWRpb0dyb3VwLFxuICBCYXNpY0l0ZW0sXG4gIExheW91dCxcbiAgU2xpZGVcbl1cblxuY29uc3QgZGlyZWN0aXZlcyA9IFtcbiAgUmlwcGxlLFxuICBNYXNrXG5dXG5cbmNvbnN0IGluc3RhbGwgPSBmdW5jdGlvbiAoVnVlKSB7XG4gIGNvbXBvbmVudHMuZm9yRWFjaChjb21wb25lbnQgPT4ge1xuICAgIFZ1ZS5jb21wb25lbnQoY29tcG9uZW50Lm5hbWUsIGNvbXBvbmVudClcbiAgfSlcbiAgZGlyZWN0aXZlcy5mb3JFYWNoKGRpcmVjdGl2ZSA9PiB7XG4gICAgVnVlLmRpcmVjdGl2ZShkaXJlY3RpdmUubmFtZSwgZGlyZWN0aXZlKVxuICB9KVxuICBWdWUucHJvdG90eXBlLiRub3RpZnkgPSBOb3RpZmljYXRpb25cbn1cblxuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5WdWUpIHtcbiAgaW5zdGFsbCh3aW5kb3cuVnVlKVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGluc3RhbGwsXG4gIEljb24sXG4gIEl0ZW0sXG4gIEZpZWxkLFxuICBJbnB1dCxcbiAgU2VsZWN0LFxuICBTY3JvbGxBcmVhLFxuICBQb3BvdmVyLFxuICBNb2RhbCxcbiAgQnV0dG9uLFxuICBQYWdpbmF0aW9uLFxuICBDaGVja2JveCxcbiAgQ2hlY2tib3hHcm91cCxcbiAgUmFkaW8sXG4gIFJhZGlvR3JvdXAsXG4gIEJhc2ljSXRlbSxcbiAgTm90aWZpY2F0aW9uLFxuICBMYXlvdXQsXG4gIFNsaWRlLFxuICBSaXBwbGUsXG4gIE1hc2tcbn1cbiJdLCJuYW1lcyI6WyJuYW1lIiwicHJvcHMiLCJTdHJpbmciLCJjb2xvciIsInByaW1hcnkiLCJCb29sZWFuIiwibmVnYXRpdmUiLCJwb3NpdGl2ZSIsIndhcm5pbmciLCJncmV5IiwibGlnaHRHcmV5Iiwic2l6ZSIsImNvbXB1dGVkIiwiY2xhc3NlcyIsImNscyIsImljb24iLCJjb250ZW50Iiwic3R5bGUiLCJmb250U2l6ZSIsInJlbmRlciIsImgiLCJzdGF0aWNDbGFzcyIsImNsYXNzIiwiYXR0cnMiLCJvbiIsIiRsaXN0ZW5lcnMiLCJpbnN0YWxsIiwiVnVlIiwiY29tcG9uZW50IiwiSWNvbiIsIndyYXAiLCJoaWRlQmVmb3JlIiwiaGlkZURlZmF1bHQiLCJoaWRlQWZ0ZXIiLCJ0byIsIk9iamVjdCIsImNlbnRlciIsImVuZCIsImRpc2FibGVkIiwiYWN0aXZlIiwibWFzayIsInJpcHBsZSIsImRhdGEiLCJkaXNhYmxlIiwiY2xpY2siLCIkZW1pdCIsImRpcmVjdGl2ZXMiLCJ2YWx1ZSIsInN0YXkiLCJjb25jYXQiLCIkc2NvcGVkU2xvdHMiLCJiZWZvcmUiLCJoaWRlIiwiZGVmYXVsdCIsImFmdGVyIiwiSXRlbSIsImVycm9yTWVzc2FnZSIsInJ1bGVzIiwiQXJyYXkiLCJpc0RpcnR5IiwiaW5uZXJFcnJvciIsImlubmVyRXJyb3JNZXNzYWdlIiwid2F0Y2giLCJmb3JjZUNoZWNrIiwidiIsInZhbGlkYXRlIiwidmFsaWRhdGVWYWx1ZSIsImhhc0Vycm9yIiwiY29tcHV0ZWRFcnJvck1lc3NhZ2UiLCJtb3VudGVkIiwiJG9uIiwidHJpZ2dlclZhbGlkYXRpb24iLCJiZWZvcmVEZXN0cm95IiwiJG9mZiIsIm1ldGhvZHMiLCJyZXNldFZhbGlkYXRpb24iLCJ2YWwiLCJsZW5ndGgiLCJ1cGRhdGUiLCJlcnIiLCJtc2ciLCJtIiwic29tZSIsInJ1bGUiLCJyZXMiLCJmb3JjZSIsImFkdmFuY2VkQmx1ciIsImUiLCJleGNsdWRlZCIsImdldFJlZnMiLCJyZWZOYW1lcyIsImdldERvbXMiLCJlbHMiLCJpc0FycmF5IiwicmVkdWNlIiwiYWNjdW11bGF0b3IiLCJlbCIsInB1c2giLCIkZWwiLCJyZWYiLCIkcmVmcyIsImV4Y2x1ZGVkQmx1clJlZnMiLCJyZWZzIiwiY29udGFpbnMiLCJ0YXJnZXQiLCJmb2N1c2VkIiwiZm9jdXNlZEJlZm9yZSIsImJsdXJUeXBlIiwiYmx1clJlZnMiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwibWl4aW5zIiwiVmFsaWRhdGVNaXhpbiIsIkFkdmFuY2VkQmx1ck1peGluIiwiY29tcG9uZW50cyIsInJlcXVpcmVkIiwidW5kZXJsaW5lZCIsImJvcmRlcmVkIiwiZmlsbGVkIiwibWluaSIsImxhYmVsIiwic3BhY2VBcm91bmQiLCJ0eXBlIiwiZm9jdXMiLCJibHVyIiwidW5kZXJsaW5lIiwiYm9yZGVyIiwiZmlsbCIsImVycm9yIiwiaW5uZXJQb2ludGVyIiwic2NvcGVkU2xvdHMiLCJnZXRJbm5lciIsImdldEFmdGVyIiwiRmllbGQiLCJwbGFjZWhvbGRlciIsImF1dG9jb21wbGV0ZSIsImlucHV0IiwiZG9tUHJvcHMiLCJJbnB1dCIsIngiLCJ5Iiwid2lkdGgiLCJoZWlnaHQiLCJzdHJldGNoIiwiU2Nyb2xsQXJlYSIsImlzRGVlcEVxdWFsIiwiYSIsImIiLCJEYXRlIiwiZ2V0VGltZSIsImtleXMiLCJldmVyeSIsInByb3AiLCJpc1N0cmluZ0NvbnRhaW4iLCJzIiwicmFuZG9tIiwiaW5uZXJTIiwiaW5uZXJWIiwicmVwbGFjZSIsInNwbGl0Iiwic3VtIiwiZm9yRWFjaCIsImluY2x1ZGVzIiwiaXNPYmplY3QiLCJTY29ybGxBcmVhIiwibXVsdGlwbGUiLCJvcHRpb25zIiwiZmlsdGVyIiwib3B0aW9uc0hlaWdodCIsInNlbGVjdGVkU3R5bGUiLCJmaWx0ZXJWYWx1ZSIsImlubmVyVmFsdWUiLCJnZXQiLCJnZXRFeGFjdFZhbHVlcyIsInNldCIsImlubmVyT3B0aW9ucyIsImMiLCJnZXROYW1lIiwiJG5leHRUaWNrIiwiY2xlYXJGaWx0ZXIiLCJ0cmlnZ2VyQmx1ciIsImdldE9wdGlvbnMiLCJtYXAiLCJvcHRpb24iLCJzZWxlY3RlZCIsImNoZWNrU2VsZWN0ZWQiLCJuYXRpdmVPbiIsImZvcm1hdFZhbHVlIiwiZ2V0U2VsZWN0ZWQiLCJnZXRFeGFjdE9wdGlvbnMiLCJyZWZJbkZvciIsInBhZGRpbmciLCJjdXJzb3IiLCJ0cmFuc2Zvcm0iLCJvcGUiLCJkdXBsaWNhdGVkIiwiZ2V0VmFsdWUiLCJoYXNPd25Qcm9wZXJ0eSIsIlNlbGVjdCIsInJvdW5kIiwic2hhZG93IiwiQnV0dG9uIiwic3dCdXR0b24iLCJzaG93IiwidGl0bGUiLCJ6SW5kZXgiLCJvcGFjaXR5IiwiaGFuZGxlQ2FuY2VsIiwiaGFuZGxlQ29uZmlybSIsInNob3dNb2RhbCIsImhpZGVNb2RhbCIsImV2ZW50Iiwic3RvcFByb3BhZ2F0aW9uIiwiaGVhZGVyIiwiZm9vdGVyIiwiTW9kYWwiLCJpc1NlcnZlciIsInByb3RvdHlwZSIsIiRpc1NlcnZlciIsImNzcyIsImVsZW1lbnQiLCJoYW5kbGVyIiwiYXR0YWNoRXZlbnQiLCJvZmYiLCJkZXRhY2hFdmVudCIsInBvcG92ZXJTdHlsZSIsImFycm93U3R5bGUiLCJyZWZlcmVuY2VFbG0iLCJtb2RlbCIsInBsYWNlbWVudCIsInRyaWdnZXIiLCJ2YWxpZGF0b3IiLCJpbmRleE9mIiwic2hvd1ZhbHVlIiwic2hvd1N0eWxlIiwiZ2V0U3R5bGUiLCJwb3BvdmVyRWxtIiwidG9wIiwib2Zmc2V0SGVpZ2h0IiwibGVmdCIsIm9mZnNldFdpZHRoIiwicmlnaHQiLCJoYW5kbGVDbGljayIsImhhbmRsZU1vdXNlRW50ZXIiLCJoYW5kbGVNb3VzZUxlYXZlIiwiZG9TaG93IiwiZG9DbG9zZSIsImhhbmRsZU1hbnVhbCIsInBvcG92ZXIiLCJyZWZlcmVuY2UiLCJlbG0iLCJxdWVyeVNlbGVjdG9yIiwiZGVzdHJveWVkIiwiYXNzaWduIiwiUG9wb3ZlciIsImxlZnRMYWJlbCIsImNvbG9yTGFiZWwiLCJrZWVwQ29sb3IiLCJwYXJlbnQiLCJwYXJlbnREaXNhYmxlZCIsImNoZWNrZWQiLCJib29sZWFuTW9kZSIsImdldENoZWNrZWQiLCJzZWxmIiwiY29sb3JDaGVja2JveCIsImdldExhYmVsIiwiQ2hlY2tib3giLCJzaHV0dGxlIiwiX3RoaXMiLCIkY2hpbGRyZW4iLCJjaGlsZCIsInNodXR0bGVSZWYiLCJTaHV0dGxlTWl4aW4iLCJDaGVja2JveEdyb3VwIiwiY29sb3JSYWRpbyIsIlJhZGlvIiwiUmFkaW9Hcm91cCIsIm1ha2VSZXN1bHQiLCJ0b3RhbCIsImN1ciIsImFyb3VuZCIsInJlc3VsdCIsImJhc2VDb3VudCIsInN1cnBsdXMiLCJzdGFydFBvc2l0aW9uIiwiZW5kUG9zaXRpb24iLCJmcm9tIiwiaSIsIlBhZ2luYXRpb24iLCJvYnNlcnZlciIsIm1lYXN1cmVkV2lkdGgiLCJob3Jpem9udGFsIiwibWVhc3VyZVRhcmdldCIsIm1pblNpemUiLCJtaW4iLCJpbml0U3R5bGUiLCJpbm5lckNvbGxhcHNlZCIsInNsaWRlIiwic2V0U3R5bGUiLCJwYXNzaXZlIiwic2xpZGVUYXJnZXQiLCJvYnNlcnZlIiwic2V0VGltZW91dCIsImNsZWFyVXBwZXJTdHlsZSIsInVwcGVyIiwidXBwZXJTbGlkZVRhcmdldCIsIiRwYXJlbnQiLCIkd2F0Y2giLCJNdXRhdGlvbk9ic2VydmVyIiwiYXR0cmlidXRlcyIsImF0dHJpYnV0ZUZpbHRlciIsImNoaWxkTGlzdCIsInN1YnRyZWUiLCJjaGFyYWN0ZXJEYXRhIiwiZGlzY29ubmVjdCIsIlNsaWRlT2JzZXJ2ZXIiLCJjb2xsYXBzZWQiLCJmaXQiLCJOdW1iZXIiLCJvdmVyZmxvdyIsImltbWVkaWF0ZSIsIlNsaWRlIiwic3ViQ29udGVudCIsImluZGVudExldmVsIiwic3ViIiwiY2FsbGJhY2siLCJGdW5jdGlvbiIsInN1YkZpbHRlciIsImNvbGxhcHNlZEJlZm9yZSIsIm1vdXNlb3ZlciIsImV2ZW50T3JpZ2luIiwiZXZlbnRIdWIiLCJoYXNCZWZvcmUiLCJoYXNDb250ZW50IiwiaGFzU3ViIiwiaGFzQWN0aW9uIiwiaW5uZXJDZW50ZXIiLCJyb290UGFyYW1zIiwiaW5uZXJFbmQiLCJpbm5lckZpbGxlZCIsImlubmVyU3BsaXQiLCJpbm5lck1pbmkiLCJpbm5lclNoYWRvdyIsImlubmVyTWFzayIsImlubmVyUmlwcGxlIiwiaW5uZXJJbmRlbnRMZXZlbCIsImlubmVyQ2FsbGJhY2siLCJpbm5lclN1YkZpbHRlciIsInJvb3QiLCJpbm5lckV2ZW50SHViIiwibWluSGVpZ2h0IiwiaW5qZWN0IiwicHJvdmlkZSIsInN1YkZpbHRlckNoYW5nZSIsInJlc3RvcmUiLCJyZW1lbWJlciIsImlzU3ViQ29udGFpbiIsImNvbnRhaW4iLCJpbml0RXZlbnRIdWIiLCJlbWl0QWN0aXZlIiwiY3JlYXRlZCIsIm92IiwibXV0YXRlIiwiZXhwYW5kIiwibW91c2VvdXQiLCIkZm9yY2VVcGRhdGUiLCJ1bnNoaWZ0IiwiQmFzaWNJdGVtIiwiaGFzT3duIiwib2JqIiwia2V5IiwiY2FsbCIsImlzVk5vZGUiLCJub2RlIiwidmVydGljYWxPZmZzZXQiLCJvbkNsb3NlIiwicG9zaXRpb24iLCJzbG90IiwiYmFja2dyb3VuZCIsImNsb3NlQ29sb3IiLCJoYW5kbGVCdG4iLCJ2ZXJ0aWNhbFByb3BlcnR5IiwidGVzdCIsInBvc2l0aW9uU3R5bGUiLCJnZXRWbm9kZSIsImNvbnNvbGUiLCJOb3RpZmljYXRpb25Db25zdHJ1Y3RvciIsImV4dGVuZCIsIk5vdGlmaWNhdGlvbiIsImluc3RhbmNlIiwiaW5zdGFuY2VzIiwic2VlZCIsIk5vdGlmaWNhdGlvbkZ1biIsInVzZXJPbkNsb3NlIiwiaWQiLCJjbG9zZSIsIiRtb3VudCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsIml0ZW0iLCJsb2ciLCJpbmRleCIsImxlbiIsInNwbGljZSIsInJlbW92ZWRIZWlnaHQiLCJwYXJzZUludCIsImNvbGxhcHNlVG9wIiwiY29sbGFwc2VMZWZ0IiwiY29sbGFwc2VSaWdodCIsImNvbGxhcHNlQm90dG9tIiwiZml0VG9wIiwiZml0TGVmdCIsImZpdFJpZ2h0IiwiZml0Qm90dG9tIiwidG9wTWluIiwibGVmdE1pbiIsInJpZ2h0TWluIiwiYm90dG9tTWluIiwidmVydGljYWxTdHJldGNoIiwiYm90dG9tIiwiTGF5b3V0Iiwic2hvd01hc2siLCJjdHgiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJoaWRlTWFzayIsImFkZCIsImRpc2FibGVNYXNrIiwic3RheU1hc2siLCJjb2xvck1hc2siLCJnZXREaXNhYmxlZCIsImdldFN0YXkiLCJnZXRDb2xvciIsImluaXRNYXNrIiwiYmluZGluZyIsImNyZWF0ZUVsZW1lbnQiLCJtYXNrQ3R4IiwiYmluZCIsIm9sZFZhbHVlIiwidW5iaW5kIiwiZGlyZWN0aXZlIiwiTWFzayIsInRvdWNoZXMiLCJjaGFuZ2VkVG91Y2hlcyIsImNsaWVudFkiLCJjbGllbnRYIiwic2hvd1JpcHBsZSIsImV2dCIsImZvcmNlQ2VudGVyIiwibW9kaWZpZXJzIiwic3RvcCIsImlubmVyTm9kZSIsInBvcyIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImRpYW1ldGVyIiwiTWF0aCIsInNxcnQiLCJyYWRpdXMiLCJjZW50ZXJYIiwiY2VudGVyWSIsInRpbWVyIiwiYWJvcnQiLCJjbGFzc05hbWUiLCJjbGVhclRpbWVvdXQiLCJ1cGRhdGVDdHgiLCJhcmciLCJpbnNlcnRlZCIsImtleXVwIiwia2V5Q29kZSIsInJpcHBsZUN0eCIsInJpcHBsZUN0eE9sZCIsIlJpcHBsZSIsIiRub3RpZnkiLCJ3aW5kb3ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxhQUFlO0VBQ2JBLEVBQUFBLElBQUksRUFBRSxRQURPO0VBRWJDLEVBQUFBLEtBQUssRUFBRTtFQUNMRCxJQUFBQSxJQUFJLEVBQUVFLE1BREQ7RUFFTEMsSUFBQUEsS0FBSyxFQUFFRCxNQUZGO0VBR0xFLElBQUFBLE9BQU8sRUFBRUMsT0FISjtFQUlMQyxJQUFBQSxRQUFRLEVBQUVELE9BSkw7RUFLTEUsSUFBQUEsUUFBUSxFQUFFRixPQUxMO0VBTUxHLElBQUFBLE9BQU8sRUFBRUgsT0FOSjtFQU9MSSxJQUFBQSxJQUFJLEVBQUVKLE9BUEQ7RUFRTEssSUFBQUEsU0FBUyxFQUFFTCxPQVJOO0VBU0xNLElBQUFBLElBQUksRUFB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
