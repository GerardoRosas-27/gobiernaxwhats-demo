// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { converteModelToInterfaceImageButtons } from '../../src/convertes/chat-bot.converte';
import { TypeInputUser } from '../../src/environment/var-const';
import { ResGeneralApi, ResMessage, ResponseError } from '../../src/interfaces/api-whatsapp';
import { ReqValue, ReqWebhooks } from '../../src/interfaces/webhooks';
import { ChatBotModel } from '../../src/models/chat-bot.model';
import { FlowChatBotModel } from '../../src/models/flow-chat-bot.model';
import { apiSendMessage } from '../../src/services/back/api-whats-app.service';
import { searchChatBot, searchChatBots } from '../../src/services/back/chat-bot.bd.service';
import { createFlowChatBot, searchFlowChatBot, updateFlowChatBot } from '../../src/services/back/flow-chat-bot.bd.service';


const token = 'BrusterCode123456';

export default async function webhooks(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  try {
    switch (req.method) {

      case 'GET':
        console.log("hub.mode: ", req.query['hub.mode']);
        console.log("hub.verify_token: ", req.query['hub.verify_token']);
        console.log("hub.challenge: ", req.query['hub.challenge']);

        if (
          req.query['hub.mode'] == 'subscribe' &&
          req.query['hub.verify_token'] == token
        ) {
          let response = req.query['hub.challenge'] as string
          res.setHeader('content-type', "text/plain");
          res.status(200).send(response);
        } else {
          res.setHeader('content-type', "text/plain");
          res.status(400).send("token invalido");
        }

        break;

      case 'POST':
        let request: ReqWebhooks = req.body;
        let data = request.entry[0].changes[0].value;
        if (data.messages && data.contacts) {
          requestUser(data, res)
        } else {
          res.status(200).send("OK");
        }
        break;
      default:
        res.status(404).send("not metho service");
        break;
    }
  } catch (error) {
    res.status(200).send("Error Servidos");
  }

}
const requestUser = async (data: ReqValue, res: NextApiResponse<string>) => {
  let typeMessage = data.messages && data.messages[0].type;
  let from = data.messages && data.messages[0].from.length > 0 ? data.messages[0].from : '';
  let wa_id = data.contacts && data.contacts[0].wa_id;
  let name = data.contacts && data.contacts[0].profile.name;
  let chatId = "62ef13c1cee00268b5df1833";
  let chatIdNotFont = "62ef13c1cee00268b5df1833";

  let dataFlow = await searchFlowChatBot(wa_id as string);
  if (dataFlow && dataFlow?.length > 0) {
    chatId = dataFlow[0].flow_chat as string;
  }
  let dataMessageBd = await searchChatBot(chatId);


  switch (typeMessage) {
    case TypeInputUser.text:
      if (dataFlow && dataFlow?.length > 0) {
        let chatIdInputNext = dataMessageBd[0].input?.id ? dataMessageBd[0].input?.id : '';
        if (chatIdInputNext.length > 0) {
          let dataMessageNextBd = await searchChatBot(chatIdInputNext);
          sendMessage(chatId, from, dataMessageNextBd[0], dataFlow, res);
        } else {
          res.status(200).send("error")
        }
      } else {
        sendMessage(chatId, from, dataMessageBd[0], dataFlow, res);
      }
      break;
    case TypeInputUser.interactive:
      if (dataFlow && dataFlow?.length > 0) {
        let chatIdButtonNext = data.messages && data.messages[0].interactive?.button_reply.id ? data.messages[0].interactive?.button_reply.id : '';
        //let chatIdListNext = data.messages && data.messages[0].interactive?.button_reply.id ? data.messages[0].interactive?.button_reply.id : '';
        if (chatIdButtonNext.length > 0) {
          let dataMessageNextBd = await searchChatBot(chatIdButtonNext);
          sendMessage(chatIdButtonNext, from, dataMessageNextBd[0], dataFlow, res);
        } else {
          res.status(200).send("error")
        }

      } else {
        sendMessage(chatId, from, dataMessageBd[0], dataFlow, res);
      }
      break;

    default:
      res.status(200).send("error")
      break;
  }
}

const sendMessage = async (chatId: string, from: string, dataMessageBd: ChatBotModel, dataFlow: FlowChatBotModel[], res: NextApiResponse<string>) => {
  let dataMessage = await converteModelToInterfaceImageButtons(dataMessageBd);
  let fromSub = '';
  if (dataFlow?.length > 0) {
    fromSub = dataFlow[0].user_phone;
  } else {
    let from1 = from ? from.substring(0, 2) : "";
    let from2 = from ? from.substring(3, from.length) : "";
    fromSub = from1 + from2;
  }

  let resDataMessage = {
    messaging_product: "whatsapp",
    preview_url: false,
    recipient_type: "individual",
    to: fromSub,
    ...dataMessage
  }
  console.log("send data: ", JSON.stringify(resDataMessage))
  let response: ResGeneralApi = await apiSendMessage(resDataMessage);
  if (!response.error) {

    let saveDataFlow: FlowChatBotModel = {
      user_phone: response.data?.contacts[0].input ? response.data?.contacts[0].input : "",
      wa_id: response.data?.contacts[0].wa_id ? response.data?.contacts[0].wa_id : "",
      status_chat_bot: true,
      flow_module: "module1",
      flow_chat: chatId,
      id_response_bot: response.data?.messages[0].id ? response.data?.messages[0].id : "",
    }
    if (dataFlow?.length > 0) {
      updateFlowChatBot(dataFlow[0]._id as string, saveDataFlow);
    } else {
      createFlowChatBot(saveDataFlow);
    }
    console.log("mensaje enviado");
    res.status(200).send("ok")
  } else {
    res.status(200).send("error")
  }
}


