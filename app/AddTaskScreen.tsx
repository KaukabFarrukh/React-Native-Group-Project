import React, { useEffect, useState } from 'react';
import { Button, TextInput, View, Text, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TaskItem } from '@/models/TaskItem';
import { Picker } from '@react-native-picker/picker';
import { CategoryItem } from '@/models/CategoryItem';
import { useIsFocused } from "@react-navigation/native";
export default function AddTaskScreen({ navigation }: any) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'To Do' | 'In Progress' | 'Done'>('To Do');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [endTime, setEndTime] = useState(new Date());
  const isFocused = useIsFocused();

  useEffect(() => {
    loadCategories(); // Load categories when the component mounts
  }, []);

  useEffect(() => {
    if (isFocused) {
      loadCategories();
     
    }
  }, [isFocused]);

  const loadCategories = async () => {
    try {
      const storedCategories = await AsyncStorage.getItem('categorylist');
      if (storedCategories) {
        setCategories(JSON.parse(storedCategories));
      }
    } catch (error) {
      console.error('Failed to load categories', error);
    }
  };



  // Function to handle saving the task
  const handleSaveTask = async () => {
    // Use TaskItem model to create a new task
    const newTask = new TaskItem(
      Date.now().toString(),
      title,
      description,
      status,
      category,
      date,
      endTime
    );

    try {
      const storedTasks = await AsyncStorage.getItem('tasklist');
      const currentTasks = storedTasks ? JSON.parse(storedTasks) : [];
      const updatedTasks = [...currentTasks, newTask];
      console.log(updatedTasks);
      await AsyncStorage.setItem('tasklist', JSON.stringify(updatedTasks));
     setTitle('');
     setDescription('');

      navigation.navigate('index');
      
    } catch (error) {
      console.error('Failed to save task', error);
    }
  };

  const showDatepicker = () => setShowDatePicker(true);

  const onDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Write your task</Text>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />
     

      <View style={{height:50}}></View>
   
   

      <View>
        <Text>Pick a date</Text>
        <Button onPress={showDatepicker} title="Select Date" />
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}
      </View>
      <TextInput
        placeholder="End Time (e.g., 08:00 AM)"
        value={endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        onFocus={() => showDatepicker()}
        style={{ borderWidth: 1, padding: 8, marginTop: 10 }}
      />
     
      <View >

{/* Category Picker */}
<Text>Select Category</Text>
<Picker
selectedValue={category}
onValueChange={(itemValue) => setCategory(itemValue)}
style={{ height: 0, width: '100%', marginBottom: 10 }}
>
<Picker.Item label="Select a Category" value="" />
{categories.map((cat) => (
<Picker.Item key={cat.id} label={cat.name} value={cat.name} />
))}
</Picker>
</View>

<Button title="Save Task" onPress={handleSaveTask} />
    </View>
    
  );
}
