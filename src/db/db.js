import mongoose from "mongoose";
import { DB_NAME } from "../constant.js"
import config from "../config/config.js"

const connectDb = async () => {

    try {

        const connectionInstance = await mongoose.connect(`${config.MONGO_URI}/${DB_NAME}`);

        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
        
    } catch (error) {
        
        console.log("MONGO DB CONNECTION ERROR : ", error);

        process.exit(1);
    }
}

export default connectDb;