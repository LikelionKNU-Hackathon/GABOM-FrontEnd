import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./CaseBox.module.css";
import backIcon from "../../assets/icon/back.png";
import axios from "axios";

export default function CaseBox() {
  const navigate = useNavigate();
  const location = useLocation();

  const [cases, setCases] = useState([]);
  const [tempSelected, setTempSelected] = useState(
    location.state?.fromPassPort
  );

  const token = localStorage.getItem("accessToken");

  // [1] 케이스 목록 불러오기
  useEffect(() => {
    axios
      .get("https://gabom.shop/api/journal/cases", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setCases(res.data);

        // 서버에서 선택된 케이스 자동 반영
        const selected = res.data.find((c) => c.selected);
        if (selected) setTempSelected(selected.imageUrl);
      })
      .catch((err) => console.error("케이스 불러오기 실패:", err));
  }, [token]);

  // [2] 케이스 변경 저장
  const handleSave = () => {
    const selected = cases.find((c) => c.imageUrl === tempSelected);
    if (!selected) return;

    axios
      .patch(
        "https://gabom.shop/api/journal/case",
        { caseId: selected.id },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        navigate("/PassPort", { state: { selectedCase: tempSelected } });
      })
      .catch((err) => console.error("케이스 변경 실패:", err));
  };

  // [3] 카테고리별 그룹핑
  const groupedCases = cases.reduce((acc, c) => {
    if (!acc[c.category]) acc[c.category] = [];
    acc[c.category].push(c);
    return acc;
  }, {});

  return (
    <div className={styles.caseBoxContainer}>
      {/* 헤더 */}
      <div className={styles.header}>
        <button
          className={styles.backBtn}
          onClick={() => navigate("/PassPort")}
        >
          <img src={backIcon} alt="뒤로가기" />
        </button>
        <h2 className={styles.title}>케이스</h2>
      </div>

      {/* 케이스 리스트 */}
      <div className={styles.caseList}>
        {Object.entries(groupedCases).map(([category, items]) => (
          <div key={category}>
            <p className={styles.collectionName}>{category}</p>
            <div className={styles.imagesRow}>
              {items.map((c) => (
                <img
                  key={c.id} // ✅ 고유 key 사용
                  src={c.imageUrl}
                  alt={c.name}
                  className={`${styles.caseImage} ${
                    tempSelected === c.imageUrl ? styles.selected : ""
                  }`}
                  onClick={() => setTempSelected(c.imageUrl)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 하단 버튼 */}
      <button className={styles.changeBtn} onClick={handleSave}>
        변경하기
      </button>
    </div>
  );
}
