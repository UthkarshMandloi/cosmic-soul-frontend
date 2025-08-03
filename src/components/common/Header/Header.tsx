'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FaRegUserCircle } from "react-icons/fa";
import styles from './Header.module.css';
import Link from 'next/link';

const Header = () => {
  // State to manage the open/closed status of the mobile menu
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {/* Logo and Title - links to the home page */}
        <Link href="/" className={styles.logoContainer}>
          <Image
            src="/cosmic_soul_logo.png" // Ensure this image is in your /public folder
            alt="Cosmic Soul Logo"
            width={100}
            height={100}
            className={styles.logoImage}
          />
          <span className={styles.logoText}>COSMIC SOUL</span>
        </Link>

        {/* --- Desktop Navigation Links --- */}
        <ul className={styles.navLinks}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/features">Features</Link></li>
          <li><Link href="/about">About Us</Link></li>
          <li><Link href="/contact">Contact Us</Link></li>
        </ul>

        {/* --- User Icon for Desktop --- */}
        <div className={styles.userIconContainer}>
          <FaRegUserCircle size={58} />
        </div>

        {/* --- Mobile Menu Button (Hamburger) --- */}
        <button
          className={styles.menuButton}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu" // Improves accessibility
        >
          <svg height="24" width="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </nav>

      {/* --- Mobile Menu Dropdown --- */}
      {isOpen && (
        <div className={styles.mobileMenu}>
          <ul className={styles.mobileNavLinks}>
            {/* Swapped <a> tags for <Link> for faster, smoother navigation */}
            <li><Link href="/">Home</Link></li>
            <li><Link href="/features">Features</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
            <li><Link href="/profile" className={styles.mobileUserLink}>Profile</Link></li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;