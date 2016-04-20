'use strict';

import Base from './base.js';

export default class extends Base {
	/**
	 * index action
	 * @return {Promise} []
	 */
	indexAction() {
		this.display();
	}

	setAction() {
		let data = {
			"code": true,
			"use_time": 0.015625,
			"data": "\u4fee\u6539\u5df2\u751f\u6548\uff01"
		};
		
		this.json(data);
	}

	systemAction() {

		this.display();
	}

	userAction() {
		this.display();
	}

	memberAction() {
		this.display();

	}

	themeAction() {
		this.display();
	}

	wallAction() {
		this.display();
	}

	favAction() {
		this.display();
	}

	playerAction() {
		this.display();
	}

	helpAction() {
		this.display();
	}

	aboutAction() {
		this.display();
	}
}