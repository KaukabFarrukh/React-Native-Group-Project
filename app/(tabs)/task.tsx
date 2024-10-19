import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddTaskScreen from "../AddTaskScreen";

export default function Task() {
    const Stack = createNativeStackNavigator();
  
    return (
      
        <Stack.Navigator>
          <Stack.Screen name="Add Task Screen" component={AddTaskScreen} />
          
        </Stack.Navigator>
     
    );
  }