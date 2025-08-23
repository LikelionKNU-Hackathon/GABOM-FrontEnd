import React from "react";
import styles from "./Tier.module.css";

import logoImg from "../../assets/icon/logo_A.png";
import closeIcon from "../../assets/icon/proicons_cancel.png";

export default function Tier({ onClose, tierData }) {
  const tiers = tierData || [
    { name: "초행자", emoji: "🚶", number: 4, currentCount: 0 },
    { name: "동네여행자", emoji: "🧍", number: 15, currentCount: 0 },
    { name: "골목마스터", emoji: "🚴", number: 30, currentCount: 0 },
    { name: "거리정복자", emoji: "🚗", number: 50, currentCount: 0 },
    { name: "지역탐험가", emoji: "✈️", number: 90, currentCount: 0 },
    { name: "전설의 가봄러", emoji: <img src={logoImg} alt="logo" className={styles.logo} />, number: 200, currentCount: 0 },
  ];

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <img
          src={closeIcon}
          alt="닫기"
          className={styles.closeBtn}
          onClick={onClose}
        />

        <div className={styles.tierList}>
          {tiers.map((tier, index) => {
            // 초행자는 항상 색 적용, 나머지는 currentCount >= number
            const reached = index === 0 || tier.currentCount >= tier.number;

            return (
              <div
                key={index}
                className={`${styles.tierItem} ${reached ? styles.reached : ""}`}
              >
                <div className={styles.iconName}>
                  <div className={`${styles.icon} ${reached ? styles.reached : ""}`}>
                    {tier.emoji}
                  </div>
                  <span className={styles.tierName}>{tier.name}</span>
                </div>
                <span className={styles.tierNumber}>
                  {tier.currentCount}/{tier.number}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
