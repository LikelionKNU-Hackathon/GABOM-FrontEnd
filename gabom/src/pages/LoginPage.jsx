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

  // 처음 로드 시 저장된 아이디 불러오기
  useEffect(() => {
    const saved = localStorage.getItem("savedId");
    if (saved) {
      setId(saved);
      setSaveId(true);
    }
  }, []);

  // 체크박스/아이디 변경 시 로컬스토리지 동기화
  useEffect(() => {
    if (saveId) localStorage.setItem("savedId", id);
    else localStorage.removeItem("savedId");
  }, [saveId, id]);

  // 로그인 처리
  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;
    setMessage("");
    setLoading(true);

    try {
      let res;
      try {
        // 일반 유저 로그인 시도
        res = await axios.post(
          "https://gabom.shop/api/users/login",
          { loginId: id, password },
          { withCredentials: true }
        );
      } catch (userErr) {
        // 실패 시 사장님 로그인 시도
        res = await axios.post(
          "https://gabom.shop/api/owners/login",
          { loginId: id, password },
          { withCredentials: true }
        );
      }

      if (res.status === 200) {
        const { accessToken, role } = res.data; // ✅ storeId는 없음

        // 토큰 & 역할 저장
        localStorage.setItem("accessToken", accessToken);
        if (role) localStorage.setItem("role", role);

        setMessage("로그인 성공!");

        if (role === "OWNER") {
          try {
            // ✅ 사장님이면 /me 호출해서 storeId, storeName 가져오기
            const meRes = await axios.get("https://gabom.shop/api/owners/me", {
              headers: { Authorization: `Bearer ${accessToken}` },
            });

            const { storeName, storeId } = meRes.data;
            if (storeName) localStorage.setItem("storeName", storeName);
            if (storeId) localStorage.setItem("storeId", storeId);
          } catch (meErr) {
            console.error("❌ /api/owners/me 호출 실패:", meErr);
          }

          navigate("/owner"); // ✅ 사장님 페이지로 이동
        } else {
          navigate("/main"); // ✅ 일반 유저 페이지로 이동
        }
      }
    } catch (err) {
      console.error(err);
      const msg =
        err?.response?.data?.message ||
        "아이디 또는 비밀번호가 올바르지 않습니다.";
      setMessage(`로그인 실패: ${msg}`);
    } finally {
      setLoading(false);
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
