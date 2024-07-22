import React, { useState, useEffect } from "react";
import "./Gerador.css";
import {
  TextField,
  Checkbox,
  Button,
  FormGroup,
  FormControlLabel,
  Typography,
  IconButton,
  Tooltip,
  Snackbar,
  Divider,
  Box,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import { motion } from "framer-motion";
import { algorithm } from "../../utils/algorithm";
import { pwnedCall } from "../../services/pwnedCall";
import { Writer } from "../Writers/Writer";
import { TimeToCrackIndicator } from "../TimeToCrackIndicator/TimeToCrackIndicator";
import { StrenghtIndicator } from "../StrenghtIndicator/StrenghtIndicator";
import { GenerateButton } from "../GenerateButton/GenerateButton";
import { CheckLeakButton } from "../CheckLeakButton/CheckLeakButton";
import { RangeSlider } from "../RangeSlider/RangeSlider";
import { orange } from "@mui/material/colors";

function Gerador() {
  const [lowercasesChecked, setLowerChecked] = useState(false);
  const [uppercaseChecked, setUpperChecked] = useState(false);
  const [numbersChecked, setNumberChecked] = useState(false);
  const [symbolsChecked, setSymbolChecked] = useState(false);
  const [value, setValue] = useState(8);
  const [password, setPassword] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const [openErrorSnack, setOpenErrorSnack] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [result, setResult] = useState("");
  const [loading, setLoading] = React.useState(false);
  const [buttonStatus, SetButtonStatus] = useState(true);
  const [avoidAmbiguousChecked, setAvoidAmbiguous] = useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout>>();

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  /* Handles everything related to the CheckLeakButton, from loading animations to openning the modal */
  const handleCheckLeakButton = () => {
    if (!loading) {
      setLoading(true);
      SetButtonStatus(false);
      timer.current = setTimeout(() => {
        setLoading(false);
        setOpenModal(true);
        SetButtonStatus(true);
      }, 2000);
    }
  };
  /* Handles the slider value */
  const handleValue = (_event: Event, value: any) => {
    setValue(value);
  };
  /* Handles the algorithms to close the snackbars */
  const handleSnackClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason == "clickaway") {
      return;
    }
    setOpenSnack(false);
    setOpenErrorSnack(false);
  };
  /* The algorithm that copy the generated password to the clipboard */
  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setOpenSnack(true);
  };
  /* The X icon on the alerts */
  const action = (
    <IconButton size="small" color="inherit" onClick={handleSnackClose}>
      <CloseIcon fontSize="small"></CloseIcon>
    </IconButton>
  );

  // function passwordAnimation() {
  //   return (
  //     <TypeAnimation
  //     sequence={["Test", "test123"]}
  //     wrapper="span"
  //     cursor={false}
  //     style={{ fontSize: 25, display: "inline-block", color: "#d9e1e8"}}
  //     speed={{ type: "keyStrokeDelayInMs", value: 70 }}
  //     />
  //   );
  // }

  /* calls the algorithm that calls the api, then gives the result based on the api response */
  useEffect(() => {
    const fetch = async () => {
      if (password.length <= 0) {
        setResult("password no generated yet");
      } else {
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
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          marginBottom: 20,
          fontSize: "2.5rem",
          textAlign: "center",
          color: "#333",
        }}
      >
        <Writer />
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <div className="gerador">
          <form className="form">
            <div className="passThings">
              <TextField
                variant="outlined"
                className="passcamp"
                sx={{
                  "& .MuiInputBase-input": {
                    fontFamily: "JetBrains Mono",
                    borderColor: "#ff0000",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                  },
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
                }}
                label="Your password will appear here"
                inputProps={{ readOnly: true }}
                disabled={false}
                value={password}
              />
              <Tooltip
                title={
                  password.length <= 0
                    ? "Generate the password first"
                    : "Copy the password to clipboard"
                }
                placement="top"
              >
                <span style={{ alignSelf: "center" }}>
                  {/* this span is just because MUI dont like tooltips in disabled elements */}
                  <IconButton
                    disabled={password.length <= 0 ? true : false}
                    className="icon"
                    onClick={copyToClipboard}
                  >
                    <ContentCopyIcon className="icoon"></ContentCopyIcon>
                  </IconButton>
                </span>
              </Tooltip>
              <Snackbar
                open={openSnack}
                autoHideDuration={5000}
                onClose={handleSnackClose}
              >
                <Alert severity="success" variant="filled" action={action}>
                  Password copied to clipboard!
                </Alert>
              </Snackbar>
              <Snackbar
                open={openErrorSnack}
                autoHideDuration={5000}
                onClose={handleSnackClose}
              >
                <Alert severity="error" variant="filled" action={action}>
                  Please select at least one option!
                </Alert>
              </Snackbar>
              <Modal
                open={openModal}
                className="modal"
                onClose={() => setOpenModal(false)}
              >
                <Box
                  sx={{
                    position: "absolute",
                    display: "flex",
                    alignSelf: "center",
                    backgroundColor: "#d9e1e8",
                    flexDirection: "column",
                    padding: 3,
                    borderRadius: 5,
                    maxWidth: "90%",
                  }}
                >
                  <Typography className="modalText">
                    <>{result}</>
                  </Typography>
                  <Button
                    className="modalButton"
                    sx={{
                      backgroundColor: "#ff5722",
                      fontFamily: "JetBrains Mono",
                      ":hover": { backgroundColor: "#d54111" },
                    }}
                    variant="contained"
                    onClick={() => setOpenModal(false)}
                  >
                    Done
                  </Button>
                </Box>
              </Modal>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeIn" }}
              className="passwordData"
            >
              {StrenghtIndicator(password)}
              {TimeToCrackIndicator(password)}
            </motion.div>
            <Divider
              variant="middle"
              className="divider"
              sx={{ color: "#eee", border: "1px solid", marginTop: 1 }}
            />
            <div className="checkboxes">
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={lowercasesChecked}
                      onChange={() => setLowerChecked(!lowercasesChecked)}
                      sx={{
                        "&.Mui-checked": {
                          color: orange[900],
                        },
                      }}
                    />
                  }
                  label="Include Lowercases"
                  sx={{
                    "& .MuiTypography-root": {
                      fontFamily: "Poppins",
                      fontWeight: "300",
                    },
                  }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={uppercaseChecked}
                      onChange={() => setUpperChecked(!uppercaseChecked)}
                      sx={{
                        "&.Mui-checked": {
                          color: orange[900],
                        },
                      }}
                    />
                  }
                  label="Include Uppercases"
                  sx={{
                    "& .MuiTypography-root": {
                      fontFamily: "Poppins",
                      fontWeight: "300",
                    },
                  }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={numbersChecked}
                      onChange={() => setNumberChecked(!numbersChecked)}
                      sx={{
                        "&.Mui-checked": {
                          color: orange[900],
                        },
                      }}
                    />
                  }
                  label="Include Numbers"
                  sx={{
                    "& .MuiTypography-root": {
                      fontFamily: "Poppins",
                      fontWeight: "300",
                    },
                  }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={symbolsChecked}
                      onChange={() => setSymbolChecked(!symbolsChecked)}
                      sx={{
                        "&.Mui-checked": {
                          color: orange[900],
                        },
                      }}
                    />
                  }
                  label="Include Symbols"
                  sx={{
                    "& .MuiTypography-root": {
                      fontFamily: "Poppins",
                      fontWeight: "300",
                    },
                  }}
                />
                <Divider
                  variant="middle"
                  sx={{ color: "#eee", border: "1px solid" }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={avoidAmbiguousChecked}
                      onChange={() => setAvoidAmbiguous(!avoidAmbiguousChecked)}
                      sx={{
                        "&.Mui-checked": {
                          color: orange[900],
                        },
                      }}
                    />
                  }
                  label="Avoid Ambiguous Characters"
                  sx={{
                    "& .MuiTypography-root": {
                      fontFamily: "Poppins",
                      fontWeight: "300",
                    },
                  }}
                />
              </FormGroup>
              <Divider
                variant="middle"
                sx={{ color: "#eee", border: "1px solid" }}
              />
            </div>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: "300",
                paddingTop: "10px",
              }}
            >
              Select the password lenght:
            </Typography>
            <RangeSlider
              valueLabelDisplay="auto"
              defaultValue={8}
              min={4}
              max={140}
              value={value}
              onChange={(_event, value) => handleValue(_event, value)}
            ></RangeSlider>
            <div className="buttons">
              <Tooltip title="Click to generate the password">
                <GenerateButton
                  variant="contained"
                  sx={{
                    ":hover": {
                      backgroundColor: "#d54111",
                    },
                  }}
                  onClick={() =>
                    /* when clicked, checks if at least one checkbox is checked (true). If at least one is checked then it calls the algorithm that generates the password, otherwise it set the error snack to true making him pop up in the screen */
                    [
                      lowercasesChecked,
                      uppercaseChecked,
                      numbersChecked,
                      symbolsChecked,
                    ].every((value) => value === false)
                      ? setOpenErrorSnack(true)
                      : setPassword(
                          algorithm(
                            lowercasesChecked,
                            uppercaseChecked,
                            numbersChecked,
                            symbolsChecked,
                            avoidAmbiguousChecked,
                            value
                          )
                        )
                  }
                >
                  Generate
                </GenerateButton>
              </Tooltip>
              <Divider
                variant="middle"
                sx={{ color: "#eee", border: "1px solid" }}
              />
              <Tooltip
                title={
                  password.length <= 0
                    ? "Generate the password first"
                    : "Check for leaks in the database"
                }
              >
                <Box sx={{ m: 1, position: "relative" }}>
                  <CheckLeakButton
                    variant="contained"
                    sx={{
                      ":hover": {
                        backgroundColor: "#d54111",
                      },
                    }}
                    disabled={
                      (password.length <= 0 ? true : false) || !buttonStatus
                    }
                    onClick={() => handleCheckLeakButton()}
                  >
                    Check Leak
                  </CheckLeakButton>
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
            </div>
          </form>
        </div>
      </motion.div>
    </>
  );
}
export default Gerador;
