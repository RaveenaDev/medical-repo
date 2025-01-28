import React from 'react'
import ayu from "../patients/patients.module.scss";
import Searchbar from "../../../components/Searchbar/index.jsx";
import NotificationIcon from "../../../components/Notification/index.jsx";
import Grid from "@mui/material/Grid2";
import Card from "../../../components/Card/index.jsx";
import {useNavigate} from "react-router-dom";

const CommonPanel = () => {
    const navigate = useNavigate();
    return (
        <div className={ayu.patients}>
            <div className={ayu.patientHeader}>
                <Searchbar/>
                <NotificationIcon/>
            </div>

            <div className={ayu.cardhandling}>
                <h3 className={ayu.heading}>
                    Dashboard Overview
                </h3>
            </div>

            <Grid container spacing={2} justifyContent="flex-end" alignItems="center" flexDirection={{md: 'row'}}
                  size={12} sx={{margin: '0 0 20px 0'}}>
                <Grid size={3}>
                    <Card
                        title="Total Patient"
                        subtitle="200+"
                        handleClickCb={() => navigate(`/receptionist/patients`)}
                    />
                </Grid>
                <Grid size={3}>
                    <Card
                        customStyle={{
                            backgroundColor: "#EAA000"
                        }}
                        title="Total Doctors"
                        subtitle="8"
                        handleClickCb={() => navigate(`/receptionist/doctors`)}
                    />
                </Grid>
                <Grid size={3}>
                    <Card
                        customStyle={{
                            backgroundColor: "#2E823B"
                        }}
                        title="Total Staffs"
                        subtitle="250"
                        handleClickCb={() => navigate(`/receptionist/staffs`)}
                    />
                </Grid>
                <Grid size={3}>
                    <Card
                        customStyle={{
                            backgroundColor: "#66A7B4"
                        }}
                        title="Total Rooms"
                        subtitle="80"
                        handleClickCb={() => navigate(`/receptionist/rooms`)}
                    />
                </Grid>
            </Grid>
        </div>
    )
}
export default CommonPanel
