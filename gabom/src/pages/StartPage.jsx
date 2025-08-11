import { Link } from "react-router-dom";
import logo from "../images/logo_A.png";
import "./StartPage.css";

export default function StartPage() {
  return (
    <div>
      <p>오늘 당신이 가본 곳</p>
      <p>그 시작이 동네를 피웁니다.</p>
      <img className="LogoImage" src={logo} alt="로고" />
      <Link to="/login">
        <button>시작하기</button>
      </Link>
    </div>
  );
}
