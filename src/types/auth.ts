interface User {
  token: User | undefined;
  cnpj: string;
  email: string;
  password: string;
  has_access: boolean;
}

export { User };
