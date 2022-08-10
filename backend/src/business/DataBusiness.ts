import { BaseDatabase } from "../data/BaseDataBase"
import { DataDatabase } from "../data/DataDatabase"
import { DataInputDTO } from "../types/LoginInputDTO"
import { CustomError } from "./errors/CustomError"
import { InvalidInputError } from "./errors/InvalidInputError"
import { NotFoundError } from "./errors/NotFoundError"

export class DataBusiness {

    constructor(
        private dataDatabase: DataDatabase
    ) { }

    insertData = async (data: DataInputDTO): Promise<void> => {
        try {
            if (!data.listId || !data.name || !data.participation) {
                throw new InvalidInputError("list id, name, last name andparticipation are required")
            }

            const dataResult = await this.dataDatabase.getDataByListId(data.listId)
            console.log('dataResult', dataResult)

            if (dataResult) {
                const dataName = await this.dataDatabase.getDataNameByListId(data.listId)
                console.log('dataName', dataName.length)

                for (let i = 0; i < dataName.length; i++) {
                    if (dataName[i].name === data.name) {
                        throw new NotFoundError("Name already in the list")
                    }
                }
            }

            await this.dataDatabase.insertData(data)

        } catch (error: any) {
            throw new CustomError(500, error.sqlMessage || error.message)
        }

    }

    getAllData = async (listId: string) => {
        try {
            const dataResult = await this.dataDatabase.getDataByListId(listId)

            return dataResult
            
        } catch (error: any) {
            throw new CustomError(500, error.sqlMessage || error.message)
        }
    }
}