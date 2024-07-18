import React, { useState } from 'react';
import {Alert, SafeAreaView, StyleSheet, View} from 'react-native';
import {params} from './src/params';
import {MineField} from './src/components/MineField';
import {
  Board,
  createMinedBoard,
  cloneBoard,
  openField,
  hadExplosion,
  wonGame,
  showMines,
  invertFlag,
  flagsUsed,
} from './src/logic-helpers';
import {Header} from './src/components/Header';
import { LevelSelection } from './src/screens/LevelSelection';

function minesAmount() {
  const rows = params.getRowsAmount();
  const cols = params.getColumnsAmount();
  return Math.ceil(rows * cols * params.dificcultLevel);
}

function createBoard() {
  const rows = params.getRowsAmount();
  const cols = params.getColumnsAmount();
  return createMinedBoard(rows, cols, minesAmount());
}

function App(): React.JSX.Element {
  const [board, setBoard] = useState<Board>(createBoard());
  const [win, setWin] = useState(false);
  const [loss, setLoss] = useState(false);
  const [showLevelSelection, setShowLevelSelection] = useState(false);

  const handleOnOpenField = (row: number, column: number) => {
    const clonedBoard = cloneBoard(board!);
    openField(clonedBoard, row, column);
    const lost = hadExplosion(clonedBoard);
    const won = wonGame(clonedBoard);

    if (lost) {
      showMines(clonedBoard);
      Alert.alert('Perdeu Perdeu', 'Perdeu Perdeu Perdeu Perdeu');
    }

    if (won) {
      Alert.alert('Parabéns', 'Você Venceu!');
    }

    setBoard(clonedBoard);
    setWin(won);
    setLoss(lost);
  };

  const handleOnSelectField = (row: number, column: number) => {
    const clonedBoard = cloneBoard(board!);
    invertFlag(clonedBoard, row, column);
    const won = wonGame(clonedBoard);

    if (won) {
      Alert.alert('Parabéns', 'Você Venceu!');
    }

    setBoard(clonedBoard);
    setWin(won);
  };
  
  const handleNewGame = () => {
    setBoard(createBoard());
    setWin(false);
    setLoss(false);
    setShowLevelSelection(false);
  }
  
  const handleLevelSelected = (level: number) => {
    params.dificcultLevel = level;
    handleNewGame();
  }

  return (
    <SafeAreaView style={styles.container}>
      <LevelSelection isVisible={showLevelSelection} onLevelSelect={handleLevelSelected} onCancel={() => setShowLevelSelection(false)} />
      <Header flagsLeft={minesAmount() - flagsUsed(board)} onFlagPress={() => setShowLevelSelection(true)} onNewGame={handleNewGame} />
      <View style={styles.board}>
        <MineField
          board={board}
          onOpenField={handleOnOpenField}
          onSelectField={handleOnSelectField}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#AAA',
  },
});

export default App;
