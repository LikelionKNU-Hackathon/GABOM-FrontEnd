import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css";
import logoA from "../assets/icon/logo_A.png"; // 로고 경로

export default function LoginPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [saveId, setSaveId] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ 저장된 아이디 불러오기
  useEffect(() => {
    const saved = localStorage.getItem("savedId");
    if (saved) {
      setId(saved);
      setSaveId(true);
    }
  }, []);

  // ✅ 로컬스토리지 아이디 저장
  useEffect(() => {
    if (saveId) localStorage.setItem("savedId", id);
    else localStorage.removeItem("savedId");
  }, [saveId, id]);

  // ✅ 로그인 처리
  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;
    setMessage("");
    setLoading(true);

    console.log("📦 로그인 시도:", { loginId: id, password });

    try {
      // 1️⃣ 일반 유저 로그인 시도
      const userRes = await axios.post(
        "https://gabom.shop/api/users/login",
        { loginId: id, password },
        { withCredentials: true }
      );

      if (userRes.status === 200) {
        handleLoginSuccess(userRes.data);
        return;
      }
    } catch (userErr) {
      console.warn("유저 로그인 실패:", userErr?.response?.status);
    }

    try {
      // 2️⃣ 사장님 로그인 시도
      const ownerRes = await axios.post(
        "https://gabom.shop/api/owners/login",
        { loginId: id, password },
        { withCredentials: true }
      );

      if (ownerRes.status === 200) {
        handleLoginSuccess(ownerRes.data, true);
        return;
      }
    } catch (ownerErr) {
      console.error("사장님 로그인 실패:", ownerErr);
      const msg =
        ownerErr?.response?.data?.message ||
        "아이디 또는 비밀번호가 올바르지 않습니다.";
      setMessage(`로그인 실패: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  // ✅ 로그인 성공 시 처리
  const handleLoginSuccess = async (data, isOwner = false) => {
    const { accessToken, role } = data;
    localStorage.setItem("accessToken", accessToken);
    if (role) localStorage.setItem("role", role);

    setMessage("로그인 성공!");

    if (isOwner || role === "OWNER") {
      try {
        const meRes = await axios.get("https://gabom.shop/api/owners/me", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        const { storeName, storeId } = meRes.data;
        if (storeName) localStorage.setItem("storeName", storeName);
        if (storeId) localStorage.setItem("storeId", storeId);
      } catch (err) {
        console.error("❌ /api/owners/me 호출 실패:", err);
      }

      navigate("/owner");
    } else {
      navigate("/main");
    }
  };

  return (
    <div className="LoginPageContainer">
      {/* 로고 */}
      <div className="logo-container">
        <img src={logoA} alt="로고" className="logoA" />
      </div>

      {/* 로그인 폼 */}
      <form onSubmit={handleLogin}>
        <div className="inputbox">
          <div>
            <input
              type="text"
              value={id}
              placeholder="아이디"
              onChange={(e) => setId(e.target.value)}
              required
              className="inputid"
              autoComplete="username"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              placeholder="비밀번호"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="inputpw"
              autoComplete="current-password"
            />
          </div>
        </div>

        <div className="login-options-container">
          <label className="checkbox">
            <input
              type="checkbox"
              checked={saveId}
              onChange={(e) => setSaveId(e.target.checked)}
            />
            아이디 저장
          </label>
          <div className="login-options">
            <Link to="/findid" className="login-option">
              아이디찾기
            </Link>
            <Link to="/findpw" className="login-option">
              비밀번호찾기
            </Link>
          </div>
        </div>

        <button className="LoginButton" type="submit" disabled={loading}>
          {loading ? "로그인 중..." : "로그인"}
        </button>
      </form>

      {message && <p>{message}</p>}

      {/* 회원가입 안내 */}
      <div className="signup-links">
        <span className="signup-text">
          아직 회원이 아니신가요?{" "}
          <Link to="/signup" className="signup-link">
            회원가입하기
          </Link>
        </span>
      </div>

      <div className="signup-links">
        <span className="signup-text">
          가봄의 사장님이 되고 싶으신가요?{" "}
          <Link to="/ownersignup" className="signup-link">
            가봄 사장님 되기
          </Link>
        </span>
      </div>
    </div>
  );
}
