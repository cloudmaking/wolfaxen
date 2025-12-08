import { authMiddleware } from "../../../middleware/auth.ts";

export const handler = authMiddleware;
