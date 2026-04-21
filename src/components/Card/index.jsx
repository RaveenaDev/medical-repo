import React, { useState } from "react";
import styles from "./styles.module.scss";
import Grid from "@mui/material/Grid2";

function Card(props) {
  const handleClick = (e) => {
    props?.handleClickCb && props.handleClickCb(e);
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.card__contentWrap} onClick={handleClick}>
          <div className={styles.card__left}>
            <div className={styles.card__rect} style={props.customStyle}></div>
            <div>
              <p className={styles.card__title}>{props?.title}</p>
              <p className={styles.card__subtitle}>{props?.subtitle}</p>
            </div>
          </div>
          <div className={styles.card__right}></div>
        </div>
      </div>
    </>
  );
}

export default Card;
