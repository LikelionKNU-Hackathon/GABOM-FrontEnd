import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import StartPage from "./pages/StartPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import FindIdPage from "./pages/FindIdPage";
import FindPassWordPage from "./pages/FindPasswordPage";
import MainPage from "./pages/MainPage";
import AiChatPage from "./pages/AiChatPage";
import StampPage from "./components/PassPort/PassPort";
import CaseBox from "./components/PassPort/CaseBox";
import Stamp from "./components/PassPort/Stamp";
import CameraPage from "./pages/CameraPage";
import RankPage from "./pages/RankPage";

import Mypage from "./components/Mypage/Mypage";
import UserInfo from "./components/Mypage/UserInfo";
import Title from "./components/Mypage/Title";
import TitleList from "./components/Mypage/TitleList";

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
        <Route path="/aichat" element={<AiChatPage />} />
        <Route path="/PassPort" element={<StampPage />} />
        <Route path="/CaseBox" element={<CaseBox />} />
        <Route path="/Stamp" element={<Stamp />} />
        <Route path="/camera" element={<CameraPage />} />
        <Route path="/rank" element={<RankPage />} />
        {/* 마이페이지 관련 */}
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/userinfo" element={<UserInfo />} />
        <Route path="/title" element={<Title />} />
        <Route path="/titlelist" element={<TitleList />} />
      </Routes>
    </Router>
  );
}

export default App;
