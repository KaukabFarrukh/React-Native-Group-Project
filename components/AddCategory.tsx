import { TaskItem } from "@/models/TaskItem";
import { useState } from "react";
import { Button, TextInput, View } from "react-native";
import { CategoryItem } from "@/models/CategoryItem";
import AsyncStorage from "@react-native-async-storage/async-storage";

type CategoryProps = {
    onAddCategory: (category: CategoryItem) => void;
}
export default function AddCategory({onAddCategory} : CategoryProps){
    const [newCategory, setNewCategory] = useState('')
    
    async function handleAddCategory(){
        if (newCategory.trim()) { 
            const addCategory = new CategoryItem(newCategory.trim());
            onAddCategory(addCategory);
            console.log(addCategory); 
            setNewCategory("");
        }
        
    }

   
    
    return(

        <View>

            <TextInput 
            placeholder="Enter Category"
            value={newCategory}
            onChangeText={setNewCategory}
            
            />

        <Button title="Add Category" onPress={handleAddCategory} />

        </View>




    )

}