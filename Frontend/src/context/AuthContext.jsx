import { createContext, useContext, useEffect, useState, useCallback } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // true while we check for an existing session

  function normalizeUser(userData) {
    if (!userData) return null;
    const id = userData.id || userData._id;
    return { ...userData, id, _id: id };
  }

  // On first load, if a token is stored, fetch the profile to hydrate `user`
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    api
      .get("/auth/profile")
      .then((res) => setUser(normalizeUser(res.data.user ?? res.data)))
      .catch(() => localStorage.removeItem("token"))
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    const normUser = normalizeUser(res.data.user);
    setUser(normUser);
    return normUser;
  }, []);

  // payload can be a plain object (JSON) or a FormData instance (avatar upload)
  const register = useCallback(async (payload) => {
    const isFormData = payload instanceof FormData;
    const res = await api.post("/auth/register", payload, {
      headers: isFormData ? { "Content-Type": "multipart/form-data" } : undefined,
    });
    localStorage.setItem("token", res.data.token);
    const normUser = normalizeUser(res.data.user);
    setUser(normUser);
    return normUser;
  }, []);

  const updateProfile = useCallback(async (payload) => {
    const isFormData = payload instanceof FormData;
    const res = await api.put("/auth/profile", payload, {
      headers: isFormData ? { "Content-Type": "multipart/form-data" } : undefined,
    });
    const updatedUser = normalizeUser(res.data.user ?? res.data);
    setUser(updatedUser);
    return updatedUser;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
