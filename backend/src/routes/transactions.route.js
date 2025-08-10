import { Hono } from "hono";
import { sql } from "../config/db.js";
import { createTransaction, deleteTransaction, getSummaryByUserId, getTransactionsByUserId } from "../controllers/transactions.controller.js";

const transactionsRoute = new Hono();


transactionsRoute.get("/summary/:userId", getSummaryByUserId);
transactionsRoute.get("/:userId", getTransactionsByUserId);

transactionsRoute.post("/", createTransaction);

transactionsRoute.delete("/:id", deleteTransaction);


export default transactionsRoute;