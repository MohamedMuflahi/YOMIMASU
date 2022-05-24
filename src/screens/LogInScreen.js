import React,{useState,useEffect} from 'react';
import {View, Text, StyleSheet, TextInput,TouchableOpacity} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { useSelector, useDispatch } from "react-redux";
import { setValue } from "../redux/user";
//  const dispatch = useDispatch();
//   const currentUser = useSelector((state) => state.user.value);

 
function LogInScreen({navigation}){
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
   // console.log(username);
    //console.log(password);
    function handleLogin(){
      fetch('https://young-basin-64523.herokuapp.com/login', {
        method: 'POST',
        body: JSON.stringify({
          username,
          password,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then(data =>{
          if(data.user){
            dispatch(setValue(data.user));
            navigation.navigate('LoggedHome');
          }
        })
    }
    function onUsernameChange(newTerm){
        setUsername(newTerm);
    }
    function onPasswordChange(newTerm){
        setPassword(newTerm);
    }
    function onSubmit(){
      handleLogin();
    //     user: pass,
    // });
    }
    function onclickSignUp(){
        setErrorMessage('');
        navigation.navigate('Sign');
    }
    useEffect(() => {
        // getUsers();
    }, [])
    
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
          <Text style={styles.textStyle}>Log in</Text>
        </TouchableOpacity>
        {errorMessage? <Text style={styles.ErrorStyle}>{errorMessage}</Text> : null}
        {errorMessage ? <TouchableOpacity
          onPress={() => onclickSignUp()}
          title="Sign Up"
          style={styles.ButtonStyle}
        ><Text style={styles.textStyle}>Sign Up</Text></TouchableOpacity> : null}
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
export default LogInScreen;