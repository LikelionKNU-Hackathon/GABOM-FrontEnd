import { Link } from "react-router-dom";
import logo from "../images/logo_A.svg";
import "./StartPage.css";

export default function StartPage() {
  return (
    <div className="start-container">
      {/* 텍스트 + 로고 묶음 */}
      <div className="top-content">
        <p className="start-text">
          오늘 당신이 가본 곳<br />그 시작이 동네를 피웁니다.
        </p>
        <img className="LogoImage" src={logo} alt="로고" />
      </div>

      {/* 시작 버튼 */}
      <Link to="/login">
        <button className="StartButton">시작하기</button>
      </Link>
    </div>
  );
}
