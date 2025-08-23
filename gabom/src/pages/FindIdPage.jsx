// FindIdPage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./FindIdPage.css";

const API_FIND_ID = "/api/user/find-id"; // ← 백엔드 경로만 맞춰주세요

export default function FindIdPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setMessage("");
    if (!email.trim()) {
      setMessage("이메일을 입력하세요.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        API_FIND_ID,
        { email: email.trim() },
        { withCredentials: true }
      );
      if (res.data?.success) {
        alert("가입 시 사용한 아이디를 이메일로 보냈습니다.");
        navigate("/login"); // ✅ 성공 시 로그인 페이지로 이동
      } else {
        setMessage(
          res.data?.message || "해당 이메일로 가입된 계정을 찾을 수 없습니다."
        );
      }
    } catch (err) {
      console.error(err);
      setMessage("아이디 찾기 요청 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="FindIdPageContainer">
      <h2 className="findidtext">아이디 찾기</h2>

      {/* ✅ form 제출로만 동작 */}
      <form onSubmit={handleSubmit}>
        <div className="findidbox">
          <p className="emailtext">이메일</p>
          <input
            type="email"
            value={email}
            placeholder=""
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>

        <button className="FindidButton" type="submit" disabled={loading}>
          {loading ? "전송 중..." : "아이디 찾기"}
        </button>
      </form>

      {message && <p className="findid-message">{message}</p>}
    </div>
  );
}
