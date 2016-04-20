'use strict';

import Base from './base.js';
import fs from 'fs';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){

  	return this.display();
  }

  configAction() {
  	return this.display();
  }

  helpAction() {
  	return this.display();
  }

  writeconfigAction() {
    const fis = this.post('content');
    const path = this.post('path');

    if (!think.isFile(path)) {
      fs.writeFileSync(path+'/fis-conf.js', fis);
    }


    this.success(fis);
  }
}