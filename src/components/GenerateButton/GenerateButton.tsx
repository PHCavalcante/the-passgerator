import {styled, Button, ButtonProps} from "@mui/material";

/* Creation of the button with styles that generates the password */
export const GenerateButton = styled(Button)<ButtonProps>(() => ({
    backgroundColor: "#2b90d9",
    alignSelf: "center",
    "&:hover": {
      backgroudColor: "#3ca1ea",
    },
  }));