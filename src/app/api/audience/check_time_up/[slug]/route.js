import { connectMongoDB } from "@/config/connectMongodb"
import PromptLink from "@/models/promptLink"
export async function GET(req, context) {
    const { params } = context
    connectMongoDB()
    const promptExist = await PromptLink.findOne({ code: params.slug, timeUp: false })
    if (promptExist) {
        return Response.json({ "message": "Already exist",question: promptExist._doc, timeUp: false })
    } else {
        return Response.json({ "message": "Not exist", timeUp: true })
    }

}