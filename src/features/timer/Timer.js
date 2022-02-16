import React, { useState } from 'react';
import { Text, View, StyleSheet, Vibration, Platform } from 'react-native';
import { ProgressBar } from 'react-native-paper';

import { useKeepAwake } from 'expo-keep-awake';

import { Colors } from '../../utils/Colors';
import { FontSizes, Spacing } from '../../utils/Sizes';

import { CountDown } from '../../components/CountDown';
import { RoundedButton } from '../../components/RoundedButton'; 
import { Timing } from './Timing'; 

const DEFAULT_TIME = 0.1;
export const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
  useKeepAwake();

  const [minutes, setMinutes] = useState(DEFAULT_TIME); //0.1 = 6 seconds
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const onProgress = (progress) => {
    setProgress(progress);
  }

  const vibrate = () => {
    if (Platform.OS === 'ios')
    {
      //on ios we cannot specify the length of time of the vibration, so we just do that using the interval & timout js funcs
      const interval = setInterval(() => Vibration.vibrate(), 1000); //one sec after finishing a focus activity; start vibrtating
      setTimeout(() => clearInterval(interval), 5000); //stop the vibration after 5 secs
    }
    else {
      //on android, you can simply directly specify how long you want the vibration to last, eg here we say 10 secs 
      Vibration.vibrate(10000); //10000 = 10 secs
    }
  }

  const onEnd = () => {
    //this func cleans things up when the timer has ended eg reset clock, reset the progress bar, reset the val of the isStarted flag
    //it is called from the child comp CountDown.js, as it should 
    vibrate();
    setMinutes(DEFAULT_TIME); 
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  }

  const changeTime = (min) => {
    setMinutes(min);
    //when we reset the time, we also need to reset the progress too
    setProgress(1);
    //we also need to set isStarted to false coz we've reset the time & progress, & we're gonna restart
    setIsStarted(false)
  }

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <CountDown
          minutes={minutes} 
          isPaused={!isStarted} 
          onProgress={onProgress} 
          onEnd={onEnd}
        />
      </View>
      <View style={{paddingTop: Spacing.xxl}}>
        <Text style={styles.title}>Focusing on:</Text>
         <Text style={styles.task}>{focusSubject}</Text>
      </View>

      <View style={{paddingTop: Spacing.sm}}>
        <ProgressBar 
          progress={progress}
          style={{color: '#5E84E2', height: 10, paddingTop: Spacing}} 
        />
      </View>

      <View style={styles.buttonWrapper}>
        <Timing onChangeTime={changeTime} />
      </View>

      <View style={styles.buttonWrapper}>
      { isStarted ? (
        <RoundedButton title="Pause" size ={100} onPress={() => setIsStarted(false)}/>
      ) : (
        <RoundedButton title="Start" size ={100} onPress={() => setIsStarted(true)}/>
      )}
      </View>

      <View style={styles.clearSubject}>
        <RoundedButton 
          title="Cancel" 
          size ={50} 
          onPress={() => clearSubject()} />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: Colors.white,
    textAlign: "center",
  },
  task: {
    color: Colors.white,
    textAlign: "center",
    fontWeight: "bold",
  }, 
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: 15,
    justifyContent: "center",
    alignItems: "center"
  },
  clearSubject: {
    paddingBottom: 25,
    paddingLeft: 25
  }
})