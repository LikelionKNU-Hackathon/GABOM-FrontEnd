import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AiChatPage.css";

// 이미지 import
import BackIcon from "../images/back.png";
import ChatLogo from "../images/logo_A.png";
import SendIcon from "../images/send.png"; // 종이비행기 아이콘

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: 1, // 실제 로그인 유저 ID로 교체
          message: input,
        }),
      });

      const data = await res.json();
      setMessages([
        ...newMessages,
        { role: "assistant", content: data.response },
      ]);
    } catch (err) {
      console.error(err);
    }

    setInput("");
  };

  return (
    <div className="chat-container">
      {/* 상단 헤더 */}
      <div className="chat-header">
        <img
          src={BackIcon}
          alt="뒤로가기"
          className="back-btn"
          onClick={() => navigate("/main")}
        />
      </div>

      {/* 대화 영역 (빈 경우 피그마 스타일) */}
      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="chat-empty">
            <h2 className="chat-title">AI 챗봇에게 물어보세요</h2>
            <img src={ChatLogo} alt="챗봇 로고" className="chat-logo" />
            <p className="chat-subtitle">
              오늘은 뭐 먹지?
              <br />
              취향저격 맛집을 발견해보세요.
            </p>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className={`chat-bubble ${msg.role}`}>
              {msg.content}
            </div>
          ))
        )}
      </div>

      {/* 입력창 */}
      <div className="chat-input">
        <div className="input-box">
          <input
            type="text"
            value={input}
            placeholder="메시지를 입력해주세요."
            onChange={(e) => setInput(e.target.value)}
            // 모바일 UX: 엔터 = 줄바꿈, 전송은 버튼 클릭만
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.stopPropagation(); // 엔터 눌러도 전송 안 되게 막음
              }
            }}
          />

          <button onClick={handleSend}>
            <img src={SendIcon} alt="보내기" />
          </button>
        </div>
      </div>
    </div>
  );
}
