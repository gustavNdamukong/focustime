import React from "react";
import { View, StyleSheet, FlatList, Text, SafeAreaView } from "react-native"

import { FontSizes, Spacing } from "../../utils/Sizes";
import { RoundedButton } from "../../components/RoundedButton";

const HistoryItem = ({item, index}) => {
  return (
    <Text style={styles.historyItem(item.status)}>
      {/* JSON.stringify(item) */}
      { item.subject }
    </Text>
  )
}

export const FocusHistory = ({ focusHistoryData, onClear }) => {
  const clearHistory = () => {
    onClear();
  }

  return(
    <>
      <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
      { !!focusHistoryData.length && (
      <>  
        <Text style={styles.title}>Things we have focused on</Text>
        <FlatList
          style={{ flex: 1 }}
          contentContainerStyle={{ flex: 1, alignItems: 'center' }}
          data={focusHistoryData} //array of data eg [{}, {}, {}]
          renderItem={HistoryItem}
        />  
        <View style={styles.clearContainer}>
          <RoundedButton size={75} title="Clear" onPress={() => onClear()} />
        </View> 
      </> 
      )}
      </SafeAreaView>
    </>  
  );
};

const styles = StyleSheet.create({
  historyItem: (status) => ({
    color: status > 1 ? 'red' : 'green',
    fontSize: FontSizes.md
  }),
  title: {
    color: 'white',
    fontSize: FontSizes.lg
  },
  clearContainer: {
    alignItems: 'center',
    padding: Spacing.md
  }
});

