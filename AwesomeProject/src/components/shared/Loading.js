import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

function Loading() {
  return (
    <ActivityIndicator
      size="small"
      color={Colors.primary}
      style={styles.ActivityIndicatorStyle}
    />
  );
}

const styles = StyleSheet.create({
  ActivityIndicatorStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});

export default Loading;
