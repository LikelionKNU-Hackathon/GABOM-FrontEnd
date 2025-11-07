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
  const [agree, setAgree] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);

  const navigate = useNavigate();
  const handleBack = () => navigate("/");

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMsg("");

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

    if (!agree) {
      setErrorMsg("⚠️ 개인정보 수집 및 이용에 동의해야 회원가입이 가능합니다.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMsg("⚠️ 이메일 형식을 확인해주세요.");
      return;
    }

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
      setErrorMsg("등록되지 않은 사업자입니다.");
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
        <h2 className="signuptext1">사업자 회원가입</h2>
      </div>

      <form onSubmit={handleSignup}>
        {/* 입력 필드 */}
        {[
          {
            label: "아이디",
            value: loginId,
            setter: setLoginId,
            type: "text",
            placeholder: "로그인에 사용할 아이디",
          },
          {
            label: "비밀번호",
            value: password,
            setter: setPassword,
            type: showPassword ? "text" : "password",
            placeholder: "비밀번호를 입력하세요",
          },
          {
            label: "이메일",
            value: email,
            setter: setEmail,
            type: "email",
            placeholder: "example@email.com",
          },
          {
            label: "사업자등록번호",
            value: businessNumber,
            setter: setBusinessNumber,
            type: "text",
            placeholder: "숫자만 입력 (예: 1234567890)",
            maxLength: 10,
          },
          {
            label: "대표자명",
            value: representativeName,
            setter: setRepresentativeName,
            type: "text",
            placeholder: "대표자명을 입력하세요",
          },
          {
            label: "개업일자",
            value: openDate,
            setter: setOpenDate,
            type: "text",
            placeholder: "YYYYMMDD 형식 (예: 20220101)",
            maxLength: 8,
          },
        ].map((field, idx) => (
          <div className="box" key={idx}>
            <p className="text">{field.label}</p>
            <div className="inputWrapper">
              <input
                type={field.type}
                value={field.value}
                onChange={(e) => field.setter(e.target.value)}
                placeholder={field.placeholder}
                maxLength={field.maxLength}
                required
              />
              {field.label === "비밀번호" && (
                <img
                  className="fluenteye"
                  src={eye}
                  alt="비밀번호 보기"
                  onClick={() => setShowPassword((v) => !v)}
                />
              )}
            </div>
          </div>
        ))}

        {/* 개인정보 동의 */}
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

        {errorMsg && (
          <p className="error-text" style={{ color: "red", marginTop: "10px" }}>
            {errorMsg}
          </p>
        )}

        <button
          className="SignupButton2"
          type="submit"
          disabled={!agree}
          style={{
            opacity: agree ? 1 : 0.5,
            cursor: agree ? "pointer" : "not-allowed",
          }}
        >
          회원가입
        </button>
      </form>

      {/* 개인정보처리방침 모달 */}
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
                <li>
                  필수 항목: 아이디, 비밀번호, 이메일, 사업자등록번호, 대표자명,
                  개업일자
                </li>
                <li>
                  자동 수집 항목: 서비스 이용 기록, 접속 로그, 쿠키, IP 주소
                </li>
              </ul>

              <h4>2. 개인정보의 수집 및 이용 목적</h4>
              <ul>
                <li>회원 식별 및 서비스 이용에 따른 본인확인</li>
                <li>서비스 제공 및 고객 관리</li>
                <li>부정 이용 방지 및 안전한 거래 환경 조성</li>
              </ul>

              <h4>3. 개인정보의 보유 및 이용 기간</h4>
              <ul>
                <li>회원 탈퇴 시 즉시 파기</li>
                <li>
                  단, 관련 법령(전자상거래법, 세법 등)에 따라 일정 기간 보관할
                  수 있습니다.
                </li>
              </ul>

              <h4>4. 개인정보의 제3자 제공</h4>
              <p>
                원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다. 다만,
                법령에 따라 필요한 경우 관련 기관의 요청에 한해 제공될 수
                있습니다.
              </p>

              <h4>5. 이용자의 권리 및 행사 방법</h4>
              <p>
                이용자는 언제든지 본인의 개인정보를 열람, 수정, 삭제, 처리정지를
                요청할 수 있습니다.
              </p>

              <h4>6. 개인정보 보호책임자</h4>
              <p>
                이름: 이현석
                <br />
                이메일: support@gabom.shop
              </p>

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
