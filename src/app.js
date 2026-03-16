import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import config from "./config/config.js";

const app = express();

app.use(cors({
    origin: config.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "15kb"}));
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(cookieParser());

// routes
import userRoutes from "./routes/user.routes.js"

app.use("/api/v1/user", userRoutes);

export {app};