import React, { useEffect } from "react";
import styles from "./SingleCompanyDetails.module.scss";
import Searchbar from "../../../../../components/Searchbar";
import Notifications from "../../../../../components/NotificationFunc/Notification";
import { ChevronLeft } from "lucide-react";
const SingleCompanyDetails = (props) => {
  useEffect(() => {
    props?.setIsSignUpOrLogin(false);
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.searchAndNotification}>
        <Searchbar /> <Notifications />
      </div>
      <div className={styles.content}>
        <div className={styles.backContainer}>
          <ChevronLeft className={styles.backIcon} />
          <p>Company</p>
        </div>
      </div>
    </div>
  );
};

export default SingleCompanyDetails;
