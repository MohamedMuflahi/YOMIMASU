import React,{useState,useEffect} from "react"; 
import {Text,View,StyleSheet,TouchableOpacity,Image} from 'react-native'
function MangaLongCard({title,image,author,id,navigation,desc,user,status}){
  function handlePress() {
    navigation.navigate("Detail", {
      title,
      image,
      author,
      status,
      desc,
      id,
      user,
    });
  }
  useEffect(() => {
    
  }, []);

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Image style={styles.image} source={{ uri: image }} />
        <View style={styles.view}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.author}>{author}</Text>
          <Text style={styles.status}>{status}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
}
const styles= StyleSheet.create({
    view:{
      paddingLeft: 20,
      marginVertical: 20,
    },
    button:{
        paddingBottom:10,
        marginLeft: 15,
        flexDirection: "row"
    },
    image:{
        width: 100,
        height: 150,
        borderRadius: 10,
        marginVertical:20,
    },
    title:{
      fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 22,
    paddingBottom: 20,
    },
    author:{
      fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 18,
    paddingBottom: 20,
    },
    desc:{

    },
    status:{
      fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "300",
    fontSize: 15,
    paddingBottom: 20,
    },
})
export default MangaLongCard