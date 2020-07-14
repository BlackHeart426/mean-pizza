const express = require('express')
const controller = require('../controllers/auth')
const router = express.Router()

router.post('/admin/login', controller.loginAdmin)

router.post('/login', controller.login)

router.post('/register', controller.register)

router.post('/admin/register', controller.registerAdmin)


module.exports = router
