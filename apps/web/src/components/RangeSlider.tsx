import { styled, Slider } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";

const StyledSlider = styled(Slider)({
  width: "90%",
  alignSelf: "center",
  color: "#a1a1a1",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    color: "#9baec8",
    backgroundColor: "#d9e1e8",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&::before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#ff5722",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&::before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

type SliderProps = {
  setValue: Dispatch<SetStateAction<number>>
};

const RangeSlider = ({setValue} : SliderProps) => {
  const [actualValue, setActualValue] = useState(8);
  const handleChange = (_event: Event | React.SyntheticEvent, newValue: number | number[]) => {
   setActualValue(newValue as number);
  };
  const handleChangeCommitted = (_event: Event | React.SyntheticEvent, newValue: number | number[]) => {
    setValue(newValue as number);
   };
  return (
    <StyledSlider
      valueLabelDisplay="auto"
      defaultValue={8}
      min={4}
      max={140}
      value={actualValue}
      onChange={handleChange}
      onChangeCommitted={handleChangeCommitted}
    />
  );
};

export default RangeSlider;