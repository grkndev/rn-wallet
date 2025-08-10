import { sql } from "../config/db.js";

export async function getTransactionsByUserId(c) {
    try {
        const userId = c.req.param("userId");
        const transactions = await sql`SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC`;
        return c.json({ data: transactions }, 200);
    } catch (err) {
        console.log("Internal server error: ", err);
        return c.json({ error: "Internal server error" }, 500);
    }
}

export async function createTransaction(c) {
    try {
        const { title, amount, category, user_id } = await c.req.json();
        if (!title || !amount || !category || !user_id) return c.json({ error: "Missing required fields" }, 400);

        const transaction = await sql`
        INSERT INTO transactions (title, amount, category, user_id)
        VALUES (${title}, ${amount}, ${category}, ${user_id})
        RETURNING *
        `;
        console.log("transaction: ", transaction);
        return c.json({ message: "Transaction created successfully", data: transaction[0] }, 201);
    } catch (err) {
        console.error("Error creating transaction:", err);
        return c.json({ error: "Failed to create transaction" }, 500);
    }
}

export async function deleteTransaction(c) {
    try {
        const id = c.req.param("id");

        if (isNaN(parseInt(id))) return c.json({ error: "Invalid transaction ID" }, 400);

        const transaction = await sql`DELETE FROM transactions WHERE id = ${id} RETURNING *`;
        if (!transaction || transaction.length === 0) return c.json({ error: "Transaction not found" }, 404);

        return c.json({ message: "Transaction deleted successfully" }, 200);
    } catch (err) {
        console.log("Internal server error: ", err);
        return c.json({ error: "Internal server error" }, 500);
    }
}

export async function getSummaryByUserId(c) {
    try {
        const userId = c.req.param("userId");

        const balanceResult = await sql`
            SELECT COALESCE(SUM(amount), 0) as balance FROM transactions WHERE user_id = ${userId}
        `;

        const incomeResult = await sql`
            SELECT COALESCE(SUM(amount), 0) as income FROM transactions WHERE user_id = ${userId} AND amount > 0
        `;

        const expenseResult = await sql`
            SELECT COALESCE(SUM(amount), 0) as expense FROM transactions WHERE user_id = ${userId} AND amount < 0
        `;



        return c.json({
            data: {
                balance: balanceResult[0].balance,
                income: incomeResult[0].income,
                expense: expenseResult[0].expense
            }
        }, 200);

    } catch (err) {
        console.log("Internal server error: ", err);
        return c.json({ error: "Internal server error" }, 500);
    }
}