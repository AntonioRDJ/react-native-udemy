import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Button} from './src/components/Button';
import {Display} from './src/components/Display';

function App(): React.JSX.Element {
  const [displayValue, setDisplayValue] = useState("0");
  const [clearDisplay, setClearDisplay] = useState(false);
  const [operation, setOperation] = useState<string | null>(null);
  const [values, setValues] = useState([0,0]);
  const [current, setCurrent] = useState(0);

  const addDigit = (n: string) => {
    if(n === "." && displayValue.includes(".")) {
      return 
    }

    const clearD = displayValue === "0" || clearDisplay;
    const currentValue = clearD ? "" : displayValue;
    const dValue = currentValue + n;
    setDisplayValue(dValue);
    setClearDisplay(false);

    if(n !== ".") {
      const newValue = parseFloat(dValue);
      const newValues = [...values];
      newValues[current] = newValue;
      setValues(newValues);
    }
  };

  const clearMemory = () => {
    setDisplayValue("0");
    setClearDisplay(false);
    setOperation(null);
    setValues([0,0]);
    setCurrent(0);
  };

  const changeOperation = (op: string) => {

    if(current === 0) {
      setOperation(op);
      setCurrent(1);
      setClearDisplay(true);
      return;
    }

    const equals = op === "=";
    const newValues = [...values];

    try {
      newValues[0] = eval(`${newValues[0]} ${operation} ${newValues[1]}`);
    } catch (error) {
      newValues[0] = values[0];
    }

    newValues[1] = 0;

    setDisplayValue(`${newValues[0]}`);
    setOperation(equals ? null : op);
    setCurrent(equals ? 0 : 1);
    setClearDisplay(!equals);
    setValues(newValues);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Display value={displayValue} />
      <View style={styles.buttons}>
        <Button label="AC" onClick={clearMemory} grow={3} />
        <Button label="/" onClick={() => changeOperation('/')} operation />
        <Button label="7" onClick={() => addDigit('7')} />
        <Button label="8" onClick={() => addDigit('8')} />
        <Button label="9" onClick={() => addDigit('9')} />
        <Button label="*" onClick={() => changeOperation('*')} operation />
        <Button label="4" onClick={() => addDigit('4')} />
        <Button label="5" onClick={() => addDigit('5')} />
        <Button label="6" onClick={() => addDigit('6')} />
        <Button label="-" onClick={() => changeOperation('-')} operation />
        <Button label="1" onClick={() => addDigit('1')} />
        <Button label="2" onClick={() => addDigit('2')} />
        <Button label="3" onClick={() => addDigit('3')} />
        <Button label="+" onClick={() => changeOperation('+')} operation />
        <Button label="0" onClick={() => addDigit('0')} grow={2} />
        <Button label="." onClick={() => addDigit('.')} />
        <Button label="=" onClick={() => changeOperation('=')} operation />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default App;
