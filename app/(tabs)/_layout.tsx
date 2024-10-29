import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import StartScreen from '../StartScreen';
import AddTaskScreen from '../AddTaskScreen';
import ProfileScreen from '../ProfileScreen';
import MyTheme from '@/assets/styles/theme';
import { View } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: MyTheme.colors.primary,  // Use custom theme color for active tab
        tabBarInactiveTintColor: MyTheme.colors.border, // Use custom theme color for inactive tab
        /* tabBarBackground: () => <View style={{ backgroundColor: MyTheme.colors.card, flex: 1 }} />, */
        headerShown: false,
        
      }}>
      <Tabs.Screen
        name="index"
        
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="task"
        options={{
          title: 'Add Task',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="myprofile"
        options={{
          title: 'My Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}
      />


      
    </Tabs>
  );
}
