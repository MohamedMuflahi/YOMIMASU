import React,{useState,useEffect} from 'react';
import {View, Text, StyleSheet, TextInput,TouchableOpacity} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
 
function LogInScreen({navigation}){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);
    const [loggedIn, setloggedIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
   // console.log(username);
    //console.log(password);
    const getUsers = async () => {
        try {
            fetch('http://10.129.2.184:3000/users',
            {
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              }
            }
            )
            .then(resp=> resp.json())
            .then(data=>{
                //console.log(data);
                setUsers(data);
            })
            .catch(err=>{
                console.log(err);
            })
        } catch (e) {
          console.error(e);
        }
      };
    function onUsernameChange(newTerm){
        setUsername(newTerm);
    }
    function onPasswordChange(newTerm){
        setPassword(newTerm);
    }
    function onSubmit(){
       getUsers();
       if(users.find(e=> e.username === username)){
           console.log('correct username');
           let pass = users.find((e)=> e.password === password)
           if(pass){
               
               //console.log('logged in',pass);
               setloggedIn(true);
               setErrorMessage('');
               navigation.navigate('LoggedHome',{
                   user: pass,
               });
           }else{
            console.log('Incorrect Password');
            setErrorMessage('Incorrect Password!')
           }
       }else{
           console.log('Incorrect Username');
           setErrorMessage("Username Doesn't Exist Sign Up its Free!");
       }
    }
    function onclickSignUp(){
        setErrorMessage('');
        navigation.navigate('Sign');
    }
    useEffect(() => {
        getUsers();
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