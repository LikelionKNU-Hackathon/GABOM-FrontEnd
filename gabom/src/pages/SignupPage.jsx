import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import back from "../images/back.png";
import eye from "../images/fluenteye.png";
import "./SignupPage.css";

const API = {
  CHECK: "/api/user/check", // ← 백엔드 경로 다르면 여기만 바꾸세요
  SIGNUP: "/api/user/signup", // 예: "/api/users/signup"
};

export default function SignupPage() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleBack = () => navigate("/login");

  const checkIdDuplicate = async () => {
    const value = id.trim();
    if (!value) return alert("아이디를 입력하세요.");
    try {
      const res = await axios.get(
        `${API.CHECK}?type=id&value=${encodeURIComponent(value)}`
      );
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
      const res = await axios.get(
        `${API.CHECK}?type=nickname&value=${encodeURIComponent(value)}`
      );
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
      !id.trim() ||
      !name.trim() ||
      !password ||
      !email.trim() ||
      !nickname.trim()
    ) {
      return alert("모든 필드를 입력하세요.");
    }

    setLoading(true);
    try {
      const payload = {
        username: id.trim(),
        password,
        name: name.trim(),
        email: email.trim(),
        nickname: nickname.trim(),
      };

      const res = await axios.post(API.SIGNUP, payload, {
        withCredentials: true,
      });
      if (res.data?.success) {
        alert("회원가입 성공! 로그인 페이지로 이동합니다.");
        navigate("/login");
      } else {
        alert(`회원가입 실패: ${res.data?.message ?? ""}`);
      }
    } catch (err) {
      console.error(err);
      alert("회원가입 중 오류가 발생했습니다.");
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
        <div className="box">
          <p className="text">이름</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name"
          />
        </div>

        <div className="box">
          <p className="text">아이디</p>
          <div className="row">
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
              autoComplete="username"
            />
            <button
              type="button"
              className="checkId"
              onClick={checkIdDuplicate}
            >
              중복확인
            </button>
          </div>
        </div>

        <div className="box">
          <p className="text">비밀번호</p>
          <div className="row">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
            <img
              className="fluenteye"
              src={eye}
              alt="비밀번호 보기"
              onClick={() => setShowPassword((v) => !v)}
            />
          </div>
        </div>

        <div className="box">
          <p className="text">이메일</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>

        <div className="box">
          <p className="text">닉네임</p>
          <div className="row">
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
            />
            <button
              type="button"
              className="checknickname"
              onClick={checkNicknameDuplicate}
            >
              중복확인
            </button>
          </div>
        </div>

        {/* ✅ Link로 감싸지 말고 submit 버튼만 */}
        <button className="SignupButton2" type="submit" disabled={loading}>
          {loading ? "처리 중..." : "회원가입"}
        </button>
      </form>
    </div>
  );
}
