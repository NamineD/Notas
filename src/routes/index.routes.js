const express = require('express')
const router = express.Router()
const indexCtrl = require('../controllers/index.controller')

router.get('/', indexCtrl.index)

router.get('/about', indexCtrl.about)


module.exports = router