import {styled, Button, ButtonProps} from "@mui/material";

/* Creation of the button with styles that generates the password */
export const GenerateButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText("#ff9800"), 
    fontFamily: "JetBrains Mono",
    backgroundColor: "#ff5722",
    alignSelf: "center",
    borderRadius: 8,
  }));