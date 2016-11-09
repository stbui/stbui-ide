'use strict';

import Base from './base.js';
import fs from 'fs';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    indexAction() {
        return this.display();
    }

    configAction() {
        this.assign({
            path: process.cwd(),
            name: process.cwd().split('\\').pop()
        });

        return this.display();
    }

    operateAction() {
        this.assign({
            path: process.cwd(),
            name: process.cwd().split('\\').pop()
        });

        return this.display();
    }

    modeAction() {
        return this.display();
    }

    writeconfigAction() {
        let domain = this.post('domain');
        let base_css = this.post('base_css');
        let css = this.post('css');
        let base_js = this.post('base_js');
        let js = this.post('js');
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

        let c = base_css.concat(css);
        let j = base_js.concat(js);

        let tpl = this.stbuiTemplate({
            domain: domain,
            appName: '',
            version: this.formatDate(),
            js: this.coverFormat(j, 'js'),
            css: this.coverFormat(c, 'css')
        });

        // 写入到执行命令行的目录下
        let cwd = process.cwd() + '/stbui.conf.js';
        fs.writeFileSync(cwd, tpl, 'utf-8');

        this.json(tpl);
    }

    stbuiTemplate(options) {
        let path = think.RESOURCE_PATH + '/static/config.js';

        let result = fs.readFileSync(path, 'utf-8');
        result = result
            .replace(/{{domain}}/g, options.domain)
            .replace(/{{version}}/g, options.version)
            .replace(/{{appName}}/g, options.appName)
            .replace(/{{js}}/g, options.js)
            .replace(/{{css}}/g, options.css)
        ;

        return result;
    }

    coverFormat(arr, ext) {

        if (think.isEmpty(arr) || !think.isArray(arr)) {
            return 'framework/**/*.' + ext;
        }

        let data = arr.map(value=> {
            return 'framework/' + value + '/*.' + ext;
        });

        return "{" + data.join(',') + "}";
    }

    formatDate() {
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
    }

}