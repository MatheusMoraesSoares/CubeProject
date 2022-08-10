import express from 'express'
import { ListBusiness } from "../business/ListBusiness";
import { ListController } from "../controller/ListController";
import { ListDatabase } from "../data/ListDatabase";

const listController = new ListController(
    new ListBusiness(
        new ListDatabase()
    )
)

export const listRouter = express.Router()

listRouter.post('/create/:listName', listController.createList)
listRouter.get('/get', listController.getAllListsById)