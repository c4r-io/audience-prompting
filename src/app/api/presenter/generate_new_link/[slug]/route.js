import { connectMongoDB } from "@/config/connectMongodb"
import PromptLink from "@/models/promptLink"
export async function GET(req, context) {
    const { params } = context
    // const body = await req.json()
    connectMongoDB()
    const promptExist = await PromptLink.findOne({ code: params.slug, question: req.nextUrl.searchParams.get("question"), timeUp: false })
    if (promptExist) {
        return Response.json({ "message": "Already exist",question: promptExist._doc, promptExist,timeUp: false })
    } else {
        return Response.json({ "message": "Not exist", timeUp: true },{status: 404})
    }

}