import { HydratedDocument } from 'mongoose';
import { connection } from '../../bd/connection'
import { DataMessage } from '../../bd/schemas/data-message.schema';
import { DataMessageModel } from '../../models/data-message.model';

export async function createDataMessage(data: DataMessageModel): Promise<DataMessageModel> {
    let connet = await connection();
    console.log("save: ", data);
    const instance: HydratedDocument<DataMessageModel> = new DataMessage(data);
    let response = await instance.save();
    connet.disconnect();
    console.log("response save: ", response);
    return response
}

export async function searchDataMessage(key: string): Promise<DataMessageModel[]> {
    let connet = await connection();
    let response = await DataMessage.find({ _id: key });
    connet.disconnect();
    return response
}
export async function searchDataMessages(): Promise<DataMessageModel[]> {
    let connet = await connection();
    let response = await DataMessage.find({});
    connet.disconnect();
    return response
}

export async function removeDataMessage(id: string): Promise<DataMessageModel> {
    let connet = await connection();
    let response = await DataMessage.findByIdAndRemove(id).exec();
    connet.disconnect();
    return response;
}
export async function updateDataMessage(id: string, data: DataMessageModel): Promise<DataMessageModel | null> {
    let connet = await connection();
    let response = await DataMessage.updateOne({ _id: id }, data).exec();
    connet.disconnect();
    if (response.modifiedCount === 1) {
        return { _id: id, ...data }
    } else {
        return null
    }
}