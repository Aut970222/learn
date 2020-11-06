import React, {useContext, useLayoutEffect} from 'react';
import Loading from '../../components/shared/Loading';
import AuthContext from '../../components/user/auth/AuthContext';

function SignOutScreen({route, navigation}) {
  const {signOut} = useContext(AuthContext);

  useLayoutEffect(() => {
    signOut();
  }, [navigation, signOut]);

  return <Loading />;
}

export default SignOutScreen;
