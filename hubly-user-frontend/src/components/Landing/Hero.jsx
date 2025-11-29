import React from 'react';
import styles from './Hero.module.css';
import heroImage from '../../assets/Group 2147223745.svg';
import calendarSvg from '../../assets/Group 2147223747.svg';
import badgeSvg from '../../assets/Group 2147223749.svg';
import salesSvg from '../../assets/Group 2147223748.svg';
import watchVideoIcon from '../../assets/WatchVideo.svg';

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
              </a>
              <a href="#" className={`${styles.btn} ${styles.btnSecondary}`}>
                <img src={watchVideoIcon} alt="Watch Video" className={styles.watchIcon} />
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