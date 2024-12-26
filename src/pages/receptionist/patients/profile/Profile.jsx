import React from 'react';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import styles from "./profile.module.scss";
import Button from '@mui/material/Button';
import PersonalInfo from './PersonalInfo';


const Profile = () => {
   

    return (
        <Grid container spacing={2}>
            {/* Box 1 */}
            <Grid item xs={3}>
                <Box
                    sx={{
                        backgroundColor: "#FFFFFF",
                        height: "300px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            margin: 0,
                        }}
                    >
                        <Avatar
                            src="https://via.placeholder.com/150"
                            alt="Profile Image"
                            sx={{
                                width: 80,
                                height: 80,
                                borderRadius: "50%",
                                marginBottom: "8px"
                            }}
                        />

                        <h4 style={{ margin: 0 }} className={styles.name}>Jasmine Kaur</h4>
                        <p className={styles.email}>Jaisminekaur@gmail.com</p>

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-around",
                                alignItems: "center",
                                width: "100%",
                            }}
                        >
                            <div className={styles.styling}>
                                <div>
                                    <h5>8</h5>
                                    <p>Past Visits</p>
                                </div>
                                <div>
                                    <h5>2</h5>
                                    <p>Upcoming</p>
                                </div>
                            </div>
                        </Box>

                        <Button variant="outlined"
                            sx={{
                                margin: "16px",
                                padding: "12px 24px",
                                width: "100%",
                                borderColor: "#25307F",
                                color: "#25307F",
                                height: "40px",
                                '&:hover': {
                                    backgroundColor: "#25307F",
                                    color: "#ffffff"
                                },
                            }}
                        >
                            Send Message
                        </Button>
                    </Box>
                </Box>
            </Grid>
            {/* Box 2 */}
            <Grid item xs={5}>
                <Box
                    sx={{
                        backgroundColor: "#ffffff",
                        padding: "8px",
                    }}
                >
                  <PersonalInfo />
                </Box>
            </Grid>
            {/* Box 3 */}
            <Grid item xs={4}>
                <Box
                    sx={{
                        backgroundColor: "lightcoral",
                        height: "150px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    Box 3
                </Box>
            </Grid>
        </Grid>
    );
};

export default Profile;
