import * as React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import useFetchData from '../../hooks/useFetchData';

function UserHome(props) {
  const {uri} = props;
  const {
    data,
    loading,
    setLoading,
    error,
    setError,
    fetchData,
  } = useFetchData(uri, {user: {}});
  console.log(data);
  return (
    <View>
      <View style={styles.row}>
        <Image source={{uri: data.user.avatar}} style={styles.image} />
        <View>
          <Text>学籍编号：{data.user.id}</Text>
          <Text>{data.user.role_name}</Text>
        </View>
      </View>
      <View>
        <Text>电子邮箱：{data.user.email}</Text>
        <Text>性别：{data.user.sex_name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  image: {
    width: 60,
    height: 60,
    // borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
  },
});
export default UserHome;
