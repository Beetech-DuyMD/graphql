const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { sequelize } = require("./models");
const authMiddleware = require("./middleware/auth.js"); // Đường dẫn đến middleware

const typeDefs = require("./schema/schema.js");
const resolvers = require("./resolver/resolver.js");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    try {
      const token = req.headers.authorization;

      const user = await authMiddleware(token);
      console.log(user);
      return user;
    } catch (error) {
      // Xử lý lỗi xác thực ở đây (nếu cần)
      console.error("Authentication error:", error.message);
      return {};
    }
  },
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
