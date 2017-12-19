const quilometragemController = require('../controllers/quilometragemController')
const route = require('express').Router()

route.get('/quilometragens', quilometragemController.getAll)
route.get('/quilometragens/:id', quilometragemController.getQuilometragemByID)
route.post('/quilometragens', quilometragemController.SaveQuilometragem)
route.put('/quilometragens/:id', quilometragemController.updateQuilometragem)

module.exports = route