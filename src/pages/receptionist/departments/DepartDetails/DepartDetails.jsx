import React, { useEffect, useState } from "react";
import styles from "../../styles.module.scss";
import { Box, Button } from "@mui/material";
import EntityBasedTable from "../../EntityBasedTable/index.jsx";
import ayu from "../departments.module.scss";
import avi from "./departDetails.module.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import {useLocation, useNavigate} from "react-router-dom";
import { getDepartmentById } from "../../../../components/State/Receptionist/Action.js";
import { useDispatch, useSelector } from "react-redux";

const DepartDetails = (props) => {
  const navigate = useNavigate();

  const [tableIndex, setTableIndex] = useState(null);
  useEffect(() => {
    props?.setIsSignUpOrLogin(false);
  }, []);

  const [age, setAge] = React.useState("");

  const location = useLocation();
  const { departmentId } = location.state || {};

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDepartmentById(departmentId));
  }, [dispatch, departmentId]);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleClick = () => {
    navigate("/receptionist/departments");
  };

  const department = useSelector((store) => store.receptionist.department);

  return (
    <>
      <div className={styles.receptionist}>
        {!props.entity ? (
          <>
            <div className={ayu.headerContainer}>
              <Button
                sx={{
                  outline: "none",
                  boxShadow: "none",
                  "&:focus": { outline: "none" },
                  borderRadius: "12px",
                  padding: "6px 10px",
                  minWidth: "auto", // Remove default minWidth
                  width: "40px", // Custom width
                  height: "30px", // Custom height
                }}
                className={ayu.backButton}
                onClick={handleClick}
                style={{ marginBottom: "5px" }}
              >
                <ArrowBackIosIcon />
              </Button>
              <h2 className={ayu.departmentTitle1}>Department</h2>
              <span className={ayu.forwardButton}>
                <ArrowForwardIosIcon />
              </span>
              <h2 className={ayu.departmentTitleDetails}>{department?.departmentName}</h2>
            </div>

            {/*/!* Horizontal line *!/*/}
            {/*<hr style={{border: '1px solid #d3d3d3', margin: '20px 0'}} />*/}

            <Box className={avi.boxContainer}>
              <h4 className={avi.heading}>Specific Branch Name</h4>
              <div className={avi.pro}>
                <img
                  className={avi.img}
                  src="https://cdn.pixabay.com/photo/2017/03/14/03/20/woman-2141808_1280.jpg"
                  alt=""
                />
                <p className={avi.name}>{department?.departmentHead}</p>
              </div>

              <div className={avi.icons}>
                <Button
                  className={avi.message}
                  sx={{
                    outline: "none",
                    boxShadow: "none",
                    "&:focus": { outline: "none" },
                    borderRadius: "12px",
                    padding: "8px 2px",
                  }}
                >
                  <EmailIcon />
                </Button>
                <Button
                  className={avi.phone}
                  sx={{
                    outline: "none",
                    boxShadow: "none",
                    "&:focus": { outline: "none" },
                    borderRadius: "12px",
                    padding: "8px 2px",
                  }}
                >
                  <PhoneIcon />
                </Button>
              </div>

              <div className={avi.section1}>
                <Grid
                  container
                  sx={{ width: "100%", justifyContent: "space-between" }}
                >
                  {/* Section 1 */}
                  <Grid
                    md={4}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      width: "40%",
                      padding:"0 30px"
                    }}
                  >
                    <div style={{ width: "100%", padding: "0 20px" }}>
                      <h4 className={avi.heading}>Staff Details</h4>
                      <Box sx={{ minWidth: 430 }}>
                        <Stack spacing={1}>
                          {" "}
                          {/* Adds a gap of 2 (default = 16px) between children */}
                          <FormControl fullWidth>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                onChange={handleChange}
                                IconComponent={KeyboardArrowDownIcon}
                                displayEmpty // Ensures label remains visible
                                renderValue={() => (
                                    <span>
                                      <span style={{ color: "#3C3C3C" }}>Total Doctors: </span>
                                      <span style={{ color: "#3C3C3C", fontWeight: "bold" }}>{department?.totalDoctors.length}</span>
                                    </span>
                                )}
                                sx={{
                                  "& .MuiSelect-icon": { color: "#25307f" }, // Change dropdown icon color
                                }}
                            >
                              {department?.totalDoctors.map((doctor, index) => (
                                  <MenuItem key={index} value={doctor} sx={{ color: "#000", opacity: 1, pointerEvents: "none" }} >
                                    {doctor}
                                  </MenuItem>
                              ))}
                            </Select>
                          </FormControl>

                          <FormControl fullWidth>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                onChange={handleChange}
                                IconComponent={KeyboardArrowDownIcon}
                                displayEmpty // Ensures label remains visible
                                renderValue={() => (
                                    <span>
                                      <span style={{ color: "#3C3C3C" }}>Total Nurses/Support Staff: </span>
                                      <span style={{ color: "#3C3C3C", fontWeight: "bold" }}>{department?.totalNurses}</span>
                                    </span>
                                )}
                                sx={{
                                  "& .MuiSelect-icon": { color: "#25307f" }, // Change dropdown icon color
                                }}
                            >
                              <MenuItem value="NURSE1" sx={{ color: "#000", opacity: 1, pointerEvents: "none" }}>NURSE 1</MenuItem>
                            </Select>
                          </FormControl>

                          <div className={avi.details}>
                            <h3 style={{color:"#3C3C3C"}}>Specialist Doctors:</h3>
                            {department?.specialistDoctors.length > 0 ? (
                                department.specialistDoctors.map(
                                    (doc, index) => (
                                        <ul
                                            key={index}
                                            style={{
                                              listStyleType: "disc",
                                              paddingLeft: "10px",
                                              color: "black",
                                            }}
                                        >
                                          <li
                                              style={{
                                                color: "black",
                                                listStyle: "none",
                                              }}
                                          >
                                        <span style={{ color: "black" }}>
                                          •{" "}
                                        </span>
                                            {doc}
                                          </li>
                                        </ul>
                                    )
                                )
                            ) : (
                                <p style={{ color: "black" }}>
                                  No specialist found.
                                </p>
                            )}
                          </div>
                        </Stack>
                      </Box>
                    </div>
                  </Grid>

                  {/* Section 2 */}
                  <Grid
                    xs={12}
                    sm={6}
                    sx={{ display: "flex", justifyContent: "center"}}
                    className={avi.section2}
                  >
                    <div
                      style={{
                        width: "100%",
                        boxShadow: "0 2px 4px rgba(116, 116, 116, 0.2)",
                        padding: "8px 10px 0 20px",
                        borderRadius: "4px",
                        border: "1px solid rgba(116, 116, 116, 0.3)",
                      }}
                    >
                      <h4 className={avi.heading} style={{fontSize:"15px",color:"#3C3C3C"}}>Facilities:</h4>
                      <ul
                        style={{
                          listStyleType: "none", // Remove default list style
                          paddingLeft: "10px",
                          color: "black",
                        }}
                      >
                        <li
                          style={{ display: "flex", alignItems: "flex-start" }}
                        >
                          <span
                            style={{
                              color: "#747474",
                              marginRight: "10px",
                              fontSize: "1.2em",
                              position: "relative",
                              top: "-3px", // Adjust this value to control the upward shift
                            }}
                          >
                            •
                          </span>
                          <div>
                            <p className={avi.text1}>Number of Beds:</p>
                            <p className={avi.text2}>
                              10 (Include ICU/Cardiac Care Units if applicable)
                            </p>
                          </div>
                        </li>
                        <li
                          style={{ display: "flex", alignItems: "flex-start" }}
                        >
                          <span
                            style={{
                              color: "#747474",
                              marginRight: "10px",
                              fontSize: "1.2em",
                              position: "relative",
                              top: "-3px", // Adjust this value to control the upward shift
                            }}
                          >
                            •
                          </span>
                          <div>
                            <p className={avi.text1}>Specialized Rooms:</p>
                            <p className={avi.text2}>
                              3 Cath Labs, 2 Operating Theaters for
                              Cardiovascular Surgeries
                            </p>
                          </div>
                        </li>
                        <li
                          style={{ display: "flex", alignItems: "flex-start" }}
                        >
                          <span
                            style={{
                              color: "#747474",
                              marginRight: "10px",
                              fontSize: "1.2em",
                              position: "relative",
                              top: "-3px", // Adjust this value to control the upward shift
                            }}
                          >
                            •
                          </span>
                          <div>
                            <p className={avi.text1}>
                              Emergency Care Availability:
                            </p>
                            <p className={avi.text2}>24/7</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </Grid>
                </Grid>
              </div>

              <div style={{padding: "0 0 0 32px"}}>
              <div className={avi.section3}>
                <Grid
                  container
                  sx={{ width: "100%", justifyContent: "flex-start",paddingBottom:2}}
                  spacing={2}
                >
                  {/* First Grid Item */}
                  <Grid xs={12} sm={6} md={5} sx={{width:"40%"}}>
                    <div className={avi.box3} style={{ padding: "14px" }}>
                      <div style={{ marginBottom: "14px" }}>
                        <h4 style={{color:"#3C3C3C"}}>Available services:</h4>
                        {department?.availableServices.map((serv,index) => (
                            <ul
                                key={index}
                                style={{
                                  listStyleType: "none",
                                  paddingLeft: "10px",
                                  color: "#727272",
                                }}
                            >
                              <li style={{color:"#747474"}}>
                                <span style={{ color: "#747474",marginRight:"2px" }}>• </span>
                                {serv}
                              </li>
                            </ul>
                        ))}
                      </div>

                      <div>
                        <h4 style={{color:"#3C3C3C"}}>Specialized Procedures:</h4>
                        {department?.specializedProcedures.map((spec,index) => (
                            <ul key={index}
                                style={{
                                  listStyleType: "none",
                                  paddingLeft: "10px",
                                  color: "#727272",
                                }}
                            >
                              <li style={{color:"#747474"}}>
                                <span style={{ color: "#727272",marginRight:"2px"}}>• </span>
                                {spec}
                              </li>
                            </ul>
                        ))}
                      </div>
                    </div>
                  </Grid>

                  {/* Second Grid Item */}
                  <Grid xs={12} sm={6} md={7}>
                    <div className={avi.box4} style={{ padding: "14px" }}>
                      <div style={{ marginBottom: "14px" }}>
                        <h4 style={{color:"#3C3C3C"}}>Critical Equipment:</h4>
                        {department?.criticalEquipment.map((cric,index) => (
                            <ul key={index}
                                style={{
                                  listStyleType: "none",
                                  paddingLeft: "10px",
                                  color: "#727272",
                                }}
                            >
                              <li style={{color:"#747474"}}>
                                <span style={{ color: "#727272",marginRight:"2px"}}>• </span>
                                {cric}
                              </li>
                            </ul>
                        ))}
                      </div>

                      <div>
                        <h4 style={{color:"#3C3C3C"}}>Equipment Maintenance:</h4>
                        {department?.equipmentMaintenance.map((eq,index) => (
                            <ul key={index}
                                style={{
                                  listStyleType: "none",
                                  paddingLeft: "10px",
                                  color: "#727272",
                                }}
                            >
                              <li style={{color:"#747474"}}>
                                <span style={{ color: "#727272",marginRight:"2px"}}>• </span>
                                {eq}
                              </li>
                            </ul>
                        ))}
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </div>
              </div>
            </Box>
          </>
        ) : (
          <EntityBasedTable entity={props?.entity} tableIndex={tableIndex} />
        )}
      </div>
    </>
  );
};
export default DepartDetails;
