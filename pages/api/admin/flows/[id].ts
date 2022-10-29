// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ModulesBotModel } from '../../../../src/models/modules-bot.model';
import type { NextApiRequest, NextApiResponse } from 'next'

import { responseGeneral } from "../../../../src/interfaces/response";
import { getModule, deleteModule, putModule } from '../../../../src/services/back/modules-bot.db.service';

let resGeneral: responseGeneral<ModulesBotModel[]>;

export default async function product(
    req: NextApiRequest,
    res: NextApiResponse<responseGeneral<ModulesBotModel[]>>
) {

    const { id } = req.query;
    console.log("id: ", id)
    console.log("method: ", req.method);
    switch (req.method) {
        case 'GET':
            try {
                let getData = await getModule(id as string);
                console.log("get Data: ", getData)
                resGeneral = {
                    staus: 200,
                    body: getData,
                    message: "Get initials"
                }
                res.status(200).json(resGeneral);
            } catch (error) {
                resGeneral = {
                    staus: 500,
                    body: [],
                    message: "No se pudo encontrar el dato"
                }
                res.status(500).json(resGeneral);
            }

            break;
        case 'DELETE':
            try {
                let deleteData = await deleteModule(id as string);
                console.log("get Data: ", deleteData)
                resGeneral = {
                    staus: 200,
                    body: [deleteData],
                    message: "delete product"
                }
                res.status(200).json(resGeneral);
            } catch (error) {
                resGeneral = {
                    staus: 500,
                    body: [],
                    message: "No se pudo eliminar el dato"
                }
                res.status(500).json(resGeneral);
            }

            break;
        case 'PUT':
            try {
                let putData = await putModule(id as string, req.body);
                console.log("put Data: ", putData)
                resGeneral = {
                    staus: 200,
                    body: putData ? [putData] : [],
                    message: "put produt"
                }
                res.status(200).json(resGeneral);
            } catch (error) {
                resGeneral = {
                    staus: 500,
                    body: [],
                    message: "No se pudo actualizar el dato"
                }
                res.status(500).json(resGeneral);
            }

            break;
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)

    }


}




