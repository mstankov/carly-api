// Express server with GraphQL
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import bodyParser from 'body-parser';
import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';

// express
const init = () => {
    const server = new ApolloServer({ typeDefs, resolvers });
    const app = express();

    app.use(
        cors(),
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true })
    );

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
        );
        next();
    });

    server.applyMiddleware({ app });

    app.listen({ port: 4200 }, () => {
        console.log(`listening to port 4200:${server.graphqlPath}`);
    });
}

export { init };