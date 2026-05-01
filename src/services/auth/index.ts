import { type JWTPayload, jwtVerify, SignJWT } from "jose";

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
