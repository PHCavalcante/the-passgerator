import React, { useState, useEffect } from "react";
import { blue } from "@mui/material/colors";
import "./Gerador.css";
import {
  TextField,
  Checkbox,
  Slider,
  Button,
  ButtonProps,
  FormGroup,
  FormControlLabel,
  styled,
  Typography,
  IconButton,
  Tooltip,
  Snackbar,
  Divider,
  Box,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import { motion } from "framer-motion"
import { algorithm } from "../../utils/algorithm";
import { checkPasswordStrength } from "../../utils/strenghtCheck";
import { pwnedCall } from "../../services/pwnedCall";
import { Writer } from "../Writers/Writer";

/* Creation of the button with styles that generates the password */
const GenerateButton = styled(Button)<ButtonProps>(() => ({
  backgroundColor: "#2b90d9",
  alignSelf: "center",
  "&:hover": {
    backgroudColor: "#3ca1ea",
  },
}));
/* Creation of the button with styles that checks for leaks */
const CheckLeakButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(blue[500]),
  backgroundColor: "#2b90d9",
  alignSelf: "center",
  "&:hover": {
    backgroudColor: "#3ca1ea",
  },
}));
/* Creation of the styled range slider */
const RangeSlider = styled(Slider)({
  width: "90%",
  alignSelf: "center",
  color: "#9baec8",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    color: "#9baec8",
    backgroundColor: "#d9e1e8",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&::before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#2b90d9",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&::before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

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

  /* Handles the lowercase checkbox boolean value */
  const handleChangeLower = () => {
    setLowerChecked((prevState) => {
      const newState = !prevState;
      return newState;
    });
  };
  /* Handles the uppercase checkbox boolean value */
  const handleChangeUpper = () => {
    setUpperChecked((prevState) => {
      const newState = !prevState;
      return newState;
    });
  };
  /* Handles the numbers checkbox boolean value */
  const handleChangeNumber = () => {
    setNumberChecked((prevState) => {
      const newState = !prevState;
      return newState;
    });
  };
  /* Handles the symbols (special characters) checkbox boolean value */
  const handleChangeSymbol = () => {
    setSymbolChecked((prevState) => {
      const newState = !prevState;
      return newState;
    });
  };
  /* Handles the slider value */
  const handleValue = (_event: any, value: any) => {
    setValue(value);
  };
  /* Handles the algorithms to close the snackbars */
  const handleSnackClose = (_event: React.SyntheticEvent | Event, reason?: string) => {
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
  const action = (<IconButton size="small" color="inherit" onClick={handleSnackClose}><CloseIcon fontSize="small"></CloseIcon></IconButton>);
  /* The function that changes the strenght color in the strenght indicator based in the password strenght */
  function strenghtIndicator() {
    let strenght: any = checkPasswordStrength(password);
    strenght = strenght[0];
    let color =
      strenght == "Very weak"
        ? "red"
        : strenght == "weak"
        ? "orange"
        : strenght == "Average"
        ? "#E18E4A"

        : strenght == "Strong"
        ? "green"
        : strenght == "Very strong"
        ? "blue"
        : "blue";

    return password.length > 0 ? (
      <Typography style={{ fontSize: "17px", fontWeight: "400" }}>
        The password is <span style={{ color: color }}>{strenght}</span>
      </Typography>
    ) : null;
  }
  /* The function that changes the time to crack indicator color based in the time to crack the password */
  function TimeToCrackIndicator(password:string) {
    if (password.length <= 0) {
      return null;
    } else {
      let color = "";
      let timeToCrack: any = checkPasswordStrength(password);
      timeToCrack = timeToCrack[1];
      if (
        timeToCrack == "Instantly" ||
        timeToCrack == "1 second" ||
        timeToCrack == "Seconds"
      ) {
        color = "#ff0000";
      } else if (
        timeToCrack == "1 minute" ||
        timeToCrack == "Minutes" ||
        timeToCrack == "1 hour"
      ) {
        color = "#ff7f00";
      } else if (
        timeToCrack == "Hours" ||
        timeToCrack == "Days" ||
        timeToCrack == "Weeks"
      ) {
        color = "#ffff00";
      } else if (
        timeToCrack == "1 month" ||
        timeToCrack == "Months" ||
        timeToCrack == "1 year"
      ) {
        color = "#00ff00";
      } else if (
        timeToCrack == "Years" ||
        timeToCrack == "Centures" ||
        timeToCrack == "Millenia"
      ) {
        color = "#005fd1";
      } else if (
        timeToCrack == "1 milion year" ||
        timeToCrack == "milions of years" ||
        timeToCrack == "∞"
      ) {
        color = "#0000ff";
      } else {
        color = "#0000ff";
      }
      return (
        <Typography style={{ fontSize: "17px", fontWeight: "500" }}>
          Time to crack <span style={{ color: color }}>{timeToCrack}</span>
        </Typography>
      );
    }
  }
  
  /* calls the algorithm that calls the api, then gives the result based on the api response */
  useEffect(() => {
     const fetch = async () => {
      if (password.length <= 0){
        setResult("password no generated yet");
      }else{
        const hasRecords = await pwnedCall(password);
        if(hasRecords == "No records found"){ 
          setResult("No records found. Password is secure to use!");
        }else if(hasRecords?.startsWith("Hash")){
          setResult(hasRecords);
        }else{
          setResult(hasRecords);
        }
      }
    };
    fetch();
  }, [password])

  return (
    <>
      <motion.h1
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{ marginBottom: 20, fontSize: '2.5rem', textAlign: 'center', color: '#333' }}
      >
      <Writer/>
    </motion.h1>
      <motion.div 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}>
      <div className="gerador">
        <form className="form">
          <div className="passThings">
            <TextField
              variant="outlined"
              className="passcamp"
              label="Your password will appear here"
              inputProps={{ readOnly: true }}
              disabled={false}
              value={password}
            />
            <Tooltip title={password.length <= 0 ? "Generate the password first" : "Copy the password to clipboard"} placement="top">
              <span style={{alignSelf: "center"}}> {/* this span is just because MUI dont like tooltips in disabled elements */}
              <IconButton disabled={password.length <= 0 ?  true : false} className="icon" onClick={copyToClipboard}>
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
            <Modal open={openModal} className="modal" onClose={() => setOpenModal(false)}>
              <Box sx={{position: "absolute", display: "flex", alignSelf: "center",backgroundColor: "#fff", flexDirection: "column", padding: 3, borderRadius: 5, maxWidth: "90%"}}>
                <Typography className="modalText" sx={{textAlign: "center"}}><>{result}</></Typography>
                <Button variant="contained" onClick={() => setOpenModal(false)} sx={{width: 100, alignSelf: "center"}}>Done</Button>
              </Box>
            </Modal>
          </div>
          <motion.div initial={{opacity: 0, scale: 0.5}} animate={{opacity: 1, scale: 1}} transition={{duration: 0.5, ease: "easeIn"}} className="passwordData">
            {strenghtIndicator()}
            {TimeToCrackIndicator(password)}
          </motion.div>
          <Divider
            variant="middle"
            sx={{ color: "#eee", border: "1px solid", marginTop: 1 }}
          />
          <div className="checkboxes">
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={lowercasesChecked}
                    onChange={handleChangeLower}
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
                    onChange={handleChangeUpper}
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
                    onChange={handleChangeNumber}
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
                    onChange={handleChangeSymbol}
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
              onClick={() => /* when clicked, checks if at least one checkbox is checked (true). If at least one is checked then it calls the algorithm that generates the password, otherwise it set the error snack to true making him pop up in the screen */
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
              sx={{ color: "#ccc", border: "1px solid" }}
            />
            <Tooltip title={password.length <= 0 ? "Generate the password first" : "Check for leaks in the database"}>
              <Box sx={{ m: 1, position: "relative"}}>
                <CheckLeakButton
                  variant="contained"
                  disabled={(password.length <= 0 ?  true : false) || !buttonStatus}
                  onClick={() => handleCheckLeakButton()}
                >
                  Check Leak
                </CheckLeakButton>
                {loading && (
                  <CircularProgress
                    size={25}
                    sx={{
                      color: "#fff",
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      marginTop: '-12px',
                      marginLeft: '-12px',
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
