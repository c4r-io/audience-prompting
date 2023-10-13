import { connectMongoDB } from "@/config/connectMongodb"
import AudienceAnswer from "@/models/audienceAnswer"
import PromptLink from "@/models/promptLink"
export async function POST(req, context) {
    const { params } = context
    const body = await req.json()
    connectMongoDB()

    const promptExist = await PromptLink.findOne({ code: body.code })
    if (promptExist && promptExist.timeUp) {
        return Response.json({ "message": "Thank you for approach. Time's up", timeUp: true }, { status: 200 })
    }
    if(!promptExist){
        return Response.json({ "message": "Question not found" }, { status: 404 })
    }

    const answerExist = await AudienceAnswer.findOne({ uid: body.uid, code: body.code })
    if (answerExist) {
        answerExist.answer = body.answer
        await answerExist.save()
        return Response.json({ "message": "Answer updated", timeUp: promptExist.timeUp })
    } else {
        const createdAnswer = await AudienceAnswer.create({
            uid: body.uid,
            code: body.code,
            research: body.userInfo.research,
            carear_stage: body.userInfo.carear_stage,
            question: body.question,
            answer: body.answer,
            lab_role: body.userInfo.lab_role,
            computational_lab: body.userInfo.computational_lab
        })
        return Response.json({ "message": "Answer submitted", timeUp: promptExist.timeUp })
    }

}