import { Router } from "express"
import userRoutes from "./user.routes"
import chatRoutes from "./chat.routes"
const  appRouter = Router()

appRouter.use("/user",userRoutes)  //domain/appi/v1/user
appRouter.use("/chats",chatRoutes) //domain/appi/v1/chats
export default appRouter