import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Title.module.css";
import backIcon from "../../assets/icon/back.png";

export default function Title() {
  const navigate = useNavigate();
  const [titles, setTitles] = useState([]); // ✅ 칭호 목록
  const [selectedTitleId, setSelectedTitleId] = useState(null); // ✅ 선택된 칭호 ID

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

        // ✅ 대표 칭호 있으면 자동 선택
        const rep = res.data.find((t) => t.representative);
        if (rep) setSelectedTitleId(rep.titleId);
      } catch (err) {
        console.error("칭호 불러오기 실패", err);
      }
    };

    fetchTitles();
  }, [navigate]);

  // [2] 칭호 선택
  const handleSelect = (titleId) => {
    setSelectedTitleId(titleId);
  };

  // [3] 대표 칭호 변경
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.patch(
        `https://gabom.shop/api/users/me/titles/${selectedTitleId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("대표 칭호가 변경되었습니다!");
      navigate("/Mypage");
    } catch (err) {
      console.error("대표 칭호 변경 실패", err);
      alert("대표 칭호 변경 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className={styles.container}>
      {/* 헤더 */}
      <div className={styles.header}>
        <img
          src={backIcon}
          alt="뒤로가기"
          className={styles.backBtn}
          onClick={() => navigate("/Mypage")}
        />
        <h1 className={styles.title}>칭호</h1>
      </div>

      {/* 칭호 목록 */}
      <div className={styles.titleList}>
        {titles.length === 0 ? (
          <p>칭호를 불러오는 중...</p>
        ) : (
          titles.map((t) => (
            <button
              key={t.titleId}
              className={`${styles.titleItem} ${
                selectedTitleId === t.titleId ? styles.selected : ""
              }`}
              onClick={() => handleSelect(t.titleId)}
              disabled={!t.achieved} // 달성 못한 칭호는 선택 불가
            >
              <div>
                <div>{t.name}</div>
                <div style={{ fontSize: "14px", color: "#666" }}>
                  {t.description}
                </div>
              </div>
              <span>
                {t.currentCount}/{t.goalCount}
              </span>
            </button>
          ))
        )}
      </div>

      {/* 변경하기 버튼 */}
      <button
        className={styles.saveBtn}
        onClick={handleSave}
        disabled={!selectedTitleId}
      >
        변경하기
      </button>
    </div>
  );
}
