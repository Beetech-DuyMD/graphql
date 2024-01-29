const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { sequelize } = require("./models");

// Load schema & resolver
const typeDefs = require("./schema/schema.js");
const resolvers = require("./resolver/resolver.js");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();
async function init() {
  await server.start();
  server.applyMiddleware({ app });

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
init();
app.listen({ port: 4000 }, () => {
  console.log(`Server run ap http://localhost:4000${server.graphqlPath}`);
});
