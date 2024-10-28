import AddCategory from "@/components/AddCategory";
import DeleteAllTasks from "@/components/deleteAllTasks";
import TaskItemComponent from "@/components/TaskItemComponent";
import { CategoryItem } from "@/models/CategoryItem";
import { TaskItem } from "@/models/TaskItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Button, FlatList, Text, StyleSheet, TouchableOpacity, View, Modal, Pressable } from "react-native";

export default function StartScreen({ navigation }: any) {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [allTaskData, setAllTaskData] = useState<TaskItem[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<TaskItem[]>([]);
  const [listType, setListType] = useState("To Do");
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    const loadData = async () => {
      if (isFocused) {
        await loadCategories();
        await loadTasks();
       
      }
    };
  
    loadData();
  }, [isFocused, listType, selectedCategory]);
  // Trigger showList when allTaskData changes
useEffect(() => {
  if (allTaskData.length > 0) {
    showList(); // Call showList only when there is data to filter
  }
}, [allTaskData]);


  const loadCategories = async () => {
    try {
      const storedCategories = await AsyncStorage.getItem("categorylist");
      setCategories(storedCategories ? JSON.parse(storedCategories) : []);
    } catch (error) {
      console.error("Failed to load categories", error);
    }
  };

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem("tasklist");
      const taskData = storedTasks ? JSON.parse(storedTasks) : [];
  
    
  
      // Set the tasks
      setTasks(taskData);
      setAllTaskData(taskData); 
    } catch (error) {
      console.error("Failed to load tasks", error);
    }
  };
  
  
  

  const deleteAll = async () => {
    await AsyncStorage.removeItem("tasklist");
    setTasks([]);
    setAllTaskData([]);
    setFilteredTasks([]);
  };

  // Filter tasks based on selected status and category
  const showList = () => {
    
  
    if (allTaskData.length === 0) {
      console.log("No tasks to filter.");
      return; // Do not proceed if there are no tasks
    }
    
    const filtered = allTaskData.filter((task) => {
      const matchesStatus = task.status === listType;
      const matchesCategory = selectedCategory === "All Categories" || task.category === selectedCategory;
      return matchesStatus && matchesCategory;
    });
    console.log("Filtered Tasks:", filtered);
    setFilteredTasks(filtered);
  };

  const switchStatus = async (taskId: string, newStatus: TaskItem["status"]) => {
    const updatedTasks = allTaskData.map((task) => {
      if (task.id === taskId) task.status = newStatus;
      return task;
    });
    setAllTaskData(updatedTasks);
    setTasks(updatedTasks);
    await AsyncStorage.setItem("tasklist", JSON.stringify(updatedTasks));
    showList();
    closeModal();
  };

  const openModal = (task: TaskItem) => {
    setSelectedTask(task);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setModalVisible(false);
  };

  return (
    <View>
      <Text>StartScreen</Text>
      
      {/* Categories List with "All Categories" */}
      <FlatList
        data={[{ id: "all", name: "All Categories" }, ...categories]}
        keyExtractor={(item) => item.id}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedCategory(item.name === "All Categories" ? "All Categories" : item.name)}>
            <Text style={[styles.categoryItem, selectedCategory === item.name && styles.selectedCategory]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Status Filters */}
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={listType === "To Do" ? styles.shopFilterTabActive : styles.taskFilterTab}
          onPress={() => setListType("To Do")}
        >
          <Text>To Do</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={listType === "In Progress" ? styles.shopFilterTabActive : styles.taskFilterTab}
          onPress={() => setListType("In Progress")}
        >
          <Text>In Progress</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={listType === "Done" ? styles.shopFilterTabActive : styles.taskFilterTab}
          onPress={() => setListType("Done")}
        >
          <Text>Done</Text>
        </TouchableOpacity>
      </View>

      {/* Filtered Tasks List */}
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable onPress={() => openModal(item)}>
            <TaskItemComponent item={item} />
          </Pressable>
        )}
      />
      
      <Button title="Create Task" onPress={() => navigation.navigate("AddTaskScreen")} />
      <Button title="Delete all" onPress={() => setShowDelete(true)} />

      {showDelete && (
        <DeleteAllTasks
          message="Are you sure you want to delete all?"
          button1Click={() => setShowDelete(false)}
          button1Text="Cancel"
          button2Click={deleteAll}
          button2text="Confirm"
        />
      )}

      {/* Modal for updating task status */}
      {selectedTask && (
        <Modal visible={isModalVisible} animationType="slide" >
          <View style={styles.modalContainer}>
            <Text>Change Status for {selectedTask.title}</Text>
            
            
            <Picker
              selectedValue={selectedTask.status}
              onValueChange={(newStatus) => switchStatus(selectedTask.id, newStatus)}
              style={{ height: 50, width: '100%', marginBottom: 10 }}
            >
              <Picker.Item label="To Do" value="To Do" />
              <Picker.Item label="In Progress" value="In Progress" />
              <Picker.Item label="Done" value="Done" />
            </Picker>

            
           <View>
           <Button title="Close" onPress={closeModal} />

           </View>
          </View>
          
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  taskFilterTab: {
    backgroundColor: "red",
    height: 50,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  shopFilterTabActive: {
    backgroundColor: "green",
    height: 50,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
  },
  categoryItem: {
    padding: 8,
    margin: 4,
    backgroundColor: "#ddd",
    borderRadius: 8,
  },
  selectedCategory: {
    backgroundColor: "#ffa",
  },
});
