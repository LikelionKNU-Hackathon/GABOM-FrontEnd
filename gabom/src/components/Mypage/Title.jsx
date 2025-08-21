import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Title.module.css";
import backIcon from "../../assets/icon/back.png";

export default function Title() {
  const navigate = useNavigate();
  const [selectedTitle, setSelectedTitle] = useState("");

  const titles = ["칭호 모으는 중"]; 

  useEffect(() => {
    const savedTitle = localStorage.getItem("selectedTitle");
    if (savedTitle) {
      setSelectedTitle(savedTitle);
    }
  }, []);

  const handleSelect = (t) => {
    setSelectedTitle(t);
  };

  const handleSave = () => {
    localStorage.setItem("selectedTitle", selectedTitle);
    navigate(-1); // Mypage로 돌아가기
  };

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
        <h1 className={styles.title}>칭호</h1>
      </div>

      {/* 칭호목록 버튼 */}
      <div
        className={styles.titleListButton}
        onClick={() => navigate("/titlelist")}
      >
        칭호목록
      </div>

      {/* 칭호 카드 목록 */}
      <div className={styles.titleList}>
        {titles.map((t, idx) => (
          <button
            key={idx}
            className={`${styles.titleItem} ${
              selectedTitle === t ? styles.selected : ""
            }`}
            onClick={() => handleSelect(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* 변경하기 버튼 */}
      <button
        className={styles.saveBtn}
        onClick={handleSave}
        disabled={!selectedTitle}
      >
        변경하기
      </button>
    </div>
  );
}
