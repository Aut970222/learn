import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {Cell, Section, TableView} from 'react-native-tableview-simple';
import {useNavigation} from '@react-navigation/native';

function SettingHome(props) {
  const navigation = useNavigation();
  const {uri} = props;
  const {title} = props;
  return (
    <View style={styles.container}>
        <Cell
          title= {title}
          titleTextColor="#007AFF"
          onPress={() => {
            navigation.navigate('SettingDetails', {
              title: title,
              uri: uri,
            });
          }}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDDDDD',
  },
  gray: {},
});

export default SettingHome;
