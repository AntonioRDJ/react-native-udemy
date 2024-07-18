import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { commonStyles } from "../commonStyles";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

type AddTaskProps = {
  visible: boolean;
  onCancel: () => void;
  onSave: (task: any) => void;
};

const initialState = {
  desc: "",
  date: new Date(),
  showDatePicker: false,
}

export const AddTask = (props: AddTaskProps) => {
  const [desc, setDesc] = useState(initialState.desc);
  const [date, setDate] = useState<Date>(initialState.date);
  const [showDatePicker, setShowDatePicker] = useState(initialState.showDatePicker);

  const save = () => {
    const newTask = {
      desc: desc,
      date: date
    };

    props.onSave(newTask);
    
    setDesc(initialState.desc);
    setDate(initialState.date);
    setShowDatePicker(initialState.showDatePicker);
  }

  const getDatePicker = () => {
    let datePicker = <DateTimePicker value={date} onChange={(_, date) => { setDate(date!); setShowDatePicker(false)}} mode="date" />;
    const dateString = moment(date).format("ddd, D [de] MMMM [de] YYYY");

    if(Platform.OS === "android") {
      datePicker = (
        <View>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text style={styles.date}>
              {dateString}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            datePicker
          )}
        </View>
      );
    }
    return (
      datePicker
    );
  }

  return (
    <Modal
      transparent={true}
      visible={props.visible}
      onRequestClose={props.onCancel}
      animationType="slide"
    >
      <TouchableWithoutFeedback onPress={props.onCancel}>
        <View style={styles.background}></View>
      </TouchableWithoutFeedback>

      <View style={styles.container}>
        <Text style={styles.header}>Nova Tarefa</Text>

        <TextInput style={styles.input} placeholder="Informe a Descrição..." value={desc} onChangeText={(text) => setDesc(text)}></TextInput>
        {getDatePicker()}

        <View style={styles.buttons}>
          <TouchableOpacity onPress={props.onCancel}>
            <Text style={styles.button}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={save}>
            <Text style={styles.button}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableWithoutFeedback onPress={props.onCancel}>
        <View style={styles.background}></View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  container: {
    backgroundColor: "#FFF",
  },
  header: {
    fontFamily: commonStyles.fontFamily,
    backgroundColor: commonStyles.colors.today,
    color: commonStyles.colors.secondary,
    textAlign: "center",
    padding: 15,
    fontSize: 18,
  },
  input: {
    fontFamily: commonStyles.fontFamily,
    width: "90%",
    height: 40,
    margin: 15,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#E3E3E3",
    borderRadius: 6,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    margin: 20,
    marginRight: 30,
    color: commonStyles.colors.today,
  },
  date: {
    fontFamily: commonStyles.fontFamily,
    fontSize: 20,
    marginLeft: 15,
  }
});
