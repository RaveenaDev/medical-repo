import React, { useEffect, useState } from "react";
import styles from "../../styles.module.scss";
import { Box, Button, Tooltip } from "@mui/material";
import EntityBasedTable from "../../EntityBasedTable/index.jsx";
import ayu from "../departments.module.scss";
import avi from "./departDetails.module.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getDepartmentById,
  getServicesByDepartmentId,
} from "../../../../components/State/Receptionist/Action.js";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";

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
    dispatch(getServicesByDepartmentId(departmentId));
  }, [dispatch, departmentId]);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleClick = () => {
    navigate("/receptionist/departments");
  };

  const receptionist = useSelector((store) => store.receptionist);

  const department = receptionist.department;
  const services = receptionist.servicesByDepartment;

  // console.log("Dep: ",department)
  // console.log("Serv: ",services)

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
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <h4 className={avi.heading}>Specific Branch Name</h4>
                  <div className={avi.pro}>
                    {/* <img
                      className={avi.img}
                      src="https://cdn.pixabay.com/photo/2017/03/14/03/20/woman-2141808_1280.jpg"
                      alt=""
                    /> */}

                    <Avatar
                      src=""
                      sx={{
                        bgcolor: "#e3e3e3",
                        color: "#25307F",
                        fontWeight: 500,
                      }}
                      className="patientAvatar"
                    >
                      {
                        // department?.departmentHead.name[4].toUpperCase()
                      }
                    </Avatar>
                    <p className={avi.name}>
                      {department?.departmentHead.name}
                    </p>
                  </div>
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
                    <Tooltip
                      title={
                        department?.departmentHead?.email ||
                        "No email available"
                      }
                      arrow
                      componentsProps={{
                        tooltip: {
                          sx: {
                            backgroundColor: "#25307F",
                            color: "white",
                            fontSize: "12px",
                            padding: "8px",
                            borderRadius: "8px",
                          },
                        },
                        arrow: {
                          sx: {
                            color: "#25307F",
                          },
                        },
                      }}
                    >
                      <EmailIcon />
                    </Tooltip>
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
                    <Tooltip
                      title={
                        department?.departmentHead?.phone ||
                        "No phone available"
                      }
                      arrow
                      componentsProps={{
                        tooltip: {
                          sx: {
                            backgroundColor: " #2E823B",
                            color: "white",
                            fontSize: "12px",
                            padding: "8px",
                            borderRadius: "8px",
                          },
                        },
                        arrow: {
                          sx: {
                            color: " #2E823B",
                          },
                        },
                      }}
                    >
                      <PhoneIcon />
                    </Tooltip>
                  </Button>
                </div>
              </div>

              <div className={avi.section1}>
                <Grid
                  container
                  sx={{
                    width: "100%",
                    justifyContent: "space-between",
                    height: "70vh",
                  }}
                >
                  {/* Section 1 */}
                  <Grid
                    // md={4}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      width: "45%",
                      padding: "5px 25px 20px 15px",

                      border: "1px solid rgba(116, 116, 116, 0.3)",
                      borderRadius: "4px",
                      boxShadow: "0 3px 4px rgba(116, 116, 116, 0.2)",
                    }}
                  >
                    <div style={{ width: "100%", padding: "0 20px" }}>
                      <h4 className={avi.heading}>Staff Details</h4>
                      <Box>
                        <Stack spacing={1}>
                          {" "}
                          {/* Adds a gap of 2 (default = 16px) between children */}
                          <FormControl>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={age}
                              onChange={handleChange}
                              IconComponent={KeyboardArrowDownIcon}
                              displayEmpty // Ensures label remains visible
                              renderValue={() => (
                                <span>
                                  <span style={{ color: "#3C3C3C" }}>
                                    Total Doctors:{" "}
                                  </span>
                                  <span
                                    style={{
                                      color: "#3C3C3C",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {department?.totalDoctors.length}
                                  </span>
                                </span>
                              )}
                              sx={{
                                "& .MuiSelect-select": {
                                  padding: 1.5, // Removes padding inside Select field
                                },
                                "& .MuiSelect-icon": { color: "#25307f" }, // Change dropdown icon color
                              }}
                              MenuProps={{
                                PaperProps: {
                                  sx: {
                                    maxHeight: 200, // Set fixed height for the dropdown
                                    overflowY: "auto", // Enable scrolling when content overflows
                                  },
                                },
                              }}
                            >
                              {department?.totalDoctors.map((doctor, index) => (
                                <MenuItem
                                  key={index}
                                  value={doctor}
                                  sx={{
                                    color: "#000",
                                    opacity: 1,
                                    pointerEvents: "none",
                                  }}
                                >
                                  {doctor?.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          <FormControl>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={age}
                              onChange={handleChange}
                              IconComponent={KeyboardArrowDownIcon}
                              displayEmpty // Ensures label remains visible
                              renderValue={() => (
                                <span>
                                  <span style={{ color: "#3C3C3C" }}>
                                    Total Nurses/Support Staff:{" "}
                                  </span>
                                  <span
                                    style={{
                                      color: "#3C3C3C",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {department?.nurses.length}
                                  </span>
                                </span>
                              )}
                              sx={{
                                "& .MuiSelect-select": {
                                  padding: 1.5, // Removes padding inside Select field
                                },
                                "& .MuiSelect-icon": { color: "#25307f" }, // Change dropdown icon color
                              }}
                              MenuProps={{
                                PaperProps: {
                                  sx: {
                                    maxHeight: 200, // Set fixed height for the dropdown
                                    overflowY: "auto", // Enable scrolling when content overflows
                                  },
                                },
                              }}
                            >
                              {department?.nurses.map((staff, index) => (
                                <MenuItem
                                  key={index}
                                  value="NURSE1"
                                  sx={{
                                    color: "#000",
                                    opacity: 1,
                                    pointerEvents: "none",
                                  }}
                                >
                                  {staff}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          <div className={avi.details}>
                            <h3 style={{ color: "#3C3C3C" }}>
                              Specialist Doctors:
                            </h3>
                            {department?.specialistDoctors.length > 0 ? (
                              department.specialistDoctors.map((doc, index) => (
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
                                    <span style={{ color: "black" }}>• </span>
                                    {doc}
                                  </li>
                                </ul>
                              ))
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
                    // sm={6}
                    sx={{ display: "flex", justifyContent: "center" }}
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
                      <div className={avi.box3} style={{ padding: "0 14px" }}>
                        <div style={{ marginBottom: "14px" }}>
                          <h4 style={{ color: "#000000", fontSize: "1rem" }}>
                            Available services
                          </h4>

                          <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
                            {Array.isArray(services) && services.length > 0 ? (
                              services.map((serv, sIdx) => (
                                <ul
                                  key={serv?.id || sIdx}
                                  style={{
                                    listStyleType: "none",
                                    paddingLeft: "10px",
                                    color: "#727272",
                                    margin: 0,
                                    marginBottom: "-1rem",
                                  }}
                                >
                                  <li style={{ color: "#000000" }}>
                                    <span
                                      style={{
                                        color: "#000000",
                                        marginRight: "2px",
                                      }}
                                    >
                                      •{" "}
                                    </span>
                                    {serv?.name ?? "Unnamed service"}

                                    {/* Subcategories */}
                                    {Array.isArray(serv?.categories) &&
                                      serv.categories.length > 0 && (
                                        <ul
                                          style={{
                                            listStyleType: "disc",
                                            marginLeft: "18px",
                                            paddingLeft: 0,
                                          }}
                                        >
                                          {serv.categories.map((cat, cIdx) => (
                                            <li
                                              key={cat?.id || cIdx}
                                              style={{
                                                color: "#767676",
                                                marginBottom: "-7px",
                                              }}
                                            >
                                              {cat?.subCategoryName ??
                                                "Unnamed subcategory"}
                                            </li>
                                          ))}
                                        </ul>
                                      )}
                                  </li>
                                </ul>
                              ))
                            ) : (
                              <p
                                style={{ color: "#9b9b9b", marginLeft: "10px" }}
                              >
                                No services to show.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </div>

              {/*<div>*/}
              {/*  <div className={avi.section3}>*/}
              {/*    <Grid*/}
              {/*      container*/}
              {/*      sx={{*/}
              {/*        width: "100%",*/}
              {/*        justifyContent: "flex-start",*/}
              {/*        paddingBottom: 2,*/}
              {/*      }}*/}
              {/*      spacing={2}*/}
              {/*    >*/}
              {/*      /!* First Grid Item *!/*/}
              {/*      <Grid xs={12} sm={6} md={5} sx={{ width: "40%" }}>*/}
              {/*        <div className={avi.box3} style={{padding: "14px"}}>*/}
              {/*          <div style={{marginBottom: "14px"}}>*/}
              {/*            <h4 style={{color: "#3C3C3C"}}>Available services:</h4>*/}

              {/*            {Array.isArray(services) && services.length > 0 ? (*/}
              {/*                services.map((serv, sIdx) => (*/}
              {/*                    <ul*/}
              {/*                        key={serv?.id || sIdx}*/}
              {/*                        style={{*/}
              {/*                          listStyleType: "none",*/}
              {/*                          paddingLeft: "10px",*/}
              {/*                          color: "#727272",*/}
              {/*                          margin: 0,*/}
              {/*                        }}*/}
              {/*                    >*/}
              {/*                      <li style={{color: "#000000"}}>*/}
              {/*                        <span style={{color: "#000000", marginRight: "2px"}}>• </span>*/}
              {/*                        {serv?.name ?? "Unnamed service"}*/}

              {/*                        /!* Subcategories *!/*/}
              {/*                        {Array.isArray(serv?.categories) && serv.categories.length > 0 && (*/}
              {/*                            <ul*/}
              {/*                                style={{*/}
              {/*                                  listStyleType: "disc",*/}
              {/*                                  marginLeft: "18px",*/}
              {/*                                  paddingLeft: 0,*/}
              {/*                                }}*/}
              {/*                            >*/}
              {/*                              {serv.categories.map((cat, cIdx) => (*/}
              {/*                                  <li key={cat?.id || cIdx} style={{color: "#767676"}}>*/}
              {/*                                    {cat?.subCategoryName ?? "Unnamed subcategory"}*/}
              {/*                                  </li>*/}
              {/*                              ))}*/}
              {/*                            </ul>*/}
              {/*                        )}*/}
              {/*                      </li>*/}
              {/*                    </ul>*/}
              {/*                ))*/}
              {/*            ) : (*/}
              {/*                <p style={{color: "#9b9b9b", marginLeft: "10px"}}>No services to show.</p>*/}
              {/*            )}*/}
              {/*          </div>*/}
              {/*        </div>*/}

              {/*      </Grid>*/}

              {/*      /!* Second Grid Item *!/*/}
              {/*      <Grid xs={12} sm={6} md={7}>*/}
              {/*        <div className={avi.box4} style={{padding: "14px"}}>*/}
              {/*          <div style={{marginBottom: "14px"}}>*/}
              {/*            <h4 style={{color: "#3C3C3C"}}>*/}
              {/*              Critical Equipment:*/}
              {/*            </h4>*/}
              {/*            {department?.criticalEquipment.map((cric, index) => (*/}
              {/*                <ul*/}
              {/*                    key={index}*/}
              {/*                    style={{*/}
              {/*                      listStyleType: "none",*/}
              {/*                      paddingLeft: "10px",*/}
              {/*                      color: "#727272",*/}
              {/*                    }}*/}
              {/*                >*/}
              {/*                  <li style={{color: "#747474"}}>*/}
              {/*                  <span*/}
              {/*                      style={{*/}
              {/*                        color: "#727272",*/}
              {/*                        marginRight: "2px",*/}
              {/*                      }}*/}
              {/*                  >*/}
              {/*                    •{" "}*/}
              {/*                  </span>*/}
              {/*                    {cric}*/}
              {/*                  </li>*/}
              {/*                </ul>*/}
              {/*            ))}*/}
              {/*          </div>*/}

              {/*          <div>*/}
              {/*            <h4 style={{ color: "#3C3C3C" }}>*/}
              {/*              Equipment Maintenance:*/}
              {/*            </h4>*/}
              {/*            {department?.equipmentMaintenance.map((eq, index) => (*/}
              {/*              <ul*/}
              {/*                key={index}*/}
              {/*                style={{*/}
              {/*                  listStyleType: "none",*/}
              {/*                  paddingLeft: "10px",*/}
              {/*                  color: "#727272",*/}
              {/*                }}*/}
              {/*              >*/}
              {/*                <li style={{ color: "#747474" }}>*/}
              {/*                  <span*/}
              {/*                    style={{*/}
              {/*                      color: "#727272",*/}
              {/*                      marginRight: "2px",*/}
              {/*                    }}*/}
              {/*                  >*/}
              {/*                    •{" "}*/}
              {/*                  </span>*/}
              {/*                  {eq}*/}
              {/*                </li>*/}
              {/*              </ul>*/}
              {/*            ))}*/}
              {/*          </div>*/}
              {/*        </div>*/}
              {/*      </Grid>*/}
              {/*    </Grid>*/}
              {/*  </div>*/}
              {/*</div>*/}
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
