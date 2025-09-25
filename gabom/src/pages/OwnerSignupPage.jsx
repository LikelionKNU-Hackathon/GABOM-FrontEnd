// src/pages/OwnerSignupPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!storeId.trim() || !loginId.trim() || !password || !email.trim()) {
      return alert("모든 필드를 입력하세요.");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return alert("이메일 형식을 확인해주세요.");
    }

    try {
      const res = await axios.post("https://gabom.shop/api/owners/signup", {
        storeId,
        loginId,
        password,
        email,
      });

      if (res.status === 200) {
        alert("회원가입 성공! 로그인 페이지로 이동합니다.");
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      alert("회원가입 실패: " + (err?.response?.data?.message || "서버 오류"));
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
        {/* 가게 선택 */}
        <div className="box">
          <p className="text">가게 선택</p>
          <div className="inputWrapper">
            <select
              value={storeId}
              onChange={(e) => setStoreId(e.target.value)}
              required
            >
              <option value="">가게를 선택하세요</option>
              <option value="1">The 진분식</option>
              <option value="2">금화로 본식</option>
              <option value="3">황보네 본식</option>
              <option value="4">가온과의 방패연</option>
              <option value="5">공세로 본식</option>
              <option value="6">죽전로 본식</option>
              <option value="7">라파즈</option>
              <option value="8">다복식당</option>
              <option value="9">친구포차</option>
              <option value="10">지니업</option>
              <option value="11">또우화</option>
              <option value="12">어바웃유어유스</option>
              <option value="13">설록궁 용인동백점</option>
              <option value="14">토리코PC 강남대점</option>
              <option value="15">히트코인노래연습장</option>
              <option value="16">포가라 인도 요리전문점</option>
              <option value="17">화화돈</option>
              <option value="18">하노이별</option>
              <option value="19">쏘앤</option>
              <option value="20">레볼루션</option>
              <option value="21">인앤피자</option>
              <option value="22">청궁</option>
              <option value="23">남경</option>
              <option value="24">한상명품치킨</option>
              <option value="25">카이장헤어 용인 강남대점</option>
              <option value="26">위시앤조이 셀프빨래방 용인</option>
              <option value="27">다이소 용인강남대점</option>
              <option value="28">연궁</option>
              <option value="29">건강한밥상</option>
              <option value="30">감성춘천 한판</option>
            </select>
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
