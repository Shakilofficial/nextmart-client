export interface IUser {
  userId: string;
  name: string;
  email: string;
  role: "admin" | "user";
  hasShop?: boolean;
  isActive?: boolean;
  iat?: number;
  exp?: number;
}
