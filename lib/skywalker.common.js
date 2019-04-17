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

  return index;

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2t5d2Fsa2VyLmNvbW1vbi5qcyIsInNvdXJjZXMiOlsiLi4vcGFja2FnZXMvY29tcG9uZW50cy9pY29uL3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9pY29uL2luZGV4LmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9pdGVtL3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9pdGVtL2luZGV4LmpzIiwiLi4vcGFja2FnZXMvbWl4aW5zL3ZhbGlkYXRlLmpzIiwiLi4vcGFja2FnZXMvbWl4aW5zL2FkdmFuY2VkQmx1ci5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvZmllbGQvc3JjL21haW4uanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL2ZpZWxkL2luZGV4LmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9pbnB1dC9zcmMvbWFpbi5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvaW5wdXQvaW5kZXguanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3Njcm9sbEFyZWEvc3JjL21haW4uanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3Njcm9sbEFyZWEvaW5kZXguanMiLCIuLi9wYWNrYWdlcy91dGlscy9pcy5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvc2VsZWN0L3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9zZWxlY3QvaW5kZXguanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL2J1dHRvbi9zcmMvbWFpbi5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvYnV0dG9uL2luZGV4LmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9tb2RhbC9zcmMvbWFpbi5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvbW9kYWwvaW5kZXguanMiLCIuLi9wYWNrYWdlcy91dGlscy9kb20uanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3BvcG92ZXIvc3JjL21haW4uanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3BvcG92ZXIvaW5kZXguanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL2NoZWNrYm94L3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9jaGVja2JveC9pbmRleC5qcyIsIi4uL3BhY2thZ2VzL21peGlucy9zaHV0dGxlLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9jaGVja2JveEdyb3VwL3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9jaGVja2JveEdyb3VwL2luZGV4LmpzIiwiLi4vcGFja2FnZXMvY29tcG9uZW50cy9yYWRpby9zcmMvbWFpbi5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvcmFkaW8vaW5kZXguanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3JhZGlvR3JvdXAvc3JjL21haW4uanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3JhZGlvR3JvdXAvaW5kZXguanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3BhZ2luYXRpb24vc3JjL3BhZ2luYXRpb24uanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL3BhZ2luYXRpb24vc3JjL21haW4udnVlIiwiLi4vbm9kZV9tb2R1bGVzL3Z1ZS1ydW50aW1lLWhlbHBlcnMvZGlzdC9ub3JtYWxpemUtY29tcG9uZW50LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Z1ZS1ydW50aW1lLWhlbHBlcnMvZGlzdC9pbmplY3Qtc3R5bGUvYnJvd3Nlci5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvcGFnaW5hdGlvbi9pbmRleC5qcyIsIi4uL3BhY2thZ2VzL3V0aWxzL3Zkb20uanMiLCIuLi9wYWNrYWdlcy9jb21wb25lbnRzL25vdGlmaWNhdGlvbi9zcmMvbWFpbi5qcyIsIi4uL3BhY2thZ2VzL2NvbXBvbmVudHMvbm90aWZpY2F0aW9uL3NyYy9ub3RpZmljYXRpb24uanMiLCIuLi9wYWNrYWdlcy91dGlscy9ldmVudC5qcyIsIi4uL3BhY2thZ2VzL2RpcmVjdGl2ZXMvcmlwcGxlL3NyYy9tYWluLmpzIiwiLi4vcGFja2FnZXMvZGlyZWN0aXZlcy9yaXBwbGUvaW5kZXguanMiLCIuLi9wYWNrYWdlcy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdzd0ljb24nLFxuICBwcm9wczoge1xuICAgIG5hbWU6IFN0cmluZyxcbiAgICBjb2xvcjogU3RyaW5nLFxuICAgIHByaW1hcnk6IEJvb2xlYW4sXG4gICAgbmVnYXRpdmU6IEJvb2xlYW4sXG4gICAgcG9zaXRpdmU6IEJvb2xlYW4sXG4gICAgd2FybmluZzogQm9vbGVhbixcbiAgICBncmV5OiBCb29sZWFuLFxuICAgIGxpZ2h0R3JleTogQm9vbGVhbixcbiAgICBzaXplOiBTdHJpbmdcbiAgfSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBjbGFzc2VzKCkge1xuICAgICAgbGV0IGNsc1xuICAgICAgY29uc3QgaWNvbiA9IHRoaXMubmFtZVxuICBcbiAgICAgIGlmICghaWNvbikge1xuICAgICAgICByZXR1cm5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNscyA9ICdtYXRlcmlhbC1pY29ucydcbiAgICAgIH1cbiAgICAgIHJldHVybiB7XG4gICAgICAgIFtjbHNdOiB0cnVlLFxuICAgICAgICAnY29sb3ItcHJpbWFyeSc6IHRoaXMucHJpbWFyeSxcbiAgICAgICAgJ2NvbG9yLW5lZ2F0aXZlJzogdGhpcy5uZWdhdGl2ZSxcbiAgICAgICAgJ2NvbG9yLXBvc2l0aXZlJzogdGhpcy5wb3NpdGl2ZSxcbiAgICAgICAgJ2NvbG9yLXdhcm5pbmcnOiB0aGlzLndhcm5pbmcsXG4gICAgICAgICdjb2xvci1ncmV5JzogdGhpcy5ncmV5LFxuICAgICAgICAnY29sb3ItbGlnaHQtZ3JleSc6IHRoaXMubGlnaHRHcmV5LFxuICAgICAgfVxuICAgIH0sXG4gICAgY29udGVudCgpIHtcbiAgICAgIHJldHVybiB0aGlzLm5hbWUgfHwgJyAnXG4gICAgfSxcbiAgICBzdHlsZSgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGZvbnRTaXplOiB0aGlzLnNpemUgfHwgdm9pZCAwLFxuICAgICAgICBjb2xvcjogdGhpcy5jb2xvciB8fCB2b2lkIDBcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIHJlbmRlcihoKSB7XG4gICAgcmV0dXJuIGgoJ2knLCB7XG4gICAgICBzdGF0aWNDbGFzczogJ3N3LWljb24nLFxuICAgICAgY2xhc3M6IHRoaXMuY2xhc3NlcyxcbiAgICAgIHN0eWxlOiB0aGlzLnN0eWxlLFxuICAgICAgYXR0cnM6IHsgJ2FyaWEtaGlkZGVuJzogdHJ1ZSB9LFxuICAgICAgb246IHRoaXMuJGxpc3RlbmVyc1xuICAgIH0sIFtcbiAgICAgIHRoaXMuY29udGVudFxuICAgIF0pXG4gIH1cbn1cbiAgIiwiaW1wb3J0IEljb24gZnJvbSAnLi9zcmMvbWFpbi5qcydcblxuY29uc3QgaW5zdGFsbCA9IGZ1bmN0aW9uIChWdWUpIHtcbiAgVnVlLmNvbXBvbmVudChJY29uLm5hbWUsIEljb24pXG59XG5cbkljb24uaW5zdGFsbCA9IGluc3RhbGxcblxuZXhwb3J0IGRlZmF1bHQgSWNvblxuIiwiZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnc3dJdGVtJyxcbiAgcHJvcHM6IHtcbiAgICB3cmFwOiBCb29sZWFuLFxuICAgIGhpZGVCZWZvcmU6IEJvb2xlYW4sXG4gICAgaGlkZURlZmF1bHQ6IEJvb2xlYW4sXG4gICAgaGlkZUFmdGVyOiBCb29sZWFuLFxuICAgIHRvOiBTdHJpbmcgfCBPYmplY3RcbiAgfSxcbiAgZGF0YTogKCkgPT4gKHt9KSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBzdHlsZSgpIHtcbiAgICAgIHJldHVybiB0aGlzLnRvID8geyBjdXJzb3I6ICdwb2ludGVyJyB9IDogdm9pZCAwXG4gICAgfVxuICB9LFxuICByZW5kZXIoaCkge1xuICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICBzdGF0aWNDbGFzczogJ3N3LWl0ZW0gZmxleCBpdGVtcy1jZW50ZXInLFxuICAgICAgY2xhc3M6IHtcbiAgICAgICAgJ25vLXdyYXAnOiAhdGhpcy53cmFwXG4gICAgICB9LFxuICAgICAgc3R5bGU6IHRoaXMuc3R5bGUsXG4gICAgICBvbjoge1xuICAgICAgICAuLi50aGlzLiRsaXN0ZW5lcnMsXG4gICAgICAgIGNsaWNrOiBlID0+IHtcbiAgICAgICAgICBpZiAodGhpcy50bykge1xuICAgICAgICAgICAgdGhpcy4kcm91dGVyLnB1c2godGhpcy50bylcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy4kZW1pdCgnY2xpY2snLCBlKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwgW1xuICAgICAgaCgnZGl2Jywge1xuICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWl0ZW1fX2NvbnRlbnQgZmxleCBpdGVtcy1jZW50ZXInLFxuICAgICAgICBjbGFzczoge1xuICAgICAgICAgICduby13cmFwJzogIXRoaXMud3JhcFxuICAgICAgICB9XG4gICAgICB9LCBbXG5cbiAgICAgICAgdGhpcy4kc2NvcGVkU2xvdHMuYmVmb3JlICE9PSB2b2lkIDAgPyBoKCdkaXYnLCB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1pdGVtX19iZWZvcmUgZmxleCBpdGVtcy1jZW50ZXInLFxuICAgICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgICBoaWRlOiB0aGlzLmhpZGVCZWZvcmUsXG4gICAgICAgICAgICAnZmxleC1hdXRvJzogdGhpcy5oaWRlRGVmYXVsdCxcbiAgICAgICAgICAgICduby13cmFwJzogIXRoaXMud3JhcFxuICAgICAgICAgIH1cbiAgICAgICAgfSwgW3RoaXMuJHNjb3BlZFNsb3RzLmJlZm9yZSgpXSkgOiB2b2lkIDAsXG4gIFxuICAgICAgICB0aGlzLiRzY29wZWRTbG90cy5kZWZhdWx0ICE9PSB2b2lkIDAgPyBoKCdkaXYnLCB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1pdGVtX19pbm5lciBmbGV4IGl0ZW1zLWNlbnRlcicsXG4gICAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAgIGhpZGU6IHRoaXMuaGlkZURlZmF1bHQsXG4gICAgICAgICAgICAnbm8td3JhcCc6ICF0aGlzLndyYXBcbiAgICAgICAgICB9XG4gICAgICAgIH0sIFt0aGlzLiRzY29wZWRTbG90cy5kZWZhdWx0KCldKSA6IHZvaWQgMCxcbiAgXG4gICAgICAgIHRoaXMuJHNjb3BlZFNsb3RzLmFmdGVyICE9PSB2b2lkIDAgPyBoKCdkaXYnLCB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1pdGVtX19hZnRlciBmbGV4IGl0ZW1zLWNlbnRlcicsXG4gICAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAgIGhpZGU6IHRoaXMuaGlkZUFmdGVyLFxuICAgICAgICAgICAgJ25vLXdyYXAnOiAhdGhpcy53cmFwXG4gICAgICAgICAgfVxuICAgICAgICB9LCBbdGhpcy4kc2NvcGVkU2xvdHMuYWZ0ZXIoKV0pIDogdm9pZCAwXG4gICAgICBdKVxuICAgIF0pXG4gIH1cbn1cbiAgIiwiaW1wb3J0IEl0ZW0gZnJvbSAnLi9zcmMvbWFpbi5qcydcblxuY29uc3QgaW5zdGFsbCA9IGZ1bmN0aW9uIChWdWUpIHtcbiAgVnVlLmNvbXBvbmVudChJdGVtLm5hbWUsIEl0ZW0pXG59XG5cbkl0ZW0uaW5zdGFsbCA9IGluc3RhbGxcblxuZXhwb3J0IGRlZmF1bHQgSXRlbVxuIiwiXG5leHBvcnQgZGVmYXVsdCB7XG4gIHByb3BzOiB7XG4gICAgZXJyb3JNZXNzYWdlOiBTdHJpbmcsXG4gICAgcnVsZXM6IEFycmF5XG4gIH0sXG5cbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaXNEaXJ0eTogZmFsc2UsXG4gICAgICBpbm5lckVycm9yOiBmYWxzZSxcbiAgICAgIGlubmVyRXJyb3JNZXNzYWdlOiB2b2lkIDBcbiAgICB9XG4gIH0sXG5cbiAgd2F0Y2g6IHtcbiAgICBmb3JjZUNoZWNrKHYpIHtcbiAgICAgIGlmICh0aGlzLnJ1bGVzID09PSB2b2lkIDApIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICB0aGlzLmlzRGlydHkgPSB0cnVlXG4gICAgICB0aGlzLnZhbGlkYXRlKHYpXG4gICAgfSxcbiAgICB2YWx1ZSh2KSB7XG4gICAgICBpZiAodGhpcy5mb3JjZUNoZWNrICE9PSB2b2lkIDAgfHwgdGhpcy5ydWxlcyA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgdGhpcy5pc0RpcnR5ID0gdHJ1ZVxuICAgICAgdGhpcy52YWxpZGF0ZSh2KVxuICAgIH1cbiAgfSxcblxuICBjb21wdXRlZDoge1xuICAgIHZhbGlkYXRlVmFsdWUoKSB7XG4gICAgICByZXR1cm4gdGhpcy5mb3JjZUNoZWNrID09PSB2b2lkIDAgPyB0aGlzLnZhbHVlIDogdGhpcy5mb3JjZUNoZWNrXG4gICAgfSxcbiAgICBoYXNFcnJvcigpIHtcbiAgICAgIHJldHVybiB0aGlzLmlubmVyRXJyb3IgPT09IHRydWVcbiAgICB9LFxuXG4gICAgY29tcHV0ZWRFcnJvck1lc3NhZ2UoKSB7XG4gICAgICByZXR1cm4gdGhpcy5lcnJvck1lc3NhZ2UgIT09IHZvaWQgMFxuICAgICAgICA/IHRoaXMuZXJyb3JNZXNzYWdlXG4gICAgICAgIDogdGhpcy5pbm5lckVycm9yTWVzc2FnZVxuICAgIH1cbiAgfSxcblxuICBtb3VudGVkKCkge1xuICAgIHRoaXMuJG9uKGBibHVyYCwgdGhpcy50cmlnZ2VyVmFsaWRhdGlvbilcbiAgfSxcblxuICBiZWZvcmVEZXN0cm95KCkge1xuICAgIHRoaXMuJG9mZihgYmx1cmAsIHRoaXMudHJpZ2dlclZhbGlkYXRpb24pXG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIHJlc2V0VmFsaWRhdGlvbigpIHtcbiAgICAgIHRoaXMuaXNEaXJ0eSA9IGZhbHNlXG4gICAgICB0aGlzLmlubmVyRXJyb3IgPSBmYWxzZVxuICAgICAgdGhpcy5pbm5lckVycm9yTWVzc2FnZSA9IHZvaWQgMFxuICAgIH0sXG5cbiAgICB2YWxpZGF0ZSh2YWwgPSB0aGlzLnZhbGlkYXRlVmFsdWUpIHtcbiAgICAgIGlmICghdGhpcy5ydWxlcyB8fCB0aGlzLnJ1bGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgY29uc3QgdXBkYXRlID0gKGVyciwgbXNnKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmlubmVyRXJyb3IgIT09IGVycikge1xuICAgICAgICAgIHRoaXMuaW5uZXJFcnJvciA9IGVyclxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbSA9IG1zZyB8fCB2b2lkIDBcblxuICAgICAgICBpZiAodGhpcy5pbm5lckVycm9yTWVzc2FnZSAhPT0gbSkge1xuICAgICAgICAgIHRoaXMuaW5uZXJFcnJvck1lc3NhZ2UgPSBtXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVyclxuICAgICAgfVxuXG4gICAgICByZXR1cm4gIXRoaXMucnVsZXMuc29tZShydWxlID0+IHtcbiAgICAgICAgbGV0IHJlc1xuXG4gICAgICAgIGlmICh0eXBlb2YgcnVsZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHJlcyA9IHJ1bGUodmFsKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIGlmIChyZXMgPT09IGZhbHNlIHx8IHR5cGVvZiByZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgcmV0dXJuIHVwZGF0ZSh0cnVlLCByZXMpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHVwZGF0ZShmYWxzZSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuXG4gICAgdHJpZ2dlclZhbGlkYXRpb24oZm9yY2UgPSB0cnVlKSB7XG4gICAgICBpZiAoZm9yY2UgPT09IHRydWUgfHwgdGhpcy5pc0RpcnR5ID09PSBmYWxzZSkge1xuICAgICAgICB0aGlzLmlzRGlydHkgPSB0cnVlXG4gICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlKHRoaXMudmFsaWRhdGVWYWx1ZSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsIlxuZXhwb3J0IGRlZmF1bHQge1xuICBwcm9wczoge30sXG4gIGRhdGE6ICgpID0+ICh7fSksXG4gIHdhdGNoOiB7fSxcbiAgY29tcHV0ZWQ6IHt9LFxuICBtZXRob2RzOiB7XG4gICAgYWR2YW5jZWRCbHVyKGUpIHtcbiAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7IHJldHVybiB9XG4gICAgICBsZXQgZXhjbHVkZWQgPSBmYWxzZVxuICAgICAgbGV0IGdldFJlZnMgPSByZWZOYW1lcyA9PiB7XG4gICAgICAgIGxldCBnZXREb21zID0gZWxzID0+IHtcbiAgICAgICAgICBlbHMgPSBBcnJheS5pc0FycmF5KGVscykgPyBlbHMgOiBbZWxzXVxuICAgICAgICAgIHJldHVybiBlbHMucmVkdWNlKChhY2N1bXVsYXRvciwgZWwpID0+IHtcbiAgICAgICAgICAgIGFjY3VtdWxhdG9yLnB1c2goZWwgJiYgKGVsLiRlbCB8fCBlbCkpXG4gICAgICAgICAgICByZXR1cm4gYWNjdW11bGF0b3JcbiAgICAgICAgICB9LCBbXSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZWZOYW1lcy5yZWR1Y2UoKGFjY3VtdWxhdG9yLCByZWYpID0+IGFjY3VtdWxhdG9yLmNvbmNhdChnZXREb21zKHRoaXMuJHJlZnNbcmVmXSkpLCBbXSlcbiAgICAgIH1cbiAgICAgIFxuICAgICAgaWYgKHRoaXMuZXhjbHVkZWRCbHVyUmVmcykge1xuICAgICAgICBsZXQgcmVmcyA9IGdldFJlZnModGhpcy5leGNsdWRlZEJsdXJSZWZzKVxuXG4gICAgICAgIHJlZnMuc29tZShyZWYgPT4ge1xuICAgICAgICAgIGlmIChyZWYgPT09IHZvaWQgMCkgeyByZXR1cm4gZmFsc2UgfVxuICAgICAgICAgIGV4Y2x1ZGVkID0gcmVmLmNvbnRhaW5zKGUudGFyZ2V0KSB8fCBmYWxzZVxuICAgICAgICAgIHJldHVybiBleGNsdWRlZFxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgaWYgKGV4Y2x1ZGVkKSB7XG4gICAgICAgIHRoaXMuZm9jdXNlZCA9IHRydWVcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBsZXQgZm9jdXNlZEJlZm9yZSA9IHRoaXMuZm9jdXNlZFxuXG4gICAgICBpZiAodGhpcy5ibHVyVHlwZSA9PT0gJ3JldmVyc2UnICYmIGZvY3VzZWRCZWZvcmUpIHtcbiAgICAgICAgdGhpcy5mb2N1c2VkID0gIWZvY3VzZWRCZWZvcmVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCByZWZzID0gZ2V0UmVmcyh0aGlzLmJsdXJSZWZzKVxuXG4gICAgICAgIHJlZnMuc29tZShyZWYgPT4ge1xuICAgICAgICAgIGlmIChyZWYgPT09IHZvaWQgMCkgeyByZXR1cm4gZmFsc2UgfVxuICAgICAgICAgIHRoaXMuZm9jdXNlZCA9IHJlZi5jb250YWlucyhlLnRhcmdldCkgfHwgZmFsc2VcbiAgICAgICAgICByZXR1cm4gdGhpcy5mb2N1c2VkXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMuZm9jdXNlZCAmJiBmb2N1c2VkQmVmb3JlKSB7IHRoaXMuJGVtaXQoYGJsdXJgLCBlKSB9XG4gICAgfVxuICB9LFxuICBtb3VudGVkKCkge1xuICAgIGlmICh0aGlzLmJsdXJSZWZzKSB7IGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmFkdmFuY2VkQmx1ciwgZmFsc2UpIH1cbiAgfSxcbiAgYmVmb3JlRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5ibHVyUmVmcykgeyBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5hZHZhbmNlZEJsdXIsIGZhbHNlKSB9XG4gIH0sXG59XG4gICIsImltcG9ydCBWYWxpZGF0ZU1peGluIGZyb20gJy4uLy4uLy4uL21peGlucy92YWxpZGF0ZSdcbmltcG9ydCBBZHZhbmNlZEJsdXJNaXhpbiBmcm9tICcuLi8uLi8uLi9taXhpbnMvYWR2YW5jZWRCbHVyJ1xuaW1wb3J0IEl0ZW0gZnJvbSAnLi4vLi4vaXRlbSdcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnc3dGaWVsZCcsXG4gIG1peGluczogW1ZhbGlkYXRlTWl4aW4sIEFkdmFuY2VkQmx1ck1peGluXSwgLy8gaGFzRXJyb3IsY29tcHV0ZWRFcnJvck1lc3NhZ2VcbiAgY29tcG9uZW50czogeyBJdGVtIH0sXG4gIHByb3BzOiB7XG4gICAgcmVxdWlyZWQ6IEJvb2xlYW4sXG4gICAgdW5kZXJsaW5lZDogQm9vbGVhbixcbiAgICBib3JkZXJlZDogQm9vbGVhbixcbiAgICBmaWxsZWQ6IEJvb2xlYW4sXG4gICAgZGlzYWJsZWQ6IEJvb2xlYW4sXG4gICAgbWluaTogQm9vbGVhbixcbiAgICBsYWJlbDogU3RyaW5nLFxuICAgIGZvcmNlQ2hlY2s6IFN0cmluZyB8IE9iamVjdFxuICB9LFxuICBkYXRhOiAoKSA9PiAoe1xuICAgIGZvY3VzZWQ6IGZhbHNlXG4gIH0pLFxuICBjb21wdXRlZDoge1xuICAgIGJsdXJSZWZzKCkge1xuICAgICAgcmV0dXJuIFsnZmllbGRDb250ZW50J11cbiAgICB9XG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgZm9jdXNlZCgpIHtcbiAgICAgIGlmICh0aGlzLmZvY3VzZWQgJiYgdGhpcy5mb2N1cykgeyB0aGlzLmZvY3VzKCkgfVxuICAgICAgaWYgKCF0aGlzLmZvY3VzZWQgJiYgdGhpcy5ibHVyKSB7IHRoaXMuYmx1cigpIH1cbiAgICB9XG4gIH0sXG4gIHJlbmRlcihoKSB7XG4gICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiAnc3ctZmllbGQgZmxleCBuby13cmFwIGl0ZW1zLWNlbnRlcicsXG4gICAgICBjbGFzczoge1xuICAgICAgICBkaXNhYmxlOiB0aGlzLmRpc2FibGVkXG4gICAgICB9XG4gICAgfSwgW1xuICAgICAgdGhpcy5sYWJlbCAhPT0gdm9pZCAwID8gaCgnZGl2Jywge1xuICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWZpZWxkX19sYWJlbCBmbGV4IG5vLXdyYXAgaXRlbXMtY2VudGVyJ1xuICAgICAgfSwgW2goJ2RpdicsIHtcbiAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1sYWJlbCBmbGV4IG5vLXdyYXAgaXRlbXMtY2VudGVyJyxcbiAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICByZXF1aXJlZDogdGhpcy5yZXF1aXJlZFxuICAgICAgICB9XG4gICAgICB9LCB0aGlzLmxhYmVsKVxuICAgICAgXSkgOiB2b2lkIDAsXG5cbiAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgcmVmOiAnZmllbGRDb250ZW50JyxcbiAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1maWVsZF9fY29udGVudCBmbGV4IG5vLXdyYXAgaXRlbXMtY2VudGVyIHN3LWZvcm0nLFxuICAgICAgICBjbGFzczoge1xuICAgICAgICAgIHVuZGVybGluZTogdGhpcy51bmRlcmxpbmVkLFxuICAgICAgICAgIGJvcmRlcjogdGhpcy5ib3JkZXJlZCxcbiAgICAgICAgICBmaWxsOiB0aGlzLmZpbGxlZCxcbiAgICAgICAgICBmb2N1czogIXRoaXMuaGFzRXJyb3IgJiYgdGhpcy5mb2N1c2VkLFxuICAgICAgICAgIGVycm9yOiB0aGlzLmhhc0Vycm9yLFxuICAgICAgICAgICdwYWRkaW5nLW1pbic6ICF0aGlzLm1pbmksXG4gICAgICAgICAgJ2lubmVyLXBvaW50ZXInOiB0aGlzLmlubmVyUG9pbnRlclxuICAgICAgICB9XG4gICAgICB9LCBbXG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPyBoKCdkaXYnLCB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6ICdzdy1maWVsZF9fZGlzYWJsZWQnXG4gICAgICAgIH0pIDogdm9pZCAwLFxuXG4gICAgICAgIGgoJ3N3LWl0ZW0nLCB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6ICdmbGV4LWF1dG8nLFxuICAgICAgICAgIHNjb3BlZFNsb3RzOiB7XG4gICAgICAgICAgICBiZWZvcmU6IHRoaXMuJHNjb3BlZFNsb3RzLmJlZm9yZSAhPT0gdm9pZCAwXG4gICAgICAgICAgICAgID8gKCkgPT4gW2goJ2RpdicsIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogJ2ZsZXggbm8td3JhcCBpdGVtcy1jZW50ZXIgbWFyZ2luLW1pbidcbiAgICAgICAgICAgICAgfSwgW3RoaXMuJHNjb3BlZFNsb3RzLmJlZm9yZSgpXSldIDogdm9pZCAwLFxuXG4gICAgICAgICAgICBkZWZhdWx0OiB0aGlzLiRzY29wZWRTbG90cy5kZWZhdWx0ICE9PSB2b2lkIDAgfHwgdGhpcy5nZXRJbm5lciAhPT0gdm9pZCAwXG4gICAgICAgICAgICAgID8gKCkgPT4gW3RoaXMuZ2V0SW5uZXIgIT09IHZvaWQgMCA/IHRoaXMuZ2V0SW5uZXIoaCkgOiB2b2lkIDAsIHRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQgIT09IHZvaWQgMCAmJiB0aGlzLmdldElubmVyID09PSB2b2lkIDAgPyB0aGlzLiRzY29wZWRTbG90cy5kZWZhdWx0KCkgOiB2b2lkIDBdIDogdm9pZCAwLFxuXG4gICAgICAgICAgICBhZnRlcjogdGhpcy4kc2NvcGVkU2xvdHMuYWZ0ZXIgIT09IHZvaWQgMCB8fCB0aGlzLmdldEFmdGVyICE9PSB2b2lkIDBcbiAgICAgICAgICAgICAgPyAoKSA9PiBbaCgnZGl2Jywge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiAnZmxleCBuby13cmFwIGl0ZW1zLWNlbnRlciBtYXJnaW4tbWluJ1xuICAgICAgICAgICAgICB9LCBbdGhpcy5nZXRBZnRlciAhPT0gdm9pZCAwID8gdGhpcy5nZXRBZnRlcihoKSA6IHZvaWQgMCwgdGhpcy4kc2NvcGVkU2xvdHMuYWZ0ZXIgIT09IHZvaWQgMCAmJiB0aGlzLmdldEFmdGVyID09PSB2b2lkIDAgPyB0aGlzLiRzY29wZWRTbG90cy5hZnRlcigpIDogdm9pZCAwXSldIDogdm9pZCAwXG4gICAgICAgICAgfVxuICAgICAgICB9KSxcblxuICAgICAgICB0aGlzLmhhc0Vycm9yID8gaCgnZGl2Jywge1xuICAgICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctZmllbGRfX2Vycm9yIGZsZXggbm8td3JhcCBpdGVtcy1jZW50ZXInXG4gICAgICAgIH0sIHRoaXMuY29tcHV0ZWRFcnJvck1lc3NhZ2UpIDogdm9pZCAwXG4gICAgICBdKVxuICAgIF0pXG4gIH1cbn1cbiAgIiwiaW1wb3J0IEZpZWxkIGZyb20gJy4vc3JjL21haW4uanMnXG5cbmNvbnN0IGluc3RhbGwgPSBmdW5jdGlvbiAoVnVlKSB7XG4gIFZ1ZS5jb21wb25lbnQoRmllbGQubmFtZSwgRmllbGQpXG59XG5cbkZpZWxkLmluc3RhbGwgPSBpbnN0YWxsXG5cbmV4cG9ydCBkZWZhdWx0IEZpZWxkXG4iLCJpbXBvcnQgRmllbGQgZnJvbSAnLi4vLi4vZmllbGQnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3N3SW5wdXQnLFxuICBtaXhpbnM6IFtGaWVsZF0sIC8vIGZvY3VzZWQsZGlzYWJsZWRcbiAgcHJvcHM6IHtcbiAgICB2YWx1ZTogU3RyaW5nLFxuICAgIHBsYWNlaG9sZGVyOiBTdHJpbmdcbiAgfSxcbiAgZGF0YTogKCkgPT4gKHt9KSxcbiAgY29tcHV0ZWQ6IHt9LFxuICBtZXRob2RzOiB7XG4gICAgZm9jdXMoKSB7XG4gICAgICB0aGlzLiRyZWZzLmlucHV0LmZvY3VzKClcbiAgICB9LFxuICAgIGJsdXIoKSB7XG4gICAgICB0aGlzLiRyZWZzLmlucHV0LmJsdXIoKVxuICAgIH0sXG4gICAgZ2V0SW5uZXIoaCkge1xuICAgICAgcmV0dXJuIFtoKCdpbnB1dCcsIHtcbiAgICAgICAgcmVmOiAnaW5wdXQnLFxuICAgICAgICBzdGF0aWNDbGFzczogJ3N3LWlucHV0IG1hcmdpbi1taW4nLFxuICAgICAgICBkb21Qcm9wczoge1xuICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlLFxuICAgICAgICAgIHBsYWNlaG9sZGVyOiB0aGlzLnBsYWNlaG9sZGVyIHx8ICcnLFxuICAgICAgICAgIGRpc2FibGVkOiB0aGlzLmRpc2FibGVkXG4gICAgICAgIH0sXG4gICAgICAgIG9uOiB7XG4gICAgICAgICAgLi4udGhpcy4kbGlzdGVuZXJzLFxuICAgICAgICAgIGlucHV0OiBlID0+IHtcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2lucHV0JywgZS50YXJnZXQudmFsdWUpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KV1cbiAgICB9XG4gIH1cbn1cbiAgIiwiaW1wb3J0IElucHV0IGZyb20gJy4vc3JjL21haW4uanMnXG5cbmNvbnN0IGluc3RhbGwgPSBmdW5jdGlvbiAoVnVlKSB7XG4gIFZ1ZS5jb21wb25lbnQoSW5wdXQubmFtZSwgSW5wdXQpXG59XG5cbklucHV0Lmluc3RhbGwgPSBpbnN0YWxsXG5cbmV4cG9ydCBkZWZhdWx0IElucHV0XG4iLCJleHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdzd1Njcm9sbEFyZWEnLFxuICBwcm9wczoge1xuICAgIHg6IEJvb2xlYW4sXG4gICAgeTogQm9vbGVhbixcbiAgICB3aWR0aDogU3RyaW5nLFxuICAgIGhlaWdodDogU3RyaW5nXG4gIH0sXG4gIGRhdGE6ICgpID0+ICh7fSksXG4gIGNvbXB1dGVkOiB7XG4gICAgc3R5bGUoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAnb3ZlcmZsb3cteCc6IHRoaXMueCA/ICdhdXRvJyA6IHZvaWQgMCxcbiAgICAgICAgJ292ZXJmbG93LXknOiB0aGlzLnkgPyAnYXV0bycgOiB2b2lkIDAsXG4gICAgICAgIHdpZHRoOiB0aGlzLndpZHRoIHx8ICcxMDAlJyxcbiAgICAgICAgJ21heC1oZWlnaHQnOiB0aGlzLmhlaWdodCB8fCAnMTAwJSdcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHt9LFxuICByZW5kZXIoaCkge1xuICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICBzdGF0aWNDbGFzczogJ3N3LXNjcm9sbC1hcmVhJyxcbiAgICAgIHN0eWxlOiB0aGlzLnN0eWxlLFxuICAgICAgb246IHRoaXMuJGxpc3RlbmVyc1xuICAgIH0sIHRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQgIT09IHZvaWQgMCA/IFt0aGlzLiRzY29wZWRTbG90cy5kZWZhdWx0KCldIDogdm9pZCAwKVxuICB9XG59XG4gICIsImltcG9ydCBTY3JvbGxBcmVhIGZyb20gJy4vc3JjL21haW4uanMnXG5cbmNvbnN0IGluc3RhbGwgPSBmdW5jdGlvbiAoVnVlKSB7XG4gIFZ1ZS5jb21wb25lbnQoU2Nyb2xsQXJlYS5uYW1lLCBTY3JvbGxBcmVhKVxufVxuXG5TY3JvbGxBcmVhLmluc3RhbGwgPSBpbnN0YWxsXG5cbmV4cG9ydCBkZWZhdWx0IFNjcm9sbEFyZWFcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXNlbGYtY29tcGFyZSAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRGVlcEVxdWFsKGEsIGIpIHtcbiAgaWYgKGEgPT09IGIpIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgaWYgKGEgaW5zdGFuY2VvZiBEYXRlICYmIGIgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgcmV0dXJuIGEuZ2V0VGltZSgpID09PSBiLmdldFRpbWUoKVxuICB9XG5cbiAgaWYgKGEgIT09IGEgJiYgYiAhPT0gYikge1xuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBpZiAoYSAhPT0gT2JqZWN0KGEpIHx8IGIgIT09IE9iamVjdChiKSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgY29uc3QgcHJvcHMgPSBPYmplY3Qua2V5cyhhKVxuXG4gIGlmIChwcm9wcy5sZW5ndGggIT09IE9iamVjdC5rZXlzKGIpLmxlbmd0aCkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgcmV0dXJuIHByb3BzLmV2ZXJ5KHByb3AgPT4gaXNEZWVwRXF1YWwoYVtwcm9wXSwgYltwcm9wXSkpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZ0NvbnRhaW4ocywgdikge1xuICBsZXQgaW5uZXJTID0gU3RyaW5nKHMpXG4gIGxldCBpbm5lclYgPSBBcnJheS5pc0FycmF5KHYpID8gdiA6IFt2XVxuICBsZXQgc3VtID0gMFxuXG4gIGlubmVyVi5mb3JFYWNoKHggPT4ge1xuICAgIGlmIChpbm5lclMuaW5jbHVkZXMoeCkpIHtcbiAgICAgIGlubmVyUyA9IGlubmVyUy5yZXBsYWNlKHgsICcnKVxuICAgICAgc3VtKytcbiAgICB9XG4gIH0pXG4gIHJldHVybiBzdW0gPj0gaW5uZXJWLmxlbmd0aFxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNPYmplY3Qodikge1xuICByZXR1cm4gT2JqZWN0KHYpID09PSB2XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0RhdGUodikge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHYpID09PSAnW29iamVjdCBEYXRlXSdcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUmVnZXhwKHYpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2KSA9PT0gJ1tvYmplY3QgUmVnRXhwXSdcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtYmVyKHYpIHtcbiAgcmV0dXJuIHR5cGVvZiB2ID09PSAnbnVtYmVyJyAmJiBpc0Zpbml0ZSh2KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmcodikge1xuICByZXR1cm4gdHlwZW9mIHYgPT09ICdzdHJpbmcnXG59XG4iLCJpbXBvcnQgRmllbGQgZnJvbSAnLi4vLi4vZmllbGQnXG5pbXBvcnQgU2NvcmxsQXJlYSBmcm9tICcuLi8uLi9zY3JvbGxBcmVhJ1xuaW1wb3J0IHsgaXNEZWVwRXF1YWwsIGlzU3RyaW5nQ29udGFpbiwgaXNPYmplY3QgfSBmcm9tICcuLi8uLi8uLi91dGlscy9pcydcblxuLy8gaW1wb3J0IHsgZGVkdXBsaWNhdGUgfSBmcm9tICcuLi8uLi8uLi91dGlscy9kZWR1cGxpY2F0ZSdcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnc3dTZWxlY3QnLFxuICBtaXhpbnM6IFtGaWVsZF0sIC8vIGZvY3VzZWQsZGlzYWJsZWRcbiAgY29tcG9uZW50czoge1xuICAgIFNjb3JsbEFyZWFcbiAgfSxcbiAgcHJvcHM6IHtcbiAgICBtdWx0aXBsZTogQm9vbGVhbixcbiAgICB2YWx1ZToge1xuICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICB9LFxuICAgIG9wdGlvbnM6IEFycmF5LFxuICAgIGZpbHRlcjogQm9vbGVhbixcbiAgICBwbGFjZWhvbGRlcjogU3RyaW5nLFxuICAgIG9wdGlvbnNIZWlnaHQ6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICcyMDBweCdcbiAgICB9LFxuICAgIHNlbGVjdGVkU3R5bGU6IFN0cmluZ1xuICB9LFxuICBkYXRhOiAoKSA9PiAoe1xuICAgIGJsdXJUeXBlOiAncmV2ZXJzZScsXG4gICAgZmlsdGVyVmFsdWU6ICcnXG4gIH0pLFxuICBjb21wdXRlZDoge1xuICAgIGV4Y2x1ZGVkQmx1clJlZnMoKSB7XG4gICAgICByZXR1cm4gdGhpcy5maWx0ZXIgPyBbJ2lucHV0JywgJ3NlbGVjdGVkJywgJ3NlbGVjdE9wdGlvbnMnXSA6IFsnc2VsZWN0ZWQnLCAnc2VsZWN0T3B0aW9ucyddXG4gICAgfSxcbiAgICBpbm5lclZhbHVlOiB7XG4gICAgICBnZXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEV4YWN0VmFsdWVzKHRoaXMudmFsdWUpXG4gICAgICB9LFxuICAgICAgc2V0KHZhbCkge1xuICAgICAgICB0aGlzLiRlbWl0KFxuICAgICAgICAgICdpbnB1dCcsXG4gICAgICAgICAgdmFsXG4gICAgICAgIClcbiAgICAgIH1cbiAgICB9LFxuICAgIGlubmVyT3B0aW9ucygpIHtcbiAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMucmVkdWNlKChhLCBjKSA9PiB7XG4gICAgICAgIGxldCBmaWx0ZXJBcnIgPSB0aGlzLmZpbHRlclZhbHVlLnJlcGxhY2UoL1xccysvZywgJycpLnNwbGl0KCcnKVxuXG4gICAgICAgIGlmIChpc1N0cmluZ0NvbnRhaW4odGhpcy5nZXROYW1lKGMpLCBmaWx0ZXJBcnIpKSB7XG4gICAgICAgICAgYS5wdXNoKGMpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFcbiAgICAgIH0sIFtdKSB8fCBbXVxuICAgIH1cbiAgfSxcbiAgd2F0Y2g6IHtcbiAgICBvcHRpb25zKCkge1xuICAgICAgdGhpcy5pbm5lclZhbHVlID0gdGhpcy5nZXRFeGFjdFZhbHVlcyh0aGlzLnZhbHVlKVxuICAgIH1cbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGZvY3VzKCkge1xuICAgICAgdGhpcy4kbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICB0aGlzLiRyZWZzLmlucHV0LmZvY3VzKClcbiAgICAgIH0pXG4gICAgfSxcbiAgICBibHVyKCkge1xuICAgICAgdGhpcy4kcmVmcy5pbnB1dC5ibHVyKClcbiAgICB9LFxuICAgIGNsZWFyRmlsdGVyKCkge1xuICAgICAgdGhpcy5maWx0ZXJWYWx1ZSA9ICcnXG4gICAgfSxcbiAgICB0cmlnZ2VyQmx1cihlKSB7XG4gICAgICB0aGlzLmZvY3VzZWQgPSBmYWxzZVxuICAgICAgdGhpcy4kZW1pdChgYmx1cmAsIGUpXG4gICAgfSxcbiAgICBnZXRJbm5lcihoKSB7XG4gICAgICBsZXQgZ2V0T3B0aW9ucyA9IGggPT4ge1xuICAgICAgICBpZiAodGhpcy5pbm5lck9wdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuaW5uZXJPcHRpb25zLm1hcChvcHRpb24gPT4gaCgnc3ctaXRlbScsIHtcbiAgICAgICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgICAgIHNlbGVjdGVkOiB0aGlzLmNoZWNrU2VsZWN0ZWQob3B0aW9uKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5hdGl2ZU9uOiB7XG4gICAgICAgICAgICAgIGNsaWNrOiBlID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmlubmVyVmFsdWUgPSB0aGlzLmZvcm1hdFZhbHVlKG9wdGlvbilcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyRmlsdGVyKClcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMubXVsdGlwbGUpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlckJsdXIoZSlcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgdGhpcy5mb2N1cygpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2NvcGVkU2xvdHM6IHtcbiAgICAgICAgICAgICAgZGVmYXVsdDogKCkgPT4gW2goJ2RpdicsIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogJ3N3LXNlbGVjdF9fb3B0aW9uJ1xuICAgICAgICAgICAgICB9LCBTdHJpbmcodGhpcy5nZXROYW1lKG9wdGlvbikpKV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gW2goJ3N3LWl0ZW0nLCB7XG4gICAgICAgICAgICBzY29wZWRTbG90czoge1xuICAgICAgICAgICAgICBkZWZhdWx0OiAoKSA9PiBbaCgnZGl2Jywge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctc2VsZWN0X19vcHRpb24gbm8tb3B0aW9ucydcbiAgICAgICAgICAgICAgfSwgJ25vIG9wdGlvbnMnKV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KV1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsZXQgZ2V0U2VsZWN0ZWQgPSBoID0+IHRoaXMuZ2V0RXhhY3RPcHRpb25zKHRoaXMuaW5uZXJWYWx1ZSkubWFwKHggPT4gaCgnc3ctaXRlbScsIHtcbiAgICAgICAgc3RhdGljQ2xhc3M6ICdtYXJnaW4tbWluIHN3LWZvcm0gc2VsZWN0ZWQtb3B0aW9uJyxcbiAgICAgICAgY2xhc3M6IHRoaXMuc2VsZWN0ZWRTdHlsZSA9PT0gdm9pZCAwXG4gICAgICAgICAgPyB7XG4gICAgICAgICAgICB1bmRlcmxpbmU6IHRoaXMudW5kZXJsaW5lZCxcbiAgICAgICAgICAgIGJvcmRlcjogdGhpcy5ib3JkZXJlZCxcbiAgICAgICAgICAgIGZpbGw6IHRoaXMuZmlsbGVkXG4gICAgICAgICAgfSA6IHtcbiAgICAgICAgICAgIFt0aGlzLnNlbGVjdGVkU3R5bGVdOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgcmVmOiAnc2VsZWN0ZWQnLFxuICAgICAgICByZWZJbkZvcjogdHJ1ZSxcbiAgICAgICAgc2NvcGVkU2xvdHM6IHtcbiAgICAgICAgICBkZWZhdWx0OiAoKSA9PiBbaCgnZGl2Jywge1xuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgcGFkZGluZzogdGhpcy5taW5pID8gJzNweCAwIDNweCA5cHgnIDogJzNweCA5cHgnLFxuICAgICAgICAgICAgICAnd2hpdGUtc3BhY2UnOiB0aGlzLm1pbmkgPyAnbm93cmFwJyA6IHZvaWQgMFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIFN0cmluZyh0aGlzLmdldE5hbWUoeCkpKV0sXG4gICAgICAgICAgYWZ0ZXI6ICF0aGlzLm1pbmkgPyAoKSA9PiBbaCgnc3ctaWNvbicsIHtcbiAgICAgICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgICAgICdob3Zlci1jb2xvci1wcmltYXJ5JzogdHJ1ZSxcbiAgICAgICAgICAgICAgJ2NvbG9yLWdyZXknOiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgJ2JvcmRlci1yYWRpdXMnOiAnNTAlJyxcbiAgICAgICAgICAgICAgcGFkZGluZzogJzAgM3B4IDAgMCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgICBuYW1lOiB0aGlzLmZpbGxlZCAmJiB0aGlzLnNlbGVjdGVkU3R5bGUgPT09IHZvaWQgMCB8fCB0aGlzLnNlbGVjdGVkU3R5bGUgPT09ICdmaWxsJyA/ICdjYW5jZWwnIDogJ2NsZWFyJyxcbiAgICAgICAgICAgICAgc2l6ZTogJzE0cHgnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbmF0aXZlT246IHtcbiAgICAgICAgICAgICAgY2xpY2s6ICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmlubmVyVmFsdWUgPSB0aGlzLmZvcm1hdFZhbHVlKHgsICdyZW1vdmUnKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSldIDogdm9pZCAwXG4gICAgICAgIH1cbiAgICAgIH0pKVxuXG4gICAgICByZXR1cm4gW2goJ3N3LWl0ZW0nLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiAnZmxleC1hdXRvJyxcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICB3cmFwOiB0cnVlLFxuICAgICAgICAgIGhpZGVEZWZhdWx0OiB0aGlzLmlubmVyVmFsdWUubGVuZ3RoID4gMCAmJiAoIXRoaXMuZm9jdXNlZCB8fCAhdGhpcy5maWx0ZXIpXG4gICAgICAgIH0sXG4gICAgICAgIHNjb3BlZFNsb3RzOiB7XG4gICAgICAgICAgYmVmb3JlOiB0aGlzLmlubmVyVmFsdWUubGVuZ3RoID4gMCA/ICgpID0+IGdldFNlbGVjdGVkKGgpIDogdm9pZCAwLFxuICAgICAgICAgIGRlZmF1bHQ6ICgpID0+IFtoKCdpbnB1dCcsIHtcbiAgICAgICAgICAgIHJlZjogJ2lucHV0JyxcbiAgICAgICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctaW5wdXQgbWFyZ2luLW1pbicsXG4gICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICBjdXJzb3I6ICF0aGlzLmZpbHRlciA/ICdwb2ludGVyJyA6IHZvaWQgMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRvbVByb3BzOiB7XG4gICAgICAgICAgICAgIHZhbHVlOiB0aGlzLmZpbHRlclZhbHVlLFxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogdGhpcy5wbGFjZWhvbGRlciB8fCAnJyxcbiAgICAgICAgICAgICAgZGlzYWJsZWQ6ICF0aGlzLmZpbHRlclxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgIC4uLnRoaXMuJGxpc3RlbmVycyxcbiAgICAgICAgICAgICAgaW5wdXQ6IGUgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyVmFsdWUgPSBlLnRhcmdldC52YWx1ZVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSldXG4gICAgICAgIH1cbiAgICAgIH0pLCB0aGlzLmZvY3VzZWQgPyBoKCdkaXYnLCB7XG4gICAgICAgIHJlZjogJ3NlbGVjdE9wdGlvbnMnLFxuICAgICAgICBzdGF0aWNDbGFzczogJ3N3LXNlbGVjdF9fb3B0aW9ucyBjb21tb24tc2hhZG93JyxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAnbWF4LWhlaWdodCc6IHRoaXMub3B0aW9uc0hlaWdodFxuICAgICAgICB9XG4gICAgICB9LCBbaCgnc3ctc2Nyb2xsLWFyZWEnLCB7XG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgeTogdHJ1ZSxcbiAgICAgICAgICBoZWlnaHQ6IHRoaXMub3B0aW9uc0hlaWdodFxuICAgICAgICB9LFxuICAgICAgICBzY29wZWRTbG90czoge1xuICAgICAgICAgIGRlZmF1bHQ6ICgpID0+IGdldE9wdGlvbnMoaClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIF0pIDogdm9pZCAwXVxuICAgIH0sXG4gICAgZ2V0QWZ0ZXIoaCkge1xuICAgICAgcmV0dXJuIFtoKCdzdy1pY29uJywge1xuICAgICAgICBwcm9wczoge1xuICAgICAgICAgIG5hbWU6IHRoaXMuZm9jdXNlZCA/ICdrZXlib2FyZF9hcnJvd191cCcgOiAna2V5Ym9hcmRfYXJyb3dfZG93bicsXG4gICAgICAgICAgc2l6ZTogJzIwcHgnXG4gICAgICAgIH0sXG4gICAgICAgIHN0YXRpY0NsYXNzOiAnY29sb3ItZ3JleSBob3Zlci1jb2xvci1wcmltYXJ5J1xuICAgICAgfSldXG4gICAgfSxcbiAgICBmb3JtYXRWYWx1ZShvcHRpb24sIG9wZSkge1xuICAgICAgbGV0IGR1cGxpY2F0ZWQgPSBmYWxzZVxuICAgICAgbGV0IHJlcyA9IFtdXG5cbiAgICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgIHRoaXMuaW5uZXJWYWx1ZS5mb3JFYWNoKHggPT4ge1xuICAgICAgICAgIGlmIChpc0RlZXBFcXVhbCh4LCB0aGlzLmdldFZhbHVlKG9wdGlvbikpKSB7XG4gICAgICAgICAgICBkdXBsaWNhdGVkID0gdHJ1ZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXMucHVzaCh4KVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSBpZiAob3BlID09PSAncmVtb3ZlJykgeyBkdXBsaWNhdGVkID0gdHJ1ZSB9XG4gICAgICBpZiAoIWR1cGxpY2F0ZWQpIHtcbiAgICAgICAgcmVzLnB1c2godGhpcy5nZXRWYWx1ZShvcHRpb24pKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc1xuICAgIH0sXG4gICAgY2hlY2tTZWxlY3RlZChvcHRpb24pIHtcbiAgICAgIHJldHVybiB0aGlzLmlubmVyVmFsdWUuc29tZSh4ID0+IGlzRGVlcEVxdWFsKHgsIHRoaXMuZ2V0VmFsdWUob3B0aW9uKSkpXG4gICAgfSxcbiAgICBnZXRFeGFjdFZhbHVlcyh2YWx1ZSkge1xuICAgICAgbGV0IHYgPSBBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlIDogW3ZhbHVlXVxuXG4gICAgICByZXR1cm4gdi5yZWR1Y2UoKGEsIGMpID0+IHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5zb21lKHggPT4gaXNEZWVwRXF1YWwodGhpcy5nZXRWYWx1ZSh4KSwgYykpKSB7XG4gICAgICAgICAgYS5wdXNoKGMpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFcbiAgICAgIH0sIFtdKVxuICAgIH0sXG4gICAgZ2V0RXhhY3RPcHRpb25zKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdmFsdWUucmVkdWNlKChhLCBjKSA9PiB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5mb3JFYWNoKHggPT4ge1xuICAgICAgICAgIGlmIChpc0RlZXBFcXVhbCh0aGlzLmdldFZhbHVlKHgpLCBjKSkge1xuICAgICAgICAgICAgYS5wdXNoKHgpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gYVxuICAgICAgfSwgW10pXG4gICAgfSxcbiAgICBnZXRWYWx1ZShvcHRpb24pIHtcbiAgICAgIHJldHVybiBpc09iamVjdChvcHRpb24pICYmIG9wdGlvbi5oYXNPd25Qcm9wZXJ0eSgndmFsdWUnKVxuICAgICAgICA/IG9wdGlvbi52YWx1ZSA6IG9wdGlvblxuICAgIH0sXG4gICAgZ2V0TmFtZShvcHRpb24pIHtcbiAgICAgIHJldHVybiBpc09iamVjdChvcHRpb24pICYmIG9wdGlvbi5oYXNPd25Qcm9wZXJ0eSgnbmFtZScpXG4gICAgICAgID8gb3B0aW9uLm5hbWUgOiBvcHRpb25cbiAgICB9XG4gIH1cbn1cbiAgIiwiaW1wb3J0IFNlbGVjdCBmcm9tICcuL3NyYy9tYWluLmpzJ1xuXG5jb25zdCBpbnN0YWxsID0gZnVuY3Rpb24gKFZ1ZSkge1xuICBWdWUuY29tcG9uZW50KFNlbGVjdC5uYW1lLCBTZWxlY3QpXG59XG5cblNlbGVjdC5pbnN0YWxsID0gaW5zdGFsbFxuXG5leHBvcnQgZGVmYXVsdCBTZWxlY3RcbiIsImltcG9ydCBJdGVtIGZyb20gJy4uLy4uL2l0ZW0nXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3N3QnV0dG9uJyxcbiAgY29tcG9uZW50czogeyBJdGVtIH0sXG4gIHByb3BzOiB7XG4gICAgdW5kZXJsaW5lZDogQm9vbGVhbixcbiAgICBib3JkZXJlZDogQm9vbGVhbixcbiAgICBmaWxsZWQ6IEJvb2xlYW4sXG4gICAgZGlzYWJsZWQ6IEJvb2xlYW4sXG4gICAgY29sb3I6IFN0cmluZyxcbiAgICBwcmltYXJ5OiBCb29sZWFuLFxuICAgIG5lZ2F0aXZlOiBCb29sZWFuLFxuICAgIHBvc2l0aXZlOiBCb29sZWFuLFxuICAgIHdhcm5pbmc6IEJvb2xlYW4sXG4gICAgcm91bmQ6IEJvb2xlYW4sXG4gICAgc2hhZG93OiBCb29sZWFuLFxuICAgIG5vSG92ZXI6IEJvb2xlYW4sXG4gICAgdG86IFN0cmluZyB8IE9iamVjdFxuICB9LFxuICBkYXRhOiAoKSA9PiAoe1xuICAgIG1vdXNlb3ZlcjogZmFsc2VcbiAgfSksXG4gIHJlbmRlcihoKSB7XG4gICAgcmV0dXJuIGgoJ2J1dHRvbicsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiAnc3ctYnV0dG9uIGZsZXggbm8td3JhcCBpdGVtcy1jZW50ZXInLFxuICAgICAgc3R5bGU6IHtcbiAgICAgICAgY29sb3I6ICF0aGlzLmRpc2FibGVkICYmICF0aGlzLmZpbGxlZCAmJiB0aGlzLmNvbG9yIHx8IHZvaWQgMCxcbiAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiAhdGhpcy5kaXNhYmxlZCAmJiB0aGlzLmZpbGxlZCAmJiB0aGlzLmNvbG9yIHx8IHZvaWQgMFxuICAgICAgfSxcbiAgICAgIGNsYXNzOiB7XG4gICAgICAgIHVuZGVybGluZTogdGhpcy51bmRlcmxpbmVkLFxuICAgICAgICBib3JkZXI6IHRoaXMuYm9yZGVyZWQsXG4gICAgICAgIGZpbGw6IHRoaXMuZmlsbGVkLFxuICAgICAgICBwcmltYXJ5OiB0aGlzLnByaW1hcnksXG4gICAgICAgIG5lZ2F0aXZlOiB0aGlzLm5lZ2F0aXZlLFxuICAgICAgICBwb3NpdGl2ZTogdGhpcy5wb3NpdGl2ZSxcbiAgICAgICAgd2FybmluZzogdGhpcy53YXJuaW5nLFxuICAgICAgICBncmV5OiB0aGlzLmRpc2FibGVkLFxuICAgICAgICByb3VuZDogdGhpcy5yb3VuZCAmJiAhdGhpcy51bmRlcmxpbmVkLFxuICAgICAgICAnY29tbW9uLXNoYWRvdyc6IHRoaXMuc2hhZG93ICYmICh0aGlzLmJvcmRlcmVkIHx8IHRoaXMuZmlsbGVkKVxuICAgICAgfSxcbiAgICAgIG9uOiB0aGlzLmRpc2FibGVkID8gdm9pZCAwIDoge1xuICAgICAgICAuLi50aGlzLiRsaXN0ZW5lcnMsXG4gICAgICAgIG1vdXNlb3ZlcjogZSA9PiB7XG4gICAgICAgICAgdGhpcy5tb3VzZW92ZXIgPSB0cnVlXG4gICAgICAgICAgdGhpcy4kZW1pdCgnbW91c2VvdmVyJywgZSlcbiAgICAgICAgfSxcbiAgICAgICAgbW91c2VvdXQ6IGUgPT4ge1xuICAgICAgICAgIHRoaXMubW91c2VvdmVyID0gZmFsc2VcbiAgICAgICAgICB0aGlzLiRlbWl0KCdtb3VzZW91dCcsIGUpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCBbXG4gICAgICBoKCdzdy1pdGVtJywge1xuICAgICAgICBzdGF0aWNDbGFzczogJ2ZsZXgtYXV0bycsXG4gICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgJ3JvdW5kLXNsb3QnOiB0aGlzLiRzY29wZWRTbG90cy5yb3VuZFxuICAgICAgICB9LFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgICd6LWluZGV4JzogMSxcbiAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJyxcbiAgICAgICAgfSxcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICB0bzogdGhpcy50b1xuICAgICAgICB9LFxuICAgICAgICBzY29wZWRTbG90czogdGhpcy4kc2NvcGVkU2xvdHMucm91bmQgIT09IHZvaWQgMFxuICAgICAgICAgID8ge1xuICAgICAgICAgICAgZGVmYXVsdDogKCkgPT4gW2goJ2RpdicsIHtcbiAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6ICdmbGV4IG5vLXdyYXAgaXRlbXMtY2VudGVyIG1hcmdpbi1taW4gc3ctYnV0dG9uX19pbm5lciBmbGV4LWF1dG8nXG4gICAgICAgICAgICB9LCBbdGhpcy4kc2NvcGVkU2xvdHMucm91bmQoKV0pXVxuICAgICAgICAgIH0gOiB7XG4gICAgICAgICAgICBiZWZvcmU6IHRoaXMuJHNjb3BlZFNsb3RzLmJlZm9yZSAhPT0gdm9pZCAwXG4gICAgICAgICAgICAgID8gKCkgPT4gW2goJ2RpdicsIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogJ2ZsZXggbm8td3JhcCBpdGVtcy1jZW50ZXIgbWFyZ2luLW1pbiBzdy1idXR0b25fX2JlZm9yZSdcbiAgICAgICAgICAgICAgfSwgW3RoaXMuJHNjb3BlZFNsb3RzLmJlZm9yZSgpXSldIDogdm9pZCAwLFxuICBcbiAgICAgICAgICAgIGRlZmF1bHQ6IHRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQgIT09IHZvaWQgMFxuICAgICAgICAgICAgICA/ICgpID0+IFtoKCdkaXYnLCB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6ICdmbGV4IG5vLXdyYXAgaXRlbXMtY2VudGVyIG1hcmdpbi1taW4gc3ctYnV0dG9uX19pbm5lciBmbGV4LWF1dG8nXG4gICAgICAgICAgICAgIH0sIFt0aGlzLiRzY29wZWRTbG90cy5kZWZhdWx0KCldKV0gOiB2b2lkIDAsXG4gIFxuICAgICAgICAgICAgYWZ0ZXI6IHRoaXMuJHNjb3BlZFNsb3RzLmFmdGVyICE9PSB2b2lkIDBcbiAgICAgICAgICAgICAgPyAoKSA9PiBbaCgnZGl2Jywge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiAnZmxleCBuby13cmFwIGl0ZW1zLWNlbnRlciBtYXJnaW4tbWluIHN3LWJ1dHRvbl9fYWZ0ZXInXG4gICAgICAgICAgICAgIH0sIFt0aGlzLiRzY29wZWRTbG90cy5hZnRlcigpXSldIDogdm9pZCAwXG4gICAgICAgICAgfVxuICAgICAgfSksXG4gICAgICBoKCdkaXYnLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctbWFzaycsXG4gICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgaW52aXNpYmxlOiAhdGhpcy5kaXNhYmxlZCAmJiAoIXRoaXMubW91c2VvdmVyIHx8IHRoaXMubm9Ib3ZlcilcbiAgICAgICAgfSxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAnei1pbmRleCc6IHRoaXMuZGlzYWJsZWQgPyA5IDogMCxcbiAgICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6IHRoaXMuZGlzYWJsZWQgPyAndHJhbnNwYXJlbnQnIDogJ2N1cnJlbnRDb2xvcidcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICBdKVxuICB9XG59XG4gICIsImltcG9ydCBCdXR0b24gZnJvbSAnLi9zcmMvbWFpbi5qcydcblxuY29uc3QgaW5zdGFsbCA9IGZ1bmN0aW9uIChWdWUpIHtcbiAgVnVlLmNvbXBvbmVudChCdXR0b24ubmFtZSwgQnV0dG9uKVxufVxuXG5CdXR0b24uaW5zdGFsbCA9IGluc3RhbGxcblxuZXhwb3J0IGRlZmF1bHQgQnV0dG9uXG4iLCJpbXBvcnQgc3dCdXR0b24gZnJvbSAnLi4vLi4vYnV0dG9uJ1xuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnc3dNb2RhbCcsXG4gIGNvbXBvbmVudHM6IHtcbiAgICBzd0J1dHRvblxuICB9LFxuICBwcm9wczoge1xuICAgIHNob3c6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICB9LFxuICAgIHRpdGxlOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAn5Z+65pys55So5rOVdGl0bGUnXG4gICAgfSxcbiAgICB3aWR0aDoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJzQwJSdcbiAgICB9XG4gIH0sXG4gIGNvbXB1dGVkOiB7XG4gICAgc3R5bGUoKSB7XG4gICAgICBpZiAodGhpcy5zaG93KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgekluZGV4OiA5OTksXG4gICAgICAgICAgb3BhY2l0eTogMVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHpJbmRleDogLTEwLFxuICAgICAgICAgIG9wYWNpdHk6IDBcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGhhbmRsZUNhbmNlbCgpIHtcbiAgICAgIHRoaXMuJGVtaXQoJ2NhbmNlbCcpXG4gICAgfSxcbiAgICBoYW5kbGVDb25maXJtKCkge1xuICAgICAgdGhpcy4kZW1pdCgnY29uZmlybScpXG4gICAgfSxcbiAgfSxcbiAgcmVuZGVyKGgpIHtcbiAgICByZXR1cm4gaCgnZGl2Jyx7XG4gICAgICBzdGF0aWNDbGFzczogJ3N3LW1vZGFsLW1hc2snLFxuICAgICAgc3R5bGU6IHRoaXMuc3R5bGUsXG4gICAgICBvbjoge1xuICAgICAgICBjbGljazogdGhpcy5oYW5kbGVDYW5jZWxcbiAgICAgIH0gXG4gICAgfSwgWyBoKCdkaXYnLCB7IFxuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogJ3N3LW1vZGFsJyxcbiAgICAgICAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAgICAgICBzaG93TW9kYWw6IHRoaXMuc2hvdyxcbiAgICAgICAgICAgICAgICBoaWRlTW9kYWw6ICF0aGlzLnNob3dcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICB3aWR0aDogdGhpcy53aWR0aFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgIGNsaWNrOiBldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgWyB0aGlzLiRzY29wZWRTbG90cy5oZWFkZXIgPT09IHZvaWQgMCBcbiAgICAgICAgICAgICAgICA/IGgoJ2RpdicsIFxuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiAnc3ctbW9kYWwtdGl0bGUnXG4gICAgICAgICAgICAgICAgICAgICAgfSwgWyBoKCdzcGFuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6ICdzdy1tb2RhbC10aXRsZS10ZXh0J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGl0bGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgaCgnc3BhbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiAnc3ctbW9kYWwtY2xvc2UtaWNvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6ICgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVDYW5jZWwoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGgoJ2knLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiAnbWF0ZXJpYWwtaWNvbnMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdjbG9zZScpIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICA6IHRoaXMuJHNjb3BlZFNsb3RzLmhlYWRlcigpLFxuICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlZFNsb3RzLmNvbnRlbnQoKSxcbiAgICAgICAgICAgICAgICB0aGlzLiRzY29wZWRTbG90cy5mb290ZXIgPT09IHZvaWQgMCBcbiAgICAgICAgICAgICAgICA/IGgoJ2RpdicsIFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzczogJ3N3LW1vZGFsLWZvb3RlcidcbiAgICAgICAgICAgICAgICAgICAgfSwgXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICBoKCdzdy1idXR0b24nLHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiAnYnRuIGxlZnQtYnRuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiAoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVDYW5jZWwoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfSwgJ+WPlua2iCcpLFxuICAgICAgICAgICAgICAgICAgICAgIGgoJ3N3LWJ1dHRvbicse1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6ICdidG4gcmlnaHQtYnRuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiAoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVDb25maXJtKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH0sICfnoa7lrponKVxuICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgIDogdGhpcy4kc2NvcGVkU2xvdHMuZm9vdGVyXG4gICAgICAgICAgICAgIF0gICAgICAgICAgICAgIFxuICAgICAgICAgIClcbiAgICAgICAgXVxuICAgIClcbiAgfVxufSIsImltcG9ydCBNb2RhbCBmcm9tICcuL3NyYy9tYWluLmpzJ1xuXG5jb25zdCBpbnN0YWxsID0gZnVuY3Rpb24gKFZ1ZSkge1xuICBWdWUuY29tcG9uZW50KE1vZGFsLm5hbWUsIE1vZGFsKVxufVxuXG5Nb2RhbC5pbnN0YWxsID0gaW5zdGFsbFxuXG5leHBvcnQgZGVmYXVsdCBNb2RhbFxuIiwiaW1wb3J0IFZ1ZSBmcm9tICd2dWUnXG5cbmNvbnN0IGlzU2VydmVyID0gVnVlLnByb3RvdHlwZS4kaXNTZXJ2ZXI7XG5cbmV4cG9ydCBmdW5jdGlvbiBvZmZzZXQoZWwpIHtcbiAgaWYgKGVsID09PSB3aW5kb3cpIHtcbiAgICByZXR1cm4geyB0b3A6IDAsIGxlZnQ6IDAgfVxuICB9XG4gIGNvbnN0IHsgdG9wLCBsZWZ0IH0gPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuXG4gIHJldHVybiB7IHRvcCwgbGVmdCB9XG59XG4gIFxuZXhwb3J0IGZ1bmN0aW9uIHN0eWxlKGVsLCBwcm9wZXJ0eSkge1xuICByZXR1cm4gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwpLmdldFByb3BlcnR5VmFsdWUocHJvcGVydHkpXG59XG4gIFxuZXhwb3J0IGZ1bmN0aW9uIGhlaWdodChlbCkge1xuICByZXR1cm4gZWwgPT09IHdpbmRvd1xuICAgID8gd2luZG93LmlubmVySGVpZ2h0XG4gICAgOiBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHRcbn1cbiAgXG5leHBvcnQgZnVuY3Rpb24gd2lkdGgoZWwpIHtcbiAgcmV0dXJuIGVsID09PSB3aW5kb3dcbiAgICA/IHdpbmRvdy5pbm5lcldpZHRoXG4gICAgOiBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aFxufVxuICBcbmV4cG9ydCBmdW5jdGlvbiBjc3MoZWxlbWVudCwgY3NzKSB7XG4gIGxldCBzdHlsZSA9IGVsZW1lbnQuc3R5bGVcbiAgXG4gIE9iamVjdC5rZXlzKGNzcykuZm9yRWFjaChwcm9wID0+IHtcbiAgICBzdHlsZVtwcm9wXSA9IGNzc1twcm9wXVxuICB9KVxufVxuICBcbmV4cG9ydCBmdW5jdGlvbiBjc3NCYXRjaChlbGVtZW50cywgc3R5bGUpIHtcbiAgZWxlbWVudHMuZm9yRWFjaChlbCA9PiBjc3MoZWwsIHN0eWxlKSlcbn1cbiAgXG5leHBvcnQgZnVuY3Rpb24gcmVhZHkoZm4pIHtcbiAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVyblxuICB9XG4gIFxuICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSAhPT0gJ2xvYWRpbmcnKSB7XG4gICAgcmV0dXJuIGZuKClcbiAgfVxuICBcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZuLCBmYWxzZSlcbn1cblxuZXhwb3J0IGNvbnN0IG9uID0gKGZ1bmN0aW9uKCkge1xuICBpZiAoIWlzU2VydmVyICYmIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oZWxlbWVudCwgZXZlbnQsIGhhbmRsZXIpIHtcbiAgICAgIGlmIChlbGVtZW50ICYmIGV2ZW50ICYmIGhhbmRsZXIpIHtcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oZWxlbWVudCwgZXZlbnQsIGhhbmRsZXIpIHtcbiAgICAgIGlmIChlbGVtZW50ICYmIGV2ZW50ICYmIGhhbmRsZXIpIHtcbiAgICAgICAgZWxlbWVudC5hdHRhY2hFdmVudCgnb24nICsgZXZlbnQsIGhhbmRsZXIpO1xuICAgICAgfVxuICAgIH07XG4gIH1cbn0pKCk7XG5cbmV4cG9ydCBjb25zdCBvZmYgPSAoZnVuY3Rpb24oKSB7XG4gIGlmICghaXNTZXJ2ZXIgJiYgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcikge1xuICAgIHJldHVybiBmdW5jdGlvbihlbGVtZW50LCBldmVudCwgaGFuZGxlcikge1xuICAgICAgaWYgKGVsZW1lbnQgJiYgZXZlbnQpIHtcbiAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oZWxlbWVudCwgZXZlbnQsIGhhbmRsZXIpIHtcbiAgICAgIGlmIChlbGVtZW50ICYmIGV2ZW50KSB7XG4gICAgICAgIGVsZW1lbnQuZGV0YWNoRXZlbnQoJ29uJyArIGV2ZW50LCBoYW5kbGVyKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG59KSgpOyAgXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgb2Zmc2V0LFxuICBzdHlsZSxcbiAgaGVpZ2h0LFxuICB3aWR0aCxcbiAgY3NzLFxuICBjc3NCYXRjaCxcbiAgcmVhZHksXG4gIG9uLFxuICBvZmZcbn0iLCJpbXBvcnQgeyBvbiwgb2ZmIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvZG9tJyBcbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3N3UG9wb3ZlcicsXG4gIGRhdGEgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBwb3BvdmVyU3R5bGU6IHt9LFxuICAgICAgYXJyb3dTdHlsZToge30sXG4gICAgICBzaG93OiBmYWxzZSxcbiAgICAgIHJlZmVyZW5jZUVsbToge31cbiAgICB9XG4gIH0sXG4gIG1vZGVsOiB7XG4gICAgcHJvcDogJ3ZhbHVlJyxcbiAgICBldmVudDogJ3VwZGF0ZSdcbiAgfSxcbiAgcHJvcHM6IHtcbiAgICB2YWx1ZToge1xuICAgICAgdHlwZTogQm9vbGVhblxuICAgIH0sXG4gICAgdGl0bGU6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICB9LFxuICAgIGNvbnRlbnQ6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICB9LFxuICAgIHBsYWNlbWVudDoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ3RvcCdcbiAgICB9LFxuICAgIHRyaWdnZXI6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdjbGljaycsXG4gICAgICB2YWxpZGF0b3I6IHZhbHVlID0+IFsnY2xpY2snLCAnZm9jdXMnLCAnaG92ZXInLCAnbWFudWFsJ10uaW5kZXhPZih2YWx1ZSkgPiAtMVxuICAgIH0sXG4gICAgd2lkdGg6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICB9XG4gIH0sXG4gIGNvbXB1dGVkOiB7XG4gICAgc2hvd1ZhbHVlOiB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVcbiAgICAgIH0sXG4gICAgICBzZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIH1cbiAgICB9LFxuICAgIHNob3dTdHlsZSgpIHtcbiAgICAgIGlmICh0aGlzLnRyaWdnZXIgIT09ICdtYW51YWwnKSB7XG4gICAgICAgIGlmICh0aGlzLnNob3cpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgekluZGV4OiA5OTksXG4gICAgICAgICAgICBvcGFjaXR5OiAxXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB6SW5kZXg6IC0xMCxcbiAgICAgICAgICAgIG9wYWNpdHk6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLnNob3dWYWx1ZSkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB6SW5kZXg6IDk5OSxcbiAgICAgICAgICAgIG9wYWNpdHk6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHpJbmRleDogLTEwLFxuICAgICAgICAgICAgb3BhY2l0eTogMFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGdldFN0eWxlKHBvcG92ZXJFbG0sIHJlZmVyZW5jZUVsbSkge1xuICAgICAgc3dpdGNoICh0aGlzLnBsYWNlbWVudCkge1xuICAgICAgICBjYXNlICd0b3Atc3RhcnQnOlxuICAgICAgICAgIHRoaXMucG9wb3ZlclN0eWxlID0ge1xuICAgICAgICAgICAgdG9wOiAnLScgKyAocG9wb3ZlckVsbS5vZmZzZXRIZWlnaHQgKyAxMCkgKyAncHgnXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuYXJyb3dTdHlsZSA9IHtcbiAgICAgICAgICAgIGxlZnQ6IChyZWZlcmVuY2VFbG0ub2Zmc2V0V2lkdGggLyAyIC0gNSkgKyAncHgnXG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICd0b3AnOlxuICAgICAgICAgIHRoaXMucG9wb3ZlclN0eWxlID0ge1xuICAgICAgICAgICAgdG9wOiAnLScgKyAocG9wb3ZlckVsbS5vZmZzZXRIZWlnaHQgKyAxMCkgKyAncHgnLFxuICAgICAgICAgICAgbGVmdDogKHJlZmVyZW5jZUVsbS5vZmZzZXRXaWR0aCAtIHBvcG92ZXJFbG0ub2Zmc2V0V2lkdGgpIC8gMiArICdweCdcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5hcnJvd1N0eWxlID0ge1xuICAgICAgICAgICAgbGVmdDogKHBvcG92ZXJFbG0ub2Zmc2V0V2lkdGggLyAyIC0gNSkgKyAncHgnXG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgJ2JvdHRvbS1zdGFydCc6IFxuICAgICAgICAgIHRoaXMucG9wb3ZlclN0eWxlID0ge1xuICAgICAgICAgICAgdG9wOiAocmVmZXJlbmNlRWxtLm9mZnNldEhlaWdodCArIDEwKSArICdweCdcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5hcnJvd1N0eWxlID0ge1xuICAgICAgICAgICAgbGVmdDogKHJlZmVyZW5jZUVsbS5vZmZzZXRXaWR0aCAvIDIgLSA1KSArICdweCdcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWsgXG4gICAgICAgIGNhc2UgJ2JvdHRvbSc6XG4gICAgICAgICAgdGhpcy5wb3BvdmVyU3R5bGUgPSB7XG4gICAgICAgICAgICB0b3A6IChyZWZlcmVuY2VFbG0ub2Zmc2V0SGVpZ2h0ICsgMTApICsgJ3B4JyxcbiAgICAgICAgICAgIGxlZnQ6IChyZWZlcmVuY2VFbG0ub2Zmc2V0V2lkdGggLSBwb3BvdmVyRWxtLm9mZnNldFdpZHRoKSAvIDIgKyAncHgnXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuYXJyb3dTdHlsZSA9IHtcbiAgICAgICAgICAgIGxlZnQ6IChwb3BvdmVyRWxtLm9mZnNldFdpZHRoIC8gMiAtIDUpICsgJ3B4J1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlICdyaWdodC1zdGFydCc6XG4gICAgICAgICAgdGhpcy5wb3BvdmVyU3R5bGUgPSB7XG4gICAgICAgICAgICBsZWZ0OiAocmVmZXJlbmNlRWxtLm9mZnNldFdpZHRoICsgMTApICsgJ3B4JyxcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5hcnJvd1N0eWxlID0ge1xuICAgICAgICAgICAgdG9wOiAocmVmZXJlbmNlRWxtLm9mZnNldEhlaWdodCAvIDIgLSA1KSArICdweCdcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWsgIFxuICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgdGhpcy5wb3BvdmVyU3R5bGUgPSB7XG4gICAgICAgICAgICBsZWZ0OiAocmVmZXJlbmNlRWxtLm9mZnNldFdpZHRoICsgMTApICsgJ3B4JyxcbiAgICAgICAgICAgIHRvcDogKHJlZmVyZW5jZUVsbS5vZmZzZXRIZWlnaHQgLSBwb3BvdmVyRWxtLm9mZnNldEhlaWdodCkgLyAyICsgJ3B4J1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmFycm93U3R5bGUgPSB7XG4gICAgICAgICAgICB0b3A6IChwb3BvdmVyRWxtLm9mZnNldEhlaWdodCAvIDIgLSA1KSArICdweCdcbiAgICAgICAgICB9IFxuICAgICAgICAgIGJyZWFrIFxuICAgICAgICBjYXNlICdsZWZ0LXN0YXJ0JzpcbiAgICAgICAgICB0aGlzLnBvcG92ZXJTdHlsZSA9IHtcbiAgICAgICAgICAgIHJpZ2h0OiAocmVmZXJlbmNlRWxtLm9mZnNldFdpZHRoICsgMTApICsgJ3B4JyxcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5hcnJvd1N0eWxlID0ge1xuICAgICAgICAgICAgdG9wOiAocmVmZXJlbmNlRWxtLm9mZnNldEhlaWdodCAvIDIgLSA1KSArICdweCdcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgdGhpcy5wb3BvdmVyU3R5bGUgPSB7XG4gICAgICAgICAgICByaWdodDogKHJlZmVyZW5jZUVsbS5vZmZzZXRXaWR0aCArIDEwKSArICdweCcsXG4gICAgICAgICAgICB0b3A6IChyZWZlcmVuY2VFbG0ub2Zmc2V0SGVpZ2h0IC0gcG9wb3ZlckVsbS5vZmZzZXRIZWlnaHQpIC8gMiArICdweCdcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5hcnJvd1N0eWxlID0ge1xuICAgICAgICAgICAgdG9wOiAocG9wb3ZlckVsbS5vZmZzZXRIZWlnaHQgLyAyIC0gNSkgKyAncHgnXG4gICAgICAgICAgfSBcbiAgICAgICAgICBicmVhayAgICAgICAgXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSxcbiAgICBoYW5kbGVDbGljaygpIHtcbiAgICAgIHRoaXMuc2hvdyA9ICF0aGlzLnNob3dcbiAgICB9LFxuICAgIGhhbmRsZU1vdXNlRW50ZXIoKSB7XG4gICAgICB0aGlzLnNob3cgPSB0cnVlXG4gICAgfSxcbiAgICBoYW5kbGVNb3VzZUxlYXZlKCkge1xuICAgICAgdGhpcy5zaG93ID0gZmFsc2VcbiAgICB9LFxuICAgIGRvU2hvdygpIHtcbiAgICAgIHRoaXMuc2hvdyA9IHRydWVcbiAgICB9LFxuICAgIGRvQ2xvc2UoKSB7XG4gICAgICB0aGlzLnNob3cgPSBmYWxzZVxuICAgIH0sXG4gICAgaGFuZGxlTWFudWFsKCkge1xuICAgICAgdGhpcy5zaG93VmFsdWUgPSAhdGhpcy5zaG93VmFsdWVcbiAgICAgIHRoaXMuJGVtaXQoXCJ1cGRhdGVcIiwgdGhpcy5zaG93VmFsdWUpO1xuICAgIH1cbiAgfSxcbiAgbW91bnRlZCAoKSB7XG4gICAgbGV0IHBvcG92ZXJFbG0gPSB0aGlzLiRyZWZzLnBvcG92ZXJcbiAgICBsZXQgcmVmZXJlbmNlRWxtID0gdGhpcy5yZWZlcmVuY2VFbG0gPSB0aGlzLiRzY29wZWRTbG90cy5yZWZlcmVuY2UoKVswXS5lbG1cbiAgICB0aGlzLmdldFN0eWxlKHBvcG92ZXJFbG0sIHJlZmVyZW5jZUVsbSlcbiAgICBpZih0aGlzLnRyaWdnZXIgPT09ICdtYW51YWwnKXtcbiAgICAgIG9uKHJlZmVyZW5jZUVsbSwgJ2NsaWNrJywgdGhpcy5oYW5kbGVNYW51YWwpO1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGlmICh0aGlzLnRyaWdnZXIgPT09ICdjbGljaycpIHtcbiAgICAgIG9uKHJlZmVyZW5jZUVsbSwgJ2NsaWNrJywgdGhpcy5oYW5kbGVDbGljayk7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgaWYodGhpcy50cmlnZ2VyID09PSAnaG92ZXInKXtcbiAgICAgIG9uKHJlZmVyZW5jZUVsbSwgJ21vdXNlZW50ZXInLCB0aGlzLmhhbmRsZU1vdXNlRW50ZXIpXG4gICAgICBvbihyZWZlcmVuY2VFbG0sICdtb3VzZWxlYXZlJywgdGhpcy5oYW5kbGVNb3VzZUxlYXZlKTtcbiAgICB9XG4gICAgaWYodGhpcy50cmlnZ2VyID09PSAnZm9jdXMnKXtcbiAgICAgIGlmIChyZWZlcmVuY2VFbG0ucXVlcnlTZWxlY3RvcignaW5wdXQsIHRleHRhcmVhJykpIHtcbiAgICAgICAgb24ocmVmZXJlbmNlRWxtLCAnZm9jdXNpbicsIHRoaXMuZG9TaG93KTtcbiAgICAgICAgb24ocmVmZXJlbmNlRWxtLCAnZm9jdXNvdXQnLCB0aGlzLmRvQ2xvc2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb24ocmVmZXJlbmNlRWxtLCAnbW91c2Vkb3duJywgdGhpcy5kb1Nob3cpO1xuICAgICAgICBvbihyZWZlcmVuY2VFbG0sICdtb3VzZXVwJywgdGhpcy5kb0Nsb3NlKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGRlc3Ryb3llZCAoKSB7XG4gICAgY29uc3QgcmVmZXJlbmNlID0gdGhpcy5yZWZlcmVuY2VFbG07XG4gICAgb2ZmKHJlZmVyZW5jZSwgJ2NsaWNrJywgdGhpcy5oYW5kbGVDbGljayk7XG4gICAgb2ZmKHJlZmVyZW5jZSwgJ21vdXNldXAnLCB0aGlzLmRvQ2xvc2UpO1xuICAgIG9mZihyZWZlcmVuY2UsICdtb3VzZWRvd24nLCB0aGlzLmRvU2hvdyk7XG4gICAgb2ZmKHJlZmVyZW5jZSwgJ2ZvY3VzaW4nLCB0aGlzLmRvU2hvdyk7XG4gICAgb2ZmKHJlZmVyZW5jZSwgJ2ZvY3Vzb3V0JywgdGhpcy5kb0Nsb3NlKTtcbiAgICBvZmYocmVmZXJlbmNlLCAnbW91c2Vkb3duJywgdGhpcy5kb1Nob3cpO1xuICAgIG9mZihyZWZlcmVuY2UsICdtb3VzZXVwJywgdGhpcy5kb0Nsb3NlKTtcbiAgICBvZmYocmVmZXJlbmNlLCAnbW91c2VsZWF2ZScsIHRoaXMuaGFuZGxlTW91c2VMZWF2ZSk7XG4gICAgb2ZmKHJlZmVyZW5jZSwgJ21vdXNlZW50ZXInLCB0aGlzLmhhbmRsZU1vdXNlRW50ZXIpO1xuICAgIG9mZihkb2N1bWVudCwgJ2NsaWNrJywgdGhpcy5oYW5kbGVNYW51YWwpO1xuICB9LFxuICByZW5kZXIoaCkge1xuICAgIHJldHVybiBoKCdkaXYnLHtcbiAgICAgIGNsYXNzOiAnc3ctcG9wb3Zlci1jb250YWluJyxcbiAgICB9LCBbIGgoJ2RpdicsIFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogJ3N3LXBvcG92ZXInLFxuICAgICAgICAgICAgICBjbGFzczogJ3N3LXBvcG92ZXItc2hvdycsXG4gICAgICAgICAgICAgIHJlZjogJ3BvcG92ZXInLFxuICAgICAgICAgICAgICBzdHlsZTogT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHRoaXMucG9wb3ZlclN0eWxlLCB7d2lkdGg6IHRoaXMud2lkdGggfSksIHRoaXMuc2hvd1N0eWxlKVxuICAgICAgICB9LCBbIHRoaXMudGl0bGUgIFxuICAgICAgICAgICAgICA/IGgoJ2RpdicsIHtcbiAgICAgICAgICAgICAgICBjbGFzczogJ3N3LXBvcG92ZXItdGl0bGUnXG4gICAgICAgICAgICAgIH0sIHRoaXMudGl0bGUpXG4gICAgICAgICAgICAgIDogJycsIFxuICAgICAgICAgICAgIHRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQgPT09IHZvaWQgMFxuICAgICAgICAgICAgID8gaCgnZGl2Jywge1xuICAgICAgICAgICAgICAgIGNsYXNzOiAnc3ctcG9wb3Zlci1jb250ZW50J1xuICAgICAgICAgICAgIH0sIHRoaXMuY29udGVudCB8fCAnJyApXG4gICAgICAgICAgICAgIDogdGhpcy4kc2NvcGVkU2xvdHMuZGVmYXVsdCgpLFxuICAgICAgICAgICAgIGgoJ2Rpdicse1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiAnc3ctcG9wb3Zlci1hcnJvdycsXG4gICAgICAgICAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAgICAgICAnc3ctcG9wb3Zlci1hcnJvdy10b3AnOiB0aGlzLnBsYWNlbWVudC5pbmRleE9mKCd0b3AnKSA+PSAwID8gdHJ1ZSA6IGZhbHNlLFxuICAgICAgICAgICAgICAgICdzdy1wb3BvdmVyLWFycm93LWJvdHRvbSc6IHRoaXMucGxhY2VtZW50LmluZGV4T2YoJ2JvdHRvbScpID49IDAgPyB0cnVlIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgJ3N3LXBvcG92ZXItYXJyb3ctcmlnaHQnOiB0aGlzLnBsYWNlbWVudC5pbmRleE9mKCdyaWdodCcpID49IDAgPyB0cnVlIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgJ3N3LXBvcG92ZXItYXJyb3ctbGVmdCc6IHRoaXMucGxhY2VtZW50LmluZGV4T2YoJ2xlZnQnKSA+PSAwID8gdHJ1ZSA6IGZhbHNlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc3R5bGU6IHRoaXMuYXJyb3dTdHlsZVxuICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdKSwgXG4gICAgICAgIHRoaXMuJHNjb3BlZFNsb3RzLnJlZmVyZW5jZSA9PT0gdm9pZCAwIFxuICAgICAgICA/IGgoKVxuICAgICAgICA6IHRoaXMuJHNjb3BlZFNsb3RzLnJlZmVyZW5jZSgpXG4gICAgICBdKSBcbiAgfVxufSIsImltcG9ydCBQb3BvdmVyIGZyb20gJy4vc3JjL21haW4uanMnXG5cbmNvbnN0IGluc3RhbGwgPSBmdW5jdGlvbiAoVnVlKSB7XG4gIFZ1ZS5jb21wb25lbnQoTW9kYWwubmFtZSwgUG9wb3Zlcilcbn1cblxuUG9wb3Zlci5pbnN0YWxsID0gaW5zdGFsbFxuXG5leHBvcnQgZGVmYXVsdCBQb3BvdmVyXG4iLCJpbXBvcnQgSXRlbSBmcm9tICcuLi8uLi9pdGVtJ1xuaW1wb3J0IHsgaXNEZWVwRXF1YWwgfSBmcm9tICcuLi8uLi8uLi91dGlscy9pcydcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnc3dDaGVja2JveCcsXG4gIGNvbXBvbmVudHM6IHsgSXRlbSB9LFxuICBwcm9wczoge1xuICAgIHZhbHVlOiBCb29sZWFuIHwgQXJyYXksXG4gICAgdmFsOiB7XG4gICAgICByZXF1aXJlZDogZmFsc2VcbiAgICB9LFxuICAgIGxhYmVsOiBTdHJpbmcsXG4gICAgZGlzYWJsZWQ6IEJvb2xlYW4sXG4gICAgY29sb3I6IFN0cmluZyxcbiAgICBwcmltYXJ5OiBCb29sZWFuLFxuICAgIG5lZ2F0aXZlOiBCb29sZWFuLFxuICAgIHBvc2l0aXZlOiBCb29sZWFuLFxuICAgIHdhcm5pbmc6IEJvb2xlYW4sXG4gICAgbGVmdExhYmVsOiBCb29sZWFuLFxuICAgIGNvbG9yTGFiZWw6IEJvb2xlYW4sXG4gICAga2VlcENvbG9yOiBCb29sZWFuXG4gIH0sXG4gIGRhdGE6ICgpID0+ICh7XG4gICAgcGFyZW50OiB2b2lkIDBcbiAgfSksXG4gIGNvbXB1dGVkOiB7XG4gICAgbW9kZWwoKSB7XG4gICAgICByZXR1cm4gdGhpcy5wYXJlbnQgPT09IHZvaWQgMCA/IHRoaXMudmFsdWUgOiB0aGlzLnBhcmVudC52YWx1ZVxuICAgIH0sXG4gICAgcGFyZW50RGlzYWJsZWQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5wYXJlbnQgJiYgdGhpcy5wYXJlbnQuZGlzYWJsZWRcbiAgICB9LFxuICAgIGNoZWNrZWQ6IHtcbiAgICAgIGdldCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYm9vbGVhbk1vZGUgPyB0aGlzLm1vZGVsIDogdGhpcy5nZXRDaGVja2VkKHRoaXMudmFsKVxuICAgICAgfSxcbiAgICAgIHNldCh2YWwpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzLnBhcmVudCA9PT0gdm9pZCAwID8gdGhpcyA6IHRoaXMucGFyZW50XG5cbiAgICAgICAgc2VsZi4kZW1pdChcbiAgICAgICAgICAnaW5wdXQnLFxuICAgICAgICAgIHRoaXMuZm9ybWF0VmFsdWUodmFsKVxuICAgICAgICApXG4gICAgICB9XG4gICAgfSxcbiAgICBpbm5lclZhbHVlKCkge1xuICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkodGhpcy5tb2RlbCkgPyB0aGlzLm1vZGVsIDogW3RoaXMubW9kZWxdXG4gICAgfSxcbiAgICBib29sZWFuTW9kZSgpIHtcbiAgICAgIHJldHVybiB0aGlzLnZhbCA9PT0gdm9pZCAwXG4gICAgfVxuICB9LFxuICB3YXRjaDoge30sXG4gIG1ldGhvZHM6IHtcbiAgICBnZXRDaGVja2VkKHZhbCkge1xuICAgICAgcmV0dXJuIHRoaXMuaW5uZXJWYWx1ZS5zb21lKHggPT4gaXNEZWVwRXF1YWwoeCwgdmFsKSlcbiAgICB9LFxuICAgIGZvcm1hdFZhbHVlKGNoZWNrZWQpIHtcbiAgICAgIGlmICh0aGlzLmJvb2xlYW5Nb2RlKSB7IHJldHVybiBjaGVja2VkIH1cbiAgICAgIGxldCByZXMgPSBbXVxuXG4gICAgICB0aGlzLmlubmVyVmFsdWUuZm9yRWFjaCh4ID0+IHtcbiAgICAgICAgaWYgKCFpc0RlZXBFcXVhbCh4LCB0aGlzLnZhbCkpIHtcbiAgICAgICAgICByZXMucHVzaCh4KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgaWYgKGNoZWNrZWQpIHsgcmVzLnB1c2godGhpcy52YWwpIH1cbiAgICAgIHJldHVybiByZXNcbiAgICB9LFxuICB9LFxuICByZW5kZXIoaCkge1xuICAgIGxldCBjaGVja2VkID0gdGhpcy5jaGVja2VkXG4gICAgbGV0IGNvbG9yTGFiZWwgPSBjaGVja2VkICYmIHRoaXMuY29sb3JMYWJlbFxuICAgIGxldCBjb2xvckNoZWNrYm94ID0gY2hlY2tlZCB8fCB0aGlzLmtlZXBDb2xvclxuICAgIGxldCBnZXRMYWJlbCA9ICgpID0+IFtoKCdkaXYnLCB7XG4gICAgICBzdGF0aWNDbGFzczogJ3N3LWNoZWNrYm94X190ZXh0IG1hcmdpbi1taW4nLFxuICAgICAgY2xhc3M6IHtcbiAgICAgICAgJ2NvbG9yLXByaW1hcnknOiBjb2xvckxhYmVsID8gdGhpcy5wcmltYXJ5IDogdm9pZCAwLFxuICAgICAgICAnY29sb3ItbmVnYXRpdmUnOiBjb2xvckxhYmVsID8gdGhpcy5uZWdhdGl2ZSA6IHZvaWQgMCxcbiAgICAgICAgJ2NvbG9yLXBvc2l0aXZlJzogY29sb3JMYWJlbCA/IHRoaXMucG9zaXRpdmUgOiB2b2lkIDAsXG4gICAgICAgICdjb2xvci13YXJuaW5nJzogY29sb3JMYWJlbCA/IHRoaXMud2FybmluZyA6IHZvaWQgMFxuICAgICAgfSxcbiAgICAgIHN0eWxlOiB7XG4gICAgICAgIGNvbG9yOiBjb2xvckxhYmVsID8gdGhpcy5jb2xvciA6IHZvaWQgMFxuICAgICAgfVxuICAgIH0sIHRoaXMubGFiZWwpXVxuXG4gICAgcmV0dXJuIGgoJ3N3LWl0ZW0nLCB7XG4gICAgICBzdGF0aWNDbGFzczogJ3N3LWNoZWNrYm94JyxcbiAgICAgIHJlZjogJ2NoZWNrYm94JyxcbiAgICAgIGNsYXNzOiB7XG4gICAgICAgIGRpc2FibGU6IHRoaXMuZGlzYWJsZWQgfHwgdGhpcy5wYXJlbnREaXNhYmxlZFxuICAgICAgfSxcbiAgICAgIG5hdGl2ZU9uOiB7XG4gICAgICAgIGNsaWNrOiAoKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHsgcmV0dXJuIH1cbiAgICAgICAgICB0aGlzLmNoZWNrZWQgPSAhY2hlY2tlZFxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgc2NvcGVkU2xvdHM6IHtcbiAgICAgICAgYmVmb3JlOiB0aGlzLmxhYmVsICYmIHRoaXMubGVmdExhYmVsID8gZ2V0TGFiZWwgOiB2b2lkIDAsXG4gICAgICAgIGRlZmF1bHQ6ICgpID0+IFtoKCdzdy1pY29uJywge1xuICAgICAgICAgIHN0YXRpY0NsYXNzOiAnbWFyZ2luLW1pbicsXG4gICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIG9wYWNpdHk6IGNoZWNrZWQgPyAxIDogMC42XG4gICAgICAgICAgfSxcbiAgICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgc2l6ZTogJzIwcHgnLFxuICAgICAgICAgICAgbmFtZTogY2hlY2tlZCA/ICdjaGVja19ib3gnIDogJ2NoZWNrX2JveF9vdXRsaW5lX2JsYW5rJyxcbiAgICAgICAgICAgIGNvbG9yOiBjb2xvckNoZWNrYm94ID8gdGhpcy5jb2xvciA6IHZvaWQgMCxcbiAgICAgICAgICAgIHByaW1hcnk6IGNvbG9yQ2hlY2tib3ggPyB0aGlzLnByaW1hcnkgOiB2b2lkIDAsXG4gICAgICAgICAgICBuZWdhdGl2ZTogY29sb3JDaGVja2JveCA/IHRoaXMubmVnYXRpdmUgOiB2b2lkIDAsXG4gICAgICAgICAgICBwb3NpdGl2ZTogY29sb3JDaGVja2JveCA/IHRoaXMucG9zaXRpdmUgOiB2b2lkIDAsXG4gICAgICAgICAgICB3YXJuaW5nOiBjb2xvckNoZWNrYm94ID8gdGhpcy53YXJuaW5nIDogdm9pZCAwXG4gICAgICAgICAgfVxuICAgICAgICB9KV0sXG4gICAgICAgIGFmdGVyOiB0aGlzLmxhYmVsICYmICF0aGlzLmxlZnRMYWJlbCA/IGdldExhYmVsIDogdm9pZCAwXG4gICAgICB9XG4gICAgfSlcbiAgfVxufSIsImltcG9ydCBDaGVja2JveCBmcm9tICcuL3NyYy9tYWluLmpzJ1xuXG5jb25zdCBpbnN0YWxsID0gZnVuY3Rpb24gKFZ1ZSkge1xuICBWdWUuY29tcG9uZW50KENoZWNrYm94Lm5hbWUsIENoZWNrYm94KVxufVxuXG5DaGVja2JveC5pbnN0YWxsID0gaW5zdGFsbFxuXG5leHBvcnQgZGVmYXVsdCBDaGVja2JveFxuIiwiXG5leHBvcnQgZGVmYXVsdCB7XG4gIGRhdGE6ICgpID0+ICh7fSksXG4gIHdhdGNoOiB7fSxcbiAgY29tcHV0ZWQ6IHt9LFxuICBtZXRob2RzOiB7XG4gICAgc2h1dHRsZShfdGhpcykge1xuICAgICAgbGV0IHNlbGYgPSBfdGhpcyB8fCB0aGlzXG5cbiAgICAgIHNlbGYuJGNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICBpZiAoY2hpbGQuJHJlZnNbdGhpcy5zaHV0dGxlUmVmXSAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgY2hpbGQucGFyZW50ID0gdGhpc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc2h1dHRsZShjaGlsZClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH0sXG4gIG1vdW50ZWQoKSB7XG4gICAgdGhpcy5zaHV0dGxlKClcbiAgfVxufVxuIiwiaW1wb3J0IEZpZWxkIGZyb20gJy4uLy4uL2ZpZWxkJ1xuaW1wb3J0IFNodXR0bGVNaXhpbiBmcm9tICcuLi8uLi8uLi9taXhpbnMvc2h1dHRsZSdcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnc3dDaGVja2JveEdyb3VwJyxcbiAgbWl4aW5zOiBbRmllbGQsIFNodXR0bGVNaXhpbl0sIC8vIGZvY3VzZWQsZGlzYWJsZWQsc2h1dHRsZVJlZlxuICBwcm9wczoge1xuICAgIHZhbHVlOiBCb29sZWFuIHwgQXJyYXlcbiAgfSxcbiAgZGF0YTogKCkgPT4gKHtcbiAgICBpbm5lclBvaW50ZXI6IHRydWUsXG4gICAgc2h1dHRsZVJlZjogJ2NoZWNrYm94J1xuICB9KSxcbiAgY29tcHV0ZWQ6IHt9LFxuICB3YXRjaDoge30sXG4gIG1ldGhvZHM6IHt9XG59IiwiaW1wb3J0IENoZWNrYm94R3JvdXAgZnJvbSAnLi9zcmMvbWFpbi5qcydcblxuY29uc3QgaW5zdGFsbCA9IGZ1bmN0aW9uIChWdWUpIHtcbiAgVnVlLmNvbXBvbmVudChDaGVja2JveEdyb3VwLm5hbWUsIENoZWNrYm94R3JvdXApXG59XG5cbkNoZWNrYm94R3JvdXAuaW5zdGFsbCA9IGluc3RhbGxcblxuZXhwb3J0IGRlZmF1bHQgQ2hlY2tib3hHcm91cFxuIiwiaW1wb3J0IEl0ZW0gZnJvbSAnLi4vLi4vaXRlbSdcbmltcG9ydCB7IGlzRGVlcEVxdWFsIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvaXMnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3N3UmFkaW8nLFxuICBjb21wb25lbnRzOiB7IEl0ZW0gfSxcbiAgcHJvcHM6IHtcbiAgICB2YWx1ZToge30sXG4gICAgdmFsOiB7XG4gICAgICByZXF1aXJlZDogdHJ1ZVxuICAgIH0sXG4gICAgbGFiZWw6IFN0cmluZyxcbiAgICBkaXNhYmxlZDogQm9vbGVhbixcbiAgICBjb2xvcjogU3RyaW5nLFxuICAgIHByaW1hcnk6IEJvb2xlYW4sXG4gICAgbmVnYXRpdmU6IEJvb2xlYW4sXG4gICAgcG9zaXRpdmU6IEJvb2xlYW4sXG4gICAgd2FybmluZzogQm9vbGVhbixcbiAgICBsZWZ0TGFiZWw6IEJvb2xlYW4sXG4gICAgY29sb3JMYWJlbDogQm9vbGVhbixcbiAgICBrZWVwQ29sb3I6IEJvb2xlYW5cbiAgfSxcbiAgZGF0YTogKCkgPT4gKHtcbiAgICBwYXJlbnQ6IHZvaWQgMFxuICB9KSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBtb2RlbCgpIHtcbiAgICAgIHJldHVybiB0aGlzLnBhcmVudCA9PT0gdm9pZCAwID8gdGhpcy52YWx1ZSA6IHRoaXMucGFyZW50LnZhbHVlXG4gICAgfSxcbiAgICBwYXJlbnREaXNhYmxlZCgpIHtcbiAgICAgIHJldHVybiB0aGlzLnBhcmVudCAmJiB0aGlzLnBhcmVudC5kaXNhYmxlZFxuICAgIH0sXG4gICAgY2hlY2tlZDoge1xuICAgICAgZ2V0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDaGVja2VkKHRoaXMudmFsKVxuICAgICAgfSxcbiAgICAgIHNldCgpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzLnBhcmVudCA9PT0gdm9pZCAwID8gdGhpcyA6IHRoaXMucGFyZW50XG5cbiAgICAgICAgc2VsZi4kZW1pdChcbiAgICAgICAgICAnaW5wdXQnLFxuICAgICAgICAgIHRoaXMudmFsXG4gICAgICAgIClcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIHdhdGNoOiB7fSxcbiAgbWV0aG9kczoge1xuICAgIGdldENoZWNrZWQodmFsKSB7XG4gICAgICByZXR1cm4gaXNEZWVwRXF1YWwodGhpcy5tb2RlbCwgdmFsKVxuICAgIH0sXG4gIH0sXG4gIHJlbmRlcihoKSB7XG4gICAgbGV0IGNoZWNrZWQgPSB0aGlzLmNoZWNrZWRcbiAgICBsZXQgY29sb3JMYWJlbCA9IGNoZWNrZWQgJiYgdGhpcy5jb2xvckxhYmVsXG4gICAgbGV0IGNvbG9yUmFkaW8gPSBjaGVja2VkIHx8IHRoaXMua2VlcENvbG9yXG4gICAgbGV0IGdldExhYmVsID0gKCkgPT4gW2goJ2RpdicsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiAnc3ctcmFkaW9fX3RleHQgbWFyZ2luLW1pbicsXG4gICAgICBjbGFzczoge1xuICAgICAgICAnY29sb3ItcHJpbWFyeSc6IGNvbG9yTGFiZWwgPyB0aGlzLnByaW1hcnkgOiB2b2lkIDAsXG4gICAgICAgICdjb2xvci1uZWdhdGl2ZSc6IGNvbG9yTGFiZWwgPyB0aGlzLm5lZ2F0aXZlIDogdm9pZCAwLFxuICAgICAgICAnY29sb3ItcG9zaXRpdmUnOiBjb2xvckxhYmVsID8gdGhpcy5wb3NpdGl2ZSA6IHZvaWQgMCxcbiAgICAgICAgJ2NvbG9yLXdhcm5pbmcnOiBjb2xvckxhYmVsID8gdGhpcy53YXJuaW5nIDogdm9pZCAwXG4gICAgICB9LFxuICAgICAgc3R5bGU6IHtcbiAgICAgICAgY29sb3I6IGNvbG9yTGFiZWwgPyB0aGlzLmNvbG9yIDogdm9pZCAwXG4gICAgICB9XG4gICAgfSwgdGhpcy5sYWJlbCldXG5cbiAgICByZXR1cm4gaCgnc3ctaXRlbScsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiAnc3ctcmFkaW8nLFxuICAgICAgcmVmOiAncmFkaW8nLFxuICAgICAgY2xhc3M6IHtcbiAgICAgICAgZGlzYWJsZTogdGhpcy5kaXNhYmxlZCB8fCB0aGlzLnBhcmVudERpc2FibGVkXG4gICAgICB9LFxuICAgICAgbmF0aXZlT246IHtcbiAgICAgICAgY2xpY2s6ICgpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCBjaGVja2VkKSB7IHJldHVybiB9XG4gICAgICAgICAgdGhpcy5jaGVja2VkID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgc2NvcGVkU2xvdHM6IHtcbiAgICAgICAgYmVmb3JlOiB0aGlzLmxhYmVsICYmIHRoaXMubGVmdExhYmVsID8gZ2V0TGFiZWwgOiB2b2lkIDAsXG4gICAgICAgIGRlZmF1bHQ6ICgpID0+IFtoKCdzdy1pY29uJywge1xuICAgICAgICAgIHN0YXRpY0NsYXNzOiAnbWFyZ2luLW1pbicsXG4gICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIG9wYWNpdHk6IGNoZWNrZWQgPyAxIDogMC42XG4gICAgICAgICAgfSxcbiAgICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgc2l6ZTogJzIwcHgnLFxuICAgICAgICAgICAgbmFtZTogY2hlY2tlZCA/ICdyYWRpb19idXR0b25fY2hlY2tlZCcgOiAncmFkaW9fYnV0dG9uX3VuY2hlY2tlZCcsXG4gICAgICAgICAgICBjb2xvcjogY29sb3JSYWRpbyA/IHRoaXMuY29sb3IgOiB2b2lkIDAsXG4gICAgICAgICAgICBwcmltYXJ5OiBjb2xvclJhZGlvID8gdGhpcy5wcmltYXJ5IDogdm9pZCAwLFxuICAgICAgICAgICAgbmVnYXRpdmU6IGNvbG9yUmFkaW8gPyB0aGlzLm5lZ2F0aXZlIDogdm9pZCAwLFxuICAgICAgICAgICAgcG9zaXRpdmU6IGNvbG9yUmFkaW8gPyB0aGlzLnBvc2l0aXZlIDogdm9pZCAwLFxuICAgICAgICAgICAgd2FybmluZzogY29sb3JSYWRpbyA/IHRoaXMud2FybmluZyA6IHZvaWQgMFxuICAgICAgICAgIH1cbiAgICAgICAgfSldLFxuICAgICAgICBhZnRlcjogdGhpcy5sYWJlbCAmJiAhdGhpcy5sZWZ0TGFiZWwgPyBnZXRMYWJlbCA6IHZvaWQgMFxuICAgICAgfVxuICAgIH0pXG4gIH1cbn0iLCJpbXBvcnQgUmFkaW8gZnJvbSAnLi9zcmMvbWFpbi5qcydcblxuY29uc3QgaW5zdGFsbCA9IGZ1bmN0aW9uIChWdWUpIHtcbiAgVnVlLmNvbXBvbmVudChSYWRpby5uYW1lLCBSYWRpbylcbn1cblxuUmFkaW8uaW5zdGFsbCA9IGluc3RhbGxcblxuZXhwb3J0IGRlZmF1bHQgUmFkaW9cbiIsImltcG9ydCBGaWVsZCBmcm9tICcuLi8uLi9maWVsZCdcbmltcG9ydCBTaHV0dGxlTWl4aW4gZnJvbSAnLi4vLi4vLi4vbWl4aW5zL3NodXR0bGUnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3N3UmFkaW9Hcm91cCcsXG4gIG1peGluczogW0ZpZWxkLCBTaHV0dGxlTWl4aW5dLCAvLyBmb2N1c2VkLGRpc2FibGVkLHNodXR0bGVSZWZcbiAgcHJvcHM6IHtcbiAgICB2YWx1ZToge1xuICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICB9XG4gIH0sXG4gIGRhdGE6ICgpID0+ICh7XG4gICAgaW5uZXJQb2ludGVyOiB0cnVlLFxuICAgIHNodXR0bGVSZWY6ICdyYWRpbydcbiAgfSksXG4gIGNvbXB1dGVkOiB7fSxcbiAgd2F0Y2g6IHt9LFxuICBtZXRob2RzOiB7fVxufSIsImltcG9ydCBSYWRpb0dyb3VwIGZyb20gJy4vc3JjL21haW4uanMnXG5cbmNvbnN0IGluc3RhbGwgPSBmdW5jdGlvbiAoVnVlKSB7XG4gIFZ1ZS5jb21wb25lbnQoUmFkaW9Hcm91cC5uYW1lLCBSYWRpb0dyb3VwKVxufVxuXG5SYWRpb0dyb3VwLmluc3RhbGwgPSBpbnN0YWxsXG5cbmV4cG9ydCBkZWZhdWx0IFJhZGlvR3JvdXBcbiIsIi8qKlxuICpcbiAqXG4gKiBAcGFyYW0geyp9IHRvdGFsICDliIbpobXmgLvmlbBcbiAqIEBwYXJhbSB7Kn0gY3VyICDlvZPliY3pobXpnaIgIDNcbiAqIEBwYXJhbSB7Kn0gYXJvdW5kICAgMSAyIDMgNCA1ICAgYXJvdW5kID0gMlxuICogQHJldHVybnNcbiAqL1xuY29uc3QgbWFrZVJlc3VsdCA9ICh0b3RhbCxjdXIsYXJvdW5kKSA9PiB7XG4gIGxldCByZXN1bHQgPSBbXTtcbiAgbGV0IGJhc2VDb3VudCA9IGFyb3VuZCAqIDIgKyAxICsgMiArIDIgKyAyOyAvL+aAu+WFseWFg+e0oOS4quaVsFxuICBsZXQgc3VycGx1cyA9IGJhc2VDb3VudCAtIDQ7IC8v5Y+q5Ye6546w5LiA5Liq55yB55Wl5Y+3IOWJqeS9meWFg+e0oOS4quaVsFxuICBsZXQgc3RhcnRQb3NpdGlvbiA9IDEgKyAyICsgYXJvdW5kLGVuZFBvc2l0aW9uID0gdG90YWwgLSAyIC0gYXJvdW5kO1xuXG4gIGlmKHRvdGFsIDw9IGJhc2VDb3VudCAtIDIpeyAvL+WFqOmDqOaYvuekuiDkuI3lh7rnjrDnnIHnlaXlj7dcbiAgICAgIHJlc3VsdCA9ICBBcnJheS5mcm9tKHtsZW5ndGg6IHRvdGFsfSwgKHYsIGkpID0+IGkgKyAxKTtcbiAgfWVsc2V7IC8v6ZyA6KaB5Ye6546w55yB55Wl5Y+3XG4gICAgICBpZihjdXIgPD0gc3RhcnRQb3NpdGlvbil7IC8vMS7lj6rmnInlkI7pnaLlh7rnjrDnnIHnlaXlj7dcbiAgICAgICAgICByZXN1bHQgPSBbLi4uQXJyYXkuZnJvbSh7bGVuZ3RoOiBzdXJwbHVzfSwgKHYsIGkpID0+IGkgKyAxKSxcIsK3wrfCt1wiLHRvdGFsXVxuICAgICAgfWVsc2UgaWYoY3VyID49IGVuZFBvc2l0aW9uKSB7IC8vMi7lj6rmnInliY3ovrnlh7rnjrDnnIHnlaXlj7dcbiAgICAgICAgICByZXN1bHQgPSBbMSwnwrfCt8K3JywuLi5BcnJheS5mcm9tKHtsZW5ndGg6IHN1cnBsdXN9LCAodiwgaSkgPT4gdG90YWwgLSBzdXJwbHVzICsgaSArIDEpXVxuICAgICAgfWVsc2V7IC8vMy7kuKTovrnpg73mnInnnIHnlaXlj7dcbiAgICAgICAgICByZXN1bHQgPSBbMSwnwrfCt8K3JywuLi5BcnJheS5mcm9tKHtsZW5ndGg6IGFyb3VuZCAqIDIgKyAxfSwgKHYsIGkpID0+IGN1ciAtIGFyb3VuZCArIGkpLCfCt8K3wrcnLHRvdGFsXVxuICAgICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5leHBvcnQgZGVmYXVsdCBtYWtlUmVzdWx0IiwiPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwic3ctcGFnaW5hdGlvblwiPlxuICAgIDxkaXYgY2xhc3M9XCJzdy1wYWdpbmF0aW9uLXRvdGFsXCIgdi1pZj1cImxheW91dC5pbmRleE9mKCd0b3RhbCcpID4gLTFcIj4gXG4gICAgICB7e2DlhbEke3RvdGFsfeadoWB9fVxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJzdy1wYWdpbmF0aW9uLXNlbGVjdFwiIHYtaWY9XCJsYXlvdXQuaW5kZXhPZignc2VsZWN0JykgPiAtMVwiPlxuICAgICAgPHN3LXNlbGVjdCB2LW1vZGVsPVwicGFnZVNpemVWYWx1ZVwiIDpvcHRpb25zPVwic2VsZWN0T3B0aW9uXCIgc2VsZWN0ZWRGaWxsZWQgYm9yZGVyZWQgbWluaSBzZWxlY3RlZFN0eWxlPVwibm9uZVwiPjwvc3ctc2VsZWN0PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJzdy1wYWdpbmF0aW9uLXBhZ2VcIj5cbiAgICAgIDxzcGFuIGNsYXNzPVwic3ctcGFnaW5hdGlvbi1wYWdlLWl0ZW1cIiBAY2xpY2s9XCJoYW5kbGVDbGlja0Fycm93KCdsZWZ0JylcIj48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zIHN3LXBhZ2luYXRpb24tcGFnZS1pdGVtLWljb25cIj5rZXlib2FyZF9hcnJvd19sZWZ0PC9pPjwvc3Bhbj5cbiAgICAgIDxzcGFuIHYtZm9yPVwiKGl0ZW0sIGluZGV4KSBpbiBwYWdpbmF0aW9uTGlzdFwiIDpjbGFzcz1cIlsnc3ctcGFnaW5hdGlvbi1wYWdlLWl0ZW0nLCBjdXJyZW50UGFnZVZhbHVlID09PSBpdGVtID8gJ2FjdGl2ZScgOiAnJ11cIiBAY2xpY2s9XCJoYW5kbGVDbGlja1BhZ2UoaXRlbSwgaW5kZXgpXCI+XG4gICAgICAgIDxpIHYtaWY9XCJpdGVtID09PSAnwrfCt8K3J1wiIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgc3ctcGFnaW5hdGlvbi1wYWdlLWl0ZW0taWNvblwiPm1vcmVfaG9yaXo8L2k+XG4gICAgICAgIDxzcGFuIHYtZWxzZT5cbiAgICAgICAgICB7e2l0ZW19fVxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cInN3LXBhZ2luYXRpb24tcGFnZS1pdGVtXCIgQGNsaWNrPVwiaGFuZGxlQ2xpY2tBcnJvdygncmlnaHQnKVwiPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgc3ctcGFnaW5hdGlvbi1wYWdlLWl0ZW0taWNvblwiPmtleWJvYXJkX2Fycm93X3JpZ2h0PC9pPjwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwic3ctcGFnaW5hdGlvbi1nb3RvXCIgdi1pZj1cImxheW91dC5pbmRleE9mKCdnb3RvJykgPiAtMVwiPlxuICAgICAgPHNwYW4+5YmN5b6APC9zcGFuPlxuICAgICAgPGRpdiBjbGFzcz1cInN3LXBhZ2luYXRpb24tZ290by1pbnB1dFwiPlxuICAgICAgICA8c3ctaW5wdXQgYm9yZGVyZWQgdi1tb2RlbD0naW5wdXRWYWx1ZScgQGtleXVwLmVudGVyLm5hdGl2ZT1cImhhbmRsZUVudGVyR290b1wiIG1pbmkgc3R5bGU9XCJ3aWR0aDo0MHB4XCI+PC9zdy1pbnB1dD5cbiAgICAgIDwvZGl2PlxuICAgICAgPHNwYW4+6aG1PC9zcGFuPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgc3dTZWxlY3QgZnJvbSAnLi4vLi4vc2VsZWN0L2luZGV4J1xuaW1wb3J0IG1ha2VSZXN1bHQgZnJvbSAnLi9wYWdpbmF0aW9uJ1xuaW1wb3J0IHN3SW5wdXQgZnJvbSAnLi4vLi4vaW5wdXQvaW5kZXgnXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdzd1BhZ2luYXRpb24nLFxuICBkYXRhICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY3VycmVudFBhZ2VWYWx1ZTogdGhpcy5jdXJyZW50UGFnZSxcbiAgICAgIHBhZ2VUb3RhbDogJycsXG4gICAgICBwYWdlU2l6ZVZhbHVlOiB0aGlzLnBhZ2VTaXplLFxuICAgICAgaW5wdXRWYWx1ZTogJzEnXG4gICAgfVxuICB9LFxuICBwcm9wczoge1xuICAgIHRvdGFsOiB7XG4gICAgICB0eXBlOiBOdW1iZXJcbiAgICB9LFxuICAgIHBhZ2VTaXplOiB7XG4gICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICBkZWZhdWx0OiAyMFxuICAgIH0sXG4gICAgb3B0aW9uczoge1xuICAgICAgdHlwZTogQXJyYXksXG4gICAgICBkZWZhdWx0OiBbMjAsIDQwLCA2MCwgODBdXG4gICAgfSxcbiAgICBjdXJyZW50UGFnZToge1xuICAgICAgdHlwZTogTnVtYmVyXG4gICAgfSxcbiAgICBhcm91bmQ6IHtcbiAgICAgIHR5cGU6IE51bWJlclxuICAgIH0sXG4gICAgbGF5b3V0OiB7XG4gICAgICB0eXBlOiBTdHJpbmdcbiAgICB9XG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgY3VycmVudFBhZ2VWYWx1ZSgpIHtcbiAgICAgIHRoaXMuJGVtaXQoJ2N1cnJlbnQtY2hhbmdlJywgdGhpcy5jdXJyZW50UGFnZVZhbHVlKVxuICAgIH0sXG4gICAgcGFnZVNpemVWYWx1ZSgpIHtcbiAgICAgIHRoaXMuJGVtaXQoJ3NpemUtY2hhbmdlJywgdGhpcy5wYWdlU2l6ZVZhbHVlKVxuICAgIH1cbiAgfSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBzZWxlY3RPcHRpb24oKSB7XG4gICAgICBsZXQgYXJ5ID0gW11cbiAgICAgIHRoaXMub3B0aW9ucy5tYXAoaT0+e1xuICAgICAgICBsZXQgaXRlbSA9IHt9XG4gICAgICAgIGl0ZW0ubmFtZSA9IGAke2l95p2hL+mhtWBcbiAgICAgICAgaXRlbS52YWx1ZSA9IGlcbiAgICAgICAgYXJ5LnB1c2goaXRlbSlcbiAgICAgIH0pXG4gICAgICByZXR1cm4gYXJ5XG4gICAgfSxcbiAgICBwYWdpbmF0aW9uTGlzdCgpIHtcbiAgICAgIGxldCBwYWdlVG90YWwgPSB0aGlzLnBhZ2VUb3RhbCA9IHRoaXMudG90YWwgLyB0aGlzLnBhZ2VTaXplVmFsdWVcbiAgICAgIGlmIChgJHtwYWdlVG90YWx9YC5pbmRleE9mKCcuJykgPiAtMSkge1xuICAgICAgICBwYWdlVG90YWwgPSB0aGlzLnBhZ2VUb3RhbCA9IHBhcnNlSW50KHBhZ2VUb3RhbCArIDEpXG4gICAgICB9XG4gICAgICBpZiAodGhpcy5jdXJyZW50UGFnZVZhbHVlID4gcGFnZVRvdGFsKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFBhZ2VWYWx1ZSA9IHBhZ2VUb3RhbFxuICAgICAgfVxuICAgICAgbGV0IHBhZ2VMaXN0ID0gbWFrZVJlc3VsdChwYWdlVG90YWwsIHRoaXMuY3VycmVudFBhZ2VWYWx1ZSwgdGhpcy5hcm91bmQpXG4gICAgICByZXR1cm4gcGFnZUxpc3RcbiAgICB9XG4gIH0sXG4gIGNvbXBvbmVudHM6IHtcbiAgICBzd1NlbGVjdCxcbiAgICBzd0lucHV0XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBoYW5kbGVFbnRlckdvdG8oKSB7XG4gICAgICBsZXQgcGFnZSA9IHBhcnNlSW50KHRoaXMuaW5wdXRWYWx1ZSlcbiAgICAgIGlmIChwYWdlIDwgMSkge1xuICAgICAgICB0aGlzLmlucHV0VmFsdWUgPSAnMSdcbiAgICAgIH1cbiAgICAgIGlmIChwYWdlID4gdGhpcy5wYWdlVG90YWwpIHtcbiAgICAgICAgdGhpcy5pbnB1dFZhbHVlID0gYCR7dGhpcy5wYWdlVG90YWx9YFxuICAgICAgfVxuICAgICAgdGhpcy5jdXJyZW50UGFnZVZhbHVlID0gcGFyc2VJbnQodGhpcy5pbnB1dFZhbHVlKVxuICAgICAgdGhpcy5pbnB1dFZhbHVlID0gYCR7cGFyc2VJbnQodGhpcy5pbnB1dFZhbHVlKX1gXG4gICAgfSxcbiAgICBoYW5kbGVDbGlja1BhZ2UoaXRlbSwgaW5kZXgpe1xuICAgICAgaWYgKGl0ZW0gPT09ICfCt8K3wrcnKSB7XG4gICAgICAgIGlmKGluZGV4ID09PSAxKXtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRQYWdlVmFsdWUgPSAzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jdXJyZW50UGFnZVZhbHVlID0gdGhpcy5wYWdlVG90YWwgLSAyXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY3VycmVudFBhZ2VWYWx1ZSA9IGl0ZW1cbiAgICAgIH1cbiAgICB9LFxuICAgIGhhbmRsZUNsaWNrQXJyb3cocGFyYW1zKSB7XG4gICAgICBpZiAocGFyYW1zID09PSAnbGVmdCcpIHtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFBhZ2VWYWx1ZSAhPT0gMSkge1xuICAgICAgICAgIHRoaXMuY3VycmVudFBhZ2VWYWx1ZSA9IHRoaXMuY3VycmVudFBhZ2VWYWx1ZSAtIDFcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgdGhpcy5jdXJyZW50UGFnZVZhbHVlID0gMVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50UGFnZVZhbHVlICE9PSB0aGlzLnBhZ2VUb3RhbCkge1xuICAgICAgICAgIHRoaXMuY3VycmVudFBhZ2VWYWx1ZSA9IHRoaXMuY3VycmVudFBhZ2VWYWx1ZSArIDFcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRQYWdlVmFsdWUgPSB0aGlzLnBhZ2VUb3RhbFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cblxuPHN0eWxlPlxuXG48L3N0eWxlPlxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBub3JtYWxpemVDb21wb25lbnQodGVtcGxhdGUsIHN0eWxlLCBzY3JpcHQsIHNjb3BlSWQsIGlzRnVuY3Rpb25hbFRlbXBsYXRlLCBtb2R1bGVJZGVudGlmaWVyXG4vKiBzZXJ2ZXIgb25seSAqL1xuLCBzaGFkb3dNb2RlLCBjcmVhdGVJbmplY3RvciwgY3JlYXRlSW5qZWN0b3JTU1IsIGNyZWF0ZUluamVjdG9yU2hhZG93KSB7XG4gIGlmICh0eXBlb2Ygc2hhZG93TW9kZSAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgY3JlYXRlSW5qZWN0b3JTU1IgPSBjcmVhdGVJbmplY3RvcjtcbiAgICBjcmVhdGVJbmplY3RvciA9IHNoYWRvd01vZGU7XG4gICAgc2hhZG93TW9kZSA9IGZhbHNlO1xuICB9IC8vIFZ1ZS5leHRlbmQgY29uc3RydWN0b3IgZXhwb3J0IGludGVyb3AuXG5cblxuICB2YXIgb3B0aW9ucyA9IHR5cGVvZiBzY3JpcHQgPT09ICdmdW5jdGlvbicgPyBzY3JpcHQub3B0aW9ucyA6IHNjcmlwdDsgLy8gcmVuZGVyIGZ1bmN0aW9uc1xuXG4gIGlmICh0ZW1wbGF0ZSAmJiB0ZW1wbGF0ZS5yZW5kZXIpIHtcbiAgICBvcHRpb25zLnJlbmRlciA9IHRlbXBsYXRlLnJlbmRlcjtcbiAgICBvcHRpb25zLnN0YXRpY1JlbmRlckZucyA9IHRlbXBsYXRlLnN0YXRpY1JlbmRlckZucztcbiAgICBvcHRpb25zLl9jb21waWxlZCA9IHRydWU7IC8vIGZ1bmN0aW9uYWwgdGVtcGxhdGVcblxuICAgIGlmIChpc0Z1bmN0aW9uYWxUZW1wbGF0ZSkge1xuICAgICAgb3B0aW9ucy5mdW5jdGlvbmFsID0gdHJ1ZTtcbiAgICB9XG4gIH0gLy8gc2NvcGVkSWRcblxuXG4gIGlmIChzY29wZUlkKSB7XG4gICAgb3B0aW9ucy5fc2NvcGVJZCA9IHNjb3BlSWQ7XG4gIH1cblxuICB2YXIgaG9vaztcblxuICBpZiAobW9kdWxlSWRlbnRpZmllcikge1xuICAgIC8vIHNlcnZlciBidWlsZFxuICAgIGhvb2sgPSBmdW5jdGlvbiBob29rKGNvbnRleHQpIHtcbiAgICAgIC8vIDIuMyBpbmplY3Rpb25cbiAgICAgIGNvbnRleHQgPSBjb250ZXh0IHx8IC8vIGNhY2hlZCBjYWxsXG4gICAgICB0aGlzLiR2bm9kZSAmJiB0aGlzLiR2bm9kZS5zc3JDb250ZXh0IHx8IC8vIHN0YXRlZnVsXG4gICAgICB0aGlzLnBhcmVudCAmJiB0aGlzLnBhcmVudC4kdm5vZGUgJiYgdGhpcy5wYXJlbnQuJHZub2RlLnNzckNvbnRleHQ7IC8vIGZ1bmN0aW9uYWxcbiAgICAgIC8vIDIuMiB3aXRoIHJ1bkluTmV3Q29udGV4dDogdHJ1ZVxuXG4gICAgICBpZiAoIWNvbnRleHQgJiYgdHlwZW9mIF9fVlVFX1NTUl9DT05URVhUX18gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGNvbnRleHQgPSBfX1ZVRV9TU1JfQ09OVEVYVF9fO1xuICAgICAgfSAvLyBpbmplY3QgY29tcG9uZW50IHN0eWxlc1xuXG5cbiAgICAgIGlmIChzdHlsZSkge1xuICAgICAgICBzdHlsZS5jYWxsKHRoaXMsIGNyZWF0ZUluamVjdG9yU1NSKGNvbnRleHQpKTtcbiAgICAgIH0gLy8gcmVnaXN0ZXIgY29tcG9uZW50IG1vZHVsZSBpZGVudGlmaWVyIGZvciBhc3luYyBjaHVuayBpbmZlcmVuY2VcblxuXG4gICAgICBpZiAoY29udGV4dCAmJiBjb250ZXh0Ll9yZWdpc3RlcmVkQ29tcG9uZW50cykge1xuICAgICAgICBjb250ZXh0Ll9yZWdpc3RlcmVkQ29tcG9uZW50cy5hZGQobW9kdWxlSWRlbnRpZmllcik7XG4gICAgICB9XG4gICAgfTsgLy8gdXNlZCBieSBzc3IgaW4gY2FzZSBjb21wb25lbnQgaXMgY2FjaGVkIGFuZCBiZWZvcmVDcmVhdGVcbiAgICAvLyBuZXZlciBnZXRzIGNhbGxlZFxuXG5cbiAgICBvcHRpb25zLl9zc3JSZWdpc3RlciA9IGhvb2s7XG4gIH0gZWxzZSBpZiAoc3R5bGUpIHtcbiAgICBob29rID0gc2hhZG93TW9kZSA/IGZ1bmN0aW9uICgpIHtcbiAgICAgIHN0eWxlLmNhbGwodGhpcywgY3JlYXRlSW5qZWN0b3JTaGFkb3codGhpcy4kcm9vdC4kb3B0aW9ucy5zaGFkb3dSb290KSk7XG4gICAgfSA6IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICBzdHlsZS5jYWxsKHRoaXMsIGNyZWF0ZUluamVjdG9yKGNvbnRleHQpKTtcbiAgICB9O1xuICB9XG5cbiAgaWYgKGhvb2spIHtcbiAgICBpZiAob3B0aW9ucy5mdW5jdGlvbmFsKSB7XG4gICAgICAvLyByZWdpc3RlciBmb3IgZnVuY3Rpb25hbCBjb21wb25lbnQgaW4gdnVlIGZpbGVcbiAgICAgIHZhciBvcmlnaW5hbFJlbmRlciA9IG9wdGlvbnMucmVuZGVyO1xuXG4gICAgICBvcHRpb25zLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcldpdGhTdHlsZUluamVjdGlvbihoLCBjb250ZXh0KSB7XG4gICAgICAgIGhvb2suY2FsbChjb250ZXh0KTtcbiAgICAgICAgcmV0dXJuIG9yaWdpbmFsUmVuZGVyKGgsIGNvbnRleHQpO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaW5qZWN0IGNvbXBvbmVudCByZWdpc3RyYXRpb24gYXMgYmVmb3JlQ3JlYXRlIGhvb2tcbiAgICAgIHZhciBleGlzdGluZyA9IG9wdGlvbnMuYmVmb3JlQ3JlYXRlO1xuICAgICAgb3B0aW9ucy5iZWZvcmVDcmVhdGUgPSBleGlzdGluZyA/IFtdLmNvbmNhdChleGlzdGluZywgaG9vaykgOiBbaG9va107XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHNjcmlwdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBub3JtYWxpemVDb21wb25lbnQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1ub3JtYWxpemUtY29tcG9uZW50LmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNPbGRJRSA9IHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIC9tc2llIFs2LTldXFxcXGIvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKTtcbmZ1bmN0aW9uIGNyZWF0ZUluamVjdG9yKGNvbnRleHQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChpZCwgc3R5bGUpIHtcbiAgICByZXR1cm4gYWRkU3R5bGUoaWQsIHN0eWxlKTtcbiAgfTtcbn1cbnZhciBIRUFEID0gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xudmFyIHN0eWxlcyA9IHt9O1xuXG5mdW5jdGlvbiBhZGRTdHlsZShpZCwgY3NzKSB7XG4gIHZhciBncm91cCA9IGlzT2xkSUUgPyBjc3MubWVkaWEgfHwgJ2RlZmF1bHQnIDogaWQ7XG4gIHZhciBzdHlsZSA9IHN0eWxlc1tncm91cF0gfHwgKHN0eWxlc1tncm91cF0gPSB7XG4gICAgaWRzOiBuZXcgU2V0KCksXG4gICAgc3R5bGVzOiBbXVxuICB9KTtcblxuICBpZiAoIXN0eWxlLmlkcy5oYXMoaWQpKSB7XG4gICAgc3R5bGUuaWRzLmFkZChpZCk7XG4gICAgdmFyIGNvZGUgPSBjc3Muc291cmNlO1xuXG4gICAgaWYgKGNzcy5tYXApIHtcbiAgICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLmNocm9tZS5jb20vZGV2dG9vbHMvZG9jcy9qYXZhc2NyaXB0LWRlYnVnZ2luZ1xuICAgICAgLy8gdGhpcyBtYWtlcyBzb3VyY2UgbWFwcyBpbnNpZGUgc3R5bGUgdGFncyB3b3JrIHByb3Blcmx5IGluIENocm9tZVxuICAgICAgY29kZSArPSAnXFxuLyojIHNvdXJjZVVSTD0nICsgY3NzLm1hcC5zb3VyY2VzWzBdICsgJyAqLyc7IC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XG5cbiAgICAgIGNvZGUgKz0gJ1xcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsJyArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzcy5tYXApKSkpICsgJyAqLyc7XG4gICAgfVxuXG4gICAgaWYgKCFzdHlsZS5lbGVtZW50KSB7XG4gICAgICBzdHlsZS5lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgIHN0eWxlLmVsZW1lbnQudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgICBpZiAoY3NzLm1lZGlhKSBzdHlsZS5lbGVtZW50LnNldEF0dHJpYnV0ZSgnbWVkaWEnLCBjc3MubWVkaWEpO1xuICAgICAgSEVBRC5hcHBlbmRDaGlsZChzdHlsZS5lbGVtZW50KTtcbiAgICB9XG5cbiAgICBpZiAoJ3N0eWxlU2hlZXQnIGluIHN0eWxlLmVsZW1lbnQpIHtcbiAgICAgIHN0eWxlLnN0eWxlcy5wdXNoKGNvZGUpO1xuICAgICAgc3R5bGUuZWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBzdHlsZS5zdHlsZXMuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgaW5kZXggPSBzdHlsZS5pZHMuc2l6ZSAtIDE7XG4gICAgICB2YXIgdGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjb2RlKTtcbiAgICAgIHZhciBub2RlcyA9IHN0eWxlLmVsZW1lbnQuY2hpbGROb2RlcztcbiAgICAgIGlmIChub2Rlc1tpbmRleF0pIHN0eWxlLmVsZW1lbnQucmVtb3ZlQ2hpbGQobm9kZXNbaW5kZXhdKTtcbiAgICAgIGlmIChub2Rlcy5sZW5ndGgpIHN0eWxlLmVsZW1lbnQuaW5zZXJ0QmVmb3JlKHRleHROb2RlLCBub2Rlc1tpbmRleF0pO2Vsc2Ugc3R5bGUuZWxlbWVudC5hcHBlbmRDaGlsZCh0ZXh0Tm9kZSk7XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlSW5qZWN0b3I7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1icm93c2VyLmpzLm1hcFxuIiwiaW1wb3J0IFBhZ2luYXRpb24gZnJvbSAnLi9zcmMvbWFpbi52dWUnXG5cbmNvbnN0IGluc3RhbGwgPSBmdW5jdGlvbiAoVnVlKSB7XG4gIFZ1ZS5jb21wb25lbnQoUGFnaW5hdGlvbi5uYW1lLCBQYWdpbmF0aW9uKVxufVxuXG5QYWdpbmF0aW9uLmluc3RhbGwgPSBpbnN0YWxsXG5cbmV4cG9ydCBkZWZhdWx0IFBhZ2luYXRpb25cbiIsImV4cG9ydCBmdW5jdGlvbiBoYXNPd24ob2JqLCBrZXkpIHtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBpc1ZOb2RlKG5vZGUpIHtcbiAgcmV0dXJuIG5vZGUgIT09IG51bGwgJiYgdHlwZW9mIG5vZGUgPT09ICdvYmplY3QnICYmIGhhc093bihub2RlLCAnY29tcG9uZW50T3B0aW9ucycpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEZpcnN0Q29tcG9uZW50Q2hpbGQoY2hpbGRyZW4pIHtcbiAgcmV0dXJuIGNoaWxkcmVuICYmIGNoaWxkcmVuLmZpbHRlcihjID0+IGMgJiYgYy50YWcpWzBdO1xufTsiLCIvLyA8dGVtcGxhdGU+XG4vLyAgIDxkaXY+XG4vLyAgICAgPGJ1dHRvbiBAY2xpY2s9XCJoYW5kbGVCdG5cIj5jbGljazwvYnV0dG9uPlxuLy8gICAgIDx0cmFuc2l0aW9uIG5hbWU9J3N3LW5vdGlmaWNhdGlvbi1mYWRlJz5cbi8vICAgICAgIDxkaXYgdi1pZj1cInNob3dcIiBjbGFzcz1cInN3LW5vdGlmaWNhdGlvblwiPlxuLy8gICAgICAgICA8aDIgY2xhc3M9XCJ0aXRsZVwiPlxuLy8gICAgICAgICAgIOaPkOekujExMTFcbi8vICAgICAgICAgPC9oMj5cbi8vICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRlbnRcIj5cbi8vICAgICAgICAgICDov5nmmK/kuIDmnaHmtojmga9cbi8vICAgICAgICAgPC9kaXY+XG4vLyAgICAgICAgIDxkaXYgY2xhc3M9XCJjbG9zZVwiIEBjbGljaz1cImhhbmRsZUJ0blwiPlxuLy8gICAgICAgICAgIDxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5jbG9zZTwvaT5cbi8vICAgICAgICAgPC9kaXY+XG4vLyAgICAgICA8L2Rpdj5cbi8vICAgICA8L3RyYW5zaXRpb24+XG4vLyAgIDwvZGl2PlxuLy8gPC90ZW1wbGF0ZT5cbmltcG9ydCBWbm9kZSwgeyBpc1ZOb2RlIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvdmRvbSdcbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3N3Tm90aWZpY2F0aW9uJyxcbiAgZGF0YSAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHNob3c6IGZhbHNlLFxuICAgICAgdmVydGljYWxPZmZzZXQ6IDAsXG4gICAgICBvbkNsb3NlOiBudWxsLFxuICAgICAgcG9zaXRpb246ICd0b3AtcmlnaHQnLFxuICAgICAgdGl0bGU6ICcnLFxuICAgICAgY29udGVudDogJycsXG4gICAgICBzbG90OiBudWxsLFxuICAgICAgYmFja2dyb3VuZDogJyNmZmYnLFxuICAgICAgY2xvc2VDb2xvcjogJyM5MDkzOTknXG4gICAgfVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgaGFuZGxlQnRuKCkge1xuICAgICAgdGhpcy5zaG93ID0gZmFsc2VcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5vbkNsb3NlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMub25DbG9zZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgY29tcHV0ZWQ6IHtcbiAgICB2ZXJ0aWNhbFByb3BlcnR5KCkge1xuICAgICAgcmV0dXJuIC9edG9wLS8udGVzdCh0aGlzLnBvc2l0aW9uKSA/ICd0b3AnIDogJ2JvdHRvbSc7XG4gICAgfSxcblxuICAgIHBvc2l0aW9uU3R5bGUoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBbdGhpcy52ZXJ0aWNhbFByb3BlcnR5XTogYCR7IHRoaXMudmVydGljYWxPZmZzZXQgfXB4YCxcbiAgICAgIH07XG4gICAgfSxcbiAgICBnZXRWbm9kZSgpIHtcbiAgICAgIGlmIChpc1ZOb2RlKHRoaXMuc2xvdCkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2xvdFxuICAgICAgfVxuICAgICAgY29uc29sZS5lcnJvcignUGxlYXNlIGNoZWNrIHlvdXIgVm5vZGUgd3JpdGluZycpXG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgfSxcbiAgcmVuZGVyKGgpIHtcbiAgIHJldHVybiBoKCd0cmFuc2l0aW9uJyx7XG4gICAgICBhdHRyczoge1xuICAgICAgICBuYW1lOiAnc3ctbm90aWZpY2F0aW9uLWZhZGUnXG4gICAgICB9XG4gICAgfSwgW3RoaXMuc2hvdyA/IGgoJ2RpdicsIHtcbiAgICAgICAgICAgIGNsYXNzOiAnc3ctbm90aWZpY2F0aW9uJyxcbiAgICAgICAgICAgIHN0eWxlOiBPYmplY3QuYXNzaWduKHRoaXMucG9zaXRpb25TdHlsZSwgeyBiYWNrZ3JvdW5kOiB0aGlzLmJhY2tncm91bmQgfSlcbiAgICAgICAgICB9LCBbXG4gICAgICAgICAgICB0aGlzLmdldFZub2RlID8gJycgOiBoKCdoMicsIHtcbiAgICAgICAgICAgICAgY2xhc3M6ICd0aXRsZSdcbiAgICAgICAgICAgIH0sIHRoaXMudGl0bGUpLFxuICAgICAgICAgICAgdGhpcy5nZXRWbm9kZSA/IHRoaXMuZ2V0Vm5vZGUgOiBoKCdkaXYnLCB7XG4gICAgICAgICAgICAgIGNsYXNzOiAnY29udGVudCdcbiAgICAgICAgICAgIH0sdGhpcy5jb250ZW50KSxcbiAgICAgICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAgICAgY2xhc3M6ICdjbG9zZScsXG4gICAgICAgICAgICAgIHN0eWxlOiB7IGNvbG9yOiB0aGlzLmNsb3NlQ29sb3IgfSxcbiAgICAgICAgICAgIH0sIFtoKCdkaXYnLCB7XG4gICAgICAgICAgICAgICAgICBjbGFzczogJ21hdGVyaWFsLWljb25zJyxcbiAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgIGNsaWNrOiAoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQnRuKClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sICdjbG9zZScpXSlcbiAgICAgICAgICBdKVxuICAgIFxuICAgICAgICA6IHZvaWQgMF0gKVxuICB9XG59XG5cbiIsImltcG9ydCBWdWUgZnJvbSAndnVlJztcbmltcG9ydCBOb3RpZmljYXRpb24gZnJvbSAnLi9tYWluLmpzJztcblxuY29uc3QgTm90aWZpY2F0aW9uQ29uc3RydWN0b3IgPSBWdWUuZXh0ZW5kKE5vdGlmaWNhdGlvbilcblxubGV0IGluc3RhbmNlO1xubGV0IGluc3RhbmNlcyA9IFtdXG5sZXQgc2VlZCA9IDFcbmNvbnN0IE5vdGlmaWNhdGlvbkZ1biA9IGZ1bmN0aW9uKG9wdGlvbnMpe1xuICBpZiAoVnVlLnByb3RvdHlwZS4kaXNTZXJ2ZXIpIHJldHVybjtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGNvbnN0IHVzZXJPbkNsb3NlID0gb3B0aW9ucy5vbkNsb3NlO1xuICBjb25zdCBpZCA9ICdub3RpZmljYXRpb25fJyArIHNlZWQrKztcbiAgY29uc3QgcG9zaXRpb24gPSBvcHRpb25zLnBvc2l0aW9uIHx8ICd0b3AtcmlnaHQnO1xuICBvcHRpb25zLm9uQ2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgICBOb3RpZmljYXRpb24uY2xvc2UoaWQsIHVzZXJPbkNsb3NlKVxuICB9XG4gIGluc3RhbmNlID0gbmV3IE5vdGlmaWNhdGlvbkNvbnN0cnVjdG9yKHtcbiAgICBkYXRhOiBvcHRpb25zXG4gIH0pXG4gIGluc3RhbmNlLmlkID0gaWRcbiAgaW5zdGFuY2UuJG1vdW50KCk7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoaW5zdGFuY2UuJGVsKTtcbiAgaW5zdGFuY2Uuc2hvdyA9IHRydWVcbiAgbGV0IHZlcnRpY2FsT2Zmc2V0ID0gMFxuICBpbnN0YW5jZXMuZmlsdGVyKGl0ZW0gPT4gaXRlbS5wb3NpdGlvbiA9PT0gcG9zaXRpb24pLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgdmVydGljYWxPZmZzZXQgKz0gZWxlbWVudC4kZWwub2Zmc2V0SGVpZ2h0ICsgMTZcbiAgfSk7XG4gIHZlcnRpY2FsT2Zmc2V0ICs9IDE2XG4gIGluc3RhbmNlLnZlcnRpY2FsT2Zmc2V0ID0gdmVydGljYWxPZmZzZXRcbiAgaW5zdGFuY2VzLnB1c2goaW5zdGFuY2UpXG4gIGNvbnNvbGUubG9nKClcbiAgcmV0dXJuIGluc3RhbmNlO1xufSBcbk5vdGlmaWNhdGlvbi5jbG9zZSA9IGZ1bmN0aW9uKGlkLCB1c2VyT25DbG9zZSkge1xuICBsZXQgaW5kZXggPSAtMVxuICBjb25zdCBsZW4gPSBpbnN0YW5jZXMubGVuZ3RoXG4gIGNvbnN0IGluc3RhbmNlID0gaW5zdGFuY2VzLmZpbHRlcigoaW5zdGFuY2UsIGkpID0+IHtcbiAgICBpZiAoaW5zdGFuY2UuaWQgPT09IGlkKSB7XG4gICAgICBpbmRleCA9IGk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9KVswXVxuICBpZiAoIWluc3RhbmNlKSByZXR1cm5cblxuICBpZiAodHlwZW9mIHVzZXJPbkNsb3NlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdXNlck9uQ2xvc2UoaW5zdGFuY2UpO1xuICB9XG4gIGluc3RhbmNlcy5zcGxpY2UoaW5kZXgsIDEpXG5cbiAgaWYgKGxlbiA8PSAxKSByZXR1cm5cblxuICBjb25zdCBwb3NpdGlvbiA9IGluc3RhbmNlLnBvc2l0aW9uO1xuICBjb25zdCByZW1vdmVkSGVpZ2h0ID0gaW5zdGFuY2UuJGVsLm9mZnNldEhlaWdodFxuICBmb3IgKGxldCBpID0gaW5kZXg7IGkgPCBsZW4gLSAxOyBpKyspe1xuICAgIGlmIChpbnN0YW5jZXNbaV0ucG9zaXRpb24gPT09IHBvc2l0aW9uKSB7XG4gICAgICBpbnN0YW5jZXNbaV0uJGVsLnN0eWxlW2luc3RhbmNlLnZlcnRpY2FsUHJvcGVydHldID0gcGFyc2VJbnQoaW5zdGFuY2VzW2ldLiRlbC5zdHlsZVtpbnN0YW5jZS52ZXJ0aWNhbFByb3BlcnR5XSwgMTApIC0gcmVtb3ZlZEhlaWdodCAtIDE2ICsgJ3B4J1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBOb3RpZmljYXRpb25GdW4iLCJleHBvcnQgZnVuY3Rpb24gcG9zaXRpb24oZSkge1xuICBpZiAoZS50b3VjaGVzICYmIGUudG91Y2hlc1swXSkge1xuICAgIGUgPSBlLnRvdWNoZXNbMF1cbiAgfSBlbHNlIGlmIChlLmNoYW5nZWRUb3VjaGVzICYmIGUuY2hhbmdlZFRvdWNoZXNbMF0pIHtcbiAgICBlID0gZS5jaGFuZ2VkVG91Y2hlc1swXVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB0b3A6IGUuY2xpZW50WSxcbiAgICBsZWZ0OiBlLmNsaWVudFhcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RXZlbnRQYXRoKGUpIHtcbiAgaWYgKGUucGF0aCkge1xuICAgIHJldHVybiBlLnBhdGhcbiAgfVxuICBpZiAoZS5jb21wb3NlZFBhdGgpIHtcbiAgICByZXR1cm4gZS5jb21wb3NlZFBhdGgoKVxuICB9XG5cbiAgY29uc3QgcGF0aCA9IFtdXG4gIGxldCBlbCA9IGUudGFyZ2V0XG5cbiAgd2hpbGUgKGVsKSB7XG4gICAgcGF0aC5wdXNoKGVsKVxuXG4gICAgaWYgKGVsLnRhZ05hbWUgPT09ICdIVE1MJykge1xuICAgICAgcGF0aC5wdXNoKGRvY3VtZW50KVxuICAgICAgcGF0aC5wdXNoKHdpbmRvdylcbiAgICAgIHJldHVybiBwYXRoXG4gICAgfVxuXG4gICAgZWwgPSBlbC5wYXJlbnRFbGVtZW50XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0b3AoZSkge1xuICBlLnN0b3BQcm9wYWdhdGlvbigpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcmV2ZW50KGUpIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdG9wQW5kUHJldmVudChlKSB7XG4gIGUucHJldmVudERlZmF1bHQoKVxuICBlLnN0b3BQcm9wYWdhdGlvbigpXG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgcG9zaXRpb24sXG4gIGdldEV2ZW50UGF0aCxcbiAgc3RvcCxcbiAgcHJldmVudCxcbiAgc3RvcEFuZFByZXZlbnRcbn0iLCJpbXBvcnQgeyBjc3MgfSBmcm9tICcuLi8uLi8uLi91dGlscy9kb20uanMnXG5pbXBvcnQgeyBwb3NpdGlvbiB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2V2ZW50LmpzJ1xuXG5mdW5jdGlvbiBzaG93UmlwcGxlKGV2dCwgZWwsIGN0eCwgZm9yY2VDZW50ZXIpIHtcbiAgaWYgKGN0eC5tb2RpZmllcnMuc3RvcCA9PT0gdHJ1ZSkge1xuICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKVxuICB9XG5cbiAgbGV0IHsgY2VudGVyLCBjb2xvciB9ID0gY3R4Lm1vZGlmaWVyc1xuXG4gIGNlbnRlciA9IGNlbnRlciA9PT0gdHJ1ZSB8fCBmb3JjZUNlbnRlciA9PT0gdHJ1ZVxuXG4gIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgY29uc3QgaW5uZXJOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gIGNvbnN0IHBvcyA9IHBvc2l0aW9uKGV2dClcbiAgY29uc3QgeyBsZWZ0LCB0b3AsIHdpZHRoLCBoZWlnaHQgfSA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gIGNvbnN0IGRpYW1ldGVyID0gTWF0aC5zcXJ0KHdpZHRoICogd2lkdGggKyBoZWlnaHQgKiBoZWlnaHQpXG4gIGNvbnN0IHJhZGl1cyA9IGRpYW1ldGVyIC8gMlxuICBjb25zdCBjZW50ZXJYID0gYCR7KHdpZHRoIC0gZGlhbWV0ZXIpIC8gMn1weGBcbiAgY29uc3QgeCA9IGNlbnRlciA/IGNlbnRlclggOiBgJHtwb3MubGVmdCAtIGxlZnQgLSByYWRpdXN9cHhgXG4gIGNvbnN0IGNlbnRlclkgPSBgJHsoaGVpZ2h0IC0gZGlhbWV0ZXIpIC8gMn1weGBcbiAgY29uc3QgeSA9IGNlbnRlciA/IGNlbnRlclkgOiBgJHtwb3MudG9wIC0gdG9wIC0gcmFkaXVzfXB4YFxuICBsZXQgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBpbm5lck5vZGUuY2xhc3NMaXN0LmFkZCgnc3ctcmlwcGxlX19pbm5lci0tZW50ZXInKVxuICAgIGlubmVyTm9kZS5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlM2QoJHtjZW50ZXJYfSwgJHtjZW50ZXJZfSwgMCkgc2NhbGUzZCgxLCAxLCAxKWBcbiAgICBpbm5lck5vZGUuc3R5bGUub3BhY2l0eSA9IDAuMlxuXG4gICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlubmVyTm9kZS5jbGFzc0xpc3QucmVtb3ZlKCdzdy1yaXBwbGVfX2lubmVyLS1lbnRlcicpXG4gICAgICBpbm5lck5vZGUuY2xhc3NMaXN0LmFkZCgnc3ctcmlwcGxlX19pbm5lci0tbGVhdmUnKVxuICAgICAgaW5uZXJOb2RlLnN0eWxlLm9wYWNpdHkgPSAwXG5cbiAgICAgIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIG5vZGUgJiYgbm9kZS5yZW1vdmUoKVxuICAgICAgICBjdHguYWJvcnQgPSB2b2lkIDBcbiAgICAgIH0sIDI3NSlcbiAgICB9LCAyNTApXG4gIH0sIDUwKVxuXG4gIGlubmVyTm9kZS5jbGFzc05hbWUgPSAnc3ctcmlwcGxlX19pbm5lcidcbiAgY3NzKGlubmVyTm9kZSwge1xuICAgIGhlaWdodDogYCR7ZGlhbWV0ZXJ9cHhgLFxuICAgIHdpZHRoOiBgJHtkaWFtZXRlcn1weGAsXG4gICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlM2QoJHt4fSwgJHt5fSwgMCkgc2NhbGUzZCgwLjIsIDAuMiwgMSlgLFxuICAgIG9wYWNpdHk6IDBcbiAgfSlcbiAgaWYgKGNvbG9yKSB7IGNzcyhub2RlLCB7IGNvbG9yOiBjb2xvciB9KSB9XG4gIG5vZGUuY2xhc3NOYW1lID0gYHN3LXJpcHBsZWBcbiAgbm9kZS5hcHBlbmRDaGlsZChpbm5lck5vZGUpXG4gIGVsLmFwcGVuZENoaWxkKG5vZGUpXG5cbiAgY3R4LmFib3J0ID0gKCkgPT4ge1xuICAgIG5vZGUgJiYgbm9kZS5yZW1vdmUoKVxuICAgIGNsZWFyVGltZW91dCh0aW1lcilcbiAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGVDdHgoY3R4LCB7IHZhbHVlLCBtb2RpZmllcnMsIGFyZyB9KSB7XG4gIGN0eC5lbmFibGVkID0gdmFsdWUgIT09IGZhbHNlXG5cbiAgaWYgKGN0eC5lbmFibGVkID09PSB0cnVlKSB7XG4gICAgY3R4Lm1vZGlmaWVycyA9IE9iamVjdCh2YWx1ZSkgPT09IHZhbHVlXG4gICAgICA/IHtcbiAgICAgICAgc3RvcDogdmFsdWUuc3RvcCA9PT0gdHJ1ZSB8fCBtb2RpZmllcnMuc3RvcCA9PT0gdHJ1ZSxcbiAgICAgICAgY2VudGVyOiB2YWx1ZS5jZW50ZXIgPT09IHRydWUgfHwgbW9kaWZpZXJzLmNlbnRlciA9PT0gdHJ1ZSxcbiAgICAgICAgY29sb3I6IHZhbHVlLmNvbG9yIHx8IGFyZ1xuICAgICAgfVxuICAgICAgOiB7XG4gICAgICAgIHN0b3A6IG1vZGlmaWVycy5zdG9wLFxuICAgICAgICBjZW50ZXI6IG1vZGlmaWVycy5jZW50ZXIsXG4gICAgICAgIGNvbG9yOiBhcmdcbiAgICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdyaXBwbGUnLFxuICBpbnNlcnRlZChlbCwgYmluZGluZykge1xuICAgIGNvbnN0IGN0eCA9IHtcbiAgICAgIG1vZGlmaWVyczoge30sXG4gICAgICBjbGljayhldnQpIHtcbiAgICAgICAgaWYgKGN0eC5lbmFibGVkID09PSB0cnVlKSB7XG4gICAgICAgICAgc2hvd1JpcHBsZShldnQsIGVsLCBjdHgpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBrZXl1cChldnQpIHtcbiAgICAgICAgaWYgKGN0eC5lbmFibGVkID09PSB0cnVlICYmIGV2dC5rZXlDb2RlID09PSAxMykge1xuICAgICAgICAgIHNob3dSaXBwbGUoZXZ0LCBlbCwgY3R4LCB0cnVlKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlQ3R4KGN0eCwgYmluZGluZylcbiAgICBpZiAoZWwucmlwcGxlQ3R4KSB7XG4gICAgICBlbC5yaXBwbGVDdHhPbGQgPSBlbC5yaXBwbGVDdHhcbiAgICB9XG4gICAgZWwucmlwcGxlQ3R4ID0gY3R4XG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjdHguY2xpY2ssIGZhbHNlKVxuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgY3R4LmtleXVwLCBmYWxzZSlcbiAgfSxcbiAgdXBkYXRlKGVsLCBiaW5kaW5nKSB7XG4gICAgZWwucmlwcGxlQ3R4ICE9PSB2b2lkIDAgJiYgdXBkYXRlQ3R4KGVsLnJpcHBsZUN0eCwgYmluZGluZylcbiAgfSxcbiAgdW5iaW5kKGVsKSB7XG4gICAgY29uc3QgY3R4ID0gZWwucmlwcGxlQ3R4T2xkIHx8IGVsLnJpcHBsZUN0eFxuXG4gICAgaWYgKGN0eCAhPT0gdm9pZCAwKSB7XG4gICAgICBjdHguYWJvcnQgIT09IHZvaWQgMCAmJiBjdHguYWJvcnQoKVxuICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjdHguY2xpY2ssIGZhbHNlKVxuICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBjdHgua2V5dXAsIGZhbHNlKVxuICAgICAgZGVsZXRlIGVsW2VsLnJpcHBsZUN0eE9sZCA/ICdyaXBwbGVDdHhPbGQnIDogJ3JpcHBsZUN0eCddXG4gICAgfVxuICB9XG59IiwiaW1wb3J0IFJpcHBsZSBmcm9tICcuL3NyYy9tYWluLmpzJ1xuXG5jb25zdCBpbnN0YWxsID0gZnVuY3Rpb24gKFZ1ZSkge1xuICBWdWUuZGlyZWN0aXZlKFJpcHBsZS5uYW1lLCBSaXBwbGUpXG59XG5cblJpcHBsZS5pbnN0YWxsID0gaW5zdGFsbFxuXG5leHBvcnQgZGVmYXVsdCBSaXBwbGUiLCJpbXBvcnQgJy4vY3NzL2luZGV4LnN0eWwnXG5pbXBvcnQgSWNvbiBmcm9tICcuL2NvbXBvbmVudHMvaWNvbi9pbmRleC5qcydcbmltcG9ydCBJdGVtIGZyb20gJy4vY29tcG9uZW50cy9pdGVtL2luZGV4LmpzJ1xuaW1wb3J0IEZpZWxkIGZyb20gJy4vY29tcG9uZW50cy9maWVsZC9pbmRleC5qcydcbmltcG9ydCBJbnB1dCBmcm9tICcuL2NvbXBvbmVudHMvaW5wdXQvaW5kZXguanMnXG5pbXBvcnQgU2VsZWN0IGZyb20gJy4vY29tcG9uZW50cy9zZWxlY3QvaW5kZXguanMnXG5pbXBvcnQgU2Nyb2xsQXJlYSBmcm9tICcuL2NvbXBvbmVudHMvc2Nyb2xsQXJlYS9pbmRleC5qcydcbmltcG9ydCBNb2RhbCBmcm9tICcuL2NvbXBvbmVudHMvbW9kYWwvaW5kZXguanMnXG5pbXBvcnQgUG9wb3ZlciBmcm9tICcuL2NvbXBvbmVudHMvcG9wb3Zlci9pbmRleC5qcydcbmltcG9ydCBCdXR0b24gZnJvbSAnLi9jb21wb25lbnRzL2J1dHRvbi9pbmRleC5qcydcbmltcG9ydCBDaGVja2JveCBmcm9tICcuL2NvbXBvbmVudHMvY2hlY2tib3gvaW5kZXguanMnXG5pbXBvcnQgQ2hlY2tib3hHcm91cCBmcm9tICcuL2NvbXBvbmVudHMvY2hlY2tib3hHcm91cC9pbmRleC5qcydcbmltcG9ydCBSYWRpbyBmcm9tICcuL2NvbXBvbmVudHMvcmFkaW8vaW5kZXguanMnXG5pbXBvcnQgUmFkaW9Hcm91cCBmcm9tICcuL2NvbXBvbmVudHMvcmFkaW9Hcm91cC9pbmRleC5qcydcbmltcG9ydCBQYWdpbmF0aW9uIGZyb20gJy4vY29tcG9uZW50cy9wYWdpbmF0aW9uL2luZGV4LmpzJ1xuaW1wb3J0IE5vdGlmaWNhdGlvbiBmcm9tICcuL2NvbXBvbmVudHMvbm90aWZpY2F0aW9uL2luZGV4LmpzJ1xuaW1wb3J0IFJpcHBsZSBmcm9tICcuL2RpcmVjdGl2ZXMvcmlwcGxlL2luZGV4LmpzJ1xuXG5jb25zdCBjb21wb25lbnRzID0gW1xuICBJY29uLFxuICBJdGVtLFxuICBGaWVsZCxcbiAgSW5wdXQsXG4gIFNlbGVjdCxcbiAgU2Nyb2xsQXJlYSxcbiAgTW9kYWwsXG4gIFBvcG92ZXIsXG4gIEJ1dHRvbixcbiAgUGFnaW5hdGlvbixcblxuICAvLyBOb3RpZmljYXRpb24sXG4gIENoZWNrYm94LFxuICBDaGVja2JveEdyb3VwLFxuICBSYWRpbyxcbiAgUmFkaW9Hcm91cFxuXVxuXG5jb25zdCBkaXJlY3RpdmVzID0gW1xuICBSaXBwbGVcbl1cblxuY29uc3QgaW5zdGFsbCA9IGZ1bmN0aW9uIChWdWUpIHtcbiAgY29tcG9uZW50cy5mb3JFYWNoKGNvbXBvbmVudCA9PiB7XG4gICAgVnVlLmNvbXBvbmVudChjb21wb25lbnQubmFtZSwgY29tcG9uZW50KVxuICB9KVxuICBkaXJlY3RpdmVzLmZvckVhY2goZGlyZWN0aXZlID0+IHtcbiAgICBWdWUuZGlyZWN0aXZlKGRpcmVjdGl2ZS5uYW1lLCBkaXJlY3RpdmUpXG4gIH0pXG4gIFZ1ZS5wcm90b3R5cGUuJG5vdGlmeSA9IE5vdGlmaWNhdGlvblxufVxuXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LlZ1ZSkge1xuICBpbnN0YWxsKHdpbmRvdy5WdWUpXG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaW5zdGFsbCxcbiAgSWNvbixcbiAgSXRlbSxcbiAgRmllbGQsXG4gIElucHV0LFxuICBTZWxlY3QsXG4gIFNjcm9sbEFyZWEsXG4gIFBvcG92ZXIsXG4gIE1vZGFsLFxuICBCdXR0b24sXG4gIFBhZ2luYXRpb24sXG4gIENoZWNrYm94LFxuICBDaGVja2JveEdyb3VwLFxuICBSYWRpbyxcbiAgUmFkaW9Hcm91cCxcbiAgUmlwcGxlXG59XG4iXSwibmFtZXMiOlsibmFtZSIsInByb3BzIiwiU3RyaW5nIiwiY29sb3IiLCJwcmltYXJ5IiwiQm9vbGVhbiIsIm5lZ2F0aXZlIiwicG9zaXRpdmUiLCJ3YXJuaW5nIiwiZ3JleSIsImxpZ2h0R3JleSIsInNpemUiLCJjb21wdXRlZCIsImNsYXNzZXMiLCJjbHMiLCJpY29uIiwiY29udGVudCIsInN0eWxlIiwiZm9udFNpemUiLCJyZW5kZXIiLCJoIiwic3RhdGljQ2xhc3MiLCJjbGFzcyIsImF0dHJzIiwib24iLCIkbGlzdGVuZXJzIiwiaW5zdGFsbCIsIlZ1ZSIsImNvbXBvbmVudCIsIkljb24iLCJ3cmFwIiwiaGlkZUJlZm9yZSIsImhpZGVEZWZhdWx0IiwiaGlkZUFmdGVyIiwidG8iLCJPYmplY3QiLCJkYXRhIiwiY3Vyc29yIiwiY2xpY2siLCJlIiwiJHJvdXRlciIsInB1c2giLCIkZW1pdCIsIiRzY29wZWRTbG90cyIsImJlZm9yZSIsImhpZGUiLCJkZWZhdWx0IiwiYWZ0ZXIiLCJJdGVtIiwiZXJyb3JNZXNzYWdlIiwicnVsZXMiLCJBcnJheSIsImlzRGlydHkiLCJpbm5lckVycm9yIiwiaW5uZXJFcnJvck1lc3NhZ2UiLCJ3YXRjaCIsImZvcmNlQ2hlY2siLCJ2IiwidmFsaWRhdGUiLCJ2YWx1ZSIsInZhbGlkYXRlVmFsdWUiLCJoYXNFcnJvciIsImNvbXB1dGVkRXJyb3JNZXNzYWdlIiwibW91bnRlZCIsIiRvbiIsInRyaWdnZXJWYWxpZGF0aW9uIiwiYmVmb3JlRGVzdHJveSIsIiRvZmYiLCJtZXRob2RzIiwicmVzZXRWYWxpZGF0aW9uIiwidmFsIiwibGVuZ3RoIiwidXBkYXRlIiwiZXJyIiwibXNnIiwibSIsInNvbWUiLCJydWxlIiwicmVzIiwiZm9yY2UiLCJhZHZhbmNlZEJsdXIiLCJkaXNhYmxlZCIsImV4Y2x1ZGVkIiwiZ2V0UmVmcyIsInJlZk5hbWVzIiwiZ2V0RG9tcyIsImVscyIsImlzQXJyYXkiLCJyZWR1Y2UiLCJhY2N1bXVsYXRvciIsImVsIiwiJGVsIiwicmVmIiwiY29uY2F0IiwiJHJlZnMiLCJleGNsdWRlZEJsdXJSZWZzIiwicmVmcyIsImNvbnRhaW5zIiwidGFyZ2V0IiwiZm9jdXNlZCIsImZvY3VzZWRCZWZvcmUiLCJibHVyVHlwZSIsImJsdXJSZWZzIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIm1peGlucyIsIlZhbGlkYXRlTWl4aW4iLCJBZHZhbmNlZEJsdXJNaXhpbiIsImNvbXBvbmVudHMiLCJyZXF1aXJlZCIsInVuZGVybGluZWQiLCJib3JkZXJlZCIsImZpbGxlZCIsIm1pbmkiLCJsYWJlbCIsImZvY3VzIiwiYmx1ciIsImRpc2FibGUiLCJ1bmRlcmxpbmUiLCJib3JkZXIiLCJmaWxsIiwiZXJyb3IiLCJpbm5lclBvaW50ZXIiLCJzY29wZWRTbG90cyIsImdldElubmVyIiwiZ2V0QWZ0ZXIiLCJGaWVsZCIsInBsYWNlaG9sZGVyIiwiaW5wdXQiLCJkb21Qcm9wcyIsIklucHV0IiwieCIsInkiLCJ3aWR0aCIsImhlaWdodCIsIlNjcm9sbEFyZWEiLCJpc0RlZXBFcXVhbCIsImEiLCJiIiwiRGF0ZSIsImdldFRpbWUiLCJrZXlzIiwiZXZlcnkiLCJwcm9wIiwiaXNTdHJpbmdDb250YWluIiwicyIsImlubmVyUyIsImlubmVyViIsInN1bSIsImZvckVhY2giLCJpbmNsdWRlcyIsInJlcGxhY2UiLCJpc09iamVjdCIsIlNjb3JsbEFyZWEiLCJtdWx0aXBsZSIsIm9wdGlvbnMiLCJmaWx0ZXIiLCJvcHRpb25zSGVpZ2h0IiwidHlwZSIsInNlbGVjdGVkU3R5bGUiLCJmaWx0ZXJWYWx1ZSIsImlubmVyVmFsdWUiLCJnZXQiLCJnZXRFeGFjdFZhbHVlcyIsInNldCIsImlubmVyT3B0aW9ucyIsImMiLCJmaWx0ZXJBcnIiLCJzcGxpdCIsImdldE5hbWUiLCIkbmV4dFRpY2siLCJjbGVhckZpbHRlciIsInRyaWdnZXJCbHVyIiwiZ2V0T3B0aW9ucyIsIm1hcCIsIm9wdGlvbiIsInNlbGVjdGVkIiwiY2hlY2tTZWxlY3RlZCIsIm5hdGl2ZU9uIiwiZm9ybWF0VmFsdWUiLCJnZXRTZWxlY3RlZCIsImdldEV4YWN0T3B0aW9ucyIsInJlZkluRm9yIiwicGFkZGluZyIsIm9wZSIsImR1cGxpY2F0ZWQiLCJnZXRWYWx1ZSIsImhhc093blByb3BlcnR5IiwiU2VsZWN0Iiwicm91bmQiLCJzaGFkb3ciLCJub0hvdmVyIiwibW91c2VvdmVyIiwibW91c2VvdXQiLCJpbnZpc2libGUiLCJCdXR0b24iLCJzd0J1dHRvbiIsInNob3ciLCJ0aXRsZSIsInpJbmRleCIsIm9wYWNpdHkiLCJoYW5kbGVDYW5jZWwiLCJoYW5kbGVDb25maXJtIiwic2hvd01vZGFsIiwiaGlkZU1vZGFsIiwiZXZlbnQiLCJzdG9wUHJvcGFnYXRpb24iLCJoZWFkZXIiLCJmb290ZXIiLCJNb2RhbCIsImlzU2VydmVyIiwicHJvdG90eXBlIiwiJGlzU2VydmVyIiwiY3NzIiwiZWxlbWVudCIsImhhbmRsZXIiLCJhdHRhY2hFdmVudCIsIm9mZiIsImRldGFjaEV2ZW50IiwicG9wb3ZlclN0eWxlIiwiYXJyb3dTdHlsZSIsInJlZmVyZW5jZUVsbSIsIm1vZGVsIiwicGxhY2VtZW50IiwidHJpZ2dlciIsInZhbGlkYXRvciIsImluZGV4T2YiLCJzaG93VmFsdWUiLCJzaG93U3R5bGUiLCJnZXRTdHlsZSIsInBvcG92ZXJFbG0iLCJ0b3AiLCJvZmZzZXRIZWlnaHQiLCJsZWZ0Iiwib2Zmc2V0V2lkdGgiLCJyaWdodCIsImhhbmRsZUNsaWNrIiwiaGFuZGxlTW91c2VFbnRlciIsImhhbmRsZU1vdXNlTGVhdmUiLCJkb1Nob3ciLCJkb0Nsb3NlIiwiaGFuZGxlTWFudWFsIiwicG9wb3ZlciIsInJlZmVyZW5jZSIsImVsbSIsInF1ZXJ5U2VsZWN0b3IiLCJkZXN0cm95ZWQiLCJhc3NpZ24iLCJQb3BvdmVyIiwibGVmdExhYmVsIiwiY29sb3JMYWJlbCIsImtlZXBDb2xvciIsInBhcmVudCIsInBhcmVudERpc2FibGVkIiwiY2hlY2tlZCIsImJvb2xlYW5Nb2RlIiwiZ2V0Q2hlY2tlZCIsInNlbGYiLCJjb2xvckNoZWNrYm94IiwiZ2V0TGFiZWwiLCJDaGVja2JveCIsInNodXR0bGUiLCJfdGhpcyIsIiRjaGlsZHJlbiIsImNoaWxkIiwic2h1dHRsZVJlZiIsIlNodXR0bGVNaXhpbiIsIkNoZWNrYm94R3JvdXAiLCJjb2xvclJhZGlvIiwiUmFkaW8iLCJSYWRpb0dyb3VwIiwibWFrZVJlc3VsdCIsInRvdGFsIiwiY3VyIiwiYXJvdW5kIiwicmVzdWx0IiwiYmFzZUNvdW50Iiwic3VycGx1cyIsInN0YXJ0UG9zaXRpb24iLCJlbmRQb3NpdGlvbiIsImZyb20iLCJpIiwiUGFnaW5hdGlvbiIsImhhc093biIsIm9iaiIsImtleSIsImNhbGwiLCJpc1ZOb2RlIiwibm9kZSIsInZlcnRpY2FsT2Zmc2V0Iiwib25DbG9zZSIsInBvc2l0aW9uIiwic2xvdCIsImJhY2tncm91bmQiLCJjbG9zZUNvbG9yIiwiaGFuZGxlQnRuIiwidmVydGljYWxQcm9wZXJ0eSIsInRlc3QiLCJwb3NpdGlvblN0eWxlIiwiZ2V0Vm5vZGUiLCJjb25zb2xlIiwiTm90aWZpY2F0aW9uQ29uc3RydWN0b3IiLCJleHRlbmQiLCJOb3RpZmljYXRpb24iLCJpbnN0YW5jZSIsImluc3RhbmNlcyIsInNlZWQiLCJOb3RpZmljYXRpb25GdW4iLCJ1c2VyT25DbG9zZSIsImlkIiwiY2xvc2UiLCIkbW91bnQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJpdGVtIiwibG9nIiwiaW5kZXgiLCJsZW4iLCJzcGxpY2UiLCJyZW1vdmVkSGVpZ2h0IiwicGFyc2VJbnQiLCJ0b3VjaGVzIiwiY2hhbmdlZFRvdWNoZXMiLCJjbGllbnRZIiwiY2xpZW50WCIsInNob3dSaXBwbGUiLCJldnQiLCJjdHgiLCJmb3JjZUNlbnRlciIsIm1vZGlmaWVycyIsInN0b3AiLCJjZW50ZXIiLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJOb2RlIiwicG9zIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiZGlhbWV0ZXIiLCJNYXRoIiwic3FydCIsInJhZGl1cyIsImNlbnRlclgiLCJjZW50ZXJZIiwidGltZXIiLCJzZXRUaW1lb3V0IiwiY2xhc3NMaXN0IiwiYWRkIiwidHJhbnNmb3JtIiwicmVtb3ZlIiwiYWJvcnQiLCJjbGFzc05hbWUiLCJjbGVhclRpbWVvdXQiLCJ1cGRhdGVDdHgiLCJhcmciLCJlbmFibGVkIiwiaW5zZXJ0ZWQiLCJiaW5kaW5nIiwia2V5dXAiLCJrZXlDb2RlIiwicmlwcGxlQ3R4IiwicmlwcGxlQ3R4T2xkIiwidW5iaW5kIiwiZGlyZWN0aXZlIiwiUmlwcGxlIiwiZGlyZWN0aXZlcyIsIiRub3RpZnkiLCJ3aW5kb3ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxhQUFlO0VBQ2JBLEVBQUFBLElBQUksRUFBRSxRQURPO0VBRWJDLEVBQUFBLEtBQUssRUFBRTtFQUNM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
