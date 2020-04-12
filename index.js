require("dotenv").config();
const createServer = require("./createServer");
const connectDB = require("./connectDB");

const server = createServer();

connectDB();

const options = {
  cors: { credentials: true, origin: process.env.FRONTEND_URL },
  debug: false,
};

server.start(options, ({ port }) => {
  console.log(`🚀 Server is now running on port http://localhost:${port}`);
});
