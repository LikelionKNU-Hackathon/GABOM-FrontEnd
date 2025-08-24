import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./BottomSheet.css";

export default function BottomSheet({ store }) {
  const [expanded, setExpanded] = useState(false);
  const [detail, setDetail] = useState(null);
  const startY = useRef(0);
  const currentY = useRef(0);
  const sheetRef = useRef(null);
  const navigate = useNavigate();

  // ✅ hook은 무조건 컴포넌트 최상단에서 실행
  useEffect(() => {
    if (!store) return; // 이렇게 조건 걸면 됨
    const fetchDetail = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(
          `https://gabom.shop/api/stores/${store.id}`,
          token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
        );
        setDetail(res.data);
      } catch (err) {
        console.error("가게 상세 불러오기 실패:", err);
      }
    };

    fetchDetail();
  }, [store]);

  if (!store) return null; // ✅ hook 실행 이후에 return null

  const handleTouchStart = (e) => {
    startY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    currentY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (startY.current - currentY.current > 50) {
      setExpanded(true);
    } else if (currentY.current - startY.current > 50) {
      setExpanded(false);
    }
  };

  const handleVerifyClick = () => {
    navigate("/camera");
  };

  return (
    <div
      ref={sheetRef}
      className={`bottomSheet ${expanded ? "expanded" : ""}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="dragHandle" />

      <div className="sheetHeader">
        <div className="storeTitle">
          <h2>{store.name}</h2>
          <span className="category">{store.category}</span>
        </div>
        <button className="verifyBtn" onClick={handleVerifyClick}>
          인증하기
        </button>
      </div>

      <div className="sheetContent">
        <p>주소: {store.address}</p>
        <p>영업시간: {store.openingHours}</p>

        {expanded && detail && (
          <>
            <div className="visitSection">
              <h3>🏆 최다 방문자</h3>
              {detail.topVisitor ? (
                <p>
                  {detail.topVisitor.nickname} ({detail.topVisitor.visitCount}
                  회)
                </p>
              ) : (
                <p>기록 없음</p>
              )}
            </div>

            <div className="visitSection">
              <h3>👤 나의 방문</h3>
              {detail.myVisit ? (
                <p>
                  {detail.myVisit.nickname} ({detail.myVisit.visitCount}회)
                </p>
              ) : (
                <p>방문 기록 없음</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
