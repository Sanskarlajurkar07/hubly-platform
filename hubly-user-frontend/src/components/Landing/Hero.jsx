import React from 'react';
import styles from './Hero.module.css';
import heroImage from '../../assets/Group 2147223745.svg';
import calendarSvg from '../../assets/Group 2147223747.svg';
import badgeSvg from '../../assets/Group 2147223749.svg';
import salesSvg from '../../assets/Group 2147223748.svg';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1>Grow Your Business Faster with Hubly CRM</h1>
            <p>Manage leads, automate workflows, and close deals effortlessly—all in one powerful platform.</p>
            <div className={styles.buttonGroup}>
              <a href="#" className={`${styles.btn} ${styles.btnPrimary}`}>
                Get started
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.33334 8H12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8 3.33333L12.6667 8L8 12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#" className={`${styles.btn} ${styles.btnSecondary}`}>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.playCircle}>
                  <circle cx="20" cy="20" r="19.3888" stroke="#244779" strokeWidth="1.22241" />
                  <path d="M14.6695 15.892C14.6695 14.3249 16.3898 13.3666 17.7222 14.1914L25.9225 19.2678C27.1855 20.0497 27.1855 21.887 25.9225 22.6689L17.7222 27.7452C16.3898 28.57 14.6695 27.6117 14.6695 26.0447V15.892Z" fill="#244779" />
                </svg>
                <span>Watch Video</span>
              </a>
            </div>
          </div>
          <div className={styles.heroImage}>
            <div className={styles.imageWrapper}>
              <img
                src={heroImage}
                alt="Business meeting"
                className={styles.mainImage}
              />
            </div>

            {/* Calendar - Top Right */}
            <div className={styles.calendarContainer}>
              <img src={calendarSvg} alt="Calendar" />
            </div>

            {/* Badge */}
            <div className={styles.svgBadge}>
              <img src={badgeSvg} alt="Badge" />
            </div>

            {/* Sales Widget */}
            <div className={styles.salesWidget}>
              <img src={salesSvg} alt="Net Sales" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;