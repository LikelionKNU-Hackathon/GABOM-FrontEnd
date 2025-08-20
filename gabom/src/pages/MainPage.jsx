// src/pages/MainPage.jsx
import { useEffect, useRef, useState } from "react";
import "./MainPage.css";
import search from "../images/search.png";
import chat from "../images/chat.png";
import passport from "../images/passport.png";
import camera from "../images/camera.png";
import rank from "../images/rank.png";
import mypage from "../images/mypage.png";
import { Link } from "react-router-dom";
import BottomSheet from "./BottomSheet";

function MainPage() {
  const mapRef = useRef(null);
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);

  // ✅ 개발 모드 스위치 (true = mock, false = 백엔드 API)
  const useMock = true;

  useEffect(() => {
    if (!window.kakao) {
      console.error("⚠️ Kakao SDK 로드 안 됨");
      return;
    }

    window.kakao.maps.load(() => {
      if (mapRef.current) {
        const map = new window.kakao.maps.Map(mapRef.current, {
          center: new window.kakao.maps.LatLng(37.2717997, 127.127628),
          level: 4,
        });

        try {
          if (map.setPadding) map.setPadding(0, 0, 110, 0);
        } catch (e) {
          console.log("map.setPadding 미지원");
        }
      }
    });
  }, []);

  // 🔎 검색 요청
  const handleSearch = async (e) => {
    if (e.key === "Enter" && keyword.trim() !== "") {
      if (useMock) {
        // ✅ Mock 데이터
        const mock = [
          {
            id: 1,
            name: "The 진분식",
            category: "분식",
            openingHours: "10:00 ~ 18:00",
            address: "경기 용인시 기흥구 동백죽전대로527번길 100-3",
          },
          {
            id: 2,
            name: "틈새라면",
            category: "라면",
            openingHours: "11:00 ~ 21:00",
            address: "서울 강남구 어딘가 123",
          },
        ];
        setResults(mock);
      } else {
        // ✅ 실제 API 연결
        try {
          const res = await fetch(`/api/stores/search?keyword=${keyword}`);
          const data = await res.json();
          setResults(data);
        } catch (err) {
          console.error("검색 실패:", err);
        }
      }
    }
  };

  return (
    <div className="main">
      {/* 지도 */}
      <div ref={mapRef} className="mapContainer" />

      {/* 검색창 */}
      <div className="searchBar">
        <img className="SearchImage" src={search} alt="검색" />
        <input
          id="searchInput" // ✅ 추가
          type="text"
          placeholder="검색"
          className="searchInput"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>

      {/* 검색 결과 리스트 */}
      {results.length > 0 && (
        <div className="searchResults">
          {results.map((store) => (
            <div
              key={store.id}
              className="searchResultItem"
              onClick={() => setSelectedStore(store)}
            >
              <h3>{store.name}</h3>
              <p>{store.category}</p>
              <p>{store.address}</p>
            </div>
          ))}
        </div>
      )}

      {/* 상세보기 바텀시트 */}
      <BottomSheet
        store={selectedStore}
        onClose={() => setSelectedStore(null)}
      />

      {/* 하단 탭 */}
      <div className="bottomTab">
        <div className="tabItem">
          <Link to="/aichat">
            <img className="ChatImage" src={chat} alt="채팅" />
            AI 채팅
          </Link>
        </div>
        <div className="tabItem">
          <Link to="/stamp">
            <img className="StampImage" src={passport} alt="스탬프" />
            스탬프
          </Link>
        </div>
        <div className="tabItem">
          <Link to="/camera">
            <img className="CameraImage" src={camera} alt="카메라" />
            카메라
          </Link>
        </div>
        <div className="tabItem">
          <Link to="/rank">
            <img className="RankImage" src={rank} alt="랭킹" />
            랭킹
          </Link>
        </div>
        <div className="tabItem">
          <Link to="/Mypage">
            <img className="MyPageImage" src={mypage} alt="마이페이지" />
            마이페이지
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
