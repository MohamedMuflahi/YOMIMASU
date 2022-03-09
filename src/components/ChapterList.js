import React,{useState,useEffect} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ChapterCard from './ChapterCard';
import dex from '../api/dex';

function ChapterList({id, navigation}){
    const [totalChapters, setTotalChapters] = useState(0);
    const [chapters, setChapters]= useState([]);
    function handlePress(chapterID){
        navigation.navigate('Reader',{
            id: chapterID,
        })
        console.log(chapterID);
    }
    const getChapterList = async (id)=>
    {
      try
      {
     fetch(
          `https://api.mangadex.org/chapter?manga=${id}&limit=100&translatedLanguage[]=en`, 
          {
            headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
        }).then(response =>  response.json())
        .then((data) => {
            setTotalChapters(data.total);
            setChapters(data.data);
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
    useEffect(() => {
        getChapterList(id);
    }, [])
    
    return (
        <View>
            <Text style={styles.text}>{totalChapters} Chapters</Text>
            {chapters.map((e)=>{
                return <ChapterCard key={e.id} vol={e.attributes.volume} title={e.attributes.title} ch={e.attributes.chapter} handlePress={handlePress} id={e.id}></ChapterCard>
            })}
        </View>
    )
}
const styles = StyleSheet.create({
    text:{
        marginBottom: 10,
        fontWeight: 'bold',
    }
});
export default ChapterList;
