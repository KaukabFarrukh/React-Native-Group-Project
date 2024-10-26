import { TaskItem } from "@/models/TaskItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { Pressable, TouchableHighlight, View, Text, StyleSheet } from "react-native";


type shoppErrorProps = {
    message : String;
    button1Click: () => void,
    button1Text : String,
    button2Click: () => void,
    button2text: String,
}

export default function DeleteAllTasks({message,  button1Click, button1Text, button2Click, button2text} : shoppErrorProps){
   /*  const [tasks, setTasks] = useState<TaskItem[]>([]);  */

    /* async function deleteAll() {
        await AsyncStorage.removeItem('tasklist')

         setTasks([])
        
      } */

      return(
        <View style={styles.errorBackg}>

        <Pressable style={styles.errorColorBack} onPress={button1Click}>

        <View ></View>
        </Pressable>

        
      <View style={styles.errorBox}>
      <Text style={styles.errorText}>{message}</Text>
      <TouchableHighlight onPress={button1Click}>
        <Text style={styles.errorText}>{button1Text}</Text>
      </TouchableHighlight>


      {button2text != undefined &&    
      <TouchableHighlight onPress={button2Click}>
        <Text style={styles.errorText}>{button2text}</Text>
      </TouchableHighlight>
      }

     </View>
     </View>


      )
   

}


const styles = StyleSheet.create({
    shopTextInput:{
      backgroundColor:'lightgray',
      height: 40,
      padding:10,
      margin:5,
      borderRadius:5
    },
    shopFilterTab:{
      backgroundColor:'red',
      height:50,
      flex:1
    },
    shopFilterTabActive:{
      backgroundColor:'green',
      height:50,
      flex:1
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    stepContainer: {
      gap: 8,
      marginBottom: 8,
    },
    reactLogo: {
      height: 178,
      width: 290,
      bottom: 0,
      left: 0,
      position: 'absolute',
    },
    errorBackg:{
      zIndex:90,
      position:'absolute',
      width:'100%',
      height:'100%',
      alignItems:'center',
      justifyContent:'center',
      
    },
    errorColorBack:{
      position:'absolute',
      backgroundColor:'black',
      opacity:0.8,
      width:'100%',
      height:'100%',
    },
    errorBox:{
      backgroundColor:'red',
      position:'absolute',
      alignItems:'center',
      justifyContent:'space-around',
      zIndex:100,
      width:200,
      height:200,
      opacity:2,
      borderRadius:8,
      color:'white'
    },
    errorText:{
      color:'white',
      fontSize:18
    }
  });
  