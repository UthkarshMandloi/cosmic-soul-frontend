'use client';

import { useState } from 'react';
import styles from './TextChat.module.css';
import { BsFillTriangleFill } from "react-icons/bs";

interface Bubble {
  id: number;
  type: string;
}

// This array must ONLY contain the 4 scrolling bubbles
const initialBubbles: Bubble[] = [
  { id: 1, type: 'bubble1' },
  { id: 2, type: 'bubble2' },
  { id: 3, type: 'bubble1' },
  { id: 4, type: 'bubble2' },
];

const TextChat = () => {
  const [bubbles, setBubbles] = useState(initialBubbles);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNextBubble = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    
    const topBubble = document.getElementById(`bubble-${bubbles[0].id}`);
    if (topBubble) {
      topBubble.classList.add(styles.bubbleOut);
    }
    
    setTimeout(() => {
      setBubbles(prevBubbles => {
        const newBubbles = [...prevBubbles];
        const first = newBubbles.shift();
        if (first) {
          newBubbles.push({ ...first, id: Date.now() }); 
        }
        return newBubbles;
      });
      setIsAnimating(false);
    }, 500);
  };

  return (
    <div className={styles.chatBox}>
      {/* This part maps over only the 4 scrolling bubbles */}
      {bubbles.map((bubble, index) => (
        <div
          key={bubble.id}
          id={`bubble-${bubble.id}`}
          className={`${styles.bubble} ${styles[bubble.type]} ${index === bubbles.length - 1 && isAnimating ? styles.bubbleIn : ''}`}
        ></div>
      ))}

      {/* The input bubble is rendered separately and will not move */}
      <div className={`${styles.bubble} ${styles.bubble3}`}>
        <button className={styles.playButton} onClick={handleNextBubble}>
          <BsFillTriangleFill size={20} />
        </button>
      </div>
    </div>
  );
};

export default TextChat;