import React,{useState,useEffect} from 'react';
import {View, Text, StyleSheet, TextInput,TouchableOpacity} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
 
function LogInScreen({navigation}){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);
    const [loggedIn, setloggedIn] = useState(false);
    console.log(username);
    console.log(password);
    const getUsers = async () => {
        try {
            fetch('https://api.jsonbin.io/b/622a2f4a7caf5d6783655d5f',
            {
                headers: {
                Accept: 'application/json',
                "X-Master-Key": "$2b$10$lz.x0DaQekKpXwCZdWvDReLG3Fw6gS8NNkN0Is4j9GKRwbrKuFdlu",
                'Content-Type': 'application/json',
              }
            }
            )
            .then(resp=> resp.json())
            .then(data=>{
                console.log(data);
                setUsers(data.users);
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
        console.log(users);
       if(users.find(e=> e.username === username)){
           console.log('correct username');
           let pass = users.find((e)=> e.password === password)
           if(pass){
               
               console.log('logged in',pass);
               setloggedIn(true);
               navigation.navigate('LoggedHome',{
                   user: {pass},
               });
           }else{
            console.log('Incorrect Password');
           }
       }else{
           console.log('Incorrect Username');
       }
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
     }
});
export default LogInScreen;