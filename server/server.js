import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/db.js";
dotenv.config({ path: ".env" })

import productRoutes from "./routes/products.routes.js"

const app = express();
const port = process.env.PORT || 5000

app.use(express.json())

app.use("/api/products", productRoutes);

app.listen(port, () => {
    connectDB();
    console.log(`server is running at ${port}...`)
})


// part 1 
// hours : 3 (2 - 5)
// timestamp : 45:00