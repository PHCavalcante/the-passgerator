import { TypeAnimation } from "react-type-animation";
import { Box } from "@mui/material";

function Writer(){
  return (
    <Box sx={ container }>
      <TypeAnimation
        sequence={["The Passgerator"]}
        wrapper="h1"
        cursor={false}
        repeat={0}
        style={{...typeAnimationStyled, fontSize: 25}} // adicionar fontSize: 25
        speed={{ type: "keyStrokeDelayInMs", value: 70 }}
        className="writer"
      />
      <TypeAnimation
        sequence={["", 1900, "Please Generate Your Password Below", 2000, ""]}
        wrapper="p"
        cursor={false}
        repeat={0}
        style={ typeAnimationStyled }
        speed={{ type: "keyStrokeDelayInMs", value: 70}}
        className="writer"
        deletionSpeed={60}
      />
    </Box>
  );
}
const container = {
  width: "90%",
  position: "relative",
  display: "flex",
  alignSelf: "center",
  margin: "0 auto",
  flexDirection: "column",
};
const typeAnimationStyled = {
  display: "inline-block", 
  color: "#d9e1e8",
  alignSelf: "center",
  fontSize: "20px",
  fontFamily: "JetBrains Mono, sans-serif",
  fontWeight: "200",
  whiteSpace: "pre-line",
  padding: "8px 0px"
};

export default Writer;