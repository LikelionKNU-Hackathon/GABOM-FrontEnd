// src/pages/BottomSheet.jsx
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./BottomSheet.css";

export default function BottomSheet({ store }) {
  const [expanded, setExpanded] = useState(false);
  const startY = useRef(0);
  const currentY = useRef(0);
  const sheetRef = useRef(null);
  const navigate = useNavigate();

  if (!store) return null;

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

      {/* ✅ 정렬 수정: 이름+카테고리 왼쪽 / 버튼 오른쪽 */}
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

        {/* ✅ 방문 정보는 expanded 상태에서만 보이도록 */}
        {expanded && (
          <>
            <div className="visitSection">
              <h3>🏆 최다 방문자</h3>
              <p>
                {store.topVisitor.nickname} ({store.topVisitor.visitCount}회)
              </p>
            </div>

            <div className="visitSection">
              <h3>👤 나의 방문</h3>
              <p>
                {store.myVisit.nickname} ({store.myVisit.visitCount}회)
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
