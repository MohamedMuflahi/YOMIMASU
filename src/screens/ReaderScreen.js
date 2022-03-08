import React,{useState,useEffect} from 'react';
import { Text, View, StyleSheet,Image,TouchableOpacity} from 'react-native';
import dex from '../api/dex';
function ReaderScreen({route,navigation}){
    const {id} = route.params;
    console.log(id);
    const [image, setImage] = useState('https://uploads.mangadex.org/covers/e7eabe96-aa17-476f-b431-2497d5e9d060/db8c8175-3d93-4808-b5f7-ca7a8f8d9e97.jpg')
    const [pages, setPages] = useState({});
    const [index, setIndex] = useState(0);
    const [chapter, setChapter] = useState([]);
    console.log(index);
    console.log(image);
    function handleFetch(data){
        setPages(data);
        setChapter(data.chapter.data);
    }
    const getPages = async () =>{
        try{
            const response = await dex.get(`./at-home/server/${id}`);
            //console.log(response.data);
            handleFetch(response.data)
            
        }catch(err){
            console.log('failed');
        }
    };
    useEffect(() => {
        getPages();
    }, [])
    
    return(
        <TouchableOpacity onPress={()=>{
            
            if(chapter[index+1]){
                //console.log('next');
            setIndex((index)=> index +1);
            setImage(`${pages.baseUrl}/data/${pages.chapter.hash}/${chapter[index]}`);
            }else{
                //console.log('nope');
                console.log(chapter);
                return;
            }
        }}>
            <Image style={styles.image} source={{ uri: image}}/>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    image:{
        width: 450,
        height:750,
    },
})
export default ReaderScreen