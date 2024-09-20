import { TypeAnimation } from "react-type-animation";
import "./writer.css";

export function Writer(){
  return (
    <div className="writer-div">
      <TypeAnimation
        sequence={["The Passgerator"]}
        wrapper="h1"
        cursor={false}
        repeat={0}
        style={{ fontSize: 25, display: "inline-block", color: "#d9e1e8"}}
        speed={{ type: "keyStrokeDelayInMs", value: 70 }}
        className="writer"
      />
      <TypeAnimation
        sequence={["", 1900, "Please Generate Your Password Below", 2000, ""]}
        wrapper="p"
        cursor={false}
        repeat={0}
        style={{ display: "inline-block", color: "#d9e1e8"}}
        speed={{ type: "keyStrokeDelayInMs", value: 70}}
        className="writer"
        deletionSpeed={60}
      />
    </div>
  );
}
