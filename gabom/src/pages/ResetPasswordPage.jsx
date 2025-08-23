// src/pages/ResetPasswordPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ResetPasswordPage.css";

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!newPassword.trim() || !confirmPassword.trim()) {
      return alert("비밀번호를 모두 입력하세요.");
    }
    if (newPassword !== confirmPassword) {
      return alert("비밀번호가 일치하지 않습니다.");
    }

    setLoading(true);
    try {
      const res = await axios.patch(
        "https://gabom.shop/api/users/reset-password",
        { newPassword: newPassword }
      );

      if (res.status === 200) {
        alert("비밀번호가 변경되었습니다. 다시 로그인 해주세요.");
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      alert(
        err?.response?.data ||
          "비밀번호 변경 중 오류가 발생했습니다. 이메일 인증을 다시 확인해주세요."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ResetPasswordPageContainer">
      <h2 className="resetpasswordtext">비밀번호 재설정</h2>
      <form onSubmit={handleReset}>
        <div className="resetpasswordbox">
          <p>새 비밀번호</p>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
        </div>
        <div className="resetpasswordbox">
          <p>비밀번호 확인</p>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
        </div>
        <button
          className="ResetPasswordButton"
          type="submit"
          disabled={loading}
        >
          {loading ? "처리 중..." : "비밀번호 변경"}
        </button>
      </form>
    </div>
  );
}
