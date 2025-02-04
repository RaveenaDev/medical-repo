import React, {useEffect, useState} from 'react'
import ayu from './departments.module.scss'
import DepartCard from "./DepartCard.jsx";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {useNavigate} from "react-router-dom";
import CommonPanel from "../Components/CommonPanel.jsx";

const Departments1 = (props) => {
    const navigate = useNavigate()

    useEffect(() => {
        props?.setIsSignUpOrLogin(false);
    }, []);

    const handleBack = () => {
        navigate('/admin')
    }

    return (
        <>
            <CommonPanel/>
            <div className={ayu.headerContainer}>
                <button className={ayu.backButton} onClick={handleBack}>
                    <ArrowBackIosIcon/>
                </button>
                <h2 className={ayu.departmentTitle}>Department</h2>
            </div>

            {/* Horizontal line */}
            <hr style={{border: '1px solid #d3d3d3', margin: '20px 0'}}/>

            {/* Cards */}

            <div className={ayu.superCardContainer}>
                <DepartCard/>
                <DepartCard/>
                <DepartCard/>
                <DepartCard/>
                <DepartCard/>
                <DepartCard/>
            </div>
        </>
    )
}
export default Departments1
