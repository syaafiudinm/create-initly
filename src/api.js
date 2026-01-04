import axios from "axios";

const API_BASE = "https://initly.dev/api/v1";

export async function getStarterKit(slug) {
  try {
    const res = await axios.get(`${API_BASE}/starter-kits/${slug}`, {
      timeout: 10000,
    });
    return res.data.data;
  } catch (err) {
    if (err.response?.status === 404) {
      throw new Error(`Starter kit "${slug}" not found`);
    }
    throw new Error("Failed to fetch starter kit from server");
  }
}
