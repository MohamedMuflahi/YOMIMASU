import React,{useState,useEffect} from 'react';
import { Dimensions, Text, View, StyleSheet,Image,TouchableOpacity} from 'react-native';
import dex from '../api/dex';
const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 9 / 16);
const imageWidth = dimensions.width;
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
        setChapter(data.chapter.data);
        setImage(`${data.baseUrl}/data/${data.chapter.hash}/${data.chapter.data[0]}`);
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
            console.log(id);
            console.log(data.chapter.data)
    }).catch((error) =>
    {
      console.error(error);
    });
        }
        catch (e)
        {
          console.error(e);
        }
      }
    // const getPages = async () =>{
    //     try{
    //         const response = await dex.get(`./at-home/server/${id}`);
            
    //         handleFetch(response.data)
            
    //     }catch(err){
    //         console.log('failed');
    //     }
    // };
    useEffect(() => {
        getPages(id);
    }, [])
    
    return(
        <TouchableOpacity style={styles.button} onPress={()=>{
            
            if(chapter[index+1]){
            setIndex((index)=> index +1);
            setImage(`${pages.baseUrl}/data/${pages.chapter.hash}/${chapter[index]}`);
            }else{
                return;
            }
        }}>
            <Image style={styles.image} source={{ uri: image}}/>
        </TouchableOpacity>
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