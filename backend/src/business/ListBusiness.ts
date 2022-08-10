import { ListDatabase } from "../data/ListDatabase"
import { List } from "../model/List"
import IdGenerator from "../services/IdGenerator"
import { CustomError } from "./errors/CustomError"
import { InvalidInputError } from "./errors/InvalidInputError"
import { NotFoundError } from "./errors/NotFoundError"

export class ListBusiness {

    constructor(
        private listDatabase: ListDatabase
    ) { }

    createList = async (name: string, userId: string) => {
        try {

            if (!name) {
                throw new InvalidInputError("Invalid input. List name is required")
            }
            const listId: any[] = await this.listDatabase.getListByUserId(userId)
            if (listId) {
                for (const list of listId) {
                    const registeredList = await this.listDatabase.getListNameById(list.list_id)
                    if (registeredList === name) {
                        throw new CustomError(500, "List name already being used")
                    }
                }
            }

            const newListId = IdGenerator.idGenerator()
            const newList = new List(newListId, name)

            await this.listDatabase.insertList(newList)
            await this.listDatabase.insertListIdPermissao(newListId, userId)

            return newList

        } catch (error: any) {
            throw new CustomError(500, error.sqlMessage || error.message)
        }
    }

    getAllListsById = async (userId: string) => {
        try {

            const temp = await this.listDatabase.getListByUserId(userId)
            let listsId: string[] = []
            for (let i = 0; i<temp.length; i++) {
                listsId.push(temp[i].list_id)
            }
 
            const result = await this.listDatabase.getAllListsById(listsId)

            return result
        } catch (error: any) {
            throw new CustomError(500, error.sqlMessage || error.message)
        }
    }
}