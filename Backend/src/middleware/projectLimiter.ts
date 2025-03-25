import rateLimit from "express-rate-limit";
import { Request, Response } from "express";

const projectLimiter = rateLimit({
  windowMs: 6 * 60 * 60 * 1000, // 6 hours
  max: 500, 
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message: "Too many requests to Project API, try again later.",
    });
  },
});

export default projectLimiter;
