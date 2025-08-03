import styles from './VoiceChat.module.css';
import { MdChatBubble } from "react-icons/md";

interface VoiceChatProps {
  onStartTextChat: () => void;
}

const VoiceChat = ({ onStartTextChat }: VoiceChatProps) => {
  return (
    <div className={styles.voiceContainer}>
      <div className={styles.singleBubble}></div>
      <div className={styles.bottomTray}>
        <div className={styles.waveform}>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
          {/* Added more bars to make the waveform wider */}
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
        </div>
        <button onClick={onStartTextChat} className={styles.iconButton}>
          <MdChatBubble size={28} /> {/* Increased from 24 */}
        </button>
      </div>
    </div>
  );
};

export default VoiceChat;