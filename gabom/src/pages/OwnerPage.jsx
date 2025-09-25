import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BackIcon from "../images/back.svg";
import twinkle from "../images/twinkle.svg";
import information from "../images/information.svg";
import refreshIcon from "../images/refresh.svg";

import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import "./OwnerPage.css";

export default function OwnerPage() {
  const [competition, setCompetition] = useState(null);
  const [sentiment, setSentiment] = useState(null);
  const [storeName, setStoreName] = useState("");
  const [storeId, setStoreId] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");

  // ✅ 사장님 정보 불러오기
  const fetchOwnerInfo = useCallback(async () => {
    try {
      const res = await axios.get("https://gabom.shop/api/owners/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { storeName, storeId } = res.data;
      setStoreName(storeName);
      setStoreId(storeId);

      if (storeName) localStorage.setItem("storeName", storeName);
      if (storeId) localStorage.setItem("storeId", storeId);
    } catch (err) {
      console.error("❌ 사장님 정보 불러오기 실패:", err);
    }
  }, [token]);

  // 경쟁 분석
  const fetchCompetition = useCallback(
    async (refresh = false) => {
      if (!storeId) return;
      try {
        const res = await axios.get(
          `https://gabom.shop/api/owners/${storeId}/analysis/competition`,
          {
            headers: { Authorization: `Bearer ${token}` },
            params: { refresh },
          }
        );
        setCompetition(res.data);
      } catch (err) {
        console.error("❌ 경쟁 분석 불러오기 실패:", err);
      }
    },
    [storeId, token]
  );

  // 감정 분석
  const fetchSentiment = useCallback(
    async (refresh = false) => {
      if (!storeId) return;
      try {
        const res = await axios.get(
          `https://gabom.shop/api/owners/${storeId}/analysis/sentiment`,
          {
            headers: { Authorization: `Bearer ${token}` },
            params: { refresh },
          }
        );
        setSentiment(res.data);
      } catch (err) {
        console.error("❌ 감정 분석 불러오기 실패:", err);
      }
    },
    [storeId, token]
  );

  // 처음 진입 시 사장님 정보 불러오기
  useEffect(() => {
    fetchOwnerInfo();
  }, [fetchOwnerInfo]);

  // storeId 생기면 분석 불러오기
  useEffect(() => {
    if (storeId) {
      fetchCompetition();
      fetchSentiment();
    }
  }, [storeId, fetchCompetition, fetchSentiment]);

  const COLORS = ["#8884d8", "#ff6b6b"];

  return (
    <div className="owner-analysis-container">
      <div className="header-top">
        <img
          className="backIcon"
          src={BackIcon}
          alt="뒤로가기"
          onClick={() => navigate("/")}
        />
      </div>

      {/* 가게 이름 */}
      <h1 className="page-title">
        <img className="twinkle" src={twinkle} alt="반짝" />
        {storeName || "가게 정보 불러오는 중..."} 경쟁 가게 분석
      </h1>
      <p className="desc">
        <img className="information" src={information} alt="정보" /> 모든 분석은
        AI를 활용해 진행되었습니다.
      </p>

      {/* 경쟁 가게 분석 */}
      <section className="analysis-section">
        <div className="section-header">
          <h2 className="section-title">경쟁 가게 분석</h2>
          <button
            onClick={() => fetchCompetition(true)}
            className="refresh-btn"
          >
            <img src={refreshIcon} alt="새로고침" className="refresh-icon" />
          </button>
        </div>
        {competition ? (
          <div className="chart-box">
            <ResponsiveContainer width="100%" height={235}>
              <RadarChart
                cx="50%"
                cy="50%"
                outerRadius="80%"
                data={[
                  {
                    subject: "가성비",
                    내점수: competition.myPrice,
                    경쟁: competition.compPrice,
                  },
                  {
                    subject: "양",
                    내점수: competition.myQuantity,
                    경쟁: competition.compQuantity,
                  },
                  {
                    subject: "맛",
                    내점수: competition.myTaste,
                    경쟁: competition.compTaste,
                  },
                  {
                    subject: "서비스",
                    내점수: competition.myService,
                    경쟁: competition.compService,
                  },
                  {
                    subject: "위생",
                    내점수: competition.myClean,
                    경쟁: competition.compClean,
                  },
                ]}
              >
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <Radar
                  name="내 가게"
                  dataKey="내점수"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
                <Radar
                  name="경쟁 가게"
                  dataKey="경쟁"
                  stroke="#ff6b6b"
                  fill="#ff6b6b"
                  fillOpacity={0.6}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="empty-box">
            <p>데이터가 부족합니다.</p>
            <button
              onClick={() => fetchCompetition(true)}
              className="refresh-btn"
            >
              <img src={refreshIcon} alt="새로고침" className="refresh-icon" />
            </button>
          </div>
        )}
      </section>

      {/* 리뷰 감정 분석 */}
      <section className="analysis-section">
        <div className="section-header">
          <h2 className="section-title">리뷰 감정 분석</h2>
          <button onClick={() => fetchSentiment(true)} className="refresh-btn">
            <img src={refreshIcon} alt="새로고침" className="refresh-icon" />
          </button>
        </div>
        {sentiment ? (
          <div className="chart-box">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={[
                    { name: "긍정", value: sentiment.positive },
                    { name: "부정", value: sentiment.negative },
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  label
                  dataKey="value"
                >
                  <Cell key="긍정" fill={COLORS[0]} />
                  <Cell key="부정" fill={COLORS[1]} />
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="empty-box">
            <p>분석 데이터가 없습니다.</p>
            <button
              onClick={() => fetchSentiment(true)}
              className="refresh-btn"
            >
              {" "}
              <img
                src={refreshIcon}
                alt="새로고침"
                className="refresh-icon"
              />{" "}
            </button>
          </div>
        )}
      </section>

      <button className="logout-btn" onClick={() => navigate("/")}>
        로그아웃
      </button>
    </div>
  );
}
