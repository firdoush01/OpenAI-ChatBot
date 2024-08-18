
import Configuration from "openai"

export  function configureOpenAI() {
    const config = new Configuration({
        apiKey: process.env.OPEN_AI_SECRET,
        organization: process.env.OPEN_AI_ORGID,
    })
}

// import OpenAI from "openai";

// const openai = new OpenAI({
//     organization: process.env.OPEN_AI_SECRET,
//     project: process.env.OPEN_AI_ORGID,
// });