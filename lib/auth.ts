import { AuthM } from "@/models/Auth";

export const checkUserRole = (user: AuthM): string => {
  return user.role;
};
