'use client';

import { useState } from 'react';
import styles from './TextChat.module.css';
import { BsFillTriangleFill } from "react-icons/bs";

// Define the shape of a single bubble object for TypeScript
interface Bubble {
  id: number;
  type: string;
}

// This is the initial list of chat bubbles that will be animated.
// The 'type' corresponds to a CSS class ('bubble1', 'bubble2', etc.).
const initialBubbles: Bubble[] = [
  { id: 1, type: 'bubble1' },
  { id: 2, type: 'bubble2' },
  { id: 3, type: 'bubble1' },
  { id: 4, type: 'bubble2' },
];

const TextChat = () => {
  // --- State Management ---
  // 'bubbles' holds the current list of bubbles to display.
  const [bubbles, setBubbles] = useState(initialBubbles);
  // 'isAnimating' prevents the user from clicking the button multiple times during an animation.
  const [isAnimating, setIsAnimating] = useState(false);

  // --- Event Handler ---
  // This function is called when the play button is clicked.
  const handleNextBubble = () => {
    if (isAnimating) return; // Exit if an animation is already in progress

    setIsAnimating(true);
    
    // Find the topmost bubble in the DOM to apply the exit animation.
    const topBubble = document.getElementById(`bubble-${bubbles[0].id}`);
    if (topBubble) {
      topBubble.classList.add(styles.bubbleOut); // Add the CSS class for the 'scroll up and out' animation
    }
    
    // After the animation duration (500ms), update the list of bubbles.
    setTimeout(() => {
      setBubbles(prevBubbles => {
        const newBubbles = [...prevBubbles];
        const first = newBubbles.shift(); // Remove the first bubble from the top
        if (first) {
          // Add the same type of bubble to the bottom with a new, unique ID.
          // This creates the effect of an endless scroll.
          newBubbles.push({ ...first, id: Date.now() }); 
        }
        return newBubbles;
      });
      setIsAnimating(false); // Reset the animation lock
    }, 500); // This delay must match the animation duration in the CSS
  };

  return (
    <div className={styles.chatBox}>
      {/* --- Scrolling Bubbles --- */}
      {/* Map over the 'bubbles' state to render each scrolling bubble. */}
      {bubbles.map((bubble, index) => (
        <div
          key={bubble.id} // A unique key is crucial for React to track elements
          id={`bubble-${bubble.id}`} // An ID for the JavaScript to find and animate the element
          // Dynamically apply classes: the base '.bubble' class, the type class ('.bubble1' or '.bubble2'),
          // and the '.bubbleIn' animation class if it's the last bubble being added.
          className={`${styles.bubble} ${styles[bubble.type]} ${index === bubbles.length - 1 && isAnimating ? styles.bubbleIn : ''}`}
        ></div>
      ))}

      {/* --- Fixed Input Bubble --- */}
      {/* This bubble is rendered separately so it doesn't scroll with the others. */}
      <div className={`${styles.bubble} ${styles.bubble3}`}>
        <button className={styles.playButton} onClick={handleNextBubble}>
          <BsFillTriangleFill size={20} />
        </button>
      </div>
    </div>
  );
};

export default TextChat;