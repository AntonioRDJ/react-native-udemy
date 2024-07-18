import {View, StyleSheet} from 'react-native';
import {Board} from '../logic-helpers';
import {Field} from './Field';

type MineFieldProps = {
  board: Board;
  onOpenField: (r: number, c: number) => void;
  onSelectField: (r: number, c: number) => void;
};

export const MineField = (props: MineFieldProps) => {
  const {board, onOpenField, onSelectField} = props;

  const rows = board.map((row, r) => {
    const columns = row.map((field, c) => {
      return <Field {...field} key={c} onOpen={() => onOpenField(r, c)} onSelect={() => onSelectField(r, c)} />;
    });

    return (
      <View key={r} style={{flexDirection: 'row'}}>
        {columns}
      </View>
    );
  });

  return <View style={styles.container}>{rows}</View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EEE',
  },
});
