import { User } from "../model/User";
import { BaseDatabase } from "./BaseDataBase";

export class UserDatabase extends BaseDatabase{
    private static TABLE_USER = "usuario"
    private static TABLE_PERMISSAO = "permissao"

    insertUser = async (newUser: User): Promise<void> => {
        try {
            
            await BaseDatabase.connection()
                .insert({
                    id: newUser.getId(),
                    email: newUser.getEmail(),
                    password: newUser.getPassword()
                })
                .into(UserDatabase.TABLE_USER)

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    createPermissaoUserId = async (user_id: string) => {
        try {
            await BaseDatabase.connection()
                .insert({
                    user_id
                })
                .into(UserDatabase.TABLE_PERMISSAO)

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    getUserByEmail = async (email: string) => {
        try {
            const result = await BaseDatabase.connection()
                .select("*")
                .from(UserDatabase.TABLE_USER)
                .where({ email })

            return result[0] && User.toUserModel(result[0])

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
    
}