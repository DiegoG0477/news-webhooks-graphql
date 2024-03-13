import { NewsModel } from "../../models/newsModel";
import { sendNews } from "../../webhooks/sendNews";

const newsResolver = {
    Query: {
        getNews: async (_parent: any, args: any) => {
            return await NewsModel.findById(args.id);
        },
        getAllNews: async () => {
            return await NewsModel.find();
        },
        getNewsByCity: async (_parent: any, args: any) => {
            return await NewsModel.find({ city: args.city });
        },
    },
    Mutation: {
        createNews: async (_: void, args: any, { user }: { user: any }) => {
            if (!user) {
                throw new Error(
                    "No auth."
                );
            }

            const { title, content, city } = args.newsInput;

            try {
                const newNews = await NewsModel.create({ title, content, city });

                const data = {
                    message: "New news",
                    data: newNews
                };

                sendNews(data);

                return newNews;
            } catch (error) {
                console.error(error);
                return { error: "An error" };
            }
        },
    },
};

export default newsResolver;