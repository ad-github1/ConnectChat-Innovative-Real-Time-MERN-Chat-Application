import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token") || null,

  setUser: (user) => set({ user }),
  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ token });
  },

  login: async (email, password) => {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    set({ user: data.user, token: data.token });
  },

  register: async (username, email, password) => {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    if (!res.ok) throw new Error("Registration failed");
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
}));

export default useAuthStore;
