// Model mongoose
import User from "../../models/User";

// Validator input
import { validateRegisterInput, validateLoginInput } from "../../utils/validators/user";

// Error from Apollo
import { UserInputError } from "apollo-server-core";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { hasPermission } from "../../utils/hasPermission";

export default {
  Query: {
    async me(_, __, ctx) {
      if (!ctx.request.userId) {
        return null;
      }
      return await User.findById(ctx.request.userId);
    },
    async users(_, __, ctx) {
      if (!ctx.request.userId) {
        throw new Error("Sorry, you must be logged in to do that !");
      }

      hasPermission(ctx.request.user, ["ROOT"]);
      return await User.find({ role: { $ne: "ROOT" } });
    },
  },
  Mutation: {
    async register(_, { registerInput: { username, email, password, confirmPassword } }, ctx) {
      const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword);
      if (!valid) throw new UserInputError("Errors !", { errors });

      const isUsername = await User.findOne({ username });

      if (isUsername) {
        throw new UserInputError("Username is taken", {
          errors: {
            username: "Sorry, this username is already taken.",
          },
        });
      }

      const isEmail = await User.findOne({ email });
      if (isEmail) {
        throw new UserInputError("Email is taken", {
          errors: {
            email: "Sorry, this email is taken.",
          },
        });
      }

      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        role: "USER",
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = jwt.sign({ userId: res.id }, process.env.SECRET_JWT);

      ctx.response.cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365,
      });

      return res;
    },
    async login(_, { loginInput: { email, password } }, ctx) {
      const { valid, errors } = validateLoginInput(email, password);
      if (!valid) throw new UserInputError("Errors !", { errors });

      const user = await User.findOne({ email });

      if (!user) {
        throw new UserInputError("Email not found.", {
          errors: {
            email: "Sorry, this email doesn't exist.",
          },
        });
      }

      const goodPassword = await bcrypt.compare(password, user.password);

      if (!goodPassword) {
        throw new UserInputError("Password is invalid.", {
          errors: {
            password: "Sorry, password is invalid.",
          },
        });
      }

      // 3. generate the JWT Token
      const token = jwt.sign({ userId: user.id }, process.env.SECRET_JWT);

      // 4. Set the cookie with the token
      ctx.response.cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365,
      });
      // 5. Return the user
      return user;
    },
    logout(_, __, ctx) {
      ctx.response.clearCookie("token");
      return { message: "Goodbye!" };
    },
    async updatePermission(_, { permission, _id }, ctx) {
      if (!ctx.request.userId) {
        throw new Error("Sorry, you must be logged in to do that !");
      }

      hasPermission(ctx.request.user, "ROOT");

      const userUpdate = await User.findByIdAndUpdate(
        _id,
        { role: permission },
        {
          new: true,
        }
      );

      return userUpdate;
    },
  },
};
