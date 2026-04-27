import { Request, Response, NextFunction } from "express";
import { setTenantSchema } from "../db/pool";

export const tenantMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = req.headers["x-schema"] as string;
  if (!schema) {
    return res.status(401).json({ error: "Schema no definido" });
  }
  await setTenantSchema(schema);
  next();
};