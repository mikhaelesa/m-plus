import nodePath from "node:path";

export const ADMIN_AUTH_FILE = nodePath.join(__dirname, ".auth/admin.json");
export const USER_AUTH_FILE = nodePath.join(__dirname, ".auth/user.json");
