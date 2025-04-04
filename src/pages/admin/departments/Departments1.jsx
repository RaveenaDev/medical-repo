import React, { useEffect, useState } from "react";
import ayu from "./departments.module.scss";
import DepartCard from "./DepartCard.jsx";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllDepartments } from "../../../components/State/Admin/Action.js";
import CommonPanel from "../Components/CommonPanel.jsx";
import addAppointments from "../../../assets/plus.svg";
import styles from "../../receptionist/styles.module.scss";
import {Box, Button, FormControl, IconButton, MenuItem, Modal} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import OutlinedInput from "@mui/material/OutlinedInput";
import {useTheme} from "@mui/material/styles";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

function getStyles(name, personName, theme) {
    return {
        fontWeight: personName.includes(name)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
    };
}

const Departments1 = (props) => {
    const theme = useTheme();
  const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  useEffect(() => {
    props?.setIsSignUpOrLogin(false);
  }, []);

  const handleBack = () => {
    navigate("/admin");
  };

    const [department, setDepartment] = useState({
        departmentName: '',
        departmentHead: '',
        doctors: [],
        staffs: [],
        services: []
    });

    const handleChange = (e) => {
        setDepartment({
            ...department,
            [e.target.name]: e.target.value
        });
    }

    const handleMultipleChange = (event) => {
        const {
            target: { value },
        } = event;

        setDepartment((prevDepartment) => ({
            ...prevDepartment,
            doctors: typeof value === 'string' ? value.split(',') : value,
        }));
    };

    const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDepartments());
  }, [dispatch]);

  const admin = useSelector((store) => store.admin);

  const allDepartments = admin.departments;

  return (
    <div
      style={{
        background: "#f1f1f1",
        height: "96dvh", // Make the entire div take up the full viewport height
        overflow: "hidden", // Prevent scrolling on the rest of the page
      }}
    >
      <div
        style={{
          position: "fixed",
          top: "0px",
          padding: "10px ",
          width: "77%",
          background: " #F1F1F1",
          zIndex: 100,
        }}
      >
        <CommonPanel />
      </div>
      <div style={{ marginTop: "190px" }}>
        <div className={ayu.headerContainer} style={{justifyContent:'space-between',marginBottom:'0'}}>
            <div style={{display:'flex',alignItems:'center',}}>
                <button className={ayu.backButton} onClick={handleBack}>
                    <ArrowBackIosIcon/>
                </button>
                <h2 className={ayu.departmentTitle}>Department</h2>
            </div>
            <div>
                <Button
                    variant="contained"
                    onClick={handleOpen}
                    sx={{
                        fontSize: "16px",
                        color: "#ffffff",
                        textTransform: "capitalize",
                        padding: {
                            xs: "0px 8px",
                            sm: "0px 10px",
                            md: "4px 10px",
                        }, // Adjust padding
                        backgroundColor: "#25307F",
                        boxShadow: "0px 4px 4px 0px #C2C2C240",
                        "&:hover": {
                            background: "#AEC3FF",
                        },
                        "&:active": {
                            backgroundColor: "#181F52",
                            outline: "none",
                            boxShadow: "none",
                        },
                        "&:focus": {
                            outline: "none",
                            boxShadow: "none",
                        },
                    }}
                >
                    <img
                        src={addAppointments}
                        className={styles.appointmentBlock__plusIcon}
                    />
                    New Department
                </Button>

                {/* Department Modal */}
                <Modal open={open} onClose={handleClose}>
                    <Box
                        sx={{
                            position: "absolute",
                            top: "47%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            bgcolor: "background.paper",
                            boxShadow: 24,
                            width: 510,
                            p: 2,
                            // borderRadius: 2,
                        }}
                    >
                        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:'1px solid #25307F',padding:'5px 8px 1rem 8px'}}>
                            <h4 style={{color:'#000000',fontWeight:500}}>Add New Department</h4>
                            <IconButton
                                sx={{
                                    padding:0,
                                    "&:focus": {
                                        outline: "none",
                                        boxShadow: "none",
                                    },
                                    color: "black",
                                }}
                                onClick={handleClose}
                            >
                                <CloseIcon />
                            </IconButton>
                        </div>

                        <div style={{display:'inline-block'}}>
                            <FormControl sx={{ m: 1, minWidth: 200,
                                marginTop:3,
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: '#25307F' }, // Blue border
                                    '&:hover fieldset': { borderColor: '#25307F' }, // Blue border on hover
                                    '&.Mui-focused fieldset': { borderColor: '#25307F' } // Blue border on focus
                                }}} size="small">
                                <InputLabel id="demo-select-small-label"
                                            sx={{ color: '#25307F' }}>
                                    Department Name
                                </InputLabel>
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    name="departmentName"
                                    value={department.departmentName}
                                    label="Department Name"
                                    onChange={handleChange}
                                    sx={{
                                        color: '#25307F', // Blue text color for selected value
                                        '& .MuiSvgIcon-root': { color: '#25307F' } // Blue color for dropdown arrow icon
                                    }}
                                    IconComponent={(props) => <KeyboardArrowDownIcon {...props} />}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl size="small" sx={{width:'18rem',marginTop:2,marginLeft:1}}>
                                <InputLabel id="department-head-label"
                                sx={{
                                    "&.Mui-focused": {
                                        color: "#747474", // Keep the color same when focused
                                    },
                                }}
                                >Select Department Head</InputLabel>
                                <Select
                                    labelId="department-head-label" // Connect label to select
                                    // size="small"
                                    name="departmentHead"
                                    value={department.departmentHead} // Use selected value
                                    label="Select Department Head"
                                    onChange={handleChange} // Update selected value
                                    style={{ width: "100%" }} // Ensure dropdown fills the container
                                    IconComponent={KeyboardArrowDownIcon}
                                    sx={{
                                        backgroundColor:'#F7F7F7',
                                        borderRadius: 0,
                                        "& .MuiSelect-icon": {
                                            color: "#25307F", // Change the color of the arrow icon
                                        },
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            border: "none", // Remove border
                                        },
                                    }}
                                >
                                    <MenuItem value="Dr. Batra's">
                                        Dr. Batra's
                                    </MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl size="small" sx={{ m: 1, width:'30rem',marginTop:2.4}}>
                                <InputLabel id="demo-multiple-name-label"
                                            sx={{
                                                "&.Mui-focused": {
                                                    color: "#747474", // Keep the color same when focused
                                                },
                                            }}
                                >Select Doctors</InputLabel>
                                <Select
                                    labelId="demo-multiple-name-label"
                                    id="demo-multiple-name"
                                    multiple
                                    value={department.doctors}
                                    onChange={handleMultipleChange}
                                    input={<OutlinedInput label="Select Doctors" />}
                                    MenuProps={MenuProps}
                                    IconComponent={KeyboardArrowDownIcon}
                                    sx={{
                                        backgroundColor:'#F7F7F7',
                                        borderRadius: 0,
                                        "& .MuiSelect-icon": {
                                            color: "#25307F", // Change the color of the arrow icon
                                        },
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            border: "none", // Remove border
                                        },
                                    }}
                                >
                                    {names.map((name) => (
                                        <MenuItem
                                            key={name}
                                            value={name}
                                            style={getStyles(name, department.doctors, theme)}
                                        >
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl size="small" sx={{ m: 1, width:'30rem',marginTop:2}}>
                                <InputLabel id="demo-multiple-name-label"
                                            sx={{
                                                "&.Mui-focused": {
                                                    color: "#747474", // Keep the color same when focused
                                                },
                                            }}
                                >List of Nurses/ Support Staff</InputLabel>
                                <Select
                                    labelId="demo-multiple-name-label"
                                    id="demo-multiple-name"
                                    multiple
                                    value={department.doctors}
                                    onChange={handleMultipleChange}
                                    input={<OutlinedInput label="List of Nurses/ Support Staff" />}
                                    MenuProps={MenuProps}
                                    IconComponent={KeyboardArrowDownIcon}
                                    sx={{
                                        backgroundColor:'#F7F7F7',
                                        borderRadius: 0,
                                        "& .MuiSelect-icon": {
                                            color: "#25307F", // Change the color of the arrow icon
                                        },
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            border: "none", // Remove border
                                        },
                                    }}
                                >
                                    {names.map((name) => (
                                        <MenuItem
                                            key={name}
                                            value={name}
                                            style={getStyles(name, department.doctors, theme)}
                                        >
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl size="small" sx={{ m: 1, width:'30rem',marginTop:2}}>
                                <InputLabel id="demo-multiple-name-label"
                                            sx={{
                                                "&.Mui-focused": {
                                                    color: "#747474", // Keep the color same when focused
                                                },
                                            }}
                                >List of Services Provided</InputLabel>
                                <Select
                                    labelId="demo-multiple-name-label"
                                    id="demo-multiple-name"
                                    multiple
                                    value={department.doctors}
                                    onChange={handleMultipleChange}
                                    input={<OutlinedInput label="List of Services Provided" />}
                                    MenuProps={MenuProps}
                                    IconComponent={KeyboardArrowDownIcon}
                                    sx={{
                                        backgroundColor:'#F7F7F7',
                                        borderRadius: 0,
                                        "& .MuiSelect-icon": {
                                            color: "#25307F", // Change the color of the arrow icon
                                        },
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            border: "none", // Remove border
                                        },
                                    }}
                                >
                                    {names.map((name) => (
                                        <MenuItem
                                            key={name}
                                            value={name}
                                            style={getStyles(name, department.doctors, theme)}
                                        >
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <div style={{display:'flex',justifyContent:'center',marginTop:'10%'}}>
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: "#25307F",
                                        textTransform: "none", // Prevents uppercase transformation
                                        borderRadius: "2px",
                                        padding: "6px 4rem",
                                        marginLeft: "4px",
                                    }}
                                >
                                    Save
                                </Button>
                            </div>
                        </div>
                    </Box>
                </Modal>
            </div>
        </div>

          {/* Horizontal line */}
          <hr style={{border: "1px solid #d3d3d3", margin: "20px 0"}}/>

          {/* Cards */}

          <div className={ayu.superCardContainer}>
          {allDepartments.map((department, index) => (
            <DepartCard key={index} department={department} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Departments1;
