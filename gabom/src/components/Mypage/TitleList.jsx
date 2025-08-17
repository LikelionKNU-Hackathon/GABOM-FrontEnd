import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TitleList.module.css";
import backIcon from "../../assets/icon/back.png";

export default function TitleList() {
  const navigate = useNavigate();

  const titles = [
    "한식의 품격",
    "분식 요정",
    "일식愛 빠진 자",
    "중국집 단골왕",
    "이탈리아 맛피아",
    "향신료 정복자",
    "오늘도 한잔러",
    "당충전 전문가",
    "오락실 지박령",
    "생활 밀착왕",
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
        {titles.map((t, idx) => (
          <div key={idx} className={styles.titleItem}>
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}
