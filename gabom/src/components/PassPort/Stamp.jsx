import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Stamp.module.css";
import backIcon from "../../assets/icon/back.png";
import axios from "axios";

export default function Stamp() {
  const navigate = useNavigate();
  const [stamps, setStamps] = useState([]);
  const [page, setPage] = useState(0);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    axios
      .get("https://gabom.shop/api/user/stamps", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setStamps(res.data))
      .catch((err) => console.error("스탬프 불러오기 실패:", err));
  }, [token]);

  const stampsThisPage = stamps.filter((s) => s.page === page);

  return (
    <div className={styles.stampContainer}>
      <div className={styles.header}>
        <button
          className={styles.backBtn}
          onClick={() => navigate("/PassPort")}
        >
          <img src={backIcon} alt="뒤로가기" />
        </button>
      </div>

      <div className={styles.stampArea}>
        {stampsThisPage.map((s, idx) => (
          <img
            key={idx}
            src={s.imageUrl}
            alt={`stamp-${idx}`}
            className={styles.stampImage}
            style={{
              left: `${s.xRatio * 100}%`,
              top: `${s.yRatio * 100}%`,
            }}
          />
        ))}
      </div>

      <div className={styles.pageNav}>
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 0))}
          disabled={page === 0}
        >
          이전
        </button>
        <span>{page + 1} 페이지</span>
        <button onClick={() => setPage((p) => p + 1)}>다음</button>
      </div>
    </div>
  );
}
