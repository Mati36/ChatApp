import React, {useState} from 'react';
import { StyleSheet, Text, Button, TextInput, Image, SafeAreaView,TouchableOpacity, StatusBar, Alert, View} from 'react-native';
import {signInWithEmailAndPassword} from 'firebase/auth';
import { auth } from '../config/firebase'; 

const HeaderImg = require("../common/img/header.png");

export function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onHandleLogin = () => {
        if ( email !== '' && password !== '') {
            signInWithEmailAndPassword(auth,email,password)
            .then( () => console.log("Login Success") )
            .catch( (error) => console.log("Login Error ",error.message));
        }
    }

    return (
        <View style={{ flex: 1,
            backgroundColor: '#fff',}}>
            <Image source={HeaderImg} style={{ width: '100%',
        height:340,
        position:'absolute',
        top:0,
        resizeMode:'cover',}}/>
            <View style={{ width: '100%',height: '75%',position: 'absolute',bottom:0,
        backgroundColor: '#fff',borderBottomEndRadius:60,}}/>
        </View>
    )
}

export const style = () => StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
    },
    title:{
        fontSize:36,
        fontWeight: 'bold',
        color: 'orange',
        alignSelf: 'center',
        paddingBottom:24,
    },
    input:{
        backgroundColor:'#f6f7fb',
        height:58,
        marginBottom:20,
        fontSize: 16,
        borderRadius:10,
        padding: 12,
    },
    backImage:{
        width: '100%',
        height:340,
        position:'absolute',
        top:0,
        resizeMode:'cover',
    },
    whiteSheet:{
        width: '100%',
        height: '75%',
        position: 'absolute',
        bottom:0,
        backgroundColor: '#fff',
        borderBottomEndRadius:60,
    },
    form: {
        flex:1,
        justifyContent:'center',
        marginHorizontal:30,
    },
    button: {
        backgroundColor: '#f57c00',
        height: 58,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },

});
