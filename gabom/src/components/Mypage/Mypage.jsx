import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Tier from "./Tier";
import styles from "./Mypage.module.css";

import backIcon from "../../assets/icon/back.svg";

export default function Mypage() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [showTier, setShowTier] = useState(false);

  // [1] 닉네임 불러오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("accessToken"); // ✅ accessToken 사용
        if (!token) {
          navigate("/");
          return;
        }

        const res = await axios.get("https://gabom.shop/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setNickname(res.data.nickname);
      } catch (err) {
        console.error("사용자 정보 조회 실패", err);
        if (err.response?.status === 401) {
          alert("다시 로그인 해주세요.");
          localStorage.removeItem("accessToken"); // ✅ accessToken 삭제
          navigate("/");
        }
      }
    };

    fetchUserInfo();
  }, [navigate]);

  const goToUserInfo = () => navigate("/userinfo");

  // [2] 로그아웃 처리
  const handleLogout = async () => {
    const confirmed = window.confirm("로그아웃 하시겠습니까?");
    if (!confirmed) return;

    try {
      const token = localStorage.getItem("accessToken");

      await axios.post(
        "https://gabom.shop/api/users/logout",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("로그아웃 되었습니다.");
    } catch (err) {
      console.error("서버 로그아웃 실패", err);
    } finally {
      localStorage.removeItem("accessToken"); // ✅ accessToken 삭제
      localStorage.removeItem("user");

      // ✅ 로그인 페이지로 이동
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
          onClick={() => navigate("/main")}
        />
        <h1 className={styles.title}>마이페이지</h1>
      </div>

      {/* 닉네임 */}
      <div className={styles.nickname}>
        {nickname ? `${nickname}님` : "불러오는 중..."}
      </div>

      {/* 버튼들 */}
      <button className={styles.mainBtn} onClick={goToUserInfo}>
        회원정보
      </button>

      <div className={styles.subBtnWrapper}>
        <button className={styles.subBtn} onClick={() => setShowTier(true)}>
          티어
        </button>
        <button className={styles.subBtn} onClick={() => navigate("/title")}>
          칭호
        </button>
      </div>

      {/* 로그아웃 */}
      <button className={styles.logoutBtn} onClick={handleLogout}>
        로그아웃
      </button>

      {/* 티어 팝업 */}
      {showTier && <Tier onClose={() => setShowTier(false)} />}
    </div>
  );
}
