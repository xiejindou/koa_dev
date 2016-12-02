"use strict";

const logger = require('../utils/logger');
const router = require('koa-router')();
const path = require('path');
const fs = require('fs');
const join = path.resolve;
const readdir = fs.readdirSync;

module.exports = function (app, root) {
  readdir(root).forEach(function (file) {
    let dir = join(root, file);
    let stats = fs.lstatSync(dir);
    if (stats.isFile()) {
      let conf = require(dir);
      if (typeof conf.routes === 'function') {
        router.use('/' + file.slice(0, -3), conf.routes());
        logger.debug('load routes: ' + file);
      }
    }
  });
  /*抓住网页的异常*/
  app.use(function* (next) {
    try {
      yield next;
    } catch (err) {
      this.status = err.status || 500;
      this.body = err.message;
      //this.body = "页面存在异常，请联系管理员！";
      this.app.emit('error', err, this);
    }
  });
  router.get('/', function* () {
    this.body = '这个是网站根目录';
  });
  app.use(router.routes());
  /*访问路径不存在的时候跳转到404*/
  app.use(function* (next) {
    if (404 != this.status) return;
    this.redirect('/404');
  });
  /*把异常抛给以一个中间件处理*/
  app.use(function* (next) {
    this.throw('Error Message', 500);
  });
  logger.debug('Finish loading routes.');
};