import {styled, Button, ButtonProps} from "@mui/material"
import blue from "@mui/material/colors/blue";

/* Creation of the button with styles that checks for leaks */
export const CheckLeakButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: "#2b90d9",
    alignSelf: "center",
    "&:hover": {
      backgroudColor: "#3ca1ea",
    },
  }));