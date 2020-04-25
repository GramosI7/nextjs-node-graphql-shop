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
      try {
        return await Item.findById(_id);
      } catch (error) {
        throw new UserInputError("Errors !", { general: "Sorry, some errors in server 😔" });
      }
    },
    async getLimitItem(_, { limit }) {
      try {
        return await Item.find().limit(limit);
      } catch (error) {
        throw new UserInputError("Errors !", { general: "Sorry, some errors in server 😔" });
      }
    },
    async getItems() {
      try {
        const items = await Item.find();
        return items;
      } catch (error) {
        throw new UserInputError("Errors !", { general: "Sorry, some errors in server 😔" });
      }
    },
  },
  Mutation: {
    async deleteItem(_, { _id }, ctx) {
      if (!ctx.request.userId) {
        throw new UserInputError("Errors !", { general: "Sorry, you must be logged in to do that !" });
      }

      hasPermission(ctx.request.user, ["ADMIN"]);

      try {
        return await Item.findByIdAndDelete(_id);
      } catch (error) {
        throw Error("Error, no item found !");
      }
    },
    async updateItem(_, { _id, title, description, price }, ctx) {
      if (!ctx.request.userId) {
        throw new Error("Sorry, you must be logged in to do that !");
      }

      hasPermission(ctx.request.user, ["ROOT", "ADMIN"]);

      const { valid, errors } = valideCreateItem(title, description, price);
      if (!valid) throw new UserInputError("Errors !", { errors });

      const contenuFields = {
        title,
        description,
        price,
      };

      try {
        return await Item.findByIdAndUpdate(_id, { $set: contenuFields }, { new: true, upsert: true });
      } catch (error) {
        throw new Error("Error, some error in db !");
      }

      return itemUpdate;
    },
    async createItem(_, { title, description, price, image }, ctx) {
      if (!ctx.request.userId) {
        throw new Error("Sorry, you must be logged in to do that !");
      }

      hasPermission(ctx.request.user, ["ROOT", "ADMIN"]);

      const { valid, errors } = valideCreateItem(title, description, price, image);
      if (!valid) throw new UserInputError("Errors !", { errors });

      try {
        const newItem = new Item({
          title,
          description,
          price,
          image,
        });
        return await newItem.save();
      } catch (error) {
        throw new Error("Sorry, some error in database !");
      }
    },
  },
};
