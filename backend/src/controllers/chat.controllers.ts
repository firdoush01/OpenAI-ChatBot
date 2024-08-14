import { Request, Response, NextFunction } from "express"
import { configureOpenAI } from "../config/openai-config";
import { OpenAIApi,  ChatCompletionRequestMessage} from "openai"
import User from "../models/Users";




export const generateChatCompletion  = async ( req: Request, res: Response, next: NextFunction) => {
    
    const { message } = req.body;
    try {
        const user = await User.findById(res.locals.jwtData.id)
        if(!user) 
            return res.status(401).json({message: "User not registered OR Token malfunction"})
    
        //grab the chats of the user
        const chats = user.chats.map(({role,content}) => ({role, content})) as ChatCompletionRequestMessage[];
        chats.push({ content: message, role: "user"})
        user.chats.push( {content: message, role: "user"} )
    
        //send all charts with new one to openAI API
        const config = configureOpenAI()
        const openai = new OpenAIApi(config);

        // get latest response
        const chatResponse = await openai.createChatCompletion({model: "gpt-3.5-turbo", message: chats})
        user.chats.push(chatResponse.data.choices[0].message)
        await user.save();
        return res.status(200).json({ chats: user.chats })
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({ message: "Something went wrong" })
    }
    

}
