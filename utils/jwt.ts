import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

export const generateToken = (userId: number): string => {
  return jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: "1h" });
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    throw new Error("Token inválido");
  }
};
