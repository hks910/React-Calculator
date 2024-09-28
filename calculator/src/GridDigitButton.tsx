import { Button, Grid, styled } from "@mui/material";
import React from 'react';

interface StyledButtonProps {
  selected: boolean;
}

const StyledButton = styled(Button)<StyledButtonProps>(({ selected }) => ({
    backgroundColor: "rgb(128, 128, 128)",
    color: "#fff", // White font color
    borderRadius: "50%",
    borderColor : "rgb(128, 128, 128)",
  width: "4em",
  height: "4em",
  padding: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "auto",
  "&:hover": {
    background: selected ? "rgba(254, 241, 73, .2)" : "rgba(0, 0, 0, 0.7)", // Darker grey on hover for unselected
  },
}));

interface GridDigitButtonProps {
  digit: string;
  enterDigit: (digit: string) => void;
  xs?: number;
}

export const GridDigitButton: React.FC<GridDigitButtonProps> = ({
  digit,
  enterDigit,
  xs = 3
}) => {
  return (
    <Grid item xs={xs}>
      <StyledButton
        fullWidth
        variant="outlined"
        selected={false} // Replace this with the actual selected value
        onClick={() => enterDigit(digit)}
      >
        {digit}
      </StyledButton>
    </Grid>
  );
};
