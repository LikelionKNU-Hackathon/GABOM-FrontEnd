import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./CaseBox.module.css";

const caseCollections = [
  {
    name: "벚꽃 컬렉션",
    images: [
      require("../../assets/case/cherryblossom_1.png"),
      require("../../assets/case/cherryblossom_2.png"),
    ],
  },
  {
    name: "여름 컬렉션",
    images: [
      require("../../assets/case/summer_1.png"),
      require("../../assets/case/summer_2.png"),
      require("../../assets/case/summer_3.png"),
    ],
  },
  {
    name: "동물 컬렉션",
    images: [
      require("../../assets/case/animal_1.png"),
      require("../../assets/case/animal_2.png"),
      require("../../assets/case/animal_3.png"),
    ],
  },
  {
    name: "패턴 컬렉션",
    images: [
      require("../../assets/case/pattern_1.png"),
      require("../../assets/case/pattern_2.png"),
    ],
  },
];

export default function CaseBox() {
  const navigate = useNavigate();
  const location = useLocation();

  const [tempSelected, setTempSelected] = useState(location.state?.fromPassPort);

  return (
    <div className={styles.caseBoxContainer}>
      {/* 헤더 */}
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate("/passport")}>
          <img
            src={require("../../assets/icon/back.png")}
            alt="뒤로가기"
          />
        </button>
        <h2 className={styles.title}>케이스</h2>
      </div>

      {/* 케이스 리스트 */}
      <div className={styles.caseList}>
        {caseCollections.map((col) => (
          <div key={col.name}>
            <p className={styles.collectionName}>{col.name}</p>
            <div className={styles.imagesRow}>
              {col.images.map((img, index) => (
                <img
                  key={img}
                  src={img}
                  alt={`${col.name} ${index + 1}번째 케이스`}
                  className={`${styles.caseImage} ${
                    tempSelected === img ? styles.selected : ""
                  }`}
                  onClick={() => setTempSelected(img)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 하단 버튼 */}
      <button
        className={styles.changeBtn}
        onClick={() =>
          navigate("/PassPort", { state: { selectedCase: tempSelected } })
        }
      >
        변경하기
      </button>
    </div>
  );
}
