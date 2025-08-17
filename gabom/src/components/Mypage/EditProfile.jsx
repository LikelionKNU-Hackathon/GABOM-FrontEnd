import React, { useState } from "react";
import styles from "./EditProfile.module.css";

import emoji1 from "../../assets/profile/emoji_1.png";
import emoji2 from "../../assets/profile/emoji_2.png";
import emoji3 from "../../assets/profile/emoji_3.png";
import emoji4 from "../../assets/profile/emoji_4.png";
import emoji5 from "../../assets/profile/emoji_5.png";
import emoji6 from "../../assets/profile/emoji_6.png";
import emoji7 from "../../assets/profile/emoji_7.png";
import emoji8 from "../../assets/profile/emoji_8.png";

export default function EditProfile({ currentProfile, onSave, onClose }) {
  const profileOptions = [emoji1, emoji2, emoji3, emoji4, emoji5, emoji6, emoji7, emoji8];

  const [selectedProfile, setSelectedProfile] = useState(currentProfile);

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>프로필을 선택하세요</h2>

        {/* 현재 프로필 */}
        <div className={styles.currentProfile}>
          {selectedProfile && <img src={selectedProfile} alt="선택된 프로필" style={{width:"120px", height:"120px", borderRadius:"50%"}} />}
        </div>

        {/* 선택 가능한 프로필 */}
        <div className={styles.profileOptions}>
          {profileOptions.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`profile-${index}`}
              className={styles.option}
              onClick={() => setSelectedProfile(img)}
            />
          ))}
        </div>

        {/* 버튼 */}
        <div className={styles.buttonWrapper}>
          <button
            className={styles.clearBtn}
            onClick={() => setSelectedProfile(null)}
          >
            지우기
          </button>
          <button
            className={styles.saveBtn}
            onClick={() => onSave(selectedProfile)}
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}

