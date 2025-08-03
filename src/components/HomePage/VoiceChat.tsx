'use client';

// Import the stylesheet for this component
import styles from './VoiceChat.module.css';
// Import the icon from the react-icons library
import { MdChatBubble } from "react-icons/md";

// Define the props that this component accepts using a TypeScript interface
interface VoiceChatProps {
  // This prop is a function that will be called when the chat icon is clicked.
  // It allows the parent component (HomePage) to switch the view back to the text chat.
  onStartTextChat: () => void;
}

const VoiceChat = ({ onStartTextChat }: VoiceChatProps) => {
  return (
    // Main container for the voice UI, styled by the CSS module
    <div className={styles.voiceContainer}>
      
      {/* A single decorative bubble, positioned via CSS */}
      <div className={styles.singleBubble}></div>

      {/* Container for the elements at the bottom of the screen */}
      <div className={styles.bottomTray}>
        
        {/* The container for the animated waveform */}
        <div className={styles.waveform}>
          {/* Each div is a single bar in the waveform animation */}
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
        </div>
        
        {/* The icon button to switch back to the text chat view */}
        <button onClick={onStartTextChat} className={styles.iconButton}>
          <MdChatBubble size={28} />
        </button>
      </div>
    </div>
  );
};

export default VoiceChat;