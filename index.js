require("dotenv").config();
import createServer from "./createServer";
import connectDB from "./connectDB";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import User from "./models/User";

const server = createServer();

connectDB();

server.express.use(cookieParser());

server.express.use((req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.SECRET_JWT);
    req.userId = userId;
  }
  next();
});

// 2. Create a middleware that populates the user on each request
server.express.use(async (req, res, next) => {
  // if they aren't logged in, skip this
  if (!req.userId) return next();
  const user = await User.findById(req.userId);
  req.user = user;
  next();
});

const options = {
  cors: { credentials: true, origin: process.env.FRONTEND_URL },
  debug: false,
};

server.start(options, ({ port }) => {
  console.log(`🚀 Server is now running on port http://localhost:${port}`);
});
