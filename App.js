import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Focus } from './src/features/focus/Focus';
import { FocusHistory } from './src/features/focus/FocusHistory';
import { Colors } from './src/utils/Colors';
import { Timer } from './src/features/timer/Timer';
import { FontSizes, Spacing } from './src/utils/Sizes';

// You can import from local files
//import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
//import { Card } from 'react-native-paper';
const STATUSES = {
  COMPLETE: 1,
  CANCELLED: 2,
};
export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  //We are about to store the focus history
  const [focusHistoryData, setFocusHistoryData] = useState([]);

  {
    /*}
  //it would've been nice to use useEffect but if we are to keep track of the statuses of tasks closed (cancelled) we need a better way
  useEffect(() => {
    if (focusSubject) {
      //every time there is a focusSubject, add it to the focusHistoryData array (we add it here with the spread operator where the 2nd arg is 
      // added (spread) into the array in the 1st arg) 
      setFocusHistoryData([...focusHistoryData, focusSubject])
    }
  }, [focusSubject])
  */
  }
  const addFocusHistorySubjectWithStatus = (subject, status) => {
    //we will store not only the focusSubject, but also the status. We will end up with a focusHistoryData array of objects.
    //notice we create & pass a unique key into every array item. This is coz React needs this key on every array so it can better index the elems 
    //during every loop. Generate ur unique key anyway u see fit-just as long asd its unique. U can alternatively use a KeyExtractor to generate this 
    //unique key. Hint: We will actually use a Flatlist component to display all focusHistoryData in a list, & because Flatlist loops in the bg to do so,
    //it will use this unique key we just added to every focusHistoryData array item.
    setFocusHistoryData([...focusHistoryData, { key: String(focusHistoryData.length + 1), subject, status }]);
  };

  const onClear = () => {
    //set focusHistoryData to a blank array
    setFocusHistoryData([]);
  };

  const saveFocusHistory = async () => {
    try {
      //why the @ symbol?
      await AsyncStorage.setItem("focusHistoryArray", JSON.stringify(focusHistoryData));
    } catch (e) {
      console.log(e);
    }
  };

  //load the saved focusHistoryData 
  const loadFocusHistory = async () => {
    try {
      //function to get the value from AsyncStorage
      {/* await AsyncStorage.getItem("focusHistoryData").then(
        (value) =>
          //AsyncStorage returns a promise so adding a callback to get the value
          setFocusHistoryData(value)
        //Setting the value in Text
      );*/}
     
      const history = await AsyncStorage.getItem("focusHistoryArray");
      if (history && JSON.parse(history).length) {   
        setFocusHistoryData(JSON.parse(history));
      } 
    } catch (e) {
      console.log(e);
    }
    
  };

  //load the focusHistoryData so its available, when the comp (this App comp) mounts (coz the 2nd arg array is empty)
  useEffect(() => {
    loadFocusHistory();
  }, []);

  //make sure every time focusHistoryData changes, it is saved asynchronously
  useEffect(() => {
    saveFocusHistory();
  }, [focusHistoryData])

  return (
    <View style={styles.container}>
      {/* 
    if there's a focus subject, show the timer, else show the focus screen (Focus comp) so user can enter a subject to 
    focus on */}
      {focusSubject ? (
        //you may pass anonymous funcs to a child comp in same way u can pass funcs defined in parent comp
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            {
              /*//we need to return to the focus screen when tmer ends so the user can chose sth else to focus on
            //notice that though its an anonymous func, the func it calls in turn (setFocusSubject) is still defined in this parend comp
            //having cleared the task the user was focusing on, the screen will jump back to the home screen, (which is the Focus comp)
            //as nested below here (<Focus addSubject={setFocusSubject} />) 
            //this clearSubject() func created here (anonymously) is called from the (child) Timer.js comp's cancel btn to cancel a task 
            */
            }
            //Before the focus timer ends, we will store the subject & status of the current (about to be stopped) focus item
            addFocusHistorySubjectWithStatus(focusSubject, STATUSES.COMPLETE);
            setFocusSubject(null);
          }}
          clearSubject={() => {
            //before we clear/cancel a focus item, we want to store the focus item's subject & status
            //before we clear the focus timer here, we will store the subject & status of the current (about to be stopped) focus item
            addFocusHistorySubjectWithStatus(focusSubject, STATUSES.CANCELLED);
            setFocusSubject(null);
          }}
        />
      ) : (
        <View style={{ flex: 1 }}>
          {/* Wrapping content with a fragment (<> </>) allows u to render multiple pieces without having to use View */}
          <Focus addSubject={setFocusSubject} />
          <FocusHistory focusHistoryData={focusHistoryData} onClear={onClear} />
        </View>
      )}
      {/*<Text>{setFocusSubject}</Text>*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? Spacing.md : Spacing.lg,
    backgroundColor: Colors.darkBlue,
  },
});
