const express = require('express')
const routes = require('../routes')
const router = express.Router()

router.post('/register', routes.createUser)
router.post('/authenticate', routes.authenticate)



module.exports = router



