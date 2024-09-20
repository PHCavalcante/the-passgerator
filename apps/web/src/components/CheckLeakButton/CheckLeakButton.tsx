import {styled, Button, ButtonProps} from "@mui/material"
import { orange } from "@mui/material/colors";

/* Creation of the button with styles that checks for leaks */
export const CheckLeakButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(orange[500]),
    fontFamily: "JetBrains Mono",
    backgroundColor: "#ff5722",
    alignSelf: "center",
    borderRadius: 8,
  }));