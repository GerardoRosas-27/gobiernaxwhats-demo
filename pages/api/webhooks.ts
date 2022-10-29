// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { converteModelToInterfaceChatBot } from '../../src/convertes/chat-bot.converte';
import { TypeInputUser } from '../../src/environment/var-const';
import { ResGeneralApi, ResMessage, ResponseError } from '../../src/interfaces/api-whatsapp';
import { ReqValue, ReqWebhooks } from '../../src/interfaces/webhooks';
import { ChatBotModel } from '../../src/models/chat-bot.model';
import { FlowChatBotModel } from '../../src/models/flow-chat-bot.model';
import { apiSendMessage } from '../../src/services/back/api-whats-app.service';
import { searchChatBot, searchChatBots } from '../../src/services/back/chat-bot.bd.service';
import { createFlowChatBot, searchFlowChatBot, updateFlowChatBot } from '../../src/services/back/flow-chat-bot.bd.service';
import { DataMessageModel } from '../../src/models/data-message.model';
import { createDataMessage } from '../../src/services/back/data-messages.db.service';

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
          return res.status(200).send(response);
        } else {
          res.setHeader('content-type', "text/plain");
          return res.status(400).send("token invalido");
        }

        break;

      case 'POST':
        res.setHeader('content-type', "application/json");
        let request: ReqWebhooks = req.body;
        let data = request.entry[0].changes[0].value;
        if (data.messages && data.contacts) {
          await requestUser(data);
        }
        return res.status(200).send("success ok");
        break;
      default:
        return res.status(200).send("not metho service");
        break;
    }

  } catch (error) {
    return res.status(200).send("Error Servidos");
  }

}
const requestUser = async (data: ReqValue) => {
  let typeMessage = data.messages && data.messages[0].type;
  let from = data.messages && data.messages[0].from.length > 0 ? data.messages[0].from : '';
  let wa_id = data.contacts && data.contacts[0].wa_id;
  let name = data.contacts && data.contacts[0].profile.name;
  let chatId = "62ef13c1cee00268b5df1833";
  let chatIdNotFont = "62ef13c1cee00268b5df1833";
  let dataFlow: FlowChatBotModel[] = [];
  if (wa_id && wa_id?.length > 0) {
    dataFlow = await searchFlowChatBot(wa_id as string)
    if (dataFlow && dataFlow?.length > 0) {
      chatId = dataFlow[0].flow_chat as string;
      console.log("flow chat id: ", chatId)
    }
  }



  let dataMessageBd = await searchChatBot(chatId);
  if (dataFlow && dataFlow?.length > 0) {
    switch (typeMessage) {
      case TypeInputUser.text:

        let saveMessageText: DataMessageModel = {
          user_id: dataFlow[0].user_phone ? dataFlow[0].user_phone : getSubFrom(from),
          chat_id: chatId,
          type: typeMessage.length > 0 ? typeMessage : '',
          timestamp: data.messages && data.messages?.length > 0 ? data.messages[0].timestamp : '',
          caption: data.messages && data.messages[0].text?.body
        }
        await saveDataMessage(saveMessageText)

        let chatIdInputNext = dataMessageBd[0].input?.id ? dataMessageBd[0].input?.id : '';
        if (chatIdInputNext.length > 0) {
          let dataMessageNextBd = await searchChatBot(chatIdInputNext);
          await sendMessage(chatIdInputNext, from, dataMessageNextBd[0], dataFlow);
        }

        break;
      case TypeInputUser.interactive:
        let chatIdButtonNext = data.messages && data.messages[0].interactive && data.messages[0].interactive?.button_reply && data.messages[0].interactive?.button_reply.id ? data.messages[0].interactive?.button_reply.id : '';
        let chatIdListNext = data.messages && data.messages[0].interactive && data.messages[0].interactive?.list_reply && data.messages[0].interactive?.list_reply.id ? data.messages[0].interactive?.list_reply.id : '';
        let saveMessageInteractive: DataMessageModel = {
          user_id: dataFlow[0].user_phone ? dataFlow[0].user_phone : getSubFrom(from),
          chat_id: chatId,
          type: typeMessage.length > 0 ? typeMessage : '',
          timestamp: data.messages && data.messages?.length > 0 ? data.messages[0].timestamp : '',
          id: (chatIdButtonNext.length > 0 ? chatIdButtonNext : (chatIdListNext.length > 0 ? chatIdListNext : ''))
        }
        await saveDataMessage(saveMessageInteractive)

        if (chatIdButtonNext.length > 0) {
          let dataMessageNextBd = await searchChatBot(chatIdButtonNext);
          await sendMessage(chatIdButtonNext, from, dataMessageNextBd[0], dataFlow);
        }
        if (chatIdListNext.length > 0) {
          let dataMessageNextBd = await searchChatBot(chatIdListNext);
          await sendMessage(chatIdListNext, from, dataMessageNextBd[0], dataFlow);
        }

        break;
      case TypeInputUser.image:

        let saveMessageImage: DataMessageModel = {
          user_id: dataFlow[0].user_phone ? dataFlow[0].user_phone : getSubFrom(from),
          chat_id: chatId,
          type: typeMessage.length > 0 ? typeMessage : '',
          timestamp: data.messages && data.messages?.length > 0 ? data.messages[0].timestamp : '',
          id: data.messages && data.messages?.length > 0 ? data.messages[0].image?.id : '',
          caption: data.messages && data.messages?.length > 0 ? data.messages[0].image?.caption : '',
          mime_type: data.messages && data.messages?.length > 0 ? data.messages[0].image?.mime_type : '',
        }
        await saveDataMessage(saveMessageImage)

        let chatImageNext = dataMessageBd[0].media?.id ? dataMessageBd[0].media?.id : '';
        if (chatImageNext.length > 0) {
          let dataMessageNextBd = await searchChatBot(chatImageNext);
          await sendMessage(chatImageNext, from, dataMessageNextBd[0], dataFlow);
        }

        break;
      case TypeInputUser.document:

        let saveMessageDocument: DataMessageModel = {
          user_id: dataFlow[0].user_phone ? dataFlow[0].user_phone : getSubFrom(from),
          chat_id: chatId,
          type: typeMessage.length > 0 ? typeMessage : '',
          timestamp: data.messages && data.messages?.length > 0 ? data.messages[0].timestamp : '',
          id: data.messages && data.messages?.length > 0 ? data.messages[0].document?.id : '',
          caption: data.messages && data.messages?.length > 0 ? data.messages[0].document?.caption : '',
          filename: data.messages && data.messages?.length > 0 ? data.messages[0].document?.filename : '',
          mime_type: data.messages && data.messages?.length > 0 ? data.messages[0].document?.mime_type : '',
        }
        await saveDataMessage(saveMessageDocument)
        let chatDocumentNext = dataMessageBd[0].media?.id ? dataMessageBd[0].media?.id : '';
        if (chatDocumentNext.length > 0) {
          let dataMessageNextBd = await searchChatBot(chatDocumentNext);
          await sendMessage(chatDocumentNext, from, dataMessageNextBd[0], dataFlow);
        }

        break;

      case TypeInputUser.location:

        let saveMessageLocation: DataMessageModel = {
          user_id: dataFlow[0].user_phone ? dataFlow[0].user_phone : getSubFrom(from),
          chat_id: chatId,
          type: typeMessage.length > 0 ? typeMessage : '',
          timestamp: data.messages && data.messages?.length > 0 ? data.messages[0].timestamp : '',
          location: data.messages && data.messages?.length > 0 ? { latitude: data.messages[0].location?.latitude.toString(), longitude: data.messages[0].location?.longitude.toString() } : { latitude: '', longitude: '' },
        }
        await saveDataMessage(saveMessageLocation)
        let chatILocatioNext = dataMessageBd[0].location?.id ? dataMessageBd[0].location?.id : '';

        if (chatILocatioNext.length > 0) {
          let dataMessageNextBd = await searchChatBot(chatILocatioNext);
          await sendMessage(chatILocatioNext, from, dataMessageNextBd[0], dataFlow);
        }

        break;
      default:
        console.log("default type message")
        break;
    }
  } else {
    console.log("not save data mesagge inicio")
    await sendMessage(chatId, from, dataMessageBd[0], []);
  }
  return
}

const sendMessage = async (chatId: string, from: string, dataMessageBd: ChatBotModel, dataFlow: FlowChatBotModel[]) => {
  let dataMessage = await converteModelToInterfaceChatBot(dataMessageBd);
  console.log("converte data: ", JSON.stringify(dataMessage));
  let fromSub = '';
  if (dataFlow?.length > 0) {
    fromSub = dataFlow[0].user_phone;
  } else {
    fromSub = getSubFrom(from)
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
    if (dataMessageBd.trigger && dataMessageBd.trigger.length > 0) {
      chatId = dataMessageBd.trigger;
      let dataMessageNextBd = await searchChatBot(chatId);
      sendMessage(chatId, from, dataMessageNextBd[0], dataFlow)
    }
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
  }
  return
}


const saveDataMessage = async (data: DataMessageModel) => {
  return await createDataMessage(data);
}

const getSubFrom = (from: string) => {
  let result = ""
  let from1 = from ? from.substring(0, 2) : "";
  let from2 = from ? from.substring(3, from.length) : "";
  result = from1 + from2
  return result
}


