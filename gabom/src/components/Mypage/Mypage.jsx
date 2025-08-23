import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EditProfile from "./EditProfile";
import Tier from "./Tier";
import styles from "./Mypage.module.css";

import backIcon from "../../assets/icon/back.png";
import pencilIcon from "../../assets/icon/pencil.png";

const defaultProfile = null;

export default function Mypage() {
  const navigate = useNavigate();
  const [currentProfile, setCurrentProfile] = useState(defaultProfile);
  const [showModal, setShowModal] = useState(false);
  const [showTier, setShowTier] = useState(false);
  const [title, setTitle] = useState("편의점 마니아"); 

  useEffect(() => {
    const savedTitle = localStorage.getItem("selectedTitle");
    if (savedTitle) {
      setTitle(savedTitle);
    }
  }, []);

  const goToUserInfo = () => navigate("/userinfo");

  const handleSaveProfile = (img) => {
    setCurrentProfile(img);
    setShowModal(false);
  };

  // 로그아웃 처리 
  const handleLogout = () => {
    const confirmed = window.confirm("로그아웃 하시겠습니까?");
    if (confirmed) {
      // 필요 시 토큰 삭제 등 로그아웃 처리
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/"); 
    }
  };

  return (
    <div className={styles.container}>
      {/* 상단 헤더 */}
      <div className={styles.header}>
        <img
          src={backIcon}
          alt="뒤로가기"
          className={styles.backBtn}
          onClick={() => navigate("/Main")}
        />
        <h1 className={styles.title}>마이페이지</h1>
      </div>

      {/* 프로필 사진 + 연필 */}
      <div className={styles.profileWrapper}>
        {currentProfile ? (
          <img src={currentProfile} alt="프로필" className={styles.profileImage} />
        ) : (
          <div className={styles.profileImage}></div>
        )}
        <div
          className={styles.editIcon}
          style={{
            backgroundImage: `url(${pencilIcon})`,
            backgroundColor: "#FFE6E7",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "50%",
          }}
          onClick={() => setShowModal(true)}
        ></div>
      </div>

      {/* 닉네임 + 티어/칭호 */}
      <div className={styles.nickname}>밥은먹고하자님</div>
      <div className={styles.tierTitle}>초행자 / {title}</div>

      {/* 버튼들 */}
      <button className={styles.mainBtn} onClick={goToUserInfo}>
        회원정보
      </button>

      <div className={styles.subBtnWrapper}>
        <button className={styles.subBtn} onClick={() => setShowTier(true)}>
          티어
        </button>
        <button
          className={styles.subBtn}
          onClick={() => navigate("/title")}
        >
          칭호
        </button>
      </div>

      {/* 로그아웃 */}
      <button className={styles.logoutBtn} onClick={handleLogout}>
        로그아웃
      </button>

      {/* EditProfile 모달 */}
      {showModal && (
        <EditProfile
          currentProfile={currentProfile}
          onSave={handleSaveProfile}
          onClose={() => setShowModal(false)}
        />
      )}

      {/* Tier 팝업 */}
      {showTier && <Tier onClose={() => setShowTier(false)} />}
    </div>
  );
}
