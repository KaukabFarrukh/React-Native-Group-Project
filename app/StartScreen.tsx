import AddCategory from "@/components/AddCategory";
import { CategoryItem } from "@/models/CategoryItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Button, FlatList, Text, View } from "react-native";
type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
  category: string;
  date: Date;
  endTime: Date;
};
export default function StartScreen({ navigation } : any) {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]); 
  const isFocused = useIsFocused(); // Detect when screen is focused
   // Load categories when the screen is focused
   useEffect(() => {
    if (isFocused) {
      loadCategories();
      loadTasks(); 
    }
  }, [isFocused]); // Trigger this effect when `isFocused` changes


// Load categories from AsyncStorage
const loadCategories = async () => {
  try {
    const storedCategories = await AsyncStorage.getItem('categorylist');
    if (storedCategories !== null) {
      setCategories(JSON.parse(storedCategories));
    }else {
      setCategories([]); // If there's nothing in AsyncStorage, reset the list
    }
  } catch (error) {
    console.error("Failed to load categories", error);
  }
};
// Load tasks from AsyncStorage
const loadTasks = async () => {
  try {
    const storedTasks = await AsyncStorage.getItem('tasklist');
    if (storedTasks !== null) {
      setTasks(JSON.parse(storedTasks));
    } else {
      setTasks([]); // Reset if no tasks are found
    }
  } catch (error) {
    console.error("Failed to load tasks", error);
  }
};

  
  return (
      <View>
        <Text>StartScreen</Text>
        <View>
          
      
         
         {/* Display the list of categories */}
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
        </View>


        {/* Display the list of tasks */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text>Status: {item.status}</Text>
            <Text>Category: {item.category}</Text>
            <Text>Date: {new Date(item.date).toLocaleDateString()}</Text>
            <Text>End Time: {new Date(item.endTime).toLocaleTimeString()}</Text>
          </View>
        )}
      />


        <Button
        title="Create Task"
        onPress={() => navigation.navigate('AddTaskScreen')}
      />
      </View>
    );
  }
  