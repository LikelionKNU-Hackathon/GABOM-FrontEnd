// src/pages/OwnerSignupPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import back from "../images/back.svg";
import eye from "../images/fluenteye.png";
import "./OwnerSignupPage.css";

export default function OwnerSignupPage() {
  const [storeId, setStoreId] = useState(""); 
  const [loginId, setLoginId] = useState(""); 
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const handleBack = () => navigate("/");

  const handleSignup = (e) => {
    e.preventDefault();

    if (!storeId.trim() || !loginId.trim() || !password || !email.trim()) {
      return alert("모든 필드를 입력하세요.");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return alert("이메일 형식을 확인해주세요.");
    }

    alert("회원가입 성공! 로그인 페이지로 이동합니다.");
    navigate("/"); 
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

      <form onSubmit={handleSignup}>
        {/* 가게 아이디 */}
        <div className="box">
          <p className="text">가게 아이디</p>
          <div className="inputWrapper">
            <input
              type="text"
              value={storeId}
              onChange={(e) => setStoreId(e.target.value)}
              required
              placeholder="가게 아이디 입력"
            />
          </div>
        </div>

        {/* 로그인 아이디 */}
        <div className="box">
          <p className="text">아이디</p>
          <div className="inputWrapper">
            <input
              type="text"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              required
              placeholder="로그인에 사용할 아이디"
            />
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
              placeholder="example@email.com"
            />
          </div>
        </div>

        <button className="SignupButton2" type="submit">
          회원가입
        </button>
      </form>
    </div>
  );
}
