// Model mongoose
import Item from "../../models/Item";
// Validator input
import { valideCreateItem } from "../../utils/validators/item";
// Error from Apollo
import { UserInputError } from "apollo-server-core";

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default {
  Query: {
    async getItems() {
      const items = await Item.find();
      return items;
    },
  },
  Mutation: {
    async createItem(_, { title, description, price, image }) {
      const { valid, errors } = valideCreateItem(title, description, price);
      if (!valid) throw new UserInputError("Errors !", { errors });

      // const { filename, createReadStream } = await image;
      // console.log(filename, createReadStream);
      console.log(title, description, price, image);

      // const newItem = new Item({
      //   title,
      //   description,
      //   price,
      // });

      // return await newItem.save();
    },
  },
};
