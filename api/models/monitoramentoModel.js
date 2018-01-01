import { Schema } from 'mongoose'
import databaseConnection from '../../databaseConnection'

const monitoramentoSchema = new Schema({
    km_inicial: {
        type: Number,
        required: [true, 'Insira a quilometragem inicial.']
    },
    km_final: {
        type: Number,
        default: null,
    },
    data_hora_inicial_km: {
        type: Date,
        default: null,
    },
    data_hora_final_km: {
        type: Date,
        default: null,
    },
    data_hora_inicial_virgente_local: {
        type: Date,
        default: null,
    },
    data_hora_final_virgente_local: {
        type: Date,
        default: null,
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
    id_funcionario:  {
        type: Schema.Types.ObjectId,
        required: [true, 'Passe o id do funcionario.']
    },
    id_atendimento: {
        type: Schema.Types.ObjectId,
        default: null
    }
},{ versionKey: false }

)

export default databaseConnection.model('monitoramento', monitoramentoSchema)