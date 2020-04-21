// Model mongoose
import Item from "../../models/Item";
// Validator input
import { valideCreateItem } from "../../utils/validators/item";
// Error from Apollo
import { UserInputError } from "apollo-server-core";

import { hasPermission } from "../../utils/hasPermission";

export default {
  Query: {
    async getItem(_, { _id }) {
      const item = await Item.findById(_id);
      return item;
    },
    async getLimitItem(_, { limit }) {
      const items = await Item.find().limit(limit);
      return items;
    },
    async getItems() {
      const items = await Item.find();
      return items;
    },
  },
  Mutation: {
    async createItem(_, { title, description, price, image }) {
      if (!ctx.request.userId) {
        throw new Error("Sorry, you must be logged in to do that !");
      }

      hasPermission(ctx.request.user, "ROOT");

      const { valid, errors } = valideCreateItem(title, description, price, image);
      if (!valid) throw new UserInputError("Errors !", { errors });

      const newItem = new Item({
        title,
        description,
        price,
        image,
      });

      return await newItem.save();
    },
  },
};
