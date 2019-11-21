/**
* 公有路由，不需要校验鉴权
*/
const Router = require('koa-router')
const controllers = require('../services/login')

const router = new Router();
router.prefix('/api')

router.post('/user/login', controllers.login.login)

module.exports = router
