const Item = require("../../models/Item");
const valideCreateItem = require("../../utils/validators/item");
const { UserInputError } = require("apollo-server-core");

module.exports = {
  Query: {
    async getItems() {
      const items = await Item.find();
      return items;
    },
  },
  Mutation: {
    async createItem(_, { title, description, price }) {
      const { valid, errors } = valideCreateItem(title, description, price);
      if (!valid) throw new UserInputError("Errors !", { errors });

      const newItem = new Item({
        title,
        description,
        price,
      });

      return await newItem.save();
    },
  },
};
