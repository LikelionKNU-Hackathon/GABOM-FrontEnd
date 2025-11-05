// src/pages/OwnerSignupPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import back from "../images/back.svg";
import eye from "../images/fluenteye.png";
import "./OwnerSignupPage.css";

export default function OwnerSignupPage() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [businessNumber, setBusinessNumber] = useState("");
  const [representativeName, setRepresentativeName] = useState("");
  const [openDate, setOpenDate] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();
  const handleBack = () => navigate("/");

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMsg(""); // 새 시도 시 기존 에러 초기화

    // 필수값 확인
    if (
      !loginId.trim() ||
      !password.trim() ||
      !email.trim() ||
      !businessNumber.trim() ||
      !representativeName.trim() ||
      !openDate.trim()
    ) {
      setErrorMsg("⚠️ 모든 필드를 입력하세요.");
      return;
    }

    // 이메일 유효성 검사
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMsg("⚠️ 이메일 형식을 확인해주세요.");
      return;
    }

    // 개업일자 유효성 검사
    if (!/^\d{8}$/.test(openDate)) {
      setErrorMsg("⚠️ 개업일자는 8자리 숫자(YYYYMMDD)로 입력해주세요.");
      return;
    }

    try {
      const res = await axios.post("https://gabom.shop/api/owners/signup", {
        loginId,
        password,
        email,
        businessNumber,
        representativeName,
        openDate,
      });

      if (res.status === 200) {
        alert(res.data.message || "사업자 인증 및 회원가입이 완료되었습니다!");
        navigate("/");
      }
    } catch (err) {
      console.error("회원가입 실패:", err);
      setErrorMsg("등록되지 않은 사업자입니다."); // 🔴 항상 이 문구만 표시
    }
  };

  // ✅ 여기서 JSX 리턴해야 함
  return (
    <div className="SignupPageContainer">
      <div className="signupheader">
        <img
          className="BackImage2"
          onClick={handleBack}
          src={back}
          alt="뒤로"
        />
        <h2 className="signuptext">사업자 회원가입</h2>
      </div>

      <form onSubmit={handleSignup}>
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

        {/* 사업자등록번호 */}
        <div className="box">
          <p className="text">사업자등록번호</p>
          <div className="inputWrapper">
            <input
              type="text"
              value={businessNumber}
              onChange={(e) => setBusinessNumber(e.target.value)}
              required
              placeholder="숫자만 입력 (예: 1234567890)"
              maxLength={10}
            />
          </div>
        </div>

        {/* 대표자명 */}
        <div className="box">
          <p className="text">대표자명</p>
          <div className="inputWrapper">
            <input
              type="text"
              value={representativeName}
              onChange={(e) => setRepresentativeName(e.target.value)}
              required
              placeholder="대표자명을 입력하세요"
            />
          </div>
        </div>

        {/* 개업일자 */}
        <div className="box">
          <p className="text">개업일자</p>
          <div className="inputWrapper">
            <input
              type="text"
              value={openDate}
              onChange={(e) => setOpenDate(e.target.value)}
              required
              placeholder="YYYYMMDD 형식 (예: 20220101)"
              maxLength={8}
            />
          </div>
        </div>

        {/* 🔴 에러 메시지 표시 */}
        {errorMsg && (
          <p className="error-text" style={{ color: "red", marginTop: "10px" }}>
            {errorMsg}
          </p>
        )}

        <button className="SignupButton2" type="submit">
          회원가입
        </button>
      </form>
    </div>
  );
}
