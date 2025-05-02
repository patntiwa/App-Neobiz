// src/hooks/useAuthRedirect.ts
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/axios";

export default function useAuthRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkStatus = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const { data } = await api.get("/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { email_verified, requires_2fa } = data.user;

        if (!email_verified) {
          navigate("/verify-email");
        } else if (requires_2fa) {
          navigate("/verify-2fa");
        } else {
          navigate("/dashboard");
        }
      } catch (error) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    checkStatus();
  }, [navigate]);
}
