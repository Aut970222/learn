import React, {useLayoutEffect} from 'react';
import {View, Text} from 'react-native';
import ProgressWebview from '../../components/shared/ProgressWebview';

function DetailsScreen({route, navigation}) {
  useLayoutEffect(() => {
    navigation.setOptions({title: title});
  });
  // console.log(route);
  const {uri, title} = route.params;
  return (
    <View style={{flex: 1}}>
      <ProgressWebview uri={uri} />
    </View>
  );
}

export default DetailsScreen;
