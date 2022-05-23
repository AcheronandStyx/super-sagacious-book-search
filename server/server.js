const express = require("express");
const path = require("path");
const { ApolloServer } = require("apollo-server-express"); // Bring in Apollo server
const { typeDefs, resolvers } = require("./schemas"); // import our typeDefs and resolvers
const db = require("./config/connection");
const routes = require("./routes");

const PORT = process.env.PORT || 3001;

//create the apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// create new instance of apollor server with graphql syntax loaded
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  //insert apollor server as middleware in the express application
  server.applyMiddleware({ app });

  // Serve up static assets
  // First, we check to see if the Node environment is in production.
  // If it is, we instruct the Express.js server to serve any files in the React application's build directory in the client folder.
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));
  }

  // if we make a GET request to any location on the server that doesn't have an explicit route defined, respond with the production-ready React front-end code.
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      // test graphQL here
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);

// app.use(routes); // remove dis later