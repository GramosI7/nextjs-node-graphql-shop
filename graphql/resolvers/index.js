import itemResolvers from "./item";
import userResolvers from "./user";

export default {
  Query: {
    ...itemResolvers.Query,
    ...userResolvers.Query,
  },
  Mutation: {
    ...itemResolvers.Mutation,
    ...userResolvers.Mutation,
  },
  // Subscription: {
  //   ...postsResolvers.Subcription
  // }
};
