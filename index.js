require("dotenv").config();
import createServer from "./createServer";
import connectDB from "./connectDB";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

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

const options = {
  cors: { credentials: true, origin: process.env.FRONTEND_URL },
  debug: false,
};

server.start(options, ({ port }) => {
  console.log(`🚀 Server is now running on port http://localhost:${port}`);
});
