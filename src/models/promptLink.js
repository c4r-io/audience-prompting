import mongoose, { Schema, models } from 'mongoose';

const promptLinkSchema = new Schema({
    uid: { type: 'String' },
    question: { type: 'String' },
    code: { type: 'String' },
    research: { type: 'String' },
    carear_stage: { type: 'String' },
    lab_role: { type: 'Array' },
    computational_lab: { type: 'Boolean', default: false },
    timeUp: { type: 'Boolean', default: false },
}, {
    timestamps: true
})

const PromptLink = models.PromptLink || mongoose.model("PromptLink", promptLinkSchema)
export default PromptLink