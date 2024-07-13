import { Typography } from "@mui/material";
import { checkPasswordStrength } from "../../utils/strenghtCheck";

/* The function that changes the strenght color in the strenght indicator based in the password strenght */
export function StrenghtIndicator(password: string) {
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