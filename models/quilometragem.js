import { Schema } from 'mongoose'
import databaseConnection from '../databaseConnection'

const quilometragemSchema = new Schema({
    km_inicial: {
        type: Number,
        required: [true, 'Insira a quilometragem inicial.']
    },
    km_final: {
        type: Number,
        required: [true, 'Insira a quilometragem final.']
    },
    data_hora_inicial_km: {
        type: Date,
        default: Date.now,
        required: [true, 'Insira a data inicial.']
    },
    data_hora_final_km: {
        type: Date,
        default: Date.now,
        required: [true, 'Insira a data final.']
    },
    data_hora_inicial_virgente_local: {
        type: Date,
        default: Date.now,
        required: [true, 'Insira a data inicial virgente do local.']
    },
    data_hora_final_virgente_local: {
        type: Date,
        default: Date.now,
        required: [true, 'Insira a data final virgente do local.']
    },
    tipo_quilometragem: {
        type: String,
        enum: [
            'almoco',
            'atendimento',
            'deslocamento_empresa',
            'abastecimento',
            'outros'
        ],
        required: [true, 'Selecione o tipo da quilometragem.']
    }
},{ versionKey: false }

)

export default databaseConnection.model('quilometragen', quilometragemSchema)