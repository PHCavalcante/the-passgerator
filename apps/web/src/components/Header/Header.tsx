import { AppBar, Button } from "@mui/material";
import githubLogo from "../../assets/githubLogo.svg";

export default function Header() {
  return (
    <AppBar
      sx={{
        backgroundColor: "transparent",
        display: "flex",
        alignItems: "end",
        padding: "10px 10px",
      }}
    >
      <a href="https://github.com/PHCavalcante/the-passgerator" >
        <Button>
          {" "}
          <img src={githubLogo} alt="github logo" style={{ width: "25px" }} />
        </Button>
      </a>
    </AppBar>
  );
}
