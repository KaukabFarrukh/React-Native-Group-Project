import { Button, Text, View } from "react-native";

export default function StartScreen({ navigation } : any) {
    return (
      <View>
        <Text>StartScreen</Text>
        <Button
        title="Create Task"
        onPress={() => navigation.navigate('AddTaskScreen')}
      />
      </View>
    );
  }
  