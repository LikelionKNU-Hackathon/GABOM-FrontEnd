import { useEffect, useRef } from "react";

export default function KakaoMap() {
  const mapRef = useRef(null);

  useEffect(() => {
    // 스크립트가 로드될 때까지 대기
    const t = setInterval(() => {
      if (window.kakao?.maps && mapRef.current) {
        const { kakao } = window;
        const map = new kakao.maps.Map(mapRef.current, {
          center: new kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        });
        clearInterval(t);
      }
    }, 50);
    return () => clearInterval(t);
  }, []);

  return <div ref={mapRef} style={{ width: "100%", height: 350 }} />;
}
