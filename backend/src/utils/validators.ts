import { body, ValidationChain, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

export const validate = (validations: ValidationChain[]) => {
    return async (req:Request, res: Response, next: NextFunction) => {
        for (let validation of validations) {
            const result = await validation.run(req)

            if (!result.isEmpty()){
                break;

            }
        }
        const errors = validationResult(req);

        if (errors.isEmpty()){
            return next()
        }
        res.status(422)
        .json({
            errors: errors.array()
        })
    }
}

//sigup validator
export const signupValidator = [
    body("name")
        .notEmpty()
        .withMessage("Name is required"),

    body("email")
        .trim()
        .isEmail()
        .notEmpty()
        .withMessage("email is required"),

    body("password")
        .trim()
        .isLength({ min: 6 })
        .withMessage("password should contain atleast 6 characters")
];

//login validator
export const loginValidator = [

    body("email")
        .trim()
        .isEmail()
        .notEmpty()
        .withMessage("email is required"),

    body("password")
        .trim()
        .isLength({ min: 6 })
        .withMessage("password should contain atleast 6 characters")
];

export const chatCompletionValidator = [
    body("message").notEmpty().withMessage("Message  is required"),
  ];