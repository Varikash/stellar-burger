import { BASE_URL } from "./url";
import { 
  FetchIngredients, 
  SendEmail,
  RegisterUser,
  LogginUser,
  FetchUser,
  RefreshUser,
  LogOut,
  SendNewPass
} from "./ApiResponse.types";

type EmailForm = {
  email: string;
}

export type RegisterAndUpdate = EmailForm & {
  name: string;
  password: string;
}

export type LogginForm = EmailForm & {
  password: string;
}

export type NewPassForm = {
  password: string;
  token: string;
}

export const getResponseData = async <T>(res: Response): Promise<T> => {
  if (res.ok) {
    const jsonData: T = await res.json();
    return jsonData;
  } else {
    throw new Error(`Ошибка ${res.status}: ${res.statusText}`);
  }
};

const request = <T>(url: string, options?: RequestInit): Promise<T> => {
  return fetch(url, options).then(response => getResponseData<T>(response));
};

export const getIngredients = (): Promise<FetchIngredients> => {
  return request(`${BASE_URL}/ingredients`);
};

export const sendEmail = (data: string): Promise<SendEmail> => {
  return request(`${BASE_URL}/password-reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: data
    }),
  });
};

export const registerUser = (form: RegisterAndUpdate): Promise<RegisterUser> => {
  return request(`${BASE_URL}/auth/register`,
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(form)
    });
};

export const logginUser = (form: LogginForm): Promise<LogginUser> => {
  return request(`${BASE_URL}/auth/login`,
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(form)
    });
};

export const fetchUser = (token: string): Promise<FetchUser> => {
  return request(`${BASE_URL}/auth/user`,
    {
      method: 'GET',
      headers: {
        authorization: token,
      },
    });
};

export const refreshUser = (token: string): Promise<RefreshUser> => {
  return request(`${BASE_URL}/auth/token`, 
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        token: token,
      }),
    });
};

export const updateUser = (token: string, form: RegisterAndUpdate): Promise<FetchUser> => {
  return request(`${BASE_URL}/auth/user`,
    {
      method: 'PATCH',
      headers: {
        authorization: token,
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(form),
    });
};

export const logOut = (refreshToken: string): Promise<LogOut> => {
  return request(`${BASE_URL}/auth/logout`, 
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        token: refreshToken,
      }),
    });
};

export const sendNewPass = (form: NewPassForm): Promise<SendNewPass> => {
    return request(`${BASE_URL}/password-reset/reset`,
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(form),
      });
};