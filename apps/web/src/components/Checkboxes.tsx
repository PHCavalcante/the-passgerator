import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import checkboxTypes from "../types/checkboxTypes";
import { Dispatch } from "react";
import CustomDivider from "./CustomDivider";

type setCheckboxStatesProps = {
    checkboxStates: checkboxTypes;
    setCheckboxStates : Dispatch<React.SetStateAction<checkboxTypes>>
};

const Checkboxes: React.FC<setCheckboxStatesProps> = ({ checkboxStates, setCheckboxStates }) => {
    return (
        <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="lowerCase"
                      checked={checkboxStates.lower}
                      onChange={() =>
                        setCheckboxStates({
                          ...checkboxStates,
                          lower: !checkboxStates.lower,
                        })
                      }
                      sx={ styles.checkboxStyled }
                    />
                  }
                  label="Include Lowercases"
                  sx={ styles.formControlLabelStyled }
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="upperCase"
                      checked={checkboxStates.upper}
                      onChange={() =>
                        setCheckboxStates({
                          ...checkboxStates,
                          upper: !checkboxStates.upper,
                        })
                      }
                      sx={ styles.checkboxStyled }
                    />
                  }
                  label="Include Uppercase"
                  sx={ styles.formControlLabelStyled }
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="numbers"
                      checked={checkboxStates.numbers}
                      onChange={() =>
                        setCheckboxStates({
                          ...checkboxStates,
                          numbers: !checkboxStates.numbers,
                        })
                      }
                      sx={ styles.checkboxStyled }
                    />
                  }
                  label="Include Numbers"
                  sx={ styles.formControlLabelStyled }
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="symbols"
                      checked={checkboxStates.symbols}
                      onChange={() =>
                        setCheckboxStates({
                          ...checkboxStates,
                          symbols: !checkboxStates.symbols,
                        })
                      }
                      sx={ styles.checkboxStyled }
                    />
                  }
                  label="Include Symbols"
                  sx={ styles.formControlLabelStyled }
                />
                <CustomDivider variant="middle" />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="avoidAmbiguous"
                      checked={checkboxStates.ambiguous}
                      onChange={() =>
                        setCheckboxStates({
                          ...checkboxStates,
                          ambiguous: !checkboxStates.ambiguous,
                        })
                      }
                      sx={ styles.checkboxStyled }
                    />
                  }
                  label="Avoid Ambiguous Characters"
                  sx={ styles.formControlLabelStyled }
                />
              </FormGroup>
    );
}

const styles = {
    checkboxStyled : {
        "&.Mui-checked": {
          color: "#e65100",
        },
      },
      formControlLabelStyled : {
        "& .MuiTypography-root": {
          fontFamily: "Poppins",
          fontWeight: "300",
        },
      },
}

export default Checkboxes;