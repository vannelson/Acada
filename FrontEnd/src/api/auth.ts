import { API_BASE_URL} from './index';

export interface LoginResponse {
  user: {
    id: number;
    email: string;
    name?: string;
  };
  token: string;
}

export async function loginAuth(email: string, password: string): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/auths/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error(`Failed to login. Status: ${response.status}`);
  }

  const result = await response.json();
  const loginResponse = result.data as LoginResponse;
  
  // Store token and user details in localStorage
  localStorage.setItem('auth', JSON.stringify({
    token: loginResponse.token,
    user: loginResponse.user,
  }));

  return loginResponse;
}

export function logoutAuth(): void {
  localStorage.removeItem('auth');
}
