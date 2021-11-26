import React, { useState } from 'react';
import { Button, FlatList, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import GoalInput from './components/GoalInput';
import GoalItem from './components/GoalItem';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
const [isAddMode, setIsAddMode] = useState(false);
  
  const addGoalHandler = goalTitle => {
    setCourseGoals(currentGoals => [...courseGoals, { uid: Math.random().toString(), value: goalTitle }]);
    setIsAddMode(false);
  }

  const removeGoalHandler = goalId => {
    setCourseGoals(currentGoals => {
      return currentGoals.filter((goal) => goal.uid !== goalId);
    });
  }

  const cancelGoalAdditionHandler = () => {
    setIsAddMode(false);
  }

  return (
    <View style={styles.screen}>
      <Button title="ADD NEW GOAL" onPress={() => setIsAddMode(true)}/>
      <GoalInput visible={isAddMode} onAddGoal={addGoalHandler} onCancelGoal={cancelGoalAdditionHandler}/>
      <FlatList 
      keyExtractor={(item,index) => item.uid}
      data={courseGoals}
      renderItem={itemData => ( <GoalItem id={itemData.item.uid} onDelete={removeGoalHandler} title={itemData.item.value}/>
    )} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  }
});