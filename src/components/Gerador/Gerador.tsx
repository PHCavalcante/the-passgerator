import { useState } from "react";
import { blue } from "@mui/material/colors";
import "./Gerador.css"
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
    Snackbar
} 
from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { algorithm } from "../../utils/algorithm";

const GenerateButton = styled(Button) <ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
    alignSelf: "center",
    "&:hover": {
        backgroudColor: blue[700],
    },
}));

const RangeSlider = styled(Slider)({
    width: "90%",
    alignSelf: "center",
    color: "#c1c1c1", // cor placeholder
    height: 8,
    '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&::before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#52af77',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&::before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
})

{/* 
function passwordCheck(password:string){
    const veryWeak = [password.length<= 8, (password.length<=15  && !isNaN(parseFloat(password))), (password.length<=9 && !isNaN(parseFloat(password)))]
    if(veryWeak){
        return "Password very weak";
    }else if ((password.length >=9 && password.matchAll(low))){

    }
    // lembrar de colocar verificacao para tamanho da senha
}
*/}

function Gerador(){
    const [lowercasesChecked, setLowerChecked] = useState(false);
    const [uppercaseChecked, setUpperChecked] = useState(false);
    const [numbersChecked, setNumberChecked] = useState(false);
    const [symbolsChecked, setSymbolChecked] = useState(false);
    const [value, setValue] = useState(8);
    const [password, setPassword] = useState("");
    const [openSnack, setOpenSnack] = useState(false);
    const [openErrorSnack, setOpenErrorSnack] = useState(false);
    
    const handleChangeLower = () => {
        setLowerChecked(prevState => {
            const newState = !prevState;
            console.log(newState);
            return newState;
        });
      };
    const handleChangeUpper = () => {
        setUpperChecked(prevState => {
            const newState = !prevState;
            console.log(newState);
            return newState;
        });
      };
    const handleChangeNumber = () => {
        setNumberChecked(prevState => {
            const newState = !prevState;
            console.log(newState);
            return newState;
        });
    };
    const handleChangeSymbol = () => {
        setSymbolChecked(prevState => {
            const newState = !prevState;
            console.log(newState);
            return newState;
        });
    };
    const handleValue = (_event:any, value:any) => {
        setValue(value);
    }
    const handleSnackClose = (_event:any, reason:any) =>{
        if (reason == "clickaway"){
            return;
        }
        setOpenSnack(false);
    }
    const copyToClipboard = () =>{
        navigator.clipboard.writeText(password);    
        setOpenSnack(true);
    }
    {/*
    const HandleErrorSnack = () =>{
        setOpenErrorSnack(true);
    }
    */}
    return(
        <div className="gerador">
                <form className="form">
                    <div className="passThings">
                        <TextField 
                        className="passcamp" 
                        label="Your password will appear here" 
                        inputProps={{readOnly:true}}
                        value={password}
                        disabled={true}
                        />
                        <Tooltip title="Copy Password">
                            <IconButton className="icon" onClick={copyToClipboard}>
                                <ContentCopyIcon className="icoon"></ContentCopyIcon>
                            </IconButton>
                        </Tooltip>
                        <Snackbar
                            open={openSnack}
                            autoHideDuration={6000}
                            onClose={handleSnackClose}
                            message="Password copied to clipboard!"
                            color="#f44336"
                        />
                        <Snackbar
                            open={openErrorSnack}
                            autoHideDuration={4000}
                            message={"Please select at least one option"}
                        />
                    </div>
                    <div className="checkboxes">
                        <FormGroup>
                            <FormControlLabel control={
                                <Checkbox 
                                checked={lowercasesChecked} 
                                onChange={handleChangeLower}
                                />} 
                                label="Include Lowercases"/>
                            <FormControlLabel control={
                                <Checkbox 
                                checked={uppercaseChecked} 
                                onChange={handleChangeUpper}
                                />} 
                                label="Include Uppercases"/>
                            <FormControlLabel control={
                                <Checkbox 
                                checked={numbersChecked}
                                onChange={handleChangeNumber}
                                />} 
                                label="Include Numbers"/>
                            <FormControlLabel control={
                                <Checkbox 
                                checked={symbolsChecked}
                                onChange={handleChangeSymbol}
                                />} 
                                label="Include Symbols"/>
                        </FormGroup>
                    </div>
                    <Typography>Select the password lenght:</Typography>
                    <RangeSlider 
                    valueLabelDisplay="auto" 
                    defaultValue={8} 
                    min={4} 
                    max={140} 
                    value={value} 
                    onChange={(_event, value) => handleValue(_event, value)}
                    >
                    </RangeSlider>
                    <GenerateButton 
                    variant="contained"
                    onClick={() => [lowercasesChecked, uppercaseChecked, numbersChecked, symbolsChecked].every(value => value === false) ? setOpenErrorSnack(true) : setPassword(algorithm(lowercasesChecked, uppercaseChecked, numbersChecked, symbolsChecked, value))}>

                    Generate</GenerateButton>
                </form>
        </div>    
    );
}
export default Gerador