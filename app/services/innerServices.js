import { instance } from "./api";

export async function sendBotData(requestData) {
    try {
        const { data } = await instance({
            method: 'POST',
            url: '/api/bot',
            data: requestData
        });

        return data;
    } catch (e) {
        console.warn(e);
    }
}
