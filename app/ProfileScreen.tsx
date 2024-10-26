import AddCategory from "@/components/AddCategory";
import DeleteAllTasks from "@/components/deleteAllTasks";
import { CategoryItem } from "@/models/CategoryItem";
import { TaskItem } from "@/models/TaskItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Alert, Button, FlatList, Text, View, StyleSheet } from "react-native";

export default function ProfileScreen({ navigation }: any) {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const isFocused = useIsFocused();
  const [showDelete, setShowDelete] = useState(false);
  const [userData, setUserData] = useState<{ username: string, password: string } | null>(null);
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
    Alert.alert('Logout', 'You have been logged out.');
    navigation.navigate('Login'); // Redirect to LoginScreen but retain user data in AsyncStorage
  };

  // Handle deleting the user data from AsyncStorage
  const handleDeleteUser = async () => {
    try {
      // Remove the user data from AsyncStorage
      await AsyncStorage.removeItem('userData');
      Alert.alert('Account Deleted', 'Your account has been deleted.');
      
      // After deleting, navigate to the SignUp screen to create a new user
      navigation.navigate('SignUp');
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

          <Button title="Delete All Categories" onPress={() => {setShowDelete(true)}}></Button>

          {showDelete  && 
 <DeleteAllTasks message={'Are you shure you want to delete all categories?'}
 button1Click={() => {
   setShowDelete(false)
 }}
 button1Text={'Avbrut'}
 button2Click={() =>{deleteAllCategories()}}
 button2text={'Confirm'}
 />
 }

{userData && (
        <View style={styles.userInfo}>
          <Text style={styles.userLabel}>Username:</Text>
          <Text style={styles.userText}>{userData.username}</Text>
          <Text style={styles.userLabel}>Password:</Text>
          <Text style={styles.userText}>{userData.password}</Text>
        </View>
      )}

     {/* Logout button */}
     <Button title="Logout" onPress={handleLogout} />

{/* Delete User button */}
<Button title="Delete Account" color="red" onPress={handleDeleteUser} />
     
     
      </View>
    );
  }
  


  const styles = StyleSheet.create({
    container: {
      padding: 20,
      flex: 1,
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
      textAlign: 'center',
    },
    userInfo: {
      marginVertical: 20,
      padding: 10,
      backgroundColor: '#f0f0f0',
      borderRadius: 5,
    },
    userLabel: {
      fontWeight: 'bold',
    },
    userText: {
      marginBottom: 10,
    },
  });