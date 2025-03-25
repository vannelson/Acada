import { Request, Response } from "express";
import AuthService from "../services/authService";
import ResponseUtil from "../base/utils/response";

class AuthController {
  /**
   * Register a new user
   */
  static async register(req: Request, res: Response) {
    try {
      const { email, password, name } = req.body;
      const user = await AuthService.register({ email, password, name });

      ResponseUtil.success(res, user, "User registered successfully!", 201);
    } catch (error) {
      ResponseUtil.error(res, "Registration failed", error);
    }
  }

   /**
   * User Login
   */
   static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const token = await AuthService.login({ email, password });

      ResponseUtil.success(res, token, "Login successful");
    } catch (error) {
      ResponseUtil.error(res, "Login failed", error);
    }
  }

}

export default AuthController;
