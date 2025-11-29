import React from "react";
import styles from "./TrustedBy.module.css";
import trustedByImage from "../../assets/Group 2147223751.svg";

export default function Trusted() {
  return (
    <section className={styles.trusted}>
      <div className={styles.container}>
        <img 
          src={trustedByImage} 
          alt="Trusted by leading businesses" 
          className={styles.strip} 
        />
      </div>
    </section>
  );
}
