import React,{useState,useEffect} from 'react';
import { Dimensions, Text, View, StyleSheet,Image,FlatList,ScrollView} from 'react-native';
import dex from '../api/dex';
import Swiper from 'react-native-swiper'
function ReaderScreen({route,navigation}){
   
    
    const {id} = route.params;
    let gif = 'https://www.uttf.com.ua/assets/images/loader2.gif';
    const [image, setImage] = useState(gif);
    const [pages, setPages] = useState({});
    const [index, setIndex] = useState(0);
    const [chapter, setChapter] = useState([]);
    console.log(index);
    console.log(image);
    function handleFetch(data){
        setPages(data);
        // data.chapter.data.map((e)=>{
        //     setChapter([...chapter,{url: e,name: e}])
        // })
        console.log(chapter);
        setChapter(data.chapter.data);
        //setImage(`${data.baseUrl}/data/${data.chapter.hash}/${data.chapter.data[0]}`);
    }
    
    const getPages = async (id)=>
    {
      try
      {
     fetch(
         `https://api.mangadex.org/at-home/server/${id}`, 
         {
            headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
        }).then(response =>  response.json())
        .then((data) => {
            handleFetch(data)
           // console.log(id);
            //console.log(data.chapter.data)
    }).catch((error) =>
    {
        console.error(error);
    });
        }
        catch (e)
        {
            console.error(e);
        }}
    
    useEffect(() => {
        getPages(id);
    }, [])
    
    return(
        <Swiper style={{backgroundColor: 'black',}} showsPagination={false} loop={false}>
            {chapter.map((e)=>{
                let url = `${pages.baseUrl}/data/${pages.chapter.hash}/${e}`;
                 return (
                     <Image key={e} style={styles.image} source={{ uri: url }} />
                 ); 
            })}
        </Swiper>
    )
}
const styles = StyleSheet.create({
    button:{
        flex:1,
        backgroundColor: 'black',
    },
    image:{
        flex:1,
        resizeMode:'contain',
    },
})
export default ReaderScreen