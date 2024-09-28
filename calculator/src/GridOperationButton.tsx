import { Button, Grid, styled } from "@mui/material";
import React from 'react';

interface GridOperationButtonProps {
  operation: string;
  selectOperation: (operation: string) => void;
  selectedOperation: string;
}

// Define the 'selected' prop in the StyledButton component
const StyledButton = styled(Button)<{ selected: boolean }>((props) => ({
    backgroundColor: "rgb(255, 140, 0)",
    color: "#fff", // White font color
    borderColor: props.selected ? "#ffff" : "rgb(204, 85, 0)",
    borderRadius: "50%",
    width: "4em",
    height: "4em",
    padding: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
    "&:hover": {
      backgroundColor: "rgba(254, 241, 73, .2)",
    },
  }));
  

export const GridOperationButton: React.FC<GridOperationButtonProps> = ({
  operation,
  selectedOperation,
  selectOperation,
}) => {
  return (
    <Grid item xs={3}>
      <StyledButton
        fullWidth
        variant="outlined"
        onClick={() => selectOperation(operation)}
        selected={selectedOperation === operation}
      >
        {operation}
      </StyledButton>
    </Grid>
  );
};