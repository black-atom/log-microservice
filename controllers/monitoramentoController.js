import Monitoramento from '../api/models/monitoramentoModel'
import Promise from 'bluebird'
import { prop } from 'ramda'

const getAll = async(req, res, next) => {

    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);

    const query = { ...req.query };
    delete query.skip;
    delete query.limit;

      try {
        const monitoramentos = await Monitoramento.find(req.query).skip(skip).limit(limit);
        const count = await Monitoramento.find(req.query).count();
        res.json({ monitoramentos, count });
    } catch (err) {
        next(err)
    }
}

const getMonitoramentoByID = async(req, res, next) => {
    try {
        const _id = prop('id', req.params)
        const monitoramento = await Monitoramento.findById(_id)
        res.json(monitoramento)
    } catch (err) {
        next(err)
    }
}

const saveMonitoramento = async(req, res, next) => {
    try {
        const monitoramento = prop('body', req)
        const monitoramentoModel = new Monitoramento(monitoramento)
        const newMonitoramento = await monitoramentoModel.save()
        res.json(newMonitoramento)
    } catch (err) {
        next(err)
    }
}

const updateMonitoramento = async(req, res, next) => {
    try {
        const monitoramento = prop('body', req)
        const _id = prop('id', req.params)
        const monitoramentoUpdate = await Monitoramento
            .findByIdAndUpdate(_id, monitoramento, {
                runValidators: true
            })
        res.json(monitoramentoUpdate)
    } catch (err) {
        next(err)
    }
}

export {
    getAll,
    getMonitoramentoByID,
    saveMonitoramento,
    updateMonitoramento
}