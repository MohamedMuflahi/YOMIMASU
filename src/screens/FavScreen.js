import React,{useState,useEffect} from 'react';
import {View, Text, StyleSheet, TextInput,TouchableOpacity} from 'react-native';
import MangaCard from '../components/MangaCard';

function FavScreen({navigation,route}){
    const {user} = route.params;
    return (
      <View style={styles.mainView}>
       {user.pass.fav.map(e=>{
           return <Text> My favorites</Text>
       }
        )}
      </View>
    );
}
const styles = StyleSheet.create({
    mainView: {
    },
});
export default FavScreen;