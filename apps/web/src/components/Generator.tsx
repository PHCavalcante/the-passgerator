import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
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
import { GenerateButton } from "./GenerateButton";
import { CheckLeakButton } from "./CheckLeakButton";
import { RangeSlider } from "./RangeSlider";
const TimeToCrackIndicator = lazy(() => import("./TimeToCrackIndicator"));
const StrengthIndicator = lazy(() => import("./StrengthIndicator"));

function Generator() {
  const [value, setValue] = useState(8);
  const [password, setPassword] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const [openErrorSnack, setOpenErrorSnack] = useState(false);
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

  /* Handles everything related to the CheckLeakButton, from loading animations to opening the modal */
  const handleCheckLeakButton = () => {
    const time = Math.floor(Math.random() * 5) + "000";
    if (!loading) {
      setLoading(true);
      SetButtonStatus(false);
      timer.current = setTimeout(
        () => {
          setLoading(false);
          setOpenModal(true);
          // SetButtonStatus(true);
        },
        parseInt(time, 10)
      );
    }
  };
  /* Handles the algorithms to close the snackbar */
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
      <img src={Close} />
    </IconButton>
  );

  /* calls the algorithm that calls the api, then gives the result based on the api response */
  useEffect(() => {
    const fetch = async () => {
      if (!password) {
        setResult("password no generated yet");
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
                      style={{ width: 28, opacity: !password ? "20%" : "100%" }}
                      src={Copy}
                      alt="Copy to clipboard icon"
                    />
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
              <Suspense fallback="Calculating Strenght...">
                <StrengthIndicator password={password} />
              </Suspense>
            )}
            {password && (
              <Suspense fallback="Calculating Time to Crack...">
                <TimeToCrackIndicator password={password} />
              </Suspense>
            )}
            <Divider variant="middle" sx={ styles.dividerStyle } />
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="lowerCase"
                      checked={checkboxStates.lower}
                      onChange={() =>
                        setCheckboxStates({
                          ...checkboxStates,
                          lower: !checkboxStates.lower,
                        })
                      }
                      sx={ styles.checkboxStyled }
                    />
                  }
                  label="Include Lowercases"
                  sx={ styles.formControlLabelStyled }
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="upperCase"
                      checked={checkboxStates.upper}
                      onChange={() =>
                        setCheckboxStates({
                          ...checkboxStates,
                          upper: !checkboxStates.upper,
                        })
                      }
                      sx={ styles.checkboxStyled }
                    />
                  }
                  label="Include Uppercase"
                  sx={ styles.formControlLabelStyled }
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="numbers"
                      checked={checkboxStates.numbers}
                      onChange={() =>
                        setCheckboxStates({
                          ...checkboxStates,
                          numbers: !checkboxStates.numbers,
                        })
                      }
                      sx={ styles.checkboxStyled }
                    />
                  }
                  label="Include Numbers"
                  sx={ styles.formControlLabelStyled }
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="symbols"
                      checked={checkboxStates.symbols}
                      onChange={() =>
                        setCheckboxStates({
                          ...checkboxStates,
                          symbols: !checkboxStates.symbols,
                        })
                      }
                      sx={ styles.checkboxStyled }
                    />
                  }
                  label="Include Symbols"
                  sx={ styles.formControlLabelStyled }
                />
                <Divider variant="middle" sx={ styles.dividerStyle } />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="avoidAmbiguous"
                      checked={checkboxStates.ambiguous}
                      onChange={() =>
                        setCheckboxStates({
                          ...checkboxStates,
                          ambiguous: !checkboxStates.ambiguous,
                        })
                      }
                      sx={ styles.checkboxStyled }
                    />
                  }
                  label="Avoid Ambiguous Characters"
                  sx={ styles.formControlLabelStyled }
                />
              </FormGroup>
              <Divider variant="middle" sx={ styles.dividerStyle } />
            <Typography
              sx={{...styles.formControlLabelStyled, paddingTop: "10px"}}
            >
              Select the password length:
            </Typography>
            <RangeSlider
              valueLabelDisplay="auto"
              defaultValue={8}
              min={4}
              max={140}
              value={value}
              onChange={(_event: Event, value: number | number[]) =>
                setValue(value as number)
              }
            ></RangeSlider>
            <Box sx={ styles.buttonsStyled }>
              <Tooltip title="Click to generate the password">
                <GenerateButton
                  variant="contained"
                  sx={ styles.buttonStyled }
                  onClick={() =>
                    /* when clicked, checks if at least one checkbox is checked (true). If at least one is checked then it calls the algorithm that generates the password, otherwise it set the error snack to true making him pop up in the screen */
                    [
                      checkboxStates.lower,
                      checkboxStates.upper,
                      checkboxStates.numbers,
                      checkboxStates.symbols,
                    ].every((value) => value === false)
                      ? setOpenErrorSnack(true)
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
                </GenerateButton>
              </Tooltip>
              <Divider variant="middle" sx={ styles.dividerStyle } />
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
                  <CheckLeakButton
                    variant="contained"
                    sx={ styles.buttonStyled}
                    disabled={(!password ? true : false) || !buttonStatus}
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
  dividerStyle : {
    color: "#eee",
    border: "1px solid",
    marginTop: 1,
  },
  checkboxStyled : {
    "&.Mui-checked": {
      color: "#e65100",
    },
  },
  formControlLabelStyled : {
    "& .MuiTypography-root": {
      fontFamily: "Poppins",
      fontWeight: "300",
    },
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
