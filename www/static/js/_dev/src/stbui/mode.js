define(function (require, exports, module) {
    var terminal = require('../../../../xterm/xterm');

    var shellPrompt = '[stbui]$ ';
    var term;
    var sendData = '';
    var texts = [];

    // 发送数据给后端
    var socket = io.connect(location.origin);
    socket.on('launcher', function (output) {
        var lines = output.replace(/(^[\x0d\x0a]+|[\x0d\x0a]+$)/g, '').split('\n');
        texts.push.apply(texts, lines);

        // build 过程可能处理很多文件，每个文件都会有一条提示
        // 在 cli 下，后面的提示会覆盖前面的提示
        // 但是 child_process 运行下，相关 console 信息缺失
        // 所以这里专门针对 build 的提示信息特征，做了一个 hack
        // 以防止输出的提示信息过长，不方便看，也拖慢网页速度
        var processReg = /^\s+\(\d+ms\)\s+[⋅.]{3,}\s+(\[\d+\/\d+\]:[^\(\)]+\(\d+ms\))?/i;
        var len = texts.length - 1;
        while (len--) {
            var current = texts[len];
            var next = texts[len + 1];
            if (processReg.test(next) && (/^\s*$/.test(current) || processReg.test(current))) {
                texts.splice(len, 1);
            }
        }

        term.write('\r\n' + texts.join('\n'));
        term.prompt();
        console.log(output)
    });

    function createTerminal() {
        var contanier = document.getElementById('contanier');
        term = new terminal({cursorBlink: true});
        term.open(contanier);
        term.prompt = function () {
            term.write('\r\n' + shellPrompt);
        };
        term.writeln('请输入您要操作的命令');
        term.prompt();
    }

    function runFakeTerminal() {
        term.on('key', function (key, ev) {
            var printable = (
                !ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.metaKey
            );

            if (ev.keyCode == 13) {
                term.prompt();
                socket.emit('launcher', {cmd: sendData});
                sendData = '';
            } else if (ev.keyCode == 8) {
                if (term.x > 2) {
                    term.write('\b \b');
                }
            } else if (printable) {
                term.write(key);

            }
        });

        term.on('paste', function (data, ev) {
            term.write(data);
        });

        term.on('data', function (data) {
            sendData += data;
        });
    }

    // createTerminal();
    // runFakeTerminal();

    return {
        init: createTerminal,
        run: runFakeTerminal
    }
});