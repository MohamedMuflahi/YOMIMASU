import React,{useState,useEffect} from "react";
import {View, Text, StyleSheet,FlatList,Image,ScrollView} from 'react-native';
import MangaCard from "./MangaCard";
function GenreList({navigation,genreId,user}){
    const [results, setResults] = useState([]);
const [errorMessage, setErrorMessage] = useState('');

    
const searchApi = async ()=>
    {
      try
      {
     fetch(
          `https://api.mangadex.org/manga?includedTags[]=${genreId}&limit=15`, 
          {
            headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
        }).then(response =>  response.json())
        .then((data) => {
          setResults(data.data);
                  setErrorMessage("");
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
      
    // const searchApi = async () =>{
    //     try{
    //         const response = await dex.get('./manga',{
    //             params:{
    //                 limit: 15,
    //                 includedTags: [genreId],
    //             }
    //         })
    //         setResults(response.data.data);
    //         setErrorMessage('');
    //         console.log('Fetched');
    
    //     }catch(err){
    //       console.log(err);
    //         setErrorMessage('Something went wrong, Check your connection');
    //     }
    // }
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
              user={user}
            ></MangaCard>
          );
        }}
      />
    );
}
export default GenreList;