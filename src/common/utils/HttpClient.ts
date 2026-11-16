import axios from "axios";
import { VITE_API_ROOT } from "../config";

export const api = axios.create({
  baseURL: VITE_API_ROOT,
});
