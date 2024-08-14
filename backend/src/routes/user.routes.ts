import {Router} from "express"
import { getAllUsers, userSignup, verifyUser } from "../controllers/user.controllers";
import { signupValidator, validate, loginValidator} from "../utils/validators.js"
import { verifyToken } from "../utils/token-manager";
import { userLogin } from "../controllers/user.controllers";

const userRoutes = Router()

userRoutes.get("/", getAllUsers)

userRoutes.post("/signup", validate(signupValidator),userSignup)
userRoutes.post("/login", validate(loginValidator),userLogin)
userRoutes.get("/auth-status",  verifyToken, verifyUser)

export default userRoutes;