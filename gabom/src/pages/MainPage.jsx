import { useEffect, useRef } from "react";
import "./MainPage.css";
import search from "../images/search.png";
import chat from "../images/chat.png";
import passport from "../images/passport.png";
import camera from "../images/camera.png";
import rank from "../images/rank.png";
import mypage from "../images/mypage.png";
import { Link } from "react-router-dom";

function MainPage() {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!window.kakao) {
      console.error("⚠️ Kakao SDK 로드 안 됨");
      return;
    }

    window.kakao.maps.load(() => {
      console.log("✅ kakao.maps.load 실행됨");

      if (mapRef.current) {
        console.log("✅ mapRef 있음, 지도 생성 시도");

        const map = new window.kakao.maps.Map(mapRef.current, {
          center: new window.kakao.maps.LatLng(37.5665, 126.978), // 서울시청
          level: 3,
        });

        console.log("✅ 지도 객체 생성 완료:", map);

        // ✅ 예시: 2초 후 부드럽게 확대
        setTimeout(() => {
          map.setLevel(map.getLevel() - 1, { animate: true });
        }, 2000);
      } else {
        console.error("❌ mapRef 없음, div 확인 필요");
        return;
      }

      const map = new window.kakao.maps.Map(mapRef.current, {
        center: new window.kakao.maps.LatLng(37.2717997, 127.127628),
        level: 4,
      });

      // (선택) 하단바에 가려지는 느낌 보정
      try {
        if (map.setPadding) map.setPadding(0, 0, 110, 0); // top, right, bottom, left
      } catch (e) {
        console.log("map.setPadding 미지원");
      }

      map.setLevel(map.getLevel() + 1, { animate: true });
      console.log("✅ 지도 객체 생성 완료:", map);
    });
  }, []);

  return (
    <div className="main">
      {/* 지도 (배경) */}
      <div ref={mapRef} className="mapContainer" />

      {/* 검색창 (오버레이) */}
      <div className="searchBar">
        <img className="SearchImage" src={search} alt="검색" />
        <input type="text" placeholder="검색" className="searchInput" />
      </div>

      {/* 하단 탭 (오버레이) */}
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
