import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TitleList.module.css";
import backIcon from "../../assets/icon/back.png";

export default function TitleList() {
  const navigate = useNavigate();

  // 예시 데이터: 현재 획득한 개수
  const titles = [
    { name: "한식의 품격", collected: 0, total: 10 },
    { name: "분식 요정", collected: 0, total: 10 },
    { name: "일식愛 빠진 자", collected: 0, total: 10 },
    { name: "중국집 단골왕", collected: 0, total: 10 },
    { name: "이탈리아 맛피아", collected: 0, total: 10 },
    { name: "향신료 정복자", collected: 0, total: 10 },
    { name: "오늘도 한잔러", collected: 0, total: 10 },
    { name: "당충전 전문가", collected: 0, total: 10 },
    { name: "오락실 지박령", collected: 0, total: 10 },
    { name: "생활 밀착왕", collected: 0, total: 10 },
  ];

  return (
    <div className={styles.container}>
      {/* 헤더 */}
      <div className={styles.header}>
        <img
          src={backIcon}
          alt="뒤로가기"
          className={styles.backBtn}
          onClick={() => navigate(-1)}
        />
        <h1 className={styles.title}>칭호목록</h1>
      </div>

      {/* 칭호 카드 목록 */}
      <div className={styles.titleList}>
        {titles.map((t, idx) => {
          const isCollected = t.collected >= t.total;
          return (
            <div
              key={idx}
              className={`${styles.titleItem} ${isCollected ? styles.collected : ""}`}
            >
              {t.name}
              <span className={styles.titleCount}>
                {t.collected}/{t.total}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
