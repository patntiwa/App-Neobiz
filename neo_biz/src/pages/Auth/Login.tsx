// src/pages/Auth/Login.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/axios";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await api.get("/sanctum/csrf-cookie");
      const res = await api.post("/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/auth-redirect");
    } catch (err: any) {
      setError(err.response?.data?.message || "Échec de la connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md p-8 space-y-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md"
      >
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Connexion à NeoBiz
        </h2>

        {error && (
          <div className="text-sm text-red-500 text-center">{error}</div>
        )}

        <div>
          <label className="block mb-1 text-sm text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm text-gray-700 dark:text-gray-300">
            Mot de passe
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition disabled:opacity-50"
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </div>
  );
}
