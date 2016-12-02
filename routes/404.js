"use strict"
var router = require('koa-router')();

router.get('/', function* () {
	this.body = "404 -- 页面不存在";
});

module.exports = router;