import mongoose from "mongoose";
const { connect } = mongoose;
import dotenv from "dotenv";
dotenv.config();

async function main() {
  await connect(process.env.MONGO_URI);
}

main().catch((error) => console.log(error));

export default mongoose;
