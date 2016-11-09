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

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

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

        return this.display();
    };

    _class.prototype.configAction = function configAction() {
        return this.display();
    };

    _class.prototype.helpAction = function helpAction() {
        return this.display();
    };

    _class.prototype.writeconfigAction = function writeconfigAction() {
        var base_css = this.post('base_css');
        var css = this.post('css');
        var base_js = this.post('base_js');
        var js = this.post('js');

        var c = base_css.concat(css);
        var j = base_js.concat(js);

        var tpl = this.stbuiTemplate({
            domain: 'http://emres.dfcfw.com/stock/201610121223',
            appName: '',
            version: '201610121223',
            framework: this.coverFormat(j)
        });

        // 写入到执行命令行的目录下
        var cwd = process.cwd() + '/stbui.conf.js';
        _fs2.default.writeFileSync(cwd, tpl, 'utf-8');

        this.json(tpl);
    };

    _class.prototype.stbuiTemplate = function stbuiTemplate(options) {
        var path = think.RESOURCE_PATH + '/static/config.js';

        var result = _fs2.default.readFileSync(path, 'utf-8');
        result = result.replace(/{{domain}}/g, options.domain).replace(/{{version}}/g, options.version).replace(/{{appName}}/g, options.appName).replace(/{{framework}}/g, options.framework);

        return result;
    };

    _class.prototype.coverFormat = function coverFormat(arr) {
        if (think.isEmpty(arr)) {
            return 'framework/**/*.js';
        }

        var data = arr.map(function (value) {
            return 'framework/' + value + '/*.js';
        });

        return "{" + data.join(',') + "}";
    };

    return _class;
}(_base2.default);

exports.default = _class;
//# sourceMappingURL=yqb.js.map