// src/pages/SignupPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import back from "../images/back.svg";
import eye from "../images/fluenteye.png";
import "./SignupPage.css";

const API = {
  CHECK: "https://gabom.shop/api/users/check", // ?type=loginId|nickname&value=...
  SIGNUP: "https://gabom.shop/api/users",
};

export default function SignupPage() {
  // ✅ 백엔드 User 엔티티 기준으로 상태 정리
  // username: 이름, loginId: 로그인 아이디
  const [loginId, setLoginId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleBack = () => navigate("/");

  // 공통 GET /check 호출자
  const requestDuplicateCheck = async (type, value) => {
    return axios.get(
      `${API.CHECK}?type=${encodeURIComponent(type)}&value=${encodeURIComponent(
        value
      )}`
    );
  };

  // 아이디(loginId) 중복 확인
  const checkLoginIdDuplicate = async () => {
    const value = loginId.trim();
    if (!value) return alert("아이디를 입력하세요.");
    try {
      const res = await requestDuplicateCheck("loginId", value);
      if (res.data?.exists) alert("이미 사용 중인 아이디입니다.");
      else alert("사용 가능한 아이디입니다.");
    } catch (err) {
      console.error(err);
      alert("아이디 중복체크 중 오류가 발생했습니다.");
    }
  };

  // 닉네임 중복 확인
  const checkNicknameDuplicate = async () => {
    const value = nickname.trim();
    if (!value) return alert("닉네임을 입력하세요.");
    try {
      const res = await requestDuplicateCheck("nickname", value);
      if (res.data?.exists) alert("이미 사용 중인 닉네임입니다.");
      else alert("사용 가능한 닉네임입니다.");
    } catch (err) {
      console.error(err);
      alert("닉네임 중복체크 중 오류가 발생했습니다.");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (
      !loginId.trim() ||
      !username.trim() ||
      !password ||
      !email.trim() ||
      !nickname.trim()
    ) {
      return alert("모든 필드를 입력하세요.");
    }

    // 간단한 이메일 형식 체크
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return alert("이메일 형식을 확인해주세요.");
    }

    setLoading(true);
    try {
      const payload = {
        loginId: loginId.trim(),
        username: username.trim(),
        password,
        email: email.trim(),
        nickname: nickname.trim(),
      };

      const res = await axios.post(API.SIGNUP, payload, {
        withCredentials: true,
      });

      // ✅ 서버가 200 OK 주면 성공 처리
      alert(res.data?.message || "회원가입 성공! 로그인 페이지로 이동합니다.");
      navigate("/");
    } catch (err) {
      console.error(err);

      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "회원가입 중 오류가 발생했습니다.";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="SignupPageContainer">
      <div className="signupheader">
        <img
          className="BackImage2"
          onClick={handleBack}
          src={back}
          alt="뒤로"
        />
        <h2 className="signuptext">회원가입</h2>
      </div>

      {/* ✅ form 제출로만 저장 시도 */}
      <form onSubmit={handleSignup}>
        {/* 이름(username) */}
        <div className="box">
          <p className="text">이름</p>
          <div className="inputWrapper">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="name"
              placeholder="예) 홍길동"
            />
          </div>
        </div>

        {/* 아이디(loginId) */}
        <div className="box">
          <p className="text">아이디</p>
          <div className="inputWrapper">
            <input
              type="text"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              required
              autoComplete="username"
              placeholder="로그인에 사용할 아이디"
            />
            <button
              type="button"
              className="inlineButton"
              onClick={checkLoginIdDuplicate}
            >
              중복확인
            </button>
          </div>
        </div>

        {/* 비밀번호 */}
        <div className="box">
          <p className="text">비밀번호</p>
          <div className="inputWrapper">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              placeholder="비밀번호를 입력하세요"
            />
            <img
              className="fluenteye"
              src={eye}
              alt="비밀번호 보기"
              onClick={() => setShowPassword((v) => !v)}
            />
          </div>
        </div>

        {/* 이메일 */}
        <div className="box">
          <p className="text">이메일</p>
          <div className="inputWrapper">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="example@email.com"
            />
          </div>
        </div>

        {/* 닉네임 */}
        <div className="box">
          <p className="text">닉네임</p>
          <div className="inputWrapper">
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
              placeholder="표시될 이름"
            />
            <button
              type="button"
              className="inlineButton"
              onClick={checkNicknameDuplicate}
            >
              중복확인
            </button>
          </div>
        </div>

        <button className="SignupButton2" type="submit" disabled={loading}>
          {loading ? "처리 중..." : "회원가입"}
        </button>
      </form>
    </div>
  );
}
