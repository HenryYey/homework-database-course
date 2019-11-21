/**
 * 私有路由，需要校验鉴权
 */

const Router = require('koa-router')
const controllers = require('../services/index')
const jwtMiddleware = require('../middlewares/jwt')

const router = new Router()
router.prefix('/api')
router.use(jwtMiddleware)

router.get('/time/getEvents', controllers.timer.getEvents)
router.get('/tables/getTables', controllers.tables.getTables)
router.get('/tables/getTable', controllers.tables.getTable)
router.post('/time/addEvents', controllers.timer.addEvents)
router.post('/tables/updateRow', controllers.tables.updateRow)
router.post('/tables/deleteRow', controllers.tables.deleteRow)

module.exports = router