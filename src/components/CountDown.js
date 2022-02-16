import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { FontSizes, Spacing } from '../utils/Sizes';
import { Colors } from '../utils/Colors';

const minutesToMillis = (min) => min * 1000 * 60;
const formatTime = (time) => time < 10 ? `0${time}` : time;

export const CountDown = ({
  minutes = 0.1,
  isPaused,
  onProgress,
  onEnd
}) => {
  const interval = React.useRef(null);

  const [millis, setMillis] = React.useState(null);

  const countDown = () => {
    setMillis((time) => {
      if (time === 0) {
        // do more stuff
        //clear our interval coz we dont want it to keep counting
        clearInterval(interval.current);
        return time;
      }
      const timeLeft = time - 1000;
      return timeLeft;
    })
  }

  useEffect(() => {
    setMillis(minutesToMillis(minutes))
  }, [minutes])

  // report the progress (using a progressBar)
  useEffect(() => {
    onProgress(millis/minutesToMillis(minutes));
    if (millis === 0) {
      //call the onEnd() func on the parent (Timer) component, so that we can end the countdown if the timer has hit zero
      //notice we do this after first of all running onProgress.
        onEnd();
    }
  }, [millis])

  useEffect(() => {
    if (isPaused) {
      //when paused, make sure we clean up
      if (interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(countDown, 1000);
    return () => clearInterval(interval.current);
    //every time we load the app, we only run the timer if the Timer is not paused
  }, [isPaused])

  //const [millis, setMillis] = useState(minutesToMillis(minutes));

  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;

  return (
    <Text style={styles.text}>{formatTime(minute)} : {formatTime(seconds)}</Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: FontSizes.xxxl,
    fontWeight: "bold",
    color: Colors.white,
    padding: Spacing.lg,
    backgroundColor: 'rgba(94, 132, 226, 0.3)'
  }
})