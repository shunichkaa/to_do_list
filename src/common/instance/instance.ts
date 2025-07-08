import axios from "axios"

const token = "4602c190-f312-4606-8d5e-63292b6fcc90"
const apiKey = "aead73e0-31a7-45df-915a-674b7df536eb"

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
    "API-KEY": import.meta.env.VITE_API_KEY,
  },
})
