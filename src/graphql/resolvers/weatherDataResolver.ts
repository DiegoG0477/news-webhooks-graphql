import { WeatherDataModel } from "../../models/weatherDataModel";
import { sendWeatherData } from "../../webhooks/sendWeatherData";

const weatherDataResolver = {
    Query: {
        getWeatherData: async (_parent: any, args: any) => {
            return await WeatherDataModel.findById(args.id);
        },
        getAllWeatherData: async () => {
            return await WeatherDataModel.find();
        },
        getWeatherDataByCity: async (_parent: any, args: any) => {
            return await WeatherDataModel.find({ city: args.city });
        },
    },
    Mutation: {
        createWeatherData: async (_: void, args: any, { user }: { user: any }) => {
            if (!user) {
                throw new Error("No auth.");
            }

            const { type, intensity, advice, event, city } = args.weatherDataInput;

            try {
                const newWeatherData = await WeatherDataModel.create({ type, intensity, advice, event, city });

                const data = {
                    message: "New weather data",
                    data: newWeatherData
                };

                sendWeatherData(data);

                return newWeatherData;
            } catch (error) {
                console.error(error);
                return { error: "An error occurred" };
            }
        },
    },
};

export default weatherDataResolver;