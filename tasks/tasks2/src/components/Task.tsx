import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { commonStyles } from "../commonStyles";
// import FontAwesome from '@expo/vector-icons/FontAwesome';
import moment from "moment";
import { ITask } from "../screens/TaskList";

import { Swipeable, GestureHandlerRootView } from "react-native-gesture-handler";

type TaskProps = ITask & {
  toogleTask: (id: ITask["id"]) => void;
  onDelete: (id: ITask["id"]) => void;
};

export const Task = (props: TaskProps) => {
  const doneStyle = props.doneAt ? styles.isDone : {};

  const date = props.doneAt ? props.doneAt : props.estimateAt;
  const formatedDate = moment(date).locale("pt-br").format("ddd, D [de] MMMM");

  const getRightContent = () => {
    return (
      <TouchableOpacity style={styles.right} onPress={() => props.onDelete(props.id)}>
        <Ionicons name="trash" size={30} color="#FFF" />
      </TouchableOpacity>
    );
  }

  const getLeftContent = () => {
    return (
      <View style={styles.left}>
        <Ionicons name="trash" size={20} color="#FFF" style={styles.excludeIcon} />
        <Text style={styles.excludeText}>Excluir</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView>
      <Swipeable renderRightActions={getRightContent} renderLeftActions={getLeftContent} onSwipeableOpen={(direction) => {
        if(direction === "left") props.onDelete(props.id);
      }}>
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={() => props.toogleTask(props.id)}>
            <View style={styles.checkContainer}>{getCheckView(props.doneAt)}</View>
          </TouchableWithoutFeedback>
          <View>
            <Text style={[styles.desc, doneStyle]}>{props.desc}</Text>
            <Text style={styles.date}>{formatedDate}</Text>
          </View>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

function getCheckView(doneAt?: Date | null) {
  if (doneAt) {
    return (
      <View style={styles.done}>
        <Ionicons name="checkmark-sharp" size={20} color="#FFF" />
        {/* <FontAwesome name="check" size={20} color="#FFF" /> */}
      </View>
    );
  }

  return <View style={styles.pending}></View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderColor: "#AAA",
    borderBottomWidth: 1,
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#FFF",
  },
  checkContainer: {
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  pending: {
    height: 25,
    width: 25,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#555",
  },
  done: {
    height: 25,
    width: 25,
    borderRadius: 13,
    backgroundColor: "#4D7031",
    alignItems: "center",
    justifyContent: "center",
  },
  desc: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.mainText,
    fontSize: 15,
  },
  isDone: {
    textDecorationLine: "line-through",
  },
  date: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.subText,
    fontSize: 12,
  },
  right: {
    backgroundColor: "red",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
  },
  left: {
    flex: 1,
    backgroundColor: "red",
    flexDirection: "row",
    alignItems: "center",
  },
  excludeText: {
    fontFamily: commonStyles.fontFamily,
    color: "#FFF",
    fontSize: 20,
    margin: 10,
  },
  excludeIcon: {
    marginLeft: 10,
  }
});
