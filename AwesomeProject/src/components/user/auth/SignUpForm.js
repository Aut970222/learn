import React, {useState} from 'react';
import {Platform, StyleSheet, Text, TextInput, View} from 'react-native';
import SegmentedControl from '@react-native-community/segmented-control';
import Colors from '../../../constants/Colors';

function SignUpForm(props) {
  const {signUpParams, setSignUpParams} = props;
  const [selectedIndex, setSelectedIndex] = useState(2);

  return (
    <View style={styles.form}>
      <View style={styles.nameFormGroup}>
        <View style={styles.nameFormWrapper}>
          <Text style={styles.label}>姓</Text>
          <TextInput
            style={styles.input}
            placeholder="姓"
            autoCapitalize={'none'}
            onChangeText={(lastName) =>
              setSignUpParams({...signUpParams, lastName})
            }
          />
        </View>

        <View style={styles.nameFormWrapper}>
          <Text style={styles.label}>名</Text>
          <TextInput
            style={styles.input}
            placeholder="名"
            autoCapitalize={'none'}
            onChangeText={(firstName) =>
              setSignUpParams({...signUpParams, firstName})
            }
          />
        </View>
      </View>
      <Text style={styles.noticeMessage}>※请「实名」登记你的信息。</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>电子邮件</Text>
        <TextInput
          style={styles.input}
          placeholder="电子邮件"
          autoCapitalize={'none'}
          keyboardType={'email-address'}
          onChangeText={(email) => setSignUpParams({...signUpParams, email})}
        />
      </View>

      <View style={styles.formGroup}>
        <View style={styles.labelWrapper}>
          <Text style={styles.label}>用户名</Text>
          <Text style={styles.noticeMessage}>※半角英文数字 2-20 位</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="用户名"
          autoCapitalize={'none'}
          onChangeText={(login) => setSignUpParams({...signUpParams, login})}
        />
      </View>

      <View style={styles.formGroup}>
        <View style={styles.labelWrapper}>
          <Text style={styles.label}>密码</Text>
          <Text style={styles.noticeMessage}>※半角英文数字 6 位数以上</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="密码"
          secureTextEntry={true}
          onChangeText={(password) =>
            setSignUpParams({...signUpParams, password})
          }
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>性别</Text>
        <SegmentedControl
          values={['男性', '女性', '其他']}
          selectedIndex={selectedIndex}
          style={styles.sexForm}
          tintColor={Colors.primary}
          fontStyle={{color: Colors.headerTitle}}
          activeFontStyle={{color: Colors.white}}
          onChange={(event) => {
            setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
            setSignUpParams({
              ...signUpParams,
              sex: event.nativeEvent.selectedSegmentIndex,
            });
          }}
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
  nameFormGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameFormWrapper: {
    flexBasis: '48.7%',
  },
  noticeMessage: {
    fontSize: 12,
    marginTop: 4,
    color: '#666C6F',
  },
  labelWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  sexForm: {
    marginTop: 4,
  },
});

export default SignUpForm;
