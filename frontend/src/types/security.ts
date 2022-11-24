export interface User {
  email: string;
  password: string;
  admin: boolean;
}

export interface SecuritySettings {
  email: User[];
  jwt_secret: string;
}
