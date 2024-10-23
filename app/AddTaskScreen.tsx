import React, { useState } from 'react';
import { Button, TextInput, View, Text, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddTaskScreen({ navigation }: any) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To Do');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [endTime, setEndTime] = useState(new Date());

  // Function to handle saving the task
  const handleSaveTask = async () => {
    const newTask = {
      id: Date.now().toString(),
      title,
      description,
      status,
      category,
      date,
      endTime
    };

    try {
      const storedTasks = await AsyncStorage.getItem('tasklist');
      const currentTasks = storedTasks ? JSON.parse(storedTasks) : [];
      const updatedTasks = [...currentTasks, newTask];
      console.log(updatedTasks)
      await AsyncStorage.setItem('tasklist', JSON.stringify(updatedTasks));
      navigation.navigate('StartScreen');
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
     {/*  <Picker
        selectedValue={status}
        onValueChange={(itemValue) => setStatus(itemValue)}
        style={{ marginBottom: 10 }}
      >
        <Picker.Item label="To Do" value="To Do" />
        <Picker.Item label="In Progress" value="In Progress" />
        <Picker.Item label="Completed" value="Completed" />
      </Picker> */}
      <TextInput
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />
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
      <Button title="Save Task" onPress={handleSaveTask} />
    </View>
  );
}


