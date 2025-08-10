import { Hono } from "hono";
import { serve } from "@hono/node-server";
import dotenv from "dotenv";
import { initDb } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import transactionsRoute from "./routes/transactions.route.js";

dotenv.config();
const PORT = process.env.PORT || 5001;

const app = new Hono();

app.use("*", rateLimiter);

app.get("/status", (c) => c.json({ status: "ok" }, 200));
app.route("/api/transactions", transactionsRoute);

initDb().then(() => {
    serve({
        fetch: app.fetch,
        port: PORT,
    }).once("listening", () => {
        console.log(`Server is running on port ${PORT}.`);
    });
});
