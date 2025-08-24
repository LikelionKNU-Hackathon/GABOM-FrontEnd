import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useZxing } from "react-zxing";
import axios from "axios";
import "./CameraPage.css";

export default function CameraPage() {
  const [result, setResult] = useState(null);
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { ref } = useZxing({
    onDecodeResult: async (res) => {
      const text = res.getText();
      console.log("✅ QR 인식됨:", text); // 👈 디버깅 로그

      if (result) {
        console.log("⚠️ 이미 인식된 결과, 무시:", result);
        return;
      }
      setResult(text);

      try {
        setLoading(true);
        setError("");
        console.log("📡 axios POST 요청 시작:", text);

        const response = await axios.post(text, {}, { withCredentials: true });
        console.log("🎉 서버 응답:", response.data);

        setVerified(true);
        alert(response.data.message || response.data);
      } catch (err) {
        console.error("❌ axios 요청 에러:", err);
        setError("서버 오류: 인증 불가");
      } finally {
        setLoading(false);
        console.log("🔄 요청 종료");
      }
    },
  });

  return (
    <div className="camera-container">
      <h2 className="camera-title">QR 스캔하기</h2>

      {!result ? (
        // 👇 모바일 브라우저 호환 속성 추가
        <video ref={ref} className="camera-video" muted playsInline autoPlay />
      ) : loading ? (
        <p className="camera-loading">⏳ 인증 중...</p>
      ) : verified ? (
        <div className="camera-success">
          <p>✅ 인증 완료!</p>
          <button className="camera-btn" onClick={() => navigate("/passport")}>
            보유한 스탬프 보기
          </button>
        </div>
      ) : (
        <div className="camera-fail">
          <p>{error || "❌ 인증 실패"}</p>
          <button
            className="camera-btn"
            onClick={() => window.location.reload()}
          >
            다시 시도
          </button>
        </div>
      )}
    </div>
  );
}
