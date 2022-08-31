import { MongoClient, Db, MongoClientOptions } from "mongodb";

let uri = process.env.NEXT_PUBLIC_MONGODB_URI;
let dbName = process.env.NEXT_PUBLIC_MONGODB_DB;

let cachedClient: MongoClient;
let cachedDb: Db;

type ConnectionOptionsExtend = {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
};

const options: MongoClientOptions & ConnectionOptionsExtend = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

if (!uri) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

if (!dbName) {
  throw new Error(
    "Please define the MONGODB_DB environment variable inside .env.local"
  );
}

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client: MongoClient = new MongoClient(String(uri), options);

  await client.connect();

  const db: Db = client.db(dbName);

  cachedClient = client;

  cachedDb = db;

  return { client, db };
}
