import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TestFunc from "../TaskTest";

export default function Test() {
    const Stack = createNativeStackNavigator();
  
    return (
      
        <Stack.Navigator>
          <Stack.Screen name="Test" component={TestFunc} />
          
        </Stack.Navigator>
     
    );
  }