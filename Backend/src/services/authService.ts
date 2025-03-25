import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import config from "../config"; // Import config

const prisma = new PrismaClient();

class AuthService {
  static async register({ email, name, password }: { email: string; name?: string; password: string }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, name, password: hashedPassword },
    });

    const token = jwt.sign({ userId: user.id, email: user.email }, config.JWT_SECRET, { expiresIn: "1h" });

    return { user, token };
  }

  static async login({ email, password }: { email: string; password: string }) {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid email or password");
    }
    const token = jwt.sign({ userId: user.id, email: user.email }, config.JWT_SECRET, { expiresIn: "1h" });
    return {user,token};
    
  }
}

export default AuthService;
