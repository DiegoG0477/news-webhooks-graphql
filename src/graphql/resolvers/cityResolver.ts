import { CityModel } from "../../models/cityModel";

const cityResolver = {
    Query: {
        getCity: async (_parent: any, args: any) => {
            await CityModel.findById(args.id);
        },

        getCitiesPaginated: async (
            _: any,
            { page, limit }: { page: number; limit: number }
        ) => {
            const offset = (page - 1) * limit;
            const products = await CityModel.find().skip(offset).limit(limit);
            return products;
        },

        getAllCities: async () => {
            return await CityModel.find();
        },
    },
    Mutation: {
        createCity: async (_: void, args: any, { user }: { user: any }) => {
            if (!user) {
                throw new Error(
                    "No autenticado. Debe iniciar sesión para realizar esta acción."
                );
            }
    
            const { name, country } = args.cityInput;
    
            try {
                const newCity = await CityModel.create({ name, country });
    
                return newCity;
            } catch (error) {
                console.error(error);
                return { error: "An error" };
            }
        },
        updateCity: async (_: void, args: any, { user }: { user: any }) => {
            if (!user) {
                throw new Error(
                    "No auth"
                );
            }

            const { name, country } = args.city;
            try {
                const updatedCity = await CityModel.findByIdAndUpdate(args.id, {
                    name,
                    country,
                });

                return updatedCity;
            } catch (error) {
                console.error(error);
                return { error: "An error" };
            }
        },
        deleteCity: async (_: void, args: any, { user }: { user: any }) => {
            if (!user) {
                throw new Error(
                    "No auth."
                );
            }

            try {
                const deleteCity = await CityModel.findByIdAndDelete(args.id);

                return deleteCity;
            } catch (error) {
                console.error(error);
                return { error: "An error" };
            }
        },
    },
};

export default cityResolver;
