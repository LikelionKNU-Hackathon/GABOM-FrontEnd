import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import back from "../images/back.png";
import eye from "../images/fluenteye.png";
import "./SignupPage.css";

export default function SignupPage() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const checkIdDuplicate = async () => {
    try {
      const res = await axios.get("api링크");
      if (res.data.exists) {
        alert("이미 사용중인 아이디입니다.");
      } else {
        alert("사용 가능한 아이디입니다.");
      }
    } catch (err) {
      console.error(err);
      alert("아이디 중복체크 중 오류가 발생했습니다.");
    }
  };

  const checkNicknameDuplicate = async () => {
    try {
      const res = await axios.get("api링크");
      if (res.data.exists) {
        alert("이미 사용 중인 닉네임입니다.");
      } else {
        alert("사용 가능한 닉네임입니다.");
      }
    } catch (err) {
      console.err(err);
      alert("닉네임 중복체크 중 오류가 발생했습니다.");
    }
  };
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/login");
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
      <form>
        <div className="box">
          <div>
            <p className="text">이름</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="box">
          <div>
            <p className="text">아이디</p>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
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
          <div>
            <p className="text">비밀번호</p>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <img
              className="fluenteye"
              src={eye}
              alt="비밀번호보기"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
        </div>
        <div className="box">
          <div>
            <p className="text">이메일</p>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="box">
          <div>
            <p className="text">닉네임</p>
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
        <Link to="/login">
          <button className="SignupButton2" type="submit">
            회원가입
          </button>
        </Link>
      </form>
    </div>
  );
}
