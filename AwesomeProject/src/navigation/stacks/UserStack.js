import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HeaderButtonsOption from '../options/HeaderButtonsOption';
import CardScreenOption from '../options/CardScreenOption';

import UserLoginNoticeScreen from '../../screens/user/LoginNoticeScreen';
import UserAuthScreen from '../../screens/user/AuthScreen';
import UserHomeScreen from '../../screens/user/HomeScreen';
import UserSignOutScreen from '../../screens/user/SignOutScreen';

import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from '../../screens/user/SplashScreen';

import AuthContext from '../../components/user/auth/AuthContext';
import {Alert} from 'react-native';
import fetchRequest from '../../utils/fetchRequest';
import {useEffect} from 'react';

const Stack = createStackNavigator();

// 用户 Stack
function UserStack() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      userToken = await AsyncStorage.getItem('userToken');

      // 验证 token
      try {
        await fetchRequest('/api/v2/hello.json');
      } catch (err) {
        if (err.message == 'unauthorized') {
          await AsyncStorage.removeItem('userToken');
          userToken = null;
        }
      }

      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      // 登录
      signIn: async (data) => {
        try {
          let res = await fetchRequest('/oauth/token', 'POST', {
            grant_type: 'password',
            client_id: 'RCnGmwJv15EIuTT9tH0VU5LR4XnfTHLS1EZ32svVmEc',
            client_secret: 'oQYcSZ6lbGSk-EusazGBdb7_4e8v2TAWBn9vVmmkD6k',
            ...data,
          });

          if (res.error) {
            // 登录失败
            Alert.alert('错误', '请重新填写！');
          } else {
            // 登录成功
            await AsyncStorage.setItem('userToken', res.access_token);
            dispatch({type: 'SIGN_IN', token: res.access_token});
          }
        } catch (err) {
          if (err.message == 'unauthorized') {
            Alert.alert('错误', '账号已被禁用，请查收邮件并激活！');
          }
        }
      },
      // 登出
      signOut: async () => {
        // 清理token
        await AsyncStorage.removeItem('userToken');
        dispatch({type: 'SIGN_OUT'});
        Alert.alert('提示', '请重新登录！');
      },
      // 注册
      signUp: async (data) => {
        let res = await fetchRequest('/api/v2/users', 'POST', data);
        console.log(res);

        if (res.errors) {
          // 显示第一条错误信息
          const key = Object.keys(res.errors)[0];
          Alert.alert('错误', `${key} ${res.errors[key]}`);
        } else {
          // 注册成功后自动登录
          await AsyncStorage.setItem('userToken', res.access_token);
          dispatch({type: 'SIGN_IN', token: res.access_token});
          Alert.alert('提醒', '请查收激活邮件！');
        }
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <Stack.Navigator
        screenOptions={({route, navigation}) => ({
          ...CardScreenOption(route, navigation),
        })}>
        {state.isLoading ? (
          // We haven't finished checking for the token yet
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{title: ''}}
          />
        ) : state.userToken == null ? (
          // No token found, user isn't signed in
          <>
            <Stack.Screen
              name="UserLoginNotice"
              component={UserLoginNoticeScreen}
              options={({navigation}) => ({
                ...HeaderButtonsOption(navigation),
                title: '我的',
                animationTypeForReplace: state.isSignout ? 'pop' : 'push',
              })}
            />
            <Stack.Screen name="UserAuth" component={UserAuthScreen} />
          </>
        ) : (
          // User is signed in
          <>
            <Stack.Screen
              name="UserHome"
              component={UserHomeScreen}
              options={({navigation}) => ({
                ...HeaderButtonsOption(navigation),
                title: '我的',
              })}
            />
            <Stack.Screen
              name="UserSignOut"
              component={UserSignOutScreen}
              options={{title: ''}}
            />
          </>
        )}
      </Stack.Navigator>
    </AuthContext.Provider>
  );
}

export {AuthContext};
export default UserStack;
