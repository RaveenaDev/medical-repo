import React from 'react';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import styles from "./profile.module.scss";
import Button from '@mui/material/Button';


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
                            flexDirection: "column", // Stack children vertically
                            justifyContent: "center", // Center horizontally
                            alignItems: "center", // Center vertically
                            margin: 0,
                        }}
                    >
                        <Avatar
                            src="https://via.placeholder.com/150" // Replace with your image URL
                            alt="Profile Image"
                            sx={{
                                width: 80, // Set width of the image
                                height: 80, // Set height of the image
                                borderRadius: "50%", // Make the image circular
                                marginBottom: "8px" // Add spacing between the image and text
                            }}
                        />

                        <h4 style={{ margin: 0 }} className={styles.name}>Jasmine Kaur</h4>
                        <p className={styles.email}>Jaisminekaur@gmail.com</p>

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-around", // Center horizontally
                                alignItems: "center", // Center vertically
                                width: "100%",

                            }}
                        >

                            <div className={styles.styling}>

                                <div>
                                    <h5>
                                        8
                                    </h5>
                                    <p>
                                        Past Visits
                                    </p>




                                </div>
                                <div>
                                    <h5>
                                        2
                                    </h5>
                                    <p>
                                        Upcoming
                                    </p>
                                </div>
                            </div>
                        </Box>

                        <Button variant="outlined"
                            sx={{
                                margin: "16px", // Adds margin around the button
                                padding: "12px 24px", // Adds padding inside the button
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
                        backgroundColor: "lightgreen",
                        height: "150px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    Box 2
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
