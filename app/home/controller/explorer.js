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

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_Base) {
    (0, _inherits3.default)(_class, _Base);

    function _class() {
        (0, _classCallCheck3.default)(this, _class);
        return (0, _possibleConstructorReturn3.default)(this, _Base.apply(this, arguments));
    }

    _class.prototype.indexAction = function indexAction() {
        this.assign({
            path: process.cwd().replace(/\\/g, '/') + '/'
        });

        return this.display();
    };

    _class.prototype.openAction = function openAction(self) {
        var socket = self.http.socket;
        this.broadcast("new message", "connected");
    };

    _class.prototype.launcherAction = function launcherAction(self) {
        var _this2 = this;

        var exec = _child_process2.default.exec;
        var cmd = self.http.data.cmd;


        if (think.isEmpty(cmd)) {
            return;
        }
        console.log(cmd);

        var stbui = exec(cmd);
        stbui.stdout.setEncoding('UTF-8');
        stbui.stdout.on('data', function (data) {
            _this2.emit('launcher', data);
        });

        stbui.stderr.setEncoding('UTF-8');
        stbui.stderr.on('data', function (data) {
            _this2.emit('launcher', data);
        });

        stbui.on('close', function () {
            // this.emit('launcher', '');
            // this.emit('launcher', 'bright: complete');
        });
    };

    _class.prototype.closeAction = function closeAction(self) {
        this.broadcast("new message", "disconnected");
    };

    // 新建文件


    _class.prototype.mkfileAction = function mkfileAction() {
        var path = this.get('path');
        path = decodeURIComponent(path);

        if (!think.isFile(path)) {
            _fs2.default.writeFileSync(path, '');
        }

        this.json({ "code": true, "use_time": 0, "data": '\u65B0\u5EFA\u6210\u529F\uFF01' });
    };

    // 新建目录


    _class.prototype.mkdirAction = function mkdirAction() {
        var path = this.get('path');
        path = decodeURIComponent(path);

        if (!think.isDir(path)) {
            think.mkdir(path);
        }

        this.json({ "code": true, "use_time": 0, "data": '\u65B0\u5EFA\u6210\u529F\uFF01' });
    };

    _class.prototype.pathrnameAction = function pathrnameAction() {
        var path = this.post('path');
        var rname = this.post('rname_to');

        // 修改目录
        // think.chmod(file);

        this.success();
    };

    /*
     * 删除目录或文件
     */


    _class.prototype.pathdeleteAction = function pathdeleteAction() {
        var _this3 = this;

        var delFile = this.post('list');
        delFile = JSON.parse(delFile);

        var file = delFile[0].path;
        file = decodeURIComponent(file);

        if (delFile[0].type == 'folder') {
            think.rmdir(file).then(function () {
                _this3.success({}, 'success');
            });

            // fs.rmdirSync(file);
        } else if (delFile[0].type == 'file') {

            _fs2.default.unlinkSync(file);
        }

        this.json({ "code": true, "use_time": 0, "data": "删除成功" });
    };

    _class.prototype.filedownloadAction = function filedownloadAction() {
        var file = this.get('path');
        file = decodeURIComponent(file);

        var name = file.split('/').pop();

        this.download(file, name);

        this.success({
            name: name,
            path: file
        });
    };

    _class.prototype.historybackAction = function historybackAction() {
        this.success();
    };

    _class.prototype.pathinfoAction = function pathinfoAction() {
        this.success();
    };

    _class.prototype.pathcopyAction = function pathcopyAction() {
        this.success();
    };

    _class.prototype.zipDdownloadAction = function zipDdownloadAction() {
        this.success();
    };

    _class.prototype.zipAction = function zipAction() {
        this.success();
    };

    _class.prototype.searchAction = function searchAction() {
        this.success();
    };

    _class.prototype.treelistAction = function treelistAction() {
        var children = [];
        var dir = process.cwd();
        var files = _fs2.default.readdirSync(dir);

        files.forEach(function (filename) {
            var fullname = _path2.default.join(dir, filename);
            var stats = _fs2.default.statSync(fullname);

            if (stats.isDirectory()) {

                children.push({
                    name: filename,
                    type: 'folder',
                    atime: +stats.atime,
                    ctime: +stats.ctime,
                    mtime: +stats.mtime,
                    path: process.cwd() + '\\',
                    mode: 'drwx rwx rwx (0777) ',
                    is_readable: 1,
                    is_writeable: 1
                });
            }

            // process.stdout.write(filename + '\t' +
            //   stats.size + '\t' +
            //   stats.mtime + '\n'
            // );
        });

        var data = {
            "code": true,
            "use_time": 0,
            "data": [{
                "name": "收藏夹",
                "iconSkin": "fav",
                "menuType": "menuTreeFavRoot",
                "open": true,
                "children": []
            }, {
                "name": "我的项目",
                "children": children,
                "menuType": "menuTreeRoot",
                "iconSkin": "my",
                "open": true,
                "this_path": process.cwd(),
                "isParent": true
            }, {
                "name": "公共目录",
                "children": [],
                "menuType": "menuTreeRoot",
                "iconSkin": "lib",
                "open": true,
                "this_path": "*public*",
                // "this_path": think.ROOT_PATH,
                "isParent": false
            }]
        };

        this.json(data);
    };

    _class.prototype.pathlistAction = function pathlistAction() {
        var path = this.get('path');
        path = decodeURIComponent(decodeURIComponent(decodeURIComponent(path)));

        var files = this.getAllFiles(path);

        var folderlist = [],
            fielList = [];

        files.forEach(function (k, v) {

            var data = {};

            data.name = k.name;
            data.type = k.type;
            data.atime = k.atime;
            data.ctime = k.ctime;
            data.mtime = k.mtime;
            data.path = path;
            data.mode = 'drwx rwx rwx (0777) ';
            data.is_readable = 1;
            data.is_writeable = 1;

            if (k.type == 'folder') {
                folderlist.push(data);
            } else if (k.type == 'file') {
                data.ext = k.ext;
                data.size_friendly = "";
                data.size = '0', fielList.push(data);
            }
        });

        var data = {
            "code": true,
            "use_time": 0.015625,
            "data": {
                "folderlist": folderlist,
                "filelist": fielList,
                "path_type": "writeable",
                "history_status": {
                    "back": 1,
                    "next": 0
                }
            }
        };

        this.json(data);
    };

    _class.prototype.getAllFiles = function getAllFiles(dir) {

        var files = _fs2.default.readdirSync(dir).map(function (file) {

            var stat = _fs2.default.statSync(dir + file);
            var type = null;

            if (stat.isDirectory()) {
                type = 'folder';
            } else if (stat.isFile()) {
                type = 'file';
            }

            return {
                name: file,
                type: type,
                size: stat.size,
                atime: stat.atime.getTime(),
                mtime: stat.mtime.getTime(),
                ctime: stat.ctime.getTime(),
                mode: stat.mode
            };
        }).filter(function (file) {
            var start = file.name.indexOf('.');
            var end = file.length;
            var ext = '';

            if (start > 0) {
                ext = file.name.substring(start + 1, end);
            }

            file.ext = ext;
            return true;
        });

        return files;
    };

    _class.prototype.getFileContent = function getFileContent(file) {
        var buffer = _fs2.default.readFileSync(file);

        return buffer;
    };

    return _class;
}(_base2.default);

exports.default = _class;
//# sourceMappingURL=explorer.js.map