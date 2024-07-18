import {Button, FlatList, Text, TextInput} from 'react-native';
import Styled from '../estilo';
import React from 'react';
import { MegaNumber } from './MegaNumber';

export class Mega extends React.Component {
  state = {
    qtdNumbers: (this.props as any).qtdNumbers,
    numbers: [],
  };

  changeQtdNumbers = (qtd: number) => {
    this.setState({qtdNumbers: qtd});
  };

  generateNumbers = () => {
    const numbers = new Array(this.state.qtdNumbers)
      .fill(null)
      .reduce(numb => [...numb, this.generateNumberNotContain(numb)], [])
      .sort((a: number, b: number) => a - b);
    this.setState({numbers});
  };

  generateNumberNotContain = (numbers: number[]): number => {
    const newNumber = Math.floor(Math.random() * 60) + 1;
    return numbers.includes(newNumber)
      ? this.generateNumberNotContain(numbers)
      : newNumber;
  };

  render(): React.ReactNode {
    return (
      <>
        <Text style={Styled.txtG}>
          Gerador de Mega-Sena {this.state.qtdNumbers}
        </Text>
        <TextInput
          style={{borderBottomWidth: 1}}
          keyboardType="numeric"
          placeholder="Qtde de números"
          value={this.state.qtdNumbers}
          onChangeText={qtd => this.changeQtdNumbers(parseInt(qtd))}
        />
        <Button title="Gerar números" onPress={this.generateNumbers} />

        <FlatList numColumns={5} data={this.state.numbers} renderItem={({item}) => (
          <MegaNumber num={item} />
        )} />
      </>
    );
  }
}
