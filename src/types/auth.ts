export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface JWTPayload {
  id: string;
  email: string;
  role: UserRole;
}
