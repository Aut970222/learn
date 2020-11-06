import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

function DividerTitle(props) {
  const {type, subtitle} = props;

  return (
    <View style={styles.container}>
      <View style={styles.type}>
        <View style={styles.before} />
        <Text style={styles.ttl}>{type}</Text>
        <View style={styles.after} />
      </View>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

// 样式
const styles = StyleSheet.create({
  container: {
    textAlign: 'center',
    marginBottom: 40,
  },
  type: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  before: {
    width: 75,
    height: 4,
    borderRadius: 4,
    backgroundColor: '#1e1e1e',
    marginRight: 16,
    marginTop: 20,
  },
  after: {
    width: 75,
    height: 4,
    borderRadius: 4,
    backgroundColor: '#1e1e1e',
    marginLeft: 16,
    marginTop: 20,
  },
  ttl: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 2,
    fontWeight: 'bold',
  },
});

export default DividerTitle;
