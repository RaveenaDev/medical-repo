import React, {useEffect, useState} from 'react'
import styles from "../../styles.module.scss";
import Grid from "@mui/material/Grid2";
import Card from "../../../../components/Card/index.jsx";
import {Box, Button} from "@mui/material";
import Dashboard from "../../dashboard.jsx";
import EntityBasedTable from "../../EntityBasedTable/index.jsx";
import ayu from "../departments.module.scss";
import avi from "./departDetails.module.scss"
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import DepartCard from "../DepartCard.jsx";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const DepartDetails = (props) => {
    const [tableIndex, setTableIndex] = useState(null);
    useEffect(() => {
        props?.setIsSignUpOrLogin(false);
    }, []);

    const cardClickhandler = (e, entity) => {
        console.log("jhgfcg", e, entity);
        if(entity === "patient") {
            setTableIndex(0);
        }
        if(entity === "doctor") {
            setTableIndex(1);
        }
        if(entity === "staff") {
            setTableIndex(2);
        }
        if(entity === "room") {
            setTableIndex(3);
        }
        props?.setEntity(entity);
    }
    return (
        <>
                <div className={styles.receptionist}>
                    {!props.entity ?
                        <>
                        <div className={ayu.headerContainer}>
                            <button className={ayu.backButton}>
                                <ArrowBackIosIcon/>
                            </button>
                            <h2 className={ayu.departmentTitle1}>Department</h2>
                            <span className={ayu.forwardButton}>
                                <ArrowForwardIosIcon/>
                            </span>
                            <h2 className={ayu.departmentTitleDetails}>Cardiology</h2>
                        </div>

                        {/*/!* Horizontal line *!/*/}
                        {/*<hr style={{border: '1px solid #d3d3d3', margin: '20px 0'}} />*/}

                         <Box className={avi.boxContainer}>
                             <div>
                                 <h3 className={avi.heading}>Specific Branch Name</h3>
                                 <div className={avi.pro}>
                                     <p className={avi.name}>Dr. [Name of the Deparment Head]</p>
                                 </div>
                             </div>
                         </Box>

                        </> : <EntityBasedTable entity={props?.entity} tableIndex={tableIndex}/>}
                </div>
        </>
    )
}
export default DepartDetails
