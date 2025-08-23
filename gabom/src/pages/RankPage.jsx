import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import backimage from "../images/back.png";
import "./RankPage.css";

/**
 * 개발 중에는 true로 두고 Mock 데이터 확인
 * 백엔드 연결할 때 false로 바꾸세요.
 */
const USE_MOCK = false;

const MOCK = {
  topRanks: [
    { userId: 1, rank: 1, nickname: "길동이", stampCount: 50 },
    { userId: 2, rank: 2, nickname: "김철수", stampCount: 45 },
    { userId: 3, rank: 3, nickname: "이영희", stampCount: 40 },
  ],
  myRank: { userId: 99, rank: 99, nickname: "박소윤", stampCount: 5 },
  otherRanks: Array.from({ length: 50 }, (_, i) => ({
    userId: i + 4,
    rank: i + 4,
    nickname: `유저${i + 4}`,
    stampCount: Math.floor(Math.random() * 30),
  })),
};

export default function RankPage() {
  const [ranks, setRanks] = useState([]);
  const [myRank, setMyRank] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const loadFromApi = async () => {
    setLoading(true);
    setErr("");
    try {
      const res = await axios.get("https://gabom.shop/api/rankings", {
        withCredentials: true,
      });

      const { topRanks = [], otherRanks = [], myRank } = res.data;

      // 백엔드에서 stampCount → score 변환
      const mappedTop = topRanks.map((u) => ({
        ...u,
        score: u.stampCount,
      }));
      const mappedOther = otherRanks.map((u) => ({
        ...u,
        score: u.stampCount,
      }));

      setRanks([...mappedTop, ...mappedOther]);
      setMyRank(myRank ? { ...myRank, score: myRank.stampCount } : null);
    } catch (e) {
      console.error(e);
      setErr("랭킹 불러오기 실패");
    } finally {
      setLoading(false);
    }
  };

  const loadMock = () => {
    const mappedTop = MOCK.topRanks.map((u) => ({
      ...u,
      score: u.stampCount,
    }));
    const mappedOther = MOCK.otherRanks.map((u) => ({
      ...u,
      score: u.stampCount,
    }));
    const my = MOCK.myRank
      ? { ...MOCK.myRank, score: MOCK.myRank.stampCount }
      : null;

    setRanks([...mappedTop, ...mappedOther]);
    setMyRank(my);
    setLoading(false);
  };

  useEffect(() => {
    USE_MOCK ? loadMock() : loadFromApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="RankPageContainer">
      <div className="rankheader">
        <button className="BackBtn" onClick={() => navigate(-1)}>
          <img src={backimage} alt="뒤로가기" width={12} height={24} />
        </button>
        <h2 className="ranktext">랭킹</h2>
      </div>

      {loading ? (
        <div className="rank-skeleton">불러오는 중…</div>
      ) : (
        <>
          {/* TOP 3 */}
          <div className="top3">
            {ranks.slice(0, 3).map((user, idx) => (
              <div key={user.rank} className={`rank-item rank-${idx + 1}`}>
                <span className="rank-crown">
                  {idx === 0 ? "👑" : idx === 1 ? "🥈" : "🥉"}
                </span>
                <p className="rank-nickname">{user.nickname}</p>
                <p className="rank-score">{user.score.toLocaleString()}개</p>
              </div>
            ))}
          </div>

          {/* 내 랭킹 */}
          {/* 내 랭킹 */}
          {myRank && (
            <div className="my-rank">
              <span className="rank-no">{myRank.rank}위</span>
              <span className="rank-nickname">{myRank.nickname}</span>
              <span className="rank-score">
                {myRank.score.toLocaleString()}개
              </span>
            </div>
          )}

          {/* 나머지 랭킹 리스트 */}
          {/* 전체 랭킹 리스트 */}
          <div className="rank-list">
            {ranks.slice(3).map((user) => (
              <div key={user.rank} className="rank-row">
                <span className="rank-no">{user.rank}위</span>
                <span className="rank-nickname">{user.nickname}</span>
                <span className="rank-score">
                  {user.score.toLocaleString()}개
                </span>
              </div>
            ))}
          </div>

          {err && (
            <div className="rank-error">
              {err}
              {!USE_MOCK && (
                <button className="mockBtn" onClick={loadMock}>
                  데모 데이터 보기
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
