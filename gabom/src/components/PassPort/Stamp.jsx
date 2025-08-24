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

  // 👉 count만큼 복제된 배열 만들기
  const expandedStamps = stamps.flatMap((s) =>
    Array.from({ length: s.count }, () => s)
  );

  // 👉 한 페이지에 9개씩 배치
  const stampsPerPage = 9;
  const startIdx = page * stampsPerPage;
  const stampsThisPage = expandedStamps.slice(
    startIdx,
    startIdx + stampsPerPage
  );

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

      {/* 스탬프 영역 */}
      <div className={styles.stampArea}>
        {stampsThisPage.map((s, idx) => {
          // 좌표 강제 보정 (화면 안쪽 10% ~ 90% 영역에만 배치)
          const x = s.xRatio ?? Math.random() * 0.8 + 0.1;
          const y = s.yRatio ?? Math.random() * 0.8 + 0.1;

          return (
            <img
              key={`${s.stampId}-${idx}`}
              src={s.imageUrl}
              alt={s.name}
              className={styles.stampImage}
              style={{
                left: `${x * 100}%`,
                top: `${y * 100}%`,
              }}
            />
          );
        })}
      </div>

      {/* 페이지 네비게이션 */}
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
              (p + 1) * stampsPerPage < expandedStamps.length ? p + 1 : p
            )
          }
          disabled={(page + 1) * stampsPerPage >= expandedStamps.length}
        >
          다음
        </button>
      </div>
    </div>
  );
}
