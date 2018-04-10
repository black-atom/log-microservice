import Monitoramento from '../api/models/atividadeSchema'
import Promise from 'bluebird'
import { prop } from 'ramda'

const getAll = async(req, res, next) => {

    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);

    let query = Object.assign({}, req.query);
    delete query.skip;
    delete query.limit;
    
    const time = { initial: { hh: 0, mm: 0, ss: 0 }, finish:  { hh: 23, mm: 59, ss: 1 }  };

    const parseDate = dateStr => time =>  {
        const date = new Date(dateStr);
        const fomartedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.hh, time.mm, time.ss).toString();
        return fomartedDate;
    };

    const parseQuery = prop => query => ({
        $gte: new Date(parseDate(query[prop])(time.initial)), 
        $lte: new Date(parseDate(query[prop])(time.finish))
    });

    const parseNull = value => value === null || value === 'null' ? null : value;

     for(let prop in query) {
        query[prop] = prop.indexOf('data') > - 1 && query[prop] !== null && query[prop] !== 'null'
        ? parseQuery(prop)(query) 
        : parseNull(query[prop]);
    }

    try {
        const quilometragens = await Monitoramento.find(query).skip(skip).limit(limit).sort( { createdAt: 1 } );
        const count = await Monitoramento.find(query).count()
        res.json({ quilometragens, count })
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
    const monitoramento = prop('body', req)
    const { atividade_id } = monitoramento;
    try {
      const newMonitoramento = await Monitoramento
        .findOneAndUpdate({
            atividade_id: atividade_id
          },
          monitoramento,
          {
            upsert: true,
            setDefaultsOnInsert: true,
            new: true,
          }
        )
 
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
