import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css";
import back from "../images/back.png";

export default function LoginPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [saveId, setSaveId] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 뒤로가기(시작 화면)
  const handlestart = () => navigate("/");

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
      const res = await axios.post(
        "/api/user/login", // 필요 시 경로 조정
        { username: id, password },
        { withCredentials: true } // 세션/쿠키 쓰면 유지
      );

      if (res.data?.success) {
        setMessage("로그인 성공!");
        navigate("/main"); // ✅ 성공 시에만 이동
      } else {
        setMessage(
          `로그인 실패: ${res.data?.message ?? "아이디/비밀번호를 확인하세요."}`
        );
      }
    } catch (err) {
      console.error(err);
      setMessage("로그인 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="LoginPageContainer">
      <div className="loginheader">
        <img
          className="BackImage1"
          onClick={handlestart}
          src={back}
          alt="뒤로"
        />
        <h2 className="logintext">로그인</h2>
      </div>

      {/* 폼 제출로만 로그인 실행 */}
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

        {/* ✅ 링크 없이 submit 버튼만 사용 */}
        <button className="LoginButton" type="submit" disabled={loading}>
          {loading ? "로그인 중..." : "로그인"}
        </button>
      </form>

      {message && <p>{message}</p>}

      <Link to="/signup">
        <button className="SignupButton1">회원가입</button>
      </Link>
    </div>
  );
}
