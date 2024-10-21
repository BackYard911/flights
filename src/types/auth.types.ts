interface ISignupPayload {
  name: string;
  email: string;
  password: string;
}

interface ILoginPayload {
  email: string;
  password: string;
}

interface ILoginResponse {
  token: string;
  refreshToken: string;
  email: string;
  id: string;
  name: string;
}

export type { ISignupPayload, ILoginPayload, ILoginResponse };
