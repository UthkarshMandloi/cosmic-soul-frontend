'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './Features.module.css';

// --- Data for the animations ---
const phrases = [
  "You give your all... but feel invisible.",
  "You overthink in silence, but no one checks in",
  "You're the one people go to... but who holds you?",
  "You've healed so much. And still, you feel hollow sometimes",
  "You don't need fixing. You need a witness",
];

const heroImages = [
  '/avatar-eyes-open_cut.png',
  '/avatar-eyes-closed_cut.png',
];

const Features = () => {
  // --- State Management ---
  // We need two separate states because the text and image arrays have different lengths
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const router = useRouter();

  // --- Animation Logic ---
  useEffect(() => {
    const interval = setInterval(() => {
      // Cycle through the text phrases
      setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
      // Cycle through the images
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 4000); // Change every 4 seconds

    // Cleanup the interval when the component is removed
    return () => clearInterval(interval);
  }, []);

  // --- Navigation Handler ---
  const handleNavigateHome = () => {
    router.push('/');
  };

  return (
    <section className={styles.hero} onClick={handleNavigateHome}>
      {/* --- Text Content --- */}
      <div className={styles.textContainer}>
        <h2 className={styles.title}>Is This You?</h2>
        <div className={styles.subtitleContainer}>
          {phrases.map((phrase, index) => (
            <h1
              key={`phrase-${index}`} // Improved key
              className={`${styles.subtitle} ${
                index === currentPhraseIndex ? styles.visible : "" // Use the text index here
              }`}
            >
              {phrase}
            </h1>
          ))}
        </div>
      </div>
      
      {/* --- Image Content --- */}
      <div className={styles.imageContainer}>
        {heroImages.map((src, index) => (
           <Image
            key={`image-${index}`} // Improved key
            src={src}
            alt="Cosmic Soul character"
            fill
            className={styles.heroImage}
            style={{ 
              opacity: index === currentImageIndex ? 1 : 0, // Use the image index here
              transition: 'opacity 0.7s ease-in-out',
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Features;