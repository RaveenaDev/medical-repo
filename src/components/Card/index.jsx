import React, { useState } from 'react';
import styles from './styles.module.scss';
import Grid from '@mui/material/Grid2';

function Card(props) {
    const handleClick = (e) => {
        props?.handleClickCb && props.handleClickCb(e)
    }

    return (
        <>
            <div className={styles.card}>
                {/* <Grid container spacing={2} justifyContent="flex-end" alignItems="center" flexDirection={{ md: 'row' }} size={12} sx={{margin: '10px 0px 10px 0'}}>
                    <Grid size={3}>
                    </Grid>
                </Grid> */}
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