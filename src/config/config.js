import "dotenv/config.js"


if(!process.env.PORT) {
    throw new Error("PORT is not defined in environment variables");
}

if(!process.env.MONGO_URI){
    throw new Error("MONGO_URI is not defined in environment variables");
}

if(!process.env.CORS_ORIGIN){
    throw new Error("CORS ORIGIN is not defined in environment variables");
}

const config = {

    CORS_ORIGIN: process.env.CORS_ORIGIN,
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,

}


export default config;