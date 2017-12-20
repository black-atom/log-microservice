import Quilometragem from '../api/models/quilometragem'
import Promise from 'bluebird'
import { prop } from 'ramda'

const getAll = async(req, res, next) => {
    try {
        const quilometragens = await Quilometragem.find(req.query)
        res.json(quilometragens)
    } catch (err) {
        next(err)
    }
}

const getQuilometragemByID = async(req, res, next) => {
    try {
        const _id = prop('id', req.params)
        const quilometragem = await Quilometragem.findById(_id)
        res.json(quilometragem)
    } catch (err) {
        next(err)
    }
}

const saveQuilometragem = async(req, res, next) => {
    try {
        const quilometragem = prop('body', req)
        const quilometragemModel = new Quilometragem(quilometragem)
        const newQuilometragem = await quilometragemModel.save()
        res.json(newQuilometragem)
    } catch (err) {
        next(err)
    }
}

const updateQuilometragem = async(req, res, next) => {
    try {
        const quilometragem = prop('body', req)
        const _id = prop('id', req.params)
        const quilometragemUpdate = await Quilometragem
            .findByIdAndUpdate(_id, quilometragem, {
                runValidators: true
            })
        res.json(quilometragemUpdate)
    } catch (err) {
        next(err)
    }
}

export {
    getAll,
    getQuilometragemByID,
    saveQuilometragem,
    updateQuilometragem
}