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
    <View style={{ flex: 1, padding: 20, backgroundColor: '#0D0D0D'}}>
      <Text style={{ fontSize: 24, color: 'white', textAlign: 'center', marginBottom: 20 }} >
        Write your task
      </Text>

      <TextInput
        placeholder="Title"
        placeholderTextColor="lightgray"
        value={title}
        onChangeText={setTitle}
        style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          color: 'white',
          padding: 10, 
          marginBottom: 10,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.3)',
        }}
      />

      <TextInput
        placeholder="Description"
        placeholderTextColor="lightgray"
        value={description}
        onChangeText={setDescription}
        style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          color: 'white',
          padding: 10, 
          marginBottom: 10,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.3)',
        }}
      />
     
      <View style={{ marginBottom: 15}}>
         <Text style= {{ color: 'white', marginBottom: 5 }}>
          Pick a date
         </Text>

        <Button onPress={showDatepicker} title="Select Date" color="#FF6347"/>
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
        placeholderTextColor="lightgray"
        value={endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        onFocus={() => showDatepicker()}
        style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          color: 'white',
          padding: 10,
          marginTop: 10,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.3)',
         }}
      />

      <View  style={{ marginBottom: 15 }}>

{/* Category Picker */}
<Text style={{ color: 'white', marginBottom: 5 }}>
  Select Category
</Text>

<Picker
selectedValue={category}
onValueChange={(itemValue) => setCategory(itemValue)}
style={{ 
  color: 'white',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  borderRadius: 8,
  }}
>

<Picker.Item label="Select a Category" value="" />
{categories.map((cat) => (
<Picker.Item key={cat.id} label={cat.name} value={cat.name} />
))}
</Picker>
</View>

<Button title="Save Task" onPress={handleSaveTask} color="#FF6347" />
    </View>
    
  );
}
