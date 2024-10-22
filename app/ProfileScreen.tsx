import AddCategory from "@/components/AddCategory";
import { CategoryItem } from "@/models/CategoryItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Button, FlatList, Text, View } from "react-native";

export default function ProfileScreen() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const isFocused = useIsFocused();
  // Load categories when the screen is focused
   useEffect(() => {
    if (isFocused) {
      loadCategories();
     
    }
  }, [isFocused]); // Trigger this effect when `isFocused` changes

  
 // Function to handle adding a new category
 const handleAddCategory = async (newCategory: CategoryItem) => {
  const updatedCategories = [...categories, newCategory];
  setCategories(updatedCategories);

  // Save updated categories to AsyncStorage
  await AsyncStorage.setItem('categorylist', JSON.stringify(updatedCategories));
};

// Load categories from AsyncStorage
const loadCategories = async () => {
  try {
    const storedCategories = await AsyncStorage.getItem('categorylist');
    if (storedCategories !== null) {
      setCategories(JSON.parse(storedCategories));
    }
  } catch (error) {
    console.error("Failed to load categories", error);
  }
};

async function deleteAllCategories(){
  await AsyncStorage.removeItem('categorylist');
  setCategories([]);
}

    return (
      <View>
        <Text>ProfileScreen</Text>
        <View>
          
          <AddCategory onAddCategory={handleAddCategory}></AddCategory>
           
           {/* Display the list of categories */}
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Text>{item.name}</Text>}
        />
          </View>

          <Button title="Delete All Categories" onPress={deleteAllCategories}></Button>
      </View>
    );
  }
  