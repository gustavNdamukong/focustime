import * as React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../../components/RoundedButton';
import { FontSizes, Spacing } from '../../utils/Sizes';
import { Colors } from '../../utils/Colors';

export const Focus = ({addSubject}) => {

  const [subject, setSubject] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>What would you like to focus on?</Text>
        <View styles={styles.inputContainer}>
          <TextInput size={{ flex: 1, marginRight: Spacing.md }} onSubmitEditing={
                                          ({nativeEvent}) => {
                                              setSubject(nativeEvent.text)
                                            }}  
          />
          <RoundedButton size={50} title="Add" onPress={() => {
              subject == null ? alert("Please enter a subject") : addSubject(subject)
          }} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
  },
  innerContainer: {
    flex: 1,
    padding: Spacing.md,
    justifyContent: 'center',
  },
  title: {
    color: Colors.white,
    fomntWeight: 'bold',
    fontSize: FontSizes.lg,
  },
  inputContainer: {
    paddingTop: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
