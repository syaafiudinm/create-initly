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
    if (err.code === "ECONNABORTED") {
      throw new Error("Request timeout. check your internet");
    }
    throw new Error("Failed to fetch starter kit from server");
  }
}

export async function trackInstall(slug) {
  try {
    await axios.post(
      `${API_BASE}/starter-kits/${slug}/track-install`,
      {}
    );
  } catch (err) {
    console.debug("track install Failed:", err.message);
  }
}

export async function listStarterKits(filters = {}) {
  try{
    const params = new URLSearchParams(filters);
    const res = await axios.get(`${API_BASE}/starter-kits?${params}`, {
      timeout: 10000,
    });
    return res.data.data;
  } catch (err) {
    throw new Error("Failed to fetch starter kit from server");
  }
}
