import itemResolvers from "./item";

export default {
  // Post: {
  //   likeCount: parent => parent.likes.length,
  //   commentCount: parent => parent.comments.length
  // },
  Query: {
    ...itemResolvers.Query,
  },
  Mutation: {
    ...itemResolvers.Mutation,
  },
  // Subscription: {
  //   ...postsResolvers.Subcription
  // }
};
