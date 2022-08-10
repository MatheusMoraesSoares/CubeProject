import { DataInputDTO } from "../types/LoginInputDTO"
import { BaseDatabase } from "./BaseDataBase"

export class DataDatabase extends BaseDatabase {

    private static LIST_DATA = "dados"

    getDataNameByListId = async (list_id: string) => {
        try {
            const result = await BaseDatabase.connection()
                .select("name")
                .from(DataDatabase.LIST_DATA)
                .where({ list_id })

            console.log('result', result)
            return result

        } catch (error: any) {
            throw new Error(error.mysqlMessage || error.message)
        }
    }

    getDataByListId = async (list_id: string) => {
        try {
            console.log('entrou no getData')
            const result = await BaseDatabase.connection()
                .select("*")
                .from(DataDatabase.LIST_DATA)
                .where({ list_id })

            console.log(result)
            return result

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    insertData = async (data: DataInputDTO) => {
        try {
            await BaseDatabase.connection()
                .insert({
                    name: data.name,
                    participation: data.participation,
                    list_id: data.listId
                })
                .into(DataDatabase.LIST_DATA)

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}