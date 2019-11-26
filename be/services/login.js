const jwt = require('jsonwebtoken')
const config = require('../config')
const mysql = require('mysql')
const SQL = require('./SQL')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '107157',
  database: 'course'
});

connection.connect();

const login = {}

login.login = async (ctx, next) => {
  const {
    userName,
    passWord
  } = ctx.request.body
  
  return new Promise((resolve, reject) => {
    connection.query(SQL.login(userName, passWord), function (err, result) {
      console.log(SQL.login(userName, passWord))
      if (err) {
        reject(new Error('[ERROR] - ' + `用户名或者密码错误`));
        return;
      }
      resolve(result)
    })
  }).then(res => {
    ctx.result = {
      token: jwt.sign({
        userName,
        passWord
      }, config.secret)
    }
    return next()
  }).catch(err => {
    throw err;
  })
}

module.exports = {
  login
}