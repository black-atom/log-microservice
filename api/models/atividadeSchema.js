import { Schema } from 'mongoose'
import databaseConnection from '../../databaseConnection'
import timestamps from 'mongoose-timestamp';

const monitoramentoSchema  = new Schema({
  status: {
    type: String,
    default: null,
    required: true,
    enum: [
      'PENDENTE',
      'PAUSE_ATIVIDADE',
      'INICIO_ATIVIDADE',
      'FIM_ATIVIDADE',
      'INICIO_DESLOCAMENTO',
      'FIM_DESLOCAMENTO',
      'CANCELA_ATIVIDADE',
    ],
  },
  date: { type: Date, default: null, required: true },
  motivo: { type: String },
}, { _id : false })

const atividadeSchema = new Schema({
    atividade_id: { type: String, required: [true, 'You must enter the atividade_id'] },
    monitoramentos: {
      type: [monitoramentoSchema],
      default: [],
    },
    tipo: {
        type: String,
        enum: [
            'almoco',
            'atendimento',
            'deslocamento',
            'abastecimento',
            'outros'
        ],
        required: [true, 'Selecione o tipo da quilometragem.']
    },
    descricao: {
      type: String,
      default: null
    },
    funcionario_id:  {
        type: Schema.Types.ObjectId,
        required: [true, 'Passe o id do funcionario.']
    },
    atendimento_id: {
        type: Schema.Types.ObjectId,
        default: null
    },
    status: {
      type: String,
      default: null,
      enum: [
        'PENDENTE',
        'PAUSE_ATIVIDADE',
        'INICIO_ATIVIDADE',
        'FIM_ATIVIDADE',
        'INICIO_DESLOCAMENTO',
        'FIM_DESLOCAMENTO',
        'CANCELA_ATIVIDADE',
      ],
    }
},{ versionKey: false }

)

atividadeSchema.plugin(timestamps);

export default databaseConnection.model('atividade', atividadeSchema)