import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PassPort.module.css";
import backIcon from "../../assets/icon/back.png";
import defaultCase from "../../assets/case/cherryblossom_2.png";
import axios from "axios";

export default function PassPort() {
  const navigate = useNavigate();
  const [selectedCase, setSelectedCase] = useState(defaultCase);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    axios
      .get("https://gabom.shop/api/journal/cases", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const selected = res.data.find((c) => c.selected);
        if (selected) setSelectedCase(selected.imageUrl);
      })
      .catch((err) => console.error("현재 케이스 불러오기 실패:", err));
  }, []);

  return (
    <div className={styles.stampContainer}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate("/Main")}>
          <img src={backIcon} alt="뒤로가기" />
        </button>
        <h2 className={styles.title}>스탬프</h2>
      </div>

      <div className={styles.stampImageWrapper}>
        <img
          src={selectedCase}
          alt="케이스 사진"
          className={styles.caseImage}
          onClick={() => navigate("/Stamp", { state: { selectedCase } })}
        />
      </div>

      <button className={styles.caseBtn} onClick={() => navigate("/CaseBox")}>
        케이스 보관함
      </button>
    </div>
  );
}
