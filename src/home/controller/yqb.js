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
        return this.display();
    }

    helpAction() {
        return this.display();
    }

    writeconfigAction() {
        const base_css = this.post('base_css');
        const css = this.post('css');
        const base_js = this.post('base_js');
        const js = this.post('js');

        let c = base_css.concat(css);
        let j = base_js.concat(js);

        let tpl = this.stbuiTemplate({
            domain: 'http://emres.dfcfw.com/stock/201610121223',
            appName: '',
            version: '201610121223',
            framework: this.coverFormat(j)
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
            .replace(/{{framework}}/g, options.framework)
        ;

        return result;
    }

    coverFormat(arr) {
        if (think.isEmpty(arr)) {
            return 'framework/**/*.js';
        }

        let data = arr.map(value=> {
            return 'framework/' + value + '/*.js';
        });

        return "{" + data.join(',') + "}";
    }
}