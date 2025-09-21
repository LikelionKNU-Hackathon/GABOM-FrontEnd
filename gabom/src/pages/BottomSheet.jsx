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
  const [activeTab, setActiveTab] = useState("home");
  const [review, setReview] = useState("");
  const startY = useRef(0);
  const currentY = useRef(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!store) return;
    const fetchDetail = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(
          `https://gabom.shop/api/stores/${store.id}`,
          token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
        );
        setDetail(res.data);
      } catch (err) {
        console.error("가게 상세 불러오기 실패:", err);
      }
    };
    fetchDetail();
  }, [store]);

  if (!store) return null;

  /** ✅ dragHandle 전용 제스처 */
  const handleTouchStart = (e) => {
    startY.current = e.touches[0].clientY;
  };
  const handleTouchMove = (e) => {
    currentY.current = e.touches[0].clientY;
  };
  const handleTouchEnd = () => {
    if (!expanded && startY.current - currentY.current > 50) {
      setExpanded(true);
    }
  };

  /** ✅ 닫기 */
  const handleClose = () => {
    setExpanded(false);
  };

  const handleVerifyClick = (e) => {
    e.stopPropagation();
    navigate("/camera");
  };

  const handleReviewSubmit = () => {
    if (!review.trim()) return;
    console.log("리뷰 등록:", review);
    setReview("");
  };

  return (
    <div className={`bottomSheet ${expanded ? "expanded" : ""}`}>
      {/* 드래그 핸들 (축소 상태에서만 보임) */}
      {!expanded && (
        <div
          className="dragHandle"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />
      )}

      {/* 축소 상태 */}
      {!expanded && (
        <div className="collapsedContent">
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
      {expanded && (
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
            {/* ✅ AI 한줄 요약 */}
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
                onClick={() => setActiveTab("review")}
              >
                리뷰
              </button>
            </div>

            {/* 홈 */}
            {activeTab === "home" && (
              <>
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
                {detail?.reviews && detail.reviews.length > 0 ? (
                  detail.reviews.map((r, i) => (
                    <div key={i} className="reviewItem">
                      <p className="reviewAuthor">{r.author}</p>
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
