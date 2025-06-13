import React from "react";
import styles from "./Complete.module.scss";
const Complete = ({ onComplete }) => {
  return (
    <div>
      <div className={styles.container}>
        <p>Mark as ?</p>
        <div>
          <button onClick={onComplete}>Complete</button>
          <button>Final consultation</button>
        </div>
      </div>
    </div>
  );
};

export default Complete;
