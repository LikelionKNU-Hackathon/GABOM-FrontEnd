import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartPage from "./pages/StartPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import FindIdPage from "./pages/FindIdPage";
import FindPassWordPage from "./pages/FindPasswordPage";
import MainPage from "./pages/MainPage";
import AiChatPage from "./pages/AiChatPage";
import StampPage from "./pages/StampPage";
import CameraPage from "./pages/CameraPage";
import RankPage from "./pages/RankPage";
import MyPage from "./pages/MyPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/findid" element={<FindIdPage />} />
        <Route path="/findpw" element={<FindPassWordPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/aichat" element={<MainPage />} />
        <Route path="/stamp" element={<MainPage />} />
        <Route path="/camera" element={<MainPage />} />
        <Route path="/rank" element={<MainPage />} />
        <Route path="/mypage" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
