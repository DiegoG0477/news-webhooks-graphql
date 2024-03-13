import { UserModel } from '../../models/userModel';
import { generateToken } from '../../middlewares/authenticationJWT';

const userResolver = {
    Query: {
        getUser: async (_: any, { id }: { id: string }) => {
            return UserModel.findById(id);
        },
        getUsersPaginated: async (_: any, { page, limit }: { page: number, limit: number }) => {
            return UserModel.find().skip((page - 1) * limit).limit(limit);
        }
    },
    Mutation: {
        register: async (_: any, { userInput }: { userInput: any }) => {

            const { email, password } = userInput;
            const existingUser = await UserModel.exists({ email });
            if (existingUser) {
                throw new Error('Email already exists');
            }
            const newUser = new UserModel({
                email,
                password
            });

            return newUser.save();
        },
        
        login: async (_: any, { userInput }: { userInput: any }) => {
            const { email, password } = userInput;
            const user = await UserModel.findOne({ email });
        
            if (!user) {
                throw new Error('User not found');
            }
        
            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                throw new Error('Invalid password');
            }
        
            const token = generateToken(email);
        
            return { token };
        },
        
        deleteUser: async (_: any, { id }: { id: string }) => {
            await UserModel.findByIdAndDelete(id);
            return true;
        },

        updateUser: async (_: any, { id, userInput }: { id: string, userInput: any }) => {
            return UserModel.findByIdAndUpdate(id, userInput, { new: true });
        }
    }
};

export default userResolver;