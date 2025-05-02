// src/pages/Auth/EmailVerificationNotice.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/axios";

export default function EmailVerificationNotice() {
  const navigate = useNavigate();
  const [resent, setResent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleResend = async () => {
    try {
      await api.post("/email/verification-notification");
      setResent(true);
      setError(null);
    } catch (err: any) {
      setError("Erreur lors de l'envoi de l'email.");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Vérification de l'e-mail requise
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          Un lien de confirmation vous a été envoyé. Veuillez vérifier votre boîte de réception avant de continuer.
        </p>

        {resent && (
          <p className="text-green-500 text-sm">
            Un nouveau lien de vérification a été envoyé.
          </p>
        )}

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={handleResend}
          className="mt-4 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md"
        >
          Renvoyer l'e-mail de vérification
        </button>
      </div>
    </div>
  );
}
