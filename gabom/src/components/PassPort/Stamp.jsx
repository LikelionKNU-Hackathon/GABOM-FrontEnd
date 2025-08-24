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
      .then((res) => {
        console.log("✅ 스탬프 불러오기 성공:", res.data);
        setStamps(res.data);
      })
      .catch((err) => console.error("❌ 스탬프 불러오기 실패:", err));
  }, [token]);

  // 👉 한 페이지에 9개씩 (3x3 격자)
  const stampsPerPage = 9;
  const startIdx = page * stampsPerPage;
  const stampsThisPage = stamps.slice(startIdx, startIdx + stampsPerPage);

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
          <div key={s.stampId || idx} className={styles.stampSlot}>
            <img src={s.imageUrl} alt={s.name} className={styles.stampImage} />
          </div>
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
        <button
          onClick={() =>
            setPage((p) =>
              (p + 1) * stampsPerPage < stamps.length ? p + 1 : p
            )
          }
          disabled={(page + 1) * stampsPerPage >= stamps.length}
        >
          다음
        </button>
      </div>
    </div>
  );
}
