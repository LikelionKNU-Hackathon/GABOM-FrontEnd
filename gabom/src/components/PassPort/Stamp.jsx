import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backIcon from "../../assets/icon/back.png";
import styles from "./Stamp.module.css";


const categories = ["asia", "bunsik", "cafe", "china", "game", "japan", "korea", "pub", "service", "western"];
const stampData = {};
categories.forEach(cat => {
  stampData[cat] = [
    require(`../../assets/stamp/${cat}_1.png`),
    require(`../../assets/stamp/${cat}_2.png`),
    require(`../../assets/stamp/${cat}_3.png`)
  ];
});

export default function Stamp({ category = "asia" }) {
  const navigate = useNavigate();
  const [stamps, setStamps] = useState([]);
  const [page, setPage] = useState(0);

  const handleStampClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xRatio = (e.clientX - rect.left) / rect.width;
    const yRatio = (e.clientY - rect.top) / rect.height;

    // 같은 카테고리에서 순서대로 찍기
    const nextIndex = stamps.filter(s => s.page === page).length;
    const stampToAdd = stampData[category][nextIndex % 3];

    setStamps(prev => [...prev, { src: stampToAdd, xRatio, yRatio, page }]);
  };

  const stampsThisPage = stamps.filter(s => s.page === page);

  return (
    <div className={styles.stampContainer}>
      {/* 헤더 */}
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate("/passport")}>
          <img src={backIcon} alt="뒤로가기" />
        </button>
      </div>

      {/* 스탬프 찍는 영역 */}
      <div className={styles.stampArea} onClick={handleStampClick}>
        {stampsThisPage.map((s, idx) => (
          <img
            key={idx}
            src={s.src}
            alt={`stamp-${idx}`}
            className={styles.stampImage}
            style={{
              left: `${s.xRatio * 100}%`,
              top: `${s.yRatio * 100}%`
            }}
          />
        ))}
      </div>

      {/* 페이지 이동 */}
      <div className={styles.pageNav}>
        <button onClick={() => setPage(prev => Math.max(prev - 1, 0))} disabled={page === 0}>
          이전
        </button>
        <span>{page + 1} 페이지</span>
        <button onClick={() => setPage(prev => prev + 1)}>
          다음
        </button>
      </div>
    </div>
  );
}
