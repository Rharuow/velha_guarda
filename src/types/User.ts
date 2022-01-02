import { Char } from "../entities/Char";

export type CreateUser = {
  name: string;
  chars: Array<Char>;
  email: string;
  is_admin: boolean;
  password: string;
  secret: string;
  token: string;
};
