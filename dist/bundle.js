/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _mvc = __webpack_require__(1);

Mock.mock('/books/1', {
  id: 1,
  name: 'JavaScript高级程序设计',
  number: 2
});

// function Model(resource, data){
//   this.resource = resource;
//   this.data = data;
// }
// Model.prototype.fetch = function(id){
//   return axios.get(`/${this.resource}/${id}`).then((res)=>{
//     this.data = res.data;
//   })
// };
// Model.prototype.save = function(newData){
//   let id = this.data.id;
//   return axios.put(`/${this.resource}/${id}`, newData).then((res)=>{
//     this.data.number = newData
//   })
// };
// class Model {
//   constructor({resource, data}){
//     this.resource = resource;
//     this.data = data;
//   }
//   fetch(id){
//     return axios.get(`/${this.resource}/${id}`).then((res)=>{
//       this.data = res.data;
//     })
//   }
//   save(newData){
//     let id = this.data.id;
//     return axios.put(`/${this.resource}/${id}`, newData).then((res)=>{
//       this.data.number = newData
//     })
//   }
// }
// class View {
//   constructor({el,template}){
//     this.$el = $(el),
//     this.template = template;
//   }
//   render(data){
//     let htmlStr = this.template;
//     for(let key in data){
//       htmlStr = htmlStr.replace(`__${key}__`, data[key]);
//     }
//     this.$el.html(htmlStr);
//   }
// }
// class Controller {
//   constructor({model,view,events,afterInit,...rest}){
//     this.model = model;
//     this.view = view;
//     this.events = events;
//     Object.assign(this, rest);
//     this.init();
//     // afterInit.bind(this)()
//     afterInit.call(this)
//   }
//   init(){
//     this.bindEvents()
//     this.view.render(this.model.data)
//   }
//   bindEvents(){
//     this.events.map((event)=>{
//       this.view.$el.on(event.eventType, event.selector, this[event.fn].bind(this))//动态绑定
//     })
//   }
// }

var model = new _mvc.Model({
  resource: 'books',
  data: {
    id: null,
    name: '',
    number: 0
  }
});
var view = new _mvc.View({
  el: '#app',
  // data: {

  // },
  template: '\n    <div>\n      \u4E66\u540D\uFF1A\u300A__name__\u300B,\n      \u6570\u91CF\uFF1A__number__\n    </div>\n    <div class="actions">\n      <button id="addOne">\u52A01</button>\n      <button id="minusOne">\u51CF1</button>\n      <button id="square">\u5E73\u65B9</button>\n      <button id="cube">\u7ACB\u65B9</button>\n      <button id="zero">\u5F52\u96F6</button>\n    </div>\n  '
});
var controller = new _mvc.Controller({
  model: model,
  view: view,
  events: [{ eventType: 'click', selector: '#addOne', fn: 'addOne' }, { eventType: 'click', selector: '#minusOne', fn: 'minusOne' }, { eventType: 'click', selector: '#square', fn: 'square' }, { eventType: 'click', selector: '#cube', fn: 'cube' }, { eventType: 'click', selector: '#zero', fn: 'zero' }],
  afterInit: function afterInit() {
    this.fetchData(1);
  },

  //加1
  addOne: function addOne() {
    var newResult = this.model.data.number + 1;
    this.updateData(newResult);
  },

  //减1
  minusOne: function minusOne() {
    var newResult = this.model.data.number - 1;
    this.updateData(newResult);
  },

  //平方
  square: function square() {
    var newResult = Math.pow(this.model.data.number, 2);
    this.updateData(newResult);
  },

  //立方
  cube: function cube() {
    var newResult = Math.pow(this.model.data.number, 3);
    this.updateData(newResult);
  },

  //归零
  zero: function zero() {
    var newResult = 0;
    this.updateData(newResult);
  },
  fetchData: function fetchData(id) {
    this.model.fetch(id);
  },
  updateData: function updateData(newResult) {
    this.model.save(newResult);
  }
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventHub = function () {
  function EventHub() {
    _classCallCheck(this, EventHub);

    this.eventsList = {};
  }
  //绑定事件


  _createClass(EventHub, [{
    key: 'on',
    value: function on(eventName, callback) {
      if (!this.eventsList[eventName]) {
        this.eventsList[eventName] = [];
      }
      this.eventsList[eventName].push(callback);
    }
    //触发事件

  }, {
    key: 'trigger',
    value: function trigger(eventName) {
      for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        rest[_key - 1] = arguments[_key];
      }

      this.eventsList[eventName].map(function (fn) {
        fn.apply(null, rest);
      });
    }
  }]);

  return EventHub;
}();

var Model = function (_EventHub) {
  _inherits(Model, _EventHub);

  function Model(_ref) {
    var resource = _ref.resource,
        data = _ref.data;

    _classCallCheck(this, Model);

    var _this = _possibleConstructorReturn(this, (Model.__proto__ || Object.getPrototypeOf(Model)).call(this));

    _this.resource = resource;
    _this.data = data;
    return _this;
  }

  _createClass(Model, [{
    key: 'fetch',
    value: function fetch(id) {
      var _this2 = this;

      return axios.get('/' + this.resource + '/' + id).then(function (res) {
        _this2.data = res.data;
        _this2.trigger('updated'); //变更数据就触发事件
      });
    }
  }, {
    key: 'save',
    value: function save(newData) {
      var _this3 = this;

      var id = this.data.id;
      return axios.put('/' + this.resource + '/' + id, newData).then(function (res) {
        _this3.data.number = newData;
        _this3.trigger('updated');
      });
    }
  }]);

  return Model;
}(EventHub);

;

var View = function () {
  function View(_ref2) {
    var el = _ref2.el,
        template = _ref2.template;

    _classCallCheck(this, View);

    this.$el = $(el), this.template = template;
  }

  _createClass(View, [{
    key: 'render',
    value: function render(data) {
      var htmlStr = this.template;
      for (var key in data) {
        htmlStr = htmlStr.replace('__' + key + '__', data[key]);
      }
      this.$el.html(htmlStr);
    }
  }]);

  return View;
}();

;

var Controller = function () {
  function Controller(_ref3) {
    var model = _ref3.model,
        view = _ref3.view,
        events = _ref3.events,
        afterInit = _ref3.afterInit,
        rest = _objectWithoutProperties(_ref3, ['model', 'view', 'events', 'afterInit']);

    _classCallCheck(this, Controller);

    this.model = model;
    this.view = view;
    this.events = events;
    Object.assign(this, rest);
    this.init();
    // afterInit.bind(this)()
    afterInit.call(this);
  }

  _createClass(Controller, [{
    key: 'init',
    value: function init() {
      var _this4 = this;

      this.bindEvents();
      this.model.on('updated', function () {
        _this4.view.render(_this4.model.data);
      });
      this.view.render(this.model.data);
    }
  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      var _this5 = this;

      this.events.map(function (event) {
        _this5.view.$el.on(event.eventType, event.selector, _this5[event.fn].bind(_this5)); //动态绑定
      });
    }
  }]);

  return Controller;
}();

;
exports.Model = Model;
exports.View = View;
exports.Controller = Controller;

/***/ })
/******/ ]);