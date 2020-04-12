// Model mongoose
import Item from "../../models/Item";
// Validator input
import { valideCreateItem } from "../../utils/validators/item";
// Error from Apollo
import { UserInputError } from "apollo-server-core";

export default {
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
