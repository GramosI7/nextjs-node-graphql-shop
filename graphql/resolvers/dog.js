module.exports = {
  Query: {
    dogs() {
      return [{ name: "Snickers" }, { name: "Sunny" }];
    },
  },
  Mutation: {
    createDog(_, { name }) {
      return {
        name: name,
      };
    },
  },
};
