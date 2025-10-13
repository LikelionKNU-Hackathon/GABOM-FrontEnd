// StampStore.jsx 파일

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./StampStore.module.css"; 

import backIcon from "../../assets/icon/back.svg"; 
import image5000 from "../../assets/store/5000.png";
import image10000 from "../../assets/store/10000.png";
import image30000 from "../../assets/store/30000.png";

const exchangeOptions = [
  { id: 1, stampNeeded: 50, reward: "온누리 상품권 5,000원", image: image5000, barcode: "198201152003" },
  { id: 2, stampNeeded: 100, reward: "온누리 상품권 10,000원", image: image10000, barcode: "202403153541" },
  { id: 3, stampNeeded: 250, reward: "온누리 상품권 30,000원", image: image30000, barcode: "202403153542" },
];

export default function StampStore() {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [currentStampCount, setCurrentStampCount] = useState(250); 
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleExchange = (option) => {
    setSelectedOption(option);
    setIsModalOpen(true);
  };
  
  const handleSaveExchange = () => {
    if (!selectedOption) return;
    
    setIsModalOpen(false);
    
    navigate('/stampbarcode', { 
        state: {
            rewardName: selectedOption.reward,
            image: selectedOption.image,
            barcodeText: selectedOption.barcode, 
        }
    });
    
    setSelectedOption(null);
  };
  
  const handleStorageClick = () => {
      console.log("보관함 버튼 클릭: 추후 기능 구현 예정");
  };

  return (
    <div className={styles.container}>
      
      <div className={styles.header}>
        <img
          src={backIcon}
          alt="뒤로가기"
          className={styles.backBtn}
          onClick={() => navigate("/main")} 
        />
        <h1 className={styles.title}>스토어</h1>
        <button
          className={styles.storageBtn}
          onClick={handleStorageClick}
        >
          보관함
        </button>
      </div>

      <div className={styles.currentStampSection}>
        <p className={styles.userName}>이가현 님의 현재 스탬프 개수</p> 
        <div className={styles.stampCountBox}>
          <span className={styles.stampCount}>{currentStampCount}</span>
        </div>
      </div>

      <p className={styles.instruction}>
        스탬프를 지역상품권으로 교환해보세요.
      </p>

      <div className={styles.exchangeList}>
        {exchangeOptions.map((option) => {
          const isExchangable = currentStampCount >= option.stampNeeded; 
          
          return (
            <div 
                key={option.id} 
                className={styles.exchangeItem}
            >
              <div className={styles.rewardInfo}>
                <span className={styles.stampNeeded}>
                  스탬프 {option.stampNeeded}개
                </span>
                <span className={styles.reward}>{option.reward}</span>
              </div>
              <button
                className={styles.exchangeBtn}
                onClick={() => handleExchange(option)}
                disabled={!isExchangable} 
              >
                교환하기
              </button>
            </div>
          );
        })}
      </div>
      
      {isModalOpen && selectedOption && (
        <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div 
            className={styles.modalContent} 
            onClick={(e) => e.stopPropagation()} 
          >
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>스탬프 교환</h2>
            </div>
            
            <div className={styles.modalBody}>
              <img 
                src={selectedOption.image} 
                alt={`${selectedOption.reward} 상품권 이미지`} 
                className={styles.giftCertImage} 
              />
              <p className={styles.exchangeConfirmationText}>
                <span className={styles.highlightText}>스탬프 {selectedOption.stampNeeded}개</span>를
                <br/>
                <span className={styles.highlightText}>{selectedOption.reward}</span>로
                <br/>
                교환하시겠습니까?
              </p>
            </div>
            
            <button 
              className={styles.saveBtn} 
              onClick={handleSaveExchange}
            >
              저장하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}