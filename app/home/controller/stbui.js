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
        this.assign({
            path: process.cwd(),
            name: process.cwd().split('\\').pop()
        });

        return this.display();
    };

    _class.prototype.operateAction = function operateAction() {
        this.assign({
            path: process.cwd(),
            name: process.cwd().split('\\').pop()
        });

        return this.display();
    };

    _class.prototype.modeAction = function modeAction() {
        return this.display();
    };

    _class.prototype.writeconfigAction = function writeconfigAction() {
        var domain = this.post('domain');
        var base_css = this.post('base_css');
        var css = this.post('css');
        var base_js = this.post('base_js');
        var js = this.post('js');
        //
        // if(think.isEmpty(domain)) {
        //     domain = 'http://emres.dfcfw.com/stock/201610121223';
        // }

        if (think.isEmpty(base_css)) {
            base_css = [];
        }

        if (think.isEmpty(css)) {
            css = [];
        }

        if (think.isEmpty(base_js)) {
            base_js = [];
        }

        if (think.isEmpty(js)) {
            js = [];
        }

        if (!think.isArray(base_js)) {
            base_js = [base_js];
        }

        if (!think.isArray(js)) {
            js = [js];
        }

        var c = base_css.concat(css);
        var j = base_js.concat(js);

        var tpl = this.stbuiTemplate({
            domain: domain,
            appName: '',
            version: this.formatDate(),
            js: this.coverFormat(j, 'js'),
            css: this.coverFormat(c, 'css')
        });

        // 写入到执行命令行的目录下
        var cwd = process.cwd() + '/stbui.conf.js';
        _fs2.default.writeFileSync(cwd, tpl, 'utf-8');

        this.json(tpl);
    };

    _class.prototype.stbuiTemplate = function stbuiTemplate(options) {
        var path = think.RESOURCE_PATH + '/static/config.js';

        var result = _fs2.default.readFileSync(path, 'utf-8');
        result = result.replace(/{{domain}}/g, options.domain).replace(/{{version}}/g, options.version).replace(/{{appName}}/g, options.appName).replace(/{{js}}/g, options.js).replace(/{{css}}/g, options.css);

        return result;
    };

    _class.prototype.coverFormat = function coverFormat(arr, ext) {

        if (think.isEmpty(arr) || !think.isArray(arr)) {
            return 'framework/**/*.' + ext;
        }

        var data = arr.map(function (value) {
            return 'framework/' + value + '/*.' + ext;
        });

        return "{" + data.join(',') + "}";
    };

    _class.prototype.formatDate = function formatDate() {
        var now = new Date();
        var y = now.getFullYear();
        var m = now.getMonth() + 1;
        var d = now.getDate();
        var H = now.getHours();
        var M = now.getMinutes();
        var S = now.getSeconds();

        m = m < 10 ? '0' + m : m;
        d = d < 10 ? '0' + d : d;
        H = H < 10 ? '0' + H : H;
        M = M < 10 ? '0' + M : M;
        S = S < 10 ? '0' + S : S;

        return y + '' + m + '' + d + '' + H + '' + M;
    };

    return _class;
}(_base2.default);

exports.default = _class;
//# sourceMappingURL=stbui.js.map