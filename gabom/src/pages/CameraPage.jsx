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
      if (result) return;
      setResult(text);

      try {
        setLoading(true);
        setError("");

        const response = await axios.post(
          "https://gabom.shop/api/visits/verify",
          { qrData: text },
          { withCredentials: true }
        );

        if (response.data.success) {
          setVerified(true);
        } else {
          setError("❌ 인증 실패: " + response.data.message);
        }
      } catch (err) {
        console.error(err);
        setError("서버 오류: 인증 불가");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="camera-container">
      <h2 className="camera-title">QR 스캔하기</h2>

      {!result ? (
        <video ref={ref} className="camera-video" />
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
