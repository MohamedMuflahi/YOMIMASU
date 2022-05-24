import React,{useState} from "react";
import { View,Text,StyleSheet, TextInput} from "react-native";
import {Feather} from '@expo/vector-icons';

function SearchBar({term,onTermChange,onTermSubmit}){
    return(
        <View style={styles.backgroundStyle}>
            <Feather style={styles.iconStyle} name="search"/>
            <TextInput 
            style={styles.inputStyle} 
            placeholder="Search"
            value={term}
            onChangeText={newTerm=> onTermChange(newTerm)}
            autoCapitalize='none'
            autoCorrect={false}
            onEndEditing={()=> onTermSubmit()}
            onSubmitEditing={()=>onTermSubmit()}
            ></TextInput>
        </View>
    );
}
const styles = StyleSheet.create({
    backgroundStyle: {
        backgroundColor: '#A9A9A9',
        height: 50,
        borderRadius: 5,
        marginHorizontal: 15,
        marginTop: 15,
        flexDirection: 'row',
        marginBottom: 10,
    },
    inputStyle:{
        flex: 1
    },
    iconStyle:{
        fontSize: 35,
        alignSelf: "center",
        marginHorizontal: 15,

    }
});
export default SearchBar;