import * as React from 'react';
import {Platform, StyleSheet, Text, TextInput, View} from 'react-native';
import Colors from '../../../constants/Colors';

function SignInForm(props) {
  const {signInParams, setSignInParams} = props;

  return (
    <View style={styles.form}>
      <View>
        <Text style={styles.label}>用户名/电子邮件</Text>
        <TextInput
          style={styles.input}
          placeholder="用户名/电子邮件"
          keyboardType={'email-address'}
          autoCapitalize={'none'}
          onChangeText={(username) =>
            setSignInParams({...signInParams, username})
          }
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>密码</Text>
        <TextInput
          style={styles.input}
          placeholder="密码"
          autoCapitalize={'none'}
          secureTextEntry={true}
          onChangeText={(password) =>
            setSignInParams({...signInParams, password})
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    width: '80%',
    alignSelf: 'center',
    marginTop: 25,
  },
  formGroup: {
    marginTop: 22,
  },
  label: {
    fontSize: 15,
    fontWeight: '200',
  },
  input: {
    color: Colors.black,
    backgroundColor: '#EDEDED',
    height: 30,
    paddingLeft: 5,
    marginTop: 4,
    ...Platform.select({
      android: {
        paddingTop: 0,
        paddingBottom: 0,
        lineHeight: 30,
      },
    }),
  },
});

export default SignInForm;
