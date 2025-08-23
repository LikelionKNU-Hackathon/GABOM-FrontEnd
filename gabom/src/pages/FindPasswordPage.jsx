import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./FindPasswordPage.css";

export default function FindPasswordPage() {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);

  const navigate = useNavigate();

  const sendVerificationCode = async () => {
    try {
      const res = await axios.post(
        "https://gabom.shop/api/users/find-password",
        { email: email }
      );

      // ✅ 200 응답이면 성공 처리
      if (res.status === 200) {
        alert("인증번호가 발송되었습니다.");
        setCodeSent(true);
      }
    } catch (err) {
      console.error(err);
      alert("인증번호 발송 중 오류가 발생했습니다.");
    }
  };

  const verifyCode = async () => {
    try {
      const res = await axios.post("https://gabom.shop/api/users/verify-code", {
        email: email,
        code: verificationCode,
      });

      if (res.status === 200) {
        alert("인증이 완료되었습니다.");
        navigate("/reset-password");
      }
    } catch (err) {
      console.error(err);
      alert("인증번호가 올바르지 않습니다.");
    }
  };

  return (
    <div className="FindPasswordPageContainer">
      <h2 className="findpasswordtext">비밀번호 찾기</h2>
      <form>
        {/* 이메일 입력 */}
        <div className="findpasswordbox">
          <p className="emailtext">이메일</p>
          <div className="input-wrapper">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="button" onClick={sendVerificationCode}>
              인증번호 전송
            </button>
          </div>
        </div>

        {/* 인증번호 입력 (전송 후 활성화) */}
        {codeSent && (
          <div className="findpasswordbox">
            <p className="numbertext">인증번호</p>
            <div className="input-wrapper">
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
              />
              <button type="button" onClick={verifyCode}>
                확인
              </button>
            </div>
          </div>
        )}

        {/* 비밀번호 찾기 버튼 */}
        <Link to="/login">
          <button className="FindPasswordButton" type="submit">
            나가기
          </button>
        </Link>
      </form>
    </div>
  );
}
