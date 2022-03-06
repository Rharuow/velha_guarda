export type CreateUser = {
  name: string;
  email: string;
  is_admin: boolean;
  is_active: boolean;
  password: string;
  secret: string;
  token: string;
};
