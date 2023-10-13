import mongoose, { Schema, models } from 'mongoose';

const promptLinkSchema = new Schema({
    code: { type: 'String' },
    question: { type: 'String' },
    timeUp: { type: 'Boolean', default: false },
}, {
    timestamps: true
})

const PromptLink = models.PromptLink || mongoose.model("PromptLink", promptLinkSchema)
export default PromptLink