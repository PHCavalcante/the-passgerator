import { Typography } from "@mui/material";
import { checkPasswordStrength } from "../../utils/strengthCheck";
/* The function that changes the strength color in the strength indicator based in the password strength */
export function StrengthIndicator(password: string) {
  const strength:string|undefined = checkPasswordStrength(password).at(0);
  const color =
  strength == "Very weak"
    ? "red"
    : strength == "weak"
    ? "#FF6F00"
    : strength == "Average"
    ? "#E18E4A"
    : strength == "Strong"
    ? "green"
    : strength == "Very strong"
    ? "blue"
    : "blue";

  return password.length > 0 ? (
    <Typography style={{ fontSize: "17px", fontWeight: "400", fontFamily: "Red Hat Display"}}>
      The password is <span style={{ color: color }}>{strength}</span>
    </Typography>
  ) : null;
}