// ✅ StampStore.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // ⚡ 일반 axios import
import styles from "./StampStore.module.css";

import backIcon from "../../assets/icon/back.svg";
import image5000 from "../../assets/store/5000.png";
import image10000 from "../../assets/store/10000.png";
import image30000 from "../../assets/store/30000.png";

const exchangeOptions = [
  { id: 1, stampNeeded: 50, reward: "온누리 상품권 5,000원", image: image5000 },
  {
    id: 2,
    stampNeeded: 100,
    reward: "온누리 상품권 10,000원",
    image: image10000,
  },
  {
    id: 3,
    stampNeeded: 250,
    reward: "온누리 상품권 30,000원",
    image: image30000,
  },
];

export default function StampStore() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [currentStampCount, setCurrentStampCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  // ✅ 공통 axios 설정
  const api = axios.create({
    baseURL: "https://gabom.shop/api", // ⚙️ 백엔드 주소
    headers: {
      "Content-Type": "application/json",
    },
  });

  // ✅ 요청할 때 토큰 자동 포함
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  // ✅ 1. 내 스탬프 조회
  useEffect(() => {
    const fetchStampInfo = async () => {
      try {
        const res = await api.get("/store");
        setUsername(res.data.username);
        setCurrentStampCount(res.data.availableStampCount);
      } catch (err) {
        console.error("스탬프 조회 실패:", err);
        alert("스탬프 정보를 불러오지 못했습니다.");
      }
    };
    fetchStampInfo();
  }, []);

  // ✅ 2. 교환 버튼 클릭 → 모달 열기
  const handleExchange = (option) => {
    setSelectedOption(option);
    setIsModalOpen(true);
  };

  // ✅ 3. 교환하기 API 요청
  const handleSaveExchange = async () => {
    if (!selectedOption) return;

    try {
      // ✅ 교환 요청
      const res = await api.post(
        `/stamps/exchange?rewardId=${selectedOption.id}`
      );

      // ✅ 서버 응답 구조 대비
      const data = res.data;
      console.log("✅ 교환 응답:", data); // ← 실제 응답 구조 확인용

      // reward 객체가 없을 수도 있으므로 optional chaining + fallback 사용
      const rewardName =
        data?.reward?.rewardName || selectedOption.reward || "교환 상품";
      const stampNeeded =
        data?.reward?.stampNeeded || selectedOption.stampNeeded || 0;
      const barcode = data?.barcode || "000000000000";

      // ✅ 스탬프 차감 (fallback도 반영)
      setCurrentStampCount((prev) => prev - stampNeeded);

      // ✅ 바코드 페이지 이동
      navigate("/stampbarcode", {
        state: {
          rewardName,
          image: selectedOption.image,
          barcodeText: barcode,
        },
      });

      // ✅ 모달 닫기 및 상태 초기화
      setIsModalOpen(false);
      setSelectedOption(null);
    } catch (err) {
      console.error("❌ 스탬프 교환 실패:", err);
      alert(err.response?.data?.message || "교환 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className={styles.container}>
      {/* 상단 헤더 */}
      <div className={styles.header}>
        <img
          src={backIcon}
          alt="뒤로가기"
          className={styles.backBtn}
          onClick={() => navigate("/main")}
        />
        <h1 className={styles.title}>스토어</h1>
        <button className={styles.storageBtn} disabled>
          보관함
        </button>
      </div>

      {/* 현재 스탬프 */}
      <div className={styles.currentStampSection}>
        <p className={styles.userName}>
          {username ? `${username} 님의 현재 스탬프 개수` : "불러오는 중..."}
        </p>
        <div className={styles.stampCountBox}>
          <span className={styles.stampCount}>{currentStampCount}</span>
        </div>
      </div>

      <p className={styles.instruction}>
        스탬프를 지역상품권으로 교환해보세요.
      </p>

      {/* 교환 목록 */}
      <div className={styles.exchangeList}>
        {exchangeOptions.map((option) => {
          const isExchangable = currentStampCount >= option.stampNeeded;
          return (
            <div key={option.id} className={styles.exchangeItem}>
              <div className={styles.rewardInfo}>
                <span className={styles.stampNeeded}>
                  스탬프 {option.stampNeeded}개
                </span>
                <span className={styles.reward}>{option.reward}</span>
              </div>
              <button
                className={styles.exchangeBtn}
                onClick={() => handleExchange(option)}
                disabled={!isExchangable}
              >
                교환하기
              </button>
            </div>
          );
        })}
      </div>

      {/* 모달 */}
      {isModalOpen && selectedOption && (
        <div
          className={styles.modalOverlay}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className={styles.modalTitle}>스탬프 교환</h2>
            <img
              src={selectedOption.image}
              alt={selectedOption.reward}
              className={styles.giftCertImage}
            />
            <p className={styles.exchangeConfirmationText}>
              <span className={styles.highlightText}>
                스탬프 {selectedOption.stampNeeded}개
              </span>
              를<br />
              <span className={styles.highlightText}>
                {selectedOption.reward}
              </span>
              으로
              <br />
              교환하시겠습니까?
            </p>
            <button className={styles.saveBtn} onClick={handleSaveExchange}>
              저장하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
