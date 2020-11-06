import React, {useLayoutEffect, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';
import ProgressWebview from '../../components/shared/ProgressWebview';

function ArticlesScreen({navigation, route}) {
  const {id, title} = route.params;

  const uri = `https://clwy.cn/information/articles/${id}`;
  useLayoutEffect(() => {
    navigation.setOptions({title: title});
  }, [navigation, title]);

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
  loadingBar: {
    backgroundColor: Colors.primary,
    height: 2,
  },
});

export default ArticlesScreen;
