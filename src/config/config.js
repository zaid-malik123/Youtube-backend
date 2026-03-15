import "dotenv/config.js"

const {
  PORT,
  MONGO_URI,
  CORS_ORIGIN,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY
} = process.env

if (!PORT) throw new Error("PORT is missing")
if (!MONGO_URI) throw new Error("MONGO_URI is missing")
if (!CORS_ORIGIN) throw new Error("CORS_ORIGIN is missing")
if (!ACCESS_TOKEN_SECRET) throw new Error("ACCESS_TOKEN_SECRET is missing")
if (!REFRESH_TOKEN_SECRET) throw new Error("REFRESH_TOKEN_SECRET is missing")
if (!ACCESS_TOKEN_EXPIRY) throw new Error("ACCESS_TOKEN_EXPIRY is missing")
if (!REFRESH_TOKEN_EXPIRY) throw new Error("REFRESH_TOKEN_EXPIRY is missing")


export default {
  PORT,
  MONGO_URI,
  CORS_ORIGIN,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY
}