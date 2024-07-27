import { useContext, useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { login } from '../util/auth';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const autheCtx = useContext(AuthContext)
  async function loginHandler({email, password}){
    setIsAuthenticating(true)
    try{
      const token = await login(email, password)
      autheCtx.authenticate(token)
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
