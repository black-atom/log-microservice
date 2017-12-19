import Quilometragem from '../models/quilometragem'
import Promise from 'bluebird'
import { prop } from 'ramda'

const getAll = async(req, res, next) => {
    await Quilometragem.find(req.query)
        .then(quilometragens => res.json(quilometragens))
        .catch(error => next(error))
}

const getQuilometragemByID = async(req, res, next) => {
    const _id = prop('id', req.params)
    await Quilometragem.findById(_id)
        .then(quilometragem => res.json(quilometragem))
        .catch(error => next(error))
}

const SaveQuilometragem = async(req, res, next) => {
    const quilometragem = prop('body', req)
    const quilometragemModel = new Quilometragem(quilometragem)

    await quilometragemModel.save()
        .then(savedQuilometragem => res.json(savedQuilometragem))
        .catch(error => next(error))
}

const updateQuilometragem = async(req, res, next) => {
    const quilometragem = prop('body', req)
    const _id = prop('id', req.params)

    await Quilometragem.findByIdAndUpdate(_id, quilometragem, {
            runValidators: true
        })
        .then(updateQuilometragem => updateQuilometragem._id)
        .then(id => Quilometragem.findById(id))
        .then(updateData => res.json(updateData))
        .catch(error => next(error))
}

export {    
    getAll,
    getQuilometragemByID,
    SaveQuilometragem,
    updateQuilometragem
}
