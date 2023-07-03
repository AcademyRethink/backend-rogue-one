interface User {
  token: string | null;
  cnpj: string;
  email: string;
  password: string;
  has_access: boolean;
}

export { User };
