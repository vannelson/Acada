export const API_BASE_URL = 'http://localhost:3000/api';

export function getBearerToken(): string | null {
  const authData = localStorage.getItem('auth');
  if (authData) {
    try {
      const parsed = JSON.parse(authData);
      return parsed.token || null;
    } catch (error) {
      console.error('Error parsing auth data:', error);
      return null;
    }
  }
  return null;
}
