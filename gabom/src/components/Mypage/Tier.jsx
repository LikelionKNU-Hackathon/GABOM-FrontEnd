import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Tier.module.css";

import logoImg from "../../assets/icon/logo_A.png";
import closeIcon from "../../assets/icon/proicons_cancel.png";

export default function Tier({ onClose }) {
  const [tierData, setTierData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTier = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        const res = await axios.get("https://gabom.shop/api/users/me/tiers", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTierData(res.data);
      } catch (err) {
        console.error("티어 불러오기 실패", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTier();
  }, []);

  if (loading) {
    return (
      <div className={styles.overlay}>
        <div className={styles.popup}>불러오는 중...</div>
      </div>
    );
  }

  if (!tierData) {
    return (
      <div className={styles.overlay}>
        <div className={styles.popup}>데이터를 불러올 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <img
          src={closeIcon}
          alt="닫기"
          className={styles.closeBtn}
          onClick={onClose}
        />

        <h3 style={{ textAlign: "center", margin: "10px 0" }}>
          현재 티어: {tierData.currentTier}
        </h3>

        <div className={styles.tierList}>
          {tierData.tierProgress.map((tier) => {
            const ratio = Math.min(tier.current / tier.goal, 1);

            // 0이면 흰색, 진행할수록 점점 진해짐
            const bgColor =
              tier.current === 0
                ? "#FFFFFF"
                : `rgba(255, 177, 180, ${0.2 + 0.8 * ratio})`;

            return (
              <div
                key={tier.name}
                className={styles.tierItem}
                style={{ backgroundColor: bgColor }}
              >
                <div className={styles.iconName}>
                  <div className={styles.icon}>
                    {tier.name === "전설의 가봄러" ? (
                      <img src={logoImg} alt="logo" className={styles.logo} />
                    ) : (
                      tier.emoji || "⭐"
                    )}
                  </div>
                  <span className={styles.tierName}>{tier.name}</span>
                </div>
                <span className={styles.tierNumber}>
                  {tier.current}/{tier.goal}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
