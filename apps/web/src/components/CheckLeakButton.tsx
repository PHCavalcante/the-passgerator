import {styled, Button, ButtonProps} from "@mui/material"

export const CheckLeakButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText("#ff9800"),
    fontFamily: "JetBrains Mono",
    backgroundColor: "#ff5722",
    alignSelf: "center",
    borderRadius: 8,
  }));