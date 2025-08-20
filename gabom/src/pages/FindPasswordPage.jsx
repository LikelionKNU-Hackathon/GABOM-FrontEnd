import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./FindPasswordPage.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);

  const navigate = useNavigate();

  const sendVerificationCode = async () => {
    try {
      const res = await axios.post("/api/users/find-password", {
        email: email, // 입력한 이메일
      });
      if (res.data.success) {
        alert("인증번호가 발송되었습니다.");
        setCodeSent(true); // 인증번호 입력창 활성화
      } else {
        alert("이메일을 확인해주세요.");
      }
    } catch (err) {
      console.error(err);
      alert("인증번호 발송 중 오류가 발생했습니다.");
    }
  };

  const verifyCode = async () => {
    try {
      const res = await axios.post("localhost:8080/api/users/verify-code", {
        email: email,
        code: verificationCode, // 사용자가 입력한 인증번호
      });
      if (res.data.verified) {
        alert("인증이 완료되었습니다.");
        navigate("/reset-password"); // 비밀번호 재설정 페이지로 이동
      } else {
        alert("인증번호가 올바르지 않습니다.");
      }
    } catch (err) {
      console.error(err);
      alert("인증 확인 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="FindPasswordPageContainer">
      <h2 className="findpasswordtext">비밀번호 찾기</h2>
      <form>
        <div className="findpasswordbox">
          <div>
            <p className="emailtext">이메일</p>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={sendVerificationCode}
              className="sendbutton"
            >
              인증번호 전송
            </button>
          </div>
        </div>
        {codeSent && (
          <div className="findpasswordbox">
            <p className="numbertext">인증번호</p>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
            />
            <button type="button" onClick={verifyCode} className="check">
              확인
            </button>
          </div>
        )}
        <Link to="/login">
          <button className="FindPasswordButton" type="submit">
            비밀번호 찾기
          </button>
        </Link>
      </form>
    </div>
  );
}
