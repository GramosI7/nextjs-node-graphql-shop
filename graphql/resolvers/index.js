const itemResolvers = require("./item");

module.exports = {
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
