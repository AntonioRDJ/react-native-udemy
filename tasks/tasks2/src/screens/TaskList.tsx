import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";

import todayImage from "assets/imgs/today.jpg";
import tomorrowImage from "assets/imgs/tomorrow.jpg";
import weekImage from "assets/imgs/week.jpg";
import monthImage from "assets/imgs/month.jpg";

import moment from "moment";
import { commonStyles } from "../commonStyles";
import { Task } from "../components/Task";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { AddTask } from "./AddTask";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { server, showError } from "../common";

export type ITask = {
  id: number;
  desc: string;
  estimateAt: Date;
  doneAt?: Date | null;
};

const initialState = {
  showAddTask: false,
  showDoneTasks: true,
  tasks: [],
  visibleTasks: [],
};

type TaskListProps = {
  title: string;
  daysAhead: number;
  navigation: any;
};

export const TaskList = (props: TaskListProps) => {
  const today = moment().locale("pt-br").format("ddd, D [de] MMMM");
  const [showAddTask, setShowAddTask] = useState(false);
  const [showDoneTasks, setShowDoneTasks] = useState(true);
  const [visibleTasks, setVisibleTasks] = useState<ITask[]>([]);
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    async function getTasks() {
      const stateString = (await AsyncStorage.getItem(
        "taskListState"
      )) as string;
      const state = JSON.parse(stateString) || initialState;
      setShowDoneTasks(state.showDoneTasks);
    }
    getTasks();
    loadTasks();
  }, []);

  useEffect(() => {
    filterTasks();
  }, [showDoneTasks, tasks]);

  const loadTasks = async () => {
    try {
      const maxDate = moment()
        .add(props.daysAhead, "days")
        .endOf("date")
        .toDate();
      const res = await axios.get(`${server}/tasks`, {
        params: {
          date: maxDate,
        },
      });
      setTasks(res.data);
    } catch (error) {
      showError(error);
    }
  };

  const filterTasks = () => {
    let newVisibleTasks: ITask[] = [];
    if (showDoneTasks) {
      newVisibleTasks = [...tasks];
    } else {
      const pending = (task: ITask) => !task.doneAt;
      newVisibleTasks = tasks.filter(pending);
    }
    setVisibleTasks(newVisibleTasks);
    AsyncStorage.setItem("taskListState", JSON.stringify({ showDoneTasks }));
  };

  const toogleFilter = () => {
    setShowDoneTasks((s) => !s);
  };

  const toogleTask = async (id: ITask["id"]) => {
    try {
      await axios.put(`${server}/tasks/${id}/toggle`);
      loadTasks();
    } catch (error) {
      showError(error);
    }
  };

  const addTask = async (newTask: { desc: string; date: Date }) => {
    if (!newTask.desc || !newTask.desc.trim()) {
      Alert.alert("Dados Inválidos", "Descrição não informada!");
      return;
    }

    try {
      await axios.post(`${server}/tasks`, {
        desc: newTask.desc,
        estimateAt: newTask.date,
      });

      setShowAddTask(false);
      loadTasks();
    } catch (error) {
      showError(error);
    }
  };

  const deleteTask = async (id: ITask["id"]) => {
    try {
      await axios.delete(`${server}/tasks/${id}`);
      loadTasks();
    } catch (error) {
      showError(error);
    }
  };

  const getImage = () => {
    switch (props.daysAhead) {
      case 0:
        return todayImage;
      case 1:
        return tomorrowImage;
      case 7:
        return weekImage;
      default:
        return monthImage;
    }
  };

  const getColor = () => {
    switch (props.daysAhead) {
      case 0:
        return commonStyles.colors.today;
      case 1:
        return commonStyles.colors.tomorrow;
      case 7:
        return commonStyles.colors.week;
      default:
        return commonStyles.colors.month;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <AddTask
        visible={showAddTask}
        onCancel={() => setShowAddTask(false)}
        onSave={addTask}
      />
      <ImageBackground source={getImage()} style={styles.background}>
        <View style={styles.iconBar}>
          <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
            <Ionicons
              name="menu"
              size={20}
              color={commonStyles.colors.secondary}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={toogleFilter}>
            <Ionicons
              name={showDoneTasks ? "eye" : "eye-off"}
              size={20}
              color={commonStyles.colors.secondary}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.titleBar}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.subtitle}>{today}</Text>
        </View>
      </ImageBackground>
      <View style={styles.taskList}>
        <FlatList
          data={visibleTasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Task {...item} toogleTask={toogleTask} onDelete={deleteTask} />
          )}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.addButton, { backgroundColor: getColor() }]}
        onPress={() => setShowAddTask(true)}
      >
        <Ionicons
          name="add-sharp"
          size={30}
          color={commonStyles.colors.secondary}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 3,
  },
  taskList: {
    flex: 7,
  },
  titleBar: {
    flex: 1,
    justifyContent: "flex-end",
  },
  title: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 50,
    marginLeft: 20,
    marginBottom: 20,
  },
  subtitle: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 30,
  },
  iconBar: {
    flexDirection: "row",
    marginHorizontal: 20,
    justifyContent: "space-between",
    marginTop: Platform.OS === "ios" ? 30 : 10,
  },
  addButton: {
    position: "absolute",
    right: 30,
    bottom: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});
