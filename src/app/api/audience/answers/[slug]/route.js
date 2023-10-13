import { connectMongoDB } from "@/config/connectMongodb"
import AudienceAnswer from "@/models/audienceAnswer"
export async function GET(req, context) {
    const { params } = context
    connectMongoDB()
    const audienceAnswers = await AudienceAnswer.find({ code: params.slug })
    if (audienceAnswers) {
        return Response.json({ audienceAnswers})
    } else {
        return Response.json({ "message": "Not exist" }, {status: 404})
    }

}