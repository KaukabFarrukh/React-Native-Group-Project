import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

import { TaskItem } from "@/models/TaskItem";

interface TaskItemComponentProps {
  item: TaskItem;
}

const TaskItemComponent = ({ item } : TaskItemComponentProps) => {
  return (
    <LinearGradient
      /* colors={['#FF7E5F', '#FD3A69']}  */
      colors={['rgba(219, 84, 0, 0.7)', 'rgba(219, 84, 0, 0.2)', 'rgba(13, 13, 13, 0.1)', '#0D0D0D']}
  start={{ x: 0, y: 0 }}  // Starts from the top-left corner
  end={{ x: 0.8, y: 1 }}   // Gradient end point
      style={styles.gradientBackground}
    >
      <Text style={styles.text}>{item.title}</Text>
      <Text style={styles.text}>{item.description}</Text>
      <Text style={styles.text}>Category: {item.category}</Text>
      <Text style={styles.text}>Date: {new Date(item.date).toLocaleDateString()}</Text>
      <Text style={styles.text}>End Time: {new Date(item.endTime).toLocaleTimeString()}</Text>
      <Text style={styles.text}>Status: {item.status}</Text>
      <Text style={styles.status}>{item.status ? ' ' : ' '}</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    marginVertical: 20,
    padding: 20,
    borderRadius: 10,
  },
  text: {
    fontWeight: "bold",
    color: "white",
    margin:5
  },
  status: {
    fontWeight: "bold",
    color: "white",
    margin:0
  },
});

export default TaskItemComponent;
