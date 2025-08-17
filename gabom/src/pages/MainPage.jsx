import { useEffect, useRef } from "react";
import "./MainPage.css";

function MainPage() {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!window.kakao) {
      console.error("⚠️ Kakao SDK 로드 안 됨");
      return;
    }

    window.kakao.maps.load(() => {
      if (!mapRef.current) {
        console.error("❌ mapRef 없음, div 확인 필요");
        return;
      }

      const map = new window.kakao.maps.Map(mapRef.current, {
        center: new window.kakao.maps.LatLng(37.5665, 126.978),
        level: 3,
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
        <input type="text" placeholder="검색" className="searchInput" />
      </div>

      {/* 하단 탭 (오버레이) */}
      <div className="bottomTab">
        <div className="tabItem">AI 채팅</div>
        <div className="tabItem">스탬프</div>
        <div className="tabItem">카메라</div>
        <div className="tabItem">랭킹</div>
        <div className="tabItem">마이페이지</div>
      </div>
    </div>
  );
}

export default MainPage;
