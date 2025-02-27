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
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDepartmentById } from "../../../../components/State/Admin/Action.js";

const DepartDetails1 = (props) => {
  const navigate = useNavigate();

  const [tableIndex, setTableIndex] = useState(null);
  useEffect(() => {
    props?.setIsSignUpOrLogin(false);
  }, []);

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleClick = () => {
    navigate("/admin/departments");
  };

  const { departmentId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDepartmentById(departmentId));
  }, [dispatch, departmentId]);

  const department = useSelector((store) => store.admin.department);

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
              <h2 className={ayu.departmentTitleDetails}>
                {department?.departmentName}
              </h2>
            </div>

            {/*/!* Horizontal line *!/*/}
            {/*<hr style={{border: '1px solid #d3d3d3', margin: '20px 0'}} />*/}

            <Box className={avi.boxContainer}>
              <div>
                <h3 className={avi.heading}>Specific Branch Name</h3>
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
                      xs={12}
                      sm={6}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        width: "40%",
                      }}
                    >
                      <div style={{ width: "100%", padding: "0 20px" }}>
                        <h4 className={avi.heading}>Staff Details</h4>
                        <Box sx={{ minWidth: 430 }}>
                          <Stack spacing={1}>
                            {" "}
                            {/* Adds a gap of 2 (default = 16px) between children */}
                            <FormControl fullWidth>
                              <InputLabel
                                id="demo-simple-select-label"
                                // sx={{ fontWeight: 'bold' }} // Makes the label text bold
                              >
                                Total Doctors:{" "}
                                <span
                                  style={{
                                    fontWeight: "bold",
                                    fontSize: "1.1em",
                                    marginLeft: "1px",
                                    position: "relative",
                                    top: "1px", // Adjust this value to shift it further down
                                  }}
                                >
                                  {department?.totalDoctors.length}
                                </span>
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                label="Total Doctors: 03"
                                onChange={handleChange}
                                IconComponent={KeyboardArrowDownIcon} // Use ArrowDownwardIcon as the dropdown icon
                                sx={{
                                  "& .MuiSelect-icon": {
                                    color: "#25307f", // Change icon color to blue
                                  },
                                }}
                              >
                                <MenuItem value={10}>Doctor1</MenuItem>
                                <MenuItem value={20}>Doctor2</MenuItem>
                                <MenuItem value={30}>Doctor3</MenuItem>
                              </Select>
                            </FormControl>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">
                                Total Nurses/Support Staff:{" "}
                                <span
                                  style={{
                                    fontWeight: "bold",
                                    fontSize: "1.1em",
                                    marginLeft: "1px",
                                    position: "relative",
                                    top: "1px",
                                  }}
                                >
                                  {department?.totalNurses}
                                </span>
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                label="Total Nurses/Support Staff: 04"
                                onChange={handleChange}
                                // IconComponent={CustomIcon} // Custom icon component
                                IconComponent={KeyboardArrowDownIcon} // Use ArrowDownwardIcon as the dropdown icon
                                sx={{
                                  "& .MuiSelect-icon": {
                                    color: "#25307f", // Change icon color to blue
                                  },
                                }}
                              >
                                <MenuItem value={10}>Doctor1</MenuItem>
                                <MenuItem value={20}>Doctor2</MenuItem>
                                <MenuItem value={30}>Doctor3</MenuItem>
                              </Select>
                            </FormControl>
                            <div className={avi.details}>
                              <h3>Specialist Doctors:</h3>
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
                      sx={{ display: "flex", justifyContent: "center" }}
                      className={avi.section2}
                    >
                      <div
                        style={{
                          width: "100%",
                          boxShadow: "0 3px 4px rgba(116, 116, 116, 0.2)",
                          padding: "20px",
                          borderRadius: "8px",
                          border: "1px solid rgba(116, 116, 116, 0.3)",
                        }}
                      >
                        <h4 className={avi.heading}>Facilites</h4>
                        <ul
                          style={{
                            listStyleType: "none", // Remove default list style
                            paddingLeft: "10px",
                            color: "black",
                          }}
                        >
                          <li
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                            }}
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
                                10 (Include ICU/Cardiac Care Units if
                                applicable)
                              </p>
                            </div>
                          </li>
                          <li
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                            }}
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
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                            }}
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

                <div className={avi.section3}>
                  <Grid
                    container
                    sx={{ width: "100%", justifyContent: "space-between" }}
                  >
                    {/* First Grid Item */}
                    <Grid xs={12} sm={6}>
                      <div className={avi.box3} style={{ padding: "14px" }}>
                        <div style={{ marginBottom: "14px" }}>
                          <h4>Available services</h4>
                          {department?.availableServices.map((serv) => (
                            <ul
                              style={{
                                listStyleType: "none",
                                paddingLeft: "10px",
                                color: "#727272",
                              }}
                            >
                              <li>
                                <span style={{ color: "#727272" }}>• </span>
                                {serv}
                              </li>
                            </ul>
                          ))}
                        </div>

                        <div>
                          <h4>Specialized Procedures</h4>
                          {department?.specializedProcedures.map((spec) => (
                            <ul
                              style={{
                                listStyleType: "none",
                                paddingLeft: "10px",
                                color: "#727272",
                              }}
                            >
                              <li>
                                <span style={{ color: "#727272" }}>• </span>
                                {spec}
                              </li>
                            </ul>
                          ))}
                        </div>
                      </div>
                    </Grid>

                    {/* Second Grid Item */}
                    <Grid xs={12} sm={6}>
                      <div className={avi.box4} style={{ padding: "14px" }}>
                        <div style={{ marginBottom: "14px" }}>
                          <h4>Critical Equipment</h4>
                          {department?.criticalEquipment.map((cric) => (
                            <ul
                              style={{
                                listStyleType: "none",
                                paddingLeft: "10px",
                                color: "#727272",
                              }}
                            >
                              <li>
                                <span style={{ color: "#727272" }}>• </span>
                                {cric}
                              </li>
                            </ul>
                          ))}
                        </div>

                        <div>
                          <h4>Equipment Maintenance</h4>
                          {department?.equipmentMaintenance.map((eq) => (
                            <ul
                              style={{
                                listStyleType: "none",
                                paddingLeft: "10px",
                                color: "#727272",
                              }}
                            >
                              <li style={{ display: "flex" }}>
                                <span style={{ color: "#727272" }}>• </span>
                                <div style={{ marginLeft: "4px" }}>{eq}</div>
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
export default DepartDetails1;
