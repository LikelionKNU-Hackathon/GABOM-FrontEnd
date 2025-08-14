import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./FindPasswordPage.css";

export default function LoginPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [saveId, setSaveId] = useState(false);
  const [message, setMessage] = useState("");

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

  return (
    <div className="FindPasswordPageContainer">
      <h2 className="findpasswordtext">비밀번호 찾기</h2>
      <form onSubmit={handleLogin}>
        <div className="findpasswordbox">
          <div>
            <p className="emailtext">이메일</p>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="findpasswordbox">
          <div>
            <p className="numbertext">인증번호</p>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
          </div>
        </div>

        <Link to="/login">
          <button className="FindPasswordButton" type="submit">
            비밀번호 찾기
          </button>
        </Link>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
