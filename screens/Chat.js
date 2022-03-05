import React, {
    useState,
    useEffect,
    useLayoutEffect,
    useCallback,
} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { 
    collection, 
    addDoc,
    orderBy,
    query,
    onSnapshot, 
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, database } from "../config/firebase"; 
import { useNavigation } from "@react-navigation/native";
import {AntDesign} from '@expo/vector-icons';

export function Chat(){
    const [messages, setMessages] = useState([]);
    const navigation = useNavigation();

    const onSingOut = () => {
        signOut(auth).catch(err => console.log(err));
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    style={{
                        marginRight: 10
                    }}
                    onPress={onSingOut}
                >
                    <AntDesign name="logout" size={24} color={'#E94057'} style={{marginRight: 10}}/>
                </TouchableOpacity>
            )
        });
        
    }, [navigation]);

    useLayoutEffect(()=>{
        const collectionRef = collection(database, 'chats');
        const q = query(collectionRef, orderBy('createdAt','desc'));
        console.log("query ",q);
        const unsubscribe = onSnapshot(q, async snapshot => {
            //console.log("SnapShot ",snapshot);
            setMessages(
                snapshot.docs.map(doc => ({
                    _id: doc.id,
                    createdAt: doc.data().createdAt.toDate(),
                    text: doc.data().text,
                    user: doc.data().user,
                }))
            );
        });
        return unsubscribe;
    },[]);

    const onSend = useCallback((messages = []) => {
        setMessages( previousMessages => {
            //console.log("PreviousMessages ",previousMessages);
            //console.log("Messages ",messages);
            GiftedChat.append(previousMessages, messages)});
        const {_id, createdAt, text, user} = messages[0];
        
        addDoc(collection(database,'chats'),{
            _id,
            createdAt,
            text,
            user
        }).catch(err => console.log(`Error DB ${err}`));
    },[]);

    return(
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: auth?.currentUser?.email,
                avatar: 'https://i.pravatar.cc/',
            }}
            showUserAvatar={true}
            messagesContainerStyle={{
                backgroundColor:'#fff'
            }}
        /> 
    )
}
