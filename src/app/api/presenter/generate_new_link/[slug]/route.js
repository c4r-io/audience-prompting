import { connectMongoDB } from "@/config/connectMongodb"
import PromptLink from "@/models/promptLink"
export async function GET(req, context) {
    const { params } = context
    // const body = await req.json()
    connectMongoDB()
    console.log(req.nextUrl.searchParams.get("question"))
    const keywords = { code: params.slug, timeUp: false }
    console.log("ke ", req.nextUrl.searchParams.get("question"))
    if (req.nextUrl.searchParams.get("question")) {
        console.log("ke ", req.nextUrl.searchParams.get("question"))
        keywords.question = req.nextUrl.searchParams.get("question")
    }

    const promptExist = await PromptLink.findOne(keywords)
    if (promptExist) {
        return Response.json({ "message": "Already exist", question: promptExist._doc, timeUp: promptExist._doc.timeUp })
    } else {
        return Response.json({ "message": "Not exist", timeUp: true }, { status: 404 })
    }

}