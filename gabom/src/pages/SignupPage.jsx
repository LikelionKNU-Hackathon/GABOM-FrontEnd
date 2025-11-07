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
  const [loginId, setLoginId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ 개인정보 동의 관련 상태
  const [agree, setAgree] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);

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

    if (!agree) {
      return alert("개인정보 수집 및 이용에 동의해야 회원가입이 가능합니다.");
    }

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

      <form onSubmit={handleSignup}>
        {/* 이름 */}
        <div className="box">
          <p className="text">이름</p>
          <div className="inputWrapper">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="예) 홍길동"
            />
          </div>
        </div>

        {/* 아이디 */}
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

        {/* ✅ 개인정보 처리방침 동의 */}
        <div className="agree-box">
          <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            <span>
              개인정보 수집 및 이용에 동의합니다.{" "}
              <button
                type="button"
                onClick={() => setShowPolicy(true)}
                style={{
                  color: "#007aff",
                  textDecoration: "underline",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  fontSize: "14px",
                }}
              >
                자세히 보기
              </button>
            </span>
          </label>
        </div>

        <button
          className="SignupButton2"
          type="submit"
          disabled={!agree || loading}
          style={{
            opacity: agree ? 1 : 0.5,
            cursor: agree ? "pointer" : "not-allowed",
          }}
        >
          {loading ? "처리 중..." : "회원가입"}
        </button>
      </form>

      {/* ✅ 개인정보처리방침 모달 */}
      {showPolicy && (
        <div className="policy-modal-overlay">
          <div className="policy-modal">
            <h3>개인정보 처리방침</h3>
            <div className="policy-content">
              <p>
                (주)Gabom은 회원가입, 서비스 제공, 고객 문의 응대를 위해
                최소한의 개인정보를 수집하며, 아래의 방침에 따라 안전하게
                관리합니다.
              </p>

              <h4>1. 수집하는 개인정보 항목</h4>
              <ul>
                <li>필수 항목: 이름, 아이디, 비밀번호, 이메일, 닉네임</li>
                <li>
                  자동 수집 항목: 접속 로그, 쿠키, IP 주소, 서비스 이용기록
                </li>
              </ul>

              <h4>2. 개인정보의 이용 목적</h4>
              <ul>
                <li>회원 식별 및 본인 인증</li>
                <li>서비스 제공 및 고객 지원</li>
                <li>부정이용 방지 및 법적 분쟁 대응</li>
              </ul>

              <h4>3. 개인정보의 보유 및 이용기간</h4>
              <ul>
                <li>회원 탈퇴 시 즉시 파기</li>
                <li>단, 관련 법령에 따라 일정기간 보관될 수 있음</li>
              </ul>

              <h4>4. 개인정보의 제3자 제공</h4>
              <p>원칙적으로 이용자의 동의 없이 제3자에게 제공하지 않습니다.</p>

              <h4>5. 이용자의 권리</h4>
              <p>
                이용자는 언제든 자신의 개인정보를 열람, 수정, 삭제 요청할 수
                있습니다.
              </p>

              <h4>6. 개인정보 보호책임자</h4>
              <p>이름: 이현석 이메일: support@gabom.shop</p>

              <p style={{ marginTop: "10px" }}>
                본 방침은 2025년 11월 5일부터 시행됩니다.
              </p>
            </div>

            <button
              onClick={() => setShowPolicy(false)}
              style={{
                marginTop: "20px",
                padding: "8px 16px",
                backgroundColor: "#007aff",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
