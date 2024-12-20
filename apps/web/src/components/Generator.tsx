import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import {
  TextField,
  Button,
  Typography,
  IconButton,
  Tooltip,
  Snackbar,
  Box,
  Stack
} from "@mui/material";
import Copy from "../assets/copy.svg";
import Alert from "@mui/material/Alert";
import Close from "../assets/close.svg";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import { motion } from "framer-motion";
import { algorithm } from "@repo/shared-utils"
import Writer from "./Writer";
import { StyledButton } from "./StyledButton";
import RangeSlider from "./RangeSlider";
import Checkboxes from "./Checkboxes";
import CustomDivider from "./CustomDivider";
const TimeToCrackIndicator = lazy(() => import("./TimeToCrackIndicator"));
const StrengthIndicator = lazy(() => import("./StrengthIndicator"));

function Generator() {
  const [value, setValue] = useState(8);
  const [password, setPassword] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [buttonStatus, SetButtonStatus] = useState(true);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const [checkboxStates, setCheckboxStates] = useState({
    lower: false,
    upper: false,
    numbers: false,
    symbols: false,
    ambiguous: false,
  });
  const [openSnacks, setOpenSnacks] = useState({
    open: false,
    error: false
  });
  const handleCheckLeakButton = () => {
    const time = Math.floor(Math.random() * 5) + "000";
    if (!loading) {
      setLoading(true);
      SetButtonStatus(false);
      timer.current = setTimeout(
        () => {
          setLoading(false);
          setOpenModal(true);
        },
        parseInt(time, 10)
      );
    }
  };
  const handleSnackClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason == "clickaway") {
      return;
    }
    setOpenSnacks({...openSnacks, open: false});
    setOpenSnacks({...openSnacks, error: false});
  };
  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setOpenSnacks({...openSnacks, open: true});
  };
  const action = (
    <IconButton size="small" color="inherit" onClick={handleSnackClose}>
      <img src={Close} />
    </IconButton>
  );

  useEffect(() => {
    const fetch = async () => {
      if (!password) {
        setResult("password not generated yet");
      } else {
        const { pwnedCall } = await import("../services/pwnedCall");
        const hasRecords = await pwnedCall(password);
        if (hasRecords == "No records found") {
          setResult("No records found. Password is secure to use!");
        } else if (hasRecords?.startsWith("Hash")) {
          setResult(hasRecords);
        } else {
          setResult(hasRecords);
        }
      }
    };
    fetch();
  }, [password]);
  return (
    <>
      <Writer />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <Box sx={ styles.containerStyled }>
          <Box sx={ styles.formStyled }>
            <Stack direction="row">
              <TextField
                variant="outlined"
                fullWidth
                sx={ styles.passCampStyle }
                label="Your password will appear here"
                inputProps={{ readOnly: true }}
                disabled={false}
                value={password}
              />
              <Tooltip title={!password ? "Generate the password first" : "Copy the password to clipboard"}
                placement="top"
              >
                <span role="none" style={{ alignSelf: "center" }}>
                  {/* this span is just because MUI don`t like tooltips in disabled elements */}
                  <IconButton
                    disabled={!password ? true : false}
                    onClick={copyToClipboard}
                    aria-label={!password ? "No password to copy" : "Copy to clipboard"}
                    aria-disabled={!password}
                  >
                    <img
                      style={{ width: 28, height: 28, opacity: !password ? "20%" : "100%" }}
                      src={Copy}
                      alt="Copy to clipboard icon"
                    />
                  </IconButton>
                </span>
              </Tooltip>
              <Snackbar
                open={openSnacks.open}
                autoHideDuration={5000}
                onClose={handleSnackClose}
              >
                <Alert severity="success" variant="filled" action={action}>
                  Password copied to clipboard!
                </Alert>
              </Snackbar>
              <Snackbar
                open={openSnacks.error}
                autoHideDuration={5000}
                onClose={handleSnackClose}
              >
                <Alert severity="error" variant="filled" action={action}>
                  Please select at least one option!
                </Alert>
              </Snackbar>
              <Modal
                open={openModal}
                sx={ styles.modalStyled }
                onClose={() => setOpenModal(false)}
              >
                <Box sx={ styles.modalBoxStyle }>
                  <Typography sx={ styles.modalTextStyled }>{result}</Typography>
                  <Button
                    sx={ styles.modalBoxButton }
                    variant="contained"
                    onClick={() => setOpenModal(false)}
                  >
                    Done
                  </Button>
                </Box>
              </Modal>
            </Stack>
            {password && (
              <Suspense fallback="Calculating Strength...">
                <StrengthIndicator password={password} />
              </Suspense>
            )}
            {password && (
              <Suspense fallback="Calculating Time to Crack...">
                <TimeToCrackIndicator password={password} />
              </Suspense>
            )}
            <CustomDivider variant="middle" />
              <Checkboxes checkboxStates={checkboxStates} setCheckboxStates={setCheckboxStates} />
              <CustomDivider variant="middle" />
            <Typography
              sx={{...styles.formControlLabelStyled, paddingTop: "10px"}}
            >
              Select the password length:
            </Typography>
            <RangeSlider setValue={setValue} />
            <Box sx={ styles.buttonsStyled }>
              <Tooltip title="Click to generate the password">
                <StyledButton
                  variant="contained"
                  sx={ styles.buttonStyled }
                  onClick={() =>
                    [
                      checkboxStates.lower,
                      checkboxStates.upper,
                      checkboxStates.numbers,
                      checkboxStates.symbols,
                    ].every((value) => value === false)
                      ? setOpenSnacks({...openSnacks, error: true})
                      : [
                          setPassword(
                            algorithm(
                              checkboxStates.lower,
                              checkboxStates.upper,
                              checkboxStates.numbers,
                              checkboxStates.symbols,
                              checkboxStates.ambiguous,
                              value
                            )
                          ),
                          SetButtonStatus(true),
                        ]
                  }
                >
                  Generate
                </StyledButton>
              </Tooltip>
              <CustomDivider variant="middle" />
              <Tooltip
                title={
                  !password
                    ? "Generate the password first"
                    : buttonStatus == true
                      ? "Check for leaks in the database"
                      : "Leak Already Checked"
                }
              >
                <Box sx={{ m: 1, position: "relative" }}>
                  <StyledButton
                    variant="contained"
                    sx={ styles.buttonStyled}
                    disabled={(!password ? true : false) || !buttonStatus}
                    onClick={() => handleCheckLeakButton()}
                  >
                    Check Leak
                  </StyledButton>
                  {loading && (
                    <CircularProgress
                      size={25}
                      sx={{
                        color: "#fff",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        marginTop: "-12px",
                        marginLeft: "-12px",
                      }}
                    />
                  )}
                </Box>
              </Tooltip>
            </Box>
          </Box>
        </Box>
      </motion.div>
    </>
  );
}
const styles = {
  containerStyled : {
    width: "90%",
    height: "100%",
    maxWidth: "500px",
    margin: "10px auto",
    backgroundColor: "#d9e1e8",
    padding: "5px 20px",
    borderRadius: "10px",
  },
  formStyled : {
    display: "flex",
    flexDirection: "column",
    padding: "15px 0px",
    fontFamily: "Poppins, sans-serif",
    fontWeight: "200",
  },
  passCampStyle : {
    "& .MuiInputBase-input": {
      fontFamily: "JetBrains Mono",
      borderColor: "#ff0000",
    },
    "& .MuiOutlinedInput-notchedOutline": {},
    "& label.Mui-focused": {
      color: "#000",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#000",
      },
      "&:hover fieldset": {
        borderColor: "#a1a1a1",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#a1a1a1",
      },
    },
  },
  formControlLabelStyled : {
    "& .MuiTypography-root": {
      fontFamily: "Poppins",
      fontWeight: "300",
    },
  },
  modalBoxStyle : {
    position: "absolute",
    display: "flex",
    alignSelf: "center",
    backgroundColor: "#d9e1e8",
    flexDirection: "column",
    padding: 3,
    borderRadius: 5,
    maxWidth: "90%",
  },
  modalBoxButton : {
    width: "100px",
    alignSelf: "center",
    backgroundColor: "#ff5722",
    fontFamily: "JetBrains Mono",
    ":hover": { backgroundColor: "#d54111" },
  },
  buttonsStyled : {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  modalStyled : {
    display: "flex",
    justifyContent: "center",
  },
  modalTextStyled : {
    padding: "10px 10px",
    fontSize: "20px",
    textAlign: "center",
  },
  buttonStyled : {
    ":hover": {
      backgroundColor: "#d54111",
    }
  }
}
export default Generator;
