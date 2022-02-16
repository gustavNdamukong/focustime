import React from 'react';
import { View, StyleSheet } from 'react-native';

import { RoundedButton } from '../../components/RoundedButton'; 

export const Timing = ({onChangeTime}) => {
  return (
    //react fragment (<></>)
    <>
      <View style={styles.timingButton}>
        <RoundedButton size={75} title="1" onPress={() => onChangeTime(0.2)} />
      </View>

      <View style={styles.timingButton} >
        <RoundedButton size={75} title="15" onPress={() => onChangeTime(15)} />
      </View>

      <View style={styles.timingButton} >
        <RoundedButton size={75} title="20" onPress={() => onChangeTime(20)} />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  timingButton: {
    flex: 1,
    alignItems: 'center'
  }
});