'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // 1. Import the router
import styles from './Features.module.css';

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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const router = useRouter(); // 2. Initialize the router

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleNavigateHome = () => {
    router.push('/'); // Function to navigate to the home page
  };

  return (
    // 3. Add the onClick handler to the main section
    <section className={styles.hero} onClick={handleNavigateHome}>
      <div className={styles.textContainer}>
        <h2 className={styles.title}>Is This You?</h2>
        <div className={styles.subtitleContainer}>
          {phrases.map((phrase, index) => (
            <h1
              key={index}
              className={`${styles.subtitle} ${
                index === currentImageIndex ? styles.visible : ""
              }`}
            >
              {phrase}
            </h1>
          ))}
        </div>
      </div>
      
      <div className={styles.imageContainer}>
        {heroImages.map((src, index) => (
           <Image
            key={index}
            src={src}
            alt="Cosmic Soul character"
            fill
            className={styles.heroImage}
            style={{ 
              opacity: index === currentImageIndex ? 1 : 0,
              transition: 'opacity 0.7s ease-in-out',
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Features;