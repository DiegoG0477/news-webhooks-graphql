import fetch from 'node-fetch';
import { ConsumerModel } from '../models/consumerModel';
import { backupWebhook } from './services/webhookBackup';

export const sendTrafficNotifications = async (data: any) => {
    console.log(data);
    const urls = await ConsumerModel.find({ trafficNotifications: true }).select('url');
    const urlArray: string[] = urls.map((consumer: any) => consumer.url);

    const notificationPromises = urlArray.map(async (url) => {
        const body = {
            message: data.message,
            data: data.data
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { "content-type": "application/json" },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                throw new Error(`Error al enviar notificación a ${url}: ${response.statusText}`);
            }

            await backupWebhook(url, data.data.id, data.data.date);

            return response.json();
        } catch (error) {
            console.error(error);
            return { success: false, error: `Error al enviar notificación a ${url}` };
        }
    });

    return Promise.all(notificationPromises);
};