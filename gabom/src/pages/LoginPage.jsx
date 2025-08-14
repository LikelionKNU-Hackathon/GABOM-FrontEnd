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
  const navigate = useNavigate();

  const handlestart = () => {
    navigate("/");
  };
  useEffect(() => {
    //카카오 sdk 스크립트 페이지 로드되어 있어야함.
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init("샘플키");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post("", {
        username: id,
        password: password,
      });
      if (response.data.success) {
        setMessage("로그인 성공!"); // 로그인 성공 처리 (예: 토큰 저장, 페이지 이동 등)
      } else {
        setMessage("로그인 실패: " + response.data.message);
      }
    } catch (error) {
      setMessage("로그인 중 오류가 발생했습니다.");
      console.error(error);
    }
  };

  const handleKakaoLogin = () => {
    if (!window.Kakao) {
      alert("카카오 SDK가 로드되지 않았습니다.");
      return;
    }
    window.Kakao.Auth.login({
      success(authObj) {
        console.log("카카오 로그인 성공", authObj);
        setMessage("카카오 로그인 성공!");
      },
      fail(err) {
        console.error(err);
        setMessage("카카오 로그인 실패");
      },
    });
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
      <form onSubmit={handleLogin}>
        <div className="inputbox">
          <div>
            <input
              type="text"
              value={id}
              placeholder="아이디"
              onChange={(e) => setId(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              placeholder="비밀번호"
              onChange={(e) => setPassword(e.target.value)}
              required
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
      </form>

      <button className="LoginButton" type="submit">
        로그인
      </button>
      <button className="KakaoLoginButton" onClick={handleKakaoLogin}>
        카카오 로그인
      </button>

      {message && <p>{message}</p>}
      <Link to="/signup">
        <button className="SignupButton1">회원가입</button>
      </Link>
    </div>
  );
}
