import React, { useState } from "react";
import { View, Text } from "react-native";

import { TaskItem } from "@/models/TaskItem";

interface TaskItemComponentProps {
  item: TaskItem;
  
}

const TaskItemComponent = ({ item } : TaskItemComponentProps) => {
  
  
  return (
    <View style={{ marginVertical: 50,  }}>
      <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
      <Text>{item.description}</Text>
      <Text>Category: {item.category}</Text>
      <Text>Date: {new Date(item.date).toLocaleDateString()}</Text>
      <Text>End Time: {new Date(item.endTime).toLocaleTimeString()}</Text>


      <Text>Status: {item.status}</Text>
      
      <Text style={{backgroundColor:'pink', marginLeft:20, marginRight:20, fontSize:30, width:50}}>{item.status ? 'X' : ' '}</Text>
     
    </View>
  );
};

export default TaskItemComponent;
