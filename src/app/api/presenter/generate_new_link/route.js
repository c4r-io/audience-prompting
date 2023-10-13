import { connectMongoDB } from "@/config/connectMongodb"
import PromptLink from "@/models/promptLink"
import otpGenerator from "otp-generator";

export async function POST(req) {
    const body = await req.json()
    console.log("question",body.question)
    connectMongoDB()
    const ifNotExistThenCreate = async (iterator = 1) => {
        const generatedOTP = otpGenerator.generate(8, {
            upperCase: false,
            specialChars: false,
        });
        const promptExist = await PromptLink.findOne({ code: generatedOTP })
        if (promptExist) {
            ifNotExistThenCreate(iterator + 1)
        }
        else if (promptExist && iterator > 3) {
            const createdLink = await PromptLink.create({
                code: generatedOTP + "" + Math.round(Math.random() * 100),
                question: body.question,
                role: body.role,
                uid: body.uid,
                ...body.userInfo
            })
            return Response.json({ "message": "Success", createdLink })
        }
        else {
            const createdLink = await PromptLink.create({
                code: generatedOTP,
                question: body.question,
                role: body.role,
                uid: body.uid,
                ...body.userInfo
            })
            return Response.json({ "message": "Success", createdLink })
        }
    }
    return ifNotExistThenCreate()
}
export async function PATCH(req) {
    connectMongoDB()
    const body = await req.json()
    const promptExist = await PromptLink.findOne({ code: body.code})
    if (promptExist) {
        promptExist.timeUp = body.timeUp
        await promptExist.save()
        return Response.json({ "message": "Success", promptExist }, { status: 200 })
    } else {
        return Response.json({ "message": "Not found" }, { status: 404 })
    }
}
