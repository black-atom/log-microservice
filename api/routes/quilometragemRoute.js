import { getAll, getQuilometragemByID, saveQuilometragem, updateQuilometragem } from '../../controllers/quilometragemController'
import * as express from 'express'

const route = express.Router()

route.get('/quilometragens', getAll)
route.get('/quilometragens/:id', getQuilometragemByID)
route.post('/quilometragens', saveQuilometragem)
route.put('/quilometragens/:id', updateQuilometragem)

export default route