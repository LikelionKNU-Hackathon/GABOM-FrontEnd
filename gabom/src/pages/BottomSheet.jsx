import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import backicon from "../images/back.svg";
import closeicon from "../images/cancel.svg";
import aisummaryicon from "../images/aisummary.svg";
import "./BottomSheet.css";

export default function BottomSheet({ store }) {
  const [expanded, setExpanded] = useState(false);
  const [detail, setDetail] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [activeTab, setActiveTab] = useState("home");
  const [review, setReview] = useState("");

  const startY = useRef(0);
  const currentY = useRef(0);
  const isDragging = useRef(false);
  const navigate = useNavigate();

  // ✅ 가게 상세 조회
  useEffect(() => {
    if (!store || !store.id) return;

    const fetchDetail = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(
          `https://gabom.shop/api/stores/${store.id}`,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }
        );
        setDetail(res.data);
      } catch (err) {
        console.error("가게 상세 불러오기 실패:", err);
      }
    };

    fetchDetail();
  }, [store]);

  // ✅ 리뷰 조회
  const fetchReviews = async () => {
    if (!store || !store.id) return;
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.get(
        `https://gabom.shop/api/stores/${store.id}/reviews`,
        {
          params: { page: 0, size: 10 },
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      setReviews(res.data);
    } catch (err) {
      console.error("리뷰 불러오기 실패:", err);
    }
  };

  // ✅ dragHandle 전용 제스처 (상단 50px만 반응)
  const handleTouchStart = (e) => {
    const touchY = e.touches[0].clientY;
    const elementTop = e.currentTarget.getBoundingClientRect().top;

    if (touchY - elementTop < 50) {
      startY.current = touchY;
      isDragging.current = true;
    } else {
      isDragging.current = false;
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    currentY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (!isDragging.current) return;

    if (!expanded && startY.current - currentY.current > 50) {
      setExpanded(true);
    }
    isDragging.current = false;
  };

  // ✅ 닫기
  const handleClose = () => {
    setExpanded(false);
  };

  // ✅ 인증하기
  const handleVerifyClick = (e) => {
    e.stopPropagation();
    navigate("/camera");
  };

  // ✅ 리뷰 등록
  const handleReviewSubmit = async () => {
    if (!review.trim()) return;

    try {
      const token = localStorage.getItem("accessToken");
      await axios.post(
        `https://gabom.shop/api/stores/${store.id}/reviews`,
        { content: review },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      setReview("");
      fetchReviews();
    } catch (err) {
      console.error("리뷰 등록 실패:", err);
      alert("리뷰 등록 중 오류가 발생했습니다.");
    }
  };

  if (!store) return null;

  return (
    <div
      className={`bottomSheet ${expanded ? "expanded" : ""}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 축소 상태 */}
      {!expanded && detail && (
        <div className="collapsedContent">
          <div className="dragHandle" /> {/* 시각적으로 상단바 유지 */}
          <div className="storeInfoBlock">
            <div className="storeInfoText">
              <h2 className="storeName">{store.name}</h2>
              <p>요리주점 · 리뷰 {detail?.reviewCount || 0}개</p>
              <p>영업시간 · {store.openingHours}</p>
              <p>주소 · {store.address}</p>
            </div>
            <button className="verifyBtn" onClick={handleVerifyClick}>
              인증하기
            </button>
          </div>
        </div>
      )}

      {/* 확장 상태 */}
      {expanded && detail && (
        <>
          <div className="modalHeader">
            <button className="backBtn" onClick={handleClose}>
              <img src={backicon} alt="뒤로가기" />
            </button>
            <button className="closeBtn" onClick={handleClose}>
              <img src={closeicon} alt="닫기" />
            </button>
          </div>

          <div className="sheetContent">
            {/* 가게 정보 */}
            <div className="storeInfoBlock">
              <div className="storeInfoText">
                <h2 className="storeName">{store.name}</h2>
                <p>요리주점 · 리뷰 {detail?.reviewCount || 0}개</p>
                <p>영업시간 · {store.openingHours}</p>
                <p>주소 · {store.address}</p>
              </div>
              <button className="verifyBtn" onClick={handleVerifyClick}>
                인증하기
              </button>
            </div>

            {/* AI 요약 */}
            <div className="aiSummary">
              <img src={aisummaryicon} alt="ai요약" />
              <span>AI 한줄 요약: {detail?.aiSummary || ""}</span>
            </div>

            {/* 탭 */}
            <div className="tabs">
              <button
                className={activeTab === "home" ? "active" : ""}
                onClick={() => setActiveTab("home")}
              >
                홈
              </button>
              <button
                className={activeTab === "review" ? "active" : ""}
                onClick={() => {
                  setActiveTab("review");
                  fetchReviews();
                }}
              >
                리뷰
              </button>
            </div>

            {/* 홈 */}
            {activeTab === "home" && (
              <>
                {/* 카드 */}
                <div className="card">
                  <div className="cardLeft">
                    <span className="icon">🏆</span>
                    <span className="cardTitle">최다 방문자</span>
                  </div>
                  <div className="cardRight">
                    {detail?.topVisitor ? (
                      <>
                        <span>{detail.topVisitor.nickname}</span>
                        <span className="count">
                          {detail.topVisitor.visitCount}번 방문
                        </span>
                      </>
                    ) : (
                      <span>기록 없음</span>
                    )}
                  </div>
                </div>

                <div className="card">
                  <div className="cardLeft">
                    <span className="icon">👤</span>
                    <span className="cardTitle">방문횟수</span>
                  </div>
                  <div className="cardRight">
                    {detail?.myVisit ? (
                      <>
                        <span>{detail.myVisit.nickname}</span>
                        <span className="count">
                          {detail.myVisit.visitCount}번 방문
                        </span>
                      </>
                    ) : (
                      <span>방문 기록 없음</span>
                    )}
                  </div>
                </div>

                {/* 리뷰 작성 */}
                <div className="reviewBox">
                  <p className="reviewLabel">리뷰 작성</p>
                  <textarea
                    placeholder={`리뷰를 작성해 주세요.\n\n리뷰를 보는 다른 이용자와 사업자에게 상처를 주거나 법적 분쟁의 소지가 발생하는 일이 없도록 욕설, 비방, 명예훼손성 표현은 삼가해 주세요.`}
                    rows="6"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                  ></textarea>
                  <button className="submitBtn" onClick={handleReviewSubmit}>
                    등록
                  </button>
                </div>
              </>
            )}

            {/* 리뷰 */}
            {activeTab === "review" && (
              <div className="reviewList">
                {reviews.length > 0 ? (
                  reviews.map((r) => (
                    <div key={r.id} className="reviewItem">
                      <div className="reviewHeader">
                        <p className="reviewAuthor">{r.nickname}</p>
                        <span className="reviewTime">
                          {new Date(r.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p className="reviewText">{r.content}</p>
                    </div>
                  ))
                ) : (
                  <p className="emptyText">아직 리뷰가 없습니다.</p>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
