"use strict";

exports.__esModule = true;
exports.default = {
  on: true, //是否开启 WebSocket
  type: "socket.io",
  allow_origin: "",
  sub_protocal: "",
  adapter: undefined,
  path: "", //url path for websocket
  messages: {
    open: 'home/explorer/open',
    close: 'home/explorer/close',
    launcher: 'home/explorer/launcher',
    chat: 'home/explorer/chat',
    typing: 'home/explorer/typing',
    stoptyping: 'home/explorer/stoptyping',
    adduser: 'home/explorer/adduser'
  }
};
//# sourceMappingURL=websocket.js.map