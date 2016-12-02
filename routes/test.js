"use strict"
var router = require('koa-router')();
const logger = require('../utils/logger');
const config = require('../config');
const pool = require('mysql').createPool(config.mysql);;


router.get('/', function* () {
	console.log("first:" + this.session.views);
	var n = this.session.views || 0;
	this.session.views = ++n;
	console.log("second:" + this.session.views);
	this.body = "访问了" + this.session.views + "次";
});


router.get('/other/:id', function* () {
	this.body = 'id: ' + this.params.id;
});

router.get('/hello', function* (req, res) {
	let begin = new Date().getTime();
	let p1 = new Promise(resolve => {
		setTimeout(function () {
			resolve();
		}, 600);
	});
	yield p1.then(() => {
		this.body = "计算耗时" + ((new Date().getTime()) - begin) / 1e3 + "秒";
	});
});

router.get('/sql', function* () {

	let m1 = new Promise(resolve => {
		pool.getConnection(function (err, connection) {
			if (err) throw err;
			let sql = "SELECT * FROM student where name = ? or name = ?";
			let params = ['jim', 'bob'];
			//let sql = "UPDATE `student` SET `name`='jim' WHERE `name`='jhon'";
			//let sql = "INSERT INTO `student` (`name`, `age`) VALUES ('abc', '23')";
			//let sql = "DELETE FROM `student` WHERE (`name`='abc') AND (`age`='23')";
			connection.query(sql, params, (err, rows, fields) => {
				if (err) throw err;
				resolve(rows);
				//done with a connection and the connection will return to the pool
				connection.release();
			});
		});
	});
	yield m1.then(res => {
		this.body = "查询的结果是" + JSON.stringify(res);
	});

});


module.exports = router;


//supervisor -e js,css,pug --harmony bin/www.js