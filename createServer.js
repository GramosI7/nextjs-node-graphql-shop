import { GraphQLServer } from "graphql-yoga";
import resolvers from "./graphql/resolvers";

export default function createServer() {
  return new GraphQLServer({ typeDefs: "graphql/schema.graphql", resolvers, context: (req) => ({ ...req }) });
}
