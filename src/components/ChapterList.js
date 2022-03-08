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
    function GETALLCHAPTERS(offset){
        getChapterList(id,offset);
    }
    const getChapterList = async (id,offset) =>{
        
        try{
            const response = await dex.get('./chapter',{
                params:{
                    manga: id,
                    limit: 100,
                    translatedLanguage: ['en'],
                    offset,
                }
            })
            console.log('fetching..');
            setTotalChapters(response.data.total);
            setChapters(response.data.data);
        }catch(err){
        }
    }
    useEffect(() => {
        GETALLCHAPTERS(0);
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
