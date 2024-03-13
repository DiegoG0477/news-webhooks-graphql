import { ConsumerModel } from "../../models/consumerModel";

const consumerResolver = {
    Query: {
        getAllConsumers: async () => {
            return await ConsumerModel.find();
        },
        getConsumer: async (_: any, { id }: { id: string }) => {
            return await ConsumerModel.findOne({ id });
        },
        getConsumerPaginated: async (
            _: any,
            { page, limit }: { page: number; limit: number }
        ) => {
            return await ConsumerModel.find()
                .skip((page - 1) * limit)
                .limit(limit);
        },
        getConsumerByUrl: async (_: any, { url }: { url: string }) => {
            return await ConsumerModel.findOne({ url });
        },
    },
    Mutation: {
        createConsumer: async (
            _: any,
            { consumerInput }: { consumerInput: any },
            { user }: { user: any }
        ) => {
            if (!user) {
                throw new Error(
                    "No authentication. Please, provide a valid token."
                );
            }

            const { url, news, trafficNotifications, weather, socialEvents } =
                consumerInput;
            const existingConsumer = await ConsumerModel.findOne({ url });
            if (existingConsumer) {
                throw new Error("Consumer already exists");
            }
            const newConsumer = new ConsumerModel({
                url,
                news,
                trafficNotifications,
                weather,
                socialEvents,
            });
            return await newConsumer.save();
        },

        deleteConsumer: async (
            _: any,
            { id }: { id: string },
            { user }: { user: any }
        ) => {
            if (!user) {
                throw new Error(
                    "No authentication. Please, provide a valid token."
                );
            }
            return await ConsumerModel.findByIdAndDelete(id);
        },

        updateConsumer: async (
            _: any,
            { id, consumerInput }: { id: string; consumerInput: any },
            { user }: { user: any }
        ) => {
            if (!user) {
                throw new Error(
                    "No authentication. Please, provide a valid token."
                );
            }

            return await ConsumerModel.findByIdAndUpdate(id, consumerInput, {
                new: true,
            });
        },
    },
};

export default consumerResolver;
