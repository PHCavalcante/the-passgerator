import { Typography } from "@mui/material";
import { checkPasswordStrength } from "../utils/strengthCheck";

type StrengthIndicatorType = {
  password: string
};

export default function StrengthIndicator({password}: StrengthIndicatorType) {
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

  return password && (
    <Typography style={{ fontSize: "17px", fontWeight: "400", fontFamily: "Red Hat Display"}}>
      The password is <span style={{ color: color }}>{strength}</span>
    </Typography>
  );
}