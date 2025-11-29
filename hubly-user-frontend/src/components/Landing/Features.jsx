import React from 'react';
import styles from './Features.module.css';
import coreFeatureImage from '../../assets/Group 2147223754.svg';

const Features = () => {
  return (
    <section className={styles.coreFeatures}>
      <div className={styles.container}>
        <h2 className={styles.title}>At its core, Hubly is a robust CRM solution.</h2>
        <p className={styles.subtitle}>
          Hubly helps businesses streamline customer interactions, track leads, and automate tasks—saving you time and maximizing revenue. Whether you're a startup or an enterprise, Hubly adapts to your needs, giving you the tools to scale efficiently.
        </p>
        <div className={styles.featureImage}>
          <img 
            src={coreFeatureImage} 
            alt="Hubly CRM Solution"
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
};

export default Features;