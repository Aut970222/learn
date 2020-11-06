import * as React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

function LoginNoticeScreen({navigation}) {

  return (
    <View style={styles.container}>
      <View style={styles.btn}>
        <TouchableOpacity onPress={() => navigation.navigate('UserAuth')}>
          <Text style={styles.login}>登录</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.msg}>您必须登录后才能访问</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    marginTop: 32,
    backgroundColor: Colors.primary,
    borderRadius: 5,
  },
  login: {
    color: '#fff',
    textAlign: 'center',
    lineHeight: 40,
    width: 160,
    height: 40,
    fontSize: 16,
  },
  msg: {
    marginTop: 20,
    fontWeight: '200',
    fontSize: 12,
  },
});

export default LoginNoticeScreen;
