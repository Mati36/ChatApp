import React, {useState, createContext, useContext, useEffect} from "react";
import {View, ActivityIndicator} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from "@react-navigation/stack";
import {onAuthStateChanged} from 'firebase/auth'
import { Chat } from "./screens/Chat";
import { Login } from "./screens/Login";
import { Singup } from "./screens/Singup";
import {Home} from './screens/Home'
import { async } from "@firebase/util";
import { auth } from "./config/firebase";

const Stack = createStackNavigator();
const AuthenticateUserContext = createContext({});
const AuthenticateUserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  return(
    < AuthenticateUserContext.Provider value= {{user, setUser}}>
      {children}
    </AuthenticateUserContext.Provider>
  )
}

function ChatStack() {
  return (
    <Stack.Navigator defaultScreenOptions={Home} screenOptions={{headerShown: true}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Chat" component={Chat} />

    </Stack.Navigator>
  );
}

function AuthStack(){
  return (
    <Stack.Navigator defaultScreenOptions={Login} screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Singup" component={Singup} />

    </Stack.Navigator>
  );
} 

function RootNavigator() {
  const { user, setUser } = useContext(AuthenticateUserContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, 
      async AuthenticateUser => {
        AuthenticateUser ? setUser(AuthenticateUser) : setUser(null);
        setLoading(false);
      }
    );
    return () => unsubcribe();
  }, [user]);

  if(loading){
    <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
      <ActivityIndicator size='large'/>
    </View>
  } 

  return(
    <NavigationContainer>
      { user ? <ChatStack/> : <AuthStack/>   }
    </NavigationContainer>
  );
}

export default function App() {
  return(
    <AuthenticateUserProvider>
      <RootNavigator/>
    </AuthenticateUserProvider>  
  )
  
}