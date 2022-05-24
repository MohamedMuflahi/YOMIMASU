import React,{useState,useEffect} from 'react';
import {View, Text, StyleSheet, TextInput,TouchableOpacity,ScrollView} from 'react-native';
import MangaLongCard from '../components/MangaLongCard';
import { useSelector, useDispatch } from "react-redux";
import { setValue } from "../redux/user";

function FavScreen({navigation}){
  
  const [favor, setFavor] = useState([])
  const user = useSelector((state) => state.user.value);

    //const {title,image,author,status,desc,id} = user.fav;
    useEffect(() => {
      setFavor(user.favorites);
    }, [])
    
    return (
      <ScrollView style={styles.mainView}>
      {favor.map(e=>{
        return <MangaLongCard key={e.id} title={e.title} image={e.image} author={e.author} status={e.status} desc={e.desc} id={e.id} user={user} navigation={navigation}></MangaLongCard>
     }
     )}
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    mainView: {
    },
});
export default FavScreen;