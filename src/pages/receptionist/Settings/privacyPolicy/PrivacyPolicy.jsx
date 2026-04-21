import React, { useEffect } from "react";
import styles from "./privacy.module.scss";

const PrivacyPolicy = (props) => {
  useEffect(() => {
    props?.setIsSignUpOrLogin(false);
  }, []);

  return (
    <div className={styles.privacyPolicyContainer}>
      <div className={styles.privacyPolicyHeader}>Privacy Policy</div>

      <div className={styles.privacyPolicyContent}>
        <div className={styles.contentBox}>
          <div className={styles.contentHeading}>Introduction</div>
          <div className={styles.contentText}>
            This Privacy Policy outlines how we collect, use, disclose, and
            protect the personal information of patients and other individuals
            who interact with our services. We are committed to ensuring the
            privacy and security of your data.
          </div>
        </div>

        <div className={styles.contentBox}>
          <div className={styles.contentHeading}>Information Collection</div>

          <div className={styles.contentText}>
            We may collect personal information from you when you:
          </div>

          <div className={styles.contentList}>
            <div className={styles.listItem}>Schedule an appointment</div>
            <div className={styles.listItem}>Visit our clinic</div>
            <div className={styles.listItem}>
              Contact us for inquiries or support
            </div>
            <div className={styles.listItem}>
              Fill out online forms or surveys
            </div>
            <div className={styles.listItem}>Use our website or mobile app</div>
          </div>

          <div className={styles.contentText}>
            The types of information we collect include:
          </div>

          <div className={styles.contentList}>
            <div className={styles.listItem}>Name</div>
            <div className={styles.listItem}>
              Contact information (address, phone number, email)
            </div>
            <div className={styles.listItem}>Date of birth</div>
            <div className={styles.listItem}>Medical history</div>
            <div className={styles.listItem}>Insurance information</div>
            <div className={styles.listItem}>Payment information</div>
          </div>
        </div>

        <div className={styles.contentBox}>
          <div className={styles.contentHeading}>Information Use</div>

          <div className={styles.contentText}>
            We use your personal information for the following purposes:
          </div>

          <div className={styles.contentList}>
            <div className={styles.listItem}>
              Providing medical care and treatment
            </div>
            <div className={styles.listItem}>Scheduling appointments</div>
            <div className={styles.listItem}>Managing your account</div>
            <div className={styles.listItem}>
              Communicating with you about your appointments, treatments, and
              billing
            </div>
            <div className={styles.listItem}>
              Improving our services and facilities
            </div>
            <div className={styles.listItem}>
              Complying with legal and regulatory requirements
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
