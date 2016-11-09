'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _base = require('./base.js');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_Base) {
	(0, _inherits3.default)(_class, _Base);

	function _class() {
		(0, _classCallCheck3.default)(this, _class);
		return (0, _possibleConstructorReturn3.default)(this, _Base.apply(this, arguments));
	}

	/**
  * index action
  * @return {Promise} []
  */
	_class.prototype.indexAction = function indexAction() {
		this.display();
	};

	_class.prototype.setAction = function setAction() {
		var data = {
			"code": true,
			"use_time": 0.015625,
			"data": '修改已生效！'
		};

		this.json(data);
	};

	_class.prototype.systemAction = function systemAction() {

		this.display();
	};

	_class.prototype.userAction = function userAction() {
		this.display();
	};

	_class.prototype.memberAction = function memberAction() {
		this.display();
	};

	_class.prototype.themeAction = function themeAction() {
		this.display();
	};

	_class.prototype.wallAction = function wallAction() {
		this.display();
	};

	_class.prototype.favAction = function favAction() {
		this.display();
	};

	_class.prototype.playerAction = function playerAction() {
		this.display();
	};

	_class.prototype.helpAction = function helpAction() {
		this.display();
	};

	_class.prototype.aboutAction = function aboutAction() {
		this.display();
	};

	return _class;
}(_base2.default);

exports.default = _class;
//# sourceMappingURL=setting.js.map