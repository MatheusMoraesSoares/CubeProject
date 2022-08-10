import { Request, Response } from "express";
import { CustomError } from "../business/errors/CustomError";
import { InvalidInputError } from "../business/errors/InvalidInputError";
import { ListBusiness } from "../business/ListBusiness";
import { Authenticator } from "../services/Authenticator";

export class ListController {

    constructor(
        private listBusiness: ListBusiness
    ){}

    createList = async (req: Request, res: Response) => {
        try {
            const { listName } = req.params
            const token = req.headers.authorization as string

            const user = Authenticator.getTokenData(token)

            if(!user) {
                throw new InvalidInputError("You must be logged in to perform this action")
            }

            const result = await this.listBusiness.createList(listName, user.id)

            res.status(201).send({ message: `List created successfully. key: ${result.getId()}, name: ${result.getName()}`})
        } catch (error: any) {
            res.status(error.statusCode || 500).send({ message: error.message })
        }
    }

    getAllListsById = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization as string

            const user = Authenticator.getTokenData(token)

            if(!user) {
                throw new CustomError(404, "You must be logged in to perform this action")
            }

            const result = await this.listBusiness.getAllListsById(user.id)

            res.status(201).send({ message: result})
        } catch (error: any) {
            res.status(error.statusCode || 500).send({ message: error.message })
        }
    }
}