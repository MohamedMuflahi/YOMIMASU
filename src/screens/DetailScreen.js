import React,{useState,useCallback} from "react";
import {Text, View,StyleSheet,Image,ScrollView,TouchableOpacity} from 'react-native';
import ChapterList from "../components/ChapterList";
import { AntDesign } from '@expo/vector-icons'; 

function DetailScreen({route,navigation}){
    const {title,image,author,status,desc,id,user} = route.params;
    
        const [textShown, setTextShown] = useState(false); //To show ur remaining Text
        const [lengthMore,setLengthMore] = useState(false); //to show the "Read more & Less Line"
        const [isliked, setisliked] = useState(false);
        const toggleNumberOfLines = () => { //To toggle the show text or hide it
            setTextShown(!textShown);
        }
        function handleFav(){
          // user
          setisliked(!isliked);
        }
        const onTextLayout = useCallback(e =>{
            setLengthMore(e.nativeEvent.lines.length >=4); //to check the text is more than 4 lines or not
            // console.log(e.nativeEvent);
        },[]);
    return(
        <ScrollView>
        <View style={styles.cardView}>
            <Image style={styles.image} source={{ uri: image}}/>
            <View style={styles.titleView}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.author}>{author}</Text>
                <Text style={styles.status}>{status}</Text>
                <TouchableOpacity onPress={handleFav}>
                  {isliked? <AntDesign name="heart" size={24} color="black" /> : <AntDesign name="hearto" size={24} color="black" />}
                </TouchableOpacity>
            </View>
        </View>
        <View style={styles.mainContainer}>
          <Text
              onTextLayout={onTextLayout}
              numberOfLines={textShown ? undefined : 4}
              style={styles.desc}>{desc}</Text>

              {
                  lengthMore ? <Text
                  onPress={toggleNumberOfLines}
                  style={styles.readmore}>{textShown ? 'Read less...' : 'Read more...'}</Text>
                  :null
              }
      </View>
        <View style={styles.chapterlist}>
            <ChapterList navigation={navigation} id={id}/>
        </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    chapterlist:{
        marginLeft: 15,
    },
  titleView: {
      flexDirection: 'column',
      marginLeft: 15,
      marginTop: 75,
      width: 220,
  },
  cardView: {
    marginLeft: 20,
    flexDirection: "row",
  },
  desc:{
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: 'center',
    marginHorizontal: 15,
    marginVertical: 15,
    lineHeight: 21,
  },
  readmore:{
    textAlign: 'center',
    marginHorizontal: 15,
    lineHeight: 21,
  },
  image: {
    width: 150,
    height: 250,
    borderRadius: 10,
    marginTop: 75,
    marginBottom: 5,
  },
  title: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 22,
    paddingBottom: 20,
  },
  author: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 18,
    paddingBottom: 20,
  },
  status: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "300",
    fontSize: 15,
    paddingBottom: 20,
  },
});
export default DetailScreen;