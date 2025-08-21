import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserInfo.module.css";

// 뒤로가기 이미지
import backIcon from "../../assets/icon/back.png";

export default function UserInfo() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const inputs = ["이름", "아이디", "비밀번호", "이메일", "닉네임"];

  const handleSave = () => {
    navigate(-1); 
  };

  return (
    <div className={styles.container}>
      {/* 헤더 */}
      <div className={styles.header}>
        <img src={backIcon} alt="뒤로가기" className={styles.backBtn} onClick={goBack} />
        <h1 className={styles.title}>회원정보</h1>
      </div>

      {/* 입력 세트 */}
      {inputs.map((labelText, index) => (
        <div className={styles.inputSet} key={index}>
          <label className={styles.label}>{labelText}</label>
          <input
            className={styles.input}
            type={labelText === "비밀번호" ? "password" : "text"}
          />
        </div>
      ))}

      {/* 탈퇴하기 */}
      <div className={styles.withdraw}>탈퇴하기</div>

      {/* 저장하기 버튼 */}
      <button className={styles.saveBtn} onClick={handleSave}>
        저장하기
      </button>
    </div>
  );
}
