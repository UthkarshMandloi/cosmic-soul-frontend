'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './HomePage.module.css';
import { FaMicrophone } from 'react-icons/fa';
import { MdChatBubble } from "react-icons/md";
import TextChat from './TextChat';
import VoiceChat from './VoiceChat';

// --- Sub-component for the initial greeting UI ---
const Greeting = ({ onStartChat }: { onStartChat: () => void }) => (
  <div className={styles.greetingContainer}>
    <h2 className={styles.greetingText}>
      Hey, How are you <br /> feeling today?
    </h2>
    <button onClick={onStartChat} className={styles.chatButton}>Start Chat</button>
  </div>
);

const HomePage = () => {
  // --- State Management ---
  // Tracks the character's animation (sitting vs. waving)
  const [characterState, setCharacterState] = useState('sitting');
  // Controls when the main UI elements fade in
  const [uiVisible, setUiVisible] = useState(false);
  // Controls which interactive mode is active ('greeting', 'text', or 'voice')
  const [interactionMode, setInteractionMode] = useState('greeting');

  // --- Animation Logic ---
  useEffect(() => {
    // Timer to start the wave animation after an initial delay
    const waveTimer = setTimeout(() => {
      setCharacterState('waving');
      
      // Second timer to fade in the UI shortly after the waving animation begins
      const uiTimer = setTimeout(() => setUiVisible(true), 500);
      return () => clearTimeout(uiTimer); // Cleanup for inner timer
    }, 1500);

    return () => clearTimeout(waveTimer); // Cleanup for outer timer
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // --- Event Handlers ---
  const handleStartTextChat = () => setInteractionMode('text');
  const handleStartVoiceChat = () => setInteractionMode('voice');

  // --- Sub-component for the character to keep the main return clean ---
  const Character = () => (
    <div className={styles.characterContainer}>
      <Image
        src="/avatar-eyes-open.jpg"
        alt="Character sitting"
        fill
        className={`${styles.characterImage} ${styles.sittingImage} ${characterState === 'sitting' ? styles.visible : ''}`}
      />
      <Image
        src="/avatar-waving.jpg"
        alt="Character waving"
        fill
        className={`${styles.characterImage} ${characterState === 'waving' ? styles.visible : ''}`}
      />
    </div>
  );

  return (
    <div className={`${styles.homeContainer} ${interactionMode === 'text' ? styles.chatView : ''}`}>
      
      {/* --- RENDER THE CORRECT UI BASED ON THE CURRENT MODE --- */}

      {interactionMode === 'greeting' && (
        <>
          <Character />
          {uiVisible && (
            <>
              <Greeting onStartChat={handleStartTextChat} />
              <div className={styles.bottomIcons}>
                <button onClick={handleStartVoiceChat} className={styles.iconButton}><FaMicrophone size={35} /></button>
                <button onClick={handleStartTextChat} className={styles.iconButton}><MdChatBubble size={35} /></button>
              </div>
            </>
          )}
        </>
      )}

      {interactionMode === 'text' && (
        <>
          <Character />
          <TextChat />
          <div className={styles.bottomMic}>
            <button onClick={handleStartVoiceChat} className={styles.iconButton}><FaMicrophone size={35} /></button>
          </div>
        </>
      )}
      
      {interactionMode === 'voice' && (
        <>
          <Character />
          <VoiceChat onStartTextChat={handleStartTextChat} />
        </>
      )}

    </div>
  );
};

export default HomePage;