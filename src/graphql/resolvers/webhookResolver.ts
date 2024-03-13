import { WebhookModel } from "../../models/webhookModel";

const webhookResolver = {
    Query: {
        getWebhooks: async () => {
            return await WebhookModel.find();
        },
        getWebhookById: async (_parent: any, args: any) => {
            return await WebhookModel.findById(args.id);
        },
    },
    Mutation: {
        createWebhook: async (_: void, args: any) => {
            const { webhookInput } = args;
            const { url, eventId, dateSended } = webhookInput;

            try {
                const newWebhook = await WebhookModel.create({ url, eventId, dateSended });
                return newWebhook;
            } catch (error) {
                console.error(error);
                return { error: "An error occurred" };
            }
        },
        deleteWebhook: async (_: void, args: any, { user }: { user: any }) => {
            if (!user) {
                throw new Error("No auth.");
            }

            try {
                await WebhookModel.findByIdAndDelete(args.id);
                return true;
            } catch (error) {
                console.error(error);
                return false;
            }
        },
    },
};

export default webhookResolver;
