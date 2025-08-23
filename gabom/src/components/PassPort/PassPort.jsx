import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import backIcon from "../../assets/icon/back.png";
import defaultCase from "../../assets/case/cherryblossom_2.png";
import styles from "./PassPort.module.css";

export default function PassPort() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const selectedCase = location.state?.selectedCase || defaultCase;


  const handleCaseClick = (caseImage, category) => {
    navigate("/Stamp", { state: { selectedCase: caseImage, stampCategory: category } });
  };

  return (
    <div className={styles.stampContainer}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate("/Main")}>
          <img src={backIcon} alt="뒤로가기" width={20} height={20} />
        </button>
        <h2 className={styles.title}>스탬프</h2>
      </div>

      <div className={styles.stampImageWrapper}>
        <img
          src={selectedCase}
          alt="케이스 사진"
          className={styles.caseImage}
          onClick={() => handleCaseClick(selectedCase)} 
        />
      </div>

      <button
        className={styles.caseBtn}
        onClick={() =>
          navigate("/CaseBox", { state: { fromPassPort: selectedCase } })
        }
      >
        케이스 보관함
      </button>
    </div>
  );
}
