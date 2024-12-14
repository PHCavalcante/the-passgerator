import { Divider } from "@mui/material";
import { FC } from "react";

type Props = {
    variant: "fullWidth" | "inset" | "middle"
};

const CustomDivider: FC<Props> = ({ variant }) => {
  return <Divider variant={variant} sx={ styles.dividerStyle } />;
};

const styles = {
  dividerStyle: {
    color: "#eee",
    border: "1px solid",
    marginTop: 1,
  },
};

export default CustomDivider;
