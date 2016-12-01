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
  /*router.get('/', function* () {
    this.body = '这个是根目录';
  });*/
  app.use(router.routes());
  logger.debug('Finish loading routes.');
};