import React,{useState,useEffect} from 'react';
import {View, Text, StyleSheet, TextInput,TouchableOpacity} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
 
function SignUpScreen({navigation}){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    console.log(username);
    console.log(password);
    function onUsernameChange(newTerm){
        setUsername(newTerm);
    }
    function onPasswordChange(newTerm){
        setPassword(newTerm);
    }
    function onSubmit(){
      fetch('http://10.129.2.184:3000/users', {
        method: 'POST',
        body: JSON.stringify({
          username,
          password,
          fav: [],
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => navigation.navigate('Log'));
    }
    
    return (
      <View style={styles.mainView}>
        <FontAwesome5 name="user-circle" style={styles.logo} />
        <TextInput
          style={styles.inputStyle}
          placeholder="Username"
          value={username}
          onChangeText={(newTerm) => onUsernameChange(newTerm)}
          autoCapitalize="none"
          autoCorrect={false}
        ></TextInput>
        <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          value={password}
          onChangeText={(newTerm) => onPasswordChange(newTerm)}
          autoCapitalize="none"
          autoCorrect={false}
        ></TextInput>
        <TouchableOpacity
          onPress={() => onSubmit()}
          title="Log in"
          style={styles.ButtonStyle}
        >
          <Text style={styles.textStyle}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
}
const styles = StyleSheet.create({
    mainView: {
    },
    logo:{
        color: 'black',
        fontSize: 72,
        alignSelf: "center",
        marginTop: 100,
        marginBottom: 50,
    },
    inputStyle:{
       height: 50,
       backgroundColor: 'white',
       borderRadius: 10,
       marginBottom: 20,
       width: 350,
       alignSelf: "center",
       textAlign: 'center'
    },
    ButtonStyle:{
        height: 50,
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: 25,
        width: 100,
        alignSelf: "center",
        textAlign: 'center',
        backgroundColor: '#007AFF',
     },
     textStyle:{
        textAlign: 'center',
        color: 'white',
        marginVertical: 12.5,
     },
     ErrorStyle:{
         marginTop: 20,
        textAlign: 'center',
        fontSize: 32,
        fontWeight: 'bold',
     }
});
export default SignUpScreen;