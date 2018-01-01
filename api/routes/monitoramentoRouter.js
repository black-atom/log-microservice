import { getAll, getMonitoramentoByID, saveMonitoramento, updateMonitoramento } from '../../controllers/monitoramentoController'
import * as express from 'express'

const route = express.Router()

route.get('/monitoramentos', getAll)
route.get('/monitoramentos/:id', getMonitoramentoByID)
route.post('/monitoramentos', saveMonitoramento)
route.put('/monitoramentos/:id', updateMonitoramento)

export default route