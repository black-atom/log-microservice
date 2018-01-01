import { Schema } from 'mongoose'
import databaseConnection from '../../databaseConnection'

const monitoramentoSchema = new Schema({
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
        default: null,
        required: [true, 'Insira a data inicial.']
    },
    data_hora_final_km: {
        type: Date,
        default: null,
        required: [true, 'Insira a data final.']
    },
    data_hora_inicial_virgente_local: {
        type: Date,
        default: null,
        required: [true, 'Insira a data inicial virgente do local.']
    },
    data_hora_final_virgente_local: {
        type: Date,
        default: null,
        required: [true, 'Insira a data final virgente do local.']
    },
    tipo: {
        type: String,
        enum: [
            'almoco',
            'atendimento',
            'deslocamento_empresa',
            'abastecimento',
            'outros'
        ],
        required: [true, 'Selecione o tipo da quilometragem.']
    },
    id_atendimento: {
        type: Schema.Types.ObjectId 
    }
},{ versionKey: false }

)

export default databaseConnection.model('monitoramento', monitoramentoSchema)