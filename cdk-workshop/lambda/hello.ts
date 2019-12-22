export const handler = async (event:any) => {
    console.log(JSON.stringify(event))
    return {
        statusCode:200,
        headers: { "Content-Type": "text/plain" },
        body: "hello"
    }
}  