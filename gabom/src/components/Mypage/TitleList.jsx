import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./TitleList.module.css";
import backIcon from "../../assets/icon/back.png";

export default function TitleList() {
  const navigate = useNavigate();
  const [titles, setTitles] = useState([]);

  // [기본 전체 칭호 목록]
  const allTitles = [
    {
      titleId: 1,
      name: "한식의 품격",
      description: "한식을 10곳 방문하세요",
      goalCount: 10,
    },
    {
      titleId: 2,
      name: "분식 요정",
      description: "분식을 10곳 방문하세요",
      goalCount: 10,
    },
    {
      titleId: 3,
      name: "일식愛 빠진 자",
      description: "일식을 10곳 방문하세요",
      goalCount: 10,
    },
    {
      titleId: 4,
      name: "중국집 단골왕",
      description: "중식을 10곳 방문하세요",
      goalCount: 10,
    },
    {
      titleId: 5,
      name: "이탈리아 맛피아",
      description: "양식을 10곳 방문하세요",
      goalCount: 10,
    },
    {
      titleId: 6,
      name: "향신료 정복자",
      description: "아시안 음식을 10곳 방문하세요",
      goalCount: 10,
    },
    {
      titleId: 7,
      name: "오늘도 한잔러",
      description: "호프/술집 10곳 방문하세요",
      goalCount: 10,
    },
    {
      titleId: 8,
      name: "당충전 전문가",
      description: "카페/디저트 10곳 방문하세요",
      goalCount: 10,
    },
    {
      titleId: 9,
      name: "오락실 지박령",
      description: "오락 시설 10곳 방문하세요",
      goalCount: 10,
    },
    {
      titleId: 10,
      name: "생활 밀착왕",
      description: "편의시설 10곳 방문하세요",
      goalCount: 10,
    },
  ];

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

        const userTitles = res.data; // 서버에서 가져온 칭호 진행도

        // [2] 전체 목록 + 유저 데이터 병합
        const merged = allTitles.map((base) => {
          const found = userTitles.find((t) => t.titleId === base.titleId);
          return {
            ...base,
            currentCount: found ? found.currentCount : 0,
            achieved: found ? found.achieved : false,
          };
        });

        setTitles(merged);
      } catch (err) {
        console.error("칭호 목록 불러오기 실패", err);

        // API 실패해도 더미만 표시
        const fallback = allTitles.map((t) => ({
          ...t,
          currentCount: 0,
          achieved: false,
        }));
        setTitles(fallback);
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
          titles.map((t) => (
            <div
              key={t.titleId}
              className={`${styles.titleItem} ${
                t.achieved ? styles.collected : ""
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
          ))
        )}
      </div>
    </div>
  );
}
