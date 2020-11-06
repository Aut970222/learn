import React, {useState, useLayoutEffect, useMemo} from 'react';
import {View, StyleSheet, ActivityIndicator, Alert} from 'react-native';
import Colors from '../../constants/Colors';
import SegmentedControl from '@react-native-community/segmented-control';
import {Item, TabHeaderButtons} from '../../components/shared/TabHeaderButtons';
import SignInForm from '../../components/user/auth/SignInForm';
import SignUpForm from '../../components/user/auth/SignUpForm';

import AuthContext from '../../components/user/auth/AuthContext';

function AuthScreen({navigation}) {
  const {signIn, signUp} = React.useContext(AuthContext);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [signInParams, setSignInParams] = useState({
    username: '',
    password: '',
  });
  const [signUpParams, setSignUpParams] = useState({
    lastName: '',
    firstName: '',
    login: '',
    email: '',
    password: '',
    sex: 2,
  });

  const fullName = useMemo(
    () => signUpParams.lastName + signUpParams.firstName,
    [signUpParams.firstName, signUpParams.lastName],
  );

  // 提交
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const submit = () => {
    if (selectedIndex == 0) {
      signIn(signInParams);
    } else {
      signUp({
        user: {
          ...signUpParams,
          name: fullName,
        },
      });
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <SegmentedControl
          values={['登录', '会员注册']}
          selectedIndex={selectedIndex}
          tintColor={Colors.primary}
          style={styles.segmented}
          fontStyle={{color: Colors.headerTitle}}
          activeFontStyle={{color: Colors.white}}
          onChange={(event) => {
            setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
          }}
        />
      ),
      headerTitleStyle: {
        color: '#fff',
      },
      headerRight: () => (
        <TabHeaderButtons>
          <Item
            title="提交"
            color={Colors.primary}
            onPress={submit}
            buttonStyle={{marginRight: 5}}
          />
        </TabHeaderButtons>
      ),
    });
  }, [navigation, selectedIndex, submit]);

  return (
    <View style={styles.container}>
      {selectedIndex == 0 ? (
        <SignInForm
          signInParams={signInParams}
          setSignInParams={setSignInParams}
        />
      ) : (
        <SignUpForm
          signUpParams={signUpParams}
          setSignUpParams={setSignUpParams}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  segmented: {
    width: 220,
  },
});

export default AuthScreen;
