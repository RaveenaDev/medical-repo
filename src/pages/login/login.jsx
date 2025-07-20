import React, { useEffect, useState } from "react";
import styles from "../../styles/pages/login.module.scss";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../components/State/Authentication/Action.js";
import { Box, Tooltip } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import RefreshIcon from "@mui/icons-material/Refresh"; // Import refresh icon

const generateCaptcha = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let captcha = "";
  for (let i = 0; i < 6; i++) {
    captcha += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return captcha;
};

const Login = (props) => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    // role: "HospitalAdmin",
  });

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserDetails({
      ...userDetails,
      [name]: value,
    });

    if (name === "email") {
      setEmailError(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Invalid email format"
      );
    } else if (name === "password") {
      setPasswordError(
        value.length >= 6 ? "" : "Password must be at least 6 characters long"
      );
    }
  };

  const handleCaptchaChange = (e) => {
    setCaptchaInput(e.target.value);
  };

  const handleLoginClick = () => {
    if (!userDetails.email || !userDetails.password) {
      setEmailError(!userDetails.email ? "Email is required" : "");
      setPasswordError(!userDetails.password ? "Password is required" : "");
      return;
    }

    if (emailError || passwordError) {
      return;
    }

    //validation for user login & write an api call for user login
    if (captchaInput !== captcha) {
      setCaptchaError("Invalid CAPTCHA. Please try again.");
      setCaptcha(generateCaptcha());
      setCaptchaInput("");
      return;
    }
    setCaptchaError(""); // Clear error if CAPTCHA is correct
    setLoading(true); // Show loader
    dispatch(login(userDetails))
      .then(() => {
        setLoading(false); // Hide loader on success
      })
      .catch(() => {
        setLoading(false); // Hide loader on failure
      });
  };

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setCaptchaInput("");
    setCaptchaError("");
  };

  const handleForgetPassword = () => {
    navigate("/password-reset");
  };

  useEffect(() => {
    props?.setIsSignUpOrLogin(true);
    props?.setShouldShowSidebar(true);
  }, []);

  const auth = useSelector((store) => store.authentication);
  useEffect(() => {
    if (auth?.role === "receptionist") {
      navigate("/receptionist");
    } else if (auth?.role === "hospitalAdmin") {
      navigate("/admin");
    } else if (auth?.role === "doctor") {
      navigate("/doctor");
    }
  }, [auth?.role, navigate]);

  return (
    <div style={{ display: "flex", alignItems: "center", height: "100vh" }}>
      <div className={styles.login}>
        <p className={styles.login__title}>Login</p>
        <Stack component="form" spacing={3} noValidate autoComplete="off">
          <TextField
            id="user_id"
            placeholder="Enter ID"
            name="email"
            value={userDetails.email}
            onChange={handleChange}
            error={!!emailError}
            helperText={emailError}
            InputProps={{
              sx: {
                height: "58px", // Adjust height of the input box
                fontSize: "1rem", // Adjust font size if needed
                padding: "0 14px", // Adjust padding inside input
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderWidth: "2px", // Bold border
                  borderRadius: "10px", // Ensure the input's border radius matches
                },
                "&:hover fieldset": {
                  borderWidth: "2px", // Keep bold on hover
                },
                "&.Mui-focused fieldset": {
                  borderWidth: "2px", // Keep bold on focus
                },
              },
            }}
          />
          {/* <TextFieldHiddenLabel name="Password" id="password" type="password" placeholder="Enter Password" /> */}
          <OutlinedInput
            placeholder="Enter Password"
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={userDetails.password}
            onChange={handleChange}
            error={!!passwordError}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? "hide the password" : "display the password"
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            sx={{
              height: "60px", // Adjust outer height
              fontSize: "1rem", // Adjust font size
              borderRadius: "10px",
              padding: "0 14px", // Adjust padding inside input
              "& .MuiOutlinedInput-notchedOutline": {
                borderWidth: "2px", // Bold border
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderWidth: "2px", // Keep bold on hover
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderWidth: "2px", // Keep bold on focus
              },
            }}
          />
          {passwordError && (
            <p
              style={{
                color: "#D32F2F",
                fontSize: "0.77rem",
                marginTop: "2px",
                marginLeft: "16px",
              }}
            >
              {passwordError}
            </p>
          )}
          <Grid
            container
            spacing={6}
            justifyContent="space-between"
            alignItems="center"
            flexDirection={{ xs: "column", md: "row" }}
            size={12}
          >
            <Grid size={6} sx={{ display: "flex" }}>
              <Box
                sx={{
                  backgroundColor: "#25307F",
                  color: "white",
                  padding: "7px 2px",
                  paddingLeft: "12px",
                  borderRadius: "8px",
                  textAlign: "center",
                  fontSize: "1.8rem", // Bigger font size
                  letterSpacing: "0.8rem", // Gap between digits
                  fontWeight: 600,
                }}
              >
                {captcha}
              </Box>
              <Grid sx={{ transform: "translateY(10px)" }}>
                <Tooltip title="Refresh CAPTCHA">
                  <IconButton
                    onClick={refreshCaptcha}
                    sx={{
                      outline: "none", // Remove the focus outline
                      "&:focus": {
                        outline: "none",
                      },
                      "&:focus-visible": {
                        outline: "none",
                      },
                    }}
                  >
                    <RefreshIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
            <Grid size={6}>
              <TextField
                name="captcha"
                id="captcha_write"
                placeholder="Enter Captcha"
                value={captchaInput}
                onChange={handleCaptchaChange}
                InputProps={{
                  sx: {
                    height: "58px", // Adjust height of the input box
                    fontSize: "1rem", // Adjust font size if needed
                    padding: "0 14px", // Adjust padding inside input
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderWidth: "2px", // Bold border
                      borderRadius: "10px", // Ensure the input's border radius matches
                    },
                    "&:hover fieldset": {
                      borderWidth: "2px", // Keep bold on hover
                    },
                    "&.Mui-focused fieldset": {
                      borderWidth: "2px", // Keep bold on focus
                    },
                  },
                }}
              />
            </Grid>
          </Grid>
          {captchaError && (
            <p
              style={{
                display: "flex",
                justifyContent: "flex-end",
                color: "red",
                fontSize: "0.9rem",
                marginTop: "8px",
              }}
            >
              {captchaError}
            </p>
          )}
          <Button
            variant="contained"
            sx={{
              fontSize: "24px",
              height: "55px",
              textTransform: "capitalize",
              backgroundColor: "#25307F",
              borderRadius: "8px",
              border: "none", // Remove any border
              boxShadow: "none", // Remove any box shadow that might look like a border
              "&:hover": {
                backgroundColor: "#1F276B", // Optional: adjust hover color without border
                boxShadow: "none", // Remove hover shadow
              },
            }}
            onClick={handleLoginClick}
          >
            {loading ? (
              <CircularProgress
                size={30}
                thickness={5}
                sx={{
                  color: "white",
                }}
              />
            ) : (
              "Login"
            )}
          </Button>
          <Grid
            container
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
            flexDirection={{ xs: "column", sm: "row" }}
            size={12}
          >
            <Grid size={6} offset={{ md: "0" }}>
              {/* <Button variant="text" sx={{fontSize: "22px", color: "#0150EA", textTransform: "capitalize", padding: "0px"}}>Forgot ID</Button> */}
            </Grid>
            <Grid size={6} offset={{ md: "10" }} sx={{ textAlign: "right" }}>
              <Button
                variant="text"
                sx={{
                  fontSize: "17px",
                  color: "#0150EA",
                  textTransform: "capitalize",
                  padding: "0px",
                  fontWeight: 300,
                }}
                onClick={handleForgetPassword}
              >
                Forgot password
              </Button>
            </Grid>
          </Grid>
        </Stack>
      </div>
    </div>
  );
};

export default Login;
