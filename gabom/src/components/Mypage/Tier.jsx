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
          {tierData.tierProgress.map((tier, index) => {
            const reached = index === 0 || tier.achieved;

            return (
              <div
                key={tier.name}
                className={`${styles.tierItem} ${
                  reached ? styles.reached : ""
                }`}
              >
                <div className={styles.iconName}>
                  <div
                    className={`${styles.icon} ${
                      reached ? styles.reached : ""
                    }`}
                  >
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
