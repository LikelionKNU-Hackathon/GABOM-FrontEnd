import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./TitleList.module.css";
import backIcon from "../../assets/icon/back.png";

export default function TitleList() {
  const navigate = useNavigate();
  const [titles, setTitles] = useState([]);

  // [1] 칭호 목록 불러오기
  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await axios.get("https://gabom.shop/api/users/me/titles", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTitles(res.data);
      } catch (err) {
        console.error("칭호 목록 불러오기 실패", err);
      }
    };

    fetchTitles();
  }, [navigate]);

  return (
    <div className={styles.container}>
      {/* 헤더 */}
      <div className={styles.header}>
        <img
          src={backIcon}
          alt="뒤로가기"
          className={styles.backBtn}
          onClick={() => navigate("/title")}
        />
        <h1 className={styles.title}>칭호목록</h1>
      </div>

      {/* 칭호 카드 목록 */}
      <div className={styles.titleList}>
        {titles.length === 0 ? (
          <p>칭호를 불러오는 중...</p>
        ) : (
          titles.map((t) => {
            return (
              <div
                key={t.titleId}
                className={`${styles.titleItem} ${
                  t.achieved ? styles.collected : styles.notCollected
                }`}
              >
                <div>
                  <div>{t.name}</div>
                  <div style={{ fontSize: "14px", color: "#666" }}>
                    {t.description}
                  </div>
                </div>
                <span className={styles.titleCount}>
                  {t.currentCount}/{t.goalCount}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
