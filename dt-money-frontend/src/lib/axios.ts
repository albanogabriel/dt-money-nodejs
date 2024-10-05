import axios from "axios";

// Não precisa do Authorization
export const api = axios.create({
  baseURL: 'http://localhost:3333',
  timeout: 3000,
  withCredentials: true, // Isso é crucial para permitir cookies
})
