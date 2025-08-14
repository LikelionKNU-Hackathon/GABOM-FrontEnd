import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./FindIdPage.css";

export default function FindIdPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [saveId, setSaveId] = useState(false);
  const [message, setMessage] = useState("");

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
    <div className="FindIdPageContainer">
      <h2 className="findidtext">아이디찾기</h2>
      <form>
        <div className="findidbox">
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
      </form>
      <Link to="/login">
        <button className="FindidButton" type="submit">
          아이디 찾기
        </button>
      </Link>

      {message && <p>{message}</p>}
    </div>
  );
}
