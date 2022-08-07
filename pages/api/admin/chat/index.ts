import { NextApiRequest, NextApiResponse } from "next";
import { responseGeneral } from "../../../../src/interfaces/response";
import { ChatBotModel } from "../../../../src/models/chat-bot.model";
import { createChatBot } from "../../../../src/services/back/chat-bot.bd.service";
let resGeneral: responseGeneral<ChatBotModel[]>;
export default async function chatBot(
    req: NextApiRequest,
    res: NextApiResponse<responseGeneral<ChatBotModel[]>>
) {
    switch (req.method) {
        case 'GET':
            resGeneral = {
                staus: 200,
                body: [],
                message: "Get chat"
            }
            res.status(200).json(resGeneral);

            break;

        case 'POST':
            let request: ChatBotModel = req.body;
            let response = await createChatBot(request);
            resGeneral = {
                staus: 200,
                body: [response],
                message: "chat creado"
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
