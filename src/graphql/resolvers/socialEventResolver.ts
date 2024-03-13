import { SocialEventModel } from "../../models/socialEventModel";
import { sendSocialEvents } from "../../webhooks/sendSocialEvents";

const socialEventResolver = {
    Query: {
        socialEvent: async (_parent: any, args: any) => {
            return await SocialEventModel.findById(args.id);
        },
        socialEvents: async () => {
            return await SocialEventModel.find();
        },
        getSocialEventsByCity: async (_parent: any, args: any) => {
            return await SocialEventModel.find({ city: args.city });
        },
    },
    Mutation: {
        createSocialEvent: async (_: void, args: any, { user }: { user: any }) => {
            if (!user) {
                throw new Error("No auth.");
            }

            const { type, name, city, date } = args.socialEventInput;

            try {
                const newSocialEvent = await SocialEventModel.create({ type, name, city, date });

                const data = {
                    message: "New social event",
                    data: newSocialEvent
                };

                sendSocialEvents(data);

                return newSocialEvent;
            } catch (error) {
                console.error(error);
                return { error: "An error occurred" };
            }
        },
    },
};

export default socialEventResolver;