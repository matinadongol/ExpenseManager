import { useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { createUser } from '../util/auth';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { Alert } from 'react-native';

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  async function signUpHandler({email, password}){
    setIsAuthenticating(true)
    try{
      await createUser(email, password)
    } catch (error){
      Alert.alert('sign up failed', 'could not sign you in')
    }
    setIsAuthenticating(false)
  }
  if(isAuthenticating){
    return <LoadingOverlay/>
  }
  return <AuthContent onAuthenticate={signUpHandler}/>;
}

export default SignupScreen;
