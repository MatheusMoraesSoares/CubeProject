import { List } from "../model/List";
import { BaseDatabase } from './BaseDataBase';

export class ListDatabase extends BaseDatabase {
    private static TABLE_PERMISSION = "permissao"
    private static TABLE_LIST = "lista"

    getListByUserId = async (id: string) => {
        try {
            const result = await BaseDatabase.connection()
                .select("list_id")
                .from(ListDatabase.TABLE_PERMISSION)
                .where({ user_id: id })

            return result
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    insertListIdPermissao = async (list_id: string, user_id: string) => {
        try {
            await BaseDatabase.connection()
                .insert({
                    list_id,
                    user_id
                })
                .into(ListDatabase.TABLE_PERMISSION)
                .where(user_id)
            
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    insertList = async (newList: List): Promise<void> => {
        try {
            await BaseDatabase.connection()
                .insert({
                    id: newList.getId(),
                    nome_da_lista: newList.getName()
                })
                .into(ListDatabase.TABLE_LIST)
                
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    getListNameById = async (listId: any[]) => {
        try {

            const query: any = await BaseDatabase.connection()
                    .select("nome_da_lista")
                    .from(ListDatabase.TABLE_LIST)
                    .where({ id: listId })

                return query[0].nome_da_lista
                
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    getAllListsById = async (id: string[]) => {
        try {
            const result = await BaseDatabase.connection()
                .select("*")
                .from(ListDatabase.TABLE_LIST)
                .where({ id })

            return result
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }


}