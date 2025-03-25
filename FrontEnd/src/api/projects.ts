import { API_BASE_URL, getBearerToken } from './index';

export interface Project {
  id: number;
  name: string;
  description: string;
}

export async function fetchProjects(start: number, length: number): Promise<Project[]> {
  const token = getBearerToken();

  const response = await fetch(`${API_BASE_URL}/projects?start=${start}&length=${length}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch projects. Status: ${response.status}`);
  }

  const result = await response.json();
  return result.data.data as Project[];
}
