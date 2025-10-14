import React from "react";
import { useNavigate, useLocation } from "react-router-dom"; 
import styles from "./stampbarcode.module.css";
import backIcon from "../../assets/icon/back.svg"; 
import image5000 from "../../assets/store/5000.png";
// eslint-disable-next-line no-unused-vars
import image10000 from "../../assets/store/10000.png";
// eslint-disable-next-line no-unused-vars
import image30000 from "../../assets/store/30000.png";
import barcodeImage from "../../assets/store/barcode.png"; 


export default function StampBarcode() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const { rewardName, image, barcodeText } = location.state || { 
      rewardName: "온누리 상품권 5,000원", 
      image: image5000, 
      barcodeText: "198201152003" 
  }; 

  return (
    <div className={styles.container}>
      
      <div className={styles.header}>
        <img
          src={backIcon}
          alt="뒤로가기"
          className={styles.backBtn}
          onClick={() => navigate("/stampstore")} 
        />
        <h1 className={styles.title}>스탬프 교환</h1>
      </div>

      <div className={styles.content}>
        
        <img 
            src={image} 
            alt={rewardName} 
            className={styles.giftCertImage} 
        />
        
        <p className={styles.rewardName}>{rewardName}</p>
        
        <div className={styles.barcodeSection}>
            <p className={styles.barcodeNumber}>{barcodeText}</p>

            <img 
                src={barcodeImage} 
                alt="바코드" 
                className={styles.actualBarcodeImage} 
            />
        </div>
      </div>
    </div>
  );
}