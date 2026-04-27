import express from "express";
import cors from "cors";
import securityRoutes from "./infrastructure/routes/routes";
import { tenantMiddleware } from "./infrastructure/middleware/middleware";

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  req.url = req.url.replace(/^\/[^\/]+/, "");
  next();
});

app.use(tenantMiddleware);
app.use("/security", securityRoutes);

export default app;