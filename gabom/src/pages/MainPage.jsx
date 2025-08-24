import { useEffect, useRef, useState } from "react";
import "./MainPage.css";
import search from "../images/search.png";
import backIconPink from "../images/back_pink.png";
import chat from "../images/chat.png";
import passport from "../images/passport.png";
import camera from "../images/camera.png";
import rank from "../images/rank.png";
import mypage from "../images/mypage.png";
import markerIcon from "../images/pinbig.png";
import { Link, useNavigate } from "react-router-dom";
import BottomSheet from "./BottomSheet";
import axios from "axios";

function MainPage() {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [selectedStore, setSelectedStore] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const markersRef = useRef([]);
  const navigate = useNavigate();

  const useMock = false;

  useEffect(() => {
    if (!window.kakao) {
      console.error("⚠️ Kakao SDK 로드 안 됨");
      return;
    }

    window.kakao.maps.load(() => {
      if (mapRef.current) {
        const mapInstance = new window.kakao.maps.Map(mapRef.current, {
          center: new window.kakao.maps.LatLng(37.2717997, 127.127628),
          level: 4,
        });

        try {
          if (mapInstance.setPadding) mapInstance.setPadding(0, 0, 110, 0);
        } catch (e) {
          console.log("map.setPadding 미지원");
        }

        setMap(mapInstance);
      }
    });
  }, []);

  const handleSearch = async (e) => {
    if (e.key === "Enter" && keyword.trim() !== "") {
      let results = [];
      if (useMock) {
        const mock = [
          {
            id: 1,
            name: "틈새라면 강남점",
            category: "라면",
            openingHours: "11:00 ~ 21:00",
            address: "서울 강남구 어딘가 123",
            latitude: 37.498,
            longitude: 127.028,
            topVisitor: { nickname: "철수", visitCount: 5 },
            myVisit: { nickname: "길동이", visitCount: 2 },
          },
        ];
        results = mock.filter(
          (s) =>
            s.name.includes(keyword) ||
            s.category.includes(keyword) ||
            s.address.includes(keyword)
        );
      } else {
        try {
          const token = localStorage.getItem("accessToken");
          if (!token) {
            alert("로그인이 필요합니다.");
            navigate("/login");
            return;
          }

          const res = await axios.get(
            `https://gabom.shop/api/stores/search?keyword=${keyword}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          results = res.data;
        } catch (err) {
          console.error("검색 실패:", err);
          alert("검색 중 오류가 발생했습니다.");
        }
      }

      if (results && results.length > 0) {
        const store = results[0];
        setSelectedStore(store);

        if (map) {
          // 기존 마커 제거
          markersRef.current.forEach((m) => m.setMap(null));
          markersRef.current = [];

          const markerImage = new window.kakao.maps.MarkerImage(
            markerIcon,
            new window.kakao.maps.Size(34, 53),
            { offset: new window.kakao.maps.Point(20, 40) }
          );

          const marker = new window.kakao.maps.Marker({
            map,
            position: new window.kakao.maps.LatLng(
              store.latitude,
              store.longitude
            ),
            image: markerImage,
          });

          markersRef.current.push(marker);

          map.setCenter(
            new window.kakao.maps.LatLng(store.latitude, store.longitude)
          );
        }
      } else {
        alert("검색 결과 없음");
        setSelectedStore(null);
      }
    }
  };

  return (
    <div className="main">
      {/* 지도 */}
      <div ref={mapRef} className="mapContainer" />

      {/* 검색창 */}
      <div className="searchBar">
        {isSearching ? (
          <>
            <img
              src={backIconPink}
              alt="뒤로가기"
              className="BackIcon"
              onClick={() => {
                setIsSearching(false);
                setKeyword("");
                setSelectedStore(null);
                markersRef.current.forEach((m) => m.setMap(null));
                markersRef.current = [];
              }}
            />
            <input
              id="searchInput"
              type="text"
              placeholder="검색"
              className="searchInput"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleSearch}
              autoFocus
            />
            <img className="SearchImage" src={search} alt="검색" />
          </>
        ) : (
          <>
            <img className="SearchImage" src={search} alt="검색" />
            <input
              id="searchInput"
              type="text"
              placeholder="검색"
              className="searchInput"
              value={keyword}
              onFocus={() => setIsSearching(true)}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleSearch}
            />
          </>
        )}
      </div>

      {/* 상세보기 바텀시트 */}
      {selectedStore && (
        <BottomSheet
          store={selectedStore}
          onClose={() => setSelectedStore(null)}
        />
      )}

      {/* 하단 탭 */}
      <div className="bottomTab">
        <div className="tabItem">
          <Link to="/aichat">
            <img className="ChatImage" src={chat} alt="채팅" />
            AI 채팅
          </Link>
        </div>
        <div className="tabItem">
          <Link to="/PassPort">
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
