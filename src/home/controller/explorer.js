'use strict';

import Base from './base.js';
import fs from 'fs';
import child_process from 'child_process';

export default class extends Base {

  indexAction() {
    return this.display();
  }

  openAction(self) {
    const socket = self.http.socket;
    this.broadcast("new message", "connected");
  }

  launcherAction(self) {
    const socket = self.http.socket;
    const spawn = child_process.spawn;

    const data = self.http.data;
    let cmd = data.cmd.split(' ');

    const yqb = spawn(cmd[0], cmd.slice(1) || [], {
      env: process.env,
      cwd: data.path
    });

    yqb.stdout.setEncoding('UTF-8');
    yqb.stdout.on('data', (data) => {
      this.emit('launcher', data);
    });

    yqb.stderr.setEncoding('UTF-8');
    yqb.stderr.on('data', (data) => {
      this.emit('launcher', data);
    });

    yqb.on('close', () => {
      this.emit('launcher', '');
      this.emit('launcher', 'bright: complete');
    });
  }

  closeAction(self) {
    this.broadcast("new message", "disconnected");
  }

  // 新建文件
  mkfileAction() {
    let path = this.get('path');
    path = decodeURIComponent(path);

    if (!think.isFile(path)) {
      fs.writeFileSync(path, '');
    }

    this.success();
  }

  // 新建目录
  mkdirAction() {
    let path = this.get('path');
    path = decodeURIComponent(path);

    if (!think.isDir(path)) {
      think.mkdir(path);
    }

    this.success();
  }

  pathrnameAction() {
    let path = this.post('path');
    let rname = this.post('rname_to');

    // 修改目录
    // think.chmod(file);

    this.success();
  }


  /*
   * 删除目录或文件
   */
  pathdeleteAction() {
    let delFile = this.post('list');
    delFile = JSON.parse(delFile);

    let file = delFile[0].path;
    file = decodeURIComponent(file);

    if (delFile[0].type == 'folder') {
      think.rmdir(file).then(() => {
        this.success({}, 'success');
      });

      // fs.rmdirSync(file);
    } else if (delFile[0].type == 'file') {

      fs.unlinkSync(file);
    }

    this.success();
  }

  filedownloadAction() {
    let file = this.get('path');
    file = decodeURIComponent(file);

    let name = file.split('/').pop();

    this.download(file, name);

    this.success({
      name: name,
      path: file
    });
  }

  historybackAction() {
    this.success();
  }

  pathinfoAction() {
    this.success();
  }

  pathcopyAction() {
    this.success();
  }

  zipDdownloadAction() {
    this.success();
  }
  zipAction() {
    this.success();
  }
  searchAction() {
    this.success();
  }

  treelistAction() {

    let children = [];
    let name = ['app', 'src', 'view', 'www'];
    name.forEach((k, v) => {
      let data = {};

      data.name = k;
      data.type = "folder";
      data.atime = 1458487212;
      data.ctime = 1458487212;
      data.mtime = 1458487212;
      data.path = think.ROOT_PATH + "/";
      data.mode = 'drwx rwx rwx (0777) ';
      data.is_readable = 1;
      data.is_writeable = 1;

      children.push(data);
    });


    let data = {
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
        "this_path": think.ROOT_PATH,
        "isParent": true
      }]
    };

    // , {
    // "name": "公共目录",
    // "children": [],
    // "menuType": "menuTreeRoot",
    // "iconSkin": "lib",
    // "open": true,
    // "this_path": "*public*",
    // "this_path": think.ROOT_PATH,
    // "isParent": false
    // }

    this.json(data);
  }

  pathlistAction() {
    let path = this.get('path');
    path = decodeURIComponent(decodeURIComponent(decodeURIComponent(path)));

    let files = this.getAllFiles(path);

    let folderlist = [],
      fielList = [];

    files.forEach(function(k, v) {

      let data = {};

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
        data.size = '',
          fielList.push(data);
      }

    });

    let data = {
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
  }

  getAllFiles(dir) {

    let files = fs.readdirSync(dir).map(function(file) {

      let stat = fs.statSync(dir + file);
      let type = null;

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
      }
    }).filter(function(file) {
      let start = file.name.indexOf('.');
      let end = file.length;
      let ext = '';

      if (start > 0) {
        ext = file.name.substring(start + 1, end);
      }

      file.ext = ext;
      return true;
    });

    return files;
  }

  getFileContent(file) {
    let buffer = fs.readFileSync(file);

    return buffer;
  }
}