import AddCategory from "@/components/AddCategory";
import { CategoryItem } from "@/models/CategoryItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Button, FlatList, Text, View } from "react-native";

export default function StartScreen({ navigation } : any) {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  
  const isFocused = useIsFocused(); // Detect when screen is focused
   // Load categories when the screen is focused
   useEffect(() => {
    if (isFocused) {
      loadCategories();
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
        

        <Button
        title="Create Task"
        onPress={() => navigation.navigate('AddTaskScreen')}
      />
      </View>
    );
  }
  