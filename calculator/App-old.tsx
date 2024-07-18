import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Button} from './src/components/Button';
import {Display} from './src/components/Display';

function App(): React.JSX.Element {
  const [firstValue, setFirstValue] = useState("0");
  const [secondValue, setSecondValue] = useState("0");
  const [displayIndex, setDisplayIndex] = useState(0);
  const [operation, setOperation] = useState<string | null>(null);

  const displayValue = displayIndex === 0 ? firstValue : secondValue;

  const changeDisplayValue = (value: any) => {
    if(displayIndex === 0) {
      setFirstValue(value);
    } else {
      setSecondValue(value);
    }
  }

  const addDigit = (digit: string) => {
    const newValue = displayValue+digit;
    changeDisplayValue(newValue);
  };

  const clearMemory = () => {
    setFirstValue("0");
    setSecondValue("0");
    setDisplayIndex(0);
    setOperation(null);
  };

  const changeOperation = (op: string) => {
    console.warn("firstValue ", firstValue);
    console.warn("secondValue ", secondValue);
    console.warn("displayIndex ", displayIndex);
    console.warn("displayValue ", displayValue);
    console.warn("operation ", operation);
    console.warn("op ", op);
    
    if (operation) {
      const result = calcOperation(operation);
      setFirstValue(`${result}`);
      setSecondValue("0")
      setDisplayIndex(0);
      setOperation(op === "=" ? null : op);
      return;
    }

    setOperation(op);
    setDisplayIndex(index => index === 0 ? 1 : 0);
  };

  const calcOperation = (op: string) => {
    const fValue = +firstValue || 0;
    const sValue = +secondValue || 0;

    switch (operation) {
      case '/':
        return fValue / sValue;
        break;
      case '*':
        return fValue * sValue;
        break;
      case '-':
        return fValue - sValue;
        break;
      case '+':
        return fValue + sValue;
        break;
    }
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
