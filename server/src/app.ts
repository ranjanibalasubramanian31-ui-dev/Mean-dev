import "dotenv/config";
import express from "express";
import { connectDB } from "./config/database.js";
import policyRoutes from "./routes/policy.routes.js";
import cors from "cors";
const app = express();

app.use( cors({
    origin: "http://localhost:4200",
  }));

app.use(express.json());

app.use("/api/policies", policyRoutes);

const PORT = Number(process.env.PORT) || 3000;

async function startServer(): Promise<void> {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (error: unknown) {
    console.error(
      "Application startup failed:",
      error instanceof Error ? error.message : error
    );

    process.exit(1);
  }
}

void startServer();