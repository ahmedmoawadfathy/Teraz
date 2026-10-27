export type Account = {
  fullName: string;
  email: string;
  password: string;
};

const accounts: Account[] = [{ fullName: 'Ahmed Moawad', email: 'ahmed@example.com', password: 'password123' }];

const sameEmail = (a: string, b: string) => a.trim().toLowerCase() === b.trim().toLowerCase();

export function createAccount(account: Account): boolean {
  if (accounts.some((a) => sameEmail(a.email, account.email))) return false;
  accounts.push({ ...account, email: account.email.trim() });
  return true;
}

export function signIn(email: string, password: string): Account | null {
  return accounts.find((a) => sameEmail(a.email, email) && a.password === password) ?? null;
}
