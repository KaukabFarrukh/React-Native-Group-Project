import AddCategory from "@/components/AddCategory";
import DeleteAllTasks from "@/components/deleteAllTasks";
import { CategoryItem } from "@/models/CategoryItem";
import { TaskItem } from "@/models/TaskItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

import { Alert, Button, FlatList, Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function ProfileScreen({ navigation }: any) {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const isFocused = useIsFocused();
  const [showDelete, setShowDelete] = useState(false);
  const [userData, setUserData] = useState<{ username: string, password: string } | null>(null);
  
  // Set up the logout button in the header
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleLogout} style={styles.headerButton}>
          <Ionicons name="log-out-outline" size={24} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  
  // Load categories when the screen is focused
   useEffect(() => {
    if (isFocused) {
      loadCategories();
      loadUserData();
     
    }
  }, [isFocused]); 

  // Load user data from AsyncStorage
  const loadUserData = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem('userData');
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
      } else {
        setUserData(null); 
      }
    } catch (error) {
      console.error('Failed to load user data', error);
    }
  };


  // Handle logout without clearing user data
  const handleLogout = async () => {
    await AsyncStorage.setItem('isLoggedIn', 'false');
    Alert.alert('Logout', 'You have been logged out.');
    router.replace('/LogInScreen'); // Redirect to LoginScreen but retain user data in AsyncStorage
  };

  // Handle deleting the user data from AsyncStorage
  const handleDeleteUser = async () => {
    try {
      // Remove the user data from AsyncStorage
      await AsyncStorage.removeItem('userData');
      Alert.alert('Account Deleted', 'Your account has been deleted.');
      
      // After deleting, navigate to the SignUp screen to create a new user
      router.navigate('/SignUpScreen');
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  
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

  // Update tasks to remove the deleted categories
  try {
    const storedTasks = await AsyncStorage.getItem('tasklist');
    if (storedTasks) {
      const taskList = JSON.parse(storedTasks);

      // Set tasks' category to "Uncategorized" or remove the category field
      const updatedTasks = taskList.map((task: TaskItem) => {
        if (task.category && !categories.some(cat => cat.name === task.category)) {
          task.category = "Uncategorized"; // Or set to "" if you prefer
        }
        return task;
      });

      await AsyncStorage.setItem('tasklist', JSON.stringify(updatedTasks));
    }
  } catch (error) {
    console.error("Failed to update tasks after deleting categories", error);
  }
}

    return (
      <View style= {styles.container}>
        {userData && (
        <View style={styles.userInfo}>
          <Text style={styles.userLabel}>Hi {userData.username} !</Text>
          {/* <Text style={styles.userText}>{userData.username}</Text>
          <Text style={styles.userLabel}>Password:</Text>
          <Text style={styles.userText}>{userData.password}</Text> */}
        </View>
      )}
        <View style= {styles.addCategoryContainer}>
          <AddCategory onAddCategory={handleAddCategory}></AddCategory>
           
           {/* Display the list of categories */}
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Text style= {styles.categoryText}>{item.name}</Text>}
        />
          </View>

          <Button title="Delete All Categories" onPress={() => {setShowDelete(true)}} color="#FF6347"></Button>

          {showDelete  && 
 <DeleteAllTasks message={'Are you sure you want to delete all categories?'}
 button1Click={() => {
   setShowDelete(false)
 }}
 button1Text={'Avbrut'}
 button2Click={() =>{deleteAllCategories()}}
 button2text={'Confirm'}
 />
 }



     {/* Logout button */}
   {/*   <Button title="Logout" onPress={handleLogout} /> */}

{/* Delete User button */}
<Button title="Delete Account" color="red" onPress={handleDeleteUser} />
</View>
    );
  }
  


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0D0D0D',
      padding: 20,
    },

    addCategoryContainer: {
      marginBottom: 20,
     /*  backgroundColor:'white' */
    },

    headerButton: {
      marginRight: 15,
    },

    categoryText: {
      color: 'white',
      fontSize: 16,
      paddingVertical: 5,
    },

    userInfo: {
      marginVertical: 20,
      padding: 10,
     /*  backgroundColor: '#1C1C1C', */
      borderRadius: 5,
    },

    userLabel: {
      color: '#FFFFFF',
      fontWeight: 'bold',
      fontSize:34
    },

    userText: {
      color: 'rgba(255, 255, 255, 0.8)',
      marginBottom: 10,
    },
  });