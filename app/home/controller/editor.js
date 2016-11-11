'use strict';

exports.__esModule = true;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

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
            //auto render template file index_index.html
            return this.display();
      };

      _class.prototype.editAction = function editAction() {
            var filename = this.get("filename");
            filename = decodeURIComponent(decodeURIComponent(decodeURIComponent(filename)));

            this.assign('filename', filename);

            return this.display();
      };

      _class.prototype.filegetAction = function filegetAction() {
            var filename = this.get("filename");
            filename = decodeURIComponent(decodeURIComponent(decodeURIComponent(filename)));

            var fileContent = this.getFileContent(filename);

            var data = {
                  "code": true,
                  "use_time": 0,
                  "data": {
                        "ext": "json",
                        "name": "package.json",
                        "filename": filename,
                        "charset": "utf-8",
                        "content": fileContent.toString('UTF-8')
                  }
            };

            this.json(data);
      };

      _class.prototype.filesaveAction = function filesaveAction() {
            var fileObj = this.post();

            // 写入权限
            // let state = think.isWritable(fileObj.path);
            // if(!state) return;

            // 文件编码

            // 写入文件
            _fs2.default.writeFileSync(fileObj.path, decodeURIComponent(fileObj.filestr), fileObj.charset);

            var data = {};

            this.json({ "code": true, "use_time": 0.0022890567779541, "data": "修改成功" });
      };

      _class.prototype.setconfigAction = function setconfigAction() {
            var data = {
                  "code": true,
                  "use_time": 0,
                  "data": '\u4FEE\u6539\u5DF2\u751F\u6548\uFF01'
            };

            this.json(data);
      };

      _class.prototype.commonjsAction = function commonjsAction(self) {

            var G = {
                  "lang": "zh_CN",
                  "is_root": 1,
                  "user_name": "admin",
                  "web_root": think.ROOT_PATH,
                  "web_host": self.http.host,
                  "static_path": "\/static\/",
                  "basic_path": think.ROOT_PATH,
                  "app_host": self.http.host,
                  "myhome": process.cwd().replace(/\\/g, '/') + '/',
                  "upload_max": 2097152,
                  "version": "3.23",
                  "version_desc": "product",
                  "json_data": "",
                  "theme": "metro\/",
                  "list_type": "icon",
                  "sort_field": "name",
                  "sort_order": "up",
                  "musictheme": "mp3player",
                  "movietheme": "webplayer"
            };

            G = (0, _stringify2.default)(G);

            var LNG = {
                  "upload_clear": "清空",
                  "upload_setting": "设置",
                  "upload_tips": "采用分片上传,不再受php.ini限制;推荐chrome体验文件夹拖拽上传",
                  "upload_exist": "同名文件处理",
                  "upload_exist_rename": "重命名",
                  "upload_exist_replace": "覆盖",
                  "upload_exist_skip": "跳过",
                  "more": "更多",
                  "system_setting": "系统设置",
                  "openProject": "编辑器打开项目",
                  "url_download": "下载地址",
                  "url_link": "外链地址",
                  "app_type_link": "快捷方式",
                  "createLink": "创建快捷方式",
                  "createProject": "添加到编辑器工程",
                  "only_read": "只读",
                  "only_read_desc": "该目录没有写权限<br/>可以在操作系统中设置此目录的权限",
                  "explorerNew": "kod 链接",
                  "zip_download_ready": "压缩后会自动下载,请稍后...",
                  "set_background": "设置为桌面壁纸",
                  "share": "共享",
                  "share_path": "共享路径",
                  "share_title": "资源共享",
                  "share_name": "共享标题",
                  "share_time": "到期时间",
                  "share_time_desc": "留空表示不设置到期时间",
                  "share_password": "提取密码",
                  "share_password_desc": "留空表示不需要密码",
                  "share_cancle": "取消共享",
                  "share_create": "创建公开链接",
                  "share_url": "共享地址",
                  "share_not_download": "禁止下载",
                  "share_not_download_tips": "共享者禁止了下载！",
                  "share_code_read": "代码阅读",
                  "share_save": "保存配置",
                  "share_error_param": "参数错误!",
                  "share_error_user": "用户信息错误！",
                  "share_error_sid": "共享不存在！",
                  "share_error_time": "您来晚了,该共享已经过期!",
                  "share_error_path": "共享文件不存在,被删除或者移走了!",
                  "share_error_password": "密码错误!",
                  "share_error_show_tips": "该类型文件暂不支持预览!",
                  "share_view_num": "浏览:",
                  "share_download_num": "下载:",
                  "my_share": "我的共享",
                  "share_edit": "编辑共享",
                  "share_remove": "取消共享",
                  "share_remove_tips": "确定取消共享？公开连接将失效.",
                  "share_open_page": "打开共享页面",
                  "share_open_path": "进入文件所在目录",
                  "recycle_clear": "清空回收站",
                  "recycle_clear_success": "清空回收站成功！",
                  "recycle_clear_info": "您确定要彻底删除回收站吗？",
                  "recycle_remove": "彻底删除",
                  "fav_remove": "取消收藏",
                  "remove_item": "项内容",
                  "uploading": "上传中...",
                  "show_file": "新页面预览",
                  "unknow_file_title": "文件打开提示!",
                  "unknow_file_tips": "暂不支持打开",
                  "unknow_file_download": "下载到本地",
                  "unknow_file_office": "office预览,此程序需要部署在外网",
                  "config_save_error_auth": "配置保存失败,管理员禁止了此权限!",
                  "config_save_error_file": "配置保存失败,目录需要有写权限!",
                  "shortcut": "快捷键",
                  "learnMore": "了解更多",
                  "code_mode": "高亮语法",
                  "replace": "替换",
                  "selectAll": "全选",
                  "reload": "重新载入",
                  "about": "关于",
                  "complete_current": "自动补全当前",
                  "view": "视图",
                  "tools": "工具",
                  "help": "帮助",
                  "not_exists": "不存在",
                  "group_role_fileDownload": "文件下载",
                  "group_role_share": "共享",
                  "system_setting_menu": "菜单管理",
                  "system_name": "程序名称",
                  "system_name_desc": "程序logo标题",
                  "system_desc": "程序描述",
                  "path_hidden": "目录排除",
                  "path_hidden_desc": "默认不显示的目录和文件,逗号隔开",
                  "new_user_folder": "新用户默认创建目录",
                  "new_user_folder_desc": "用逗号隔开",
                  "new_user_app": "新用户默认创建app",
                  "new_user_app_desc": "应用中心的应用，多个用逗号隔开",
                  "auto_login": "游客自动登录",
                  "auto_login_desc": "默认登录用户名为<code>guest</code>的用户；开启后确保<code>guest</code>用户存在",
                  "first_in": "登录后默认进入",
                  "menu_name": "菜单名",
                  "menu_hidden": "隐藏",
                  "menu_show": "显示",
                  "menu_move_down": "下移",
                  "menu_move_up": "上移",
                  "menu_move_del": "删除",
                  "menu_open_window": "新窗口打开",
                  "url_path": "url地址",
                  "url_path_desc": "url地址或js代码",
                  "no_permission_read": "该文件没有读取权限",
                  "no_permission_download": "管理员限制了下载和预览！",
                  "php_env_check": "运行环境监测:",
                  "php_env_error": "环境错误:",
                  "php_env_error_ignore": "忽略",
                  "php_env_error_version": "PHP版本不能低于5.0",
                  "php_env_error_iconv": "未开启 iconv",
                  "php_env_error_mb_string": "未开启 mb_string",
                  "php_env_error_file": "未开启 file_get_contents",
                  "php_env_error_path": "不可写",
                  "php_env_error_gd": "须开启php GD库, 否则验证码、缩略图使用将不正常",
                  "install_login": "您可以用如下账号登录",
                  "install_enter": "进入系统",
                  "install_user_default": "管理员：admin/admin(请务必修改密码)<br/>普通用户：demo/demo<br/>游客用户：guest/guest",
                  "copyright_desc": "这是一款备受好评的web文档管理系统，你可以用它来做内部文档管理或共享、也可以用来管理服务器上的网站，取代Ftp\r\n\t\t，甚至可以当作webIDE直接在线开发。同时你也可以将此程序二次开发整合到你现有的系统。",
                  "copyright_contact": "授权或定制请联系QQ:<a href=\"http://wpa.qq.com/msgrd?v=3&uin=772020653&site=qq&menu=yes\" target=\"_blank\">772020653</a><a href=\"javascript:core.openIE('http://www.431103.com/qa.html');\">问题反馈</a>",
                  "copyright_info": "Copyright © <a href=\"http://www.431103.com/\" target=\"_blank\">431103.com</a> All rights reserved.",
                  "copyright_pre": "Powered by YQB",
                  "kod_name": "资源管理器",
                  "kod_name_desc": "资源管理器",
                  "kod_power_by": " - Powered by YQB",
                  "kod_name_copyright": "tool",
                  "login": "登录",
                  "guest_login": "游客登录",
                  "username": "用户名",
                  "password": "密码",
                  "login_code": "验证码",
                  "login_rember_password": "记住密码",
                  "us": "千帆网络工作室",
                  "login_not_null": "用户名密码不能为空!",
                  "code_error": "验证码错误",
                  "user_not_exists": "用户名不存在!",
                  "password_error": "密码错误!",
                  "password_not_null": "密码不能为空!",
                  "old_password_error": "原密码错误!",
                  "permission": "权限!",
                  "permission_edit": "修改权限",
                  "no_permission": "管理员禁止了此权限!",
                  "no_permission_ext": "管理员禁止了该类型文件权限",
                  "dialog_min": "最小化",
                  "dialog_min_all": "最小化所有",
                  "dialog_display_all": "显示所有窗口",
                  "dialog_close_all": "关闭所有窗口",
                  "open": "打开",
                  "others": "其他",
                  "open_with": "打开方式",
                  "close": "关闭",
                  "close_all": "关闭全部",
                  "close_right": "关闭右侧标签",
                  "close_others": "关闭其他",
                  "loading": "操作中...",
                  "warning": "警告",
                  "getting": "获取中...",
                  "sending": "数据发送中...",
                  "data_error": "数据出错！",
                  "get_success": "获取成功!",
                  "save_success": "保存成功!",
                  "success": "操作成功",
                  "error": "操作失败",
                  "error_repeat": "'操作失败，请注意名称不能重复！'",
                  "system_error": "系统错误",
                  "name": "名称",
                  "type": "类型",
                  "contain": "包含",
                  "address": "位置",
                  "size": "大小",
                  "byte": "字节",
                  "path": "路径",
                  "action": "操作",
                  "create_time": "创建时间",
                  "modify_time": "修改时间",
                  "last_time": "最后访问",
                  "sort_type": "排序方式",
                  "time_type": "Y/m/d H:i:s",
                  "time_type_info": "Y年m月d日 H:i:s",
                  "public_path": "公共目录",
                  "file": "文件",
                  "folder": "文件夹",
                  "copy": "复制",
                  "past": "粘贴",
                  "clone": "创建副本",
                  "cute": "剪切",
                  "remove": "删除",
                  "info": "属性",
                  "list_type": "查看",
                  "list_icon": "图标排列",
                  "list_list": "列表排列",
                  "sort_up": "递增",
                  "sort_down": "递减",
                  "order_type": "排序方式",
                  "order_desc": "降序",
                  "order_asc": "升序",
                  "rename": "重命名",
                  "add_to_fav": "添加到收藏夹",
                  "search_in_path": "文件夹中搜索",
                  "add_to_play": "添加到播放列表",
                  "manage_fav": "管理收藏夹",
                  "refresh_tree": "刷新树目录",
                  "manage_folder": "管理目录",
                  "close_menu": "关闭菜单",
                  "zip": "zip压缩",
                  "unzip": "zip解压到当前",
                  "clipboard": "查看剪贴板",
                  "full_screen": "全屏/退出全屏",
                  "tips": "提示",
                  "ziping": "正在压缩...",
                  "unziping": "正在解压...",
                  "moving": "移动操作中...",
                  "remove_title": "删除确认",
                  "remove_info": "确认删除选中内容吗？",
                  "name_isexists": "出错了,该名称已存在！",
                  "install": "安装",
                  "width": "宽",
                  "height": "高",
                  "app": "应用",
                  "app_store": "应用商店",
                  "app_create": "创建应用",
                  "app_edit": "修改应用",
                  "app_group_all": "全部",
                  "app_group_game": "游戏",
                  "app_group_tools": "工具",
                  "app_group_reader": "阅读",
                  "app_group_movie": "影视",
                  "app_group_music": "音乐",
                  "app_group_life": "生活",
                  "app_group_others": "其他",
                  "app_desc": "描述",
                  "app_icon": "应用图标",
                  "app_icon_show": "url地址或该目录",
                  "app_group": "应用分组",
                  "app_type": "类型",
                  "app_type_url": "链接",
                  "app_type_code": "js扩展",
                  "app_display": "外观",
                  "app_display_border": "无边框(选中即无边框)",
                  "app_display_size": "调整大小(选中即可调整)",
                  "app_size": "尺寸",
                  "app_url": "链接地址",
                  "app_code": "js 代码",
                  "edit": "编辑",
                  "edit_can_not": "不是文本文件",
                  "edit_too_big": "文件太大,不能大于20M",
                  "open_default": "默认方式打开",
                  "open_ie": "浏览器打开",
                  "refresh": "刷新",
                  "refresh_all": "强制刷新",
                  "newfile": "新建文件",
                  "newfolder": "新建文件夹",
                  "newothers": "新建其他",
                  "path_loading": "载入中...",
                  "go": "走着!",
                  "go_up": "上层",
                  "history_next": "前进",
                  "history_back": "后退",
                  "address_in_edit": "点击进入编辑状态",
                  "double_click_rename": "双击名称重命名",
                  "double_click_open": "双击打开",
                  "path_null": "该文件夹为空，可以拖拽文件到该窗口上传。",
                  "upload": "上传",
                  "upload_ready": "等待上传...",
                  "upload_success": "上传成功",
                  "upload_path_current": "切换到当前目录",
                  "upload_select": "选择文件",
                  "upload_max_size": "最大允许",
                  "upload_size_info": "如果想配置更大，请修改php.ini中允许上传的最大值。选择文件时,大于该配置的将自动过滤掉。",
                  "upload_error": "上传失败",
                  "upload_muti": "多文件上传",
                  "upload_drag": "拖拽上传",
                  "upload_drag_tips": "松开即可上传!",
                  "path_not_allow": "文件名不允许出现",
                  "download": "下载",
                  "download_address": "下载地址",
                  "download_ready": "即将下载",
                  "download_success": "下载成功！",
                  "download_error": "下载失败！",
                  "download_error_create": "写入出错!",
                  "download_error_exists": "远程文件不存在!",
                  "upload_error_null": "没有文件！",
                  "upload_error_big": "文件大小超过服务器限制",
                  "upload_error_move": "移动文件失败！",
                  "upload_error_exists": "该文件已存在",
                  "upload_local": "本地上传",
                  "download_from_server": "远程下载",
                  "save_path": "保存路径",
                  "upload_select_muti": "可选择多个文件上传",
                  "search": "搜索",
                  "searching": "搜索中...",
                  "search_null": "没有搜索结果!",
                  "search_uplow": "区分大小写",
                  "search_content": "搜索文件内容",
                  "search_info": "请输入搜索词和路径进行搜索！",
                  "search_ext_tips": "用|隔开;例如 php|js|css<br/>不填则搜索默认文本文件",
                  "file_type": "文件类型",
                  "goto": "跳转到",
                  "server_dwonload_desc": "个任务加入到下载列表",
                  "parent_permission": "父目录权限",
                  "root_path": "我的文件",
                  "lib": "库",
                  "fav": "收藏夹",
                  "desktop": "桌面",
                  "browser": "浏览器",
                  "my_computer": "我的电脑",
                  "recycle": "回收站",
                  "my_document": "我的文档",
                  "my_picture": "我的照片",
                  "my_music": "我的音乐",
                  "my_movie": "我的视频",
                  "my_download": "我的下载",
                  "ui_desktop": "桌面",
                  "ui_explorer": "文件管理",
                  "ui_editor": "编辑器",
                  "adminer": "adminer",
                  "ui_project_home": "项目主页",
                  "ui_login": "登录",
                  "ui_logout": "退出",
                  "setting": "系统设置",
                  "setting_title": "选项",
                  "setting_user": "个人中心",
                  "setting_password": "修改密码",
                  "setting_password_old": "原密码",
                  "setting_password_new": "修改为",
                  "setting_language": "语言设置",
                  "setting_member": "用户管理",
                  "setting_group": "用户组管理",
                  "setting_group_add": "添加用户组",
                  "setting_group_edit": "编辑用户组",
                  "setting_theme": "主题切换",
                  "setting_wall": "更换壁纸",
                  "setting_wall_diy": "自定义壁纸：",
                  "setting_wall_info": "图片url地址，本地图片可以右键图片浏览器打开即可得到",
                  "setting_fav": "收藏夹管理",
                  "setting_player": "播放器",
                  "setting_player_music": "音乐播放器设置",
                  "setting_player_movie": "视频播放器设置",
                  "setting_help": "使用帮助",
                  "setting_about": "关于作品",
                  "setting_success": "修改已生效！",
                  "can_not_repeat": "不允许重复",
                  "absolute_path": "绝对地址",
                  "group": "用户组",
                  "data_not_full": "数据提交不完整！",
                  "default_user_can_not_do": "默认用户不能操作",
                  "default_group_can_not_do": "默认用户组不能操作",
                  "username_can_not_null": "用户名不能为空！",
                  "groupname_can_not_null": "用户组名不能为空！",
                  "groupdesc_can_not_null": "用户组描述不能为空！",
                  "group_move_user_error": "所属用户组用户移动失败",
                  "group_already_remove": "该用户组已被删除",
                  "group_not_exists": "该用户组不存在",
                  "member_add": "添加用户",
                  "password_null_not_update": "密码不填表示不更改",
                  "if_save_file": "文件尚未保存,是否保存？",
                  "if_remove": "确认删除",
                  "member_remove_tips": "删除后该用户目录会被清空",
                  "group_remove_tips": "删除后该用户组用户无法登录<br/>(需要重新设置用户组)",
                  "group_name": "用户组名",
                  "group_name_tips": "建议英文名，不能重复",
                  "group_desc": "展示名称",
                  "group_desc_tips": "组名描述",
                  "group_role_ext": "扩展名限制",
                  "group_role_ext_tips": "多个用|分隔开",
                  "group_role_file": "文件管理",
                  "group_role_upload": "允许上传",
                  "group_role_user": "用户数据",
                  "group_role_group": "用户组管理",
                  "group_role_member": "用户管理",
                  "group_role_mkfile": "新建文件",
                  "group_role_mkdir": "新建文件夹",
                  "group_role_pathrname": "重命名",
                  "group_role_pathdelete": "文件(夹)删除",
                  "group_role_pathinfo": "文件(夹)属性",
                  "group_role_pathmove": "移动(复制/剪切/粘贴/拖拽操作)",
                  "group_role_zip": "zip压缩",
                  "group_role_unzip": "zip解压",
                  "group_role_search": "搜索",
                  "group_role_filesave": "编辑保存文件",
                  "group_role_can_upload": "上传下载",
                  "group_role_download": "远程下载",
                  "group_role_passowrd": "修改密码",
                  "group_role_config": "配置数据",
                  "group_role_fav": "收藏夹操作(添加/编辑/删除)",
                  "group_role_list": "列表查看",
                  "group_role_member_add": "添加用户",
                  "group_role_member_edit": "编辑用户",
                  "group_role_member_del": "删除用户",
                  "group_role_group_add": "添加用户组",
                  "group_role_group_edit": "编辑用户组",
                  "group_role_group_del": "删除用户组",
                  "group_role_ext_warning": "不允许此类文件的上传,<br/>重命名(重命名为指定扩展名),<br/>编辑保存,远程下载,解压",
                  "group_tips": "<li>1.用户组名不能重复，修改组名后原属于改组用户会自动关联</li><li>2.扩展名限制关系系统安全性，请务必谨慎操作<i>(果在web目录下新建php;就意味着改程序的权限对此用户形同虚设)</i></li><li>3.户管理、权限组管理；查看权限和增删改权限是绑定的；程序会自动关联</li><li>4.设定权限组能添加权限组后，后续权限是不继承的<i>（此权限相当于最高权限）</i></li>",
                  "not_null": "必填项不能为空!",
                  "picture_can_not_null": "图片地址不能为空!",
                  "rname_success": "重命名成功！",
                  "please_inpute_search_words": "请输入要搜索的字符串",
                  "remove_success": "删除成功！",
                  "remove_fali": "删除失败!",
                  "clipboard_null": "剪贴板为空！",
                  "create_success": "新建成功！",
                  "create_error": "新建失败,请检查目录权限！",
                  "copy_success": "【复制】—— 覆盖剪贴板成功!",
                  "cute_success": "【剪切】—— 覆盖剪贴板成功!",
                  "clipboard_state": "剪切板状态:",
                  "no_permission_write_all": "该文件或目录没有写权限",
                  "no_permission_write": "该目录没有写权限",
                  "no_permission_write_file": "该文件没有写权限",
                  "copy_not_exists": "来源不存在",
                  "current_has_parent": "目标文件夹是源文件夹的子文件夹!",
                  "past_success": "<b>粘贴操作完成</b>",
                  "cute_past_success": "<b>剪切操作完成</b>(源文件被删除,剪贴板清空)",
                  "zip_success": "压缩完成",
                  "not_zip": "不是压缩文件",
                  "zip_null": "没有选择的文件或目录",
                  "unzip_success": "解压完成",
                  "gotoline": "跳转到行",
                  "path_is_current": "所打开路径和当前路径一样！",
                  "path_exists": "该名称已存在！",
                  "undo": "撤销",
                  "redo": "反撤销",
                  "preview": "预览",
                  "wordwrap": "自动换行(不自动换行)",
                  "char_all_display": "显示不可见字符(隐藏)",
                  "auto_complete": "自动提示(取消)",
                  "function_list": "函数列表",
                  "code_theme": "代码风格",
                  "font_size": "字体",
                  "button_ok": "确定",
                  "button_submit": "提交",
                  "button_set": "设置",
                  "button_cancel": "取消",
                  "button_edit": "编辑",
                  "button_save": "保存",
                  "button_save_all": "保存全部",
                  "button_not_save": "不保存",
                  "button_add": "添加",
                  "button_back_add": "返回添加",
                  "button_del": "删除",
                  "button_save_edit": "保存修改",
                  "button_save_submit": "保存提交",
                  "button_select_all": "全选/反选",
                  "web_server_start": "启动服务",
                  "web_server_build": "打包构建"
            };;
            LNG = (0, _stringify2.default)(LNG);

            var AUTH = [];
            AUTH = (0, _stringify2.default)(AUTH);

            var data = 'LNG=' + LNG + ';AUTH=' + AUTH + ';G=' + G;

            this.json(data);
      };

      _class.prototype.getFileContent = function getFileContent(file) {
            var buffer = _fs2.default.readFileSync(file);

            return buffer;
      };

      return _class;
}(_base2.default);

exports.default = _class;
//# sourceMappingURL=editor.js.map