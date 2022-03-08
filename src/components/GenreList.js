import React,{useState,useEffect} from "react";
import {View, Text, StyleSheet,FlatList,Image,ScrollView} from 'react-native';
import dex from '../api/dex';
import MangaCard from "./MangaCard";
function GenreList({navigation,genreId}){
    const [results, setResults] = useState([]);
const [errorMessage, setErrorMessage] = useState('');

    const searchApi = async () =>{
        try{
            const response = await dex.get('./manga',{
                params:{
                    limit: 15,
                    includedTags: [genreId],
                }
            })
            setResults(response.data.data);
            setErrorMessage('');
            console.log('Fetched');
    
        }catch(err){
            setErrorMessage('Something went wrong, Check your connection');
        }
    }
    useEffect(() => {
        searchApi('')
      }, [])
    return (
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={results}
        keyExtractor={(result) => result.id}
        renderItem={({ item }) => {
          return (
            <MangaCard
              key={item.id}
              title={item.attributes.title.en}
              id={item.id}
              navigation={navigation}
              item={item}
            ></MangaCard>
          );
        }}
      />
    );
}
export default GenreList;