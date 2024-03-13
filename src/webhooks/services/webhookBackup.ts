import fetch from "node-fetch"; // Add the missing import statement for 'fetch'

export const backupWebhook = async ( url: string, eventId: string, dateSended: Date ) => {
    try {
        const url = "http://localhost:3003/graphql";
        const query = `
            mutation($webhookInput: WebhookInput!) {
                createWebhook(webhookInput: $webhookInput) {
                    url
                    eventId
                    dateSended
                }
            }
        `;
        const variables = {
            webhookInput: {
                url,
                eventId,
                dateSended,
            },
        };

        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query, variables }),
        });

        if (!response.ok) {
            throw new Error(
                `Error al registrar el evento webhook en bdd: ${response.statusText}`
            );
        }
    } catch (error) {
        console.error(error);
    }
};
