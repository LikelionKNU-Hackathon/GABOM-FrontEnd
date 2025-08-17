import React from "react";
import styles from "./Tier.module.css";

// 아이콘 이미지
import logoImg from "../../assets/icon/logo_A.png";
import closeIcon from "../../assets/icon/proicons_cancel.png";

export default function Tier({ onClose }) {
  const tiers = [
    { name: "초행자", emoji: "🚶", number: 4 },
    { name: "동네여행자", emoji: "🧍", number: 15 },
    { name: "골목마스터", emoji: "🚴", number: 30 },
    { name: "거리정복자", emoji: "🚗", number: 50 },
    { name: "지역탐험가", emoji: "✈️", number: 90 },
    { name: "전설의 가봄러", emoji: <img src={logoImg} alt="logo" className={styles.logo} />, number: 200 },
  ];

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        {/* 닫기 버튼 */}
        <img
          src={closeIcon}
          alt="닫기"
          className={styles.closeBtn}
          onClick={onClose}
        />

        {/* 티어 목록 */}
        <div className={styles.tierList}>
          {tiers.map((tier, index) => (
            <div key={index} className={styles.tierItem}>
              <div className={styles.iconName}>
                <div className={styles.icon}>{tier.emoji}</div>
                <span className={styles.tierName}>{tier.name}</span>
              </div>
              <span className={styles.tierNumber}>{tier.number}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
