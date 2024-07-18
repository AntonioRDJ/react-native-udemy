import {View, StyleSheet, Text, TouchableWithoutFeedback} from 'react-native';
import {params} from '../params';
import {Mines} from './Mines';
import {Flag} from './Flag';

type FieldProps = {
  mined?: boolean;
  opened?: boolean;
  nearMines?: number;
  exploded?: boolean;
  flagged?: boolean;
  onOpen: () => void;
  onSelect: () => void;
};

export const Field = (props: FieldProps) => {
  const {mined, opened, nearMines = 0, exploded, flagged, onOpen, onSelect} = props;

  const styleField: any[] = [styles.field];
  if (opened) styleField.push(styles.opened);
  if (exploded) styleField.push(styles.exploded);
  if (flagged) styleField.push(styles.flagged);
  if (!opened && !exploded) styleField.push(styles.regular);

  let color = null;
  if (nearMines > 0) {
    if (nearMines === 1) color = '#2A28D7';
    if (nearMines === 2) color = '#2B520F';
    if (nearMines > 2 && nearMines < 6) color = '#F9060A';
    if (nearMines >= 6) color = '#F221A9';
  }

  return (
    <TouchableWithoutFeedback onPress={onOpen} onLongPress={onSelect}>
      <View style={styleField}>
        {!mined && opened && nearMines > 0 ? (
          <Text style={[styles.label, {color: color!}]}>{nearMines}</Text>
        ) : (
          false
        )}
        {mined && opened ? <Mines /> : false}
        {flagged && !opened && <Flag />}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  field: {
    height: params.blockSize,
    width: params.blockSize,
    borderWidth: params.borderSize,
  },
  regular: {
    backgroundColor: '#999',
    borderLeftColor: '#CCC',
    borderTopColor: '#CCC',
    borderRightColor: '#333',
    borderBottomColor: '#333',
  },
  opened: {
    backgroundColor: '#999',
    borderColor: '#777',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontWeight: 'bold',
    fontSize: params.fontSize,
  },
  exploded: {
    backgroundColor: 'red',
    borderColor: 'red',
  },
  flagged: {},
});
