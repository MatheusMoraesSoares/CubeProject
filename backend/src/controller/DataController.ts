import { Request, Response } from "express"
import { DataBusiness } from "../business/DataBusiness"
import { CustomError } from "../business/errors/CustomError"
import { Authenticator } from "../services/Authenticator"
import { DataInputDTO } from '../types/LoginInputDTO'


export class DataController {

    constructor(
        private dataBusiness: DataBusiness
    ) { }

    insertData = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization as string
            const { listId, firstName, lastName, participation } = req.body

            if (firstName.includes(" ") || lastName.includes(" ")) {
                throw new CustomError(500, "First name and last name can't have spaces")
            }

            const name = firstName + " " + lastName
            const data: DataInputDTO = { name, participation, listId }
            const user = Authenticator.getTokenData(token)?.id

            if (!user) {
                throw new CustomError(404, "You must be logged in to perform this action")
            }

            await this.dataBusiness.insertData(data)

            res.status(201).send({ message: "Data inserted successfully" })
        } catch (error: any) {
            res.status(error.statusCode || 500).send({ message: error.message })
        }
    }

    getAllData = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization as string
            const {listId} = req.params
            const user = Authenticator.getTokenData(token)?.id
    
            if(!user){
                throw new CustomError(404, "You must be logged in to perform this action" )
            }

            const dataResult = await this.dataBusiness.getAllData(listId)

            res.status(201).send({ message: dataResult })

        } catch (error: any) {
            res.status(error.statusCode || 500).send({ message: error.message})
        }


    }
}