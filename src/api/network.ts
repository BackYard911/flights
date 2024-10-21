// network.ts

import { buildQueryString } from "../utils/helpers";
import { getRefreshToken, logout } from "./auth";

const BASE_URL = "http://localhost:3000";

const request = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
      ...options.headers,
    },
    ...options,
  });

  if (response.status === 400) {
    const error = await response.json();
    return Promise.reject(error.code);
  }
  if (response.status === 401) {
      try {
        await getRefreshToken();
      } catch {
        logout();
      }
  }
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};

// Helper functions for HTTP methods
export const get = <T>(
  url: string,
  params?: Record<string, string | number>,
  options?: RequestInit
) => {
  const fullUrl = `${BASE_URL}${url}${buildQueryString(params || {})}`;
  return request<T>(fullUrl, { ...options, method: "GET" });
};

export const post = <T>(url: string, body: object, options?: RequestInit, isFormData?: boolean) =>
  request<T>(`${BASE_URL}${url}`, {
    ...options,
    method: "POST",
    body: isFormData ? body as FormData : JSON.stringify(body),
  });

export const put = <T>(url: string, body: object, options?: RequestInit, isFormData?: boolean) =>
  request<T>(`${BASE_URL}${url}`, {
    ...options,
    method: "PUT",
    body: isFormData ? body as FormData : JSON.stringify(body),
  });

export const del = <T>(url: string, options?: RequestInit) =>
  request<T>(`${BASE_URL}${url}`, { ...options, method: "DELETE" });
