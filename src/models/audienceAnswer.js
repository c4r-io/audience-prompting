import mongoose, { Schema, models } from 'mongoose';

const audienceAnswerSchema = new Schema({
    uid: { type: 'String' },
    code: { type: 'String' },
    research: { type: 'String' },
    carear_stage: { type: 'String' },
    question: { type: 'String' },
    answer: { type: 'String' },
    lab_role: { type: 'Array' },
    computational_lab: { type: 'Boolean', default: false },
}, {
    timestamps: true
})

const AudienceAnswer = models.AudienceAnswer || mongoose.model("AudienceAnswer", audienceAnswerSchema)
export default AudienceAnswer