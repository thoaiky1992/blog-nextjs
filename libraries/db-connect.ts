import { MONGODB_URI } from "@/constants";
import mongoose, { ConnectOptions } from "mongoose";

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

const connection: any = {}; /* creating connection object*/

type ConnectionOptionsExtend = {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
};

const options: ConnectOptions & ConnectionOptionsExtend = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export async function connectDB() {
  /* check if we have connection to our databse*/
  if (connection.isConnected) {
    return;
  }

  /* connecting to our database */
  const db: any = await mongoose.connect(MONGODB_URI, options);
  require("@/models/post");
  require("@/models/category");
  require("@/models/user");
  require("@/models/subcribe");

  connection.isConnected = db.connections[0].readyState;
}
