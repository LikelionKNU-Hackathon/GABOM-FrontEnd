// src/pages/BottomSheet.jsx
import React from "react";
import "./BottomSheet.css";

export default function BottomSheet({ store, onClose }) {
  if (!store) return null;

  return (
    <div className="bottomSheet">
      <div className="sheetContent">
        <button className="closeBtn" onClick={onClose}>
          닫기
        </button>
        <h2>{store.name}</h2>
        <p>카테고리: {store.category}</p>
        <p>주소: {store.address}</p>
        <p>영업시간: {store.openingHours}</p>
      </div>
    </div>
  );
}
