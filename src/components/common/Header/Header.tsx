'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FaRegUserCircle } from "react-icons/fa"; // Import the icon
import styles from './Header.module.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {/* Logo and Title */}
        <a href="/" className={styles.logoContainer}>
          <Image
            src="/cosmic_soul_logo.png"
            alt="Cosmic Soul Logo"
            width={100} // A more reasonable size for the header
            height={100}
            className={styles.logoImage} // Added class for the drop shadow
          />
          <span className={styles.logoText}>COSMIC SOUL</span>
        </a>

        {/* Desktop Navigation Links */}
        <ul className={styles.navLinks}>
          <li><a href="/">Home</a></li>
          <li><a href="/features">Features</a></li>
          <li><a href="/about">About Us</a></li>
          <li><a href="/contact">Contact Us</a></li>
        </ul>

        {/* User Icon for Desktop */}
        <div className={styles.userIconContainer}> {/* Updated class name */}
            <FaRegUserCircle size={58} /> {/* Adjusted icon size */}
        </div>

        {/* Mobile Menu Button (Hamburger) */}
        <button className={styles.menuButton} onClick={() => setIsOpen(!isOpen)}>
          <svg height="24" width="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className={styles.mobileMenu}>
           <ul className={styles.mobileNavLinks}>
              <li><a href="#">Home</a></li>
              <li><a href="#">Features</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#" className={styles.mobileUserLink}>Profile</a></li>
            </ul>
        </div>
      )}
    </header>
  );
};

export default Header;