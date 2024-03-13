import { TrafficNotificationModel } from "../../models/trafficNotificationModel";
import { sendTrafficNotifications } from "../../webhooks/sendTrafficNotifications";

const trafficNotificationResolver = {
    Query: {
        getTrafficNotification: async (_parent: any, args: any) => {
            return await TrafficNotificationModel.findById(args.id);
        },
        getAllTrafficNotifications: async () => {
            return await TrafficNotificationModel.find();
        },
        getTrafficNotificationsByCity: async (_parent: any, args: any) => {
            return await TrafficNotificationModel.find({ city: args.city });
        },
    },
    Mutation: {
        createTrafficNotification: async (_: void, args: any, { user }: { user: any }) => {
            if (!user) {
                throw new Error("No auth.");
            }

            const { title, content, city } = args.trafficNotificationInput;

            try {
                const newTrafficNotification = await TrafficNotificationModel.create({ title, content, city });

                const data = {
                    message: "New traffic notification",
                    data: newTrafficNotification
                };

                sendTrafficNotifications(data);

                return newTrafficNotification;
            } catch (error) {
                console.error(error);
                return { error: "An error occurred" };
            }
        },
    },
};

export default trafficNotificationResolver;