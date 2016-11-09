define(function (require, exports, module) {
    var socket = io.connect(location.origin);

    var sendData = function (cmd) {
        socket.emit('launcher', {cmd: cmd});
    }

    var acceptData = function () {
        var texts = [];
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

            console.log(texts);
            $(".info").html("" + texts.join("\n"))
        });
    }

    var customConfig = function () {
        window.location.href = '/yqb/config.html';
    }

    var startServer = function () {
        var cmd = 'stbui server start';
        sendData(cmd);
        acceptData();
    }

    var stopServer = function () {
        var cmd = 'stbui server stop';
        sendData(cmd);
    }

    var compileDebugCode = function () {
        var cmd = 'stbui release dev';
        sendData(cmd);
        acceptData();
    }

    var compileReleasCode = function () {
        var cmd = 'stbu release dist';
        sendData(cmd);
        acceptData();
    }

    var checkEnv = function () {
        var cmd = '';

    }


    var $main = $('.main');

    $main.find('button').on('click', function (e) {
        var $this = $(this);
        var index = $this.index();

        switch (index) {
            case 0:
                startServer();
                break;
            case 1:
                compileDebugCode();
                break;
            case 2:
                compileReleasCode();
                break;
            case 3:
                stopServer();
                break;
            case 4:
                checkEnv();
                break;
            case 5:

                break;
        }

    });

});