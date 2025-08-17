import { useEffect, useRef } from "react";

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
          center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 서울시청
          level: 3,
        });

        console.log("✅ 지도 객체 생성 완료:", map);

        // ✅ 줌 컨트롤 UI 추가 (오른쪽에 버튼 표시)
        const zoomControl = new window.kakao.maps.ZoomControl();
        map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

        // ✅ 예시: 2초 후 부드럽게 확대
        setTimeout(() => {
          map.setLevel(map.getLevel() - 1, { animate: true });
        }, 2000);
      } else {
        console.error("❌ mapRef 없음, div 확인 필요");
      }
    });
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* 검색창 */}
      <div style={{ padding: "10px", background: "#fff", zIndex: 2 }}>
        <input
          type="text"
          placeholder="검색"
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "8px",
            border: "1px solid #ddd",
          }}
        />
      </div>

      {/* 지도 */}
      <div
        ref={mapRef}
        style={{
          flex: 1,
          minHeight: "400px",
          background: "#eee", // ✅ 디버깅용 배경
        }}
      />

      {/* 하단 탭 */}
      <div
        style={{
          height: "60px",
          background: "pink",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div>AI 채팅</div>
        <div>스탬프</div>
        <div>카메라</div>
        <div>랭킹</div>
        <div>마이페이지</div>
      </div>
    </div>
  );
}

export default MainPage;
