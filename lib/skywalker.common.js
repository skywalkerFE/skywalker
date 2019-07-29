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

  return index;

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2t5d2Fsa2VyLmNvbW1vbi5qcyIsInNvdXJjZXMiOlsiLi4vcGFja2FnZXMvY29tcG9uZW50cy9pY29uL3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9pY29uL2luZGV4LmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9pdGVtL3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9pdGVtL2luZGV4LmpzIiwiLi4vcGFja2FnZXMvbWl4aW5zL3ZhbGlkYXRlLmpzIiwiLi4vcGFja2FnZXMvbWl4aW5zL2FkdmFuY2VkQmx1ci5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvZmllbGQvc3JjL21haW4uanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL2ZpZWxkL2luZGV4LmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9pbnB1dC9zcmMvbWFpbi5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvaW5wdXQvaW5kZXguanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3Njcm9sbEFyZWEvc3JjL21haW4uanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3Njcm9sbEFyZWEvaW5kZXguanMiLCIuLi9wYWNrYWdlcy91dGlscy9pcy5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvc2VsZWN0L3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9zZWxlY3QvaW5kZXguanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL2J1dHRvbi9zcmMvbWFpbi5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvYnV0dG9uL2luZGV4LmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9tb2RhbC9zcmMvbWFpbi5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvbW9kYWwvaW5kZXguanMiLCIuLi9wYWNrYWdlcy91dGlscy9kb20uanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3BvcG92ZXIvc3JjL21haW4uanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3BvcG92ZXIvaW5kZXguanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL2NoZWNrYm94L3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9jaGVja2JveC9pbmRleC5qcyIsIi4uL3BhY2thZ2VzL21peGlucy9zaHV0dGxlLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9jaGVja2JveEdyb3VwL3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9jaGVja2JveEdyb3VwL2luZGV4LmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9yYWRpby9zcmMvbWFpbi5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvcmFkaW8vaW5kZXguanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3JhZGlvR3JvdXAvc3JjL21haW4uanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3JhZGlvR3JvdXAvaW5kZXguanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3BhZ2luYXRpb24vc3JjL3BhZ2luYXRpb24uanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3BhZ2luYXRpb24vc3JjL21haW4udnVlIiwiLi4vbm9kZV9tb2R1bGVzL3Z1ZS1ydW50aW1lLWhlbHBlcnMvZGlzdC9ub3JtYWxpemUtY29tcG9uZW50LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Z1ZS1ydW50aW1lLWhlbHBlcnMvZGlzdC9pbmplY3Qtc3R5bGUvYnJvd3Nlci5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvcGFnaW5hdGlvbi9pbmRleC5qcyIsIi4uL3BhY2thZ2VzL21peGlucy9zbGlkZU9ic2VydmVyLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9zbGlkZS9zcmMvbWFpbi5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvc2xpZGUvaW5kZXguanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL2Jhc2ljSXRlbS9zcmMvbWFpbi5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvYmFzaWNJdGVtL2luZGV4LmpzIiwiLi4vcGFja2FnZXMvdXRpbHMvdmRvbS5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvbm90aWZpY2F0aW9uL3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9ub3RpZmljYXRpb24vc3JjL25vdGlmaWNhdGlvbi5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvbGF5b3V0L3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9sYXlvdXQvaW5kZXguanMiLCIuLi9wYWNrYWdlcy9kaXJlY3RpdmVzL21hc2svc3JjL21haW4uanMiLCIuLi9wYWNrYWdlcy9kaXJlY3RpdmVzL21hc2svaW5kZXguanMiLCIuLi9wYWNrYWdlcy91dGlscy9ldmVudC5qcyIsIi4uL3BhY2thZ2VzL2RpcmVjdGl2ZXMvcmlwcGxlL3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvZGlyZWN0aXZlcy9yaXBwbGUvaW5kZXguanMiLCIuLi9wYWNrYWdlcy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdzd0ljb24nLFxuICBwcm9wczoge1xuICAgIG5hbWU6IFN0cmluZyxcbiAgICBjb2xvcjogU3RyaW5nLFxuICAgIHByaW1hcnk6IEJvb2xlYW4sXG4gICAgbmVnYXRpdmU6IEJvb2xlYW4sXG4gICAgcG9zaXRpdmU6IEJvb2xlYW4sXG4gICAgd2FybmluZzogQm9vbGVhbixcbiAgICBncmV5OiBCb29sZWFuLFxuICAgIGxpZ2h0R3JleTogQm9vbGVhbixcbiAgICBzaXplOiBTdHJpbmdcbiAgfSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBjbGFzc2VzKCkge1xuICAgICAgbGV0IGNsc1xuICAgICAgY29uc3QgaWNvbiA9IHRoaXMubmFtZVxuICBcbiAgICAgIGlmICghaWNvbikge1xuICAgICAgICByZXR1cm5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNscyA9ICdtYXRlcmlhbC1pY29ucydcbiAgICAgIH1cbiAgICAgIHJldHVybiB7XG4gICAgICAgIFtjbHNdOiB0cnVlLFxuICAgICAgICAnY29sb3ItcHJpbWFyeSc6IHRoaXMucHJpbWFyeSxcbiAgICAgICAgJ2NvbG9yLW5lZ2F0aXZlJzogdGhpcy5uZWdhdGl2ZSxcbiAgICAgICAgJ2NvbG9yLXBvc2l0aXZlJzogdGhpcy5wb3NpdGl2ZSxcbiAgICAgICAgJ2NvbG9yLXdhcm5pbmcnOiB0aGlzLndhcm5pbmcsXG4gICAgICAgICdjb2xvci1ncmV5JzogdGhpcy5ncmV5LFxuICAgICAgICAnY29sb3ItbGlnaHQtZ3JleSc6IHRoaXMubGlnaHRHcmV5LFxuICAgICAgfVxuICAgIH0sXG4gICAgY29udGVudCgpIHtcbiAgICAgIHJldHVybiB0aGlzLm5hbWUgfHwgJyAnXG4gICAgfSxcbiAgICBzdHlsZSgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGZvbnRTaXplOiB0aGlzLnNpemUgfHwgdm9pZCAwLFxuICAgICAgICBjb2xvcjogdGhpcy5jb2xvciB8fCB2b2lkIDBcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIHJlbmRlcihoKSB7XG4gICAgcmV0dXJuIGgoJ2knLCB7XG4gICAgICBzdGF0aWNDbGFzczogJ3N3LWljb24nLFxuICAgICAgY2xhc3M6IHRoaXMuY2xhc3NlcyxcbiAgICAgIHN0eWxlOiB0aGlzLnN0eWxlLFxuICAgICAgYXR0cnM6IHsgJ2FyaWEtaGlkZGVuJzogdHJ1ZSB9LFxuICAgICAgb246IHRoaXMuJGxpc3RlbmVyc1xuICAgIH0sIFtcbiAgICAgIHRoaXMuY29udGVudFxuICAgIF0pXG4gIH1cbn1cbiAgIiwiaW1wb3J0IEljb24gZnJvbSAnLi9zcmMvbWFpbi5qcydcblxuY29uc3QgaW5zdGFsbCA9IGZ1bmN0aW9uIChWdWUpIHtcbiAgVnVlLmNvbXBvbmVudChJY29uLm5hbWUsIEljb24pXG59XG5cbkljb24uaW5zdGFsbCA9IGluc3RhbGxcblxuZXhwb3J0IGRlZmF1bHQgSWNvblxuIiwiZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnc3dJdGVtJyxcbiAgcHJvcHM6IHtcbiAgICB3cmFwOiBCb29sZWFuLFxuICAgIGhpZGVCZWZvcmU6IEJvb2xlYW4sXG4gICAgaGlkZURlZmF1bHQ6IEJvb2xlYW4sXG4gICAgaGlkZUFmdGVyOiBCb29sZWFuLFxuICAgIHRvOiBTdHJpbmcgfCBPYmplY3QsXG4gICAgY2VudGVyOiBCb29sZWFuLFxuICAgIGVuZDogQm9vbGVhbixcbiAgICBkaXNhYmxlZDogQm9vbGVhbixcbiAgICBhY3RpdmU6IEJvb2xlYW4sXG4gICAgbWFzazogT2JqZWN0IHwgQm9vbGVhbixcbiAgICByaXBwbGU6IE9iamVjdCB8IEJvb2xlYW5cbiAgfSxcbiAgZGF0YTogKCkgPT4gKHt9KSxcbiAgcmVuZGVyKGgpIHtcbiAgICByZXR1cm4gaChgJHt0aGlzLnRvICE9PSB2b2lkIDAgPyAncm91dGVyLWxpbmsnIDogJ2Rpdid9YCwge1xuICAgICAgc3RhdGljQ2xhc3M6ICdzdy1pdGVtIGZsZXggaXRlbXMtY2VudGVyJyxcbiAgICAgIGNsYXNzOiB7XG4gICAgICAgICduby13cmFwJzogIXRoaXMud3JhcCxcbiAgICAgICAgYWN0aXZlOiB0aGlzLmFjdGl2ZSxcbiAgICAgICAgZGlzYWJsZTogdGhpcy5kaXNhYmxlZFxuICAgICAgfSxcbiAgICAgIG9uOiB0aGlzLmRpc2FibGVkID8gdm9pZCAwIDoge1xuICAgICAgICAuLi50aGlzLiRsaXN0ZW5lcnMsXG4gICAgICAgIGNsaWNrOiAoKSA9PiB7XG4gICAgICAgICAgdGhpcy4kZW1pdCgnY2xpY2snKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcHJvcHM6IHtcbiAgICAgICAgdG86IHRoaXMudG9cbiAgICAgIH0sXG4gICAgICBkaXJlY3RpdmVzOiAodGhpcy50byAhPT0gdm9pZCAwIHx8IHRoaXMuYWN0aXZlICE9PSB2b2lkIDAgfHwgdGhpcy5tYXNrID8gW1xuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ21hc2snLFxuICAgICAgICAgIHZhbHVlOiB0aGlzLm1hc2sgPyB7XG4gICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5tYXNrLmRpc2FibGVkLFxuICAgICAgICAgICAgY29sb3I6IHRoaXMubWFzay5jb2xvcixcbiAgICAgICAgICAgIHN0YXk6IHRoaXMubWFzay5zdGF5XG4gICAgICAgICAgfSA6IHsgZGlzYWJsZWQ6IHRydWUgfVxuICAgICAgICB9LFxuICAgICAgXSA6IFtdKS5jb25jYXQodGhpcy5yaXBwbGUgPyBbXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiAncmlwcGxlJyxcbiAgICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMucmlwcGxlLmRpc2FibGVkLFxuICAgICAgICAgICAgY29sb3I6IHRoaXMucmlwcGxlLmNvbG9yLFxuICAgICAgICAgICAgY2VudGVyOiB0aGlzLnJpcHBsZS5jZW50ZXJcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF0gOiBbXSlcbiAgICB9LCBbXG4gICAgICBoKCdkaXYnLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctaXRlbV9fY29udGVudCBmbGV4IGl0ZW1zLWNlbnRlcicsXG4gICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgJ25vLXdyYXAnOiAhdGhpcy53cmFwXG4gICAgICAgIH1cbiAgICAgIH0sIFtcblxuICAgICAgICB0aGlzLiRzY29wZWRTbG90cy5iZWZvcmUgIT09IHZvaWQgMCA/IGgoJ2RpdicsIHtcbiAgICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWl0ZW1fX2JlZm9yZSBmbGV4IGl0ZW1zLWNlbnRlcicsXG4gICAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAgIGhpZGU6IHRoaXMuaGlkZUJlZm9yZSxcbiAgICAgICAgICAgICdmbGV4LWF1dG8nOiB0aGlzLmhpZGVEZWZhdWx0LFxuICAgICAgICAgICAgJ25vLXdyYXAnOiAhdGhpcy53cmFwXG4gICAgICAgICAgfVxuICAgICAgICB9LCBbdGhpcy4kc2NvcGVkU2xvdHMuYmVmb3JlKCldKSA6IHZvaWQgMCxcbiAgXG4gICAgICAgIHRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQgIT09IHZvaWQgMCA/IGgoJ2RpdicsIHtcbiAgICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWl0ZW1fX2lubmVyIGZsZXggaXRlbXMtY2VudGVyIGl0ZW1zLWVuZCcsXG4gICAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAgIGhpZGU6IHRoaXMuaGlkZURlZmF1bHQsXG4gICAgICAgICAgICAnbm8td3JhcCc6ICF0aGlzLndyYXAsXG4gICAgICAgICAgICAnanVzdGlmeS1jZW50ZXInOiB0aGlzLmNlbnRlcixcbiAgICAgICAgICAgICdqdXN0aWZ5LWVuZCc6IHRoaXMuZW5kXG5cbiAgICAgICAgICB9XG4gICAgICAgIH0sIFt0aGlzLiRzY29wZWRTbG90cy5kZWZhdWx0KCldKSA6IHZvaWQgMCxcbiAgXG4gICAgICAgIHRoaXMuJHNjb3BlZFNsb3RzLmFmdGVyICE9PSB2b2lkIDAgPyBoKCdkaXYnLCB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1pdGVtX19hZnRlciBmbGV4IGl0ZW1zLWNlbnRlcicsXG4gICAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAgIGhpZGU6IHRoaXMuaGlkZUFmdGVyLFxuICAgICAgICAgICAgJ25vLXdyYXAnOiAhdGhpcy53cmFwXG4gICAgICAgICAgfVxuICAgICAgICB9LCBbdGhpcy4kc2NvcGVkU2xvdHMuYWZ0ZXIoKV0pIDogdm9pZCAwXG4gICAgICBdKVxuICAgIF0pXG4gIH1cbn1cbiAgIiwiaW1wb3J0IEl0ZW0gZnJvbSAnLi9zcmMvbWFpbi5qcydcblxuY29uc3QgaW5zdGFsbCA9IGZ1bmN0aW9uIChWdWUpIHtcbiAgVnVlLmNvbXBvbmVudChJdGVtLm5hbWUsIEl0ZW0pXG59XG5cbkl0ZW0uaW5zdGFsbCA9IGluc3RhbGxcblxuZXhwb3J0IGRlZmF1bHQgSXRlbVxuIiwiXG5leHBvcnQgZGVmYXVsdCB7XG4gIHByb3BzOiB7XG4gICAgZXJyb3JNZXNzYWdlOiBTdHJpbmcsXG4gICAgcnVsZXM6IEFycmF5XG4gIH0sXG5cbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaXNEaXJ0eTogZmFsc2UsXG4gICAgICBpbm5lckVycm9yOiBmYWxzZSxcbiAgICAgIGlubmVyRXJyb3JNZXNzYWdlOiB2b2lkIDBcbiAgICB9XG4gIH0sXG5cbiAgd2F0Y2g6IHtcbiAgICBmb3JjZUNoZWNrKHYpIHtcbiAgICAgIGlmICh0aGlzLnJ1bGVzID09PSB2b2lkIDApIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICB0aGlzLmlzRGlydHkgPSB0cnVlXG4gICAgICB0aGlzLnZhbGlkYXRlKHYpXG4gICAgfSxcbiAgICB2YWx1ZSh2KSB7XG4gICAgICBpZiAodGhpcy5mb3JjZUNoZWNrICE9PSB2b2lkIDAgfHwgdGhpcy5ydWxlcyA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgdGhpcy5pc0RpcnR5ID0gdHJ1ZVxuICAgICAgdGhpcy52YWxpZGF0ZSh2KVxuICAgIH1cbiAgfSxcblxuICBjb21wdXRlZDoge1xuICAgIHZhbGlkYXRlVmFsdWUoKSB7XG4gICAgICByZXR1cm4gdGhpcy5mb3JjZUNoZWNrID09PSB2b2lkIDAgPyB0aGlzLnZhbHVlIDogdGhpcy5mb3JjZUNoZWNrXG4gICAgfSxcbiAgICBoYXNFcnJvcigpIHtcbiAgICAgIHJldHVybiB0aGlzLmlubmVyRXJyb3IgPT09IHRydWVcbiAgICB9LFxuXG4gICAgY29tcHV0ZWRFcnJvck1lc3NhZ2UoKSB7XG4gICAgICByZXR1cm4gdGhpcy5lcnJvck1lc3NhZ2UgIT09IHZvaWQgMFxuICAgICAgICA/IHRoaXMuZXJyb3JNZXNzYWdlXG4gICAgICAgIDogdGhpcy5pbm5lckVycm9yTWVzc2FnZVxuICAgIH1cbiAgfSxcblxuICBtb3VudGVkKCkge1xuICAgIHRoaXMuJG9uKGBibHVyYCwgdGhpcy50cmlnZ2VyVmFsaWRhdGlvbilcbiAgfSxcblxuICBiZWZvcmVEZXN0cm95KCkge1xuICAgIHRoaXMuJG9mZihgYmx1cmAsIHRoaXMudHJpZ2dlclZhbGlkYXRpb24pXG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIHJlc2V0VmFsaWRhdGlvbigpIHtcbiAgICAgIHRoaXMuaXNEaXJ0eSA9IGZhbHNlXG4gICAgICB0aGlzLmlubmVyRXJyb3IgPSBmYWxzZVxuICAgICAgdGhpcy5pbm5lckVycm9yTWVzc2FnZSA9IHZvaWQgMFxuICAgIH0sXG5cbiAgICB2YWxpZGF0ZSh2YWwgPSB0aGlzLnZhbGlkYXRlVmFsdWUpIHtcbiAgICAgIGlmICghdGhpcy5ydWxlcyB8fCB0aGlzLnJ1bGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgY29uc3QgdXBkYXRlID0gKGVyciwgbXNnKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmlubmVyRXJyb3IgIT09IGVycikge1xuICAgICAgICAgIHRoaXMuaW5uZXJFcnJvciA9IGVyclxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbSA9IG1zZyB8fCB2b2lkIDBcblxuICAgICAgICBpZiAodGhpcy5pbm5lckVycm9yTWVzc2FnZSAhPT0gbSkge1xuICAgICAgICAgIHRoaXMuaW5uZXJFcnJvck1lc3NhZ2UgPSBtXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVyclxuICAgICAgfVxuXG4gICAgICByZXR1cm4gIXRoaXMucnVsZXMuc29tZShydWxlID0+IHtcbiAgICAgICAgbGV0IHJlc1xuXG4gICAgICAgIGlmICh0eXBlb2YgcnVsZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHJlcyA9IHJ1bGUodmFsKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIGlmIChyZXMgPT09IGZhbHNlIHx8IHR5cGVvZiByZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgcmV0dXJuIHVwZGF0ZSh0cnVlLCByZXMpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHVwZGF0ZShmYWxzZSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuXG4gICAgdHJpZ2dlclZhbGlkYXRpb24oZm9yY2UgPSB0cnVlKSB7XG4gICAgICBpZiAoZm9yY2UgPT09IHRydWUgfHwgdGhpcy5pc0RpcnR5ID09PSBmYWxzZSkge1xuICAgICAgICB0aGlzLmlzRGlydHkgPSB0cnVlXG4gICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlKHRoaXMudmFsaWRhdGVWYWx1ZSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsIlxuZXhwb3J0IGRlZmF1bHQge1xuICBwcm9wczoge30sXG4gIGRhdGE6ICgpID0+ICh7fSksXG4gIHdhdGNoOiB7fSxcbiAgY29tcHV0ZWQ6IHt9LFxuICBtZXRob2RzOiB7XG4gICAgYWR2YW5jZWRCbHVyKGUpIHtcbiAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7IHJldHVybiB9XG4gICAgICBsZXQgZXhjbHVkZWQgPSBmYWxzZVxuICAgICAgbGV0IGdldFJlZnMgPSByZWZOYW1lcyA9PiB7XG4gICAgICAgIGxldCBnZXREb21zID0gZWxzID0+IHtcbiAgICAgICAgICBlbHMgPSBBcnJheS5pc0FycmF5KGVscykgPyBlbHMgOiBbZWxzXVxuICAgICAgICAgIHJldHVybiBlbHMucmVkdWNlKChhY2N1bXVsYXRvciwgZWwpID0+IHtcbiAgICAgICAgICAgIGFjY3VtdWxhdG9yLnB1c2goZWwgJiYgKGVsLiRlbCB8fCBlbCkpXG4gICAgICAgICAgICByZXR1cm4gYWNjdW11bGF0b3JcbiAgICAgICAgICB9LCBbXSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZWZOYW1lcy5yZWR1Y2UoKGFjY3VtdWxhdG9yLCByZWYpID0+IGFjY3VtdWxhdG9yLmNvbmNhdChnZXREb21zKHRoaXMuJHJlZnNbcmVmXSkpLCBbXSlcbiAgICAgIH1cbiAgICAgIFxuICAgICAgaWYgKHRoaXMuZXhjbHVkZWRCbHVyUmVmcykge1xuICAgICAgICBsZXQgcmVmcyA9IGdldFJlZnModGhpcy5leGNsdWRlZEJsdXJSZWZzKVxuXG4gICAgICAgIHJlZnMuc29tZShyZWYgPT4ge1xuICAgICAgICAgIGlmIChyZWYgPT09IHZvaWQgMCkgeyByZXR1cm4gZmFsc2UgfVxuICAgICAgICAgIGV4Y2x1ZGVkID0gcmVmLmNvbnRhaW5zKGUudGFyZ2V0KSB8fCBmYWxzZVxuICAgICAgICAgIHJldHVybiBleGNsdWRlZFxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgaWYgKGV4Y2x1ZGVkKSB7XG4gICAgICAgIHRoaXMuZm9jdXNlZCA9IHRydWVcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBsZXQgZm9jdXNlZEJlZm9yZSA9IHRoaXMuZm9jdXNlZFxuXG4gICAgICBpZiAodGhpcy5ibHVyVHlwZSA9PT0gJ3JldmVyc2UnICYmIGZvY3VzZWRCZWZvcmUpIHtcbiAgICAgICAgdGhpcy5mb2N1c2VkID0gIWZvY3VzZWRCZWZvcmVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCByZWZzID0gZ2V0UmVmcyh0aGlzLmJsdXJSZWZzKVxuXG4gICAgICAgIHJlZnMuc29tZShyZWYgPT4ge1xuICAgICAgICAgIGlmIChyZWYgPT09IHZvaWQgMCkgeyByZXR1cm4gZmFsc2UgfVxuICAgICAgICAgIHRoaXMuZm9jdXNlZCA9IHJlZi5jb250YWlucyhlLnRhcmdldCkgfHwgZmFsc2VcbiAgICAgICAgICByZXR1cm4gdGhpcy5mb2N1c2VkXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMuZm9jdXNlZCAmJiBmb2N1c2VkQmVmb3JlKSB7IHRoaXMuJGVtaXQoYGJsdXJgLCBlKSB9XG4gICAgfVxuICB9LFxuICBtb3VudGVkKCkge1xuICAgIGlmICh0aGlzLmJsdXJSZWZzKSB7IGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmFkdmFuY2VkQmx1ciwgZmFsc2UpIH1cbiAgfSxcbiAgYmVmb3JlRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5ibHVyUmVmcykgeyBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5hZHZhbmNlZEJsdXIsIGZhbHNlKSB9XG4gIH0sXG59XG4gICIsImltcG9ydCBWYWxpZGF0ZU1peGluIGZyb20gJy4uLy4uLy4uL21peGlucy92YWxpZGF0ZSdcbmltcG9ydCBBZHZhbmNlZEJsdXJNaXhpbiBmcm9tICcuLi8uLi8uLi9taXhpbnMvYWR2YW5jZWRCbHVyJ1xuaW1wb3J0IEl0ZW0gZnJvbSAnLi4vLi4vaXRlbSdcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnc3dGaWVsZCcsXG4gIG1peGluczogW1ZhbGlkYXRlTWl4aW4sIEFkdmFuY2VkQmx1ck1peGluXSwgLy8gaGFzRXJyb3IsY29tcHV0ZWRFcnJvck1lc3NhZ2VcbiAgY29tcG9uZW50czogeyBJdGVtIH0sXG4gIHByb3BzOiB7XG4gICAgcmVxdWlyZWQ6IEJvb2xlYW4sXG4gICAgdW5kZXJsaW5lZDogQm9vbGVhbixcbiAgICBib3JkZXJlZDogQm9vbGVhbixcbiAgICBmaWxsZWQ6IEJvb2xlYW4sXG4gICAgZGlzYWJsZWQ6IEJvb2xlYW4sXG4gICAgbWluaTogQm9vbGVhbixcbiAgICBsYWJlbDogU3RyaW5nLFxuICAgIGZvcmNlQ2hlY2s6IFN0cmluZyB8IE9iamVjdCxcbiAgICBzcGFjZUFyb3VuZDoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IHRydWVcbiAgICB9XG4gIH0sXG4gIGRhdGE6ICgpID0+ICh7XG4gICAgZm9jdXNlZDogZmFsc2VcbiAgfSksXG4gIGNvbXB1dGVkOiB7XG4gICAgYmx1clJlZnMoKSB7XG4gICAgICByZXR1cm4gWydmaWVsZENvbnRlbnQnXVxuICAgIH1cbiAgfSxcbiAgd2F0Y2g6IHtcbiAgICBmb2N1c2VkKCkge1xuICAgICAgaWYgKHRoaXMuZm9jdXNlZCAmJiB0aGlzLmZvY3VzKSB7IHRoaXMuZm9jdXMoKSB9XG4gICAgICBpZiAoIXRoaXMuZm9jdXNlZCAmJiB0aGlzLmJsdXIpIHsgdGhpcy5ibHVyKCkgfVxuICAgIH1cbiAgfSxcbiAgcmVuZGVyKGgpIHtcbiAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgc3RhdGljQ2xhc3M6ICdzdy1maWVsZCBmbGV4IG5vLXdyYXAgaXRlbXMtY2VudGVyJyxcbiAgICAgIGNsYXNzOiB7XG4gICAgICAgIGRpc2FibGU6IHRoaXMuZGlzYWJsZWQsXG4gICAgICAgICdzcGFjZS1hcm91bmQnOiB0aGlzLnNwYWNlQXJvdW5kXG4gICAgICB9XG4gICAgfSwgW1xuICAgICAgdGhpcy5sYWJlbCAhPT0gdm9pZCAwID8gaCgnZGl2Jywge1xuICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWZpZWxkX19sYWJlbCBmbGV4IG5vLXdyYXAgaXRlbXMtY2VudGVyJ1xuICAgICAgfSwgW2goJ2RpdicsIHtcbiAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1sYWJlbCBmbGV4IG5vLXdyYXAgaXRlbXMtY2VudGVyJyxcbiAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICByZXF1aXJlZDogdGhpcy5yZXF1aXJlZFxuICAgICAgICB9XG4gICAgICB9LCB0aGlzLmxhYmVsKVxuICAgICAgXSkgOiB2b2lkIDAsXG5cbiAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgcmVmOiAnZmllbGRDb250ZW50JyxcbiAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1maWVsZF9fY29udGVudCBmbGV4IG5vLXdyYXAgaXRlbXMtY2VudGVyIHN3LWZvcm0nLFxuICAgICAgICBjbGFzczoge1xuICAgICAgICAgIHVuZGVybGluZTogdGhpcy51bmRlcmxpbmVkLFxuICAgICAgICAgIGJvcmRlcjogdGhpcy5ib3JkZXJlZCxcbiAgICAgICAgICBmaWxsOiB0aGlzLmZpbGxlZCxcbiAgICAgICAgICBmb2N1czogIXRoaXMuaGFzRXJyb3IgJiYgdGhpcy5mb2N1c2VkLFxuICAgICAgICAgIGVycm9yOiB0aGlzLmhhc0Vycm9yLFxuICAgICAgICAgICdwYWRkaW5nLW1pbic6ICF0aGlzLm1pbmksXG4gICAgICAgICAgJ2lubmVyLXBvaW50ZXInOiB0aGlzLmlubmVyUG9pbnRlclxuICAgICAgICB9XG4gICAgICB9LCBbXG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPyBoKCdkaXYnLCB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1maWVsZF9fZGlzYWJsZWQnXG4gICAgICAgIH0pIDogdm9pZCAwLFxuXG4gICAgICAgIGgoJ3N3LWl0ZW0nLCB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6ICdmbGV4LWF1dG8nLFxuICAgICAgICAgIHNjb3BlZFNsb3RzOiB7XG4gICAgICAgICAgICBiZWZvcmU6IHRoaXMuJHNjb3BlZFNsb3RzLmJlZm9yZSAhPT0gdm9pZCAwXG4gICAgICAgICAgICAgID8gKCkgPT4gW2goJ2RpdicsIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogJ2ZsZXggbm8td3JhcCBpdGVtcy1jZW50ZXIgbWFyZ2luLW1pbidcbiAgICAgICAgICAgICAgfSwgW3RoaXMuJHNjb3BlZFNsb3RzLmJlZm9yZSgpXSldIDogdm9pZCAwLFxuXG4gICAgICAgICAgICBkZWZhdWx0OiB0aGlzLiRzY29wZWRTbG90cy5kZWZhdWx0ICE9PSB2b2lkIDAgfHwgdGhpcy5nZXRJbm5lciAhPT0gdm9pZCAwXG4gICAgICAgICAgICAgID8gKCkgPT4gW3RoaXMuZ2V0SW5uZXIgIT09IHZvaWQgMCA/IHRoaXMuZ2V0SW5uZXIoaCkgOiB2b2lkIDAsIHRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQgIT09IHZvaWQgMCAmJiB0aGlzLmdldElubmVyID09PSB2b2lkIDAgPyB0aGlzLiRzY29wZWRTbG90cy5kZWZhdWx0KCkgOiB2b2lkIDBdIDogdm9pZCAwLFxuXG4gICAgICAgICAgICBhZnRlcjogdGhpcy4kc2NvcGVkU2xvdHMuYWZ0ZXIgIT09IHZvaWQgMCB8fCB0aGlzLmdldEFmdGVyICE9PSB2b2lkIDBcbiAgICAgICAgICAgICAgPyAoKSA9PiBbaCgnZGl2Jywge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiAnZmxleCBuby13cmFwIGl0ZW1zLWNlbnRlciBtYXJnaW4tbWluJ1xuICAgICAgICAgICAgICB9LCBbdGhpcy5nZXRBZnRlciAhPT0gdm9pZCAwID8gdGhpcy5nZXRBZnRlcihoKSA6IHZvaWQgMCwgdGhpcy4kc2NvcGVkU2xvdHMuYWZ0ZXIgIT09IHZvaWQgMCAmJiB0aGlzLmdldEFmdGVyID09PSB2b2lkIDAgPyB0aGlzLiRzY29wZWRTbG90cy5hZnRlcigpIDogdm9pZCAwXSldIDogdm9pZCAwXG4gICAgICAgICAgfVxuICAgICAgICB9KSxcblxuICAgICAgICB0aGlzLmhhc0Vycm9yID8gaCgnZGl2Jywge1xuICAgICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctZmllbGRfX2Vycm9yIGZsZXggbm8td3JhcCBpdGVtcy1jZW50ZXInXG4gICAgICAgIH0sIHRoaXMuY29tcHV0ZWRFcnJvck1lc3NhZ2UpIDogdm9pZCAwXG4gICAgICBdKVxuICAgIF0pXG4gIH1cbn1cbiAgIiwiaW1wb3J0IEZpZWxkIGZyb20gJy4vc3JjL21haW4uanMnXG5cbmNvbnN0IGluc3RhbGwgPSBmdW5jdGlvbiAoVnVlKSB7XG4gIFZ1ZS5jb21wb25lbnQoRmllbGQubmFtZSwgRmllbGQpXG59XG5cbkZpZWxkLmluc3RhbGwgPSBpbnN0YWxsXG5cbmV4cG9ydCBkZWZhdWx0IEZpZWxkXG4iLCJpbXBvcnQgRmllbGQgZnJvbSAnLi4vLi4vZmllbGQnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3N3SW5wdXQnLFxuICBtaXhpbnM6IFtGaWVsZF0sIC8vIGZvY3VzZWQsZGlzYWJsZWRcbiAgcHJvcHM6IHtcbiAgICB2YWx1ZTogU3RyaW5nLFxuICAgIHBsYWNlaG9sZGVyOiBTdHJpbmcsXG4gICAgYXV0b2NvbXBsZXRlOiBCb29sZWFuXG4gIH0sXG4gIGRhdGE6ICgpID0+ICh7fSksXG4gIGNvbXB1dGVkOiB7fSxcbiAgbWV0aG9kczoge1xuICAgIGZvY3VzKCkge1xuICAgICAgdGhpcy4kcmVmcy5pbnB1dC5mb2N1cygpXG4gICAgfSxcbiAgICBibHVyKCkge1xuICAgICAgdGhpcy4kcmVmcy5pbnB1dC5ibHVyKClcbiAgICB9LFxuICAgIGdldElubmVyKGgpIHtcbiAgICAgIHJldHVybiBbaCgnaW5wdXQnLCB7XG4gICAgICAgIHJlZjogJ2lucHV0JyxcbiAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1pbnB1dCBtYXJnaW4tbWluJyxcbiAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICBhdXRvY29tcGxldGU6IHRoaXMuYXV0b2NvbXBsZXRlID8gJ29uJyA6ICdvZmYnXG4gICAgICAgIH0sXG4gICAgICAgIGRvbVByb3BzOiB7XG4gICAgICAgICAgdmFsdWU6IHRoaXMudmFsdWUsXG4gICAgICAgICAgcGxhY2Vob2xkZXI6IHRoaXMucGxhY2Vob2xkZXIgfHwgJycsXG4gICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuZGlzYWJsZWRcbiAgICAgICAgfSxcbiAgICAgICAgb246IHtcbiAgICAgICAgICAuLi50aGlzLiRsaXN0ZW5lcnMsXG4gICAgICAgICAgYmx1cjogZSA9PiB7XG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdibHVyJywgZS50YXJnZXQudmFsdWUpXG4gICAgICAgICAgfSxcbiAgICAgICAgICBpbnB1dDogZSA9PiB7XG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdpbnB1dCcsIGUudGFyZ2V0LnZhbHVlKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSldXG4gICAgfVxuICB9XG59XG4gICIsImltcG9ydCBJbnB1dCBmcm9tICcuL3NyYy9tYWluLmpzJ1xuXG5jb25zdCBpbnN0YWxsID0gZnVuY3Rpb24gKFZ1ZSkge1xuICBWdWUuY29tcG9uZW50KElucHV0Lm5hbWUsIElucHV0KVxufVxuXG5JbnB1dC5pbnN0YWxsID0gaW5zdGFsbFxuXG5leHBvcnQgZGVmYXVsdCBJbnB1dFxuIiwiZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnc3dTY3JvbGxBcmVhJyxcbiAgcHJvcHM6IHtcbiAgICB4OiBCb29sZWFuLFxuICAgIHk6IEJvb2xlYW4sXG4gICAgd2lkdGg6IFN0cmluZyxcbiAgICBoZWlnaHQ6IFN0cmluZyxcbiAgICBzdHJldGNoOiBCb29sZWFuXG4gIH0sXG4gIGRhdGE6ICgpID0+ICh7fSksXG4gIGNvbXB1dGVkOiB7XG4gICAgc3R5bGUoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAnb3ZlcmZsb3cteCc6IHRoaXMueCA/ICdhdXRvJyA6ICdoaWRkZW4nLFxuICAgICAgICAnb3ZlcmZsb3cteSc6IHRoaXMueSA/ICdhdXRvJyA6ICdoaWRkZW4nLFxuICAgICAgICAnbWF4LXdpZHRoJzogdGhpcy53aWR0aCB8fCAnMTAwJScsXG4gICAgICAgIHdpZHRoOiB0aGlzLndpZHRoIHx8ICcxMDAlJyxcbiAgICAgICAgJ21heC1oZWlnaHQnOiB0aGlzLmhlaWdodCB8fCAnMTAwJScsXG4gICAgICAgIGhlaWdodDogdGhpcy5zdHJldGNoICYmICh0aGlzLmhlaWdodCB8fCAnMTAwJScpXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBtZXRob2RzOiB7fSxcbiAgcmVuZGVyKGgpIHtcbiAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgc3RhdGljQ2xhc3M6ICdzdy1zY3JvbGwtYXJlYScsXG4gICAgICBzdHlsZTogdGhpcy5zdHlsZSxcbiAgICAgIG9uOiB0aGlzLiRsaXN0ZW5lcnNcbiAgICB9LCB0aGlzLiRzY29wZWRTbG90cy5kZWZhdWx0ICE9PSB2b2lkIDAgPyBbdGhpcy4kc2NvcGVkU2xvdHMuZGVmYXVsdCgpXSA6IHZvaWQgMClcbiAgfVxufVxuICAiLCJpbXBvcnQgU2Nyb2xsQXJlYSBmcm9tICcuL3NyYy9tYWluLmpzJ1xuXG5jb25zdCBpbnN0YWxsID0gZnVuY3Rpb24gKFZ1ZSkge1xuICBWdWUuY29tcG9uZW50KFNjcm9sbEFyZWEubmFtZSwgU2Nyb2xsQXJlYSlcbn1cblxuU2Nyb2xsQXJlYS5pbnN0YWxsID0gaW5zdGFsbFxuXG5leHBvcnQgZGVmYXVsdCBTY3JvbGxBcmVhXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1zZWxmLWNvbXBhcmUgKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0RlZXBFcXVhbChhLCBiKSB7XG4gIGlmIChhID09PSBiKSB7XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIGlmIChhIGluc3RhbmNlb2YgRGF0ZSAmJiBiIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgIHJldHVybiBhLmdldFRpbWUoKSA9PT0gYi5nZXRUaW1lKClcbiAgfVxuXG4gIGlmIChhICE9PSBhICYmIGIgIT09IGIpIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgaWYgKGEgIT09IE9iamVjdChhKSB8fCBiICE9PSBPYmplY3QoYikpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIGNvbnN0IHByb3BzID0gT2JqZWN0LmtleXMoYSlcblxuICBpZiAocHJvcHMubGVuZ3RoICE9PSBPYmplY3Qua2V5cyhiKS5sZW5ndGgpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIHJldHVybiBwcm9wcy5ldmVyeShwcm9wID0+IGlzRGVlcEVxdWFsKGFbcHJvcF0sIGJbcHJvcF0pKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmdDb250YWluKHMsIHYsIHJhbmRvbSkge1xuICBsZXQgaW5uZXJTID0gU3RyaW5nKHMpXG4gIGxldCBpbm5lclYgPSByYW5kb20gPT09IHRydWUgPyB2LnJlcGxhY2UoL1xccysvZywgJycpLnNwbGl0KCcnKSA6IHYucmVwbGFjZSgvXFxzKy9nLCAnICcpLnNwbGl0KCcgJylcbiAgbGV0IHN1bSA9IDBcblxuICBpbm5lclYuZm9yRWFjaCh4ID0+IHtcbiAgICBpZiAoaW5uZXJTLmluY2x1ZGVzKHgpKSB7XG4gICAgICBpbm5lclMgPSBpbm5lclMucmVwbGFjZSh4LCAnJylcbiAgICAgIHN1bSsrXG4gICAgfVxuICB9KVxuICByZXR1cm4gc3VtID49IGlubmVyVi5sZW5ndGhcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzT2JqZWN0KHYpIHtcbiAgcmV0dXJuIE9iamVjdCh2KSA9PT0gdlxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNEYXRlKHYpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2KSA9PT0gJ1tvYmplY3QgRGF0ZV0nXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1JlZ2V4cCh2KSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodikgPT09ICdbb2JqZWN0IFJlZ0V4cF0nXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlcih2KSB7XG4gIHJldHVybiB0eXBlb2YgdiA9PT0gJ251bWJlcicgJiYgaXNGaW5pdGUodilcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nKHYpIHtcbiAgcmV0dXJuIHR5cGVvZiB2ID09PSAnc3RyaW5nJ1xufVxuIiwiaW1wb3J0IEZpZWxkIGZyb20gJy4uLy4uL2ZpZWxkJ1xuaW1wb3J0IFNjb3JsbEFyZWEgZnJvbSAnLi4vLi4vc2Nyb2xsQXJlYSdcbmltcG9ydCB7IGlzRGVlcEVxdWFsLCBpc1N0cmluZ0NvbnRhaW4sIGlzT2JqZWN0IH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvaXMnXG5cbi8vIGltcG9ydCB7IGRlZHVwbGljYXRlIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvZGVkdXBsaWNhdGUnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3N3U2VsZWN0JyxcbiAgbWl4aW5zOiBbRmllbGRdLCAvLyBmb2N1c2VkLGRpc2FibGVkXG4gIGNvbXBvbmVudHM6IHtcbiAgICBTY29ybGxBcmVhXG4gIH0sXG4gIHByb3BzOiB7XG4gICAgbXVsdGlwbGU6IEJvb2xlYW4sXG4gICAgdmFsdWU6IHtcbiAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgfSxcbiAgICBvcHRpb25zOiBBcnJheSxcbiAgICBmaWx0ZXI6IEJvb2xlYW4sXG4gICAgcGxhY2Vob2xkZXI6IFN0cmluZyxcbiAgICBvcHRpb25zSGVpZ2h0OiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnMjAwcHgnXG4gICAgfSxcbiAgICBzZWxlY3RlZFN0eWxlOiBTdHJpbmdcbiAgfSxcbiAgZGF0YTogKCkgPT4gKHtcbiAgICBibHVyVHlwZTogJ3JldmVyc2UnLFxuICAgIGZpbHRlclZhbHVlOiAnJ1xuICB9KSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBleGNsdWRlZEJsdXJSZWZzKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyID8gWydpbnB1dCcsICdzZWxlY3RlZCcsICdzZWxlY3RPcHRpb25zJ10gOiBbJ3NlbGVjdGVkJywgJ3NlbGVjdE9wdGlvbnMnXVxuICAgIH0sXG4gICAgaW5uZXJWYWx1ZToge1xuICAgICAgZ2V0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRFeGFjdFZhbHVlcyh0aGlzLnZhbHVlKVxuICAgICAgfSxcbiAgICAgIHNldCh2YWwpIHtcbiAgICAgICAgdGhpcy4kZW1pdChcbiAgICAgICAgICAnaW5wdXQnLFxuICAgICAgICAgIHZhbFxuICAgICAgICApXG4gICAgICB9XG4gICAgfSxcbiAgICBpbm5lck9wdGlvbnMoKSB7XG4gICAgICByZXR1cm4gdGhpcy5vcHRpb25zLnJlZHVjZSgoYSwgYykgPT4ge1xuICAgICAgICBpZiAoaXNTdHJpbmdDb250YWluKHRoaXMuZ2V0TmFtZShjKSwgdGhpcy5maWx0ZXJWYWx1ZSkpIHtcbiAgICAgICAgICBhLnB1c2goYylcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYVxuICAgICAgfSwgW10pIHx8IFtdXG4gICAgfVxuICB9LFxuICB3YXRjaDoge1xuICAgIG9wdGlvbnMoKSB7XG4gICAgICB0aGlzLmlubmVyVmFsdWUgPSB0aGlzLmdldEV4YWN0VmFsdWVzKHRoaXMudmFsdWUpXG4gICAgfVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgZm9jdXMoKSB7XG4gICAgICB0aGlzLiRuZXh0VGljaygoKSA9PiB7XG4gICAgICAgIHRoaXMuJHJlZnMuaW5wdXQuZm9jdXMoKVxuICAgICAgfSlcbiAgICB9LFxuICAgIGJsdXIoKSB7XG4gICAgICB0aGlzLiRyZWZzLmlucHV0LmJsdXIoKVxuICAgIH0sXG4gICAgY2xlYXJGaWx0ZXIoKSB7XG4gICAgICB0aGlzLmZpbHRlclZhbHVlID0gJydcbiAgICB9LFxuICAgIHRyaWdnZXJCbHVyKGUpIHtcbiAgICAgIHRoaXMuZm9jdXNlZCA9IGZhbHNlXG4gICAgICB0aGlzLiRlbWl0KGBibHVyYCwgZSlcbiAgICB9LFxuICAgIGdldElubmVyKGgpIHtcbiAgICAgIGxldCBnZXRPcHRpb25zID0gaCA9PiB7XG4gICAgICAgIGlmICh0aGlzLmlubmVyT3B0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5pbm5lck9wdGlvbnMubWFwKG9wdGlvbiA9PiBoKCdzdy1pdGVtJywge1xuICAgICAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAgICAgc2VsZWN0ZWQ6IHRoaXMuY2hlY2tTZWxlY3RlZChvcHRpb24pXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbmF0aXZlT246IHtcbiAgICAgICAgICAgICAgY2xpY2s6IGUgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHRoaXMuZm9ybWF0VmFsdWUob3B0aW9uKVxuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJGaWx0ZXIoKVxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5tdWx0aXBsZSkge1xuICAgICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyQmx1cihlKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLmZvY3VzKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzY29wZWRTbG90czoge1xuICAgICAgICAgICAgICBkZWZhdWx0OiAoKSA9PiBbaCgnZGl2Jywge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctc2VsZWN0X19vcHRpb24nXG4gICAgICAgICAgICAgIH0sIFN0cmluZyh0aGlzLmdldE5hbWUob3B0aW9uKSkpXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBbaCgnc3ctaXRlbScsIHtcbiAgICAgICAgICAgIHNjb3BlZFNsb3RzOiB7XG4gICAgICAgICAgICAgIGRlZmF1bHQ6ICgpID0+IFtoKCdkaXYnLCB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1zZWxlY3RfX29wdGlvbiBuby1vcHRpb25zJ1xuICAgICAgICAgICAgICB9LCAnbm8gb3B0aW9ucycpXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxldCBnZXRTZWxlY3RlZCA9IGggPT4gdGhpcy5nZXRFeGFjdE9wdGlvbnModGhpcy5pbm5lclZhbHVlKS5tYXAoeCA9PiBoKCdzdy1pdGVtJywge1xuICAgICAgICBzdGF0aWNDbGFzczogJ21hcmdpbi1taW4gc3ctZm9ybSBzZWxlY3RlZC1vcHRpb24nLFxuICAgICAgICBjbGFzczogdGhpcy5zZWxlY3RlZFN0eWxlID09PSB2b2lkIDBcbiAgICAgICAgICA/IHtcbiAgICAgICAgICAgIHVuZGVybGluZTogdGhpcy51bmRlcmxpbmVkLFxuICAgICAgICAgICAgYm9yZGVyOiB0aGlzLmJvcmRlcmVkLFxuICAgICAgICAgICAgZmlsbDogdGhpcy5maWxsZWRcbiAgICAgICAgICB9IDoge1xuICAgICAgICAgICAgW3RoaXMuc2VsZWN0ZWRTdHlsZV06IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICByZWY6ICdzZWxlY3RlZCcsXG4gICAgICAgIHJlZkluRm9yOiB0cnVlLFxuICAgICAgICBzY29wZWRTbG90czoge1xuICAgICAgICAgIGRlZmF1bHQ6ICgpID0+IFtoKCdkaXYnLCB7XG4gICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICBwYWRkaW5nOiB0aGlzLm1pbmkgPyAnM3B4IDAgM3B4IDlweCcgOiAnM3B4IDlweCcsXG4gICAgICAgICAgICAgICd3aGl0ZS1zcGFjZSc6IHRoaXMubWluaSA/ICdub3dyYXAnIDogdm9pZCAwXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgU3RyaW5nKHRoaXMuZ2V0TmFtZSh4KSkpXSxcbiAgICAgICAgICBhZnRlcjogIXRoaXMubWluaSA/ICgpID0+IFtoKCdzdy1pY29uJywge1xuICAgICAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAgICAgJ2hvdmVyLWNvbG9yLXByaW1hcnknOiB0cnVlLFxuICAgICAgICAgICAgICAnY29sb3ItZ3JleSc6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAnYm9yZGVyLXJhZGl1cyc6ICc1MCUnLFxuICAgICAgICAgICAgICBwYWRkaW5nOiAnMCAzcHggMCAwJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICAgIG5hbWU6IHRoaXMuZmlsbGVkICYmIHRoaXMuc2VsZWN0ZWRTdHlsZSA9PT0gdm9pZCAwIHx8IHRoaXMuc2VsZWN0ZWRTdHlsZSA9PT0gJ2ZpbGwnID8gJ2NhbmNlbCcgOiAnY2xlYXInLFxuICAgICAgICAgICAgICBzaXplOiAnMTRweCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBuYXRpdmVPbjoge1xuICAgICAgICAgICAgICBjbGljazogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHRoaXMuZm9ybWF0VmFsdWUoeCwgJ3JlbW92ZScpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KV0gOiB2b2lkIDBcbiAgICAgICAgfVxuICAgICAgfSkpXG5cbiAgICAgIHJldHVybiBbaCgnc3ctaXRlbScsIHtcbiAgICAgICAgc3RhdGljQ2xhc3M6ICdmbGV4LWF1dG8nLFxuICAgICAgICBwcm9wczoge1xuICAgICAgICAgIHdyYXA6IHRydWUsXG4gICAgICAgICAgaGlkZURlZmF1bHQ6IHRoaXMuaW5uZXJWYWx1ZS5sZW5ndGggPiAwICYmICghdGhpcy5mb2N1c2VkIHx8ICF0aGlzLmZpbHRlcilcbiAgICAgICAgfSxcbiAgICAgICAgc2NvcGVkU2xvdHM6IHtcbiAgICAgICAgICBiZWZvcmU6IHRoaXMuaW5uZXJWYWx1ZS5sZW5ndGggPiAwID8gKCkgPT4gZ2V0U2VsZWN0ZWQoaCkgOiB2b2lkIDAsXG4gICAgICAgICAgZGVmYXVsdDogKCkgPT4gW2goJ2lucHV0Jywge1xuICAgICAgICAgICAgcmVmOiAnaW5wdXQnLFxuICAgICAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1pbnB1dCBtYXJnaW4tbWluJyxcbiAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgIGN1cnNvcjogIXRoaXMuZmlsdGVyID8gJ3BvaW50ZXInIDogdm9pZCAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZG9tUHJvcHM6IHtcbiAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuZmlsdGVyVmFsdWUsXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiB0aGlzLnBsYWNlaG9sZGVyIHx8ICcnLFxuICAgICAgICAgICAgICBkaXNhYmxlZDogIXRoaXMuZmlsdGVyXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgLi4udGhpcy4kbGlzdGVuZXJzLFxuICAgICAgICAgICAgICBpbnB1dDogZSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJWYWx1ZSA9IGUudGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KV1cbiAgICAgICAgfVxuICAgICAgfSksIHRoaXMuZm9jdXNlZCA/IGgoJ2RpdicsIHtcbiAgICAgICAgcmVmOiAnc2VsZWN0T3B0aW9ucycsXG4gICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctc2VsZWN0X19vcHRpb25zIGNvbW1vbi1zaGFkb3cnLFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgICdtYXgtaGVpZ2h0JzogdGhpcy5vcHRpb25zSGVpZ2h0XG4gICAgICAgIH1cbiAgICAgIH0sIFtoKCdzdy1zY3JvbGwtYXJlYScsIHtcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICB5OiB0cnVlLFxuICAgICAgICAgIGhlaWdodDogdGhpcy5vcHRpb25zSGVpZ2h0XG4gICAgICAgIH0sXG4gICAgICAgIHNjb3BlZFNsb3RzOiB7XG4gICAgICAgICAgZGVmYXVsdDogKCkgPT4gZ2V0T3B0aW9ucyhoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgXSkgOiB2b2lkIDBdXG4gICAgfSxcbiAgICBnZXRBZnRlcihoKSB7XG4gICAgICByZXR1cm4gW2goJ3N3LWljb24nLCB7XG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgbmFtZTogJ2tleWJvYXJkX2Fycm93X2Rvd24nLFxuICAgICAgICAgIHNpemU6ICcyMHB4J1xuICAgICAgICB9LFxuICAgICAgICBzdGF0aWNDbGFzczogJ2NvbG9yLWdyZXkgaG92ZXItY29sb3ItcHJpbWFyeScsXG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgdHJhbnNmb3JtOiB0aGlzLmZvY3VzZWQgPyAncm90YXRlKDE4MGRlZyknIDogdm9pZCAwXG4gICAgICAgIH1cbiAgICAgIH0pXVxuICAgIH0sXG4gICAgZm9ybWF0VmFsdWUob3B0aW9uLCBvcGUpIHtcbiAgICAgIGxldCBkdXBsaWNhdGVkID0gZmFsc2VcbiAgICAgIGxldCByZXMgPSBbXVxuXG4gICAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xuICAgICAgICB0aGlzLmlubmVyVmFsdWUuZm9yRWFjaCh4ID0+IHtcbiAgICAgICAgICBpZiAoaXNEZWVwRXF1YWwoeCwgdGhpcy5nZXRWYWx1ZShvcHRpb24pKSkge1xuICAgICAgICAgICAgZHVwbGljYXRlZCA9IHRydWVcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzLnB1c2goeClcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9IGVsc2UgaWYgKG9wZSA9PT0gJ3JlbW92ZScpIHsgZHVwbGljYXRlZCA9IHRydWUgfVxuICAgICAgaWYgKCFkdXBsaWNhdGVkKSB7XG4gICAgICAgIHJlcy5wdXNoKHRoaXMuZ2V0VmFsdWUob3B0aW9uKSlcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXNcbiAgICB9LFxuICAgIGNoZWNrU2VsZWN0ZWQob3B0aW9uKSB7XG4gICAgICByZXR1cm4gdGhpcy5pbm5lclZhbHVlLnNvbWUoeCA9PiBpc0RlZXBFcXVhbCh4LCB0aGlzLmdldFZhbHVlKG9wdGlvbikpKVxuICAgIH0sXG4gICAgZ2V0RXhhY3RWYWx1ZXModmFsdWUpIHtcbiAgICAgIGxldCB2ID0gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZSA6IFt2YWx1ZV1cblxuICAgICAgcmV0dXJuIHYucmVkdWNlKChhLCBjKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuc29tZSh4ID0+IGlzRGVlcEVxdWFsKHRoaXMuZ2V0VmFsdWUoeCksIGMpKSkge1xuICAgICAgICAgIGEucHVzaChjKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhXG4gICAgICB9LCBbXSlcbiAgICB9LFxuICAgIGdldEV4YWN0T3B0aW9ucyh2YWx1ZSkge1xuICAgICAgcmV0dXJuIHZhbHVlLnJlZHVjZSgoYSwgYykgPT4ge1xuICAgICAgICB0aGlzLm9wdGlvbnMuZm9yRWFjaCh4ID0+IHtcbiAgICAgICAgICBpZiAoaXNEZWVwRXF1YWwodGhpcy5nZXRWYWx1ZSh4KSwgYykpIHtcbiAgICAgICAgICAgIGEucHVzaCh4KVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIGFcbiAgICAgIH0sIFtdKVxuICAgIH0sXG4gICAgZ2V0VmFsdWUob3B0aW9uKSB7XG4gICAgICByZXR1cm4gaXNPYmplY3Qob3B0aW9uKSAmJiBvcHRpb24uaGFzT3duUHJvcGVydHkoJ3ZhbHVlJylcbiAgICAgICAgPyBvcHRpb24udmFsdWUgOiBvcHRpb25cbiAgICB9LFxuICAgIGdldE5hbWUob3B0aW9uKSB7XG4gICAgICByZXR1cm4gaXNPYmplY3Qob3B0aW9uKSAmJiBvcHRpb24uaGFzT3duUHJvcGVydHkoJ25hbWUnKVxuICAgICAgICA/IG9wdGlvbi5uYW1lIDogb3B0aW9uXG4gICAgfVxuICB9XG59XG4gICIsImltcG9ydCBTZWxlY3QgZnJvbSAnLi9zcmMvbWFpbi5qcydcblxuY29uc3QgaW5zdGFsbCA9IGZ1bmN0aW9uIChWdWUpIHtcbiAgVnVlLmNvbXBvbmVudChTZWxlY3QubmFtZSwgU2VsZWN0KVxufVxuXG5TZWxlY3QuaW5zdGFsbCA9IGluc3RhbGxcblxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0XG4iLCJpbXBvcnQgSXRlbSBmcm9tICcuLi8uLi9pdGVtJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdzd0J1dHRvbicsXG4gIGNvbXBvbmVudHM6IHsgSXRlbSB9LFxuICBwcm9wczoge1xuICAgIHVuZGVybGluZWQ6IEJvb2xlYW4sXG4gICAgYm9yZGVyZWQ6IEJvb2xlYW4sXG4gICAgZmlsbGVkOiBCb29sZWFuLFxuICAgIGRpc2FibGVkOiBCb29sZWFuLFxuICAgIGNvbG9yOiBTdHJpbmcsXG4gICAgcHJpbWFyeTogQm9vbGVhbixcbiAgICBuZWdhdGl2ZTogQm9vbGVhbixcbiAgICBwb3NpdGl2ZTogQm9vbGVhbixcbiAgICB3YXJuaW5nOiBCb29sZWFuLFxuICAgIHJvdW5kOiBCb29sZWFuLFxuICAgIHNoYWRvdzogQm9vbGVhbixcbiAgICBtaW5pOiBCb29sZWFuLFxuICAgIHRvOiBTdHJpbmcgfCBPYmplY3QsXG4gICAgY2VudGVyOiBCb29sZWFuLFxuICAgIGVuZDogQm9vbGVhblxuICB9LFxuICBkYXRhOiAoKSA9PiAoe30pLFxuICByZW5kZXIoaCkge1xuICAgIHJldHVybiBoKCdidXR0b24nLCB7XG4gICAgICBzdGF0aWNDbGFzczogJ3N3LWJ1dHRvbiBmbGV4IG5vLXdyYXAgaXRlbXMtY2VudGVyJyxcbiAgICAgIHN0eWxlOiB7XG4gICAgICAgIGNvbG9yOiAhdGhpcy5kaXNhYmxlZCAmJiAhdGhpcy5maWxsZWQgJiYgdGhpcy5jb2xvciB8fCB2b2lkIDAsXG4gICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogIXRoaXMuZGlzYWJsZWQgJiYgdGhpcy5maWxsZWQgJiYgdGhpcy5jb2xvciB8fCB2b2lkIDBcbiAgICAgIH0sXG4gICAgICBjbGFzczoge1xuICAgICAgICB1bmRlcmxpbmU6IHRoaXMudW5kZXJsaW5lZCxcbiAgICAgICAgYm9yZGVyOiB0aGlzLmJvcmRlcmVkLFxuICAgICAgICBmaWxsOiB0aGlzLmZpbGxlZCxcbiAgICAgICAgcHJpbWFyeTogdGhpcy5wcmltYXJ5LFxuICAgICAgICBuZWdhdGl2ZTogdGhpcy5uZWdhdGl2ZSxcbiAgICAgICAgcG9zaXRpdmU6IHRoaXMucG9zaXRpdmUsXG4gICAgICAgIHdhcm5pbmc6IHRoaXMud2FybmluZyxcbiAgICAgICAgZ3JleTogdGhpcy5kaXNhYmxlZCxcbiAgICAgICAgcm91bmQ6IHRoaXMucm91bmQgJiYgIXRoaXMudW5kZXJsaW5lZCxcbiAgICAgICAgJ2NvbW1vbi1zaGFkb3cnOiB0aGlzLnNoYWRvdyAmJiAodGhpcy5ib3JkZXJlZCB8fCB0aGlzLmZpbGxlZClcbiAgICAgIH1cbiAgICB9LCBbXG4gICAgICBoKCdzdy1pdGVtJywge1xuICAgICAgICBzdGF0aWNDbGFzczogJ2ZsZXgtYXV0bycsXG4gICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgJ3JvdW5kLXNsb3QnOiB0aGlzLiRzY29wZWRTbG90cy5yb3VuZCxcbiAgICAgICAgICBtaW5pOiB0aGlzLm1pbmlcbiAgICAgICAgfSxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJ1xuICAgICAgICB9LFxuICAgICAgICBwcm9wczoge1xuICAgICAgICAgIHRvOiB0aGlzLnRvLFxuICAgICAgICAgIGNlbnRlcjogdGhpcy5jZW50ZXIsXG4gICAgICAgICAgZW5kOiB0aGlzLmVuZCxcbiAgICAgICAgICBkaXNhYmxlZDogdGhpcy5kaXNhYmxlZFxuICAgICAgICB9LFxuICAgICAgICBvbjogdGhpcy5kaXNhYmxlZCA/IHZvaWQgMCA6IHtcbiAgICAgICAgICAuLi50aGlzLiRsaXN0ZW5lcnNcbiAgICAgICAgfSxcbiAgICAgICAgc2NvcGVkU2xvdHM6IHRoaXMuJHNjb3BlZFNsb3RzLnJvdW5kICE9PSB2b2lkIDBcbiAgICAgICAgICA/IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6ICgpID0+IFtoKCdkaXYnLCB7XG4gICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiAnZmxleCBuby13cmFwIGl0ZW1zLWNlbnRlciBtYXJnaW4tbWluIHN3LWJ1dHRvbl9faW5uZXIgZmxleC1hdXRvJ1xuICAgICAgICAgICAgfSwgW3RoaXMuJHNjb3BlZFNsb3RzLnJvdW5kKCldKV1cbiAgICAgICAgICB9IDoge1xuICAgICAgICAgICAgYmVmb3JlOiB0aGlzLiRzY29wZWRTbG90cy5iZWZvcmUgIT09IHZvaWQgMFxuICAgICAgICAgICAgICA/ICgpID0+IFtoKCdkaXYnLCB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6ICdmbGV4IG5vLXdyYXAgaXRlbXMtY2VudGVyIG1hcmdpbi1taW4gc3ctYnV0dG9uX19iZWZvcmUnXG4gICAgICAgICAgICAgIH0sIFt0aGlzLiRzY29wZWRTbG90cy5iZWZvcmUoKV0pXSA6IHZvaWQgMCxcbiAgXG4gICAgICAgICAgICBkZWZhdWx0OiB0aGlzLiRzY29wZWRTbG90cy5kZWZhdWx0ICE9PSB2b2lkIDBcbiAgICAgICAgICAgICAgPyAoKSA9PiBbaCgnZGl2Jywge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiAnZmxleCBuby13cmFwIGl0ZW1zLWNlbnRlciBtYXJnaW4tbWluIHN3LWJ1dHRvbl9faW5uZXIgZmxleC1hdXRvJ1xuICAgICAgICAgICAgICB9LCBbdGhpcy4kc2NvcGVkU2xvdHMuZGVmYXVsdCgpXSldIDogdm9pZCAwLFxuICBcbiAgICAgICAgICAgIGFmdGVyOiB0aGlzLiRzY29wZWRTbG90cy5hZnRlciAhPT0gdm9pZCAwXG4gICAgICAgICAgICAgID8gKCkgPT4gW2goJ2RpdicsIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogJ2ZsZXggbm8td3JhcCBpdGVtcy1jZW50ZXIgbWFyZ2luLW1pbiBzdy1idXR0b25fX2FmdGVyJ1xuICAgICAgICAgICAgICB9LCBbdGhpcy4kc2NvcGVkU2xvdHMuYWZ0ZXIoKV0pXSA6IHZvaWQgMFxuICAgICAgICAgIH1cbiAgICAgIH0pXG4gICAgXSlcbiAgfVxufVxuICAiLCJpbXBvcnQgQnV0dG9uIGZyb20gJy4vc3JjL21haW4uanMnXG5cbmNvbnN0IGluc3RhbGwgPSBmdW5jdGlvbiAoVnVlKSB7XG4gIFZ1ZS5jb21wb25lbnQoQnV0dG9uLm5hbWUsIEJ1dHRvbilcbn1cblxuQnV0dG9uLmluc3RhbGwgPSBpbnN0YWxsXG5cbmV4cG9ydCBkZWZhdWx0IEJ1dHRvblxuIiwiaW1wb3J0IHN3QnV0dG9uIGZyb20gJy4uLy4uL2J1dHRvbidcbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3N3TW9kYWwnLFxuICBjb21wb25lbnRzOiB7XG4gICAgc3dCdXR0b25cbiAgfSxcbiAgcHJvcHM6IHtcbiAgICBzaG93OiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogZmFsc2UsXG4gICAgfSxcbiAgICB0aXRsZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ+WfuuacrOeUqOazlXRpdGxlJ1xuICAgIH0sXG4gICAgd2lkdGg6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICc0MCUnXG4gICAgfVxuICB9LFxuICBjb21wdXRlZDoge1xuICAgIHN0eWxlKCkge1xuICAgICAgaWYgKHRoaXMuc2hvdykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHpJbmRleDogOTk5LFxuICAgICAgICAgIG9wYWNpdHk6IDFcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB6SW5kZXg6IC0xMCxcbiAgICAgICAgICBvcGFjaXR5OiAwXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBoYW5kbGVDYW5jZWwoKSB7XG4gICAgICB0aGlzLiRlbWl0KCdjYW5jZWwnKVxuICAgIH0sXG4gICAgaGFuZGxlQ29uZmlybSgpIHtcbiAgICAgIHRoaXMuJGVtaXQoJ2NvbmZpcm0nKVxuICAgIH0sXG4gIH0sXG4gIHJlbmRlcihoKSB7XG4gICAgcmV0dXJuIGgoJ2Rpdicse1xuICAgICAgc3RhdGljQ2xhc3M6ICdzdy1tb2RhbC1tYXNrJyxcbiAgICAgIHN0eWxlOiB0aGlzLnN0eWxlLFxuICAgICAgb246IHtcbiAgICAgICAgY2xpY2s6IHRoaXMuaGFuZGxlQ2FuY2VsXG4gICAgICB9IFxuICAgIH0sIFsgaCgnZGl2JywgeyBcbiAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1tb2RhbCcsXG4gICAgICAgICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgICAgICAgc2hvd01vZGFsOiB0aGlzLnNob3csXG4gICAgICAgICAgICAgICAgaGlkZU1vZGFsOiAhdGhpcy5zaG93XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgd2lkdGg6IHRoaXMud2lkdGhcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICBjbGljazogZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFsgdGhpcy4kc2NvcGVkU2xvdHMuaGVhZGVyID09PSB2b2lkIDAgXG4gICAgICAgICAgICAgICAgPyBoKCdkaXYnLCBcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzczogJ3N3LW1vZGFsLXRpdGxlJ1xuICAgICAgICAgICAgICAgICAgICAgIH0sIFsgaCgnc3BhbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiAnc3ctbW9kYWwtdGl0bGUtdGV4dCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRpdGxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGgoJ3NwYW4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzczogJ3N3LW1vZGFsLWNsb3NlLWljb24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiAoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2FuY2VsKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoKCdpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzczogJ21hdGVyaWFsLWljb25zJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnY2xvc2UnKSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgOiB0aGlzLiRzY29wZWRTbG90cy5oZWFkZXIoKSxcbiAgICAgICAgICAgICAgICB0aGlzLiRzY29wZWRTbG90cy5jb250ZW50KCksXG4gICAgICAgICAgICAgICAgdGhpcy4kc2NvcGVkU2xvdHMuZm9vdGVyID09PSB2b2lkIDAgXG4gICAgICAgICAgICAgICAgPyBoKCdkaXYnLCBcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6ICdzdy1tb2RhbC1mb290ZXInXG4gICAgICAgICAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgaCgnc3ctYnV0dG9uJyx7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzczogJ2J0biBsZWZ0LWJ0bicsXG4gICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2FuY2VsKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH0sICflj5bmtognKSxcbiAgICAgICAgICAgICAgICAgICAgICBoKCdzdy1idXR0b24nLHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiAnYnRuIHJpZ2h0LWJ0bicsXG4gICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQ29uZmlybSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9LCAn56Gu5a6aJylcbiAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICA6IHRoaXMuJHNjb3BlZFNsb3RzLmZvb3RlclxuICAgICAgICAgICAgICBdICAgICAgICAgICAgICBcbiAgICAgICAgICApXG4gICAgICAgIF1cbiAgICApXG4gIH1cbn0iLCJpbXBvcnQgTW9kYWwgZnJvbSAnLi9zcmMvbWFpbi5qcydcblxuY29uc3QgaW5zdGFsbCA9IGZ1bmN0aW9uIChWdWUpIHtcbiAgVnVlLmNvbXBvbmVudChNb2RhbC5uYW1lLCBNb2RhbClcbn1cblxuTW9kYWwuaW5zdGFsbCA9IGluc3RhbGxcblxuZXhwb3J0IGRlZmF1bHQgTW9kYWxcbiIsImltcG9ydCBWdWUgZnJvbSAndnVlJ1xuXG5jb25zdCBpc1NlcnZlciA9IFZ1ZS5wcm90b3R5cGUuJGlzU2VydmVyO1xuXG5leHBvcnQgZnVuY3Rpb24gb2Zmc2V0KGVsKSB7XG4gIGlmIChlbCA9PT0gd2luZG93KSB7XG4gICAgcmV0dXJuIHsgdG9wOiAwLCBsZWZ0OiAwIH1cbiAgfVxuICBjb25zdCB7IHRvcCwgbGVmdCB9ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuICByZXR1cm4geyB0b3AsIGxlZnQgfVxufVxuICBcbmV4cG9ydCBmdW5jdGlvbiBzdHlsZShlbCwgcHJvcGVydHkpIHtcbiAgcmV0dXJuIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsKS5nZXRQcm9wZXJ0eVZhbHVlKHByb3BlcnR5KVxufVxuICBcbmV4cG9ydCBmdW5jdGlvbiBoZWlnaHQoZWwpIHtcbiAgcmV0dXJuIGVsID09PSB3aW5kb3dcbiAgICA/IHdpbmRvdy5pbm5lckhlaWdodFxuICAgIDogZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0XG59XG4gIFxuZXhwb3J0IGZ1bmN0aW9uIHdpZHRoKGVsKSB7XG4gIHJldHVybiBlbCA9PT0gd2luZG93XG4gICAgPyB3aW5kb3cuaW5uZXJXaWR0aFxuICAgIDogZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGhcbn1cbiAgXG5leHBvcnQgZnVuY3Rpb24gY3NzKGVsZW1lbnQsIGNzcykge1xuICBsZXQgc3R5bGUgPSBlbGVtZW50LnN0eWxlXG4gIFxuICBPYmplY3Qua2V5cyhjc3MpLmZvckVhY2gocHJvcCA9PiB7XG4gICAgc3R5bGVbcHJvcF0gPSBjc3NbcHJvcF1cbiAgfSlcbn1cbiAgXG5leHBvcnQgZnVuY3Rpb24gY3NzQmF0Y2goZWxlbWVudHMsIHN0eWxlKSB7XG4gIGVsZW1lbnRzLmZvckVhY2goZWwgPT4gY3NzKGVsLCBzdHlsZSkpXG59XG4gIFxuZXhwb3J0IGZ1bmN0aW9uIHJlYWR5KGZuKSB7XG4gIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm5cbiAgfVxuICBcbiAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgIT09ICdsb2FkaW5nJykge1xuICAgIHJldHVybiBmbigpXG4gIH1cbiAgXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmbiwgZmFsc2UpXG59XG5cbmV4cG9ydCBjb25zdCBvbiA9IChmdW5jdGlvbigpIHtcbiAgaWYgKCFpc1NlcnZlciAmJiBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGVsZW1lbnQsIGV2ZW50LCBoYW5kbGVyKSB7XG4gICAgICBpZiAoZWxlbWVudCAmJiBldmVudCAmJiBoYW5kbGVyKSB7XG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlciwgZmFsc2UpO1xuICAgICAgfVxuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGVsZW1lbnQsIGV2ZW50LCBoYW5kbGVyKSB7XG4gICAgICBpZiAoZWxlbWVudCAmJiBldmVudCAmJiBoYW5kbGVyKSB7XG4gICAgICAgIGVsZW1lbnQuYXR0YWNoRXZlbnQoJ29uJyArIGV2ZW50LCBoYW5kbGVyKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG59KSgpO1xuXG5leHBvcnQgY29uc3Qgb2ZmID0gKGZ1bmN0aW9uKCkge1xuICBpZiAoIWlzU2VydmVyICYmIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oZWxlbWVudCwgZXZlbnQsIGhhbmRsZXIpIHtcbiAgICAgIGlmIChlbGVtZW50ICYmIGV2ZW50KSB7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlciwgZmFsc2UpO1xuICAgICAgfVxuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGVsZW1lbnQsIGV2ZW50LCBoYW5kbGVyKSB7XG4gICAgICBpZiAoZWxlbWVudCAmJiBldmVudCkge1xuICAgICAgICBlbGVtZW50LmRldGFjaEV2ZW50KCdvbicgKyBldmVudCwgaGFuZGxlcik7XG4gICAgICB9XG4gICAgfTtcbiAgfVxufSkoKTsgIFxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG9mZnNldCxcbiAgc3R5bGUsXG4gIGhlaWdodCxcbiAgd2lkdGgsXG4gIGNzcyxcbiAgY3NzQmF0Y2gsXG4gIHJlYWR5LFxuICBvbixcbiAgb2ZmXG59IiwiaW1wb3J0IHsgb24sIG9mZiB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2RvbScgXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdzd1BvcG92ZXInLFxuICBkYXRhICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcG9wb3ZlclN0eWxlOiB7fSxcbiAgICAgIGFycm93U3R5bGU6IHt9LFxuICAgICAgc2hvdzogZmFsc2UsXG4gICAgICByZWZlcmVuY2VFbG06IHt9XG4gICAgfVxuICB9LFxuICBtb2RlbDoge1xuICAgIHByb3A6ICd2YWx1ZScsXG4gICAgZXZlbnQ6ICd1cGRhdGUnXG4gIH0sXG4gIHByb3BzOiB7XG4gICAgdmFsdWU6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW5cbiAgICB9LFxuICAgIHRpdGxlOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgfSxcbiAgICBjb250ZW50OiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgfSxcbiAgICBwbGFjZW1lbnQ6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICd0b3AnXG4gICAgfSxcbiAgICB0cmlnZ2VyOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnY2xpY2snLFxuICAgICAgdmFsaWRhdG9yOiB2YWx1ZSA9PiBbJ2NsaWNrJywgJ2ZvY3VzJywgJ2hvdmVyJywgJ21hbnVhbCddLmluZGV4T2YodmFsdWUpID4gLTFcbiAgICB9LFxuICAgIHdpZHRoOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgfVxuICB9LFxuICBjb21wdXRlZDoge1xuICAgIHNob3dWYWx1ZToge1xuICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlXG4gICAgICB9LFxuICAgICAgc2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICB9XG4gICAgfSxcbiAgICBzaG93U3R5bGUoKSB7XG4gICAgICBpZiAodGhpcy50cmlnZ2VyICE9PSAnbWFudWFsJykge1xuICAgICAgICBpZiAodGhpcy5zaG93KSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHpJbmRleDogOTk5LFxuICAgICAgICAgICAgb3BhY2l0eTogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgekluZGV4OiAtMTAsXG4gICAgICAgICAgICBvcGFjaXR5OiAwXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5zaG93VmFsdWUpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgekluZGV4OiA5OTksXG4gICAgICAgICAgICBvcGFjaXR5OiAxXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB6SW5kZXg6IC0xMCxcbiAgICAgICAgICAgIG9wYWNpdHk6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBnZXRTdHlsZShwb3BvdmVyRWxtLCByZWZlcmVuY2VFbG0pIHtcbiAgICAgIHN3aXRjaCAodGhpcy5wbGFjZW1lbnQpIHtcbiAgICAgICAgY2FzZSAndG9wLXN0YXJ0JzpcbiAgICAgICAgICB0aGlzLnBvcG92ZXJTdHlsZSA9IHtcbiAgICAgICAgICAgIHRvcDogJy0nICsgKHBvcG92ZXJFbG0ub2Zmc2V0SGVpZ2h0ICsgMTApICsgJ3B4J1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmFycm93U3R5bGUgPSB7XG4gICAgICAgICAgICBsZWZ0OiAocmVmZXJlbmNlRWxtLm9mZnNldFdpZHRoIC8gMiAtIDUpICsgJ3B4J1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAndG9wJzpcbiAgICAgICAgICB0aGlzLnBvcG92ZXJTdHlsZSA9IHtcbiAgICAgICAgICAgIHRvcDogJy0nICsgKHBvcG92ZXJFbG0ub2Zmc2V0SGVpZ2h0ICsgMTApICsgJ3B4JyxcbiAgICAgICAgICAgIGxlZnQ6IChyZWZlcmVuY2VFbG0ub2Zmc2V0V2lkdGggLSBwb3BvdmVyRWxtLm9mZnNldFdpZHRoKSAvIDIgKyAncHgnXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuYXJyb3dTdHlsZSA9IHtcbiAgICAgICAgICAgIGxlZnQ6IChwb3BvdmVyRWxtLm9mZnNldFdpZHRoIC8gMiAtIDUpICsgJ3B4J1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlICdib3R0b20tc3RhcnQnOiBcbiAgICAgICAgICB0aGlzLnBvcG92ZXJTdHlsZSA9IHtcbiAgICAgICAgICAgIHRvcDogKHJlZmVyZW5jZUVsbS5vZmZzZXRIZWlnaHQgKyAxMCkgKyAncHgnXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuYXJyb3dTdHlsZSA9IHtcbiAgICAgICAgICAgIGxlZnQ6IChyZWZlcmVuY2VFbG0ub2Zmc2V0V2lkdGggLyAyIC0gNSkgKyAncHgnXG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrIFxuICAgICAgICBjYXNlICdib3R0b20nOlxuICAgICAgICAgIHRoaXMucG9wb3ZlclN0eWxlID0ge1xuICAgICAgICAgICAgdG9wOiAocmVmZXJlbmNlRWxtLm9mZnNldEhlaWdodCArIDEwKSArICdweCcsXG4gICAgICAgICAgICBsZWZ0OiAocmVmZXJlbmNlRWxtLm9mZnNldFdpZHRoIC0gcG9wb3ZlckVsbS5vZmZzZXRXaWR0aCkgLyAyICsgJ3B4J1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmFycm93U3R5bGUgPSB7XG4gICAgICAgICAgICBsZWZ0OiAocG9wb3ZlckVsbS5vZmZzZXRXaWR0aCAvIDIgLSA1KSArICdweCdcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAncmlnaHQtc3RhcnQnOlxuICAgICAgICAgIHRoaXMucG9wb3ZlclN0eWxlID0ge1xuICAgICAgICAgICAgbGVmdDogKHJlZmVyZW5jZUVsbS5vZmZzZXRXaWR0aCArIDEwKSArICdweCcsXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuYXJyb3dTdHlsZSA9IHtcbiAgICAgICAgICAgIHRvcDogKHJlZmVyZW5jZUVsbS5vZmZzZXRIZWlnaHQgLyAyIC0gNSkgKyAncHgnXG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrICBcbiAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgIHRoaXMucG9wb3ZlclN0eWxlID0ge1xuICAgICAgICAgICAgbGVmdDogKHJlZmVyZW5jZUVsbS5vZmZzZXRXaWR0aCArIDEwKSArICdweCcsXG4gICAgICAgICAgICB0b3A6IChyZWZlcmVuY2VFbG0ub2Zmc2V0SGVpZ2h0IC0gcG9wb3ZlckVsbS5vZmZzZXRIZWlnaHQpIC8gMiArICdweCdcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5hcnJvd1N0eWxlID0ge1xuICAgICAgICAgICAgdG9wOiAocG9wb3ZlckVsbS5vZmZzZXRIZWlnaHQgLyAyIC0gNSkgKyAncHgnXG4gICAgICAgICAgfSBcbiAgICAgICAgICBicmVhayBcbiAgICAgICAgY2FzZSAnbGVmdC1zdGFydCc6XG4gICAgICAgICAgdGhpcy5wb3BvdmVyU3R5bGUgPSB7XG4gICAgICAgICAgICByaWdodDogKHJlZmVyZW5jZUVsbS5vZmZzZXRXaWR0aCArIDEwKSArICdweCcsXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuYXJyb3dTdHlsZSA9IHtcbiAgICAgICAgICAgIHRvcDogKHJlZmVyZW5jZUVsbS5vZmZzZXRIZWlnaHQgLyAyIC0gNSkgKyAncHgnXG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgIHRoaXMucG9wb3ZlclN0eWxlID0ge1xuICAgICAgICAgICAgcmlnaHQ6IChyZWZlcmVuY2VFbG0ub2Zmc2V0V2lkdGggKyAxMCkgKyAncHgnLFxuICAgICAgICAgICAgdG9wOiAocmVmZXJlbmNlRWxtLm9mZnNldEhlaWdodCAtIHBvcG92ZXJFbG0ub2Zmc2V0SGVpZ2h0KSAvIDIgKyAncHgnXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuYXJyb3dTdHlsZSA9IHtcbiAgICAgICAgICAgIHRvcDogKHBvcG92ZXJFbG0ub2Zmc2V0SGVpZ2h0IC8gMiAtIDUpICsgJ3B4J1xuICAgICAgICAgIH0gXG4gICAgICAgICAgYnJlYWsgICAgICAgIFxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0sXG4gICAgaGFuZGxlQ2xpY2soKSB7XG4gICAgICB0aGlzLnNob3cgPSAhdGhpcy5zaG93XG4gICAgfSxcbiAgICBoYW5kbGVNb3VzZUVudGVyKCkge1xuICAgICAgdGhpcy5zaG93ID0gdHJ1ZVxuICAgIH0sXG4gICAgaGFuZGxlTW91c2VMZWF2ZSgpIHtcbiAgICAgIHRoaXMuc2hvdyA9IGZhbHNlXG4gICAgfSxcbiAgICBkb1Nob3coKSB7XG4gICAgICB0aGlzLnNob3cgPSB0cnVlXG4gICAgfSxcbiAgICBkb0Nsb3NlKCkge1xuICAgICAgdGhpcy5zaG93ID0gZmFsc2VcbiAgICB9LFxuICAgIGhhbmRsZU1hbnVhbCgpIHtcbiAgICAgIHRoaXMuc2hvd1ZhbHVlID0gIXRoaXMuc2hvd1ZhbHVlXG4gICAgICB0aGlzLiRlbWl0KFwidXBkYXRlXCIsIHRoaXMuc2hvd1ZhbHVlKTtcbiAgICB9XG4gIH0sXG4gIG1vdW50ZWQgKCkge1xuICAgIGxldCBwb3BvdmVyRWxtID0gdGhpcy4kcmVmcy5wb3BvdmVyXG4gICAgbGV0IHJlZmVyZW5jZUVsbSA9IHRoaXMucmVmZXJlbmNlRWxtID0gdGhpcy4kc2NvcGVkU2xvdHMucmVmZXJlbmNlKClbMF0uZWxtXG4gICAgdGhpcy5nZXRTdHlsZShwb3BvdmVyRWxtLCByZWZlcmVuY2VFbG0pXG4gICAgaWYodGhpcy50cmlnZ2VyID09PSAnbWFudWFsJyl7XG4gICAgICBvbihyZWZlcmVuY2VFbG0sICdjbGljaycsIHRoaXMuaGFuZGxlTWFudWFsKTtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBpZiAodGhpcy50cmlnZ2VyID09PSAnY2xpY2snKSB7XG4gICAgICBvbihyZWZlcmVuY2VFbG0sICdjbGljaycsIHRoaXMuaGFuZGxlQ2xpY2spO1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGlmKHRoaXMudHJpZ2dlciA9PT0gJ2hvdmVyJyl7XG4gICAgICBvbihyZWZlcmVuY2VFbG0sICdtb3VzZWVudGVyJywgdGhpcy5oYW5kbGVNb3VzZUVudGVyKVxuICAgICAgb24ocmVmZXJlbmNlRWxtLCAnbW91c2VsZWF2ZScsIHRoaXMuaGFuZGxlTW91c2VMZWF2ZSk7XG4gICAgfVxuICAgIGlmKHRoaXMudHJpZ2dlciA9PT0gJ2ZvY3VzJyl7XG4gICAgICBpZiAocmVmZXJlbmNlRWxtLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0LCB0ZXh0YXJlYScpKSB7XG4gICAgICAgIG9uKHJlZmVyZW5jZUVsbSwgJ2ZvY3VzaW4nLCB0aGlzLmRvU2hvdyk7XG4gICAgICAgIG9uKHJlZmVyZW5jZUVsbSwgJ2ZvY3Vzb3V0JywgdGhpcy5kb0Nsb3NlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9uKHJlZmVyZW5jZUVsbSwgJ21vdXNlZG93bicsIHRoaXMuZG9TaG93KTtcbiAgICAgICAgb24ocmVmZXJlbmNlRWxtLCAnbW91c2V1cCcsIHRoaXMuZG9DbG9zZSk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBkZXN0cm95ZWQgKCkge1xuICAgIGNvbnN0IHJlZmVyZW5jZSA9IHRoaXMucmVmZXJlbmNlRWxtO1xuICAgIG9mZihyZWZlcmVuY2UsICdjbGljaycsIHRoaXMuaGFuZGxlQ2xpY2spO1xuICAgIG9mZihyZWZlcmVuY2UsICdtb3VzZXVwJywgdGhpcy5kb0Nsb3NlKTtcbiAgICBvZmYocmVmZXJlbmNlLCAnbW91c2Vkb3duJywgdGhpcy5kb1Nob3cpO1xuICAgIG9mZihyZWZlcmVuY2UsICdmb2N1c2luJywgdGhpcy5kb1Nob3cpO1xuICAgIG9mZihyZWZlcmVuY2UsICdmb2N1c291dCcsIHRoaXMuZG9DbG9zZSk7XG4gICAgb2ZmKHJlZmVyZW5jZSwgJ21vdXNlZG93bicsIHRoaXMuZG9TaG93KTtcbiAgICBvZmYocmVmZXJlbmNlLCAnbW91c2V1cCcsIHRoaXMuZG9DbG9zZSk7XG4gICAgb2ZmKHJlZmVyZW5jZSwgJ21vdXNlbGVhdmUnLCB0aGlzLmhhbmRsZU1vdXNlTGVhdmUpO1xuICAgIG9mZihyZWZlcmVuY2UsICdtb3VzZWVudGVyJywgdGhpcy5oYW5kbGVNb3VzZUVudGVyKTtcbiAgICBvZmYoZG9jdW1lbnQsICdjbGljaycsIHRoaXMuaGFuZGxlTWFudWFsKTtcbiAgfSxcbiAgcmVuZGVyKGgpIHtcbiAgICByZXR1cm4gaCgnZGl2Jyx7XG4gICAgICBjbGFzczogJ3N3LXBvcG92ZXItY29udGFpbicsXG4gICAgfSwgWyBoKCdkaXYnLCBcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1wb3BvdmVyJyxcbiAgICAgICAgICAgICAgY2xhc3M6ICdzdy1wb3BvdmVyLXNob3cnLFxuICAgICAgICAgICAgICByZWY6ICdwb3BvdmVyJyxcbiAgICAgICAgICAgICAgc3R5bGU6IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih0aGlzLnBvcG92ZXJTdHlsZSwge3dpZHRoOiB0aGlzLndpZHRoIH0pLCB0aGlzLnNob3dTdHlsZSlcbiAgICAgICAgfSwgWyB0aGlzLnRpdGxlICBcbiAgICAgICAgICAgICAgPyBoKCdkaXYnLCB7XG4gICAgICAgICAgICAgICAgY2xhc3M6ICdzdy1wb3BvdmVyLXRpdGxlJ1xuICAgICAgICAgICAgICB9LCB0aGlzLnRpdGxlKVxuICAgICAgICAgICAgICA6ICcnLCBcbiAgICAgICAgICAgICB0aGlzLiRzY29wZWRTbG90cy5kZWZhdWx0ID09PSB2b2lkIDBcbiAgICAgICAgICAgICA/IGgoJ2RpdicsIHtcbiAgICAgICAgICAgICAgICBjbGFzczogJ3N3LXBvcG92ZXItY29udGVudCdcbiAgICAgICAgICAgICB9LCB0aGlzLmNvbnRlbnQgfHwgJycgKVxuICAgICAgICAgICAgICA6IHRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQoKSxcbiAgICAgICAgICAgICBoKCdkaXYnLHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogJ3N3LXBvcG92ZXItYXJyb3cnLFxuICAgICAgICAgICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgICAgICAgJ3N3LXBvcG92ZXItYXJyb3ctdG9wJzogdGhpcy5wbGFjZW1lbnQuaW5kZXhPZigndG9wJykgPj0gMCA/IHRydWUgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAnc3ctcG9wb3Zlci1hcnJvdy1ib3R0b20nOiB0aGlzLnBsYWNlbWVudC5pbmRleE9mKCdib3R0b20nKSA+PSAwID8gdHJ1ZSA6IGZhbHNlLFxuICAgICAgICAgICAgICAgICdzdy1wb3BvdmVyLWFycm93LXJpZ2h0JzogdGhpcy5wbGFjZW1lbnQuaW5kZXhPZigncmlnaHQnKSA+PSAwID8gdHJ1ZSA6IGZhbHNlLFxuICAgICAgICAgICAgICAgICdzdy1wb3BvdmVyLWFycm93LWxlZnQnOiB0aGlzLnBsYWNlbWVudC5pbmRleE9mKCdsZWZ0JykgPj0gMCA/IHRydWUgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHN0eWxlOiB0aGlzLmFycm93U3R5bGVcbiAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSksIFxuICAgICAgICB0aGlzLiRzY29wZWRTbG90cy5yZWZlcmVuY2UgPT09IHZvaWQgMCBcbiAgICAgICAgPyBoKClcbiAgICAgICAgOiB0aGlzLiRzY29wZWRTbG90cy5yZWZlcmVuY2UoKVxuICAgICAgXSkgXG4gIH1cbn0iLCJpbXBvcnQgUG9wb3ZlciBmcm9tICcuL3NyYy9tYWluLmpzJ1xuXG5jb25zdCBpbnN0YWxsID0gZnVuY3Rpb24gKFZ1ZSkge1xuICBWdWUuY29tcG9uZW50KE1vZGFsLm5hbWUsIFBvcG92ZXIpXG59XG5cblBvcG92ZXIuaW5zdGFsbCA9IGluc3RhbGxcblxuZXhwb3J0IGRlZmF1bHQgUG9wb3ZlclxuIiwiaW1wb3J0IEl0ZW0gZnJvbSAnLi4vLi4vaXRlbSdcbmltcG9ydCB7IGlzRGVlcEVxdWFsIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvaXMnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3N3Q2hlY2tib3gnLFxuICBjb21wb25lbnRzOiB7IEl0ZW0gfSxcbiAgcHJvcHM6IHtcbiAgICB2YWx1ZTogQm9vbGVhbiB8IEFycmF5LFxuICAgIHZhbDoge1xuICAgICAgcmVxdWlyZWQ6IGZhbHNlXG4gICAgfSxcbiAgICBsYWJlbDogU3RyaW5nLFxuICAgIGRpc2FibGVkOiBCb29sZWFuLFxuICAgIGNvbG9yOiBTdHJpbmcsXG4gICAgcHJpbWFyeTogQm9vbGVhbixcbiAgICBuZWdhdGl2ZTogQm9vbGVhbixcbiAgICBwb3NpdGl2ZTogQm9vbGVhbixcbiAgICB3YXJuaW5nOiBCb29sZWFuLFxuICAgIGxlZnRMYWJlbDogQm9vbGVhbixcbiAgICBjb2xvckxhYmVsOiBCb29sZWFuLFxuICAgIGtlZXBDb2xvcjogQm9vbGVhblxuICB9LFxuICBkYXRhOiAoKSA9PiAoe1xuICAgIHBhcmVudDogdm9pZCAwXG4gIH0pLFxuICBjb21wdXRlZDoge1xuICAgIG1vZGVsKCkge1xuICAgICAgcmV0dXJuIHRoaXMucGFyZW50ID09PSB2b2lkIDAgPyB0aGlzLnZhbHVlIDogdGhpcy5wYXJlbnQudmFsdWVcbiAgICB9LFxuICAgIHBhcmVudERpc2FibGVkKCkge1xuICAgICAgcmV0dXJuIHRoaXMucGFyZW50ICYmIHRoaXMucGFyZW50LmRpc2FibGVkXG4gICAgfSxcbiAgICBjaGVja2VkOiB7XG4gICAgICBnZXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJvb2xlYW5Nb2RlID8gdGhpcy5tb2RlbCA6IHRoaXMuZ2V0Q2hlY2tlZCh0aGlzLnZhbClcbiAgICAgIH0sXG4gICAgICBzZXQodmFsKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcy5wYXJlbnQgPT09IHZvaWQgMCA/IHRoaXMgOiB0aGlzLnBhcmVudFxuXG4gICAgICAgIHNlbGYuJGVtaXQoXG4gICAgICAgICAgJ2lucHV0JyxcbiAgICAgICAgICB0aGlzLmZvcm1hdFZhbHVlKHZhbClcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH0sXG4gICAgaW5uZXJWYWx1ZSgpIHtcbiAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KHRoaXMubW9kZWwpID8gdGhpcy5tb2RlbCA6IFt0aGlzLm1vZGVsXVxuICAgIH0sXG4gICAgYm9vbGVhbk1vZGUoKSB7XG4gICAgICByZXR1cm4gdGhpcy52YWwgPT09IHZvaWQgMFxuICAgIH1cbiAgfSxcbiAgd2F0Y2g6IHt9LFxuICBtZXRob2RzOiB7XG4gICAgZ2V0Q2hlY2tlZCh2YWwpIHtcbiAgICAgIHJldHVybiB0aGlzLmlubmVyVmFsdWUuc29tZSh4ID0+IGlzRGVlcEVxdWFsKHgsIHZhbCkpXG4gICAgfSxcbiAgICBmb3JtYXRWYWx1ZShjaGVja2VkKSB7XG4gICAgICBpZiAodGhpcy5ib29sZWFuTW9kZSkgeyByZXR1cm4gY2hlY2tlZCB9XG4gICAgICBsZXQgcmVzID0gW11cblxuICAgICAgdGhpcy5pbm5lclZhbHVlLmZvckVhY2goeCA9PiB7XG4gICAgICAgIGlmICghaXNEZWVwRXF1YWwoeCwgdGhpcy52YWwpKSB7XG4gICAgICAgICAgcmVzLnB1c2goeClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIGlmIChjaGVja2VkKSB7IHJlcy5wdXNoKHRoaXMudmFsKSB9XG4gICAgICByZXR1cm4gcmVzXG4gICAgfSxcbiAgfSxcbiAgcmVuZGVyKGgpIHtcbiAgICBsZXQgY2hlY2tlZCA9IHRoaXMuY2hlY2tlZFxuICAgIGxldCBjb2xvckxhYmVsID0gY2hlY2tlZCAmJiB0aGlzLmNvbG9yTGFiZWxcbiAgICBsZXQgY29sb3JDaGVja2JveCA9IGNoZWNrZWQgfHwgdGhpcy5rZWVwQ29sb3JcbiAgICBsZXQgZ2V0TGFiZWwgPSAoKSA9PiBbaCgnZGl2Jywge1xuICAgICAgc3RhdGljQ2xhc3M6ICdzdy1jaGVja2JveF9fdGV4dCBtYXJnaW4tbWluJyxcbiAgICAgIGNsYXNzOiB7XG4gICAgICAgICdjb2xvci1wcmltYXJ5JzogY29sb3JMYWJlbCA/IHRoaXMucHJpbWFyeSA6IHZvaWQgMCxcbiAgICAgICAgJ2NvbG9yLW5lZ2F0aXZlJzogY29sb3JMYWJlbCA/IHRoaXMubmVnYXRpdmUgOiB2b2lkIDAsXG4gICAgICAgICdjb2xvci1wb3NpdGl2ZSc6IGNvbG9yTGFiZWwgPyB0aGlzLnBvc2l0aXZlIDogdm9pZCAwLFxuICAgICAgICAnY29sb3Itd2FybmluZyc6IGNvbG9yTGFiZWwgPyB0aGlzLndhcm5pbmcgOiB2b2lkIDBcbiAgICAgIH0sXG4gICAgICBzdHlsZToge1xuICAgICAgICBjb2xvcjogY29sb3JMYWJlbCA/IHRoaXMuY29sb3IgOiB2b2lkIDBcbiAgICAgIH1cbiAgICB9LCB0aGlzLmxhYmVsKV1cblxuICAgIHJldHVybiBoKCdzdy1pdGVtJywge1xuICAgICAgc3RhdGljQ2xhc3M6ICdzdy1jaGVja2JveCcsXG4gICAgICByZWY6ICdjaGVja2JveCcsXG4gICAgICBjbGFzczoge1xuICAgICAgICBkaXNhYmxlOiB0aGlzLmRpc2FibGVkIHx8IHRoaXMucGFyZW50RGlzYWJsZWRcbiAgICAgIH0sXG4gICAgICBuYXRpdmVPbjogdGhpcy5kaXNhYmxlZCA/IHZvaWQgMCA6IHtcbiAgICAgICAgY2xpY2s6ICgpID0+IHtcbiAgICAgICAgICB0aGlzLmNoZWNrZWQgPSAhY2hlY2tlZFxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgc2NvcGVkU2xvdHM6IHtcbiAgICAgICAgYmVmb3JlOiB0aGlzLmxhYmVsICYmIHRoaXMubGVmdExhYmVsID8gZ2V0TGFiZWwgOiB2b2lkIDAsXG4gICAgICAgIGRlZmF1bHQ6ICgpID0+IFtoKCdzdy1pY29uJywge1xuICAgICAgICAgIHN0YXRpY0NsYXNzOiAnbWFyZ2luLW1pbicsXG4gICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIG9wYWNpdHk6IGNoZWNrZWQgPyAxIDogMC42XG4gICAgICAgICAgfSxcbiAgICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgc2l6ZTogJzIwcHgnLFxuICAgICAgICAgICAgbmFtZTogY2hlY2tlZCA/ICdjaGVja19ib3gnIDogJ2NoZWNrX2JveF9vdXRsaW5lX2JsYW5rJyxcbiAgICAgICAgICAgIGNvbG9yOiBjb2xvckNoZWNrYm94ID8gdGhpcy5jb2xvciA6IHZvaWQgMCxcbiAgICAgICAgICAgIHByaW1hcnk6IGNvbG9yQ2hlY2tib3ggPyB0aGlzLnByaW1hcnkgOiB2b2lkIDAsXG4gICAgICAgICAgICBuZWdhdGl2ZTogY29sb3JDaGVja2JveCA/IHRoaXMubmVnYXRpdmUgOiB2b2lkIDAsXG4gICAgICAgICAgICBwb3NpdGl2ZTogY29sb3JDaGVja2JveCA/IHRoaXMucG9zaXRpdmUgOiB2b2lkIDAsXG4gICAgICAgICAgICB3YXJuaW5nOiBjb2xvckNoZWNrYm94ID8gdGhpcy53YXJuaW5nIDogdm9pZCAwXG4gICAgICAgICAgfVxuICAgICAgICB9KV0sXG4gICAgICAgIGFmdGVyOiB0aGlzLmxhYmVsICYmICF0aGlzLmxlZnRMYWJlbCA/IGdldExhYmVsIDogdm9pZCAwXG4gICAgICB9XG4gICAgfSlcbiAgfVxufSIsImltcG9ydCBDaGVja2JveCBmcm9tICcuL3NyYy9tYWluLmpzJ1xuXG5jb25zdCBpbnN0YWxsID0gZnVuY3Rpb24gKFZ1ZSkge1xuICBWdWUuY29tcG9uZW50KENoZWNrYm94Lm5hbWUsIENoZWNrYm94KVxufVxuXG5DaGVja2JveC5pbnN0YWxsID0gaW5zdGFsbFxuXG5leHBvcnQgZGVmYXVsdCBDaGVja2JveFxuIiwiXG5leHBvcnQgZGVmYXVsdCB7XG4gIGRhdGE6ICgpID0+ICh7fSksXG4gIHdhdGNoOiB7fSxcbiAgY29tcHV0ZWQ6IHt9LFxuICBtZXRob2RzOiB7XG4gICAgc2h1dHRsZShfdGhpcykge1xuICAgICAgbGV0IHNlbGYgPSBfdGhpcyB8fCB0aGlzXG5cbiAgICAgIHNlbGYuJGNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICBpZiAoY2hpbGQuJHJlZnNbdGhpcy5zaHV0dGxlUmVmXSAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgY2hpbGQucGFyZW50ID0gdGhpc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc2h1dHRsZShjaGlsZClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH0sXG4gIG1vdW50ZWQoKSB7XG4gICAgdGhpcy5zaHV0dGxlKClcbiAgfVxufVxuIiwiaW1wb3J0IEZpZWxkIGZyb20gJy4uLy4uL2ZpZWxkJ1xuaW1wb3J0IFNodXR0bGVNaXhpbiBmcm9tICcuLi8uLi8uLi9taXhpbnMvc2h1dHRsZSdcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnc3dDaGVja2JveEdyb3VwJyxcbiAgbWl4aW5zOiBbRmllbGQsIFNodXR0bGVNaXhpbl0sIC8vIGZvY3VzZWQsZGlzYWJsZWQsc2h1dHRsZVJlZlxuICBwcm9wczoge1xuICAgIHZhbHVlOiBCb29sZWFuIHwgQXJyYXlcbiAgfSxcbiAgZGF0YTogKCkgPT4gKHtcbiAgICBpbm5lclBvaW50ZXI6IHRydWUsXG4gICAgc2h1dHRsZVJlZjogJ2NoZWNrYm94J1xuICB9KSxcbiAgY29tcHV0ZWQ6IHt9LFxuICB3YXRjaDoge30sXG4gIG1ldGhvZHM6IHt9XG59IiwiaW1wb3J0IENoZWNrYm94R3JvdXAgZnJvbSAnLi9zcmMvbWFpbi5qcydcblxuY29uc3QgaW5zdGFsbCA9IGZ1bmN0aW9uIChWdWUpIHtcbiAgVnVlLmNvbXBvbmVudChDaGVja2JveEdyb3VwLm5hbWUsIENoZWNrYm94R3JvdXApXG59XG5cbkNoZWNrYm94R3JvdXAuaW5zdGFsbCA9IGluc3RhbGxcblxuZXhwb3J0IGRlZmF1bHQgQ2hlY2tib3hHcm91cFxuIiwiaW1wb3J0IEl0ZW0gZnJvbSAnLi4vLi4vaXRlbSdcbmltcG9ydCB7IGlzRGVlcEVxdWFsIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvaXMnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3N3UmFkaW8nLFxuICBjb21wb25lbnRzOiB7IEl0ZW0gfSxcbiAgcHJvcHM6IHtcbiAgICB2YWx1ZToge30sXG4gICAgdmFsOiB7XG4gICAgICByZXF1aXJlZDogdHJ1ZVxuICAgIH0sXG4gICAgbGFiZWw6IFN0cmluZyxcbiAgICBkaXNhYmxlZDogQm9vbGVhbixcbiAgICBjb2xvcjogU3RyaW5nLFxuICAgIHByaW1hcnk6IEJvb2xlYW4sXG4gICAgbmVnYXRpdmU6IEJvb2xlYW4sXG4gICAgcG9zaXRpdmU6IEJvb2xlYW4sXG4gICAgd2FybmluZzogQm9vbGVhbixcbiAgICBsZWZ0TGFiZWw6IEJvb2xlYW4sXG4gICAgY29sb3JMYWJlbDogQm9vbGVhbixcbiAgICBrZWVwQ29sb3I6IEJvb2xlYW5cbiAgfSxcbiAgZGF0YTogKCkgPT4gKHtcbiAgICBwYXJlbnQ6IHZvaWQgMFxuICB9KSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBtb2RlbCgpIHtcbiAgICAgIHJldHVybiB0aGlzLnBhcmVudCA9PT0gdm9pZCAwID8gdGhpcy52YWx1ZSA6IHRoaXMucGFyZW50LnZhbHVlXG4gICAgfSxcbiAgICBwYXJlbnREaXNhYmxlZCgpIHtcbiAgICAgIHJldHVybiB0aGlzLnBhcmVudCAmJiB0aGlzLnBhcmVudC5kaXNhYmxlZFxuICAgIH0sXG4gICAgY2hlY2tlZDoge1xuICAgICAgZ2V0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDaGVja2VkKHRoaXMudmFsKVxuICAgICAgfSxcbiAgICAgIHNldCgpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzLnBhcmVudCA9PT0gdm9pZCAwID8gdGhpcyA6IHRoaXMucGFyZW50XG5cbiAgICAgICAgc2VsZi4kZW1pdChcbiAgICAgICAgICAnaW5wdXQnLFxuICAgICAgICAgIHRoaXMudmFsXG4gICAgICAgIClcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIHdhdGNoOiB7fSxcbiAgbWV0aG9kczoge1xuICAgIGdldENoZWNrZWQodmFsKSB7XG4gICAgICByZXR1cm4gaXNEZWVwRXF1YWwodGhpcy5tb2RlbCwgdmFsKVxuICAgIH0sXG4gIH0sXG4gIHJlbmRlcihoKSB7XG4gICAgbGV0IGNoZWNrZWQgPSB0aGlzLmNoZWNrZWRcbiAgICBsZXQgY29sb3JMYWJlbCA9IGNoZWNrZWQgJiYgdGhpcy5jb2xvckxhYmVsXG4gICAgbGV0IGNvbG9yUmFkaW8gPSBjaGVja2VkIHx8IHRoaXMua2VlcENvbG9yXG4gICAgbGV0IGdldExhYmVsID0gKCkgPT4gW2goJ2RpdicsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiAnc3ctcmFkaW9fX3RleHQgbWFyZ2luLW1pbicsXG4gICAgICBjbGFzczoge1xuICAgICAgICAnY29sb3ItcHJpbWFyeSc6IGNvbG9yTGFiZWwgPyB0aGlzLnByaW1hcnkgOiB2b2lkIDAsXG4gICAgICAgICdjb2xvci1uZWdhdGl2ZSc6IGNvbG9yTGFiZWwgPyB0aGlzLm5lZ2F0aXZlIDogdm9pZCAwLFxuICAgICAgICAnY29sb3ItcG9zaXRpdmUnOiBjb2xvckxhYmVsID8gdGhpcy5wb3NpdGl2ZSA6IHZvaWQgMCxcbiAgICAgICAgJ2NvbG9yLXdhcm5pbmcnOiBjb2xvckxhYmVsID8gdGhpcy53YXJuaW5nIDogdm9pZCAwXG4gICAgICB9LFxuICAgICAgc3R5bGU6IHtcbiAgICAgICAgY29sb3I6IGNvbG9yTGFiZWwgPyB0aGlzLmNvbG9yIDogdm9pZCAwXG4gICAgICB9XG4gICAgfSwgdGhpcy5sYWJlbCldXG5cbiAgICByZXR1cm4gaCgnc3ctaXRlbScsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiAnc3ctcmFkaW8nLFxuICAgICAgcmVmOiAncmFkaW8nLFxuICAgICAgY2xhc3M6IHtcbiAgICAgICAgZGlzYWJsZTogdGhpcy5kaXNhYmxlZCB8fCB0aGlzLnBhcmVudERpc2FibGVkXG4gICAgICB9LFxuICAgICAgbmF0aXZlT246IHRoaXMuZGlzYWJsZWQgPyB2b2lkIDAgOiB7XG4gICAgICAgIGNsaWNrOiAoKSA9PiB7XG4gICAgICAgICAgaWYgKGNoZWNrZWQpIHsgcmV0dXJuIH1cbiAgICAgICAgICB0aGlzLmNoZWNrZWQgPSB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzY29wZWRTbG90czoge1xuICAgICAgICBiZWZvcmU6IHRoaXMubGFiZWwgJiYgdGhpcy5sZWZ0TGFiZWwgPyBnZXRMYWJlbCA6IHZvaWQgMCxcbiAgICAgICAgZGVmYXVsdDogKCkgPT4gW2goJ3N3LWljb24nLCB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6ICdtYXJnaW4tbWluJyxcbiAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgb3BhY2l0eTogY2hlY2tlZCA/IDEgOiAwLjZcbiAgICAgICAgICB9LFxuICAgICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICBzaXplOiAnMjBweCcsXG4gICAgICAgICAgICBuYW1lOiBjaGVja2VkID8gJ3JhZGlvX2J1dHRvbl9jaGVja2VkJyA6ICdyYWRpb19idXR0b25fdW5jaGVja2VkJyxcbiAgICAgICAgICAgIGNvbG9yOiBjb2xvclJhZGlvID8gdGhpcy5jb2xvciA6IHZvaWQgMCxcbiAgICAgICAgICAgIHByaW1hcnk6IGNvbG9yUmFkaW8gPyB0aGlzLnByaW1hcnkgOiB2b2lkIDAsXG4gICAgICAgICAgICBuZWdhdGl2ZTogY29sb3JSYWRpbyA/IHRoaXMubmVnYXRpdmUgOiB2b2lkIDAsXG4gICAgICAgICAgICBwb3NpdGl2ZTogY29sb3JSYWRpbyA/IHRoaXMucG9zaXRpdmUgOiB2b2lkIDAsXG4gICAgICAgICAgICB3YXJuaW5nOiBjb2xvclJhZGlvID8gdGhpcy53YXJuaW5nIDogdm9pZCAwXG4gICAgICAgICAgfVxuICAgICAgICB9KV0sXG4gICAgICAgIGFmdGVyOiB0aGlzLmxhYmVsICYmICF0aGlzLmxlZnRMYWJlbCA/IGdldExhYmVsIDogdm9pZCAwXG4gICAgICB9XG4gICAgfSlcbiAgfVxufSIsImltcG9ydCBSYWRpbyBmcm9tICcuL3NyYy9tYWluLmpzJ1xuXG5jb25zdCBpbnN0YWxsID0gZnVuY3Rpb24gKFZ1ZSkge1xuICBWdWUuY29tcG9uZW50KFJhZGlvLm5hbWUsIFJhZGlvKVxufVxuXG5SYWRpby5pbnN0YWxsID0gaW5zdGFsbFxuXG5leHBvcnQgZGVmYXVsdCBSYWRpb1xuIiwiaW1wb3J0IEZpZWxkIGZyb20gJy4uLy4uL2ZpZWxkJ1xuaW1wb3J0IFNodXR0bGVNaXhpbiBmcm9tICcuLi8uLi8uLi9taXhpbnMvc2h1dHRsZSdcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnc3dSYWRpb0dyb3VwJyxcbiAgbWl4aW5zOiBbRmllbGQsIFNodXR0bGVNaXhpbl0sIC8vIGZvY3VzZWQsZGlzYWJsZWQsc2h1dHRsZVJlZlxuICBwcm9wczoge1xuICAgIHZhbHVlOiB7XG4gICAgICByZXF1aXJlZDogdHJ1ZVxuICAgIH1cbiAgfSxcbiAgZGF0YTogKCkgPT4gKHtcbiAgICBpbm5lclBvaW50ZXI6IHRydWUsXG4gICAgc2h1dHRsZVJlZjogJ3JhZGlvJ1xuICB9KSxcbiAgY29tcHV0ZWQ6IHt9LFxuICB3YXRjaDoge30sXG4gIG1ldGhvZHM6IHt9XG59IiwiaW1wb3J0IFJhZGlvR3JvdXAgZnJvbSAnLi9zcmMvbWFpbi5qcydcblxuY29uc3QgaW5zdGFsbCA9IGZ1bmN0aW9uIChWdWUpIHtcbiAgVnVlLmNvbXBvbmVudChSYWRpb0dyb3VwLm5hbWUsIFJhZGlvR3JvdXApXG59XG5cblJhZGlvR3JvdXAuaW5zdGFsbCA9IGluc3RhbGxcblxuZXhwb3J0IGRlZmF1bHQgUmFkaW9Hcm91cFxuIiwiLyoqXG4gKlxuICpcbiAqIEBwYXJhbSB7Kn0gdG90YWwgIOWIhumhteaAu+aVsFxuICogQHBhcmFtIHsqfSBjdXIgIOW9k+WJjemhtemdoiAgM1xuICogQHBhcmFtIHsqfSBhcm91bmQgICAxIDIgMyA0IDUgICBhcm91bmQgPSAyXG4gKiBAcmV0dXJuc1xuICovXG5jb25zdCBtYWtlUmVzdWx0ID0gKHRvdGFsLGN1cixhcm91bmQpID0+IHtcbiAgbGV0IHJlc3VsdCA9IFtdO1xuICBsZXQgYmFzZUNvdW50ID0gYXJvdW5kICogMiArIDEgKyAyICsgMiArIDI7IC8v5oC75YWx5YWD57Sg5Liq5pWwXG4gIGxldCBzdXJwbHVzID0gYmFzZUNvdW50IC0gNDsgLy/lj6rlh7rnjrDkuIDkuKrnnIHnlaXlj7cg5Ymp5L2Z5YWD57Sg5Liq5pWwXG4gIGxldCBzdGFydFBvc2l0aW9uID0gMSArIDIgKyBhcm91bmQsZW5kUG9zaXRpb24gPSB0b3RhbCAtIDIgLSBhcm91bmQ7XG5cbiAgaWYodG90YWwgPD0gYmFzZUNvdW50IC0gMil7IC8v5YWo6YOo5pi+56S6IOS4jeWHuueOsOecgeeVpeWPt1xuICAgICAgcmVzdWx0ID0gIEFycmF5LmZyb20oe2xlbmd0aDogdG90YWx9LCAodiwgaSkgPT4gaSArIDEpO1xuICB9ZWxzZXsgLy/pnIDopoHlh7rnjrDnnIHnlaXlj7dcbiAgICAgIGlmKGN1ciA8PSBzdGFydFBvc2l0aW9uKXsgLy8xLuWPquacieWQjumdouWHuueOsOecgeeVpeWPt1xuICAgICAgICAgIHJlc3VsdCA9IFsuLi5BcnJheS5mcm9tKHtsZW5ndGg6IHN1cnBsdXN9LCAodiwgaSkgPT4gaSArIDEpLFwiwrfCt8K3XCIsdG90YWxdXG4gICAgICB9ZWxzZSBpZihjdXIgPj0gZW5kUG9zaXRpb24pIHsgLy8yLuWPquacieWJjei+ueWHuueOsOecgeeVpeWPt1xuICAgICAgICAgIHJlc3VsdCA9IFsxLCfCt8K3wrcnLC4uLkFycmF5LmZyb20oe2xlbmd0aDogc3VycGx1c30sICh2LCBpKSA9PiB0b3RhbCAtIHN1cnBsdXMgKyBpICsgMSldXG4gICAgICB9ZWxzZXsgLy8zLuS4pOi+uemDveacieecgeeVpeWPt1xuICAgICAgICAgIHJlc3VsdCA9IFsxLCfCt8K3wrcnLC4uLkFycmF5LmZyb20oe2xlbmd0aDogYXJvdW5kICogMiArIDF9LCAodiwgaSkgPT4gY3VyIC0gYXJvdW5kICsgaSksJ8K3wrfCtycsdG90YWxdXG4gICAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0XG59XG5cbmV4cG9ydCBkZWZhdWx0IG1ha2VSZXN1bHQiLCI8dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJzdy1wYWdpbmF0aW9uXCI+XG4gICAgPGRpdiBjbGFzcz1cInN3LXBhZ2luYXRpb24tdG90YWxcIiB2LWlmPVwibGF5b3V0LmluZGV4T2YoJ3RvdGFsJykgPiAtMVwiPiBcbiAgICAgIHt7YOWFsSR7dG90YWx95p2hYH19XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInN3LXBhZ2luYXRpb24tc2VsZWN0XCIgdi1pZj1cImxheW91dC5pbmRleE9mKCdzZWxlY3QnKSA+IC0xXCI+XG4gICAgICA8c3ctc2VsZWN0IHYtbW9kZWw9XCJwYWdlU2l6ZVZhbHVlXCIgOm9wdGlvbnM9XCJzZWxlY3RPcHRpb25cIiBzZWxlY3RlZEZpbGxlZCBib3JkZXJlZCBtaW5pIHNlbGVjdGVkU3R5bGU9XCJub25lXCI+PC9zdy1zZWxlY3Q+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInN3LXBhZ2luYXRpb24tcGFnZVwiPlxuICAgICAgPHNwYW4gY2xhc3M9XCJzdy1wYWdpbmF0aW9uLXBhZ2UtaXRlbVwiIEBjbGljaz1cImhhbmRsZUNsaWNrQXJyb3coJ2xlZnQnKVwiPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgc3ctcGFnaW5hdGlvbi1wYWdlLWl0ZW0taWNvblwiPmtleWJvYXJkX2Fycm93X2xlZnQ8L2k+PC9zcGFuPlxuICAgICAgPHNwYW4gdi1mb3I9XCIoaXRlbSwgaW5kZXgpIGluIHBhZ2luYXRpb25MaXN0XCIgOmNsYXNzPVwiWydzdy1wYWdpbmF0aW9uLXBhZ2UtaXRlbScsIGN1cnJlbnRQYWdlVmFsdWUgPT09IGl0ZW0gPyAnYWN0aXZlJyA6ICcnXVwiIEBjbGljaz1cImhhbmRsZUNsaWNrUGFnZShpdGVtLCBpbmRleClcIj5cbiAgICAgICAgPGkgdi1pZj1cIml0ZW0gPT09ICfCt8K3wrcnXCIgY2xhc3M9XCJtYXRlcmlhbC1pY29ucyBzdy1wYWdpbmF0aW9uLXBhZ2UtaXRlbS1pY29uXCI+bW9yZV9ob3JpejwvaT5cbiAgICAgICAgPHNwYW4gdi1lbHNlPlxuICAgICAgICAgIHt7aXRlbX19XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwic3ctcGFnaW5hdGlvbi1wYWdlLWl0ZW1cIiBAY2xpY2s9XCJoYW5kbGVDbGlja0Fycm93KCdyaWdodCcpXCI+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29ucyBzdy1wYWdpbmF0aW9uLXBhZ2UtaXRlbS1pY29uXCI+a2V5Ym9hcmRfYXJyb3dfcmlnaHQ8L2k+PC9zcGFuPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJzdy1wYWdpbmF0aW9uLWdvdG9cIiB2LWlmPVwibGF5b3V0LmluZGV4T2YoJ2dvdG8nKSA+IC0xXCI+XG4gICAgICA8c3Bhbj7liY3lvoA8L3NwYW4+XG4gICAgICA8ZGl2IGNsYXNzPVwic3ctcGFnaW5hdGlvbi1nb3RvLWlucHV0XCI+XG4gICAgICAgIDxzdy1pbnB1dCBib3JkZXJlZCB2LW1vZGVsPSdpbnB1dFZhbHVlJyBAa2V5dXAuZW50ZXIubmF0aXZlPVwiaGFuZGxlRW50ZXJHb3RvXCIgbWluaSBzdHlsZT1cIndpZHRoOjQwcHhcIj48L3N3LWlucHV0PlxuICAgICAgPC9kaXY+XG4gICAgICA8c3Bhbj7pobU8L3NwYW4+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCBzd1NlbGVjdCBmcm9tICcuLi8uLi9zZWxlY3QvaW5kZXgnXG5pbXBvcnQgbWFrZVJlc3VsdCBmcm9tICcuL3BhZ2luYXRpb24nXG5pbXBvcnQgc3dJbnB1dCBmcm9tICcuLi8uLi9pbnB1dC9pbmRleCdcbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3N3UGFnaW5hdGlvbicsXG4gIGRhdGEgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjdXJyZW50UGFnZVZhbHVlOiB0aGlzLmN1cnJlbnRQYWdlLFxuICAgICAgcGFnZVRvdGFsOiAnJyxcbiAgICAgIHBhZ2VTaXplVmFsdWU6IHRoaXMucGFnZVNpemUsXG4gICAgICBpbnB1dFZhbHVlOiAnMSdcbiAgICB9XG4gIH0sXG4gIHByb3BzOiB7XG4gICAgdG90YWw6IHtcbiAgICAgIHR5cGU6IE51bWJlclxuICAgIH0sXG4gICAgcGFnZVNpemU6IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIGRlZmF1bHQ6IDIwXG4gICAgfSxcbiAgICBvcHRpb25zOiB7XG4gICAgICB0eXBlOiBBcnJheSxcbiAgICAgIGRlZmF1bHQ6IFsyMCwgNDAsIDYwLCA4MF1cbiAgICB9LFxuICAgIGN1cnJlbnRQYWdlOiB7XG4gICAgICB0eXBlOiBOdW1iZXJcbiAgICB9LFxuICAgIGFyb3VuZDoge1xuICAgICAgdHlwZTogTnVtYmVyXG4gICAgfSxcbiAgICBsYXlvdXQ6IHtcbiAgICAgIHR5cGU6IFN0cmluZ1xuICAgIH1cbiAgfSxcbiAgd2F0Y2g6IHtcbiAgICBjdXJyZW50UGFnZVZhbHVlKCkge1xuICAgICAgdGhpcy4kZW1pdCgnY3VycmVudC1jaGFuZ2UnLCB0aGlzLmN1cnJlbnRQYWdlVmFsdWUpXG4gICAgfSxcbiAgICBwYWdlU2l6ZVZhbHVlKCkge1xuICAgICAgdGhpcy4kZW1pdCgnc2l6ZS1jaGFuZ2UnLCB0aGlzLnBhZ2VTaXplVmFsdWUpXG4gICAgfVxuICB9LFxuICBjb21wdXRlZDoge1xuICAgIHNlbGVjdE9wdGlvbigpIHtcbiAgICAgIGxldCBhcnkgPSBbXVxuICAgICAgdGhpcy5vcHRpb25zLm1hcChpPT57XG4gICAgICAgIGxldCBpdGVtID0ge31cbiAgICAgICAgaXRlbS5uYW1lID0gYCR7aX3mnaEv6aG1YFxuICAgICAgICBpdGVtLnZhbHVlID0gaVxuICAgICAgICBhcnkucHVzaChpdGVtKVxuICAgICAgfSlcbiAgICAgIHJldHVybiBhcnlcbiAgICB9LFxuICAgIHBhZ2luYXRpb25MaXN0KCkge1xuICAgICAgbGV0IHBhZ2VUb3RhbCA9IHRoaXMucGFnZVRvdGFsID0gdGhpcy50b3RhbCAvIHRoaXMucGFnZVNpemVWYWx1ZVxuICAgICAgaWYgKGAke3BhZ2VUb3RhbH1gLmluZGV4T2YoJy4nKSA+IC0xKSB7XG4gICAgICAgIHBhZ2VUb3RhbCA9IHRoaXMucGFnZVRvdGFsID0gcGFyc2VJbnQocGFnZVRvdGFsICsgMSlcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmN1cnJlbnRQYWdlVmFsdWUgPiBwYWdlVG90YWwpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50UGFnZVZhbHVlID0gcGFnZVRvdGFsXG4gICAgICB9XG4gICAgICBsZXQgcGFnZUxpc3QgPSBtYWtlUmVzdWx0KHBhZ2VUb3RhbCwgdGhpcy5jdXJyZW50UGFnZVZhbHVlLCB0aGlzLmFyb3VuZClcbiAgICAgIHJldHVybiBwYWdlTGlzdFxuICAgIH1cbiAgfSxcbiAgY29tcG9uZW50czoge1xuICAgIHN3U2VsZWN0LFxuICAgIHN3SW5wdXRcbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGhhbmRsZUVudGVyR290bygpIHtcbiAgICAgIGxldCBwYWdlID0gcGFyc2VJbnQodGhpcy5pbnB1dFZhbHVlKVxuICAgICAgaWYgKHBhZ2UgPCAxKSB7XG4gICAgICAgIHRoaXMuaW5wdXRWYWx1ZSA9ICcxJ1xuICAgICAgfVxuICAgICAgaWYgKHBhZ2UgPiB0aGlzLnBhZ2VUb3RhbCkge1xuICAgICAgICB0aGlzLmlucHV0VmFsdWUgPSBgJHt0aGlzLnBhZ2VUb3RhbH1gXG4gICAgICB9XG4gICAgICB0aGlzLmN1cnJlbnRQYWdlVmFsdWUgPSBwYXJzZUludCh0aGlzLmlucHV0VmFsdWUpXG4gICAgICB0aGlzLmlucHV0VmFsdWUgPSBgJHtwYXJzZUludCh0aGlzLmlucHV0VmFsdWUpfWBcbiAgICB9LFxuICAgIGhhbmRsZUNsaWNrUGFnZShpdGVtLCBpbmRleCl7XG4gICAgICBpZiAoaXRlbSA9PT0gJ8K3wrfCtycpIHtcbiAgICAgICAgaWYoaW5kZXggPT09IDEpe1xuICAgICAgICAgIHRoaXMuY3VycmVudFBhZ2VWYWx1ZSA9IDNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRQYWdlVmFsdWUgPSB0aGlzLnBhZ2VUb3RhbCAtIDJcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jdXJyZW50UGFnZVZhbHVlID0gaXRlbVxuICAgICAgfVxuICAgIH0sXG4gICAgaGFuZGxlQ2xpY2tBcnJvdyhwYXJhbXMpIHtcbiAgICAgIGlmIChwYXJhbXMgPT09ICdsZWZ0Jykge1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50UGFnZVZhbHVlICE9PSAxKSB7XG4gICAgICAgICAgdGhpcy5jdXJyZW50UGFnZVZhbHVlID0gdGhpcy5jdXJyZW50UGFnZVZhbHVlIC0gMVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRQYWdlVmFsdWUgPSAxXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRQYWdlVmFsdWUgIT09IHRoaXMucGFnZVRvdGFsKSB7XG4gICAgICAgICAgdGhpcy5jdXJyZW50UGFnZVZhbHVlID0gdGhpcy5jdXJyZW50UGFnZVZhbHVlICsgMVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY3VycmVudFBhZ2VWYWx1ZSA9IHRoaXMucGFnZVRvdGFsXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48c3R5bGU+XG5cbjwvc3R5bGU+XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZUNvbXBvbmVudCh0ZW1wbGF0ZSwgc3R5bGUsIHNjcmlwdCwgc2NvcGVJZCwgaXNGdW5jdGlvbmFsVGVtcGxhdGUsIG1vZHVsZUlkZW50aWZpZXJcbi8qIHNlcnZlciBvbmx5ICovXG4sIHNoYWRvd01vZGUsIGNyZWF0ZUluamVjdG9yLCBjcmVhdGVJbmplY3RvclNTUiwgY3JlYXRlSW5qZWN0b3JTaGFkb3cpIHtcbiAgaWYgKHR5cGVvZiBzaGFkb3dNb2RlICE9PSAnYm9vbGVhbicpIHtcbiAgICBjcmVhdGVJbmplY3RvclNTUiA9IGNyZWF0ZUluamVjdG9yO1xuICAgIGNyZWF0ZUluamVjdG9yID0gc2hhZG93TW9kZTtcbiAgICBzaGFkb3dNb2RlID0gZmFsc2U7XG4gIH0gLy8gVnVlLmV4dGVuZCBjb25zdHJ1Y3RvciBleHBvcnQgaW50ZXJvcC5cblxuXG4gIHZhciBvcHRpb25zID0gdHlwZW9mIHNjcmlwdCA9PT0gJ2Z1bmN0aW9uJyA/IHNjcmlwdC5vcHRpb25zIDogc2NyaXB0OyAvLyByZW5kZXIgZnVuY3Rpb25zXG5cbiAgaWYgKHRlbXBsYXRlICYmIHRlbXBsYXRlLnJlbmRlcikge1xuICAgIG9wdGlvbnMucmVuZGVyID0gdGVtcGxhdGUucmVuZGVyO1xuICAgIG9wdGlvbnMuc3RhdGljUmVuZGVyRm5zID0gdGVtcGxhdGUuc3RhdGljUmVuZGVyRm5zO1xuICAgIG9wdGlvbnMuX2NvbXBpbGVkID0gdHJ1ZTsgLy8gZnVuY3Rpb25hbCB0ZW1wbGF0ZVxuXG4gICAgaWYgKGlzRnVuY3Rpb25hbFRlbXBsYXRlKSB7XG4gICAgICBvcHRpb25zLmZ1bmN0aW9uYWwgPSB0cnVlO1xuICAgIH1cbiAgfSAvLyBzY29wZWRJZFxuXG5cbiAgaWYgKHNjb3BlSWQpIHtcbiAgICBvcHRpb25zLl9zY29wZUlkID0gc2NvcGVJZDtcbiAgfVxuXG4gIHZhciBob29rO1xuXG4gIGlmIChtb2R1bGVJZGVudGlmaWVyKSB7XG4gICAgLy8gc2VydmVyIGJ1aWxkXG4gICAgaG9vayA9IGZ1bmN0aW9uIGhvb2soY29udGV4dCkge1xuICAgICAgLy8gMi4zIGluamVjdGlvblxuICAgICAgY29udGV4dCA9IGNvbnRleHQgfHwgLy8gY2FjaGVkIGNhbGxcbiAgICAgIHRoaXMuJHZub2RlICYmIHRoaXMuJHZub2RlLnNzckNvbnRleHQgfHwgLy8gc3RhdGVmdWxcbiAgICAgIHRoaXMucGFyZW50ICYmIHRoaXMucGFyZW50LiR2bm9kZSAmJiB0aGlzLnBhcmVudC4kdm5vZGUuc3NyQ29udGV4dDsgLy8gZnVuY3Rpb25hbFxuICAgICAgLy8gMi4yIHdpdGggcnVuSW5OZXdDb250ZXh0OiB0cnVlXG5cbiAgICAgIGlmICghY29udGV4dCAmJiB0eXBlb2YgX19WVUVfU1NSX0NPTlRFWFRfXyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgY29udGV4dCA9IF9fVlVFX1NTUl9DT05URVhUX187XG4gICAgICB9IC8vIGluamVjdCBjb21wb25lbnQgc3R5bGVzXG5cblxuICAgICAgaWYgKHN0eWxlKSB7XG4gICAgICAgIHN0eWxlLmNhbGwodGhpcywgY3JlYXRlSW5qZWN0b3JTU1IoY29udGV4dCkpO1xuICAgICAgfSAvLyByZWdpc3RlciBjb21wb25lbnQgbW9kdWxlIGlkZW50aWZpZXIgZm9yIGFzeW5jIGNodW5rIGluZmVyZW5jZVxuXG5cbiAgICAgIGlmIChjb250ZXh0ICYmIGNvbnRleHQuX3JlZ2lzdGVyZWRDb21wb25lbnRzKSB7XG4gICAgICAgIGNvbnRleHQuX3JlZ2lzdGVyZWRDb21wb25lbnRzLmFkZChtb2R1bGVJZGVudGlmaWVyKTtcbiAgICAgIH1cbiAgICB9OyAvLyB1c2VkIGJ5IHNzciBpbiBjYXNlIGNvbXBvbmVudCBpcyBjYWNoZWQgYW5kIGJlZm9yZUNyZWF0ZVxuICAgIC8vIG5ldmVyIGdldHMgY2FsbGVkXG5cblxuICAgIG9wdGlvbnMuX3NzclJlZ2lzdGVyID0gaG9vaztcbiAgfSBlbHNlIGlmIChzdHlsZSkge1xuICAgIGhvb2sgPSBzaGFkb3dNb2RlID8gZnVuY3Rpb24gKCkge1xuICAgICAgc3R5bGUuY2FsbCh0aGlzLCBjcmVhdGVJbmplY3RvclNoYWRvdyh0aGlzLiRyb290LiRvcHRpb25zLnNoYWRvd1Jvb3QpKTtcbiAgICB9IDogZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICAgIHN0eWxlLmNhbGwodGhpcywgY3JlYXRlSW5qZWN0b3IoY29udGV4dCkpO1xuICAgIH07XG4gIH1cblxuICBpZiAoaG9vaykge1xuICAgIGlmIChvcHRpb25zLmZ1bmN0aW9uYWwpIHtcbiAgICAgIC8vIHJlZ2lzdGVyIGZvciBmdW5jdGlvbmFsIGNvbXBvbmVudCBpbiB2dWUgZmlsZVxuICAgICAgdmFyIG9yaWdpbmFsUmVuZGVyID0gb3B0aW9ucy5yZW5kZXI7XG5cbiAgICAgIG9wdGlvbnMucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyV2l0aFN0eWxlSW5qZWN0aW9uKGgsIGNvbnRleHQpIHtcbiAgICAgICAgaG9vay5jYWxsKGNvbnRleHQpO1xuICAgICAgICByZXR1cm4gb3JpZ2luYWxSZW5kZXIoaCwgY29udGV4dCk7XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBpbmplY3QgY29tcG9uZW50IHJlZ2lzdHJhdGlvbiBhcyBiZWZvcmVDcmVhdGUgaG9va1xuICAgICAgdmFyIGV4aXN0aW5nID0gb3B0aW9ucy5iZWZvcmVDcmVhdGU7XG4gICAgICBvcHRpb25zLmJlZm9yZUNyZWF0ZSA9IGV4aXN0aW5nID8gW10uY29uY2F0KGV4aXN0aW5nLCBob29rKSA6IFtob29rXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc2NyaXB0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5vcm1hbGl6ZUNvbXBvbmVudDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW5vcm1hbGl6ZS1jb21wb25lbnQuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBpc09sZElFID0gdHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgL21zaWUgWzYtOV1cXFxcYi8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpO1xuZnVuY3Rpb24gY3JlYXRlSW5qZWN0b3IoY29udGV4dCkge1xuICByZXR1cm4gZnVuY3Rpb24gKGlkLCBzdHlsZSkge1xuICAgIHJldHVybiBhZGRTdHlsZShpZCwgc3R5bGUpO1xuICB9O1xufVxudmFyIEhFQUQgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG52YXIgc3R5bGVzID0ge307XG5cbmZ1bmN0aW9uIGFkZFN0eWxlKGlkLCBjc3MpIHtcbiAgdmFyIGdyb3VwID0gaXNPbGRJRSA/IGNzcy5tZWRpYSB8fCAnZGVmYXVsdCcgOiBpZDtcbiAgdmFyIHN0eWxlID0gc3R5bGVzW2dyb3VwXSB8fCAoc3R5bGVzW2dyb3VwXSA9IHtcbiAgICBpZHM6IG5ldyBTZXQoKSxcbiAgICBzdHlsZXM6IFtdXG4gIH0pO1xuXG4gIGlmICghc3R5bGUuaWRzLmhhcyhpZCkpIHtcbiAgICBzdHlsZS5pZHMuYWRkKGlkKTtcbiAgICB2YXIgY29kZSA9IGNzcy5zb3VyY2U7XG5cbiAgICBpZiAoY3NzLm1hcCkge1xuICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIuY2hyb21lLmNvbS9kZXZ0b29scy9kb2NzL2phdmFzY3JpcHQtZGVidWdnaW5nXG4gICAgICAvLyB0aGlzIG1ha2VzIHNvdXJjZSBtYXBzIGluc2lkZSBzdHlsZSB0YWdzIHdvcmsgcHJvcGVybHkgaW4gQ2hyb21lXG4gICAgICBjb2RlICs9ICdcXG4vKiMgc291cmNlVVJMPScgKyBjc3MubWFwLnNvdXJjZXNbMF0gKyAnICovJzsgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcblxuICAgICAgY29kZSArPSAnXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCwnICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzLm1hcCkpKSkgKyAnICovJztcbiAgICB9XG5cbiAgICBpZiAoIXN0eWxlLmVsZW1lbnQpIHtcbiAgICAgIHN0eWxlLmVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgc3R5bGUuZWxlbWVudC50eXBlID0gJ3RleHQvY3NzJztcbiAgICAgIGlmIChjc3MubWVkaWEpIHN0eWxlLmVsZW1lbnQuc2V0QXR0cmlidXRlKCdtZWRpYScsIGNzcy5tZWRpYSk7XG4gICAgICBIRUFELmFwcGVuZENoaWxkKHN0eWxlLmVsZW1lbnQpO1xuICAgIH1cblxuICAgIGlmICgnc3R5bGVTaGVldCcgaW4gc3R5bGUuZWxlbWVudCkge1xuICAgICAgc3R5bGUuc3R5bGVzLnB1c2goY29kZSk7XG4gICAgICBzdHlsZS5lbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IHN0eWxlLnN0eWxlcy5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBpbmRleCA9IHN0eWxlLmlkcy5zaXplIC0gMTtcbiAgICAgIHZhciB0ZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNvZGUpO1xuICAgICAgdmFyIG5vZGVzID0gc3R5bGUuZWxlbWVudC5jaGlsZE5vZGVzO1xuICAgICAgaWYgKG5vZGVzW2luZGV4XSkgc3R5bGUuZWxlbWVudC5yZW1vdmVDaGlsZChub2Rlc1tpbmRleF0pO1xuICAgICAgaWYgKG5vZGVzLmxlbmd0aCkgc3R5bGUuZWxlbWVudC5pbnNlcnRCZWZvcmUodGV4dE5vZGUsIG5vZGVzW2luZGV4XSk7ZWxzZSBzdHlsZS5lbGVtZW50LmFwcGVuZENoaWxkKHRleHROb2RlKTtcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVJbmplY3Rvcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJyb3dzZXIuanMubWFwXG4iLCJpbXBvcnQgUGFnaW5hdGlvbiBmcm9tICcuL3NyYy9tYWluLnZ1ZSdcblxuY29uc3QgaW5zdGFsbCA9IGZ1bmN0aW9uIChWdWUpIHtcbiAgVnVlLmNvbXBvbmVudChQYWdpbmF0aW9uLm5hbWUsIFBhZ2luYXRpb24pXG59XG5cblBhZ2luYXRpb24uaW5zdGFsbCA9IGluc3RhbGxcblxuZXhwb3J0IGRlZmF1bHQgUGFnaW5hdGlvblxuIiwiXG5leHBvcnQgZGVmYXVsdCB7XG4gIGRhdGE6ICgpID0+ICh7XG4gICAgb2JzZXJ2ZXI6IHZvaWQgMCxcbiAgICBtZWFzdXJlZFdpZHRoOiB2b2lkIDBcbiAgfSksXG4gIGNvbXB1dGVkOiB7XG4gICAgdGFyZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuaG9yaXpvbnRhbCA/ICd3aWR0aCcgOiAnaGVpZ2h0J1xuICAgIH0sXG4gICAgbWVhc3VyZVRhcmdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmhvcml6b250YWwgPyAnb2Zmc2V0V2lkdGgnIDogJ29mZnNldEhlaWdodCdcbiAgICB9LFxuICAgIG1pblNpemUoKSB7XG4gICAgICByZXR1cm4gdGhpcy5taW4gIT09IHZvaWQgMCA/IGAke3RoaXMubWlufXB4YCA6IDBcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBpbml0U3R5bGUoKSB7XG4gICAgICBpZiAodGhpcy5pbm5lckNvbGxhcHNlZCkge1xuICAgICAgICB0aGlzLiRyZWZzLnNsaWRlLnN0eWxlW3RoaXMudGFyZ2V0XSA9IHRoaXMubWluU2l6ZVxuICAgICAgfVxuICAgIH0sXG4gICAgc2V0U3R5bGUocGFzc2l2ZSkge1xuICAgICAgbGV0IHNsaWRlVGFyZ2V0ID0gdGhpcy4kcmVmcy5zbGlkZVxuXG4gICAgICBpZiAocGFzc2l2ZSkge1xuICAgICAgICBpZiAoc2xpZGVUYXJnZXQuc3R5bGVbdGhpcy50YXJnZXRdICYmICF0aGlzLmlubmVyQ29sbGFwc2VkKSB7XG4gICAgICAgICAgc2xpZGVUYXJnZXQuc3R5bGVbdGhpcy50YXJnZXRdID0gbnVsbFxuICAgICAgICB9XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgc2xpZGVUYXJnZXQuc3R5bGVbdGhpcy50YXJnZXRdID0gYCR7dGhpcy4kcmVmcy5vYnNlcnZlW3RoaXMubWVhc3VyZVRhcmdldF19cHhgXG4gICAgICBpZiAodGhpcy5pbm5lckNvbGxhcHNlZCkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBzbGlkZVRhcmdldC5zdHlsZVt0aGlzLnRhcmdldF0gPSB0aGlzLm1pblNpemVcbiAgICAgICAgfSwgMClcbiAgICAgIH1cbiAgICB9LFxuICAgIGNsZWFyVXBwZXJTdHlsZSh1cHBlcikge1xuICAgICAgbGV0IHVwcGVyU2xpZGVUYXJnZXQgPSB1cHBlci4kcmVmcy5zbGlkZVxuXG4gICAgICBpZiAodXBwZXJTbGlkZVRhcmdldCkge1xuICAgICAgICBpZiAodXBwZXJTbGlkZVRhcmdldC5zdHlsZVt0aGlzLnRhcmdldF0pIHtcbiAgICAgICAgICB1cHBlclNsaWRlVGFyZ2V0LnN0eWxlW3RoaXMudGFyZ2V0XSA9IG51bGxcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHVwcGVyLiRwYXJlbnQgJiYgdXBwZXIuJHBhcmVudC4kcmVmcykge1xuICAgICAgICB0aGlzLmNsZWFyVXBwZXJTdHlsZSh1cHBlci4kcGFyZW50KVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgbW91bnRlZCgpIHtcbiAgICBpZiAoIXRoaXMuJHJlZnMuc2xpZGUgfHwgIXRoaXMuJHJlZnMub2JzZXJ2ZSkgeyByZXR1cm4gfVxuICAgIHRoaXMuJHdhdGNoKFxuICAgICAgJ2lubmVyQ29sbGFwc2VkJyxcbiAgICAgICgpID0+IHtcbiAgICAgICAgdGhpcy5jbGVhclVwcGVyU3R5bGUodGhpcy4kcGFyZW50KVxuICAgICAgICB0aGlzLnNldFN0eWxlKClcbiAgICAgIH0pXG4gICAgdGhpcy5pbml0U3R5bGUoKVxuICAgIHRoaXMub2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgICB0aGlzLnNldFN0eWxlKHRydWUpXG4gICAgfSlcblxuICAgIHRoaXMub2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLiRyZWZzLm9ic2VydmUsIHtcbiAgICAgIGF0dHJpYnV0ZXM6IHRydWUsXG4gICAgICBhdHRyaWJ1dGVGaWx0ZXI6IFsnbXV0YXRlJ10sXG4gICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgICAgY2hhcmFjdGVyRGF0YTogdHJ1ZVxuICAgIH0pXG4gIH0sXG4gIGJlZm9yZURlc3Ryb3koKSB7XG4gICAgdGhpcy5vYnNlcnZlciAmJiB0aGlzLm9ic2VydmVyLmRpc2Nvbm5lY3QoKVxuICB9XG59XG4gICIsImltcG9ydCBTbGlkZU9ic2VydmVyIGZyb20gJy4uLy4uLy4uL21peGlucy9zbGlkZU9ic2VydmVyJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdzd1NsaWRlJyxcbiAgbWl4aW5zOiBbU2xpZGVPYnNlcnZlcl0sXG4gIHByb3BzOiB7XG4gICAgY29sbGFwc2VkOiBCb29sZWFuLFxuICAgIGhvcml6b250YWw6IEJvb2xlYW4sXG4gICAgZml0OiBCb29sZWFuLFxuICAgIG1pbjogTnVtYmVyIHwgU3RyaW5nLFxuICAgIHNoYWRvdzogQm9vbGVhblxuICB9LFxuICBkYXRhOiAoKSA9PiAoe1xuICAgIGlubmVyQ29sbGFwc2VkOiB0cnVlXG4gIH0pLFxuICB3YXRjaDoge1xuICAgIGNvbGxhcHNlZDoge1xuICAgICAgaGFuZGxlcigpIHtcbiAgICAgICAgdGhpcy5pbm5lckNvbGxhcHNlZCA9IHRoaXMuY29sbGFwc2VkXG4gICAgICB9LFxuICAgICAgaW1tZWRpYXRlOiB0cnVlXG4gICAgfVxuICB9LFxuICByZW5kZXIoaCkge1xuICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICByZWY6ICdzbGlkZScsXG4gICAgICBzdGF0aWNDbGFzczogJ3N3LXNsaWRlX19jb250YWluZXInLFxuICAgICAgY2xhc3M6IHtcbiAgICAgICAgc2hhZG93OiB0aGlzLnNoYWRvd1xuICAgICAgfVxuICAgIH0sIFtcbiAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgcmVmOiAnb2JzZXJ2ZScsXG4gICAgICAgIHN0YXRpY0NsYXNzOiBgc3ctc2xpZGVfX2NvbnRlbnRgLFxuICAgICAgICBjbGFzczoge1xuICAgICAgICAgICdtaW4td2lkdGgnOiB0aGlzLmhvcml6b250YWwgJiYgIXRoaXMuZml0LFxuICAgICAgICAgICdmaXQtd2lkdGgnOiB0aGlzLmhvcml6b250YWwgJiYgdGhpcy5maXQsXG4gICAgICAgICAgJ21pbi1oZWlnaHQnOiAhdGhpcy5ob3Jpem9udGFsICYmICF0aGlzLmZpdCxcbiAgICAgICAgICAnZml0LWhlaWdodCc6ICF0aGlzLmhvcml6b250YWwgJiYgdGhpcy5maXRcbiAgICAgICAgfVxuICAgICAgfSwgW3RoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQoKV0pXG4gICAgXSlcbiAgfVxufSIsImltcG9ydCBTbGlkZSBmcm9tICcuL3NyYy9tYWluLmpzJ1xuXG5jb25zdCBpbnN0YWxsID0gZnVuY3Rpb24gKFZ1ZSkge1xuICBWdWUuY29tcG9uZW50KFNsaWRlLm5hbWUsIFNsaWRlKVxufVxuXG5TbGlkZS5pbnN0YWxsID0gaW5zdGFsbFxuXG5leHBvcnQgZGVmYXVsdCBTbGlkZVxuIiwiaW1wb3J0IFZ1ZSBmcm9tICd2dWUnXG5pbXBvcnQgU2xpZGUgZnJvbSAnLi4vLi4vc2xpZGUnXG5pbXBvcnQgeyBpc1N0cmluZ0NvbnRhaW4gfSBmcm9tICcuLi8uLi8uLi91dGlscy9pcydcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnc3dCYXNpY0l0ZW0nLFxuICBjb21wb25lbnRzOiB7IFNsaWRlIH0sXG4gIHByb3BzOiB7XG4gICAgY29udGVudDogU3RyaW5nLFxuICAgIHN1YkNvbnRlbnQ6IFN0cmluZyxcbiAgICBpY29uOiBTdHJpbmcsXG4gICAgZGlzYWJsZWQ6IEJvb2xlYW4sXG4gICAgY29sb3I6IFN0cmluZyxcbiAgICBwcmltYXJ5OiBCb29sZWFuLFxuICAgIG5lZ2F0aXZlOiBCb29sZWFuLFxuICAgIHBvc2l0aXZlOiBCb29sZWFuLFxuICAgIHdhcm5pbmc6IEJvb2xlYW4sXG4gICAgY29sbGFwc2VkOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgIH0sXG4gICAgdG86IFN0cmluZyB8IE9iamVjdCxcbiAgICBpbmRlbnRMZXZlbDogTnVtYmVyIHwgU3RyaW5nLFxuICAgIG1hc2s6IE9iamVjdCB8IEJvb2xlYW4sXG4gICAgcmlwcGxlOiBPYmplY3QgfCBCb29sZWFuLFxuICAgIHN1YjogQXJyYXksXG4gICAgYWN0aXZlOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICB9LFxuICAgIGNhbGxiYWNrOiBGdW5jdGlvbixcbiAgICBzdWJGaWx0ZXI6IFN0cmluZyxcbiAgICBmaWxsZWQ6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiB2b2lkIDBcbiAgICB9LFxuICAgIHNoYWRvdzoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IHZvaWQgMFxuICAgIH0sXG4gICAgc3BsaXQ6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiB2b2lkIDBcbiAgICB9LFxuICAgIG1pbmk6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiB2b2lkIDBcbiAgICB9LFxuICAgIGNlbnRlcjoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IHZvaWQgMFxuICAgIH0sXG4gICAgZW5kOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogdm9pZCAwXG4gICAgfVxuICB9LFxuICBkYXRhOiAoKSA9PiAoe1xuICAgIGNvbGxhcHNlZEJlZm9yZTogdHJ1ZSxcbiAgICBtb3VzZW92ZXI6IGZhbHNlLFxuICAgIGhpZGU6IGZhbHNlLFxuICAgIGV2ZW50T3JpZ2luOiBmYWxzZSxcbiAgICBldmVudEh1Yjogdm9pZCAwXG4gIH0pLFxuICBjb21wdXRlZDoge1xuICAgIGhhc0JlZm9yZSgpIHtcbiAgICAgIHJldHVybiB0aGlzLiRzY29wZWRTbG90cy5iZWZvcmUgIT09IHZvaWQgMCB8fCB0aGlzLmljb24gIT09IHZvaWQgMFxuICAgIH0sXG4gICAgaGFzQ29udGVudCgpIHtcbiAgICAgIHJldHVybiB0aGlzLiRzY29wZWRTbG90cy5jb250ZW50ICE9PSB2b2lkIDAgfHwgdGhpcy5jb250ZW50ICE9PSB2b2lkIDAgfHwgdGhpcy5zdWJDb250ZW50ICE9PSB2b2lkIDBcbiAgICB9LFxuICAgIGhhc1N1YigpIHtcbiAgICAgIHJldHVybiB0aGlzLiRzY29wZWRTbG90cy5kZWZhdWx0ICE9PSB2b2lkIDAgfHwgdGhpcy5zdWIgIT09IHZvaWQgMFxuICAgIH0sXG4gICAgaGFzQWN0aW9uKCkge1xuICAgICAgcmV0dXJuICF0aGlzLmRpc2FibGVkICYmICh0aGlzLnRvICE9PSB2b2lkIDAgfHwgdGhpcy5jYWxsYmFjayAhPT0gdm9pZCAwIHx8IHRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQgfHwgdGhpcy5zdWIgIT09IHZvaWQgMClcbiAgICB9LFxuICAgIGlubmVyQ2VudGVyKCkge1xuICAgICAgcmV0dXJuIHRoaXMuY2VudGVyICE9PSB2b2lkIDAgPyB0aGlzLmNlbnRlciA6IHRoaXMucm9vdFBhcmFtcy5jZW50ZXJcbiAgICB9LFxuICAgIGlubmVyRW5kKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZW5kICE9PSB2b2lkIDAgPyB0aGlzLmVuZCA6IHRoaXMucm9vdFBhcmFtcy5lbmRcbiAgICB9LFxuICAgIGlubmVyRmlsbGVkKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZmlsbGVkICE9PSB2b2lkIDAgPyB0aGlzLmZpbGxlZCA6IHRoaXMucm9vdFBhcmFtcy5maWxsZWRcbiAgICB9LFxuICAgIGlubmVyU3BsaXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5zcGxpdCAhPT0gdm9pZCAwID8gdGhpcy5zcGxpdCA6IHRoaXMucm9vdFBhcmFtcy5zcGxpdFxuICAgIH0sXG4gICAgaW5uZXJNaW5pKCkge1xuICAgICAgcmV0dXJuIHRoaXMubWluaSAhPT0gdm9pZCAwID8gdGhpcy5taW5pIDogdGhpcy5yb290UGFyYW1zLm1pbmlcbiAgICB9LFxuICAgIGlubmVyU2hhZG93KCkge1xuICAgICAgcmV0dXJuIHRoaXMuc2hhZG93ICE9PSB2b2lkIDAgPyB0aGlzLnNoYWRvdyA6IHRoaXMucm9vdFBhcmFtcy5zaGFkb3dcbiAgICB9LFxuICAgIGlubmVyTWFzaygpIHtcbiAgICAgIHJldHVybiB0aGlzLm1hc2sgIT09IHZvaWQgMCA/IHRoaXMubWFzayA6IHRoaXMucm9vdFBhcmFtcy5tYXNrXG4gICAgfSxcbiAgICBpbm5lclJpcHBsZSgpIHtcbiAgICAgIHJldHVybiB0aGlzLnJpcHBsZSAhPT0gdm9pZCAwID8gdGhpcy5yaXBwbGUgOiB0aGlzLnJvb3RQYXJhbXMucmlwcGxlXG4gICAgfSxcbiAgICBpbm5lckluZGVudExldmVsKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaW5kZW50TGV2ZWwgfHwgdGhpcy5yb290UGFyYW1zLmluZGVudExldmVsXG4gICAgfSxcbiAgICBpbm5lckNhbGxiYWNrKCkge1xuICAgICAgcmV0dXJuIHRoaXMuY2FsbGJhY2sgfHwgdGhpcy5yb290UGFyYW1zLmNhbGxiYWNrXG4gICAgfSxcbiAgICBpbm5lclN1YkZpbHRlcigpIHtcbiAgICAgIHJldHVybiB0aGlzLnJvb3QgPT09IHZvaWQgMCA/IHRoaXMuc3ViRmlsdGVyIDogdGhpcy5yb290LnN1YkZpbHRlclxuICAgIH0sXG4gICAgaW5uZXJFdmVudEh1YigpIHtcbiAgICAgIHJldHVybiB0aGlzLmV2ZW50SHViIHx8IHRoaXMucm9vdC5ldmVudEh1YlxuICAgIH0sXG4gICAgcm9vdFBhcmFtcygpIHtcbiAgICAgIHJldHVybiB0aGlzLnJvb3QgfHwge31cbiAgICB9LFxuICAgIG1pbkhlaWdodCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmlubmVyTWluaSA/ICczNnB4JyA6ICc0OHB4J1xuICAgIH1cbiAgfSxcbiAgaW5qZWN0OiB7XG4gICAgcm9vdDoge1xuICAgICAgZGVmYXVsdCgpIHtcbiAgICAgICAgcmV0dXJuIHZvaWQgMFxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgcHJvdmlkZSgpIHtcbiAgICByZXR1cm4gdGhpcy5yb290ID09PSB2b2lkIDAgPyB7XG4gICAgICByb290OiB0aGlzXG4gICAgfSA6IHZvaWQgMFxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgc3ViRmlsdGVyQ2hhbmdlKHJlc3RvcmUsIHJlbWVtYmVyKSB7XG4gICAgICBjb25zdCBpc1N1YkNvbnRhaW4gPSBzdWIgPT4ge1xuICAgICAgICBsZXQgY29udGFpbiA9IGZhbHNlXG4gIFxuICAgICAgICBjb250YWluID0gc3ViLnNvbWUoeCA9PiB7XG4gICAgICAgICAgaWYgKHguc3ViKSB7XG4gICAgICAgICAgICByZXR1cm4gaXNTdWJDb250YWluKHguc3ViKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gaXNTdHJpbmdDb250YWluKHguY29udGVudCwgdGhpcy5pbm5lclN1YkZpbHRlcilcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiBjb250YWluXG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLnN1YiA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHRoaXMuaGlkZSA9ICFpc1N0cmluZ0NvbnRhaW4odGhpcy5jb250ZW50LCB0aGlzLmlubmVyU3ViRmlsdGVyKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHJlc3RvcmUpIHtcbiAgICAgICAgICB0aGlzLiRlbWl0KCd1cGRhdGU6Y29sbGFwc2VkJywgdGhpcy5jb2xsYXBzZWRCZWZvcmUpXG4gICAgICAgICAgdGhpcy5oaWRlID0gZmFsc2VcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBpZiAocmVtZW1iZXIpIHtcbiAgICAgICAgICB0aGlzLmNvbGxhcHNlZEJlZm9yZSA9IHRoaXMuY29sbGFwc2VkXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy4kZW1pdCgndXBkYXRlOmNvbGxhcHNlZCcsIGZhbHNlKVxuICAgICAgICB0aGlzLmhpZGUgPSB0aGlzLnJvb3QgIT09IHZvaWQgMCAmJiAhaXNTdWJDb250YWluKHRoaXMuc3ViKVxuICAgICAgfVxuICAgIH0sXG4gICAgaW5pdEV2ZW50SHViKCkge1xuICAgICAgaWYgKHRoaXMucm9vdCA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHRoaXMuZXZlbnRIdWIgPSBuZXcgVnVlKClcbiAgICAgIH1cbiAgICAgIHRoaXMuaW5uZXJFdmVudEh1Yi4kb24oJ2NoYW5nZTphY3RpdmUnLCAoKSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5ldmVudE9yaWdpbikge1xuICAgICAgICAgIHRoaXMuJGVtaXQoJ3VwZGF0ZTphY3RpdmUnLCBmYWxzZSlcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmV2ZW50T3JpZ2luID0gZmFsc2VcbiAgICAgIH0pXG4gICAgfSxcbiAgICBlbWl0QWN0aXZlKCkge1xuICAgICAgdGhpcy5ldmVudE9yaWdpbiA9IHRydWVcbiAgICAgIHRoaXMuJGVtaXQoJ3VwZGF0ZTphY3RpdmUnLCB0cnVlKVxuICAgICAgdGhpcy5pbm5lckV2ZW50SHViLiRlbWl0KCdjaGFuZ2U6YWN0aXZlJylcbiAgICB9XG4gIH0sXG4gIGNyZWF0ZWQoKSB7XG4gICAgdGhpcy5pbml0RXZlbnRIdWIoKVxuICAgIGlmICh0aGlzLmNvbnRlbnQgIT09IHZvaWQgMCAmJiB0aGlzLmlubmVyU3ViRmlsdGVyICE9PSB2b2lkIDApIHtcbiAgICAgIHRoaXMuJHdhdGNoKCdpbm5lclN1YkZpbHRlcicsICh2LCBvdikgPT4ge1xuICAgICAgICBpZiAodiAhPT0gJycgfHwgb3YgIT09IHZvaWQgMCkge1xuICAgICAgICAgIHRoaXMuc3ViRmlsdGVyQ2hhbmdlKHYgPT09ICcnLCBvdiA9PT0gJycpXG4gICAgICAgIH1cbiAgICAgIH0sIHsgaW1tZWRpYXRlOiB0cnVlIH0pXG4gICAgfVxuICB9LFxuICByZW5kZXIoaCkge1xuICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICBzdGF0aWNDbGFzczogJ3N3LWJhc2ljLWl0ZW0nLFxuICAgICAgYXR0cnM6IHtcbiAgICAgICAgbXV0YXRlOiB0aGlzLmhpZGVcbiAgICAgIH0sXG4gICAgICBjbGFzczoge1xuICAgICAgICBzcGxpdDogdGhpcy5pbm5lclNwbGl0ICYmICF0aGlzLmNvbGxhcHNlZCxcbiAgICAgICAgaGlkZTogdGhpcy5oaWRlXG4gICAgICB9XG4gICAgfSwgW1xuICAgICAgaCgnZGl2Jywge1xuICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWJhc2ljLWl0ZW1fX21haW4nLFxuICAgICAgICBjbGFzczogdGhpcy5kaXNhYmxlZCA/ICdkaXNhYmxlJyA6IHRoaXMuaW5uZXJGaWxsZWQgPyB7XG4gICAgICAgICAgJ2JnLXByaW1hcnknOiB0aGlzLnByaW1hcnksXG4gICAgICAgICAgJ2JnLW5lZ2F0aXZlJzogdGhpcy5uZWdhdGl2ZSxcbiAgICAgICAgICAnYmctcG9zaXRpdmUnOiB0aGlzLnBvc2l0aXZlLFxuICAgICAgICAgICdiZy13YXJuaW5nJzogdGhpcy53YXJuaW5nLFxuICAgICAgICAgICdiZy1kYXJrIGNvbG9yLXdoaXRlJzogdHJ1ZVxuICAgICAgICB9IDoge1xuICAgICAgICAgICdjb2xvci1wcmltYXJ5JzogdGhpcy5wcmltYXJ5LFxuICAgICAgICAgICdjb2xvci1uZWdhdGl2ZSc6IHRoaXMubmVnYXRpdmUsXG4gICAgICAgICAgJ2NvbG9yLXBvc2l0aXZlJzogdGhpcy5wb3NpdGl2ZSxcbiAgICAgICAgICAnY29sb3Itd2FybmluZyc6IHRoaXMud2FybmluZ1xuICAgICAgICB9LFxuICAgICAgICBzdHlsZTogdGhpcy5kaXNhYmxlZCA/IHZvaWQgMCA6IHRoaXMuaW5uZXJGaWxsZWQgPyB7XG4gICAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiB0aGlzLmNvbG9yXG4gICAgICAgIH0gOiB7XG4gICAgICAgICAgY29sb3I6IHRoaXMuY29sb3JcbiAgICAgICAgfVxuICAgICAgfSwgW1xuICAgICAgICBoKCdzdy1pdGVtJywge1xuICAgICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctYmFzaWMtaXRlbV9faW5uZXInLFxuICAgICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICB0bzogdGhpcy5pbm5lckNhbGxiYWNrID8gdm9pZCAwIDogdGhpcy50byxcbiAgICAgICAgICAgIGNlbnRlcjogdGhpcy5pbm5lckNlbnRlcixcbiAgICAgICAgICAgIGVuZDogdGhpcy5pbm5lckVuZCxcbiAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLmRpc2FibGVkLFxuICAgICAgICAgICAgbWFzazogdGhpcy5pbm5lck1hc2ssXG4gICAgICAgICAgICByaXBwbGU6IHRoaXMuaW5uZXJSaXBwbGUsXG4gICAgICAgICAgICBhY3RpdmU6IHRoaXMuYWN0aXZlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjbGFzczoge1xuICAgICAgICAgICAgZXhwYW5kOiAhdGhpcy5jb2xsYXBzZWRcbiAgICAgICAgICB9LFxuICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAnbWluLWhlaWdodCc6IHRoaXMubWluSGVpZ2h0LFxuICAgICAgICAgICAgJ3BhZGRpbmctbGVmdCc6IGAke3RoaXMuaW5uZXJJbmRlbnRMZXZlbCAqIDEyfXB4YCxcbiAgICAgICAgICAgIGN1cnNvcjogdGhpcy5oYXNBY3Rpb24gPyAncG9pbnRlcicgOiB2b2lkIDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uOiB0aGlzLmRpc2FibGVkID8gdm9pZCAwIDoge1xuICAgICAgICAgICAgLi4udGhpcy4kbGlzdGVuZXJzLFxuICAgICAgICAgICAgY2xpY2s6ICgpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuaGFzU3ViKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgndXBkYXRlOmNvbGxhcHNlZCcsICF0aGlzLmNvbGxhcHNlZClcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXRBY3RpdmUoKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoaXMuaW5uZXJDYWxsYmFjayAmJiB0aGlzLmlubmVyQ2FsbGJhY2sodGhpcylcbiAgICAgICAgICAgICAgdGhpcy4kZW1pdCgnY2xpY2snKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1vdXNlb3ZlcjogKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLm1vdXNlb3ZlciA9IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtb3VzZW91dDogKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLm1vdXNlb3ZlciA9IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBzY29wZWRTbG90czoge1xuICAgICAgICAgICAgYmVmb3JlOiAoKSA9PiBbaCgnZGl2Jywge1xuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogJ2ZsZXggaXRlbXMtY2VudGVyJyxcbiAgICAgICAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAgICAgICAnc3BhY2UtcmlnaHQnOiB0aGlzLmhhc0JlZm9yZVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCB0aGlzLiRzY29wZWRTbG90cy5iZWZvcmUgIT09IHZvaWQgMCA/IFt0aGlzLiRzY29wZWRTbG90cy5iZWZvcmUoKV1cbiAgICAgICAgICAgICAgOiB0aGlzLmljb24gIT09IHZvaWQgMCA/IFtoKCdzdy1pY29uJywge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctYmFzaWMtaXRlbV9faWNvbicsXG4gICAgICAgICAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMuaWNvblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSldIDogdm9pZCAwKV0sXG4gIFxuICAgICAgICAgICAgZGVmYXVsdDogKCkgPT4gW2goJ2RpdicsIHtcbiAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1iYXNpYy1pdGVtX19jb250ZW50IGZsZXggaXRlbXMtY2VudGVyJyxcbiAgICAgICAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAgICAgICAnc3BhY2UtcmlnaHQnOiB0aGlzLmhhc0NvbnRlbnRcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgdGhpcy4kc2NvcGVkU2xvdHMuY29udGVudCAhPT0gdm9pZCAwID8gW3RoaXMuJHNjb3BlZFNsb3RzLmNvbnRlbnQoKV0gOiBbXG4gICAgICAgICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogJ2RlZmF1bHQtY29udGVudCdcbiAgICAgICAgICAgICAgfSwgW1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudCAhPT0gdm9pZCAwID8gaCgnZGl2Jywge1xuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1iYXNpYy1pdGVtX19sYWJlbCdcbiAgICAgICAgICAgICAgICB9LCB0aGlzLmNvbnRlbnQpIDogdm9pZCAwLFxuICAgICAgICAgICAgICAgIHRoaXMuc3ViQ29udGVudCAhPT0gdm9pZCAwID8gaCgnZGl2Jywge1xuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1iYXNpYy1pdGVtX19zdWJsYWJlbCdcbiAgICAgICAgICAgICAgICB9LCB0aGlzLnN1YkNvbnRlbnQpIDogdm9pZCAwXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICBdXG4gICAgICAgICAgICApXSxcbiAgXG4gICAgICAgICAgICBhZnRlcjogKCkgPT4gW2goJ2RpdicsIHtcbiAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6ICdmbGV4IGl0ZW1zLWNlbnRlcidcbiAgICAgICAgICAgIH0sIHRoaXMuJHNjb3BlZFNsb3RzLmFmdGVyICE9PSB2b2lkIDAgPyBbdGhpcy4kc2NvcGVkU2xvdHMuYWZ0ZXIoKV1cbiAgICAgICAgICAgICAgOiB0aGlzLmhhc1N1YiA/IFtoKCdzdy1pY29uJywge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctYmFzaWMtaXRlbV9fZXhwYW5zaW9uIGNvbG9yLWdyZXknLFxuICAgICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICF0aGlzLmNvbGxhcHNlZCA/ICdyb3RhdGUoMTgwZGVnKScgOiB2b2lkIDAsXG4gICAgICAgICAgICAgICAgICBjb2xvcjogdGhpcy5tb3VzZW92ZXIgPyAnY3VycmVudENvbG9yJyA6IHZvaWQgMFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgICAgICAgIG5hbWU6ICdrZXlib2FyZF9hcnJvd19kb3duJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSldIDogdm9pZCAwKV1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICBdKSxcbiAgICAgIHRoaXMuaGFzU3ViID8gaChTbGlkZSwge1xuICAgICAgICBwcm9wczoge1xuICAgICAgICAgIGNvbGxhcHNlZDogdGhpcy5jb2xsYXBzZWQsXG4gICAgICAgICAgc2hhZG93OiB0aGlzLmlubmVyU2hhZG93XG4gICAgICAgIH0sXG4gICAgICAgIHNjb3BlZFNsb3RzOiB7XG4gICAgICAgICAgZGVmYXVsdDogKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHN1YiA9IHRoaXMuc3ViICE9PSB2b2lkIDAgPyB0aGlzLnN1Yi5tYXAocHJvcHMgPT4gaCgnc3ctYmFzaWMtaXRlbScsIHtcbiAgICAgICAgICAgICAgcHJvcHM6IHByb3BzLFxuICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICd1cGRhdGU6Y29sbGFwc2VkJzogdiA9PiB7XG4gICAgICAgICAgICAgICAgICBwcm9wcy5jb2xsYXBzZWQgPSB2XG4gICAgICAgICAgICAgICAgICB0aGlzLiRmb3JjZVVwZGF0ZSgpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAndXBkYXRlOmFjdGl2ZSc6IHYgPT4ge1xuICAgICAgICAgICAgICAgICAgcHJvcHMuYWN0aXZlID0gdlxuICAgICAgICAgICAgICAgICAgdGhpcy4kZm9yY2VVcGRhdGUoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpIDogW11cblxuICAgICAgICAgICAgc3ViLnVuc2hpZnQodGhpcy4kc2NvcGVkU2xvdHMuZGVmYXVsdCA/IHRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQoKSA6IHZvaWQgMClcbiAgICAgICAgICAgIHJldHVybiBzdWJcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pIDogdm9pZCAwXG4gICAgXSlcbiAgfVxufSIsImltcG9ydCBCYXNpY0l0ZW0gZnJvbSAnLi9zcmMvbWFpbi5qcydcblxuY29uc3QgaW5zdGFsbCA9IGZ1bmN0aW9uIChWdWUpIHtcbiAgVnVlLmNvbXBvbmVudChCYXNpY0l0ZW0ubmFtZSwgQmFzaWNJdGVtKVxufVxuXG5CYXNpY0l0ZW0uaW5zdGFsbCA9IGluc3RhbGxcblxuZXhwb3J0IGRlZmF1bHQgQmFzaWNJdGVtXG4iLCJleHBvcnQgZnVuY3Rpb24gaGFzT3duKG9iaiwga2V5KSB7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KTtcbn07XG5leHBvcnQgZnVuY3Rpb24gaXNWTm9kZShub2RlKSB7XG4gIHJldHVybiBub2RlICE9PSBudWxsICYmIHR5cGVvZiBub2RlID09PSAnb2JqZWN0JyAmJiBoYXNPd24obm9kZSwgJ2NvbXBvbmVudE9wdGlvbnMnKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRGaXJzdENvbXBvbmVudENoaWxkKGNoaWxkcmVuKSB7XG4gIHJldHVybiBjaGlsZHJlbiAmJiBjaGlsZHJlbi5maWx0ZXIoYyA9PiBjICYmIGMudGFnKVswXTtcbn07IiwiLy8gPHRlbXBsYXRlPlxuLy8gICA8ZGl2PlxuLy8gICAgIDxidXR0b24gQGNsaWNrPVwiaGFuZGxlQnRuXCI+Y2xpY2s8L2J1dHRvbj5cbi8vICAgICA8dHJhbnNpdGlvbiBuYW1lPSdzdy1ub3RpZmljYXRpb24tZmFkZSc+XG4vLyAgICAgICA8ZGl2IHYtaWY9XCJzaG93XCIgY2xhc3M9XCJzdy1ub3RpZmljYXRpb25cIj5cbi8vICAgICAgICAgPGgyIGNsYXNzPVwidGl0bGVcIj5cbi8vICAgICAgICAgICDmj5DnpLoxMTExXG4vLyAgICAgICAgIDwvaDI+XG4vLyAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250ZW50XCI+XG4vLyAgICAgICAgICAg6L+Z5piv5LiA5p2h5raI5oGvXG4vLyAgICAgICAgIDwvZGl2PlxuLy8gICAgICAgICA8ZGl2IGNsYXNzPVwiY2xvc2VcIiBAY2xpY2s9XCJoYW5kbGVCdG5cIj5cbi8vICAgICAgICAgICA8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+Y2xvc2U8L2k+XG4vLyAgICAgICAgIDwvZGl2PlxuLy8gICAgICAgPC9kaXY+XG4vLyAgICAgPC90cmFuc2l0aW9uPlxuLy8gICA8L2Rpdj5cbi8vIDwvdGVtcGxhdGU+XG5pbXBvcnQgVm5vZGUsIHsgaXNWTm9kZSB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL3Zkb20nXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdzd05vdGlmaWNhdGlvbicsXG4gIGRhdGEgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzaG93OiBmYWxzZSxcbiAgICAgIHZlcnRpY2FsT2Zmc2V0OiAwLFxuICAgICAgb25DbG9zZTogbnVsbCxcbiAgICAgIHBvc2l0aW9uOiAndG9wLXJpZ2h0JyxcbiAgICAgIHRpdGxlOiAnJyxcbiAgICAgIGNvbnRlbnQ6ICcnLFxuICAgICAgc2xvdDogbnVsbCxcbiAgICAgIGJhY2tncm91bmQ6ICcjZmZmJyxcbiAgICAgIGNsb3NlQ29sb3I6ICcjOTA5Mzk5J1xuICAgIH1cbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGhhbmRsZUJ0bigpIHtcbiAgICAgIHRoaXMuc2hvdyA9IGZhbHNlXG4gICAgICBpZiAodHlwZW9mIHRoaXMub25DbG9zZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLm9uQ2xvc2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGNvbXB1dGVkOiB7XG4gICAgdmVydGljYWxQcm9wZXJ0eSgpIHtcbiAgICAgIHJldHVybiAvXnRvcC0vLnRlc3QodGhpcy5wb3NpdGlvbikgPyAndG9wJyA6ICdib3R0b20nO1xuICAgIH0sXG5cbiAgICBwb3NpdGlvblN0eWxlKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgW3RoaXMudmVydGljYWxQcm9wZXJ0eV06IGAkeyB0aGlzLnZlcnRpY2FsT2Zmc2V0IH1weGAsXG4gICAgICB9O1xuICAgIH0sXG4gICAgZ2V0Vm5vZGUoKSB7XG4gICAgICBpZiAoaXNWTm9kZSh0aGlzLnNsb3QpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNsb3RcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1BsZWFzZSBjaGVjayB5b3VyIFZub2RlIHdyaXRpbmcnKVxuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gIH0sXG4gIHJlbmRlcihoKSB7XG4gICByZXR1cm4gaCgndHJhbnNpdGlvbicse1xuICAgICAgYXR0cnM6IHtcbiAgICAgICAgbmFtZTogJ3N3LW5vdGlmaWNhdGlvbi1mYWRlJ1xuICAgICAgfVxuICAgIH0sIFt0aGlzLnNob3cgPyBoKCdkaXYnLCB7XG4gICAgICAgICAgICBjbGFzczogJ3N3LW5vdGlmaWNhdGlvbicsXG4gICAgICAgICAgICBzdHlsZTogT2JqZWN0LmFzc2lnbih0aGlzLnBvc2l0aW9uU3R5bGUsIHsgYmFja2dyb3VuZDogdGhpcy5iYWNrZ3JvdW5kIH0pXG4gICAgICAgICAgfSwgW1xuICAgICAgICAgICAgdGhpcy5nZXRWbm9kZSA/ICcnIDogaCgnaDInLCB7XG4gICAgICAgICAgICAgIGNsYXNzOiAndGl0bGUnXG4gICAgICAgICAgICB9LCB0aGlzLnRpdGxlKSxcbiAgICAgICAgICAgIHRoaXMuZ2V0Vm5vZGUgPyB0aGlzLmdldFZub2RlIDogaCgnZGl2Jywge1xuICAgICAgICAgICAgICBjbGFzczogJ2NvbnRlbnQnXG4gICAgICAgICAgICB9LHRoaXMuY29udGVudCksXG4gICAgICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgICAgIGNsYXNzOiAnY2xvc2UnLFxuICAgICAgICAgICAgICBzdHlsZTogeyBjb2xvcjogdGhpcy5jbG9zZUNvbG9yIH0sXG4gICAgICAgICAgICB9LCBbaCgnZGl2Jywge1xuICAgICAgICAgICAgICAgICAgY2xhc3M6ICdtYXRlcmlhbC1pY29ucycsXG4gICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICBjbGljazogKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUJ0bigpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCAnY2xvc2UnKV0pXG4gICAgICAgICAgXSlcbiAgICBcbiAgICAgICAgOiB2b2lkIDBdIClcbiAgfVxufVxuXG4iLCJpbXBvcnQgVnVlIGZyb20gJ3Z1ZSc7XG5pbXBvcnQgTm90aWZpY2F0aW9uIGZyb20gJy4vbWFpbi5qcyc7XG5cbmNvbnN0IE5vdGlmaWNhdGlvbkNvbnN0cnVjdG9yID0gVnVlLmV4dGVuZChOb3RpZmljYXRpb24pXG5cbmxldCBpbnN0YW5jZTtcbmxldCBpbnN0YW5jZXMgPSBbXVxubGV0IHNlZWQgPSAxXG5jb25zdCBOb3RpZmljYXRpb25GdW4gPSBmdW5jdGlvbihvcHRpb25zKXtcbiAgaWYgKFZ1ZS5wcm90b3R5cGUuJGlzU2VydmVyKSByZXR1cm47XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBjb25zdCB1c2VyT25DbG9zZSA9IG9wdGlvbnMub25DbG9zZTtcbiAgY29uc3QgaWQgPSAnbm90aWZpY2F0aW9uXycgKyBzZWVkKys7XG4gIGNvbnN0IHBvc2l0aW9uID0gb3B0aW9ucy5wb3NpdGlvbiB8fCAndG9wLXJpZ2h0JztcbiAgb3B0aW9ucy5vbkNsb3NlID0gZnVuY3Rpb24oKSB7XG4gICAgTm90aWZpY2F0aW9uLmNsb3NlKGlkLCB1c2VyT25DbG9zZSlcbiAgfVxuICBpbnN0YW5jZSA9IG5ldyBOb3RpZmljYXRpb25Db25zdHJ1Y3Rvcih7XG4gICAgZGF0YTogb3B0aW9uc1xuICB9KVxuICBpbnN0YW5jZS5pZCA9IGlkXG4gIGluc3RhbmNlLiRtb3VudCgpO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGluc3RhbmNlLiRlbCk7XG4gIGluc3RhbmNlLnNob3cgPSB0cnVlXG4gIGxldCB2ZXJ0aWNhbE9mZnNldCA9IDBcbiAgaW5zdGFuY2VzLmZpbHRlcihpdGVtID0+IGl0ZW0ucG9zaXRpb24gPT09IHBvc2l0aW9uKS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgIHZlcnRpY2FsT2Zmc2V0ICs9IGVsZW1lbnQuJGVsLm9mZnNldEhlaWdodCArIDE2XG4gIH0pO1xuICB2ZXJ0aWNhbE9mZnNldCArPSAxNlxuICBpbnN0YW5jZS52ZXJ0aWNhbE9mZnNldCA9IHZlcnRpY2FsT2Zmc2V0XG4gIGluc3RhbmNlcy5wdXNoKGluc3RhbmNlKVxuICBjb25zb2xlLmxvZygpXG4gIHJldHVybiBpbnN0YW5jZTtcbn0gXG5Ob3RpZmljYXRpb24uY2xvc2UgPSBmdW5jdGlvbihpZCwgdXNlck9uQ2xvc2UpIHtcbiAgbGV0IGluZGV4ID0gLTFcbiAgY29uc3QgbGVuID0gaW5zdGFuY2VzLmxlbmd0aFxuICBjb25zdCBpbnN0YW5jZSA9IGluc3RhbmNlcy5maWx0ZXIoKGluc3RhbmNlLCBpKSA9PiB7XG4gICAgaWYgKGluc3RhbmNlLmlkID09PSBpZCkge1xuICAgICAgaW5kZXggPSBpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfSlbMF1cbiAgaWYgKCFpbnN0YW5jZSkgcmV0dXJuXG5cbiAgaWYgKHR5cGVvZiB1c2VyT25DbG9zZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHVzZXJPbkNsb3NlKGluc3RhbmNlKTtcbiAgfVxuICBpbnN0YW5jZXMuc3BsaWNlKGluZGV4LCAxKVxuXG4gIGlmIChsZW4gPD0gMSkgcmV0dXJuXG5cbiAgY29uc3QgcG9zaXRpb24gPSBpbnN0YW5jZS5wb3NpdGlvbjtcbiAgY29uc3QgcmVtb3ZlZEhlaWdodCA9IGluc3RhbmNlLiRlbC5vZmZzZXRIZWlnaHRcbiAgZm9yIChsZXQgaSA9IGluZGV4OyBpIDwgbGVuIC0gMTsgaSsrKXtcbiAgICBpZiAoaW5zdGFuY2VzW2ldLnBvc2l0aW9uID09PSBwb3NpdGlvbikge1xuICAgICAgaW5zdGFuY2VzW2ldLiRlbC5zdHlsZVtpbnN0YW5jZS52ZXJ0aWNhbFByb3BlcnR5XSA9IHBhcnNlSW50KGluc3RhbmNlc1tpXS4kZWwuc3R5bGVbaW5zdGFuY2UudmVydGljYWxQcm9wZXJ0eV0sIDEwKSAtIHJlbW92ZWRIZWlnaHQgLSAxNiArICdweCdcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTm90aWZpY2F0aW9uRnVuIiwiaW1wb3J0IFNsaWRlIGZyb20gJy4uLy4uL3NsaWRlJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdzd0xheW91dCcsXG4gIGNvbXBvbmVudHM6IHsgU2xpZGUgfSxcbiAgcHJvcHM6IHtcbiAgICBjb2xsYXBzZVRvcDogQm9vbGVhbixcbiAgICBjb2xsYXBzZUxlZnQ6IEJvb2xlYW4sXG4gICAgY29sbGFwc2VSaWdodDogQm9vbGVhbixcbiAgICBjb2xsYXBzZUJvdHRvbTogQm9vbGVhbixcbiAgICBmaXRUb3A6IEJvb2xlYW4sXG4gICAgZml0TGVmdDogQm9vbGVhbixcbiAgICBmaXRSaWdodDogQm9vbGVhbixcbiAgICBmaXRCb3R0b206IEJvb2xlYW4sXG4gICAgdG9wTWluOiBOdW1iZXIgfCBTdHJpbmcsXG4gICAgbGVmdE1pbjogTnVtYmVyIHwgU3RyaW5nLFxuICAgIHJpZ2h0TWluOiBOdW1iZXIgfCBTdHJpbmcsXG4gICAgYm90dG9tTWluOiBOdW1iZXIgfCBTdHJpbmcsXG4gICAgc2hhZG93OiBCb29sZWFuXG4gIH0sXG4gIGRhdGE6ICgpID0+ICh7fSksXG4gIGNvbXB1dGVkOiB7XG4gICAgdmVydGljYWxTdHJldGNoKCkge1xuICAgICAgcmV0dXJuIHRoaXMuJHNjb3BlZFNsb3RzLnRvcCAhPT0gdm9pZCAwIHx8IHRoaXMuJHNjb3BlZFNsb3RzLmJvdHRvbSAhPT0gdm9pZCAwXG4gICAgfVxuICB9LFxuICByZW5kZXIoaCkge1xuICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICBzdGF0aWNDbGFzczogJ3N3LWxheW91dCBmbGV4IG5vLXdyYXAnLFxuICAgICAgY2xhc3M6IHtcbiAgICAgICAgc2hhZG93OiB0aGlzLnNoYWRvd1xuICAgICAgfSxcbiAgICAgIHN0eWxlOiB7XG4gICAgICAgICdmbGV4LWRpcmVjdGlvbic6IHRoaXMudmVydGljYWxTdHJldGNoICYmICdjb2x1bW4nXG4gICAgICB9XG4gICAgfSwgW1xuICAgICAgdGhpcy4kc2NvcGVkU2xvdHMudG9wICE9PSB2b2lkIDAgPyBoKFNsaWRlLCB7XG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgY29sbGFwc2VkOiB0aGlzLmNvbGxhcHNlVG9wLFxuICAgICAgICAgIGZpdDogdGhpcy5maXRUb3AsXG4gICAgICAgICAgbWluOiB0aGlzLnRvcE1pblxuICAgICAgICB9LFxuICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWxheW91dF9fYXJvdW5kJyxcbiAgICAgICAgc2NvcGVkU2xvdHM6IHtcbiAgICAgICAgICBkZWZhdWx0OiB0aGlzLiRzY29wZWRTbG90cy50b3BcbiAgICAgICAgfVxuICAgICAgfSkgOiB2b2lkIDAsXG5cbiAgICAgICF0aGlzLnZlcnRpY2FsU3RyZXRjaCAmJiB0aGlzLiRzY29wZWRTbG90cy5sZWZ0ICE9PSB2b2lkIDAgPyBoKFNsaWRlLCB7XG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgY29sbGFwc2VkOiB0aGlzLmNvbGxhcHNlTGVmdCxcbiAgICAgICAgICBob3Jpem9udGFsOiB0cnVlLFxuICAgICAgICAgIGZpdDogdGhpcy5maXRMZWZ0LFxuICAgICAgICAgIG1pbjogdGhpcy5sZWZ0TWluXG4gICAgICAgIH0sXG4gICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctbGF5b3V0X19hcm91bmQnLFxuICAgICAgICBzY29wZWRTbG90czoge1xuICAgICAgICAgIGRlZmF1bHQ6IHRoaXMuJHNjb3BlZFNsb3RzLmxlZnRcbiAgICAgICAgfVxuICAgICAgfSkgOiB2b2lkIDAsXG5cbiAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgcmVmOiAnbGF5b3V0TWFpbicsXG4gICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctbGF5b3V0X19tYWluJyxcbiAgICAgIH0sIFtbdGhpcy4kc2NvcGVkU2xvdHMuZGVmYXVsdCAhPT0gdm9pZCAwXG4gICAgICAgID8gdGhpcy4kc2NvcGVkU2xvdHMuZGVmYXVsdCgpIDogdm9pZCAwXV0pLFxuXG4gICAgICAhdGhpcy52ZXJ0aWNhbFN0cmV0Y2ggJiYgdGhpcy4kc2NvcGVkU2xvdHMucmlnaHQgIT09IHZvaWQgMCA/IGgoU2xpZGUsIHtcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICBjb2xsYXBzZWQ6IHRoaXMuY29sbGFwc2VSaWdodCxcbiAgICAgICAgICBob3Jpem9udGFsOiB0cnVlLFxuICAgICAgICAgIGZpdDogdGhpcy5maXRSaWdodCxcbiAgICAgICAgICBtaW46IHRoaXMucmlnaHRNaW5cbiAgICAgICAgfSxcbiAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1sYXlvdXRfX2Fyb3VuZCcsXG4gICAgICAgIHNjb3BlZFNsb3RzOiB7XG4gICAgICAgICAgZGVmYXVsdDogdGhpcy4kc2NvcGVkU2xvdHMucmlnaHRcbiAgICAgICAgfVxuICAgICAgfSkgOiB2b2lkIDAsXG5cbiAgICAgIHRoaXMuJHNjb3BlZFNsb3RzLmJvdHRvbSAhPT0gdm9pZCAwID8gaChTbGlkZSwge1xuICAgICAgICBwcm9wczoge1xuICAgICAgICAgIGNvbGxhcHNlZDogdGhpcy5jb2xsYXBzZUJvdHRvbSxcbiAgICAgICAgICBmaXQ6IHRoaXMuZml0Qm90dG9tLFxuICAgICAgICAgIG1pbjogdGhpcy5ib3R0b21NaW5cbiAgICAgICAgfSxcbiAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1sYXlvdXRfX2Fyb3VuZCcsXG4gICAgICAgIHNjb3BlZFNsb3RzOiB7XG4gICAgICAgICAgZGVmYXVsdDogdGhpcy4kc2NvcGVkU2xvdHMuYm90dG9tXG4gICAgICAgIH1cbiAgICAgIH0pIDogdm9pZCAwXG4gICAgXSlcbiAgfVxufSIsImltcG9ydCBMYXlvdXQgZnJvbSAnLi9zcmMvbWFpbi5qcydcblxuY29uc3QgaW5zdGFsbCA9IGZ1bmN0aW9uIChWdWUpIHtcbiAgVnVlLmNvbXBvbmVudChMYXlvdXQubmFtZSwgTGF5b3V0KVxufVxuXG5MYXlvdXQuaW5zdGFsbCA9IGluc3RhbGxcblxuZXhwb3J0IGRlZmF1bHQgTGF5b3V0XG4iLCJjb25zdCBzaG93TWFzayA9IGN0eCA9PiB7XG4gIGlmICghY3R4LmRpc2FibGVkICYmICFjdHguc3RheSkge1xuICAgIGN0eC5ub2RlLmNsYXNzTGlzdC5yZW1vdmUoJ2ludmlzaWJsZScpXG4gIH1cbn1cbmNvbnN0IGhpZGVNYXNrID0gY3R4ID0+IHtcbiAgaWYgKCFjdHguZGlzYWJsZWQgJiYgIWN0eC5zdGF5KSB7XG4gICAgY3R4Lm5vZGUuY2xhc3NMaXN0LmFkZCgnaW52aXNpYmxlJylcbiAgfVxufVxuY29uc3QgZGlzYWJsZU1hc2sgPSBjdHggPT4ge1xuICBpZiAoY3R4LmRpc2FibGVkICYmICFjdHguc3RheSkge1xuICAgIGN0eC5ub2RlLmNsYXNzTGlzdC5hZGQoJ2ludmlzaWJsZScpXG4gIH1cbn1cbmNvbnN0IHN0YXlNYXNrID0gY3R4ID0+IHtcbiAgaWYgKGN0eC5zdGF5KSB7XG4gICAgY3R4Lm5vZGUuY2xhc3NMaXN0LnJlbW92ZSgnaW52aXNpYmxlJylcbiAgfSBlbHNlIHtcbiAgICBjdHgubm9kZS5jbGFzc0xpc3QuYWRkKCdpbnZpc2libGUnKVxuICB9XG59XG5jb25zdCBjb2xvck1hc2sgPSBjdHggPT4ge1xuICBjdHgubm9kZS5zdHlsZS5jb2xvciA9IGN0eC5jb2xvclxufVxuY29uc3QgZ2V0RGlzYWJsZWQgPSB2YWx1ZSA9PiB2YWx1ZSAhPT0gdm9pZCAwICYmICh2YWx1ZS5kaXNhYmxlZCA9PT0gdHJ1ZSB8fCBmYWxzZSlcbmNvbnN0IGdldFN0YXkgPSB2YWx1ZSA9PiB2YWx1ZSAhPT0gdm9pZCAwICYmICh2YWx1ZS5zdGF5ID09PSB0cnVlIHx8IGZhbHNlKVxuY29uc3QgZ2V0Q29sb3IgPSB2YWx1ZSA9PiB2YWx1ZSAhPT0gdm9pZCAwICYmIHZhbHVlLmNvbG9yIHx8IHZvaWQgMFxuY29uc3QgaW5pdE1hc2sgPSAoZWwsIGJpbmRpbmcpID0+IHtcbiAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gIGNvbnN0IGN0eCA9IHtcbiAgICBub2RlOiBub2RlLFxuICAgIGRpc2FibGVkOiBnZXREaXNhYmxlZChiaW5kaW5nLnZhbHVlKSxcbiAgICBzdGF5OiBnZXRTdGF5KGJpbmRpbmcudmFsdWUpLFxuICAgIGNvbG9yOiBnZXRDb2xvcihiaW5kaW5nLnZhbHVlKSxcbiAgICBzaG93TWFzazogKCkgPT4ge1xuICAgICAgc2hvd01hc2soY3R4KVxuICAgIH0sXG4gICAgaGlkZU1hc2s6ICgpID0+IHtcbiAgICAgIGhpZGVNYXNrKGN0eClcbiAgICB9XG4gIH1cblxuICBjdHgubm9kZS5jbGFzc0xpc3QuYWRkKCdzdy1tYXNrJylcbiAgZGlzYWJsZU1hc2soY3R4KVxuICBzdGF5TWFzayhjdHgpXG4gIGNvbG9yTWFzayhjdHgpXG4gIGhpZGVNYXNrKGN0eClcbiAgZWwubWFza0N0eCA9IGN0eFxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdtYXNrJyxcbiAgYmluZChlbCwgYmluZGluZykge1xuICAgIGluaXRNYXNrKGVsLCBiaW5kaW5nKVxuICAgIGVsLmFwcGVuZENoaWxkKGVsLm1hc2tDdHgubm9kZSlcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBlbC5tYXNrQ3R4LnNob3dNYXNrLCBmYWxzZSlcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIGVsLm1hc2tDdHguaGlkZU1hc2ssIGZhbHNlKVxuICB9LFxuICB1cGRhdGUoZWwsIGJpbmRpbmcpIHtcbiAgICBlbC5tYXNrQ3R4LmRpc2FibGVkID0gZ2V0RGlzYWJsZWQoYmluZGluZy52YWx1ZSlcbiAgICBpZiAoZ2V0RGlzYWJsZWQoYmluZGluZy5vbGRWYWx1ZSkgIT09IGVsLm1hc2tDdHguZGlzYWJsZWQpIHtcbiAgICAgIGRpc2FibGVNYXNrKGVsLm1hc2tDdHgpXG4gICAgfVxuXG4gICAgZWwubWFza0N0eC5zdGF5ID0gZ2V0U3RheShiaW5kaW5nLnZhbHVlKVxuICAgIGlmIChnZXRTdGF5KGJpbmRpbmcub2xkVmFsdWUpICE9PSBlbC5tYXNrQ3R4LnN0YXkpIHtcbiAgICAgIHN0YXlNYXNrKGVsLm1hc2tDdHgpXG4gICAgfVxuXG4gICAgZWwubWFza0N0eC5jb2xvciA9IGdldENvbG9yKGJpbmRpbmcudmFsdWUpXG4gICAgaWYgKGdldENvbG9yKGJpbmRpbmcub2xkVmFsdWUpICE9PSBlbC5tYXNrQ3R4LmNvbG9yKSB7XG4gICAgICBjb2xvck1hc2soZWwubWFza0N0eClcbiAgICB9XG4gIH0sXG4gIHVuYmluZChlbCkge1xuICAgIGlmIChlbC5tYXNrQ3R4KSB7XG4gICAgICBlbC5tYXNrQ3R4Lm5vZGUucmVtb3ZlKClcbiAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIGVsLm1hc2tDdHguc2hvd01hc2ssIGZhbHNlKVxuICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCBlbC5tYXNrQ3R4LmhpZGVNYXNrLCBmYWxzZSlcbiAgICAgIGRlbGV0ZSBlbC5tYXNrQ3R4XG4gICAgfVxuICB9XG59IiwiaW1wb3J0IE1hc2sgZnJvbSAnLi9zcmMvbWFpbi5qcydcblxuY29uc3QgaW5zdGFsbCA9IGZ1bmN0aW9uIChWdWUpIHtcbiAgVnVlLmRpcmVjdGl2ZShNYXNrLm5hbWUsIE1hc2spXG59XG5cbk1hc2suaW5zdGFsbCA9IGluc3RhbGxcblxuZXhwb3J0IGRlZmF1bHQgTWFzayIsImV4cG9ydCBmdW5jdGlvbiBwb3NpdGlvbihlKSB7XG4gIGlmIChlLnRvdWNoZXMgJiYgZS50b3VjaGVzWzBdKSB7XG4gICAgZSA9IGUudG91Y2hlc1swXVxuICB9IGVsc2UgaWYgKGUuY2hhbmdlZFRvdWNoZXMgJiYgZS5jaGFuZ2VkVG91Y2hlc1swXSkge1xuICAgIGUgPSBlLmNoYW5nZWRUb3VjaGVzWzBdXG4gIH1cblxuICByZXR1cm4ge1xuICAgIHRvcDogZS5jbGllbnRZLFxuICAgIGxlZnQ6IGUuY2xpZW50WFxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFdmVudFBhdGgoZSkge1xuICBpZiAoZS5wYXRoKSB7XG4gICAgcmV0dXJuIGUucGF0aFxuICB9XG4gIGlmIChlLmNvbXBvc2VkUGF0aCkge1xuICAgIHJldHVybiBlLmNvbXBvc2VkUGF0aCgpXG4gIH1cblxuICBjb25zdCBwYXRoID0gW11cbiAgbGV0IGVsID0gZS50YXJnZXRcblxuICB3aGlsZSAoZWwpIHtcbiAgICBwYXRoLnB1c2goZWwpXG5cbiAgICBpZiAoZWwudGFnTmFtZSA9PT0gJ0hUTUwnKSB7XG4gICAgICBwYXRoLnB1c2goZG9jdW1lbnQpXG4gICAgICBwYXRoLnB1c2god2luZG93KVxuICAgICAgcmV0dXJuIHBhdGhcbiAgICB9XG5cbiAgICBlbCA9IGVsLnBhcmVudEVsZW1lbnRcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RvcChlKSB7XG4gIGUuc3RvcFByb3BhZ2F0aW9uKClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByZXZlbnQoZSkge1xuICBlLnByZXZlbnREZWZhdWx0KClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0b3BBbmRQcmV2ZW50KGUpIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gIGUuc3RvcFByb3BhZ2F0aW9uKClcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBwb3NpdGlvbixcbiAgZ2V0RXZlbnRQYXRoLFxuICBzdG9wLFxuICBwcmV2ZW50LFxuICBzdG9wQW5kUHJldmVudFxufSIsImltcG9ydCB7IGNzcyB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2RvbS5qcydcbmltcG9ydCB7IHBvc2l0aW9uIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvZXZlbnQuanMnXG5cbmZ1bmN0aW9uIHNob3dSaXBwbGUoZXZ0LCBlbCwgY3R4LCBmb3JjZUNlbnRlcikge1xuICBpZiAoY3R4Lm1vZGlmaWVycy5zdG9wID09PSB0cnVlKSB7XG4gICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpXG4gIH1cblxuICBsZXQgeyBjZW50ZXIsIGNvbG9yIH0gPSBjdHgubW9kaWZpZXJzXG5cbiAgY2VudGVyID0gY2VudGVyID09PSB0cnVlIHx8IGZvcmNlQ2VudGVyID09PSB0cnVlXG5cbiAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICBjb25zdCBpbm5lck5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgY29uc3QgcG9zID0gcG9zaXRpb24oZXZ0KVxuICBjb25zdCB7IGxlZnQsIHRvcCwgd2lkdGgsIGhlaWdodCB9ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgY29uc3QgZGlhbWV0ZXIgPSBNYXRoLnNxcnQod2lkdGggKiB3aWR0aCArIGhlaWdodCAqIGhlaWdodClcbiAgY29uc3QgcmFkaXVzID0gZGlhbWV0ZXIgLyAyXG4gIGNvbnN0IGNlbnRlclggPSBgJHsod2lkdGggLSBkaWFtZXRlcikgLyAyfXB4YFxuICBjb25zdCB4ID0gY2VudGVyID8gY2VudGVyWCA6IGAke3Bvcy5sZWZ0IC0gbGVmdCAtIHJhZGl1c31weGBcbiAgY29uc3QgY2VudGVyWSA9IGAkeyhoZWlnaHQgLSBkaWFtZXRlcikgLyAyfXB4YFxuICBjb25zdCB5ID0gY2VudGVyID8gY2VudGVyWSA6IGAke3Bvcy50b3AgLSB0b3AgLSByYWRpdXN9cHhgXG4gIGxldCB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGlubmVyTm9kZS5jbGFzc0xpc3QuYWRkKCdzdy1yaXBwbGVfX2lubmVyLS1lbnRlcicpXG4gICAgaW5uZXJOb2RlLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUzZCgke2NlbnRlclh9LCAke2NlbnRlcll9LCAwKSBzY2FsZTNkKDEsIDEsIDEpYFxuICAgIGlubmVyTm9kZS5zdHlsZS5vcGFjaXR5ID0gMC4yXG5cbiAgICB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaW5uZXJOb2RlLmNsYXNzTGlzdC5yZW1vdmUoJ3N3LXJpcHBsZV9faW5uZXItLWVudGVyJylcbiAgICAgIGlubmVyTm9kZS5jbGFzc0xpc3QuYWRkKCdzdy1yaXBwbGVfX2lubmVyLS1sZWF2ZScpXG4gICAgICBpbm5lck5vZGUuc3R5bGUub3BhY2l0eSA9IDBcblxuICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgbm9kZSAmJiBub2RlLnJlbW92ZSgpXG4gICAgICAgIGN0eC5hYm9ydCA9IHZvaWQgMFxuICAgICAgfSwgMjc1KVxuICAgIH0sIDI1MClcbiAgfSwgNTApXG5cbiAgaW5uZXJOb2RlLmNsYXNzTmFtZSA9ICdzdy1yaXBwbGVfX2lubmVyJ1xuICBjc3MoaW5uZXJOb2RlLCB7XG4gICAgaGVpZ2h0OiBgJHtkaWFtZXRlcn1weGAsXG4gICAgd2lkdGg6IGAke2RpYW1ldGVyfXB4YCxcbiAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGUzZCgke3h9LCAke3l9LCAwKSBzY2FsZTNkKDAuMiwgMC4yLCAxKWAsXG4gICAgb3BhY2l0eTogMFxuICB9KVxuICBpZiAoY29sb3IpIHsgY3NzKG5vZGUsIHsgY29sb3I6IGNvbG9yIH0pIH1cbiAgbm9kZS5jbGFzc05hbWUgPSBgc3ctcmlwcGxlYFxuICBub2RlLmFwcGVuZENoaWxkKGlubmVyTm9kZSlcbiAgZWwuYXBwZW5kQ2hpbGQobm9kZSlcblxuICBjdHguYWJvcnQgPSAoKSA9PiB7XG4gICAgbm9kZSAmJiBub2RlLnJlbW92ZSgpXG4gICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICB9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUN0eChjdHgsIHsgdmFsdWUsIG1vZGlmaWVycywgYXJnIH0pIHtcbiAgY3R4LmRpc2FibGVkID0gdmFsdWUgJiYgdmFsdWUuZGlzYWJsZWQgfHwgZmFsc2VcblxuICBpZiAoIWN0eC5kaXNhYmxlZCkge1xuICAgIGN0eC5tb2RpZmllcnMgPSBPYmplY3QodmFsdWUpID09PSB2YWx1ZVxuICAgICAgPyB7XG4gICAgICAgIHN0b3A6IHZhbHVlLnN0b3AgPT09IHRydWUgfHwgbW9kaWZpZXJzLnN0b3AgPT09IHRydWUsXG4gICAgICAgIGNlbnRlcjogdmFsdWUuY2VudGVyID09PSB0cnVlIHx8IG1vZGlmaWVycy5jZW50ZXIgPT09IHRydWUsXG4gICAgICAgIGNvbG9yOiB2YWx1ZS5jb2xvciB8fCBhcmdcbiAgICAgIH1cbiAgICAgIDoge1xuICAgICAgICBzdG9wOiBtb2RpZmllcnMuc3RvcCxcbiAgICAgICAgY2VudGVyOiBtb2RpZmllcnMuY2VudGVyLFxuICAgICAgICBjb2xvcjogYXJnXG4gICAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAncmlwcGxlJyxcbiAgaW5zZXJ0ZWQoZWwsIGJpbmRpbmcpIHtcbiAgICBjb25zdCBjdHggPSB7XG4gICAgICBtb2RpZmllcnM6IHt9LFxuICAgICAgY2xpY2soZXZ0KSB7XG4gICAgICAgIGlmICghY3R4LmRpc2FibGVkKSB7XG4gICAgICAgICAgc2hvd1JpcHBsZShldnQsIGVsLCBjdHgpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBrZXl1cChldnQpIHtcbiAgICAgICAgaWYgKCFjdHguZGlzYWJsZWQgJiYgZXZ0LmtleUNvZGUgPT09IDEzKSB7XG4gICAgICAgICAgc2hvd1JpcHBsZShldnQsIGVsLCBjdHgsIHRydWUpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVDdHgoY3R4LCBiaW5kaW5nKVxuICAgIGlmIChlbC5yaXBwbGVDdHgpIHtcbiAgICAgIGVsLnJpcHBsZUN0eE9sZCA9IGVsLnJpcHBsZUN0eFxuICAgIH1cbiAgICBlbC5yaXBwbGVDdHggPSBjdHhcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGN0eC5jbGljaywgZmFsc2UpXG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBjdHgua2V5dXAsIGZhbHNlKVxuICB9LFxuICB1cGRhdGUoZWwsIGJpbmRpbmcpIHtcbiAgICBlbC5yaXBwbGVDdHggIT09IHZvaWQgMCAmJiB1cGRhdGVDdHgoZWwucmlwcGxlQ3R4LCBiaW5kaW5nKVxuICB9LFxuICB1bmJpbmQoZWwpIHtcbiAgICBjb25zdCBjdHggPSBlbC5yaXBwbGVDdHhPbGQgfHwgZWwucmlwcGxlQ3R4XG5cbiAgICBpZiAoY3R4ICE9PSB2b2lkIDApIHtcbiAgICAgIGN0eC5hYm9ydCAhPT0gdm9pZCAwICYmIGN0eC5hYm9ydCgpXG4gICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGN0eC5jbGljaywgZmFsc2UpXG4gICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXl1cCcsIGN0eC5rZXl1cCwgZmFsc2UpXG4gICAgICBkZWxldGUgZWxbZWwucmlwcGxlQ3R4T2xkID8gJ3JpcHBsZUN0eE9sZCcgOiAncmlwcGxlQ3R4J11cbiAgICB9XG4gIH1cbn0iLCJpbXBvcnQgUmlwcGxlIGZyb20gJy4vc3JjL21haW4uanMnXG5cbmNvbnN0IGluc3RhbGwgPSBmdW5jdGlvbiAoVnVlKSB7XG4gIFZ1ZS5kaXJlY3RpdmUoUmlwcGxlLm5hbWUsIFJpcHBsZSlcbn1cblxuUmlwcGxlLmluc3RhbGwgPSBpbnN0YWxsXG5cbmV4cG9ydCBkZWZhdWx0IFJpcHBsZSIsImltcG9ydCAnLi9jc3MvaW5kZXguc3R5bCdcblxuaW1wb3J0IEljb24gZnJvbSAnLi9jb21wb25lbnRzL2ljb24vaW5kZXguanMnXG5pbXBvcnQgSXRlbSBmcm9tICcuL2NvbXBvbmVudHMvaXRlbS9pbmRleC5qcydcbmltcG9ydCBGaWVsZCBmcm9tICcuL2NvbXBvbmVudHMvZmllbGQvaW5kZXguanMnXG5pbXBvcnQgSW5wdXQgZnJvbSAnLi9jb21wb25lbnRzL2lucHV0L2luZGV4LmpzJ1xuaW1wb3J0IFNlbGVjdCBmcm9tICcuL2NvbXBvbmVudHMvc2VsZWN0L2luZGV4LmpzJ1xuaW1wb3J0IFNjcm9sbEFyZWEgZnJvbSAnLi9jb21wb25lbnRzL3Njcm9sbEFyZWEvaW5kZXguanMnXG5pbXBvcnQgTW9kYWwgZnJvbSAnLi9jb21wb25lbnRzL21vZGFsL2luZGV4LmpzJ1xuaW1wb3J0IFBvcG92ZXIgZnJvbSAnLi9jb21wb25lbnRzL3BvcG92ZXIvaW5kZXguanMnXG5pbXBvcnQgQnV0dG9uIGZyb20gJy4vY29tcG9uZW50cy9idXR0b24vaW5kZXguanMnXG5pbXBvcnQgQ2hlY2tib3ggZnJvbSAnLi9jb21wb25lbnRzL2NoZWNrYm94L2luZGV4LmpzJ1xuaW1wb3J0IENoZWNrYm94R3JvdXAgZnJvbSAnLi9jb21wb25lbnRzL2NoZWNrYm94R3JvdXAvaW5kZXguanMnXG5pbXBvcnQgUmFkaW8gZnJvbSAnLi9jb21wb25lbnRzL3JhZGlvL2luZGV4LmpzJ1xuaW1wb3J0IFJhZGlvR3JvdXAgZnJvbSAnLi9jb21wb25lbnRzL3JhZGlvR3JvdXAvaW5kZXguanMnXG5pbXBvcnQgUGFnaW5hdGlvbiBmcm9tICcuL2NvbXBvbmVudHMvcGFnaW5hdGlvbi9pbmRleC5qcydcbmltcG9ydCBCYXNpY0l0ZW0gZnJvbSAnLi9jb21wb25lbnRzL2Jhc2ljSXRlbS9pbmRleC5qcydcbmltcG9ydCBOb3RpZmljYXRpb24gZnJvbSAnLi9jb21wb25lbnRzL25vdGlmaWNhdGlvbi9pbmRleC5qcydcbmltcG9ydCBMYXlvdXQgZnJvbSAnLi9jb21wb25lbnRzL2xheW91dC9pbmRleC5qcydcbmltcG9ydCBTbGlkZSBmcm9tICcuL2NvbXBvbmVudHMvc2xpZGUvaW5kZXguanMnXG5pbXBvcnQgTWFzayBmcm9tICcuL2RpcmVjdGl2ZXMvbWFzay9pbmRleC5qcydcbmltcG9ydCBSaXBwbGUgZnJvbSAnLi9kaXJlY3RpdmVzL3JpcHBsZS9pbmRleC5qcydcblxuY29uc3QgY29tcG9uZW50cyA9IFtcbiAgSWNvbixcbiAgSXRlbSxcbiAgRmllbGQsXG4gIElucHV0LFxuICBTZWxlY3QsXG4gIFNjcm9sbEFyZWEsXG4gIE1vZGFsLFxuICBQb3BvdmVyLFxuICBCdXR0b24sXG4gIFBhZ2luYXRpb24sXG4gIENoZWNrYm94LFxuICBDaGVja2JveEdyb3VwLFxuICBSYWRpbyxcbiAgUmFkaW9Hcm91cCxcbiAgQmFzaWNJdGVtLFxuICBMYXlvdXQsXG4gIFNsaWRlXG5dXG5cbmNvbnN0IGRpcmVjdGl2ZXMgPSBbXG4gIFJpcHBsZSxcbiAgTWFza1xuXVxuXG5jb25zdCBpbnN0YWxsID0gZnVuY3Rpb24gKFZ1ZSkge1xuICBjb21wb25lbnRzLmZvckVhY2goY29tcG9uZW50ID0+IHtcbiAgICBWdWUuY29tcG9uZW50KGNvbXBvbmVudC5uYW1lLCBjb21wb25lbnQpXG4gIH0pXG4gIGRpcmVjdGl2ZXMuZm9yRWFjaChkaXJlY3RpdmUgPT4ge1xuICAgIFZ1ZS5kaXJlY3RpdmUoZGlyZWN0aXZlLm5hbWUsIGRpcmVjdGl2ZSlcbiAgfSlcbiAgVnVlLnByb3RvdHlwZS4kbm90aWZ5ID0gTm90aWZpY2F0aW9uXG59XG5cbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuVnVlKSB7XG4gIGluc3RhbGwod2luZG93LlZ1ZSlcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBpbnN0YWxsLFxuICBJY29uLFxuICBJdGVtLFxuICBGaWVsZCxcbiAgSW5wdXQsXG4gIFNlbGVjdCxcbiAgU2Nyb2xsQXJlYSxcbiAgUG9wb3ZlcixcbiAgTW9kYWwsXG4gIEJ1dHRvbixcbiAgUGFnaW5hdGlvbixcbiAgQ2hlY2tib3gsXG4gIENoZWNrYm94R3JvdXAsXG4gIFJhZGlvLFxuICBSYWRpb0dyb3VwLFxuICBCYXNpY0l0ZW0sXG4gIE5vdGlmaWNhdGlvbixcbiAgTGF5b3V0LFxuICBTbGlkZSxcbiAgUmlwcGxlLFxuICBNYXNrXG59XG4iXSwibmFtZXMiOlsibmFtZSIsInByb3BzIiwiU3RyaW5nIiwiY29sb3IiLCJwcmltYXJ5IiwiQm9vbGVhbiIsIm5lZ2F0aXZlIiwicG9zaXRpdmUiLCJ3YXJuaW5nIiwiZ3JleSIsImxpZ2h0R3JleSIsInNpemUiLCJjb21wdXRlZCIsImNsYXNzZXMiLCJjbHMiLCJpY29uIiwiY29udGVudCIsInN0eWxlIiwiZm9udFNpemUiLCJyZW5kZXIiLCJoIiwic3RhdGljQ2xhc3MiLCJjbGFzcyIsImF0dHJzIiwib24iLCIkbGlzdGVuZXJzIiwiaW5zdGFsbCIsIlZ1ZSIsImNvbXBvbmVudCIsIkljb24iLCJ3cmFwIiwiaGlkZUJlZm9yZSIsImhpZGVEZWZhdWx0IiwiaGlkZUFmdGVyIiwidG8iLCJPYmplY3QiLCJjZW50ZXIiLCJlbmQiLCJkaXNhYmxlZCIsImFjdGl2ZSIsIm1hc2siLCJyaXBwbGUiLCJkYXRhIiwiZGlzYWJsZSIsImNsaWNrIiwiJGVtaXQiLCJkaXJlY3RpdmVzIiwidmFsdWUiLCJzdGF5IiwiY29uY2F0IiwiJHNjb3BlZFNsb3RzIiwiYmVmb3JlIiwiaGlkZSIsImRlZmF1bHQiLCJhZnRlciIsIkl0ZW0iLCJlcnJvck1lc3NhZ2UiLCJydWxlcyIsIkFycmF5IiwiaXNEaXJ0eSIsImlubmVyRXJyb3IiLCJpbm5lckVycm9yTWVzc2FnZSIsIndhdGNoIiwiZm9yY2VDaGVjayIsInYiLCJ2YWxpZGF0ZSIsInZhbGlkYXRlVmFsdWUiLCJoYXNFcnJvciIsImNvbXB1dGVkRXJyb3JNZXNzYWdlIiwibW91bnRlZCIsIiRvbiIsInRyaWdnZXJWYWxpZGF0aW9uIiwiYmVmb3JlRGVzdHJveSIsIiRvZmYiLCJtZXRob2RzIiwicmVzZXRWYWxpZGF0aW9uIiwidmFsIiwibGVuZ3RoIiwidXBkYXRlIiwiZXJyIiwibXNnIiwibSIsInNvbWUiLCJydWxlIiwicmVzIiwiZm9yY2UiLCJhZHZhbmNlZEJsdXIiLCJlIiwiZXhjbHVkZWQiLCJnZXRSZWZzIiwicmVmTmFtZXMiLCJnZXREb21zIiwiZWxzIiwiaXNBcnJheSIsInJlZHVjZSIsImFjY3VtdWxhdG9yIiwiZWwiLCJwdXNoIiwiJGVsIiwicmVmIiwiJHJlZnMiLCJleGNsdWRlZEJsdXJSZWZzIiwicmVmcyIsImNvbnRhaW5zIiwidGFyZ2V0IiwiZm9jdXNlZCIsImZvY3VzZWRCZWZvcmUiLCJibHVyVHlwZSIsImJsdXJSZWZzIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIm1peGlucyIsIlZhbGlkYXRlTWl4aW4iLCJBZHZhbmNlZEJsdXJNaXhpbiIsImNvbXBvbmVudHMiLCJyZXF1aXJlZCIsInVuZGVybGluZWQiLCJib3JkZXJlZCIsImZpbGxlZCIsIm1pbmkiLCJsYWJlbCIsInNwYWNlQXJvdW5kIiwidHlwZSIsImZvY3VzIiwiYmx1ciIsInVuZGVybGluZSIsImJvcmRlciIsImZpbGwiLCJlcnJvciIsImlubmVyUG9pbnRlciIsInNjb3BlZFNsb3RzIiwiZ2V0SW5uZXIiLCJnZXRBZnRlciIsIkZpZWxkIiwicGxhY2Vob2xkZXIiLCJhdXRvY29tcGxldGUiLCJpbnB1dCIsImRvbVByb3BzIiwiSW5wdXQiLCJ4IiwieSIsIndpZHRoIiwiaGVpZ2h0Iiwic3RyZXRjaCIsIlNjcm9sbEFyZWEiLCJpc0RlZXBFcXVhbCIsImEiLCJiIiwiRGF0ZSIsImdldFRpbWUiLCJrZXlzIiwiZXZlcnkiLCJwcm9wIiwiaXNTdHJpbmdDb250YWluIiwicyIsInJhbmRvbSIsImlubmVyUyIsImlubmVyViIsInJlcGxhY2UiLCJzcGxpdCIsInN1bSIsImZvckVhY2giLCJpbmNsdWRlcyIsImlzT2JqZWN0IiwiU2NvcmxsQXJlYSIsIm11bHRpcGxlIiwib3B0aW9ucyIsImZpbHRlciIsIm9wdGlvbnNIZWlnaHQiLCJzZWxlY3RlZFN0eWxlIiwiZmlsdGVyVmFsdWUiLCJpbm5lclZhbHVlIiwiZ2V0IiwiZ2V0RXhhY3RWYWx1ZXMiLCJzZXQiLCJpbm5lck9wdGlvbnMiLCJjIiwiZ2V0TmFtZSIsIiRuZXh0VGljayIsImNsZWFyRmlsdGVyIiwidHJpZ2dlckJsdXIiLCJnZXRPcHRpb25zIiwibWFwIiwib3B0aW9uIiwic2VsZWN0ZWQiLCJjaGVja1NlbGVjdGVkIiwibmF0aXZlT24iLCJmb3JtYXRWYWx1ZSIsImdldFNlbGVjdGVkIiwiZ2V0RXhhY3RPcHRpb25zIiwicmVmSW5Gb3IiLCJwYWRkaW5nIiwiY3Vyc29yIiwidHJhbnNmb3JtIiwib3BlIiwiZHVwbGljYXRlZCIsImdldFZhbHVlIiwiaGFzT3duUHJvcGVydHkiLCJTZWxlY3QiLCJyb3VuZCIsInNoYWRvdyIsIkJ1dHRvbiIsInN3QnV0dG9uIiwic2hvdyIsInRpdGxlIiwiekluZGV4Iiwib3BhY2l0eSIsImhhbmRsZUNhbmNlbCIsImhhbmRsZUNvbmZpcm0iLCJzaG93TW9kYWwiLCJoaWRlTW9kYWwiLCJldmVudCIsInN0b3BQcm9wYWdhdGlvbiIsImhlYWRlciIsImZvb3RlciIsIk1vZGFsIiwiaXNTZXJ2ZXIiLCJwcm90b3R5cGUiLCIkaXNTZXJ2ZXIiLCJjc3MiLCJlbGVtZW50IiwiaGFuZGxlciIsImF0dGFjaEV2ZW50Iiwib2ZmIiwiZGV0YWNoRXZlbnQiLCJwb3BvdmVyU3R5bGUiLCJhcnJvd1N0eWxlIiwicmVmZXJlbmNlRWxtIiwibW9kZWwiLCJwbGFjZW1lbnQiLCJ0cmlnZ2VyIiwidmFsaWRhdG9yIiwiaW5kZXhPZiIsInNob3dWYWx1ZSIsInNob3dTdHlsZSIsImdldFN0eWxlIiwicG9wb3ZlckVsbSIsInRvcCIsIm9mZnNldEhlaWdodCIsImxlZnQiLCJvZmZzZXRXaWR0aCIsInJpZ2h0IiwiaGFuZGxlQ2xpY2siLCJoYW5kbGVNb3VzZUVudGVyIiwiaGFuZGxlTW91c2VMZWF2ZSIsImRvU2hvdyIsImRvQ2xvc2UiLCJoYW5kbGVNYW51YWwiLCJwb3BvdmVyIiwicmVmZXJlbmNlIiwiZWxtIiwicXVlcnlTZWxlY3RvciIsImRlc3Ryb3llZCIsImFzc2lnbiIsIlBvcG92ZXIiLCJsZWZ0TGFiZWwiLCJjb2xvckxhYmVsIiwia2VlcENvbG9yIiwicGFyZW50IiwicGFyZW50RGlzYWJsZWQiLCJjaGVja2VkIiwiYm9vbGVhbk1vZGUiLCJnZXRDaGVja2VkIiwic2VsZiIsImNvbG9yQ2hlY2tib3giLCJnZXRMYWJlbCIsIkNoZWNrYm94Iiwic2h1dHRsZSIsIl90aGlzIiwiJGNoaWxkcmVuIiwiY2hpbGQiLCJzaHV0dGxlUmVmIiwiU2h1dHRsZU1peGluIiwiQ2hlY2tib3hHcm91cCIsImNvbG9yUmFkaW8iLCJSYWRpbyIsIlJhZGlvR3JvdXAiLCJtYWtlUmVzdWx0IiwidG90YWwiLCJjdXIiLCJhcm91bmQiLCJyZXN1bHQiLCJiYXNlQ291bnQiLCJzdXJwbHVzIiwic3RhcnRQb3NpdGlvbiIsImVuZFBvc2l0aW9uIiwiZnJvbSIsImkiLCJQYWdpbmF0aW9uIiwib2JzZXJ2ZXIiLCJtZWFzdXJlZFdpZHRoIiwiaG9yaXpvbnRhbCIsIm1lYXN1cmVUYXJnZXQiLCJtaW5TaXplIiwibWluIiwiaW5pdFN0eWxlIiwiaW5uZXJDb2xsYXBzZWQiLCJzbGlkZSIsInNldFN0eWxlIiwicGFzc2l2ZSIsInNsaWRlVGFyZ2V0Iiwib2JzZXJ2ZSIsInNldFRpbWVvdXQiLCJjbGVhclVwcGVyU3R5bGUiLCJ1cHBlciIsInVwcGVyU2xpZGVUYXJnZXQiLCIkcGFyZW50IiwiJHdhdGNoIiwiTXV0YXRpb25PYnNlcnZlciIsImF0dHJpYnV0ZXMiLCJhdHRyaWJ1dGVGaWx0ZXIiLCJjaGlsZExpc3QiLCJzdWJ0cmVlIiwiY2hhcmFjdGVyRGF0YSIsImRpc2Nvbm5lY3QiLCJTbGlkZU9ic2VydmVyIiwiY29sbGFwc2VkIiwiZml0IiwiTnVtYmVyIiwiaW1tZWRpYXRlIiwiU2xpZGUiLCJzdWJDb250ZW50IiwiaW5kZW50TGV2ZWwiLCJzdWIiLCJjYWxsYmFjayIsIkZ1bmN0aW9uIiwic3ViRmlsdGVyIiwiY29sbGFwc2VkQmVmb3JlIiwibW91c2VvdmVyIiwiZXZlbnRPcmlnaW4iLCJldmVudEh1YiIsImhhc0JlZm9yZSIsImhhc0NvbnRlbnQiLCJoYXNTdWIiLCJoYXNBY3Rpb24iLCJpbm5lckNlbnRlciIsInJvb3RQYXJhbXMiLCJpbm5lckVuZCIsImlubmVyRmlsbGVkIiwiaW5uZXJTcGxpdCIsImlubmVyTWluaSIsImlubmVyU2hhZG93IiwiaW5uZXJNYXNrIiwiaW5uZXJSaXBwbGUiLCJpbm5lckluZGVudExldmVsIiwiaW5uZXJDYWxsYmFjayIsImlubmVyU3ViRmlsdGVyIiwicm9vdCIsImlubmVyRXZlbnRIdWIiLCJtaW5IZWlnaHQiLCJpbmplY3QiLCJwcm92aWRlIiwic3ViRmlsdGVyQ2hhbmdlIiwicmVzdG9yZSIsInJlbWVtYmVyIiwiaXNTdWJDb250YWluIiwiY29udGFpbiIsImluaXRFdmVudEh1YiIsImVtaXRBY3RpdmUiLCJjcmVhdGVkIiwib3YiLCJtdXRhdGUiLCJleHBhbmQiLCJtb3VzZW91dCIsIiRmb3JjZVVwZGF0ZSIsInVuc2hpZnQiLCJCYXNpY0l0ZW0iLCJoYXNPd24iLCJvYmoiLCJrZXkiLCJjYWxsIiwiaXNWTm9kZSIsIm5vZGUiLCJ2ZXJ0aWNhbE9mZnNldCIsIm9uQ2xvc2UiLCJwb3NpdGlvbiIsInNsb3QiLCJiYWNrZ3JvdW5kIiwiY2xvc2VDb2xvciIsImhhbmRsZUJ0biIsInZlcnRpY2FsUHJvcGVydHkiLCJ0ZXN0IiwicG9zaXRpb25TdHlsZSIsImdldFZub2RlIiwiY29uc29sZSIsIk5vdGlmaWNhdGlvbkNvbnN0cnVjdG9yIiwiZXh0ZW5kIiwiTm90aWZpY2F0aW9uIiwiaW5zdGFuY2UiLCJpbnN0YW5jZXMiLCJzZWVkIiwiTm90aWZpY2F0aW9uRnVuIiwidXNlck9uQ2xvc2UiLCJpZCIsImNsb3NlIiwiJG1vdW50IiwiYm9keSIsImFwcGVuZENoaWxkIiwiaXRlbSIsImxvZyIsImluZGV4IiwibGVuIiwic3BsaWNlIiwicmVtb3ZlZEhlaWdodCIsInBhcnNlSW50IiwiY29sbGFwc2VUb3AiLCJjb2xsYXBzZUxlZnQiLCJjb2xsYXBzZVJpZ2h0IiwiY29sbGFwc2VCb3R0b20iLCJmaXRUb3AiLCJmaXRMZWZ0IiwiZml0UmlnaHQiLCJmaXRCb3R0b20iLCJ0b3BNaW4iLCJsZWZ0TWluIiwicmlnaHRNaW4iLCJib3R0b21NaW4iLCJ2ZXJ0aWNhbFN0cmV0Y2giLCJib3R0b20iLCJMYXlvdXQiLCJzaG93TWFzayIsImN0eCIsImNsYXNzTGlzdCIsInJlbW92ZSIsImhpZGVNYXNrIiwiYWRkIiwiZGlzYWJsZU1hc2siLCJzdGF5TWFzayIsImNvbG9yTWFzayIsImdldERpc2FibGVkIiwiZ2V0U3RheSIsImdldENvbG9yIiwiaW5pdE1hc2siLCJiaW5kaW5nIiwiY3JlYXRlRWxlbWVudCIsIm1hc2tDdHgiLCJiaW5kIiwib2xkVmFsdWUiLCJ1bmJpbmQiLCJkaXJlY3RpdmUiLCJNYXNrIiwidG91Y2hlcyIsImNoYW5nZWRUb3VjaGVzIiwiY2xpZW50WSIsImNsaWVudFgiLCJzaG93UmlwcGxlIiwiZXZ0IiwiZm9yY2VDZW50ZXIiLCJtb2RpZmllcnMiLCJzdG9wIiwiaW5uZXJOb2RlIiwicG9zIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiZGlhbWV0ZXIiLCJNYXRoIiwic3FydCIsInJhZGl1cyIsImNlbnRlclgiLCJjZW50ZXJZIiwidGltZXIiLCJhYm9ydCIsImNsYXNzTmFtZSIsImNsZWFyVGltZW91dCIsInVwZGF0ZUN0eCIsImFyZyIsImluc2VydGVkIiwia2V5dXAiLCJrZXlDb2RlIiwicmlwcGxlQ3R4IiwicmlwcGxlQ3R4T2xkIiwiUmlwcGxlIiwiJG5vdGlmeSIsIndpbmRvdyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGFBQWU7RUFDYkEsRUFBQUEsSUFBSSxFQUFFLFFBRE87RUFFYkMsRUFBQUEsS0FBSyxFQUFFO0VBQ0xELElBQUFBLElBQUksRUFBRUUsTUFERDtFQUVMQyxJQUFBQSxLQUFLLEVBQUVELE1BRkY7RUFHTEUsSUFBQUEsT0FBTyxFQUFFQyxPQUhKO0VBSUxDLElBQUFBLFFBQVEsRUFBRUQsT0FKTDtFQUtMRSxJQUFBQSxRQUFRLEVBQUVGLE9BTEw7RUFNTEcsSUFBQUEsT0FBTyxFQUFFSCxPQU5KO0VBT0xJLElBQUFBLElBQUksRUFBRUosT0FQRDtFQVFMSyxJQUFBQSxTQUFTLEVBQUVMLE9BUk47RUFTTE0sSUFBQUEsSUFBSSxFQUFFVDtFQVRELEdBRk07RUFhYlUsRUFBQUEsUUFBUSxFQUFFO0VBQ1JDLElBQUFBLE9BRFEscUJBQ0U7RUFBQTs7RUFDUixVQUFJQyxHQUFKO0VBQ0EsVUFBTUMsSUFBSSxHQUFHLEtBQUtmLElBQWxCOztFQUVBLFVBQUksQ0FBQ2UsSUFBTCxFQUFXO0VBQ1Q7RUFDRCxPQUZELE1BRU87RUFDTEQsUUFBQUEsR0FBRyxHQUFHLGdCQUFOO0VBQ0Q7O0VBQ0QsOENBQ0dBLEdBREgsRUFDUyxJQURULHlCQUVFLGVBRkYsRUFFbUIsS0FBS1YsT0FGeEIseUJBR0UsZ0JBSEYsRUFHb0IsS0FBS0UsUUFIekIseUJBSUUsZ0JBSkYsRUFJb0IsS0FBS0MsUUFKekIseUJBS0UsZUFMRixFQUttQixLQUFLQyxPQUx4Qix5QkFNRSxZQU5GLEVBTWdCLEtBQUtDLElBTnJCLHlCQU9FLGtCQVBGLEVBT3NCLEtBQUtDLFNBUDNCO0VBU0QsS0FuQk87RUFv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
