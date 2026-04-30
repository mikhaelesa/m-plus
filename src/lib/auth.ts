import { jwtVerify, SignJWT } from "jose";

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface JWTPayload {
  id: string;
  email: string;
  role: UserRole;
}

export const DUMMY_USERS = [
  {
    id: "1",
    email: "admin@mail.com",
    password: "password123",
    name: "Admin",
    role: UserRole.ADMIN,
  },
  {
    id: "2",
    email: "user@mail.com",
    password: "password123",
    name: "Regular User",
    role: UserRole.USER,
  },
];

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || "rahasia_negara_jangan_bocor",
);

export const AuthService = {
  async generateToken(payload: JWTPayload) {
    return new SignJWT({ ...payload })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("2h")
      .sign(SECRET_KEY);
  },
  async verifyToken(token: string) {
    try {
      const { payload } = await jwtVerify(token, SECRET_KEY);
      return payload as unknown as JWTPayload;
    } catch {
      return null;
    }
  },
};
