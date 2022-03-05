import React, {useEffect} from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { useNavigation  } from "@react-navigation/native";
import { Entypo, FontAwesome  } from "@expo/vector-icons";   
import { colors } from "../colors";
import { signOut } from "firebase/auth";
import { auth } from '../config/firebase'; 
import {AntDesign} from '@expo/vector-icons';

const iconImg = "https://i.pravatar.cc/";
export function Home(){
    
    const navigation = useNavigation();

    const onSingOut = () => {
        console.log("auth ",auth);
        signOut(auth).catch(err => console.log(err));
    }


    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <FontAwesome name="search" size={24} color={'#E94057'} style={{marginLeft: 15}}></FontAwesome>
            ),
            headerRight: () => (
                <View style={{
                    display:'flex',
                    flexDirection:'row',
                }}>
                    
                    <Image source={{ uri: iconImg }} 
                        style={{
                            justifyContent:'flex-end',
                            width: 50,
                            height: 50,
                            backgroundColor: '#ccc5',
                            borderRadius: 50,
                            margin: 15,
                        }}
                        resizeMode={'cover'} 
                    />
                    <TouchableOpacity
                        style={{
                            justifyContent:'flex-start',
                            alignContent:'center',
                            marginTop:10,
                        }}
                        onPress={onSingOut}
                    >
                        <AntDesign name="logout" size={24} color={'#E94057'} style={{ marginRight: 10, alignSelf:'center' }} />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation]);
navigation
    return(
        <View style={styles.container}>
            <TouchableOpacity 
                onPress={() => navigation.navigate("Chat")}
                style={styles.chatButton}
            >
                <Entypo name="chat" size={45} color={'#E94057'} style={{ alignSelf:'center', padding:5 }}/>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        display:'flex',
        flex: 1,
        flexDirection:'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        alignSelf:'flex-end',
        width:'100%',
        height:'100%',
    },
    chatButton: {
        height: 60,
        width:60,
        borderRadius: 60,
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignSelf:'flex-end',
        alignContent:'center',
        shadowColor: '#3333',
        shadowOffset:{
            width:0,
            height: 2,
        },
        shadowOpacity: .9,
        shadowRadius: 8,   
        margin:15,
    },

});