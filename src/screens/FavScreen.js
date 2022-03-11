import React,{useState,useEffect} from 'react';
import {View, Text, StyleSheet, TextInput,TouchableOpacity,ScrollView} from 'react-native';
import MangaLongCard from '../components/MangaLongCard';

function FavScreen({navigation,route}){
  const [favor, setFavor] = useState([])
  console.log('THIS IWS ISIDJKDJNDKS<DNSK',favor);
  const {user} = route.params;
    //const {title,image,author,status,desc,id} = user.fav;
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
              let x = data.filter(e=> e.id == user.id);
              console.log('X VALUE',x[0].fav);
              setFavor(favor=> favor = x[0].fav);
          })
          .catch(err=>{
              console.log(err);
          })
      } catch (e) {
        console.error(e);
      }
    };
    useEffect(() => {
      getUsers();
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