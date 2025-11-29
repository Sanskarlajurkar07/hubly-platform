import React from "react";
import styles from "./Pricing.module.css";

const plans = [
  {
    title: "STARTER",
    desc: "Best for local businesses needing to improve their online reputation.",
    price: 199,
    features: [
      "Unlimited Users",
      "GMB Messaging",
      "Reputation Management",
      "GMB Call Tracking",
      "24/7 Award Winning Support",
    ],
  },
  {
    title: "GROW",
    desc: "Best for all businesses that want to take full control of their marketing automation and track their leads, click to close.",
    price: 399,
    features: [
      "Pipeline Management",
      "Marketing Automation Campaigns",
      "Live Call Transfer",
      "GMB Messaging",
      "Embed-able Form Builder",
      "Reputation Management",
      "24/7 Award Winning Support",
    ],
  },
];

export default function Pricing() {
  return (
    <section className={styles.pricingSection}>
      <div className={styles.header}>
        <h2>We have plans for everyone!</h2>
        <p>
          We started with a strong foundation, then simply built all of the
          sales and marketing tools ALL businesses need under one platform.
        </p>
      </div>

      <div className={styles.grid}>
        {plans.map((plan, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.cardContent}>
              <div className={styles.topBlock}>
                <h3 className={styles.cardTitle}>{plan.title}</h3>
                <p className={styles.cardDesc}>{plan.desc}</p>

                <div className={styles.priceWrap}>
                  <span className={styles.price}>${plan.price}</span>
                  <span className={styles.month}>/monthly</span>
                </div>
              </div>

              <div className={styles.featuresBlock}>
                <h4>What’s included</h4>
                <ul className={styles.featureList}>
                  {plan.features.map((f, i) => (
                    <li key={i}>
                      <span className={styles.checkIcon}>✔</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button className={styles.btn}>SIGN UP FOR {plan.title}</button>
          </div>
        ))}
      </div>
    </section>
  );
}
