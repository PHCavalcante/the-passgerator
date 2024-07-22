import { checkPasswordStrength } from "../../utils/strenghtCheck";
import { Typography } from "@mui/material";
/* The function that changes the time to crack indicator color based in the time to crack the password */
export function TimeToCrackIndicator(password: string) {
  if (password.length <= 0) {
    return null;
  } else {
    let color = "";
    const timeToCrack:string|undefined  = checkPasswordStrength(password).at(1);
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
      color = "#FF6F00";
    } else if (
      timeToCrack == "Hours" ||
      timeToCrack == "Days" ||
      timeToCrack == "Weeks"
    ) {
      color = "#d76a03";
    } else if (
      timeToCrack == "1 month" ||
      timeToCrack == "Months" ||
      timeToCrack == "1 year"
    ) {
      color = "#8ea604";
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
      <Typography className="text" style={{ fontSize: "17px", fontWeight: "400", fontFamily: "Red Hat Display" }}>
        Time to crack <span style={{ color: color }}>{timeToCrack}</span>
      </Typography>
    );
  }
}
