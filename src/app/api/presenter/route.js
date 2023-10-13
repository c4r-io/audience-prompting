export async function GET(req){
    
    console.log(req.method)
    return Response.json({"message":"Success"})
    
}