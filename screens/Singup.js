import React, {useState} from 'react';
import { StyleSheet, Text, Button, TextInput, Image, SafeAreaView,TouchableOpacity, StatusBar, Alert, View} from 'react-native';
import {createUserWithEmailAndPassword} from 'firebase/auth';

import { auth } from '../config/firebase'; 

const HeaderImg = require("../common/img/header.png");

export function Singup({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onHandleSingup = () => {
        if ( email !== '' && password !== '') {
            createUserWithEmailAndPassword(auth,email,password)
            .then( () => {navigation.navigate("Login")} )
            .catch( error =>{
                alert("Sing Up Error ",error.message); 
                console.log("Sing Up Error ",error.message); 
            });
            navigation.navigate("Login");
        }
    }

    return (
        <View style={style.container}>
            <Image source={HeaderImg} style={style.backImage}/>
            <View style={style.whiteSheet}/>
            <SafeAreaView style={style.form}>
                <Text style={style.title}>Sing Up</Text>
                <TextInput 
                    style={style.input}
                    placeholder='Enter email'
                    autoCapitalize='none'
                    keyboardType='email-address'
                    textContentType='emailAddress'
                    autoFocus={true}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput 
                    style={style.input}
                    placeholder='Enter password'
                    autoCapitalize='none'
                    textContentType='password'
                    autoCorrect={false}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <TouchableOpacity style={style.button} onPress={onHandleSingup}>
                    <Text style={{fontWeight:'bold', fontSize:18, color:'#fff'}} >Singup</Text>
                </TouchableOpacity>
                <View>
                <Text style={{fontSize:14, color:'gray', fontWeight:'600'}} >If you have an account login here</Text>
                <TouchableOpacity  onPress={() => navigation.navigate("Login")}>
                    <Text style={{fontWeight:'600', fontSize:14, color:'#E94057'}}>Login</Text>
                </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    )
}

const style = StyleSheet.create({
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
        backgroundColor: '#E94057',
        height: 58,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },

});

