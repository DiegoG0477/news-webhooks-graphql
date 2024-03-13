import express, { Request } from "express";
import { ApolloServer } from "apollo-server-express";
import { loadFilesSync } from "@graphql-tools/load-files";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { authenticateJWT } from "./middlewares/authenticationJWT";
import path from "path";
import dotenv from "dotenv";
import { connectToDatabase } from "./config/database";

dotenv.config();

interface CustomRequest extends Request {
    user?: any;
}

const PORT = parseInt(process.env.PORT || "3000");

const typeDefsArray = loadFilesSync(
    path.join(__dirname, "./graphql/schemas")
);
const resolversArray = loadFilesSync(
    path.join(__dirname, "./graphql/resolvers")
);

const schema = makeExecutableSchema({
    typeDefs: typeDefsArray,
    resolvers: resolversArray,
});

const app = express();

const server = new ApolloServer({
    schema,
    context: ({ req }: { req: CustomRequest }) => ({ user: req.user }),
});

app.use("/graphql", authenticateJWT);

(async () => {
    await server.start();
    server.applyMiddleware({ app });

    await connectToDatabase();

    app.listen(PORT, () => {
        console.log(
            `Servidor GraphQL funcionando en el puerto ${PORT} con el endpoint /graphql`
        );
    });
})();