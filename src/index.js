import connectDb from "./db/db.js";
import { app } from "./app.js";
import config from "./config/config.js";

connectDb()
.then(() => {

    const server = app.listen(config.PORT, () => {
        console.log(`Server running on http://localhost:${config.PORT}`);
    });

    server.on("error", (err) => {
        console.log("Server error:", err);
    });

})
.catch((err) => {

    console.log("MongoDB connection failed:", err);
    process.exit(1);

});