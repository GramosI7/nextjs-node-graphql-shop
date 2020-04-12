const { GraphQLServer } = require("graphql-yoga");

const resolvers = require("./graphql/resolvers");

function createServer() {
  return new GraphQLServer({ typeDefs: "graphql/schema.graphql", resolvers, context: (req) => ({ ...req }) });
}

module.exports = createServer;
