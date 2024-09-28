import React, { useState } from 'react';
import { Button, Container, Grid, Paper, styled } from "@mui/material";
import { GridDigitButton } from './GridDigitButton';
import { GridOperationButton } from './GridOperationButton';
import { GridOperationButtonII } from './GridOperationButtonII';


const OutputContainer = styled('div')(({ theme }) => ({
  width: "100%", // Updated width to 60%
  textAlign: "right",
  height: "4.5em",
  paddingRight: theme.spacing(7),
  paddingBottom: theme.spacing(2),
  fontSize: "3em",
  overflow: "hidden",
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "flex-end", // Align text to the right
  backgroundColor: "#30302f",
  overflowX: "auto", // Enable horizontal scrolling
  whiteSpace: "nowrap", // Prevent text from wrapping
}));

const HistoryContainer = styled('div')(({ theme }) => ({
  width: "125%",
  textAlign: "left",
  height: "216px", // Set a fixed height or adjust as needed
  overflowX: "auto", // Enable horizontal scrolling
  overflowY: "auto", // Enable vertical scrolling
  paddingLeft: theme.spacing(2),
  paddingTop: theme.spacing(2),
  fontSize: "1em",
  whiteSpace: "pre-line",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  backgroundColor: "#30302f",
}));

const CalculatorBase = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(5),
  borderRadius: 15,
  borderColor: "white"
}));

function App() {
  const [currentValue, setCurrentValue] = useState('');
  const [operation, setOperation] = useState('');
  const [prevValue, setPrevValue] = useState('');
  const [inputExpression, setInputExpression] = useState('0');
  const [history, setHistory] = useState<string[]>([]);
  const [overwrite, setOverwrite] = useState(true);
  const [resetInputExpression, setresetInputExpression] = useState(true);
  const [keepHistory, setKeepHistory] = useState(true);

  const clear = () => {
    setPrevValue('');
    setOperation('');
    setCurrentValue('0');
    setInputExpression('0');
    setOverwrite(true);
    setresetInputExpression(false);
  };

  const del = () => {
    if (currentValue.length === 1) {
      setCurrentValue('0');
      setInputExpression('0');
      setOverwrite(true);
    } else {
      setInputExpression(inputExpression.slice(0, -1));
    }
  };

  const calculate = () => {
    if (!prevValue || !operation) return currentValue;

    const curr = parseFloat(currentValue);
    const prev = parseFloat(prevValue);

    let result;
    switch (operation) {
      case '+ ':
        result = prev + curr;
        break;
      case '- ':
        result = prev - curr;
        break;
      case 'x ':
        result = prev * curr;
        break;
      case '/ ':
        result = prev / curr;
        break;
      default:
        break;
    }
    return result;
  };

  const equals = () => {
    if (!prevValue || !operation) return;
  
    const val = calculate();
  
    // Check for division by zero
    if (operation === '/ ' && parseFloat(currentValue) === 0) {
      setInputExpression('Err');
      setCurrentValue('Err');
      setPrevValue('');
      setOperation('');
      setresetInputExpression(false);
    } else {
      const resultExpression = `${val}`;
      setInputExpression(resultExpression);
      setCurrentValue(`${val}`);
      setPrevValue(`${val}`);
      setOperation('');
      setresetInputExpression(false);
  
      if (keepHistory && resultExpression !== 'Err') {
        const newHistory = [...history, resultExpression + "\n"];
        setHistory(newHistory);
      }
    }
  };
  
  

  const selectOperation = (selectedOperation: string) => {
    if (currentValue[0] === '' || inputExpression === '0') return;
    if (prevValue) {
      const val = calculate();
      const newHistory = [...history, `${currentValue} ${operation} ${prevValue}`, selectedOperation];

      // Update history to keep only the last three entries
      // setHistory((prevHistory) => [...prevHistory.slice(-2), selectedOperation]);

      setInputExpression((prevInputExpression) => `${selectedOperation}`);
      setCurrentValue(`${val}`);
      setPrevValue(`${val}`);
    } else {
      setInputExpression((prevInputExpression) => ` ${selectedOperation}`);
    }

    setPrevValue(currentValue);
    setOperation(selectedOperation);
    setOverwrite(true);
  };

  const setDigit = (digit: string) => {
    if (currentValue[0] === '0' && digit === '0') return;
  if(!resetInputExpression){
        setCurrentValue('')
        setInputExpression('');
        setresetInputExpression(true);
      }
    if (overwrite) {
      setInputExpression((prevInputExpression) => {
        if (prevInputExpression === '' || prevInputExpression === '0') {
          return digit;
        } else {
          return `${prevInputExpression} ${digit}`;
        }
      });
      setCurrentValue(digit);
      setOverwrite(false);
    } else {
      setCurrentValue((prevValue) => `${prevValue}${digit}`);
      setInputExpression((prevInputExpression) => `${prevInputExpression}${digit}`);
    }
  };
  
  
  
  return (
    <Container maxWidth="sm">
      <CalculatorBase elevation={0}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
          <Grid container spacing={2}>
          <Grid item xs={4}> {/* Updated grid item to take 30% of the width */}
          <HistoryContainer>
  {history.map((line, index) => (
    <div key={index}>{line}</div>
  ))}
</HistoryContainer>
          </Grid>
          <Grid item xs={8}> {/* Updated grid item to take 60% of the width */}
            <OutputContainer>
              {inputExpression}
            </OutputContainer>
          </Grid>
        </Grid>

          </Grid>
          
          <Grid item container columnSpacing={1}>
            <GridOperationButtonII
              operation={"C"}
              selectOperation={clear}
              selectedOperation={operation}
            />
            <GridOperationButtonII
              operation={"DEL"}
              selectOperation={del}
              selectedOperation={operation}
              />
              <GridOperationButton
                operation={"?"}
                selectOperation={selectOperation}
                selectedOperation={operation}
              />
              <GridOperationButton
                operation={"/ "}
                selectOperation={selectOperation}
                selectedOperation={operation}
              />
            </Grid>
            <Grid item container>
              <GridDigitButton digit={"1"} enterDigit={setDigit} />
              <GridDigitButton digit={"2"} enterDigit={setDigit} />
              <GridDigitButton digit={"3"} enterDigit={setDigit} />
              <GridOperationButton
                operation={"x "}
                selectOperation={selectOperation}
                selectedOperation={operation}
              />
            </Grid>
            <Grid item container>
              <GridDigitButton digit={"4"} enterDigit={setDigit} />
              <GridDigitButton digit={"5"} enterDigit={setDigit} />
              <GridDigitButton digit={"6"} enterDigit={setDigit} />
              <GridOperationButton
                operation={"- "}
                selectOperation={selectOperation}
                selectedOperation={operation}
              />
            </Grid>
            <Grid item container>
              <GridDigitButton digit={"7"} enterDigit={setDigit} />
              <GridDigitButton digit={"8"} enterDigit={setDigit} />
              <GridDigitButton digit={"9"} enterDigit={setDigit} />
              <GridOperationButton
                operation={"+ "}
                selectOperation={selectOperation}
                selectedOperation={operation}
              />
            </Grid>
            <Grid item container>
              <GridDigitButton digit={"0"} enterDigit={setDigit} />
              <Grid item xs={8}>
                <Button fullWidth variant="contained" onClick={equals}>=</Button>
              </Grid>
            </Grid>
          </Grid>
        </CalculatorBase>
      </Container>
    );
  }
  
  export default App;
  
