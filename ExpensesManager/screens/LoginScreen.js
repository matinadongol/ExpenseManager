import { useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { login } from '../util/auth';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { Alert } from 'react-native';

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  async function loginHandler({email, password}){
    setIsAuthenticating(true)
    try{
      await login(email, password)
    } catch (error){
      Alert.alert('login failed', 'could not log you in')
    }
    setIsAuthenticating(false)
  }
  if(isAuthenticating){
    return <LoadingOverlay/>
  }
  return <AuthContent isLogin onAuthenticate={loginHandler}/>;
}

export default LoginScreen;
