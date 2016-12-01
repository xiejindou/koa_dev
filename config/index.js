/**
 *  项目配置文件
 */
"use strict";
module.exports = {
    "port": 80,
    "timeout": 10000,
    "mysql": {
        "connectionLimit": 100,
        "host": 'your ip',
        "user": 'your account',
        "password": 'your password',
        "database": 'your database name'
    },
    "redis": {
        "host": "127.0.0.1",
        "port": 6379,
        "db": "8"
    },
    "redisSession": {
        "host": "127.0.0.1",
        "port": 6379,
        "db": "8"
    },
    "mongodb": {
        "db_name": "you database name",
        "host": "127.0.0.1",
        "port": 27017
    },
    "log": {
        "level": "debug"
    },
    "sessionKey": "tongj_app:sess",
    "cookieKey": "tongj_app:sess",
    "metaName": "tongj_app_script_key"
};

