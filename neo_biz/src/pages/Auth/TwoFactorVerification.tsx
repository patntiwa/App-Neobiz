// src/pages/Auth/TwoFactorVerification.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/axios";
import PublicLayout from "../../components/layouts/PublicLayout";

export default function TwoFactorVerification() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await api.post("/verify2fa", { code });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Code invalide");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicLayout>
      <form
        onSubmit={handleSubmit}
        className="w-full space-y-6 bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-md"
      >
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Vérification en 2 étapes
        </h2>

        {error && (
          <div className="text-sm text-red-500 text-center">{error}</div>
        )}

        <div>
          <label className="block mb-1 text-sm text-gray-700 dark:text-gray-300">
            Code de vérification
          </label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition disabled:opacity-50"
        >
          {loading ? "Vérification..." : "Vérifier"}
        </button>
      </form>
    </PublicLayout>
  );
}

