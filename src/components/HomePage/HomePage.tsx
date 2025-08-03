'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './HomePage.module.css';
import { FaMicrophone } from 'react-icons/fa';
import { MdChatBubble } from "react-icons/md";
import TextChat from './TextChat';
import VoiceChat from './VoiceChat';

const Greeting = ({ onStartChat }: { onStartChat: () => void }) => (
  <div className={styles.greetingContainer}>
    <h2 className={styles.greetingText}>
      Hey, How are you <br /> feeling today?
    </h2>
    <button onClick={onStartChat} className={styles.chatButton}>Start Chat</button>
  </div>
);

const HomePage = () => {
  const [characterState, setCharacterState] = useState('sitting');
  const [uiVisible, setUiVisible] = useState(false);
  const [interactionMode, setInteractionMode] = useState('greeting');

  useEffect(() => {
    const waveTimer = setTimeout(() => {
      setCharacterState('waving');
      const uiTimer = setTimeout(() => setUiVisible(true), 500);
      return () => clearTimeout(uiTimer);
    }, 1500);
    return () => clearTimeout(waveTimer);
  }, []);

  const handleStartTextChat = () => setInteractionMode('text');
  const handleStartVoiceChat = () => setInteractionMode('voice');

  const Character = () => (
    <div className={styles.characterContainer}>
      <Image
        src="/avatar-eyes-open.jpg"
        alt="Character sitting"
        fill
        // Apply the new slide-up animation to this image
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