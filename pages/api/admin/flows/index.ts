import { ModulesBotModel } from "@models/modules-bot.model";
import { NextApiRequest, NextApiResponse } from "next";
import { responseGeneral } from "@interfaces/response";
import { getModules, postModule } from "@services/back/modules-bot.db.service";
let resGeneral: responseGeneral<ModulesBotModel[]>;
export default async function chatBot(
    req: NextApiRequest,
    res: NextApiResponse<responseGeneral<ModulesBotModel[]>>
) {
    switch (req.method) {
        case 'GET':
            let data: ModulesBotModel[] = await getModules();
            resGeneral = {
                staus: 200,
                body: data,
                message: "List Modules"
            }
            res.status(200).json(resGeneral);
            break;
        case 'POST':
            let request: ModulesBotModel = req.body;
            let response = await postModule(request);
            resGeneral = {
                staus: 200,
                body: [response],
                message: "Modulo creado"
            }
            res.status(200).json(resGeneral);
            break;
        default:
            resGeneral = {
                staus: 404,
                body: [],
                message: "El servicio no existe"
            }
            res.status(404).json(resGeneral);
            break;
    }
}
