import { Char } from "../entities/Char";

export type CreateUser = {
  name: string;
  char: Char;
  email: string;
  is_admin: boolean;
  is_active: boolean;
  password: string;
  secret: string;
  token: string;
};
