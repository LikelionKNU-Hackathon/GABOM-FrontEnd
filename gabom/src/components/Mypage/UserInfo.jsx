import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./UserInfo.module.css";
import backIcon from "../../assets/icon/back.svg";

export default function UserInfo() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState(""); // 변경 시에만 사용
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");

  // [1] 처음 진입 시 내 정보 불러오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await axios.get("https://gabom.shop/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsername(res.data.username);
        setLoginId(res.data.loginId);
        setEmail(res.data.email);
        setNickname(res.data.nickname);
      } catch (err) {
        console.error("회원정보 불러오기 실패", err);
        alert("회원정보를 불러오지 못했습니다. 다시 로그인해주세요.");
        navigate("/login");
      }
    };

    fetchUserInfo();
  }, [navigate]);

  // [2] 저장하기 (수정)
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.patch(
        "https://gabom.shop/api/users/me",
        {
          username,
          password: password || null, // 비번 변경 안하면 null
          email,
          nickname,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("회원정보가 수정되었습니다.");
      navigate(-1); // 이전 페이지로
    } catch (err) {
      console.error("회원정보 수정 실패", err);
      alert("회원정보 수정 중 오류가 발생했습니다.");
    }
  };

  // [3] 탈퇴하기
  const handleWithdraw = async () => {
    const confirmed = window.confirm("정말 탈퇴하시겠습니까?");
    if (!confirmed) return;

    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete("https://gabom.shop/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("회원 탈퇴가 완료되었습니다.");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      navigate("/");
    } catch (err) {
      console.error("회원 탈퇴 실패", err);
      alert("회원 탈퇴 중 오류가 발생했습니다.");
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
          onClick={() => navigate(-1)}
        />
        <h1 className={styles.title}>회원정보</h1>
      </div>

      {/* 입력 필드 */}
      <div className={styles.inputSet}>
        <label className={styles.label}>이름</label>
        <input
          className={styles.input}
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className={styles.inputSet}>
        <label className={styles.label}>아이디</label>
        <input
          className={styles.input}
          type="text"
          value={loginId}
          disabled // 아이디는 수정 불가
        />
      </div>

      <div className={styles.inputSet}>
        <label className={styles.label}>비밀번호</label>
        <input
          className={styles.input}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="변경 시에만 입력"
        />
      </div>

      <div className={styles.inputSet}>
        <label className={styles.label}>이메일</label>
        <input
          className={styles.input}
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className={styles.inputSet}>
        <label className={styles.label}>닉네임</label>
        <input
          className={styles.input}
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </div>

      {/* 탈퇴하기 */}
      <div className={styles.withdraw} onClick={handleWithdraw}>
        탈퇴하기
      </div>

      {/* 저장하기 버튼 */}
      <button className={styles.saveBtn} onClick={handleSave}>
        저장하기
      </button>
    </div>
  );
}
