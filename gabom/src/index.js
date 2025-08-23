import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { unregister } from "./serviceWorkerRegistration";  // ✅ 서비스워커 등록 해제용

// 서비스워커 해제 (캐시 방지)
unregister();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// 성능 측정 (선택 사항)
reportWebVitals();
