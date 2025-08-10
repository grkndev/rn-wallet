import ratelimit from "../config/upstash.js";

const rateLimiter = async (c, next) => {
    try {
        const { success } = await ratelimit.limit(c.req.ip);
        if (!success) return c.json({ error: "Rate limit exceeded" }, 429);
        return next();
    } catch (err) {
        console.log("Internal server error: ", err);
        return c.json({ error: "Internal server error" }, 500);
    }
}

export default rateLimiter;