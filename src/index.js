import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import connectDB from './database/db.js';
import { types } from  './graphql/types.js'
import { resolvers } from  './graphql/resolvers.js'
import { validateToken } from './utils/tokenUtils.js';

dotenv.config(); //variables de entorno en toda la aplicacion

const getUserData = (token) => {
  const verificacion = validateToken(token.split(' ')[1]);
  if (verificacion.data) {
    return verificacion.data;
  } else {
    return null;
  }
};

const server = new ApolloServer({ //Crear servidor de apollo (graphql)
  typeDefs: types,
  resolvers: resolvers,
  context: ({ req }) => {
    const token = req.headers?.authorization ?? null;
    if (token) {
      const userData = getUserData(token);
      if (userData) {
        return { userData };
      }
    }
    return null;
    
  },
});

const app = express(); //Definir app express

app.use(express.json()); //Para que los request entren y salgan de tipo json (middleware)
app.use(cors());//Para que los request desde muchos origenes (middleware)

app.listen({ port: process.env.PORT || 3002 }, async () => {//Poner a correr servidor express
  await connectDB(); //Conexion BD
  await server.start();//Prender servidor apollo
  server.applyMiddleware({ app }); //Para que use los middleware
  console.log('[serverApollo] => server started');
});
