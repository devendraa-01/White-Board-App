import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Verifying...");

  useEffect(() => {
    fetch(`https://white-board-app-aww3.onrender.com/verify/${token}`)
      .then(res => res.json())
      .then(data => {
        setMessage(data.message || data.error);
        if (data.message) setTimeout(() => navigate("/auth"), 3000);
      });
  }, [token, navigate]);

  return <div className="auth-message">{message}</div>;
}