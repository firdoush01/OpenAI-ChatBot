import {Router} from "express"
import { verifyToken } from "../utils/token-manager";
import { validate, chatCompletionValidator } from "../utils/validators.js";
import { generateChatCompletion } from "../controllers/chat.controllers";

//protected API
const chatRoutes = Router();
chatRoutes.post("/new", validate(chatCompletionValidator) ,verifyToken, generateChatCompletion)

export default chatRoutes;