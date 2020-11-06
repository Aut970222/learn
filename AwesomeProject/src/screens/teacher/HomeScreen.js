import React, {useLayoutEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ProgressWebview from '../../components/shared/ProgressWebview';
import Colors from '../../constants/Colors';

function HomeScreen({navigation, route}) {
  console.log(route);
  const title = route.params.title;
  useLayoutEffect(() => {
    navigation.setOptions({title: title});
  }, [navigation, title]);
  const uri = `/teachers/aaron`;
  return (
    <View style={styles.container}>
      <ProgressWebview uri={uri} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
export default HomeScreen;
